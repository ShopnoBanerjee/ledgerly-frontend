// app/components/dashboard/distribution-chart.tsx
"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

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

// Define the Expense interface
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
interface DistributionChartProps {
  expenses: Expense[];
}

// Define a union type for our fixed categories.
type Category = "entertainment" | "food" | "work";

// Fixed categories array (typed as Category[])
const categories: Category[] = ["entertainment", "food", "work"];

// Define the chart configuration for our three fixed categories.
const chartConfig = {
  total: {
    label: "Amount",
  },
  entertainment: {
    label: "Entertainment",
    color: "hsl(var(--chart-1))", // Ensure these CSS variables exist
  },
  food: {
    label: "Food",
    color: "hsl(var(--chart-3))",
  },
  work: {
    label: "Work",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;


export function DistributionChart({ expenses }: DistributionChartProps) {
  // Initialize totals for each fixed category.
  const aggregated: Record<Category, number> = {
    entertainment: 0,
    food: 0,
    work: 0,
  };

  // Aggregate the total_amount for each expense that belongs to our fixed categories.
  expenses.forEach((expense) => {
    // Cast expense.category as Category
    const cat = expense.category as Category;
    if (categories.includes(cat)) {
      aggregated[cat] += expense.total_amount;
    }
  });

  // Build the chartData array using our fixed categories.
  const chartData = categories.map((category) => ({
    category,
    total: aggregated[category],
    // Use the color from the chartConfig for the corresponding category
    fill: chartConfig[category].color,
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Category Distribution</CardTitle>
        <CardDescription>Entertainment, Food, Work</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="total" nameKey="category" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total expenses for Entertainment, Food, and Work.
        </div>
      </CardFooter>
    </Card>
  );
}
