import { Skeleton } from "@/components/ui/skeleton"

export default function BuyProjectLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117]">
      {/* Header Skeleton */}
      <header className="border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-20 h-4" />
            <div className="hidden md:flex space-x-6">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-24 h-4" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="w-16 h-8" />
            <Skeleton className="w-20 h-8" />
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Skeleton className="w-32 h-4" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="w-16 h-6 rounded-full" />
                <Skeleton className="w-20 h-4" />
              </div>
              <Skeleton className="w-3/4 h-10 mb-4" />
              <Skeleton className="w-40 h-4" />
            </div>

            {/* Project Image */}
            <Skeleton className="w-full h-96 rounded-xl" />

            {/* Project Description */}
            <div className="bg-white dark:bg-[#1a1d24] rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <Skeleton className="w-48 h-6 mb-4" />
              <div className="space-y-3">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-3/4 h-4" />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#1a1d24] rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <Skeleton className="w-40 h-6 mb-6" />
              <div className="space-y-4 mb-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between items-center">
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-20 h-4" />
                  </div>
                ))}
              </div>
              <Skeleton className="w-full h-12 rounded-lg" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
