import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'XBuilder — AI Workflow to Web Tool in minutes',
  description:
    'XBuilder lets small innovation teams turn internal AI Workflows into polished, shareable web tools — no code required. Select a workflow, choose a visual style, and publish in under 30 minutes.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full`}>{children}</body>
    </html>
  )
}
