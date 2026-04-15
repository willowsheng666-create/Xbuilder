import Link from 'next/link'
import { Zap, ArrowRight, Clock, Layers, BarChart2, RefreshCw, Sparkles } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
            <Zap className="w-[18px] h-[18px] text-white" />
          </div>
          <span className="font-bold text-gray-900 text-lg">XBuilder</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Dashboard
          </Link>
          <Link
            href="/builder"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Start Building
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-sm text-blue-700 font-medium mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          AI Workflow → Web Tool in minutes
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
          Ship your AI tool page
          <br />
          <span className="text-blue-600">before lunch.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
          XBuilder turns any internal AI Workflow into a polished, shareable web tool — no code, no design sprints.
          Select a workflow, pick a style, and go live in under 30 minutes.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/builder"
            className="flex items-center gap-2 bg-blue-600 text-white px-7 py-3.5 rounded-xl text-base font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          >
            Create your first tool
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-gray-600 border border-gray-200 px-7 py-3.5 rounded-xl text-base font-medium hover:bg-gray-50 transition-colors"
          >
            View Dashboard
          </Link>
        </div>
        <p className="text-xs text-gray-400 mt-4">No credit card required · Takes ~30 minutes</p>
      </section>

      {/* Process steps */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How it works</h2>
            <p className="text-gray-500">Six steps from idea to live tool.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: '1 → 2',
                icon: Layers,
                color: 'blue',
                title: 'Select & Configure',
                desc: 'Pick a Workflow from your library, then choose which page modules to include. Toggle, reorder, done.',
              },
              {
                step: '3 → 4',
                icon: Sparkles,
                color: 'purple',
                title: 'Style & Preview',
                desc: 'Choose a visual style pack. AI generates all the page copy. See the live preview instantly, edit inline.',
              },
              {
                step: '5 → 6',
                icon: Zap,
                color: 'green',
                title: 'Publish & Measure',
                desc: 'One click to go live. Track visits, workflow calls, and conversion rate — then iterate.',
              },
            ].map(item => (
              <div key={item.step} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                <div className={`inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-full ${
                  item.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                  item.color === 'purple' ? 'bg-purple-50 text-purple-600' : 'bg-green-50 text-green-600'
                }`}>
                  Step {item.step}
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  item.color === 'blue' ? 'bg-blue-50' :
                  item.color === 'purple' ? 'bg-purple-50' : 'bg-green-50'
                }`}>
                  <item.icon className={`w-5 h-5 ${
                    item.color === 'blue' ? 'text-blue-600' :
                    item.color === 'purple' ? 'text-purple-600' : 'text-green-600'
                  }`} />
                </div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Built for validation speed</h2>
          <p className="text-gray-500">Every feature is designed to reduce time-to-feedback.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              icon: Clock,
              title: 'Under 30 minutes to live',
              desc: 'From selecting a workflow to a shareable URL — no waiting for dev sprints.',
            },
            {
              icon: Layers,
              title: 'Module-based page structure',
              desc: 'Toggle and reorder pre-built modules: Nav, Hero, How To, FAQ, Reviews and more.',
            },
            {
              icon: Sparkles,
              title: 'AI-generated page copy',
              desc: 'Claude writes your headlines, descriptions, how-to steps, and FAQ automatically.',
            },
            {
              icon: BarChart2,
              title: 'Built-in analytics',
              desc: 'Track visits, workflow calls, and conversion rates right from the dashboard.',
            },
            {
              icon: RefreshCw,
              title: 'Iterate in minutes',
              desc: 'Edit text inline, swap modules, change style — republish in seconds. No dev needed.',
            },
            {
              icon: Zap,
              title: '5 curated style packs',
              desc: 'Minimalist, Tech Dark, Bold, Professional, Soft. Plus custom color override.',
            },
          ].map(feature => (
            <div key={feature.title} className="flex gap-4 p-5 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/20 transition-all">
              <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-[18px] h-[18px] text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-blue-600 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to validate your next product idea?</h2>
          <p className="text-blue-100 mb-8">
            Stop waiting for dev resources. Ship a real working tool page and get genuine user feedback today.
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-blue-50 transition-colors"
          >
            Start building for free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-sm">XBuilder</span>
          </div>
          <div className="flex gap-6 text-xs text-gray-400">
            <a href="#" className="hover:text-gray-600">Terms</a>
            <a href="#" className="hover:text-gray-600">Privacy</a>
            <a href="#" className="hover:text-gray-600">Support</a>
          </div>
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} XBuilder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
