import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PageTransition from './components/PageTransition/PageTransition'
import Home from './pages/Home'
import Architecture from './pages/Architecture'
import Interior from './pages/Interior'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Services from './pages/Services'
import Research from './pages/Research'
import Publication from './pages/Publication'
import About from './pages/About'
import Contact from './pages/Contact'

const SITE = 'SAKO Webdesigns'

/* [path, page, tab title]; a null title lets the page set its own */
const PAGES = [
  ['/', Home, SITE],
  ['/architecture', Architecture, `Architecture | ${SITE}`],
  ['/interior', Interior, `Interior | ${SITE}`],
  ['/projects', Projects, `Projects | ${SITE}`],
  ['/projects/:slug', ProjectDetail, null],
  ['/services', Services, `Services | ${SITE}`],
  ['/research', Research, `Research | ${SITE}`],
  ['/publication', Publication, `Publications | ${SITE}`],
  ['/about', About, `About | ${SITE}`],
  ['/contact', Contact, `Contact | ${SITE}`],
]

/* the old static site's file names */
const OLD_PAGES = ['index', 'architecture', 'interior', 'research', 'about', 'publication', 'contact']

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {PAGES.map(([path, Page, title]) => (
          <Route
            key={path}
            path={path}
            element={
              <PageTransition title={title}>
                <Page />
              </PageTransition>
            }
          />
        ))}
        {OLD_PAGES.map((name) => (
          <Route key={name} path={`/${name}.html`} element={<Navigate to={name === 'index' ? '/' : `/${name}`} replace />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
