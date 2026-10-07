import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'
import { img } from '../../assets/img'

/* the 7 links of the reference video, in its order (Projects and Services stay reachable by URL) */
const NAV_LINKS = [
  ['/', 'Home'],
  ['/architecture', 'Architecture'],
  ['/interior', 'Interior'],
  ['/research', 'Research'],
  ['/about', 'About'],
  ['/publication', 'Publication'],
  ['/contact', 'Contact'],
]

/* variant: "research" | "publication" | "contact" reproduce those pages' own header metrics from the video */
export default function Navbar({ fixed = false, variant = '' }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const links = NAV_LINKS.map(([to, label]) => (
    <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>
      {label}
    </NavLink>
  ))

  return (
    <>
      <header className={`navbar${fixed ? ' fixed' : ''}${variant ? ` navbar--${variant}` : ''}`}>
        <Link to="/" className="logo" aria-label="Sako design narratives — home">
          <img src={img('brand/logo.png')} alt="" className="logo-img" />
          <img src={img('brand/logo-text.png')} alt="Sako design narratives" className="logo-text-img" />
        </Link>
        <nav className="menu" aria-label="Main">
          {links}
        </nav>
        {!open && (
          <button
            type="button"
            className="hamburger"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="side-menu"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        )}
      </header>
      <div className={`menu-overlay${open ? ' active' : ''}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <nav id="side-menu" className={`side-menu${open ? ' active' : ''}`} aria-label="Mobile" inert={!open}>
        <button type="button" className="close-btn" aria-label="Close menu" onClick={() => setOpen(false)}>
          ✕
        </button>
        {links}
      </nav>
    </>
  )
}
