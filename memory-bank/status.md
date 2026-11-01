# Estado actual

## Qué funciona en el código

- `GET /health` y `GET /api/metrics`, más facets, summary, top de categorías, comparison, alertas, b2b y b2c. Rutas en `backend/app/routes.py`, tests HTTP en `backend/tests/test_routes.py`.
- La pantalla carga `GET /api/metrics`, calcula KPI y pinta las dos gráficas (`frontend/src/App.tsx`).
- La etiqueta del periodo sale del año de `create_date`. Ya no está fija en 2024. Ver `docs/validacion-reglas.md`.
- Los cálculos de cliente tienen tests en `frontend/src/lib/financial-utils.test.ts`.

## Huecos comprobados

- La UI no llama al resto de rutas, aunque la spec de `frontend/specs/README.md` las describe.
- `frontend/src/lib/mock-data.ts` no se usa.
- `README.md` es la spec, no la guía de arranque. Esa guía sigue en `README.es.md` y en `docker-compose.yml`.
- Hay dos copias de la spec: la raíz y `frontend/specs/`.
- `frontend/specs/hola.md` está vacío.
- Este banco de memoria no incluye una ejecución de `docker compose up`. Los puertos salen del compose, no de un contenedor visto en marcha.

## Qué no es una prioridad inventada

No hay un plan de producto nuevo en este repositorio más allá de lo que la spec ya escribió y la pantalla aún no hace. Cualquier paso siguiente tiene que citar `backend/app/routes.py` o `frontend/src/App.tsx`, no una lista de features ajena al código.
