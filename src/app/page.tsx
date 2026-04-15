'use client'

import { useState } from 'react'
import {
  Home,
  FolderOpen,
  Palette,
  Rocket,
  User,
  Plus,
  Cpu,
  GitBranch,
  ArrowUp,
  MessageSquare,
  Settings2,
} from 'lucide-react'

const sidebarItems = [
  { icon: Home, label: '首页', active: true },
  { icon: FolderOpen, label: '项目' },
  { icon: Palette, label: '风格' },
  { icon: Rocket, label: '发布' },
]

export default function HomePage() {
  const [mode, setMode] = useState<'chat' | 'pro'>('chat')
  const [input, setInput] = useState('')

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--background)' }}>
      {/* Left Sidebar */}
      <aside
        className="flex flex-col items-center py-5 gap-4 flex-shrink-0"
        style={{
          width: '64px',
          background: 'var(--sidebar-bg)',
          borderRight: '1px solid var(--border)',
        }}
      >
        {/* Nav icons */}
        <div className="flex flex-col items-center gap-3 flex-1">
          {sidebarItems.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              title={label}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
              style={{
                background: active ? 'rgba(255,255,255,0.95)' : 'transparent',
                color: active ? '#0d1410' : 'var(--muted)',
              }}
              onMouseEnter={e => {
                if (!active) (e.currentTarget as HTMLButtonElement).style.color = '#fff'
              }}
              onMouseLeave={e => {
                if (!active) (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)'
              }}
            >
              <Icon size={18} />
            </button>
          ))}
        </div>

        {/* User icon at bottom */}
        <button
          title="账号"
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
          style={{ color: 'var(--muted)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#fff' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)' }}
        >
          <User size={18} />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Hero + Input */}
        <section className="flex flex-col items-center pt-16 pb-12 px-6">
          {/* Heading */}
          <h1
            className="text-5xl font-bold tracking-tight text-center mb-3 leading-tight"
            style={{ color: '#fff', letterSpacing: '-0.01em' }}
          >
            想法落地，一句话的事
          </h1>
          <p className="text-base text-center mb-8" style={{ color: 'var(--muted)' }}>
            描述你想要的页面，AI 即刻生成可运行的完整代码
          </p>

          {/* Mode Toggle */}
          <div
            className="flex items-center rounded-full p-1 mb-6 gap-1"
            style={{ background: 'rgba(255,255,255,0.07)' }}
          >
            <button
              onClick={() => setMode('chat')}
              className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: mode === 'chat' ? 'rgba(255,255,255,0.12)' : 'transparent',
                color: mode === 'chat' ? '#fff' : 'var(--muted)',
              }}
            >
              <MessageSquare size={14} />
              对话模式
            </button>
            <button
              onClick={() => setMode('pro')}
              className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: mode === 'pro' ? 'rgba(255,255,255,0.12)' : 'transparent',
                color: mode === 'pro' ? '#fff' : 'var(--muted)',
              }}
            >
              <Settings2 size={14} />
              专业模式
            </button>
          </div>

          {/* Input Box */}
          <div
            className="w-full max-w-3xl rounded-2xl flex flex-col"
            style={{
              background: 'var(--input-bg)',
              border: '1px solid var(--border)',
            }}
          >
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="描述你想要创建的网页..."
              rows={4}
              className="w-full bg-transparent resize-none px-5 pt-4 pb-2 text-sm outline-none placeholder-stone-500"
              style={{ color: '#fff' }}
            />
            {/* Toolbar */}
            <div className="flex items-center gap-3 px-4 pb-3 pt-1">
              <button
                className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#fff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)' }}
              >
                <Plus size={14} />
              </button>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors"
                style={{ color: 'var(--muted)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#fff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)' }}
              >
                <Cpu size={13} />
                风格
              </button>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors"
                style={{ color: 'var(--muted)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#fff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)' }}
              >
                <GitBranch size={13} />
                工作流
              </button>
              <div className="flex-1" />
              <button
                className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity"
                style={{
                  background: input.trim() ? 'var(--accent-green)' : '#1e3327',
                  color: '#fff',
                  opacity: input.trim() ? 1 : 0.6,
                }}
                disabled={!input.trim()}
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="px-10 pb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold" style={{ color: '#fff' }}>
              项目
            </h2>
            <button
              className="text-sm transition-colors"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#fff' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)' }}
            >
              管理项目
            </button>
          </div>

          {/* Empty state */}
          <div
            className="rounded-2xl flex flex-col items-center justify-center py-20 gap-5"
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              minHeight: '200px',
            }}
          >
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              还没有项目，立即创建一个吧！
            </p>
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
              style={{
                background: '#1a1f1c',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#242b26' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1a1f1c' }}
            >
              <Settings2 size={14} />
              创建第一个项目
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
