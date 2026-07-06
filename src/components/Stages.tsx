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
 <Container className="bg-obsidian-canvas py-24 relative z-10 overflow-hidden py-24 md:py-32">
 
 
 
 <SectionTitle subtitle="Процесс" className="!mb-24">Регламент<br/><span className="text-bone">Запуска</span></SectionTitle>
 
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
 <div className="absolute -top-20 -left-8 text-[180px] text-[#1d1a18] z-0 select-none transition-all duration-700 tracking-tighter">
 {st.num}
 </div>
 
 <div className="relative z-10 flex flex-col items-start pt-10">
 <div className="w-16 h-16 flex items-center justify-center bg-transparent border border-ash-stroke text-warm-granite rounded-sm group-hover/stage:border-[#eeeeee] group-hover/stage:text-bone group-hover/stage:bg-carbon-lift transition-all duration-200 mb-8 relative">
 
 <div className="relative z-10">{st.icon}</div>
 </div>
 
 <div className="border-l-[3px] border-ash-stroke group-hover/stage:border-[#eeeeee] pl-6 transition-colors duration-200">
 <h3 className="text-2xl md:text-heading tracking-heading mb-4 text-bone transition-colors">{st.title}</h3>
 <p className="text-warm-granite font-sans leading-body text-body group-hover/stage:text-bone transition-colors">{st.desc}</p>
 </div>
 </div>
 
 {/* Connection line for layout */}
 <div className="hidden lg:block absolute top-[5.5rem] left-[5.5rem] w-[calc(100%+2.5rem)] h-[1px] bg-carbon-lift -z-10 group-hover/stage:bg-[#3d3a39] transition-all duration-200" />
 </motion.div>
 ))}
 </div>
 </Container>
 );
}
