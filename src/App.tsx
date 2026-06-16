/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import WhyWeb from './components/WhyWeb';
import Romi from './components/Romi';
import Templates from './components/Templates';
import Stages from './components/Stages';
import Services from './components/Services';
import ScarcityGuarantee from './components/ScarcityGuarantee';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  return (
    <main className="min-h-screen bg-onyx-900 text-white font-sans selection:bg-white selection:text-black">
      <Navbar />
      <Hero />
      <Problem />
      <WhyWeb />
      <Romi />
      <Templates />
      <Services />
      <Stages />
      <ScarcityGuarantee />
      <FAQ />
      <Footer />
    </main>
  );
}
