const express = require('express');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views', 'pages'));

const pages = [
  'index',
  'topics',
  'format',
  'outcomes',
  'cfp',
  'organizers',
  'registration',
  'contact',
];

for (const page of pages) {
  const route = page === 'index' ? '/' : `/${page}`;
  app.get(route, (req, res) => res.render(page));
  app.get(`/${page}.html`, (req, res) => res.render(page));
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Dev server running at http://localhost:${PORT}`));
