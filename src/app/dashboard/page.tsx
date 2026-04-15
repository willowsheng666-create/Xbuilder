'use client'
import { useSitesStore, useBuilderStore } from '@/lib/store'
import { formatNumber } from '@/lib/utils'
import Link from 'next/link'
import { Zap, Plus, ExternalLink, BarChart2, TrendingUp, Users, MousePointer, ArrowUpRight, Clock } from 'lucide-react'
import { getStylePack } from '@/lib/styles'

export default function DashboardPage() {
  const { sites } = useSitesStore()
  const { reset } = useBuilderStore()

  const totalVisits = sites.reduce((sum, s) => sum + s.analytics.visits, 0)
  const totalCalls = sites.reduce((sum, s) => sum + s.analytics.workflowCalls, 0)
  const avgConversion = sites.length
    ? sites.reduce((sum, s) => sum + s.analytics.conversionRate, 0) / sites.length
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-gray-900">XBuilder</span>
        </Link>
        <Link
          href="/builder"
          onClick={reset}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Site
        </Link>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Sites</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your published tools and track their performance.</p>
        </div>

        {/* Aggregate stats */}
        {sites.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Total Sites', value: sites.length.toString(), icon: Zap, color: 'blue' },
              { label: 'Total Visits', value: formatNumber(totalVisits), icon: Users, color: 'purple' },
              { label: 'Workflow Calls', value: formatNumber(totalCalls), icon: MousePointer, color: 'green' },
              { label: 'Avg Conversion', value: `${avgConversion.toFixed(1)}%`, icon: TrendingUp, color: 'orange' },
            ].map(stat => (
              <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${
                  stat.color === 'blue' ? 'bg-blue-50' :
                  stat.color === 'purple' ? 'bg-purple-50' :
                  stat.color === 'green' ? 'bg-green-50' : 'bg-orange-50'
                }`}>
                  <stat.icon className={`w-4 h-4 ${
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'purple' ? 'text-purple-600' :
                    stat.color === 'green' ? 'text-green-600' : 'text-orange-600'
                  }`} />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Sites list */}
        {sites.length === 0 ? (
          <div className="text-center py-24 border-2 border-dashed border-gray-200 rounded-2xl">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No sites yet</h3>
            <p className="text-sm text-gray-500 mb-6">
              Create your first AI-powered tool page in minutes.
            </p>
            <Link
              href="/builder"
              onClick={reset}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create your first site
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {sites.map(site => {
              const stylePack = getStylePack(site.stylePackId)
              const publishedDate = new Date(site.publishedAt).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
              })

              return (
                <div key={site.id} className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col sm:flex-row gap-4">
                  {/* Style preview swatch */}
                  <div
                    className="w-12 h-12 rounded-xl flex-shrink-0 border border-gray-100 flex items-center justify-center"
                    style={{ background: stylePack.preview.bg }}
                  >
                    <div
                      className="w-6 h-4 rounded"
                      style={{ background: stylePack.preview.primary }}
                    />
                  </div>

                  {/* Site info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 truncate">{site.name}</h3>
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          <span className="text-xs text-gray-500">{site.workflowName}</span>
                          <span className="text-xs text-gray-300">·</span>
                          <span className="text-xs text-gray-400 capitalize">{site.stylePackId.replace('-', ' ')}</span>
                          <span className="text-xs text-gray-300">·</span>
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            {publishedDate}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Link
                          href={site.url}
                          target="_blank"
                          className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 border border-blue-200 rounded-lg px-2.5 py-1.5 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View
                        </Link>
                        <Link
                          href="/builder"
                          className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg px-2.5 py-1.5 transition-colors"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>

                    {/* Analytics row */}
                    <div className="flex items-center gap-6 mt-3 pt-3 border-t border-gray-100">
                      {[
                        { icon: Users, label: 'Visits', value: formatNumber(site.analytics.visits) },
                        { icon: MousePointer, label: 'Calls', value: formatNumber(site.analytics.workflowCalls) },
                        { icon: TrendingUp, label: 'Conversion', value: `${site.analytics.conversionRate}%` },
                        { icon: ArrowUpRight, label: 'Drop-off', value: site.analytics.topDropoff },
                      ].map(stat => (
                        <div key={stat.label} className="flex items-center gap-1.5">
                          <stat.icon className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-xs text-gray-500">{stat.label}:</span>
                          <span className="text-xs font-semibold text-gray-900">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
