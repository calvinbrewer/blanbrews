import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Home,
  MapPin,
  Users,
  DollarSign,
  QrCode,
  Calendar,
  Link,
} from 'lucide-react'
import Image from 'next/image'

export function Accommodation() {
  return (
    <section id="accommodation" className="py-24  px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl md:text-6xl font-light mb-6 text-foreground tracking-tight">
            Accommodation
          </h2>
          <div className="w-20 h-0.5 bg-accent/40 mx-auto mb-6" />
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
                <strong className="text-foreground">Borgo Siliano</strong> and{' '}
                <strong className="text-foreground">
                  separate nearby villas
                </strong>{' '}
                for our guests. Please notify us sooner than later if you would
                like to leverage these options, as they are available on a
                first-come, first-served basis.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Users className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    We&apos;ll let you know your room details ahead of time!
                  </span>
                </div>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <DollarSign className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Total cost for 3 nights:{' '}
                    <strong className="text-foreground">$375/person</strong>
                  </span>
                </div>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Calendar className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Payment due by:{' '}
                    <strong className="text-foreground">June 1st, 2026</strong>
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t border-border/30">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">
                    Accommodation fees include:
                  </strong>{' '}
                  all food and drink during the{' '}
                  <a href="#events" className="underline text-blue-400">
                    wedding events
                  </a>
                  .
                </p>
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
                If you do not want to stay in one of our pre-reserved rooms or
                are traveling with children, you can reserve alternative
                accommodation in the town of Città della Pieve.
              </p>
              <div className="pt-2">
                <p className="text-sm font-medium text-foreground mb-2">
                  Recommended Accommodation:{' '}
                </p>
                <div className="space-y-1 text-sm flex flex-col gap-2 underline text-blue-400">
                  <a
                    href="https://hotel-vannucci.com"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Hotel Vannucci
                  </a>
                </div>
              </div>
              <div className="pt-4 border-t border-border/30">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Transportation:</strong>{' '}
                  For guests staying offsite in the town of Città della Pieve,
                  transportation will be provided to and from the{' '}
                  <a href="#events" className="underline text-blue-400">
                    wedding events
                  </a>
                  .
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Venmo Payment Section */}
        <Card className="bg-card border border-border/50 max-w-3xl mx-auto mt-10">
          <CardContent className="p-8 md:p-10">
            <div className="flex items-center gap-3 justify-center mb-6">
              <QrCode className="h-6 w-6 text-accent" />
              <h3 className="font-serif text-2xl md:text-3xl font-normal text-foreground text-center">
                Send Payment via Venmo
              </h3>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* QR Code Image */}
              <div className="flex-shrink-0">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-border/30">
                  <Image
                    src="/venmo.jpg"
                    alt="Venmo QR Code"
                    width={250}
                    height={250}
                    className="rounded-lg"
                  />
                </div>
              </div>

              {/* Payment Instructions */}
              <div className="flex-1 space-y-4 text-center md:text-left">
                <p className="text-muted-foreground leading-relaxed">
                  Please send your accommodation payment via Venmo using the QR
                  code or by searching for our Venmo account:{' '}
                  <a
                    href="https://venmo.com/u/blanbrews"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline text-blue-400"
                  >
                    @blanbrews
                  </a>
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    Payment Amount:
                  </p>
                  <p className="text-lg font-semibold text-accent">
                    $375 per person (total cost for 3 nights)
                  </p>
                </div>
                <p className="text-xs text-muted-foreground italic">
                  Include your name(s) in the payment note so we can match it to
                  your reservation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
