export type BillingInterval = "monthly" | "yearly"
export type PlanKey = "lite" | "pro"

export const pricingProductIds = {
  lite: {
    monthly: process.env.NEXT_PUBLIC_CREEM_PRODUCT_ID_LITE_MONTHLY,
    yearly: process.env.NEXT_PUBLIC_CREEM_PRODUCT_ID_LITE_YEARLY,
  },
  pro: {
    monthly: process.env.NEXT_PUBLIC_CREEM_PRODUCT_ID_PRO_MONTHLY,
    yearly: process.env.NEXT_PUBLIC_CREEM_PRODUCT_ID_PRO_YEARLY,
  },
} as const

export const planDefinitions = [
  {
    key: "lite",
    name: "Lite",
    fallbackDescription: "For getting started with regular edits.",
    creditsPerMonth: 40,
    imagesPerMonth: 80,
    features: ["Commercial license", "Unlimited storage"],
  },
  {
    key: "pro",
    name: "Pro",
    fallbackDescription: "For creators who edit daily.",
    creditsPerMonth: 150,
    imagesPerMonth: 300,
    features: ["Everything in Lite", "Priority generation", "Dedicated support"],
    featured: true,
  },
] as const
