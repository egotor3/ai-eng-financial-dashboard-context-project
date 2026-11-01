# Cálculos en el cliente

Alcance: `frontend/src/lib/financial-utils.ts`, `frontend/src/lib/financial-utils.test.ts`, `frontend/src/components/dashboard/`.

Justificación: `computeKPIs` y `computeMonthlyData` calculan beneficio y porcentaje. `GET /api/metrics` devuelve movimientos, no KPI. `formatCurrency` usa USD y `en-US`.

Guía:

- Cambiar la fórmula solo en `financial-utils.ts` y actualizar `financial-utils.test.ts` en el mismo cambio.
- Los componentes leen el resultado. No volver a sumar importes dentro de `kpi-card.tsx` ni de las gráficas.
- No añadir `totalIncome` o `profitPercent` al modelo `FinancialMovement` del backend para esta pantalla.
