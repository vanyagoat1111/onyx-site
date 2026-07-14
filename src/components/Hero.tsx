import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Rocket, Star, MousePointerClick } from 'lucide-react';
import { Button } from './ui';
import { BOT_LINK } from '../lib/leads';
import LeadFormModal from './LeadFormModal';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section id="home" className="relative flex flex-col justify-center pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
      {/* Atmosphere: restrained, single light source */}
      <div className="absolute inset-0 dot-grid [mask-image:radial-gradient(ellipse_70%_60%_at_30%_20%,black,transparent)] pointer-events-none" />
      <div className="absolute -top-[30%] -left-[15%] w-[65vw] h-[65vw] rounded-full bg-cobalt/[0.09] blur-[140px] pointer-events-none" />
      <div className="absolute top-[10%] right-[-20%] w-[45vw] h-[45vw] rounded-full bg-cobalt/[0.05] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-5 sm:px-6 md:px-12">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 xl:gap-20 items-center">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="flex items-center gap-3 mb-5 md:mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-cobalt animate-pulse-dot" />
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-cobalt-soft">Веб-студия ONYX · сайты для бизнеса</span>
          </motion.div>

          <h1 className="font-display font-bold text-[2.1rem] sm:text-5xl lg:text-[3.6rem] xl:text-[4.2rem] leading-[1.06] tracking-tight text-white mb-8">
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
                0 рублей<span className="text-white">.</span>
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
              <Button className="min-h-[56px] px-9" onClick={() => setFormOpen(true)}>
                Начать разработку
              </Button>
              <span className="text-[11px] text-fog/70 text-center font-mono tracking-wide">Без скрытой оплаты за разработку</span>
            </div>
            <div className="flex flex-col gap-2">
              {/* Ведёт в Telegram-бота ONYX. */}
              <Button variant="outline" className="min-h-[56px] px-9" onClick={() => window.open(BOT_LINK, '_blank')}>
                Бесплатный аудит вашего сайта
              </Button>
              <span className="text-[11px] text-fog/70 text-center font-mono tracking-wide max-w-[280px] mx-auto">Если у вас уже есть сайт, укажем на слабые места и расскажем, что усилить.</span>
            </div>
          </motion.div>
        </div>

        {/* Infographic: как устроена модель ONYX */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="hidden lg:block relative"
        >
          <div className="absolute -inset-8 rounded-full bg-cobalt/[0.06] blur-[100px] pointer-events-none" />
          <div className="relative rounded-[28px] border border-white/[0.09] bg-ink-2/60 backdrop-blur-sm p-7 xl:p-8 overflow-hidden">
            <div className="absolute inset-0 dot-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)] pointer-events-none" />

            <div className="relative flex items-center gap-3 mb-7">
              <MousePointerClick className="w-4 h-4 text-cobalt-soft" />
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-fog">Как устроена модель ONYX</span>
            </div>

            <div className="relative grid grid-cols-2 gap-3 mb-6">
              {[
                { value: '0 ₽', label: 'Стоимость разработки' },
                { value: '2–3 дня', label: 'До первой версии сайта' },
                { value: '40 мин', label: 'Ответ на заявку' },
                { value: '150+', label: 'Запущенных сайтов' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.65 + i * 0.08, ease }}
                  className="rounded-2xl border border-white/[0.07] bg-ink/50 p-4"
                >
                  <div className="font-display font-bold text-2xl xl:text-[1.75rem] text-white tracking-tight">{stat.value}</div>
                  <div className="text-[11px] font-body text-fog leading-snug mt-1.5">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="relative space-y-3 pt-6 border-t border-white/[0.07]">
              {[
                { icon: Rocket, text: 'Показываем сайт, вы утверждаете направление' },
                { icon: Star, text: 'Запускаем на домене и подключаем заявки' },
              ].map((row, i) => (
                <motion.div
                  key={row.text}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.95 + i * 0.1, ease }}
                  className="flex items-center gap-3"
                >
                  <span className="w-8 h-8 rounded-full bg-cobalt/10 border border-cobalt/25 flex items-center justify-center shrink-0">
                    <row.icon className="w-3.5 h-3.5 text-cobalt-soft" />
                  </span>
                  <span className="text-[13px] font-body text-bone/85 leading-snug">{row.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        </div>
      </div>

      <LeadFormModal open={formOpen} onClose={() => setFormOpen(false)} />
    </section>
  );
}
