import React from 'react';
import { Container, SectionTitle } from './ui';

const portfolioVid = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80";

export default function Romi() {
  return (
    <Container className="bg-onyx-950 relative border-y border-onyx-800 overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-blue-600/10 via-onyx-950 to-onyx-950 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent pointer-events-none blur-[120px]" />
      
      <div className="relative z-10">
        <SectionTitle subtitle="Демонстрация преимуществ" className="!mb-12 md:!mb-20">
          Инвестиция<br/>в <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600 drop-shadow-lg">ROMI</span>
        </SectionTitle>
        
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-14 items-center">
          <div className="space-y-8 text-lg font-medium leading-relaxed bg-onyx-900/60 p-8 md:p-14 backdrop-blur-xl border border-onyx-800/80 clip-diagonal shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-left relative overflow-hidden group hover:border-blue-500/40 transition-colors duration-700">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <p className="font-heading font-black text-2xl md:text-3xl lg:text-4xl uppercase tracking-tight text-white leading-[1.1] relative z-10">
              Многие компании оценивают сайт только по внешнему виду. Но для бизнеса важен ROMI <span className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">(</span>Return on Marketing Investment<span className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">)</span>.
            </p>
            
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
            
            <p className="text-neutral-300 font-sans text-lg md:text-xl border-t border-b border-onyx-800 py-6 mt-8 leading-relaxed group-hover:text-neutral-200 transition-colors duration-500">
              Задача хорошего сайта — превращать посетителей в клиентов. Мы уделяем внимание не только дизайну, но и структуре, пользовательскому пути, скорости и продающим сценариям.
            </p>
          </div>
          
          <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square w-full clip-diagonal border border-onyx-800 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group hover:border-blue-500/50 transition-colors duration-700">
             <div className="absolute inset-0 bg-gradient-to-t from-onyx-950 via-onyx-950/40 to-transparent z-10 pointer-events-none" />
             <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
             <img
                src={portfolioVid}
                alt="ROMI Background"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 mix-blend-screen"
             />
             <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="bg-onyx-950/80 backdrop-blur-md border border-onyx-700/80 p-5 clip-diagonal text-sm font-mono text-blue-400 uppercase tracking-[0.2em] flex items-center gap-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:border-blue-500/40 transition-colors duration-500">
                   <div className="w-2.5 h-2.5 bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
                   Tracking ROI
                </div>
             </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
