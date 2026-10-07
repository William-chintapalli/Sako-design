import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './PageTransition.css'

/* each route fades in, starts at the top and sets the tab title.
   Opacity only: a transform here would break the fixed navbar and the fixed opened-project view. */
export default function PageTransition({ title, children }) {
  const { pathname } = useLocation()
  useEffect(() => {
    if (title) document.title = title
    window.scrollTo(0, 0)
  }, [title, pathname])
  return (
    <div className="page-transition" key={pathname}>
      {children}
    </div>
  )
}
