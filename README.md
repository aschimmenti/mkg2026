# MKG 2026 workshop website

Source for the Multi-dimensional Knowledge Graphs (MKG) workshop website,
ISWC 2026, Bari, Italy (25–26 Oct 2026).

Built with Express + EJS templates and Bootstrap 5 via CDN. There is no
JS bundler — `npm run build` just renders the EJS templates to plain
`.html` files, since Codeberg Pages only serves static files (it cannot
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

## Deploy to Codeberg Pages

Codeberg Pages serves static content from a branch (by default `pages`)
in the repo. This repo is a named project repo
(`https://codeberg.org/aschimmenti/mkg2026`), so once Pages is enabled
the site is served at `https://aschimmenti.codeberg.page/mkg2026/`.
Double-check the exact branch/path conventions against the current
Codeberg Pages docs (docs.codeberg.org) in case they've changed.

The `deploy` script builds the site and pushes the `public/` folder to
the `pages` branch of the `origin` remote using the `gh-pages` npm
package (works with any git remote, not just GitHub, despite the name):

```sh
npm run deploy
```

Make sure `origin` is set to the Codeberg remote and that you can push
to it (SSH key or token configured) before running this.

## Content still needed (marked `[TODO]` in the pages)

- Home: ~150–200 word abstract for the About section.
- Home / Call for Participation: pitch-statement deadline, notification
  date, submission channel (email / EasyChair / form).
- Topics: RQ1–3 and EC1–3 text.
- Organizers: names, affiliations, one-line bios, homepage links for the
  5 chairs.
- Registration: link to the ISWC 2026 registration page.
- Contact: workshop email address.
