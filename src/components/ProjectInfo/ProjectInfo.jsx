import { DEFAULT_ABOUT, DEFAULT_INFO } from '../../data/projects'

/* "Project Name – …" list + about paragraph, used in the opened gallery view and on project pages */
export default function ProjectInfo({ project }) {
  return (
    <div className="project-info">
      {(project.info || DEFAULT_INFO).map(([k, v]) => (
        <p key={k}>
          <b>{k} –</b> {v}
        </p>
      ))}
      <p className="about">{project.about || DEFAULT_ABOUT}</p>
    </div>
  )
}
