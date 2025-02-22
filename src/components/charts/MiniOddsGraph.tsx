'use client'

import {
  LineChart,
  Line,
  ResponsiveContainer,
  YAxis
} from 'recharts'
import { subHours } from 'date-fns'

// Generate mock data - in a real app, this would come from an API
const generateMockData = (startValue: number, volatility: 'high' | 'medium' | 'low' = 'medium') => {
  const now = new Date()
  const volatilityFactors = {
    high: 1,
    medium: 0.6,
    low: 0.3
  }
  const factor = volatilityFactors[volatility]

  return Array.from({ length: 12 }, (_, i) => {
    const time = subHours(now, 11 - i)
    const randomChange = (Math.random() * 2 - 1) * factor
    return {
      time: time.toISOString(),
      value: startValue + randomChange
    }
  })
}

interface MiniOddsGraphProps {
  startValue: number
  type: 'spread' | 'moneyline' | 'total'
  movement?: 'high' | 'medium' | 'low'
  className?: string
}

export default function MiniOddsGraph({ 
  startValue, 
  type, 
  movement = 'medium',
  className 
}: MiniOddsGraphProps) {
  const data = generateMockData(startValue, movement)
  
  const getStrokeColor = () => {
    const lastValue = data[data.length - 1].value
    const firstValue = data[0].value
    const difference = lastValue - firstValue

    if (type === 'moneyline') {
      return difference > 0 ? '#22c55e' : '#ef4444'
    }
    
    // For spread and total, green means the line is moving up
    return difference > 0 ? '#22c55e' : '#ef4444'
  }

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={40}>
        <LineChart data={data}>
          <YAxis 
            domain={['dataMin', 'dataMax']}
            hide 
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={getStrokeColor()}
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
