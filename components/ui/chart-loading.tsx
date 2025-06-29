import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface ChartLoadingProps {
  height?: string
  withLegend?: boolean
  withTitle?: boolean
}

export function ChartLoading({ height = "h-64", withLegend = true, withTitle = true }: ChartLoadingProps) {
  return (
    <Card>
      {withTitle && (
        <CardHeader className="pb-0">
          <Skeleton className="h-6 w-1/3" />
        </CardHeader>
      )}
      <CardContent className="p-6">
        <Skeleton className={`w-full ${height}`} />

        {withLegend && (
          <div className="flex items-center justify-center space-x-4 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-1">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
