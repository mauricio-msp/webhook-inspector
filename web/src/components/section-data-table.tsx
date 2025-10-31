import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

interface SectionDataTableProps extends ComponentProps<'div'> {
  data: Array<{ key: string; value: string }>
}

export function SectionDataTable({
  data,
  className,
  ...props
}: SectionDataTableProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-zinc-700',
        className,
      )}
      {...props}
    >
      <table className="w-full">
        <tbody>
          {data.map(item => (
            <tr
              key={item.key}
              className="border-b border-zinc-700 last:border-0"
            >
              <td className="w-72 p-3 text-sm font-medium text-zinc-400 bg-zinc-800/50 border-r border-zinc-700">
                {item.key}
              </td>
              <td className="p-3 text-sm font-mono text-zinc-300">
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
