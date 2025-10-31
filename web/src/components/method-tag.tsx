import type { ComponentProps } from 'react'
import { type HttpMethod, METHOD_COLORS_BASE } from '@/lib/http-method-colors'
import { cn } from '@/lib/utils'

interface MethodTagProps extends ComponentProps<'span'> {
  method: HttpMethod
}

export function MethodTag({ method, className, ...props }: MethodTagProps) {
  const colorClass = METHOD_COLORS_BASE[method] ?? 'text-zinc-300'

  return (
    <span
      className={cn(
        'w-12 shrink-0 font-mono text-xs font-semibold text-right',
        colorClass,
        className,
      )}
      {...props}
    >
      {method}
    </span>
  )
}
