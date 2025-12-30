import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-3xl">🍌</span>
          <span className="text-foreground">Nano Banana</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#editor"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Editor
          </Link>
          <Link
            href="#showcase"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Examples
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Reviews
          </Link>
          <Link href="#faq" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            FAQ
          </Link>
        </nav>

        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Start Editing</Button>
      </div>
    </header>
  )
}
