import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ImageEditor } from "@/components/image-editor"
import { Showcase } from "@/components/showcase"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ImageEditor />
        <Showcase />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
