import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function PortfolioLoading() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-10 w-[120px]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-2">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <Skeleton className="h-6 w-[180px]" />
        <Card>
          <div className="p-4">
            <Skeleton className="h-64 w-full" />
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-6 w-[180px]" />
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border rounded-lg">
              <div className="p-4">
                <div className="flex items-center justify-between py-2">
                  <Skeleton className="h-5 w-[150px]" />
                  <Skeleton className="h-5 w-[150px]" />
                  <Skeleton className="h-5 w-[150px]" />
                  <Skeleton className="h-5 w-[150px]" />
                  <Skeleton className="h-5 w-[150px]" />
                </div>
              </div>
              <div className="p-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-t">
                    <Skeleton className="h-5 w-[150px]" />
                    <Skeleton className="h-5 w-[150px]" />
                    <Skeleton className="h-5 w-[150px]" />
                    <Skeleton className="h-5 w-[150px]" />
                    <Skeleton className="h-5 w-[150px]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
