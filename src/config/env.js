// Sin VITE_API_URL se usa el backend local para no romper el arranque de quien no tenga .env
export const API_BASE_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:8080").replace(/\/+$/, "");
