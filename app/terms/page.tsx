import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold tracking-tight text-foreground">
            Terms of Service
          </h1>
          <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
            <p className="text-sm text-muted-foreground">
              Last updated: January 6, 2026
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using Design Banana ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                2. Description of Service
              </h2>
              <p>
                Design Banana is an AI-powered image editing platform that allows users to transform images using text prompts. The Service includes features such as character consistency editing, scene preservation, and batch processing.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                3. User Accounts
              </h2>
              <p>
                To access certain features, you must create an account. You are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
                <li>Providing accurate and complete information</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                4. Subscription and Billing
              </h2>
              <p>
                Design Banana offers subscription plans with monthly or annual billing:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Credits reset monthly on the renewal date</li>
                <li>Subscriptions automatically renew unless canceled</li>
                <li>You can cancel anytime from the billing portal</li>
                <li>Cancellations take effect at the end of the current billing period</li>
                <li>All sales are final and no refunds are offered</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                5. Acceptable Use
              </h2>
              <p>You agree not to use the Service to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Upload or generate illegal, harmful, or offensive content</li>
                <li>Violate any intellectual property rights</li>
                <li>Impersonate others or misrepresent your identity</li>
                <li>Attempt to gain unauthorized access to the Service</li>
                <li>Use automated systems to access the Service without permission</li>
                <li>Generate deepfakes or misleading content intended to deceive</li>
                <li>Create content that violates others' privacy or publicity rights</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                6. Intellectual Property Rights
              </h2>
              <p>
                <strong>Your Content:</strong> You retain ownership of images you upload. By using the Service, you grant us a license to process, store, and display your content solely to provide the Service.
              </p>
              <p>
                <strong>Generated Content:</strong> You own the AI-generated images created through the Service, subject to these Terms and applicable law.
              </p>
              <p>
                <strong>Commercial License:</strong> Paid subscription plans include a commercial license to use generated images for commercial purposes.
              </p>
              <p>
                <strong>Our Property:</strong> The Service, including its software, design, and branding, is owned by Design Banana and protected by intellectual property laws.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                7. Content Moderation
              </h2>
              <p>
                We reserve the right to review, remove, or refuse to process any content that violates these Terms or applicable laws. We may suspend or terminate accounts that repeatedly violate our policies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                8. Service Availability
              </h2>
              <p>
                We strive to maintain high availability but do not guarantee uninterrupted access. The Service may be temporarily unavailable due to maintenance, updates, or circumstances beyond our control.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                9. Disclaimer of Warranties
              </h2>
              <p>
                THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE ERROR-FREE, SECURE, OR MEET YOUR REQUIREMENTS.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                10. Limitation of Liability
              </h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, DESIGN BANANA SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                11. Indemnification
              </h2>
              <p>
                You agree to indemnify and hold harmless Design Banana from any claims, damages, or expenses arising from your use of the Service or violation of these Terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                12. Termination
              </h2>
              <p>
                We may suspend or terminate your access to the Service at any time for violations of these Terms. Upon termination, your right to use the Service ceases immediately.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                13. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of material changes via email or through the Service. Continued use after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                14. Governing Law
              </h2>
              <p>
                These Terms are governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                15. AI Product Disclosure
              </h2>
              <p>
                Design Banana is an independent platform that provides a user-friendly interface built on top of third-party AI models. We are an independent service and not affiliated with, endorsed by, or sponsored by any AI model providers, including but not limited to Google, Gemini, or any other AI service providers.
              </p>
              <p>
                Any references to AI models or services are solely for the purpose of describing the technology that powers our platform. All trademarks, service marks, and company names mentioned are the property of their respective owners.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                16. Contact Information
              </h2>
              <p>
                For questions about these Terms of Service, please contact us at:
              </p>
              <p className="font-medium text-foreground">
                Email: support@createdesign.online
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
