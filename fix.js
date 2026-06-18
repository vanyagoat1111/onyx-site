import fs from 'fs';

const files = [
  'src/cases/DentalClinic.tsx',
  'src/cases/FitnessClub.tsx',
  'src/cases/Logistics.tsx',
  'src/cases/LawFirm.tsx',
  'src/cases/RealEstate.tsx'
];

for (let f of files) {
  let content = fs.readFileSync(f, 'utf8');
  
  content = content.replace(/`https:\/\/images\.unsplash\.com\/photo-\$[^`]+`/g, (match) => {
     if (f.includes('Dental')) return '`https://loremflickr.com/800/1000/doctor,portrait?random=${i+1}`';
     if (f.includes('Fitness')) return '`https://loremflickr.com/800/1000/workout,portrait?random=${i+1}`';
     if (f.includes('Logistics')) return '`https://loremflickr.com/800/600/cargo,truck?random=${i+1}`';
     if (f.includes('RealEstate') && match.includes('{dev.img}')) return '`https://loremflickr.com/800/1000/architecture,building?random=${i+1}`';
     if (f.includes('RealEstate') && match.includes('{agent.img}')) return '`https://loremflickr.com/800/1000/business,portrait?random=${i+1}`';
     return match; 
  });
  
  fs.writeFileSync(f, content);
}
