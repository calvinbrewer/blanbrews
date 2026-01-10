import { NextResponse } from 'next/server'
import { updateGuest, deleteGuest } from '@/lib/db/queries'
import type { CreateGuestRequest } from '@/lib/types'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const body: Partial<CreateGuestRequest> = await request.json()

    const guest = await updateGuest(id, body)

    if (!guest) {
      return NextResponse.json({ error: 'Guest not found' }, { status: 404 })
    }

    return NextResponse.json(guest)
  } catch (error) {
    console.error('Error updating guest:', error)
    return NextResponse.json(
      { error: 'An error occurred while updating the guest' },
      { status: 500 },
    )
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const success = await deleteGuest(id)

    if (!success) {
      return NextResponse.json({ error: 'Guest not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting guest:', error)
    return NextResponse.json(
      { error: 'An error occurred while deleting the guest' },
      { status: 500 },
    )
  }
}
