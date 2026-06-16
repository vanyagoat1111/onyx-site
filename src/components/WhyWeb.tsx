import React from 'react';
import { Container, SectionTitle } from './ui';
import { Globe, Users, ShieldCheck, Zap, TrendingUp } from 'lucide-react';

export default function WhyWeb() {
  const benefits = [
    { icon: <ShieldCheck size={32} />, title: "Вызывает доверие к компании" },
    { icon: <Users size={32} />, title: "Привлекает новых клиентов" },
    { icon: <Globe size={32} />, title: "Презентует товары и услуги" },
    { icon: <Zap size={32} />, title: "Автоматизирует заявки" },
    { icon: <TrendingUp size={32} />, title: "Увеличивает продажи" },
  ];

  return (
    <Container id="benefits">
      <SectionTitle subtitle="Предложение решения">Зачем бизнесу<br/>веб-сайт?</SectionTitle>
      
      <div className="grid lg:grid-cols-2 gap-24">
        <div className="space-y-12">
          <p className="text-2xl md:text-3xl font-light leading-snug">
            Сегодня сайт — это не просто визитка. Это бескомпромиссный инструмент продаж, который работает на вас <span className="font-bold text-white">24/7/365</span>.
          </p>

          <div className="space-y-6">
            <h3 className="font-bold uppercase tracking-widest text-neutral-400">Доверие B2B и B2C сегментов</h3>
            <p className="text-neutral-400 leading-relaxed font-mono text-sm">
              В 2026 году социальные сети и мессенджеры стали перегруженным инфошумом. Наличие собственного брендированного веб-сайта — ключевой маркер надежности и стабильности вашей компании для клиентов.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="font-bold uppercase tracking-widest text-neutral-400">Автоматический прием заявок</h3>
            <p className="text-neutral-400 leading-relaxed font-mono text-sm">
              Сайт работает автономно. Интегрированные формы мгновенно перенаправляют структурированные лиды в ваши корпоративные чаты и CRM-системы без участия менеджера.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 border border-onyx-700 clip-diagonal pointer-events-none opacity-50"></div>
          <div className="bg-onyx-800 p-8 md:p-12 clip-diagonal h-full flex flex-col justify-center relative overflow-hidden group/card">
            <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2500&auto=format&fit=crop" alt="Server Data" className="absolute inset-0 w-full h-full object-cover grayscale opacity-10 group-hover/card:opacity-30 transition-opacity duration-700 mix-blend-screen pointer-events-none" referrerPolicy="no-referrer" />
            <div className="relative z-10">
              <h3 className="text-white font-bold uppercase tracking-widest mb-12 border-b border-onyx-700 pb-4">Сайт — это актив бизнеса. Профессиональный сайт помогает:</h3>
              <ul className="space-y-8">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-6 group">
                    <div className="text-neutral-500 group-hover:text-white transition-colors">{b.icon}</div>
                    <span className="font-bold uppercase tracking-wide group-hover:pl-2 transition-all">{b.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
