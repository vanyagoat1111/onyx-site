import fs from 'fs';
import path from 'path';

function walkDir(dir: string, callback: (path: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

function processFiles() {
  walkDir('./src', (filePath) => {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.css')) {
      let content = fs.readFileSync(filePath, 'utf-8');
      
      let newContent = content
        .replace(/\[#02000a\]/g, 'onyx-950')
        .replace(/\[#050414\]/g, 'onyx-900')
        .replace(/\[#0a0826\]/g, 'onyx-800')
        .replace(/\[#1f1a4e\]/g, 'onyx-700')
        
        .replace(/group\/cyberbtn/g, 'group')
        .replace(/group-hover\/cyberbtn/g, 'group-hover')
        .replace(/group\/cyber/g, 'group')
        .replace(/group-hover\/cyber/g, 'group-hover')
        .replace(/cyber-btn-glitch/g, '');

      if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf-8');
      }
    }
  });
}

processFiles();
