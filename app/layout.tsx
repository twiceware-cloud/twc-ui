import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { Fira_Code, Work_Sans } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import type React from 'react'

import { cn } from '@/lib/utils'
import '@fontsource/clear-sans/100.css'
import '@fontsource/clear-sans/300.css'
import '@fontsource/clear-sans/400.css'
import '@fontsource/clear-sans/500.css'
import '@fontsource/clear-sans/700.css'
import '@fontsource-variable/jetbrains-mono'

import '@/styles/app.css'

export const metadata: Metadata = {
  title: {
    template: '%s | twc-ui',
    default:
      'twc-ui – Shadcn like components with react-aria-components and optimizations for Inertia.js with Laravel'
  },
  metadataBase: new URL('https://ui.twiceware.cloud/'),
  description:
    'Animated components and building blocks built for smooth interaction and  rich detail. Copy, customise, and create without the extra setup.',
  keywords: [
    'Tailwind CSS',
    'shadcn',
    'Next.js',
    'React',
    'animations',
    'copy-paste components',
    'gsap',
    'gsap react'
  ],
  authors: [
    {
      name: 'Danny Spangenberg',
      url: 'https://twiceware.de'
    }
  ],
  creator: 'Danny Spangenberg',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ui.twiceware.cloud',
    title: 'PaceUI – Animated Components and Blocks for React Ecosystem',
    description:
      'Animated components and building blocks built for smooth interaction and  rich detail. Copy, customise, and create without the extra setup.',
    siteName: 'PaceUI',
    images: [
      {
        url: 'https://paceui.com/images/og.jpg',
        alt: 'PaceUI'
      },
      {
        url: 'https://paceui.com/images/logo.png',
        alt: 'PaceUI Logo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PaceUI – Animated Components and Blocks for React Ecosystem',
    description:
      'Animated components and building blocks built for smooth interaction and  rich detail. Copy, customise, and create without the extra setup.',
    creator: '@paceui_'
  },
  icons: {
    icon: [
      {
        url: '/images/favicon-light.png',
        media: '(prefers-color-scheme: light)'
      },
      {
        url: '/images/favicon-dark.png',
        media: '(prefers-color-scheme: dark)'
      }
    ],
    apple: [
      {
        url: '/images/favicon-light.png',
        media: '(prefers-color-scheme: light)'
      },
      {
        url: '/images/favicon-dark.png',
        media: '(prefers-color-scheme: dark)'
      }
    ]
  },
  alternates: {
    canonical: 'https://paceui.com'
  },
  robots: {
    index: true,
    follow: true
  }
}

const sansFont = Work_Sans({ subsets: ['latin'], variable: '--font-sans' })
const monoFont = Fira_Code({ subsets: ['latin'], variable: '--font-mono' })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-sans', sansFont.variable, monoFont.variable)}>
        <NextTopLoader height={1} showSpinner color="var(--color-primary)" />
        <NextThemesProvider attribute="class" defaultTheme="light">
          {children}
        </NextThemesProvider>
        <Analytics />
      </body>
    </html>
  )
}
