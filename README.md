# Sako Design Narratives — React site

React (Vite + React Router) version of the static site in `../Sako-Design-Narratives-main`.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build
```

## Routes

| Route | Page |
|---|---|
| `/` | Home — auto-scrolling, looping row of project drawings |
| `/architecture`, `/interior` | Row of 5 projects; click opens the project view |
| `/projects` | Grid of every project |
| `/projects/:slug` | One project: details, photographs, similar projects |
| `/services` | Disciplines (from the About text) |
| `/research` | LightsCamera-Architecture film articles |
| `/publication` | Publications |
| `/about`, `/contact` | Studio text; addresses and maps |

Old links such as `/about.html` redirect to the new routes.

## Structure

```
src/
  App.jsx                 routes
  main.jsx
  data/projects.js        every project (names, drawings, photos, details)
  hooks/
    useIsDesktop.js       desktop/mobile switch (matches the 890px CSS breakpoint)
    useReveal.js          fade-up when an element scrolls into view
  components/
    Navbar/               logo, links, mobile side menu
    Footer/               black social footer
    PageTransition/       per-route fade, tab title, scroll to top
    ProjectGallery/       the Home/Architecture/Interior row and opened-project view
    ProjectCard/          card on the Projects page
    ProjectInfo/          "Project Name – …" details list
  pages/                  one file (+ css) per route
  styles/globals.css      reset, site grid variables, shared keyframes
  assets/img.js           img('drawings/3.1.png') -> hashed URL (throws if the file is missing)
  assets/images/          brand/  drawings/  photos/<project>/  pages/<page>/
public/favicon.png
```

To add a project: put its sketch and colour circle in `src/assets/images/drawings/`, its photos in `src/assets/images/photos/<slug>/`, add an entry with a `slug` to
`src/data/projects.js`, and include it in `HOME_PROJECTS`, `ARCHITECTURE_PROJECTS` or `INTERIOR_PROJECTS`.

`vercel.json` makes direct links work when deployed on Vercel.
