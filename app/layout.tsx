import type React from 'react'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Suspense } from 'react'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CJ & Tori - October 2026 | Tuscany Wedding',
  description:
    'Join us for our wedding celebration in beautiful Tuscany, Italy from October 1-4, 2026',
  openGraph: {
    title: 'CJ & Tori - October 2026 | Tuscany Wedding',
    description:
      'Join us for our wedding celebration in beautiful Tuscany, Italy from October 1-4, 2026',
    url: 'https://blanbrews.com',
    siteName: 'CJ & Tori Wedding',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'CJ & Tori Wedding - October 2026 in Tuscany, Italy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CJ & Tori - October 2026 | Tuscany Wedding',
    description:
      'Join us for our wedding celebration in beautiful Tuscany, Italy from October 1-4, 2026',
    images: ['/og.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable}`}
      >
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
