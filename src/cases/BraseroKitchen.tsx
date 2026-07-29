import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import DemoPlaceholder from '../components/DemoPlaceholder';
import DemoPhoto from '../components/DemoPhoto';
import { ColumnChart, DonutStat } from '../components/DemoCharts';

/* BRASERO — ресторан на углях. ТРИ СТРАНИЦЫ: главная, полное меню, банкеты.
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
const ROOT = '#case/food';

type Dish = { n: string; d: string; p: string; w: string; veg?: boolean; hit?: boolean };

const menu: Record<string, Dish[]> = {
  'Мангал': [
    { n: 'Каре ягнёнка', d: 'Новозеландское каре, розмарин, печёный чеснок', p: '1 690 ₽', w: '280 г', hit: true },
    { n: 'Шашлык из свиной шеи', d: 'Маринад на луковом соке, лаваш, соус наршараб', p: '790 ₽', w: '250 г', hit: true },
    { n: 'Дорадо на углях', d: 'Целиком, лимон, тимьян, оливковое масло', p: '1 340 ₽', w: '340 г' },
    { n: 'Люля из баранины', d: 'Ручной рубки, сумах, маринованный лук', p: '680 ₽', w: '220 г' },
    { n: 'Шашлык из курицы', d: 'Бедро, чесночный маринад, аджика', p: '590 ₽', w: '240 г' },
    { n: 'Овощи гриль', d: 'Баклажан, перец, цукини, помидор, зелень', p: '540 ₽', w: '300 г', veg: true },
  ],
  'Горячее': [
    { n: 'Хачапури по-аджарски', d: 'Сулугуни, желток, сливочное масло', p: '690 ₽', w: '380 г', veg: true, hit: true },
    { n: 'Плов из баранины', d: 'Девзира, зира, барбарис, чеснок', p: '740 ₽', w: '350 г' },
    { n: 'Хинкали', d: 'Ручная лепка, говядина и свинина, 5 шт.', p: '560 ₽', w: '300 г' },
    { n: 'Чанахи', d: 'Баранина, овощи, томлёные в глиняном горшочке', p: '820 ₽', w: '400 г' },
    { n: 'Оджахури', d: 'Свинина с картофелем на сковороде, кинза', p: '690 ₽', w: '380 г' },
  ],
  'Закуски': [
    { n: 'Пхали ассорти', d: 'Шпинат, свёкла, баклажан, грецкий орех', p: '520 ₽', w: '240 г', veg: true },
    { n: 'Сациви', d: 'Куриное филе в ореховом соусе', p: '610 ₽', w: '220 г' },
    { n: 'Лобио', d: 'Красная фасоль, кинза, специи, мчади', p: '480 ₽', w: '260 г', veg: true },
    { n: 'Бадриджани', d: 'Баклажан с ореховой пастой и гранатом', p: '540 ₽', w: '200 г', veg: true },
    { n: 'Сыры и соленья', d: 'Сулугуни, имеретинский, джонджоли, огурцы', p: '720 ₽', w: '300 г', veg: true },
  ],
  'Супы': [
    { n: 'Харчо', d: 'Говядина, рис, тклапи, грецкий орех', p: '520 ₽', w: '350 мл' },
    { n: 'Чихиртма', d: 'Куриный, загущённый яйцом, кинза', p: '480 ₽', w: '350 мл' },
    { n: 'Хаш', d: 'По субботам с 9 утра, чеснок и лаваш отдельно', p: '640 ₽', w: '400 мл' },
  ],
  'Десерты': [
    { n: 'Пахлава', d: 'Слоёное тесто, грецкий орех, мёд', p: '340 ₽', w: '160 г', veg: true },
    { n: 'Наполеон', d: 'Домашний крем, 12 слоёв', p: '390 ₽', w: '180 г', veg: true },
    { n: 'Мацони с мёдом', d: 'Домашнее мацони, горный мёд, орехи', p: '290 ₽', w: '200 г', veg: true },
  ],
  'Напитки': [
    { n: 'Домашний лимонад', d: 'Тархун, груша или фейхоа', p: '290 ₽', w: '400 мл', veg: true },
    { n: 'Чача выдержанная', d: 'Кахетинская, 5 лет', p: '390 ₽', w: '50 мл' },
    { n: 'Вино дома', d: 'Саперави или Ркацители, графин', p: '890 ₽', w: '500 мл' },
  ],
};

const categories = Object.keys(menu);
const teaser = ['Мангал', 'Горячее', 'Закуски'];

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

const banquetSets = [
  {
    n: 'Дружеский', p: '2 400', per: '₽ / гость', from: 'от 10 гостей', accent: false,
    items: ['Пхали ассорти и сыры', 'Салат из овощей', 'Шашлык из курицы и свинины', 'Овощи на углях', 'Лаваш, соусы', 'Чай, лимонады'],
  },
  {
    n: 'Застолье', p: '3 600', per: '₽ / гость', from: 'от 12 гостей', accent: true,
    items: ['Всё из «Дружеского»', 'Сациви и бадриджани', 'Харчо', 'Люля и каре ягнёнка', 'Хачапури на стол', 'Пахлава', 'Вино дома без ограничения 3 часа'],
  },
  {
    n: 'Большой стол', p: 'от 5 200', per: '₽ / гость', from: 'от 20 гостей', accent: false,
    items: ['Всё из «Застолья»', 'Дорадо целиком', 'Плов на стол', 'Торт от кондитера', 'Отдельный зал', 'Тамада и живая музыка по запросу'],
  },
];

const banquetSteps = [
  { n: '01', t: 'Звонок', d: 'Обсуждаем дату, количество гостей и повод. Проверяем свободные залы — обычно ответ сразу.' },
  { n: '02', t: 'Меню', d: 'Берёте готовый сет или собираем своё. Учитываем вегетарианцев, детей и аллергии — просто скажите.' },
  { n: '03', t: 'Смета и бронь', d: 'Присылаем расчёт с точной суммой. Депозит 30%, остальное в день банкета.' },
  { n: '04', t: 'Банкет', d: 'Приезжаете к готовому залу. Отдельный официант на каждые десять гостей.' },
];

const banquetFaq = [
  { q: 'Можно со своим алкоголем?', a: 'Да. Пробковый сбор 500 ₽ за бутылку вина и 1 000 ₽ за крепкое. Свой торт — 500 ₽ за вынос, свечи и тарелки наши.' },
  { q: 'Как оформляется зал?', a: 'Базовое оформление — скатерти, свечи, композиции из зелени — входит в стоимость. Шары, цветы и фотозону делает наш декоратор, от 8 000 ₽.' },
  { q: 'Что с музыкой?', a: 'Своя аппаратура и микрофон в каминной, подключаем ваш плейлист. Живая музыка — дуэт или трио, от 15 000 ₽ за три часа.' },
  { q: 'До скольки можно шуметь?', a: 'До полуночи в основном зале, до двух ночи в каминной — она в глубине здания и не мешает соседям.' },
  { q: 'Если гостей будет меньше?', a: 'Считаем по факту, но не меньше минимума для выбранного сета. Об уменьшении числа просим сообщить за сутки.' },
];

const faqs = [
  { q: 'Нужно ли бронировать столик?', a: 'В будни до семи вечера обычно есть свободные места. В пятницу и субботу лучше забронировать — зал заполняется к восьми.' },
  { q: 'Есть детское меню?', a: 'Да, отдельная страница с некрупными порциями без острого. Для малышей есть стульчики и раскраски.' },
  { q: 'Можно прийти со своим тортом?', a: 'Можно, пробковый сбор за торт — 500 ₽. Свечи и тарелки принесём.' },
  { q: 'Что с блюдами для вегетарианцев?', a: 'Пхали, лобио, овощи на углях, хачапури и салаты. Помечены в меню зелёной точкой.' },
  { q: 'Работаете на вынос?', a: 'Да, самовывоз со скидкой 10%. Заказ собираем за 20–30 минут, звоните заранее.' },
];

function DishRow({ d, i }: { d: Dish; i: number }) {
  return (
    <Reveal delay={i * 0.03} className="grid grid-cols-[1fr_auto] gap-6 items-baseline py-5 border-b border-white/10">
      <div>
        <div className="flex items-baseline gap-2.5 flex-wrap">
          <span className="font-bodoni text-[21px] md:text-[23px]">{d.n}</span>
          {d.veg && <span className="w-[7px] h-[7px] rounded-full bg-[#8FAE6B] shrink-0" title="Вегетарианское" />}
          {d.hit && <span className="text-[9px] uppercase tracking-[0.16em] px-2 py-1 rounded-full" style={{ background: 'rgba(212,112,58,0.16)', color: EMBER }}>хит</span>}
        </div>
        <div className="text-[13.5px] text-white/40 mt-1.5 max-w-[46ch]">{d.d}</div>
      </div>
      <div className="text-right shrink-0">
        <div className="font-bodoni text-[20px]" style={{ color: EMBER }}>{d.p}</div>
        <div className="text-[11px] text-white/30 mt-1">{d.w}</div>
      </div>
    </Reveal>
  );
}

export default function BraseroKitchen() {
  const [hash, setHash] = useState(() => (typeof window !== 'undefined' ? window.location.hash : ROOT));
  const [cat, setCat] = useState(categories[0]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openBq, setOpenBq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [vegOnly, setVegOnly] = useState(false);
  const [guests, setGuests] = useState(12);
  const [setIdx, setSetIdx] = useState(1);

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const page = hash.startsWith(ROOT + '/menu') ? 'menu' : hash.startsWith(ROOT + '/banquet') ? 'banquet' : 'home';

  const go = (e: React.MouseEvent, to: string) => {
    e.preventDefault(); window.location.hash = to; window.scrollTo(0, 0);
  };
  const jump = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (page !== 'home') { window.location.hash = ROOT; setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 70); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const list = menu[cat].filter((d) => !vegOnly || d.veg);
  const bqTotal = (Number(banquetSets[setIdx].p.replace(/[^\d]/g, '')) * guests).toLocaleString('ru-RU');

  return (
    <div className="relative min-h-screen font-manrope selection:bg-[#D4703A]/35 overflow-x-clip" style={{ background: '#131010', color: CREAM }}>
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10" style={{ background: 'rgba(19,16,16,0.9)' }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-4 flex justify-between items-center pl-20 md:pl-24">
          <a href={ROOT} onClick={(e) => go(e, ROOT)} className="font-bodoni text-[24px] tracking-[0.2em] uppercase">Brasero</a>
          <nav className="hidden md:flex gap-8 items-center">
            <a href={ROOT + '/menu'} onClick={(e) => go(e, ROOT + '/menu')} className="text-[12px] uppercase tracking-[0.16em] transition-colors" style={{ color: page === 'menu' ? EMBER : 'rgba(255,255,255,0.45)' }}>Меню</a>
            <a href="#hall" onClick={(e) => jump(e, 'hall')} className="text-[12px] uppercase tracking-[0.16em] text-white/45 hover:text-white transition-colors">Зал</a>
            <a href={ROOT + '/banquet'} onClick={(e) => go(e, ROOT + '/banquet')} className="text-[12px] uppercase tracking-[0.16em] transition-colors" style={{ color: page === 'banquet' ? EMBER : 'rgba(255,255,255,0.45)' }}>Банкеты</a>
            <a href="#delivery" onClick={(e) => jump(e, 'delivery')} className="text-[12px] uppercase tracking-[0.16em] text-white/45 hover:text-white transition-colors">Доставка</a>
          </nav>
          <a href="#booking" onClick={(e) => jump(e, 'booking')} className="hidden sm:inline-block px-6 py-3 text-[11px] uppercase tracking-[0.16em] rounded-full" style={{ background: EMBER, color: '#131010' }}>Забронировать</a>
        </div>
      </header>

      {/* ═════════ СТРАНИЦА: ПОЛНОЕ МЕНЮ ═════════ */}
      {page === 'menu' && (
        <>
          <section className="px-6 md:px-8 pt-14 md:pt-20 pb-10">
            <div className="max-w-[1000px] mx-auto">
              <a href={ROOT} onClick={(e) => go(e, ROOT)} className="inline-block text-[12px] uppercase tracking-[0.16em] text-white/40 hover:text-white transition-colors mb-9">← На главную</a>
              <h1 className="font-bodoni leading-[0.98] text-center" style={{ fontSize: 'clamp(42px,7vw,88px)' }}>Меню</h1>
              <p className="mt-7 text-center text-white/45 text-[15.5px] max-w-[46ch] mx-auto leading-[1.75]">
                Всё, что готовим. Зелёная точка — вегетарианское, метка «хит» — то, что заказывают чаще всего.
              </p>
            </div>
          </section>

          <div className="sticky top-[57px] z-40 backdrop-blur-xl border-y border-white/10 px-6 md:px-8 py-4" style={{ background: 'rgba(24,20,20,0.94)' }}>
            <div className="max-w-[1000px] mx-auto flex flex-wrap gap-2.5 items-center justify-center">
              {categories.map((c) => (
                <button type="button" key={c} onClick={() => setCat(c)} className="px-4 py-2.5 rounded-full text-[11px] uppercase tracking-[0.13em] border transition-colors"
                  style={{ borderColor: cat === c ? EMBER : 'rgba(255,255,255,0.14)', background: cat === c ? EMBER : 'transparent', color: cat === c ? '#131010' : 'rgba(239,227,210,0.55)' }}>
                  {c}
                </button>
              ))}
              <button type="button" onClick={() => setVegOnly(!vegOnly)} className="px-4 py-2.5 rounded-full text-[11px] uppercase tracking-[0.13em] border transition-colors ml-1"
                style={{ borderColor: vegOnly ? '#8FAE6B' : 'rgba(255,255,255,0.14)', background: vegOnly ? '#8FAE6B' : 'transparent', color: vegOnly ? '#131010' : 'rgba(239,227,210,0.5)' }}>
                Только вег
              </button>
            </div>
          </div>

          <section className="px-6 md:px-8 py-14 md:py-20">
            <div className="max-w-[860px] mx-auto">
              <AnimatePresence mode="wait">
                <motion.div key={cat + String(vegOnly)} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: EASE }}>
                  {list.length ? list.map((d, i) => <DishRow key={d.n} d={d} i={i} />)
                    : <p className="text-center text-white/35 py-16 text-[15px]">В этой категории пока нет вегетарианских позиций.</p>}
                </motion.div>
              </AnimatePresence>
              <Reveal className="mt-12 flex flex-wrap gap-4 justify-center">
                <a href="#booking" onClick={(e) => jump(e, 'booking')} className="px-8 py-4 rounded-full text-[12px] uppercase tracking-[0.14em]" style={{ background: EMBER, color: '#131010' }}>Забронировать стол</a>
                <a href={ROOT + '/banquet'} onClick={(e) => go(e, ROOT + '/banquet')} className="px-8 py-4 rounded-full text-[12px] uppercase tracking-[0.14em] border border-white/20 hover:border-white/45 transition-colors">Банкетные сеты</a>
              </Reveal>
            </div>
          </section>
        </>
      )}

      {/* ═════════ СТРАНИЦА: БАНКЕТЫ ═════════ */}
      {page === 'banquet' && (
        <>
          <section className="px-6 md:px-8 pt-14 md:pt-20 pb-14">
            <div className="max-w-[1180px] mx-auto">
              <a href={ROOT} onClick={(e) => go(e, ROOT)} className="inline-block text-[12px] uppercase tracking-[0.16em] text-white/40 hover:text-white transition-colors mb-9">← На главную</a>
              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.3em] mb-6" style={{ color: EMBER }}>Дни рождения · свадьбы · корпоративы</div>
                  <h1 className="font-bodoni leading-[0.98]" style={{ fontSize: 'clamp(40px,6.4vw,82px)' }}>
                    Банкеты<br /><span className="italic" style={{ color: EMBER }}>до 64 гостей</span>
                  </h1>
                  <p className="mt-8 max-w-[50ch] text-white/50 text-[16.5px] leading-[1.8]">
                    Три зала, готовые сеты и возможность собрать меню под себя. Считаем смету
                    в тот же день и фиксируем цену — она не вырастет к дате.
                  </p>
                </div>
                <DemoPhoto src="/demo/brasero-banquet.jpg" label="Фото · накрытый банкетный стол" tone={EMBER} ratio="4/3" icon="interior" />
              </div>
            </div>
          </section>

          <section className="px-6 md:px-8 py-16 md:py-24 border-y border-white/10" style={{ background: '#181414' }}>
            <div className="max-w-[1180px] mx-auto">
              <Reveal className="mb-12 text-center">
                <h2 className="font-bodoni text-[36px] md:text-[50px] leading-none mb-4">Готовые сеты</h2>
                <p className="text-white/45 text-[15px]">Цена за гостя, всё включено. Напитки в «Застолье» — три часа без ограничения.</p>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {banquetSets.map((s, i) => (
                  <Reveal key={s.n} delay={i * 0.08}
                    className="flex flex-col p-8 border transition-colors"
                    style={{ borderColor: s.accent ? EMBER : 'rgba(255,255,255,0.12)', background: s.accent ? 'rgba(212,112,58,0.07)' : 'transparent' }}>
                    {s.accent && <div className="text-[10px] uppercase tracking-[0.18em] mb-4" style={{ color: EMBER }}>Выбирают чаще всего</div>}
                    <h3 className="font-bodoni text-[30px] mb-2">{s.n}</h3>
                    <div className="text-[12px] uppercase tracking-[0.12em] text-white/35 mb-6">{s.from}</div>
                    <div className="flex items-baseline gap-2 mb-7">
                      <span className="font-bodoni text-[38px] leading-none" style={{ color: EMBER }}>{s.p}</span>
                      <span className="text-[13px] text-white/40">{s.per}</span>
                    </div>
                    <div className="flex flex-col gap-3 flex-1 mb-8">
                      {s.items.map((x) => (
                        <div key={x} className="flex gap-3 text-[13.5px] text-white/55 leading-[1.6]">
                          <span className="shrink-0 mt-[7px] w-[5px] h-[5px] rounded-full" style={{ background: EMBER }} />{x}
                        </div>
                      ))}
                    </div>
                    <a href="#booking" onClick={(e) => jump(e, 'booking')} className="text-center px-6 py-3.5 rounded-full text-[11px] uppercase tracking-[0.14em] transition-colors"
                       style={s.accent ? { background: EMBER, color: '#131010' } : { border: '1px solid rgba(255,255,255,0.2)' }}>
                      Запросить смету
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-8 py-16 md:py-24">
            <div className="max-w-[820px] mx-auto">
              <Reveal className="text-center mb-10">
                <h2 className="font-bodoni text-[34px] md:text-[46px] leading-none mb-4">Прикинуть бюджет</h2>
                <p className="text-white/45 text-[15px]">Ориентир до созвона. Точную смету пришлём с учётом зала и напитков.</p>
              </Reveal>
              <Reveal className="border border-white/12 p-8 md:p-10">
                <div className="flex flex-wrap gap-2.5 mb-9">
                  {banquetSets.map((s, i) => (
                    <button type="button" key={s.n} onClick={() => setSetIdx(i)} className="px-5 py-3 rounded-full text-[11px] uppercase tracking-[0.13em] border transition-colors"
                      style={{ borderColor: setIdx === i ? EMBER : 'rgba(255,255,255,0.16)', background: setIdx === i ? EMBER : 'transparent', color: setIdx === i ? '#131010' : 'rgba(239,227,210,0.55)' }}>
                      {s.n}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-white/35">Гостей</span>
                  <span className="font-bodoni text-[26px]">{guests}</span>
                </div>
                <input type="range" min={8} max={64} value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full accent-[#D4703A] cursor-pointer mb-9" aria-label="Количество гостей" />
                <div className="flex items-end justify-between gap-6 flex-wrap pt-7 border-t border-white/10">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.16em] text-white/35 mb-2">Ориентировочно</div>
                    <div className="font-bodoni text-[40px] leading-none" style={{ color: EMBER }}>{bqTotal} ₽</div>
                  </div>
                  <a href="#booking" onClick={(e) => jump(e, 'booking')} className="px-8 py-4 rounded-full text-[12px] uppercase tracking-[0.14em]" style={{ background: EMBER, color: '#131010' }}>Обсудить дату</a>
                </div>
              </Reveal>
            </div>
          </section>

          <section className="px-6 md:px-8 py-16 md:py-24 border-y border-white/10" style={{ background: '#181414' }}>
            <div className="max-w-[1180px] mx-auto">
              <Reveal className="mb-12"><h2 className="font-bodoni text-[34px] md:text-[46px] leading-none">Как это устроено</h2></Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {banquetSteps.map((s, i) => (
                  <Reveal key={s.n} delay={i * 0.07} className="border-t pt-6" style={{ borderColor: 'rgba(212,112,58,0.45)' }}>
                    <div className="font-bodoni text-[30px] mb-3" style={{ color: EMBER }}>{s.n}</div>
                    <h3 className="font-bodoni text-[23px] mb-3">{s.t}</h3>
                    <p className="text-[13.5px] text-white/45 leading-[1.75]">{s.d}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-8 py-16 md:py-24">
            <div className="max-w-[860px] mx-auto">
              <Reveal className="mb-10"><h2 className="font-bodoni text-[34px] md:text-[46px] leading-none">Что обычно спрашивают</h2></Reveal>
              <div className="flex flex-col">
                {banquetFaq.map((f, i) => {
                  const open = openBq === i;
                  return (
                    <Reveal key={f.q} delay={i * 0.04} className="border-b border-white/10">
                      <button type="button" onClick={() => setOpenBq(open ? null : i)} className="w-full flex justify-between items-center gap-6 py-6 text-left">
                        <span className="font-bodoni text-[20px] md:text-[23px]">{f.q}</span>
                        <span className="text-[22px] shrink-0" style={{ color: EMBER }}>{open ? '−' : '+'}</span>
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

      {/* ═════════ ГЛАВНАЯ ═════════ */}
      {page === 'home' && (
        <>
          <section className="relative px-6 md:px-8 pt-20 md:pt-28 pb-20 overflow-hidden">
            <img src="/hero-food.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(120% 90% at 50% 45%, rgba(19,16,16,.62) 0%, rgba(19,16,16,.90) 70%, #131010 100%)' }} />
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
                <a href="#booking" onClick={(e) => jump(e, 'booking')} className="px-8 py-4 rounded-full text-[12px] uppercase tracking-[0.14em]" style={{ background: EMBER, color: '#131010' }}>Забронировать стол</a>
                <a href={ROOT + '/menu'} onClick={(e) => go(e, ROOT + '/menu')} className="px-8 py-4 rounded-full text-[12px] uppercase tracking-[0.14em] border border-white/20 hover:border-white/45 transition-colors">Полное меню</a>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-8 py-20 md:py-28 border-y border-white/10" style={{ background: '#181414' }}>
            <div className="max-w-[900px] mx-auto">
              <Reveal className="text-center mb-12">
                <h2 className="font-bodoni text-[38px] md:text-[54px] leading-none mb-8">Что заказывают</h2>
                <div className="flex flex-wrap justify-center gap-2.5">
                  {teaser.map((c) => (
                    <button type="button" key={c} onClick={() => setCat(c)} className="px-5 py-2.5 rounded-full text-[11px] uppercase tracking-[0.14em] border transition-colors"
                      style={{ borderColor: cat === c ? EMBER : 'rgba(255,255,255,0.14)', background: cat === c ? EMBER : 'transparent', color: cat === c ? '#131010' : 'rgba(239,227,210,0.55)' }}>
                      {c}
                    </button>
                  ))}
                </div>
              </Reveal>
              <AnimatePresence mode="wait">
                <motion.div key={cat} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: EASE }}>
                  {(menu[teaser.includes(cat) ? cat : teaser[0]] || []).slice(0, 4).map((d, i) => <DishRow key={d.n} d={d} i={i} />)}
                </motion.div>
              </AnimatePresence>
              <Reveal className="mt-10 text-center">
                <a href={ROOT + '/menu'} onClick={(e) => go(e, ROOT + '/menu')} className="inline-block px-8 py-4 rounded-full border border-white/20 hover:border-white/45 transition-colors text-[12px] uppercase tracking-[0.14em]">
                  Открыть полное меню
                </a>
              </Reveal>
            </div>
          </section>

          <section id="hall" className="px-6 md:px-8 py-20 md:py-28 scroll-mt-20">
            <div className="max-w-[1280px] mx-auto">
              <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
                <h2 className="font-bodoni text-[38px] md:text-[54px] leading-none">Три зала</h2>
                <a href={ROOT + '/banquet'} onClick={(e) => go(e, ROOT + '/banquet')} className="text-[12px] uppercase tracking-[0.14em]" style={{ color: EMBER }}>Банкеты и сеты →</a>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {hall.map((h, i) => (
                  <Reveal key={h.t} delay={i * 0.08} className="border border-white/10">
                    <DemoPhoto src={`/demo/brasero-hall-${i + 1}.jpg`} label={`Фото · ${h.t}`} tone={EMBER} ratio="4/3" icon="interior" />
                    <div className="p-7">
                      <div className="flex items-baseline justify-between gap-3 mb-3">
                        <h3 className="font-bodoni text-[26px]">{h.t}</h3>
                        <span className="text-[13px]" style={{ color: EMBER }}>{h.cap} мест</span>
                      </div>
                      <p className="text-[13.5px] text-white/45 leading-[1.7]">{h.d}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section id="delivery" className="px-6 md:px-8 py-20 md:py-28 border-y border-white/10 scroll-mt-20" style={{ background: '#181414' }}>
            <div className="max-w-[1280px] mx-auto">
              <Reveal className="mb-14"><h2 className="font-bodoni text-[38px] md:text-[54px] leading-none">Доставка</h2></Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {delivery.map((d, i) => (
                  <Reveal key={d.t} delay={i * 0.07} className="border-t pt-6" style={{ borderColor: 'rgba(212,112,58,0.45)' }}>
                    <h3 className="font-bodoni text-[27px] mb-3">{d.t}</h3>
                    <p className="text-[13.5px] text-white/45 leading-[1.75]">{d.d}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-8 py-20 md:py-28">
            <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-14 items-center">
              <div>
                <Reveal className="mb-8">
                  <h2 className="font-bodoni text-[32px] md:text-[44px] leading-none mb-4">Когда в зале свободно</h2>
                  <p className="text-white/45 text-[14.5px] leading-[1.75] max-w-[52ch]">
                    Средняя занятость столов по часам в пятницу и субботу. До семи вечера почти всегда
                    есть места без брони, после восьми — только по записи.
                  </p>
                </Reveal>
                <Reveal className="overflow-x-auto pb-2">
                  <ColumnChart tone={EMBER} height={190} unit="%" className="min-w-[500px]"
                    items={[
                      { label: '12', value: 22 }, { label: '13', value: 41 }, { label: '14', value: 38 },
                      { label: '15', value: 26 }, { label: '16', value: 24 }, { label: '17', value: 35 },
                      { label: '18', value: 58 }, { label: '19', value: 79 }, { label: '20', value: 96, hi: true },
                      { label: '21', value: 98, hi: true }, { label: '22', value: 84, hi: true }, { label: '23', value: 51 },
                    ]} />
                </Reveal>
              </div>
              <Reveal className="flex flex-col sm:flex-row lg:flex-col gap-10 justify-center">
                <DonutStat tone={EMBER} value={92} size={152}
                  label="Доставка вовремя" sub="Заказы, привезённые в обещанный интервал за прошлый месяц." />
                <DonutStat tone={EMBER} value={45} max={90} suffix=" мин" size={152}
                  label="Средний срок доставки" sub="По центру города. На окраины — до часа." />
              </Reveal>
            </div>
          </section>

          <section className="px-6 md:px-8 pb-20 md:pb-28">
            <div className="max-w-[860px] mx-auto">
              <Reveal className="mb-12"><h2 className="font-bodoni text-[38px] md:text-[52px] leading-none">Вопросы</h2></Reveal>
              <div className="flex flex-col">
                {faqs.map((f, i) => {
                  const open = openFaq === i;
                  return (
                    <Reveal key={f.q} delay={i * 0.04} className="border-b border-white/10">
                      <button type="button" onClick={() => setOpenFaq(open ? null : i)} className="w-full flex justify-between items-center gap-6 py-6 text-left">
                        <span className="font-bodoni text-[20px] md:text-[23px]">{f.q}</span>
                        <span className="text-[22px] shrink-0" style={{ color: EMBER }}>{open ? '−' : '+'}</span>
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

      {/* Бронь — общая */}
      <section id="booking" className="px-6 md:px-8 py-20 md:py-28 scroll-mt-20 border-t border-white/10">
        <Reveal className="max-w-[760px] mx-auto text-center">
          <h2 className="font-bodoni leading-[1.05] mb-6" style={{ fontSize: 'clamp(34px,5vw,58px)' }}>Оставьте номер</h2>
          <p className="text-white/45 text-[15px] mb-10 max-w-[46ch] mx-auto">
            Перезвоним в течение пятнадцати минут: подберём стол, обсудим банкет или примем заказ на доставку.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 5000); }} className="flex gap-3 max-w-[520px] mx-auto flex-wrap">
            <input required type="tel" placeholder="+7 (___) ___-__-__" className="flex-1 min-w-[220px] bg-transparent border border-white/20 rounded-full px-6 py-4 text-[14px] outline-none focus:border-[#D4703A] transition-colors placeholder:text-white/25" />
            <button type="submit" className="px-8 py-4 rounded-full text-[12px] uppercase tracking-[0.14em]" style={{ background: EMBER, color: '#131010' }}>Позвоните мне</button>
          </form>
          {sent && <p className="mt-4 text-[13px]" style={{ color: EMBER }}>Спасибо! Администратор перезвонит.</p>}
        </Reveal>
      </section>

      <footer className="px-6 md:px-8 pt-16 pb-10 border-t border-white/10" style={{ background: '#0F0C0C' }}>
        <div className="max-w-[1280px] mx-auto flex flex-wrap justify-between gap-10 mb-12">
          <div className="max-w-[300px]">
            <div className="font-bodoni text-[23px] tracking-[0.2em] uppercase mb-4">Brasero</div>
            <p className="text-[13px] text-white/40 leading-[1.75]">Ресторан на углях. Мангал на дровах, три зала и своя доставка по городу.</p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.18em] text-white/30 mb-4">Разделы</h4>
            <div className="flex flex-col gap-3 text-[13px] text-white/50">
              <a href={ROOT + '/menu'} onClick={(e) => go(e, ROOT + '/menu')} className="hover:text-white transition-colors">Полное меню</a>
              <a href={ROOT + '/banquet'} onClick={(e) => go(e, ROOT + '/banquet')} className="hover:text-white transition-colors">Банкеты</a>
              <a href="#delivery" onClick={(e) => jump(e, 'delivery')} className="hover:text-white transition-colors">Доставка</a>
              <a href="#hall" onClick={(e) => jump(e, 'hall')} className="hover:text-white transition-colors">Залы</a>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.18em] text-white/30 mb-4">Контакты</h4>
            <div className="flex flex-col gap-3 text-[13px] text-white/50">
              <span className="text-[17px] text-white">+7 (831) 000-00-00</span>
              <span>hello@brasero.example</span>
              <span className="text-white/35">ул. Рождественская, 24<br />Пн–Чт 12:00–00:00 · Пт–Вс 12:00–02:00</span>
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
