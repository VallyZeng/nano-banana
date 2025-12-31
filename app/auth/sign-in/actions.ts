"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

export async function signInWithGoogle() {
  const supabase = await createClient()
  const headersList = await headers()
  const envOrigin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
  const forwardedHost = headersList.get("x-forwarded-host")
  const forwardedProto = headersList.get("x-forwarded-proto")
  const host = forwardedHost ?? headersList.get("host")
  const proto = forwardedProto ?? "https"
  const inferredOrigin = host ? `${proto}://${host}` : ""
  const headerOrigin = headersList.get("origin")
  const origin = envOrigin || inferredOrigin || headerOrigin || ""

  if (!origin) {
    redirect("/auth/auth-code-error?error=missing-origin")
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
