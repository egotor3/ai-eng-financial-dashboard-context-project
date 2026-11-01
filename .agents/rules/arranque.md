# Arranque

Alcance: `docker-compose.yml`, `frontend/vite.config.ts`, `frontend/.env.example`, `backend/Dockerfile`, `README.es.md`.

Justificación: el proxy usa el host `backend` (`frontend/vite.config.ts`) y los puertos publicados están solo en `docker-compose.yml` (5173, 8000, 5678). `README.md` ya no describe el arranque.

Guía:

- Levantar el proyecto con `docker compose up --build` desde la raíz.
- No cambiar el target del proxy a `localhost` mientras el frontend corra dentro de Compose: el servicio se llama `backend`.
- No decir que `npm run dev` en el host ya llega a la API. En el host, `backend` no resuelve. Si hace falta ese modo, definir `VITE_API_BASE_URL` con un origen real.
- No quitar `debugpy` ni el puerto 5678 del `CMD` de `backend/Dockerfile` en un cambio que solo toque la API.
