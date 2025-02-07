import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function ActionButtons() {
  return (
    <div className="space-y-4">
      <Card className="bg-zinc-900">
        <CardContent className="p-6">
          <Button className="w-full" style={{ backgroundColor: "#5934c7", color: "white" }}>
            Upload Bill
          </Button>
        </CardContent>
      </Card>
      <Card className="bg-zinc-900">
        <CardContent className="p-6">
          <Button className="w-full" style={{ backgroundColor: "#5934c7", color: "white" }}>
            Manual Record
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

