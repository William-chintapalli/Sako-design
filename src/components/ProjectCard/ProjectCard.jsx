import { Link } from 'react-router-dom'
import { splitName } from '../../data/projects'
import useReveal from '../../hooks/useReveal'
import './ProjectCard.css'

const REVEAL = { threshold: 0.15 }

/* sketch that turns into the coloured circle on hover, like the home row; links to the project page */
export default function ProjectCard({ project, delay = 0 }) {
  const [ref, revealClass] = useReveal(REVEAL)
  const [title, location] = splitName(project.name)
  return (
    <Link ref={ref} to={`/projects/${project.slug}`} className={`project-card ${revealClass}`} style={{ '--delay': `${delay}s` }}>
      <div className="project-card-media">
        <img src={project.sketch} className="pc-sketch" alt="" loading="lazy" />
        <img src={project.color} className="pc-color" alt="" loading="lazy" />
      </div>
      <h2 className="project-card-title">{title}</h2>
      {location && <p className="project-card-location">{location}</p>}
    </Link>
  )
}
