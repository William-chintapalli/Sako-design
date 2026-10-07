import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { galleryItems } from '../../data/projects'
import useIsDesktop from '../../hooks/useIsDesktop'
import SocialFooter from '../Footer/SocialFooter'
import ProjectInfo from '../ProjectInfo/ProjectInfo'
import './ProjectGallery.css'

const SLIDE_MS = 500
const AUTOPLAY_MS = 2500
const MOBILE_SLIDE_MS = 3000

/* ================= ONE CARD IN THE ROW ================= */
function GalleryCard({ project, index, projects, similarTo, mode, onOpen, onClose, onHover }) {
  const sliderRef = useRef(null)
  const leftRefs = useRef([]) // circle, title, details: the fixed left column
  const similarRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [push, setPush] = useState(0)
  const [slide, setSlide] = useState(0)
  const [restart, setRestart] = useState(0)
  const gallery = galleryItems(project)

  // opening or closing starts the gallery fresh (the slider itself remounts at scrollTop 0)
  const [lastMode, setLastMode] = useState(mode)
  if (mode !== lastMode) {
    setLastMode(mode)
    setScrolled(false)
    setSlide(0)
    setPush(0)
  }

  // mobile: one image at a time, auto-advancing
  useEffect(() => {
    if (mode !== 'active') return
    const t = setInterval(() => setSlide((n) => (n + 1) % gallery.length), MOBILE_SLIDE_MS)
    return () => clearInterval(t)
  }, [mode, gallery.length, restart])

  const step = (d) => (e) => {
    e.stopPropagation()
    setSlide((n) => (n + d + gallery.length) % gallery.length)
    setRestart((r) => r + 1)
  }

  const handleClick = (e) => {
    if (e.target.closest('.similar-card, .slide-btn, a')) return
    if (mode === 'desktop-active') {
      if (e.target.closest('.img-box')) onClose()
      return
    }
    if (mode === 'active') {
      if (!e.target.closest('.project-slider')) onClose()
      return
    }
    onOpen(index)
  }

  // keyboard: Enter/Space on the drawing opens the project, and on the opened circle closes it
  const handleKey = (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return
    e.preventDefault()
    if (mode === 'idle') onOpen(index)
    else onClose()
  }

  // wheel over the left column also scrolls the gallery
  const handleWheel = (e) => {
    const s = sliderRef.current
    if (mode !== 'desktop-active' || !s || s.contains(e.target)) return
    s.scrollTop += e.deltaY
  }

  // as "Similar Projects" scrolls up, lift the left column so the two never overlap
  const handleScroll = (e) => {
    setScrolled(e.currentTarget.scrollTop > 2)
    if (mode !== 'desktop-active' || !similarRef.current) return
    const leftBottom = Math.max(...leftRefs.current.filter(Boolean).map((el) => el.getBoundingClientRect().bottom)) + push
    const next = Math.max(0, leftBottom - (similarRef.current.getBoundingClientRect().top - 20))
    if (Math.abs(next - push) > 0.5) setPush(next)
  }
  const lift = push ? { translate: `0 ${-push}px` } : undefined

  // a fixed list (Home) opens each entry's first card; otherwise every other project in the row
  const seen = new Set([project.name])
  const similar = similarTo
    ? similarTo.map((q) => [q, projects.indexOf(q)])
    : projects.map((q, j) => [q, j]).filter(([q]) => !seen.has(q.name) && seen.add(q.name))

  const classes = ['project-item', mode === 'idle' ? '' : mode, scrolled ? 'scrolled' : ''].filter(Boolean).join(' ')

  return (
    <div className={classes} onClick={handleClick} onWheel={handleWheel}>
      <div
        className="img-box"
        ref={(el) => (leftRefs.current[0] = el)}
        style={lift}
        role="button"
        tabIndex={0}
        aria-label={mode === 'idle' ? `Open ${project.name}` : `Close ${project.name}`}
        aria-expanded={mode !== 'idle'}
        onKeyDown={handleKey}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <img src={project.sketch} className="sketch-img" alt="" />
        <img src={project.color} className="color-img" alt="" />
        <div className="grid-line" />
      </div>
      <div className="project-title" ref={(el) => (leftRefs.current[1] = el)} style={lift}>
        {project.name}
      </div>

      <div className="project-details" ref={(el) => (leftRefs.current[2] = el)} style={lift}>
        <ProjectInfo project={project} />
      </div>

      {mode !== 'idle' && (
        <div
          className="project-slider"
          ref={sliderRef}
          onScroll={handleScroll}
        >
          <button type="button" className="slide-btn prev-btn" aria-label="Previous photo" onClick={step(-1)}>
            &#10094;
          </button>
          {gallery.map(([src, caption], j) => (
            <Fragment key={src + j}>
              <img src={src} className={`slider-image${j === slide ? ' on' : ''}`} alt={project.name} loading="lazy" />
              {caption && <p className="gallery-caption">{caption}</p>}
            </Fragment>
          ))}
          <button type="button" className="slide-btn next-btn" aria-label="Next photo" onClick={step(1)}>
            &#10095;
          </button>

          <section className="similar-projects" ref={similarRef}>
            <h2>Similar Projects</h2>
            <div className="similar-grid">
              {similar.map(([q, j]) => (
                <button
                  type="button"
                  key={q.name}
                  className="similar-card"
                  onClick={(e) => {
                    e.stopPropagation()
                    onOpen(j)
                  }}
                >
                  <img src={q.thumb || q.sketch} alt={q.name} />
                  <span>{q.name}</span>
                </button>
              ))}
            </div>
          </section>
          <SocialFooter slim className="project-socials" />
        </div>
      )}
    </div>
  )
}

/* ================= THE ROW OF CARDS ================= */
export default function ProjectGallery({ projects, similar, loop = false, autoplay = false, variant = '' }) {
  const desk = useIsDesktop()
  const [order, setOrder] = useState(() => projects.map((_, i) => i))
  const [cur, setCur] = useState(-1)
  const [hovering, setHovering] = useState(false)
  const rowRef = useRef(null)
  const shift = useRef(null) // scrollLeft correction applied right after a re-order
  const busy = useRef(false)
  const raf = useRef(0)
  const open = cur > -1
  const pos = order.indexOf(cur)

  /* body classes drive the page-level CSS (no page scroll, grid-line overlay) */
  useEffect(() => {
    document.body.classList.add('gallery-page')
    return () => {
      document.body.classList.remove('gallery-page', 'project-open')
      cancelAnimationFrame(raf.current)
    }
  }, [])
  useEffect(() => {
    document.body.classList.toggle('project-open', open && desk)
  }, [open, desk])

  /* switching between mobile and desktop layouts closes the open project */
  const lastDesk = useRef(desk)
  useEffect(() => {
    if (lastDesk.current !== desk) {
      lastDesk.current = desk
      setCur(-1)
    }
  }, [desk])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setCur(-1)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* move the first card to the end (or last to the front) without a visible jump */
  useLayoutEffect(() => {
    const s = shift.current
    if (!s) return
    shift.current = null
    rowRef.current.scrollLeft += s.by
    s.then?.()
  }, [order])

  const stepSize = () => {
    const row = rowRef.current
    const card = row?.querySelector('.project-item')
    if (!card) return 0
    return card.offsetWidth + (parseFloat(getComputedStyle(row).columnGap) || 0)
  }

  const animateScroll = (row, delta, done) => {
    const start = row.scrollLeft
    const t0 = performance.now()
    cancelAnimationFrame(raf.current)
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / SLIDE_MS)
      row.scrollLeft = start + delta * (1 - Math.pow(1 - p, 3))
      if (p < 1) raf.current = requestAnimationFrame(tick)
      else done()
    }
    raf.current = requestAnimationFrame(tick)
  }

  const slideRow = useCallback(
    (d) => {
      const row = rowRef.current
      const step = stepSize()
      if (!row || !step || busy.current) return
      busy.current = true
      const release = () => (busy.current = false)

      if (!loop) return animateScroll(row, d * step, release)

      if (d > 0) {
        animateScroll(row, step, () => {
          shift.current = { by: -step, then: release }
          setOrder((o) => [...o.slice(1), o[0]])
        })
      } else {
        shift.current = { by: step, then: () => animateScroll(row, -step, release) }
        setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)])
      }
    },
    [loop],
  )

  /* mobile: native swipe row, arrows page one card at a time */
  const slideMobile = (d) => {
    const row = rowRef.current
    const max = row.scrollWidth - row.clientWidth
    let target = row.scrollLeft + d * row.clientWidth
    if (loop && target > max + 5) target = 0
    if (loop && target < -5) target = max
    row.scrollTo({ left: target, behavior: 'smooth' })
  }

  /* home: auto-advance every 2.5s, paused while hovering a drawing or reading a project */
  useEffect(() => {
    if (!autoplay || !desk || open || hovering) return
    const t = setInterval(() => slideRow(1), AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [autoplay, desk, open, hovering, slideRow])

  const goProject = (d) => {
    const p = pos + d
    if (loop) setCur(order[(p + order.length) % order.length])
    else if (p >= 0 && p < order.length) setCur(order[p])
  }

  const onArrow = (d) => {
    if (open && desk) return goProject(d)
    if (!desk) return slideMobile(d)
    slideRow(d)
  }

  const showLeft = !desk || loop || (open && pos > 0)
  const showRight = !desk || loop || (open && pos < order.length - 1)

  return (
    <>
      {showLeft && (
        <button type="button" className="pg-arrow left" aria-label="Previous" onClick={() => onArrow(-1)}>
          &#10094;
        </button>
      )}
      {showRight && (
        <button type="button" className="pg-arrow right" aria-label="Next" onClick={() => onArrow(1)}>
          &#10095;
        </button>
      )}
      {/* the video shows this close button on Architecture but not on Home (there the circle or Esc closes) */}
      {variant !== 'home' && (
        <button type="button" className="close-project" aria-label="Close project" onClick={() => setCur(-1)}>
          ✕
        </button>
      )}

      <section className={`projects ${variant}`.trim()} ref={rowRef}>
        {order.map((i) => (
          <GalleryCard
            key={i}
            index={i}
            project={projects[i]}
            projects={projects}
            similarTo={similar}
            mode={cur !== i ? 'idle' : desk ? 'desktop-active' : 'active'}
            onOpen={setCur}
            onClose={() => setCur(-1)}
            onHover={setHovering}
          />
        ))}
      </section>

      <SocialFooter slim className="pg-mobile-footer" />
    </>
  )
}
