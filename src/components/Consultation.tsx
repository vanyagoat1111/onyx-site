import React from 'react';
import { Container, SectionTitle, Reveal, Button } from './ui';
import { ScanSearch, Compass, MessageSquare, ArrowUpRight, Clock, FileCheck, Wallet } from 'lucide-react';
import { BOT_LINK, BOT_AUDIT_LINK, TELEGRAM_QUESTIONS_LINK } from '../lib/leads';

/* Главный конвертер модели ONYX — бесплатная консультация «План сайта под ваш
   бизнес». Три карточки повторяют три ветки входа, которые бот предлагает на
   первом экране, чтобы человек попадал сразу в нужную и не проходил лишнего. */

const branches = [
  {
    icon: ScanSearch,
    tag: 'Сайт уже есть',
    title: 'Начать с разбора',
    desc: 'Даёте адрес — показываем, что мешает получать заявки: скорость, мобильная версия, доверие, формы. Занимает две минуты.',
    action: 'Бесплатный аудит сайта',
    href: BOT_AUDIT_LINK,
    primary: true,
  },
  {
    icon: Compass,
    tag: 'Сайта пока нет',
    title: 'Разобрать нишу',
    desc: 'Смотрим, как устроены сайты в вашей сфере, что там работает, а что лишнее. Показываем, каким должен быть первый сайт.',
    action: 'Разобрать мою нишу',
    href: BOT_LINK,
    primary: false,
  },
  {
    icon: MessageSquare,
    tag: 'Без бота',
    title: 'Написать человеку',
    desc: 'Если нет времени проходить вопросы — напишите напрямую. Ответим и сами зададим то, что нужно для плана.',
    action: 'Написать менеджеру',
    href: TELEGRAM_QUESTIONS_LINK,
    primary: false,
  },
];

const facts = [
  { icon: Clock, title: '30–40 минут', desc: 'Столько идёт разговор. Созвон или переписка — как вам удобнее.' },
  { icon: FileCheck, title: 'План остаётся у вас', desc: 'Структура сайта, блоки и приоритеты. Даже если делать будете не с нами.' },
  { icon: Wallet, title: '0 ₽ и без обязательств', desc: 'Не берём предоплату и не просим решать на созвоне.' },
];

export default function Consultation() {
  return (
    <Container id="consultation" pad="air" className="relative border-t border-white/[0.06]">
      <SectionTitle index="04" size="loud" glow={true} subtitle="Главный шаг" className="max-w-4xl">
        Бесплатная консультация «План сайта под ваш бизнес»
      </SectionTitle>

      <Reveal className="max-w-2xl -mt-4 mb-12">
        <p className="text-[15px] md:text-base font-body text-fog leading-relaxed">
          Мы не начинаем с прайса и не отправляем коммерческое предложение вслепую. Сначала
          разбираемся, кто ваши клиенты, как они принимают решение и чего им не хватает,
          чтобы вам написать. Из этого и складывается план сайта.
        </p>
      </Reveal>

      {/* Три ветки входа — те же, что и на первом экране бота */}
      <div className="grid md:grid-cols-3 gap-5 mb-14">
        {branches.map((b, i) => (
          <Reveal key={b.title} delay={i * 0.08} className="flex">
            <div
              className={`relative w-full rounded-[26px] border p-7 flex flex-col transition-colors duration-300 ${
                b.primary
                  ? 'border-cobalt/45 bg-cobalt/[0.07]'
                  : 'border-white/[0.08] bg-ink-2/50 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <span
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                    b.primary ? 'bg-cobalt/20 border-cobalt/40' : 'bg-white/[0.04] border-white/10'
                  }`}
                >
                  <b.icon className="w-4 h-4 text-cobalt-soft" />
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-fog">{b.tag}</span>
              </div>

              <h3 className="font-display font-medium text-xl text-white mb-3">{b.title}</h3>
              <p className="text-[14px] font-body text-fog leading-relaxed flex-1 mb-7">{b.desc}</p>

              <Button
                variant={b.primary ? 'primary' : 'outline'}
                className="w-full min-h-[50px]"
                onClick={() => window.open(b.href, '_blank')}
              >
                {b.action} <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Что человек получает и чего это стоит */}
      <Reveal delay={0.1}>
        <div className="rounded-[26px] border border-white/[0.08] bg-ink-2/40 p-7 md:p-9">
          <div className="grid sm:grid-cols-3 gap-8">
            {facts.map((f) => (
              <div key={f.title} className="flex gap-4">
                <span className="w-9 h-9 rounded-xl bg-cobalt/10 border border-cobalt/25 flex items-center justify-center shrink-0">
                  <f.icon className="w-4 h-4 text-cobalt-soft" />
                </span>
                <div>
                  <div className="font-display font-medium text-[15px] text-white mb-1.5">{f.title}</div>
                  <p className="text-[13px] font-body text-fog leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
