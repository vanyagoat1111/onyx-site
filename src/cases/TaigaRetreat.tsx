import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/* TAIGA — база отдыха и загородный отель.
   Визуальный язык: спокойный лес. Глубокая хвоя, тёплый камень, много воздуха
   и крупная антиква Spectral. Никакой суеты — сайт должен успокаивать. */

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = '', delay = 0, style }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.85, delay, ease: EASE }} className={className} style={style}>
      {children}
    </motion.div>
  );
}

const MOSS = '#7E9B6E';
const BG = '#101410';

const navLinks = [
  { name: 'Домики', href: 'houses' },
  { name: 'Территория', href: 'area' },
  { name: 'Цены', href: 'prices' },
  { name: 'Бронь', href: 'booking' },
];

const houses = [
  { n: 'Кедр', cap: '2–3 гостя', area: '38 м²', price: '7 400', has: ['Панорамное окно', 'Камин', 'Терраса с видом на озеро'] },
  { n: 'Сосна', cap: '4 гостя', area: '56 м²', price: '11 200', has: ['Две спальни', 'Кухня-гостиная', 'Своя баня'] },
  { n: 'Лиственница', cap: '6–8 гостей', area: '94 м²', price: '18 900', has: ['Три спальни', 'Каминный зал', 'Мангальная зона', 'Чан на дровах'] },
];

const area = [
  { t: 'Озеро', d: 'Своя береговая линия 300 метров, мостки, лодки и сапборды летом.' },
  { t: 'Банный комплекс', d: 'Русская парная на дровах, купель, чан под открытым небом.' },
  { t: 'Тропы', d: 'Размеченные маршруты 3, 7 и 14 км. Зимой — лыжня и снегоходы.' },
  { t: 'Ресторан', d: 'Кухня на дровах, завтраки включены, ужин по предзаказу.' },
  { t: 'Детская зона', d: 'Площадка, анимация в выходные, детские велосипеды напрокат.' },
  { t: 'Парковка', d: 'Крытая, на 40 машин, зарядка для электромобилей.' },
];

const seasons = [
  { s: 'Зима', d: 'Снегоходы, каток на озере, баня и глинтвейн у камина.', badge: 'Декабрь — март' },
  { s: 'Весна', d: 'Тишина, рыбалка на открытой воде и самые низкие цены в году.', badge: 'Апрель — май' },
  { s: 'Лето', d: 'Купание, сапборды, мангал до полуночи и долгие светлые вечера.', badge: 'Июнь — август' },
  { s: 'Осень', d: 'Грибы, туман над озером и пледы на террасе. Лучшее время для фото.', badge: 'Сентябрь — ноябрь' },
];

const faqs = [
  { q: 'Как добраться?', a: 'Сто двадцать километров от города по асфальту, последние три — грейдер, проезжаемый на любой машине. Присылаем точку в навигаторе после брони. Есть трансфер за 4 000 ₽ в одну сторону.' },
  { q: 'Можно с животными?', a: 'Да, в домиках «Сосна» и «Лиственница». Доплата 800 ₽ в сутки, просим предупредить заранее и не оставлять питомца одного в домике.' },
  { q: 'Что входит в стоимость?', a: 'Проживание, завтрак, парковка, доступ к тропам и пляжу, дрова для камина. Баня, чан и трансфер оплачиваются отдельно.' },
  { q: 'Есть ли связь и интернет?', a: 'Мобильная связь уверенная, Wi-Fi в ресторане и в домиках. Скорости хватает на созвоны, но мы надеемся, что вы приехали не за этим.' },
  { q: 'Как отменить бронь?', a: 'Бесплатно за семь дней до заезда. Позже удерживаем стоимость первых суток. Если переносите даты — переносим предоплату целиком.' },
];

export default function TaigaRetreat() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [nights, setNights] = useState(2);
  const [house, setHouse] = useState(1);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const total = (Number(houses[house].price.replace(/\s/g, '')) * nights).toLocaleString('ru-RU');

  return (
    <div className="relative min-h-screen font-jost selection:bg-[#7E9B6E]/30 overflow-x-clip" style={{ background: BG, color: '#E6EAE2' }}>
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10" style={{ background: 'rgba(16,20,16,0.88)' }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-5 flex justify-between items-center pl-20 md:pl-24">
          <div className="font-spectral text-[23px] tracking-[0.2em] uppercase">Taiga</div>
          <nav className="hidden md:flex gap-9">
            {navLinks.map((l) => (
              <a key={l.href} href={`#${l.href}`} onClick={(e) => scrollTo(e, l.href)} className="text-[12px] uppercase tracking-[0.16em] text-white/45 hover:text-white transition-colors">{l.name}</a>
            ))}
          </nav>
          <a href="#booking" onClick={(e) => scrollTo(e, 'booking')} className="hidden sm:inline-block px-6 py-3 text-[11px] uppercase tracking-[0.16em] rounded-full" style={{ background: MOSS, color: '#101410' }}>Забронировать</a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative px-6 md:px-8 pt-20 md:pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(800px 500px at 70% 15%, rgba(126,155,110,0.14), transparent 65%)' }} />
        <div className="max-w-[1280px] mx-auto relative">
          <div className="text-[11px] uppercase tracking-[0.34em] mb-9" style={{ color: MOSS }}>База отдыха · 120 км от города</div>
          <h1 className="font-spectral leading-[0.98] max-w-[15ch]" style={{ fontSize: 'clamp(44px,7.6vw,96px)' }}>
            Тишина, которую<br />слышно
          </h1>
          <p className="mt-9 max-w-[50ch] text-white/50 text-[17px] leading-[1.8]">
            Шесть домов на берегу озера, баня на дровах и лес, в котором за целый день
            можно не встретить ни одного человека.
          </p>
          <div className="mt-11 flex flex-wrap gap-4">
            <a href="#booking" onClick={(e) => scrollTo(e, 'booking')} className="px-8 py-4 rounded-full text-[12px] uppercase tracking-[0.15em]" style={{ background: MOSS, color: '#101410' }}>Проверить даты</a>
            <a href="#houses" onClick={(e) => scrollTo(e, 'houses')} className="px-8 py-4 rounded-full text-[12px] uppercase tracking-[0.15em] border border-white/20 hover:border-white/45 transition-colors">Посмотреть домики</a>
          </div>
        </div>
      </section>

      {/* HOUSES */}
      <section id="houses" className="px-6 md:px-8 py-20 md:py-28 border-y border-white/10 scroll-mt-20" style={{ background: '#141A14' }}>
        <div className="max-w-[1280px] mx-auto">
          <Reveal className="mb-14"><h2 className="font-spectral text-[38px] md:text-[52px] leading-none">Домики</h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {houses.map((h, i) => (
              <Reveal key={h.n} delay={i * 0.08}>
                <div className="h-full flex flex-col border border-white/10 hover:border-[#7E9B6E]/50 transition-colors duration-500">
                  <div className="aspect-[4/3] relative overflow-hidden" style={{ background: `linear-gradient(150deg,#2A3628,#161C16)` }}>
                    <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'repeating-linear-gradient(75deg,rgba(126,155,110,.8) 0 1px,transparent 1px 20px)' }} />
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="font-spectral text-[27px] mb-2">{h.n}</h3>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-white/35 mb-5">{h.cap} · {h.area}</div>
                    <ul className="flex flex-col gap-2.5 mb-7 flex-1">
                      {h.has.map((x) => (
                        <li key={x} className="flex gap-3 text-[13.5px] text-white/50">
                          <span className="mt-[8px] w-1 h-1 rounded-full shrink-0" style={{ background: MOSS }} />{x}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-baseline gap-2">
                      <span className="font-spectral text-[26px]" style={{ color: MOSS }}>{h.price} ₽</span>
                      <span className="text-[12px] text-white/35">за ночь</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AREA */}
      <section id="area" className="px-6 md:px-8 py-20 md:py-28 scroll-mt-20">
        <div className="max-w-[1280px] mx-auto">
          <Reveal className="mb-14 max-w-[44ch]">
            <div className="text-[11px] uppercase tracking-[0.3em] mb-5" style={{ color: MOSS }}>Территория</div>
            <h2 className="font-spectral text-[38px] md:text-[52px] leading-[1.06]">Двенадцать гектаров, и всё это ваше</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.09)' }}>
            {area.map((a, i) => (
              <Reveal key={a.t} delay={(i % 3) * 0.06} className="p-8" style={{ background: BG }}>
                <h3 className="font-spectral text-[23px] mb-3">{a.t}</h3>
                <p className="text-[13.5px] text-white/45 leading-[1.75]">{a.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SEASONS */}
      <section className="px-6 md:px-8 py-20 md:py-28 border-y border-white/10" style={{ background: '#141A14' }}>
        <div className="max-w-[1280px] mx-auto">
          <Reveal className="mb-14 text-center">
            <h2 className="font-spectral text-[38px] md:text-[52px] leading-none">Приезжать хорошо в любой месяц</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasons.map((s, i) => (
              <Reveal key={s.s} delay={i * 0.07} className="border-t pt-6" style={{ borderColor: 'rgba(126,155,110,0.4)' }}>
                <div className="text-[10px] uppercase tracking-[0.16em] mb-3" style={{ color: MOSS }}>{s.badge}</div>
                <h3 className="font-spectral text-[26px] mb-3">{s.s}</h3>
                <p className="text-[13.5px] text-white/45 leading-[1.75]">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CALC */}
      <section id="prices" className="px-6 md:px-8 py-20 md:py-28 scroll-mt-20">
        <div className="max-w-[820px] mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="font-spectral text-[36px] md:text-[48px] leading-none mb-4">Сколько выйдет</h2>
            <p className="text-white/45 text-[15px]">Выберите домик и количество ночей — увидите сумму без скрытых сборов.</p>
          </Reveal>
          <Reveal className="border border-white/12 p-8 md:p-10">
            <div className="flex flex-wrap gap-2.5 mb-9">
              {houses.map((h, i) => (
                <button key={h.n} onClick={() => setHouse(i)} className="px-5 py-3 rounded-full text-[11px] uppercase tracking-[0.14em] border transition-colors"
                  style={{ borderColor: house === i ? MOSS : 'rgba(255,255,255,0.16)', background: house === i ? MOSS : 'transparent', color: house === i ? '#101410' : 'rgba(230,234,226,0.55)' }}>
                  {h.n}
                </button>
              ))}
            </div>
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-[11px] uppercase tracking-[0.16em] text-white/35">Ночей</span>
              <span className="font-spectral text-[26px]">{nights}</span>
            </div>
            <input type="range" min={1} max={14} value={nights} onChange={(e) => setNights(Number(e.target.value))} className="w-full accent-[#7E9B6E] cursor-pointer mb-9" aria-label="Количество ночей" />
            <div className="flex items-end justify-between gap-6 flex-wrap pt-7 border-t border-white/10">
              <div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-white/35 mb-2">Итого с завтраками</div>
                <div className="font-spectral text-[40px] leading-none" style={{ color: MOSS }}>{total} ₽</div>
              </div>
              <a href="#booking" onClick={(e) => scrollTo(e, 'booking')} className="px-8 py-4 rounded-full text-[12px] uppercase tracking-[0.15em]" style={{ background: MOSS, color: '#101410' }}>Забронировать</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-8 py-20 md:py-28 border-t border-white/10" style={{ background: '#141A14' }}>
        <div className="max-w-[860px] mx-auto">
          <Reveal className="mb-12"><h2 className="font-spectral text-[38px] md:text-[50px] leading-none">Вопросы</h2></Reveal>
          <div className="flex flex-col">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} delay={i * 0.04} className="border-b border-white/10">
                  <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex justify-between items-center gap-6 py-6 text-left">
                    <span className="font-spectral text-[20px] md:text-[23px]">{f.q}</span>
                    <span className="text-[22px] shrink-0" style={{ color: MOSS }}>{open ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden">
                        <p className="text-[14px] text-white/45 leading-[1.85] pb-7 max-w-[64ch]">{f.a}</p>
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
      <section id="booking" className="px-6 md:px-8 py-20 md:py-28 scroll-mt-20">
        <Reveal className="max-w-[760px] mx-auto text-center">
          <h2 className="font-spectral leading-[1.06] mb-6" style={{ fontSize: 'clamp(34px,5vw,56px)' }}>Проверим свободные даты</h2>
          <p className="text-white/45 text-[15px] mb-10 max-w-[48ch] mx-auto">
            Оставьте номер — перезвоним, подберём домик и подскажем, что происходит
            на базе в ваши даты.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 5000); }} className="flex gap-3 max-w-[520px] mx-auto flex-wrap">
            <input required type="tel" placeholder="+7 (___) ___-__-__" className="flex-1 min-w-[220px] bg-transparent border border-white/20 rounded-full px-6 py-4 text-[14px] outline-none focus:border-[#7E9B6E] transition-colors placeholder:text-white/25" />
            <button type="submit" className="px-8 py-4 rounded-full text-[12px] uppercase tracking-[0.15em]" style={{ background: MOSS, color: '#101410' }}>Забронировать</button>
          </form>
          {sent && <p className="mt-4 text-[13px]" style={{ color: MOSS }}>Спасибо! Администратор перезвонит в течение получаса.</p>}
        </Reveal>
      </section>

      <footer className="px-6 md:px-8 pt-16 pb-10 border-t border-white/10" style={{ background: '#0C0F0C' }}>
        <div className="max-w-[1280px] mx-auto flex flex-wrap justify-between gap-10 mb-12">
          <div className="max-w-[300px]">
            <div className="font-spectral text-[21px] tracking-[0.2em] uppercase mb-4">Taiga</div>
            <p className="text-[13px] text-white/40 leading-[1.75]">База отдыха на берегу лесного озера. Шесть домов, баня на дровах, двенадцать гектаров тишины.</p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.18em] text-white/30 mb-4">База</h4>
            <div className="flex flex-col gap-3 text-[13px] text-white/50">
              <a href="#houses" onClick={(e) => scrollTo(e, 'houses')}>Домики</a>
              <a href="#area" onClick={(e) => scrollTo(e, 'area')}>Территория</a>
              <a href="#prices" onClick={(e) => scrollTo(e, 'prices')}>Цены</a>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.18em] text-white/30 mb-4">Контакты</h4>
            <div className="flex flex-col gap-3 text-[13px] text-white/50">
              <span className="text-[17px] text-white">+7 (812) 000-00-00</span>
              <span>stay@taiga.example</span>
              <span className="text-white/35">Ленинградская обл., Приозерский р-н<br />Заезд 15:00 · выезд 12:00</span>
            </div>
          </div>
        </div>
        <div className="max-w-[1280px] mx-auto border-t border-white/10 pt-7 flex flex-wrap justify-between gap-4 text-[11px] text-white/25">
          <span>© 2026 Taiga. Демонстрационный шаблон.</span>
          <div className="flex gap-5"><span>Политика конфиденциальности</span><span>Правила проживания</span></div>
        </div>
      </footer>
    </div>
  );
}
