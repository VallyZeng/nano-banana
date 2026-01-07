import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PricingSection } from "@/components/pricing/pricing-section"
import { createClient } from "@/lib/supabase/server"
import { getPricingProducts } from "@/lib/creem"

const pricingFaqs = [
  {
    question: "How do credits work?",
    answer:
      "Credits are your usage units. Each generation consumes credits depending on the workload. Your credits reset monthly on subscription plans.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. You can cancel whenever you want from the billing portal. Your plan stays active until the end of the current billing period.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "If you run into a billing issue, contact support and we'll help. For completed purchases, refund eligibility depends on the payment outcome and usage.",
  },
  {
    question: "Do I need to log in before purchasing?",
    answer:
      "Yes. You must be signed in to purchase. We'll automatically activate your plan and grant access to your account immediately after payment.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes. You can upgrade or downgrade your plan anytime from the billing portal. When upgrading, you'll get immediate access to higher limits.",
  },
] as const

export default async function PricingPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  const user = data.user
  const pricingProducts = await getPricingProducts()

  const pricingUser = user
    ? {
        id: user.id,
        email: user.email,
        name:
          user.user_metadata?.full_name ??
          user.user_metadata?.name ??
          null,
      }
    : null

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PricingSection user={pricingUser} products={pricingProducts} />

        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  FAQ
                </h2>
                <p className="text-lg text-muted-foreground">
                  Answers to common questions about billing and credits.
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {pricingFaqs.map((faq) => (
                  <AccordionItem
                    key={faq.question}
                    value={faq.question}
                    className="rounded-lg border-2 border-b-2 last:border-b-2 bg-card px-6 py-2"
                  >
                    <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
