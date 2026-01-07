"use client"

import { useMemo, useState } from "react"
import { CreemCheckout } from "@creem_io/nextjs"
import { Check } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  planDefinitions,
  pricingProductIds,
  type BillingInterval,
  type PlanKey,
} from "@/lib/pricing-config"
import type { PricingProducts } from "@/lib/pricing-types"
import { cn } from "@/lib/utils"

type PricingUser =
  | {
      id: string
      email?: string | null
      name?: string | null
    }
  | null

function formatPrice(priceInCents: number | null, currency: string | null) {
  if (priceInCents == null) {
    return "--"
  }

  const resolvedCurrency = currency || "USD"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: resolvedCurrency,
  }).format(priceInCents / 100)
}
function getBillingSuffix(
  billingPeriod: string | null | undefined,
  interval: BillingInterval,
) {
  if (billingPeriod) {
    const normalized = billingPeriod.toLowerCase()
    if (normalized.includes("month")) {
      return "/mo"
    }
    if (normalized.includes("year")) {
      return "/yr"
    }
    if (normalized.includes("week")) {
      return "/wk"
    }
    if (normalized.includes("day")) {
      return "/day"
    }
  }

  return interval === "monthly" ? "/mo" : "/yr"
}


function PlanCta({
  planKey,
  interval,
  user,
  featured,
}: {
  planKey: PlanKey
  interval: BillingInterval
  user: PricingUser
  featured?: boolean
}) {
  const productId = pricingProductIds[planKey]?.[interval]

  if (!productId) {
    return (
      <Button className="w-full" variant="outline" disabled>
        Creem product ID not configured ({interval})
      </Button>
    )
  }

  // If user is not logged in, show a sign-in button
  if (!user) {
    return (
      <Link
        href="/auth/sign-in"
        className={cn(
          buttonVariants({
            variant: featured ? "default" : "outline",
            size: "lg",
          }),
          "w-full justify-center inline-flex",
          featured ? "" : "bg-background",
        )}
      >
        Sign in to purchase
      </Link>
    )
  }

  const customer =
    user?.email || user?.name
      ? {
          email: user?.email ?? undefined,
          name: user?.name ?? undefined,
        }
      : undefined

  return (
    <CreemCheckout
      productId={productId}
      successUrl="/billing/success"
      customer={customer}
      referenceId={user?.id}
      metadata={{
        plan: planKey,
        interval,
      }}
    >
      <span
        className={cn(
          buttonVariants({
            variant: featured ? "default" : "outline",
            size: "lg",
          }),
          "w-full justify-center",
          featured ? "" : "bg-background",
        )}
      >
        Get started
      </span>
    </CreemCheckout>
  )
}

export function PricingSection({
  user,
  products,
}: {
  user: PricingUser
  products: PricingProducts
}) {
  const [interval, setInterval] = useState<BillingInterval>("monthly")

  const plansWithPrices = useMemo(() => {
    return planDefinitions.map((plan) => {
      const product = products?.[plan.key]?.[interval] ?? null
      const description =
        product?.description?.trim() || plan.fallbackDescription
      const suffix = getBillingSuffix(product?.billingPeriod, interval)
      const features =
        product?.features.length ? product.features : plan.features
      return {
        ...plan,
        description,
        price: product?.price ?? null,
        currency: product?.currency ?? null,
        suffix,
        features,
      }
    })
  }, [interval, products])

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
            Pricing
          </Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
            Choose a plan that matches your workflow. Credits refill monthly and
            can be used for edits, variations, and batch runs.
          </p>

          <div className="flex items-center justify-center">
            <Tabs value={interval} onValueChange={(v) => setInterval(v as BillingInterval)}>
              <TabsList className="grid w-[320px] grid-cols-2">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">Annually</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {!user ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Sign in required to purchase. We'll automatically activate your plan after payment.
            </p>
          ) : null}
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
          {plansWithPrices.map((plan) => (
            <Card
              key={plan.key}
              className={cn(
                "border-2",
                plan.featured ? "border-primary shadow-lg" : "hover:border-primary/40",
              )}
            >
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xl font-semibold text-foreground">{plan.name}</div>
                  {plan.featured ? (
                    <Badge className="bg-primary text-primary-foreground">
                      Most popular
                    </Badge>
                  ) : null}
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                <div className="flex items-baseline gap-2">
                  <div className="text-4xl font-bold text-foreground">
                    {formatPrice(plan.price, plan.currency)}
                  </div>
                  <div className="text-sm text-muted-foreground">{plan.suffix}</div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {plan.creditsPerMonth} credits / {plan.imagesPerMonth} images per month
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-primary" />
                    <span>{plan.creditsPerMonth} monthly credits included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-primary" />
                    <span>Up to {plan.imagesPerMonth} generations / month</span>
                  </li>
                  {plan.features.map((feature, index) => (
                    <li
                      key={`${feature}-${index}`}
                      className="flex items-start gap-2"
                    >
                      <Check className="mt-0.5 h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <PlanCta
                  planKey={plan.key}
                  interval={interval}
                  user={user}
                  featured={plan.featured}
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}



