// Database types
export interface Guest {
  id: string
  firstName: string
  lastName: string
  email: string | null
  hasRsvped: boolean
  isAttending: boolean | null
  dietaryRestrictions: string | null
  wantsOwnHousing: boolean
  rsvpedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface PlusOneRelationship {
  id: string
  primaryGuestId: string
  plusOneGuestId: string
  createdAt: Date
}

// API types
export interface GuestWithPlusOnes extends Guest {
  plusOnes: Guest[]
}

export interface RSVPFormData {
  guestIds: string[]
  isAttending: boolean
  dietaryRestrictions?: string
  wantsOwnHousing: boolean
}

export interface SearchGuestRequest {
  firstName: string
  lastName: string
}

export interface CreateGuestRequest {
  firstName: string
  lastName: string
  email?: string
}

export interface LinkPlusOneRequest {
  primaryGuestId: string
  plusOneGuestId: string
}
