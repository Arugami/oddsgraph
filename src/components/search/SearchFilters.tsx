'use client'

import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { cn } from '@/lib/utils'

const leagues = [
  { id: 'all', name: 'All Leagues' },
  { id: 'nba', name: 'NBA' },
  { id: 'nfl', name: 'NFL' },
  { id: 'mlb', name: 'MLB' },
  { id: 'nhl', name: 'NHL' },
]

const betTypes = [
  { id: 'all', name: 'All Types' },
  { id: 'spread', name: 'Spread' },
  { id: 'moneyline', name: 'Moneyline' },
  { id: 'total', name: 'Total' },
  { id: 'prop', name: 'Player Props' },
]

const movements = [
  { id: 'all', name: 'All Movement' },
  { id: 'high', name: 'High Movement' },
  { id: 'medium', name: 'Medium Movement' },
  { id: 'low', name: 'Low Movement' },
]

interface SearchFiltersProps {
  onFiltersChange: (filters: {
    league: string
    betType: string
    movement: string
  }) => void
}

export default function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  const [selectedLeague, setSelectedLeague] = useState(leagues[0])
  const [selectedBetType, setSelectedBetType] = useState(betTypes[0])
  const [selectedMovement, setSelectedMovement] = useState(movements[0])

  const handleFilterChange = (
    league = selectedLeague,
    betType = selectedBetType,
    movement = selectedMovement
  ) => {
    onFiltersChange({
      league: league.id,
      betType: betType.id,
      movement: movement.id,
    })
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Listbox
        value={selectedLeague}
        onChange={(value) => {
          setSelectedLeague(value)
          handleFilterChange(value)
        }}
      >
        <div className="relative flex-1">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-slate-900/30 py-2 pl-3 pr-10 text-left border border-slate-800/50 hover:border-slate-700/50 transition-colors">
            <span className="block truncate text-sm">{selectedLeague.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-slate-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-slate-900/95 border border-slate-800/50 py-1 text-sm shadow-lg backdrop-blur-sm">
              {leagues.map((league) => (
                <Listbox.Option
                  key={league.id}
                  className={({ active }) =>
                    cn(
                      'relative cursor-pointer select-none py-2 pl-10 pr-4',
                      active ? 'bg-slate-800/50 text-white' : 'text-slate-400'
                    )
                  }
                  value={league}
                >
                  {({ selected }) => (
                    <>
                      <span className={cn('block truncate', selected && 'font-medium text-primary-400')}>
                        {league.name}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-400">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      <Listbox
        value={selectedBetType}
        onChange={(value) => {
          setSelectedBetType(value)
          handleFilterChange(undefined, value)
        }}
      >
        <div className="relative flex-1">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-slate-900/30 py-2 pl-3 pr-10 text-left border border-slate-800/50 hover:border-slate-700/50 transition-colors">
            <span className="block truncate text-sm">{selectedBetType.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-slate-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-slate-900/95 border border-slate-800/50 py-1 text-sm shadow-lg backdrop-blur-sm">
              {betTypes.map((type) => (
                <Listbox.Option
                  key={type.id}
                  className={({ active }) =>
                    cn(
                      'relative cursor-pointer select-none py-2 pl-10 pr-4',
                      active ? 'bg-slate-800/50 text-white' : 'text-slate-400'
                    )
                  }
                  value={type}
                >
                  {({ selected }) => (
                    <>
                      <span className={cn('block truncate', selected && 'font-medium text-primary-400')}>
                        {type.name}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-400">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      <Listbox
        value={selectedMovement}
        onChange={(value) => {
          setSelectedMovement(value)
          handleFilterChange(undefined, undefined, value)
        }}
      >
        <div className="relative flex-1">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-slate-900/30 py-2 pl-3 pr-10 text-left border border-slate-800/50 hover:border-slate-700/50 transition-colors">
            <span className="block truncate text-sm">{selectedMovement.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-slate-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-slate-900/95 border border-slate-800/50 py-1 text-sm shadow-lg backdrop-blur-sm">
              {movements.map((movement) => (
                <Listbox.Option
                  key={movement.id}
                  className={({ active }) =>
                    cn(
                      'relative cursor-pointer select-none py-2 pl-10 pr-4',
                      active ? 'bg-slate-800/50 text-white' : 'text-slate-400'
                    )
                  }
                  value={movement}
                >
                  {({ selected }) => (
                    <>
                      <span className={cn('block truncate', selected && 'font-medium text-primary-400')}>
                        {movement.name}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-400">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
