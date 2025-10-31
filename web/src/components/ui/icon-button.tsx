import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const iconButtonVariants = tv({
  base: 'flex items-center justify-center rounded-lg hover:bg-zinc-700 transition-colors duration-150 cursor-pointer',
  variants: {
    size: {
      sm: 'size-6',
      md: 'size-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

interface IconButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof iconButtonVariants> {
  icon: React.ReactNode
}

export function IconButton({
  icon,
  size,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      data-slot="icon-button"
      className={iconButtonVariants({ size, className })}
      {...props}
    >
      {icon}
    </button>
  )
}
