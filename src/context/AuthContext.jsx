import { createContext, useContext, useEffect, useState } from "react";
import { login as loginService } from "../services/authServices";

const AuthContext = createContext(null);

/**
 * Contexto global de autenticación para Jobsi.
 * Proveedor que maneja el estado de sesión del usuario (JWT),
 * persistencia en LocalStorage y exposición de métodos de login/logout.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos envueltos por el Provider
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);       // Información del usuario descifrada del JWT
    const [token, setToken] = useState(null);     // Token JWT
    const [loading, setLoading] = useState(true); // Control visual para evitar parpadeos antes del montaje

    // Al cargar la app, recuperar sesión si existe
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        // DEV MODE: auto login
        if (import.meta.env.DEV && !storedToken) {
            const devUser = {
            email: "dev@jobsi.com",
            nombre: "Juancho",
            role: "ROLE_USER",
            genero: "Masculino",
            /* fechaNacimiento: new Date().toISOString().split('T')[0], */ // Pone la fecha de hoy para probar la animación fácilmente
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

    /**
     * Consume el servicio de login, descifra el token recibido, 
     * guarda la sesión en localStorage y actualiza el estado global.
     * 
     * @param {string} email - Correo del usuario ingresado.
     * @param {string} password - Contraseña ingresada.
     */
    const login = async (email, password) => {
        const response = await loginService(email, password);

        const jwt = response.token;
        const payload = JSON.parse(atob(jwt.split(".")[1])); //descifrar JWT

        const userData = {
            email: payload.sub,
            role: payload.role,
            genero: payload.genero ?? null,
            nombre: payload.nombre ?? "Usuario",
            fechaNacimiento: payload.fechaNacimiento ?? null,
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
