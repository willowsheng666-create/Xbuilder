'use client'
import { useSitesStore } from '@/lib/store'
import { getStylePack } from '@/lib/styles'
import { SitePreview } from '@/components/preview/SitePreview'
import { useEffect, use } from 'react'
import Link from 'next/link'
import { Zap } from 'lucide-react'

interface Props {
  params: Promise<{ id: string }>
}

export default function SitePage({ params }: Props) {
  const { id } = use(params)
  const { sites, updateSiteAnalytics } = useSitesStore()
  const site = sites.find(s => s.id === id)

  useEffect(() => {
    if (site) {
      updateSiteAnalytics(site.id, { visits: site.analytics.visits + 1 })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (!site) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Site not found</h1>
          <p className="text-gray-500 text-sm mb-6">
            This site may have been deleted or the link is incorrect.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Zap className="w-4 h-4" />
            Create your own tool with XBuilder
          </Link>
        </div>
      </div>
    )
  }

  const stylePack = getStylePack(site.stylePackId)

  return (
    <div className="min-h-screen">
      <SitePreview
        content={site.pageContent}
        modules={site.modules}
        moduleOrder={site.moduleOrder}
        stylePack={stylePack}
        customPrimary={site.customPrimary}
      />
      {/* Powered by badge */}
      <div className="fixed bottom-4 right-4 z-50">
        <Link
          href="/"
          className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-xs font-medium text-gray-600 hover:shadow-md transition-shadow"
        >
          <Zap className="w-3 h-3 text-blue-600" />
          Made with XBuilder
        </Link>
      </div>
    </div>
  )
}
