import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

// Dynamically import the LandingPage component with loading fallback
const LandingPage = dynamic(() => import("@/components/landing-page"), {
  loading: () => (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="flex flex-col items-center space-y-8">
          <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800"></div>
          <div className="space-y-4 w-full">
            <Skeleton className="h-8 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
            <div className="space-y-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  ssr: true, // Enable server-side rendering for better SEO
})

export default function Home() {
  return <LandingPage />
}
