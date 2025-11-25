import { Route, Routes } from "react-router-dom";
import { routes } from "../utils/routes.jsx";
import AuthForm from "./AuthForm.jsx";

function AppRoute() {
    return (
        <Routes>
            {routes.map((route, index) => {
                const Component = route.element;
                return <Route key={index} path={route.path} element={<Component />} />;
            })}

            <Route path="/login" element={<AuthForm mode="login" />} />
            <Route path="/register" element={<AuthForm mode="register" />} />
        </Routes>
    )
}

export default AppRoute;