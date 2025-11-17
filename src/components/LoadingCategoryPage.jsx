import "../index.css"

export default function LoadingCategoryPage() {
    return (
        <div className="loading">
            <div className="loading-card">
                <div className="loading-card-container">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-text"></div>
                </div>
            </div>
        </div>
    )
}