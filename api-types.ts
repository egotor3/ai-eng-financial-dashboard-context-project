/**
 * Response shapes from backend/app/routes.py (OpenAPI /docs).
 * Spec only — no React, no fetch.
 */

import type {
  BusinessType,
  Category,
  OperationType,
} from "./param-types"

export interface FinancialMovement {
  create_date: string
  amount: number
  operation_type: OperationType
  category: Category
  business_type: BusinessType
}

export type MetricsListResponse = FinancialMovement[]

export interface FacetsResponse {
  operation_types: OperationType[]
  business_types: BusinessType[]
  categories: Category[]
  min_date: string
  max_date: string
}

export interface SummaryEntry {
  period: string
  income: number
  outcome: number
  net: number
}

export type SummaryResponse = SummaryEntry[]

export interface CategoryEntry {
  category: Category
  operation_type: OperationType
  total_amount: number
}

export type TopCategoriesResponse = CategoryEntry[]

export interface ComparisonResponse {
  current_period: number
  previous_period: number
  delta_abs: number
  delta_pct: number | null
}

export interface AlertEntry {
  period: string
  outcome_total: number
  baseline_average: number
  increase_ratio: number
}

export type AlertsResponse = AlertEntry[]

export interface HealthResponse {
  status: string
}
