"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const expenses = [
  { id: 1, amount: 2000, description: "Ghi", date: "22/1/25" },
  { id: 2, amount: 1400, description: "Abc", date: "14/1/25" },
  { id: 3, amount: 12000, description: "Def", date: "2/1/25" },
]

export function ExpenseTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Table</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>A</TableHead>
              <TableHead>B</TableHead>
              <TableHead>C</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{expense.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

