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
      
      content = content.replace(/src="\.\/([^"]+\.(jpg|png|svg))"/g, 'src="/$1"');
      content = content.replace(/previewImg:\s*'\.\/([^']+)'/g, "previewImg: '/$1'");
      content = content.replace(/src=\{`\.\/([^`]+)`\}/g, 'src={`/$1`}');
      content = content.replace(/url\("\.\/([^"]+)"\)/g, 'url("/$1")');
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

processDir(path.join(process.cwd(), 'src'));
console.log("Paths fixed 2");
