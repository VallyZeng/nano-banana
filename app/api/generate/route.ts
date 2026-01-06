import { NextResponse } from "next/server"

type GenerateRequest = {
  prompt?: string
  image?: string
}

type OpenRouterContentPart =
  | {
      type: "text"
      text?: string
    }
  | {
      type: "image_url"
      image_url?: {
        url?: string
      }
    }

type OpenRouterMessage = {
  content?: string | OpenRouterContentPart[]
  images?: {
    type?: "image_url"
    image_url?: {
      url?: string
    }
  }[]
}

type OpenRouterChoice = {
  message?: OpenRouterMessage
}

type OpenRouterResponse = {
  choices?: OpenRouterChoice[]
}

function extractMessageContent(data: OpenRouterResponse) {
  const message = data?.choices?.[0]?.message
  let text: string | null = null
  let imageUrl: string | null = null

  if (!message) {
    return { text, imageUrl }
  }

  const content = message.content
  const images = message.images

  if (typeof content === "string") {
    text = content
  }

  if (Array.isArray(images)) {
    for (const image of images) {
      if (image.type === "image_url" && image.image_url?.url) {
        imageUrl = image.image_url.url
        break
      }
    }
  }

  if (Array.isArray(content)) {
    for (const part of content) {
      if (part.type === "text" && part.text) {
        text = text ? `${text}\n${part.text}` : part.text
      }

      if (!imageUrl && part.type === "image_url" && part.image_url?.url) {
        imageUrl = part.image_url.url
      }
    }
  }

  return { text, imageUrl }
}

export async function POST(request: Request) {
  const { prompt, image } = (await request.json()) as GenerateRequest

  if (!prompt?.trim()) {
    return NextResponse.json({ error: "Prompt is required." }, { status: 400 })
  }

  if (!image?.trim()) {
    return NextResponse.json({ error: "Image is required." }, { status: 400 })
  }

  const apiKey = process.env.OPENROUTER_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing OPENROUTER_API_KEY environment variable." },
      { status: 500 },
    )
  }

  const siteUrl =
    process.env.OPENROUTER_SITE_URL ||
    request.headers.get("origin") ||
    "http://localhost:3000"
  const siteTitle = process.env.OPENROUTER_SITE_TITLE || "Design Banana AI"

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": siteUrl,
        "X-Title": siteTitle,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        modalities: ["image", "text"],
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt.trim(),
              },
              {
                type: "image_url",
                image_url: {
                  url: image,
                },
              },
            ],
          },
        ],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: `OpenRouter request failed: ${errorText}` },
        { status: response.status },
      )
    }

    const data = (await response.json()) as OpenRouterResponse
    const { text, imageUrl } = extractMessageContent(data)

    if (!imageUrl) {
      return NextResponse.json(
        { error: "No image returned from the model.", text },
        { status: 502 },
      )
    }

    return NextResponse.json({ imageUrl, text })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json(
      { error: `Request failed: ${message}` },
      { status: 500 },
    )
  }
}
