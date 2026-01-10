import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Disable prefetch as it's not supported for "Transaction" pool mode
// biome-ignore lint/style/noNonNullAssertion: I don't want to deal with the type errors right now
const connectionString = process.env.DATABASE_URL!

export const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client, { schema })
