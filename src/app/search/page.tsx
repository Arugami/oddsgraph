'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import SearchFilters from '@/components/search/SearchFilters'
import GameCard from '@/components/game/GameCard'

// Mock data - in a real app, this would come from an API
const mockGames = [
  {
    id: '1',
    homeTeam: 'Celtics',
    awayTeam: 'Knicks',
    startTime: '2025-02-22T19:30:00-05:00',
    league: 'NBA',
    odds: {
      spread: '-5.5',
      spreadOdds: '-110',
      moneyline: '-180',
      total: '224.5',
      totalOdds: '-110'
    },
    movement: {
      type: 'high',
      value: 'High Movement'
    }
  },
  {
    id: '2',
    homeTeam: 'Lakers',
    awayTeam: 'Warriors',
    startTime: '2025-02-22T22:00:00-05:00',
    league: 'NBA',
    odds: {
      spread: '-2.5',
      spreadOdds: '-110',
      moneyline: '-130',
      total: '228.5',
      totalOdds: '-110'
    },
    movement: {
      type: 'medium',
      value: 'Medium Movement'
    }
  },
  // Add more mock games as needed
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    league: 'all',
    betType: 'all',
    movement: 'all'
  })

  // Filter games based on search query and filters
  const filteredGames = mockGames.filter(game => {
    const matchesSearch = searchQuery === '' || 
      game.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.awayTeam.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesLeague = filters.league === 'all' || game.league.toLowerCase() === filters.league
    const matchesMovement = filters.movement === 'all' || game.movement.type === filters.movement

    return matchesSearch && matchesLeague && matchesMovement
  })

  return (
    <div className="min-h-screen pt-16 lg:pt-0">
      {/* Header */}
      <div className="relative overflow-hidden bg-slate-900/50 border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10" />
        <div className="relative max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-50 to-slate-400/80">
            Search Games
          </h1>
          <p className="mt-2 text-slate-400">
            Find and analyze betting opportunities
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Search Input */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full rounded-lg border border-slate-800/50 bg-slate-900/30 py-2 pl-10 pr-3 
                text-slate-200 placeholder:text-slate-400 focus:border-primary-500/50 focus:outline-none 
                focus:ring-2 focus:ring-primary-500/20 sm:text-sm"
              placeholder="Search teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters */}
          <SearchFilters onFiltersChange={setFilters} />

          {/* Results */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-slate-200">
                Results
              </h2>
              <span className="text-sm text-slate-400">
                {filteredGames.length} games found
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
            {filteredGames.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-400">No games found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
