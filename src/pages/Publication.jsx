import { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import './Publication.css'
import { img } from '../assets/img'

/* sketch (optional) shows first, as in the video; the publication image fades in on hover or when selected with the arrows */
const PUBLICATIONS = [
  {
    name: 'ArchitectureLive — Lights, Camera, Architecture',
    href: 'https://architecture.live/lights-camera-architecture-exploring-cinematic-spaces-sangeetha-polisetti/',
    sketch: img('pages/publication/pp1.sketch.png'),
    image: img('pages/publication/pp1.png'),
  },
  {
    name: 'Rethinking The Future — Sako Studio',
    href: 'https://www.re-thinkingthefuture.com/corporate-interior-design/10509-sako-studio-by-sako-design-narratives/',
    image: img('pages/publication/pp2.png'),
  },
  {
    name: 'Architect and Interiors India',
    href: 'https://www.architectandinteriorsindia.com/projects/watch-as-the-love-for-nature-takes-over-this-250-sq-ft-architects-office-in-hyderabad',
    image: img('pages/publication/pp3.png'),
  },
  {
    name: 'Pazardzhik Central Market — International Competition',
    href: 'https://competition.bg/pazardzhikmarket/en/projects/sako-design-narratives/',
    image: img('pages/publication/pp4.png'),
  },
]

export default function Publication() {
  const [active, setActive] = useState(-1) // -1: nothing selected, every sketch showing
  const move = (d) => setActive((a) => (a < 0 ? (d > 0 ? 0 : PUBLICATIONS.length - 1) : (a + d + PUBLICATIONS.length) % PUBLICATIONS.length))

  return (
    <div className="publication-page">
      <Navbar variant="publication" />
      <section className="publication-gallery">
        <div className="pub-grid-lines">
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} />
          ))}
        </div>

        <button type="button" className="pub-arrow prev" aria-label="Previous publication" onClick={() => move(-1)}>
          &#10094;
        </button>

        <div className="pub-track">
          {PUBLICATIONS.map((p, i) => (
            <a
              key={p.href}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              title={p.name}
              className={`pub-item${i === active ? ' active' : ''}${p.sketch ? ' has-sketch' : ''}`}
              style={{ '--i': i + 1 }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(-1)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(-1)}
            >
              {p.sketch && <img src={p.sketch} className="pub-sketch" alt="" />}
              <img src={p.image} className="pub-circle" alt={p.name} />
            </a>
          ))}
        </div>

        <button type="button" className="pub-arrow next" aria-label="Next publication" onClick={() => move(1)}>
          &#10095;
        </button>
      </section>
    </div>
  )
}
