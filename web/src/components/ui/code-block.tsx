import { Check, Copy } from 'lucide-react'
import { type ComponentProps, useEffect, useState } from 'react'
import { type BundledLanguage, codeToHtml } from 'shiki'

import { IconButton } from '@/components/ui/icon-button'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { cn } from '@/lib/utils'

interface CodeBlockProps extends ComponentProps<'div'> {
  code: string
  language?: BundledLanguage
}

export function CodeBlock({
  className,
  code,
  language = 'json',
  ...props
}: CodeBlockProps) {
  const [parsedCode, setParsedCode] = useState('')
  const [isCopied, _, copyFn] = useCopyToClipboard()

  useEffect(() => {
    if (code) {
      codeToHtml(code, { lang: language, theme: 'vesper' }).then(parsed =>
        setParsedCode(parsed),
      )
    }
  }, [code, language])

  return (
    <div
      data-slot="code-block"
      className={cn(
        'relative rounded-lg border border-zinc-700 overflow-x-auto bg-[#101010]',
        'overflow-auto max-w-full',
        className,
      )}
      {...props}
    >
      <IconButton
        icon={
          isCopied ? (
            <Check className="size-4 text-emerald-400" />
          ) : (
            <Copy className="size-4 text-zinc-400" />
          )
        }
        className="absolute right-4 top-2.5 cursor-pointer"
        aria-label="Copy"
        onClick={() => copyFn(code)}
      />

      <div
        className="[&_pre]:p-4 [&_pre]:text-sm [&_pre]:font-mono [&_pre]:leading-relaxed [&_pre]:min-w-full"
        dangerouslySetInnerHTML={{ __html: parsedCode }}
      />
    </div>
  )
}
