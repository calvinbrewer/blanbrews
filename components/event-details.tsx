import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, MapPin, Clock, Shirt } from 'lucide-react'
import Link from 'next/link'

export function EventDetails() {
  const events = [
    {
      title: 'Pizza Party',
      date: 'October 1, 2026',
      time: '5:30 PM',
      location: 'Borgo Siliano',
      dressCode: 'Dressy-casual',
      description: 'A casual pizza party to kick off our wedding weekend.',
    },
    {
      title: 'Wedding Ceremony & Reception',
      date: 'October 2, 2026',
      time: '3:00 PM',
      location: 'Borgo Siliano',
      dressCode: 'Cocktail Attire (jacket and tie encouraged)',
      description:
        'An intimate ceremony surrounded by the rolling hills and vineyards of Tuscany, followed by dinner and dancing.',
      featured: true,
    },
    {
      title: 'After Party',
      date: 'October 2, 2026',
      time: '11:00 PM',
      location: 'Borgo Siliano',
      dressCode: 'Casual',
      description: 'An after party to continue the shenanigans.',
    },
    {
      title: 'Saturday Brunch',
      date: 'October 3, 2026',
      time: '10:00 AM',
      location: 'Borgo Siliano',
      dressCode:
        'Relaxed (we can almost promise you the bride will be in sweatpants)',
      description: 'A relaxed brunch with a little hair of the dog.',
    },
    {
      title: 'Farewell Dinner',
      date: 'October 3, 2026',
      time: '5:30 PM',
      location: 'Borgo Siliano',
      dressCode: 'Semi-formal (did someone say linens?!)',
      description: 'A special farewell dinner in the vineyards.',
    },
    {
      title: 'Departures',
      date: 'October 4, 2026',
      time: '10:00 AM',
      location: 'Home',
      dressCode: null,
      description:
        'Safe travels home! We hope you had an unforgettable time celebrating with us.',
    },
  ]

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
          {events.map((event, index) => (
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
