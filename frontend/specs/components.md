# Componentes previstos (specs)

Solo diseño. No implementar React en esta entrega.

Hoy el frontend (`App.tsx`) carga `GET /api/metrics` y muestra KPIs + dos gráficos. El backend ya tiene filtros, alertas y B2B/B2C. Estas specs cubren **tres features nuevas** encima de eso.

## Layout

```
DashboardPage
  DashboardHeader
  DateRangeFilter          (F1)
  KPIRow                   (ya existe; se recarga con el rango)
  IncomeOutcomeChart       (ya existe; se recarga)
  ProfitPercentChart       (ya existe; se recarga)
  AlertsTable              (F2)
  BusinessLinesCompare     (F3)
    BusinessLinePanel (B2B)
    BusinessLinePanel (B2C)
```

---

## F1 — DateRangeFilter

**Props**

| Prop | Tipo | Notas |
| --- | --- | --- |
| `minDate` | `string` | De `FacetsResponse.min_date` |
| `maxDate` | `string` | De `FacetsResponse.max_date` |
| `startDate` | `string \| null` | Controlado por el padre |
| `endDate` | `string \| null` | Controlado por el padre |
| `onChange` | `(next: { startDate: string \| null; endDate: string \| null }) => void` | |
| `warning` | `string \| null` | Si start > end |

**UI:** dos inputs `type="date"`. Etiqueta de ayuda: `Rango disponible: {minDate} – {maxDate}`.

**Condicional**

- Ambos vacíos: no se envían `start_date` ni `end_date`.
- Solo uno relleno: se envía solo ese. No autocompletar el otro.
- `start > end`: aviso no bloqueante; la petición igual se lanza.

**Datos:** `GET /api/metrics/facets` una vez. Luego los endpoints de métricas con el rango.

---

## F2 — AlertsTable

**Props**

| Prop | Tipo | Notas |
| --- | --- | --- |
| `alerts` | `AlertEntry[]` | |
| `threshold` | `number` | Default 0.3 |
| `onThresholdChange` | `(value: number) => void` | |
| `loading` | `boolean` | |
| `error` | `string \| null` | |
| `emptyMessage` | `string` | |

**UI:** input umbral + tabla: periodo, outcome, media, ratio.

**Condicional**

- `alerts.length === 0` y no hay error: una fila *No se detectaron anomalías para un umbral de X%. Prueba a bajarlo.*
- `error`: banner; no mostrar filas viejas.
- Petición en vuelo al cambiar umbral: ignorar la respuesta antigua (`AbortController` o id monotónico).

**Datos:** `GET /api/metrics/alerts?threshold=&start_date=&end_date=`

---

## F3 — BusinessLinesCompare

**Props del contenedor**

| Prop | Tipo |
| --- | --- |
| `b2b` | `CategoryEntry[]` |
| `b2c` | `CategoryEntry[]` |
| `loading` | `boolean` |
| `error` | `string \| null` |

Dos `BusinessLinePanel`: título B2B / B2C, lista top 5 ingresos.

**Condicional**

- Un lado `[]`: *No hay ingresos {línea} en este rango.* El otro sigue.
- Ambos `[]`: overlay en el gráfico *Sin ingresos B2B ni B2C en este rango.*
- Categorías distintas entre lados: no alinear filas.

**Datos:** dos llamadas  
`GET /api/metrics/categories/top?operation_type=income&limit=5&business_type=B2B`  
y lo mismo con `B2C`, más el rango de F1.
