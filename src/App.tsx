/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyWeb from './components/WhyWeb';
import Problem from './components/Problem';
import ComparisonTable from './components/ComparisonTable';
import Romi from './components/Romi';
import Templates from './components/Templates';
import Stages from './components/Stages';
import Services from './components/Services';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import FormSection from './components/FormSection';
import Partner from './components/Partner';
import Footer from './components/Footer';

// Cases
import DentalClinic from './cases/DentalClinic';
import FitnessClub from './cases/FitnessClub';
import Logistics from './cases/Logistics';
import LawFirm from './cases/LawFirm';
import RealEstate from './cases/RealEstate';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash);
      window.scrollTo(0, 0);
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentRoute === '#case/dental') return <DentalClinic />;
  if (currentRoute === '#case/fitness') return <FitnessClub />;
  if (currentRoute === '#case/logistics') return <Logistics />;
  if (currentRoute === '#case/lawfirm') return <LawFirm />;
  if (currentRoute === '#case/realestate') return <RealEstate />;

  return (
    <main className="bg-onyx-950 text-white font-sans selection:bg-blue-600 selection:text-onyx-950 w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <WhyWeb />
      <Problem />
      <ComparisonTable />
      <Romi />
      <Templates />
      <Stages />
      <Services />
      <Reviews />
      <FAQ />
      <FormSection />
      <Partner />
      <Footer />
    </main>
  );
}
