import { useEffect, useState } from 'react'

/* matches the CSS breakpoint: above 890px the desktop layouts apply */
export const DESKTOP_QUERY = '(min-width: 891px)'

export default function useIsDesktop() {
  const [desk, setDesk] = useState(() => window.matchMedia(DESKTOP_QUERY).matches)
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY)
    const onChange = () => setDesk(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return desk
}
