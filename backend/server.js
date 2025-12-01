const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 2000;

app.use(express.json());

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://sportnews-rho.vercel.app/"
    ],
}));

const JWT_SECRET = "my_super_secret_key_2025";

const users = [
    { id: 1, username: "user1", password: "111111" },
    { id: 2, username: "user2", password: "111111" },
    { id: 3, username: "user3", password: "111111" },
    { id: 4, username: "user4", password: "111111" },
    { id: 5, username: "user5", password: "111111" },
    { id: 6, username: "user6", password: "111111" },
    { id: 7, username: "user7", password: "111111" },
    { id: 8, username: "user8", password: "111111" },
    { id: 9, username: "user9", password: "111111" },
    { id: 10, username: "user10", password: "111111" }
];

app.post('/api/register', (req, res) => {
    console.log(req.body);

    const { username, password } = req.body;

    if (users.find(u => u.username === username)) {
        return res.status(409).json({ message: "Пользователь уже существует" });
    }

    const newUser = {
        id: users.length + 1,
        username,
        password
    };

    users.push(newUser);

    const token = jwt.sign(
        { id: newUser.id, username: newUser.username },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({
        message: "Регистрация успешная",
        user: newUser,
        token
    });
});


app.post('/api/login', (req, res) => {
    console.log(req.body);

    const { username, password } = req.body;

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: "Неверный логин или пароль" });
    }

    const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({
        message: "Вход успешный",
        token,
        user
    });
});

app.get("/api/profile", (req, res) => {
    console.log('Headers:', req.headers);
    const header = req.headers.authorization;
    console.log('Token:', header);

    if (!header) {
        return res.status(401).json({ message: "Нет токена" });
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({
            message: "Доступ разрешён!",
            user: decoded
        });
    } catch {
        res.status(401).json({ message: "Неверный токен" });
    }
});


app.listen(port, () => {
    console.log(`Сервер работает: http://localhost:${port}`);
});