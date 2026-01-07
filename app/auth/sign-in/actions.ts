"use server"

import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

export async function signInWithGoogle() {
  const supabase = await createClient()

  // 在服务器端 action 中，必须使用 NEXT_PUBLIC_SITE_URL 环境变量
  // 因为请求头中的 host 可能是 localhost (内部服务器地址)
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
