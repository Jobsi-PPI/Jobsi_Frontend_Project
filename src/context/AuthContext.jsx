import { createContext, useContext, useEffect, useState } from "react";
import { login as loginService } from "../services/authServices";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);       // info del usuario
    const [token, setToken] = useState(null);     // JWT
    const [loading, setLoading] = useState(true); // evita parpadeos

    // Al cargar la app, recuperar sesión si existe
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        // 🔥 DEV MODE: auto login
        if (import.meta.env.DEV && !storedToken) {
            const devUser = {
            email: "dev@jobsi.com",
            nombre: "Juancho",
            role: "ROLE_USER",
            genero: "Masculino",
            };

            localStorage.setItem("token", "DEV_TOKEN");
            localStorage.setItem("user", JSON.stringify(devUser));

            setToken("DEV_TOKEN");
            setUser(devUser);
            setLoading(false);
            return;
        }

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }

        setLoading(false);
    }, []);

    // Login centralizado
    const login = async (email, password) => {
        const response = await loginService(email, password);

        const jwt = response.token;
        const payload = JSON.parse(atob(jwt.split(".")[1])); //descifrar JWT

        const userData = {
            email: payload.sub,
            role: payload.role,
            genero: payload.genero ?? null,
            nombre: payload.nombre ?? "Usuario",
        };

        // guardar
        localStorage.setItem("token", jwt);
        localStorage.setItem("user", JSON.stringify(userData));

        setToken(jwt);
        setUser(userData);
    };

    // Logout REAL
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");

    };

    // Valor expuesto
    const value = {
        user,
        token,
        isAuthenticated: !!token,
        login,
        logout,
    };

    // Evitar render antes de saber si hay sesión
    if (loading) return null;

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook cómodo
export const useAuth = () => useContext(AuthContext);
