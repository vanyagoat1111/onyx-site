import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/* FORMA — производственная компания (металлоконструкции).
   Визуальный язык: инженерный чертёж. Стальная сине-серая гамма,
   таблицы и допуски, ничего декоративного. */

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = '', delay = 0, style }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay, ease: EASE }} className={className} style={style}>
      {children}
    </motion.div>
  );
}

const STEEL = '#5B8BB5';
const BG = '#0E1116';

const navLinks = [
  { name: 'Производство', href: 'production' },
  { name: 'Мощности', href: 'capacity' },
  { name: 'Контроль', href: 'quality' },
  { name: 'Запрос', href: 'request' },
];

const capabilities = [
  { t: 'Лазерная резка', spec: 'до 25 мм · ±0,1 мм', d: 'Оптоволоконный станок 6 кВт, поле 3000×1500. Раскрой с оптимизацией остатка.' },
  { t: 'Гибка', spec: 'до 4 м · 200 т', d: 'Листогибочный пресс с ЧПУ, программируемые последовательности для серий.' },
  { t: 'Сварка', spec: 'MIG/MAG · TIG', d: 'Аттестованные сварщики НАКС, полуавтоматы и роботизированная ячейка для серий.' },
  { t: 'Механообработка', spec: 'токарная · фрезерная', d: 'Пять станков с ЧПУ, работа по чертежу заказчика или по образцу.' },
  { t: 'Покраска', spec: 'порошок · жидкая', d: 'Камера 7×3 м, подготовка поверхности дробеструйкой, каталог RAL целиком.' },
  { t: 'Сборка', spec: 'узлы и модули', d: 'Собираем готовые изделия, комплектуем крепежом и отгружаем на объект.' },
];

const numbers = [
  { v: '14 000', l: 'м² производственных площадей' },
  { v: '38', l: 'единиц оборудования' },
  { v: '640 т', l: 'металла в месяц' },
  { v: '9 лет', l: 'средний стаж мастера' },
];

const flow = [
  { n: '01', t: 'Чертёж или ТЗ', d: 'Принимаем DWG, STEP, PDF или эскиз от руки. Технолог проверяет на изготовимость.' },
  { n: '02', t: 'Расчёт', d: 'Смета с разбивкой по металлу, работе и покрытию. Срок ответа — один рабочий день.' },
  { n: '03', t: 'Опытный образец', d: 'Для серий делаем первую деталь и согласуем до запуска партии.' },
  { n: '04', t: 'Производство', d: 'Партия по маршрутной карте. Статус по этапам доступен вашему снабженцу.' },
  { n: '05', t: 'Контроль', d: 'ОТК по чертежу: геометрия, швы, покрытие. Протокол с замерами прикладываем.' },
  { n: '06', t: 'Отгрузка', d: 'Упаковка под транспорт, паспорт изделия и сертификаты на металл.' },
];

const quality = [
  { t: 'Входной контроль металла', d: 'Каждая партия проката проверяется по сертификату и замеряется толщиномером.' },
  { t: 'Пооперационный контроль', d: 'Мастер участка принимает деталь после каждой операции, а не в конце цепочки.' },
  { t: 'Протокол замеров', d: 'К каждой партии — таблица фактических размеров с указанием допусков по чертежу.' },
  { t: 'Ответственность за брак', d: 'Переделываем за свой счёт и компенсируем срок. Прописано в договоре, а не на словах.' },
];

const faqs = [
  { q: 'Работаете с единичными заказами?', a: 'Да. Минимальной партии нет, но себестоимость единичной детали выше — часть подготовительных операций одинакова и для одной штуки, и для сотни.' },
  { q: 'Нужен ли готовый чертёж?', a: 'Не обязательно. Достаточно эскиза с размерами или образца детали. Конструктор оформит документацию, это входит в стоимость при заказе от 50 000 ₽.' },
  { q: 'Какие сроки?', a: 'Резка и гибка — от двух рабочих дней. Изделия со сваркой и покраской — от семи. Точный срок фиксируем в спецификации к договору.' },
  { q: 'Работаете по 44-ФЗ и 223-ФЗ?', a: 'Да, участвуем в закупках, есть опыт исполнения контрактов. Готовим полный пакет документов и обеспечение.' },
  { q: 'Есть отсрочка платежа?', a: 'Для постоянных заказчиков — до 30 дней после подписания акта. Для первого заказа работаем по предоплате 50%.' },
];

export default function FormaIndustry() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen font-jakarta selection:bg-[#5B8BB5]/30 overflow-x-clip" style={{ background: BG, color: '#DDE4EC' }}>
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10" style={{ background: 'rgba(14,17,22,0.9)' }}>
        <div className="max-w-[1320px] mx-auto px-6 md:px-8 py-4 flex justify-between items-center pl-20 md:pl-24">
          <div className="font-extrabold tracking-[0.24em] text-[17px]">FORMA</div>
          <nav className="hidden md:flex gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={`#${l.href}`} onClick={(e) => scrollTo(e, l.href)} className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45 hover:text-white transition-colors">{l.name}</a>
            ))}
          </nav>
          <a href="#request" onClick={(e) => scrollTo(e, 'request')} className="hidden sm:inline-block px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[#0E1116]" style={{ background: STEEL }}>Прислать чертёж</a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative px-6 md:px-8 pt-16 md:pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(221,228,236,.7) 1px,transparent 1px),linear-gradient(90deg,rgba(221,228,236,.7) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="max-w-[1320px] mx-auto relative">
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] mb-7" style={{ color: STEEL }}>Металлоконструкции · контрактное производство</div>
          <h1 className="font-extrabold leading-[0.98] tracking-[-0.025em]" style={{ fontSize: 'clamp(40px,6.8vw,84px)' }}>
            Считаем за день,<br />делаем по чертежу,<br /><span style={{ color: STEEL }}>отвечаем за допуск</span>
          </h1>
          <p className="mt-8 max-w-[52ch] text-white/50 text-[16.5px] leading-[1.7]">
            Полный цикл на одной площадке: резка, гибка, сварка, механообработка и покраска.
            Без посредников между вашим чертежом и готовой деталью.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#request" onClick={(e) => scrollTo(e, 'request')} className="px-8 py-4 font-mono text-[12px] uppercase tracking-[0.13em] text-[#0E1116]" style={{ background: STEEL }}>Получить расчёт</a>
            <a href="#capacity" onClick={(e) => scrollTo(e, 'capacity')} className="px-8 py-4 font-mono text-[12px] uppercase tracking-[0.13em] border border-white/20 hover:border-white/45 transition-colors">Парк оборудования</a>
          </div>

          <Reveal className="mt-16 grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
            {numbers.map((n) => (
              <div key={n.l} className="py-7 pr-6 border-b lg:border-b-0 border-white/10 lg:border-r last:border-r-0 lg:pl-7 first:pl-0">
                <div className="font-extrabold text-[30px] md:text-[36px] leading-none">{n.v}</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/35 mt-2.5">{n.l}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="capacity" className="px-6 md:px-8 py-20 md:py-28 border-y border-white/10 scroll-mt-20" style={{ background: '#121722' }}>
        <div className="max-w-[1320px] mx-auto">
          <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <h2 className="font-extrabold text-3xl md:text-[40px] tracking-tight">Что умеет цех</h2>
            <p className="max-w-[40ch] text-sm text-white/45">Все операции внутри. Деталь не уезжает к подрядчикам и не теряет сроки на логистике.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.09)' }}>
            {capabilities.map((c, i) => (
              <Reveal key={c.t} delay={(i % 3) * 0.05} className="p-7 md:p-8" style={{ background: '#121722' }}>
                <div className="flex items-baseline justify-between gap-3 mb-4">
                  <h3 className="font-bold text-[17px]">{c.t}</h3>
                </div>
                <div className="font-mono text-[11px] tracking-[0.1em] mb-4" style={{ color: STEEL }}>{c.spec}</div>
                <p className="text-[13.5px] text-white/45 leading-[1.7]">{c.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FLOW */}
      <section id="production" className="px-6 md:px-8 py-20 md:py-28 scroll-mt-20">
        <div className="max-w-[1320px] mx-auto">
          <Reveal className="mb-14 max-w-[46ch]">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] mb-4" style={{ color: STEEL }}>Маршрут заказа</div>
            <h2 className="font-extrabold text-3xl md:text-[40px] tracking-tight leading-[1.08]">От чертежа до отгрузки — шесть контрольных точек</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {flow.map((f, i) => (
              <Reveal key={f.n} delay={(i % 3) * 0.06} className="border border-white/10 p-7 hover:border-[#5B8BB5]/50 transition-colors duration-400">
                <div className="font-mono text-[11px] tracking-[0.2em] mb-5" style={{ color: STEEL }}>{f.n}</div>
                <h3 className="font-bold text-[16px] mb-3">{f.t}</h3>
                <p className="text-[13.5px] text-white/45 leading-[1.7]">{f.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY */}
      <section id="quality" className="px-6 md:px-8 py-20 md:py-28 border-y border-white/10 scroll-mt-20" style={{ background: '#121722' }}>
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-14">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] mb-4" style={{ color: STEEL }}>ОТК</div>
            <h2 className="font-extrabold text-3xl md:text-[40px] tracking-tight leading-[1.08] mb-6">Контроль на каждой операции, а не в конце</h2>
            <p className="text-white/45 text-[15px] leading-[1.75]">
              Брак дешевле поймать на второй операции, чем на восьмой. Поэтому мастер
              участка принимает деталь сразу, а не когда партия уже покрашена.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {quality.map((q, i) => (
              <Reveal key={q.t} delay={(i % 2) * 0.07} className="border-l-2 pl-6 py-1.5" style={{ borderColor: STEEL }}>
                <h3 className="font-bold text-[15px] mb-2.5">{q.t}</h3>
                <p className="text-[13.5px] text-white/45 leading-[1.7]">{q.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-8 py-20 md:py-28">
        <div className="max-w-[880px] mx-auto">
          <Reveal className="mb-12"><h2 className="font-extrabold text-3xl md:text-[40px] tracking-tight">Вопросы снабженцев</h2></Reveal>
          <div className="flex flex-col">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} delay={i * 0.04} className="border-b border-white/10">
                  <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex justify-between items-center gap-6 py-6 text-left">
                    <span className="font-bold text-[15px] md:text-[17px]">{f.q}</span>
                    <span className="text-2xl shrink-0" style={{ color: STEEL }}>{open ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden">
                        <p className="text-[14px] text-white/45 leading-[1.75] pb-7 max-w-[64ch]">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* REQUEST */}
      <section id="request" className="px-6 md:px-8 py-20 md:py-28 border-t border-white/10 scroll-mt-20" style={{ background: '#121722' }}>
        <Reveal className="max-w-[820px] mx-auto text-center">
          <h2 className="font-extrabold tracking-tight leading-[1.06] mb-5" style={{ fontSize: 'clamp(30px,4.4vw,48px)' }}>Пришлите чертёж — ответим за день</h2>
          <p className="text-white/45 text-[15px] mb-10 max-w-[54ch] mx-auto">
            Принимаем DWG, STEP, PDF и фото эскиза. Технолог проверит изготовимость
            и пришлёт смету с разбивкой по металлу, работе и покрытию.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 5000); }} className="flex gap-3 max-w-[540px] mx-auto flex-wrap">
            <input required type="tel" placeholder="+7 (___) ___-__-__" className="flex-1 min-w-[220px] bg-transparent border border-white/20 px-5 py-4 font-mono text-sm outline-none focus:border-[#5B8BB5] transition-colors placeholder:text-white/25" />
            <button type="submit" className="px-8 py-4 font-mono text-[12px] uppercase tracking-[0.13em] text-[#0E1116]" style={{ background: STEEL }}>Запросить расчёт</button>
          </form>
          {sent && <p className="mt-4 font-mono text-[12px]" style={{ color: STEEL }}>Заявка принята. Технолог свяжется в течение рабочего дня.</p>}
        </Reveal>
      </section>

      <footer className="px-6 md:px-8 pt-16 pb-10" style={{ background: '#0A0D11' }}>
        <div className="max-w-[1320px] mx-auto flex flex-wrap justify-between gap-10 mb-12">
          <div className="max-w-[300px]">
            <div className="font-extrabold tracking-[0.24em] text-[17px] mb-4">FORMA</div>
            <p className="text-[13px] text-white/40 leading-[1.7]">Контрактное производство металлоконструкций. Полный цикл на собственной площадке.</p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/30 mb-4">Производство</h4>
            <div className="flex flex-col gap-3 text-[13px] text-white/50">
              <a href="#capacity" onClick={(e) => scrollTo(e, 'capacity')}>Оборудование</a>
              <a href="#production" onClick={(e) => scrollTo(e, 'production')}>Маршрут заказа</a>
              <a href="#quality" onClick={(e) => scrollTo(e, 'quality')}>Контроль качества</a>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/30 mb-4">Отдел продаж</h4>
            <div className="flex flex-col gap-3 text-[13px] text-white/50">
              <span className="font-mono text-[17px] text-white">+7 (351) 000-00-00</span>
              <span>zakaz@forma.example</span>
              <span className="text-white/35">г. Челябинск, Промышленная зона, 12<br />Пн–Пт 8:00–18:00</span>
            </div>
          </div>
        </div>
        <div className="max-w-[1320px] mx-auto border-t border-white/10 pt-7 flex flex-wrap justify-between gap-4 font-mono text-[11px] text-white/25">
          <span>© 2026 FORMA. Демонстрационный шаблон.</span>
          <div className="flex gap-5"><span>Политика конфиденциальности</span><span>Реквизиты</span></div>
        </div>
      </footer>
    </div>
  );
}
