import './SocialFooter.css'

const SOCIAL_LINKS = [
  ['https://www.facebook.com/share/1EnP9qGgGX/', 'fab fa-facebook-f', 'Facebook'],
  ['mailto:sakodesignnarratives@gmail.com', 'fas fa-envelope', 'Email'],
  ['https://www.instagram.com/sako_design_narratives?igsh=NGwyb2pwZmpiZWpr', 'fab fa-instagram', 'Instagram'],
  ['https://www.linkedin.com/company/sako-design-narratives/', 'fas fa-briefcase', 'LinkedIn'],
]

export default function SocialFooter({ slim = false, className = '' }) {
  return (
    <div className={`social-footer${slim ? ' slim' : ''} ${className}`}>
      {SOCIAL_LINKS.map(([href, icon, label]) => (
        <a key={label} href={href} aria-label={label} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
          <i className={icon} />
        </a>
      ))}
    </div>
  )
}
