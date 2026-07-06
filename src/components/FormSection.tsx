import React from 'react';
import { Container, SectionTitle } from './ui';
import ContactForm from './ContactForm';

export default function FormSection() {
 return (
 <Container id="contact-form" className="bg-obsidian-canvas py-24 overflow-hidden relative">
 
 
 <div className="max-w-7xl mx-auto relative z-10 w-full relative">
 <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
 <div className="mb-12 lg:mb-0">
 <h2 className="text-[48px] md:text-[64px] text-bone tracking-heading mb-8 leading-heading">Готовы<br/>начать проект?</h2>
 
 <p className="text-body md:text-[20px] text-warm-granite font-sans leading-body mb-10">
 Заполните небольшую анкету, и мы свяжемся с вами в течение часа для обсуждения деталей. Никаких обязательств, только польза.
 </p>
 <ul className="space-y-6">
 <li className="flex gap-5 text-bone text-body items-center bg-transparent p-4 border border-ash-stroke rounded-sm"><div className="w-2 h-2 bg-signal-orange shrink-0" /> Бесплатная консультация с экспертом</li>
 <li className="flex gap-5 text-bone text-body items-center bg-transparent p-4 border border-ash-stroke rounded-sm"><div className="w-2 h-2 bg-signal-orange shrink-0" /> Точная оценка сроков и бюджета</li>
 <li className="flex gap-5 text-bone text-body items-center bg-transparent p-4 border border-ash-stroke rounded-sm"><div className="w-2 h-2 bg-signal-orange shrink-0" /> Подбор подходящей инфраструктуры</li>
 </ul>
 </div>
 <div className="bg-carbon-lift p-8 md:p-12 border border-ash-stroke rounded-lg backdrop-blur-xl hover:border-warm-granite transition-colors relative group">
 
 <ContactForm />
 </div>
 </div>
 </div>
 </Container>
 );
}
