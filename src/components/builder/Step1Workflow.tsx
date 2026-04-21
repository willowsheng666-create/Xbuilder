'use client'
import { MOCK_WORKFLOWS } from '@/lib/workflows'
import { useBuilderStore } from '@/lib/store'
import { Workflow } from '@/lib/types'
import { Clock, Image, ArrowRight, Search, Frame, CheckCircle, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const CATEGORIES = ['All', ...Array.from(new Set(MOCK_WORKFLOWS.map(w => w.category)))]

function isFigmaUrl(url: string): boolean {
  try {
    const u = new URL(url)
    return u.hostname === 'www.figma.com' || u.hostname === 'figma.com'
  } catch {
    return false
  }
}

export function Step1Workflow() {
  const { selectWorkflow, setStep, selectedWorkflow, setFigmaUrl, figmaUrl } = useBuilderStore()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [figmaInput, setFigmaInput] = useState(figmaUrl ?? '')
  const [figmaError, setFigmaError] = useState('')

  const filtered = MOCK_WORKFLOWS.filter(w => {
    const matchesSearch = w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'All' || w.category === activeCategory
    return matchesSearch && matchesCategory
  })

  function handleSelect(workflow: Workflow) {
    selectWorkflow(workflow)
    setStep(2)
  }

  function handleFigmaSubmit() {
    const trimmed = figmaInput.trim()
    if (!trimmed) {
      setFigmaError('')
      setFigmaUrl(null)
      return
    }
    if (!isFigmaUrl(trimmed)) {
      setFigmaError('请输入有效的 Figma 链接（如 https://www.figma.com/file/...）')
      return
    }
    setFigmaError('')
    setFigmaUrl(trimmed)
  }

  const figmaSaved = figmaUrl && figmaUrl === figmaInput.trim()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Select a Workflow</h2>
        <p className="text-sm text-gray-500 mt-1">
          Choose the AI capability you want to wrap into a web tool.
        </p>
      </div>

      {/* Figma URL input */}
      <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/40 space-y-3">
        <div className="flex items-center gap-2">
          <Frame className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-800">从 Figma 设计稿开始（可选）</span>
        </div>
        <p className="text-xs text-gray-500">
          粘贴你的 Figma 文件或原型链接，AI 将参考你的设计风格生成页面内容。
        </p>
        <div className="flex gap-2">
          <input
            value={figmaInput}
            onChange={e => { setFigmaInput(e.target.value); setFigmaError('') }}
            onBlur={handleFigmaSubmit}
            placeholder="https://www.figma.com/file/..."
            className={cn(
              'flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white',
              figmaError ? 'border-red-300' : 'border-gray-200'
            )}
          />
          <button
            onClick={handleFigmaSubmit}
            className="px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            确认
          </button>
        </div>
        {figmaError && (
          <div className="flex items-center gap-1.5 text-xs text-red-600">
            <AlertCircle className="w-3.5 h-3.5" />
            {figmaError}
          </div>
        )}
        {figmaSaved && (
          <div className="flex items-center gap-1.5 text-xs text-green-600">
            <CheckCircle className="w-3.5 h-3.5" />
            Figma 链接已保存，将在内容生成时参考此设计。
          </div>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search workflows..."
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'px-3 py-1 text-xs font-medium rounded-full border transition-all',
              activeCategory === cat
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Workflow list */}
      <div className="grid grid-cols-1 gap-3">
        {filtered.map(workflow => (
          <button
            key={workflow.id}
            onClick={() => handleSelect(workflow)}
            className={cn(
              'group text-left p-4 rounded-xl border transition-all hover:border-blue-400 hover:shadow-sm',
              selectedWorkflow?.id === workflow.id
                ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                : 'border-gray-200 bg-white hover:bg-blue-50/30'
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{workflow.name}</h3>
                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    {workflow.category}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{workflow.description}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Image className="w-3 h-3" />
                    {workflow.inputType} → {workflow.outputType}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    ~{workflow.estimatedSeconds}s
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-1" />
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-sm">No workflows match your search.</p>
        </div>
      )}
    </div>
  )
}
