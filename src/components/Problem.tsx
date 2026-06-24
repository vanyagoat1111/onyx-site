import React from 'react';
import { Container, SectionTitle } from './ui';
import { motion } from 'motion/react';

export default function Problem() {
  return (
    <Container id="problem" className="bg-onyx-900 border-y border-onyx-700 relative  overflow-hidden">
      <video 
        src={import.meta.env.BASE_URL + 'blob.mp4'} 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute left-0 w-full h-[200%] top-[-50%] object-cover mix-blend-screen opacity-30 pointer-events-none"
        style={{ maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)" }}
      />
      <div className="absolute top-1/2 left-0 w-1/4 h-1/2 bg-[radial-gradient(circle_at_left,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent pointer-events-none -translate-y-1/2" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-blue-400/10 via-transparent to-transparent pointer-events-none" />
      <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10 p-8 border-l border-r border-blue-500/30 shadow-[inset_0_0_50px_rgba(59,130,246,0.05)] bg-onyx-800/80 backdrop-blur-md overflow-hidden">
        <div className="relative z-10">
          <div className="absolute -inset-8 bg-gradient-to-r from-onyx-900 to-transparent z-10 pointer-events-none hidden lg:block" />
          <div className="relative z-20">
            <SectionTitle subtitle="Определение проблемы">Суровая<br/>статистика</SectionTitle>
          </div>
        </div>
        
        <div className="space-y-8 relative z-10">
          <motion.div 
            initial={{ opacity: 1, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-start gap-8"
          >
            <div className="text-6xl md:text-8xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-[#8100ff] tracking-tight shrink-0 select-none drop-shadow-[0_0_15px_rgba(147,197,253,0.8)] ">
              90%
            </div>
            <div>
              <h3 className="text-[13px] leading-[23px] text-left font-bold uppercase mb-4 tracking-wide border-b border-onyx-700 pb-4 text-blue-500">
                Бизнесов закрываются в первый год
              </h3>
              <p className="text-neutral-300 font-sans leading-relaxed text-sm md:text-base max-w-sm">
                Основная причина — невидимость для клиентов. Нет сайта = нет доверия. Ваша аудитория уходит к конкурентам.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-onyx-700">
            <div>
               <div className="text-3xl font-black text-white mb-2 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">100+</div>
               <div className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.2em]">Успешных проектов</div>
            </div>
            <div>
               <div className="text-3xl font-black text-white mb-2 drop-shadow-[0_0_10px_rgba(147,197,253,0.3)]">От 2 дней</div>
               <div className="text-[10px] font-mono text-blue-300 uppercase tracking-[0.2em]">Скорость запуска</div>
            </div>
            <div>
               <div className="text-3xl font-black text-white mb-2 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">99.9%</div>
               <div className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.2em]">Uptime сайтов</div>
            </div>
            <div>
               <div className="text-3xl font-black text-white mb-2 drop-shadow-[0_0_10px_rgba(147,197,253,0.3)]">24/7</div>
               <div className="text-[10px] font-mono text-blue-300 uppercase tracking-[0.2em]">Техническая поддержка</div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
