import { Skeleton } from '@/components/ui/skeleton'

export function WebhookDetailsSkeleton() {
  return (
    <div className="flex h-full flex-col">
      <div className="space-y-5 border-b border-zinc-700 p-6 h-32">
        <div className="flex items-center gap-3">
          <Skeleton className="w-16 h-8 border border-zinc-700" />
          <Skeleton className="w-36 h-7" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Skeleton className="w-32 h-5" />
          </div>
          <Skeleton className="w-4 h-4" />
          <div className="flex items-center gap-1.5 text-sm text-zinc-400">
            <Skeleton className="w-60 h-5" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-6 w-full max-w-xs border-none" />
              <Skeleton className="h-[181px] w-full border border-zinc-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
