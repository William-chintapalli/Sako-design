/* every image under src/assets/images, as hashed URLs. img('drawings/3.1.png') -> '/assets/3.1-abc123.png' */
const FILES = import.meta.glob('./images/**/*.{png,jpg,jpeg,gif,svg,webp}', { eager: true, query: '?url', import: 'default' })

export function img(path) {
  const url = FILES[`./images/${path}`]
  if (!url) throw new Error(`Image not found in src/assets/images: ${path}`)
  return url
}
