import React from 'react';
import { Container, SectionTitle } from './ui';
import ContactForm from './ContactForm';

export default function FormSection() {
  return (
    <Container id="contact-form" className="bg-onyx-900 border-y border-onyx-700 py-16 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-blue-400/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10 w-full relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="mb-12 lg:mb-0">
               <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black uppercase tracking-tight text-white mb-8 leading-tight drop-shadow-md">Готовы<br/>начать проект?</h2>
               <div className="w-24 h-2 bg-blue-600 mb-8 shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
               <p className="text-xl md:text-2xl text-neutral-300 font-sans leading-relaxed mb-10 font-light">
                 Заполните небольшую анкету, и мы свяжемся с вами в течение часа для обсуждения деталей. Никаких обязательств, только польза.
               </p>
               <ul className="space-y-6">
                  <li className="flex gap-5 text-neutral-200 text-lg items-center bg-onyx-800/30 p-4 border border-onyx-700 clip-diagonal"><div className="w-3 h-3 bg-blue-400 shrink-0 shadow-[0_0_10px_rgba(147,197,253,0.5)]" /> Бесплатная консультация с экспертом</li>
                  <li className="flex gap-5 text-neutral-200 text-lg items-center bg-onyx-800/30 p-4 border border-onyx-700 clip-diagonal"><div className="w-3 h-3 bg-blue-400 shrink-0 shadow-[0_0_10px_rgba(147,197,253,0.5)]" /> Точная оценка сроков и бюджета</li>
                  <li className="flex gap-5 text-neutral-200 text-lg items-center bg-onyx-800/30 p-4 border border-onyx-700 clip-diagonal"><div className="w-3 h-3 bg-blue-400 shrink-0 shadow-[0_0_10px_rgba(147,197,253,0.5)]" /> Подбор идеального тарифа</li>
               </ul>
            </div>
            <div className="bg-onyx-950/90 p-8 md:p-12 clip-diagonal border-2 border-onyx-700 shadow-[0_0_50px_rgba(59,130,246,0.15)] backdrop-blur-xl hover:border-blue-500/50 transition-colors relative group">
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
               <ContactForm />
            </div>
        </div>
      </div>
    </Container>
  );
}
