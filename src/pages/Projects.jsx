import Navbar from '../components/Navbar/Navbar'
import ProjectCard from '../components/ProjectCard/ProjectCard'
import SocialFooter from '../components/Footer/SocialFooter'
import { ALL_PROJECTS } from '../data/projects'
import './Projects.css'

export default function Projects() {
  return (
    <>
      <Navbar />
      <div className="grid-backdrop" aria-hidden="true" />
      <main className="projects-page">
        <h1 className="page-heading">Projects</h1>
        <section className="projects-grid" aria-label="All projects">
          {ALL_PROJECTS.map((p, i) => (
            <ProjectCard key={p.slug} project={p} delay={(i % 3) * 0.12} />
          ))}
        </section>
      </main>
      <SocialFooter />
    </>
  )
}
