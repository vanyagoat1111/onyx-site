import React from 'react';
import { Container, SectionTitle } from './ui';
import { motion } from 'motion/react';
import { AlertCircle, TrendingDown, Clock, Users } from 'lucide-react';

export default function TheNeed() {
  const pains = [
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Пациенты уходят к конкурентам",
      desc: "Сайт не вызывает доверия. Люди видят сложный дизайн, не могут найти нужную услугу или врача, и уходят туда, где всё понятно и прозрачно."
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: "Регистратура перегружена",
      desc: "Вместо того чтобы уделять внимание пациентам в клинике, администраторы часами отвечают на одни и те же базовые вопросы по телефону."
    },
    {
      icon: <TrendingDown className="w-8 h-8 text-blue-500" />,
      title: "Реклама съедает бюджет",
      desc: "Трафик идет, клики оплачиваются, но заявок нет. Сайт работает как красивая визитка, но не конвертирует посетителей в реальные записи на прием."
    }
  ];

  return (
    <Container id="need" className="bg-onyx-950 py-16 md:py-32 relative">
      <SectionTitle subtitle="Потребность">
        Почему текущий маркетинг <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">теряет ваши деньги?</span>
      </SectionTitle>
      <div className="grid md:grid-cols-3 gap-8 relative z-10">
        {pains.map((pain, i) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            key={i}
            className="bg-onyx-900/50 border border-onyx-800 p-8 clip-diagonal hover:border-blue-500/50 transition-colors"
          >
            <div className="mb-6 bg-onyx-800/50 w-16 h-16 flex items-center justify-center clip-diagonal-inverted border border-onyx-700">
                {pain.icon}
            </div>
            <h4 className="text-xl font-bold uppercase tracking-tight text-white mb-4">
              {pain.title}
            </h4>
            <p className="text-neutral-400 font-sans leading-relaxed text-sm">
              {pain.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </Container>
  );
}
