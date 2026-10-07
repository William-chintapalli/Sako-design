import Navbar from '../components/Navbar/Navbar'
import './Research.css'
import { img } from '../assets/img'

const WP = 'https://lightscameraarchitecture.wordpress.com'
const FILMS = 'Architecture in Films'

/* image: null shows a plain grey circle until a picture is added */
const ARTICLES = [
  { title: 'Facades of Kahaani', tag: FILMS, href: `${WP}/2017/07/10/facades-of-kahaani/`, image: img('pages/research/card 1.jpeg'), text: "Discover how Kolkata's streets become a character in the film." },
  { title: 'Ram-Leela', tag: FILMS, href: `${WP}/2017/06/24/ramleela/`, image: null, text: 'Understanding space, colour and emotion through architecture.' },
  { title: 'Geetanjali', tag: 'Landscape', href: `${WP}/2017/06/07/143/`, image: null, text: 'Landscape as an emotional storytelling element.' },
  { title: 'Sakhi', tag: FILMS, href: `${WP}/2017/04/18/sakhi/`, image: `${WP}/wp-content/uploads/2017/04/sakhi_poster.jpg?w=1400`, text: 'Railway stations as a moving stage for a quietly unfolding romance.' },
  { title: 'Guzarish', tag: FILMS, href: `${WP}/2017/05/28/guzarish/`, image: `${WP}/wp-content/uploads/2017/05/cp2.jpg?w=1400`, text: 'A single bedroom tells an entire story of confinement and memory.' },
  { title: 'MayaBazaar', tag: FILMS, href: `${WP}/2017/05/06/mayabazaar/`, image: `${WP}/wp-content/uploads/2017/05/mayabazaar.jpg`, text: "Palace backdrops and garden scenes that carry a classic's emotion." },
  { title: 'Baahubali', tag: FILMS, href: `${WP}/2017/05/06/baahubali/`, image: `${WP}/wp-content/uploads/2017/05/baahubali-final.gif`, text: "Staging and scale that shift a kingdom's balance of power." },
  { title: 'Bajirao Mastani', tag: FILMS, href: `${WP}/2017/04/15/bajirao-mastani/`, image: 'https://i0.wp.com/lightscameraarchitecture.wordpress.com/wp-content/uploads/2017/04/mastani-2.jpg?fit=1200%2C664&ssl=1', text: 'An octagonal mahal and its arches built for grandeur on screen.' },
  { title: 'Drushyam', tag: FILMS, href: `${WP}/2017/04/15/drushyam/`, image: `${WP}/wp-content/uploads/2017/04/drushyam.jpg?w=1400`, text: 'A zig-zag corridor that turns ordinary space into pure tension.' },
  { title: 'Magadheera', tag: FILMS, href: `${WP}/2017/04/15/magadheera/`, image: 'https://i0.wp.com/lightscameraarchitecture.wordpress.com/wp-content/uploads/2017/03/magadheera.gif?fit=1200%2C664&ssl=1', text: 'A narrow passage opening into vastness, framing a 400-year flashback.' },
  { title: 'Arundathi', tag: FILMS, href: `${WP}/2017/04/07/arundathi/`, image: `${WP}/wp-content/uploads/2017/04/arundathi.gif`, text: 'Circular drums and sheer light drama into a pivotal death scene.' },
  { title: 'Inceptive Studies', tag: FILMS, href: `${WP}/2017/03/18/introduction/`, image: `${WP}/wp-content/uploads/2017/03/logo-no-text.jpg?w=1400`, text: 'Where the Facades of Films project began — first drawings, first exercises.' },
]

export default function Research() {
  return (
    <div className="research-page">
      <Navbar variant="research" />
      <a className="research-banner" href={`${WP}/`} target="_blank" rel="noopener noreferrer">
        <img src={img('pages/research/research logo (2).jpeg')} alt="LightsCamera-Architecture! Analysing Architecture in Films" />
      </a>

      <section className="research-grid">
        {ARTICLES.map((a) => (
          <a key={a.title} className="research-card" href={a.href} target="_blank" rel="noopener noreferrer">
            {a.image && <img src={a.image} alt={a.title} loading="lazy" />}
            <div className="card-content">
              <span>{a.tag}</span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
              <span className="read-more">Read More →</span>
            </div>
          </a>
        ))}
      </section>
    </div>
  )
}
