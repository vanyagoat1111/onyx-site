import React from 'react';
import { Navbar, Footer } from './artel/Layout';
import { Hero, Philosophy } from './artel/HomeHero';
import { WhyUs, Services, Process } from './artel/HomeServices';
import { Portfolio, Reviews } from './artel/HomePortfolio';
import { Packages, FAQ, Contact } from './artel/HomePricing';
import { MaterialsPartners, BeforeAfter } from './artel/HomeTrust';

export default function ArtelInteriors() {
  return (
    <div className="relative bg-dark min-h-screen text-ivory font-manrope selection:bg-gold/30 selection:text-ivory overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <WhyUs />
        <Services />
        <Process />
        <Portfolio />
        <MaterialsPartners />
        <BeforeAfter />
        <Reviews />
        <Packages />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
