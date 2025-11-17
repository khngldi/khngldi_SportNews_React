import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Categories from "./pages/Categories";
import "./index.css";
import AppRoute from "./components/AppRoute.jsx";

export default function App() {
    return (
        <Router>
            <Navbar />
            <AppRoute />
        </Router>
    );
}
