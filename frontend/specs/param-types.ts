/**
 * Query params for the financial dashboard API.
 * Spec only — no fetch, no React.
 */

/** ISO date YYYY-MM-DD. Omit the param instead of sending "". */
export type IsoDate = string

export type OperationType = "income" | "outcome"
export type Category =
  | "suppliers"
  | "sales"
  | "operational"
  | "administrative"
  | "others"
export type BusinessType = "B2B" | "B2C"
export type GroupBy = "day" | "week" | "month"

/** Shared date window. Both fields optional. */
export interface DateRangeFilter {
  /** Inclusive start. Must be <= end_date when both are set. */
  start_date?: IsoDate
  /** Inclusive end. Must be >= start_date when both are set. */
  end_date?: IsoDate
}

export interface MetricsListParams extends DateRangeFilter {
  category?: Category
  operation_type?: OperationType
}

export interface SummaryParams extends DateRangeFilter {
  group_by?: GroupBy
  category?: Category
  operation_type?: OperationType
  business_type?: BusinessType
}

export interface TopCategoriesParams extends DateRangeFilter {
  operation_type?: OperationType
  /** Backend: 1..20. Default 5. */
  limit?: number
  business_type?: BusinessType
}

export interface ComparisonParams {
  start_date: IsoDate
  end_date: IsoDate
  business_type?: BusinessType
}

export interface AlertsParams extends DateRangeFilter {
  /** Default 0.3. Backend accepts >= 0. UI should clamp to 0.01..1. */
  threshold?: number
  group_by?: GroupBy
  business_type?: BusinessType
}
