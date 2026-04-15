'use client'
import { useState } from 'react'
import { PageContent } from '@/lib/types'
import { ChevronDown } from 'lucide-react'

export function FAQModule({ content }: { content: PageContent }) {
  const { faq } = content
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-16 px-4 accent-bg">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2">Frequently Asked Questions</h2>
        <p className="text-muted text-sm text-center mb-10">Everything you need to know</p>
        <div className="space-y-2">
          {faq.map((item, i) => (
            <div key={i} className="card overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:surface-bg transition-colors"
              >
                <span className="text-sm font-medium">{item.question}</span>
                <ChevronDown
                  className="w-4 h-4 text-muted flex-shrink-0 transition-transform duration-200"
                  style={{ transform: open === i ? 'rotate(180deg)' : 'none' }}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-sm text-muted leading-relaxed border-t border-color pt-3">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
