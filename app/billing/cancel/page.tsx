import Link from "next/link"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function BillingCancelPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl rounded-xl border-2 bg-card p-8 text-center">
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
              Checkout cancelled
            </h1>
            <p className="mb-8 text-muted-foreground">
              No worries — you can pick a plan and try again anytime.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/pricing">View pricing</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/#editor">Try the editor</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

