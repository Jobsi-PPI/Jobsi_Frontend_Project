const API_BASE = "http://localhost:8080";
const AUTH_API = `${API_BASE}/auth`;

export const register = async (data) => {
    const response = await fetch(`${API_BASE}/v1/public/users/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    //se crea variable que recibe la respuesta del servidor a la creacion de la cuenta
    const responseData = await response.json();

    if (!response.ok) {
        //mensaje del backend
        throw new Error(responseData.message || "Error registrando usuario");
    }
    // La variable recibe el mensaje y retorna el dato obtenido
    return responseData;
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
