/**
 * Example seed script for testing the RSVP system
 * 
 * Usage:
 * 1. Make sure your .env.local is configured with Supabase credentials
 * 2. Run: npm run db:push (to create tables)
 * 3. Run: node --env-file=.env.local scripts/seed-example.js
 * 
 * This will create sample guests and relationships for testing.
 */

import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from '../lib/db/schema.js'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  console.error('❌ DATABASE_URL not found in environment variables')
  process.exit(1)
}

const client = postgres(connectionString, { prepare: false })
const db = drizzle(client, { schema })

async function seed() {
  console.log('🌱 Seeding database...')

  try {
    // Create sample guests
    const guests = await db
      .insert(schema.guests)
      .values([
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
        },
        {
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane.doe@example.com',
        },
        {
          firstName: 'Bob',
          lastName: 'Smith',
          email: 'bob.smith@example.com',
        },
        {
          firstName: 'Alice',
          lastName: 'Johnson',
          email: 'alice.johnson@example.com',
        },
        {
          firstName: 'Charlie',
          lastName: 'Brown',
          email: null, // Example of guest without email
        },
      ])
      .returning()

    console.log(`✅ Created ${guests.length} guests`)

    // Link some plus-one relationships
    // John Doe's plus-one is Jane Doe
    await db.insert(schema.plusOneRelationships).values({
      primaryGuestId: guests[0].id,
      plusOneGuestId: guests[1].id,
    })

    // Bob Smith's plus-one is Alice Johnson
    await db.insert(schema.plusOneRelationships).values({
      primaryGuestId: guests[2].id,
      plusOneGuestId: guests[3].id,
    })

    console.log('✅ Created plus-one relationships')
    console.log('\n📋 Sample Guests:')
    console.log('  - John Doe (with plus-one: Jane Doe)')
    console.log('  - Bob Smith (with plus-one: Alice Johnson)')
    console.log('  - Charlie Brown (no plus-one)')
    console.log('\n🎉 Database seeded successfully!')
    console.log('\n🧪 Try searching for these guests in the RSVP form:')
    console.log('  First Name: John, Last Name: Doe')
    console.log('  First Name: Bob, Last Name: Smith')
    console.log('  First Name: Charlie, Last Name: Brown')

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

seed()
