import React from 'react';
import { Container, SectionTitle } from './ui';
import { motion } from 'motion/react';

export default function Problem() {
  return (
    <Container id="problem" className="bg-onyx-800/30 border-y border-onyx-800 relative">
      <div className="absolute top-1/2 left-0 w-1/4 h-1/2 bg-[radial-gradient(circle_at_left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none -translate-y-1/2" />
      <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="relative">
          <div className="absolute -inset-8 bg-gradient-to-r from-onyx-800 to-transparent z-10 pointer-events-none hidden lg:block" />
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2500&auto=format&fit=crop" alt="Abstract structure" className="absolute inset-0 w-full h-full object-cover grayscale opacity-20 clip-diagonal mix-blend-overlay" referrerPolicy="no-referrer" />
          <div className="relative z-20">
            <SectionTitle subtitle="Определение проблемы">Суровая<br/>статистика</SectionTitle>
          </div>
        </div>
        
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-start gap-8"
          >
            <div className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-700 tracking-tighter shrink-0 select-none drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              90%
            </div>
            <div>
              <h3 className="text-xl font-bold uppercase mb-4 tracking-wide border-b border-onyx-700 pb-4">
                Бизнесов в РФ закрываются в первые 12 месяцев
              </h3>
              <p className="text-neutral-400 font-sans leading-relaxed">
                По данным Росстата, основная причина — невидимость для клиентов. В эпоху цифровой экономики отсутствие сильного онлайн-присутствия равнозначно отсутствию на рынке. 
              </p>
            </div>
          </motion.div>

          <div className="pl-[120px] md:pl-[160px]">
            <p className="text-neutral-500 font-mono text-sm leading-relaxed border-l border-blue-900 pl-6 bg-blue-950/20 py-4 px-2">
              Пока вы полагаетесь на сарафанное радио или устаревшие методы, потенциальные клиенты уходят к конкурентам, которые в один клик дают им ответы на все вопросы. Грамотно упакованный сайт — это базовый инструмент выживания и масштабирования.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
