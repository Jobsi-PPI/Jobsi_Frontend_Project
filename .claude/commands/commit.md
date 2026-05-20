Genera el mensaje de commit para los cambios recién implementados.

## Formato

```
feat(<scope>): <Descripción corta en español, mayúscula inicial>
```

- `<scope>`: nombre del feature en minúsculas (ej: `postulaciones`, `calificaciones`, `perfil`, `jobs`, `auth`).
- La descripción debe decir QUÉ se agregó, no cómo.
- Si el feature pertenece a un área mayor, usar el prefijo `<Área>:` dentro de la descripción.

## Ejemplos del proyecto

```
feat: Calificación: Interfaz para calificar al finalizar un Job
feat: Calificación: Mostrar calificación promedio en el perfil
feat: Mostrar calificación en lista de postulaciones
feat: Calificación: Botón para finalizar un Job
```

## Instrucción

Revisa los archivos modificados en esta sesión y propón el mensaje de commit.
No uses `git commit` — solo presenta el mensaje para que yo lo apruebe antes.
