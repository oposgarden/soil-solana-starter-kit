import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth/options'
import Provider from '@/lib/providers'
import './globals.css'
import '@solana/wallet-adapter-react-ui/styles.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Soil - Solana Starter Kit',
  description: 'Next.js, Prisma and Next-auth Solana starter kit',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <Provider session={session}>
        <body className={inter.className}>{children}</body>
      </Provider>
    </html>
  )
}
