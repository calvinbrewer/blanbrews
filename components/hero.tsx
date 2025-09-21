'use client'

import { Button } from '@/components/ui/button'

export function Hero() {
  const scrollToRSVP = () => {
    const element = document.getElementById('rsvp')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/cj-tori-hero-1.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <div className="mb-8">
          <p className="text-lg md:text-xl font-serif italic mb-4 text-cream/90">
            We invite you to celebrate with us
          </p>
          <h1 className="font-serif text-7xl md:text-9xl font-light mb-4 text-balance tracking-wide">
            Tori & CJ
          </h1>
          <div className="w-24 h-px bg-secondary mx-auto mb-6" />
        </div>

        <div className="text-xl md:text-2xl mb-10 text-balance font-serif">
          <p className="mb-3 text-cream/95">October 1st - 4th, 2026</p>
          <p className="text-lg text-cream/90">Tuscany, Italy</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 text-lg tracking-wide"
            onClick={scrollToRSVP}
          >
            RSVP
          </Button>
          <p className="text-sm text-cream/80 font-light">
            We can&apos;t wait to celebrate with you!
          </p>
        </div>
      </div>
    </section>
  )
}
