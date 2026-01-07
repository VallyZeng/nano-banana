"use server"

import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

export async function signInWithGoogle() {
  const supabase = await createClient()

  // In server actions, we must use the NEXT_PUBLIC_SITE_URL environment variable
  // because the host header may be localhost (internal server address)
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")

  if (!origin) {
    redirect("/auth/auth-code-error?error=missing-env-url")
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    redirect(`/auth/auth-code-error?error=${encodeURIComponent(error.message)}`)
  }

  if (data?.url) {
    redirect(data.url)
  }

  redirect("/auth/auth-code-error")
}
