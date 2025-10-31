import { useSuspenseQuery } from '@tanstack/react-query'

import { SectionDataTable } from '@/components/section-data-table'
import { SectionTitle } from '@/components/section-title'
import { CodeBlock } from '@/components/ui/code-block'
import { WebhookDetailHeader } from '@/components/webhook-detail-header'
import { webhookDetailsSchema } from '@/http/schemas/webhooks'

interface WebhookDetailsProps {
  id: string
}

export function WebhookDetails({ id }: WebhookDetailsProps) {
  const { data } = useSuspenseQuery({
    queryKey: ['webhook', id],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1500))

      const response = await fetch(`http://localhost:3333/api/webhooks/${id}`)
      const data = await response.json()

      return webhookDetailsSchema.parse(data)
    },
  })

  const overviewData = [
    { key: 'Method', value: data.method },
    { key: 'Status Code', value: String(data.statusCode) },
    { key: 'Content-Type', value: data.contentType || 'application/json' },
    { key: 'Content-Length', value: `${data.contentLength || 0} bytes` },
  ]

  const queryParams = Object.entries(data.queryParams || {}).map(
    ([key, value]) => ({
      key,
      value: String(value),
    }),
  )

  const headers = Object.entries(data.headers).map(([key, value]) => ({
    key,
    value: String(value),
  }))

  const body = data.body ?? ''

  return (
    <main className="flex h-full flex-col">
      <WebhookDetailHeader
        ip={data.ip}
        method={data.method}
        pathname={data.pathname}
        createdAt={data.createdAt}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          <div className="space-y-4">
            <SectionTitle>Request Overview</SectionTitle>
            <SectionDataTable data={overviewData} />
          </div>

          {!!queryParams.length && (
            <div className="space-y-4">
              <SectionTitle>Query Parameters</SectionTitle>
              <SectionDataTable data={queryParams} />
            </div>
          )}

          <div className="space-y-4">
            <SectionTitle>Headers</SectionTitle>
            <SectionDataTable data={headers} />
          </div>

          {!!body && (
            <div className="space-y-4">
              <SectionTitle>Request Body</SectionTitle>
              <CodeBlock code={body} />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
