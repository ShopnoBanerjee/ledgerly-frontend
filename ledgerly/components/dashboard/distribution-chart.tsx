"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { PieChart, Pie, Cell } from "recharts"

const data = [
  { name: "A", value: 60 },
  { name: "B", value: 20 },
  { name: "C", value: 15 },
  { name: "D", value: 5 },
]

const COLORS = ["#5934c7", "#eab3ff", "#b987ff", "#5934c7"]

export function DistributionChart() {
  return (
    <Card className="bg-zinc-900">
      <CardHeader>
        <CardTitle>Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            type: "pie",
            data: data,
            colors: COLORS,
          }}
        >
          <PieChart width={200} height={200}>
            <Pie data={data} cx={100} cy={100} innerRadius={0} outerRadius={80} paddingAngle={0} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

