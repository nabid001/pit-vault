export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="fixed inset-x-0 top-16 z-40 flex h-16 items-center justify-between border-b bg-white px-4">
        <div className="flex items-center gap-4">
          <div className="size-10 animate-pulse rounded-full bg-gray-200" />
          <div className="flex items-center gap-3">
            <div className="size-8 animate-pulse rounded-full bg-gray-200" />
            <div className="space-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-9 animate-pulse rounded-full bg-gray-200" />
          <div className="size-9 animate-pulse rounded-full bg-gray-200" />
          <div className="h-9 w-32 animate-pulse rounded-full bg-gray-200" />
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="mx-auto max-w-screen-2xl px-4 pt-36">
        <div className="relative flex justify-center">
          <div className="aspect-[3/2] w-full max-w-4xl animate-pulse rounded-lg bg-gray-200" />
        </div>

        {/* Stats Skeleton */}
        <div className="mx-auto mt-6 max-w-5xl">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex gap-6">
              <div>
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                <div className="mt-1 h-6 w-20 animate-pulse rounded bg-gray-200" />
              </div>
              <div>
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                <div className="mt-1 h-6 w-20 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
