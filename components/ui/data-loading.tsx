import { Spinner } from "@/components/ui/spinner"

interface DataLoadingProps {
  text?: string
}

export function DataLoading({ text = "Loading data..." }: DataLoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <Spinner size="lg" />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  )
}
