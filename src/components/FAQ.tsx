import React, { useState } from 'react';
import { Container, SectionTitle } from './ui';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: "Как быстро я получу готовый сайт?", a: "Мы разрабатываем сайты от 1 дня для базовых тарифов, благодаря библиотеке готовых архитектурных блоков." },
  { q: "Что входит в техническое обслуживание?", a: "Хостинг, продление домена, обеспечение безопасности, создание резервных копий и базовое обновление контента." },
  { q: "Могу ли я потом отказаться от подписки?", a: "Да, вы можете остановить подписку в любой момент. Сайт перестанет функционировать, но мы сохраним резервную копию базы данных." },
  { q: "Вы делаете SEO-оптимизацию?", a: "Базовая техническая SEO-оптимизация уже включена во все тарифы. Углубленное продвижение обсуждается индивидуально." }
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Container id="faq" className="border-t border-onyx-800">
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <SectionTitle subtitle="Вопросы">FAQ</SectionTitle>
          <div id="partner" className="mt-16 p-8 bg-onyx-900 border border-violet-950/50 clip-diagonal relative group overflow-hidden">
            <div className="absolute inset-0 bg-violet-950/5 group-hover:bg-violet-950/10 transition-colors pointer-events-none" />
            <h3 className="font-bold uppercase tracking-widest mb-4 text-violet-500 group-hover:text-violet-300 transition-colors">Стать партнером</h3>
            <p className="text-neutral-400 font-mono text-sm mb-6 relative z-10">Привлекайте клиентов и получайте 20% комиссии на постоянной основе от чека абонентской платы.</p>
            <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex font-bold tracking-widest uppercase border-b border-violet-600 pb-1 text-violet-600 hover:text-white hover:border-white transition-colors relative z-10">
              Подключиться
            </a>
          </div>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className={`border ${open === i ? 'border-violet-950/50 bg-onyx-900/80 shadow-[0_0_15px_rgba(46,16,101,0.2)]' : 'border-onyx-700 bg-onyx-800/30'} overflow-hidden transition-all duration-300`}>
              <button 
                onClick={() => setOpen(open === i ? null : i)}
                className={`w-full flex items-center justify-between p-6 text-left font-bold uppercase tracking-wide hover:bg-onyx-800 transition-colors ${open === i ? 'text-violet-500' : 'text-white'}`}
              >
                {faq.q}
                <ChevronDown size={24} className={`transform transition-transform ${open === i ? 'rotate-180 text-violet-600' : 'text-neutral-500'}`} />
              </button>
              {open === i && (
                <div className="p-6 pt-0 text-neutral-400 font-sans leading-relaxed border-t border-violet-950/30 mt-4 mx-6 pb-6">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
