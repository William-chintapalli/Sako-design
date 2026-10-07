import Navbar from '../components/Navbar/Navbar'
import './Contact.css'
import { img } from '../assets/img'

const PHONES = ['+91 9542522110', '+91 8977741164']
const EMAIL = 'sakodesignnarratives@gmail.com'

const SOCIALS = [
  ['https://www.facebook.com/share/1EnP9qGgGX/', 'fab fa-facebook-square', 'Facebook'],
  ['https://youtube.com/@sakodesignnarratives?si=JUKuq-fubCST7gx_', 'fab fa-youtube', 'YouTube'],
  ['https://www.instagram.com/sako_design_narratives?igsh=NGwyb2pwZmpiZWpr', 'fab fa-instagram', 'Instagram'],
  ['https://www.linkedin.com/company/sako-design-narratives/', 'fab fa-linkedin', 'LinkedIn'],
]

/* map: the static map image. The second location's map image never existed in the original
   (a broken link in the video), so that location shows its details only, with the address linking to Google Maps. */
const LOCATIONS = [
  {
    address: 'Plot no 18 Mani Bhushan, Arunodaya colony, Madhapur',
    mapLink: 'https://maps.app.goo.gl/txCzLMxhnReJTsRs9',
    map: img('pages/contact/SaKo_Location_page-0001.jpg'),
  },
  {
    address: 'Asian Suncity, B Block, 7th Floor, 707, Kondapur, Hyderabad',
    mapLink: 'https://maps.app.goo.gl/XWWer5chWuWPUnTG7',
  },
]

export default function Contact() {
  return (
    <>
      <Navbar variant="contact" />
      <section className="contact-page">
        <div className="contact-grid-lines">
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} />
          ))}
        </div>

        {LOCATIONS.map((loc, i) => (
          <div className="contact-location" key={loc.address}>
            <div className="contact-info">
              {i === 0 && <h2>Reach out to us</h2>}
              <p>
                {loc.map ? (
                  loc.address
                ) : (
                  <a href={loc.mapLink} target="_blank" rel="noopener noreferrer">
                    {loc.address}
                  </a>
                )}
              </p>
              {PHONES.map((ph) => (
                <p key={ph}>
                  <a href={`tel:${ph.replace(/\s/g, '')}`}>{ph}</a>
                </p>
              ))}
              <p>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </p>
              <strong>Connect</strong>
              <div className="social-links">
                {SOCIALS.map(([href, icon, label]) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <i className={icon} />
                  </a>
                ))}
              </div>
            </div>

            {loc.map && (
              <div className="contact-map">
                <a href={loc.mapLink} target="_blank" rel="noopener noreferrer">
                  <img src={loc.map} alt={`Map to ${loc.address}`} />
                </a>
              </div>
            )}
          </div>
        ))}
      </section>
    </>
  )
}
