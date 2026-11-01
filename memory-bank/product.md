# Producto

Panel de métricas financieras. La pantalla (`frontend/src/App.tsx`) muestra un encabezado, tres indicadores (ingresos, gastos, beneficio y porcentaje) y dos gráficos: ingresos frente a gastos, y porcentaje de beneficio por mes.

Los números salen de movimientos con fecha, importe, tipo (`income` o `outcome`), categoría y `B2B` o `B2C`. El navegador pide la lista a `GET /api/metrics` y calcula los indicadores en `frontend/src/lib/financial-utils.ts`.

No hay usuarios, login ni base de datos. Los movimientos los fabrica el backend en cada petición (`generate_mock_movements(seed=42)` en `backend/app/routes.py`).

La especificación de la raíz y de `frontend/specs/` describe un filtro de fechas, una tabla de alertas y una comparación B2B/B2C. Esas pantallas no están en `App.tsx`. El backend sí tiene rutas para ellas.
