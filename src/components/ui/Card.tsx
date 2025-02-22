import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  hoverable?: boolean
}

export default function Card({ children, className = '', onClick, hoverable = false }: CardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl',
        'bg-slate-800/50 backdrop-blur-sm',
        'border border-slate-700/50',
        'p-4',
        hoverable && 'hover:bg-slate-800/70 hover:border-slate-600/50 transition-all cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-transparent pointer-events-none" />
      
      {/* Card content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

interface CardHeaderProps {
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
}

export function CardHeader({ title, description, action }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-3">
      <div>
        <div className="font-semibold">{title}</div>
        {description && <div className="text-sm text-slate-400">{description}</div>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

interface CardStatProps {
  label: string
  value: string | number
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string | number
}

export function CardStat({ label, value, trend, trendValue }: CardStatProps) {
  const trendColor = trend === 'up' ? 'text-secondary-500' : trend === 'down' ? 'text-accent-500' : 'text-slate-400'
  
  return (
    <div className="flex justify-between items-center py-2">
      <span className="text-sm text-slate-400">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-mono">{value}</span>
        {trendValue && (
          <span className={`text-sm ${trendColor}`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
          </span>
        )}
      </div>
    </div>
  )
}
