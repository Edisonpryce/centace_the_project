import { Skeleton } from "@/components/ui/skeleton"

export default function BusinessPlanningLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-12 w-3/4 mb-6" />
          <Skeleton className="h-6 w-full max-w-2xl mb-12" />

          <div className="space-y-12">
            <section>
              <Skeleton className="h-8 w-64 mb-4" />
              <Skeleton className="h-40 w-full rounded-lg" />
            </section>

            <section>
              <Skeleton className="h-8 w-64 mb-6" />
              <div className="space-y-4">
                <div className="flex gap-2 mb-6">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-10 flex-1 rounded-md" />
                  ))}
                </div>
                <Skeleton className="h-60 w-full rounded-lg" />
              </div>
            </section>

            <section>
              <Skeleton className="h-8 w-64 mb-6" />
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border rounded-lg p-6">
                    <Skeleton className="h-12 w-12 rounded-full mb-4" />
                    <Skeleton className="h-6 w-32 mb-4" />
                    <Skeleton className="h-6 w-32 mb-4" />
                    <Skeleton className="h-16 w-full mb-4" />
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="flex items-center gap-2">
                          <Skeleton className="h-4 w-4 rounded-full" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <Skeleton className="h-8 w-64 mb-4" />
              <Skeleton className="h-40 w-full rounded-lg" />
            </section>

            <Skeleton className="h-60 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
