'use client'

import { BentoGrid, BentoItem } from '@/components/ui/BentoGrid'
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CircleStackIcon,
  BoltIcon,
  ArrowPathIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline'

// Mock data - in a real app, this would come from an API
const mockStats = {
  totalBets: 156,
  winRate: '62.8%',
  profitLoss: '+$1,245.50',
  avgOdds: '-110',
  bestSport: 'NBA',
  bestBetType: 'Spread'
}

export default function AnalysisPage() {
  return (
    <div className="min-h-screen pt-16 lg:pt-0">
      {/* Header */}
      <div className="relative overflow-hidden bg-slate-900/50 border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10" />
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-50 to-slate-400/80">
            Betting Analysis
          </h1>
          <p className="mt-2 text-slate-400">
            Track your performance and identify winning patterns
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <BentoGrid className="mb-8">
          {/* Win Rate */}
          <BentoItem
            className="row-span-1"
            icon={<ChartBarIcon className="w-6 h-6 text-primary-400" />}
            title="Win Rate"
            description="Your overall success rate"
          >
            <div className="mt-6">
              <div className="text-4xl font-bold text-primary-400">
                {mockStats.winRate}
              </div>
              <div className="text-sm text-slate-400 mt-1">
                Based on {mockStats.totalBets} bets
              </div>
            </div>
          </BentoItem>

          {/* Profit/Loss */}
          <BentoItem
            className="row-span-1"
            icon={<ArrowTrendingUpIcon className="w-6 h-6 text-secondary-400" />}
            title="Profit/Loss"
            description="Your total earnings"
          >
            <div className="mt-6">
              <div className="text-4xl font-bold text-secondary-400">
                {mockStats.profitLoss}
              </div>
              <div className="text-sm text-slate-400 mt-1">
                Average odds: {mockStats.avgOdds}
              </div>
            </div>
          </BentoItem>

          {/* Best Performance */}
          <BentoItem
            className="row-span-1"
            icon={<BoltIcon className="w-6 h-6 text-yellow-400" />}
            title="Best Performance"
            description="Your most successful categories"
          >
            <div className="mt-6 space-y-4">
              <div>
                <div className="text-sm text-slate-400">Top Sport</div>
                <div className="text-xl font-semibold text-yellow-400">
                  {mockStats.bestSport}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-400">Top Bet Type</div>
                <div className="text-xl font-semibold text-yellow-400">
                  {mockStats.bestBetType}
                </div>
              </div>
            </div>
          </BentoItem>

          {/* Recent Activity */}
          <BentoItem
            className="md:col-span-2 lg:col-span-2"
            icon={<ArrowPathIcon className="w-6 h-6 text-blue-400" />}
            title="Recent Activity"
            description="Your latest betting activity"
          >
            <div className="mt-6 space-y-4">
              {/* Add a chart or activity feed here */}
              <div className="h-64 rounded-lg bg-slate-800/50 flex items-center justify-center">
                <span className="text-slate-400">Activity Chart Coming Soon</span>
              </div>
            </div>
          </BentoItem>

          {/* Betting Patterns */}
          <BentoItem
            className="lg:col-span-1"
            icon={<ChartPieIcon className="w-6 h-6 text-purple-400" />}
            title="Betting Patterns"
            description="Analysis of your betting habits"
          >
            <div className="mt-6 space-y-4">
              {/* Add betting pattern visualization here */}
              <div className="h-64 rounded-lg bg-slate-800/50 flex items-center justify-center">
                <span className="text-slate-400">Pattern Analysis Coming Soon</span>
              </div>
            </div>
          </BentoItem>
        </BentoGrid>
      </div>
    </div>
  )
}
