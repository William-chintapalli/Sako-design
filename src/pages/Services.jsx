import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import SocialFooter from '../components/Footer/SocialFooter'
import useReveal from '../hooks/useReveal'
import './Services.css'

/* the disciplines the studio lists on its About page; `to` links the ones that have their own page */
const DISCIPLINES = [
  { name: 'Architecture', to: '/architecture' },
  { name: 'Interior design', to: '/interior' },
  { name: 'Furniture design' },
  { name: 'Product design' },
  { name: 'Set design' },
  { name: 'Research', to: '/research' },
  { name: 'Academia' },
]

const REVEAL = { threshold: 0.2 }

function Discipline({ item, index }) {
  const [ref, revealClass] = useReveal(REVEAL)
  const body = (
    <>
      <span className="svc-num">{String(index + 1).padStart(2, '0')}</span>
      <span className="svc-name">{item.name}</span>
      {item.to && <span className="svc-arrow" aria-hidden="true">→</span>}
    </>
  )
  return (
    <li ref={ref} className={`svc-row ${revealClass}`} style={{ '--delay': `${index * 0.06}s` }}>
      {item.to ? (
        <Link to={item.to} className="svc-link">
          {body}
        </Link>
      ) : (
        <div className="svc-link">{body}</div>
      )}
    </li>
  )
}

export default function Services() {
  return (
    <>
      <Navbar />
      <div className="grid-backdrop" aria-hidden="true" />
      <main className="services-page">
        <h1 className="page-heading">Services</h1>
        <p className="page-intro">
          sako design narrative is a multidisciplinary design studio based out of Hyderabad, Telangana focusing on the
          concept that “design can be narrated in various forms”. We explore all forms of design and our aim is to blend
          various design disciplines and narrate your design story in our own style.
        </p>

        <ol className="svc-list">
          {DISCIPLINES.map((d, i) => (
            <Discipline key={d.name} item={d} index={i} />
          ))}
        </ol>

        <section className="svc-motto">
          <p className="svc-quote">“Stay Beginner”</p>
          <p>
            For us, every design is as special as the first and our effort is as new as the beginning! With every project,
            we are here to figure out our niche while sticking closely to our philosophy of narrating the design.
          </p>
        </section>

        <section className="svc-cta">
          <p>
            We are always on the lookout for like minded people to collaborate with on something exciting.
          </p>
          <Link to="/contact" className="svc-button">
            Reach out to us
          </Link>
        </section>
      </main>
      <SocialFooter />
    </>
  )
}
