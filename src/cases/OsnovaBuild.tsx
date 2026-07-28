import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import DemoPlaceholder from '../components/DemoPlaceholder';
import { Timeline, Waterfall, ColumnChart } from '../components/DemoCharts';

/* OSNOVA — строительство домов под ключ. ЧЕТЫРЕ СТРАНИЦЫ:
   главная → каталог проектов → проект внутри → цены.
   Визуальный язык: бетон и чертёж. Оливково-песочная палитра, широкие
   гротескные заголовки, разметочная сетка как у рабочей документации. */

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = '', delay = 0, style }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.75, delay, ease: EASE }} className={className} style={style}>
      {children}
    </motion.div>
  );
}

const CLAY = '#C8703C';
const SAND = '#D8CFC0';
const ROOT = '#case/construction';

const heroFacts = [
  { v: '184', l: 'дома сдано' },
  { v: '11 лет', l: 'на рынке' },
  { v: '5 лет', l: 'гарантия на каркас' },
  { v: '0 ₽', l: 'смета и выезд' },
];

type Project = {
  slug: string; name: string; area: string; term: string; price: string; tech: string; tone: string;
  floors: string; beds: string; lead: string;
  rooms: [string, string][];
  spec: [string, string][];
  notes: string[];
};

const projects: Project[] = [
  {
    slug: 'olha', name: 'Дом «Ольха»', area: '146 м²', term: '5 месяцев', price: '6 900 000 ₽', tech: 'Газобетон', tone: '#8A7F6D',
    floors: '2 этажа', beds: '3 спальни',
    lead: 'Самый заказываемый проект. Компактный второй свет в гостиной, три спальни наверху и котельная с отдельным входом с улицы.',
    rooms: [['Гостиная-кухня', '42 м², второй свет'], ['Спальня родителей', '18 м², гардеробная'], ['Детская 1', '14 м²'], ['Детская 2', '14 м²'], ['Санузлы', '2 шт., 5 и 8 м²'], ['Котельная', '7 м², отдельный вход'], ['Терраса', '16 м², под общей кровлей']],
    spec: [['Фундамент', 'Утеплённая шведская плита'], ['Стены', 'Газобетон 375 мм, D400'], ['Перекрытие', 'Монолитное, 200 мм'], ['Кровля', 'Металлочерепица, утепление 250 мм'], ['Окна', 'ПВХ, двухкамерный стеклопакет'], ['Отопление', 'Тёплый пол первого этажа + радиаторы']],
    notes: ['Проект прошёл семнадцать реализаций — узлы отработаны', 'Можно зеркалить планировку под ориентацию участка', 'Второй свет по желанию закрывается — получается четвёртая спальня'],
  },
  {
    slug: 'sosna', name: 'Дом «Сосна»', area: '112 м²', term: '4 месяца', price: '5 200 000 ₽', tech: 'Каркас', tone: '#9C8E76',
    floors: '1 этаж', beds: '3 спальни',
    lead: 'Одноэтажный дом без лестницы и лишних метров. Берут семьи с маленькими детьми и те, кто строит для родителей.',
    rooms: [['Кухня-гостиная', '34 м²'], ['Спальня', '16 м²'], ['Спальня', '12 м²'], ['Спальня', '12 м²'], ['Санузел', '6 м²'], ['Постирочная', '4 м²'], ['Тамбур', '5 м²']],
    spec: [['Фундамент', 'Свайно-ростверковый'], ['Каркас', 'Сухая строганая доска 200 мм'], ['Утепление', 'Каменная вата 200 мм + 50 мм перекрёстно'], ['Кровля', 'Мягкая черепица'], ['Окна', 'ПВХ, энергосберегающий стеклопакет'], ['Отопление', 'Электрокотёл, тёплый пол по всему дому']],
    notes: ['Самый быстрый срок — четыре месяца от фундамента', 'Нет лестницы: удобно с колясками и в старости', 'Возможен вариант с гаражом под общей кровлей, +1 100 000 ₽'],
  },
  {
    slug: 'granit', name: 'Дом «Гранит»', area: '210 м²', term: '7 месяцев', price: '11 400 000 ₽', tech: 'Кирпич', tone: '#77705F',
    floors: '2 этажа + цоколь', beds: '4 спальни',
    lead: 'Большой кирпичный дом с цокольным этажом. Строим, когда участок с уклоном и хочется спрятать в склон гараж и техпомещения.',
    rooms: [['Гостиная', '46 м², камин'], ['Кухня-столовая', '28 м²'], ['Кабинет', '16 м²'], ['Спальни', '4 шт., от 14 до 22 м²'], ['Санузлы', '3 шт.'], ['Цоколь', 'Гараж на 2 машины, сауна, кладовые']],
    spec: [['Фундамент', 'Монолитная лента с цокольным этажом'], ['Стены', 'Керамический кирпич 380 мм + утепление 150 мм'], ['Перекрытия', 'Сборно-монолитные'], ['Кровля', 'Натуральная черепица'], ['Окна', 'Алюминий-дерево'], ['Отопление', 'Газовый котёл, два контура']],
    notes: ['Требуется геология: цоколь на пучинистых грунтах считается отдельно', 'Срок семь месяцев — при работе в тёплый сезон', 'Проект адаптируется под уклон участка до 12%'],
  },
  {
    slug: 'terrasa', name: 'Дом «Терраса»', area: '168 м²', term: '6 месяцев', price: '8 300 000 ₽', tech: 'Газобетон', tone: '#8A7F6D',
    floors: '2 этажа', beds: '3 спальни',
    lead: 'Дом вокруг большой террасы. Панорамное остекление гостиной выходит на закрытую от соседей сторону участка.',
    rooms: [['Гостиная', '38 м², панорамное остекление'], ['Кухня', '18 м²'], ['Спальня родителей', '20 м², санузел'], ['Спальни', '2 шт., по 15 м²'], ['Терраса', '38 м², частично крытая'], ['Кладовая', '6 м²']],
    spec: [['Фундамент', 'Утеплённая плита'], ['Стены', 'Газобетон 400 мм'], ['Перекрытие', 'Монолитное'], ['Кровля', 'Фальцевая, тёмный графит'], ['Остекление', 'Панорамные двери, тёплый алюминий'], ['Отопление', 'Тепловой насос воздух-вода']],
    notes: ['Панорамные двери — самая дорогая позиция сметы, считаем отдельно', 'Терраса на отдельных сваях, не связана с домом', 'Ориентация окон подбирается по инсоляции участка'],
  },
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
  { name: 'Коробка', price: 'от 32 000', unit: '₽ / м²', lead: 'Фундамент, стены, кровля, окна', accent: false,
    items: ['Геология и проект', 'Фундамент по расчёту', 'Стены и перекрытия', 'Кровля с водостоком', 'Окна и входная дверь'] },
  { name: 'Под ключ', price: 'от 58 000', unit: '₽ / м²', lead: 'Заезжаете и живёте', accent: true,
    items: ['Всё из «Коробки»', 'Инженерные сети', 'Чистовая отделка', 'Сантехника и электрика', 'Благоустройство входной группы', 'Гарантия 5 лет'] },
  { name: 'Реконструкция', price: 'по смете', unit: '', lead: 'Работа с существующим домом', accent: false,
    items: ['Обследование конструкций', 'Усиление и замена узлов', 'Перепланировка', 'Замена инженерии', 'Фасад и кровля'] },
];

const priceRows: [string, string, string][] = [
  ['Геология участка', '38 000 ₽', 'Три скважины, отчёт с рекомендацией по фундаменту'],
  ['Проект дома', 'от 1 400 ₽/м²', 'Планировки, разрезы, узлы, ведомость материалов'],
  ['Свайно-ростверковый фундамент', 'от 6 800 ₽/м²', 'Буронабивные сваи, монолитный ростверк'],
  ['Утеплённая шведская плита', 'от 11 200 ₽/м²', 'С заложенным тёплым полом и вводами'],
  ['Газобетонная коробка', 'от 14 500 ₽/м²', 'Стены 375 мм, перемычки, армопояс'],
  ['Каркас', 'от 12 000 ₽/м²', 'Сухая строганая доска, утепление 250 мм'],
  ['Кровля металлочерепица', 'от 3 900 ₽/м²', 'Стропильная система, утепление, водосток'],
  ['Кровля фальцевая', 'от 6 400 ₽/м²', 'Оцинкованная сталь с полимерным покрытием'],
  ['Инженерные сети', 'от 9 800 ₽/м²', 'Отопление, водоснабжение, канализация, электрика'],
  ['Чистовая отделка', 'от 18 000 ₽/м²', 'Стены, полы, потолки, двери, сантехника'],
];

const extras: [string, string][] = [
  ['Гараж под общей кровлей', 'от 1 100 000 ₽'],
  ['Терраса на отдельных сваях', 'от 12 000 ₽/м²'],
  ['Сауна в цоколе', 'от 640 000 ₽'],
  ['Тепловой насос вместо котла', 'от 780 000 ₽'],
  ['Септик с полем фильтрации', 'от 210 000 ₽'],
  ['Благоустройство и дорожки', 'от 3 400 ₽/м²'],
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
  const [hash, setHash] = useState(() => (typeof window !== 'undefined' ? window.location.hash : ROOT));
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [area, setArea] = useState(140);
  const [pkg, setPkg] = useState(1);
  const [tech, setTech] = useState<string>('Все');

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const slug = hash.startsWith(ROOT + '/project/') ? hash.split('/project/')[1] : null;
  const current = projects.find((p) => p.slug === slug) || null;
  const page = current ? 'project' : hash.startsWith(ROOT + '/projects') ? 'projects' : hash.startsWith(ROOT + '/prices') ? 'prices' : 'home';

  const go = (e: React.MouseEvent, to: string) => {
    e.preventDefault(); window.location.hash = to; window.scrollTo(0, 0);
  };
  const jump = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (page !== 'home') { window.location.hash = ROOT; setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 70); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const rate = [32000, 58000, 44000][pkg];
  const total = (area * rate).toLocaleString('ru-RU');
  const techs = ['Все', ...Array.from(new Set(projects.map((p) => p.tech)))];
  const shown = projects.filter((p) => tech === 'Все' || p.tech === tech);

  const linkCls = (active: boolean) =>
    'text-[12px] uppercase tracking-[0.14em] transition-colors ' + (active ? '' : 'text-white/45 hover:text-white');

  return (
    <div className="relative min-h-screen bg-[#12110F] text-[#EDE8DF] font-archivo selection:bg-[#C8703C]/40 overflow-x-clip">
      <header className="sticky top-0 z-50 bg-[#12110F]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8 py-4 flex justify-between items-center pl-20 md:pl-24">
          <a href={ROOT} onClick={(e) => go(e, ROOT)} className="font-black text-[19px] tracking-[-0.02em] uppercase">Основа<span style={{ color: CLAY }}>.</span></a>
          <nav className="hidden md:flex gap-8 items-center">
            <a href={ROOT + '/projects'} onClick={(e) => go(e, ROOT + '/projects')} className={linkCls(page === 'projects' || page === 'project')} style={page === 'projects' || page === 'project' ? { color: CLAY } : undefined}>Проекты</a>
            <a href="#stages" onClick={(e) => jump(e, 'stages')} className={linkCls(false)}>Этапы</a>
            <a href={ROOT + '/prices'} onClick={(e) => go(e, ROOT + '/prices')} className={linkCls(page === 'prices')} style={page === 'prices' ? { color: CLAY } : undefined}>Цены</a>
            <a href="#contacts" onClick={(e) => jump(e, 'contacts')} className={linkCls(false)}>Контакты</a>
          </nav>
          <a href="#contacts" onClick={(e) => jump(e, 'contacts')} className="hidden sm:inline-block px-6 py-3 text-[11px] font-bold uppercase tracking-[0.13em] text-[#12110F]" style={{ background: CLAY }}>Смета бесплатно</a>
        </div>
      </header>

      {/* ═════════ КАТАЛОГ ПРОЕКТОВ ═════════ */}
      {page === 'projects' && (
        <>
          <section className="px-6 md:px-8 pt-14 md:pt-20 pb-10">
            <div className="max-w-[1320px] mx-auto">
              <a href={ROOT} onClick={(e) => go(e, ROOT)} className="inline-block text-[12px] uppercase tracking-[0.14em] text-white/40 hover:text-white transition-colors mb-9">← На главную</a>
              <h1 className="font-black leading-[0.94] tracking-[-0.03em] uppercase max-w-[16ch]" style={{ fontSize: 'clamp(38px,6.4vw,80px)' }}>
                Каталог<br /><span style={{ color: CLAY }}>проектов</span>
              </h1>
              <p className="mt-8 max-w-[56ch] text-[16.5px] leading-[1.8]" style={{ color: 'rgba(237,232,223,0.55)' }}>
                Четыре отработанных проекта. Цена в карточке — «под ключ» для базовой комплектации,
                без учёта участка и подключений. Любой проект адаптируем под ваш участок бесплатно.
              </p>
              <div className="mt-9 flex flex-wrap gap-2.5">
                {techs.map((t) => (
                  <button key={t} onClick={() => setTech(t)} className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] border transition-colors"
                    style={{ borderColor: tech === t ? CLAY : 'rgba(255,255,255,0.16)', background: tech === t ? CLAY : 'transparent', color: tech === t ? '#12110F' : 'rgba(237,232,223,0.55)' }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-8 pb-20">
            <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {shown.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.06}>
                  <a href={`${ROOT}/project/${p.slug}`} onClick={(e) => go(e, `${ROOT}/project/${p.slug}`)}
                     className="block h-full border border-white/10 hover:border-[#C8703C]/60 transition-colors duration-500 group">
                    <DemoPlaceholder label={`Фото · ${p.name}`} tone={CLAY} ratio="16/9" icon="building" />
                    <div className="p-7">
                      <div className="flex items-baseline justify-between gap-4 mb-3 flex-wrap">
                        <h3 className="font-black text-[26px] tracking-[-0.02em] uppercase">{p.name}</h3>
                        <span className="text-[11px] uppercase tracking-[0.12em] px-3 py-1.5" style={{ background: 'rgba(200,112,60,0.14)', color: CLAY }}>{p.tech}</span>
                      </div>
                      <p className="text-[14px] leading-[1.7] mb-6" style={{ color: 'rgba(237,232,223,0.5)' }}>{p.lead}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 border-t border-white/10">
                        {[[p.area, 'площадь'], [p.floors, 'этажность'], [p.beds, 'спальни'], [p.term, 'срок']].map(([v, l]) => (
                          <div key={l}>
                            <div className="font-bold text-[15px]">{v}</div>
                            <div className="text-[10px] uppercase tracking-[0.1em] mt-1" style={{ color: 'rgba(237,232,223,0.35)' }}>{l}</div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-baseline justify-between gap-3 mt-6">
                        <span className="font-black text-[24px]" style={{ color: CLAY }}>{p.price}</span>
                        <span className="text-[12px] text-white/35 group-hover:text-white transition-colors">смотреть проект →</span>
                      </div>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ═════════ ПРОЕКТ ВНУТРИ ═════════ */}
      {page === 'project' && current && (
        <>
          <section className="px-6 md:px-8 pt-14 md:pt-20 pb-14">
            <div className="max-w-[1320px] mx-auto">
              <a href={ROOT + '/projects'} onClick={(e) => go(e, ROOT + '/projects')} className="inline-block text-[12px] uppercase tracking-[0.14em] text-white/40 hover:text-white transition-colors mb-9">← Все проекты</a>
              <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-start">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.28em] mb-6" style={{ color: CLAY }}>{current.tech} · {current.floors} · {current.beds}</div>
                  <h1 className="font-black leading-[0.94] tracking-[-0.03em] uppercase" style={{ fontSize: 'clamp(36px,5.8vw,72px)' }}>{current.name}</h1>
                  <p className="mt-8 max-w-[52ch] text-[16.5px] leading-[1.8]" style={{ color: 'rgba(237,232,223,0.55)' }}>{current.lead}</p>
                  <div className="mt-10 grid grid-cols-3 border-t border-white/12">
                    {[[current.area, 'площадь'], [current.term, 'срок'], [current.price, 'под ключ']].map(([v, l], i) => (
                      <div key={l} className={'py-6 pr-5 ' + (i ? 'pl-5 border-l border-white/12' : '')}>
                        <div className="font-black text-[20px] md:text-[24px]" style={i === 2 ? { color: CLAY } : undefined}>{v}</div>
                        <div className="text-[10px] uppercase tracking-[0.1em] mt-2" style={{ color: 'rgba(237,232,223,0.35)' }}>{l}</div>
                      </div>
                    ))}
                  </div>
                  <a href="#contacts" onClick={(e) => jump(e, 'contacts')} className="inline-block mt-9 px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] text-[#12110F]" style={{ background: CLAY }}>Рассчитать под мой участок</a>
                </div>
                <DemoPlaceholder label={`Фасад · ${current.name}`} tone={CLAY} ratio="4/3" icon="building" />
              </div>
            </div>
          </section>

          <section className="px-6 md:px-8 py-16 md:py-20 border-y border-white/10 bg-[#171512]">
            <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">
              <div>
                <Reveal className="mb-8"><h2 className="font-black text-[28px] md:text-[36px] uppercase tracking-[-0.02em]">Помещения</h2></Reveal>
                {current.rooms.map(([n, s], i) => (
                  <Reveal key={n + i} delay={i * 0.04} className="grid grid-cols-[1fr_auto] gap-6 py-4 border-b border-white/10">
                    <span className="text-[15px]">{n}</span>
                    <span className="text-[13.5px] text-right" style={{ color: 'rgba(237,232,223,0.45)' }}>{s}</span>
                  </Reveal>
                ))}
              </div>
              <div>
                <Reveal className="mb-8"><h2 className="font-black text-[28px] md:text-[36px] uppercase tracking-[-0.02em]">Конструктив</h2></Reveal>
                {current.spec.map(([n, s], i) => (
                  <Reveal key={n} delay={i * 0.04} className="grid grid-cols-[auto_1fr] gap-6 py-4 border-b border-white/10">
                    <span className="text-[11px] uppercase tracking-[0.1em] w-[110px] shrink-0 pt-1" style={{ color: 'rgba(237,232,223,0.35)' }}>{n}</span>
                    <span className="text-[14.5px]">{s}</span>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-8 py-16 md:py-20">
            <div className="max-w-[1320px] mx-auto">
              <Reveal className="mb-9"><h2 className="font-black text-[28px] md:text-[36px] uppercase tracking-[-0.02em]">Что важно знать</h2></Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {current.notes.map((n, i) => (
                  <Reveal key={n} delay={i * 0.07} className="border-t pt-5" style={{ borderColor: 'rgba(200,112,60,0.45)' }}>
                    <p className="text-[14.5px] leading-[1.75]" style={{ color: 'rgba(237,232,223,0.6)' }}>{n}</p>
                  </Reveal>
                ))}
              </div>
              <Reveal className="mt-14 flex flex-wrap gap-4">
                {projects.filter((p) => p.slug !== current.slug).slice(0, 3).map((p) => (
                  <a key={p.slug} href={`${ROOT}/project/${p.slug}`} onClick={(e) => go(e, `${ROOT}/project/${p.slug}`)}
                     className="px-6 py-4 border border-white/15 hover:border-white/40 transition-colors text-[13px]">
                    {p.name} · {p.area} →
                  </a>
                ))}
              </Reveal>
            </div>
          </section>
        </>
      )}

      {/* ═════════ ЦЕНЫ ═════════ */}
      {page === 'prices' && (
        <>
          <section className="px-6 md:px-8 pt-14 md:pt-20 pb-12">
            <div className="max-w-[1100px] mx-auto">
              <a href={ROOT} onClick={(e) => go(e, ROOT)} className="inline-block text-[12px] uppercase tracking-[0.14em] text-white/40 hover:text-white transition-colors mb-9">← На главную</a>
              <h1 className="font-black leading-[0.94] tracking-[-0.03em] uppercase max-w-[14ch]" style={{ fontSize: 'clamp(38px,6.4vw,80px)' }}>
                Прайс<br /><span style={{ color: CLAY }}>по работам</span>
              </h1>
              <p className="mt-8 max-w-[58ch] text-[16.5px] leading-[1.8]" style={{ color: 'rgba(237,232,223,0.55)' }}>
                Открытые расценки, чтобы вы могли сверить нашу смету с чужой построчно.
                Финальная цена зависит от геологии, рельефа и удалённости участка — считаем после выезда.
              </p>
            </div>
          </section>

          <section className="px-6 md:px-8 pb-16">
            <div className="max-w-[1100px] mx-auto">
              <Reveal className="grid grid-cols-[1fr_auto] md:grid-cols-[1.1fr_auto_1.3fr] gap-6 pb-4 border-b border-white/20 text-[10px] uppercase tracking-[0.14em]" style={{ color: 'rgba(237,232,223,0.35)' }}>
                <span>Работа</span><span className="text-right md:text-left">Цена</span><span className="hidden md:block">Что входит</span>
              </Reveal>
              {priceRows.map(([n, p, d], i) => (
                <Reveal key={n} delay={i * 0.03} className="grid grid-cols-[1fr_auto] md:grid-cols-[1.1fr_auto_1.3fr] gap-6 py-5 border-b border-white/10 items-baseline">
                  <span className="text-[15px]">{n}</span>
                  <span className="font-bold text-[15px] text-right md:text-left whitespace-nowrap" style={{ color: CLAY }}>{p}</span>
                  <span className="col-span-2 md:col-span-1 text-[13px] leading-[1.65]" style={{ color: 'rgba(237,232,223,0.42)' }}>{d}</span>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="px-6 md:px-8 py-16 md:py-20 border-y border-white/10 bg-[#171512]">
            <div className="max-w-[1100px] mx-auto">
              <Reveal className="mb-10">
                <h2 className="font-black text-[28px] md:text-[38px] uppercase tracking-[-0.02em] mb-3">Из чего складывается смета</h2>
                <p className="text-[14.5px] max-w-[56ch] leading-[1.75]" style={{ color: 'rgba(237,232,223,0.5)' }}>
                  Пример: дом «Ольха», 146 м², комплектация «Под ключ». Так выглядит реальная разбивка,
                  которую вы получаете вместе с договором.
                </p>
              </Reveal>
              <Reveal className="overflow-x-auto pb-2">
                <Waterfall tone={CLAY} height={210} className="min-w-[620px]"
                  items={[
                    { label: 'Проект и геология', delta: 242000 },
                    { label: 'Фундамент', delta: 1635000 },
                    { label: 'Коробка', delta: 2117000 },
                    { label: 'Кровля', delta: 569000 },
                    { label: 'Инженерия', delta: 1431000 },
                    { label: 'Отделка', delta: 2628000 },
                    { label: 'Скидка на объём', delta: -1722000 },
                  ]} />
              </Reveal>
              <Reveal className="mt-6 text-[12.5px] text-center" style={{ color: 'rgba(237,232,223,0.35)' }}>
                Красный столбец — скидка за полный цикл: когда все этапы делает одна бригада, дешевле на 20%.
              </Reveal>
            </div>
          </section>

          <section className="px-6 md:px-8 py-16 border-y border-white/10">
            <div className="max-w-[1100px] mx-auto">
              <Reveal className="mb-9"><h2 className="font-black text-[28px] md:text-[38px] uppercase tracking-[-0.02em]">Дополнительно</h2></Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
                {extras.map(([n, p], i) => (
                  <Reveal key={n} delay={i * 0.04} className="flex justify-between gap-6 py-4 border-b border-white/10 items-baseline">
                    <span className="text-[14.5px]">{n}</span>
                    <span className="font-bold text-[14.5px] whitespace-nowrap" style={{ color: CLAY }}>{p}</span>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-8 py-16 md:py-24">
            <div className="max-w-[820px] mx-auto">
              <Reveal className="text-center mb-10">
                <h2 className="font-black text-[30px] md:text-[42px] uppercase tracking-[-0.02em] mb-4">Прикинуть бюджет</h2>
                <p className="text-[15px]" style={{ color: 'rgba(237,232,223,0.5)' }}>Грубая оценка по площади и комплектации. Точную смету считаем после выезда.</p>
              </Reveal>
              <Reveal className="border border-white/12 p-8 md:p-10">
                <div className="flex flex-wrap gap-2.5 mb-9">
                  {packages.map((p, i) => (
                    <button key={p.name} onClick={() => setPkg(i)} className="px-5 py-3 text-[11px] font-bold uppercase tracking-[0.12em] border transition-colors"
                      style={{ borderColor: pkg === i ? CLAY : 'rgba(255,255,255,0.16)', background: pkg === i ? CLAY : 'transparent', color: pkg === i ? '#12110F' : 'rgba(237,232,223,0.55)' }}>
                      {p.name}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-[11px] uppercase tracking-[0.14em]" style={{ color: 'rgba(237,232,223,0.35)' }}>Площадь дома</span>
                  <span className="font-black text-[26px]">{area} м²</span>
                </div>
                <input type="range" min={60} max={300} step={2} value={area} onChange={(e) => setArea(Number(e.target.value))} className="w-full accent-[#C8703C] cursor-pointer mb-9" aria-label="Площадь дома" />
                <div className="flex items-end justify-between gap-6 flex-wrap pt-7 border-t border-white/10">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.14em] mb-2" style={{ color: 'rgba(237,232,223,0.35)' }}>Ориентировочно</div>
                    <div className="font-black text-[38px] leading-none" style={{ color: CLAY }}>{total} ₽</div>
                  </div>
                  <a href="#contacts" onClick={(e) => jump(e, 'contacts')} className="px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] text-[#12110F]" style={{ background: CLAY }}>Получить точную смету</a>
                </div>
              </Reveal>
            </div>
          </section>
        </>
      )}

      {/* ═════════ ГЛАВНАЯ ═════════ */}
      {page === 'home' && (
        <>
          <section className="relative px-6 md:px-8 pt-20 md:pt-28 pb-20 overflow-hidden">
            <img src="/hero-construction.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(95deg,rgba(18,17,15,.94) 0%,rgba(18,17,15,.80) 48%,rgba(18,17,15,.38) 100%)' }} />
            <div className="max-w-[1320px] mx-auto relative">
              <div className="text-[11px] uppercase tracking-[0.3em] mb-8" style={{ color: CLAY }}>Строительство домов под ключ</div>
              <h1 className="font-black leading-[0.9] tracking-[-0.035em] uppercase max-w-[13ch]" style={{ fontSize: 'clamp(44px,8vw,104px)' }}>
                Дом<br />по смете,<br /><span style={{ color: CLAY }}>а не по факту</span>
              </h1>
              <p className="mt-9 max-w-[52ch] text-[17px] leading-[1.75]" style={{ color: 'rgba(237,232,223,0.55)' }}>
                Фиксируем цену договором, показываем стройку каждую пятницу и берём деньги
                за завершённый этап, а не вперёд.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#contacts" onClick={(e) => jump(e, 'contacts')} className="px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] text-[#12110F]" style={{ background: CLAY }}>Бесплатная смета</a>
                <a href={ROOT + '/projects'} onClick={(e) => go(e, ROOT + '/projects')} className="px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] border border-white/20 hover:border-white/45 transition-colors">Каталог проектов</a>
              </div>
              <Reveal className="mt-16 grid grid-cols-2 lg:grid-cols-4 border-t border-white/12">
                {heroFacts.map((f) => (
                  <div key={f.l} className="py-7 pr-6 border-b lg:border-b-0 lg:border-r border-white/12 last:border-r-0 lg:pl-7 first:pl-0">
                    <div className="font-black text-[30px] md:text-[38px] leading-none tracking-[-0.02em]">{f.v}</div>
                    <div className="text-[11px] uppercase tracking-[0.1em] mt-2.5" style={{ color: 'rgba(237,232,223,0.4)' }}>{f.l}</div>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>

          <section className="px-6 md:px-8 py-20 md:py-28 border-y border-white/10 bg-[#171512]">
            <div className="max-w-[1320px] mx-auto">
              <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
                <h2 className="font-black text-[36px] md:text-[52px] uppercase tracking-[-0.03em] leading-none">Проекты</h2>
                <a href={ROOT + '/projects'} onClick={(e) => go(e, ROOT + '/projects')} className="text-[12px] uppercase tracking-[0.14em]" style={{ color: CLAY }}>Весь каталог →</a>
              </Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {projects.map((p, i) => (
                  <Reveal key={p.slug} delay={i * 0.06}>
                    <a href={`${ROOT}/project/${p.slug}`} onClick={(e) => go(e, `${ROOT}/project/${p.slug}`)}
                       className="block h-full border border-white/10 hover:border-[#C8703C]/60 transition-colors duration-500 group">
                      <DemoPlaceholder label={p.name} tone={CLAY} ratio="4/3" icon="building" />
                      <div className="p-5">
                        <h3 className="font-bold text-[18px] uppercase tracking-[-0.01em] mb-3">{p.name}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] mb-4" style={{ color: 'rgba(237,232,223,0.4)' }}>
                          <span>{p.area}</span><span>{p.term}</span><span>{p.tech}</span>
                        </div>
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="font-black text-[17px]" style={{ color: CLAY }}>{p.price}</span>
                          <span className="text-[11px] text-white/30 group-hover:text-white transition-colors">→</span>
                        </div>
                      </div>
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section id="stages" className="px-6 md:px-8 py-20 md:py-28 scroll-mt-20">
            <div className="max-w-[1320px] mx-auto">
              <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
                <h2 className="font-black text-[36px] md:text-[52px] uppercase tracking-[-0.03em] leading-none">Как строим</h2>
                <p className="text-[14px] max-w-[34ch] leading-[1.7]" style={{ color: 'rgba(237,232,223,0.45)' }}>
                  Дом 146 м² от договора до ключей — восемь месяцев. Сроки указаны по факту сданных объектов.
                </p>
              </Reveal>

              <Reveal className="hidden md:block mb-16 pb-4 overflow-x-auto">
                <Timeline tone={CLAY} className="min-w-[720px]"
                  steps={[
                    { mark: 'Нед. 1–2', t: 'Выезд и геология', d: 'Три скважины, отчёт' },
                    { mark: 'Мес. 1', t: 'Проект и смета', d: 'Фиксация цены' },
                    { mark: 'Мес. 2', t: 'Фундамент', d: 'По расчёту грунта' },
                    { mark: 'Мес. 3–5', t: 'Коробка и кровля', d: 'Контур закрыт' },
                    { mark: 'Мес. 6', t: 'Инженерия', d: 'Схемы до штробления' },
                    { mark: 'Мес. 7–8', t: 'Отделка и сдача', d: 'Гарантийный талон' },
                  ]} />
              </Reveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
                {stages.map((s, i) => (
                  <Reveal key={s.n} delay={i * 0.06} className="border-t pt-6" style={{ borderColor: 'rgba(200,112,60,0.45)' }}>
                    <div className="font-black text-[30px] mb-3" style={{ color: CLAY }}>{s.n}</div>
                    <h3 className="font-bold text-[21px] mb-3 uppercase tracking-[-0.01em]">{s.t}</h3>
                    <p className="text-[14px] leading-[1.75]" style={{ color: 'rgba(237,232,223,0.5)' }}>{s.d}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-8 py-20 md:py-28 border-y border-white/10 bg-[#171512]">
            <div className="max-w-[1320px] mx-auto">
              <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
                <h2 className="font-black text-[36px] md:text-[52px] uppercase tracking-[-0.03em] leading-none">Комплектации</h2>
                <a href={ROOT + '/prices'} onClick={(e) => go(e, ROOT + '/prices')} className="text-[12px] uppercase tracking-[0.14em]" style={{ color: CLAY }}>Полный прайс →</a>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packages.map((p, i) => (
                  <Reveal key={p.name} delay={i * 0.08} className="flex flex-col p-8 border"
                    style={{ borderColor: p.accent ? CLAY : 'rgba(255,255,255,0.12)', background: p.accent ? 'rgba(200,112,60,0.07)' : 'transparent' }}>
                    <h3 className="font-black text-[26px] uppercase tracking-[-0.02em] mb-2">{p.name}</h3>
                    <div className="text-[12px] uppercase tracking-[0.1em] mb-6" style={{ color: 'rgba(237,232,223,0.4)' }}>{p.lead}</div>
                    <div className="flex items-baseline gap-2 mb-7">
                      <span className="font-black text-[34px] leading-none" style={{ color: CLAY }}>{p.price}</span>
                      <span className="text-[13px]" style={{ color: 'rgba(237,232,223,0.4)' }}>{p.unit}</span>
                    </div>
                    <div className="flex flex-col gap-3 flex-1 mb-8">
                      {p.items.map((x) => (
                        <div key={x} className="flex gap-3 text-[13.5px] leading-[1.6]" style={{ color: 'rgba(237,232,223,0.6)' }}>
                          <span className="shrink-0 mt-[7px] w-[5px] h-[5px]" style={{ background: CLAY }} />{x}
                        </div>
                      ))}
                    </div>
                    <a href="#contacts" onClick={(e) => jump(e, 'contacts')} className="text-center px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors"
                       style={p.accent ? { background: CLAY, color: '#12110F' } : { border: '1px solid rgba(255,255,255,0.2)' }}>
                      Рассчитать
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-8 py-20 md:py-28">
            <div className="max-w-[1320px] mx-auto">
              <Reveal className="mb-14"><h2 className="font-black text-[36px] md:text-[52px] uppercase tracking-[-0.03em] leading-none">Гарантии</h2></Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {guarantees.map((g, i) => (
                  <Reveal key={g.t} delay={i * 0.07} className="border-t pt-6" style={{ borderColor: 'rgba(216,207,192,0.25)' }}>
                    <h3 className="font-bold text-[20px] mb-3 uppercase tracking-[-0.01em]">{g.t}</h3>
                    <p className="text-[13.5px] leading-[1.75]" style={{ color: 'rgba(237,232,223,0.5)' }}>{g.d}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-8 py-20 md:py-28 border-y border-white/10 bg-[#171512]">
            <div className="max-w-[880px] mx-auto">
              <Reveal className="mb-12"><h2 className="font-black text-[36px] md:text-[50px] uppercase tracking-[-0.03em] leading-none">Вопросы</h2></Reveal>
              <div className="flex flex-col">
                {faqs.map((f, i) => {
                  const open = openFaq === i;
                  return (
                    <Reveal key={f.q} delay={i * 0.04} className="border-b border-white/10">
                      <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex justify-between items-center gap-6 py-6 text-left">
                        <span className="font-bold text-[18px] md:text-[21px]">{f.q}</span>
                        <span className="text-[22px] shrink-0" style={{ color: CLAY }}>{open ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden">
                            <p className="text-[14px] leading-[1.85] pb-7 max-w-[64ch]" style={{ color: 'rgba(237,232,223,0.5)' }}>{f.a}</p>
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

      {/* Контакты — общие */}
      <section id="contacts" className="px-6 md:px-8 py-20 md:py-28 scroll-mt-20 border-t border-white/10">
        <Reveal className="max-w-[780px] mx-auto text-center">
          <h2 className="font-black leading-[0.98] uppercase tracking-[-0.03em] mb-6" style={{ fontSize: 'clamp(32px,5vw,58px)' }}>
            Выедем на участок<br /><span style={{ color: CLAY }}>бесплатно</span>
          </h2>
          <p className="text-[15px] mb-10 max-w-[50ch] mx-auto" style={{ color: 'rgba(237,232,223,0.5)' }}>
            Посмотрим грунт, подъезд и границы. Через два дня привезём смету с фиксированной ценой.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 5000); }} className="flex gap-3 max-w-[520px] mx-auto flex-wrap">
            <input required type="tel" placeholder="+7 (___) ___-__-__" className="flex-1 min-w-[220px] bg-transparent border border-white/20 px-6 py-4 text-[14px] outline-none focus:border-[#C8703C] transition-colors placeholder:text-white/25" />
            <button type="submit" className="px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] text-[#12110F]" style={{ background: CLAY }}>Записаться</button>
          </form>
          {sent && <p className="mt-4 text-[13px]" style={{ color: CLAY }}>Заявка принята. Прораб перезвонит в течение часа.</p>}
        </Reveal>
      </section>

      <footer className="px-6 md:px-8 pt-16 pb-10 border-t border-white/10 bg-[#0E0D0C]">
        <div className="max-w-[1320px] mx-auto flex flex-wrap justify-between gap-10 mb-12">
          <div className="max-w-[300px]">
            <div className="font-black text-[19px] uppercase tracking-[-0.02em] mb-4">Основа<span style={{ color: CLAY }}>.</span></div>
            <p className="text-[13px] leading-[1.75]" style={{ color: 'rgba(237,232,223,0.4)' }}>Строим дома под ключ с фиксированной сметой. Свои бригады, отчёт каждую пятницу.</p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.18em] mb-4" style={{ color: 'rgba(237,232,223,0.3)' }}>Разделы</h4>
            <div className="flex flex-col gap-3 text-[13px]" style={{ color: 'rgba(237,232,223,0.5)' }}>
              <a href={ROOT + '/projects'} onClick={(e) => go(e, ROOT + '/projects')} className="hover:text-white transition-colors">Каталог проектов</a>
              <a href={ROOT + '/prices'} onClick={(e) => go(e, ROOT + '/prices')} className="hover:text-white transition-colors">Прайс по работам</a>
              <a href="#stages" onClick={(e) => jump(e, 'stages')} className="hover:text-white transition-colors">Этапы работ</a>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.18em] mb-4" style={{ color: 'rgba(237,232,223,0.3)' }}>Контакты</h4>
            <div className="flex flex-col gap-3 text-[13px]" style={{ color: 'rgba(237,232,223,0.5)' }}>
              <span className="text-[17px] text-white">+7 (000) 000-00-00</span>
              <span>build@osnova.example</span>
              <span style={{ color: 'rgba(237,232,223,0.35)' }}>Офис и шоурум: ул. Строителей, 12<br />Пн–Сб 9:00–19:00</span>
            </div>
          </div>
        </div>
        <div className="max-w-[1320px] mx-auto border-t border-white/10 pt-7 flex flex-wrap justify-between gap-4 text-[11px]" style={{ color: 'rgba(237,232,223,0.25)' }}>
          <span>© 2026 Основа. Демонстрационный шаблон.</span>
          <div className="flex gap-5"><span>Политика конфиденциальности</span><span>Договор подряда</span></div>
        </div>
      </footer>
    </div>
  );
}
