import * as Dialog from '@radix-ui/react-dialog'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { Loader, Wand2, X } from 'lucide-react'
import { useEffect, useRef, useState, useTransition } from 'react'

import { CodeBlock } from '@/components/ui/code-block'
import { IconButton } from '@/components/ui/icon-button'
import { WebhooksListItem } from '@/components/webhooks-list-item'
import {
  type GenerateHandlerResponse,
  webhookListSchema,
} from '@/http/schemas/webhooks'
import { cn } from '@/lib/utils'

export function WebhooksList() {
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver>(null)

  const [isPending, startTransition] = useTransition()
  const [checkedWebhookIds, setCheckedWebhookIds] = useState<string[]>([])
  const [generatedHandlerCode, setGeneratedHandlerCode] = useState<
    string | null
  >(null)

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: ['webhooks'],
      queryFn: async ({ pageParam }) => {
        await new Promise(resolve => setTimeout(resolve, 1000))

        const url = new URL('http://localhost:3333/api/webhooks')

        if (pageParam) {
          url.searchParams.set('cursor', pageParam)
        }

        const response = await fetch(url)
        const data = await response.json()

        return webhookListSchema.parse(data)
      },
      getNextPageParam: lastPage => {
        return lastPage.nextCursor ?? undefined
      },
      initialPageParam: undefined as string | undefined,
    })

  const webhooks = data.pages.flatMap(page => page.webhooks)

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      entries => {
        const entry = entries[0]

        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  function handleCheckWebhook(checkedWebhookId: string) {
    if (checkedWebhookIds.includes(checkedWebhookId)) {
      setCheckedWebhookIds(state => {
        return state.filter(webhookId => webhookId !== checkedWebhookId)
      })
    } else {
      setCheckedWebhookIds(state => [...state, checkedWebhookId])
    }
  }

  async function handleGenerateHandler() {
    startTransition(async () => {
      try {
        const response = await fetch('http://localhost:3333/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ webhookIds: checkedWebhookIds }),
        })

        const data: GenerateHandlerResponse = await response.json()

        setGeneratedHandlerCode(data.code)
      } catch (error) {
        console.error('Error generating handler', error)
      }
    })
  }

  const hasAnyWebhookChecked = checkedWebhookIds.length > 0

  return (
    <>
      <div className="flex-1 overflow-y-auto relative">
        <div className="space-y-1 p-2">
          {webhooks.map(webhook => (
            <WebhooksListItem
              key={webhook.id}
              webhook={webhook}
              onWebhookChecked={handleCheckWebhook}
              isWebhookChecked={checkedWebhookIds.includes(webhook.id)}
            />
          ))}
        </div>

        {hasNextPage && (
          <div ref={loadMoreRef} className="p-2">
            {isFetchingNextPage && (
              <div className="flex items-center justify-center py-2">
                <Loader className="size-5 animate-spin text-zinc-500" />
              </div>
            )}
          </div>
        )}

        <div
          data-visible={hasAnyWebhookChecked}
          className={cn(
            'bottom-0 left-0 right-0 p-3 z-10',
            'transition-[opacity,transform] data-[visible=true]:opacity-100 data-[visible=false]:opacity-0',
            'data-[visible=true]:sticky data-[visible=false]:hidden',
          )}
        >
          <button
            type="button"
            disabled={isPending}
            className="w-full bg-emerald-500 rounded-lg flex items-center justify-center gap-3 font-medium text-sm py-2.5 cursor-pointer disabled:bg-emerald-700 disabled:cursor-not-allowed disabled:text-zinc-400"
            onClick={handleGenerateHandler}
          >
            {isPending ? (
              <>
                <Loader className="size-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="size-4" />
                Generate Handler{' '}
                {checkedWebhookIds.length > 0 &&
                  `(${checkedWebhookIds.length})`}
              </>
            )}
          </button>
        </div>
      </div>

      {!!generatedHandlerCode && (
        <Dialog.Root defaultOpen>
          <Dialog.Overlay className="fixed bg-black/60 inset-0 z-20" />
          <Dialog.Content className="flex items-center justify-center fixed left-1/2 top-1/2 max-h-[85vh] w-full max-w-[90vw] -translate-x-1/2 -translate-y-1/2 z-40">
            <div className="relative space-y-3 bg-zinc-900 w-full max-w-4xl p-4 rounded-lg border border-zinc-800 max-h-[85vh] overflow-y-auto">
              <Dialog.Title className="text-lg font-medium text-zinc-300">
                Generated Webhook Handler
              </Dialog.Title>
              <Dialog.Description className="text-sm text-zinc-400">
                TypeScript code generated based on {checkedWebhookIds.length}{' '}
                webhooks
              </Dialog.Description>

              <CodeBlock language="typescript" code={generatedHandlerCode} />

              <Dialog.Close asChild>
                <IconButton
                  size="sm"
                  icon={<X className="size-4 text-zinc-400" />}
                  className="absolute right-4 top-2.5 cursor-pointer"
                  aria-label="Close"
                />
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      )}
    </>
  )
}
