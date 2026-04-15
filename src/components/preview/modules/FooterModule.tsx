'use client'
import { PageContent } from '@/lib/types'

export function FooterModule({ content }: { content: PageContent }) {
  const { nav, footerLinks } = content
  return (
    <footer id="footer" className="border-t border-color py-8 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-bold text-sm">{nav.logo}</span>
        <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
          {footerLinks.map(link => (
            <a key={link.label} href={link.href} className="text-muted text-xs hover:opacity-80">
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-muted text-xs">© {new Date().getFullYear()} {nav.logo}. All rights reserved.</p>
      </div>
    </footer>
  )
}
