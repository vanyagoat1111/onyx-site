const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace blue with indigo
      content = content.replace(/blue-/g, 'indigo-');
      
      // Replace rgb values for shadow and stroke
      content = content.replace(/rgba\(59,130,246/g, 'rgba(79,70,229');
      content = content.replace(/rgba\(37,99,235/g, 'rgba(67,56,202');
      content = content.replace(/rgba\(30,58,138/g, 'rgba(49,46,129');
      
      // text-blue -> text-indigo
      content = content.replace(/text-blue/g, 'text-indigo');
      content = content.replace(/border-blue/g, 'border-indigo');
      content = content.replace(/bg-blue/g, 'bg-indigo');
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

processDir(path.join(__dirname, 'src/components'));
console.log("Done");
