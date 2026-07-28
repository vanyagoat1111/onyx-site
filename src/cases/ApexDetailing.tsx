import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/* APEX — автосервис и детейлинг.
   Визуальный язык: сервисная карта. Графит, кислотно-зелёный акцент,
   моноширинный шрифт как в диагностическом отчёте. */

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = '', delay = 0, style }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

const LIME = '#C4F82A';
const CARBON = '#0C0D0C';

const navLinks = [
  { name: 'Услуги', href: 'services' },
  { name: 'Работы', href: 'works' },
  { name: 'Цены', href: 'prices' },
  { name: 'Запись', href: 'booking' },
];

const marks = ['BMW', 'Mercedes', 'Audi', 'Toyota', 'Lexus', 'Volkswagen', 'Porsche', 'Land Rover'];

const services = [
  { code: 'DT-01', t: 'Детейлинг кузова', d: 'Полировка в два-три этапа, устранение голограмм и рисок. Замер толщины ЛКП до и после.', from: '18 000 ₽', hours: '8–14 ч' },
  { code: 'DT-02', t: 'Керамика и защита', d: 'Керамическое покрытие или полиуретановая плёнка. Гарантия на состав до трёх лет.', from: '34 000 ₽', hours: '1–2 дня' },
  { code: 'DT-03', t: 'Химчистка салона', d: 'Демонтаж сидений, экстракция, обработка кожи и пластика. Устранение запахов озоном.', from: '9 500 ₽', hours: '6–10 ч' },
  { code: 'SV-01', t: 'Диагностика', d: 'Сканирование блоков, замер компрессии, осмотр подвески на подъёмнике. Отчёт с фото.', from: '2 500 ₽', hours: '1 ч' },
  { code: 'SV-02', t: 'Плановое ТО', d: 'Масла, фильтры, свечи, тормозная жидкость. Оригинал или аналог — на выбор, с ценами.', from: '6 800 ₽', hours: '2–4 ч' },
  { code: 'SV-03', t: 'Ремонт подвески', d: 'Замена стоек, рычагов, сайлентблоков. Развал-схождение на 3D-стенде после ремонта.', from: '7 200 ₽', hours: '3–8 ч' },
];

const promise = [
  { n: '01', t: 'Смета до начала работ', d: 'Присылаем в мессенджер список позиций с ценами. Начинаем только после вашего «да».' },
  { n: '02', t: 'Фотоотчёт по этапам', d: 'Снимаем узел до и после. Старые детали отдаём — или показываем на видео, если отказались.' },
  { n: '03', t: 'Фиксированный нормо-час', d: '1 900 ₽ на все виды работ. Не растёт от марки автомобиля и не «плавает» по ходу.' },
  { n: '04', t: 'Гарантия 12 месяцев', d: 'На работу и на установленные нами детали. Проблема — приезжайте вне очереди.' },
];

const works = [
  { car: 'Porsche Cayenne', job: 'Полировка + керамика', days: '2 дня', gain: 'Глубина цвета и гидрофоб' },
  { car: 'BMW X5', job: 'Химчистка + перетяжка руля', days: '1 день', gain: 'Салон как из шоурума' },
  { car: 'Toyota Land Cruiser', job: 'Ремонт подвески', days: '1 день', gain: 'Убрали стуки на неровностях' },
  { car: 'Audi A6', job: 'Плёнка на кузов', days: '3 дня', gain: 'Защита от сколов на трассе' },
];

const faqs = [
  { q: 'Сколько занимает детейлинг?', a: 'Полировка — от восьми часов до полутора суток в зависимости от состояния лака и площади. Керамика требует ещё сутки на полимеризацию. Точный срок называем после осмотра.' },
  { q: 'Даёте подменный автомобиль?', a: 'На работы дольше одного дня — да, по предварительной брони. Это бесплатно, оставляете залог за топливо.' },
  { q: 'Работаете с страховыми?', a: 'Да, готовим расчёт и фотофиксацию для страховой компании. По направлению от страховщика тоже принимаем.' },
  { q: 'Можно приехать со своими деталями?', a: 'Можно. Гарантия в этом случае распространяется только на работу — на саму деталь мы влиять не можем.' },
  { q: 'Есть ли очередь?', a: 'На ТО и диагностику обычно записываем на следующий день. На детейлинг — за неделю, потому что бокс занимается под один автомобиль целиком.' },
];

export default function ApexDetailing() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [cat, setCat] = useState<'all' | 'DT' | 'SV'>('all');

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const shown = services.filter((s) => cat === 'all' || s.code.startsWith(cat));

  return (
    <div className="relative min-h-screen font-sora selection:bg-[#C4F82A]/30 overflow-x-clip" style={{ background: CARBON, color: '#E8EAE6' }}>
      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10" style={{ background: 'rgba(12,13,12,0.88)' }}>
        <div className="max-w-[1320px] mx-auto px-6 md:px-8 py-4 flex justify-between items-center pl-20 md:pl-24">
          <div className="font-black tracking-[0.2em] text-lg">
            APEX<span style={{ color: LIME }}>/</span>
          </div>
          <nav className="hidden md:flex gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={`#${l.href}`} onClick={(e) => scrollTo(e, l.href)} className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45 hover:text-white transition-colors">{l.name}</a>
            ))}
          </nav>
          <a href="#booking" onClick={(e) => scrollTo(e, 'booking')} className="hidden sm:inline-block px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#0C0D0C]" style={{ background: LIME }}>
            Записаться
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative px-6 md:px-8 pt-16 md:pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.5]" style={{ background: 'radial-gradient(900px 460px at 78% 0%, rgba(196,248,42,0.10), transparent 62%)' }} />
        <div className="max-w-[1320px] mx-auto relative">
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] mb-8" style={{ color: LIME }}>
            Екатеринбург · сервис и детейлинг
          </div>
          <h1 className="font-black leading-[0.94] tracking-[-0.03em]" style={{ fontSize: 'clamp(42px,7.6vw,96px)' }}>
            Смета до работ.<br />
            <span style={{ color: LIME }}>Фото</span> после каждой.
          </h1>
          <p className="mt-8 max-w-[50ch] text-white/50 text-[17px] leading-[1.7]">
            Нормо-час фиксированный, старые детали отдаём, гарантия год.
            Так работает сервис, в который возвращаются, а не заезжают один раз.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#booking" onClick={(e) => scrollTo(e, 'booking')} className="px-8 py-4 font-mono text-[12px] uppercase tracking-[0.14em] text-[#0C0D0C]" style={{ background: LIME }}>
              Записаться на диагностику
            </a>
            <a href="#prices" onClick={(e) => scrollTo(e, 'prices')} className="px-8 py-4 font-mono text-[12px] uppercase tracking-[0.14em] border border-white/20 hover:border-white/45 transition-colors">
              Прайс на работы
            </a>
          </div>

          <Reveal className="mt-14 flex flex-wrap gap-x-8 gap-y-3 items-center border-t border-white/10 pt-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Работаем с</span>
            {marks.map((m) => (
              <span key={m} className="font-mono text-[12px] uppercase tracking-[0.12em] text-white/45">{m}</span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-6 md:px-8 py-20 md:py-28 border-y border-white/10 scroll-mt-20" style={{ background: '#111311' }}>
        <div className="max-w-[1320px] mx-auto">
          <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <h2 className="font-black text-3xl md:text-[42px] tracking-tight">Что делаем</h2>
            <div className="flex gap-2">
              {([['all', 'Всё'], ['DT', 'Детейлинг'], ['SV', 'Сервис']] as const).map(([k, l]) => (
                <button key={k} onClick={() => setCat(k)} className="px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] border transition-colors"
                  style={{ borderColor: cat === k ? LIME : 'rgba(255,255,255,0.15)', background: cat === k ? LIME : 'transparent', color: cat === k ? CARBON : 'rgba(255,255,255,0.5)' }}>
                  {l}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shown.map((s, i) => (
              <Reveal key={s.code} delay={(i % 3) * 0.06}>
                <div className="border border-white/10 p-7 h-full flex flex-col hover:border-[#C4F82A]/50 transition-colors duration-400">
                  <div className="flex justify-between items-center mb-5">
                    <span className="font-mono text-[10px] tracking-[0.18em] text-white/30">{s.code}</span>
                    <span className="font-mono text-[10px] tracking-[0.14em] text-white/30">{s.hours}</span>
                  </div>
                  <h3 className="font-bold text-[18px] mb-3">{s.t}</h3>
                  <p className="text-[13.5px] text-white/45 leading-[1.7] mb-6 flex-1">{s.d}</p>
                  <div className="font-mono text-[15px]" style={{ color: LIME }}>{s.from}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROMISE */}
      <section id="prices" className="px-6 md:px-8 py-20 md:py-28 scroll-mt-20">
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-14">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] mb-4" style={{ color: LIME }}>Правила сервиса</div>
            <h2 className="font-black text-3xl md:text-[42px] tracking-tight leading-[1.06] mb-6">
              Четыре обещания,<br />которые легко проверить
            </h2>
            <p className="text-white/45 text-[15px] leading-[1.75]">
              Каждое из них можно проверить на первом же визите. Если хоть одно
              не выполнено — работа за наш счёт.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: 'rgba(255,255,255,0.1)' }}>
            {promise.map((p, i) => (
              <Reveal key={p.n} delay={(i % 2) * 0.07} className="p-8" style={{ background: CARBON }}>
                <div className="font-mono text-[11px] tracking-[0.2em] mb-5" style={{ color: LIME }}>{p.n}</div>
                <h3 className="font-bold text-[16px] mb-3">{p.t}</h3>
                <p className="text-[13.5px] text-white/45 leading-[1.7]">{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WORKS */}
      <section id="works" className="px-6 md:px-8 py-20 md:py-28 border-y border-white/10 scroll-mt-20" style={{ background: '#111311' }}>
        <div className="max-w-[1320px] mx-auto">
          <Reveal className="mb-12">
            <h2 className="font-black text-3xl md:text-[42px] tracking-tight">Последние работы</h2>
          </Reveal>
          <div className="flex flex-col">
            {works.map((w, i) => (
              <Reveal key={w.car} delay={i * 0.05}>
                <div className="grid grid-cols-1 sm:grid-cols-[1.2fr_1.4fr_0.7fr_1.2fr] gap-4 sm:gap-6 items-center py-6 border-b border-white/10 hover:bg-white/[0.02] transition-colors px-2">
                  <div className="font-bold text-[17px]">{w.car}</div>
                  <div className="text-[14px] text-white/50">{w.job}</div>
                  <div className="font-mono text-[12px] text-white/35">{w.days}</div>
                  <div className="font-mono text-[12px]" style={{ color: LIME }}>{w.gain}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-8 py-20 md:py-28">
        <div className="max-w-[880px] mx-auto">
          <Reveal className="mb-12">
            <h2 className="font-black text-3xl md:text-[42px] tracking-tight">Вопросы</h2>
          </Reveal>
          <div className="flex flex-col">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} delay={i * 0.04} className="border-b border-white/10">
                  <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex justify-between items-center gap-6 py-6 text-left">
                    <span className="font-bold text-[15px] md:text-[17px]">{f.q}</span>
                    <span className="text-2xl shrink-0" style={{ color: LIME }}>{open ? '−' : '+'}</span>
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

      {/* BOOKING */}
      <section id="booking" className="px-6 md:px-8 py-20 md:py-28 border-t border-white/10 scroll-mt-20" style={{ background: '#111311' }}>
        <Reveal className="max-w-[820px] mx-auto text-center">
          <h2 className="font-black tracking-tight leading-[1.05] mb-5" style={{ fontSize: 'clamp(30px,4.6vw,50px)' }}>
            Диагностика <span style={{ color: LIME }}>за час</span>
          </h2>
          <p className="text-white/45 text-[15px] mb-10 max-w-[52ch] mx-auto">
            Сканируем блоки, смотрим подвеску на подъёмнике и отдаём отчёт с фото.
            Дальше решаете сами — чинить у нас или нет.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 5000); }} className="flex gap-3 max-w-[540px] mx-auto flex-wrap">
            <input required type="tel" placeholder="+7 (___) ___-__-__" className="flex-1 min-w-[220px] bg-transparent border border-white/20 px-5 py-4 font-mono text-sm outline-none focus:border-[#C4F82A] transition-colors placeholder:text-white/25" />
            <button type="submit" className="px-8 py-4 font-mono text-[12px] uppercase tracking-[0.14em] text-[#0C0D0C]" style={{ background: LIME }}>Записаться</button>
          </form>
          {sent && <p className="mt-4 font-mono text-[12px]" style={{ color: LIME }}>Принято. Мастер-приёмщик перезвонит в течение 20 минут.</p>}
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-8 pt-16 pb-10" style={{ background: '#080908' }}>
        <div className="max-w-[1320px] mx-auto flex flex-wrap justify-between gap-10 mb-12">
          <div className="max-w-[300px]">
            <div className="font-black tracking-[0.2em] text-lg mb-4">APEX<span style={{ color: LIME }}>/</span></div>
            <p className="text-[13px] text-white/40 leading-[1.7]">Сервис и детейлинг-центр. Четыре подъёмника, отдельный бокс под полировку, 3D-стенд развала.</p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30 mb-4">Сервис</h4>
            <div className="flex flex-col gap-3 text-[13px] text-white/50">
              <a href="#services" onClick={(e) => scrollTo(e, 'services')}>Услуги</a>
              <a href="#works" onClick={(e) => scrollTo(e, 'works')}>Работы</a>
              <a href="#prices" onClick={(e) => scrollTo(e, 'prices')}>Правила</a>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30 mb-4">Контакты</h4>
            <div className="flex flex-col gap-3 text-[13px] text-white/50">
              <span className="font-mono text-[17px] text-white">+7 (343) 000-00-00</span>
              <span>service@apex.example</span>
              <span className="text-white/35">г. Екатеринбург, ул. Автомобильная, 7<br />Пн–Вс 9:00–21:00</span>
            </div>
          </div>
        </div>
        <div className="max-w-[1320px] mx-auto border-t border-white/10 pt-7 flex flex-wrap justify-between gap-4 font-mono text-[11px] text-white/25">
          <span>© 2026 APEX. Демонстрационный шаблон.</span>
          <div className="flex gap-5">
            <span>Политика конфиденциальности</span>
            <span>Гарантийные условия</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
