import { Skeleton } from "@/components/ui/skeleton"

export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center">
            <Skeleton className="w-10 h-10 rounded-full mr-3" />
            <Skeleton className="h-6 w-24" />
          </div>

          <div className="bg-gray-50 dark:bg-[#161b22] rounded-lg p-8 shadow-lg">
            <Skeleton className="h-10 w-48 mb-6" />

            <div className="space-y-6">
              <section>
                <Skeleton className="h-8 w-40 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </section>

              <section>
                <Skeleton className="h-8 w-40 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </section>

              <section>
                <Skeleton className="h-8 w-40 mb-3" />
                <div className="grid md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white dark:bg-[#0d1117] p-4 rounded-lg">
                      <Skeleton className="h-6 w-32 mb-2" />
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <Skeleton className="h-8 w-40 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <div className="grid md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="text-center">
                      <Skeleton className="w-24 h-24 rounded-full mx-auto mb-3" />
                      <Skeleton className="h-5 w-24 mx-auto mb-2" />
                      <Skeleton className="h-4 w-32 mx-auto" />
                    </div>
                  ))}
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
