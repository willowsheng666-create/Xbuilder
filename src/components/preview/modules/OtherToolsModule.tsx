'use client'
import { PageContent } from '@/lib/types'

export function OtherToolsModule({ content }: { content: PageContent }) {
  const { otherTools } = content
  return (
    <section className="py-16 px-4 accent-bg">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2">More AI Tools</h2>
        <p className="text-muted text-sm text-center mb-10">Explore our other image enhancement tools</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {otherTools.map((tool, i) => (
            <div key={i} className="card p-5 space-y-2 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-sm">{tool.name}</h3>
              <p className="text-muted text-xs leading-relaxed">{tool.description}</p>
              <a
                href={tool.href}
                className="inline-block text-xs font-medium mt-1 primary-color hover:opacity-70 transition-opacity"
              >
                Try Now →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
