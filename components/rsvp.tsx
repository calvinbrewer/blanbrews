'use client'

import type React from 'react'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { GuestWithPlusOnes } from '@/lib/types'
import { Check, Users } from 'lucide-react'

type SearchStep = 'search' | 'found'

type GuestRSVPData = {
  guestId: string
  isAttending: 'yes' | 'no' | ''
  dietaryRestrictions: string
}

export function RSVP() {
  const [step, setStep] = useState<SearchStep>('search')
  const [searchData, setSearchData] = useState({
    firstName: '',
    lastName: '',
  })
  const [foundGuest, setFoundGuest] = useState<GuestWithPlusOnes | null>(null)
  const [guestResponses, setGuestResponses] = useState<
    Record<string, GuestRSVPData>
  >({})
  const [wantsOwnHousing, setWantsOwnHousing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSearchChange = (field: string, value: string) => {
    setSearchData((prev) => ({ ...prev, [field]: value }))
    setError(null)
  }

  const handleGuestResponseChange = (
    guestId: string,
    field: 'isAttending' | 'dietaryRestrictions',
    value: string,
  ) => {
    setGuestResponses((prev) => ({
      ...prev,
      [guestId]: {
        ...prev[guestId],
        guestId,
        [field]: value,
      },
    }))
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/guests/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || 'Guest not found')
        return
      }

      const guest: GuestWithPlusOnes = await response.json()
      setFoundGuest(guest)
      setStep('found')

      // Initialize responses for all guests
      const allGuests = [guest, ...guest.plusOnes]
      const initialResponses: Record<string, GuestRSVPData> = {}

      for (const g of allGuests) {
        initialResponses[g.id] = {
          guestId: g.id,
          isAttending: g.hasRsvped ? (g.isAttending ? 'yes' : 'no') : '',
          dietaryRestrictions: g.dietaryRestrictions || '',
        }
      }

      setGuestResponses(initialResponses)
      setWantsOwnHousing(guest.wantsOwnHousing)
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!foundGuest) return

    // Validate that all guests have responded
    const allGuests = [foundGuest, ...foundGuest.plusOnes]
    const allResponded = allGuests.every(
      (g) => guestResponses[g.id]?.isAttending !== '',
    )

    if (!allResponded) {
      setError('Please indicate attendance for all guests in your party')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Submit each guest's response
      const submissions = allGuests.map(async (guest) => {
        const response = guestResponses[guest.id]
        return fetch('/api/rsvp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            guestIds: [guest.id],
            isAttending: response.isAttending === 'yes',
            dietaryRestrictions: response.dietaryRestrictions,
            wantsOwnHousing,
          }),
        })
      })

      const results = await Promise.all(submissions)
      const allSuccessful = results.every((r) => r.ok)

      if (!allSuccessful) {
        setError('Failed to submit RSVP. Please try again.')
        return
      }

      setSuccess(true)
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setStep('search')
    setFoundGuest(null)
    setSearchData({ firstName: '', lastName: '' })
    setGuestResponses({})
    setWantsOwnHousing(false)
    setError(null)
    setSuccess(false)
  }

  // Helper to check if all required fields are filled
  const canSubmit = () => {
    if (!foundGuest) return false
    const allGuests = [foundGuest, ...foundGuest.plusOnes]
    return allGuests.every((g) => guestResponses[g.id]?.isAttending !== '')
  }

  // Check if any guest is attending
  const anyoneAttending = () => {
    return Object.values(guestResponses).some((r) => r.isAttending === 'yes')
  }

  return (
    <section id="rsvp" className="py-24  px-4 bg-muted/30">
      <div className="container mx-auto max-w-3xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl font-light mb-6 text-foreground tracking-tight">
            RSVP
          </h2>
          <div className="w-20 h-0.5 bg-accent/40 mx-auto mb-6" />
          <p className="text-muted-foreground text-lg leading-relaxed">
            Please respond by{' '}
            <strong className="text-foreground">June 1st, 2026</strong>
          </p>
        </div>

        <Card className="bg-card border border-border/50 shadow-xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="font-serif text-3xl md:text-4xl font-light text-foreground mb-3">
              {success
                ? 'Thank You!'
                : step === 'search'
                  ? 'Find Your Invitation'
                  : 'Complete Your RSVP'}
            </CardTitle>
            {!success && (
              <p className="text-muted-foreground text-sm">
                {step === 'search'
                  ? 'Enter your name to begin'
                  : 'We look forward to celebrating with you'}
              </p>
            )}
          </CardHeader>
          <CardContent className="px-6 md:px-8 pb-8">
            {success ? (
              <div className="text-center space-y-6 py-4">
                <div className="flex justify-center">
                  <div className="rounded-full bg-accent/10 p-4">
                    <Check className="w-10 h-10 text-accent" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-lg text-foreground font-medium">
                    Your RSVP has been recorded
                  </p>
                  <p className="text-muted-foreground">
                    We can&apos;t wait to celebrate with you in Tuscany!
                  </p>
                </div>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="w-full mt-6 border-border/50 hover:border-accent/30 hover:bg-muted/50"
                >
                  RSVP for Another Guest
                </Button>
              </div>
            ) : step === 'search' ? (
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="text-foreground font-medium"
                  >
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={searchData.firstName}
                    onChange={(e) =>
                      handleSearchChange('firstName', e.target.value)
                    }
                    required
                    className="bg-input border-border/50 focus:border-accent/50 h-11"
                    placeholder="Enter your first name"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="lastName"
                    className="text-foreground font-medium"
                  >
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={searchData.lastName}
                    onChange={(e) =>
                      handleSearchChange('lastName', e.target.value)
                    }
                    required
                    className="bg-input border-border/50 focus:border-accent/50 h-11"
                    placeholder="Enter your last name"
                  />
                </div>

                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-medium tracking-wide"
                >
                  {loading ? 'Searching...' : 'Find My Invitation'}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-6">
                {/* Show message if they searched as a plus-one */}
                {foundGuest &&
                  (searchData.firstName.toLowerCase() !==
                    foundGuest.firstName.toLowerCase() ||
                    searchData.lastName.toLowerCase() !==
                      foundGuest.lastName.toLowerCase()) && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-900">
                        <span className="font-semibold">
                          {searchData.firstName} {searchData.lastName}
                        </span>{' '}
                        is part of this group. Please RSVP for everyone below.
                      </p>
                    </div>
                  )}

                {/* Header with guest count */}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-5 h-5" />
                  <p className="text-sm font-medium">
                    {foundGuest && foundGuest.plusOnes.length > 0
                      ? `${foundGuest.plusOnes.length + 1} guests in your party`
                      : '1 guest'}
                  </p>
                </div>

                {/* Individual guest cards */}
                <div className="space-y-4">
                  {foundGuest &&
                    [foundGuest, ...foundGuest.plusOnes].map((guest, index) => (
                      <Card
                        key={guest.id}
                        className="border-l-4 border-l-accent/60 bg-muted/20"
                      >
                        <CardContent className="pt-6 space-y-4">
                          {/* Guest name header */}
                          <div className="flex items-center gap-3 pb-3 border-b border-border/30">
                            <div className="rounded-full bg-accent/10 p-2">
                              <Check className="w-4 h-4 text-accent" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg text-foreground">
                                {guest.firstName} {guest.lastName}
                              </h3>
                              {index === 0 &&
                                foundGuest.plusOnes.length > 0 && (
                                  <p className="text-xs text-muted-foreground">
                                    Primary Guest
                                  </p>
                                )}
                              {index > 0 && (
                                <p className="text-xs text-muted-foreground">
                                  Plus One
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Attendance question */}
                          <div className="space-y-3">
                            <Label className="text-foreground font-medium">
                              Will {guest.firstName} be attending? *
                            </Label>
                            <RadioGroup
                              value={
                                guestResponses[guest.id]?.isAttending || ''
                              }
                              onValueChange={(value) =>
                                handleGuestResponseChange(
                                  guest.id,
                                  'isAttending',
                                  value,
                                )
                              }
                              className="space-y-2"
                              required
                            >
                              <div className="flex items-center space-x-3 border border-border/50 rounded-lg p-3 hover:border-accent/30 transition-colors">
                                <RadioGroupItem
                                  value="yes"
                                  id={`yes-${guest.id}`}
                                  className="border-border"
                                />
                                <Label
                                  htmlFor={`yes-${guest.id}`}
                                  className="cursor-pointer font-normal flex-1"
                                >
                                  Yes, {guest.firstName} will be there
                                </Label>
                              </div>
                              <div className="flex items-center space-x-3 border border-border/50 rounded-lg p-3 hover:border-accent/30 transition-colors">
                                <RadioGroupItem
                                  value="no"
                                  id={`no-${guest.id}`}
                                  className="border-border"
                                />
                                <Label
                                  htmlFor={`no-${guest.id}`}
                                  className="cursor-pointer font-normal flex-1"
                                >
                                  Sorry, {guest.firstName} can&apos;t make it
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>

                          {/* Dietary restrictions - only show if attending */}
                          {guestResponses[guest.id]?.isAttending === 'yes' && (
                            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                              <Label
                                htmlFor={`dietary-${guest.id}`}
                                className="text-foreground font-medium"
                              >
                                Dietary Restrictions or Allergies
                              </Label>
                              <Textarea
                                id={`dietary-${guest.id}`}
                                value={
                                  guestResponses[guest.id]
                                    ?.dietaryRestrictions || ''
                                }
                                onChange={(e) =>
                                  handleGuestResponseChange(
                                    guest.id,
                                    'dietaryRestrictions',
                                    e.target.value,
                                  )
                                }
                                placeholder={`Any dietary needs for ${guest.firstName}...`}
                                className="bg-input border-border/50 focus:border-accent/50 min-h-[80px] resize-none"
                              />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>

                {/* Housing preference - shown if anyone is attending */}
                {anyoneAttending() && (
                  <div className="pt-4 border-t border-border/30 animate-in fade-in duration-300 space-y-4">
                    {/* Default option info */}
                    <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <strong className="text-foreground">
                          Default: Reserved Rooms
                        </strong>
                        <br />
                        We have reserved rooms at Borgo Siliano and separate
                        nearby villas for the majority of our guests on a
                        first-come, first-served basis. If you would like to
                        stay in these reserved rooms, no action is needed.
                        Please make payment by{' '}
                        <strong className="text-foreground">
                          June 1st, 2026
                        </strong>{' '}
                        to secure your accommodation.
                      </p>
                    </div>

                    {/* Opt-out option */}
                    <div className="flex items-center space-x-3 border border-border/50 rounded-lg p-4 hover:border-accent/30 transition-colors">
                      <input
                        type="checkbox"
                        id="housing"
                        checked={wantsOwnHousing}
                        onChange={(e) => setWantsOwnHousing(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded border-border/50 text-accent focus:ring-accent/30"
                      />
                      <Label
                        htmlFor="housing"
                        className="cursor-pointer font-normal flex-1"
                      >
                        I will arrange my own accommodation for my party.
                      </Label>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-4 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    className="flex-1 border-border/50 hover:border-accent/30 hover:bg-muted/50 h-12"
                  >
                    Start Over
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading || !canSubmit()}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-12 font-medium"
                  >
                    {loading ? 'Submitting...' : 'Submit RSVP'}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
