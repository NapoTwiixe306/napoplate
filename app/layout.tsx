import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {Providers} from "@/app/providers";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Templates Nextjs',
  description: 'Temaplte Nextjs made by NapoTwiixe',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
      <Providers>
        {children}
      </Providers>
      </body>
    </html>
  )
}
