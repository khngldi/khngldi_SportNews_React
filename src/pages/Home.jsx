import NewsCard from "../components/NewsCard";
import "../index.css";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import LoadingNewsPage from "../components/LoadingNewsPage.jsx";
import { useLocation } from "react-router-dom";

export default function Home() {
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const categoryFilter = searchParams.get("category");
    const searchFilter = searchParams.get("search");

    const [news, setNews] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let api = "https://c3b36cdc3750f333.mokky.dev/news";

        if (categoryFilter) {
            api += `?category=${categoryFilter}`;
        }

        setLoading(true);
        setError(null);

        async function fetchNews() {
            try {
                const response = await axios.get(api);
                setNews(response.data);
            } catch (err) {
                console.error(err);
                setError("Ошибка при загрузке новостей");
            } finally {
                setLoading(false);
            }
        }

        fetchNews();
    }, [location.search]);

    const processedNews = useMemo(() => {
        let n = [...news];

        if (searchFilter) {
            const text = searchFilter.toLowerCase();
            n = n.filter(item =>
                item.title.toLowerCase().includes(text) ||
                item.description.toLowerCase().includes(text)
            );
        }

        return n;
    }, [news, searchFilter]);

    if (error) {
        return (
            <div className="error-container">
                <img src="/src/assets/error-icon.jpg" alt="Ошибка" className="error-img" />
                <h2 className="error-text">{error}</h2>
                <p className="error-sub">Попробуйте обновить страницу позже.</p>
            </div>
        );
    }

    return (
        <div className="page">
            <h2 className="page-title grey">
                {categoryFilter ? `Новости: ${categoryFilter}` : "Все новости"}
            </h2>

            <div className="news-grid">
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <LoadingNewsPage key={index} />
                    ))
                ) : (
                    processedNews.map((n) => <NewsCard key={n.id} news={n} />)
                )}
            </div>
        </div>
    );
}
