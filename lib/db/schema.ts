import { pgTable, uuid, text, boolean, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const guests = pgTable('guests', {
  id: uuid('id').primaryKey().defaultRandom(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email'),
  hasRsvped: boolean('has_rsvped').notNull().default(false),
  isAttending: boolean('is_attending'),
  dietaryRestrictions: text('dietary_restrictions'),
  wantsOwnHousing: boolean('wants_own_housing').notNull().default(false),
  rsvpedAt: timestamp('rsvped_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const plusOneRelationships = pgTable('plus_one_relationships', {
  id: uuid('id').primaryKey().defaultRandom(),
  primaryGuestId: uuid('primary_guest_id')
    .notNull()
    .references(() => guests.id, { onDelete: 'cascade' }),
  plusOneGuestId: uuid('plus_one_guest_id')
    .notNull()
    .references(() => guests.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// Relations
export const guestsRelations = relations(guests, ({ many }) => ({
  plusOnesAsPrimary: many(plusOneRelationships, {
    relationName: 'primary_guest',
  }),
  plusOnesAsGuest: many(plusOneRelationships, {
    relationName: 'plus_one_guest',
  }),
}))

export const plusOneRelationshipsRelations = relations(
  plusOneRelationships,
  ({ one }) => ({
    primaryGuest: one(guests, {
      fields: [plusOneRelationships.primaryGuestId],
      references: [guests.id],
      relationName: 'primary_guest',
    }),
    plusOneGuest: one(guests, {
      fields: [plusOneRelationships.plusOneGuestId],
      references: [guests.id],
      relationName: 'plus_one_guest',
    }),
  }),
)
