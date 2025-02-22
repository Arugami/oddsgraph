'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { format, subHours, getHours } from 'date-fns'

// Mock data - in a real app, this would come from an API
const generateMockData = () => {
  const now = new Date()
  return Array.from({ length: 12 }, (_, i) => {
    const time = subHours(now, 11 - i)
    return {
      time: format(time, 'HH:mm'),
      volume: Math.floor(Math.random() * 1000) + 500,
      hour: getHours(time)
    }
  })
}

interface VolumeBarChartProps {
  className?: string
}

export default function VolumeBarChart({ className }: VolumeBarChartProps) {
  const data = generateMockData()

  return (
    <div className={className}>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
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
            <Bar
              dataKey="volume"
              fill="#22c55e"
              opacity={0.8}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
