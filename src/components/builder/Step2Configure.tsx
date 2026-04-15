'use client'
import { useBuilderStore } from '@/lib/store'
import { ModuleConfig, ModuleId } from '@/lib/types'
import { GripVertical, Lock, MessageSquare, Layers } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const MODULE_DESCRIPTIONS: Record<ModuleId, string> = {
  nav: 'Logo, navigation links, and CTA button at the top',
  hero: 'Main interaction area with upload, processing, and result states',
  howto: '3-step guide explaining how to use the tool',
  scenery: 'Use case cards showing when to use this tool',
  othertools: 'Showcase other tools from your platform',
  reviews: 'User testimonials to build trust (enable after you have real reviews)',
  faq: 'Frequently asked questions — great for SEO',
  footer: 'Copyright, privacy links, and contact info',
}

function SortableModuleRow({ module, onToggle }: {
  module: ModuleConfig
  onToggle: (id: ModuleId) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: module.id, disabled: !module.enabled })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-start gap-3 p-3 rounded-xl border bg-white transition-all',
        isDragging && 'opacity-50 shadow-lg',
        module.enabled ? 'border-gray-200' : 'border-dashed border-gray-200 opacity-60',
        module.required && 'border-blue-200 bg-blue-50/30'
      )}
    >
      <div
        {...attributes}
        {...listeners}
        className={cn(
          'mt-0.5 cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 transition-colors',
          (!module.enabled || module.required) && 'cursor-not-allowed opacity-30'
        )}
      >
        <GripVertical className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm font-medium text-gray-900">{module.label}</span>
          {module.required && (
            <span className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full">
              <Lock className="w-2.5 h-2.5" />
              required
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">{MODULE_DESCRIPTIONS[module.id]}</p>
      </div>

      <button
        onClick={() => !module.required && onToggle(module.id)}
        disabled={module.required}
        className={cn(
          'relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0 mt-0.5',
          module.enabled ? 'bg-blue-600' : 'bg-gray-200',
          module.required && 'cursor-not-allowed'
        )}
      >
        <span
          className={cn(
            'inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform',
            module.enabled ? 'translate-x-4.5' : 'translate-x-0.5'
          )}
          style={{ transform: module.enabled ? 'translateX(17px)' : 'translateX(2px)' }}
        />
      </button>
    </div>
  )
}

export function Step2Configure() {
  const {
    modules,
    moduleOrder,
    toggleModule,
    setModuleOrder,
    setStep,
    selectedWorkflow,
    configMode,
    setConfigMode,
  } = useBuilderStore()

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

  const enabledCount = modules.filter(m => m.enabled).length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Configure Page</h2>
        <p className="text-sm text-gray-500 mt-1">
          Choose which modules appear on your tool page and drag to reorder them.
        </p>
      </div>

      {selectedWorkflow && (
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm">
          <span className="text-gray-500">Workflow: </span>
          <span className="font-medium text-gray-900">{selectedWorkflow.name}</span>
        </div>
      )}

      {/* Mode tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setConfigMode('modules')}
          className={cn(
            'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all',
            configMode === 'modules'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          <Layers className="w-3.5 h-3.5" />
          Module Mode
        </button>
        <button
          onClick={() => setConfigMode('chat')}
          className={cn(
            'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all',
            configMode === 'chat'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Chat Mode
        </button>
      </div>

      {configMode === 'modules' ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{enabledCount} modules enabled · drag to reorder</span>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={moduleOrder} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {orderedModules.map(module => (
                  <SortableModuleRow
                    key={module.id}
                    module={module}
                    onToggle={toggleModule}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      ) : (
        <ChatConfigMode />
      )}

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={() => setStep(1)}>
          Back
        </Button>
        <Button onClick={() => setStep(3)} className="flex-1">
          Next: Choose Style →
        </Button>
      </div>
    </div>
  )
}

function ChatConfigMode() {
  return (
    <div className="space-y-3">
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
        <strong>Chat mode:</strong> Describe your ideal page in natural language. The more specific you are, the better the result.
      </div>
      <div className="relative">
        <textarea
          placeholder={`Example: "I want a clean single-page tool with a large upload area in the center. After processing, show a side-by-side before/after comparison. Include a FAQ section but skip the Reviews and Other Tools sections. Make the hero copy focus on speed — '5 seconds to a better photo'."`}
          className="w-full h-36 p-3 text-sm border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <p className="text-xs text-gray-400">
        Your description will be used during page generation in Step 4.
      </p>
    </div>
  )
}
