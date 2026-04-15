'use client'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

const STEPS = [
  { number: 1, label: 'Workflow' },
  { number: 2, label: 'Configure' },
  { number: 3, label: 'Style' },
  { number: 4, label: 'Preview' },
  { number: 6, label: 'Publish' },
]

interface StepIndicatorProps {
  currentStep: number
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, i) => {
        const isCompleted = currentStep > step.number || (currentStep === 6 && step.number < 6)
        const isActive = currentStep === step.number || (currentStep === 4 && step.number === 4)
        const isPreview = step.number === 4 && currentStep === 4

        return (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all',
                  isCompleted && 'bg-blue-600 text-white',
                  isActive && !isCompleted && 'bg-blue-600 text-white ring-4 ring-blue-100',
                  !isCompleted && !isActive && 'bg-gray-100 text-gray-400'
                )}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : step.number === 4 ? '4&5' : step.number}
              </div>
              <span
                className={cn(
                  'text-xs font-medium whitespace-nowrap',
                  (isActive || isCompleted) ? 'text-blue-600' : 'text-gray-400'
                )}
              >
                {isPreview ? 'Preview & Edit' : step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  'w-16 h-0.5 mx-1 mb-5 transition-all',
                  currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
