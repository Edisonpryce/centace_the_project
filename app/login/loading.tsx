import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function LoginLoading() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2 text-center">
            <Skeleton className="h-8 w-1/2 mx-auto" />
            <Skeleton className="h-5 w-3/4 mx-auto" />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>

            <Skeleton className="h-12 w-full" />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Skeleton className="h-px w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <Skeleton className="h-4 w-8 bg-background" />
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="text-center">
            <Skeleton className="h-5 w-1/2 mx-auto" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
