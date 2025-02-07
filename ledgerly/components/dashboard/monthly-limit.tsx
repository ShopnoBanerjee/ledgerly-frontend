"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MonthlyLimit() {
  const value = 75 // Example value (0-100)

  return (
    <Card className="bg-zinc-900">
      <CardHeader>
        <CardTitle className="text-center">Monthly Limit</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center pb-6">
        <div className="relative w-[200px] h-[100px]">
          <svg width="200" height="100" viewBox="0 0 200 100" className="absolute top-0 left-0">
            <path
              d="M20 100 A80 80 0 0 1 180 100"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="20"
              strokeLinecap="round"
            />
            <path
              d="M20 100 A80 80 0 0 1 180 100"
              fill="none"
              stroke="#5934c7"
              strokeWidth="20"
              strokeLinecap="round"
              strokeDasharray={`${value * 2.51} 251`}
            />
            <g transform={`rotate(${value * 1.8} 100 100)`} style={{ transformOrigin: "center bottom" }}>
              <line x1="100" y1="100" x2="100" y2="30" stroke="white" strokeWidth="2" />
              <circle cx="100" cy="100" r="5" fill="white" />
            </g>
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}

