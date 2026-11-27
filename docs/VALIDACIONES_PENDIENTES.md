# Validaciones de inputs — pendientes en el frontend

> El **backend ya aplica** estas reglas (desde el 27/11/2026). El front todavía no:
> hoy el usuario solo ve el error **después** de enviar, y en crear Job ni siquiera ve el motivo.
> Este documento lista qué hay que hacer para que el front valide igual que el backend.

## 1. Qué cambió en el backend (y puede romper el flujo actual)

| Cambio | Efecto en el front hoy |
|---|---|
| Contraseña con política fuerte al **registrarse** y al **restablecer** | Registrarse con `12345678` o `Clave12345` ahora responde **400**. |
| Nombre y apellidos: 2–50 caracteres, solo letras | Nombre `"A"` o `"Juan2"` ⇒ 400. |
| Segundo apellido **opcional** | El front lo exige; puede dejar de hacerlo (enviar `""` o no enviarlo es válido). |
| Teléfono: celular de 10 dígitos que empieza por 3 | `"12345"` ⇒ 400. |
| Edad mínima 14 años | Fecha muy reciente ⇒ 400. |
| Job: título 5–150, descripción 20–500, pago $1.000–$10.000.000 | Título `"a"` o pago `10` ⇒ 400. |
| Login | **Sin cambios.** Las cuentas existentes con claves débiles siguen entrando. |

El admin por defecto en dev pasó de `Admin12345` a **`Jobsi.Dev2026`** (`admin@jobsi.local`).

## 2. Formato de error del backend

Todas las respuestas 400 tienen esta forma:

```json
{ "status": 400, "message": "El nombre debe tener entre 2 y 50 caracteres. La contraseña debe tener al menos una letra mayúscula" }
```

- Si hay varios errores vienen en el mismo `message`, separados por `". "`.
- Los mensajes ya están en español y nombran el campo: se pueden mostrar tal cual.
- Endpoints afectados: `POST /v1/public/users/create`, `POST /v1/jobs/create`, `POST /auth/password/reset` (esta es la página Thymeleaf del backend; ya muestra el error).

## 3. Reglas exactas (copiar tal cual)

Fuente de verdad en el backend:
`Jobsi_Backend_Project/src/main/java/com/escaes/jobsy/application/validacion/ReglasValidacion.java` y `PoliticaClave.java`.

### Usuario (`POST /v1/public/users/create`)
| Campo | Regla | Regex / límites | Mensaje del backend |
|---|---|---|---|
| `nombre` | Obligatorio | 2–50, `^\p{L}+(?:[ '\-]\p{L}+)*$` (en JS: `/^\p{L}+(?:[ '\-]\p{L}+)*$/u`) | "El nombre debe tener entre 2 y 50 caracteres" / "El nombre solo puede contener letras, espacios, guion o apóstrofo" |
| `primerApellido` | Obligatorio | Igual que nombre | "El primer apellido …" |
| `segundoApellido` | **Opcional** (`""` o `null` válidos) | Si tiene texto: mismas reglas | "El segundo apellido debe tener al menos 2 caracteres y …" |
| `email` | Obligatorio | Email válido, máx. 100 | "El correo no tiene un formato válido" |
| `telefono` | Obligatorio | `/^3\d{9}$/` | "El teléfono debe ser un celular de 10 dígitos que empiece por 3" |
| `documento` | Obligatorio | Entero positivo, máx. 15 dígitos (sugerido en el front: mínimo 6) | "El documento debe tener máximo 15 dígitos" |
| `fechaNacimiento` | Obligatoria | Pasada y edad ≥ 14 | "Debes tener al menos 14 años para registrarte" |
| `password` | Obligatoria | Ver política abajo | Lista de requisitos incumplidos |

> Importante: el backend **no recorta espacios** antes de validar el patrón. `" Juan"` falla. Hacer `.trim()` a nombres y apellidos antes de enviar.

### Política de contraseña
Aplica en registro, restablecer contraseña y (cuando exista el endpoint) cambiar contraseña.

| Requisito | Comprobación JS sugerida | Mensaje del backend |
|---|---|---|
| 8 a 64 caracteres | `c.length >= 8 && c.length <= 64` | "…al menos 8 caracteres" / "…máximo 64 caracteres" |
| Una mayúscula | `/\p{Lu}/u` | "…al menos una letra mayúscula" |
| Una minúscula | `/\p{Ll}/u` | "…al menos una letra minúscula" |
| Un número | `/\d/` | "…al menos un número" |
| Un carácter especial | `/[^\p{L}\d]/u` | "…al menos un carácter especial (ej: . * # $ ! @)" |
| Sin espacios | `!/\s/.test(c)` | "La contraseña no puede contener espacios" |
| Sin nombre ni correo | Ver abajo | "La contraseña no puede contener tu nombre ni tu correo" |

Dato personal: pasar nombre y parte local del correo (antes de `@`) a minúsculas sin tildes
(`s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase()`), partirlos por todo lo que no sea `[a-z0-9]`,
descartar fragmentos de menos de 3 caracteres y verificar que ninguno esté contenido en la clave normalizada.
Ejemplo: nombre "María", correo `mjose@elpoli.edu.co` ⇒ `MARIA.2026` y `Mjose.2026` se rechazan.

### Job (`POST /v1/jobs/create`)
| Campo | Regla | Mensaje del backend |
|---|---|---|
| `titulo` | 5–150 caracteres y al menos una letra | "El título debe tener entre 5 y 150 caracteres" / "El título debe contener letras, no solo números o símbolos" |
| `descripcion` | 20–500 caracteres | "La descripción debe tener entre 20 y 500 caracteres" |
| `pago` | Número entre 1000 y 10000000 | "El pago mínimo es $1.000" / "El pago máximo es $10.000.000" |
| `tipoPago`, `ubicacion`, `categoria` | Obligatorios | "… es obligatorio/a" |

## 4. Tareas por archivo

### 4.1 Reglas compartidas — nuevo `src/utils/validaciones.js`
Exportar constantes (longitudes, regex) y funciones que devuelvan `null` si es válido o el mensaje de error:
`validarNombre(valor, etiqueta, {opcional})`, `validarCorreo`, `validarCelular`, `validarCedula`,
`validarFechaNacimiento`, `validarTitulo`, `validarDescripcion`, `validarPago`, y
`requisitosClave(clave, { nombre, correo })` que devuelva `[{ texto, cumple }]` para pintar el checklist.
Usar los mismos mensajes de la sección 3 para que front y back digan lo mismo.

### 4.2 Checklist de contraseña — nuevo `src/features/auth/components/RequisitosClave.jsx`
Lista en vivo (✓ cumplido / • pendiente) a partir de `requisitosClave`. Montarlo debajo del `PasswordField` en:
- `src/features/auth/components/RegisterForm.jsx` (paso 3).
- `src/features/configuracion/seguridad/Seguridad.jsx` — en `hooks/useSeguridad.js` reemplazar `MIN_LONGITUD = 8` por la política completa.
- `src/features/auth/components/recuperar/PasoNuevaContrasena.jsx` — en `hooks/useRecuperarContrasena.js` (línea ~142) reemplazar el chequeo de longitud.

### 4.3 Registro
- `src/features/auth/hooks/useRegister.js`
  - `errors` hoy guarda `true`; cambiar a **mensajes** (`errors.nombre = "El nombre debe tener…"`).
  - `nextStep()` y `handleSubmit()`: validar con `validaciones.js` por paso (paso 1 nombres, paso 2 cédula/celular/fecha, paso 3 correo/clave).
  - Quitar `segundoApellido` de los obligatorios.
  - `.trim()` a nombres, apellidos y correo antes de armar `data`.
  - No enviar si `requisitosClave` tiene algún requisito sin cumplir.
  - El `catch` ya muestra `error.message` del backend; mantenerlo. Ampliar el marcado de campos (hoy solo `documento`, `correo`, `teléfono`) con `nombre`, `apellido`, `contraseña`, `fecha`.
- `src/features/auth/components/FormField.jsx`: si `error` es string, mostrarlo bajo el input (`text-red-600 text-sm`); aceptar prop `required` (default `true`) para ocultar el `*` en el segundo apellido.
- `src/features/auth/components/RegisterForm.jsx`: `maxLength={50}` en nombres, `maxLength={100}` en correo, `maxLength={10}` en celular; cambiar cédula y celular de `type="number"` a `type="text" inputMode="numeric"` (con `type="number"` no funciona `maxLength` y se aceptan `e`, `-`, `.`).

### 4.4 Crear Job
- `src/services/jobsServices/jobPublicService.js` (`crearJob`): hoy descarta el mensaje del backend (`throw new Error("Error creando el Job")`). Leer el JSON y lanzar `responseData.message`, igual que `register` en `authServices.js`.
- `src/features/home/hooks/useCreateJob.js`
  - `validateFields()`: usar `validarTitulo`, `validarDescripcion`, `validarPago` (hoy solo revisa "no vacío").
  - En el `catch` mostrar `error.message` en vez de "Intenta nuevamente".
- `src/features/home/layouts/CreateJobModal.jsx`: mostrar `errors.<campo>` como texto bajo cada input, contador `n/150` y `n/500`, `maxLength` en título y descripción, `min={1000} max={10000000}` en el pago.
- `src/features/home/layouts/EditJobModal.jsx` está vacío: cuando se implemente, reusar las mismas funciones.

## 5. Pendiente fuera de este alcance
- `src/services/usuariosService.js` llama `PATCH /v1/usuarios/cambiar-contrasena`, pero **ese endpoint no existe en el backend**. La pantalla de Seguridad fallará hasta que se cree. Cuando se cree, aplicará la misma política (`PoliticaClave`).

## 6. Cómo probar
1. Backend: `mvnw.cmd spring-boot:test-run` (requiere Docker).
2. Front: `npm run dev`.
3. Casos mínimos:
   - Registro con nombre `"A"` ⇒ error bajo el campo sin llegar al backend.
   - Registro con clave `Clave12345` ⇒ checklist marca "carácter especial" pendiente, no deja enviar.
   - Registro sin segundo apellido ⇒ se crea la cuenta.
   - Crear Job con título `"a"` o pago `500` ⇒ error bajo el campo.
   - Forzar un 400 del backend (p. ej. desactivando la validación del front) ⇒ el Swal muestra el mensaje del backend, no uno genérico.
