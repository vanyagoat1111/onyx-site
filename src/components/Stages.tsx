import React from 'react';
import { Container, SectionTitle } from './ui';
import { Search, PenTool, Layout, Code2, Rocket, Wrench } from 'lucide-react';

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
    <Container className="bg-[#0c1c4e] border-y border-onyx-700 relative z-10 overflow-hidden ">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none -z-10" />
      <SectionTitle subtitle="Процесс">Регламент<br/>Запуска</SectionTitle>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12 mt-12">
        {stages.map((st) => (
          <div key={st.num} className="relative group/stage">
            <div className="absolute -top-16 -left-6 text-[180px] font-black text-onyx-800 z-0 select-none group-hover/stage:text-transparent group-hover/stage:bg-clip-text group-hover/stage:bg-gradient-to-b group-hover/stage:from-blue-600/20 group-hover/stage:to-transparent transition-all duration-700 font-mono tracking-tight drop-shadow-none ">
              {st.num}
            </div>
            
            <div className="relative z-10 flex flex-col items-start pt-10">
              <div className="w-16 h-16 flex items-center justify-center bg-onyx-900 border border-onyx-700 text-neutral-500 group-hover/stage:border-blue-500 group-hover/stage:text-blue-500 group-hover/stage:shadow-[0_0_30px_rgba(59,130,246,0.4)] group-hover/stage:bg-onyx-800 transition-all duration-500 mb-8 clip-diagonal-inverted relative">
                <div className="absolute inset-0 bg-blue-600/10 blur-md opacity-0 group-hover/stage:opacity-100 transition-opacity"></div>
                <div className="relative z-10">{st.icon}</div>
              </div>
              <div className="border-l-[3px] border-onyx-700 group-hover/stage:border-blue-400 pl-6 transition-colors duration-500 shadow-[-2px_0_10px_rgba(147,197,253,0)] group-hover/stage:shadow-[-2px_0_10px_rgba(147,197,253,0.5)]">
                <h3 className="text-3xl font-heading font-black tracking-tight mb-4 text-white group-hover/stage:text-blue-500 transition-colors uppercase ">{st.title}</h3>
                <p className="text-neutral-400 font-sans leading-relaxed text-sm md:text-base group-hover/stage:text-neutral-200 transition-colors font-light">{st.desc}</p>
              </div>
            </div>
            
            {/* Connection line for layout */}
            <div className="hidden lg:block absolute top-[5.5rem] left-[5rem] w-[calc(100%+3rem)] h-[2px] bg-onyx-700 -z-10 group-hover/stage:bg-gradient-to-r group-hover/stage:from-blue-600 group-hover/stage:to-transparent group-hover/stage:shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all" />
          </div>
        ))}
      </div>
    </Container>
  );
}
