import { Skeleton } from '@/components/ui/skeleton'

export function WebhooksListSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-2 p-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-12 w-full rounded-lg border border-zinc-700"
          />
        ))}
      </div>
    </div>
  )
}
