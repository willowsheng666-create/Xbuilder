'use client'
import { useState } from 'react'
import { PageContent } from '@/lib/types'
import { Upload, RefreshCw, Download, ArrowLeftRight } from 'lucide-react'

type HeroState = 'entry' | 'processing' | 'result'

export function HeroModule({ content }: { content: PageContent }) {
  const { hero } = content
  const [state, setState] = useState<HeroState>('entry')
  const [progress, setProgress] = useState(0)
  const [isDragOver, setIsDragOver] = useState(false)

  function handleUpload() {
    setState('processing')
    setProgress(0)
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 85) {
          clearInterval(interval)
          setTimeout(() => setState('result'), 600)
          return 85
        }
        return p + Math.random() * 15
      })
    }, 200)
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">{hero.title}</h1>
        <p className="text-muted text-base sm:text-lg mb-10 leading-relaxed">{hero.subtitle}</p>

        {state === 'entry' && (
          <div
            onDragOver={e => { e.preventDefault(); setIsDragOver(true) }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={e => { e.preventDefault(); setIsDragOver(false); handleUpload() }}
            onClick={handleUpload}
            className="card mx-auto max-w-lg p-10 flex flex-col items-center gap-4 cursor-pointer transition-all hover:shadow-md"
            style={{
              borderStyle: 'dashed',
              borderWidth: 2,
              opacity: isDragOver ? 0.8 : 1,
              transform: isDragOver ? 'scale(1.02)' : 'scale(1)',
            }}
          >
            <div className="w-12 h-12 rounded-full accent-bg flex items-center justify-center">
              <Upload className="w-5 h-5 primary-color" />
            </div>
            <div>
              {hero.uploadHint.split('\n').map((line, i) => (
                <p key={i} className={i === 0 ? 'font-medium text-sm' : 'text-muted text-xs mt-1'}>
                  {line}
                </p>
              ))}
            </div>
            <button className="btn-primary text-sm font-semibold px-6 py-2.5">
              {hero.ctaText}
            </button>
          </div>
        )}

        {state === 'processing' && (
          <div className="card mx-auto max-w-lg p-10 flex flex-col items-center gap-6">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-color" />
              <div
                className="absolute inset-0 rounded-full border-4 border-transparent"
                style={{
                  borderTopColor: 'var(--color-primary)',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
            </div>
            <div className="w-full space-y-2">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress}%`, backgroundColor: 'var(--color-primary)' }}
                />
              </div>
              <p className="text-muted text-xs">
                {progress < 85 ? 'Processing your image…' : 'Almost done, please wait…'}
              </p>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>
        )}

        {state === 'result' && (
          <div className="space-y-6">
            <div className="card mx-auto max-w-lg overflow-hidden">
              <div className="flex">
                <div className="flex-1 p-6 text-center accent-bg">
                  <div className="w-full h-32 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                    Before
                  </div>
                </div>
                <div className="flex items-center justify-center px-2">
                  <ArrowLeftRight className="w-4 h-4 text-muted" />
                </div>
                <div className="flex-1 p-6 text-center">
                  <div
                    className="w-full h-32 rounded-lg flex items-center justify-center text-xs text-white font-medium"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    After
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm font-semibold">
                <Download className="w-4 h-4" />
                Download Result
              </button>
              <button
                onClick={() => setState('entry')}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-color rounded card"
                style={{ borderRadius: 'var(--radius-btn)' }}
              >
                <RefreshCw className="w-4 h-4" />
                Try Another Photo
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
