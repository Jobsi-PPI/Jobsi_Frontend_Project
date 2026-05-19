Documenta el o los endpoints nuevos que se deben implementar en el backend para el feature actual.

## Formato de salida

Genera una tabla con dos columnas:

| ENDPOINT | PROPÓSITO |
|---|---|
| **MÉTODO /v1/ruta/{param}** | **Backend:** qué debe hacer este endpoint en el servidor (validaciones, lógica de negocio, respuesta esperada). **Frontend:** qué función del servicio lo llama y qué efecto produce en la UI. |

## Reglas

- Una fila por endpoint.
- La columna ENDPOINT incluye el método HTTP en negrita + la ruta completa.
- Backend: describir validaciones importantes (ej: que el usuario sea el dueño, que el estado sea correcto).
- Frontend: mencionar el archivo de servicio (`<nombre>Service.js`), la función exacta, y el efecto visible en pantalla.
- Si el endpoint ya fue implementado por el backend, indicarlo con ✅ al inicio de la fila.

## Instrucción

Basándote en el feature que acabamos de implementar (o que me estás describiendo),
genera la tabla de endpoints para compartir con el equipo de backend.
