'use client'

import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline'

interface OddsTimelineProps {
  gameId: string
  initialOddsType?: 'spread' | 'moneyline' | 'total'
}

interface TimelineData {
  time: string
  spread: number
  moneyline: number
  total: number
  sharpAction?: 'high' | 'medium' | 'low'
  publicAction?: number
  note?: string
}

// Mock data - in a real app, this would come from an API
const mockData: TimelineData[] = [
  { 
    time: '2025-02-22T14:00:00', 
    spread: -5.5, 
    moneyline: -180, 
    total: 224.5,
    sharpAction: 'low',
    publicAction: 45
  },
  { 
    time: '2025-02-22T15:00:00', 
    spread: -5.0, 
    moneyline: -175, 
    total: 225.0,
    sharpAction: 'medium',
    publicAction: 52,
    note: 'Key player injury reported'
  },
  { 
    time: '2025-02-22T16:00:00', 
    spread: -5.5, 
    moneyline: -185, 
    total: 224.0,
    sharpAction: 'high',
    publicAction: 65,
    note: 'Sharp money moving the line'
  },
  { 
    time: '2025-02-22T17:00:00', 
    spread: -6.0, 
    moneyline: -190, 
    total: 224.5,
    sharpAction: 'high',
    publicAction: 70
  },
  { 
    time: '2025-02-22T18:00:00', 
    spread: -5.5, 
    moneyline: -180, 
    total: 225.0,
    sharpAction: 'medium',
    publicAction: 68
  }
]

export function OddsTimeline({ gameId, initialOddsType = 'spread' }: OddsTimelineProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [selectedOddsType, setSelectedOddsType] = useState<'spread' | 'moneyline' | 'total'>(initialOddsType)
  const [hoveredPoint, setHoveredPoint] = useState<TimelineData | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  
  // Animation timeline
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setIsPlaying(false)
      }, mockData.length * 1000)
      return () => clearInterval(interval)
    }
  }, [isPlaying])

  useEffect(() => {
    if (!svgRef.current) return

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll('*').remove()

    // Set up dimensions
    const margin = { top: 20, right: 30, bottom: 30, left: 60 }
    const width = svgRef.current.clientWidth - margin.left - margin.right
    const height = svgRef.current.clientHeight - margin.top - margin.bottom

    // Create SVG
    const svg = d3.select(svgRef.current)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Add subtle grid
    const grid = svg.append('g')
      .attr('class', 'grid')
      .style('stroke', '#1e293b')
      .style('stroke-dasharray', '2,2')

    // Create scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(mockData, d => new Date(d.time)) as [Date, Date])
      .range([0, width])

    const yScale = d3.scaleLinear()
      .domain([
        d3.min(mockData, d => d[selectedOddsType]) as number - 1,
        d3.max(mockData, d => d[selectedOddsType]) as number + 1
      ])
      .range([height, 0])

    // Add grid lines
    grid.selectAll('line.horizontal')
      .data(yScale.ticks(5))
      .enter()
      .append('line')
      .attr('class', 'horizontal')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', d => yScale(d))
      .attr('y2', d => yScale(d))

    // Create line generator with animation
    const line = d3.line<TimelineData>()
      .x(d => xScale(new Date(d.time)))
      .y(d => yScale(d[selectedOddsType]))
      .curve(d3.curveCatmullRom.alpha(0.5))

    // Create gradient based on movement
    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'line-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%')

    gradient.selectAll('stop')
      .data([
        { offset: '0%', color: '#0ea5e9' },
        { offset: '50%', color: '#6366f1' },
        { offset: '100%', color: '#8b5cf6' }
      ])
      .enter()
      .append('stop')
      .attr('offset', d => d.offset)
      .attr('stop-color', d => d.color)

    // Add area under the line
    const area = d3.area<TimelineData>()
      .x(d => xScale(new Date(d.time)))
      .y0(height)
      .y1(d => yScale(d[selectedOddsType]))
      .curve(d3.curveCatmullRom.alpha(0.5))

    svg.append('path')
      .datum(mockData)
      .attr('class', 'area')
      .attr('fill', 'url(#line-gradient)')
      .attr('fill-opacity', 0.1)
      .attr('d', area)

    // Add animated line
    const path = svg.append('path')
      .datum(mockData)
      .attr('fill', 'none')
      .attr('stroke', 'url(#line-gradient)')
      .attr('stroke-width', 3)
      .attr('d', line)

    if (isPlaying) {
      const totalLength = path.node()?.getTotalLength() || 0
      path
        .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(mockData.length * 1000)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0)
    }

    // Add interactive dots
    const dots = svg.selectAll('.dot-group')
      .data(mockData)
      .enter()
      .append('g')
      .attr('class', 'dot-group')
      .attr('transform', d => `translate(${xScale(new Date(d.time))},${yScale(d[selectedOddsType])})`)

    // Outer glow for sharp action
    dots.append('circle')
      .attr('r', d => d.sharpAction === 'high' ? 8 : 0)
      .attr('fill', '#6366f1')
      .attr('fill-opacity', 0.3)
      .attr('class', 'glow')

    // Main dot
    dots.append('circle')
      .attr('r', 4)
      .attr('fill', d => {
        switch(d.sharpAction) {
          case 'high': return '#6366f1'
          case 'medium': return '#0ea5e9'
          default: return '#64748b'
        }
      })
      .attr('stroke', '#0f172a')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseover', (event, d) => {
        const dot = d3.select(event.currentTarget)
        dot.attr('r', 6)
           .attr('stroke-width', 3)

        // Animate glow
        d3.select(event.currentTarget.parentNode)
          .select('.glow')
          .transition()
          .duration(300)
          .attr('r', 12)
          .attr('fill-opacity', 0.4)

        setHoveredPoint(d)
      })
      .on('mouseout', (event) => {
        const dot = d3.select(event.currentTarget)
        dot.attr('r', 4)
           .attr('stroke-width', 2)

        // Reset glow
        d3.select(event.currentTarget.parentNode)
          .select('.glow')
          .transition()
          .duration(300)
          .attr('r', d => d.sharpAction === 'high' ? 8 : 0)
          .attr('fill-opacity', 0.3)

        setHoveredPoint(null)
      })

    // Add axes with custom styling
    const xAxis = d3.axisBottom(xScale)
      .ticks(5)
      .tickFormat(d => d3.timeFormat('%I:%M %p')(d as Date))

    const yAxis = d3.axisLeft(yScale)
      .ticks(5)
      .tickFormat(d => d.toString())

    // Style x-axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .attr('class', 'x-axis')
      .call(xAxis)
      .style('color', '#64748b')
      .call(g => g.select('.domain').attr('stroke', '#1e293b'))
      .call(g => g.selectAll('.tick line').attr('stroke', '#1e293b'))

    // Style y-axis
    svg.append('g')
      .attr('class', 'y-axis')
      .call(yAxis)
      .style('color', '#64748b')
      .call(g => g.select('.domain').attr('stroke', '#1e293b'))
      .call(g => g.selectAll('.tick line').attr('stroke', '#1e293b'))

  }, [gameId])

  return (
    <div className="w-full h-full bg-slate-900/30 rounded-lg p-4">
      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedOddsType('spread')}
            className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
              selectedOddsType === 'spread'
                ? 'bg-primary-500/20 text-primary-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Spread
          </button>
          <button
            onClick={() => setSelectedOddsType('moneyline')}
            className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
              selectedOddsType === 'moneyline'
                ? 'bg-primary-500/20 text-primary-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Moneyline
          </button>
          <button
            onClick={() => setSelectedOddsType('total')}
            className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
              selectedOddsType === 'total'
                ? 'bg-primary-500/20 text-primary-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Total
          </button>
        </div>
        
        <button
          onClick={() => setIsPlaying(true)}
          className="px-3 py-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors"
        >
          Play Movement
        </button>
      </div>

      {/* Graph */}
      <div className="relative">
        <svg
          ref={svgRef}
          className="w-full h-full"
          style={{ minHeight: '300px' }}
        />

        {/* Hover Info */}
        <AnimatePresence>
          {hoveredPoint && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-0 right-0 bg-slate-800 rounded-lg shadow-lg p-4 w-64"
            >
              <div className="text-sm font-medium text-slate-200 mb-2">
                {new Date(hoveredPoint.time).toLocaleTimeString()}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Value</span>
                  <span className="text-sm font-medium">
                    {hoveredPoint[selectedOddsType]}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Sharp Action</span>
                  <div className="flex items-center gap-1">
                    {hoveredPoint.sharpAction === 'high' && (
                      <ArrowTrendingUpIcon className="w-4 h-4 text-secondary-500" />
                    )}
                    <span className="text-sm font-medium capitalize">
                      {hoveredPoint.sharpAction}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Public %</span>
                  <span className="text-sm font-medium">
                    {hoveredPoint.publicAction}%
                  </span>
                </div>

                {hoveredPoint.note && (
                  <div className="text-xs text-slate-400 mt-2 pt-2 border-t border-slate-700">
                    {hoveredPoint.note}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default OddsTimeline
