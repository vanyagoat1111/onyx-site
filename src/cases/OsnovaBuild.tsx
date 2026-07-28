import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/* OSNOVA — строительство домов под ключ.
   Визуальный язык: бетон и чертёж. Оливково-песочная палитра, широкие
   гротескные заголовки, разметочная сетка как у рабочей документации. */

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = '', delay = 0, style }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

const CLAY = '#C8703C';
const SAND = '#D8CFC0';

const navLinks = [
  { name: 'Проекты', href: 'projects' },
  { name: 'Этапы', href: 'stages' },
  { name: 'Цены', href: 'prices' },
  { name: 'Контакты', href: 'contacts' },
];

const heroFacts = [
  { v: '184', l: 'дома сдано' },
  { v: '11 лет', l: 'на рынке' },
  { v: '5 лет', l: 'гарантия на каркас' },
  { v: '0 ₽', l: 'смета и выезд' },
];

const projects = [
  { name: 'Дом «Ольха»', area: '146 м²', term: '5 месяцев', price: '6 900 000 ₽', tech: 'Газобетон', tone: '#8A7F6D' },
  { name: 'Дом «Сосна»', area: '112 м²', term: '4 месяца', price: '5 200 000 ₽', tech: 'Каркас', tone: '#9C8E76' },
  { name: 'Дом «Гранит»', area: '210 м²', term: '7 месяцев', price: '11 400 000 ₽', tech: 'Кирпич', tone: '#77705F' },
  { name: 'Дом «Терраса»', area: '168 м²', term: '6 месяцев', price: '8 300 000 ₽', tech: 'Газобетон', tone: '#8A7F6D' },
];

const stages = [
  { n: '01', t: 'Выезд и замер', d: 'Смотрим участок, геологию и подъезд техники. Бесплатно, в течение двух дней после заявки.' },
  { n: '02', t: 'Проект и смета', d: 'Планировки, разрезы, ведомость материалов. Смета фиксируется договором и не растёт по ходу.' },
  { n: '03', t: 'Фундамент', d: 'Свайно-ростверковый или плита — по результатам геологии, а не по прайсу.' },
  { n: '04', t: 'Коробка и кровля', d: 'Стены, перекрытия, стропильная система. Закрываем контур до холодов.' },
  { n: '05', t: 'Инженерия', d: 'Отопление, водоснабжение, электрика. Схемы согласуем до штробления.' },
  { n: '06', t: 'Отделка и сдача', d: 'Чистовая отделка, уборка, исполнительная документация и гарантийный талон.' },
];

const packages = [
  {
    name: 'Коробка',
    price: 'от 32 000',
    unit: '₽ / м²',
    lead: 'Фундамент, стены, кровля, окна',
    items: ['Геология и проект', 'Фундамент по расчёту', 'Стены и перекрытия', 'Кровля с водостоком', 'Окна и входная дверь'],
    accent: false,
  },
  {
    name: 'Под ключ',
    price: 'от 58 000',
    unit: '₽ / м²',
    lead: 'Заезжаете и живёте',
    items: ['Всё из «Коробки»', 'Инженерные сети', 'Чистовая отделка', 'Сантехника и электрика', 'Благоустройство входной группы', 'Гарантия 5 лет'],
    accent: true,
  },
  {
    name: 'Реконструкция',
    price: 'по смете',
    unit: '',
    lead: 'Работа с существующим домом',
    items: ['Обследование конструкций', 'Усиление и замена узлов', 'Перепланировка', 'Замена инженерии', 'Фасад и кровля'],
    accent: false,
  },
];

const guarantees = [
  { t: 'Смета не растёт', d: 'Цена в договоре фиксированная. Дополнительные работы — только письменным соглашением.' },
  { t: 'Свои бригады', d: 'Не субподряд. Прораб на объекте каждый день, вы знаете его по имени.' },
  { t: 'Отчёт каждую пятницу', d: 'Фотоотчёт, что сделано за неделю и что будет на следующей.' },
  { t: 'Оплата по этапам', d: 'Платите за завершённый этап после приёмки, а не вперёд.' },
];

const faqs = [
  { q: 'Строите зимой?', a: 'Да. Фундамент и коробку ведём при отрицательных температурах с противоморозными добавками и прогревом. Отделку планируем на тёплый сезон.' },
  { q: 'Можно с моим проектом?', a: 'Можно. Проведём экспертизу документации, укажем на слабые узлы и посчитаем смету по вашим чертежам.' },
  { q: 'Что если смета вырастет?', a: 'Не вырастет. Всё, что можно посчитать заранее, посчитано в договоре. Изменения возможны только если вы сами захотите добавить работы.' },
  { q: 'Помогаете с ипотекой?', a: 'Готовим полный пакет для банка: договор, смету, проект. Работаем с эскроу-счетами и сельской ипотекой.' },
  { q: 'Сколько длится гарантия?', a: 'Пять лет на несущие конструкции и кровлю, два года на инженерию и отделку. Выезд по гарантии — в течение трёх дней.' },
];

export default function OsnovaBuild() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [area, setArea] = useState(140);
  const [pkg, setPkg] = useState(1);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const rate = [32000, 58000, 44000][pkg];
  const total = (area * rate).toLocaleString('ru-RU');

  return (
    <div className="relative min-h-screen bg-[#12110F] text-[#EDE8DF] font-archivo selection:bg-[#C8703C]/40 overflow-x-clip">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#12110F]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8 py-4 flex justify-between items-center pl-20 md:pl-24">
          <div className="font-black uppercase tracking-[0.18em] text-lg">
            OSNOVA<span style={{ color: CLAY }}>.</span>
          </div>
          <nav className="hidden md:flex gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={`#${l.href}`} onClick={(e) => scrollTo(e, l.href)} className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#9A9184] hover:text-[#EDE8DF] transition-colors">{l.name}</a>
            ))}
          </nav>
          <a href="#contacts" onClick={(e) => scrollTo(e, 'contacts')} className="hidden sm:inline-block px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#12110F]" style={{ background: CLAY }}>
            Смета за 2 дня
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative px-6 md:px-8 pt-16 md:pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.045] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(237,232,223,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(237,232,223,.6) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
        <div className="absolute right-[-12%] top-[-10%] w-[46vw] h-[46vw] rounded-full pointer-events-none" style={{ background: 'rgba(200,112,60,0.10)', filter: 'blur(160px)' }} />

        <div className="max-w-[1320px] mx-auto relative">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] mb-8" style={{ color: CLAY }}>
            Пермь и край · строительство домов
          </div>
          <h1 className="font-black uppercase leading-[0.92] tracking-[-0.02em] text-[44px] sm:text-[68px] lg:text-[92px] max-w-[16ch]">
            Дом, который<br />
            <span style={{ color: SAND }}>достроят</span>
          </h1>
          <p className="mt-8 max-w-[52ch] text-[#9A9184] text-[17px] leading-[1.65]">
            Работаем по фиксированной смете и своими бригадами. Каждую пятницу присылаем
            фотоотчёт, а платите только за принятый этап.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#contacts" onClick={(e) => scrollTo(e, 'contacts')} className="px-8 py-4 text-[13px] font-bold uppercase tracking-[0.12em] text-[#12110F]" style={{ background: CLAY }}>
              Рассчитать дом
            </a>
            <a href="#projects" onClick={(e) => scrollTo(e, 'projects')} className="px-8 py-4 text-[13px] font-bold uppercase tracking-[0.12em] border border-white/20 hover:border-white/45 transition-colors">
              Сданные объекты
            </a>
          </div>

          <Reveal className="mt-16 grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
            {heroFacts.map((f) => (
              <div key={f.l} className="py-7 pr-6 border-b lg:border-b-0 border-white/10 lg:border-r last:border-r-0 lg:pl-7 first:pl-0">
                <div className="font-black text-[30px] md:text-[38px] leading-none">{f.v}</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#7E7669] mt-2.5">{f.l}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="px-6 md:px-8 py-20 md:py-28 bg-[#181613] border-y border-white/10 scroll-mt-20">
        <div className="max-w-[1320px] mx-auto">
          <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] mb-3" style={{ color: CLAY }}>Сдано в этом сезоне</div>
              <h2 className="font-black uppercase text-3xl md:text-[42px] tracking-tight">Проекты</h2>
            </div>
            <p className="max-w-[38ch] text-sm text-[#9A9184]">Указан фактический срок и итоговая сумма по договору — без «от» и звёздочек.</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((p, i) => (
              <Reveal key={p.name} delay={(i % 2) * 0.08}>
                <div className="group border border-white/10 hover:border-[#C8703C]/60 transition-colors duration-500">
                  <div className="h-[190px] relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${p.tone}, #2A2620)` }}>
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg,rgba(255,255,255,.12) 0 2px,transparent 2px 14px)' }} />
                    <div className="absolute bottom-4 left-5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/80">{p.tech}</div>
                  </div>
                  <div className="p-6 md:p-7">
                    <h3 className="font-black uppercase text-xl tracking-[0.02em] mb-4">{p.name}</h3>
                    <div className="grid grid-cols-3 gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[#7E7669]">
                      <div><span className="block text-[#EDE8DF] text-[15px] font-sans font-semibold mb-1">{p.area}</span>площадь</div>
                      <div><span className="block text-[#EDE8DF] text-[15px] font-sans font-semibold mb-1">{p.term}</span>срок</div>
                      <div><span className="block text-[15px] font-sans font-semibold mb-1" style={{ color: CLAY }}>{p.price}</span>по договору</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="prices" className="px-6 md:px-8 py-20 md:py-28 scroll-mt-20">
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16 items-start">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] mb-3" style={{ color: CLAY }}>Ориентир за минуту</div>
            <h2 className="font-black uppercase text-3xl md:text-[42px] tracking-tight mb-6">Сколько будет стоить</h2>
            <p className="text-[#9A9184] text-[15px] leading-[1.7] mb-9">
              Двигайте площадь и выберите комплектацию. Это прикидка по средним значениям —
              точную смету считаем после выезда на участок, она обычно отличается на 5–8%.
            </p>

            <div className="mb-8">
              <div className="flex justify-between items-baseline mb-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#7E7669]">Площадь дома</span>
                <span className="font-black text-2xl">{area} м²</span>
              </div>
              <input
                type="range" min={60} max={320} step={10} value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full accent-[#C8703C] cursor-pointer"
                aria-label="Площадь дома"
              />
            </div>

            <div className="flex flex-wrap gap-2.5 mb-9">
              {packages.map((p, i) => (
                <button
                  key={p.name} onClick={() => setPkg(i)}
                  className="px-5 py-3 text-[11px] font-bold uppercase tracking-[0.12em] border transition-colors"
                  style={{
                    borderColor: pkg === i ? CLAY : 'rgba(255,255,255,0.15)',
                    background: pkg === i ? CLAY : 'transparent',
                    color: pkg === i ? '#12110F' : '#9A9184',
                  }}
                >
                  {p.name}
                </button>
              ))}
            </div>

            <div className="border border-white/12 p-7" style={{ background: 'rgba(200,112,60,0.06)' }}>
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#7E7669] mb-2">Ориентировочно</div>
              <div className="font-black text-[38px] md:text-[46px] leading-none" style={{ color: SAND }}>{total} ₽</div>
              <div className="text-[13px] text-[#9A9184] mt-3">{packages[pkg].lead}</div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-5">
            {packages.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.07}>
                <div
                  className="border p-7 h-full flex flex-col"
                  style={{ borderColor: p.accent ? 'rgba(200,112,60,0.55)' : 'rgba(255,255,255,0.12)', background: p.accent ? 'rgba(200,112,60,0.07)' : 'transparent' }}
                >
                  <div className="flex items-baseline justify-between gap-4 mb-1.5">
                    <h3 className="font-black uppercase text-xl tracking-[0.03em]">{p.name}</h3>
                    {p.accent && <span className="font-mono text-[9px] uppercase tracking-[0.14em] px-2.5 py-1 text-[#12110F]" style={{ background: CLAY }}>чаще берут</span>}
                  </div>
                  <div className="flex items-end gap-1.5 mb-5">
                    <span className="font-black text-[26px]">{p.price}</span>
                    <span className="text-[#7E7669] text-[13px] mb-1">{p.unit}</span>
                  </div>
                  <ul className="flex flex-col gap-2.5 flex-1">
                    {p.items.map((it) => (
                      <li key={it} className="flex gap-3 text-[13px] text-[#B5AC9E]">
                        <span className="mt-[7px] w-1.5 h-1.5 shrink-0" style={{ background: CLAY }} />{it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STAGES */}
      <section id="stages" className="px-6 md:px-8 py-20 md:py-28 bg-[#181613] border-y border-white/10 scroll-mt-20">
        <div className="max-w-[1320px] mx-auto">
          <Reveal className="mb-14">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] mb-3" style={{ color: CLAY }}>От заявки до ключей</div>
            <h2 className="font-black uppercase text-3xl md:text-[42px] tracking-tight">Шесть этапов</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {stages.map((s, i) => (
              <Reveal key={s.n} delay={(i % 3) * 0.06} className="bg-[#181613] p-7 md:p-8">
                <div className="font-black text-[42px] leading-none mb-5" style={{ color: 'rgba(200,112,60,0.35)' }}>{s.n}</div>
                <h3 className="font-bold uppercase tracking-[0.05em] text-[15px] mb-3">{s.t}</h3>
                <p className="text-[13.5px] text-[#9A9184] leading-[1.65]">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEES */}
      <section className="px-6 md:px-8 py-20 md:py-28">
        <div className="max-w-[1320px] mx-auto">
          <Reveal className="mb-14 max-w-[46ch]">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] mb-3" style={{ color: CLAY }}>Почему нам верят</div>
            <h2 className="font-black uppercase text-3xl md:text-[42px] tracking-tight">Четыре правила, которые мы не нарушаем</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {guarantees.map((g, i) => (
              <Reveal key={g.t} delay={(i % 2) * 0.08} className="border-l-2 pl-6 py-2" style={{ borderColor: CLAY }}>
                <h3 className="font-bold uppercase tracking-[0.05em] text-[15px] mb-2.5">{g.t}</h3>
                <p className="text-[14px] text-[#9A9184] leading-[1.7]">{g.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-8 py-20 md:py-28 bg-[#181613] border-t border-white/10">
        <div className="max-w-[860px] mx-auto">
          <Reveal className="mb-12">
            <h2 className="font-black uppercase text-3xl md:text-[42px] tracking-tight">Частые вопросы</h2>
          </Reveal>
          <div className="flex flex-col">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} delay={i * 0.04} className="border-b border-white/10">
                  <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex justify-between items-center gap-6 py-6 text-left">
                    <span className="font-bold uppercase tracking-[0.03em] text-[15px] md:text-base">{f.q}</span>
                    <span className="text-2xl shrink-0" style={{ color: CLAY }}>{open ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden">
                        <p className="text-[14px] text-[#9A9184] leading-[1.75] pb-7 max-w-[62ch]">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contacts" className="px-6 md:px-8 py-20 md:py-28 scroll-mt-20">
        <Reveal className="max-w-[820px] mx-auto text-center">
          <h2 className="font-black uppercase text-3xl md:text-[46px] tracking-tight leading-[1.05] mb-5">
            Приедем на участок<br />и посчитаем бесплатно
          </h2>
          <p className="text-[#9A9184] text-[15px] mb-10 max-w-[52ch] mx-auto">
            Оставьте номер — перезвоним в течение часа в рабочее время, договоримся о выезде.
            Смету отдаём даже если строить будете не с нами.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 5000); }} className="flex gap-3 max-w-[560px] mx-auto flex-wrap">
            <input required type="tel" placeholder="+7 (___) ___-__-__" className="flex-1 min-w-[220px] bg-transparent border border-white/20 px-5 py-4 font-mono text-sm outline-none focus:border-[#C8703C] transition-colors placeholder:text-white/30" />
            <button type="submit" className="px-8 py-4 text-[13px] font-bold uppercase tracking-[0.12em] text-[#12110F]" style={{ background: CLAY }}>Записаться на замер</button>
          </form>
          {sent && <p className="mt-4 text-[13px]" style={{ color: CLAY }}>Заявка принята. Перезвоним в ближайшее время.</p>}
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-8 pt-16 pb-10 bg-[#0D0C0A] border-t border-white/10">
        <div className="max-w-[1320px] mx-auto flex flex-wrap justify-between gap-10 mb-14">
          <div className="max-w-[300px]">
            <div className="font-black uppercase tracking-[0.18em] text-lg mb-4">OSNOVA<span style={{ color: CLAY }}>.</span></div>
            <p className="text-[13px] text-[#7E7669] leading-[1.7]">Строительство частных домов под ключ в Перми и крае. Своя техника, свои бригады, фиксированная смета.</p>
          </div>
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#7E7669] mb-4">Компания</h4>
            <div className="flex flex-col gap-3 text-[13px]">
              <a href="#projects" onClick={(e) => scrollTo(e, 'projects')} className="hover:text-[#EDE8DF] text-[#9A9184] transition-colors">Проекты</a>
              <a href="#stages" onClick={(e) => scrollTo(e, 'stages')} className="hover:text-[#EDE8DF] text-[#9A9184] transition-colors">Этапы работ</a>
              <a href="#prices" onClick={(e) => scrollTo(e, 'prices')} className="hover:text-[#EDE8DF] text-[#9A9184] transition-colors">Цены</a>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#7E7669] mb-4">Контакты</h4>
            <div className="flex flex-col gap-3 text-[13px] text-[#9A9184]">
              <span className="font-mono text-[17px] text-[#EDE8DF]">+7 (342) 000-00-00</span>
              <span>build@osnova.example</span>
              <span className="text-[#7E7669]">г. Пермь, ул. Строителей, 4<br />Пн–Сб 9:00–19:00</span>
            </div>
          </div>
        </div>
        <div className="max-w-[1320px] mx-auto border-t border-white/10 pt-7 flex flex-wrap justify-between gap-4 font-mono text-[11px] text-[#5F594F]">
          <span>© 2026 OSNOVA. Демонстрационный шаблон.</span>
          <div className="flex gap-5">
            <span>Политика конфиденциальности</span>
            <span>Договор подряда</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
