'use client'

import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline'
import MiniOddsGraph from '@/components/charts/MiniOddsGraph'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { format, isToday, isTomorrow, parseISO } from 'date-fns'

interface GameCardProps {
  game: {
    id: string
    homeTeam: string
    awayTeam: string
    startTime: string
    league: string
    odds: {
      spread: string
      spreadOdds: string
      moneyline: string
      total: string
      totalOdds: string
    }
    movement?: {
      type: 'high' | 'medium' | 'low'
      value: string
    }
  }
}

function formatGameTime(dateString: string): string {
  const date = parseISO(dateString)
  const timeStr = format(date, 'h:mm a')

  if (isToday(date)) return `Today ${timeStr}`
  if (isTomorrow(date)) return `Tomorrow ${timeStr}`
  return format(date, 'MMM d') + ' ' + timeStr
}

export default function GameCard({ game }: GameCardProps) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [formattedTime, setFormattedTime] = useState('')

  useEffect(() => {
    setMounted(true)
    setFormattedTime(formatGameTime(game.startTime))
  }, [game.startTime])

  const movementColors = {
    high: 'bg-secondary-500/10 text-secondary-500',
    medium: 'bg-yellow-500/10 text-yellow-500',
    low: 'bg-slate-500/10 text-slate-400'
  }

  if (!mounted) {
    return (
      <div className="bg-slate-800/50 rounded-lg animate-pulse">
        <div className="p-4">
          <div className="h-4 bg-slate-700 rounded w-1/4 mb-2"></div>
          <div className="h-5 bg-slate-700 rounded w-3/4 mb-4"></div>
          <div className="grid grid-cols-3 gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="h-4 bg-slate-700 rounded w-full mb-2"></div>
                <div className="h-8 bg-slate-700 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <button 
      onClick={() => router.push(`/game/${game.id}`)}
      className="w-full text-left bg-slate-800/50 rounded-lg hover:bg-slate-800/75 transition-colors relative overflow-hidden group"
    >
      {/* Movement Indicator */}
      {game.movement && game.movement.type === 'high' && (
        <div className="absolute top-0 left-0 w-1 h-full bg-secondary-500" />
      )}

      <div className="p-4">
        {/* League & Time */}
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-medium text-primary-400">{game.league}</span>
          <span className="text-slate-400">{formattedTime}</span>
        </div>

        {/* Teams */}
        <div className="flex items-center justify-between mb-3">
          <div className="space-y-1">
            <div className="text-sm font-medium text-slate-200">{game.homeTeam}</div>
            <div className="text-sm font-medium text-slate-200">{game.awayTeam}</div>
          </div>
          
          {/* Movement Tag */}
          {game.movement && (
            <span 
              className={`
                flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium
                ${movementColors[game.movement.type]}
              `}
            >
              <ArrowTrendingUpIcon className="w-3 h-3" />
              {game.movement.type === 'high' ? 'High' : 'Medium'}
            </span>
          )}
        </div>

        {/* Odds with Mini Graphs */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-400">Spread</span>
              <span className="text-sm font-medium tabular-nums text-slate-200">
                {game.odds.spread}
              </span>
            </div>
            <div className="h-8 mt-1">
              <MiniOddsGraph type="spread" startValue={parseFloat(game.odds.spread)} movement={game.movement?.type} />
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-400">ML</span>
              <span className="text-sm font-medium tabular-nums text-slate-200">
                {game.odds.moneyline}
              </span>
            </div>
            <div className="h-8 mt-1">
              <MiniOddsGraph type="moneyline" startValue={parseFloat(game.odds.moneyline)} movement={game.movement?.type} />
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-400">Total</span>
              <span className="text-sm font-medium tabular-nums text-slate-200">
                {game.odds.total}
              </span>
            </div>
            <div className="h-8 mt-1">
              <MiniOddsGraph type="total" startValue={parseFloat(game.odds.total)} movement={game.movement?.type} />
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}
