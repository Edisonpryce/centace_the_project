import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

interface FormLoadingProps {
  fields?: number
  withHeader?: boolean
  withFooter?: boolean
}

export function FormLoading({ fields = 4, withHeader = true, withFooter = true }: FormLoadingProps) {
  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        {withHeader && (
          <div className="space-y-2">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        )}

        <div className="space-y-4">
          {Array.from({ length: fields }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>

        {withFooter && (
          <div className="flex justify-end space-x-2">
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
