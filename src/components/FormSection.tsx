import React from 'react';
import { Container, Reveal } from './ui';
import { Check, Send } from 'lucide-react';

const topics = [
  'Чем занимается компания и кто ваши клиенты.',
  'Какую главную задачу должен решать сайт.',
  'Что у вас уже есть: логотип, фото, тексты или соцсети.',
];

export default function FormSection() {
  return (
    <Container id="contact-form" className="relative scroll-mt-20 !py-24 md:!py-36">
      <Reveal>
        <div className="relative rounded-[32px] border border-white/[0.09] bg-ink-2/70 overflow-hidden">
          {/* Atmosphere */}
          <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[80%] aspect-square rounded-full bg-cobalt/[0.14] blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 dot-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 px-6 py-14 md:px-16 md:py-20 text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="h-px w-10 bg-white/20" />
              <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-fog">Финальный шаг</span>
              <span className="h-px w-10 bg-white/20" />
            </div>

            <h2 className="font-display font-semibold text-[1.75rem] sm:text-4xl lg:text-[2.9rem] leading-[1.12] tracking-tight text-bone mb-6 [text-wrap:balance]">
              Расскажите, каким должен быть <span className="text-cobalt">ваш сайт</span>
            </h2>

            <p className="text-[15px] md:text-base font-body text-fog leading-relaxed mb-12 max-w-xl mx-auto">
              Напишите нам в Telegram. Мы зададим несколько вопросов о вашем бизнесе и предложим понятный план: какая структура нужна, какие функции помогут получать заявки и сколько будет стоить запуск.
            </p>

            <div className="rounded-[24px] border border-white/[0.09] bg-ink/70 backdrop-blur-md p-7 md:p-9 text-left mb-8">
              <h4 className="font-mono text-[10px] tracking-[0.25em] uppercase text-cobalt-soft mb-6">Что мы обсудим</h4>
              <ul className="space-y-4 mb-9">
                {topics.map((t, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="w-6 h-6 rounded-full bg-cobalt/15 border border-cobalt/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-cobalt-soft" />
                    </span>
                    <span className="text-sm md:text-[15px] font-body text-bone/90 leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => window.open('https://t.me/onyxwebsites_bot', '_blank')}
                className="w-full flex items-center justify-center gap-3 rounded-full bg-cobalt text-white font-body font-semibold text-base py-5 hover:bg-bone hover:text-ink transition-all duration-300 shadow-[0_10px_50px_rgba(78,124,255,0.3)]"
              >
                <Send className="w-4.5 h-4.5" /> Обсудить сайт в Telegram
              </button>
            </div>

            <p className="text-[13px] font-body text-fog/80 max-w-md mx-auto leading-relaxed">
              Вы оставляете заявку — а мы думаем, как сделать так, чтобы сайт начал работать на ваш бизнес, а не просто висел в интернете.
            </p>
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
