Sigue este flujo exacto para implementar el issue de Jobsi que te indique.

## Paso 1 — Entender el issue

Antes de tocar código, confirma conmigo:
- ¿Qué endpoint(s) consume? (método + ruta)
- ¿Qué pantalla o componente produce?
- ¿Necesita ruta nueva en Routes.jsx?
- ¿Necesita enlace en SidebarMenu.jsx?

Si el issue ya trae toda esa información, puedes arrancar directamente.

## Paso 2 — Servicio

Archivo: `src/services/jobsServices/<nombre>Service.js`

Patrón obligatorio:

```js
export const miFuncion = async (param, token) => {
    const response = await api.METHOD(`/v1/ruta/${param}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
```

- Una función por endpoint.
- Si el servicio ya existe, agregar la función al archivo existente.

## Paso 3 — Hook

Archivo: `src/features/<feature>/hooks/use<Feature>.js`

Reglas:
- Estado inicial: `loading = true`, datos vacíos.
- Delay artificial: 2500–3000 ms con `setTimeout` antes de `setLoading(false)`.
- Feedback al usuario: SweetAlert2 con `confirmButtonColor: "#1e3a8a"` y `cancelButtonColor: "#d33"`.
- Si hay modal involucrado: usar `useModalState` → `{ isOpen, closing, opening, openModal, closeModal }`.

## Paso 4 — Componente / página

Convenciones de estilo:
- Colores: `#1e3a8a` (primario), `#ffb906` (acento), `#eef0f5` (bg containers en sección azul).
- Reutilizar siempre: `<Button>`, `<EmptyState>`, `<EstrellasCalificacion>`, skeletons existentes.
- Mobile-first con breakpoints `sm:` y `lg:`. Contenedores `max-w-4xl` o `max-w-6xl mx-auto`.
- Sin comentarios salvo que el WHY sea no obvio.

## Paso 5 — Routes.jsx

```jsx
import NuevoComponente from "../features/<feature>/NuevoComponente";
<Route path="/nueva-ruta" element={<NuevoComponente />} />
```

## Paso 6 — SidebarMenu.jsx (si aplica)

Enlazar el nuevo item con `navigate("/nueva-ruta")` y cerrar el menú con `closeMenu()`.

## Paso 7 — Commit

Al terminar, proponer el commit usando `/project:commit`.
