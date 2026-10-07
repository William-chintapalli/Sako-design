import { useEffect, useRef, useState } from 'react'

/* adds .in once the element scrolls into view (one IntersectionObserver per element, then disconnects) */
export default function useReveal(options = { threshold: 0.15 }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || shown) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShown(true)
        io.disconnect()
      }
    }, options)
    io.observe(el)
    return () => io.disconnect()
  }, [shown, options])
  return [ref, shown ? 'reveal in' : 'reveal']
}
