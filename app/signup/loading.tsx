import { Skeleton } from "@/components/ui/skeleton"

export default function SignupLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0d1117] p-4">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-[#161b22] p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <Skeleton className="h-6 w-32" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="pt-4">
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="flex items-center justify-center space-x-4 pt-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  )
}
