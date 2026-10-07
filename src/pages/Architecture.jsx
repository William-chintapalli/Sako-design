import Navbar from '../components/Navbar/Navbar'
import ProjectGallery from '../components/ProjectGallery/ProjectGallery'
import { ARCHITECTURE_PROJECTS } from '../data/projects'

export default function Architecture() {
  return (
    <>
      <Navbar fixed />
      <ProjectGallery projects={ARCHITECTURE_PROJECTS} />
    </>
  )
}
