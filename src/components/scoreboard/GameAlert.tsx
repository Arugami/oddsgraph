'use client'

import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { BellIcon, BellAlertIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

interface GameAlertProps {
  gameId: string
  className?: string
}

type AlertType = 'line-movement' | 'score-change' | 'game-start'

interface AlertSetting {
  type: AlertType
  enabled: boolean
  threshold?: number
}

const defaultAlerts: AlertSetting[] = [
  { type: 'line-movement', enabled: false, threshold: 0.5 },
  { type: 'score-change', enabled: false },
  { type: 'game-start', enabled: false }
]

export default function GameAlert({ gameId, className }: GameAlertProps) {
  const [alerts, setAlerts] = useState(defaultAlerts)
  const [hasActiveAlerts, setHasActiveAlerts] = useState(false)

  const toggleAlert = (type: AlertType) => {
    setAlerts(prev => {
      const newAlerts = prev.map(alert =>
        alert.type === type ? { ...alert, enabled: !alert.enabled } : alert
      )
      setHasActiveAlerts(newAlerts.some(a => a.enabled))
      return newAlerts
    })
  }

  const updateThreshold = (type: AlertType, value: number) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.type === type ? { ...alert, threshold: value } : alert
      )
    )
  }

  return (
    <Popover className={cn("relative", className)}>
      <Popover.Button className="p-1 rounded-md hover:bg-slate-700/50 transition-colors">
        {hasActiveAlerts ? (
          <BellAlertIcon className="w-5 h-5 text-primary-400" />
        ) : (
          <BellIcon className="w-5 h-5 text-slate-400" />
        )}
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-lg bg-slate-900/95 border border-slate-800/50 shadow-lg backdrop-blur-sm">
          <div className="p-4">
            <h3 className="text-sm font-medium text-slate-200 mb-3">Alert Settings</h3>
            <div className="space-y-4">
              {/* Line Movement Alert */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox rounded border-slate-700 bg-slate-800 text-primary-500 focus:ring-primary-500/20"
                      checked={alerts.find(a => a.type === 'line-movement')?.enabled}
                      onChange={() => toggleAlert('line-movement')}
                    />
                    <span className="ml-2 text-sm text-slate-300">Line Movement</span>
                  </label>
                  <select
                    className="text-xs bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-300"
                    value={alerts.find(a => a.type === 'line-movement')?.threshold}
                    onChange={(e) => updateThreshold('line-movement', Number(e.target.value))}
                  >
                    <option value="0.5">±0.5</option>
                    <option value="1">±1.0</option>
                    <option value="2">±2.0</option>
                  </select>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Alert when the line moves by the selected amount
                </p>
              </div>

              {/* Score Change Alert */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox rounded border-slate-700 bg-slate-800 text-primary-500 focus:ring-primary-500/20"
                    checked={alerts.find(a => a.type === 'score-change')?.enabled}
                    onChange={() => toggleAlert('score-change')}
                  />
                  <span className="ml-2 text-sm text-slate-300">Score Changes</span>
                </label>
                <p className="text-xs text-slate-400 mt-1">
                  Alert on any score change during the game
                </p>
              </div>

              {/* Game Start Alert */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox rounded border-slate-700 bg-slate-800 text-primary-500 focus:ring-primary-500/20"
                    checked={alerts.find(a => a.type === 'game-start')?.enabled}
                    onChange={() => toggleAlert('game-start')}
                  />
                  <span className="ml-2 text-sm text-slate-300">Game Start</span>
                </label>
                <p className="text-xs text-slate-400 mt-1">
                  Alert 15 minutes before game starts
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
