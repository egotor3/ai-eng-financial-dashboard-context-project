# Validación de las reglas

Tarea pequeña usada para probar `.agents/rules/datos-y-periodo.md`: la etiqueta del periodo no puede decir 2024 si los movimientos traen otro año.

Antes, `frontend/src/App.tsx` pasaba `period="2024 - Full Year"` y el default de `dashboard-header.tsx` era `2024 — Full Year`.

Después, `periodLabelFromMovements` lee el año de `create_date` en la lista que devuelve `GET /api/metrics`. Si todos los años coinciden, el badge muestra ese año. Si no, muestra el primero y el último. El default del header pasa a `Periodo no disponible`, que es lo que se ve mientras la petición no ha vuelto.

No se tocó la fórmula de los KPI. Esa otra regla (`calculos-cliente.md`) no pedía este cambio.
