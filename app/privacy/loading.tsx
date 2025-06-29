import { Skeleton } from "@/components/ui/skeleton"

export default function PrivacyLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center">
            <Skeleton className="w-10 h-10 rounded-full mr-3" />
            <Skeleton className="h-6 w-24" />
          </div>

          <div className="bg-gray-50 dark:bg-[#161b22] rounded-lg p-8 shadow-lg">
            <Skeleton className="h-10 w-48 mb-2" />
            <Skeleton className="h-4 w-40 mb-8" />

            <div className="space-y-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <section key={i}>
                  <Skeleton className="h-7 w-64 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-2" />
                  {i % 2 === 0 && (
                    <div className="mt-4">
                      <Skeleton className="h-6 w-48 mb-2" />
                      <div className="space-y-2 pl-6 mt-2">
                        {[1, 2, 3, 4].map((j) => (
                          <div key={j} className="flex">
                            <Skeleton className="h-4 w-4 rounded-full mr-2" />
                            <Skeleton className="h-4 w-full" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              ))}
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
