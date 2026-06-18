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
    <Container id="benefits" className="relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-950/10 via-transparent to-transparent pointer-events-none" />
      <SectionTitle subtitle="Предложение решения">Зачем бизнесу<br/>веб-сайт?</SectionTitle>
      
      <div className="grid lg:grid-cols-2 gap-24 relative z-10">
        <div className="space-y-12">
          <p className="text-2xl md:text-3xl font-light leading-snug">
            Сегодня сайт — это не просто визитка. Это бескомпромиссный инструмент продаж, который работает на вас <span className="font-bold text-white">24/7/365</span>.
          </p>

          <div className="space-y-6">
            <h3 className="font-bold uppercase tracking-widest text-violet-500">Доверие B2B и B2C сегментов</h3>
            <p className="text-neutral-400 leading-relaxed font-mono text-sm">
              В 2026 году социальные сети и мессенджеры стали перегруженным инфошумом. Наличие собственного брендированного веб-сайта — ключевой маркер надежности и стабильности вашей компании для клиентов.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="font-bold uppercase tracking-widest text-violet-500">Автоматический прием заявок</h3>
            <p className="text-neutral-400 leading-relaxed font-mono text-sm">
              Сайт работает автономно. Интегрированные формы мгновенно перенаправляют структурированные лиды в ваши корпоративные чаты и CRM-системы без участия менеджера.
            </p>
          </div>
        </div>

        <div className="relative group/wrapper">
          <div className="absolute -inset-1 border border-onyx-700 group-hover/wrapper:border-violet-500/50 clip-diagonal pointer-events-none transition-colors duration-500"></div>
          <div className="bg-black p-10 md:p-16 h-full flex flex-col justify-center relative overflow-hidden group/card shadow-2xl border border-onyx-800">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-900/10 via-transparent to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <h3 className="text-white font-light text-2xl md:text-3xl mb-10 border-b border-onyx-800 pb-8 tracking-tight leading-snug">
                Сайт — это <span className="font-bold text-violet-500">актив бизнеса</span>.<br/>Профессиональный сайт помогает:
              </h3>
              <ul className="space-y-8">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-6 group">
                    <div className="w-12 h-12 flex items-center justify-center border border-onyx-800 bg-onyx-900/50 text-neutral-400 group-hover:text-violet-500 group-hover:border-violet-900/50 transition-all rounded-sm shrink-0">
                      {b.icon}
                    </div>
                    <span className="font-medium text-lg tracking-wide text-neutral-300 group-hover:text-white transition-colors">{b.title}</span>
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
