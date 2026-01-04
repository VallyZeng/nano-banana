"use client"

import { useMemo, useState } from "react"
import { CreemCheckout } from "@creem_io/nextjs"
import { Check } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type PricingUser =
  | {
      id: string
      email?: string | null
      name?: string | null
    }
  | null

type BillingInterval = "monthly" | "yearly"

const productIds = {
  lite: {
    monthly: process.env.NEXT_PUBLIC_CREEM_PRODUCT_ID_LITE_MONTHLY,
    yearly: process.env.NEXT_PUBLIC_CREEM_PRODUCT_ID_LITE_YEARLY,
  },
  pro: {
    monthly: process.env.NEXT_PUBLIC_CREEM_PRODUCT_ID_PRO_MONTHLY,
    yearly: process.env.NEXT_PUBLIC_CREEM_PRODUCT_ID_PRO_YEARLY,
  },
  enterprise: {
    monthly: process.env.NEXT_PUBLIC_CREEM_PRODUCT_ID_ENTERPRISE_MONTHLY,
    yearly: process.env.NEXT_PUBLIC_CREEM_PRODUCT_ID_ENTERPRISE_YEARLY,
  },
} as const

const plans = [
  {
    key: "lite",
    name: "Lite",
    description: "For getting started with regular edits.",
    monthlyPrice: 7,
    yearlyPrice: 89,
    creditsPerMonth: 40,
    imagesPerMonth: 80,
    features: ["Commercial license", "Unlimited storage"],
  },
  {
    key: "pro",
    name: "Pro",
    description: "For creators who edit daily and need speed.",
    monthlyPrice: 21,
    yearlyPrice: 249,
    creditsPerMonth: 150,
    imagesPerMonth: 300,
    features: [
      "Everything in Lite",
      "Priority generation",
      "Dedicated support",
    ],
    featured: true,
  },
  {
    key: "enterprise",
    name: "Enterprise",
    description: "For teams, agencies, and high-volume workflows.",
    monthlyPrice: 56,
    yearlyPrice: 669,
    creditsPerMonth: 400,
    imagesPerMonth: 800,
    features: ["Everything in Pro", "API access", "Custom integrations"],
  },
] as const

function formatPrice(price: number) {
  return `$${price}`
}

function PlanCta({
  planKey,
  interval,
  user,
  featured,
}: {
  planKey: (typeof plans)[number]["key"]
  interval: BillingInterval
  user: PricingUser
  featured?: boolean
}) {
  const productId = productIds[planKey]?.[interval]

  if (!productId) {
    return (
      <Button className="w-full" variant="outline" disabled>
        未配置 Creem 产品 ID（{interval}）
      </Button>
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

export function PricingSection({ user }: { user: PricingUser }) {
  const [interval, setInterval] = useState<BillingInterval>("monthly")

  const plansWithPrices = useMemo(() => {
    return plans.map((plan) => {
      const price = interval === "monthly" ? plan.monthlyPrice : plan.yearlyPrice
      const suffix = interval === "monthly" ? "/mo" : "/yr"
      return {
        ...plan,
        price,
        suffix,
      }
    })
  }, [interval])

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
              提示：建议先登录再购买，这样我们可以用你的账号自动开通权益。
            </p>
          ) : null}
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-3">
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
                    {formatPrice(plan.price)}
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
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
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
