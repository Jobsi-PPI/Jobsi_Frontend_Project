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
| vaul             | 1.x     | Bottom sheets en móvil                      |
| date-fns         | 4       | Formato de fechas                           |

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
├── assets/            # Imágenes (se importan, ver "Imágenes e imports")
├── context/           # AuthContext (user, token, login, logout)
├── routes/            # Routes.jsx, PrivateRoute.jsx
├── services/          # Llamadas HTTP con Axios
│   ├── apiService.js              ← instancia global — no modificar sin consenso
│   ├── authServices.js
│   ├── usuariosService.js
│   └── jobsServices/
│       ├── jobPublicService.js
│       ├── misJobsService.js
│       ├── postulacionesService.js
│       └── calificacionesService.js
├── features/          # Una carpeta por dominio de negocio
│   ├── auth/          # Login, Register, components/ (LoginForm, RegisterForm, FormField, PasswordField, RegisterStepHeader), hooks/ (useRegister, useCerrarSesion)
│   ├── home/          # Home, ExplorarJobs, JobCard, ChatConversation, HeroCarousel, hooks/, layouts/ (CreateJobModal, EditJobModal)
│   ├── jobs/          # VerMisJobs, JobPublicadoCard, JobPostuladoCard
│   ├── postulaciones/
│   ├── calificaciones/
│   ├── perfil/
│   └── configuracion/
├── components/
│   ├── layout/        # Header, HeaderConfiguracion, Footer, TabBarMobile, MenuSheet (móvil), UserMenu (escritorio)
│   ├── ui/            # Button, EstrellasCalificacion, Tooltip
│   │   ├── modals/    # ComingSoonModal, ErrorBackendModal, NoInternetModal, hooks/ (useModalState, useIsMobile)
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
// role: viene del JWT con prefijo ROLE_ (ej. ROLE_USER)
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

### Modales y bottom sheets

- Modales centrados y avisos: siempre `useModalState` → `{ isOpen, closing, opening, openModal, closeModal }`.
- Bottom sheets (solo móvil): Vaul (`Drawer`), controlados con `open` / `onOpenChange`, siempre con `Drawer.Title` y `Drawer.Description` (puede ser `sr-only`).
- Un mismo componente puede ser sheet en móvil y modal en escritorio: `useIsMobile()` (< 768 px) decide cuál se renderiza (ver `CreateJobModal`).
- Si una opción de un sheet abre un SweetAlert o un modal, esperar ~550 ms tras cerrarlo (ver `MenuSheet`): Vaul no dispara `onAnimationEnd` cuando el cierre lo provoca el padre, y Radix bloquea los clics durante la animación.

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
- `<EmptyState ... iconClassName="h-14 w-14 bg-[#fde8d0]" />` — `iconClassName` opcional para personalizar el círculo del ícono
- `<FormField label error onChange />` y `<PasswordField />` (`features/auth/components/`) — label con asterisco, input y borde de error; `onChange` recibe el valor, no el evento
- `<Footer className="mt-0" />` — `className` controla el margen superior (por defecto `mt-20`)

### Responsive

Mobile-first. El corte móvil/escritorio es `md:` (768 px): el tab bar es `md:hidden`, el menú de usuario del header es `hidden md:block` y `useIsMobile()` usa el mismo límite. Para estilos solo móviles usar `max-md:`; `sm:` y `lg:` para ajustes finos. Contenedores: `max-w-4xl` / `max-w-6xl mx-auto` (Home y Header usan `max-w-[1500px]`).

### Estilos: gotchas de Tailwind 4

- `src/index.css` define estilos globales para `<a>` y `<button>` (color, fondo, padding, borde) fuera de `@layer`, y ganan sobre las utilidades normales. En `<button>` y `<a>` propios usar el modificador `!` (`!bg-white`, `!p-0`, `!border-0`, `!text-black`). El componente `Button` ya lo resuelve.
- El anillo de foco debe verse solo con teclado: usar `focus-visible:`, no `focus:`.
- Barras fijas abajo (tab bar): respetar `env(safe-area-inset-bottom)`; `TabBarMobile` ya trae su espaciador para no tapar el footer.

### Imágenes e imports

- Las imágenes de `src/assets/` se importan: `import logo from "../../assets/Jobsi_home_logo.png"`. Nunca `src="/src/assets/..."`: funciona en dev pero no entra al build de producción. El favicon y los archivos estáticos van en `public/`.
- Los imports deben coincidir **exactamente** en mayúsculas con el nombre del archivo (`Header.jsx`, `Footer.jsx`): Windows no distingue, pero Linux y CI sí, y el build fallaría.

### Comentarios

Sin comentarios salvo que el WHY sea no obvio.

---

## Flujo para un feature nuevo

1. `src/services/jobsServices/<nombre>Service.js` — funciones de API
2. `src/features/<feature>/hooks/use<Feature>.js` — lógica y estado
3. `src/features/<feature>/<Componente>.jsx` — UI
4. `src/routes/Routes.jsx` — agregar la ruta
5. *(si aplica)* enlace en el menú: `components/layout/UserMenu.jsx` (escritorio) y `MenuSheet.jsx` (móvil); y en `TabBarMobile.jsx` si va en la barra inferior

---

## Git y pull requests

- `main` está protegida: todo cambio entra por pull request. Flujo del equipo: rama de trabajo (`feat/...`, `fix/...`) → PR a `dev` → PR de `dev` a `main`.
- Antes de reutilizar una rama ya mergeada: `git merge --ff-only origin/main`.
- Commits en español con el formato `<tipo>(<scope>): Descripción`, donde el tipo es `feat`, `fix`, `refactor` o `docs` (ver `.claude/commands/commit.md`). Si cierra un issue, `Closes #N` al final (GitHub lo cierra cuando el commit llega a `main`).
- Comandos del proyecto en `.claude/commands/`: `commit`, `nuevo-endpoint`, `nuevo-issue`.

---

## Panel admin (planeado)

Se hará dentro de este mismo proyecto, aislado para poder extraerlo a un repo propio más adelante:

- UI en `src/features/admin/` con layout propio de escritorio (sin el `Header` ni el tab bar de estudiantes); rutas en `adminRoutes.jsx` con `React.lazy`; servicios en `src/services/adminServices/`.
- Guard `AdminRoute` por rol, sin modificar `PrivateRoute.jsx`. Es solo UX: la protección real son los endpoints `/v1/admin/**` del backend, que valida el rol.
- Dependencias compartidas limitadas a `Button`, `EmptyState`, `apiService` y `AuthContext`.
- Alcance inicial: dashboard de métricas, gestión de usuarios y moderación de jobs. Seguimiento en el issue #65.

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
