import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { EventDetails } from '@/components/event-details'
import { Accommodation } from '@/components/accommodation'
import { Travel } from '@/components/travel'
import { RSVP } from '@/components/rsvp'
import { Gifts } from '@/components/gifts'
import { FAQ } from '@/components/faq'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <EventDetails />
      <Accommodation />
      <Travel />
      <RSVP />
      <Gifts />
      <FAQ />
      <Footer />
    </main>
  )
}
