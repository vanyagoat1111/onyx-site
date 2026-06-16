import React from 'react';
import { Container, SectionTitle } from './ui';

const stages = [
  { num: '01', title: 'Анализ', desc: 'Погружаемся в ваш бизнес и определяем цели проекта.' },
  { num: '02', title: 'Проектирование', desc: 'Продумываем структуру и пользовательский сценарий.' },
  { num: '03', title: 'Дизайн', desc: 'Создаём современный интерфейс, который вызывает доверие.' },
  { num: '04', title: 'Разработка', desc: 'Собираем быстрый и технически надёжный сайт.' },
  { num: '05', title: 'Запуск', desc: 'Тестируем, подключаем домен и публикуем проект.' },
  { num: '06', title: 'Поддержка', desc: 'Обновляем и сопровождаем сайт после запуска.' },
];

export default function Stages() {
  return (
    <Container className="bg-onyx-800 border-y border-onyx-700">
      <SectionTitle subtitle="Процесс">Этапы<br/>Создания</SectionTitle>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
        {stages.map((st) => (
          <div key={st.num} className="relative group">
            <div className="absolute -top-10 left-0 text-[120px] font-bold text-onyx-900/40 z-0 select-none group-hover:text-onyx-700 transition-colors duration-500 font-mono tracking-tighter">
              {st.num}
            </div>
            <div className="relative z-10 pl-4 border-l-2 border-transparent group-hover:border-white transition-all pt-8">
              <h3 className="text-2xl font-bold uppercase tracking-widest mb-4">{st.title}</h3>
              <p className="text-neutral-400 font-sans leading-relaxed">{st.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
