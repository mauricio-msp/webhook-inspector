import { useCallback, useEffect, useRef, useState } from 'react'

type IsCopied = boolean
type CopiedValue = string | null
type CopyFn = (text: string) => Promise<boolean>

export function useCopyToClipboard(
  delay: number = 1000,
): [IsCopied, CopiedValue, CopyFn] {
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(0)

  const copy: CopyFn = useCallback(
    async text => {
      if (!navigator?.clipboard) {
        console.warn('Clipboard not supported')
        return false
      }

      // Try to save to clipboard then save it in the state if worked
      try {
        await navigator.clipboard.writeText(text)
        setCopiedText(text)
        setIsCopied(true)

        return true
      } catch (error) {
        console.warn('Copy failed', error)
        setCopiedText(null)

        return false
      } finally {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setIsCopied(false), delay)
      }
    },
    [delay],
  )

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  return [isCopied, copiedText, copy]
}
