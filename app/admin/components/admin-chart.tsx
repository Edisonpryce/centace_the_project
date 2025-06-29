"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface AdminChartProps {
  type: "line" | "bar" | "pie"
}

export default function AdminChart({ type }: AdminChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Sample data
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

    const chartConfig: any = {
      type,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top" as const,
          },
        },
      },
    }

    if (type === "line" || type === "bar") {
      chartConfig.data = {
        labels,
        datasets: [
          {
            label: type === "line" ? "Investment Growth ($)" : "New Users",
            data: [12, 19, 3, 5, 2, 3].map(() => Math.floor(Math.random() * 100)),
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.5)",
          },
        ],
      }
    } else if (type === "pie") {
      chartConfig.data = {
        labels: ["Silver", "Gold", "Diamond"],
        datasets: [
          {
            label: "Revenue by Tier",
            data: [30, 50, 20],
            backgroundColor: ["rgba(156, 163, 175, 0.7)", "rgba(234, 179, 8, 0.7)", "rgba(59, 130, 246, 0.7)"],
            borderColor: ["rgb(156, 163, 175)", "rgb(234, 179, 8)", "rgb(59, 130, 246)"],
            borderWidth: 1,
          },
        ],
      }
    }

    chartInstance.current = new Chart(ctx, chartConfig)

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [type])

  return (
    <div className="h-[300px] w-full">
      <canvas ref={chartRef} />
    </div>
  )
}
