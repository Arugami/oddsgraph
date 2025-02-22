import { cn } from '@/lib/utils'
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

interface StorylineCardProps {
  gameId: string
  narrative: string
  sentiment: 'positive' | 'negative' | 'neutral'
  confidence: number
  keyEvents: {
    timestamp: string
    event: string
    impact: number
  }[]
  historicalContext?: string
}

export const StorylineCard = ({
  gameId,
  narrative,
  sentiment,
  confidence,
  keyEvents,
  historicalContext
}: StorylineCardProps) => {
  return (
    <div className="bg-slate-800/50 rounded-lg p-4 backdrop-blur-sm">
      {/* Narrative Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className={cn(
          "p-2 rounded-full",
          sentiment === 'positive' && "bg-green-500/20",
          sentiment === 'negative' && "bg-red-500/20",
          sentiment === 'neutral' && "bg-blue-500/20"
        )}>
          {sentiment === 'positive' && <ArrowTrendingUpIcon className="w-5 h-5 text-green-500" />}
          {sentiment === 'negative' && <ArrowTrendingDownIcon className="w-5 h-5 text-red-500" />}
          {sentiment === 'neutral' && <InformationCircleIcon className="w-5 h-5 text-blue-500" />}
        </div>
        <div>
          <p className="text-sm text-slate-200 leading-relaxed">{narrative}</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-1.5 w-24 bg-slate-700 rounded-full overflow-hidden">
              <motion.div 
                className={cn(
                  "h-full rounded-full",
                  sentiment === 'positive' && "bg-green-500",
                  sentiment === 'negative' && "bg-red-500",
                  sentiment === 'neutral' && "bg-blue-500"
                )}
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-xs text-slate-400">{confidence}% confidence</span>
          </div>
        </div>
      </div>

      {/* Key Events Timeline */}
      <div className="space-y-3 mb-4">
        {keyEvents.map((event, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="relative flex flex-col items-center">
              <div className="w-2 h-2 rounded-full bg-primary-500" />
              {index !== keyEvents.length - 1 && (
                <div className="w-0.5 h-full bg-slate-700 absolute top-2" />
              )}
            </div>
            <div className="flex-1 -mt-1">
              <span className="text-xs text-slate-400">{event.timestamp}</span>
              <p className="text-sm text-slate-300">{event.event}</p>
              <div className="mt-1 flex items-center gap-1">
                <span className="text-xs text-slate-400">Impact:</span>
                <div className="flex">
                  {[...Array(Math.abs(event.impact))].map((_, i) => (
                    <div 
                      key={i}
                      className={cn(
                        "w-1.5 h-4 rounded-sm mx-0.5",
                        event.impact > 0 ? "bg-green-500/50" : "bg-red-500/50"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Historical Context */}
      {historicalContext && (
        <div className="mt-4 p-3 bg-slate-700/30 rounded-md">
          <div className="flex items-center gap-2 mb-2">
            <InformationCircleIcon className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-medium text-slate-400">Historical Context</span>
          </div>
          <p className="text-sm text-slate-300">{historicalContext}</p>
        </div>
      )}
    </div>
  )
}
