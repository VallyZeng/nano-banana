import { Checkout } from "@creem_io/nextjs"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

const apiKey = process.env.CREEM_API_KEY

export const GET = apiKey
  ? Checkout({
      apiKey,
      testMode: process.env.CREEM_TEST_MODE === "true",
      defaultSuccessUrl: "/billing/success",
    })
  : async () =>
      NextResponse.json(
        { error: "Missing CREEM_API_KEY environment variable." },
        { status: 500 },
      )
