const fs = require('fs');
let content = fs.readFileSync('src/components/EditorSimulator.tsx', 'utf8');

content = content.replace(/<img src=\{case1\} alt="Image" className="" \/>/g, '<img src={case1} alt="Пример сайта стоматологии" className="" />');
content = content.replace(/<img src=\{case2\} alt="Image" className="" \/>/g, '<img src={case2} alt="Пример сайта фитнес клуба" className="" />');
content = content.replace(/<img src=\{case3\} alt="Image" className="" \/>/g, '<img src={case3} alt="Пример сайта логистической компании" className="" />');
content = content.replace(/<img src=\{building1\} alt="Image" className="" \/>/g, '<img src={building1} alt="Фото здания 1" className="" />');
content = content.replace(/<img src=\{building2\} alt="Image" className="" \/>/g, '<img src={building2} alt="Фото здания 2" className="" />');
content = content.replace(/<img src=\{case4\} alt="Image" className="" \/>/g, '<img src={case4} alt="Пример сайта юридической фирмы" className="" />');
content = content.replace(/<img src=\{case5\} alt="Image" className="" \/>/g, '<img src={case5} alt="Пример сайта недвижимости" className="" />');

fs.writeFileSync('src/components/EditorSimulator.tsx', content);
console.log('done');
