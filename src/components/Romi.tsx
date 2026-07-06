import React from "react";
import { Container, SectionTitle } from "./ui";

export default function Romi() {
  return (
    <Container className="bg-onyx-950 relative border-y border-onyx-800 overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-blue-600/10 via-onyx-950 to-onyx-950 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent pointer-events-none blur-[120px]" />
      
      <div className="relative z-10">
        <SectionTitle subtitle="Демонстрация преимуществ" className="!mb-12 md:!mb-20 text-center">
          Инвестиция<br className="sm:hidden" /> в <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600 drop-shadow-lg">ROMI</span>
        </SectionTitle>
        
        <div className="max-w-5xl mx-auto items-center">
          <div className="space-y-8 text-center bg-onyx-900/60 p-8 sm:p-10 md:p-14 backdrop-blur-xl border border-onyx-800/80 clip-diagonal shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-blue-500/40 transition-colors duration-700">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <p className="font-heading font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight text-white leading-[1.3] md:leading-[1.2] relative z-10 max-w-full lg:max-w-[95%] mx-auto">
              Многие компании оценивают сайт<br className="hidden md:block lg:block" /> только по внешнему виду.<br className="block sm:hidden" />
              <span className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] block mt-4 sm:mt-6">
                Но для бизнеса важен ROMI
              </span>
              <span className="block text-base sm:text-xl md:text-2xl mt-2 sm:mt-3 text-neutral-400 normal-case tracking-normal">
                (Return on Marketing Investment)
              </span>
            </p>
            
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.6)] mx-auto mt-8 mb-8"></div>
            
            <p className="text-neutral-300 font-sans text-base sm:text-lg md:text-xl border-t border-b border-onyx-800 py-6 sm:py-8 mx-auto leading-relaxed group-hover:text-neutral-200 transition-colors duration-500 max-w-3xl">
              Задача хорошего сайта — превращать посетителей в клиентов. Мы уделяем внимание не только дизайну, но и структуре, пользовательскому пути, скорости и продающим сценариям.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
