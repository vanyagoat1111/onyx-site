import React from 'react';
import { Container, SectionTitle } from './ui';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export default function TasksWeSolve() {
  const tasks = [
    {
      title: "Генерация целевых лидов",
      desc: "Настроим формы захвата, квизы и интеграцию с CRM. Вы получаете готовые заявки, а не просто клики."
    },
    {
      title: "Презентация услуг",
      desc: "Упакуем ваш продукт так, чтобы клиенту захотелось купить. Выделим смыслы, напишем продающие тексты и сделаем современный дизайн."
    },
    {
      title: "Автоматизация рутины",
      desc: "Ответы на частые вопросы (FAQ), онлайн-запись, прием платежей. Сайт забирает на себя часть работы менеджеров."
    },
    {
      title: "Повышение доверия",
      desc: "Профессиональный сайт с отзывами, кейсами и информацией о компании повышает лояльность и статусность бизнеса."
    }
  ];

  return (
    <Container id="tasks" className="bg-onyx-950 py-16 md:py-32 relative">
      <SectionTitle subtitle="Наши компетенции">
        Какие задачи бизнеса <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-md">решает ONYX?</span>
      </SectionTitle>

      <div className="grid md:grid-cols-2 gap-8 relative z-10">
        {tasks.map((task, i) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
            key={i}
            className="flex gap-6 items-start p-8 bg-onyx-900/50 border border-onyx-800 clip-diagonal hover:bg-onyx-900 transition-colors"
          >
            <div className="mt-1">
              <CheckCircle2 className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h4 className="text-xl font-bold uppercase tracking-tight text-white mb-3">
                {task.title}
              </h4>
              <p className="text-neutral-400 font-sans leading-relaxed">
                {task.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Container>
  );
}
