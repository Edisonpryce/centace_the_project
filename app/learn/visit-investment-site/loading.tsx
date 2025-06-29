import { Skeleton } from "@/components/ui/skeleton"

export default function VisitInvestmentSiteLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3"></div>
            <Skeleton className="h-6 w-24" />
          </div>

          <div className="bg-gray-50 dark:bg-[#161b22] rounded-lg p-8 shadow-lg">
            <Skeleton className="h-10 w-64 mb-6" />

            <div className="space-y-8">
              <section>
                <Skeleton className="h-8 w-48 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-4" />

                <div className="bg-white dark:bg-[#0d1117] p-6 rounded-lg">
                  <Skeleton className="h-6 w-40 mb-3" />
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="pl-5">
                        <Skeleton className="h-6 w-40 mb-1" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section>
                <Skeleton className="h-8 w-64 mb-3" />
                <Skeleton className="h-4 w-full mb-4" />
                <div className="bg-white dark:bg-[#0d1117] p-6 rounded-lg">
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="pl-5">
                        <Skeleton className="h-6 w-48 mb-1" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Skeleton className="h-6 w-32 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  )
}
