import type { Metadata } from 'next'
import { Website } from '@/components/website'
import { getSiteSettings } from '@/lib/db/site-settings'
import { siteSettingsSchema } from '@/lib/site-settings'

export const metadata: Metadata = {
  title: 'Website preview | Tori & CJ',
  robots: { index: false, follow: false },
}
export const dynamic = 'force-dynamic'

export default async function WebsitePreview({
  searchParams,
}: {
  searchParams: Promise<{ settings?: string }>
}) {
  const query = await searchParams
  let settings
  if (query.settings !== undefined) {
    try {
      settings = siteSettingsSchema.parse(JSON.parse(query.settings))
    } catch {
      return (
        <div className="p-10">
          <h1 className="text-2xl">This preview link is invalid.</h1>
          <a href="/admin" className="mt-4 inline-block underline">
            Return to admin
          </a>
        </div>
      )
    }
  } else {
    settings = await getSiteSettings()
  }
  return (
    <div className="pb-20">
      <Website settings={settings} />
      <aside className="fixed bottom-0 left-0 right-0 z-[60] flex flex-wrap items-center justify-center gap-x-5 gap-y-1 bg-foreground px-4 py-4 text-center text-sm text-background">
        <span>
          Preview only ·{' '}
          {settings.mode === 'weekend' ? 'Wedding Weekend' : 'Planning & RSVP'}{' '}
          · Your live site has not changed.
        </span>
        <a href="/admin" className="underline underline-offset-4">
          Back to admin
        </a>
      </aside>
    </div>
  )
}
