import { Check, Copy } from 'lucide-react'
import { Suspense } from 'react'

import { IconButton } from '@/components/ui/icon-button'
import { WebhooksListSkeleton } from '@/components/webhook-list-skeleton'
import { WebhooksList } from '@/components/webhooks-list'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'

export function Sidebar() {
  const [isCopied, _, copyFn] = useCopyToClipboard()

  return (
    <aside className="flex h-screen flex-col">
      <header className="flex flex-col h-32">
        <div className="flex flex-1 items-center justify-between border-b border-zinc-700 px-4 py-5">
          <div className="flex items-baseline">
            <span className="font-semibold text-zinc-100">webhook</span>
            <span className="font-normal text-zinc-400">.inspect</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 border-b border-zinc-700 bg-zinc-800 px-4 py-2.5">
          <div className="flex-1 min-w-0 flex items-center gap-1 text-xs font-mono text-zinc-300">
            <span className="truncate">http://localhost:3333/api/capture</span>
          </div>
          <IconButton
            icon={
              isCopied ? (
                <Check className="size-4 text-green-400" />
              ) : (
                <Copy className="size-4" />
              )
            }
            aria-label="Copy"
            onClick={() => copyFn('http://localhost:3333/api/capture')}
          />
        </div>
      </header>

      <Suspense fallback={<WebhooksListSkeleton />}>
        <WebhooksList />
      </Suspense>
    </aside>
  )
}
