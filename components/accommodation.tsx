import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Home, MapPin, Euro, Users, Info, DollarSign } from 'lucide-react'

export function Accommodation() {
  return (
    <section id="accommodation" className="py-24 md:py-32 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl md:text-6xl font-light mb-6 text-foreground tracking-tight">
            Accommodation
          </h2>
          <div className="w-20 h-0.5 bg-accent/40 mx-auto mb-6" />
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Comfortable stays in the heart of Tuscany
          </p>
        </div>

        {/* Main Accommodation Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-10">
          <Card className="group bg-card border border-border/50 hover:border-accent/30 hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="font-serif text-2xl md:text-3xl font-normal text-foreground flex items-center gap-3">
                <Home className="h-6 w-6 text-accent flex-shrink-0" />
                Venue Accommodation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                We have reserved rooms at{' '}
                <strong className="text-foreground">Borgo Siliano</strong> for
                our wedding guests. The venue offers beautiful accommodations
                with all meals and most importantly drinks included.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Users className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Room assignment will be provided
                  </span>
                </div>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <DollarSign className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Subsidized rate:{' '}
                    <strong className="text-foreground">
                      $125/person/night
                    </strong>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group bg-card border border-border/50 hover:border-accent/30 hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="font-serif text-2xl md:text-3xl font-normal text-foreground flex items-center gap-3">
                <MapPin className="h-6 w-6 text-accent flex-shrink-0" />
                Alternative Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                For guests who prefer alternative accommodation, we can help
                arrange stays at nearby properties through Emma Villas.
              </p>

              <div className="pt-2">
                <p className="text-sm font-medium text-foreground mb-2">
                  Contact:
                </p>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>info@emmavillas.com</p>
                  <p>concierge@emmavillas.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Information Card */}
        <Card className="bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50 max-w-5xl mx-auto">
          <CardContent className="p-8 md:p-10">
            <div className="flex items-center gap-3 justify-center mb-8">
              <Info className="h-6 w-6 text-accent" />
              <h3 className="font-serif text-2xl md:text-3xl font-normal text-foreground text-center">
                Important Information
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground text-base">
                  Payment
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We&apos;re collecting accommodation payments in advance to
                  simplify the process and ensure a smooth experience for all
                  guests.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-foreground text-base">
                  Transportation
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We&apos;re arranging transfers from the train station to the
                  venue for check-in and check-out days. Details will be
                  provided with your invitation.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-foreground text-base">
                  Tourist Tax
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Please note there is a small tourist tax (approximately €2 per
                  person, per night) collected separately at the venue.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
