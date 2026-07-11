import React from 'react';
import { Container, SectionTitle } from './ui';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HowToStart() {
  const steps = [
    {
      num: "01",
      title: "Заявка на аудит",
      desc: "Оставьте запрос. Мы проведем бесплатный разбор вашей ситуации и покажем точки роста."
    },
    {
      num: "02",
      title: "План запуска",
      desc: "Адаптируем готовую структуру под специфику вашей клиники, интегрируем онлайн-запись."
    },
    {
      num: "03",
      title: "Новые пациенты",
      desc: "Запускаем проект. Сайт начинает конвертировать трафик в реальные записи на прием."
    }
  ];

  return (
    <Container id="how-to-start" className="bg-onyx-950 py-16 md:py-32 relative">
      <SectionTitle subtitle="Простой старт">
        Что нужно сделать, <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-md">чтобы начать?</span>
      </SectionTitle>

      <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
        {steps.map((step, i) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
            key={i}
            className="relative"
          >
            {i !== steps.length - 1 && (
              <div className="hidden md:block absolute top-12 left-[calc(100%-2rem)] w-[calc(100%+2rem)] h-[2px] bg-gradient-to-r from-blue-500/50 to-transparent z-0" />
            )}
            
            <div className="bg-onyx-900 border border-onyx-800 p-8 clip-diagonal relative z-10 hover:border-blue-500/50 transition-colors group">
              <div className="text-5xl font-black font-mono text-onyx-800 mb-6 group-hover:text-blue-500/30 transition-colors">
                {step.num}
              </div>
              <h4 className="text-xl font-bold uppercase tracking-tight text-white mb-4">
                {step.title}
              </h4>
              <p className="text-neutral-400 font-sans leading-relaxed text-sm">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <button 
          onClick={() => document.getElementById('lead-magnets')?.scrollIntoView({ behavior: 'smooth'})}
          className="inline-flex items-center gap-2 text-blue-400 font-bold uppercase tracking-widest hover:text-blue-300 transition-colors"
        >
          <CheckCircle2 className="w-5 h-5" />
          Получить разбор клиники
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </motion.div>
    </Container>
  );
}
