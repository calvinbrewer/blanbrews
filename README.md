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
