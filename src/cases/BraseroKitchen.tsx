import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/* BRASERO — ресторан на углях с доставкой.
   Визуальный язык: тёплая темнота зала. Угольный фон, терракота и охра,
   антиква Bodoni в заголовках — как в меню на плотной бумаге. */

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = '', delay = 0, style }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay, ease: EASE }} className={className} style={style}>
      {children}
    </motion.div>
  );
}

const EMBER = '#D4703A';
const CREAM = '#EFE3D2';

const navLinks = [
  { name: 'Меню', href: 'menu' },
  { name: 'Зал', href: 'hall' },
  { name: 'Доставка', href: 'delivery' },
  { name: 'Бронь', href: 'booking' },
];

const categories = ['Мангал', 'Горячее', 'Закуски', 'Десерты'];

const menu: Record<string, { n: string; d: string; p: string; w: string }[]> = {
  'Мангал': [
    { n: 'Каре ягнёнка', d: 'Новозеландское каре, розмарин, печёный чеснок', p: '1 690 ₽', w: '280 г' },
    { n: 'Шашлык из свиной шеи', d: 'Маринад на луковом соке, лаваш, соус наршараб', p: '790 ₽', w: '250 г' },
    { n: 'Дорадо на углях', d: 'Целиком, лимон, тимьян, оливковое масло', p: '1 340 ₽', w: '340 г' },
    { n: 'Овощи гриль', d: 'Баклажан, перец, цукини, помидор, зелень', p: '540 ₽', w: '300 г' },
  ],
  'Горячее': [
    { n: 'Хачапури по-аджарски', d: 'Сулугуни, желток, сливочное масло', p: '690 ₽', w: '380 г' },
    { n: 'Плов из баранины', d: 'Девзира, зира, барбарис, чеснок', p: '740 ₽', w: '350 г' },
    { n: 'Хинкали', d: 'Ручная лепка, говядина и свинина, 5 шт.', p: '560 ₽', w: '300 г' },
  ],
  'Закуски': [
    { n: 'Пхали ассорти', d: 'Шпинат, свёкла, баклажан, грецкий орех', p: '520 ₽', w: '240 г' },
    { n: 'Сациви', d: 'Куриное филе в ореховом соусе', p: '610 ₽', w: '220 г' },
    { n: 'Лобио', d: 'Красная фасоль, кинза, специи, мчади', p: '480 ₽', w: '260 г' },
  ],
  'Десерты': [
    { n: 'Пахлава', d: 'Слоёное тесто, грецкий орех, мёд', p: '340 ₽', w: '160 г' },
    { n: 'Наполеон', d: 'Домашний крем, 12 слоёв', p: '390 ₽', w: '180 г' },
  ],
};

const hall = [
  { t: 'Основной зал', d: '64 посадочных места, открытая кухня и мангальная зона на виду.', cap: '64' },
  { t: 'Каминная', d: 'Отдельный зал с камином для компаний до двадцати человек.', cap: '20' },
  { t: 'Веранда', d: 'Летняя терраса с подогревом, работает с апреля по октябрь.', cap: '38' },
];

const delivery = [
  { t: '45 минут', d: 'Средний срок доставки по центру города. Дальше — до часа.' },
  { t: 'Свои курьеры', d: 'Не агрегатор. Термосумки, отдельная упаковка для мангала.' },
  { t: 'От 1 200 ₽', d: 'Минимальный заказ. Доставка бесплатная внутри кольца.' },
  { t: 'До 23:30', d: 'Принимаем заказы до половины двенадцатого ночи, семь дней в неделю.' },
];

const faqs = [
  { q: 'Нужно ли бронировать столик?', a: 'В будни до семи вечера обычно есть свободные места. В пятницу и субботу лучше забронировать — зал заполняется к восьми.' },
  { q: 'Есть детское меню?', a: 'Да, отдельная страница с некрупными порциями без острого. Для малышей есть стульчики и раскраски.' },
  { q: 'Можно прийти со своим тортом?', a: 'Можно, пробковый сбор за торт — 500 ₽. Свечи и тарелки принесём.' },
  { q: 'Что с блюдами для вегетарианцев?', a: 'Пхали, лобио, овощи на углях, хачапури и салаты. Помечены в меню зелёной точкой.' },
  { q: 'Работаете на вынос?', a: 'Да, самовывоз со скидкой 10%. Заказ собираем за 20–30 минут, звоните заранее.' },
];

export default function BraseroKitchen() {
  const [cat, setCat] = useState(categories[0]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen font-manrope selection:bg-[#D4703A]/35 overflow-x-clip" style={{ background: '#131010', color: CREAM }}>
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10" style={{ background: 'rgba(19,16,16,0.9)' }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-4 flex justify-between items-center pl-20 md:pl-24">
          <div className="font-bodoni text-[24px] tracking-[0.2em] uppercase">Brasero</div>
          <nav className="hidden md:flex gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={`#${l.href}`} onClick={(e) => scrollTo(e, l.href)} className="text-[12px] uppercase tracking-[0.16em] text-white/45 hover:text-white transition-colors">{l.name}</a>
            ))}
          </nav>
          <a href="#booking" onClick={(e) => scrollTo(e, 'booking')} className="hidden sm:inline-block px-6 py-3 text-[11px] uppercase tracking-[0.16em] rounded-full" style={{ background: EMBER, color: '#131010' }}>Забронировать</a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative px-6 md:px-8 pt-20 md:pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(700px 420px at 20% 10%, rgba(212,112,58,0.16), transparent 65%)' }} />
        <div className="max-w-[1280px] mx-auto relative text-center">
          <div className="text-[11px] uppercase tracking-[0.34em] mb-8" style={{ color: EMBER }}>Ресторан на углях · Нижний Новгород</div>
          <h1 className="font-bodoni leading-[0.95]" style={{ fontSize: 'clamp(46px,8.4vw,110px)' }}>
            Огонь,<br /><span className="italic" style={{ color: EMBER }}>чугун</span> и терпение
          </h1>
          <p className="mt-9 max-w-[52ch] mx-auto text-white/55 text-[17px] leading-[1.75]">
            Мангал на дровах, тесто на закваске и мясо, которое лежало в маринаде сутки,
            а не полчаса перед сменой.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <a href="#booking" onClick={(e) => scrollTo(e, 'booking')} className="px-8 py-4 rounded-full text-[12px] uppercase tracking-[0.14em]" style={{ background: EMBER, color: '#131010' }}>Забронировать стол</a>
            <a href="#menu" onClick={(e) => scrollTo(e, 'menu')} className="px-8 py-4 rounded-full text-[12px] uppercase tracking-[0.14em] border border-white/20 hover:border-white/45 transition-colors">Посмотреть меню</a>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="px-6 md:px-8 py-20 md:py-28 border-y border-white/10 scroll-mt-20" style={{ background: '#181414' }}>
        <div className="max-w-[1000px] mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="font-bodoni text-[38px] md:text-[54px] leading-none mb-8">Меню</h2>
            <div className="flex flex-wrap justify-center gap-2.5">
              {categories.map((c) => (
                <button key={c} onClick={() => setCat(c)} className="px-5 py-2.5 rounded-full text-[11px] uppercase tracking-[0.14em] border transition-colors"
                  style={{ borderColor: cat === c ? EMBER : 'rgba(255,255,255,0.16)', background: cat === c ? EMBER : 'transparent', color: cat === c ? '#131010' : 'rgba(239,227,210,0.55)' }}>
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div key={cat} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: EASE }} className="flex flex-col">
              {menu[cat].map((d) => (
                <div key={d.n} className="flex items-baseline gap-4 py-6 border-b border-white/10">
                  <div className="flex-1">
                    <h3 className="font-bodoni text-[22px] md:text-[25px] mb-1.5">{d.n}</h3>
                    <p className="text-[13.5px] text-white/45 leading-[1.6]">{d.d}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-bodoni text-[20px]" style={{ color: EMBER }}>{d.p}</div>
                    <div className="text-[11px] uppercase tracking-[0.12em] text-white/30 mt-1">{d.w}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* HALL */}
      <section id="hall" className="px-6 md:px-8 py-20 md:py-28 scroll-mt-20">
        <div className="max-w-[1280px] mx-auto">
          <Reveal className="mb-14 max-w-[42ch]">
            <h2 className="font-bodoni text-[38px] md:text-[52px] leading-[1.05] mb-5">Три зала под разный вечер</h2>
            <p className="text-white/50 text-[15px] leading-[1.75]">От быстрого обеда за барной стойкой до дня рождения на тридцать человек.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hall.map((h, i) => (
              <Reveal key={h.t} delay={i * 0.08}>
                <div className="aspect-[4/3] mb-6 rounded-[2px] relative overflow-hidden" style={{ background: `linear-gradient(150deg,#3A2A22,#1C1614)` }}>
                  <div className="absolute inset-0 opacity-[0.14]" style={{ backgroundImage: 'repeating-linear-gradient(60deg,rgba(212,112,58,.7) 0 1px,transparent 1px 22px)' }} />
                  <div className="absolute bottom-5 left-5 font-bodoni text-[38px]" style={{ color: EMBER }}>{h.cap}</div>
                  <div className="absolute bottom-7 left-[74px] text-[11px] uppercase tracking-[0.14em] text-white/45">мест</div>
                </div>
                <h3 className="font-bodoni text-[24px] mb-2.5">{h.t}</h3>
                <p className="text-[14px] text-white/45 leading-[1.7]">{h.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="px-6 md:px-8 py-20 md:py-28 border-y border-white/10 scroll-mt-20" style={{ background: '#181414' }}>
        <div className="max-w-[1280px] mx-auto">
          <Reveal className="mb-14 text-center">
            <div className="text-[11px] uppercase tracking-[0.3em] mb-5" style={{ color: EMBER }}>Доставка</div>
            <h2 className="font-bodoni text-[38px] md:text-[52px] leading-none">Везём сами, а не через агрегатор</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.1)' }}>
            {delivery.map((d, i) => (
              <Reveal key={d.t} delay={(i % 4) * 0.06} className="p-8 text-center" style={{ background: '#181414' }}>
                <div className="font-bodoni text-[30px] mb-3" style={{ color: EMBER }}>{d.t}</div>
                <p className="text-[13.5px] text-white/45 leading-[1.7]">{d.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-8 py-20 md:py-28">
        <div className="max-w-[860px] mx-auto">
          <Reveal className="mb-12"><h2 className="font-bodoni text-[38px] md:text-[52px] leading-none">Вопросы гостей</h2></Reveal>
          <div className="flex flex-col">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} delay={i * 0.04} className="border-b border-white/10">
                  <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex justify-between items-center gap-6 py-6 text-left">
                    <span className="font-bodoni text-[20px] md:text-[23px]">{f.q}</span>
                    <span className="text-[22px] shrink-0" style={{ color: EMBER }}>{open ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden">
                        <p className="text-[14px] text-white/45 leading-[1.8] pb-7 max-w-[62ch]">{f.a}</p>
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
      <section id="booking" className="px-6 md:px-8 py-20 md:py-28 border-t border-white/10 scroll-mt-20" style={{ background: '#181414' }}>
        <Reveal className="max-w-[760px] mx-auto text-center">
          <h2 className="font-bodoni leading-[1.05] mb-6" style={{ fontSize: 'clamp(34px,5vw,56px)' }}>Забронировать стол</h2>
          <p className="text-white/50 text-[15px] mb-10 max-w-[48ch] mx-auto">
            Оставьте номер — перезвоним, уточним время и количество гостей.
            Бронь держим двадцать минут после назначенного часа.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 5000); }} className="flex gap-3 max-w-[520px] mx-auto flex-wrap">
            <input required type="tel" placeholder="+7 (___) ___-__-__" className="flex-1 min-w-[220px] bg-transparent border border-white/20 rounded-full px-6 py-4 text-[14px] outline-none focus:border-[#D4703A] transition-colors placeholder:text-white/25" />
            <button type="submit" className="px-8 py-4 rounded-full text-[12px] uppercase tracking-[0.14em]" style={{ background: EMBER, color: '#131010' }}>Забронировать</button>
          </form>
          {sent && <p className="mt-4 text-[13px]" style={{ color: EMBER }}>Спасибо! Хостес перезвонит в течение десяти минут.</p>}
        </Reveal>
      </section>

      <footer className="px-6 md:px-8 pt-16 pb-10" style={{ background: '#0E0C0C' }}>
        <div className="max-w-[1280px] mx-auto flex flex-wrap justify-between gap-10 mb-12">
          <div className="max-w-[300px]">
            <div className="font-bodoni text-[22px] tracking-[0.2em] uppercase mb-4">Brasero</div>
            <p className="text-[13px] text-white/40 leading-[1.7]">Ресторан на углях. Дровяной мангал, своя пекарня и доставка собственными курьерами.</p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.18em] text-white/30 mb-4">Ресторан</h4>
            <div className="flex flex-col gap-3 text-[13px] text-white/50">
              <a href="#menu" onClick={(e) => scrollTo(e, 'menu')}>Меню</a>
              <a href="#hall" onClick={(e) => scrollTo(e, 'hall')}>Залы</a>
              <a href="#delivery" onClick={(e) => scrollTo(e, 'delivery')}>Доставка</a>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.18em] text-white/30 mb-4">Контакты</h4>
            <div className="flex flex-col gap-3 text-[13px] text-white/50">
              <span className="text-[17px] text-white">+7 (831) 000-00-00</span>
              <span>hello@brasero.example</span>
              <span className="text-white/35">г. Нижний Новгород, ул. Рождественская, 9<br />Ежедневно 12:00–00:00</span>
            </div>
          </div>
        </div>
        <div className="max-w-[1280px] mx-auto border-t border-white/10 pt-7 flex flex-wrap justify-between gap-4 text-[11px] text-white/25">
          <span>© 2026 Brasero. Демонстрационный шаблон.</span>
          <div className="flex gap-5"><span>Политика конфиденциальности</span><span>Оферта</span></div>
        </div>
      </footer>
    </div>
  );
}
