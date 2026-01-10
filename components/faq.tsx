'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronDown, HelpCircle } from 'lucide-react'

type FAQItem = {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'When should I RSVP by?',
    answer:
      'Please respond by August 1, 2026. This helps us finalize arrangements with the venue and ensure we have accurate counts for meals and accommodations.',
  },
  {
    question: 'What is included in the accommodation cost?',
    answer:
      'The subsidized rate of $125/person/night includes your room at Borgo Siliano with all meals and drinks. Please note there is a small tourist tax (approximately €2 per person per night) collected separately at the venue.',
  },
  {
    question: 'Can I bring a plus-one?',
    answer:
      'Due to venue capacity, we can only accommodate guests formally listed on the invitation. If you have a plus-one, they will be listed by name when you search for your invitation.',
  },
  {
    question: 'How do I get to the venue?',
    answer:
      'We are arranging transfers from the train station to Borgo Siliano for check-in and check-out days. More detailed transportation information will be provided with your invitation.',
  },
  {
    question: 'What is the dress code?',
    answer:
      'Cocktail attire for the ceremony and reception. For other events like the pizza party and brunch, casual elegant attire is appropriate. Keep in mind we will be in the Tuscan countryside!',
  },
  {
    question: 'Will there be vegetarian/vegan options?',
    answer:
      'Absolutely! Please indicate any dietary restrictions or allergies when you RSVP, and we will work with the venue to accommodate your needs.',
  },
  {
    question: 'What is the weather like in Tuscany in October?',
    answer:
      'October in Tuscany is beautiful with mild temperatures, typically ranging from 60-70°F (15-21°C). We recommend bringing layers and a light jacket for evenings. There may be occasional rain, so a light rain jacket is advisable.',
  },
  {
    question: 'Can I arrange my own accommodation?',
    answer:
      'Yes! If you prefer to stay elsewhere, you can indicate this when you RSVP. We can help arrange stays at nearby properties through Emma Villas (info@emmavillas.com).',
  },
  {
    question: 'Are children invited?',
    answer:
      'We love your little ones, but we have planned an adults-only celebration. If your children are invited, they will be listed by name on your invitation.',
  },
  {
    question: "What if I have already RSVP'd but need to change my response?",
    answer:
      'No problem! You can search for your name again and update your RSVP. Your previous response will be pre-filled, and you can make any changes needed.',
  },
  {
    question: 'Will there be WiFi at the venue?',
    answer:
      'Yes, WiFi is available at Borgo Siliano. However, we encourage you to unplug and enjoy the beautiful Tuscan setting!',
  },
  {
    question: 'What activities are available in the area?',
    answer:
      'Tuscany offers wine tours, cooking classes, historical sites, and beautiful countryside. We recommend arriving a few days early or staying after to explore the region!',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-24 md:py-32 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl md:text-6xl font-light mb-6 text-foreground tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-0.5 bg-accent/40 mx-auto mb-6" />
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our wedding weekend
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={faq.question}
              className="border border-border/50 hover:border-accent/30 transition-all duration-200 overflow-hidden"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full text-left"
                type="button"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <HelpCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-base md:text-lg mb-2">
                          {faq.question}
                        </h3>
                        {openIndex === index && (
                          <p className="text-muted-foreground text-sm md:text-base leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                            {faq.answer}
                          </p>
                        )}
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </CardContent>
              </button>
            </Card>
          ))}
        </div>

        {/* Contact Note */}
        <div className="mt-12 text-center">
          <Card className="bg-muted/30 border-border/50">
            <CardContent className="p-6">
              <p className="text-muted-foreground">
                Have a question that isn&apos;t answered here?{' '}
                <span className="text-foreground font-medium">
                  Feel free to reach out to us directly!
                </span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
