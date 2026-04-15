'use client'
import { useEffect, useState } from 'react'
import { useBuilderStore } from '@/lib/store'
import { buildDefaultContent } from '@/lib/defaultContent'
import { getStylePack } from '@/lib/styles'
import { SitePreview } from '@/components/preview/SitePreview'
import { Button } from '@/components/ui/Button'
import { ModuleId } from '@/lib/types'
import {
  Monitor, Smartphone, RefreshCw, Eye, Layers,
  GripVertical, Lock, ChevronRight, Play, Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DndContext, closestCenter, PointerSensor, KeyboardSensor,
  useSensor, useSensors, DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext, sortableKeyboardCoordinates, useSortable,
  verticalListSortingStrategy, arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function SortableModuleChip({
  module,
  onToggle,
}: {
  module: { id: ModuleId; label: string; enabled: boolean; required: boolean }
  onToggle: (id: ModuleId) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: module.id,
    disabled: !module.enabled || module.required,
  })
  const style = { transform: CSS.Transform.toString(transform), transition }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-lg border text-xs transition-all',
        isDragging && 'opacity-50 shadow-lg',
        module.enabled ? 'bg-white border-gray-200' : 'bg-gray-50 border-dashed border-gray-200 opacity-50'
      )}
    >
      <span {...attributes} {...listeners} className="text-gray-300 cursor-grab">
        <GripVertical className="w-3 h-3" />
      </span>
      <span className="flex-1 font-medium text-gray-700 truncate">{module.label}</span>
      {module.required ? (
        <Lock className="w-3 h-3 text-blue-400" />
      ) : (
        <button
          onClick={() => onToggle(module.id)}
          className={cn(
            'relative inline-flex h-4 w-7 items-center rounded-full transition-colors flex-shrink-0',
            module.enabled ? 'bg-blue-600' : 'bg-gray-200'
          )}
        >
          <span
            className="inline-block h-3 w-3 rounded-full bg-white shadow-sm transition-transform"
            style={{ transform: module.enabled ? 'translateX(13px)' : 'translateX(1px)' }}
          />
        </button>
      )}
    </div>
  )
}

export function Step4Preview() {
  const {
    selectedWorkflow,
    modules,
    moduleOrder,
    stylePackId,
    customPrimary,
    pageContent,
    isGenerating,
    viewPort,
    setPageContent,
    setIsGenerating,
    setViewPort,
    toggleModule,
    setModuleOrder,
    setStep,
  } = useBuilderStore()

  const [sidebarTab, setSidebarTab] = useState<'modules' | 'edit'>('modules')
  const [editingField, setEditingField] = useState<string | null>(null)
  const [simulating, setSimulating] = useState(false)

  const stylePack = getStylePack(stylePackId)

  useEffect(() => {
    if (!pageContent && selectedWorkflow && !isGenerating) {
      generateContent()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function generateContent(chatPrompt?: string) {
    if (!selectedWorkflow) return
    setIsGenerating(true)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workflow: selectedWorkflow, stylePackId, chatPrompt }),
      })
      const data = await res.json()
      if (data.content) setPageContent(data.content)
    } catch {
      // Fallback to default
      setPageContent(buildDefaultContent(selectedWorkflow))
    } finally {
      setIsGenerating(false)
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = moduleOrder.indexOf(active.id as ModuleId)
      const newIndex = moduleOrder.indexOf(over.id as ModuleId)
      setModuleOrder(arrayMove(moduleOrder, oldIndex, newIndex))
    }
  }

  const orderedModules = moduleOrder
    .map(id => modules.find(m => m.id === id))
    .filter(Boolean) as typeof modules

  function updateHeroField(field: string, value: string) {
    if (!pageContent) return
    setPageContent({
      ...pageContent,
      hero: { ...pageContent.hero, [field]: value },
    })
  }

  function updateNavField(field: string, value: string) {
    if (!pageContent) return
    setPageContent({
      ...pageContent,
      nav: { ...pageContent.nav, [field]: value },
    })
  }

  return (
    <div className="flex h-full gap-4 min-h-0">
      {/* Left sidebar */}
      <div className="w-64 flex-shrink-0 flex flex-col gap-4 overflow-y-auto">
        {/* Workflow info */}
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs">
          <div className="text-gray-500">Workflow</div>
          <div className="font-semibold text-gray-900 truncate">{selectedWorkflow?.name}</div>
          <div className="text-gray-400 mt-0.5">{stylePackId}</div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setSidebarTab('modules')}
            className={cn(
              'flex-1 flex items-center justify-center gap-1 py-1.5 rounded-md text-xs font-medium transition-all',
              sidebarTab === 'modules' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
            )}
          >
            <Layers className="w-3 h-3" />
            Modules
          </button>
          <button
            onClick={() => setSidebarTab('edit')}
            className={cn(
              'flex-1 flex items-center justify-center gap-1 py-1.5 rounded-md text-xs font-medium transition-all',
              sidebarTab === 'edit' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
            )}
          >
            <Eye className="w-3 h-3" />
            Edit Text
          </button>
        </div>

        {sidebarTab === 'modules' && (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={moduleOrder} strategy={verticalListSortingStrategy}>
              <div className="space-y-1.5">
                {orderedModules.map(module => (
                  <SortableModuleChip key={module.id} module={module} onToggle={toggleModule} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        {sidebarTab === 'edit' && pageContent && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Nav</h4>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Logo text</label>
                  <input
                    className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={pageContent.nav.logo}
                    onChange={e => updateNavField('logo', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">CTA button</label>
                  <input
                    className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={pageContent.nav.ctaText}
                    onChange={e => updateNavField('ctaText', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Hero</h4>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Title</label>
                  <textarea
                    rows={2}
                    className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={pageContent.hero.title}
                    onChange={e => updateHeroField('title', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Subtitle</label>
                  <textarea
                    rows={3}
                    className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={pageContent.hero.subtitle}
                    onChange={e => updateHeroField('subtitle', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">CTA text</label>
                  <input
                    className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={pageContent.hero.ctaText}
                    onChange={e => updateHeroField('ctaText', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regenerate */}
        <button
          onClick={() => generateContent()}
          disabled={isGenerating}
          className="flex items-center justify-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 py-2 border border-dashed border-gray-200 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={cn('w-3 h-3', isGenerating && 'animate-spin')} />
          {isGenerating ? 'Generating…' : 'Regenerate Content'}
        </button>
      </div>

      {/* Preview area */}
      <div className="flex-1 min-w-0 flex flex-col gap-3">
        {/* Preview toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewPort('desktop')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                viewPort === 'desktop' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
              )}
            >
              <Monitor className="w-3 h-3" />
              Desktop
            </button>
            <button
              onClick={() => setViewPort('mobile')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                viewPort === 'mobile' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
              )}
            >
              <Smartphone className="w-3 h-3" />
              Mobile
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSimulating(true)
                setTimeout(() => setSimulating(false), 4000)
              }}
            >
              <Play className="w-3 h-3" />
              Simulate
            </Button>
            <Button size="sm" onClick={() => setStep(6)}>
              Publish <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Preview frame */}
        <div className="flex-1 rounded-xl border border-gray-200 overflow-hidden bg-white relative">
          {isGenerating && (
            <div className="absolute inset-0 bg-white/90 z-50 flex flex-col items-center justify-center gap-3">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-4 border-gray-100" />
                <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  <Zap className="w-4 h-4 text-blue-600" />
                  Generating your page…
                </div>
                <p className="text-xs text-gray-400 mt-1">This usually takes a few seconds</p>
              </div>
            </div>
          )}

          <div
            className="h-full overflow-y-auto"
            style={
              viewPort === 'mobile'
                ? { maxWidth: 375, margin: '0 auto', boxShadow: 'inset 0 0 0 1px #e5e7eb' }
                : {}
            }
          >
            {pageContent ? (
              <SitePreview
                content={pageContent}
                modules={modules}
                moduleOrder={moduleOrder}
                stylePack={stylePack}
                customPrimary={customPrimary}
                isMobile={viewPort === 'mobile'}
              />
            ) : (
              <div className="flex items-center justify-center h-full min-h-64 text-gray-400 text-sm">
                Generating preview…
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
