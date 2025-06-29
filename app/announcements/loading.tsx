import { Skeleton } from "@/components/ui/skeleton"

export default function AnnouncementsLoading() {
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

            <div className="space-y-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <section key={i}>
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <Skeleton className="h-7 w-64" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
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
