import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function prerender() {
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
      '<!--app-html-->',
      appHtml
    ).replace(
      '<div id="root">',
      `<div id="root">${appHtml}`
    ); // For fallback if we don't use <!--app-html-->

    fs.writeFileSync(templatePath, html);
    console.log('Pre-rendered HTML successfully.');
  } catch (e) {
    console.error(e);
  } finally {
    vite.close();
  }
}

prerender();
