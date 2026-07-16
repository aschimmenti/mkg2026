const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const pages = [
  'index',
  'cfp',
  'format',
  'organizers',
];

const viewsDir = path.join(__dirname, 'views');
const outDir = path.join(__dirname, 'public');

async function build() {
  fs.mkdirSync(outDir, { recursive: true });

  for (const page of pages) {
    const srcPath = path.join(viewsDir, 'pages', `${page}.ejs`);
    const html = await ejs.renderFile(srcPath, {}, { views: [viewsDir] });
    fs.writeFileSync(path.join(outDir, `${page}.html`), html);
    console.log(`built ${page}.html`);
  }
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
