'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Car, Train, MapPin, Plane } from 'lucide-react'
import Link from 'next/link'

export function Travel() {
  const scrollToFAQ = () => {
    const element = document.getElementById('faq')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="travel" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl md:text-6xl font-light mb-6 text-foreground tracking-tight">
            Travel
          </h2>
          <div className="w-20 h-0.5 bg-accent/40 mx-auto mb-6" />
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Getting to Borgo Siliano in Città della Pieve
          </p>
        </div>

        {/* Travel Options by Arrival City */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-10">
          {/* Arriving in Florence */}
          <Card className="group bg-card border border-border/50 hover:border-accent/30 hover:shadow-xl transition-all duration-300">
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-full bg-accent/10 p-3">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-normal text-foreground">
                  Arriving in Florence
                </h3>
              </div>

              <div className="space-y-4">
                {/* Air */}
                <div className="flex items-start gap-3">
                  <Plane className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-1">
                      By Air
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Fly into the Florence airport{' '}
                      <strong className="text-foreground">(FLR)</strong>, then
                      continue by car or train below.
                    </p>
                  </div>
                </div>

                {/* Car */}
                <div className="flex items-start gap-3">
                  <Car className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-1">
                      By Car
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Approximately{' '}
                      <strong className="text-foreground">1.5-2 hours</strong>{' '}
                      drive. Ample parking available at each villa.
                    </p>
                  </div>
                </div>

                {/* Train */}
                <div className="flex items-start gap-3">
                  <Train className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-1">
                      By Train
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Travel to{' '}
                      <strong className="text-foreground">
                        Chiusi-Chianciano Terme
                      </strong>{' '}
                      station, then take a{' '}
                      <strong className="text-foreground">10 minute</strong>{' '}
                      taxi to the property. Pre-book transfers through{' '}
                      <a
                        href="http://www.giorgiservice.it/"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="underline text-blue-400"
                      >
                        Giorgi Service
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Arriving in Rome */}
          <Card className="group bg-card border border-border/50 hover:border-accent/30 hover:shadow-xl transition-all duration-300">
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-full bg-accent/10 p-3">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-normal text-foreground">
                  Arriving in Rome
                </h3>
              </div>

              <div className="space-y-4">
                {/* Air */}
                <div className="flex items-start gap-3">
                  <Plane className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-1">
                      By Air
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Fly into one of the two Rome airports{' '}
                      <strong className="text-foreground">(FCO/CIA)</strong>,
                      then continue by car or train below.
                    </p>
                  </div>
                </div>

                {/* Car */}
                <div className="flex items-start gap-3">
                  <Car className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-1">
                      By Car
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Approximately{' '}
                      <strong className="text-foreground">2-2.5 hours</strong>{' '}
                      drive. Ample parking available at each villa.
                    </p>
                  </div>
                </div>

                {/* Train */}
                <div className="flex items-start gap-3">
                  <Train className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-1">
                      By Train
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Travel to{' '}
                      <strong className="text-foreground">
                        Chiusi-Chianciano Terme
                      </strong>{' '}
                      station, then take a{' '}
                      <strong className="text-foreground">10 minute</strong>{' '}
                      taxi to the property. Pre-book transfers through{' '}
                      <a
                        href="http://www.giorgiservice.it/"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="underline text-blue-400"
                      >
                        Giorgi Service
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Venue Location Card */}
        <Card className="bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50 max-w-4xl mx-auto">
          <CardContent className="p-8 md:p-10">
            <div className="flex items-center gap-3 justify-center mb-6">
              <MapPin className="h-6 w-6 text-accent" />
              <h3 className="font-serif text-2xl md:text-3xl font-normal text-foreground text-center">
                Venue Location
              </h3>
            </div>

            <div className="text-center space-y-4">
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                <Link
                  href="https://anticopoderesiliano.it/en/home/"
                  target="_blank"
                  className="underline text-blue-400 font-medium"
                  rel="noreferrer noopener"
                >
                  Borgo Siliano
                </Link>
              </p>
              <p className="text-muted-foreground">
                Vocabolo Sigliano 47
                <br />
                Città della Pieve, IT 06062
              </p>
              <button
                onClick={scrollToFAQ}
                className="text-sm text-accent hover:text-accent/80 underline transition-colors mt-4"
              >
                View more travel details in our FAQ
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
