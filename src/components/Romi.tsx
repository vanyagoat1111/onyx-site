import React from 'react';
import { Container, SectionTitle } from './ui';
import { motion } from 'motion/react';

export default function Romi() {
  return (
    <Container className="bg-white text-onyx-900 industrial-grid">
      <SectionTitle subtitle="Демонстрация преимуществ" className="text-onyx-900 invert-border">
        Инвестиция<br/>в ROMI
      </SectionTitle>
      
      <div className="grid lg:grid-cols-2 gap-16 text-lg md:text-xl font-medium leading-relaxed max-w-6xl">
        <div className="space-y-8">
          <p className="font-bold text-2xl uppercase tracking-tighter">
            Многие компании оценивают сайт только по внешнему виду. Но для бизнеса важен ROMI (Return on Marketing Investment).
          </p>
          <p className="text-onyx-700">
            ROMI показывает, сколько денег приносит каждый рубль, вложенный в привлечение клиентов. Представьте: вы запускаете рекламу, приводите посетителей на сайт, но заявки не поступают. Рекламный бюджет сгорает, а ROMI стремится к нулю.
          </p>
        </div>
        
        <div className="space-y-8 relative">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2500&auto=format&fit=crop" alt="Data Flow" className="w-full h-48 object-cover clip-diagonal grayscale mb-8 shadow-inner mix-blend-multiply opacity-80" referrerPolicy="no-referrer" />
          <p className="text-onyx-700 font-mono text-base border-l-2 border-onyx-900 pl-6">
            Задача хорошего сайта — превращать посетителей в клиентов. Мы уделяем внимание не только дизайну, но и структуре, пользовательскому пути, скорости и продающим сценариям.
          </p>
          
          <div className="bg-onyx-100 p-8 border border-onyx-300 clip-diagonal flex flex-col gap-4">
            <span className="font-bold uppercase tracking-widest text-onyx-900">Вывод</span>
            <span className="text-onyx-800">
              Красивый сайт — это приятно. Сайт, который приносит клиентов и увеличивает прибыль — это выгодно.
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
}
