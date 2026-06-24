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
        
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-lg font-medium leading-relaxed bg-onyx-800/80 p-8 md:p-12 backdrop-blur-md border border-onyx-700 clip-diagonal shadow-[inset_0_0_30px_rgba(59,130,246,0.05)] text-left">
            <p className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-white leading-tight">
              Многие компании оценивают сайт только по внешнему виду. Но для бизнеса важен ROMI <span className="text-blue-500 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">(</span>Return on Marketing Investment<span className="text-blue-500 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">)</span>.
            </p>
            <div className="w-16 h-1 bg-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
            <p className="text-neutral-200 font-sans text-xl border-t border-b border-onyx-700 py-6 mt-8">
              Задача хорошего сайта — превращать посетителей в клиентов. Мы уделяем внимание не только дизайну, но и структуре, пользовательскому пути, скорости и продающим сценариям.
            </p>
          </div>
          <div className="relative aspect-square md:aspect-video lg:aspect-square w-full clip-diagonal border border-onyx-700 overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.1)] group">
             <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/80 via-transparent to-transparent z-10 pointer-events-none" />
             <video 
                src="/portfolio.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-screen"
             />
             <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="bg-onyx-900/90 backdrop-blur-md border border-onyx-700 p-4 clip-diagonal text-sm font-mono text-blue-400 uppercase tracking-widest flex items-center gap-3">
                   <div className="w-2 h-2 bg-blue-500 animate-pulse" />
                   Tracking ROI
                </div>
             </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
