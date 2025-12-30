import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const showcaseItems = [
  {
    title: "Ultra-Fast Mountain Generation",
    description: "Created in 0.8 seconds with optimized neural engine",
    image: "/mountain-landscape.png",
  },
  {
    title: "Instant Garden Creation",
    description: "Complex scene rendered in milliseconds",
    image: "/beautiful-garden-with-colorful-flowers-and-pathway.jpg",
  },
  {
    title: "Real-time Beach Synthesis",
    description: "Photorealistic results at lightning speed",
    image: "/tropical-beach-at-sunset-with-palm-trees.jpg",
  },
  {
    title: "Rapid Aurora Generation",
    description: "Advanced effects processed instantly",
    image: "/northern-lights-aurora-borealis-over-snowy-landsca.jpg",
  },
]

export function Showcase() {
  return (
    <section id="showcase" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
            <span className="mr-1">⚡</span>
            Lightning-Fast AI Creations
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            See What Nano Banana Creates
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the speed and quality of our AI technology in action
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {showcaseItems.map((item, index) => (
            <Card
              key={index}
              className="overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-lg"
            >
              <div className="relative">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="aspect-video w-full object-cover"
                />
                <Badge className="absolute right-4 top-4 bg-primary text-primary-foreground">Nano Banana Speed</Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-6 text-lg text-muted-foreground">Experience the power of Nano Banana yourself</p>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="#editor">Try Nano Banana Generator</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
