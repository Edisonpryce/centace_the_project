import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function ResearchLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 py-8 bg-white dark:bg-[#0d1117]">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <Skeleton className="h-8 w-48 mb-4" />
                <div className="space-y-2">
                  {Array(6)
                    .fill(null)
                    .map((_, index) => (
                      <Skeleton key={index} className="h-10 w-full" />
                    ))}
                </div>
                <Skeleton className="h-6 w-32 mt-8 mb-2" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-1 lg:col-span-2">
            <div className="mb-6 flex space-x-2">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>

            <div className="space-y-8">
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-gray-100 dark:bg-gray-800 p-6 flex items-center justify-center">
                        <Skeleton className="h-16 w-16" />
                      </div>
                      <div className="md:col-span-2 p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <Skeleton className="h-6 w-24 mb-2" />
                            <Skeleton className="h-8 w-full max-w-sm mb-2" />
                          </div>
                          <Skeleton className="h-8 w-16" />
                        </div>
                        <Skeleton className="h-4 w-full my-2" />
                        <Skeleton className="h-4 w-full my-2" />
                        <Skeleton className="h-4 w-2/3 my-2" />
                        <div className="mt-4 flex justify-between items-center">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-8 w-32" />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
