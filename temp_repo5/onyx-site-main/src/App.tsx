/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
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
import CaseEditorWrapper from './components/CaseEditorWrapper';

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
      const hash = window.location.hash;
      setCurrentRoute(hash);
      
      if (hash.startsWith('#case/')) {
        window.scrollTo(0, 0);
      } else if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash.slice(1));
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo(0, 0);
          }
        }, 100);
      } else {
        window.scrollTo(0, 0);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentRoute === '#case/dental') return <CaseEditorWrapper><DentalClinic /></CaseEditorWrapper>;
  if (currentRoute === '#case/fitness') return <CaseEditorWrapper><FitnessClub /></CaseEditorWrapper>;
  if (currentRoute === '#case/logistics') return <CaseEditorWrapper><Logistics /></CaseEditorWrapper>;
  if (currentRoute === '#case/lawfirm') return <CaseEditorWrapper><LawFirm /></CaseEditorWrapper>;
  if (currentRoute === '#case/realestate') return <CaseEditorWrapper><RealEstate /></CaseEditorWrapper>;

  return (
    <main className="bg-onyx-950 text-white font-sans selection:bg-blue-600 selection:text-onyx-950 w-full overflow-clip">
      <Navbar />
      <Hero />
      <Stats />
      <Templates />
      <WhyWeb />
      <Problem />
      <ComparisonTable />
      <Romi />
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
