'use client'
import { STYLE_PACKS } from '@/lib/styles'
import { useBuilderStore } from '@/lib/store'
import { StylePackId } from '@/lib/types'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export function Step3Style() {
  const { stylePackId, setStylePack, customPrimary, setCustomPrimary, setStep } = useBuilderStore()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Choose Visual Style</h2>
        <p className="text-sm text-gray-500 mt-1">
          Pick a preset style pack. You can fine-tune further in the preview step.
        </p>
      </div>

      <div className="space-y-3">
        {STYLE_PACKS.map(pack => (
          <button
            key={pack.id}
            onClick={() => setStylePack(pack.id as StylePackId)}
            className={cn(
              'w-full text-left p-4 rounded-xl border transition-all group',
              stylePackId === pack.id
                ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50/30'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
            )}
          >
            <div className="flex items-center gap-4">
              {/* Color preview */}
              <div
                className="w-14 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border overflow-hidden"
                style={{ background: pack.preview.bg, borderColor: pack.preview.accent }}
              >
                <div className="flex flex-col gap-1 items-center">
                  <div
                    className="w-8 h-1.5 rounded-full"
                    style={{ background: pack.preview.text, opacity: 0.6 }}
                  />
                  <div
                    className="w-6 h-2.5 rounded-sm"
                    style={{ background: pack.preview.primary }}
                  />
                </div>
              </div>

              {/* Name + description */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{pack.name}</span>
                  {stylePackId === pack.id && (
                    <span className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                      <Check className="w-3 h-3" />
                      Selected
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{pack.description}</p>
              </div>

              {/* Color dots */}
              <div className="flex gap-1.5 flex-shrink-0">
                {[pack.preview.bg, pack.preview.primary, pack.preview.text].map((c, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full border border-black/10"
                    style={{ background: c }}
                  />
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Custom accent color */}
      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
        <h3 className="text-sm font-medium text-gray-900">Override Primary Color (optional)</h3>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={customPrimary || STYLE_PACKS.find(s => s.id === stylePackId)?.preview.primary || '#2563EB'}
            onChange={e => setCustomPrimary(e.target.value)}
            className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5"
          />
          <input
            type="text"
            value={customPrimary}
            onChange={e => setCustomPrimary(e.target.value)}
            placeholder="#2563EB"
            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          />
          {customPrimary && (
            <button
              onClick={() => setCustomPrimary('')}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={() => setStep(2)}>
          Back
        </Button>
        <Button onClick={() => setStep(4)} className="flex-1">
          Generate & Preview →
        </Button>
      </div>
    </div>
  )
}
