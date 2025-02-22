import { ChartBarIcon } from '@heroicons/react/24/outline'
import GameCard from '@/components/game/GameCard'
import OddsLineChart from '@/components/charts/OddsLineChart'
import VolumeBarChart from '@/components/charts/VolumeBarChart'
import Card, { CardHeader } from '@/components/ui/Card'
import ScoreboardPanel from '@/components/scoreboard/ScoreboardPanel'

// Mock data with ISO string dates for consistency
const mockDates = {
  todayEvening: '2025-02-22T19:30:00-05:00',
  todayNight: '2025-02-22T22:00:00-05:00',
  tomorrowEvening: '2025-02-23T20:00:00-05:00'
}

const featuredGames = [
  {
    id: '1',
    homeTeam: 'Celtics',
    awayTeam: 'Knicks',
    startTime: mockDates.todayEvening,
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
    }
  },
  {
    id: '2',
    homeTeam: 'Lakers',
    awayTeam: 'Warriors',
    startTime: mockDates.todayNight,
    league: 'NBA',
    odds: {
      spread: '-2.5',
      spreadOdds: '-115',
      moneyline: '-135',
      total: '235.5',
      totalOdds: '-110'
    },
    movement: {
      type: 'medium' as const,
      value: 'Line Movement'
    }
  },
  {
    id: '3',
    homeTeam: 'Bucks',
    awayTeam: '76ers',
    startTime: mockDates.tomorrowEvening,
    league: 'NBA',
    odds: {
      spread: '-1.5',
      spreadOdds: '-108',
      moneyline: '-120',
      total: '228.5',
      totalOdds: '-110'
    }
  }
]

export default function Home() {
  return (
    <div className="min-h-screen pt-16 lg:pt-0">
      {/* Dashboard header */}
      <div className="border-b border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-baseline justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-200">
                Dashboard
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Track real-time odds movements and get AI-powered insights
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-3 py-1.5 text-sm font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors">
                Customize View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scoreboard Panel */}
      <ScoreboardPanel />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Featured Games Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-slate-50 to-slate-400/80">
                Featured Games
              </h2>
              <p className="text-slate-400 mt-1">Top matchups with significant odds movement</p>
            </div>
            <button className="inline-flex items-center px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600/50 transition-all text-sm font-medium">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGames.map((game, index) => (
              <div 
                key={game.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <GameCard game={game} />
              </div>
            ))}
          </div>
        </section>

        {/* Market Analysis */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-slate-50 to-slate-400/80">
                Market Analysis
              </h2>
              <p className="text-slate-400 mt-1">Real-time tracking of odds movement and betting volume</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader
                title="Odds Movement"
                description="24-hour tracking for key markets"
              />
              <div className="mt-4">
                <OddsLineChart />
              </div>
            </Card>

            <Card>
              <CardHeader
                title="Betting Volume"
                description="Hourly betting activity"
              />
              <div className="mt-4">
                <VolumeBarChart />
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
