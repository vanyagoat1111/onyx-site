import fs from 'fs';
import path from 'path';

function walkDir(dir: string, callback: (path: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir('./src', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.css') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    let newContent = content
      .replace(/bg-black/g, 'bg-onyx-950')
      .replace(/border-black/g, 'border-onyx-950')
      .replace(/text-black/g, 'text-onyx-950')
      .replace(/from-black/g, 'from-onyx-950')
      .replace(/to-black/g, 'to-onyx-950')
      .replace(/via-black/g, 'via-onyx-950');

    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      console.log('Fixed', filePath);
    }
  }
});
