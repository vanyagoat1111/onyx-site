import React from 'react';
import { Container, SectionTitle } from './ui';
import { motion } from 'motion/react';
import { Wallet, Settings, Clock, Blocks } from 'lucide-react';
import { RadarEffect } from './BackgroundEffects';

export default function Benefits() {
  const modelCards = [
    {
      icon: <Wallet className="w-8 h-8 text-blue-400" />,
      title: "Разработка сайта",
      desc: "0 ₽"
    },
    {
      icon: <Settings className="w-8 h-8 text-blue-400" />,
      title: "Запуск и настройка",
      desc: "Оплачиваются"
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-400" />,
      title: "Сопровождение сайта",
      desc: "Оплачивается ежемесячно"
    },
    {
      icon: <Blocks className="w-8 h-8 text-blue-400" />,
      title: "Дополнительные функции",
      desc: "По необходимости"
    }
  ];

  return (
    <Container className="bg-onyx-950 py-16 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-1/3 h-1/2 bg-[radial-gradient(circle_at_left,_var(--tw-gradient-stops))] from-indigo-600/10 via-transparent to-transparent pointer-events-none -translate-y-1/2 blur-[80px]" />
      <div className="absolute top-1/4 right-0 w-1/4 h-1/3 bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-blue-600/5 via-transparent to-transparent pointer-events-none blur-[100px]" />
      <RadarEffect />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle subtitle="Бизнес-модель" className="max-w-4xl">
          ONYX запускает сайт без оплаты разработки
        </SectionTitle>

        <div className="text-lg text-neutral-300 font-sans leading-relaxed font-light space-y-6 max-w-3xl mb-16">
          <p>
            Обычная разработка сайта может стоить десятки и сотни тысяч рублей ещё до того, как бизнес получил с него первую заявку.
          </p>
          <p>
            Мы работаем по другой модели: создаём сайт без оплаты разработки, чтобы бизнес мог быстрее выйти в интернет, проверить спрос и начать получать обращения.
          </p>
          <p className="font-medium text-white">
            Вы не тратите большой бюджет на старт. Вместо этого оплачиваете только то, что нужно для работы и развития сайта: запуск, домен, сопровождение и дополнительные опции, если они понадобятся.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {modelCards.map((b, i) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              key={i}
              className="bg-onyx-900/40 backdrop-blur-md border border-onyx-800/80 p-8 clip-diagonal hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-16 h-16 bg-onyx-800/80 border border-onyx-700 flex items-center justify-center mb-6 clip-diagonal group-hover:bg-blue-600/20 group-hover:border-blue-400 transition-all duration-500">
                 {b.icon}
              </div>
              
              <h4 className="text-sm font-bold uppercase tracking-tight text-neutral-400 mb-2 leading-tight">
                {b.title}
              </h4>
              
              <p className="text-xl md:text-2xl font-black text-white">
                {b.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Container>
  );
}
