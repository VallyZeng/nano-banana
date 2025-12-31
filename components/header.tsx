import Link from "next/link"

import { Button } from "@/components/ui/button"
import { signOut } from "@/app/auth/sign-out/actions"
import { createClient } from "@/lib/supabase/server"

export async function Header() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  const user = data.user
  const displayName =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    user?.email ??
    "there"

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

        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              Hello, {displayName}
            </span>
            <form action={signOut}>
              <Button type="submit" variant="outline">
                Sign out
              </Button>
            </form>
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="#editor">Start Editing</Link>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/auth/sign-in">Sign in</Link>
            </Button>
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="#editor">Start Editing</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
