import { img } from '../assets/img'
/* ================= PROJECT DATA =================
   Every card on Home / Architecture / Interior comes from this file.
   Optional per project:
     info:    [["Label", "value"], ...]   (defaults to DEFAULT_INFO)
     about:   "paragraph"                  (defaults to DEFAULT_ABOUT)
     gallery: items can be "img.jpg" or ["img.jpg", "caption shown under the photo"] */

export const DEFAULT_INFO = [
  ['Project Name', 'SaKo studio'],
  ['Studio Name', 'Sako design narratives'],
  ['Location', 'Hyderabad Completed in – Feb, 2023'],
  ['Project Size', '250 sq ft'],
  ['Principal Architects', 'Sangeetha Polisetti, Kondal Siddhuri'],
  ['Photograph Courtesy', 'Akshay Adimula'],
]

export const DEFAULT_ABOUT =
  'Nestled within a dense urban neighborhood in the heart of Hyderabad, sako Studio is a compact 250 sq ft workspace designed for efficiency and style.'

const OFFICE = [img('photos/sako-office/o1.jpg'), img('photos/sako-office/o2.jpeg'), img('photos/sako-office/o3.jpeg'), img('photos/sako-office/o4.jpeg')]

const SAKO_OFFICE = {
  slug: 'sako-office',
  name: 'Sako Office, Hyderabad',
  thumb: img('drawings/1.png'), // the clean line drawing used under "Similar Projects"
  sketch: img('drawings/sketch door.jpeg'),
  color: img('drawings/color door.jpeg'),
  gallery: OFFICE,
}

const PANJARLA = {
  slug: 'farmhouse-panjarla',
  name: 'Farmhouse Panjarla, India',
  sketch: img('drawings/sketch house.jpeg'),
  color: img('drawings/color house.jpeg'),
  gallery: [1, 2, 3, 4].map((n) => img(`photos/farmhouse-panjarla/${n}.jpeg`)),
}

const VILLA_MAHESHWARAM = {
  slug: 'villa-maheshwaram',
  name: 'Villa Maheshwaram, India',
  sketch: img('drawings/3.1.png'),
  color: img('drawings/3 (1).png'),
  gallery: OFFICE,
}

const LAKEVIEW = {
  slug: 'lakeview-farmhouse',
  name: 'Lakeview Farmhouse, India',
  sketch: img('drawings/4.1.png'),
  color: img('drawings/4 (1).png'),
  gallery: OFFICE,
}

const NCC_YARD = {
  slug: 'ncc-yard',
  name: 'NCC Yard, India',
  sketch: img('drawings/5.1.png'),
  color: img('drawings/5 (1).png'),
  gallery: ['AAA09578-HDR-1', 'AAA09648-HDR-20', 'AAA09651-HDR-21', 'AAA09717-HDR-35-5'].map(
    (f) => img(`photos/ncc-yard/${f}.jpg`),
  ),
}

const SANJAY = {
  slug: 'sanjay-residency',
  name: 'Sanjay Residency, Hyderabad',
  sketch: img('drawings/sanjay sketch image 2.jpeg'),
  color: img('drawings/sanjay color 1.png'),
  gallery: ['AAA01429-HDR-34', 'AAA01411-HDR-31', 'AAA01480-HDR-45', 'AAA01513-HDR-51'].map(
    (f) => img(`photos/sanjay-residency/${f}.jpg`),
  ),
}

const DIPTHI = {
  slug: 'dipthi-residency',
  name: 'Dipthi Residency, Hyderabad',
  sketch: img('drawings/sketch house copy.jpeg'),
  color: img('drawings/color house copy.jpeg'),
  gallery: ['AAA00200-HDR-26', 'AAA00260-HDR-37', 'AAA00380-HDR-61', 'AAA00383-HDR-62'].map(
    (f) => img(`photos/dipthi-residency/${f}.jpg`),
  ),
}

/* Home: auto-scrolling, looping strip — the 10 cards of the reference video, in its order and with its labels
   (the 5th card is the NCC drawing captioned "Farmhouse Panjarla"; the 8th is the Villa drawing captioned "New Project") */
export const HOME_PROJECTS = [
  SAKO_OFFICE,
  PANJARLA,
  VILLA_MAHESHWARAM,
  LAKEVIEW,
  { ...NCC_YARD, name: 'Farmhouse Panjarla, India' },
  SANJAY,
  DIPTHI,
  { ...VILLA_MAHESHWARAM, name: 'New Project, India' },
  { ...LAKEVIEW },
  { ...PANJARLA, gallery: OFFICE },
]
/* on Home every opened project lists the same three */
export const HOME_SIMILAR = [SAKO_OFFICE, VILLA_MAHESHWARAM, LAKEVIEW]

/* Architecture & Interior: fixed row of 5 */
export const ARCHITECTURE_PROJECTS = [SAKO_OFFICE, PANJARLA, VILLA_MAHESHWARAM, LAKEVIEW, NCC_YARD]
export const INTERIOR_PROJECTS = [SAKO_OFFICE, PANJARLA, VILLA_MAHESHWARAM, LAKEVIEW, NCC_YARD]

/* Projects page + /projects/:slug: every project once */
export const ALL_PROJECTS = [SAKO_OFFICE, PANJARLA, VILLA_MAHESHWARAM, LAKEVIEW, NCC_YARD, SANJAY, DIPTHI]

export const getProject = (slug) => ALL_PROJECTS.find((p) => p.slug === slug)

/* gallery items are "src" or ["src", "caption"] */
export const galleryItems = (project) => project.gallery.map((g) => (Array.isArray(g) ? g : [g, '']))

/* "Sako Office, Hyderabad" -> ["Sako Office", "Hyderabad"] */
export const splitName = (name) => {
  const i = name.lastIndexOf(',')
  return i < 0 ? [name, ''] : [name.slice(0, i).trim(), name.slice(i + 1).trim()]
}
