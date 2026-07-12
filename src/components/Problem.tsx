import React from 'react';
import { Container, SectionTitle } from './ui';
import { motion } from 'motion/react';
import { Shield, Briefcase, MessageSquare, MapPin } from 'lucide-react';

export default function Problem() {
  const cards = [
    { icon: <Shield className="w-8 h-8 text-blue-400" />, title: 'Доверие', desc: 'Убедите клиента в надёжности.' },
    { icon: <Briefcase className="w-8 h-8 text-blue-400" />, title: 'Услуги', desc: 'Покажите, что вы предлагаете.' },
    { icon: <MessageSquare className="w-8 h-8 text-blue-400" />, title: 'Заявки', desc: 'Соберите контакты тёплых лидов.' },
    { icon: <MapPin className="w-8 h-8 text-blue-400" />, title: 'Контакты', desc: 'Дайте удобный путь для связи.' },
  ];

  return (
    <Container id="problem" className="bg-onyx-950 border-y border-onyx-800 relative overflow-hidden py-20 md:py-32">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_left,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent pointer-events-none -translate-y-1/2 blur-[80px]" />
      <div className="absolute top-0 right-0 w-[600px] h-full bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none blur-[100px]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <SectionTitle subtitle="Бизнесу нужен сайт" className="max-w-3xl">Вы теряете клиентов, если бизнесу негде вызвать доверие</SectionTitle>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="text-lg text-neutral-300 font-sans leading-relaxed font-light space-y-6">
            <p>
              Вам нужен сайт для доверия, заявок и роста бизнеса. Клиент может увидеть вас в рекламе, соцсетях, на картах или по рекомендации — но перед обращением ему нужно быстро понять: кто вы, что предлагаете, почему вам можно доверять и как с вами связаться.
            </p>
            <p>
              Сайт собирает всё это в одном месте: услуги, преимущества, отзывы, контакты, форму заявки и понятный путь к покупке.
            </p>
            <p className="text-white font-medium border-l-2 border-blue-500 pl-4 py-1">
              Без сайта часть клиентов просто уходит к тем, у кого всё выглядит понятнее, надёжнее и удобнее.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-onyx-900/50 border border-onyx-800 p-6 clip-diagonal hover:border-blue-500/30 transition-colors duration-300 group"
              >
                <div className="mb-4 bg-onyx-800/50 w-16 h-16 flex items-center justify-center clip-diagonal group-hover:bg-blue-900/20 transition-colors">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-neutral-400">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
