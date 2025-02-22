import { cn } from '@/lib/utils'

interface BentoGridProps {
  className?: string
  children: React.ReactNode
}

interface BentoItemProps {
  className?: string
  title?: string
  description?: string
  header?: React.ReactNode
  icon?: React.ReactNode
  children: React.ReactNode
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div className={cn(
      'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
      className
    )}>
      {children}
    </div>
  )
}

export function BentoItem({
  className,
  title,
  description,
  header,
  icon,
  children
}: BentoItemProps) {
  return (
    <div className={cn(
      'group relative overflow-hidden rounded-xl border border-slate-800/50',
      'bg-slate-900/30 backdrop-blur-sm',
      'hover:bg-slate-900/50 hover:border-slate-700/50 transition-all duration-300',
      className
    )}>
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative p-6">
        {header}

        {(title || description) && (
          <div className="flex flex-col gap-2">
            {icon && (
              <div className="h-12 w-12 rounded-lg bg-slate-800/50 p-2 flex items-center justify-center">
                {icon}
              </div>
            )}
            {title && (
              <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-slate-50 to-slate-400/80">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-slate-400">{description}</p>
            )}
          </div>
        )}

        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}
