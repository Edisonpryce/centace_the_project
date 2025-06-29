import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

interface SectionLoadingProps {
  text?: string
  className?: string
}

export function SectionLoading({ text = "Loading section...", className }: SectionLoadingProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-4 space-y-2", className)}>
      <Spinner size="md" />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  )
}
