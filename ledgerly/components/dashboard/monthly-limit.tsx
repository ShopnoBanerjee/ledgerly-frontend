"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define the Expense type (or import it if defined elsewhere).
interface Expense {
  receipt_id: string;
  category: string;
  receipt_date: string; // expected format: YYYY-MM-DD
  vendor_name: string;
  total_amount: number;
  s3_url: string;
  user_id: string;
}

interface MonthlyLimitProps {
  expenses: Expense[];
}

// Define a constant array for month abbreviations.
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function MonthlyLimit({ expenses }: MonthlyLimitProps) {
  const now = new Date();
  const lastSixMonths: {
    year: number;
    month: number;
    label: string;
    total: number;
  }[] = [];

  // Loop to generate the last 6 months including the current month.
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    lastSixMonths.push({
      year: d.getFullYear(),
      month: d.getMonth(), // Note: months are 0-indexed.
      label: MONTH_NAMES[d.getMonth()],
      total: 0,
    });
  }

  // Aggregate expenses into the corresponding month.
  expenses.forEach((expense) => {
    const expenseDate = new Date(expense.receipt_date);
    lastSixMonths.forEach((monthData) => {
      if (
        expenseDate.getFullYear() === monthData.year &&
        expenseDate.getMonth() === monthData.month
      ) {
        monthData.total += expense.total_amount;
      }
    });
  });

  // Prepare data for the chart.
  const chartData = lastSixMonths.map((monthData) => ({
    month: monthData.label,
    total: monthData.total,
  }));

  // Create a period label using the fixed month abbreviations.
  const periodLabel = `${lastSixMonths[0].label} ${lastSixMonths[0].year} - ${lastSixMonths[lastSixMonths.length - 1].label} ${lastSixMonths[lastSixMonths.length - 1].year}`;

  // Update chart config to use the "total" key.
  const chartConfig = {
    total: {
      label: "Total Expenses",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Expenses</CardTitle>
        <CardDescription>{periodLabel}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <LineChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value} // Already abbreviated via MONTH_NAMES.
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line
              dataKey="total"
              type="linear"
              stroke="hsl(var(--chart-1))" // Adjust this color as needed.
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total expenses for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
