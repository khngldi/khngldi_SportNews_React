import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import "../index.css";

function AuthForm({ mode = "login" }) {

    const navigate = useNavigate();
    const { login, register } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const isLoginMode = mode === 'login';
    const buttonText = isLoginMode ? "Войти" : "Зарегистрироваться";
    const title = isLoginMode ? "Авторизация" : "Регистрация";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        const action = isLoginMode ? login : register;
        const result = await action(email, password);

        if (result.success) {
            setMessage(isLoginMode ? "Успешный вход" : "Успешная регистрация");
            navigate('/');
        } else {
            setMessage(`Ошибка: ${result.error}`);
        }

        setLoading(false);
    };

    return (
        <div className="auth-form-container">
            <h2>{title}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Введите email..."
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Введите пароль..."
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Загрузка..." : buttonText}
                </button>
            </form>
            {message && <p className="auth-message">{message}</p>}
        </div>
    );

}

export default AuthForm;
