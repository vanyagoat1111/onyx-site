const fs = require('fs');

let content = fs.readFileSync('src/components/Footer.tsx', 'utf8');

const anchorPoint = `<a href="#" onClick={(e) => { e.preventDefault(); document.dispatchEvent(new CustomEvent('open-legal', { detail: 'payment' })); }} className="hover:text-blue-300 hover:drop-shadow-[0_0_5px_rgba(147,197,253,0.3)] transition-all">Условия оплаты, доставки и возврата</a>`;
const partnerLink = `                <a href="#partner" className="hover:text-blue-300 hover:drop-shadow-[0_0_5px_rgba(147,197,253,0.3)] transition-all text-blue-400 font-bold uppercase">Партнерская программа</a>`;

content = content.replace(anchorPoint, anchorPoint + '\n' + partnerLink);

fs.writeFileSync('src/components/Footer.tsx', content);
console.log('done');
