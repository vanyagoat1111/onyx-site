import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import DemoPlaceholder from '../components/DemoPlaceholder';
import DemoPhoto from '../components/DemoPhoto';
import { DonutStat, StatBars } from '../components/DemoCharts';

/* FLEUR — салон красоты и косметология.
   Визуальный язык: журнальный разворот. Светлая песочная бумага, крупная
   антиква, много воздуха. Намеренно светлая тема — в наборе демо она одна такая. */

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = '', delay = 0, style }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

const INK = '#2A2422';
const ROSE = '#B4796B';
const PAPER = '#F6F1EA';

/* Приём этого шаблона: подбор ухода по типу кожи.

   В красоте человек приходит не за «услугами», а с конкретной жалобой,
   и обычный прайс на это не отвечает. Здесь он отмечает своё состояние
   и сразу видит, с чего начинают именно в таком случае - это снимает
   главный страх «мне навяжут лишнее» и приводит на приём подготовленным.

   Ничего не обещаем и не диагностируем: показываем, с чего начинается
   разговор с косметологом. */
const skinTypes = [
  {
    id: 'dry', t: 'Сухая, стянутость', hint: 'После умывания хочется сразу нанести крем',
    start: 'Увлажняющий протокол и мягкий пилинг',
    course: 'Биоревитализация курсом, обычно 3 процедуры',
    avoid: 'Агрессивные чистки и спиртовые тоники',
  },
  {
    id: 'oily', t: 'Жирная, расширенные поры', hint: 'К середине дня появляется блеск',
    start: 'Комбинированная чистка и себорегулирующий уход',
    course: 'Химический пилинг, курс из 4 процедур с интервалом',
    avoid: 'Пересушивание: оно усиливает выработку себума',
  },
  {
    id: 'combo', t: 'Комбинированная', hint: 'Лоб и нос жирнее, щёки суше',
    start: 'Зональный уход: разные составы на разные участки',
    course: 'Ультразвуковая чистка и микротоки',
    avoid: 'Один и тот же уход на всё лицо',
  },
  {
    id: 'sensitive', t: 'Чувствительная, краснеет', hint: 'Реагирует на холод, косметику, стресс',
    start: 'Успокаивающий протокол без механического воздействия',
    course: 'Мягкая биоревитализация после снятия воспаления',
    avoid: 'Скрабы, распаривание, RF в острой фазе',
  },
  {
    id: 'age', t: 'Возрастные изменения', hint: 'Овал поплыл, появились заломы',
    start: 'Консультация врача и разметка зон',
    course: 'RF-лифтинг курсом, при показаниях - инъекции',
    avoid: 'Начинать с инъекций до оценки состояния кожи',
  },
];

const navLinks = [
  { name: 'Услуги', href: 'services' },
  { name: 'Мастера', href: 'masters' },
  { name: 'Цены', href: 'prices' },
  { name: 'Запись', href: 'booking' },
];

const services = [
  { t: 'Уход за лицом', d: 'Чистки, пилинги, уходовые протоколы на профессиональной косметике.', from: '3 900 ₽', time: '60–90 мин' },
  { t: 'Аппаратная косметология', d: 'RF-лифтинг, ультразвук, микротоки. Курс подбираем по состоянию кожи.', from: '5 500 ₽', time: '45–60 мин' },
  { t: 'Инъекционные методики', d: 'Биоревитализация, мезотерапия, ботулинотерапия. Только врач-косметолог.', from: '9 000 ₽', time: '30–45 мин' },
  { t: 'Волосы', d: 'Стрижка, окрашивание, уход и реконструкция. Подбор цвета при дневном свете.', from: '2 800 ₽', time: '90–180 мин' },
  { t: 'Ногтевой сервис', d: 'Маникюр и педикюр с медицинской стерилизацией инструмента.', from: '2 200 ₽', time: '60–120 мин' },
  { t: 'Брови и ресницы', d: 'Архитектура, окрашивание, ламинирование. Форма под черты лица.', from: '1 900 ₽', time: '40–70 мин' },
];

const masters = [
  { n: 'Анна Верхова', r: 'Врач-косметолог', exp: '14 лет', note: 'Дерматовенеролог, ведёт инъекционные протоколы' },
  { n: 'Ирина Соло', r: 'Колорист', exp: '9 лет', note: 'Сложные окрашивания и восстановление после осветления' },
  { n: 'Мария Лунц', r: 'Эстетист', exp: '7 лет', note: 'Уходы для чувствительной и реактивной кожи' },
  { n: 'Дарья Ким', r: 'Мастер маникюра', exp: '6 лет', note: 'Работа с проблемной ногтевой пластиной' },
];

const steps = [
  { n: 'I', t: 'Диагностика', d: 'Смотрим кожу под лампой, задаём вопросы об уходе и образе жизни. Двадцать минут, бесплатно.' },
  { n: 'II', t: 'План', d: 'Составляем протокол на три месяца: что делаем в кабинете, что дома. С ценами по каждому шагу.' },
  { n: 'III', t: 'Курс', d: 'Идём по плану. После каждой процедуры — фото и заметки в вашей карте.' },
  { n: 'IV', t: 'Поддержка', d: 'Через месяц после курса зовём на бесплатный контроль и корректируем домашний уход.' },
];

const reviews = [
  { n: 'Ольга К.', t: 'Пришла с куперозом, ушла с планом на три месяца вместо «купите эту сыворотку». Через два курса лицо не узнать.', s: 'Косметология' },
  { n: 'Вероника П.', t: 'Первый колорист за десять лет, который отговорил меня от блонда и оказался прав.', s: 'Окрашивание' },
  { n: 'Светлана Р.', t: 'Записываюсь онлайн за минуту, напоминание приходит накануне. Ни разу не забыла про визит.', s: 'Уход' },
];

const faqs = [
  { q: 'Можно записаться на консультацию без процедуры?', a: 'Да, диагностика кожи занимает двадцать минут и ничего не стоит. Вы получите план ухода и решите сами, делать что-то у нас или нет.' },
  { q: 'Как понять, какая процедура мне нужна?', a: 'Не нужно понимать заранее. Косметолог осмотрит кожу, спросит про образ жизни и уход, и предложит два-три варианта с разной ценой и эффектом.' },
  { q: 'Вы работаете с беременными?', a: 'Да, но список процедур ограничен. Уходы и часть аппаратных методик разрешены, инъекции и агрессивные пилинги — нет.' },
  { q: 'Что с гигиеной инструмента?', a: 'Одноразовое всё, что может быть одноразовым. Остальное проходит трёхступенчатую обработку и автоклав. Индикаторы стерильности показываем по просьбе.' },
  { q: 'Сколько ждать записи?', a: 'К эстетисту — обычно два-три дня. К врачу-косметологу и колористу — до недели. Срочные окна появляются каждый день, о них пишем в Telegram.' },
];

function SkinPicker() {
  const [id, setId] = useState(skinTypes[0].id);
  const cur = skinTypes.find((s) => s.id === id) || skinTypes[0];
  const rows: [string, string, string][] = [
    ['С чего начинаем', cur.start, ROSE],
    ['Что обычно дальше', cur.course, INK],
    ['Чего избегаем', cur.avoid, 'rgba(42,36,34,0.5)'],
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-14 items-start">
      <div className="flex flex-col gap-2.5">
        {skinTypes.map((s) => {
          const on = s.id === id;
          return (
            <button
              key={s.id} type="button" onClick={() => setId(s.id)} aria-pressed={on}
              className="text-left px-5 py-4 transition-all duration-300"
              style={{
                background: on ? INK : 'transparent',
                color: on ? PAPER : INK,
                border: `1px solid ${on ? INK : 'rgba(42,36,34,0.16)'}`,
              }}
            >
              <span className="block text-[15px]">{s.t}</span>
              <span
                className="block text-[12.5px] mt-1 leading-snug"
                style={{ color: on ? 'rgba(246,241,234,0.6)' : 'rgba(42,36,34,0.45)' }}
              >
                {s.hint}
              </span>
            </button>
          );
        })}
      </div>

      <div className="p-7 md:p-10" style={{ background: '#EFE7DD' }}>
        <div className="text-[11px] uppercase tracking-[0.28em] mb-6" style={{ color: ROSE }}>{cur.t}</div>
        {rows.map(([label, text, color], i) => (
          <div key={label} className={i ? 'pt-6 mt-6' : ''} style={i ? { borderTop: '1px solid rgba(42,36,34,0.12)' } : undefined}>
            <div className="text-[11px] uppercase tracking-[0.16em] mb-2.5" style={{ color: 'rgba(42,36,34,0.4)' }}>{label}</div>
            <div className="font-cormorant text-[22px] md:text-[27px] leading-[1.3]" style={{ color }}>{text}</div>
          </div>
        ))}
        <a
          href="#booking"
          onClick={(e) => { e.preventDefault(); document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }); }}
          className="inline-block mt-9 px-8 py-4 text-[11px] uppercase tracking-[0.16em] transition-transform hover:-translate-y-[2px] active:brightness-95 active:duration-75"
          style={{ background: ROSE, color: PAPER }}
        >
          Записаться на консультацию
        </a>
      </div>
    </div>
  );
}

export default function FleurBeauty() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [tab, setTab] = useState(0);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  /* Фактура tex-silk - шёлковый отлив: уход, кожа.

     Плоская заливка читается как заготовка: глазу не за что зацепиться. */

  return (
    <div className="relative min-h-screen font-jost selection:bg-[#B4796B]/25 overflow-x-clip tex-silk" style={{ background: PAPER, color: INK }}>
      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b" style={{ background: 'rgba(246,241,234,0.86)', borderColor: 'rgba(42,36,34,0.10)' }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-5 flex justify-between items-center pl-20 md:pl-24">
          <div className="font-cormorant text-[26px] tracking-[0.22em] uppercase">Fleur</div>
          <nav className="hidden md:flex gap-9">
            {navLinks.map((l) => (
              <a key={l.href} href={`#${l.href}`} onClick={(e) => scrollTo(e, l.href)} className="text-[12px] uppercase tracking-[0.18em] transition-colors" style={{ color: 'rgba(42,36,34,0.55)' }}>{l.name}</a>
            ))}
          </nav>
          <a href="#booking" onClick={(e) => scrollTo(e, 'booking')} className="hidden sm:inline-block px-6 py-3 text-[11px] uppercase tracking-[0.18em] text-white rounded-full" style={{ background: ROSE }}>
            Записаться
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="px-6 md:px-8 pt-20 md:pt-28 pb-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-20 items-end">
            <div>
              <div className="text-[11px] uppercase tracking-[0.34em] mb-8" style={{ color: ROSE }}>Салон красоты и косметология · Казань</div>
              <h1 className="font-cormorant leading-[0.95] tracking-[-0.01em]" style={{ fontSize: 'clamp(48px,8vw,104px)' }}>
                Красота<br />
                <span className="italic" style={{ color: ROSE }}>без обещаний</span><br />
                чуда
              </h1>
              <p className="mt-9 max-w-[46ch] text-[17px] leading-[1.75]" style={{ color: 'rgba(42,36,34,0.62)' }}>
                Мы не продаём курсы из двадцати процедур. Сначала смотрим кожу, потом
                говорим, что действительно нужно — и что можно не делать.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#booking" onClick={(e) => scrollTo(e, 'booking')} className="px-8 py-4 rounded-full text-white text-[12px] uppercase tracking-[0.16em]" style={{ background: INK }}>
                  Бесплатная диагностика
                </a>
                <a href="#prices" onClick={(e) => scrollTo(e, 'prices')} className="px-8 py-4 rounded-full text-[12px] uppercase tracking-[0.16em] border" style={{ borderColor: 'rgba(42,36,34,0.2)' }}>
                  Прайс
                </a>
              </div>
            </div>

            <Reveal>
              <div className="relative aspect-[4/5] rounded-[3px] overflow-hidden">
                <img src="/hero-beauty.jpg" alt="Кабинет косметолога"
                     className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(42,36,34,.72),rgba(42,36,34,.10) 55%,transparent)' }} />
                <div className="absolute bottom-7 left-7 right-7 text-white">
                  <div className="font-cormorant text-[42px] leading-none mb-2">7 лет</div>
                  <div className="text-[11px] uppercase tracking-[0.2em] opacity-80">и 4 100 постоянных гостей</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-6 md:px-8 py-20 md:py-28 border-t scroll-mt-20" style={{ borderColor: 'rgba(42,36,34,0.1)' }}>
        <div className="max-w-[1280px] mx-auto">
          <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-16">
            <h2 className="font-cormorant text-[38px] md:text-[54px] leading-none">Направления</h2>
            <p className="max-w-[36ch] text-[14px]" style={{ color: 'rgba(42,36,34,0.55)' }}>
              Цены — стартовые, точная сумма зависит от объёма работы и озвучивается до начала.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(42,36,34,0.1)' }}>
            {services.map((s, i) => (
              <Reveal key={s.t} delay={(i % 3) * 0.06} className="p-8 md:p-9 group transition-colors duration-500" style={{ background: PAPER }}>
                <div className="flex items-baseline justify-between gap-4 mb-4">
                  <h3 className="font-cormorant text-[26px] leading-tight">{s.t}</h3>
                  <span className="text-[11px] uppercase tracking-[0.14em] whitespace-nowrap" style={{ color: ROSE }}>{s.from}</span>
                </div>
                <p className="text-[14px] leading-[1.7] mb-5" style={{ color: 'rgba(42,36,34,0.58)' }}>{s.d}</p>
                <div className="text-[11px] uppercase tracking-[0.16em]" style={{ color: 'rgba(42,36,34,0.38)' }}>{s.time}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ПОДБОР ПО ТИПУ КОЖИ */}
      <section className="px-6 md:px-8 py-20 md:py-28 border-t" style={{ borderColor: 'rgba(42,36,34,0.1)' }}>
        <div className="max-w-[1280px] mx-auto">
          <Reveal className="mb-12 max-w-[46ch]">
            <div className="text-[11px] uppercase tracking-[0.3em] mb-5" style={{ color: ROSE }}>Подбор</div>
            <h2 className="font-cormorant text-[38px] md:text-[54px] leading-[1.05]">С чего начнём именно у вас</h2>
            <p className="mt-6 text-[15.5px] leading-[1.8]" style={{ color: 'rgba(42,36,34,0.6)' }}>
              Отметьте, что ближе к вашему состоянию. Покажем, с чего обычно начинают
              и чего в этом случае лучше избегать. Это не диагноз - разговор всё равно
              начнётся с осмотра.
            </p>
          </Reveal>
          <SkinPicker />
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-6 md:px-8 py-20 md:py-28" style={{ background: '#EFE7DD' }}>
        <div className="max-w-[1280px] mx-auto">
          <Reveal className="mb-16 max-w-[44ch]">
            <div className="text-[11px] uppercase tracking-[0.3em] mb-5" style={{ color: ROSE }}>Как проходит работа</div>
            <h2 className="font-cormorant text-[38px] md:text-[54px] leading-[1.05]">Сначала понимаем, потом делаем</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="font-cormorant text-[40px] italic mb-5" style={{ color: ROSE }}>{s.n}</div>
                <h3 className="text-[13px] uppercase tracking-[0.16em] mb-3">{s.t}</h3>
                <p className="text-[14px] leading-[1.75]" style={{ color: 'rgba(42,36,34,0.6)' }}>{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MASTERS */}
      <section id="masters" className="px-6 md:px-8 py-20 md:py-28 scroll-mt-20">
        <div className="max-w-[1280px] mx-auto">
          <Reveal className="mb-14">
            <h2 className="font-cormorant text-[38px] md:text-[54px] leading-none">Кто работает</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {masters.map((m, i) => (
              <Reveal key={m.n} delay={i * 0.07}>
                <div className="mb-5 rounded-[3px] overflow-hidden">
                  <DemoPhoto src={`/demo/fleur-master-${i + 1}.jpg`} label="Портрет мастера" tone={ROSE} ratio="3/4" icon="person" dark={false} />
                </div>
                <div className="text-[11px] uppercase tracking-[0.18em] mb-2" style={{ color: ROSE }}>{m.r} · {m.exp}</div>
                <h3 className="font-cormorant text-[24px] mb-2.5">{m.n}</h3>
                <p className="text-[13px] leading-[1.65]" style={{ color: 'rgba(42,36,34,0.55)' }}>{m.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="prices" className="px-6 md:px-8 py-20 md:py-28 border-t scroll-mt-20" style={{ borderColor: 'rgba(42,36,34,0.1)' }}>
        <div className="max-w-[1000px] mx-auto">
          <Reveal className="flex gap-2.5 mb-12 flex-wrap justify-center">
            {reviews.map((r, i) => (
              <button type="button" key={r.n} onClick={() => setTab(i)} className="px-5 py-2.5 rounded-full text-[11px] uppercase tracking-[0.14em] transition-colors border"
                style={{ borderColor: tab === i ? ROSE : 'rgba(42,36,34,0.16)', background: tab === i ? ROSE : 'transparent', color: tab === i ? '#fff' : 'rgba(42,36,34,0.55)' }}>
                {r.s}
              </button>
            ))}
          </Reveal>
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={tab}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="text-center"
            >
              <p className="font-cormorant italic leading-[1.4] mb-7" style={{ fontSize: 'clamp(24px,3.6vw,40px)' }}>«{reviews[tab].t}»</p>
              <footer className="text-[11px] uppercase tracking-[0.22em]" style={{ color: ROSE }}>{reviews[tab].n}</footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-8 py-20 md:py-28" style={{ background: '#EFE7DD' }}>
        <div className="max-w-[860px] mx-auto">
          <Reveal className="mb-12">
            <h2 className="font-cormorant text-[38px] md:text-[52px] leading-none">Вопросы</h2>
          </Reveal>
          <div className="flex flex-col">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} delay={i * 0.04} className="border-b" style={{ borderColor: 'rgba(42,36,34,0.14)' }}>
                  <button type="button" onClick={() => setOpenFaq(open ? null : i)} className="w-full flex justify-between items-center gap-6 py-6 text-left">
                    <span className="font-cormorant text-[20px] md:text-[23px]">{f.q}</span>
                    <span className="text-[22px] shrink-0" style={{ color: ROSE }}>{open ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden">
                        <p className="text-[14.5px] leading-[1.8] pb-7 max-w-[62ch]" style={{ color: 'rgba(42,36,34,0.62)' }}>{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      {/* ПРАЙС + ИНФОГРАФИКА */}
      <section className="px-6 md:px-8 py-20 md:py-28 border-t" style={{ borderColor: 'rgba(42,36,34,0.1)', background: '#EFE8DE' }}>
        <div className="max-w-[1100px] mx-auto">
          <Reveal className="text-center mb-14">
            <h2 className="font-cormorant leading-none mb-4" style={{ fontSize: 'clamp(34px,5vw,54px)' }}>Прайс и время</h2>
            <p className="text-[14.5px] max-w-[48ch] mx-auto leading-[1.75]" style={{ color: 'rgba(42,36,34,0.55)' }}>
              Сколько длится процедура и сколько стоит. Время указано с запасом — мы не ставим записи впритык,
              чтобы никто не ждал в коридоре.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14">
            {[
              ['Стрижка и укладка', '90 мин', '3 400 ₽'],
              ['Окрашивание в один тон', '150 мин', '6 800 ₽'],
              ['Сложное окрашивание', 'от 240 мин', 'от 12 000 ₽'],
              ['Уход и восстановление', '60 мин', '4 200 ₽'],
              ['Маникюр с покрытием', '90 мин', '2 900 ₽'],
              ['Педикюр', '105 мин', '3 600 ₽'],
              ['Оформление бровей', '45 мин', '1 800 ₽'],
              ['Чистка лица', '75 мин', '4 900 ₽'],
            ].map(([n, t, p], i) => (
              <Reveal key={n} delay={i * 0.03} className="grid grid-cols-[1fr_auto_auto] gap-5 py-4 border-b items-baseline" style={{ borderColor: 'rgba(42,36,34,0.12)' }}>
                <span className="text-[15px]">{n}</span>
                <span className="text-[12.5px] w-[80px] text-right" style={{ color: 'rgba(42,36,34,0.4)' }}>{t}</span>
                <span className="text-[15px] w-[100px] text-right" style={{ color: ROSE }}>{p}</span>
              </Reveal>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center mt-20 pt-16 border-t" style={{ borderColor: 'rgba(42,36,34,0.12)' }}>
            <Reveal className="flex flex-col sm:flex-row lg:flex-col gap-10 justify-center">
              <DonutStat tone={ROSE} muted="rgba(42,36,34,0.12)" value={82} size={150}
                label="Возвращаются к своему мастеру" sub="Доля клиентов, записавшихся повторно в течение трёх месяцев." />
              <DonutStat tone={ROSE} muted="rgba(42,36,34,0.12)" value={7} max={30} suffix=" мин" size={150}
                label="Средняя задержка" sub="Мы закладываем паузу между записями, поэтому ждать почти не приходится." />
            </Reveal>
            <div>
              <Reveal className="mb-8">
                <h3 className="font-cormorant text-[28px] md:text-[34px] leading-none mb-3">Когда проще записаться</h3>
                <p className="text-[14px] leading-[1.75] max-w-[48ch]" style={{ color: 'rgba(42,36,34,0.55)' }}>
                  Загруженность по дням недели. В понедельник и вторник почти всегда есть окна
                  на ближайшие сутки, в субботу записываться лучше за неделю.
                </p>
              </Reveal>
              <Reveal>
                <StatBars tone={ROSE} muted="rgba(42,36,34,0.1)" unit="%" labelColor="rgba(42,36,34,0.75)"
                  items={[
                    { label: 'Понедельник — вторник', value: 46, note: 'окна почти всегда есть' },
                    { label: 'Среда — четверг', value: 68 },
                    { label: 'Пятница', value: 87 },
                    { label: 'Суббота', value: 97, note: 'записываться за неделю' },
                  ]} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section id="booking" className="px-6 md:px-8 py-20 md:py-28 scroll-mt-20">
        <Reveal className="max-w-[760px] mx-auto text-center">
          <h2 className="font-cormorant leading-[1.05] mb-6" style={{ fontSize: 'clamp(34px,5vw,58px)' }}>
            Начните с бесплатной<br />диагностики
          </h2>
          <p className="text-[15px] mb-10 max-w-[48ch] mx-auto" style={{ color: 'rgba(42,36,34,0.6)' }}>
            Двадцать минут, осмотр под лампой и честный ответ, что вашей коже нужно,
            а что продавать вам не станут.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 5000); }} className="flex gap-3 max-w-[520px] mx-auto flex-wrap">
            <input required type="tel" placeholder="+7 (___) ___-__-__" className="flex-1 min-w-[220px] bg-transparent border rounded-full px-6 py-4 text-[14px] outline-none transition-colors" style={{ borderColor: 'rgba(42,36,34,0.22)' }} />
            <button type="submit" className="px-8 py-4 rounded-full text-white text-[12px] uppercase tracking-[0.16em]" style={{ background: ROSE }}>Записаться</button>
          </form>
          {sent && <p className="mt-4 text-[13px]" style={{ color: ROSE }}>Спасибо! Администратор свяжется с вами в течение часа.</p>}
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-8 pt-16 pb-10 border-t" style={{ borderColor: 'rgba(42,36,34,0.12)' }}>
        <div className="max-w-[1280px] mx-auto flex flex-wrap justify-between gap-10 mb-12">
          <div className="max-w-[300px]">
            <div className="font-cormorant text-[24px] tracking-[0.22em] uppercase mb-4">Fleur</div>
            <p className="text-[13px] leading-[1.75]" style={{ color: 'rgba(42,36,34,0.55)' }}>
              Салон красоты и косметология. Медицинская лицензия, врач-косметолог в штате.
            </p>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.18em] mb-4" style={{ color: 'rgba(42,36,34,0.4)' }}>Салон</h4>
            <div className="flex flex-col gap-3 text-[13px]" style={{ color: 'rgba(42,36,34,0.62)' }}>
              <a href="#services" onClick={(e) => scrollTo(e, 'services')}>Услуги</a>
              <a href="#masters" onClick={(e) => scrollTo(e, 'masters')}>Мастера</a>
              <a href="#booking" onClick={(e) => scrollTo(e, 'booking')}>Запись</a>
            </div>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.18em] mb-4" style={{ color: 'rgba(42,36,34,0.4)' }}>Контакты</h4>
            <div className="flex flex-col gap-3 text-[13px]" style={{ color: 'rgba(42,36,34,0.62)' }}>
              <span className="text-[17px]" style={{ color: INK }}>+7 (843) 000-00-00</span>
              <span>hello@fleur.example</span>
              <span>г. Казань, ул. Профсоюзная, 12<br />Ежедневно 9:00–21:00</span>
            </div>
          </div>
        </div>
        <div className="max-w-[1280px] mx-auto border-t pt-7 flex flex-wrap justify-between gap-4 text-[11px]" style={{ borderColor: 'rgba(42,36,34,0.12)', color: 'rgba(42,36,34,0.4)' }}>
          <span>© 2026 Fleur. Демонстрационный шаблон.</span>
          <div className="flex gap-5">
            <span>Политика конфиденциальности</span>
            <span>Лицензия</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
