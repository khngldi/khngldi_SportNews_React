import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {

    const location = useLocation();
    const isHome = location.pathname === "/";

    const [menuOpen, setMenuOpen] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";
    const [searchText, setSearchText] = useState(searchQuery);

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);

        if (searchText.trim()) {
            params.set("search", searchText.trim());
        } else {
            params.delete("search");
        }

        setSearchParams(params, { replace: true });
    };

    return (
        <nav className="navbar">
            <img
                src="../assets/menu-btn.png"
                alt="Menu"
                className="menu-icon"
                onClick={() => setMenuOpen(!menuOpen)}
            />

            {menuOpen && (
                <div className="dropdown-menu">
                    <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
                    <NavLink to="/categories" onClick={() => setMenuOpen(false)}>Categories</NavLink>
                </div>
            )}

            {isHome && (
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Поиск новостей..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button type="submit">Найти</button>
                </form>
            )}
        </nav>
    );
}
