import React from "react";
import { Container, SectionTitle } from "./ui";

export default function Romi() {
 return (
 <Container className="bg-obsidian-canvas py-20 md:py-32 overflow-hidden py-20 md:py-32">
 
 
 
 <div className="relative z-10">
 <SectionTitle subtitle="Демонстрация преимуществ" className="!mb-12 md:!mb-20 text-center">
 Инвестиция<br className="sm:hidden" /> в <span className="text-signal-orange">ROMI</span>
 </SectionTitle>
 
 <div className="max-w-5xl mx-auto items-center">
 <div className="space-y-8 text-center bg-transparent border border-ash-stroke rounded-lg p-8 sm:p-10 md:p-14 overflow-hidden group hover:border-warm-granite transition-colors duration-200">
 
 
 <p className="text-[24px] md:text-heading tracking-heading text-bone leading-heading relative z-10 max-w-full lg:max-w-[95%] mx-auto">
 Многие компании оценивают сайт<br className="hidden md:block lg:block" /> только по внешнему виду.<br className="block sm:hidden" />
 <span className="text-bone block mt-4 sm:mt-6">
 Но для бизнеса важен ROMI
 </span>
 <span className="block text-body mt-2 sm:mt-3 text-warm-granite">
 (Return on Marketing Investment)
 </span>
 </p>
 
 <div className="w-16 sm:w-24 h-px bg-[#3d3a39] mx-auto mt-8 mb-8"></div>
 
 <p className="text-warm-granite font-sans text-body leading-body border-t border-b border-ash-stroke py-6 sm:py-8 mx-auto group-hover:text-bone transition-colors duration-200 max-w-3xl">
 Задача хорошего сайта — превращать посетителей в клиентов. Мы уделяем внимание не только дизайну, но и структуре, пользовательскому пути, скорости и продающим сценариям.
 </p>
 </div>
 </div>
 </div>
 </Container>
 );
}
