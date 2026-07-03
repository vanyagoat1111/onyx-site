import React from 'react';
import { Container, SectionTitle } from './ui';

export default function Stats() {
  const stats = [
    { value: "24/7", label: "техническая поддержка и мониторинг вашего сайта" },
    { value: "2 дня", label: "средний срок разработки сайта" },
    { value: "100%", label: "адаптация под мобильные устройства" },
    { value: "0 рублей", label: "стоит разработка сайта" },
    { value: "12 месяцев", label: "в году бесперебойная работа серверов и хостинга" },
  ];

  return (
    <Container className="bg-onyx-950 py-16 md:py-32 border-t border-onyx-800/30 relative z-10 overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[400px] bg-blue-600/5 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[300px] bg-indigo-600/5 blur-[120px] pointer-events-none -z-10" />
      
      <div className="max-w-4xl max-w-full relative z-20">
        <SectionTitle
          subtitle="Цифры доверия"
          className="text-left !mb-16 md:!mb-24"
        >
          Вместо красивых слов предлагаем вам взглянуть на <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">цифры</span>
        </SectionTitle>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 xl:gap-6 relative z-20">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col gap-4 group relative p-6 border border-onyx-800/50 hover:border-blue-500/30 bg-onyx-900/30 hover:bg-onyx-900/80 backdrop-blur-sm transition-all duration-500 clip-diagonal">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="text-4xl md:text-5xl font-black font-heading tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-400 group-hover:from-blue-400 group-hover:to-blue-600 transition-all duration-500 drop-shadow-sm">
              {stat.value}
            </div>
            
            <p className="text-sm md:text-sm font-sans text-neutral-400 leading-relaxed font-medium group-hover:text-neutral-300 transition-colors">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
