import Navbar from '../components/Navbar/Navbar'
import SocialFooter from '../components/Footer/SocialFooter'
import './About.css'
import { img } from '../assets/img'

const PARAGRAPHS = [
  'sako design narrative is a multidisciplinary design studio based out of Hyderabad, Telangana focusing on the concept that “design can be narrated in various forms”. We narrate a story using various forms and scales; from furniture design, product design, architecture, academia, research, interior design to set design, we have it all!',
  'We explore all forms of design and our aim is to blend various design disciplines and narrate your design story in our own style. We believe design is a way of life and draw inspiration from movies, books, art, architecture, mythology and research. Our goal is to set up a design warehouse where we explore such stories and constantly strive to keep up with the research that makes our designs functional.',
  'Our motto is “Stay Beginner” and constantly “Unlearn what we’ve already learnt”. For us, every design is as special as the first and our effort is as new as the beginning! With every project, we are here to figure out our niche while sticking closely to our philosophy of narrating the design.',
  'We are always on the lookout for like minded people to collaborate with on something exciting. We strongly believe in teamwork and this helps us to keep evolving (which we love!) and begin new journeys.',
]

export default function About() {
  return (
    <>
      <Navbar />
      <section className="about-page">
        <div className="about-hero">
          <img src={img('pages/about/WhatsApp Image 2026-05-18 at 13.26.25.jpeg')} alt="Sako design narratives studio" />
        </div>
        <div className="about-content">
          {PARAGRAPHS.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
      </section>
      <SocialFooter />
    </>
  )
}
