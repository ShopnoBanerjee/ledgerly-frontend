"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", expenses: 3000, income: 6500, savings: 3000 },
  { month: "Feb", expenses: 2500, income: 2300, savings: 4000 },
]

export function MonthlyOverview() {
  return (
    <Card className="bg-zinc-900">
      <CardHeader>
        <CardTitle>Monthly Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            expenses: {
              label: "Expenses",
              color: "#5934c7",
            },
            income: {
              label: "Income",
              color: "#eab3ff",
            },
            savings: {
              label: "Savings",
              color: "#b987ff",
            },
          }}
        >
          <BarChart width={300} height={200} data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Bar dataKey="expenses" fill="#5934c7" radius={[4, 4, 0, 0]} />
            <Bar dataKey="income" fill="#eab3ff" radius={[4, 4, 0, 0]} />
            <Bar dataKey="savings" fill="#b987ff" radius={[4, 4, 0, 0]} />
            <ChartTooltip content={<ChartTooltipContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

