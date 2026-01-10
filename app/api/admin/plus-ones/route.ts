import { NextResponse } from 'next/server'
import {
  linkPlusOne,
  unlinkPlusOne,
  getAllPlusOneRelationships,
} from '@/lib/db/queries'
import type { LinkPlusOneRequest } from '@/lib/types'

export async function GET() {
  try {
    const relationships = await getAllPlusOneRelationships()
    return NextResponse.json({ relationships })
  } catch (error) {
    console.error('Error fetching plus-one relationships:', error)
    return NextResponse.json(
      { error: 'An error occurred while fetching plus-one relationships' },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body: LinkPlusOneRequest = await request.json()
    const { primaryGuestId, plusOneGuestId } = body

    if (!primaryGuestId || !plusOneGuestId) {
      return NextResponse.json(
        { error: 'Primary guest ID and plus-one guest ID are required' },
        { status: 400 },
      )
    }

    if (primaryGuestId === plusOneGuestId) {
      return NextResponse.json(
        { error: 'A guest cannot be their own plus-one' },
        { status: 400 },
      )
    }

    await linkPlusOne(primaryGuestId, plusOneGuestId)

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Error linking plus-one:', error)
    return NextResponse.json(
      { error: 'An error occurred while linking the plus-one' },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const body: LinkPlusOneRequest = await request.json()
    const { primaryGuestId, plusOneGuestId } = body

    if (!primaryGuestId || !plusOneGuestId) {
      return NextResponse.json(
        { error: 'Primary guest ID and plus-one guest ID are required' },
        { status: 400 },
      )
    }

    const success = await unlinkPlusOne(primaryGuestId, plusOneGuestId)

    if (!success) {
      return NextResponse.json(
        { error: 'Plus-one relationship not found' },
        { status: 404 },
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error unlinking plus-one:', error)
    return NextResponse.json(
      { error: 'An error occurred while unlinking the plus-one' },
      { status: 500 },
    )
  }
}
