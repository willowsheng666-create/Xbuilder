'use client'
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
            'bg-gray-100 text-gray-900 hover:bg-gray-200': variant === 'secondary',
            'hover:bg-gray-100 text-gray-700': variant === 'ghost',
            'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50': variant === 'outline',
          },
          {
            'px-3 py-1.5 text-sm rounded-md gap-1.5': size === 'sm',
            'px-4 py-2 text-sm rounded-lg gap-2': size === 'md',
            'px-6 py-3 text-base rounded-lg gap-2': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
