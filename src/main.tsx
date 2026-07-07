import React from 'react';
import {StrictMode} from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root')!;

// In dev mode, the root might only contain the <!--app-html--> comment.
// We should only hydrate if there's actual rendered content (e.g. elements).
const hasContent = rootElement.hasChildNodes() && rootElement.innerHTML.trim() !== '<!--app-html-->';

if (hasContent) {
  hydrateRoot(
    rootElement,
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
