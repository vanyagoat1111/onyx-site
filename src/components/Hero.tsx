import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section id="home" className="relative flex flex-col justify-center pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
      {/* Atmosphere: restrained, single light source */}
      <div className="absolute inset-0 dot-grid [mask-image:radial-gradient(ellipse_70%_60%_at_30%_20%,black,transparent)] pointer-events-none" />
      <div className="absolute -top-[30%] -left-[15%] w-[65vw] h-[65vw] rounded-full bg-cobalt/[0.09] blur-[140px] pointer-events-none" />
      <div className="absolute top-[10%] right-[-20%] w-[45vw] h-[45vw] rounded-full bg-cobalt/[0.05] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-5 sm:px-6 md:px-12">
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
              <Button className="min-h-[56px] px-9" onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Начать разработку
              </Button>
              <span className="text-[11px] text-fog/70 text-center font-mono tracking-wide">Без скрытой оплаты за разработку</span>
            </div>
            <div className="flex flex-col gap-2">
              {/* Ведёт в Telegram-бота ONYX. */}
              <Button variant="outline" className="min-h-[56px] px-9" onClick={() => window.open('https://t.me/onyxwebsites_bot', '_blank')}>
                Бесплатный аудит вашего сайта
              </Button>
              <span className="text-[11px] text-fog/70 text-center font-mono tracking-wide max-w-[280px] mx-auto">Если у вас уже есть сайт, укажем на слабые места и расскажем, что усилить.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
