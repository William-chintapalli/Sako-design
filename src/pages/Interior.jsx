import Navbar from '../components/Navbar/Navbar'
import ProjectGallery from '../components/ProjectGallery/ProjectGallery'
import { INTERIOR_PROJECTS } from '../data/projects'

export default function Interior() {
  return (
    <>
      <Navbar fixed />
      <ProjectGallery projects={INTERIOR_PROJECTS} />
    </>
  )
}
