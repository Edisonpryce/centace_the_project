import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white p-4">
      <div className="container mx-auto">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-24 ml-2" />
          </div>
          <div className="hidden md:flex space-x-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* Hero Skeleton */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Skeleton className="h-6 w-16 mb-4 bg-white/20" />
              <Skeleton className="h-12 w-full max-w-md mb-4 bg-white/20" />
              <Skeleton className="h-6 w-full max-w-sm mb-8 bg-white/20" />
              <div className="flex flex-col sm:flex-row gap-4">
                <Skeleton className="h-12 w-40 bg-white/20" />
                <Skeleton className="h-12 w-40 bg-white/20" />
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <Skeleton className="h-80 w-60 bg-white/20 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="mb-12">
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2 bg-gray-100 dark:bg-[#161b22] p-1 rounded-lg">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#161b22] p-6 rounded-lg border border-gray-200 dark:border-gray-800"
              >
                <Skeleton className="h-8 w-8 mb-4" />
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Skeleton */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Skeleton className="h-8 w-full max-w-md mb-4" />
              <Skeleton className="h-4 w-full max-w-sm mb-2" />
              <Skeleton className="h-4 w-full max-w-xs mb-6" />
              <div className="flex space-x-4">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex space-x-4">
                <Skeleton className="h-14 w-36" />
                <Skeleton className="h-14 w-36" />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Skeleton */}
        <div className="mb-12">
          <Skeleton className="h-8 w-64 mx-auto mb-8" />
          <div className="space-y-4 max-w-3xl mx-auto">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#161b22] p-6 rounded-lg border border-gray-200 dark:border-gray-800"
              >
                <Skeleton className="h-6 w-full max-w-md mb-4" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-5/6 mb-1" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
