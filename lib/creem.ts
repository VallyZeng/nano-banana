import {
  planDefinitions,
  pricingProductIds,
  type BillingInterval,
  type PlanKey,
} from "@/lib/pricing-config"
import type { PricingProduct, PricingProducts } from "@/lib/pricing-types"

type CreemProductResponse = {
  id: string
  name: string
  description?: string | null
  price?: number | null
  currency?: string | null
  billing_period?: string | null
  billing_type?: string | null
  features?: Array<{ description?: string | null }>
}

const CREEM_REVALIDATE_SECONDS = 300

function getCreemApiBaseUrl() {
  return process.env.CREEM_TEST_MODE === "true"
    ? "https://test-api.creem.io"
    : "https://api.creem.io"
}

async function fetchCreemProduct(
  apiKey: string,
  productId: string,
): Promise<PricingProduct | null> {
  const response = await fetch(
    `${getCreemApiBaseUrl()}/v1/products?product_id=${encodeURIComponent(
      productId,
    )}`,
    {
      headers: {
        "x-api-key": apiKey,
      },
      next: { revalidate: CREEM_REVALIDATE_SECONDS },
    },
  )

  if (!response.ok) {
    return null
  }

  const data = (await response.json()) as CreemProductResponse

  return {
    id: data.id,
    name: data.name,
    description: data.description ?? null,
    price: data.price ?? null,
    currency: data.currency ?? null,
    billingPeriod: data.billing_period ?? null,
    billingType: data.billing_type ?? null,
    features:
      data.features
        ?.map((feature) => feature.description?.trim())
        .filter((feature): feature is string => Boolean(feature)) ?? [],
  }
}

function createEmptyPricingProducts(): PricingProducts {
  return {
    lite: { monthly: null, yearly: null },
    pro: { monthly: null, yearly: null },
    enterprise: { monthly: null, yearly: null },
  }
}

export async function getPricingProducts(): Promise<PricingProducts> {
  const apiKey = process.env.CREEM_API_KEY
  const products = createEmptyPricingProducts()

  if (!apiKey) {
    return products
  }

  const tasks: Array<
    Promise<{
      key: PlanKey
      interval: BillingInterval
      product: PricingProduct | null
    }>
  > = []

  for (const plan of planDefinitions) {
    const planKey = plan.key as PlanKey
    const planIds = pricingProductIds[planKey]

    if (!planIds) {
      continue
    }

    ;(["monthly", "yearly"] as const).forEach((interval) => {
      const productId = planIds[interval]
      if (!productId) {
        return
      }

      tasks.push(
        fetchCreemProduct(apiKey, productId)
          .then((product) => ({ key: planKey, interval, product }))
          .catch(() => ({ key: planKey, interval, product: null })),
      )
    })
  }

  const results = await Promise.all(tasks)

  results.forEach(({ key, interval, product }) => {
    products[key][interval] = product
  })

  return products
}
