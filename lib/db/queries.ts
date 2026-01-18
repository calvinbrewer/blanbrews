import { db } from './index'
import { guests, plusOneRelationships } from './schema'
import { eq, and, sql, inArray, ilike } from 'drizzle-orm'
import type { Guest, GuestWithPlusOnes, CreateGuestRequest } from '../types'

/**
 * Find a guest by name (case-insensitive)
 */
export async function findGuestByName(
  firstName: string,
  lastName: string,
): Promise<Guest | null> {
  const result = await db
    .select()
    .from(guests)
    .where(
      and(ilike(guests.firstName, firstName), ilike(guests.lastName, lastName)),
    )
    .limit(1)

  if (result.length === 0) {
    return null
  }

  return mapDbGuestToGuest(result[0])
}

/**
 * Get a guest with all their plus-ones
 * If the guest is someone's plus-one, returns the primary guest with all plus-ones
 */
export async function getGuestWithPlusOnes(
  guestId: string,
): Promise<GuestWithPlusOnes | null> {
  const guest = await db
    .select()
    .from(guests)
    .where(eq(guests.id, guestId))
    .limit(1)

  if (guest.length === 0) {
    return null
  }

  // Check if this guest is someone's plus-one
  const isPlusOneOf = await db
    .select()
    .from(plusOneRelationships)
    .where(eq(plusOneRelationships.plusOneGuestId, guestId))
    .limit(1)

  // If they are a plus-one, use their primary guest instead
  const primaryGuestId =
    isPlusOneOf.length > 0 ? isPlusOneOf[0].primaryGuestId : guestId

  // Get the primary guest data
  const primaryGuest = await db
    .select()
    .from(guests)
    .where(eq(guests.id, primaryGuestId))
    .limit(1)

  if (primaryGuest.length === 0) {
    return null
  }

  // Get all plus-one relationships where the primary guest is the primary
  const plusOneRelations = await db
    .select()
    .from(plusOneRelationships)
    .where(eq(plusOneRelationships.primaryGuestId, primaryGuestId))

  // Fetch all plus-one guests
  const plusOneIds = plusOneRelations.map((rel) => rel.plusOneGuestId)
  const plusOnesData =
    plusOneIds.length > 0
      ? await db.select().from(guests).where(inArray(guests.id, plusOneIds))
      : []

  return {
    ...mapDbGuestToGuest(primaryGuest[0]),
    plusOnes: plusOnesData.map(mapDbGuestToGuest),
  }
}

/**
 * Update a guest's RSVP information
 */
export async function updateGuestRSVP(
  guestId: string,
  data: {
    isAttending: boolean
    dietaryRestrictions?: string
    wantsOwnHousing: boolean
  },
): Promise<Guest | null> {
  const result = await db
    .update(guests)
    .set({
      hasRsvped: true,
      isAttending: data.isAttending,
      dietaryRestrictions: data.dietaryRestrictions || null,
      wantsOwnHousing: data.wantsOwnHousing,
      rsvpedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(guests.id, guestId))
    .returning()

  if (result.length === 0) {
    return null
  }

  return mapDbGuestToGuest(result[0])
}

/**
 * Update multiple guests' RSVP information (for plus-ones)
 */
export async function updateMultipleGuestsRSVP(
  guestIds: string[],
  data: {
    isAttending: boolean
    dietaryRestrictions?: string
    wantsOwnHousing: boolean
  },
): Promise<Guest[]> {
  const result = await db
    .update(guests)
    .set({
      hasRsvped: true,
      isAttending: data.isAttending,
      dietaryRestrictions: data.dietaryRestrictions || null,
      wantsOwnHousing: data.wantsOwnHousing,
      rsvpedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(inArray(guests.id, guestIds))
    .returning()

  return result.map(mapDbGuestToGuest)
}

/**
 * Create a new guest
 */
export async function createGuest(data: CreateGuestRequest): Promise<Guest> {
  const result = await db
    .insert(guests)
    .values({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email || null,
    })
    .returning()

  return mapDbGuestToGuest(result[0])
}

/**
 * Update a guest
 */
export async function updateGuest(
  guestId: string,
  data: Partial<CreateGuestRequest>,
): Promise<Guest | null> {
  const result = await db
    .update(guests)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(guests.id, guestId))
    .returning()

  if (result.length === 0) {
    return null
  }

  return mapDbGuestToGuest(result[0])
}

/**
 * Delete a guest
 */
export async function deleteGuest(guestId: string): Promise<boolean> {
  const result = await db
    .delete(guests)
    .where(eq(guests.id, guestId))
    .returning()

  return result.length > 0
}

/**
 * Get all guests with pagination
 */
export async function getAllGuests(
  page = 1,
  pageSize = 200,
): Promise<{ guests: Guest[]; total: number }> {
  const offset = (page - 1) * pageSize

  const [guestsList, countResult] = await Promise.all([
    db.select().from(guests).limit(pageSize).offset(offset),
    db.select({ count: sql<number>`count(*)` }).from(guests),
  ])

  return {
    guests: guestsList.map(mapDbGuestToGuest),
    total: Number(countResult[0].count),
  }
}

/**
 * Link a plus-one relationship
 */
export async function linkPlusOne(
  primaryGuestId: string,
  plusOneGuestId: string,
): Promise<void> {
  await db.insert(plusOneRelationships).values({
    primaryGuestId,
    plusOneGuestId,
  })
}

/**
 * Remove a plus-one relationship
 */
export async function unlinkPlusOne(
  primaryGuestId: string,
  plusOneGuestId: string,
): Promise<boolean> {
  const result = await db
    .delete(plusOneRelationships)
    .where(
      and(
        eq(plusOneRelationships.primaryGuestId, primaryGuestId),
        eq(plusOneRelationships.plusOneGuestId, plusOneGuestId),
      ),
    )
    .returning()

  return result.length > 0
}

/**
 * Get all plus-ones for a guest
 */
export async function getPlusOnesForGuest(guestId: string): Promise<Guest[]> {
  const relations = await db
    .select()
    .from(plusOneRelationships)
    .where(eq(plusOneRelationships.primaryGuestId, guestId))

  const plusOneIds = relations.map((rel) => rel.plusOneGuestId)
  if (plusOneIds.length === 0) {
    return []
  }

  const plusOnesData = await db
    .select()
    .from(guests)
    .where(inArray(guests.id, plusOneIds))

  return plusOnesData.map(mapDbGuestToGuest)
}

/**
 * Get all plus-one relationships (for admin view)
 */
export async function getAllPlusOneRelationships(): Promise<
  Array<{ primaryGuestId: string; plusOneGuestId: string }>
> {
  const relations = await db.select().from(plusOneRelationships)
  return relations.map((rel) => ({
    primaryGuestId: rel.primaryGuestId,
    plusOneGuestId: rel.plusOneGuestId,
  }))
}

// Helper function to map database guest to type-safe Guest
function mapDbGuestToGuest(dbGuest: typeof guests.$inferSelect): Guest {
  return {
    id: dbGuest.id,
    firstName: dbGuest.firstName,
    lastName: dbGuest.lastName,
    email: dbGuest.email,
    hasRsvped: dbGuest.hasRsvped,
    isAttending: dbGuest.isAttending,
    dietaryRestrictions: dbGuest.dietaryRestrictions,
    wantsOwnHousing: dbGuest.wantsOwnHousing,
    rsvpedAt: dbGuest.rsvpedAt,
    createdAt: dbGuest.createdAt,
    updatedAt: dbGuest.updatedAt,
  }
}
