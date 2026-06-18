import fs from 'fs';

// Templates
let tpl = fs.readFileSync('src/components/Templates.tsx', 'utf8');
let n1 = 1;
tpl = tpl.replace(/\/case\.\.jpg/g, () => `/case${n1++}.0.jpg`);
fs.writeFileSync('src/components/Templates.tsx', tpl);

// Cases
const files = [
  'src/cases/DentalClinic.tsx',
  'src/cases/FitnessClub.tsx',
  'src/cases/Logistics.tsx',
  'src/cases/LawFirm.tsx',
  'src/cases/RealEstate.tsx'
];

for (let i = 0; i < files.length; i++) {
   const file = files[i];
   let content = fs.readFileSync(file, 'utf8');
   
   // Fix broken static numbers (e.g. /case.1.jpg which was /case$1.$2.jpg -> /case..jpg)
   // Wait, let's see how they were broken.
   // Let's just fix it properly by searching for /case..jpg or /case.-...
   
}
