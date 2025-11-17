import "../index.css";

export default function LoadingNewsPage() {
    return (
        <div className="loading-news-card">
            <div className="loading-news-content">
                <div className="loading-news-title skeleton"></div>
                <div className="loading-news-text skeleton"></div>
                <div className="loading-news-text short skeleton"></div>
            </div>
        </div>
    );
}