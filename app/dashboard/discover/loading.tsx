import { ProjectCardSkeleton } from "@/components/project-card-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function DiscoverLoading() {
  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Skeleton className="h-10 w-[150px]" />
      </div>
    </div>
  )
}
