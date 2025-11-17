import "../index.css";
import CategoryCard from "../components/CategoryCard";
import NewsCard from "../components/NewsCard";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingCategoryPage from "../components/LoadingCategoryPage.jsx";
import LoadingNewsPage from "../components/LoadingNewsPage.jsx";
import { useLocation } from "react-router-dom";

export default function Categories() {
    const location = useLocation();
    const [categories, setCategories] = useState([]);
    const [news, setNews] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const searchParams = new URLSearchParams(location.search);
    const categoryFilter = searchParams.get('category');

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                if (categoryFilter) {
                    const res = await axios.get(
                        `https://c3b36cdc3750f333.mokky.dev/news?category=${categoryFilter}`
                    );
                    setNews(res.data);
                } else {
                    const res = await axios.get(
                        "https://c3b36cdc3750f333.mokky.dev/categories"
                    );
                    setCategories(res.data);
                }
            } catch (err) {
                console.error(err);
                setError("Ошибка при загрузке данных");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [categoryFilter]);

    if (error) {
        return (
            <div className="error-container">
                <img src="/src/assets/error-icon.jpg" alt="Ошибка" className="error-img" />
                <h2 className="error-text">{error}</h2>
                <p className="error-sub">Попробуйте обновить страницу позже.</p>
            </div>
        );
    }

    if (categoryFilter) {
        return (
            <div className="page">
                <h2 className="page-title grey">Новости: {categoryFilter}</h2>
                <div className="news-grid">
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <LoadingNewsPage key={i} />
                        ))
                    ) : news.length > 0 ? (
                        news.map((n) => <NewsCard key={n.id} news={n} />)
                    ) : (
                        <p>Новостей по категории "{categoryFilter}" пока нет.</p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="page categories">
            <h2 className="page-title orange">Категории</h2>

            <div className="categories-grid">
                {isLoading ? (
                    Array.from({ length: 7 }).map((_, index) => (
                        <LoadingCategoryPage key={index} />
                    ))
                ) : (
                    categories.map((cat) => (
                        <CategoryCard key={cat.id} category={cat} />
                    ))
                )}
            </div>
        </div>
    );
}
