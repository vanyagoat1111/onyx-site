import React from 'react';
import { Container, SectionTitle } from './ui';
import { motion } from 'motion/react';

export default function Problem() {
  return (
    <Container id="problem" className="bg-onyx-950 border-y border-onyx-800 relative overflow-hidden py-20 md:py-32">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_left,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent pointer-events-none -translate-y-1/2 blur-[80px]" />
      <div className="absolute top-0 right-0 w-[600px] h-full bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none blur-[100px]" />
      
      <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10 p-10 md:p-14 lg:p-20 border border-onyx-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-onyx-900/40 backdrop-blur-xl overflow-hidden clip-diagonal group hover:border-blue-500/30 transition-colors duration-700">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[60px] pointer-events-none group-hover:bg-blue-400/10 transition-colors duration-700" />
        
        <div className="relative z-10">
          <div className="absolute -inset-8 bg-gradient-to-r from-onyx-950 to-transparent z-10 pointer-events-none hidden lg:block" />
          <div className="relative z-20">
            <SectionTitle subtitle="Определение проблемы" className="!mb-0">Суровая<br/>статистика</SectionTitle>
          </div>
        </div>

        <div className="space-y-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-8"
          >
            <div className="text-7xl md:text-8xl lg:text-9xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-indigo-600 tracking-tighter shrink-0 select-none drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              90%
            </div>
            <div className="pt-2">
              <h3 className="text-sm md:text-base leading-relaxed text-left font-bold uppercase mb-4 tracking-widest border-b border-onyx-700 pb-4 text-blue-400">
                Бизнесов закрываются в первый год
              </h3>
              <p className="text-neutral-300 font-sans leading-relaxed text-sm md:text-base max-w-sm">
                Основная причина — невидимость для клиентов. Нет сайта = нет доверия. Ваша аудитория уходит к конкурентам.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 pt-10 border-t border-onyx-800">
            {[
              { val: '100+', label: 'Успешных проектов', colorClass: 'text-blue-400 group-hover/stat:text-blue-400' },
              { val: 'От 2 дней', label: 'Скорость запуска', colorClass: 'text-indigo-400 group-hover/stat:text-indigo-400' },
              { val: '99.9%', label: 'Uptime сайтов', colorClass: 'text-blue-500 group-hover/stat:text-blue-500' },
              { val: '24/7', label: 'Техническая поддержка', colorClass: 'text-indigo-300 group-hover/stat:text-indigo-300' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group/stat cursor-default"
              >
                 <div className={`text-3xl md:text-4xl font-black text-white mb-3 transition-all duration-300 drop-shadow-sm group-hover/stat:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] ${stat.colorClass.split(' ')[1]}`}>{stat.val}</div>
                 <div className={`text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] opacity-80 group-hover/stat:opacity-100 transition-opacity ${stat.colorClass.split(' ')[0]}`}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
