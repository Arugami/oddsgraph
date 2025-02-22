'use client'

import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { format, subHours, getHours } from 'date-fns'

// Mock data - in a real app, this would come from an API
const generateMockData = () => {
  const now = new Date()
  return Array.from({ length: 24 }, (_, i) => {
    const time = subHours(now, 23 - i)
    return {
      time: format(time, 'HH:mm'),
      spread: -5.5 + Math.random() * 2 - 1,
      moneyline: -180 + Math.random() * 40 - 20,
      total: 224.5 + Math.random() * 4 - 2,
      hour: getHours(time)
    }
  })
}

interface OddsLineChartProps {
  className?: string
}

export default function OddsLineChart({ className }: OddsLineChartProps) {
  const [data] = useState(generateMockData)
  const [activeType, setActiveType] = useState('spread')

  const formatYAxis = (value: number) => {
    if (activeType === 'moneyline') {
      return value > 0 ? `+${value}` : value
    }
    return value.toFixed(1)
  }

  const getLineColor = () => {
    switch (activeType) {
      case 'spread':
        return '#22c55e' // text-primary-500
      case 'moneyline':
        return '#3b82f6' // text-blue-500
      case 'total':
        return '#f59e0b' // text-yellow-500
      default:
        return '#22c55e'
    }
  }

  return (
    <div className={className}>
      <div className="mb-4 flex items-center space-x-4">
        <button
          onClick={() => setActiveType('spread')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            activeType === 'spread'
              ? 'bg-primary-500/20 text-primary-500'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Spread
        </button>
        <button
          onClick={() => setActiveType('moneyline')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            activeType === 'moneyline'
              ? 'bg-blue-500/20 text-blue-500'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Moneyline
        </button>
        <button
          onClick={() => setActiveType('total')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            activeType === 'total'
              ? 'bg-yellow-500/20 text-yellow-500'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Total
        </button>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              stroke="#64748b"
              tick={{ fill: '#64748b' }}
              tickLine={{ stroke: '#64748b' }}
            />
            <YAxis
              stroke="#64748b"
              tick={{ fill: '#64748b' }}
              tickLine={{ stroke: '#64748b' }}
              tickFormatter={formatYAxis}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(51, 65, 85, 0.5)',
                borderRadius: '0.5rem',
              }}
              itemStyle={{ color: '#f8fafc' }}
              labelStyle={{ color: '#94a3b8' }}
            />
            <Line
              type="monotone"
              dataKey={activeType}
              stroke={getLineColor()}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
