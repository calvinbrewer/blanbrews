import { ArrowUpRight, BookOpen, Car, MapPin, Phone, Train } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { taxiHref, taxiNumber, venueDirections } from '@/lib/wedding'

const arrivals = [
  {
    number: '01',
    city: 'Florence',
    airport: 'FLR · Florence Airport',
    drive: '1.5–2 hours',
  },
  {
    number: '02',
    city: 'Rome',
    airport: 'FCO / CIA · Rome airports',
    drive: '2–2.5 hours',
  },
]

const guides = [
  {
    number: '01',
    title: 'Three Days in Florence',
    description: 'A relaxed three-day itinerary for the Renaissance city.',
    href: 'https://the-anonymous-traveler.medium.com/itinerary-for-three-days-in-florence-23ac533dfcd4',
  },
  {
    number: '02',
    title: 'Rome, the Amalfi Coast & Naples',
    description: 'From the Colosseum to the cliffs of Positano.',
    href: 'https://the-anonymous-traveler.medium.com/rome-amalfi-coast-naples-2022-f5c455fe920c',
  },
  {
    number: '03',
    title: 'Adventuring Beyond Italy',
    description:
      'Tori’s full Europe reading list, for wherever the trip takes you next.',
    href: 'https://the-anonymous-traveler.medium.com/list/europe-f9a391bcf864',
  },
]

export function Travel({ showFaqLink = true }: { showFaqLink?: boolean }) {
  return (
    <section id="travel" className="bg-muted/30 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            See you in Italy
          </p>
          <h2 className="font-serif text-4xl font-light sm:text-5xl">
            Getting to Borgo Siliano
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground">
            Arriving in Florence or Rome? Here’s how to reach our little corner
            of Città della Pieve.
          </p>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {arrivals.map((arrival) => (
            <article
              key={arrival.city}
              className="grid gap-6 py-8 md:grid-cols-[210px_1fr] md:gap-12"
            >
              <div className="flex items-start gap-4">
                <span
                  className="font-serif text-5xl font-light text-[#7a6541]"
                  aria-hidden="true"
                >
                  {arrival.number}
                </span>
                <div>
                  <h3 className="font-serif text-2xl">{arrival.city}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Fly into
                    <br />
                    {arrival.airport}
                  </p>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
                <div>
                  <h4 className="flex items-center gap-2 font-serif text-xl">
                    <Car
                      className="h-4 w-4 text-[#566048]"
                      aria-hidden="true"
                    />{' '}
                    By car
                  </h4>
                  <p className="mt-3 text-sm font-semibold text-[#414f3e]">
                    Approximately {arrival.drive}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Drive to Borgo Siliano. Complimentary parking is available
                    at each villa.
                  </p>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 font-serif text-xl">
                    <Train
                      className="h-4 w-4 text-[#566048]"
                      aria-hidden="true"
                    />{' '}
                    By train
                  </h4>
                  <p className="mt-3 text-sm font-semibold text-[#414f3e]">
                    Chiusi-Chianciano Terme
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Take the train to this station, then a short taxi ride to
                    the property. Transfer details are below.
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-5 rounded-xl border border-[#414f3e]/15 bg-[#f0f2eb] p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center md:gap-10">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#566048]">
              The last leg · about 10 minutes
            </p>
            <h3 className="font-serif text-2xl">
              From the station to the venue
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Book your transfer from Chiusi-Chianciano Terme in advance through{' '}
              <a
                href="http://www.giorgiservice.it/"
                target="_blank"
                rel="noreferrer noopener"
                className="font-medium text-foreground underline underline-offset-4"
              >
                Giorgi Service
              </a>
              , or call a local taxi. We recommend calling ahead, as service
              runs on &quot;Italian time.&quot;
            </p>
          </div>
          <div className="md:text-center">
            <Button
              asChild
              size="lg"
              className="h-12 w-full bg-[#414f3e] text-white hover:bg-[#344031] sm:w-auto"
            >
              <a href={taxiHref}>
                <Phone aria-hidden="true" /> Call Local Taxi
              </a>
            </Button>
            <p className="mt-2 text-center text-xs text-muted-foreground sm:text-left md:text-center">
              {taxiNumber}
            </p>
          </div>
        </div>

        <div className="grid gap-6 py-12 md:grid-cols-[210px_1fr] md:gap-12 md:py-16">
          <div>
            <BookOpen
              className="mb-4 h-5 w-5 text-[#7a6541]"
              aria-hidden="true"
            />
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Make a trip of it
            </p>
            <h3 className="font-serif text-2xl">Tori’s Travel Guides</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A few favorites from Tori’s own adventures, if you’re exploring
              before or after the wedding.
            </p>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {guides.map((guide) => (
              <a
                key={guide.href}
                href={guide.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-start gap-4 py-5 transition-colors hover:bg-[#414f3e]/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#414f3e] sm:gap-5"
              >
                <span
                  className="mt-1 font-serif text-lg text-[#7a6541]"
                  aria-hidden="true"
                >
                  {guide.number}
                </span>
                <div className="min-w-0 flex-1">
                  <h4 className="font-serif text-xl transition-colors group-hover:text-[#566048]">
                    {guide.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {guide.description}
                  </p>
                </div>
                <ArrowUpRight
                  className="mt-1 h-5 w-5 shrink-0 text-[#566048] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <MapPin
              className="mt-1 h-5 w-5 shrink-0 text-[#7a6541]"
              aria-hidden="true"
            />
            <div>
              <h3 className="font-serif text-xl">
                <a
                  href="https://anticopoderesiliano.it/en/home/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline decoration-border underline-offset-4 hover:decoration-current"
                >
                  Borgo Siliano
                </a>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Vocabolo Sigliano 47
                <br />
                Città della Pieve, IT 06062
              </p>
            </div>
          </div>
          <Button
            asChild
            variant="outline"
            className="h-12 border-[#414f3e]/25 bg-transparent"
          >
            <a href={venueDirections} target="_blank" rel="noreferrer noopener">
              Directions to the venue <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </div>
        {showFaqLink && (
          <a
            href="#faq"
            className="mt-6 inline-flex min-h-11 items-center text-sm text-[#566048] underline underline-offset-4"
          >
            View more travel details in our FAQ
          </a>
        )}
      </div>
    </section>
  )
}
