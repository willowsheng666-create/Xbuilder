'use client'

import { useState } from 'react'
import {
  Home,
  FolderOpen,
  Palette,
  Rocket,
  User,
  Plus,
  ArrowUp,
  Workflow,
  MessageSquare,
  Settings2,
} from 'lucide-react'

const NAV_ITEMS = [
  { icon: Home, label: '首页', active: true },
  { icon: FolderOpen, label: '项目' },
  { icon: Palette, label: '风格' },
  { icon: Rocket, label: '发布' },
]

export default function HomePage() {
  const [mode, setMode] = useState<'chat' | 'pro'>('chat')
  const [prompt, setPrompt] = useState('')

  return (
    <div className="flex h-screen bg-[#0b1810] text-white overflow-hidden">
      {/* Left Sidebar */}
      <aside className="flex flex-col items-center py-6 px-3 w-[60px] shrink-0 border-r border-white/5">
        {/* Logo */}
        <div className="w-9 h-9 rounded-xl bg-[#1e4030] flex items-center justify-center mb-8">
          <Rocket className="w-4 h-4 text-emerald-400" />
        </div>

        {/* Nav icons */}
        <nav className="flex flex-col items-center gap-3 flex-1">
          {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              title={label}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                active
                  ? 'bg-white text-[#0b1810]'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/10'
              }`}
            >
              <Icon className="w-[18px] h-[18px]" />
            </button>
          ))}
        </nav>

        {/* User at bottom */}
        <button
          title="账户"
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors mt-auto"
        >
          <User className="w-[18px] h-[18px]" />
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center px-6 overflow-y-auto">
        <div className="w-full max-w-[760px] pt-20 pb-10">
          {/* Heading */}
          <h1 className="text-center text-[42px] font-bold leading-tight mb-3 tracking-tight">
            想法落地，一句话的事
          </h1>
          <p className="text-center text-white/45 text-[15px] mb-8">
            描述你想要的页面，AI 即刻生成可运行的完整代码
          </p>

          {/* Mode toggle */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-1 bg-white/8 border border-white/10 rounded-full p-1">
              <button
                onClick={() => setMode('chat')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  mode === 'chat'
                    ? 'bg-white/15 text-white'
                    : 'text-white/50 hover:text-white/70'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                对话模式
              </button>
              <button
                onClick={() => setMode('pro')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  mode === 'pro'
                    ? 'bg-white/15 text-white'
                    : 'text-white/50 hover:text-white/70'
                }`}
              >
                <Settings2 className="w-3.5 h-3.5" />
                专业模式
              </button>
            </div>
          </div>

          {/* Input card */}
          <div className="bg-white/6 border border-white/10 rounded-2xl overflow-hidden mb-10">
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="描述你想要创建的网页..."
              rows={4}
              className="w-full bg-transparent px-5 pt-5 pb-3 text-sm text-white placeholder:text-white/30 resize-none outline-none"
            />
            {/* Bottom toolbar */}
            <div className="flex items-center px-4 pb-3 pt-1 gap-2">
              <button className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors text-xs">
                <Palette className="w-3.5 h-3.5" />
                风格
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors text-xs">
                <Workflow className="w-3.5 h-3.5" />
                工作流
              </button>
              <div className="flex-1" />
              <button
                disabled={!prompt.trim()}
                className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              >
                <ArrowUp className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Projects section */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold">项目</h2>
            <button className="text-sm text-white/40 hover:text-white/70 transition-colors">
              管理项目
            </button>
          </div>

          {/* Empty state */}
          <div className="bg-white/4 border border-white/8 rounded-2xl flex flex-col items-center justify-center py-16 px-6">
            <p className="text-white/35 text-sm mb-5">还没有项目，立即创建一个吧！</p>
            <button className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#222] border border-white/10 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors">
              <Settings2 className="w-4 h-4" />
              创建第一个项目
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
