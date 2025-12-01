import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import { useState } from "react";
import menubtn from "../assets/menu-btn.png";
import { useAuth } from "./AuthContext";

export default function Navbar() {
    const location = useLocation();
    const isHome = location.pathname === "/";

    const [menuOpen, setMenuOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";
    const [searchText, setSearchText] = useState(searchQuery);

    const { user, isAuthenticated, logout } = useAuth();

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
                src={menubtn}
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

            <div className="auth-section">
                {!isAuthenticated ? (
                    <>
                        <NavLink to="/login">
                            <button className="auth-btn login-btn">Войти</button>
                        </NavLink>
                        <NavLink to="/register">
                            <button className="auth-btn register-btn">Зарегистрироваться</button>
                        </NavLink>
                    </>
                ) : (
                    <>
                        <span className="user-email">{user?.username}</span>
                        <button className="auth-btn logout-btn" onClick={logout}>Выйти</button>
                    </>
                )}
            </div>
        </nav>
    );
}
