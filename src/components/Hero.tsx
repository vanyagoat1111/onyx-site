import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui';
import { ArrowDownRight } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

function CostBar({ label, value, width, accent = false, delay = 0 }: { label: string, value: string, width: string, accent?: boolean, delay?: number }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2 gap-4">
        <span className="text-[13px] font-body text-fog">{label}</span>
        <span className={`font-mono text-[13px] font-medium whitespace-nowrap ${accent ? 'text-cobalt-soft' : 'text-bone'}`}>{value}</span>
      </div>
      <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay, ease }}
          className={`h-full rounded-full ${accent ? 'bg-gradient-to-r from-cobalt to-cobalt-soft' : 'bg-white/25'}`}
        />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-svh flex flex-col justify-center pt-32 pb-0 overflow-hidden">
      {/* Atmosphere: restrained, single light source */}
      <div className="absolute inset-0 dot-grid [mask-image:radial-gradient(ellipse_70%_60%_at_30%_20%,black,transparent)] pointer-events-none" />
      <div className="absolute -top-[30%] -left-[15%] w-[65vw] h-[65vw] rounded-full bg-cobalt/[0.09] blur-[140px] pointer-events-none" />
      <div className="absolute top-[10%] right-[-20%] w-[45vw] h-[45vw] rounded-full bg-cobalt/[0.05] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-5 sm:px-6 md:px-12 flex-grow flex items-center">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-20 items-center w-full py-10">
          {/* ── Left: statement ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-cobalt animate-pulse-dot" />
              <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-fog">Веб-студия ONYX · сайты для бизнеса</span>
            </motion.div>

            <h1 className="font-display font-bold text-[2.1rem] sm:text-5xl lg:text-[3.6rem] xl:text-[4.2rem] leading-[1.06] tracking-tight text-bone mb-8">
              {['Сайт для', 'бизнеса за'].map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-cobalt"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.34, ease }}
                >
                  0 рублей<span className="text-bone">.</span>
                </motion.span>
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease }}
              className="max-w-xl space-y-4 mb-10"
            >
              <p className="text-base md:text-lg font-body text-bone/90 leading-relaxed">
                Создадим сайт, который вызывает доверие, показывает ваши услуги и помогает получать заявки — без оплаты разработки.
              </p>
              <p className="text-[15px] font-body text-fog leading-relaxed">
                Вы оплачиваете только запуск, размещение, техническое сопровождение и дополнительные функции, если они нужны вашему бизнесу. Сначала показываем предварительную версию — если направление подходит, запускаем сайт на домене.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.62, ease }}
              className="flex flex-col sm:flex-row gap-4 sm:items-start"
            >
              <div className="flex flex-col gap-2">
                <Button className="min-h-[56px] px-9" onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}>
                  Начать разработку
                </Button>
                <span className="text-[11px] text-fog/70 text-center font-mono tracking-wide">Без скрытой оплаты за разработку</span>
              </div>
              <div className="flex flex-col gap-2">
                {/* Ведёт в Telegram-бота ONYX. Если появится отдельная ссылка на аудит — заменить URL здесь. */}
                <Button variant="outline" className="min-h-[56px] px-9" onClick={() => window.open('https://t.me/onyxwebsites_bot', '_blank')}>
                  Бесплатный аудит вашего сайта
                </Button>
                <span className="text-[11px] text-fog/70 text-center font-mono tracking-wide max-w-[280px] mx-auto">Если у вас уже есть сайт, укажем на слабые места и расскажем, что усилить.</span>
              </div>
            </motion.div>
          </div>

          {/* ── Right: launch economics infographic ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease }}
            className="relative"
          >
            <div className="absolute -inset-px rounded-[28px] bg-gradient-to-b from-white/15 via-white/[0.06] to-transparent pointer-events-none" />
            <div className="relative rounded-[28px] bg-ink-2/90 backdrop-blur-xl p-7 md:p-9">
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-fog">Экономика запуска</span>
                <span className="flex items-center gap-2 font-mono text-[10px] text-cobalt-soft">
                  <span className="w-1.5 h-1.5 rounded-full bg-cobalt animate-pulse-dot" /> сравнение
                </span>
              </div>

              <div className="space-y-6">
                <CostBar label="Обычная студия — разработка" value="60 000–150 000 ₽" width="100%" delay={0.6} />
                <CostBar label="ONYX — разработка" value="0 ₽" width="2.5%" accent delay={0.8} />
                <CostBar label="ONYX — запуск под ключ" value="от 5 990 ₽" width="9%" accent delay={0.95} />
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
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 + i * 0.12, ease }}
                  >
                    <div className="font-display font-semibold text-xl md:text-2xl text-bone mb-1">{s.v}</div>
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
          </motion.div>
        </div>
      </div>

      {/* ── Fact strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="relative z-10 border-t border-white/[0.08] mt-6"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4">
          {[
            { k: 'Разработка', v: '0 ₽' },
            { k: 'Запуск', v: 'от 5 990 ₽' },
            { k: 'Сопровождение', v: 'от 1 990 ₽/мес' },
            { k: 'Старт', v: 'за 2–3 дня' },
          ].map((f, i) => (
            <div key={i} className={`py-5 md:py-6 flex flex-col gap-1 ${i !== 0 ? 'lg:border-l lg:border-white/[0.08] lg:pl-8' : ''} ${i % 2 !== 0 ? 'border-l border-white/[0.08] pl-6 lg:pl-8' : ''}`}>
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-fog">{f.k}</span>
              <span className="font-display font-medium text-base md:text-lg text-bone">{f.v}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
