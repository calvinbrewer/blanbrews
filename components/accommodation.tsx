import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Home, MapPin, Euro, Users } from 'lucide-react'

export function Accommodation() {
  return (
    <section id="accommodation" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary text-balance">
          Accommodation & Details
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-card border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl text-card-foreground flex items-center gap-3">
                <Home className="h-6 w-6 text-accent" />
                Venue Accommodation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                We have reserved rooms at <strong>Borgo Siliano</strong> for our
                wedding guests. The venue offers beautiful accommodations with
                breakfast included.
              </p>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Users className="h-5 w-5 text-accent" />
                <span>Room assignment will be provided</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Euro className="h-5 w-5 text-accent" />
                <span>Subsidized rate: €125/person/night</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl text-card-foreground flex items-center gap-3">
                <MapPin className="h-6 w-6 text-accent" />
                Additional Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                For guests who prefer alternative accommodation, we can help
                arrange stays at nearby properties through Emma Villas.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Contact:</strong>
                <br />
                info@emmavillas.com
                <br />
                concierge@emmavillas.com
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border-border max-w-4xl mx-auto">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold mb-4 text-card-foreground text-center">
              Important Information for Guests
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                <strong>Payment:</strong> We're collecting accommodation
                payments in advance to simplify the process for everyone. This
                helps us manage the venue booking and ensures a smooth
                experience for all our guests.
              </p>
              <p className="leading-relaxed">
                <strong>Transportation:</strong> We're arranging transfers from
                the train station to the venue for check-in and check-out days.
                More details will be provided with your invitation.
              </p>
              <p className="leading-relaxed">
                <strong>Tourist Tax:</strong> Please note that there is a small
                tourist tax (approximately €2 per person, per night) that will
                be collected separately at the venue.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
