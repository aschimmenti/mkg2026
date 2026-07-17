# MKG 2026 workshop website

Source for the Multi-dimensional Knowledge Graphs (MKG) workshop website,
ISWC 2026, Bari, Italy (25–26 Oct 2026).
Still under development. 

Built with Express + EJS templates and Bootstrap 5 via CDN. There is no
JS bundler — `npm run build` just renders the EJS templates to plain
`.html` files, since GitHub Pages only serves static files (it cannot
run a live Node server).

## Structure

- `views/partials/` — shared head, nav, footer, included by every page.
- `views/pages/*.ejs` — one file per page (index, topics, format, outcomes,
  cfp, organizers, registration, contact).
- `server.js` — local dev server (Express + EJS view engine), for live
  preview only. Not deployed.
- `build.js` — renders every page in `views/pages/` to static HTML in
  `public/`. This is what gets deployed.

## Local development

```sh
npm install
npm run dev       # preview at http://localhost:3000
```

## Build static site

```sh
npm run build      # writes public/*.html
```

## Deploy to GitHub Pages

The site is served from `https://aschimmenti.github.io/mkg2026/`, with
GitHub Pages configured to serve the `pages` branch of
`https://github.com/aschimmenti/mkg2026`.

The `deploy` script builds the site and pushes the `public/` folder to
that `pages` branch using the `gh-pages` npm package:

```sh
npm run deploy
```

Make sure you can push to `https://github.com/aschimmenti/mkg2026.git`
(SSH key or token configured) before running this.

## Content still needed (marked `[TODO]` in the pages)

- Home: ~150–200 word abstract for the About section.
- Home / Call for Participation: pitch-statement deadline, notification
  date, submission channel (email / EasyChair / form).
- Topics: RQ1–3 and EC1–3 text.
- Organizers: names, affiliations, one-line bios, homepage links for the
  5 chairs.
- Registration: link to the ISWC 2026 registration page.
- Contact: workshop email address.
