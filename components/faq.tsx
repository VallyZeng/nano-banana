import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is Design Banana?",
    answer:
      "It's a revolutionary AI image editing model that transforms photos using natural language prompts. Currently one of the most powerful image editing models available, with exceptional consistency and superior performance for character editing and scene preservation.",
  },
  {
    question: "How does it work?",
    answer:
      'Simply upload an image and describe your desired edits in natural language. The AI understands complex instructions like "place the person in a snowy mountain" or "change the background to a sunset beach". It processes your text prompt and generates perfectly edited images.',
  },
  {
    question: "What makes Design Banana special?",
    answer:
      "Design Banana excels in character consistency, scene blending, and one-shot editing. It preserves facial features and seamlessly integrates edits with backgrounds. It also supports multi-image context, making it ideal for creating consistent AI influencers.",
  },
  {
    question: "Can I use it for commercial projects?",
    answer:
      "Yes! It's perfect for creating AI UGC content, social media campaigns, and marketing materials. Many users leverage it for creating consistent AI influencers and product photography. The high-quality outputs are suitable for professional use.",
  },
  {
    question: "What types of edits can it handle?",
    answer:
      "The editor handles complex edits including face completion, background changes, object placement, style transfers, and character modifications. It excels at understanding contextual instructions while maintaining photorealistic quality.",
  },
  {
    question: "How does the processing work?",
    answer:
      "Design Banana uses advanced AI to understand your text prompts and generate precise edits. The model maintains character consistency and seamlessly blends changes with your original image, delivering professional-quality results.",
  },
  {
    question: "Is Design Banana affiliated with Google or Gemini?",
    answer:
      "No. Design Banana is an independent platform and is not affiliated with, endorsed by, or sponsored by Google. We provide access to advanced AI models through our custom interface to enhance usability and provide additional features.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">Everything you need to know about Design Banana</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="rounded-lg border-2 border-b-2 last:border-b-2 bg-card px-6 py-2">
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
