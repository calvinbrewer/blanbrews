import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getSiteSettings, saveSiteSettings } from '@/lib/db/site-settings'
import { siteSettingsSchema } from '@/lib/site-settings'

// /api/admin/* is protected by the existing Basic Auth middleware.
export async function GET() {
  try {
    return NextResponse.json(await getSiteSettings(), {
      headers: { 'Cache-Control': 'no-store' },
    })
  } catch {
    return NextResponse.json(
      { error: 'Could not load website settings. Please try again.' },
      { status: 503 },
    )
  }
}

export async function PUT(request: Request) {
  // Basic Auth is sent automatically by browsers, so reject cross-site writes.
  const origin = request.headers.get('origin')
  if (
    origin !== new URL(request.url).origin ||
    request.headers.get('sec-fetch-site') === 'cross-site'
  ) {
    return NextResponse.json(
      { error: 'Invalid request origin.' },
      { status: 403 },
    )
  }
  if (!request.headers.get('content-type')?.startsWith('application/json')) {
    return NextResponse.json({ error: 'Expected JSON.' }, { status: 415 })
  }
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }
  const parsed = siteSettingsSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid website settings.' },
      { status: 400 },
    )
  }
  try {
    const settings = await saveSiteSettings(parsed.data)
    revalidatePath('/')
    return NextResponse.json(settings, {
      headers: { 'Cache-Control': 'no-store' },
    })
  } catch {
    return NextResponse.json(
      {
        error:
          'Could not confirm the save. Reload website settings before retrying.',
      },
      { status: 503 },
    )
  }
}
