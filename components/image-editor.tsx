"use client"

import type React from "react"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Upload, Sparkles } from "lucide-react"

export function ImageEditor() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [prompt, setPrompt] = useState("")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [outputs, setOutputs] = useState<string[]>([])
  const [outputText, setOutputText] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setError(null)
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = async () => {
    setError(null)

    if (!uploadedImage) {
      setError("Please add an image before generating.")
      return
    }

    if (!prompt.trim()) {
      setError("Please enter a prompt before generating.")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          image: uploadedImage,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || "Generation failed.")
      }

      if (data?.imageUrl) {
        setOutputs((prev) => [data.imageUrl, ...prev])
      } else {
        throw new Error("No image returned from the model.")
      }

      setOutputText(data?.text ?? null)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error"
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="editor" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Try The AI Editor
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the power of natural language image editing. Transform any photo with simple text commands
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Section */}
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="image-upload" className="text-base font-semibold mb-3 block">
                      Add Image
                    </Label>
                    <div className="space-y-4">
                      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 p-12">
                        {uploadedImage ? (
                          <img
                            src={uploadedImage}
                            alt="Uploaded"
                            className="max-h-48 rounded-lg object-contain"
                          />
                        ) : (
                          <>
                            <Upload className="mb-3 h-10 w-10 text-muted-foreground" />
                            <p className="text-sm font-medium text-foreground">No image selected</p>
                            <p className="text-xs text-muted-foreground mt-1">Max 10MB</p>
                          </>
                        )}
                      </div>
                      <input
                        id="image-upload"
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="mr-2 h-5 w-5" />
                        Add Image
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="prompt" className="text-base font-semibold mb-3 block">
                      Main Prompt
                    </Label>
                    <Textarea
                      id="prompt"
                      placeholder="e.g., place the person in a snowy mountain landscape, make the background a sunset beach, add professional lighting..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-32 resize-none"
                    />
                  </div>

                  {error ? <p className="text-sm text-destructive">{error}</p> : null}

                  <Button
                    type="button"
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={handleGenerate}
                    disabled={isLoading}
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    {isLoading ? "Generating..." : "Generate Now"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Output Section */}
            <Card className="border-2 bg-card">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Output Gallery</Label>
                  {isLoading ? (
                    <div className="flex min-h-96 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 p-12">
                      <div className="text-center">
                        <div className="mb-4 text-2xl font-semibold text-foreground">Generating image...</div>
                        <p className="mt-2 text-sm text-muted-foreground">This usually takes a few seconds.</p>
                      </div>
                    </div>
                  ) : outputs.length ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {outputs.map((url, index) => (
                        <div key={`${url}-${index}`} className="overflow-hidden rounded-lg border">
                          <img src={url} alt={`Generated ${index + 1}`} className="h-full w-full object-cover" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex min-h-96 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 p-12">
                      <div className="text-center">
                        <div className="mb-4 text-2xl font-semibold text-foreground">Ready for instant generation</div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Upload an image and enter your prompt to see the magic
                        </p>
                      </div>
                    </div>
                  )}
                  {outputText ? <p className="text-sm text-muted-foreground">{outputText}</p> : null}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}