import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ImageEditor } from "@/components/image-editor"
import { Features } from "@/components/features"
import { Showcase } from "@/components/showcase"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ImageEditor />
        <Features />
        <Showcase />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
