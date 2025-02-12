// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { SearchBar } from "@/components/dashboard/search-bar";
import { ExpenseTable } from "@/components/dashboard/expense-table";
import { ActionButtons } from "@/components/dashboard/action-buttons";
import { MonthlyLimit } from "@/components/dashboard/monthly-limit";
import { DistributionChart } from "@/components/dashboard/distribution-chart";
import { MonthlyOverview } from "@/components/dashboard/monthly-overview";

interface Expense {
  receipt_id: string;
  category: string;
  receipt_date: string; // expected format: YYYY-MM-DD
  vendor_name: string;
  total_amount: number;
  s3_url: string;
  user_id: string;
}

export default function HomePage() {
  // Store all expenses fetched from the API.
  const [allExpenses, setAllExpenses] = useState<Expense[]>([]);
  // Store only the current month expenses for components that require filtering.
  const [currentMonthExpenses, setCurrentMonthExpenses] = useState<Expense[]>([]);

  // Replace with the authenticated user's ID.
  const userId = "ea822075-fac4-40f8-9249-9867e052ba74";
  const API_BASE_URL = process.env.NEXT_PUBLIC_LEDGERLY_API_BASE_URL || "";

  // Function to filter expenses from the current month.
  const parseCurrentMonthExpenses = (expenses: Expense[]): Expense[] => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // Note: month is 0-indexed

    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.receipt_date);
      return (
        expenseDate.getFullYear() === currentYear &&
        expenseDate.getMonth() === currentMonth
      );
    });
  };

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const res = await fetch(`${API_BASE_URL}/receipts/getExpenses/${userId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch expenses");
        }
        const data: Expense[] = await res.json();

        // Store all fetched expenses.
        setAllExpenses(data);

        // Filter expenses to include only those from the current month.
        const filteredExpenses = parseCurrentMonthExpenses(data);
        setCurrentMonthExpenses(filteredExpenses);

        console.log("Expenses fetched successfully:", data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    }
    
    fetchExpenses();
  }, [userId, API_BASE_URL]);

  return (
    <div className="min-h-screen bg-black p-8">
      <h1 className="text-white text-3xl font-bold mb-4">Dashboard</h1>
      <div className="min-h-screen bg-black p-8">
        <div className="mx-auto max-w-7xl space-y-4">
          <SearchBar />
          <ExpenseTable />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ActionButtons />
            <MonthlyLimit expenses={allExpenses} />
            {/* DistributionChart gets only the filtered (current month) data */}
            <DistributionChart expenses={currentMonthExpenses} />
            {/* MonthlyOverview gets the full set of expenses */}
            <MonthlyOverview expenses={allExpenses} />
          </div>
        </div>
      </div>
    </div>
  );
}
