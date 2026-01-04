import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2 text-xl font-bold">
              <span className="text-3xl">🍌</span>
              <span className="text-foreground">Nano Banana</span>
            </Link>
            <p className="mb-4 text-sm text-muted-foreground max-w-sm">
              Transform any image with simple text prompts. Experience the future of AI image editing.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-foreground">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#editor" className="text-muted-foreground hover:text-foreground transition-colors">
                  Editor
                </Link>
              </li>
              <li>
                <Link href="/#showcase" className="text-muted-foreground hover:text-foreground transition-colors">
                  Examples
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-foreground">Support</h3>     
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Nano Banana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
