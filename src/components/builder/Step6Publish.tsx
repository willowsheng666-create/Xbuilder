'use client'
import { useState } from 'react'
import { useBuilderStore, useSitesStore } from '@/lib/store'
import { getStylePack } from '@/lib/styles'
import { Button } from '@/components/ui/Button'
import { generateId, slugify } from '@/lib/utils'
import { PublishedSite } from '@/lib/types'
import { Globe, Lock, Copy, Check, ExternalLink, BarChart2, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Step6Publish() {
  const {
    selectedWorkflow,
    modules,
    moduleOrder,
    stylePackId,
    customPrimary,
    pageContent,
    publishedUrl,
    siteId,
    setPublished,
    setStep,
  } = useBuilderStore()

  const { addSite } = useSitesStore()
  const [pageName, setPageName] = useState(selectedWorkflow?.name ?? 'My Tool')
  const [urlSlug, setUrlSlug] = useState(slugify(selectedWorkflow?.name ?? 'my-tool'))
  const [access, setAccess] = useState<'public' | 'link-only'>('public')
  const [isPublishing, setIsPublishing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [published, setPublishedLocal] = useState(!!publishedUrl)

  const stylePack = getStylePack(stylePackId)
  const liveUrl = `/site/${siteId ?? urlSlug}`

  async function handlePublish() {
    if (!selectedWorkflow || !pageContent) return
    setIsPublishing(true)

    await new Promise(r => setTimeout(r, 1200)) // simulate publish delay

    const id = generateId()
    const site: PublishedSite = {
      id,
      name: pageName,
      url: `/site/${id}`,
      workflowId: selectedWorkflow.id,
      workflowName: selectedWorkflow.name,
      stylePackId,
      pageContent,
      modules,
      moduleOrder,
      stylePackCss: stylePack.css,
      customPrimary,
      publishedAt: new Date().toISOString(),
      analytics: {
        visits: 0,
        workflowCalls: 0,
        conversionRate: 0,
        topDropoff: 'upload',
      },
    }

    addSite(site)
    setPublished(`/site/${id}`, id)
    setPublishedLocal(true)
    setIsPublishing(false)
  }

  function copyUrl() {
    const fullUrl = window.location.origin + (siteId ? `/site/${siteId}` : liveUrl)
    navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (published && siteId) {
    return (
      <div className="space-y-6">
        {/* Success state */}
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Published Successfully!</h2>
          <p className="text-sm text-gray-500 mt-1">Your tool is live and ready to share.</p>
        </div>

        {/* URL */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-green-800">
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">Live URL</span>
          </div>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-xs bg-white border border-green-200 rounded-lg px-3 py-2 truncate text-green-700">
              {typeof window !== 'undefined' ? window.location.origin : ''}/site/{siteId}
            </code>
            <button
              onClick={copyUrl}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <a
            href={`/site/${siteId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-green-700 hover:text-green-900 font-medium"
          >
            <ExternalLink className="w-3 h-3" />
            Open in new tab
          </a>
        </div>

        {/* Analytics preview */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-gray-700">
            <BarChart2 className="w-4 h-4" />
            <span className="text-sm font-medium">Analytics</span>
            <span className="text-xs text-gray-400 ml-auto">Updates in real-time</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Visits', value: '0' },
              { label: 'Workflow Calls', value: '0' },
              { label: 'Conversion', value: '0%' },
            ].map(stat => (
              <div key={stat.label} className="bg-white rounded-lg p-3 text-center border border-gray-200">
                <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setStep(4)} className="flex-1">
            <ArrowLeft className="w-4 h-4" />
            Back to Edit
          </Button>
          <a href="/dashboard" className="flex-1">
            <Button className="w-full">
              View Dashboard →
            </Button>
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Publish Your Tool</h2>
        <p className="text-sm text-gray-500 mt-1">
          Final check before going live. You can always edit and republish later.
        </p>
      </div>

      {/* Pre-publish checks */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Pre-publish checks</h3>
        {[
          { label: 'Workflow connected', ok: !!selectedWorkflow },
          { label: 'Page content generated', ok: !!pageContent },
          { label: 'Visual style selected', ok: !!stylePackId },
          { label: 'Required modules enabled', ok: modules.find(m => m.id === 'hero')?.enabled ?? false },
        ].map(check => (
          <div key={check.label} className="flex items-center gap-2 text-sm">
            <div className={cn(
              'w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0',
              check.ok ? 'bg-green-100' : 'bg-red-100'
            )}>
              <Check className={cn('w-2.5 h-2.5', check.ok ? 'text-green-600' : 'text-red-400')} />
            </div>
            <span className={check.ok ? 'text-gray-700' : 'text-red-500'}>{check.label}</span>
          </div>
        ))}
      </div>

      {/* Publish config */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Page Name</label>
          <input
            value={pageName}
            onChange={e => {
              setPageName(e.target.value)
              setUrlSlug(slugify(e.target.value))
            }}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">URL Path</label>
          <div className="flex items-center gap-0 border border-gray-200 rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-blue-500">
            <span className="px-3 py-2 text-sm text-gray-400 bg-gray-50 border-r border-gray-200 whitespace-nowrap">
              xbuilder.app/site/
            </span>
            <input
              value={urlSlug}
              onChange={e => setUrlSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
              className="flex-1 px-3 py-2 text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Access</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'public' as const, label: 'Public', desc: 'Anyone can access', icon: Globe },
              { id: 'link-only' as const, label: 'Link only', desc: 'Only via direct link', icon: Lock },
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => setAccess(opt.id)}
                className={cn(
                  'p-3 rounded-lg border text-left transition-all',
                  access === opt.id
                    ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                )}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <opt.icon className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-xs font-semibold text-gray-900">{opt.label}</span>
                </div>
                <p className="text-xs text-gray-500">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={() => setStep(4)}>
          Back
        </Button>
        <Button
          onClick={handlePublish}
          disabled={isPublishing || !selectedWorkflow || !pageContent}
          className="flex-1"
        >
          {isPublishing ? (
            <>
              <RefreshCwIcon />
              Publishing…
            </>
          ) : (
            <>
              <Globe className="w-4 h-4" />
              Publish Now
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

function RefreshCwIcon() {
  return (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <path d="M4 4v5h5M20 20v-5h-5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 9a9 9 0 1 1 0 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  )
}
