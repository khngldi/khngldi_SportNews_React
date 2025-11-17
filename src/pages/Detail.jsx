import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";

export default function Detail() {
    const { id } = useParams();
    const [news, setNews] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isSubmitting, setIssubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [commentText, setCommentText] = useState('');

    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function fetchNews() {
            try {
                const response = await axios.get(`https://c3b36cdc3750f333.mokky.dev/news/${id}`);
                setNews(response.data);
            } catch (err) {
                console.error(err);
                setError("Ошибка при загрузке новости");
            } finally {
                setLoading(false);
            }
        }
        async function fetchComments() {
            try {
                const response = await axios.get(`https://c3b36cdc3750f333.mokky.dev/newscomments?post_id=${id}`);
                setComments(response.data);
                const sorted = response.data.sort((a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
                );

                setComments(sorted);
            } catch (err) {
                console.error("Ошибка при загрузке комментариев:", err);
            }
        }
        fetchNews()
        fetchComments();
    }, [id]);

    if (isLoading) {
        return <p className="loading">Загрузка...</p>;
    }

    if (error) {
        return (
            <div className="error-container">
                <img src="/src/assets/error-icon.jpg" alt="Ошибка" className="error-img" />
                <h2 className="error-text">{error}</h2>
                <p className="error-sub">Попробуйте позже.</p>
            </div>
        );
    }

    async function SubmitComment(e) {
        e.preventDefault();
        if (!commentText.trim()) {
            setSubmitMessage('Комментарий не может быть пустым');
            return;
        }
        setIssubmitting(true);
        setSubmitMessage("Отправка комментария...");

        try {
            const commentUrl = 'https://c3b36cdc3750f333.mokky.dev/newscomments';
            const commentData = {
                post_id: id,
                text: commentText,
                createdAt: new Date().toISOString()
            };
            const response = await axios.post(commentUrl, commentData);

            if (response.status === 201 || response.status === 200) {
                setSubmitMessage('Комментарий успешно отправлен!');
                setCommentText('');
                const newComment = response.data;
                setComments((prev) => [newComment, ...prev]);
            } else {
                setSubmitMessage('Ошибка при отправке комментария');
            }
        } catch (error) {
            console.error(error);
            setSubmitMessage('Ошибка при отправке комментария');
        } finally {
            setIssubmitting(false);
            setTimeout(() => setSubmitMessage(''), 4000);
        }
    }

    return (
        <div className="page">
            <div className="detail-header">
                <Link to="/" className="back-button red">
                    <img src="/src/assets/backButton.svg" alt="Назад" className="back-icon" />
                    Назад
                </Link>
            </div>

            <h2 className="detail-title">{news.title}</h2>
            <small className="news-meta">{news.date} • {news.category}</small>

            <img src={news.image} alt={news.title} className="detail-img" />

            <p className="detail-text">{news.description}</p>

            <p className="source">
                Источник: <span>SportMob</span>
            </p>

            <form onSubmit={SubmitComment} className="comment-form">
                <label htmlFor="comment" className="comment-label">Оставьте комментарий</label>
                <input
                    type="text"
                    id="comment"
                    name="comment"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Ваш комментарий..."
                    className="comment-input"
                />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="comment-btn"
                >
                    {isSubmitting ? 'Отправка...' : 'Отправить'}
                </button>
            </form>

            {submitMessage && <p className="comment-message">{submitMessage}</p>}
            <div className="comments-section">
                <h3 className="comments-title">Комментарии:</h3>

                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id} className="comment-item">
                            <p className="comment-text">{comment.text}</p>
                            <small className="comment-date">
                                {new Date(comment.createdAt).toLocaleString('ru-RU')}
                            </small>
                        </div>
                    ))
                ) : (
                    <p className="no-comments">Пока нет комментариев</p>
                )}
            </div>
        </div>
    );
}
