import type { ComponentProps } from 'react'
import { type HttpMethod, METHOD_COLORS_BASE } from '@/lib/http-method-colors'
import { cn } from '@/lib/utils'

interface MethodBadgeProps extends ComponentProps<'span'> {
  method: HttpMethod
}

export function MethodBadge({ method, className, ...props }: MethodBadgeProps) {
  const badgeClass =
    METHOD_COLORS_BASE[method] ?? 'text-zinc-100 border-zinc-600'

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center',
        'rounded-lg px-3 py-1',
        'text-sm font-semibold font-mono',
        'border border-current/20 bg-zinc-800',
        badgeClass,
        className,
      )}
      {...props}
    >
      {method}
    </span>
  )
}
