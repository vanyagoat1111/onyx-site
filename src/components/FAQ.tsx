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
          <div id="partner" className="mt-16 p-8 bg-onyx-800 border border-onyx-700 clip-diagonal">
            <h3 className="font-bold uppercase tracking-widest mb-4">Стать партнером</h3>
            <p className="text-neutral-400 font-mono text-sm mb-6">Привлекайте клиентов и получайте 20% комиссии на постоянной основе от чека абонентской платы.</p>
            <a href="#" className="inline-flex font-bold tracking-widest uppercase border-b border-white pb-1 hover:text-neutral-400 hover:border-neutral-400 transition-colors">
              Подключиться
            </a>
          </div>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-onyx-700 bg-onyx-800/30 overflow-hidden">
              <button 
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left font-bold uppercase tracking-wide hover:bg-onyx-800 transition-colors"
              >
                {faq.q}
                <ChevronDown size={24} className={`transform transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="p-6 pt-0 text-neutral-400 font-sans leading-relaxed border-t border-onyx-700/50 mt-4 mx-6 pb-6">
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
