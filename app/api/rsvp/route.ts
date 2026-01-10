import { NextResponse } from 'next/server'
import { updateMultipleGuestsRSVP } from '@/lib/db/queries'
import type { RSVPFormData } from '@/lib/types'

export async function POST(request: Request) {
  try {
    const body: RSVPFormData = await request.json()
    const { guestIds, isAttending, dietaryRestrictions, wantsOwnHousing } = body

    if (!guestIds || guestIds.length === 0) {
      return NextResponse.json(
        { error: 'At least one guest ID is required' },
        { status: 400 },
      )
    }

    if (typeof isAttending !== 'boolean') {
      return NextResponse.json(
        { error: 'Attendance status is required' },
        { status: 400 },
      )
    }

    // Update all guests' RSVP information
    const updatedGuests = await updateMultipleGuestsRSVP(guestIds, {
      isAttending,
      dietaryRestrictions,
      wantsOwnHousing: wantsOwnHousing || false,
    })

    return NextResponse.json({
      success: true,
      guests: updatedGuests,
    })
  } catch (error) {
    console.error('Error submitting RSVP:', error)
    return NextResponse.json(
      { error: 'An error occurred while submitting your RSVP' },
      { status: 500 },
    )
  }
}
