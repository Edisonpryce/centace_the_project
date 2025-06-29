import { Skeleton } from "@/components/ui/skeleton"

interface TableLoadingProps {
  rows?: number
  columns?: number
}

export function TableLoading({ rows = 5, columns = 4 }: TableLoadingProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 divide-y divide-border">
        <div className="grid grid-cols-1 divide-y divide-border">
          <div className={`grid grid-cols-${columns} gap-4 p-4`}>
            {Array.from({ length: columns }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>

          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className={`grid grid-cols-${columns} gap-4 p-4`}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton key={colIndex} className="h-5 w-full" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
