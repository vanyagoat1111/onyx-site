import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import DemoPlaceholder from '../components/DemoPlaceholder';
import DemoPhoto from '../components/DemoPhoto';
import { PlanMap, ColumnChart, StatBars } from '../components/DemoCharts';

/* TAIGA — база отдыха. ТРИ СТРАНИЦЫ: главная, домик подробно, территория.
   Визуальный язык: спокойный лес. Хвоя, тёплый камень, крупная антиква Spectral,
   много воздуха. Единственный сайт в наборе, где заголовки набраны в разрядку. */

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
const PANEL = '#141A14';

const houses = [
  {
    id: 'kedr', n: 'Кедр', cap: '2–3 гостя', area: '38 м²', price: '7 400',
    short: 'Панорамное окно на озеро, камин, терраса.',
    has: ['Панорамное окно', 'Камин', 'Терраса с видом на озеро', 'Кухонный уголок'],
    rooms: [['Спальня', '18 м², кровать 180×200'], ['Гостиная', '14 м², камин, диван'], ['Санузел', '6 м², душ, полотенцесушитель']],
    story: 'Самый маленький дом на базе и самый популярный у пар. Стоит у воды, окно во всю стену выходит на озеро — утром видно, как поднимается туман.',
  },
  {
    id: 'sosna', n: 'Сосна', cap: '4 гостя', area: '56 м²', price: '11 200',
    short: 'Две спальни, кухня-гостиная и своя баня.',
    has: ['Две спальни', 'Кухня-гостиная', 'Своя баня', 'Мангал у входа'],
    rooms: [['Спальня 1', '16 м², кровать 180×200'], ['Спальня 2', '12 м², две кровати 90×200'], ['Кухня-гостиная', '22 м², полная кухня'], ['Баня', '6 м², парная на дровах']],
    story: 'Дом для семьи или двух пар. Баня своя, топится дровами, топить учим при заселении — занимает пять минут.',
  },
  {
    id: 'listvennica', n: 'Лиственница', cap: '6–8 гостей', area: '94 м²', price: '18 900',
    short: 'Три спальни, каминный зал, чан на дровах.',
    has: ['Три спальни', 'Каминный зал', 'Мангальная зона', 'Чан на дровах', 'Посудомоечная машина'],
    rooms: [['Спальня 1', '18 м², кровать 180×200'], ['Спальня 2', '16 м², кровать 160×200'], ['Спальня 3', '14 м², две кровати'], ['Каминный зал', '30 м², обеденный стол на 10'], ['Терраса', '16 м², чан на дровах']],
    story: 'Самый большой дом. Берут на дни рождения и корпоративы до десяти человек. Чан выносной, греется два часа — заказывать при бронировании.',
  },
];

const areaBlocks = [
  { t: 'Озеро', d: 'Своя береговая линия 300 метров, мостки, лодки и сапборды летом.', more: 'Вода прозрачная, дно песчаное у мостков и каменистое дальше. Глубина у берега метр, через двадцать метров — четыре. Лодку и сапборд берут бесплатно, спасжилеты выдаём.' },
  { t: 'Банный комплекс', d: 'Русская парная на дровах, купель, чан под открытым небом.', more: 'Общая баня работает по записи, два часа — 3 500 ₽ на компанию до восьми человек. Веники свои или наши, простыни и шапки бесплатно.' },
  { t: 'Тропы', d: 'Размеченные маршруты 3, 7 и 14 км. Зимой — лыжня и снегоходы.', more: 'Маршруты промаркированы краской на деревьях, карту выдаём при заселении. Четырнадцатикилометровый идёт к смотровой на скале, оттуда видно всё озеро.' },
  { t: 'Ресторан', d: 'Кухня на дровах, завтраки включены, ужин по предзаказу.', more: 'Завтрак с 9 до 11, входит в проживание. Обед и ужин по меню, заказывать лучше накануне — продукты возят из города через день.' },
  { t: 'Детская зона', d: 'Площадка, анимация в выходные, детские велосипеды напрокат.', more: 'Площадка с горкой и качелями рядом с рестораном, просматривается с террасы. По субботам приезжает аниматор, занятия бесплатные.' },
  { t: 'Парковка', d: 'Крытая, на 40 машин, зарядка для электромобилей.', more: 'Навес и видеонаблюдение. Две зарядные станции Type 2, бесплатно для гостей. Зимой территорию чистит трактор, подъезд к домику всегда открыт.' },
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

const ROOT = '#case/hotel';

export default function TaigaRetreat() {
  const [hash, setHash] = useState(() => (typeof window !== 'undefined' ? window.location.hash : ROOT));
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [nights, setNights] = useState(2);
  const [house, setHouse] = useState(1);
  const [openArea, setOpenArea] = useState<number | null>(null);

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const go = (e: React.MouseEvent, to: string) => {
    e.preventDefault(); window.location.hash = to; window.scrollTo(0, 0);
  };
  const jump = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (hash !== ROOT) { window.location.hash = ROOT; setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 70); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const houseSlug = hash.startsWith(ROOT + '/house/') ? hash.split('/house/')[1] : null;
  const current = houses.find((h) => h.id === houseSlug) || null;
  const page = current ? 'house' : hash.startsWith(ROOT + '/area') ? 'area' : 'home';

  const total = (Number(houses[house].price.replace(/\s/g, '')) * nights).toLocaleString('ru-RU');

  const navLinks = [
    { name: 'Домики', to: ROOT, anchor: 'houses' },
    { name: 'Территория', to: ROOT + '/area' },
    { name: 'Цены', to: ROOT, anchor: 'prices' },
    { name: 'Бронь', to: ROOT, anchor: 'booking' },
  ];

  /* Фактура tex-wood - годовые кольца дерева: сруб, лес.

     Плоская заливка читается как заготовка: глазу не за что зацепиться. */

  return (
    <div className="relative min-h-screen font-jost selection:bg-[#7E9B6E]/30 overflow-x-clip tex-wood" style={{ background: BG, color: '#E6EAE2' }}>
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10" style={{ background: 'rgba(16,20,16,0.88)' }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-5 flex justify-between items-center pl-20 md:pl-24">
          <a href={ROOT} onClick={(e) => go(e, ROOT)} className="font-spectral text-[23px] tracking-[0.2em] uppercase">Taiga</a>
          <nav className="hidden md:flex gap-9 items-center">
            {navLinks.map((l) => (
              l.anchor
                ? <a key={l.name} href={`#${l.anchor}`} onClick={(e) => jump(e, l.anchor!)} className="text-[12px] uppercase tracking-[0.16em] text-white/45 hover:text-white transition-colors active:brightness-95 active:duration-75">{l.name}</a>
                : <a key={l.name} href={l.to} onClick={(e) => go(e, l.to)} className="text-[12px] uppercase tracking-[0.16em] transition-colors"
                     style={{ color: page === 'area' ? MOSS : 'rgba(255,255,255,0.45)' }}>{l.name}</a>
            ))}
          </nav>
          <a href="#booking" onClick={(e) => jump(e, 'booking')} className="hidden sm:inline-block px-6 py-3 text-[11px] uppercase tracking-[0.16em] rounded-full" style={{ background: MOSS, color: BG }}>Забронировать</a>
        </div>
      </header>

      {/* ═════════ СТРАНИЦА: ДОМИК ═════════ */}
      {page === 'house' && current && (
        <>
          <section className="px-6 md:px-8 pt-14 md:pt-20 pb-14">
            <div className="max-w-[1180px] mx-auto">
              <a href={ROOT} onClick={(e) => go(e, ROOT)} className="inline-block text-[12px] uppercase tracking-[0.16em] text-white/40 hover:text-white transition-colors mb-10 active:brightness-95 active:duration-75">← Все домики</a>
              <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-start">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.3em] mb-6" style={{ color: MOSS }}>{current.cap} · {current.area}</div>
                  <h1 className="font-spectral leading-[1] mb-7" style={{ fontSize: 'clamp(40px,6.4vw,80px)' }}>{current.n}</h1>
                  <p className="text-white/55 text-[17px] leading-[1.8] max-w-[52ch]">{current.story}</p>
                  <div className="mt-9 flex items-end gap-4 flex-wrap">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.16em] text-white/35 mb-2">Стоимость за ночь</div>
                      <div className="font-spectral text-[42px] leading-none" style={{ color: MOSS }}>{current.price} ₽</div>
                    </div>
                    <a href="#booking" onClick={(e) => jump(e, 'booking')} className="px-8 py-4 rounded-full text-[12px] uppercase tracking-[0.15em]" style={{ background: MOSS, color: BG }}>Забронировать</a>
                  </div>
                </div>
                <DemoPhoto src={`/demo/taiga-house-${houses.indexOf(current) + 1}.jpg`} label={`Фото домика «${current.n}»`} tone={MOSS} ratio="4/5" icon="interior" className="rounded-[3px]" />
              </div>
            </div>
          </section>

          <section className="px-6 md:px-8 py-16 md:py-20 border-y border-white/10" style={{ background: PANEL }}>
            <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12">
              <Reveal>
                <h2 className="font-spectral text-[30px] md:text-[38px] leading-none mb-5">Планировка</h2>
                <p className="text-white/45 text-[14.5px] leading-[1.8]">Площади указаны по внутреннему обмеру. Мебель можно подвинуть — просите при заселении, поможем.</p>
              </Reveal>
              <div className="flex flex-col">
                {current.rooms.map(([name, spec], i) => (
                  <Reveal key={name} delay={i * 0.05} className="grid grid-cols-[1fr_auto] gap-6 py-5 border-b border-white/10">
                    <div className="font-spectral text-[20px]">{name}</div>
                    <div className="text-[13.5px] text-white/45 text-right">{spec}</div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-8 py-16 md:py-20">
            <div className="max-w-[1180px] mx-auto">
              <Reveal className="mb-10"><h2 className="font-spectral text-[30px] md:text-[38px] leading-none">Что внутри</h2></Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {current.has.map((x, i) => (
                  <Reveal key={x} delay={i * 0.05} className="border-t pt-5" style={{ borderColor: 'rgba(126,155,110,0.4)' }}>
                    <span className="text-[15px]">{x}</span>
                  </Reveal>
                ))}
              </div>
              <Reveal className="mt-14 flex flex-wrap gap-4">
                {houses.filter((h) => h.id !== current.id).map((h) => (
                  <a key={h.id} href={`${ROOT}/house/${h.id}`} onClick={(e) => go(e, `${ROOT}/house/${h.id}`)}
                     className="px-6 py-4 rounded-full border border-white/15 hover:border-white/40 transition-colors text-[13px] active:scale-[0.97] active:duration-75">
                    Посмотреть «{h.n}» →
                  </a>
                ))}
              </Reveal>
            </div>
          </section>
        </>
      )}

      {/* ═════════ СТРАНИЦА: ТЕРРИТОРИЯ ═════════ */}
      {page === 'area' && (
        <>
          <section className="px-6 md:px-8 pt-14 md:pt-20 pb-12">
            <div className="max-w-[1180px] mx-auto">
              <a href={ROOT} onClick={(e) => go(e, ROOT)} className="inline-block text-[12px] uppercase tracking-[0.16em] text-white/40 hover:text-white transition-colors mb-10 active:brightness-95 active:duration-75">← На главную</a>
              <div className="text-[11px] uppercase tracking-[0.3em] mb-6" style={{ color: MOSS }}>Двенадцать гектаров</div>
              <h1 className="font-spectral leading-[1] max-w-[14ch]" style={{ fontSize: 'clamp(40px,6.4vw,78px)' }}>Территория</h1>
              <p className="mt-8 max-w-[54ch] text-white/50 text-[17px] leading-[1.8]">
                Всё, что есть на базе, и как этим пользоваться. Нажмите на блок — расскажем подробности,
                которые обычно выясняются только при заселении.
              </p>
            </div>
          </section>

          <section className="px-6 md:px-8 pb-16">
            <div className="max-w-[1000px] mx-auto">
              <Reveal>
                <PlanMap tone={MOSS} muted="rgba(255,255,255,0.16)" caption="Схема базы. Расстояние от парковки до самого дальнего домика — 340 метров."
                  zones={[
                    { x: 3, y: 3, w: 30, h: 22, t: 'Озеро', hi: true },
                    { x: 35, y: 4, w: 16, h: 11, t: 'Кедр' },
                    { x: 53, y: 4, w: 16, h: 11, t: 'Сосна' },
                    { x: 71, y: 4, w: 24, h: 11, t: 'Лиственница' },
                    { x: 35, y: 17, w: 26, h: 12, t: 'Ресторан', hi: true },
                    { x: 63, y: 17, w: 32, h: 12, t: 'Банный комплекс', hi: true },
                    { x: 3, y: 27, w: 30, h: 14, t: 'Мостки и лодки' },
                    { x: 35, y: 31, w: 26, h: 12, t: 'Детская зона' },
                    { x: 63, y: 31, w: 32, h: 12, t: 'Мангальные беседки' },
                    { x: 3, y: 43, w: 44, h: 15, t: 'Тропы и лыжня' },
                    { x: 49, y: 45, w: 22, h: 13, t: 'Парковка', hi: true },
                    { x: 73, y: 45, w: 22, h: 13, t: 'Въезд' },
                  ]} />
              </Reveal>
            </div>
          </section>

          <section className="px-6 md:px-8 pb-20">
            <div className="max-w-[1180px] mx-auto flex flex-col">
              {areaBlocks.map((a, i) => {
                const open = openArea === i;
                return (
                  <Reveal key={a.t} delay={i * 0.04} className="border-b border-white/10">
                    <button type="button" onClick={() => setOpenArea(open ? null : i)} className="w-full grid grid-cols-[auto_1fr_auto] gap-6 items-baseline py-7 text-left">
                      <span className="font-mono text-[12px]" style={{ color: MOSS }}>{String(i + 1).padStart(2, '0')}</span>
                      <span>
                        <span className="font-spectral text-[24px] md:text-[30px] block mb-2">{a.t}</span>
                        <span className="text-[14px] text-white/45">{a.d}</span>
                      </span>
                      <span className="text-[22px]" style={{ color: MOSS }}>{open ? '−' : '+'}</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: EASE }} className="overflow-hidden">
                          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 pb-9">
                            <p className="text-[14.5px] text-white/50 leading-[1.85] max-w-[58ch]">{a.more}</p>
                            <DemoPhoto src={`/demo/taiga-area-${i + 1}.jpg`} label={`Фото · ${a.t}`} tone={MOSS} ratio="16/9" icon="photo" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Reveal>
                );
              })}
            </div>
          </section>

          <section className="px-6 md:px-8 py-16 md:py-20 border-t border-white/10" style={{ background: PANEL }}>
            <div className="max-w-[1180px] mx-auto text-center">
              <Reveal>
                <h2 className="font-spectral text-[30px] md:text-[42px] leading-none mb-6">Выбрать домик</h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {houses.map((h) => (
                    <a key={h.id} href={`${ROOT}/house/${h.id}`} onClick={(e) => go(e, `${ROOT}/house/${h.id}`)}
                       className="px-7 py-4 rounded-full border border-white/15 hover:border-white/40 transition-colors text-[13px] active:scale-[0.97] active:duration-75">
                      {h.n} · {h.price} ₽
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        </>
      )}

      {/* ═════════ ГЛАВНАЯ ═════════ */}
      {page === 'home' && (
        <>
          <section className="relative px-6 md:px-8 pt-20 md:pt-32 pb-24 overflow-hidden">
            <img src="/hero-hotel.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(100deg,rgba(16,20,16,.93) 0%,rgba(16,20,16,.78) 45%,rgba(16,20,16,.35) 100%)' }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(800px 500px at 70% 15%, rgba(126,155,110,0.14), transparent 65%)' }} />
            <div className="max-w-[1280px] mx-auto relative">
              <div className="text-[11px] uppercase tracking-[0.34em] mb-9" style={{ color: MOSS }}>База отдыха · 120 км от города</div>
              <h1 className="font-spectral leading-[0.98] max-w-[15ch]" style={{ fontSize: 'clamp(44px,7.6vw,96px)' }}>
                Тишина, которую<br />слышно
              </h1>
              {/* Было text-white/50 - белый в половину прозрачности поверх
                  фотографии леса. На экране это читалось с трудом: замер дал
                  rgba(255,255,255,0.5), а под текстом местами светлая вода
                  и туман, то есть контраст падал почти до нуля.

                  Заметить это можно было только глазами - в коде «половина
                  прозрачности» выглядит как обычный приглушённый текст.

                  Ровно здесь и лежит смысл: заголовок продаёт настроение,
                  а этот абзац - единственное место, где сказано, что человек
                  получит: шесть домов, баня, безлюдный лес. Нечитаемый
                  абзац с фактами - это отсутствие фактов. */}
              <p className="mt-9 max-w-[50ch] text-[17px] leading-[1.8]"
                 style={{ color: 'rgba(238,241,235,0.86)', textShadow: '0 1px 12px rgba(12,16,12,0.5)' }}>
                Шесть домов на берегу озера, баня на дровах и лес, в котором за целый день
                можно не встретить ни одного человека.
              </p>
              <div className="mt-11 flex flex-wrap gap-4">
                <a href="#booking" onClick={(e) => jump(e, 'booking')} className="px-8 py-4 rounded-full text-[12px] uppercase tracking-[0.15em]" style={{ background: MOSS, color: BG }}>Проверить даты</a>
                <a href={ROOT + '/area'} onClick={(e) => go(e, ROOT + '/area')} className="px-8 py-4 rounded-full text-[12px] uppercase tracking-[0.15em] border border-white/20 hover:border-white/45 transition-colors active:scale-[0.97] active:duration-75">Территория</a>
              </div>
            </div>
          </section>

          <section id="houses" className="px-6 md:px-8 py-20 md:py-28 border-y border-white/10 scroll-mt-20" style={{ background: PANEL }}>
            <div className="max-w-[1280px] mx-auto">
              <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
                <h2 className="font-spectral text-[38px] md:text-[52px] leading-none">Домики</h2>
                <p className="text-white/45 text-[14.5px] max-w-[34ch]">Нажмите на карточку — планировка, что внутри и честный рассказ про дом.</p>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {houses.map((h, i) => (
                  <Reveal key={h.id} delay={i * 0.08}>
                    <a href={`${ROOT}/house/${h.id}`} onClick={(e) => go(e, `${ROOT}/house/${h.id}`)}
                       className="h-full flex flex-col border border-white/10 hover:border-[#7E9B6E]/50 transition-colors duration-500 group active:brightness-95 active:duration-75">
                      <DemoPhoto src={`/demo/taiga-house-${i + 1}.jpg`} label={`Фото домика «${h.n}»`} tone={MOSS} ratio="4/3" icon="interior" />
                      <div className="p-7 flex flex-col flex-1">
                        <h3 className="font-spectral text-[27px] mb-2">{h.n}</h3>
                        <div className="text-[11px] uppercase tracking-[0.14em] text-white/35 mb-4">{h.cap} · {h.area}</div>
                        <p className="text-[13.5px] text-white/45 leading-[1.7] mb-7 flex-1">{h.short}</p>
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="font-spectral text-[26px]" style={{ color: MOSS }}>{h.price} ₽</span>
                          <span className="text-[12px] text-white/35 group-hover:text-white transition-colors">подробнее →</span>
                        </div>
                      </div>
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-8 py-20 md:py-28">
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
              <Reveal className="mt-20 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-14 items-center">
                <div>
                  <h3 className="font-spectral text-[26px] md:text-[32px] leading-none mb-4">Насколько занята база по месяцам</h3>
                  <p className="text-white/45 text-[14px] leading-[1.75] mb-8 max-w-[52ch]">
                    Средняя заполняемость за прошлый год. В апреле и ноябре свободно почти всегда,
                    и цена в это время ниже на четверть.
                  </p>
                  <div className="overflow-x-auto pb-2">
                    <ColumnChart tone={MOSS} height={190} unit="%" className="min-w-[520px]"
                      items={[
                        { label: 'янв', value: 88, hi: true }, { label: 'фев', value: 74 }, { label: 'мар', value: 62 },
                        { label: 'апр', value: 31 }, { label: 'май', value: 58 }, { label: 'июн', value: 82 },
                        { label: 'июл', value: 96, hi: true }, { label: 'авг', value: 94, hi: true }, { label: 'сен', value: 71 },
                        { label: 'окт', value: 54 }, { label: 'ноя', value: 29 }, { label: 'дек', value: 90, hi: true },
                      ]} />
                  </div>
                </div>
                <div>
                  <h3 className="font-spectral text-[22px] mb-6">Сколько времени в дороге</h3>
                  <StatBars tone={MOSS} unit=" мин" labelColor="rgba(230,234,226,0.8)"
                    items={[
                      { label: 'От города на машине', value: 105, note: '120 км, последние 3 км грейдер' },
                      { label: 'От города с трансфером', value: 115, note: '4 000 ₽ в одну сторону' },
                      { label: 'От вокзала на электричке', value: 150, note: 'плюс такси от станции' },
                    ]} />
                  <a href={ROOT + '/area'} onClick={(e) => go(e, ROOT + '/area')} className="inline-block mt-9 px-7 py-3.5 rounded-full border border-white/15 hover:border-white/40 transition-colors text-[12px] uppercase tracking-[0.15em] active:scale-[0.97] active:duration-75">
                    Схема территории
                  </a>
                </div>
              </Reveal>
            </div>
          </section>

          <section id="prices" className="px-6 md:px-8 py-20 md:py-28 border-y border-white/10 scroll-mt-20" style={{ background: PANEL }}>
            <div className="max-w-[820px] mx-auto">
              <Reveal className="text-center mb-12">
                <h2 className="font-spectral text-[36px] md:text-[48px] leading-none mb-4">Сколько выйдет</h2>
                <p className="text-white/45 text-[15px]">Выберите домик и количество ночей — увидите сумму без скрытых сборов.</p>
              </Reveal>
              <Reveal className="border border-white/12 p-8 md:p-10">
                <div className="flex flex-wrap gap-2.5 mb-9">
                  {houses.map((h, i) => (
                    <button type="button" key={h.id} onClick={() => setHouse(i)} className="px-5 py-3 rounded-full text-[11px] uppercase tracking-[0.14em] border transition-colors"
                      style={{ borderColor: house === i ? MOSS : 'rgba(255,255,255,0.16)', background: house === i ? MOSS : 'transparent', color: house === i ? BG : 'rgba(230,234,226,0.55)' }}>
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
                  <a href="#booking" onClick={(e) => jump(e, 'booking')} className="px-8 py-4 rounded-full text-[12px] uppercase tracking-[0.15em]" style={{ background: MOSS, color: BG }}>Забронировать</a>
                </div>
              </Reveal>
            </div>
          </section>

          <section className="px-6 md:px-8 py-20 md:py-28">
            <div className="max-w-[860px] mx-auto">
              <Reveal className="mb-12"><h2 className="font-spectral text-[38px] md:text-[50px] leading-none">Вопросы</h2></Reveal>
              <div className="flex flex-col">
                {faqs.map((f, i) => {
                  const open = openFaq === i;
                  return (
                    <Reveal key={f.q} delay={i * 0.04} className="border-b border-white/10">
                      <button type="button" onClick={() => setOpenFaq(open ? null : i)} className="w-full flex justify-between items-center gap-6 py-6 text-left">
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
        </>
      )}

      {/* Бронь — общая для всех страниц */}
      <section id="booking" className="px-6 md:px-8 py-20 md:py-28 scroll-mt-20 border-t border-white/10">
        <Reveal className="max-w-[760px] mx-auto text-center">
          <h2 className="font-spectral leading-[1.06] mb-6" style={{ fontSize: 'clamp(34px,5vw,56px)' }}>Проверим свободные даты</h2>
          <p className="text-white/45 text-[15px] mb-10 max-w-[48ch] mx-auto">
            Оставьте номер — перезвоним, подберём домик и подскажем, что происходит на базе в ваши даты.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 5000); }} className="flex gap-3 max-w-[520px] mx-auto flex-wrap">
            <input required type="tel" placeholder="+7 (___) ___-__-__" className="flex-1 min-w-[220px] bg-transparent border border-white/20 rounded-full px-6 py-4 text-[14px] outline-none focus:border-[#7E9B6E] transition-colors placeholder:text-white/25" />
            <button type="submit" className="px-8 py-4 rounded-full text-[12px] uppercase tracking-[0.15em]" style={{ background: MOSS, color: BG }}>Забронировать</button>
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
              {houses.map((h) => (
                <a key={h.id} href={`${ROOT}/house/${h.id}`} onClick={(e) => go(e, `${ROOT}/house/${h.id}`)} className="hover:text-white transition-colors active:brightness-95 active:duration-75">{h.n}</a>
              ))}
              <a href={ROOT + '/area'} onClick={(e) => go(e, ROOT + '/area')} className="hover:text-white transition-colors active:brightness-95 active:duration-75">Территория</a>
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
