# Jobsi — Frontend

Plataforma universitaria (POLI 5to semestre) que conecta estudiantes que necesitan ayuda
—tareas, asesorías, materiales, servicios— con otros estudiantes dispuestos a ofrecerlos
a cambio de remuneración.

> Solo frontend. Backend: Spring Boot desarrollado por un compañero de forma independiente.

---

## Stack

| Tecnología       | Versión | Rol                                         |
|------------------|---------|---------------------------------------------|
| React            | 19      | UI                                          |
| Vite             | 7       | Build                                       |
| TailwindCSS      | 4       | Estilos                                     |
| react-router-dom | 7       | Routing                                     |
| Axios            | 1.x     | HTTP                                        |
| SweetAlert2      | 11      | Confirmaciones y feedback                   |
| react-icons      | 5       | Iconos (fi, md, ai, tb, gr, io5, pi)        |
| Context API      | —       | Estado global (AuthContext)                 |

---

## Comandos

```bash
npm install        # Instalar dependencias
npm run dev        # Dev server → http://localhost:5173
npm run build      # Build de producción
npm run lint       # ESLint
npm run preview    # Preview del build
```

Backend corre en `http://localhost:8080` (configurado en `src/services/apiService.js`).

---

## Estructura de carpetas

```
src/
├── context/           # AuthContext (user, token, login, logout)
├── routes/            # Routes.jsx, PrivateRoute.jsx
├── services/          # Llamadas HTTP con Axios
│   ├── apiService.js              ← instancia global — no modificar sin consenso
│   ├── authServices.js
│   └── jobsServices/
│       ├── jobPublicService.js
│       ├── misJobsService.js
│       ├── postulacionesService.js
│       ├── calificacionesService.js
│       └── usuariosService.js
├── features/          # Una carpeta por dominio de negocio
│   ├── auth/
│   ├── home/          # Home, ExplorarJobs, JobCard, CreateJobModal
│   ├── jobs/          # VerMisJobs, JobPublicadoCard, JobPostuladoCard
│   ├── postulaciones/
│   ├── calificaciones/
│   ├── perfil/
│   └── configuracion/
├── components/
│   ├── layout/        # Header, Footer, HeaderConfiguracion
│   ├── ui/            # Button, EstrellasCalificacion
│   │   ├── modals/    # ComingSoonModal, ErrorBackendModal, NoInternetModal, useModalState
│   │   └── states/    # EmptyState, ErrorState, LoadingState
│   ├── loaders/       # Skeletons (animate-pulse)
│   └── animations/    # BirthdayCelebration
└── utils/             # timeUtils (tiempoRelativo)
```

---

## AuthContext

```js
const { user, token, isAuthenticated, loading, login, logout } = useAuth();
// user: { email, nombre, genero, fechaNacimiento, role }
// token: JWT → Authorization: Bearer ${token}
```

---

## Convenciones

### Colores

| Token        | Hex       | Uso                                        |
|--------------|-----------|--------------------------------------------|
| Primary blue | `#1e3a8a` | Header, footer, botones, textos destacados |
| Accent blue  | `#4468cf` | Tabs activas (jobsiBlue)                   |
| Yellow       | `#ffb906` | CTAs, badges, acentos                      |
| Bg container | `#eef0f5` | Contenedores de listas sobre fondo azul    |

### Servicios (`src/services/`)

```js
export const miServicio = async (param, token) => {
    const response = await api.get(`/v1/ruta/${param}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
```

### Hooks (`src/features/<feature>/hooks/`)

- Archivo por feature: `use<Feature>.js`
- Manejan: estado local, `loading`, llamada al servicio, SweetAlert2

### Modales

Siempre usar `useModalState`: `{ isOpen, closing, opening, openModal, closeModal }`

### Skeletons

Delay artificial de 2500–3000 ms con `setTimeout` antes de `setLoading(false)`.

### SweetAlert2

```js
confirmButtonColor: "#1e3a8a"
cancelButtonColor: "#d33"
```

### Componentes UI reutilizables

- `<Button variant="primary|warning|secondary|danger|dark" size="sm|md|lg|xl">`
- `<EmptyState title icon description primaryAction secondaryAction />`
- `<EstrellasCalificacion calificacion={number} />`

### Responsive

Mobile-first. Breakpoints `sm:` y `lg:`. Contenedores: `max-w-4xl` / `max-w-6xl mx-auto`.

### Comentarios

Sin comentarios salvo que el WHY sea no obvio.

---

## Flujo para un feature nuevo

1. `src/services/jobsServices/<nombre>Service.js` — funciones de API
2. `src/features/<feature>/hooks/use<Feature>.js` — lógica y estado
3. `src/features/<feature>/<Componente>.jsx` — UI
4. `src/routes/Routes.jsx` — agregar la ruta
5. *(si aplica)* `src/features/home/layouts/SidebarMenu.jsx` — enlace en menú

---

## Archivos que NO se modifican sin razón explícita

| Archivo                          | Razón                                          |
|----------------------------------|------------------------------------------------|
| `src/services/apiService.js`     | Instancia Axios global                         |
| `src/context/AuthContext.jsx`    | Lógica de JWT — afecta toda la app             |
| `src/routes/PrivateRoute.jsx`    | Guard de rutas privadas                        |
| `src/components/ui/Button.jsx`   | Componente base compartido en toda la UI       |
| `vite.config.js`                 | Config de build                                |
| `tailwind.config.js`             | Config de estilos globales                     |
| `eslint.config.js`               | Config de linting                              |
