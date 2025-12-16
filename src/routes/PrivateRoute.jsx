import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ redirectTo = "/login" }) => {
    const { isAuthenticated, loading } = useAuth();

    // Si estás “rehidratando” sesión (leyendo token/usuario), puedes mostrar loader
    if (loading) return null; // o un spinner

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
