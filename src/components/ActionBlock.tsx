import React from 'react';
import { Container, SectionTitle, Button, Reveal } from './ui';
import { FileText, ArrowUpRight } from 'lucide-react';
import { BOT_LINK } from '../lib/leads';

const steps = [
  { title: 'Оставляете заявку', desc: 'Пара минут: рассказываете о бизнесе и задаче сайта.' },
  { title: 'Разбираем ваш бизнес', desc: 'Смотрим текущую упаковку и находим слабые места.' },
  { title: 'Показываем план и превью', desc: 'Какие блоки нужны, как усилить доверие и принимать заявки.' },
  { title: 'Запускаем сайт', desc: 'На вашем домене, без оплаты разработки — платите только за запуск и работу.' },
];

export default function ActionBlock() {
  return (
    <Container className="relative border-t border-white/[0.06]">
      <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-start">
        <div className="lg:sticky lg:top-28">
          <SectionTitle index="03" subtitle="План действий" className="!mb-8">
            Оставьте заявку — мы покажем, какой сайт нужен вашему бизнесу
          </SectionTitle>

          <Reveal className="space-y-5 text-[15px] md:text-base font-body text-fog leading-relaxed mb-10">
            <p>
              Вам не нужно разбираться в дизайне, доменах, хостинге, структуре сайта и технических настройках.
            </p>
            <p>
              Вы оставляете заявку, а мы изучаем ваш бизнес, смотрим текущую упаковку, находим слабые места и предлагаем понятный план сайта: какие блоки нужны, какие услуги показать, как усилить доверие и как принимать заявки.
            </p>
            <p className="text-bone/90">
              После этого вы понимаете, каким должен быть ваш сайт, за что вы платите и как ONYX может запустить его без оплаты разработки.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[24px] border border-white/[0.08] bg-ink-2/70 p-6 md:p-7">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-cobalt/15 border border-cobalt/30 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-cobalt-soft" />
                </div>
                <p className="text-sm font-body text-bone/85 leading-relaxed">
                  А также мы подготовили для вас бесплатный чек-лист-инструкцию по созданию сайта для вашего бизнеса.
                </p>
              </div>
              <Button className="w-full min-h-[54px] mb-3" onClick={() => window.open(BOT_LINK, '_blank')}>
                Начать разработку <ArrowUpRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="w-full min-h-[54px]" onClick={() => window.open(BOT_LINK, '_blank')}>
                Получить чек-лист
              </Button>
              <span className="mt-3 block text-[11px] text-fog/70 text-center font-mono tracking-wide">
                Заполните анкету и личный кабинет в боте — узнаете о всех подводных камнях в разработке сайта и поиске разработчика.
              </span>
            </div>
          </Reveal>
        </div>

        {/* ── Process timeline ── */}
        <div className="relative pl-2">
          <div className="absolute left-[27px] top-6 bottom-6 w-px bg-gradient-to-b from-cobalt/60 via-white/15 to-transparent" />
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="relative flex gap-6 md:gap-8 pb-12 last:pb-0 group">
                <div className={`relative z-10 w-[52px] h-[52px] rounded-full border flex items-center justify-center shrink-0 transition-all duration-500 ${i === 0 ? 'bg-cobalt border-cobalt text-white shadow-[0_0_30px_rgba(78,124,255,0.35)]' : 'bg-ink border-white/15 text-cobalt-soft group-hover:border-cobalt/50'}`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-cobalt-soft'}`} />
                </div>
                <div className="pt-1.5">
                  <h3 className="font-display font-medium text-lg md:text-xl text-white mb-2">{s.title}</h3>
                  <p className="text-sm md:text-[15px] font-body text-fog leading-relaxed max-w-md">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Container>
  );
}
