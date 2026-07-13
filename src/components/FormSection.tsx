import React from 'react';
import { Container, Reveal } from './ui';
import { Search, ArrowUpRight } from 'lucide-react';
import { BOT_LINK } from '../lib/leads';
import { LeadForm } from './LeadForm';

export default function FormSection() {
  return (
    <Container id="contact-form" className="relative scroll-mt-20 !py-24 md:!py-32">
      <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16 items-stretch">
        {/* ── Аудит: замена блока «Готовы начать проект?» ── */}
        <Reveal className="flex">
          <div className="relative w-full rounded-[28px] border border-white/[0.09] bg-ink-2/60 overflow-hidden p-8 md:p-10 flex flex-col justify-between">
            <div className="absolute inset-0 dot-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_75%)] pointer-events-none" />
            <div className="absolute -top-1/3 -left-1/4 w-2/3 aspect-square rounded-full bg-cobalt/[0.08] blur-[110px] pointer-events-none" />

            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-10 bg-white/20" />
                <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-fog">Уже есть сайт?</span>
              </div>
              <h2 className="heading-glow font-display font-semibold text-2xl md:text-[2rem] leading-[1.15] tracking-tight mb-5 [text-wrap:balance]">
                Расскажем, как должен выглядеть ваш сайт
              </h2>
              <p className="text-[15px] font-body text-fog leading-relaxed max-w-md">
                Если у вас уже есть сайт, проведём бесплатный аудит через сервис pr-cy, выявим слабые места и расскажем, как их улучшить. Нажмите кнопку, заполните анкету и создайте личный кабинет в боте — после этого пришлём готовый аудит.
              </p>
            </div>

            <div className="relative mt-10">
              <button
                onClick={() => window.open(BOT_LINK, '_blank')}
                className="group inline-flex items-center gap-3 rounded-full border border-cobalt/40 bg-cobalt/10 text-bone font-body font-semibold text-sm px-7 py-4 hover:bg-cobalt hover:text-white transition-all duration-300"
              >
                <Search className="w-4 h-4 text-cobalt-soft group-hover:text-white transition-colors" />
                Получить бесплатный аудит
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
              </button>
            </div>
          </div>
        </Reveal>

        {/* ── Форма заявки ── */}
        <Reveal delay={0.1} className="flex">
          <div className="relative w-full rounded-[28px] border border-white/[0.09] bg-ink-2/70 overflow-hidden p-8 md:p-10">
            <div className="absolute -top-1/2 right-0 w-2/3 aspect-square rounded-full bg-cobalt/[0.12] blur-[120px] pointer-events-none" />
            <LeadForm />
          </div>
        </Reveal>
      </div>
    </Container>
  );
}
