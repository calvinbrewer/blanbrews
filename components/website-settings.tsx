'use client'

import { useEffect, useState } from 'react'
import { Eye, Globe, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  siteSettingsSchema,
  weekendSections,
  type SiteSettings,
} from '@/lib/site-settings'

export function WebsiteSettings() {
  const [saved, setSaved] = useState<SiteSettings | null>(null)
  const [draft, setDraft] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  async function load() {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/admin/site-settings', {
        cache: 'no-store',
      })
      if (!response.ok)
        throw new Error('Could not load website settings. Please try again.')
      const settings = siteSettingsSchema.parse(await response.json())
      setSaved(settings)
      setDraft(settings)
    } catch {
      setError('Could not load website settings. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
  }, [])

  function update(changes: Partial<SiteSettings>) {
    setDraft((previous) => (previous ? { ...previous, ...changes } : previous))
    setMessage('')
    setError('')
  }

  async function save() {
    if (!draft) return
    setSaving(true)
    setError('')
    setMessage('')
    try {
      const response = await fetch('/api/admin/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      })
      if (!response.ok) throw new Error('Save failed')
      const settings = siteSettingsSchema.parse(await response.json())
      setSaved(settings)
      setDraft(settings)
      setMessage(
        `${settings.mode === 'weekend' ? 'Wedding Weekend' : 'Planning & RSVP'} is now live. Guests will see it on their next visit or refresh.`,
      )
    } catch {
      setError(
        'Could not confirm the save. Your changes are still here; retry or reload settings to check the live version.',
      )
    } finally {
      setSaving(false)
    }
  }

  const changed =
    draft && saved && JSON.stringify(draft) !== JSON.stringify(saved)
  const previewHref = draft
    ? `/admin/preview?${new URLSearchParams({ settings: JSON.stringify(draft) })}`
    : '/admin/preview'

  return (
    <Card className="mb-8 border-accent/30">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Globe className="h-5 w-5" aria-hidden="true" /> Your wedding
            website
          </CardTitle>
          {saved && (
            <p className="rounded-full bg-muted px-3 py-1 text-sm">
              Live now:{' '}
              <strong>
                {saved.mode === 'weekend'
                  ? 'Wedding Weekend'
                  : 'Planning & RSVP'}
              </strong>
            </p>
          )}
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Choose what guests see. Preview your changes, then save to update the
          website for everyone. You can switch back anytime.
        </p>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p role="status" className="text-sm text-muted-foreground">
            Loading website settings…
          </p>
        ) : draft ? (
          <>
            <fieldset disabled={saving}>
              <legend className="mb-3 text-sm font-medium">Website mode</legend>
              <div className="grid gap-3 md:grid-cols-2">
                {(
                  [
                    {
                      mode: 'planning',
                      title: 'Planning & RSVP',
                      detail:
                        'The original website: invitations, accommodation, payments, and RSVPs.',
                    },
                    {
                      mode: 'weekend',
                      title: 'Wedding Weekend',
                      detail:
                        'Ready for Italy: schedule, dress codes, taxis, directions, and places to explore.',
                    },
                  ] as const
                ).map((option) => (
                  <label
                    key={option.mode}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-5 ${draft.mode === option.mode ? 'border-accent bg-accent/5' : 'border-border'}`}
                  >
                    <input
                      type="radio"
                      name="website-mode"
                      value={option.mode}
                      checked={draft.mode === option.mode}
                      onChange={() => update({ mode: option.mode })}
                      className="mt-1 h-4 w-4 accent-[#7a6541]"
                    />
                    <span>
                      <span className="block font-medium">{option.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                        {option.detail}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
              {draft.mode === 'weekend' && (
                <div className="mt-6">
                  <p className="text-sm font-medium">
                    Include in Wedding Weekend
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    The logo, schedule, taxi number, shuttle details, and
                    parking information are always shown.
                  </p>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {weekendSections.map((section) => (
                      <label
                        key={section.key}
                        className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-4"
                      >
                        <input
                          type="checkbox"
                          checked={draft[section.key]}
                          onChange={(event) =>
                            update({ [section.key]: event.target.checked })
                          }
                          className="mt-1 h-4 w-4 accent-[#7a6541]"
                        />
                        <span>
                          <span className="block text-sm font-medium">
                            {section.label}
                          </span>
                          <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                            {section.description}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </fieldset>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button onClick={save} disabled={!changed || saving}>
                <Check aria-hidden="true" />
                {saving ? 'Saving…' : 'Save website changes'}
              </Button>
              <Button asChild variant="outline">
                <a href={previewHref} target="_blank" rel="noreferrer noopener">
                  <Eye aria-hidden="true" /> Preview selected version
                </a>
              </Button>
              {changed && (
                <span className="text-sm text-muted-foreground">
                  Unsaved changes
                </span>
              )}
              <a
                href="/"
                target="_blank"
                rel="noreferrer noopener"
                className="min-h-10 content-center text-sm underline underline-offset-4"
              >
                View live website
              </a>
            </div>
          </>
        ) : null}
        {error && (
          <div className="mt-4">
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={load}
              disabled={loading || saving}
              className="mt-3"
            >
              Reload settings
            </Button>
          </div>
        )}
        {message && (
          <p role="status" className="mt-4 text-sm text-green-700">
            {message}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
