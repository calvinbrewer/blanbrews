import { Card, CardContent } from '@/components/ui/card'
import { Gift, QrCode } from 'lucide-react'
import Image from 'next/image'

export function Gifts() {
  return (
    <section id="gifts" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl font-light mb-6 text-foreground tracking-tight">
            Registry
          </h2>
          <div className="w-20 h-0.5 bg-accent/40 mx-auto mb-6" />
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Your presence is the greatest gift.
          </p>
        </div>

        {/* Main Content */}
        <Card className="bg-card border border-border/50">
          <CardContent className="p-8 md:p-10">
            <div className="flex items-center gap-3 justify-center mb-8">
              <Gift className="h-6 w-6 text-accent" />
              <h3 className="font-serif text-2xl md:text-3xl font-normal text-foreground text-center">
                Honeymoon Fund
              </h3>
            </div>

            <div className="text-center mb-8">
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg max-w-2xl mx-auto">
                We don&apos;t have a registry, but if you&apos;d like to
                contribute to our honeymoon fund, you can send a gift via Venmo.
              </p>
            </div>

            <div className="flex flex-col items-center gap-8">
              {/* QR Code Image */}
              <div className="flex justify-center">
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

              {/* Venmo Info */}
              <div className="space-y-4 text-center max-w-lg">
                <p className="text-muted-foreground leading-relaxed">
                  Scan the QR code or search for our Venmo account:{' '}
                  <a
                    href="https://venmo.com/u/blanbrews"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline text-blue-400 font-medium"
                  >
                    @blanbrews
                  </a>
                </p>
                <p className="text-sm text-muted-foreground italic">
                  No gift is expected - your presence at our celebration is all
                  we need!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
