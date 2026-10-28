Genera el mensaje de commit para los cambios recién implementados.

## Formato

```
<tipo>(<scope>): <Descripción corta en español, mayúscula inicial>
```

- `<scope>`: nombre del feature en minúsculas (ej: `postulaciones`, `calificaciones`, `perfil`, `jobs`, `auth`).
- Si el cambio no pertenece a un solo feature, se omite el scope (ej: `fix: ...`, `docs: ...`).
- La descripción debe decir QUÉ cambió, no cómo.
- Si el feature pertenece a un área mayor, usar el prefijo `<Área>:` dentro de la descripción.

## Tipos

| Tipo       | Cuándo usarlo                                                       |
|------------|---------------------------------------------------------------------|
| `feat`     | Funcionalidad o diseño nuevo                                        |
| `fix`      | Corrección de un error                                              |
| `refactor` | Reorganizar o limpiar código sin cambiar su comportamiento          |
| `docs`     | Cambios solo de documentación (ej: `CLAUDE.md`, `.claude/`)         |

## Ejemplos del proyecto

```
feat: Calificación: Interfaz para calificar al finalizar un Job
feat: Calificación: Mostrar calificación promedio en el perfil
feat: Mostrar calificación en lista de postulaciones
feat: Calificación: Botón para finalizar un Job
fix: Corregir mayúscula en el import del Header
refactor(jobs): Mover la lógica de los modales de Mis Jobs a sus hooks
docs: Actualizar CLAUDE.md con las convenciones nuevas del proyecto
```

## Instrucción

Revisa los archivos modificados en esta sesión y propón el mensaje de commit.
No uses `git commit` — solo presenta el mensaje para que yo lo apruebe antes.
