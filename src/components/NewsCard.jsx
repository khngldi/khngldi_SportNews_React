import { Link } from "react-router-dom";
import "../index.css";

export default function NewsCard({ news }) {
    const { id, title, date, category } = news;

    return (
        <Link to={`/news/${id}`} className="news-card">
            <div className="news-content">
                <p className="news-title">{title}</p>
                <small className="news-meta">{date}</small>
                <br />
                <small className="news-meta">{category}</small>
            </div>
        </Link>
    );
}
