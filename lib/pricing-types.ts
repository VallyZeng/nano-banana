import type { BillingInterval, PlanKey } from "@/lib/pricing-config"

export type PricingProduct = {
  id: string
  name: string
  description: string | null
  price: number | null
  currency: string | null
  billingPeriod: string | null
  billingType: string | null
  features: string[]
}

export type PricingProducts = Record<
  PlanKey,
  Record<BillingInterval, PricingProduct | null>
>
