import React from 'react';
import { Container, SectionTitle } from './ui';
import { Check, X } from 'lucide-react';
import { motion } from 'motion/react';

export default function ComparisonTable() {
  const calculations = [
    { label: 'Разработка сайта (Дизайн + Код)', ourPrice: 'Входит в тариф', competitorPrice: 'от 80 000 ₽', bad: true },
    { label: 'Доменное имя (.ru / .com / .рф)', ourPrice: 'Входит в тариф', competitorPrice: 'от 1 500 ₽ / год', bad: true },
    { label: 'Хостинг (Сервер сайта)', ourPrice: 'Входит в тариф', competitorPrice: 'от 3 000 ₽ / год', bad: true },
    { label: 'Техническая поддержка', ourPrice: 'Входит в тариф', competitorPrice: 'от 10 000 ₽ / мес', bad: true },
    { label: 'Установка CRM и форм', ourPrice: 'В доп. опциях', competitorPrice: 'от 15 000 ₽', bad: false },
    { label: 'Установка SSL-сертификата', ourPrice: 'Входит в тариф', competitorPrice: 'от 2 000 ₽', bad: true },
  ]

  return (
    <Container id="comparison" className="bg-onyx-900 border-y border-onyx-700 relative overflow-hidden py-16">
      <SectionTitle subtitle="Экономика">Математика<br/>Выгоды</SectionTitle>
      
      <div className="mt-16 overflow-x-auto pb-8 -mx-6 px-6 md:mx-0 md:px-0 relative z-10 w-full">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/5 blur-[120px] pointer-events-none"></div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="min-w-[800px] w-full max-w-5xl mx-auto bg-onyx-800/80 backdrop-blur-md border border-onyx-700 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] clip-diagonal overflow-hidden relative">
          
          <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 z-0 pointer-events-none" />

          {/* Header */}
          <div className="grid grid-cols-3 gap-0 border-b border-onyx-700 bg-onyx-950/50 sticky top-0 z-10 w-full table-fixed">
            <div className="col-span-1 p-4 md:p-6 flex items-center min-w-0">
               <span className="text-neutral-200 font-mono text-[10px] md:text-sm font-bold uppercase tracking-[0.1em] break-words hyphens-auto">Статья расходов</span>
            </div>
            <div className="col-span-1 p-4 md:p-6 border-l border-onyx-700 flex items-center justify-center min-w-0">
               <span className="text-neutral-100 font-black text-xs md:text-base uppercase tracking-widest text-center truncate">Обычная студия</span>
            </div>
            <div className="col-span-1 p-4 md:p-6 border-l border-blue-500/50 bg-blue-500/10 flex items-center justify-center relative overflow-hidden min-w-0">
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400/20 to-transparent opacity-50" />
               <span className="text-blue-400 font-black text-xs md:text-base uppercase tracking-widest drop-shadow-[0_0_5px_rgba(59,130,246,0.5)] relative z-10 text-center truncate">Модель ONYX</span>
            </div>
          </div>
          
          {/* Rows */}
          <div className="relative z-10">
            {calculations.map((calc, i) => (
              <div key={i} className="grid grid-cols-3 gap-0 border-b border-onyx-800/50 hover:bg-onyx-950 transition-colors group">
                <div className="col-span-1 p-4 md:p-6 text-sm md:text-base font-bold text-neutral-100 group-hover:text-white transition-colors min-w-0 pr-4 break-words leading-snug">{calc.label}</div>
                <div className="col-span-1 p-4 md:p-6 border-l border-onyx-800 flex items-center justify-center min-w-0">
                   <span className="font-mono text-sm md:text-lg text-neutral-300 line-through decoration-red-500/50 decoration-2 text-center group-hover:text-neutral-200 transition-colors break-words">
                     {calc.competitorPrice}
                   </span>
                </div>
                <div className="col-span-1 p-4 md:p-6 border-l border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 transition-colors flex items-center justify-center min-w-0">
                   <div className="flex flex-col sm:flex-row items-center gap-2 text-center">
                     <Check className="w-4 h-4 md:w-5 md:h-5 text-blue-400 shrink-0 shadow-[0_0_5px_rgba(59,130,246,0.5)] hidden sm:block" />
                     <span className="font-mono font-bold text-sm md:text-lg text-blue-300 group-hover:text-blue-200 text-center drop-shadow-[0_0_5px_rgba(59,130,246,0.3)]">{calc.ourPrice}</span>
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="grid grid-cols-3 gap-0 border-t-2 border-onyx-700 bg-onyx-950/80 relative z-10">
             <div className="col-span-1 p-4 md:p-6 flex flex-col justify-center min-w-0">
                <span className="text-neutral-300 font-mono text-[10px] md:text-sm font-bold uppercase tracking-[0.1em] mb-1 break-words">Итого к оплате</span>
                <span className="text-[10px] md:text-xs text-neutral-500 font-sans truncate">на момент запуска</span>
             </div>
             <div className="col-span-1 p-4 md:p-6 border-l border-onyx-700 flex flex-col items-center justify-center min-w-0">
                <span className="text-lg md:text-3xl font-black text-neutral-300 line-through decoration-red-500/50 decoration-2 break-words text-center">от 111 500 ₽</span>
                <span className="text-[10px] md:text-xs font-mono text-red-400 mt-2 text-center uppercase tracking-widest hidden sm:block truncate w-full">Огромные вложения</span>
             </div>
             <div className="col-span-1 p-4 md:p-6 border-l-2 border-blue-500 bg-blue-500/10 flex flex-col items-center justify-center shadow-[inset_0_0_20px_rgba(59,130,246,0.1)] min-w-0 overflow-hidden">
                <div className="flex items-center justify-center gap-1.5 flex-wrap px-2">
                  <span className="text-xl md:text-3xl lg:text-4xl font-black text-white drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">2 990 ₽</span>
                  <span className="text-xs md:text-sm font-mono text-blue-400">/мес</span>
                </div>
                <span className="text-[10px] md:text-xs font-mono text-blue-400 mt-2 text-center uppercase tracking-widest drop-shadow-[0_0_5px_rgba(59,130,246,0.5)] hidden sm:block truncate w-full">Готовый сайт за пару дней</span>
             </div>
          </div>

        </motion.div>
      </div>
    </Container>
  );
}
