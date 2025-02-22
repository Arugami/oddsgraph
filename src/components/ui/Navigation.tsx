'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  HomeIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Analysis', href: '/analysis', icon: ChartBarIcon },
  { name: 'Search', href: '/search', icon: MagnifyingGlassIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
]

export default function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop navigation */}
      <nav className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 bg-slate-900/50 border-r border-slate-800/50">
        <div className="flex flex-col flex-grow gap-y-5 overflow-y-auto px-6 py-8">
          <div className="flex items-center h-8">
            <Link href="/" className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
              Oddsgraph
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-4">
              <li>
                <ul role="list" className="space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          item.href === pathname
                            ? 'bg-slate-800/50 text-white'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30',
                          'group flex gap-x-3 rounded-lg p-2 text-sm font-medium leading-6'
                        )}
                      >
                        <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </nav>

      {/* Mobile navigation */}
      <div className="lg:hidden">
        <div className="fixed inset-x-0 top-0 z-50 bg-slate-900/50 border-b border-slate-800/50 backdrop-blur-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <Link href="/" className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
              Oddsgraph
            </Link>
            <button
              type="button"
              className="text-slate-400 hover:text-slate-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-sm">
            <div className="fixed inset-x-0 top-16 p-4">
              <div className="divide-y divide-slate-800/50">
                <div className="py-4 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        item.href === pathname
                          ? 'bg-slate-800/50 text-white'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30',
                        'group flex gap-x-3 rounded-lg p-3 text-base font-medium leading-6'
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
