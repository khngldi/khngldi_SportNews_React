import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoute from "./components/AppRoute";
import { AuthProvider, useAuth } from "./components/AuthContext";

function App() {
    return (
        <AuthProvider>
            <Router>
                <NavbarWrapper />
                <AppRoute />
            </Router>
        </AuthProvider>
    );
}

function NavbarWrapper() {
    const { user } = useAuth();
    return <Navbar userEmail={user?.email} />;
}

export default App;
