# Contrato de la API

Alcance: `backend/app/routes.py`, `frontend/src/App.tsx`.

Justificación: las rutas existen solo en `routes.py`. La pantalla actual llama únicamente a `GET /api/metrics`. `delta_pct` puede ser `null` y varias respuestas son listas.

Guía:

- Antes de usar un path, comprobar que el decorador está en `backend/app/routes.py`. No inventar endpoints.
- La UI de `App.tsx` no consume facets, summary, alertas, comparison, top, b2b ni b2c. Conectar una de esas rutas implica un `fetch` nuevo, no asumir que ya se llama.
- Fechas opcionales: omitir el query si no hay valor. No enviar `start_date` ni `end_date` como cadena vacía.
- `GET /api/metrics/comparison` exige las dos fechas (`Query(...)`).
- Una lista `[]` de alertas o de categorías es un estado vacío, no un error de red.
- Si `delta_pct` es `null`, no mostrarlo como `0`.
