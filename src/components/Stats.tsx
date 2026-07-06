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
 <Container className="bg-obsidian-canvas py-16 md:py-32 relative z-10 overflow-hidden">
 
 
 
 <div className="max-w-4xl max-w-full relative z-20">
 <SectionTitle
 subtitle="Цифры доверия"
 className="text-left !mb-16 md:!mb-24"
 >
 Вместо красивых слов предлагаем вам взглянуть на <span className="text-metric-green">цифры</span>
 </SectionTitle>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 xl:gap-6 relative z-20">
 {stats.map((stat, i) => (
 <div key={i} className="flex flex-col gap-4 p-6 border border-ash-stroke bg-transparent rounded-sm">
 
 
 <div className="text-heading tracking-heading text-bone">
 {stat.value}
 </div>
 
 <p className="text-warm-granite font-sans leading-body text-body">
 {stat.label}
 </p>
 </div>
 ))}
 </div>
 </Container>
 );
}
