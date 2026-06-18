import React from 'react';
import { Container, SectionTitle } from './ui';

export default function Romi() {
  return (
    <Container className="bg-onyx-950 relative border-y border-onyx-800 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-violet-950/20 via-onyx-950 to-onyx-950 pointer-events-none" />
      
      <div className="relative z-10">
        <SectionTitle subtitle="Демонстрация преимуществ">
          Инвестиция<br/>в <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-600">ROMI</span>
        </SectionTitle>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <div className="space-y-8 text-lg font-medium leading-relaxed">
            <p className="font-bold text-2xl md:text-3xl uppercase tracking-tighter text-white leading-tight">
              Многие компании оценивают сайт только по внешнему виду. Но для бизнеса важен ROMI <span className="text-violet-600">(</span>Return on Marketing Investment<span className="text-violet-600">)</span>.
            </p>
            <div className="w-12 h-1 bg-violet-700"></div>
            <p className="text-neutral-400 font-sans text-xl">
              ROMI показывает, сколько денег приносит каждый рубль, вложенный в привлечение клиентов. Представьте: вы запускаете рекламу, приводите посетителей на сайт, но заявки не поступают. Рекламный бюджет сгорает, а ROMI стремится к нулю.
            </p>
            <p className="text-neutral-400 font-mono text-base border-l-2 border-violet-950 pl-6 bg-violet-950/10 py-2">
              Задача хорошего сайта — превращать посетителей в клиентов. Мы уделяем внимание не только дизайну, но и структуре, пользовательскому пути, скорости и продающим сценариям.
            </p>
          </div>
          
          <div className="relative">
            <div className="relative z-10 p-2 bg-onyx-900 border border-onyx-700 shadow-[0_0_50px_rgba(46,16,101,0.2)] clip-diagonal">
              <img src="https://loremflickr.com/1200/800/analytics,chart?lock=20" alt="Analytics and Data" className="w-full h-80 lg:h-96 object-cover grayscale mix-blend-luminosity opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700 clip-diagonal" referrerPolicy="no-referrer" />
              
              <div className="absolute -bottom-6 -left-6 bg-onyx-800 border border-onyx-700 p-6 clip-diagonal shadow-2xl backdrop-blur-md max-w-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-violet-600 animate-pulse"></div>
                  <span className="font-bold uppercase tracking-widest text-white text-xs">Аналитика</span>
                </div>
                <span className="text-sm text-neutral-300 font-sans block">
                  Красивый сайт — это приятно. Сайт, который приносит клиентов и увеличивает прибыль — это выгодно.
                </span>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-violet-950/50 -z-10"></div>
            <div className="absolute top-1/2 -left-8 w-16 h-[1px] bg-violet-950/50 -z-10"></div>
          </div>
        </div>
      </div>
    </Container>
  );
}
