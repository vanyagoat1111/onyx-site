import React from 'react';
import { motion } from 'motion/react';
import { Reveal } from './ui';
import { ArrowDownRight } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

function CostBar({ label, value, width, accent = false, danger = false, delay = 0 }: { label: string, value: string, width: string, accent?: boolean, danger?: boolean, delay?: number }) {
  const valueColor = danger ? 'text-danger-soft' : accent ? 'text-cobalt-soft' : 'text-bone';
  const barColor = danger ? 'bg-gradient-to-r from-danger to-danger-soft' : accent ? 'bg-gradient-to-r from-cobalt to-cobalt-soft' : 'bg-white/25';
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2 gap-4">
        <span className="text-[13px] font-body text-fog">{label}</span>
        <span className={`font-mono text-[13px] font-semibold whitespace-nowrap ${valueColor}`}>{value}</span>
      </div>
      <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay, ease }}
          className={`h-full rounded-full ${barColor}`}
        />
      </div>
    </div>
  );
}

const facts = [
  { k: 'Разработка', v: '0 ₽' },
  { k: 'Запуск', v: 'от 5 990 ₽' },
  { k: 'Сопровождение', v: 'от 1 990 ₽/мес' },
  { k: 'Старт', v: 'за 2–3 дня' },
];

export default function LaunchEconomics() {
  return (
    <div id="economics" className="relative z-10 mb-16 md:mb-20 scroll-mt-24">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-stretch">
        {/* ── Инфографика 1: сравнение стоимости ── */}
        <Reveal className="flex">
          <div className="relative w-full">
            <div className="absolute -inset-px rounded-[28px] bg-gradient-to-b from-white/15 via-white/[0.06] to-transparent pointer-events-none" />
            <div className="relative h-full rounded-[28px] bg-ink-2/90 backdrop-blur-xl p-7 md:p-9">
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-cobalt-soft">Экономика запуска</span>
                <span className="flex items-center gap-2 font-mono text-[10px] text-cobalt-soft">
                  <span className="w-1.5 h-1.5 rounded-full bg-cobalt animate-pulse-dot" /> сравнение
                </span>
              </div>

              <div className="space-y-6">
                <CostBar label="Обычная студия — разработка" value="60 000–150 000 ₽" width="100%" delay={0.1} danger />
                <CostBar label="ONYX — разработка" value="0 ₽" width="2.5%" accent delay={0.3} />
                <CostBar label="ONYX — запуск под ключ" value="от 5 990 ₽" width="9%" accent delay={0.45} />
              </div>

              <div className="my-8 h-px bg-white/[0.08]" />

              <div className="grid grid-cols-3 gap-4">
                {[
                  { v: '0 ₽', l: 'за разработку' },
                  { v: '2–3', l: 'дня до запуска' },
                  { v: '+40%', l: 'конверсии в кейсе' },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.12, ease }}
                  >
                    <div className="font-display font-semibold text-xl md:text-2xl text-white mb-1">{s.v}</div>
                    <div className="text-[11px] font-body text-fog leading-snug">{s.l}</div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-3 rounded-2xl bg-cobalt/[0.08] border border-cobalt/20 px-4 py-3">
                <ArrowDownRight className="w-4 h-4 text-cobalt-soft shrink-0" />
                <p className="text-[12px] font-body text-bone/85 leading-snug">
                  Стартовый барьер убран: платите только за то, что нужно для работы сайта.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Инфографика 2: ключевые цифры ── */}
        <Reveal delay={0.12} className="flex">
          <div className="relative w-full rounded-[28px] border border-white/[0.08] bg-ink-2/50 p-7 md:p-9 flex flex-col justify-between overflow-hidden">
            <div className="absolute -top-1/3 -right-1/4 w-2/3 aspect-square rounded-full bg-cobalt/[0.07] blur-[110px] pointer-events-none" />

            <div className="relative">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-cobalt-soft">Что вы платите</span>
              <h3 className="heading-glow font-display font-semibold text-xl md:text-2xl leading-tight tracking-tight mt-4 mb-8 [text-wrap:balance]">
                Прозрачно: разработка — 0 ₽, остальное по мере необходимости
              </h3>
            </div>

            <div className="relative grid grid-cols-2 gap-px bg-white/[0.07] rounded-2xl overflow-hidden border border-white/[0.07]">
              {facts.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease }}
                  className="bg-ink-2/90 px-5 py-6 flex flex-col gap-1.5"
                >
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-fog">{f.k}</span>
                  <span className={`font-display font-semibold text-lg md:text-xl ${i === 0 ? 'text-success-soft' : 'text-white'}`}>{f.v}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
