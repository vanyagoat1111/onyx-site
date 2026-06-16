import React from 'react';
import { Container, SectionTitle } from './ui';

export default function Romi() {
  return (
    <Container className="bg-onyx-900 relative border-y border-onyx-800 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2500&auto=format&fit=crop" alt="Data Flow" className="absolute right-0 top-0 w-1/2 h-full object-cover grayscale opacity-20 mix-blend-screen pointer-events-none" referrerPolicy="no-referrer" />
      
      <div className="relative z-10">
        <SectionTitle subtitle="Демонстрация преимуществ">
          Инвестиция<br/>в ROMI
        </SectionTitle>
        
        <div className="grid lg:grid-cols-2 gap-16 text-lg md:text-xl font-medium leading-relaxed max-w-6xl">
          <div className="space-y-8">
            <p className="font-bold text-2xl uppercase tracking-tighter text-white">
              Многие компании оценивают сайт только по внешнему виду. Но для бизнеса важен ROMI (Return on Marketing Investment).
            </p>
            <p className="text-neutral-400 font-sans">
              ROMI показывает, сколько денег приносит каждый рубль, вложенный в привлечение клиентов. Представьте: вы запускаете рекламу, приводите посетителей на сайт, но заявки не поступают. Рекламный бюджет сгорает, а ROMI стремится к нулю.
            </p>
          </div>
          
          <div className="space-y-8 relative">
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" alt="Analytics" className="w-full h-64 object-cover clip-diagonal grayscale mb-8 shadow-2xl opacity-80" referrerPolicy="no-referrer" />
            <p className="text-neutral-400 font-mono text-base border-l-2 border-onyx-700 pl-6">
              Задача хорошего сайта — превращать посетителей в клиентов. Мы уделяем внимание не только дизайну, но и структуре, пользовательскому пути, скорости и продающим сценариям.
            </p>
            
            <div className="bg-onyx-800/50 p-8 border border-onyx-700 clip-diagonal flex flex-col gap-4 backdrop-blur-sm">
              <span className="font-bold uppercase tracking-widest text-white">Вывод</span>
              <span className="text-neutral-300">
                Красивый сайт — это приятно. Сайт, который приносит клиентов и увеличивает прибыль — это выгодно.
              </span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
