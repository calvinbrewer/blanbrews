import { Website } from '@/components/website'
import { getSiteSettings } from '@/lib/db/site-settings'
import { defaultSiteSettings } from '@/lib/site-settings'

// Read the shared setting for each visit, rather than freezing the mode at build time.
export const dynamic = 'force-dynamic'

export default async function Home() {
  const settings = await getSiteSettings().catch(() => {
    console.error(
      'Website settings unavailable; showing the original planning site.',
    )
    return defaultSiteSettings
  })
  return <Website settings={settings} />
}
