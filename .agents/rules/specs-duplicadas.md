# Especificaciones duplicadas

Alcance: `api-types.ts`, `param-types.ts`, `components.md`, `specs-first.md` en la raíz, y la carpeta `frontend/specs/`.

Justificación: hay dos copias de la especificación. El comportamiento que se ejecuta está en `backend/app/routes.py` y `frontend/src/App.tsx`.

Guía:

- Si la spec y el código no dicen lo mismo, seguir el código y corregir la spec.
- Un cambio de contrato se refleja en las dos copias, o se deja escrito por qué una queda obsoleta.
- No dar por hecho que `frontend/specs/hola.md` documenta nada: está vacío.
