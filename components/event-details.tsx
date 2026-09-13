import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, MapPin, Clock, Shirt } from 'lucide-react'
import Link from 'next/link'
import { weddingEvents } from '@/lib/wedding'

export function EventDetails() {


  return (
    <section id="events" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl md:text-6xl font-light mb-6 text-foreground tracking-tight">
            Wedding Events
          </h2>
          <div className="w-20 h-0.5 bg-accent/40 mx-auto mb-6" />
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            <Link
              href={'https://anticopoderesiliano.it/en/home/'}
              target="_blank"
              className="underline text-blue-400"
              rel="noreferrer noopener"
            >
              Borgo Siliano
            </Link>{' '}
            is the venue for the wedding.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {weddingEvents.map((event, index) => (
            <Card
              key={index}
              className={`group bg-card border hover:shadow-xl transition-all duration-300 overflow-hidden ${
                event.featured
                  ? 'border-accent/40 shadow-md'
                  : 'border-border/50 hover:border-accent/30'
              }`}
            >
              <CardHeader className="pb-4">
                <CardTitle className="font-serif text-2xl md:text-3xl font-normal text-foreground tracking-tight">
                  {event.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Event Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                    <Calendar className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-sm md:text-base">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                    <Clock className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-sm md:text-base">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                    <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-sm md:text-base">
                      {event.location === 'Borgo Siliano' ? (
                        <Link
                          href={'https://anticopoderesiliano.it/en/home/'}
                          target="_blank"
                          className="underline text-blue-400"
                          rel="noreferrer noopener"
                        >
                          {event.location}
                        </Link>
                      ) : (
                        event.location
                      )}
                    </span>
                  </div>
                  {event.dressCode && (
                    <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                      <Shirt className="h-4 w-4 text-accent flex-shrink-0" />
                      <span className="text-sm md:text-base">
                        <strong className="text-foreground font-medium">
                          {event.dressCode}
                        </strong>
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="pt-3 border-t border-border/30">
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {event.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
