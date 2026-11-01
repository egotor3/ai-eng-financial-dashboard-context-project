# Stack

| Capa | Qué usa | Dónde |
| --- | --- | --- |
| Frontend | React 19, TypeScript, Vite 8, Tailwind CSS 4 (`@tailwindcss/vite`), Recharts | `frontend/package.json` |
| Tests de UI | Vitest | script `test` en `frontend/package.json` |
| Backend | Python, FastAPI, uvicorn, Pydantic, pytest, httpx | `backend/requirements.txt`, `backend/app/main.py` |
| Depuración | debugpy en el puerto 5678, dentro del mismo comando que uvicorn | `backend/Dockerfile` |
| Arranque | Docker Compose, dos servicios | `docker-compose.yml` |
| Puertos publicados | 5173 frontend, 8000 API, 5678 debugpy | `docker-compose.yml` |
| Proxy | `/api` → `http://backend:8000` | `frontend/vite.config.ts` |

No hay Postgres ni otro servicio de datos en `docker-compose.yml`. El alias `@` del frontend apunta a `frontend/src`.
