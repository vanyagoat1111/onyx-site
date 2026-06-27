import React from 'react';
import { Container, SectionTitle } from './ui';
import { Check, X } from 'lucide-react';
import { motion } from 'motion/react';

export default function ComparisonTable() {
  const calculations = [
    { label: 'Разработка сайта (Дизайн + Код)', ourPrice: 'Входит в подписку', competitorPrice: 'от 80 000 ₽', bad: true },
    { label: 'Доменное имя (.ru / .com / .рф)', ourPrice: 'Входит в подписку', competitorPrice: 'от 1 500 ₽ / год', bad: true },
    { label: 'Хостинг (Сервер сайта)', ourPrice: 'Входит в подписку', competitorPrice: 'от 3 000 ₽ / год', bad: true },
    { label: 'Техническая поддержка', ourPrice: 'Входит в подписку', competitorPrice: 'от 10 000 ₽ / мес', bad: true },
    { label: 'Установка SSL-сертификата', ourPrice: 'Входит в подписку', competitorPrice: 'от 2 000 ₽', bad: true },
    { label: 'Установка CRM и форм', ourPrice: 'Опционально', competitorPrice: 'от 15 000 ₽', bad: false },
  ]

  return (
    <Container id="comparison" className="bg-onyx-900 border-y border-onyx-700 relative overflow-hidden py-16">
      <SectionTitle subtitle="Экономика">Математика<br/>Выгоды</SectionTitle>
      
      <div className="mt-16 w-full max-w-6xl mx-auto px-4 md:px-0 relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 blur-[120px] pointer-events-none"></div>
        
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 relative z-10">
          
          {/* Card 1: Traditional Studio */}
          <motion.div 
            initial={{ opacity: 1, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="bg-onyx-950 border border-onyx-700 p-6 sm:p-10 clip-diagonal relative group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-onyx-800 to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-widest text-neutral-400 mb-8 border-b border-onyx-800 pb-6 flex items-center justify-between">
                <span>Обычная студия</span>
                <span className="text-[10px] bg-red-500/10 text-red-400 px-3 py-1 rounded-sm uppercase tracking-widest border border-red-500/20">Дорого</span>
              </h3>
              
              <ul className="space-y-6 mb-12">
                {calculations.map((calc, i) => (
                  <li key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-onyx-800/50 pb-4">
                    <span className="text-sm font-bold text-neutral-400">{calc.label}</span>
                    <span className="text-sm font-mono text-neutral-200 line-through decoration-red-500/50 decoration-2">{calc.competitorPrice}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-6 border-t-2 border-onyx-800">
                <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-red-500/80 mb-3">Итого к оплате на старте:</div>
                <div className="text-3xl sm:text-5xl font-black text-neutral-300 line-through decoration-red-500/50 decoration-4">от 111 500 ₽</div>
                <div className="text-[10px] sm:text-xs font-mono text-neutral-500 mt-4 uppercase tracking-widest leading-relaxed">+ ежемесячные траты на <br className="hidden sm:block"/>хостинг и поддержку</div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: ONYX Model */}
          <motion.div 
            initial={{ opacity: 1, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.1 }}
            className="bg-onyx-800/50 border border-blue-500/40 p-6 sm:p-10 clip-diagonal relative shadow-[0_0_50px_rgba(59,130,246,0.1)] group overflow-hidden"
          >
            <div className="absolute -inset-4 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,rgba(59,130,246,0.1)_50%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 hover:rotate-180 transform-gpu pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[80px] pointer-events-none group-hover:bg-blue-500/30 transition-colors duration-700"></div>

            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-widest text-blue-400 mb-8 border-b border-blue-500/20 pb-6 flex items-center justify-between">
                <span>Модель ONYX</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-3 py-1 rounded-sm uppercase tracking-widest border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.3)]">Всё включено</span>
              </h3>
              
              <ul className="space-y-6 mb-12">
                {calculations.map((calc, i) => (
                  <li key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-blue-500/10 pb-4">
                    <span className="text-sm font-bold text-neutral-100">{calc.label}</span>
                    <span className="text-sm font-mono font-bold text-blue-300 flex items-center gap-2 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">
                      {calc.ourPrice !== 'Опционально' && <Check className="w-4 h-4 text-blue-400 shrink-0" />}
                      {calc.ourPrice}
                    </span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-6 border-t-2 border-blue-500/30">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                  <div>
                    <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-blue-400 mb-3">Абонентская плата:</div>
                    <div className="text-4xl sm:text-6xl font-black text-white drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                      2 990 ₽ <span className="text-base sm:text-lg font-mono text-blue-400 font-bold">/мес</span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right hidden sm:block">
                     <div className="text-[10px] font-mono text-blue-300 uppercase tracking-widest leading-relaxed opacity-80 border-l sm:border-l-0 sm:border-r border-blue-500/30 pl-3 sm:pl-0 sm:pr-3 py-1">
                       Запуск за <br/>пару дней
                     </div>
                  </div>
                </div>
                <div className="text-[10px] sm:text-xs font-mono text-blue-300 mt-6 uppercase tracking-widest leading-relaxed px-4 py-3 bg-blue-500/10 border border-blue-500/20 inline-block font-bold">
                  Без огромных вложений на старте
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </Container>
  );
}
