import React from 'react';
import { Container, SectionTitle } from './ui';

export default function Romi() {
  return (
    <Container className="bg-onyx-950 relative border-y border-onyx-700 overflow-hidden ">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-blue-600/10 via-onyx-950 to-onyx-950 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-1/3 h-1/3 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400/5 via-transparent to-transparent pointer-events-none blur-3xl" />
      
      <div className="relative z-10">
        <SectionTitle subtitle="Демонстрация преимуществ">
          Инвестиция<br/>в <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 ">ROMI</span>
        </SectionTitle>
        
        <div className="max-w-4xl mx-auto items-center">
          <div className="space-y-8 text-lg font-medium leading-relaxed bg-onyx-800/80 p-8 md:p-12 backdrop-blur-md border border-onyx-700 clip-diagonal shadow-[inset_0_0_30px_rgba(59,130,246,0.05)] text-center">
            <p className="font-heading font-black text-2xl md:text-4xl uppercase tracking-tight text-white leading-tight">
              Многие компании оценивают сайт только по внешнему виду. Но для бизнеса важен ROMI <span className="text-blue-500 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">(</span>Return on Marketing Investment<span className="text-blue-500 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">)</span>.
            </p>
            <div className="w-16 h-1 bg-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.5)] mx-auto"></div>
            <p className="text-neutral-200 font-sans text-xl border-t border-b border-onyx-700 py-6 mt-8">
              Задача хорошего сайта — превращать посетителей в клиентов. Мы уделяем внимание не только дизайну, но и структуре, пользовательскому пути, скорости и продающим сценариям.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
