const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('import TheNeed')) {
  code = code.replace(
    `import Hero from './components/Hero';`,
    `import Hero from './components/Hero';\nimport TheNeed from './components/TheNeed';`
  );
}

// Ensure the new strict order: Hero, TheNeed, WhyUs, HowToStart, TasksWeSolve, Templates, LeadMagnets, Services, FAQ
const correctOrder = `      <Navbar />
      <Hero />
      <TheNeed />
      <WhyUs />
      <HowToStart />
      <TasksWeSolve />
      <Templates />
      <LeadMagnets />
      <Services />
      <FAQ />`;

code = code.replace(
  /<Navbar \/>[\s\S]*?<FAQ \/>/,
  correctOrder
);

fs.writeFileSync('src/App.tsx', code);
