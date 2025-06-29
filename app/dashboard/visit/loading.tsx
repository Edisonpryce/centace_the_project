import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Skeleton className="h-8 w-48 mb-2" />
      <Skeleton className="h-4 w-64 mb-8" />

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="h-1 w-16 mx-2" />
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="h-1 w-16 mx-2" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Main Card */}
      <div className="rounded-xl border border-gray-800 p-6">
        <Skeleton className="h-6 w-48 mb-6" />

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Additional Info */}
      <div className="rounded-xl border border-gray-800 p-6 mt-6">
        <Skeleton className="h-6 w-48 mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
