'use client'
import { PageContent } from '@/lib/types'
import { Star } from 'lucide-react'

export function ReviewsModule({ content }: { content: PageContent }) {
  const { reviews } = content
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2">What Users Say</h2>
        <p className="text-muted text-sm text-center mb-10">Trusted by thousands of creators</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {reviews.map((review, i) => (
            <div key={i} className="card p-5 space-y-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-current" style={{ color: 'var(--color-primary)' }} />
                ))}
              </div>
              <p className="text-sm leading-relaxed">"{review.text}"</p>
              <div className="flex items-center gap-2 pt-1">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  {review.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium">{review.name}</p>
                  <p className="text-muted text-xs">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
