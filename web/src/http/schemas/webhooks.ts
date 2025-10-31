import { z } from 'zod'

export type GenerateHandlerResponse = {
  code: string
}

export const webhookListItemSchema = z.object({
  id: z.uuidv7(),
  method: z
    .enum(['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'])
    .default('GET'),
  pathname: z.string(),
  createdAt: z.coerce.date(),
})

export const webhookDetailsSchema = z.object({
  id: z.uuidv7(),
  ip: z.string(),
  body: z.string().nullable(),
  method: z
    .enum(['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'])
    .default('GET'),
  pathname: z.string(),
  statusCode: z.number(),
  headers: z.record(z.string(), z.string()),
  queryParams: z.record(z.string(), z.string()).nullable(),
  contentType: z.string().nullable(),
  contentLength: z.number().nullable(),
  createdAt: z.coerce.date(),
})

export const webhookListSchema = z.object({
  webhooks: z.array(webhookListItemSchema),
  nextCursor: z.string().nullable(),
})
