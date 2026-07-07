import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function prerender() {
  // Use vite server in middleware mode to parse JSX
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  try {
    const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
    const appHtml = render();

    const templatePath = path.resolve(__dirname, '../dist/index.html');
    let template = fs.readFileSync(templatePath, 'utf-8');

    // Replace the inner HTML of #root
    const html = template.replace(
      /<div id="root">[\s\S]*?<\/div>/,
      `<div id="root">${appHtml}</div>`
    );

    fs.writeFileSync(templatePath, html);
    console.log('Post-build HTML prerendered successfully in dist/index.html.');
  } catch (e) {
    console.error(e);
  } finally {
    vite.close();
  }
}

prerender();
