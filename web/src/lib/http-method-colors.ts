export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS'

export const METHOD_COLORS_BASE: Record<HttpMethod, string> = {
  GET: 'text-purple-400',
  POST: 'text-lime-400',
  PUT: 'text-yellow-400',
  PATCH: 'text-amber-400',
  DELETE: 'text-red-400',
  OPTIONS: 'text-blue-400',
}
