import React from 'react';
import { Container, SectionTitle } from './ui';
import { Search, PenTool, Layout, Code2, Rocket, Wrench } from 'lucide-react';
import { motion } from 'motion/react';

const stages = [
  { num: '01', title: 'Анализ', desc: 'Погружаемся в ваш бизнес и определяем цели проекта.', icon: <Search className="w-8 h-8" /> },
  { num: '02', title: 'Проектирование', desc: 'Продумываем структуру и пользовательский сценарий.', icon: <PenTool className="w-8 h-8" /> },
  { num: '03', title: 'Дизайн', desc: 'Создаём современный интерфейс, который вызывает доверие.', icon: <Layout className="w-8 h-8" /> },
  { num: '04', title: 'Разработка', desc: 'Собираем быстрый и технически надёжный сайт.', icon: <Code2 className="w-8 h-8" /> },
  { num: '05', title: 'Запуск', desc: 'Тестируем, подключаем домен и публикуем проект.', icon: <Rocket className="w-8 h-8" /> },
  { num: '06', title: 'Поддержка', desc: 'Обновляем и сопровождаем сайт после запуска.', icon: <Wrench className="w-8 h-8" /> },
];

export default function Stages() {
  return (
    <Container className="bg-onyx-950 border-y border-onyx-800 relative z-10 overflow-hidden py-24 md:py-32">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      <SectionTitle subtitle="Процесс" className="!mb-24">Регламент<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Запуска</span></SectionTitle>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-28 gap-x-14 mt-16">
        {stages.map((st, i) => (
          <motion.div 
            key={st.num} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="relative group/stage"
          >
            <div className="absolute -top-20 -left-8 text-[180px] font-black text-onyx-800/50 z-0 select-none group-hover/stage:text-transparent group-hover/stage:bg-clip-text group-hover/stage:bg-gradient-to-b group-hover/stage:from-blue-600/20 group-hover/stage:to-transparent transition-all duration-700 font-mono tracking-tighter drop-shadow-none">
              {st.num}
            </div>
            
            <div className="relative z-10 flex flex-col items-start pt-10">
              <div className="w-16 h-16 flex items-center justify-center bg-onyx-900 border border-onyx-800 text-neutral-500 group-hover/stage:border-blue-500 group-hover/stage:text-white group-hover/stage:shadow-[0_0_30px_rgba(59,130,246,0.6)] group-hover/stage:bg-blue-600 transition-all duration-500 mb-8 clip-diagonal-inverted relative group-hover/stage:-translate-y-2">
                <div className="absolute inset-0 bg-white/20 blur-md opacity-0 group-hover/stage:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">{st.icon}</div>
              </div>
              
              <div className="border-l-[3px] border-onyx-800 group-hover/stage:border-blue-500 pl-6 transition-colors duration-500 shadow-[-2px_0_10px_rgba(147,197,253,0)] group-hover/stage:shadow-[-3px_0_15px_rgba(59,130,246,0.5)]">
                <h3 className="text-2xl md:text-3xl font-heading font-black tracking-tight mb-4 text-white group-hover/stage:text-blue-400 transition-colors uppercase drop-shadow-sm group-hover/stage:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">{st.title}</h3>
                <p className="text-neutral-400 font-sans leading-relaxed text-sm md:text-base group-hover/stage:text-neutral-200 transition-colors font-medium">{st.desc}</p>
              </div>
            </div>
            
            {/* Connection line for layout */}
            <div className="hidden lg:block absolute top-[5.5rem] left-[5.5rem] w-[calc(100%+2.5rem)] h-[1px] bg-onyx-800 -z-10 group-hover/stage:bg-gradient-to-r group-hover/stage:from-blue-500 group-hover/stage:to-transparent group-hover/stage:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-700" />
          </motion.div>
        ))}
      </div>
    </Container>
  );
}
