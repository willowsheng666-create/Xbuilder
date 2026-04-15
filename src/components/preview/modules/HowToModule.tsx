'use client'
import { PageContent } from '@/lib/types'

export function HowToModule({ content }: { content: PageContent }) {
  const { howto } = content
  return (
    <section id="howto" className="py-16 px-4 accent-bg">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2">How It Works</h2>
        <p className="text-muted text-sm text-center mb-10">Three simple steps to transform your photos</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {howto.map((step, i) => (
            <div key={i} className="card p-6 text-center space-y-3">
              <div className="text-3xl">{step.icon}</div>
              <div
                className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center mx-auto"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                {i + 1}
              </div>
              <h3 className="font-semibold text-sm">{step.title}</h3>
              <p className="text-muted text-xs leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
