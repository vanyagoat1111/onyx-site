import React from 'react';
import { Container, SectionTitle, Button, Reveal } from './ui';
import { FileText, ArrowUpRight, ScanSearch } from 'lucide-react';
import { BOT_LINK, BOT_AUDIT_LINK, BOT_CHECKLIST_LINK } from '../lib/leads';

const steps = [
  // Разбор сайта делает бот, это секунды. Две минуты - про созвон,
  // они остались во втором шаге, где им и место.
  { title: 'Разбор за 5 секунд', desc: 'Даёте адрес сайта - бот показывает, что мешает получать заявки. Если сайта нет, разбираем нишу.' },
  { title: 'Бесплатная консультация', desc: 'Созваниваемся и составляем план сайта под ваш бизнес: структура, блоки, что показать первым.' },
  { title: 'Показываем превью', desc: 'Собираем предварительную версию. Смотрите вживую и говорите, что поправить.' },
  { title: 'Запускаем сайт', desc: 'На вашем домене, без оплаты разработки - платите только за запуск и работу.' },
];

export default function ActionBlock() {
  return (
    <Container pad="tight" className="relative border-t border-white/[0.06]">
      <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-start">
        <div className="lg:sticky lg:top-28">
          <SectionTitle index="03" subtitle="План действий" className="!mb-8">
            Сначала разбор, потом план. Цена - в самом конце
          </SectionTitle>

          <Reveal className="space-y-5 text-[15px] md:text-base font-body text-fog leading-relaxed mb-10">
            <p>
              Вам не нужно разбираться в дизайне, доменах, хостинге, структуре сайта и технических настройках.
            </p>
            <p>
              Мы смотрим ваш сайт или нишу, находим слабые места и предлагаем понятный план: какие блоки нужны, какие услуги показать первыми, как усилить доверие и как принимать заявки.
            </p>
            <p className="text-bone/90">
              Разбор и консультация бесплатны и ни к чему не обязывают. К разговору о деньгах переходим только тогда, когда вы уже понимаете, каким должен быть ваш сайт.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[26px] border border-white/[0.08] bg-ink-2/70 p-6 md:p-7">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-cobalt/15 border border-cobalt/30 flex items-center justify-center shrink-0">
                  <ScanSearch className="w-5 h-5 text-cobalt-soft" />
                </div>
                <p className="text-sm font-body text-bone/85 leading-relaxed">
                  Начните с разбора: дайте адрес сайта - покажем, что мешает получать заявки, и предложим план. Бесплатно.
                </p>
              </div>
              <Button className="w-full min-h-[54px] mb-3" onClick={() => window.open(BOT_AUDIT_LINK, '_blank')}>
                Бесплатный аудит сайта <ArrowUpRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="w-full min-h-[54px] mb-3" onClick={() => window.open(BOT_LINK, '_blank')}>
                Сайта пока нет - разобрать нишу
              </Button>
              <button
                onClick={() => window.open(BOT_CHECKLIST_LINK, '_blank')}
                className="w-full flex items-center justify-center gap-2 text-[13px] font-body text-fog hover:text-bone transition-colors cursor-pointer py-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
              >
                <FileText className="w-3.5 h-3.5 text-cobalt-soft" /> Забрать чек-лист по подготовке
              </button>
              <span className="mt-2 block text-[11px] text-fog/70 text-center font-mono tracking-wide">
                Разбор и консультация ни к чему не обязывают.
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
