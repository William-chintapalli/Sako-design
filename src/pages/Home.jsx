import Navbar from '../components/Navbar/Navbar'
import ProjectGallery from '../components/ProjectGallery/ProjectGallery'
import { HOME_PROJECTS, HOME_SIMILAR } from '../data/projects'

export default function Home() {
  return (
    <>
      <Navbar fixed />
      <ProjectGallery projects={HOME_PROJECTS} similar={HOME_SIMILAR} loop autoplay variant="home" />
    </>
  )
}
