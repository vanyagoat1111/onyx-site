import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyUs from './components/WhyUs';
import HowToStart from './components/HowToStart';
import TasksWeSolve from './components/TasksWeSolve';
import LeadMagnets from './components/LeadMagnets';
import Templates from './components/Templates';
import Services from './components/Services';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import CaseEditorWrapper from './components/CaseEditorWrapper';
import LegalModal from './components/LegalModal';
import CookieConsent from './components/CookieConsent';
import PartnerPage from './components/PartnerPage';

// Cases
import DentalClinic from './cases/DentalClinic';
import FitnessClub from './cases/FitnessClub';
import Logistics from './cases/Logistics';
import LawFirm from './cases/LawFirm';
import RealEstate from './cases/RealEstate';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('');

  useEffect(() => {
    setCurrentRoute(window.location.hash);
    const handleHashChange = () => {
      const hash = window.location.hash;
      setCurrentRoute(hash);
      if (hash.startsWith('#case/')) {
        window.scrollTo(0, 0);
      } else if (hash === '#partner') {
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
  
  if (currentRoute === '#partner') {
    return (
      <main className="bg-onyx-950 text-white font-sans selection:bg-blue-600 selection:text-onyx-950 w-full overflow-clip">
        <Navbar />
        <PartnerPage />
        <Footer />
        <LegalModal />
        <CookieConsent />
      </main>
    );
  }

  return (
    <main className="bg-onyx-950 text-white font-sans selection:bg-blue-600 selection:text-onyx-950 w-full overflow-clip relative pb-24 md:pb-0">
      <Navbar />
      <Hero />
      <TasksWeSolve />
      <WhyUs />
      <HowToStart />
      <LeadMagnets />
      <Services />
      <Templates />
      <FAQ />
      <Footer />
      <LegalModal />
      <CookieConsent />
      
      {/* Sticky Mobile Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-onyx-950 to-transparent z-40 md:hidden flex justify-center">
        <button 
          onClick={() => {
            document.getElementById('lead-magnets')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-full max-w-sm bg-blue-600 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:bg-blue-500 transition-colors uppercase tracking-widest text-sm"
        >
          Получить аудит
        </button>
      </div>
    </main>
  );
}
