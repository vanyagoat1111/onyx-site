import React from 'react';
import { Container, SectionTitle, Reveal } from './ui';
import { Shield, Briefcase, MessageSquare, MapPin, Megaphone, Map, Share2, Users, ArrowDown } from 'lucide-react';

const points = [
  { icon: Shield, num: '01', title: 'Доверие', desc: 'Убедите клиента в надёжности ещё до первого звонка.' },
  { icon: Briefcase, num: '02', title: 'Услуги', desc: 'Покажите, что вы предлагаете, — понятно и структурно.' },
  { icon: MessageSquare, num: '03', title: 'Заявки', desc: 'Соберите контакты тёплых лидов через удобную форму.' },
  { icon: MapPin, num: '04', title: 'Контакты', desc: 'Дайте удобный путь для связи: звонок, мессенджер, карта.' },
];

const sources = [
  { icon: Megaphone, label: 'Реклама' },
  { icon: Map, label: 'Карты' },
  { icon: Share2, label: 'Соцсети' },
  { icon: Users, label: 'Рекомендации' },
];

export default function Problem() {
  return (
    <Container id="problem" className="relative border-t border-white/[0.06]">
      <SectionTitle index="01" subtitle="Зачем бизнесу сайт" className="max-w-4xl">
        Вы теряете клиентов, если бизнесу негде вызвать доверие
      </SectionTitle>

      <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-start mb-20 lg:mb-28">
        <Reveal className="space-y-6 text-[15px] md:text-base font-body text-fog leading-relaxed">
          <p>
            Вам нужен сайт для доверия, заявок и роста бизнеса. Клиент может увидеть вас в рекламе, соцсетях, на картах или по рекомендации — но перед обращением ему нужно быстро понять: кто вы, что предлагаете, почему вам можно доверять и как с вами связаться.
          </p>
          <p>
            Сайт собирает всё это в одном месте: услуги, преимущества, отзывы, контакты, форму заявки и понятный путь к покупке.
          </p>
          <p className="text-bone font-medium border-l-2 border-cobalt pl-5 py-1 text-base md:text-lg">
            Без сайта часть клиентов просто уходит к тем, у кого всё выглядит понятнее, надёжнее и удобнее.
          </p>
        </Reveal>

        <div>
          {points.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="group flex items-start gap-5 py-6 border-b border-white/[0.08] hover:border-cobalt/40 transition-colors duration-500">
                <span className="font-mono text-xs text-cobalt-soft pt-1.5 shrink-0">{p.num}</span>
                <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-cobalt/15 group-hover:border-cobalt/40 transition-all duration-500">
                  <p.icon className="w-5 h-5 text-cobalt-soft" />
                </div>
                <div>
                  <h3 className="font-display font-medium text-lg text-white mb-1">{p.title}</h3>
                  <p className="text-sm font-body text-fog leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── Client path infographic ── */}
      <Reveal>
        <div className="relative rounded-[28px] border border-white/[0.08] bg-ink-2/60 p-7 md:p-12 overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] pointer-events-none" />
          <p className="relative font-mono text-[10px] tracking-[0.25em] uppercase text-fog mb-10 text-center">Как клиент приходит к вам</p>

          <div className="relative grid md:grid-cols-[1fr_auto_1.2fr_auto_1fr] gap-6 md:gap-4 items-center">
            {/* Sources */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
              {sources.map((s, i) => (
                <div key={i} className="flex items-center gap-3 rounded-full border border-white/10 bg-ink/60 px-4 py-2.5">
                  <s.icon className="w-4 h-4 text-fog shrink-0" />
                  <span className="text-[13px] font-body text-bone/85">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Connector */}
            <div className="hidden md:block w-16 lg:w-24">
              <svg viewBox="0 0 100 120" className="w-full" fill="none">
                {[15, 45, 75, 105].map((y, i) => (
                  <path key={i} d={`M0 ${y} C 50 ${y}, 50 60, 100 60`} stroke="rgba(138,166,255,0.35)" strokeWidth="1.5" strokeDasharray="4 6" className="animate-dash-flow" />
                ))}
              </svg>
            </div>
            <div className="md:hidden flex justify-center"><ArrowDown className="w-5 h-5 text-cobalt-soft" /></div>

            {/* Site node */}
            <div className="relative rounded-3xl border border-cobalt/40 bg-cobalt/[0.08] p-6 text-center shadow-[0_0_60px_rgba(78,124,255,0.12)]">
              <div className="font-display font-semibold text-lg text-bone mb-3">Ваш сайт</div>
              <div className="flex flex-wrap justify-center gap-2">
                {['доверие', 'услуги', 'отзывы', 'форма заявки'].map((t, i) => (
                  <span key={i} className="text-[11px] font-body text-cobalt-soft bg-cobalt/10 border border-cobalt/25 rounded-full px-3 py-1">{t}</span>
                ))}
              </div>
            </div>

            {/* Connector */}
            <div className="hidden md:block w-16 lg:w-24">
              <svg viewBox="0 0 100 40" className="w-full" fill="none">
                <path d="M0 20 L100 20" stroke="rgba(138,166,255,0.35)" strokeWidth="1.5" strokeDasharray="4 6" className="animate-dash-flow" />
              </svg>
            </div>
            <div className="md:hidden flex justify-center"><ArrowDown className="w-5 h-5 text-cobalt-soft" /></div>

            {/* Result */}
            <div className="rounded-3xl border border-white/10 bg-ink/70 p-6 text-center">
              <div className="font-display font-semibold text-2xl text-cobalt mb-1.5">Заявка</div>
              <p className="text-[12px] font-body text-fog leading-snug">звонок, сообщение или запись — туда, где вам удобно</p>
            </div>
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
