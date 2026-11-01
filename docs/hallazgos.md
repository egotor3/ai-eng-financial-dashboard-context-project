# Hallazgos de ingeniería

Solo entran hechos ligados a un archivo. Cada uno se convierte en una regla propuesta para `.agents/rules/`.

## Arquitectura

1. La pantalla y la API están separadas. El navegador pide movimientos y calcula los KPI en el cliente (`frontend/src/App.tsx`, `frontend/src/lib/financial-utils.ts`). El backend no devuelve `totalIncome` ni `profitPercent`.
   - Regla propuesta: no duplicar esas fórmulas en un componente ni inventar un campo de KPI en la respuesta de `GET /api/metrics`.

2. El proxy de Vite apunta al host `backend`, puerto 8000 (`frontend/vite.config.ts`). Ese nombre es el servicio de `docker-compose.yml`.
   - Regla propuesta: no cambiar el target a `localhost` dentro del contenedor, y no documentar `npm run dev` en el host como si ese proxy ya llegara a la API.

3. `README.md` ya no es la guía de arranque. El comando y los puertos siguen en `README.es.md` y `docker-compose.yml` (5173, 8000 y 5678).
   - Regla propuesta: para levantar el proyecto, leer `docker-compose.yml`. No restaurar el README inglés encima de la especificación sin decidir cuál de los dos documentos manda.

## Contrato de la API

4. La lista de rutas está en `backend/app/routes.py`. La UI solo usa `GET /api/metrics` (`frontend/src/App.tsx`).
   - Regla propuesta: una ruta nueva se añade en `routes.py` y, si la pantalla debe usarla, en el `fetch` correspondiente. No inventar paths que no estén en ese archivo.

5. Los query de fecha son `date | None` con default `None`. Una fecha ausente no se envía. `GET /api/metrics/comparison` exige `start_date` y `end_date` (`Query(...)`).
   - Regla propuesta: no mandar `start_date=` ni `end_date=` vacíos. En comparison, no llamar sin las dos fechas.

6. `GET /api/metrics/alerts` y `GET /api/metrics/categories/top` responden listas. El test de alertas acepta una lista vacía (`backend/tests/test_routes.py`).
   - Regla propuesta: `[]` es un estado vacío de UI, no un fallo de red.

7. `delta_pct` es `float | None` y queda en `None` cuando el periodo anterior es 0 (`calculate` en `get_metrics_comparison`, `backend/app/routes.py`).
   - Regla propuesta: no pintar `delta_pct` como `0` cuando el JSON trae `null`.

## Datos

8. Cada endpoint regenera el mismo mock con `generate_mock_movements(seed=42)`. El año de cada mes depende de `date.today()` (`_year_for_month`).
   - Regla propuesta: no hardcodear 2024 como el año de los datos de la API. No sustituir la respuesta real por `frontend/src/lib/mock-data.ts`: ese archivo no se importa.

9. La etiqueta del periodo está fija en `frontend/src/App.tsx` (`"2024 - Full Year"`) y el default de `dashboard-header.tsx` también dice 2024.
   - Regla propuesta: la etiqueta visible tiene que salir de `create_date` de los movimientos cargados.

## Cálculo y formato

10. Beneficio y porcentaje viven en `computeKPIs` y `computeMonthlyData`. El porcentaje es beneficio / ingreso × 100, o 0 si el ingreso es 0. El dinero se formatea en USD con `en-US` (`formatCurrency`).
    - Regla propuesta: un cambio de fórmula se hace en `financial-utils.ts` y se refleja en `financial-utils.test.ts`. Los componentes solo llaman a esas funciones.

## Tests y nombres

11. Backend: funciones con `test_` en `backend/tests/test_routes.py`, pytest, `conftest.py` añade `backend` al path. Frontend: `describe`/`it` de Vitest junto al módulo, script `npm test` en `frontend/package.json`.
    - Regla propuesta: un filtro nuevo de `routes.py` lleva un test HTTP en ese archivo. Un cambio de `financial-utils.ts` lleva un caso en el test de al lado.

12. Alias de imports del frontend: `@` apunta a `frontend/src` (`frontend/vite.config.ts` y `frontend/tsconfig.app.json`). Tipos de dominio en `frontend/src/lib/financial-types.ts`, con los mismos literales que `OperationType`, `Category` y `BusinessType` de `routes.py`.
    - Regla propuesta: no crear un tercer juego de literales (`"b2b"`, `"ingreso"`). Reutilizar los de `financial-types.ts` en el cliente y los de `routes.py` en el servidor.

## Documentación duplicada

13. Hay tipos y params en la raíz (`api-types.ts`, `param-types.ts`, `components.md`, `tsconfig.json`, `specs-first.md`) y otra copia en `frontend/specs/`. El comportamiento real está en `backend/app/routes.py` y `frontend/src/App.tsx`.
    - Regla propuesta: si una spec y el código discrepan, manda el código. No editar solo la copia de la raíz y dejar `frontend/specs/` al revés.
