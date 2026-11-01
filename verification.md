# Verificación del handover

Fecha: 2026-11-01. Cada afirmación se contrastó con un archivo del repositorio. Docker no se arrancó en esta sesión: lo que está marcado como verificado sale del código, no de un proceso en marcha.

Leyenda: ✅ verificado en código · ❌ incorrecto · ❓ sin verificar en ejecución.

## Mapa comprobado

| Pieza | Ruta | Punto de entrada |
| --- | --- | --- |
| Frontend | `frontend/` | `frontend/src/main.tsx` monta `App.tsx`. Imagen: `frontend/Dockerfile` ejecuta `npm run dev` en el puerto 5173. |
| Backend | `backend/` | `backend/app/main.py` crea la app FastAPI e incluye `backend/app/routes.py`. Imagen: `backend/Dockerfile` arranca uvicorn en el puerto 8000, con debugpy en el 5678. |
| Orquestación | `docker-compose.yml` | Servicios `frontend` y `backend`. El frontend depende del backend. |

## Qué hace la aplicación

✅ Es un panel de métricas financieras (ingresos, gastos, beneficio y gráficos). Lo dice `README.es.md` y lo pinta `frontend/src/App.tsx` con `KPIRow`, `IncomeOutcomeChart` y `ProfitPercentChart`.

✅ El navegador solo pide `GET /api/metrics`. La llamada está en `fetchFinancialData` dentro de `frontend/src/App.tsx`. No hay otra llamada `fetch` en `frontend/src`.

✅ Los totales no los calcula el backend para esa pantalla. `computeKPIs` y `computeMonthlyData` están en `frontend/src/lib/financial-utils.ts` y se aplican a la lista de movimientos.

❌ El encabezado no describe el año de los datos. `frontend/src/App.tsx` pasa `period="2024 - Full Year"`. El backend construye fechas con `date.today()` en `_year_for_month` (`backend/app/routes.py`), así que el año real cambia con el calendario. El valor por defecto del componente, `2024 — Full Year` en `dashboard-header.tsx`, tampoco sale de los datos.

## Cómo se conectan frontend y backend

✅ Dentro de Compose, Vite reenvía `/api` a `http://backend:8000`. Está en `frontend/vite.config.ts`. El nombre `backend` es el servicio de `docker-compose.yml`.

✅ Si `VITE_API_BASE_URL` viene vacío, `App.tsx` usa la cadena vacía y la petición es relativa (`/api/metrics`). El ejemplo `frontend/.env.example` deja esa variable vacía.

❌ Esa misma variable no hace falta “en local” para que el proxy funcione, pese a lo que dice el comentario de `frontend/.env.example`. El proxy apunta al host `backend`, que solo existe en la red de Compose. En el host, `npm run dev` no resuelve ese nombre. Para hablar con un backend en el host haría falta `VITE_API_BASE_URL` apuntando a un origen real, por ejemplo el puerto publicado del backend.

✅ CORS del backend acepta cualquier origen: `allow_origins=["*"]` en `backend/app/main.py`.

## Cómo se ejecuta

✅ El arranque documentado que sigue en pie está en `README.es.md` y en `docker-compose.yml`: `docker compose up --build`.

✅ Puertos publicados por ese archivo, no supuestos: frontend `5173:5173`, backend `8000:8000` y depurador `5678:5678`.

✅ El proceso del backend no es solo uvicorn. `backend/Dockerfile` lanza `debugpy` escuchando en `0.0.0.0:5678` y después uvicorn con `--reload`.

❌ `README.md` ya no explica cómo arrancar el proyecto. Su contenido actual es la especificación de features (filtro de fechas, alertas, B2B/B2C). `README.es.md` sigue enlazando ese archivo como “instrucciones en inglés”. Ese enlace está roto respecto al contenido.

❓ No se ejecutó `docker compose up` en esta sesión. Los puertos y el comando salen de los archivos; no hay comprobación de que el contenedor llegue a “healthy”.

## Datos

✅ No hay base de datos en `docker-compose.yml`. Cada petición regenera movimientos con `generate_mock_movements(seed=42)` en `backend/app/routes.py`.

✅ El generador crea 12 meses × 30 movimientos. El test `test_generate_mock_movements_returns_full_year_sorted_data` espera 360 filas ordenadas por fecha (`backend/tests/test_routes.py`).

❌ `frontend/src/lib/mock-data.ts` no alimenta la pantalla. Nada importa `mockMovements`. Es una lista fija de 2024, distinta de la que devuelve la API.

## Contrato que existe y la UI no usa

✅ Además de `GET /api/metrics` y `GET /health`, `backend/app/routes.py` expone:

- `GET /api/metrics/facets`
- `GET /api/metrics/summary`
- `GET /api/metrics/categories/top`
- `GET /api/metrics/comparison`
- `GET /api/metrics/alerts`
- `GET /api/metrics/b2b`
- `GET /api/metrics/b2c`

Esos caminos tienen tests en `backend/tests/test_routes.py`. La UI de `App.tsx` no los llama.

## Tests

✅ Backend: pytest, cliente de prueba en `backend/tests/test_routes.py`. `backend/tests/conftest.py` mete la carpeta `backend` en `sys.path`.

✅ Frontend: Vitest, script `test` en `frontend/package.json`, casos en `frontend/src/lib/financial-utils.test.ts`. Cubren las funciones de cálculo, no la llamada a la API.

❓ Esos tests no se han vuelto a lanzar en esta sesión.
