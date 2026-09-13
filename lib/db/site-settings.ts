import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { websiteSettings } from '@/lib/db/schema'
import {
  defaultSiteSettings,
  siteSettingsSchema,
  type SiteSettings,
} from '@/lib/site-settings'

export async function getSiteSettings(): Promise<SiteSettings> {
  const [row] = await db
    .select()
    .from(websiteSettings)
    .where(eq(websiteSettings.id, 'website'))
    .limit(1)
  return row
    ? siteSettingsSchema.parse(row.settings)
    : { ...defaultSiteSettings }
}

export async function saveSiteSettings(settings: SiteSettings) {
  const validated = siteSettingsSchema.parse(settings)
  await db
    .insert(websiteSettings)
    .values({ id: 'website', settings: validated })
    .onConflictDoUpdate({
      target: websiteSettings.id,
      set: { settings: validated, updatedAt: new Date() },
    })
  return validated
}
