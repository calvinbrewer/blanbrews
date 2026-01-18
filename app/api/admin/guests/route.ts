import { NextResponse } from 'next/server'
import { getAllGuests, createGuest } from '@/lib/db/queries'
import type { CreateGuestRequest } from '@/lib/types'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get('page') || '1', 10)
    const pageSize = Number.parseInt(searchParams.get('pageSize') || '200', 10)

    const result = await getAllGuests(page, pageSize)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching guests:', error)
    return NextResponse.json(
      { error: 'An error occurred while fetching guests' },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body: CreateGuestRequest = await request.json()
    const { firstName, lastName, email } = body

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: 'First name and last name are required' },
        { status: 400 },
      )
    }

    const guest = await createGuest({ firstName, lastName, email })

    return NextResponse.json(guest, { status: 201 })
  } catch (error) {
    console.error('Error creating guest:', error)
    return NextResponse.json(
      { error: 'An error occurred while creating the guest' },
      { status: 500 },
    )
  }
}
