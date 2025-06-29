import { Skeleton } from "@/components/ui/skeleton"

export default function GiftCardLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Skeleton className="h-12 w-3/4 mb-4 bg-white/20" />
              <Skeleton className="h-6 w-1/2 mb-6 bg-white/20" />
              <Skeleton className="h-4 w-full mb-2 bg-white/20" />
              <Skeleton className="h-4 w-full mb-2 bg-white/20" />
              <Skeleton className="h-4 w-4/5 mb-8 bg-white/20" />
              <div className="flex flex-wrap gap-4">
                <Skeleton className="h-12 w-32 bg-white/20" />
                <Skeleton className="h-12 w-32 bg-white/20" />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <Skeleton className="h-44 w-72 rounded-xl bg-white/20 transform rotate-6" />
                <Skeleton className="h-44 w-72 rounded-xl bg-white/20 absolute top-4 -left-4 transform -rotate-3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* How It Works Section */}
        <section className="mb-16">
          <Skeleton className="h-10 w-64 mx-auto mb-12" />
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="flex flex-col items-center text-center">
                  <Skeleton className="h-16 w-16 rounded-full mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Purchase Section */}
        <section className="mb-16">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8">
            <Skeleton className="h-8 w-64 mb-8" />
            <div className="mb-6 flex space-x-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i}>
                      <Skeleton className="h-5 w-24 mb-1" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Skeleton className="h-6 w-24 mb-4" />
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md">
                  <Skeleton className="w-full h-48 rounded-xl mb-4" />
                  <Skeleton className="h-20 w-full rounded-lg mb-4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <Skeleton className="h-8 w-64 mb-8" />
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="flex gap-4">
                  <Skeleton className="h-6 w-6 flex-shrink-0" />
                  <div className="w-full">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Skeleton className="h-10 w-32 mx-auto" />
          </div>
        </section>
      </main>
    </div>
  )
}
