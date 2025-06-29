import { Skeleton } from "@/components/ui/skeleton"

export default function AcademyLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <Skeleton className="h-12 w-3/4 mb-4 bg-white/20" />
          <Skeleton className="h-6 w-1/2 mb-8 bg-white/20" />
          <div className="max-w-lg">
            <Skeleton className="h-12 w-full bg-white/20" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Featured Courses */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-36" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow">
                <Skeleton className="aspect-video w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Learning Paths */}
        <section className="mb-16">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex gap-6">
                  <Skeleton className="flex-shrink-0 w-20 h-20 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="flex justify-between items-center mb-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-2 w-full mb-4" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section>
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="mb-6 flex space-x-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-36" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <Skeleton className="h-6 w-24 mb-2" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-6 w-28" />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Call To Action */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="h-10 w-2/3 mx-auto mb-4 bg-white/20" />
          <Skeleton className="h-6 w-1/2 mx-auto mb-8 bg-white/20" />
          <div className="flex flex-wrap justify-center gap-4">
            <Skeleton className="h-12 w-32 bg-white/20" />
            <Skeleton className="h-12 w-48 bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  )
}
