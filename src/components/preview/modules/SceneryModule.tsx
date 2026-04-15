'use client'
import { useState } from 'react'
import { PageContent } from '@/lib/types'

export function SceneryModule({ content }: { content: PageContent }) {
  const { scenery } = content
  const [active, setActive] = useState(0)

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2">When to Use</h2>
        <p className="text-muted text-sm text-center mb-10">Perfect for a variety of use cases</p>
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Labels */}
          <div className="flex sm:flex-col gap-2 flex-shrink-0">
            {scenery.map((item, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="px-4 py-2.5 text-sm font-medium rounded-lg text-left transition-all"
                style={
                  active === i
                    ? { backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: 'var(--radius-btn)' }
                    : { color: 'var(--color-text-muted)' }
                }
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div className="card flex-1 p-6 space-y-4">
            <div
              className="w-full h-36 rounded-lg flex items-center justify-center text-muted text-sm accent-bg"
              style={{ borderRadius: 'var(--radius-card)' }}
            >
              {scenery[active]?.imageHint} example
            </div>
            <h3 className="font-semibold">{scenery[active]?.label}</h3>
            <p className="text-muted text-sm leading-relaxed">{scenery[active]?.description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
