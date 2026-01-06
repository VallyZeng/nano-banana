import { Sparkles, Users, ImageIcon, Zap, Layers, Wand2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Sparkles,
    title: "Natural Language Editing",
    description: "Edit images using simple text prompts. Our AI understands complex instructions like GPT for images",
  },
  {
    icon: Users,
    title: "Character Consistency",
    description: "Maintain perfect character details across edits. Excels at preserving faces and identities",
  },
  {
    icon: ImageIcon,
    title: "Scene Preservation",
    description: "Seamlessly blend edits with original backgrounds. Superior scene fusion technology",
  },
  {
    icon: Zap,
    title: "One-Shot Editing",
    description: "Perfect results in a single attempt. Solves one-shot image editing challenges effortlessly",
  },
  {
    icon: Layers,
    title: "Multi-Image Context",
    description: "Process multiple images simultaneously. Support for advanced multi-image editing workflows",
  },
  {
    icon: Wand2,
    title: "AI UGC Creation",
    description: "Create consistent AI influencers and UGC content. Perfect for social media and marketing",
  },
]

export function Features() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Why Choose Design Banana?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The most advanced AI image editor. Revolutionize your photo editing with natural language understanding
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
