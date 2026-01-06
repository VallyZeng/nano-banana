import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Digital Creator",
    username: "@AIArtistPro",
    content:
      "This editor completely changed my workflow. The character consistency is incredible - miles ahead of competitors!",
    rating: 5,
    avatar: "SC",
  },
  {
    name: "Michael Rodriguez",
    role: "UGC Specialist",
    username: "@ContentCreator",
    content:
      "Creating consistent AI influencers has never been easier. It maintains perfect face details across edits!",
    rating: 5,
    avatar: "MR",
  },
  {
    name: "Emily Thompson",
    role: "Professional Editor",
    username: "@PhotoEditor",
    content: "One-shot editing is basically solved with this tool. The scene blending is so natural and realistic!",
    rating: 5,
    avatar: "ET",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            What Creators Are Saying
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how creators are using Design Banana
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2">
              <CardContent className="p-6">
                <div className="mb-4 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mb-6 text-foreground leading-relaxed">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 bg-primary/10">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
