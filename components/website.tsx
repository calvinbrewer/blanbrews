import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { EventDetails } from '@/components/event-details'
import { Accommodation } from '@/components/accommodation'
import { Travel } from '@/components/travel'
import { RSVP } from '@/components/rsvp'
import { Gifts } from '@/components/gifts'
import { FAQ } from '@/components/faq'
import { Footer } from '@/components/footer'
import {
  WeekendHero,
  WeekendSchedule,
  GettingAround,
  ExploreTowns,
} from '@/components/weekend'
import type { SiteSettings } from '@/lib/site-settings'

export function Website({ settings }: { settings: SiteSettings }) {
  const weekend = settings.mode === 'weekend'
  return (
    <main className="min-h-screen [&_section[id]]:scroll-mt-28">
      <Navigation settings={settings} />
      {weekend ? (
        <>
          <WeekendHero />
          <WeekendSchedule />
          <GettingAround />
          {settings.showExplore && <ExploreTowns />}
          {settings.showTravel && <Travel showFaqLink={settings.showFaq} />}
          {settings.showAccommodation && <Accommodation />}
          {settings.showRsvp && <RSVP />}
          {settings.showGifts && <Gifts />}
          {settings.showFaq && <FAQ />}
        </>
      ) : (
        <>
          <Hero />
          <EventDetails />
          <Accommodation />
          <Travel />
          <RSVP />
          <Gifts />
          <FAQ />
        </>
      )}
      <Footer />
    </main>
  )
}
