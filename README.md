# Specs del dashboard financiero

Autora: Elena Gotor (`egotor3`).  
Capa de **especificación** para el fork [ai-eng-financial-dashboard-context-project](https://github.com/egotor3/ai-eng-financial-dashboard-context-project).

No hay componentes React ni `fetch` en esta carpeta. El frontend actual solo llama a `GET /api/metrics`. El backend ya expone el resto; aquí se documenta cómo usarlo.

Revisado contra `backend/app/routes.py` y los tests de `backend/tests/test_routes.py`.

## Archivos

| Archivo | Qué es |
| --- | --- |
| `api-types.ts` | Formas de las respuestas |
| `param-types.ts` | Query params |
| `components.md` | Cajas de UI y casos vacíos |
| `tsconfig.json` | TypeScript estricto para validar los tipos |

Comprobar tipos:

```bash
npx tsc --noEmit --project frontend/specs/tsconfig.json
```

## Mapa feature → endpoint

| Feature | Endpoints | Params | Respuesta |
| --- | --- | --- | --- |
| Actual (ya en `App.tsx`) | `GET /api/metrics` | `MetricsListParams` | `FinancialMovement[]` |
| F1 Filtro de fechas | `GET /api/metrics/facets` + recargar métricas con fechas | `DateRangeFilter` | `FacetsResponse` |
| F2 Tabla de alertas | `GET /api/metrics/alerts` | `AlertsParams` | `AlertEntry[]` |
| F3 B2B vs B2C | `GET /api/metrics/categories/top` (dos veces) | `TopCategoriesParams` | `CategoryEntry[]` |

Otros endpoints del backend (no son las 3 features, pero existen):  
`/health`, `/api/metrics/summary`, `/api/metrics/comparison`, `/api/metrics/b2b`, `/api/metrics/b2c`.

## Valores válidos

| Campo | Restricción |
| --- | --- |
| `start_date` / `end_date` | `YYYY-MM-DD`. No enviar `""`. |
| `threshold` (F2) | UI 0.01–1.0. Backend `>= 0`. Default 0.3 |
| `operation_type` (F3) | F3 envía siempre `income` |
| `limit` (F3) | 1–20. F3 envía `5` |
| `business_type` (F3) | `B2B` o `B2C` (una llamada por lado) |
| `group_by` | `day` \| `week` \| `month` |

- `FacetsResponse.min_date <= max_date`
- `AlertsResponse` y `TopCategoriesResponse` son **arrays**. `[]` no es error
- `ComparisonResponse.delta_pct` puede ser `null` si el periodo anterior vale 0

## Casos límite (≥ 2 por feature)

### F1 Fechas

- **E1.1** Ambos vacíos: no mandar fechas; se ve todo el histórico. La etiqueta del rango disponible sigue saliendo.
- **E1.2** Solo un lado: válido. No rellenar el otro automático.
- **E1.3** start > end: aviso, pero se envía igual. El backend puede devolver lista vacía.

### F2 Alertas

- **E2.1** `[]`: mensaje de vacío; la tabla y el umbral siguen visibles.
- **E2.2** Cambio de umbral mientras carga: no pintar la respuesta vieja.
- **E2.3** El rango de F1 deja el array vacío: mismo vacío que E2.1.

### F3 B2B / B2C

- **E3.1** Un lado vacío: panel vacío; el otro normal.
- **E3.2** Los dos vacíos: overlay en el gráfico.
- **E3.3** Categorías distintas: no alinear filas entre paneles.

## Qué no entra en esta entrega

- Implementar las pantallas
- Elegir librería de rutas
- Generar tipos desde OpenAPI (ahora van a mano)
