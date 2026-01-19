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
          backgroundImage: `url('/cj-tori-hero-4.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <p className="text-lg md:text-xl font-serif italic mb-6 text-cream/95 tracking-wide">
            We invite you to celebrate with us
          </p>
          <h1 className="font-serif text-7xl md:text-9xl lg:text-[10rem] font-light mb-6 text-balance tracking-wide">
            Tori & CJ
          </h1>
          <div className="w-24 h-px bg-secondary/80 mx-auto mb-8" />
        </div>

        <div className="text-xl md:text-2xl mb-12 text-balance font-serif animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          <p className="mb-4 text-cream/95 font-light tracking-wide">
            October 1st - 4th, 2026
          </p>
          <p className="text-lg md:text-xl text-cream/90 font-light italic">
            Borgo Siliano, Tuscany
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 h-14 text-base font-medium tracking-wider shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={scrollToRSVP}
          >
            RSVP
          </Button>
        </div>
      </div>

      {/* Subtle gradient overlay at bottom for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/10 to-transparent" />
    </section>
  )
}
