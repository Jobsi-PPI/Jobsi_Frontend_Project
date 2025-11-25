const API_BASE = "http://localhost:8080";
const AUTH_API = `${API_BASE}/auth`;

export const register = async (data) => {
    const response = await fetch(`${API_BASE}/v1/public/users/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Error registrando usuario");
    return response.json();
    };

export const login = async (email, password) => {
    const response = await fetch(`${AUTH_API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Error en login");
    return response.json(); // { token: "..." }
    };
