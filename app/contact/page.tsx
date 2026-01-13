import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "./contact-form"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Design Banana team. We'd love to hear your feedback, questions, or suggestions.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            {/* Header */}
            <div className="mb-12 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Contact Us
              </h1>
              <p className="text-lg text-muted-foreground">
                Have a question or feedback? We'd love to hear from you.
              </p>
            </div>

            <ContactForm />

            {/* Additional Info */}
            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>We typically respond within 24-48 hours.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
