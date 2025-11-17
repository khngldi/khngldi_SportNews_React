import { Link } from "react-router-dom";
import "../index.css";

export default function CategoryCard({ category }) {
    return (
        <Link
            to={`/categories?category=${encodeURIComponent(category.name)}`}
            className="category-card"
        >
            <img src={category.icon} alt={category.name} className="category-icon" />
            <h3>{category.name}</h3>
        </Link>
    );
}
