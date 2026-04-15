'use client'
import { useBuilderStore } from '@/lib/store'
import { StepIndicator } from '@/components/builder/StepIndicator'
import { Step1Workflow } from '@/components/builder/Step1Workflow'
import { Step2Configure } from '@/components/builder/Step2Configure'
import { Step3Style } from '@/components/builder/Step3Style'
import { Step4Preview } from '@/components/builder/Step4Preview'
import { Step6Publish } from '@/components/builder/Step6Publish'
import { Zap } from 'lucide-react'
import Link from 'next/link'

const NARROW_STEPS = new Set([1, 2, 3, 6])

export default function BuilderPage() {
  const { currentStep } = useBuilderStore()

  const isWide = currentStep === 4

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-gray-900">XBuilder</span>
        </Link>
        <StepIndicator currentStep={currentStep} />
        <Link
          href="/dashboard"
          className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
        >
          My Sites →
        </Link>
      </header>

      {/* Content */}
      <main className={`flex-1 flex ${isWide ? 'p-4' : 'items-start justify-center p-6'}`}>
        {isWide ? (
          <div className="w-full h-[calc(100vh-120px)]">
            <Step4Preview />
          </div>
        ) : (
          <div className="w-full max-w-xl space-y-6">
            {currentStep === 1 && <Step1Workflow />}
            {currentStep === 2 && <Step2Configure />}
            {currentStep === 3 && <Step3Style />}
            {currentStep === 6 && <Step6Publish />}
          </div>
        )}
      </main>
    </div>
  )
}
