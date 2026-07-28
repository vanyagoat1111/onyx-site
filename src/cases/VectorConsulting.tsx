import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StatBars, Waterfall, DonutStat } from '../components/DemoCharts';

/* VECTOR — консалтинг и услуги для бизнеса. ПЯТЬ СТРАНИЦ:
   главная → три страницы услуг → кейсы.
   Визуальный язык: деловая записка. Почти белый фон, глубокий графит,
   узкий строгий гротеск и таблицы вместо картинок. Единственное светлое демо в наборе. */

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = '', delay = 0, style }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay, ease: EASE }} className={className} style={style}>
      {children}
    </motion.div>
  );
}

const INK = '#14181D';
const BLUE = '#2F5DA8';
const PAPER = '#F4F5F3';
const ROOT = '#case/b2b';

const dim = (a: number) => `rgba(20,24,29,${a})`;

type Service = {
  slug: string; t: string; d: string; tag: string;
  lead: string;
  includes: [string, string][];
  steps: [string, string][];
  price: [string, string][];
  who: string[];
};

const services: Service[] = [
  {
    slug: 'buh', t: 'Бухгалтерия на аутсорсе', tag: 'от 12 000 ₽ / мес',
    d: 'Полный учёт, зарплата, отчётность и общение с налоговой. Отвечаем за штрафы рублём.',
    lead: 'Забираем весь учёт целиком: первичка, зарплата, отчётность, требования из инспекции. Вы получаете закреплённого бухгалтера, его прямой телефон и ответ в течение двух часов в рабочее время.',
    includes: [
      ['Первичные документы', 'Обработка входящих, выставление счетов и актов, сверки с контрагентами'],
      ['Зарплата и кадры', 'Расчёт, ведомости, больничные, отпускные, отчёты в СФР'],
      ['Отчётность', 'Все формы в ФНС, СФР и Росстат по вашему режиму, отправка по ЭДО'],
      ['Общение с налоговой', 'Ответы на требования, пояснения, сверки, представительство в инспекции'],
      ['Консультации', 'По текущим вопросам — без ограничения по количеству'],
    ],
    steps: [
      ['Неделя 1', 'Забираем базу и документы у прежнего бухгалтера, сверяем остатки'],
      ['Неделя 2–3', 'Акт расхождений, исправление ошибок прошлых периодов'],
      ['Неделя 4', 'Первый закрытый месяц у нас, вы получаете отчёт по цифрам'],
      ['Дальше', 'Ежемесячно: закрытие, отчётность, созвон по показателям'],
    ],
    price: [
      ['ИП без работников, до 30 операций', 'от 12 000 ₽ / мес'],
      ['ООО до 200 операций, до 20 сотрудников', 'от 28 000 ₽ / мес'],
      ['ВЭД, группы компаний, свыше 200 операций', 'от 65 000 ₽ / мес'],
      ['Восстановление учёта за прошлые периоды', 'от 40 000 ₽ разово'],
    ],
    who: ['Бухгалтер уволился или уходит в декрет', 'Учёт ведёт директор в перерывах между делами', 'Компания выросла, и штатный не справляется', 'Хочется убрать риск штрафов на подрядчика'],
  },
  {
    slug: 'tax', t: 'Налоговое планирование', tag: 'от 45 000 ₽',
    d: 'Считаем варианты режимов и структуры на год вперёд. Показываем, где вы переплачиваете.',
    lead: 'Считаем несколько сценариев вашей налоговой нагрузки на год вперёд и показываем в деньгах, что даёт смена режима, разделение направлений или изменение договорной схемы. С оценкой рисков, а не только выгоды.',
    includes: [
      ['Диагностика нагрузки', 'Сколько платите сейчас и из чего складывается сумма'],
      ['Расчёт сценариев', 'Три-четыре варианта с цифрами и сроками перехода'],
      ['Оценка рисков', 'Где схема выглядит как дробление и как этого избежать'],
      ['Дорожная карта', 'Что и в каком порядке менять, какие документы готовить'],
      ['Сопровождение перехода', 'Уведомления, приказы, договоры — оформляем сами'],
    ],
    steps: [
      ['Неделя 1', 'Собираем данные: обороты, расходы, структура, договоры'],
      ['Неделя 2', 'Считаем сценарии, моделируем нагрузку на год'],
      ['Неделя 3', 'Защищаем расчёт на встрече, отвечаем на возражения'],
      ['Неделя 4', 'Дорожная карта и подготовка документов к переходу'],
    ],
    price: [
      ['Одно юрлицо, один режим', 'от 45 000 ₽'],
      ['Группа до трёх компаний', 'от 120 000 ₽'],
      ['Реструктуризация с сопровождением', 'от 240 000 ₽'],
      ['Экспресс-оценка за 3 дня', '18 000 ₽'],
    ],
    who: ['Выручка подходит к границе упрощёнки', 'Несколько направлений в одном юрлице', 'Планируется продажа доли или привлечение инвестора', 'Просто хочется понять, нормально ли платить столько'],
  },
  {
    slug: 'mgmt', t: 'Управленческий учёт', tag: 'от 90 000 ₽',
    d: 'Ставим отчётность, по которой видно прибыль по направлениям, а не одну цифру на счёте.',
    lead: 'Строим отчётность, которая отвечает на вопросы собственника: сколько зарабатывает каждое направление, где кассовый разрыв через месяц и что будет, если снизить цену на десять процентов. Бухгалтерская отчётность на эти вопросы не отвечает.',
    includes: [
      ['Три отчёта', 'P&L, движение денег и баланс в управленческом виде'],
      ['Разрезы', 'По направлениям, проектам, менеджерам или точкам — как нужно вам'],
      ['Платёжный календарь', 'Видно кассовые разрывы за 4–8 недель до того, как они случатся'],
      ['Регламент', 'Кто, когда и что вносит, чтобы отчёт не разваливался через два месяца'],
      ['Обучение', 'Учим вашего сотрудника вести это без нас'],
    ],
    steps: [
      ['Месяц 1', 'Интервью с собственником, разбор текущих таблиц, проект структуры'],
      ['Месяц 2', 'Настройка учёта, первый закрытый период, сверка с бухгалтерским'],
      ['Месяц 3', 'Платёжный календарь, регламент, обучение сотрудника'],
      ['Дальше', 'Сопровождение по подписке или полная передача вам'],
    ],
    price: [
      ['Постановка для одного направления', 'от 90 000 ₽'],
      ['Многопрофильная компания', 'от 180 000 ₽'],
      ['Группа компаний с консолидацией', 'от 320 000 ₽'],
      ['Ежемесячное ведение', 'от 35 000 ₽ / мес'],
    ],
    who: ['Деньги на счёте есть, а прибыли не видно', 'Не понятно, какое направление кормит, а какое ест', 'Регулярно возникают кассовые разрывы', 'Нужна отчётность для банка или инвестора'],
  },
];

const shortServices = [
  { t: 'Автоматизация', d: 'Связываем 1С, CRM и банк. Убираем ручной перенос данных между таблицами.', tag: 'от 60 000 ₽' },
  { t: 'Сопровождение проверок', d: 'Готовим документы, отвечаем на требования, представляем интересы в инспекции.', tag: 'от 35 000 ₽' },
  { t: 'Кадровый учёт', d: 'Договоры, приказы, воинский учёт и отчёты. Проверка на риски трудовой инспекции.', tag: 'от 8 000 ₽ / мес' },
];

const facts = [
  { v: '11 лет', l: 'на рынке' },
  { v: '180+', l: 'компаний на обслуживании' },
  { v: '0', l: 'штрафов по нашей вине за 3 года' },
  { v: '2 ч', l: 'среднее время ответа' },
];

const process = [
  { n: '01', t: 'Диагностика', d: 'Смотрим текущий учёт, договоры и отчётность. Две недели, фиксированная стоимость, вычитается из первого счёта.' },
  { n: '02', t: 'Отчёт с рисками', d: 'Список проблем с оценкой в деньгах: что грозит, с какой вероятностью и сколько стоит закрыть.' },
  { n: '03', t: 'План перехода', d: 'Что делаем в первый месяц, что во второй. Кто с вашей стороны участвует и сколько времени это займёт.' },
  { n: '04', t: 'Работа', d: 'Закреплённый бухгалтер и куратор. Раз в месяц — созвон по цифрам, а не только пачка отчётов.' },
];

const plans = [
  { n: 'Микро', p: '12 000', per: '₽ / мес', for: 'ИП и небольшие ООО до 30 операций', items: ['Учёт и первичка', 'Отчётность в срок', 'Зарплата до 3 человек', 'Консультации по почте'], accent: false },
  { n: 'Рабочий', p: '28 000', per: '₽ / мес', for: 'Компании до 200 операций', items: ['Всё из «Микро»', 'Зарплата до 20 человек', 'Кадровый учёт', 'Выделенный бухгалтер', 'Ответ в течение 2 часов'], accent: true },
  { n: 'Полный', p: 'от 65 000', per: '₽ / мес', for: 'Группы компаний и ВЭД', items: ['Всё из «Рабочего»', 'Управленческий учёт', 'Налоговое планирование', 'Сопровождение проверок', 'Куратор-партнёр'], accent: false },
];

const cases = [
  {
    ind: 'Оптовая торговля', size: '340 млн ₽ выручки, 26 человек',
    task: 'Компания росла, а прибыль не росла. Учёт вёлся в трёх несвязанных таблицах, собственник видел только остаток на счёте.',
    did: ['Поставили управленческий P&L с разрезом по товарным группам', 'Свели закупочные цены и логистику в себестоимость', 'Сделали платёжный календарь на восемь недель'],
    res: [['4 из 11', 'товарных групп работали в минус'], ['+6,2 п.п.', 'валовая рентабельность за полгода'], ['0', 'кассовых разрывов после внедрения']],
  },
  {
    ind: 'Производство мебели', size: '190 млн ₽ выручки, 48 человек',
    task: 'Выручка подошла к границе УСН. Собственник планировал разделить бизнес на два юрлица — схема выглядела как дробление.',
    did: ['Просчитали четыре сценария налоговой нагрузки на два года', 'Показали, где разделение выглядит искусственным', 'Собрали деловую цель и документальное обоснование структуры'],
    res: [['2,8 млн ₽', 'экономия за первый год'], ['≈ 9 млн ₽', 'потенциальные доначисления, которых избежали'], ['3 мес.', 'срок перехода']],
  },
  {
    ind: 'Сеть клиник', size: '260 млн ₽ выручки, 4 филиала',
    task: 'Штатная бухгалтерия не справлялась с четырьмя филиалами. За два года — три штрафа и постоянные требования из инспекции.',
    did: ['Забрали учёт на аутсорс, восстановили два закрытых периода', 'Настроили ЭДО и обмен с медицинской системой', 'Выделили куратора на все четыре филиала'],
    res: [['0', 'штрафов за два года работы'], ['−38%', 'расходы на бухгалтерию'], ['2 дня', 'срок закрытия месяца вместо трёх недель']],
  },
];

const faqs = [
  { q: 'Что если налоговая доначислит по вашей вине?', a: 'Оплачиваем штраф и пени сами. Это прописано в договоре и подкреплено страховкой профессиональной ответственности на 5 млн рублей.' },
  { q: 'Как передать дела от прежнего бухгалтера?', a: 'Берём это на себя. Запрашиваем базу и документы, сверяем остатки, составляем акт расхождений. Обычно занимает две-три недели.' },
  { q: 'Вы работаете только удалённо?', a: 'В основном да, и это позволяет держать цену. Но куратор приезжает в офис на старте и по запросу — например, на встречу с банком или инвестором.' },
  { q: 'Можно ли перейти на другой налоговый режим в середине года?', a: 'На большинство — только с начала следующего. Поэтому расчёт вариантов делаем осенью, чтобы вы успели подать уведомление до конца года.' },
  { q: 'Кто будет вести мою компанию?', a: 'Конкретный человек, вы знаете его имя и телефон. Есть замещающий на время отпуска, он в курсе вашей специфики — передача дел происходит письменно.' },
];

export default function VectorConsulting() {
  const [hash, setHash] = useState(() => (typeof window !== 'undefined' ? window.location.hash : ROOT));
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const slug = hash.startsWith(ROOT + '/service/') ? hash.split('/service/')[1] : null;
  const current = services.find((s) => s.slug === slug) || null;
  const page = current ? 'service' : hash.startsWith(ROOT + '/cases') ? 'cases' : 'home';

  const go = (e: React.MouseEvent, to: string) => {
    e.preventDefault(); window.location.hash = to; window.scrollTo(0, 0);
  };
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (page !== 'home') { window.location.hash = ROOT; setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 70); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen font-montserrat selection:bg-[#2F5DA8]/25 overflow-x-clip" style={{ background: PAPER, color: INK }}>
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b" style={{ background: 'rgba(244,245,243,0.9)', borderColor: dim(0.1) }}>
        <div className="max-w-[1240px] mx-auto px-6 md:px-8 py-4 flex justify-between items-center pl-20 md:pl-24">
          <a href={ROOT} onClick={(e) => go(e, ROOT)} className="font-bold tracking-[0.2em] text-[16px]">VECTOR</a>
          <nav className="hidden md:flex gap-7 items-center">
            <a href="#services" onClick={(e) => scrollTo(e, 'services')} className="text-[12px] uppercase tracking-[0.13em]" style={{ color: dim(0.5) }}>Услуги</a>
            <a href={ROOT + '/cases'} onClick={(e) => go(e, ROOT + '/cases')} className="text-[12px] uppercase tracking-[0.13em]" style={{ color: page === 'cases' ? BLUE : dim(0.5) }}>Кейсы</a>
            <a href="#process" onClick={(e) => scrollTo(e, 'process')} className="text-[12px] uppercase tracking-[0.13em]" style={{ color: dim(0.5) }}>Как работаем</a>
            <a href="#prices" onClick={(e) => scrollTo(e, 'prices')} className="text-[12px] uppercase tracking-[0.13em]" style={{ color: dim(0.5) }}>Тарифы</a>
          </nav>
          <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className="hidden sm:inline-block px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white" style={{ background: BLUE }}>Диагностика</a>
        </div>
      </header>

      {/* ═════════ СТРАНИЦА УСЛУГИ ═════════ */}
      {page === 'service' && current && (
        <>
          <section className="px-6 md:px-8 pt-14 md:pt-20 pb-14">
            <div className="max-w-[1240px] mx-auto">
              <a href={ROOT} onClick={(e) => go(e, ROOT)} className="inline-block text-[12px] uppercase tracking-[0.13em] mb-9 transition-colors hover:text-[#14181D]" style={{ color: dim(0.4) }}>← Все услуги</a>
              <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-14 items-start">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.26em] mb-6" style={{ color: BLUE }}>Услуга · {current.tag}</div>
                  <h1 className="font-bold leading-[1.04] tracking-[-0.02em] max-w-[18ch]" style={{ fontSize: 'clamp(32px,5vw,60px)' }}>{current.t}</h1>
                  <p className="mt-8 max-w-[56ch] text-[16.5px] leading-[1.8]" style={{ color: dim(0.6) }}>{current.lead}</p>
                  <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className="inline-block mt-9 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.11em] text-white" style={{ background: BLUE }}>Обсудить задачу</a>
                </div>
                <div className="border p-7" style={{ borderColor: dim(0.14), background: '#fff' }}>
                  <div className="text-[10px] uppercase tracking-[0.16em] mb-5" style={{ color: dim(0.4) }}>Обычно приходят, когда</div>
                  {current.who.map((w, i) => (
                    <div key={w} className={'flex gap-3 text-[14px] leading-[1.65] py-3 ' + (i ? 'border-t' : '')} style={i ? { borderColor: dim(0.09) } : undefined}>
                      <span className="shrink-0 mt-[8px] w-[5px] h-[5px]" style={{ background: BLUE }} />{w}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-8 py-16 md:py-20 border-y" style={{ borderColor: dim(0.12), background: '#EFF0ED' }}>
            <div className="max-w-[1240px] mx-auto">
              <Reveal className="mb-10"><h2 className="font-bold text-[28px] md:text-[38px] tracking-[-0.02em]">Что входит</h2></Reveal>
              {current.includes.map(([n, d], i) => (
                <Reveal key={n} delay={i * 0.04} className="grid grid-cols-1 md:grid-cols-[0.9fr_1.4fr] gap-3 md:gap-8 py-5 border-b" style={{ borderColor: dim(0.12) }}>
                  <span className="font-semibold text-[16px]">{n}</span>
                  <span className="text-[14.5px] leading-[1.75]" style={{ color: dim(0.55) }}>{d}</span>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="px-6 md:px-8 py-16 md:py-20">
            <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">
              <div>
                <Reveal className="mb-8"><h2 className="font-bold text-[28px] md:text-[38px] tracking-[-0.02em]">Как идёт работа</h2></Reveal>
                {current.steps.map(([n, d], i) => (
                  <Reveal key={n} delay={i * 0.05} className="grid grid-cols-[92px_1fr] gap-5 py-4 border-b" style={{ borderColor: dim(0.12) }}>
                    <span className="text-[11px] uppercase tracking-[0.1em] pt-1" style={{ color: BLUE }}>{n}</span>
                    <span className="text-[14.5px] leading-[1.7]">{d}</span>
                  </Reveal>
                ))}
              </div>
              <div>
                <Reveal className="mb-8"><h2 className="font-bold text-[28px] md:text-[38px] tracking-[-0.02em]">Сколько стоит</h2></Reveal>
                {current.price.map(([n, p], i) => (
                  <Reveal key={n} delay={i * 0.05} className="flex justify-between gap-6 py-4 border-b items-baseline" style={{ borderColor: dim(0.12) }}>
                    <span className="text-[14.5px]">{n}</span>
                    <span className="font-semibold text-[14.5px] whitespace-nowrap" style={{ color: BLUE }}>{p}</span>
                  </Reveal>
                ))}
                <Reveal className="mt-8 text-[13px] leading-[1.7]" style={{ color: dim(0.45) }}>
                  Диагностика перед началом — 24 000 ₽, вычитается из первого счёта.
                </Reveal>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-8 py-14 border-t" style={{ borderColor: dim(0.12) }}>
            <div className="max-w-[1240px] mx-auto flex flex-wrap gap-4 items-center">
              <span className="text-[12px] uppercase tracking-[0.13em] mr-2" style={{ color: dim(0.4) }}>Другие услуги:</span>
              {services.filter((s) => s.slug !== current.slug).map((s) => (
                <a key={s.slug} href={`${ROOT}/service/${s.slug}`} onClick={(e) => go(e, `${ROOT}/service/${s.slug}`)}
                   className="px-6 py-3.5 border text-[13px] transition-colors hover:border-[#2F5DA8]" style={{ borderColor: dim(0.18) }}>
                  {s.t} →
                </a>
              ))}
              <a href={ROOT + '/cases'} onClick={(e) => go(e, ROOT + '/cases')} className="px-6 py-3.5 border text-[13px] transition-colors hover:border-[#2F5DA8]" style={{ borderColor: dim(0.18) }}>Кейсы →</a>
            </div>
          </section>
        </>
      )}

      {/* ═════════ СТРАНИЦА КЕЙСОВ ═════════ */}
      {page === 'cases' && (
        <>
          <section className="px-6 md:px-8 pt-14 md:pt-20 pb-12">
            <div className="max-w-[1100px] mx-auto">
              <a href={ROOT} onClick={(e) => go(e, ROOT)} className="inline-block text-[12px] uppercase tracking-[0.13em] mb-9" style={{ color: dim(0.4) }}>← На главную</a>
              <h1 className="font-bold leading-[1.04] tracking-[-0.02em] max-w-[16ch]" style={{ fontSize: 'clamp(34px,5.4vw,66px)' }}>
                Кейсы<br /><span style={{ color: BLUE }}>с цифрами</span>
              </h1>
              <p className="mt-8 max-w-[58ch] text-[16.5px] leading-[1.8]" style={{ color: dim(0.6) }}>
                Названия компаний не раскрываем — это условие договоров. Отрасль, масштаб
                и результат приводим как есть, цифры подтверждены отчётностью клиента.
              </p>
            </div>
          </section>

          <section className="px-6 md:px-8 pb-20">
            <div className="max-w-[1100px] mx-auto flex flex-col gap-6">
              {cases.map((c, i) => (
                <Reveal key={c.ind} delay={i * 0.07} className="border p-8 md:p-10" style={{ borderColor: dim(0.14), background: '#fff' }}>
                  <div className="flex flex-wrap items-baseline justify-between gap-4 mb-7 pb-6 border-b" style={{ borderColor: dim(0.1) }}>
                    <h2 className="font-bold text-[24px] md:text-[30px] tracking-[-0.02em]">{c.ind}</h2>
                    <span className="text-[12px] uppercase tracking-[0.1em]" style={{ color: dim(0.4) }}>{c.size}</span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 mb-8">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.16em] mb-3" style={{ color: BLUE }}>Задача</div>
                      <p className="text-[14.5px] leading-[1.8]" style={{ color: dim(0.6) }}>{c.task}</p>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.16em] mb-3" style={{ color: BLUE }}>Что сделали</div>
                      <div className="flex flex-col gap-2.5">
                        {c.did.map((d) => (
                          <div key={d} className="flex gap-3 text-[14px] leading-[1.65]" style={{ color: dim(0.6) }}>
                            <span className="shrink-0 mt-[8px] w-[5px] h-[5px]" style={{ background: BLUE }} />{d}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 border-t" style={{ borderColor: dim(0.12) }}>
                    {c.res.map(([v, l], j) => (
                      <div key={l} className={'py-6 pr-6 ' + (j ? 'sm:pl-6 sm:border-l' : '')} style={j ? { borderColor: dim(0.12) } : undefined}>
                        <div className="font-bold text-[27px] leading-none tracking-[-0.02em]" style={{ color: BLUE }}>{v}</div>
                        <div className="text-[12px] mt-2.5" style={{ color: dim(0.45) }}>{l}</div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              ))}
              <Reveal className="border p-8 md:p-10" style={{ borderColor: dim(0.14), background: '#fff' }}>
                <h2 className="font-bold text-[22px] md:text-[28px] tracking-[-0.02em] mb-3">Как менялась налоговая нагрузка</h2>
                <p className="text-[14px] leading-[1.75] mb-9 max-w-[62ch]" style={{ color: dim(0.55) }}>
                  Производство мебели, второй кейс. Годовая нагрузка до и после реструктуризации —
                  по фактическим начислениям, в миллионах рублей.
                </p>
                <div className="overflow-x-auto pb-2">
                  <Waterfall tone={BLUE} negTone="#3F8F63" muted={dim(0.12)} unit=" млн ₽" height={190} className="min-w-[560px]"
                    items={[
                      { label: 'Было', delta: 24.6 },
                      { label: 'Смена режима', delta: -1.9 },
                      { label: 'Разделение направлений', delta: -0.6 },
                      { label: 'Пересборка договоров', delta: -0.3 },
                    ]} />
                </div>
                <p className="text-[12.5px] mt-6" style={{ color: dim(0.4) }}>
                  Зелёные столбцы — снижение. Итог 21,8 млн ₽ вместо 24,6 млн ₽ при той же выручке.
                </p>
              </Reveal>

              <Reveal className="text-center pt-6">
                <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className="inline-block px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.11em] text-white" style={{ background: BLUE }}>
                  Обсудить мою ситуацию
                </a>
              </Reveal>
            </div>
          </section>
        </>
      )}

      {/* ═════════ ГЛАВНАЯ ═════════ */}
      {page === 'home' && (
        <>
          <section className="px-6 md:px-8 pt-16 md:pt-24 pb-16">
            <div className="max-w-[1240px] mx-auto">
              <div className="text-[11px] uppercase tracking-[0.28em] mb-8" style={{ color: BLUE }}>Бухгалтерия и финансы для бизнеса</div>
              <h1 className="font-bold leading-[1.06] tracking-[-0.02em] max-w-[20ch]" style={{ fontSize: 'clamp(36px,5.6vw,68px)' }}>
                Учёт, за который<br />отвечают деньгами
              </h1>
              <p className="mt-8 max-w-[54ch] text-[16.5px] leading-[1.75]" style={{ color: dim(0.6) }}>
                Ведём бухгалтерию, ставим управленческий учёт и закрываем налоговые риски.
                Если штраф пришёл по нашей вине — платим мы, это в договоре.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className="px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.11em] text-white" style={{ background: BLUE }}>Запросить диагностику</a>
                <a href={ROOT + '/cases'} onClick={(e) => go(e, ROOT + '/cases')} className="px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.11em] border" style={{ borderColor: dim(0.2) }}>Кейсы с цифрами</a>
              </div>

              <Reveal className="mt-16 grid grid-cols-2 lg:grid-cols-4 border-t" style={{ borderColor: dim(0.12) }}>
                {facts.map((f) => (
                  <div key={f.l} className="py-7 pr-6 border-b lg:border-b-0 lg:border-r last:border-r-0 lg:pl-7 first:pl-0" style={{ borderColor: dim(0.12) }}>
                    <div className="font-bold text-[30px] md:text-[36px] leading-none">{f.v}</div>
                    <div className="text-[12px] uppercase tracking-[0.1em] mt-2.5" style={{ color: dim(0.45) }}>{f.l}</div>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>

          <section id="services" className="px-6 md:px-8 py-20 md:py-24 border-y scroll-mt-20" style={{ borderColor: dim(0.12), background: '#EFF0ED' }}>
            <div className="max-w-[1240px] mx-auto">
              <Reveal className="mb-12 max-w-[46ch]">
                <h2 className="font-bold text-[32px] md:text-[44px] tracking-[-0.025em] leading-[1.08]">Услуги</h2>
                <p className="mt-4 text-[15px] leading-[1.75]" style={{ color: dim(0.55) }}>
                  Три основных направления — с отдельными страницами, где написано, что именно входит и сколько стоит.
                </p>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {services.map((s, i) => (
                  <Reveal key={s.slug} delay={i * 0.07}>
                    <a href={`${ROOT}/service/${s.slug}`} onClick={(e) => go(e, `${ROOT}/service/${s.slug}`)}
                       className="h-full flex flex-col p-7 border transition-colors duration-300 hover:border-[#2F5DA8] group" style={{ borderColor: dim(0.14), background: '#fff' }}>
                      <h3 className="font-bold text-[20px] mb-3 tracking-[-0.01em]">{s.t}</h3>
                      <p className="text-[13.5px] leading-[1.7] flex-1 mb-6" style={{ color: dim(0.55) }}>{s.d}</p>
                      <div className="flex items-baseline justify-between gap-3 pt-4 border-t" style={{ borderColor: dim(0.1) }}>
                        <span className="text-[13px] font-semibold" style={{ color: BLUE }}>{s.tag}</span>
                        <span className="text-[12px] transition-colors" style={{ color: dim(0.35) }}>подробнее →</span>
                      </div>
                    </a>
                  </Reveal>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {shortServices.map((s, i) => (
                  <Reveal key={s.t} delay={i * 0.06} className="p-7 border" style={{ borderColor: dim(0.12) }}>
                    <h3 className="font-bold text-[18px] mb-3 tracking-[-0.01em]">{s.t}</h3>
                    <p className="text-[13.5px] leading-[1.7] mb-5" style={{ color: dim(0.55) }}>{s.d}</p>
                    <span className="text-[12.5px] font-semibold" style={{ color: BLUE }}>{s.tag}</span>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-8 py-20 md:py-24">
            <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
              <div>
                <Reveal className="mb-9">
                  <h2 className="font-bold text-[30px] md:text-[40px] tracking-[-0.025em] leading-[1.08] mb-4">
                    Сколько дней уходит на закрытие месяца
                  </h2>
                  <p className="text-[15px] leading-[1.75] max-w-[52ch]" style={{ color: dim(0.55) }}>
                    Медиана по нашим клиентам за 2025 год в сравнении с тем, что было у них до перехода.
                    Чем быстрее закрыт месяц, тем раньше собственник видит реальные цифры.
                  </p>
                </Reveal>
                <Reveal>
                  <StatBars tone={BLUE} muted={dim(0.1)} unit=" дн." labelColor={dim(0.75)}
                    items={[
                      { label: 'Штатный бухгалтер до перехода', value: 21, note: 'по словам клиентов на старте' },
                      { label: 'Первый месяц у нас', value: 9, note: 'пока переносим базу и сверяем остатки' },
                      { label: 'Через полгода работы', value: 2, note: 'после настройки регламента и ЭДО' },
                    ]} />
                </Reveal>
              </div>
              <Reveal className="flex flex-col sm:flex-row lg:flex-col gap-10 justify-center">
                <DonutStat tone={BLUE} muted={dim(0.12)} value={0} max={100} suffix="" size={152}
                  label="Штрафов по нашей вине" sub="За три последних года. Ответственность застрахована на 5 млн ₽." />
                <DonutStat tone={BLUE} muted={dim(0.12)} value={94} size={152}
                  label="Клиентов остаются" sub="Продлевают договор на второй год и дальше." />
              </Reveal>
            </div>
          </section>

          <section id="process" className="px-6 md:px-8 py-20 md:py-24 scroll-mt-20 border-t" style={{ borderColor: dim(0.12) }}>
            <div className="max-w-[1240px] mx-auto">
              <Reveal className="mb-14"><h2 className="font-bold text-[32px] md:text-[44px] tracking-[-0.025em] leading-[1.08]">Как работаем</h2></Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {process.map((p, i) => (
                  <Reveal key={p.n} delay={i * 0.07} className="border-t pt-6" style={{ borderColor: 'rgba(47,93,168,0.4)' }}>
                    <div className="font-bold text-[26px] mb-3" style={{ color: BLUE }}>{p.n}</div>
                    <h3 className="font-bold text-[19px] mb-3 tracking-[-0.01em]">{p.t}</h3>
                    <p className="text-[13.5px] leading-[1.75]" style={{ color: dim(0.55) }}>{p.d}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-8 py-20 md:py-24 border-y" style={{ borderColor: dim(0.12), background: '#EFF0ED' }}>
            <div className="max-w-[1240px] mx-auto">
              <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
                <h2 className="font-bold text-[32px] md:text-[44px] tracking-[-0.025em] leading-[1.08]">Результаты клиентов</h2>
                <a href={ROOT + '/cases'} onClick={(e) => go(e, ROOT + '/cases')} className="text-[12px] uppercase tracking-[0.13em]" style={{ color: BLUE }}>Все кейсы →</a>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cases.map((c, i) => (
                  <Reveal key={c.ind} delay={i * 0.07} className="p-7 border" style={{ borderColor: dim(0.14), background: '#fff' }}>
                    <div className="text-[11px] uppercase tracking-[0.12em] mb-5" style={{ color: dim(0.4) }}>{c.ind}</div>
                    <div className="font-bold text-[32px] leading-none tracking-[-0.02em] mb-2" style={{ color: BLUE }}>{c.res[0][0]}</div>
                    <div className="text-[13.5px] leading-[1.6] mb-6" style={{ color: dim(0.55) }}>{c.res[0][1]}</div>
                    <a href={ROOT + '/cases'} onClick={(e) => go(e, ROOT + '/cases')} className="text-[12px]" style={{ color: dim(0.4) }}>читать кейс →</a>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section id="prices" className="px-6 md:px-8 py-20 md:py-24 scroll-mt-20">
            <div className="max-w-[1240px] mx-auto">
              <Reveal className="mb-12"><h2 className="font-bold text-[32px] md:text-[44px] tracking-[-0.025em] leading-[1.08]">Тарифы на обслуживание</h2></Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((p, i) => (
                  <Reveal key={p.n} delay={i * 0.08} className="flex flex-col p-8 border"
                    style={{ borderColor: p.accent ? BLUE : dim(0.14), background: p.accent ? 'rgba(47,93,168,0.05)' : '#fff' }}>
                    {p.accent && <div className="text-[10px] uppercase tracking-[0.16em] mb-4" style={{ color: BLUE }}>Чаще всего выбирают</div>}
                    <h3 className="font-bold text-[24px] mb-2 tracking-[-0.02em]">{p.n}</h3>
                    <div className="text-[12.5px] mb-6" style={{ color: dim(0.45) }}>{p.for}</div>
                    <div className="flex items-baseline gap-2 mb-7">
                      <span className="font-bold text-[34px] leading-none" style={{ color: BLUE }}>{p.p}</span>
                      <span className="text-[13px]" style={{ color: dim(0.45) }}>{p.per}</span>
                    </div>
                    <div className="flex flex-col gap-3 flex-1 mb-8">
                      {p.items.map((x) => (
                        <div key={x} className="flex gap-3 text-[13.5px] leading-[1.6]" style={{ color: dim(0.6) }}>
                          <span className="shrink-0 mt-[7px] w-[5px] h-[5px]" style={{ background: BLUE }} />{x}
                        </div>
                      ))}
                    </div>
                    <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className="text-center px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors"
                       style={p.accent ? { background: BLUE, color: '#fff' } : { border: `1px solid ${dim(0.2)}` }}>
                      Запросить расчёт
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-8 py-20 md:py-24 border-y" style={{ borderColor: dim(0.12), background: '#EFF0ED' }}>
            <div className="max-w-[860px] mx-auto">
              <Reveal className="mb-12"><h2 className="font-bold text-[32px] md:text-[44px] tracking-[-0.025em] leading-[1.08]">Вопросы</h2></Reveal>
              <div className="flex flex-col">
                {faqs.map((f, i) => {
                  const open = openFaq === i;
                  return (
                    <Reveal key={f.q} delay={i * 0.04} className="border-b" style={{ borderColor: dim(0.14) }}>
                      <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex justify-between items-center gap-6 py-6 text-left">
                        <span className="font-semibold text-[17px] md:text-[19px]">{f.q}</span>
                        <span className="text-[22px] shrink-0" style={{ color: BLUE }}>{open ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden">
                            <p className="text-[14px] leading-[1.85] pb-7 max-w-[64ch]" style={{ color: dim(0.55) }}>{f.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Контакт — общий */}
      <section id="contact" className="px-6 md:px-8 py-20 md:py-28 scroll-mt-20 border-t" style={{ borderColor: dim(0.12) }}>
        <Reveal className="max-w-[760px] mx-auto text-center">
          <h2 className="font-bold leading-[1.08] tracking-[-0.02em] mb-6" style={{ fontSize: 'clamp(30px,4.4vw,50px)' }}>Начнём с диагностики</h2>
          <p className="text-[15px] mb-10 max-w-[52ch] mx-auto leading-[1.75]" style={{ color: dim(0.55) }}>
            Две недели, фиксированная стоимость 24 000 ₽. На выходе — список рисков с оценкой в деньгах.
            Сумма вычитается из первого счёта, если начнём работать.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 5000); }} className="flex gap-3 max-w-[520px] mx-auto flex-wrap">
            <input required type="tel" placeholder="+7 (___) ___-__-__" className="flex-1 min-w-[220px] bg-white border px-6 py-4 text-[14px] outline-none focus:border-[#2F5DA8] transition-colors" style={{ borderColor: dim(0.2) }} />
            <button type="submit" className="px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.11em] text-white" style={{ background: BLUE }}>Отправить</button>
          </form>
          {sent && <p className="mt-4 text-[13px]" style={{ color: BLUE }}>Спасибо! Куратор свяжется в течение рабочего дня.</p>}
        </Reveal>
      </section>

      <footer className="px-6 md:px-8 pt-14 pb-10 border-t" style={{ borderColor: dim(0.12), background: '#EAEBE8' }}>
        <div className="max-w-[1240px] mx-auto flex flex-wrap justify-between gap-10 mb-10">
          <div className="max-w-[300px]">
            <div className="font-bold tracking-[0.2em] text-[15px] mb-4">VECTOR</div>
            <p className="text-[13px] leading-[1.75]" style={{ color: dim(0.5) }}>Бухгалтерия, налоги и управленческий учёт для среднего бизнеса. Одиннадцать лет, 180 компаний.</p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.16em] mb-4" style={{ color: dim(0.35) }}>Услуги</h4>
            <div className="flex flex-col gap-3 text-[13px]" style={{ color: dim(0.55) }}>
              {services.map((s) => (
                <a key={s.slug} href={`${ROOT}/service/${s.slug}`} onClick={(e) => go(e, `${ROOT}/service/${s.slug}`)} className="hover:text-[#14181D] transition-colors">{s.t}</a>
              ))}
              <a href={ROOT + '/cases'} onClick={(e) => go(e, ROOT + '/cases')} className="hover:text-[#14181D] transition-colors">Кейсы</a>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.16em] mb-4" style={{ color: dim(0.35) }}>Контакты</h4>
            <div className="flex flex-col gap-3 text-[13px]" style={{ color: dim(0.55) }}>
              <span className="text-[17px]" style={{ color: INK }}>+7 (495) 000-00-00</span>
              <span>office@vector.example</span>
              <span style={{ color: dim(0.4) }}>Москва, ул. Профсоюзная, 45<br />Пн–Пт 9:00–19:00</span>
            </div>
          </div>
        </div>
        <div className="max-w-[1240px] mx-auto border-t pt-6 flex flex-wrap justify-between gap-4 text-[11px]" style={{ borderColor: dim(0.12), color: dim(0.35) }}>
          <span>© 2026 Vector. Демонстрационный шаблон.</span>
          <div className="flex gap-5"><span>Политика конфиденциальности</span><span>Договор оферты</span></div>
        </div>
      </footer>
    </div>
  );
}
