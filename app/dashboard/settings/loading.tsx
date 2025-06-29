import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function SettingsLoading() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <Skeleton className="h-8 w-[200px]" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-20 w-20 rounded-full mx-auto" />
              <div className="space-y-2 text-center">
                <Skeleton className="h-6 w-1/2 mx-auto" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
              </div>
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6 space-y-6">
              <Skeleton className="h-6 w-1/3" />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-1/4" />
                  <Skeleton className="h-10 w-full" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-5 w-1/4" />
                  <Skeleton className="h-10 w-full" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-5 w-1/4" />
                  <Skeleton className="h-10 w-full" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-5 w-1/4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              <Skeleton className="h-12 w-1/3" />
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="p-6 space-y-6">
              <Skeleton className="h-6 w-1/3" />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-1/4" />
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-6 w-6" />
                    <Skeleton className="h-5 w-1/3" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-5 w-1/4" />
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-6 w-6" />
                    <Skeleton className="h-5 w-1/3" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-5 w-1/4" />
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-6 w-6" />
                    <Skeleton className="h-5 w-1/3" />
                  </div>
                </div>
              </div>

              <Skeleton className="h-12 w-1/3" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
