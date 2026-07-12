import React, { useEffect } from 'react';
import { Cursor, Navbar, Footer } from './Layout';
import { Hero, Philosophy } from './HomeHero';
import { Portfolio, Reviews } from './HomePortfolio';
import { Packages, FAQ, Contact } from './HomePricing';
import { WhyUs, Services, Process } from './HomeServices';

export default function RepairCompany() {
  useEffect(() => {
    // Add custom colors to root if needed, or we can just inject a style tag for tailwind JIT if it was v3, but in v4 we can just use CSS variables or a style tag
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-[#f4f1eb] font-sans selection:bg-[#c9a868] selection:text-[#0a0a0a] w-full overflow-clip repair-company-wrapper">
      <style>{`
        .repair-company-wrapper {
          --color-dark: #0a0a0a;
          --color-darker: #050505;
          --color-ivory: #f4f1eb;
          --color-gold: #c9a868;
        }
        .text-gold { color: var(--color-gold); }
        .bg-gold { background-color: var(--color-gold); }
        .border-gold { border-color: var(--color-gold); }
        
        .text-ivory { color: var(--color-ivory); }
        .bg-ivory { background-color: var(--color-ivory); }
        .border-ivory { border-color: var(--color-ivory); }

        .bg-dark { background-color: var(--color-dark); }
        .text-dark { color: var(--color-dark); }
        
        .bg-darker { background-color: var(--color-darker); }

        .from-dark { --tw-gradient-from: var(--color-dark) var(--tw-gradient-from-position); --tw-gradient-to: rgb(10 10 10 / 0) var(--tw-gradient-to-position); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
        .via-dark { --tw-gradient-to: rgb(10 10 10 / 0)  var(--tw-gradient-to-position); --tw-gradient-stops: var(--tw-gradient-from), var(--color-dark) var(--tw-gradient-via-position), var(--tw-gradient-to); }
        .to-dark { --tw-gradient-to: var(--color-dark) var(--tw-gradient-to-position); }

        /* Handling opacity variations like bg-gold/10 */
        .bg-gold\\/10 { background-color: color-mix(in srgb, var(--color-gold) 10%, transparent); }
        .bg-gold\\/5 { background-color: color-mix(in srgb, var(--color-gold) 5%, transparent); }
        .border-gold\\/40 { border-color: color-mix(in srgb, var(--color-gold) 40%, transparent); }
        .border-gold\\/30 { border-color: color-mix(in srgb, var(--color-gold) 30%, transparent); }
        .border-gold\\/20 { border-color: color-mix(in srgb, var(--color-gold) 20%, transparent); }
        .border-gold\\/10 { border-color: color-mix(in srgb, var(--color-gold) 10%, transparent); }
        .border-gold\\/50 { border-color: color-mix(in srgb, var(--color-gold) 50%, transparent); }
        .border-gold\\/60 { border-color: color-mix(in srgb, var(--color-gold) 60%, transparent); }
        
        .text-gold\\/20 { color: color-mix(in srgb, var(--color-gold) 20%, transparent); }
        .text-gold\\/30 { color: color-mix(in srgb, var(--color-gold) 30%, transparent); }
        
        .border-ivory\\/30 { border-color: color-mix(in srgb, var(--color-ivory) 30%, transparent); }
        .border-ivory\\/20 { border-color: color-mix(in srgb, var(--color-ivory) 20%, transparent); }
        .text-ivory\\/80 { color: color-mix(in srgb, var(--color-ivory) 80%, transparent); }
        .text-ivory\\/60 { color: color-mix(in srgb, var(--color-ivory) 60%, transparent); }
        .text-ivory\\/40 { color: color-mix(in srgb, var(--color-ivory) 40%, transparent); }
        .text-ivory\\/30 { color: color-mix(in srgb, var(--color-ivory) 30%, transparent); }

        .from-dark\\/90 { --tw-gradient-from: color-mix(in srgb, var(--color-dark) 90%, transparent) var(--tw-gradient-from-position); --tw-gradient-to: color-mix(in srgb, var(--color-dark) 0%, transparent) var(--tw-gradient-to-position); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
        .via-dark\\/40 { --tw-gradient-to: color-mix(in srgb, var(--color-dark) 0%, transparent)  var(--tw-gradient-to-position); --tw-gradient-stops: var(--tw-gradient-from), color-mix(in srgb, var(--color-dark) 40%, transparent) var(--tw-gradient-via-position), var(--tw-gradient-to); }
        .from-dark\\/80 { --tw-gradient-from: color-mix(in srgb, var(--color-dark) 80%, transparent) var(--tw-gradient-from-position); --tw-gradient-to: color-mix(in srgb, var(--color-dark) 0%, transparent) var(--tw-gradient-to-position); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
        .via-dark\\/20 { --tw-gradient-to: color-mix(in srgb, var(--color-dark) 0%, transparent)  var(--tw-gradient-to-position); --tw-gradient-stops: var(--tw-gradient-from), color-mix(in srgb, var(--color-dark) 20%, transparent) var(--tw-gradient-via-position), var(--tw-gradient-to); }
        .bg-dark\\/50 { background-color: color-mix(in srgb, var(--color-dark) 50%, transparent); }
        .bg-dark\\/70 { background-color: color-mix(in srgb, var(--color-dark) 70%, transparent); }
      `}</style>
      <Cursor />
      <Navbar />
      <Hero />
      <Philosophy />
      <WhyUs />
      <Services />
      <Process />
      <Portfolio />
      <Reviews />
      <Packages />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
