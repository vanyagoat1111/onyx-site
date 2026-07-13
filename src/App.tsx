import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import ActionBlock from './components/ActionBlock';
import Benefits from './components/Benefits';
import Templates from './components/Templates';
import LaunchEconomics from './components/LaunchEconomics';
import Services from './components/Services';
import FAQ from './components/FAQ';
import FormSection from './components/FormSection';
import Footer from './components/Footer';
import CaseEditorWrapper from './components/CaseEditorWrapper';
import LegalModal from './components/LegalModal';
import CookieConsent from './components/CookieConsent';

// Cases
import DentalClinic from './cases/DentalClinic';
import FitnessClub from './cases/FitnessClub';
import Logistics from './cases/Logistics';
import LawFirm from './cases/LawFirm';
import RealEstate from './cases/RealEstate';
import ArtelInteriors from './cases/ArtelInteriors';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('');

  useEffect(() => {
    setCurrentRoute(window.location.hash);
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
  if (currentRoute === '#case/artel') return <CaseEditorWrapper><ArtelInteriors /></CaseEditorWrapper>;

  return (
    <main className="bg-ink text-bone font-body selection:bg-cobalt selection:text-white w-full overflow-clip">
      <div className="noise-overlay" aria-hidden="true" />
      <Navbar />
      <Hero />
      <Problem />
      <Benefits />
      <ActionBlock />
      <Templates />
      <LaunchEconomics />
      <Services />
      <FAQ />
      <FormSection />
      <Footer />
      <LegalModal />
      <CookieConsent />
    </main>
  );
}
