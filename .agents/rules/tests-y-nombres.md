# Tests y nombres

Alcance: `backend/tests/test_routes.py`, `backend/tests/conftest.py`, `frontend/package.json`, `frontend/src/lib/financial-types.ts`, `backend/app/routes.py`.

Justificación: el backend se prueba con pytest en `test_routes.py`. El frontend, con Vitest (`npm test`). Los literales de tipo coinciden entre `routes.py` y `financial-types.ts`. El alias `@` es `frontend/src`.

Guía:

- Un filtro o ruta nueva en `routes.py` lleva un test HTTP en `backend/tests/test_routes.py`.
- Un cambio de fórmula en `financial-utils.ts` lleva un caso en `financial-utils.test.ts`.
- Usar los literales ya definidos: `income`/`outcome`, `B2B`/`B2C`, y las categorías `suppliers`, `sales`, `operational`, `administrative`, `others`. No introducir `ingreso` ni `b2b`.
- Importar código de `frontend/src` con el alias `@`, como hace `App.tsx`.
