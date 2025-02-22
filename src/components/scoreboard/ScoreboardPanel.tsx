'use client'

import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { cn } from '@/lib/utils'
import MiniOddsGraph from '@/components/charts/MiniOddsGraph'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { StarIcon as StarOutline, ArrowTrendingUpIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarSolid } from '@heroicons/react/24/solid'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import GameAlert from './GameAlert'
import { useRouter } from 'next/navigation'
import { StorylineCard } from '../odds/StorylineCard'
import { OddsTimeline } from '../odds/OddsTimeline'

const sports = [
  { id: 'nba', name: 'NBA' },
  { id: 'nfl', name: 'NFL' },
  { id: 'mlb', name: 'MLB' },
  { id: 'nhl', name: 'NHL' },
]

const betTypes = [
  { id: 'spread', name: 'Spread' },
  { id: 'moneyline', name: 'ML' },
  { id: 'total', name: 'Total' },
]

// Mock data - in a real app, this would come from an API
const mockGames = {
  nba: [
    {
      id: '1',
      status: 'live',
      homeTeam: { name: 'Celtics', score: '89' },
      awayTeam: { name: 'Knicks', score: '82' },
      time: 'Q3 4:20',
      odds: {
        spread: '-5.5',
        spreadOdds: '-110',
        moneyline: '-180',
        total: '224.5',
        totalOdds: '-110'
      },
      movement: { type: 'high' as const },
      storyline: {
        narrative: "Sharp money is heavily favoring the Celtics after Marcus Smart's explosive first half performance. Historical data shows the Celtics covering 80% of spreads when leading by 7+ at half.",
        sentiment: 'positive' as const,
        confidence: 85,
        keyEvents: [
          {
            timestamp: '7:45 PM',
            event: 'Marcus Smart scores 15 points in Q2',
            impact: 3
          },
          {
            timestamp: '7:30 PM',
            event: 'Large betting movement detected on Celtics spread',
            impact: 2
          }
        ],
        historicalContext: 'Celtics are 15-3 ATS in their last 18 home games when favored by 5 or more points.'
      }
    },
    {
      id: '2',
      status: 'upcoming',
      homeTeam: { name: 'Lakers', score: '-' },
      awayTeam: { name: 'Warriors', score: '-' },
      time: '7:30 PM',
      odds: {
        spread: '-2.5',
        spreadOdds: '-110',
        moneyline: '-130',
        total: '228.5',
        totalOdds: '-110'
      },
      movement: { type: 'medium' as const }
    },
  ],
  nfl: [],
  mlb: [],
  nhl: [],
}

const ScoreboardPanel = () => {
  const router = useRouter()
  const [selectedSport, setSelectedSport] = useState('nba')
  const [selectedBetType, setSelectedBetType] = useState('spread')
  const [favorites, setFavorites] = useState<string[]>([])
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)

  const getOddsValue = (odds: typeof mockGames.nba[0]['odds'], type: string) => {
    switch (type) {
      case 'spread':
        return `${odds.spread} (${odds.spreadOdds})`
      case 'moneyline':
        return odds.moneyline
      case 'total':
        return `${odds.total} (${odds.totalOdds})`
      default:
        return ''
    }
  }

  const getOddsNumber = (odds: typeof mockGames.nba[0]['odds'], type: string) => {
    switch (type) {
      case 'spread':
        return parseFloat(odds.spread)
      case 'moneyline':
        return parseFloat(odds.moneyline)
      case 'total':
        return parseFloat(odds.total)
      default:
        return 0
    }
  }

  const toggleFavorite = (gameId: string) => {
    setFavorites(prev =>
      prev.includes(gameId)
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
    )
  }

  const filteredGames = (games: typeof mockGames.nba) => {
    if (showOnlyFavorites) {
      return games.filter(game => favorites.includes(game.id))
    }
    return games
  }

  return (
    <div className="bg-slate-900/50 border-b border-slate-800 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-6 py-2">
          <div className="flex items-center gap-6">
            {/* Sport Selection */}
            <Tab.Group onChange={(index) => setSelectedSport(sports[index].id)}>
              <Tab.List className="flex gap-1">
                {sports.map((sport) => (
                  <Tab
                    key={sport.id}
                    className={({ selected }) => cn(
                      'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                      selected
                        ? 'bg-primary-500/20 text-primary-500'
                        : 'text-slate-400 hover:text-slate-200'
                    )}
                  >
                    {sport.name}
                  </Tab>
                ))}
              </Tab.List>
            </Tab.Group>

            {/* Bet Type Selection */}
            <Tab.Group onChange={(index) => setSelectedBetType(betTypes[index].id)}>
              <Tab.List className="flex gap-1">
                {betTypes.map((type) => (
                  <Tab
                    key={type.id}
                    className={({ selected }) => cn(
                      'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                      selected
                        ? 'bg-secondary-500/20 text-secondary-500'
                        : 'text-slate-400 hover:text-slate-200'
                    )}
                  >
                    {type.name}
                  </Tab>
                ))}
              </Tab.List>
            </Tab.Group>

            {/* Favorites Toggle */}
            <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={cn(
                'px-3 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center gap-1.5',
                showOnlyFavorites
                  ? 'bg-yellow-500/20 text-yellow-500'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <StarSolid className="w-4 h-4" />
              Favorites
            </button>
          </div>
        </div>

        {/* Games Scoreboard */}
        <div className="px-4 py-2 overflow-x-auto">
          <div className="inline-flex gap-2 min-w-full px-2">
            {filteredGames(mockGames[selectedSport as keyof typeof mockGames] || []).map((game) => (
              <div
                key={game.id}
                className="relative group"
              >
                <button
                  onClick={() => router.push(`/game/${game.id}`)}
                  className="flex items-center gap-4 px-4 py-2 bg-slate-800/50 rounded-lg hover:bg-slate-800/75 transition-colors group relative overflow-hidden"
                >
                  {/* Gradient overlay for live games */}
                  {game.status === 'live' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-transparent" />
                  )}

                  {/* Teams & Score with Movement Indicators */}
                  <div className="text-sm relative">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{game.awayTeam.name}</span>
                        {game.movement?.type === 'high' && (
                          <div className="w-1.5 h-1.5 rounded-full bg-secondary-500 animate-pulse" />
                        )}
                      </div>
                      <span className={cn(
                        'tabular-nums',
                        game.status === 'live' ? 'text-slate-200' : 'text-slate-400'
                      )}>
                        {game.awayTeam.score}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3 mt-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{game.homeTeam.name}</span>
                        {game.movement?.type === 'high' && (
                          <div className="w-1.5 h-1.5 rounded-full bg-secondary-500 animate-pulse" />
                        )}
                      </div>
                      <span className={cn(
                        'tabular-nums',
                        game.status === 'live' ? 'text-slate-200' : 'text-slate-400'
                      )}>
                        {game.homeTeam.score}
                      </span>
                    </div>
                  </div>

                  {/* Game Time & Odds */}
                  <div className="text-xs text-slate-400">
                    <div>{game.time}</div>
                    <div>{getOddsValue(game.odds, selectedBetType)}</div>
                  </div>

                  {/* Mini Graph */}
                  <div className="w-24 mt-1">
                    <MiniOddsGraph
                      startValue={getOddsNumber(game.odds, selectedBetType)}
                      type={selectedBetType as 'spread' | 'moneyline' | 'total'}
                      movement={game.movement?.type}
                    />
                  </div>
                </button>

                {/* Quick Insight Preview */}
                {game.storyline && (
                  <div className="mt-3 px-4 py-2 bg-slate-800/30 rounded-md">
                    <div className="flex items-start gap-2">
                      <div className={cn(
                        'mt-1 p-1 rounded-full',
                        game.storyline.sentiment === 'positive' ? 'bg-green-500/20' : 'bg-blue-500/20'
                      )}>
                        <ArrowTrendingUpIcon className={cn(
                          'w-3 h-3',
                          game.storyline.sentiment === 'positive' ? 'text-green-500' : 'text-blue-500'
                        )} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-300 line-clamp-1">
                          {game.storyline.narrative.split('.')[0]}.
                        </p>
                        {game.storyline.keyEvents.length > 0 && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-medium text-slate-400">
                              Latest:
                            </span>
                            <span className="text-[10px] text-slate-500">
                              {game.storyline.keyEvents[0].event}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(game.id)
                  }}
                  className="absolute top-2 right-2 p-1 rounded-full bg-slate-800/75 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {favorites.includes(game.id) ? (
                    <StarSolid className="w-4 h-4 text-yellow-500" />
                  ) : (
                    <StarOutline className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScoreboardPanel
