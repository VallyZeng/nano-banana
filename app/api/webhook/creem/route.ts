import { Webhook } from "@creem_io/nextjs"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

const webhookSecret = process.env.CREEM_WEBHOOK_SECRET

export const POST = webhookSecret
  ? Webhook({
      webhookSecret,

      onCheckoutCompleted: async ({ customer, product, checkout }) => {
        console.log("[creem] checkout.completed", {
          customerId: customer.id,
          email: customer.email,
          productId: product.id,
          productName: product.name,
          checkoutId: checkout.id,
        })
      },

      onGrantAccess: async ({ reason, customer, metadata }) => {
        console.log("[creem] grant_access", {
          reason,
          customerId: customer.id,
          referenceId: metadata?.referenceId,
        })
      },

      onRevokeAccess: async ({ reason, customer, metadata }) => {
        console.log("[creem] revoke_access", {
          reason,
          customerId: customer.id,
          referenceId: metadata?.referenceId,
        })
      },
    })
  : async () =>
      NextResponse.json(
        { error: "Missing CREEM_WEBHOOK_SECRET environment variable." },
        { status: 500 },
      )
