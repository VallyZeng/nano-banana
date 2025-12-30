import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-accent/20 to-background py-20 md:py-32">
      {/* Decorative banana elements */}
      <div className="absolute right-10 top-10 text-6xl opacity-20 md:text-8xl">🍌</div>
      <div className="absolute bottom-10 left-10 text-4xl opacity-10 md:text-6xl">🍌</div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
            <span className="mr-1">🍌</span>
            The AI model that outperforms competitors
          </Badge>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl text-balance">
            Transform Images with Simple Text Prompts
          </h1>

          <p className="mb-8 text-lg text-muted-foreground sm:text-xl md:text-2xl max-w-3xl mx-auto text-pretty">
            Advanced AI model delivers consistent character editing and scene preservation. Experience the future of
            natural language image editing.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8">
              <Link href="#editor">Start Editing</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 bg-transparent">
              <Link href="#showcase">View Examples</Link>
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-xl">✨</span>
              <span>One-shot editing</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🎯</span>
              <span>Character consistency</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🖼️</span>
              <span>Multi-image support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
