'use client'
import { PageContent } from '@/lib/types'

export function NavModule({ content }: { content: PageContent }) {
  const { nav } = content
  return (
    <nav className="border-b border-color sticky top-0 z-50 surface-bg">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <span className="font-bold text-base">{nav.logo}</span>
        <div className="hidden sm:flex items-center gap-6">
          {nav.links.map(link => (
            <a key={link.label} href={link.href} className="text-sm text-muted hover:opacity-80 transition-opacity">
              {link.label}
            </a>
          ))}
        </div>
        <button className="btn-primary text-sm font-medium px-4 py-2">{nav.ctaText}</button>
      </div>
    </nav>
  )
}
