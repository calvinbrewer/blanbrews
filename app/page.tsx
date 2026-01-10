import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { EventDetails } from '@/components/event-details'
import { Accommodation } from '@/components/accommodation'
import { RSVP } from '@/components/rsvp'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <EventDetails />
      <Accommodation />
      <RSVP />
      <Footer />
    </main>
  )
}
