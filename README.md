This is a [Next.js](https://nextjs.org) wedding website with a full RSVP management system powered by Drizzle ORM and Supabase.

## 🚀 Quick Start

### 1. Setup Database
See [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) for complete setup instructions.

**Quick steps:**
1. Add Supabase credentials to `.env.local`
2. Run `bun run db:push` to create tables
3. Run `bun run dev` to start dev server
4. Visit `http://localhost:3000/admin` to add guests

### 2. Admin Access
The admin interface is protected with HTTP Basic Authentication.

**Default credentials** (change these!):
- Username: `admin`
- Password: `changeme`

Configure in `.env.local`:
```env
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_secure_password
```

## ✨ Features

### Guest-Facing
- Name-based guest lookup (case-insensitive)
- Automatic plus-one detection and display
- RSVP with attendance selection
- Dietary restrictions input
- Housing preference opt-out

### Admin Dashboard
- View all guests with statistics
- Add/edit/delete guests
- Link plus-one relationships
- Search and filter guests
- Real-time RSVP status tracking
- **Protected with HTTP Basic Auth**

## 🛠️ Available Scripts

```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run linter

# Database commands
bun run db:push      # Push schema to database
bun run db:studio    # Open database GUI
bun run db:seed      # Add sample test data
```

## 🔒 Security

All admin routes (`/admin` and `/api/admin/*`) are protected with HTTP Basic Authentication:
- Credentials stored in environment variables
- Browser-native login prompt
- Simple and effective protection

⚠️ **Important**: Change default credentials before deploying!

## Getting Started

First, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Website modes

In `/admin`, use **Your wedding website** to choose **Planning & RSVP** (the
original site) or **Wedding Weekend**. The weekend version puts the schedule,
dress codes, taxi, directions, shuttle, and parking details first. Choose whether
to include travel guides, nearby towns, accommodation/payment, RSVP, registry,
and the original FAQs. **Preview selected version** opens an authenticated
preview without publishing. **Save website changes** updates the public site on
the next visit or refresh. Switching back restores the original planning page.

Settings are shared in PostgreSQL, not stored in a visitor’s browser. Apply
`drizzle/0002_website_settings.sql` before deploying this version, using the
project’s migration workflow. This migration only creates the settings table and
enables row-level security; it does not change guest records. Existing database
installations managed with `db:push` can apply the new migration SQL directly.
Until a mode is saved, the original planning site remains active. Public visits
fall back to the original site if settings cannot be read; the admin panel shows
an error and does not allow a save until settings have loaded successfully.

The admin API and preview use the existing Basic Auth protection. Settings writes
also require a same-origin JSON request. Keep `ADMIN_USERNAME` and `ADMIN_PASSWORD`
configured on the deployed app. No public Supabase policies are added for the
settings table; reads and writes go through the server’s database connection.

Schedule entries and the taxi contact are shared in `lib/wedding.ts` so both
versions use the same details. Transportation wording is shared in
`components/transportation-copy.tsx`.

### Verify website modes

`scripts/verify-website-modes.mjs` tests the running production app over HTTP:
authentication, invalid/cross-site requests, preview isolation, persisted mode
changes, optional sections, and switching back. Run it only against localhost
with a disposable PostgreSQL database initialized with all three SQL migrations.
Start the app with `DATABASE_URL` pointing at that test database and test admin
credentials, then run:

```sh
WEBSITE_TEST_URL=http://localhost:3107 \
WEBSITE_TEST_DISPOSABLE_DB=yes \
WEBSITE_TEST_USER=website_test \
WEBSITE_TEST_PASSWORD=website_test_only \
node scripts/verify-website-modes.mjs
```

The tests change the local settings row and finish in Planning & RSVP mode.
