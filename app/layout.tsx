import Loading from '@/app/loading'
import { CrispProvider } from '@/providers/crisp'
import { ToasterProvider } from '@/providers/toaster'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GeniusAI',
  description: 'AI Plataform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="pt-BR">
        <CrispProvider />
        <body className={inter.className}>
          <Suspense fallback={<Loading />}>
            <ToasterProvider />
            {children}
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  )
}
