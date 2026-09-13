import Image from 'next/image'
import { ArrowUpRight, CalendarDays, MapPin, Phone, Shirt } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TransportationCopy } from '@/components/transportation-copy'
import {
  weddingEvents,
  taxiHref,
  taxiNumber,
  venueDirections,
} from '@/lib/wedding'

export function WeekendHero() {
  return (
    <section className="relative overflow-hidden bg-[#414f3e] px-4 pb-12 pt-28 text-white md:pb-16 md:pt-32">
      <Image
        src="/cj-tori-hero-4.png"
        alt="Tori and CJ with their dog in the mountains"
        fill
        sizes="100vw"
        priority
        className="object-cover object-[center_55%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/50 to-black/70" />
      <div className="relative mx-auto max-w-5xl text-center">
        <Image
          src="/apple-icon.png"
          alt=""
          width={64}
          height={64}
          priority
          className="mx-auto mb-5 rounded-full bg-white/95 p-1"
        />
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-white/85">
          October 1–4, 2026 · Italy
        </p>
        <h1 className="font-serif text-6xl font-light tracking-tight sm:text-8xl">
          Tori & CJ
        </h1>
        <p className="mt-5 font-serif text-2xl text-white/95 sm:text-3xl">
          Let’s make a weekend of it.
        </p>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/85">
          Everything you need for our wedding weekend at Borgo Siliano: the
          schedule, travel details, and a few places to explore.
        </p>
        <div className="mx-auto mt-8 flex max-w-xl flex-col justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-14 bg-[#414f3e] text-white hover:bg-[#344031]"
          >
            <a href="#events">
              <CalendarDays aria-hidden="true" /> Weekend schedule
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-14 border-white/50 bg-black/20 text-white hover:border-white/70 hover:bg-black/35"
          >
            <a href={taxiHref}>
              <Phone aria-hidden="true" /> Call Local Taxi
            </a>
          </Button>
        </div>
        <a
          href={venueDirections}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm underline underline-offset-4"
        >
          <MapPin className="h-4 w-4" aria-hidden="true" /> Directions to Borgo
          Siliano <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
        <div className="mx-auto mt-10 grid max-w-3xl gap-5 border-t border-white/30 pt-6 text-sm sm:grid-cols-3">
          <div>
            <p className="text-white/85">First up · Thursday, Oct 1</p>
            <p className="mt-1 font-medium">
              Pizza party at {weddingEvents[0].time}
            </p>
          </div>
          <div>
            <p className="text-white/85">The big day · Friday, Oct 2</p>
            <p className="mt-1 font-medium">
              Ceremony at {weddingEvents.find((event) => event.featured)?.time}
            </p>
          </div>
          <div>
            <p className="text-white/85">Our home for the weekend</p>
            <p className="mt-1 font-medium">
              Borgo Siliano · Città della Pieve
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

const days = [
  {
    date: 'October 1, 2026',
    day: 'Thursday',
    short: '01',
    title: 'A warm welcome',
  },
  {
    date: 'October 2, 2026',
    day: 'Friday',
    short: '02',
    title: 'We’re getting married!',
  },
  {
    date: 'October 3, 2026',
    day: 'Saturday',
    short: '03',
    title: 'A little more celebrating',
  },
  {
    date: 'October 4, 2026',
    day: 'Sunday',
    short: '04',
    title: 'Until next time',
  },
]

export function WeekendSchedule() {
  return (
    <section id="events" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Four days together
          </p>
          <h2 className="font-serif text-4xl font-light sm:text-5xl">
            The weekend, at a glance
          </h2>
          <p className="mt-4 text-muted-foreground">
            All times are local to Italy. Dress codes are listed with each
            event.
          </p>
        </div>
        <div className="divide-y divide-border border-y border-border">
          {days.map((day) => (
            <div
              key={day.date}
              className="grid gap-6 py-8 md:grid-cols-[210px_1fr] md:gap-12"
            >
              <div className="flex items-center gap-4 md:items-start">
                <span className="font-serif text-5xl font-light text-[#7a6541]">
                  {day.short}
                </span>
                <div>
                  <h3 className="font-serif text-xl">{day.day}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {day.title}
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                {weddingEvents
                  .filter((event) => event.date === day.date)
                  .map((event) => (
                    <article
                      key={event.title}
                      className={
                        event.featured
                          ? 'rounded-xl border border-[#414f3e]/15 bg-[#f0f2eb] p-5'
                          : 'px-1'
                      }
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="font-serif text-xl sm:text-2xl">
                          {event.title}
                        </h4>
                        <p className="whitespace-nowrap text-sm font-semibold text-[#414f3e]">
                          {event.time}
                        </p>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {event.description}
                      </p>
                      <div className="mt-3 flex flex-col gap-2 text-sm">
                        <p className="flex items-start gap-2">
                          <MapPin
                            className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                            aria-hidden="true"
                          />
                          {event.location === 'Home'
                            ? 'Safe travels home'
                            : event.location}
                        </p>
                        {event.dressCode && (
                          <p className="flex items-start gap-2">
                            <Shirt
                              className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                              aria-hidden="true"
                            />
                            <span>{event.dressCode}</span>
                          </p>
                        )}
                      </div>
                    </article>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function GettingAround() {
  return (
    <section
      id="getting-around"
      className="bg-[#414f3e] px-4 py-16 text-white md:py-20"
    >
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/70">
            Keep this handy
          </p>
          <h2 className="font-serif text-4xl font-light sm:text-5xl">
            Getting around
          </h2>
          <p className="mt-5 text-lg">Borgo Siliano</p>
          <p className="mt-2 leading-relaxed text-white/80">
            Vocabolo Sigliano 47
            <br />
            Città della Pieve, IT 06062
          </p>
          <a
            href={venueDirections}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-4 inline-flex min-h-11 items-center gap-2 underline underline-offset-4"
          >
            Open directions{' '}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <div>
          <p className="leading-relaxed text-white/90 [&_a]:text-white">
            <TransportationCopy />
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="mt-6 h-14 w-full sm:w-auto"
          >
            <a href={taxiHref}>
              <Phone aria-hidden="true" /> {taxiNumber}
            </a>
          </Button>
          <p className="mt-3 text-sm text-white/70">
            Save the number before you head out.
          </p>
        </div>
      </div>
    </section>
  )
}

const towns = [
  {
    name: 'Città della Pieve',
    tag: 'A wander close to the venue',
    description:
      'Brick lanes, hilltop views, and the art of Perugino. Make a little time for the historic center between celebrations.',
    href: 'https://www.umbriatourism.it/en/citta-della-pieve',
  },
  {
    name: 'Chiusi',
    tag: 'History along the way',
    description:
      'Explore the historic center and its Etruscan heritage. If you’re arriving by train, remember that the station and hilltop old town are separate stops.',
    href: 'https://www.visittuscany.com/en/towns-and-villages/chiusi/',
  },
  {
    name: 'Montepulciano',
    tag: 'For a longer outing',
    description:
      'Renaissance streets, Piazza Grande, and the home of Vino Nobile. A lovely option if you have extra time before or after the wedding.',
    href: 'https://www.visittuscany.com/en/towns-and-villages/montepulciano/',
  },
  {
    name: 'Castiglione del Lago',
    tag: 'A little lake time',
    description:
      'A walled town overlooking Lake Trasimeno, with a fortress and wide lake views. Leave room for a slow stroll.',
    href: 'https://www.umbriatourism.it/en/castiglione-del-lago',
  },
]

export function ExploreTowns() {
  return (
    <section id="explore" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            While you’re here
          </p>
          <h2 className="font-serif text-4xl font-light sm:text-5xl">
            A little exploring
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            A few places to enjoy around our corner of Italy. Plan transport
            around the wedding schedule, and check the visitor guides for
            opening hours and details.
          </p>
        </div>
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {towns.map((town) => (
            <article key={town.name} className="border-t border-border pt-6">
              <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                {town.tag}
              </p>
              <h3 className="font-serif text-2xl">{town.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {town.description}
              </p>
              <a
                href={town.href}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-medium underline underline-offset-4"
                aria-label={`Official visitor guide to ${town.name}`}
              >
                Official visitor guide{' '}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
