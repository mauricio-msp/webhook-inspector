import { Clock } from 'lucide-react'
import { MethodBadge } from '@/components/method-badge'
import type { HttpMethod } from '@/lib/http-method-colors'

interface WebhookDetailHeaderProps {
  ip: string
  method: HttpMethod
  pathname: string
  createdAt: Date
}

export function WebhookDetailHeader({
  ip,
  method,
  pathname,
  createdAt,
}: WebhookDetailHeaderProps) {
  return (
    <header className="space-y-5 border-b border-zinc-700 p-6 h-32">
      <div className="flex items-center gap-3">
        <MethodBadge method={method} />
        <span className="text-lg font-medium text-zinc-300">{pathname}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span>From IP</span>
          <span className="underline underline-offset-4">{ip}</span>
        </div>
        <span>🍀</span>
        <div className="flex items-center gap-1.5 text-sm text-zinc-400">
          <span>at</span>
          <Clock className="size-3" />
          <span>{createdAt.toLocaleString('en-US')}</span>
        </div>
      </div>
    </header>
  )
}
