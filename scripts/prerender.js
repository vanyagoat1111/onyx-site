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

    const templatePath = path.resolve(__dirname, '../index.html');
    let template = fs.readFileSync(templatePath, 'utf-8');

    // Remove any existing prerendered content to avoid duplication if run multiple times
    template = template.replace(/<div id="root">[\s\S]*?<\/div>/, '<div id="root"><!--app-html--></div>');

    // Replace the inner HTML of #root
    const html = template.replace(
      '<!--app-html-->',
      appHtml
    );

    fs.writeFileSync(templatePath, html);
    console.log('Pre-rendered HTML successfully.');
  } catch (e) {
    console.error(e);
  } finally {
    vite.close();
  }
}

prerender();
