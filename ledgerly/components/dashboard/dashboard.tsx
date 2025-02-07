import { SearchBar } from "./search-bar"
import { ExpenseTable } from "./expense-table"
import { ActionButtons } from "./action-buttons"
import { MonthlyLimit } from "./monthly-limit"
import { DistributionChart } from "./distribution-chart"
import { MonthlyOverview } from "./monthly-overview"

export function Dashboard() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="mx-auto max-w-7xl space-y-4">
        <SearchBar />
        <ExpenseTable />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ActionButtons />
          <MonthlyLimit />
          <DistributionChart />
          <MonthlyOverview />
        </div>
      </div>
    </div>
  )
}

