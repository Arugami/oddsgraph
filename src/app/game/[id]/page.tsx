'use client'

import { useParams } from 'next/navigation'
import { ArrowTrendingUpIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import Card, { CardHeader, CardStat } from '@/components/ui/Card'
import { OddsTimeline } from '@/components/charts/OddsTimeline'

// Mock data - in a real app, this would come from an API
const mockGame = {
  id: '1',
  homeTeam: 'Celtics',
  awayTeam: 'Knicks',
  startTime: '2025-02-22T19:30:00-05:00',
  league: 'NBA',
  odds: {
    spread: '-5.5',
    spreadOdds: '-110',
    moneyline: '+180',
    total: '224.5',
    totalOdds: '-110'
  },
  movement: {
    type: 'high' as const,
    value: 'High Movement'
  },
  stats: {
    homeRecord: '41-12',
    awayRecord: '33-20',
    lastMeetings: [
      { date: '2024-12-15', score: '116-102', winner: 'Celtics' },
      { date: '2024-11-28', score: '108-104', winner: 'Knicks' }
    ]
  }
}

export default function GamePage() {
  const router = useRouter()
  const params = useParams()
  const game = mockGame // In a real app, we would fetch the game data based on params.id

  return (
    <div className="min-h-screen pt-16 lg:pt-0">
      {/* Header */}
      <div className="relative overflow-hidden bg-slate-900/50 border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-8">
          <button 
            onClick={() => router.back()}
            className="inline-flex items-center text-sm text-slate-400 hover:text-slate-200 transition-colors mb-6"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back to Dashboard
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-50 to-slate-400/80">
                {game.homeTeam} vs {game.awayTeam}
              </h1>
              <div className="flex items-center mt-2 text-sm text-slate-400">
                <span className="font-medium text-primary-400">{game.league}</span>
                <span className="mx-2">•</span>
                <span>{game.stats.homeRecord}</span>
                <span className="mx-2">vs</span>
                <span>{game.stats.awayRecord}</span>
              </div>
            </div>
            
            {game.movement && (
              <div className="flex items-center gap-3">
                <span 
                  className={`
                    inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                    bg-secondary-500/10 text-secondary-500
                  `}
                >
                  <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                  {game.movement.value}
                </span>
                <span className="text-sm text-slate-400">
                  Last updated 5m ago
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* The Story Graph - Hero Section */}
        <Card className="mb-8">
          <CardHeader
            title="Every Line Has a Story"
            description="Watch how the odds evolve and understand the forces shaping this game"
          />
          <div className="h-[400px] mt-6">
            <OddsTimeline gameId={game.id} />
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Odds */}
          <Card>
            <CardHeader
              title="Current Lines"
              description="Latest betting odds"
            />
            <div className="space-y-6 mt-6">
              <div>
                <h3 className="text-sm font-medium text-slate-400">Spread</h3>
                <div className="mt-1 flex items-baseline gap-2">
                  <div className="text-2xl font-semibold">{game.odds.spread}</div>
                  <div className="text-sm text-slate-400">{game.odds.spreadOdds}</div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-400">Moneyline</h3>
                <div className="mt-1 text-2xl font-semibold">{game.odds.moneyline}</div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-400">Total</h3>
                <div className="mt-1 text-2xl font-semibold">{game.odds.total}</div>
                <div className="text-sm text-slate-400">{game.odds.totalOdds}</div>
              </div>
            </div>
          </Card>

          {/* Sharp Money */}
          <Card>
            <CardHeader
              title="Sharp Money"
              description="Professional betting patterns"
            />
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Betting Volume</span>
                <span className="text-sm font-medium text-green-500">High</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Direction</span>
                <span className="text-sm font-medium">Celtics -5.5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Confidence</span>
                <span className="text-sm font-medium text-secondary-500">85%</span>
              </div>
            </div>
          </Card>

          {/* Public Betting */}
          <Card>
            <CardHeader
              title="Public Money"
              description="Where casual bettors are leaning"
            />
            <div className="mt-6 space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-400">Spread Bets</span>
                  <span className="font-medium">65% on Celtics</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-500 rounded-full" style={{ width: '65%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-400">Moneyline Bets</span>
                  <span className="font-medium">58% on Celtics</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-500 rounded-full" style={{ width: '58%' }} />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Key Events Timeline */}
        <Card className="mt-8">
          <CardHeader
            title="Key Events"
            description="Major updates that moved the line"
          />
          <div className="mt-6 relative">
            <div className="absolute top-0 bottom-0 left-[19px] w-px bg-slate-800" />
            <div className="space-y-8">
              {game.stats.lastMeetings.map((meeting, i) => (
                <div key={i} className="relative pl-10">
                  <div className="absolute left-0 w-10 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-secondary-500" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-slate-200">{meeting.score}</div>
                    <div className="text-slate-400 mt-1">{meeting.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
