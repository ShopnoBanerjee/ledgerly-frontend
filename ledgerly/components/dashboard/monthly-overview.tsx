"use client";

import { useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

interface Expense {
  vendor_name: string;
  receipt_id: string;
  s3_url: string;
  category: string;
  receipt_date: string;
  total_amount: number;
  user_id: string;
}

// Define the props for the distribution chart component.
interface MonthlyOverviewProps {
  expenses: Expense[];
}

// Define a union type for our fixed categories.
type Category = "entertainment" | "food" | "work";

const categories: Category[] = ["entertainment", "food", "work"];

// Define category-specific colors
const chartConfig = {
  entertainment: {
    label: "Entertainment",
    color: "hsl(var(--chart-1))",
  },
  food: {
    label: "Food",
    color: "hsl(var(--chart-2))",
  },
  work: {
    label: "Work",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function MonthlyOverview({ expenses }: MonthlyOverviewProps) {
  // Debugging: Check if CSS variables are applied
  useEffect(() => {
    console.log("Chart-1 Color:", getComputedStyle(document.documentElement).getPropertyValue("--chart-1"));
    console.log("Chart-2 Color:", getComputedStyle(document.documentElement).getPropertyValue("--chart-2"));
    console.log("Chart-3 Color:", getComputedStyle(document.documentElement).getPropertyValue("--chart-3"));
  }, []);

  // Initialize totals for each fixed category.
  const aggregated: Record<Category, number> = {
    entertainment: 0,
    food: 0,
    work: 0,
  };

  // Aggregate the total_amount for each expense that belongs to our fixed categories.
  expenses.forEach((expense) => {
    const cat = expense.category as Category;
    if (categories.includes(cat)) {
      aggregated[cat] += expense.total_amount;
    }
  });

  // Build the chartData array using our fixed categories.
  const chartData = categories.map((category) => ({
    category,
    total: aggregated[category],
    fill: chartConfig[category].color, // Assign category-specific color
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Bar Chart</CardTitle>
        <CardDescription>Expenses by Category</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <BarChart data={chartData} width={400} height={200}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="total"
              radius={8}
              isAnimationActive={false} // Optional: Disable animation for testing
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing expense distribution across categories
        </div>
      </CardFooter>
    </Card>
  );
}
