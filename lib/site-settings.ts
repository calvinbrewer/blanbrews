import { z } from 'zod'

export const siteSettingsSchema = z
  .object({
    mode: z.enum(['planning', 'weekend']),
    showTravel: z.boolean(),
    showExplore: z.boolean(),
    showAccommodation: z.boolean(),
    showRsvp: z.boolean(),
    showGifts: z.boolean(),
    showFaq: z.boolean(),
  })
  .strict()

export type SiteSettings = z.infer<typeof siteSettingsSchema>

export const defaultSiteSettings: SiteSettings = {
  mode: 'planning',
  showTravel: true,
  showExplore: true,
  showAccommodation: false,
  showRsvp: false,
  showGifts: false,
  showFaq: false,
}

export const weekendSections = [
  {
    key: 'showTravel',
    label: 'Travel & Tori’s guides',
    description:
      'Arrival routes from Rome and Florence, plus Tori’s travel guides.',
  },
  {
    key: 'showExplore',
    label: 'Nearby towns',
    description:
      'Città della Pieve, Chiusi, Montepulciano, and Lake Trasimeno.',
  },
  {
    key: 'showAccommodation',
    label: 'Accommodation & payment',
    description:
      'The original room information, payment deadline, and Venmo details.',
  },
  {
    key: 'showRsvp',
    label: 'RSVP form',
    description: 'Guest lookup and the RSVP form.',
  },
  {
    key: 'showGifts',
    label: 'Registry',
    description: 'Your existing gifts and registry section.',
  },
  {
    key: 'showFaq',
    label: 'Planning FAQs',
    description:
      'The original questions, including RSVP and payment information.',
  },
] as const

export function getNavigationItems(settings: SiteSettings) {
  if (settings.mode === 'planning') {
    return [
      { id: 'events', label: 'Events' },
      { id: 'accommodation', label: 'Accommodation' },
      { id: 'travel', label: 'Travel' },
      { id: 'rsvp', label: 'RSVP' },
      { id: 'gifts', label: 'Registry' },
      { id: 'faq', label: 'FAQ' },
    ]
  }
  return [
    { id: 'events', label: 'Schedule' },
    { id: 'getting-around', label: 'Getting around' },
    ...(settings.showTravel ? [{ id: 'travel', label: 'Travel' }] : []),
    ...(settings.showExplore ? [{ id: 'explore', label: 'Explore' }] : []),
    ...(settings.showAccommodation
      ? [{ id: 'accommodation', label: 'Stay & pay' }]
      : []),
    ...(settings.showRsvp ? [{ id: 'rsvp', label: 'RSVP' }] : []),
    ...(settings.showGifts ? [{ id: 'gifts', label: 'Registry' }] : []),
    ...(settings.showFaq ? [{ id: 'faq', label: 'FAQ' }] : []),
  ]
}
