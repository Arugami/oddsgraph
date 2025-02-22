import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { OddsTimeline } from '../odds/OddsTimeline'
import { cn } from '@/lib/utils'
import {
  ChartBarIcon,
  ClockIcon,
  UserGroupIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline'

interface GameDetailViewProps {
  gameId: string
  game: any // TODO: Type this properly
}

export const GameDetailView = ({ gameId, game }: GameDetailViewProps) => {
  const [selectedTab, setSelectedTab] = useState('story')

  const tabs = [
    {
      id: 'story',
      name: 'Story',
      icon: BookOpenIcon,
      content: (
        <div className="space-y-6">
          {/* Main Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 rounded-lg p-6"
          >
            <h3 className="text-lg font-medium text-slate-200 mb-4">The Story So Far</h3>
            <p className="text-slate-300 leading-relaxed">{game.storyline.narrative}</p>
            
            {/* Confidence Meter */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${game.storyline.confidence}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-sm text-slate-400">{game.storyline.confidence}% confidence</span>
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="bg-slate-800/50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-slate-200 mb-4">Key Events</h3>
            <div className="h-[300px]">
              <OddsTimeline
                data={game.storyline.keyEvents.map((event: any) => ({
                  timestamp: new Date(event.timestamp),
                  odds: event.impact,
                  event: {
                    type: 'news',
                    description: event.event,
                    impact: event.impact
                  }
                }))}
              />
            </div>
          </div>

          {/* Historical Context */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-800/50 rounded-lg p-6"
          >
            <h3 className="text-lg font-medium text-slate-200 mb-4">Historical Context</h3>
            <p className="text-slate-300">{game.storyline.historicalContext}</p>
          </motion.div>
        </div>
      )
    },
    {
      id: 'sharp',
      name: 'Sharp Money',
      icon: ChartBarIcon,
      content: (
        <div className="bg-slate-800/50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-slate-200 mb-4">Sharp Money Analysis</h3>
          {/* Add Sharp Money content */}
        </div>
      )
    },
    {
      id: 'public',
      name: 'Public Betting',
      icon: UserGroupIcon,
      content: (
        <div className="bg-slate-800/50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-slate-200 mb-4">Public Betting Trends</h3>
          {/* Add Public Betting content */}
        </div>
      )
    },
    {
      id: 'history',
      name: 'History',
      icon: ClockIcon,
      content: (
        <div className="bg-slate-800/50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-slate-200 mb-4">Historical Matchups</h3>
          {/* Add Historical content */}
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-200">
                {game.awayTeam.name} @ {game.homeTeam.name}
              </h2>
              <p className="text-slate-400 mt-1">{game.time}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-200">
                {game.awayTeam.score} - {game.homeTeam.score}
              </div>
              <p className="text-slate-400 mt-1">
                {game.status === 'live' ? 'Live' : 'Final'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tab.Group onChange={(index) => setSelectedTab(tabs[index].id)}>
          <Tab.List className="flex gap-1 bg-slate-800/50 p-1 rounded-lg mb-8">
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                className={({ selected }) => cn(
                  'flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md transition-colors',
                  selected
                    ? 'bg-primary-500/20 text-primary-500'
                    : 'text-slate-400 hover:text-slate-200'
                )}
              >
                <tab.icon className="w-5 h-5" />
                {tab.name}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            <AnimatePresence mode="wait">
              {tabs.map((tab) => (
                <Tab.Panel
                  key={tab.id}
                  className={cn(
                    'focus:outline-none',
                    selectedTab === tab.id ? 'block' : 'hidden'
                  )}
                >
                  {tab.content}
                </Tab.Panel>
              ))}
            </AnimatePresence>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}
