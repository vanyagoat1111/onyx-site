import React from 'react';
import { Container, SectionTitle, Reveal } from './ui';
import { Wallet, Settings, Clock, Blocks, X, Check } from 'lucide-react';

const modelSteps = [
  { icon: Wallet, title: 'Разработка сайта', value: '0 ₽', note: 'структура, дизайн, сборка, форма заявки', free: true },
  { icon: Settings, title: 'Запуск и настройка', value: 'Оплачиваются', note: 'домен, хостинг, SSL, публикация' },
  { icon: Clock, title: 'Сопровождение сайта', value: 'Оплачивается ежемесячно', note: 'работа сайта, правки, поддержка' },
  { icon: Blocks, title: 'Дополнительные функции', value: 'По необходимости', note: 'CRM, каталог, калькулятор и другое' },
];

const compare = [
  { k: 'Оплата до запуска', usual: 'десятки–сотни тысяч ₽', onyx: '0 ₽' },
  { k: 'Срок старта', usual: 'недели ожидания', onyx: '2–3 дня' },
  { k: 'После запуска', usual: 'сайт остаётся на вас', onyx: 'сопровождение включено' },
  { k: 'Риск на старте', usual: 'бюджет до первой заявки', onyx: 'минимальные вложения' },
];

export default function Benefits() {
  return (
    <Container className="relative border-t border-white/[0.06]">
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-cobalt/[0.05] blur-[120px] pointer-events-none" />

      <SectionTitle index="02" subtitle="Бизнес-модель" className="max-w-4xl relative z-10">
        ONYX запускает сайт <span className="text-cobalt">без оплаты разработки</span>
      </SectionTitle>

      <Reveal className="max-w-3xl space-y-5 text-[15px] md:text-base font-body text-fog leading-relaxed mb-16 relative z-10">
        <p>
          Обычная разработка сайта может стоить десятки и сотни тысяч рублей ещё до того, как бизнес получил с него первую заявку.
        </p>
        <p>
          Мы работаем по другой модели: создаём сайт без оплаты разработки, чтобы бизнес мог быстрее выйти в интернет, проверить спрос и начать получать обращения.
        </p>
        <p className="text-bone/90 font-medium">
          Вы не тратите большой бюджет на старт. Вместо этого оплачиваете только то, что нужно для работы и развития сайта: запуск, домен, сопровождение и дополнительные опции, если они понадобятся.
        </p>
      </Reveal>

      {/* ── Payment model stepper ── */}
      <div className="relative z-10 mb-16">
        <div className="hidden lg:block absolute top-[26px] left-[12%] right-[12%] h-px bg-gradient-to-r from-cobalt/50 via-white/15 to-white/15" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {modelSteps.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className={`relative h-full rounded-[24px] border p-6 transition-all duration-500 group hover:-translate-y-1.5 ${s.free ? 'border-cobalt/50 bg-cobalt/[0.07] shadow-[0_0_50px_rgba(78,124,255,0.1)]' : 'border-white/[0.08] bg-ink-2/70 hover:border-white/20'}`}>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-[52px] h-[52px] rounded-full flex items-center justify-center border ${s.free ? 'bg-cobalt border-cobalt text-white' : 'bg-ink border-white/15 text-cobalt-soft'}`}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[11px] text-fog">0{i + 1}</span>
                </div>
                <h4 className="font-body font-semibold text-sm text-fog uppercase tracking-wider mb-2">{s.title}</h4>
                <div className={`font-display font-semibold text-xl md:text-2xl mb-3 ${s.free ? 'text-cobalt-soft' : 'text-bone'}`}>{s.value}</div>
                <p className="text-[12px] font-body text-fog/80 leading-snug">{s.note}</p>
                {s.free && (
                  <span className="absolute -top-3 left-6 rounded-full bg-cobalt text-white text-[10px] font-mono tracking-[0.2em] uppercase px-3 py-1">бесплатно</span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── Comparison ── */}
      <Reveal>
        <div className="relative z-10 rounded-[28px] border border-white/[0.08] overflow-hidden">
          <div className="grid md:grid-cols-[1.2fr_1fr_1fr] text-sm font-body">
            <div className="hidden md:block px-7 py-5 border-b border-white/[0.08] font-mono text-[10px] tracking-[0.25em] uppercase text-fog">Сравнение</div>
            <div className="hidden md:block px-7 py-5 border-b border-l border-danger/20 font-mono text-[10px] tracking-[0.25em] uppercase text-danger-soft bg-danger/[0.05]">Обычная студия</div>
            <div className="hidden md:block px-7 py-5 border-b border-l border-cobalt/25 font-mono text-[10px] tracking-[0.25em] uppercase text-cobalt-soft bg-cobalt/[0.06]">ONYX</div>

            {compare.map((row, i) => (
              <React.Fragment key={i}>
                <div className={`px-7 pt-5 pb-2 md:py-5 text-bone font-medium ${i !== compare.length - 1 ? 'md:border-b md:border-white/[0.06]' : ''}`}>{row.k}</div>
                <div className={`px-7 py-2 md:py-5 md:border-l border-danger/15 bg-danger/[0.04] flex items-center gap-2.5 text-danger-soft ${i !== compare.length - 1 ? 'md:border-b md:border-b-white/[0.06]' : ''}`}>
                  <X className="w-4 h-4 text-danger shrink-0" /> {row.usual}
                </div>
                <div className={`px-7 pb-5 pt-2 md:py-5 md:border-l border-cobalt/20 bg-cobalt/[0.05] flex items-center gap-2.5 text-bone ${i !== compare.length - 1 ? 'md:border-b md:border-b-white/[0.06] border-b border-b-white/[0.06]' : ''}`}>
                  <Check className="w-4 h-4 text-cobalt-soft shrink-0" /> {row.onyx}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
