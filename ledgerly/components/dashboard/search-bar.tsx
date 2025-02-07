"use client"

import { Search, ArrowUpDown, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchBar() {
  return (
    <div className="flex items-center justify-between">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search" className="pl-8" />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="icon">
          <ArrowUpDown className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <FileText className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

