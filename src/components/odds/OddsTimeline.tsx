import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { motion } from 'framer-motion'

interface TimelineEvent {
  timestamp: Date
  odds: number
  event?: {
    type: 'injury' | 'weather' | 'news' | 'market'
    description: string
    impact: number
  }
}

interface OddsTimelineProps {
  data: TimelineEvent[]
  width?: number
  height?: number
}

export const OddsTimeline = ({ 
  data,
  width = 600,
  height = 200 
}: OddsTimelineProps) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !data.length) return

    const margin = { top: 20, right: 30, bottom: 30, left: 40 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove()

    const svg = d3.select(svgRef.current)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // Create scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.timestamp) as [Date, Date])
      .range([0, innerWidth])

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.odds) as [number, number])
      .range([innerHeight, 0])
      .nice()

    // Create line generator
    const line = d3.line<TimelineEvent>()
      .x(d => xScale(d.timestamp))
      .y(d => yScale(d.odds))
      .curve(d3.curveMonotoneX)

    // Add gradient
    const gradient = svg.append("defs")
      .append("linearGradient")
      .attr("id", "line-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", yScale.range()[0])
      .attr("x2", 0)
      .attr("y2", yScale.range()[1])

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#22c55e")

    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#3b82f6")

    // Add the line path
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "url(#line-gradient)")
      .attr("stroke-width", 2)
      .attr("d", line)

    // Add event markers
    svg.selectAll("circle")
      .data(data.filter(d => d.event))
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.timestamp))
      .attr("cy", d => yScale(d.odds))
      .attr("r", 4)
      .attr("fill", d => {
        switch (d.event?.type) {
          case 'injury': return '#ef4444'
          case 'weather': return '#eab308'
          case 'news': return '#3b82f6'
          case 'market': return '#22c55e'
          default: return '#6b7280'
        }
      })
      .attr("stroke", "#1f2937")
      .attr("stroke-width", 2)

    // Add axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(5)
      .tickFormat(d3.timeFormat("%H:%M"))

    const yAxis = d3.axisLeft(yScale)
      .ticks(5)
      .tickFormat(d => d.toString())

    svg.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .attr("class", "text-slate-400")
      .call(xAxis)

    svg.append("g")
      .attr("class", "text-slate-400")
      .call(yAxis)

  }, [data, width, height])

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="overflow-visible"
      />
      
      {/* Event tooltips */}
      {data.filter(d => d.event).map((d, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${(d.timestamp.getTime() - data[0].timestamp.getTime()) / 
              (data[data.length - 1].timestamp.getTime() - data[0].timestamp.getTime()) * width}px`,
            top: '0px'
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="bg-slate-800 text-slate-200 text-xs rounded-md p-2 shadow-lg -translate-x-1/2 -translate-y-full mb-2">
            {d.event.description}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-slate-800" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
