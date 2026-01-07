import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2 text-xl font-bold">
              <span className="text-3xl">🍌</span>
              <span className="text-foreground">Design Banana</span>
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
                <a href="mailto:support@createdesign.online" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2026 Design Banana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
