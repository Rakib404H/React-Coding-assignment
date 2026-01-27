import { useEffect, useRef } from 'react'

type Options = {
  enabled: boolean
  onIntersect: () => void
  rootMargin?: string
}

export function useInfiniteScroll({ enabled, onIntersect, rootMargin = '200px' }: Options) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!enabled || !ref.current) return
    const target = ref.current
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onIntersect()
        }
      },
      { rootMargin }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [enabled, onIntersect, rootMargin])

  return ref
}
