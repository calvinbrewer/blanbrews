import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, MapPin, Clock } from 'lucide-react'

export function EventDetails() {
  const events = [
    {
      title: 'Pizza Party',
      date: 'October 1, 2026',
      time: '7:00 PM',
      location: 'Borgo Siliano, Tuscany',
      description:
        'Join us for a casual pizza party as we kick off our wedding weekend celebration.',
    },
    {
      title: 'Wedding Ceremony & Reception',
      date: 'October 2, 2026',
      time: '4:00 PM',
      location: 'Borgo Siliano, Tuscany',
      description:
        'Our intimate ceremony surrounded by the rolling hills and vineyards of Tuscany, followed by dinner, dancing, and unforgettable memories.',
      featured: true,
    },
    {
      title: 'Brunch & Farewell Dinner',
      date: 'October 3, 2026',
      time: '11:00 AM - 8:00 PM',
      location: 'Borgo Siliano Vineyards',
      description:
        'A relaxed brunch followed by a special farewell dinner in the vineyards with one long table for all our guests.',
    },
    {
      title: 'Departures',
      date: 'October 4, 2026',
      time: 'Check-out',
      location: 'Various',
      description:
        'Safe travels home! We hope you had an unforgettable time celebrating with us in Tuscany.',
    },
  ]

  return (
    <section id="events" className="py-24 md:py-32 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl md:text-6xl font-light mb-6 text-foreground tracking-tight">
            Wedding Events
          </h2>
          <div className="w-20 h-0.5 bg-accent/40 mx-auto mb-6" />
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            A weekend of celebration in the heart of Tuscany
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
                    <span className="text-sm md:text-base">{event.location}</span>
                  </div>
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
