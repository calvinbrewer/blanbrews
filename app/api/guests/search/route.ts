import { NextResponse } from 'next/server'
import { findGuestByName, getGuestWithPlusOnes } from '@/lib/db/queries'
import type { SearchGuestRequest } from '@/lib/types'

export async function POST(request: Request) {
  try {
    const body: SearchGuestRequest = await request.json()
    const { firstName, lastName } = body

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: 'First name and last name are required' },
        { status: 400 },
      )
    }

    // Find the guest by name
    const guest = await findGuestByName(firstName, lastName)

    if (!guest) {
      return NextResponse.json(
        {
          error:
            'Guest not found. Please check the spelling or contact the hosts.',
        },
        { status: 404 },
      )
    }

    // Get the guest with their plus-ones
    const guestWithPlusOnes = await getGuestWithPlusOnes(guest.id)

    return NextResponse.json(guestWithPlusOnes)
  } catch (error) {
    console.error('Error searching for guest:', error)
    return NextResponse.json(
      { error: 'An error occurred while searching for the guest' },
      { status: 500 },
    )
  }
}
