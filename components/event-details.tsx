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
    <section id="events" className="py-20 px-4 bg-muted">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary text-balance">
          Wedding Events
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle className="text-2xl text-card-foreground">
                  {event.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="h-5 w-5 text-accent" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="h-5 w-5 text-accent" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span>{event.location}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed pt-2">
                  {event.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
