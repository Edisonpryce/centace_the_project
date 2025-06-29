import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

interface InlineLoadingProps {
  text?: string
  className?: string
}

export function InlineLoading({ text = "Loading...", className }: InlineLoadingProps) {
  return (
    <div className={cn("flex items-center text-sm text-muted-foreground", className)}>
      <Spinner size="sm" className="mr-2" />
      <span>{text}</span>
    </div>
  )
}
