import Link from "next/link"

export default function AuthCodeErrorPage({
  searchParams,
}: {
  searchParams?: { error?: string }
}) {
  const message = searchParams?.error ?? "Authentication failed. Please try again."

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-foreground">
          Sign-in error
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        <div className="mt-6">
          <Link
            href="/auth/sign-in"
            className="text-sm font-medium text-primary hover:underline"
          >
            Try again
          </Link>
        </div>
      </div>
    </div>
  )
}
