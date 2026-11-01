# Datos y etiqueta de periodo

Alcance: `backend/app/routes.py`, `frontend/src/App.tsx`, `frontend/src/components/dashboard/dashboard-header.tsx`, `frontend/src/lib/mock-data.ts`.

Justificación: la API regenera movimientos con `generate_mock_movements(seed=42)` y el año sale de `date.today()` en `_year_for_month`. `mock-data.ts` no se importa. La etiqueta visible no puede quedar fija en 2024.

Guía:

- Tratar `GET /api/metrics` como la fuente de la pantalla. No sustituir la respuesta por `mockMovements`.
- No escribir un año fijo en el badge. Derivar la etiqueta de `create_date` en los movimientos que acaba de devolver la API.
- No asumir que el seed hace los datos eternos: el mismo seed cambia de año cuando cambia el mes actual, por `_year_for_month`.
