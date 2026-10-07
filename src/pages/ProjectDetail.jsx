import { Fragment, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import ProjectInfo from '../components/ProjectInfo/ProjectInfo'
import SocialFooter from '../components/Footer/SocialFooter'
import { ALL_PROJECTS, galleryItems, getProject } from '../data/projects'
import './ProjectDetail.css'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)

  useEffect(() => {
    if (project) document.title = `${project.name} | SAKO Webdesigns`
  }, [project])

  if (!project) return <Navigate to="/projects" replace />

  const i = ALL_PROJECTS.indexOf(project)
  const prev = ALL_PROJECTS[(i - 1 + ALL_PROJECTS.length) % ALL_PROJECTS.length]
  const next = ALL_PROJECTS[(i + 1) % ALL_PROJECTS.length]
  const similar = ALL_PROJECTS.filter((p) => p !== project)

  return (
    <>
      <Navbar />
      <div className="grid-backdrop" aria-hidden="true" />
      <main className="project-page" key={slug}>
        <aside className="pp-side">
          <img src={project.color} className="pp-circle" alt="" />
          <h1 className="pp-title">{project.name}</h1>
          <ProjectInfo project={project} />
          <nav className="pp-pager" aria-label="Other projects">
            <Link to={`/projects/${prev.slug}`}>← {prev.name}</Link>
            <Link to={`/projects/${next.slug}`}>{next.name} →</Link>
          </nav>
        </aside>

        <section className="pp-gallery" aria-label={`${project.name} photographs`}>
          {galleryItems(project).map(([src, caption], j) => (
            <Fragment key={src + j}>
              <img src={src} alt={`${project.name}, photo ${j + 1}`} loading={j ? 'lazy' : 'eager'} />
              {caption && <p className="pp-caption">{caption}</p>}
            </Fragment>
          ))}
        </section>
      </main>

      <section className="pp-similar">
        <h2>Similar Projects</h2>
        <div className="pp-similar-grid">
          {similar.map((q) => (
            <Link key={q.slug} to={`/projects/${q.slug}`} className="pp-similar-card">
              <img src={q.sketch} alt="" loading="lazy" />
              <span>{q.name}</span>
            </Link>
          ))}
        </div>
      </section>
      <SocialFooter slim />
    </>
  )
}
