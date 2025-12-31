import Link from "next/link"

import { Button } from "@/components/ui/button"
import { signInWithGoogle } from "./actions"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-foreground">Sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Continue with Google to access your workspace.
        </p>
        <form action={signInWithGoogle} className="mt-6">
          <Button type="submit" className="w-full">
            Continue with Google
          </Button>
        </form>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
