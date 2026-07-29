import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import DemoPlaceholder from '../components/DemoPlaceholder';
import DemoPhoto from '../components/DemoPhoto';

/* ═══════════════════════════════════════════════════════════════════════════
   ОСНОВА — строительство домов под ключ.

   Визуальный язык: рабочий чертёж на бумаге.
   Почти все сайты строителей выглядят одинаково: тёмный фон, оранжевая
   кнопка, фото коттеджа на закате. Мы идём ровно в другую сторону -
   светлая чертёжная бумага, синька разметочной сетки, штамп листа,
   размерные линии, мономаркировка. Человек попадает не на лендинг,
   а внутрь проектной документации на свой будущий дом.

   Главный приём: фасад дома вычерчивается прямо на глазах, линия за линией,
   как на плоттере. Размеры проставляются после того, как контур замкнулся.

   Анимация - на чистом CSS. Никакой библиотеки: на демо-страницах
   scroll-триггеры motion срабатывают ненадёжно, а лист должен рисоваться
   всегда.

   Четыре страницы: главная → каталог → проект → цены.
   ═══════════════════════════════════════════════════════════════════════ */

const ROOT = '#case/construction';

const PAPER = '#E7E3D8';
const PAPER_HI = '#F1EEE6';
const INK = '#15171A';
const CLAY = '#C8471C';
const BLUE = '#1E3A6E';

const ink = (a: number) => `rgba(21,23,26,${a})`;
const blue = (a: number) => `rgba(30,58,110,${a})`;

/* ────────────────────────── данные ────────────────────────── */

const heroFacts: [string, string, string][] = [
  ['184', 'дома сдано', 'с 2015 года, все с актом'],
  ['11 лет', 'на рынке', 'одно юрлицо, без переименований'],
  ['5 лет', 'гарантия на каркас', 'выезд по гарантии за 3 дня'],
  ['0 ₽', 'смета и выезд', 'даже если потом не строите'],
];

type Project = {
  slug: string; name: string; area: string; term: string; price: string; tech: string;
  floors: string; beds: string; lead: string; index: string;
  rooms: [string, string][];
  spec: [string, string][];
  notes: string[];
};

const projects: Project[] = [
  {
    slug: 'olha', name: 'Ольха', index: 'ОЛХ-146', area: '146 м²', term: '5 месяцев', price: '6 900 000 ₽', tech: 'Газобетон',
    floors: '2 этажа', beds: '3 спальни',
    lead: 'Самый заказываемый проект. Компактный второй свет в гостиной, три спальни наверху и котельная с отдельным входом с улицы.',
    rooms: [['Гостиная-кухня', '42 м², второй свет'], ['Спальня родителей', '18 м², гардеробная'], ['Детская 1', '14 м²'], ['Детская 2', '14 м²'], ['Санузлы', '2 шт., 5 и 8 м²'], ['Котельная', '7 м², отдельный вход'], ['Терраса', '16 м², под общей кровлей']],
    spec: [['Фундамент', 'Утеплённая шведская плита'], ['Стены', 'Газобетон 375 мм, D400'], ['Перекрытие', 'Монолитное, 200 мм'], ['Кровля', 'Металлочерепица, утепление 250 мм'], ['Окна', 'ПВХ, двухкамерный стеклопакет'], ['Отопление', 'Тёплый пол первого этажа + радиаторы']],
    notes: ['Проект прошёл семнадцать реализаций - узлы отработаны', 'Можно зеркалить планировку под ориентацию участка', 'Второй свет по желанию закрывается - получается четвёртая спальня'],
  },
  {
    slug: 'sosna', name: 'Сосна', index: 'СОС-112', area: '112 м²', term: '4 месяца', price: '5 200 000 ₽', tech: 'Каркас',
    floors: '1 этаж', beds: '3 спальни',
    lead: 'Одноэтажный дом без лестницы и лишних метров. Берут семьи с маленькими детьми и те, кто строит для родителей.',
    rooms: [['Кухня-гостиная', '34 м²'], ['Спальня', '16 м²'], ['Спальня', '12 м²'], ['Спальня', '12 м²'], ['Санузел', '6 м²'], ['Постирочная', '4 м²'], ['Тамбур', '5 м²']],
    spec: [['Фундамент', 'Свайно-ростверковый'], ['Каркас', 'Сухая строганая доска 200 мм'], ['Утепление', 'Каменная вата 200 мм + 50 мм перекрёстно'], ['Кровля', 'Мягкая черепица'], ['Окна', 'ПВХ, энергосберегающий стеклопакет'], ['Отопление', 'Электрокотёл, тёплый пол по всему дому']],
    notes: ['Самый быстрый срок - четыре месяца от фундамента', 'Нет лестницы: удобно с колясками и в старости', 'Возможен вариант с гаражом под общей кровлей, +1 100 000 ₽'],
  },
  {
    slug: 'granit', name: 'Гранит', index: 'ГРН-210', area: '210 м²', term: '7 месяцев', price: '11 400 000 ₽', tech: 'Кирпич',
    floors: '2 этажа + цоколь', beds: '4 спальни',
    lead: 'Большой кирпичный дом с цокольным этажом. Строим, когда участок с уклоном и хочется спрятать в склон гараж и техпомещения.',
    rooms: [['Гостиная', '46 м², камин'], ['Кухня-столовая', '28 м²'], ['Кабинет', '16 м²'], ['Спальни', '4 шт., от 14 до 22 м²'], ['Санузлы', '3 шт.'], ['Цоколь', 'Гараж на 2 машины, сауна, кладовые']],
    spec: [['Фундамент', 'Монолитная лента с цокольным этажом'], ['Стены', 'Керамический кирпич 380 мм + утепление 150 мм'], ['Перекрытия', 'Сборно-монолитные'], ['Кровля', 'Натуральная черепица'], ['Окна', 'Алюминий-дерево'], ['Отопление', 'Газовый котёл, два контура']],
    notes: ['Требуется геология: цоколь на пучинистых грунтах считается отдельно', 'Срок семь месяцев - при работе в тёплый сезон', 'Проект адаптируется под уклон участка до 12%'],
  },
  {
    slug: 'terrasa', name: 'Терраса', index: 'ТРС-168', area: '168 м²', term: '6 месяцев', price: '8 300 000 ₽', tech: 'Газобетон',
    floors: '2 этажа', beds: '3 спальни',
    lead: 'Дом вокруг большой террасы. Панорамное остекление гостиной выходит на закрытую от соседей сторону участка.',
    rooms: [['Гостиная', '38 м², панорамное остекление'], ['Кухня', '18 м²'], ['Спальня родителей', '20 м², санузел'], ['Спальни', '2 шт., по 15 м²'], ['Терраса', '38 м², частично крытая'], ['Кладовая', '6 м²']],
    spec: [['Фундамент', 'Утеплённая плита'], ['Стены', 'Газобетон 400 мм'], ['Перекрытие', 'Монолитное'], ['Кровля', 'Фальцевая, тёмный графит'], ['Остекление', 'Панорамные двери, тёплый алюминий'], ['Отопление', 'Тепловой насос воздух-вода']],
    notes: ['Панорамные двери - самая дорогая позиция сметы, считаем отдельно', 'Терраса на отдельных сваях, не связана с домом', 'Ориентация окон подбирается по инсоляции участка'],
  },
];

const stages = [
  { n: '01', t: 'Выезд и замер', mark: 'нед. 1–2', d: 'Смотрим участок, геологию и подъезд техники. Бесплатно, в течение двух дней после заявки.' },
  { n: '02', t: 'Проект и смета', mark: 'мес. 1', d: 'Планировки, разрезы, ведомость материалов. Смета фиксируется договором и не растёт по ходу.' },
  { n: '03', t: 'Фундамент', mark: 'мес. 2', d: 'Свайно-ростверковый или плита - по результатам геологии, а не по прайсу.' },
  { n: '04', t: 'Коробка и кровля', mark: 'мес. 3–5', d: 'Стены, перекрытия, стропильная система. Закрываем контур до холодов.' },
  { n: '05', t: 'Инженерия', mark: 'мес. 6', d: 'Отопление, водоснабжение, электрика. Схемы согласуем до штробления.' },
  { n: '06', t: 'Отделка и сдача', mark: 'мес. 7–8', d: 'Чистовая отделка, уборка, исполнительная документация и гарантийный талон.' },
];

const packages = [
  {
    name: 'Коробка', price: 'от 32 000', unit: '₽ / м²', lead: 'Фундамент, стены, кровля, окна', accent: false,
    items: ['Геология и проект', 'Фундамент по расчёту', 'Стены и перекрытия', 'Кровля с водостоком', 'Окна и входная дверь'],
  },
  {
    name: 'Под ключ', price: 'от 58 000', unit: '₽ / м²', lead: 'Заезжаете и живёте', accent: true,
    items: ['Всё из «Коробки»', 'Инженерные сети', 'Чистовая отделка', 'Сантехника и электрика', 'Благоустройство входной группы', 'Гарантия 5 лет'],
  },
  {
    name: 'Реконструкция', price: 'по смете', unit: '', lead: 'Работа с существующим домом', accent: false,
    items: ['Обследование конструкций', 'Усиление и замена узлов', 'Перепланировка', 'Замена инженерии', 'Фасад и кровля'],
  },
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
  { t: 'Смета не растёт', d: 'Цена в договоре фиксированная. Дополнительные работы - только письменным соглашением.' },
  { t: 'Свои бригады', d: 'Не субподряд. Прораб на объекте каждый день, вы знаете его по имени.' },
  { t: 'Отчёт каждую пятницу', d: 'Фотоотчёт, что сделано за неделю и что будет на следующей.' },
  { t: 'Оплата по этапам', d: 'Платите за завершённый этап после приёмки, а не вперёд.' },
];

const faqs = [
  { q: 'Строите зимой?', a: 'Да. Фундамент и коробку ведём при отрицательных температурах с противоморозными добавками и прогревом. Отделку планируем на тёплый сезон.' },
  { q: 'Можно с моим проектом?', a: 'Можно. Проведём экспертизу документации, укажем на слабые узлы и посчитаем смету по вашим чертежам.' },
  { q: 'Что если смета вырастет?', a: 'Не вырастет. Всё, что можно посчитать заранее, посчитано в договоре. Изменения возможны только если вы сами захотите добавить работы.' },
  { q: 'Помогаете с ипотекой?', a: 'Готовим полный пакет для банка: договор, смету, проект. Работаем с эскроу-счетами и сельской ипотекой.' },
  { q: 'Сколько длится гарантия?', a: 'Пять лет на несущие конструкции и кровлю, два года на инженерию и отделку. Выезд по гарантии - в течение трёх дней.' },
];

const smetaRows: [string, number][] = [
  ['Проект и геология', 242000],
  ['Фундамент', 1635000],
  ['Коробка', 2117000],
  ['Кровля', 569000],
  ['Инженерия', 1431000],
  ['Отделка', 2628000],
];

/* ────────────────────────── мелкие детали листа ────────────────────────── */

/* Появление блока при прокрутке. Своим наблюдателем, без библиотеки:
   на демо-страницах scroll-триггеры motion срабатывали ненадёжно. */
function useSeen<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (typeof IntersectionObserver === 'undefined') { setSeen(true); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setSeen(true)),
      { rootMargin: '-40px 0px -8% 0px' }
    );
    io.observe(el);
    // подстраховка: если наблюдатель почему-то молчит, показываем сами
    const t = window.setTimeout(() => setSeen(true), 1600);
    return () => { io.disconnect(); window.clearTimeout(t); };
  }, [seen]);
  return { ref, seen };
}

function Up({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, seen } = useSeen<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? 'none' : 'translateY(22px)',
        transition: `opacity .7s cubic-bezier(.22,1,.36,1) ${delay}s, transform .7s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* Маркер разреза, как на настоящем листе: кружок с литерой и стрелка. */
function CutMark({ letter, label }: { letter: string; label: string }) {
  return (
    <div className="flex items-center gap-3 select-none">
      <span
        className="w-[26px] h-[26px] rounded-full grid place-items-center font-mono text-[10px] font-bold shrink-0"
        style={{ border: `1.4px solid ${CLAY}`, color: CLAY }}
      >
        {letter}
      </span>
      <span className="h-px w-9" style={{ background: CLAY }} />
      <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: ink(0.42) }}>{label}</span>
    </div>
  );
}

/* Штамп листа - как в правом нижнем углу чертежа. */
function TitleBlock({ sheet, name, scale = '1:100', className = '' }: { sheet: string; name: string; scale?: string; className?: string }) {
  const cell = 'px-3 py-2 font-mono text-[9.5px] uppercase tracking-[0.14em] leading-tight';
  return (
    <div className={`inline-grid grid-cols-3 ${className}`} style={{ border: `1px solid ${ink(0.28)}`, background: PAPER_HI }}>
      <div className={cell} style={{ borderRight: `1px solid ${ink(0.18)}`, color: ink(0.4) }}>
        лист<br /><span className="text-[12px] tracking-[0.06em] font-bold" style={{ color: INK }}>{sheet}</span>
      </div>
      <div className={cell} style={{ borderRight: `1px solid ${ink(0.18)}`, color: ink(0.4) }}>
        наименование<br /><span className="text-[11px] tracking-[0.06em] font-bold" style={{ color: INK }}>{name}</span>
      </div>
      <div className={cell} style={{ color: ink(0.4) }}>
        масштаб<br /><span className="text-[11px] tracking-[0.06em] font-bold" style={{ color: INK }}>{scale}</span>
      </div>
    </div>
  );
}

/* ────────── фасад, который вычерчивается сам ────────── */

function Elevation({ className = '' }: { className?: string }) {
  const { ref, seen } = useSeen<HTMLDivElement>();

  const L = { fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  // d — задержка начала прорисовки, s — длительность
  const draw = (d: number, s = 0.7) => ({
    strokeDasharray: 1,
    strokeDashoffset: seen ? 0 : 1,
    transition: `stroke-dashoffset ${s}s cubic-bezier(.65,0,.35,1) ${d}s`,
  });
  const fade = (d: number) => ({ opacity: seen ? 1 : 0, transition: `opacity .5s ease ${d}s` });

  const winsTop: [number, number][] = [[110, 150], [218, 150], [326, 150]];

  return (
    <div ref={ref} className={className}>
      <svg viewBox="0 0 500 372" className="w-full h-auto" role="img" aria-label="Фасад дома с размерами">
        {/* земля: штриховка под линией грунта */}
        <g stroke={ink(0.3)} strokeWidth="1" style={fade(2.5)}>
          {Array.from({ length: 24 }).map((_, i) => (
            <line key={i} x1={38 + i * 18} y1={302} x2={26 + i * 18} y2={314} />
          ))}
        </g>
        <line x1="26" y1="300" x2="474" y2="300" stroke={INK} strokeWidth="1.6" pathLength={1} {...L} style={draw(0.05, 0.6)} />

        {/* контур дома */}
        <path d="M66 300 V130 H434 V300" stroke={INK} strokeWidth="2.2" pathLength={1} {...L} style={draw(0.35, 0.85)} />
        {/* кровля */}
        <path d="M50 132 L250 46 L450 132" stroke={INK} strokeWidth="2.2" pathLength={1} {...L} style={draw(1.05, 0.7)} />
        <path d="M66 130 H434" stroke={ink(0.35)} strokeWidth="1" pathLength={1} {...L} style={draw(1.5, 0.4)} />
        {/* дымоход */}
        <path d="M336 100 V84 H360 V116" stroke={INK} strokeWidth="1.8" pathLength={1} {...L} style={draw(1.6, 0.4)} />

        {/* межэтажная линия */}
        <path d="M66 215 H434" stroke={ink(0.28)} strokeWidth="1" strokeDasharray="6 5" {...L} style={fade(1.9)} />

        {/* окна второго этажа */}
        {winsTop.map(([x, y], i) => (
          <g key={x} style={fade(1.75 + i * 0.09)}>
            <rect x={x} y={y} width="50" height="46" stroke={INK} strokeWidth="1.5" fill="none" />
            <line x1={x + 25} y1={y} x2={x + 25} y2={y + 46} stroke={ink(0.4)} strokeWidth="1" />
          </g>
        ))}

        {/* первый этаж: окна и дверь */}
        <g style={fade(2.05)}>
          <rect x="102" y="234" width="60" height="52" stroke={INK} strokeWidth="1.5" fill="none" />
          <line x1="132" y1="234" x2="132" y2="286" stroke={ink(0.4)} strokeWidth="1" />
        </g>
        <g style={fade(2.14)}>
          <rect x="338" y="234" width="60" height="52" stroke={INK} strokeWidth="1.5" fill="none" />
          <line x1="368" y1="234" x2="368" y2="286" stroke={ink(0.4)} strokeWidth="1" />
        </g>
        <g style={fade(2.23)}>
          <rect x="216" y="228" width="60" height="72" stroke={CLAY} strokeWidth="2" fill="none" />
          <circle cx="266" cy="266" r="2.6" fill={CLAY} />
        </g>

        {/* размерная линия по низу */}
        <g style={fade(2.6)}>
          <line x1="66" y1="336" x2="434" y2="336" stroke={BLUE} strokeWidth="1" />
          <line x1="66" y1="328" x2="66" y2="344" stroke={BLUE} strokeWidth="1" />
          <line x1="434" y1="328" x2="434" y2="344" stroke={BLUE} strokeWidth="1" />
          <rect x="212" y="327" width="76" height="18" fill={PAPER_HI} />
          <text x="250" y="341" textAnchor="middle" fill={BLUE} fontSize="11" fontFamily="'JetBrains Mono', monospace">12 400</text>
        </g>

        {/* размерная линия по высоте */}
        <g style={fade(2.75)}>
          <line x1="482" y1="46" x2="482" y2="300" stroke={BLUE} strokeWidth="1" />
          <line x1="474" y1="46" x2="490" y2="46" stroke={BLUE} strokeWidth="1" />
          <line x1="474" y1="300" x2="490" y2="300" stroke={BLUE} strokeWidth="1" />
          <text
            x="482" y="173" textAnchor="middle" fill={BLUE} fontSize="11"
            fontFamily="'JetBrains Mono', monospace" transform="rotate(-90 482 173)" dy="-4"
          >
            8 100
          </text>
        </g>

        {/* выноска на конструктив */}
        <g style={fade(2.9)}>
          <line x1="380" y1="176" x2="446" y2="196" stroke={ink(0.45)} strokeWidth="1" />
          <circle cx="380" cy="176" r="2.6" fill={ink(0.55)} />
          <text x="420" y="210" fill={ink(0.5)} fontSize="9.5" fontFamily="'JetBrains Mono', monospace">D400</text>
        </g>

        {/* отметка нулевого уровня */}
        <g style={fade(3.0)}>
          <path d="M14 300 l7 -8 l7 8 z" fill="none" stroke={CLAY} strokeWidth="1.2" />
          <text x="6" y="288" fill={CLAY} fontSize="9" fontFamily="'JetBrains Mono', monospace">0.000</text>
        </g>
      </svg>
    </div>
  );
}

/* ═══════════ СТРОЙКА, КОТОРОЙ УПРАВЛЯЕТ ПРОКРУТКА ═══════════

   Первый экран держится на месте, пока человек прокручивает, и за это время
   дом проходит путь от разметки осей до сданного объекта.

   Почему sticky, а не перехват прокрутки. Соблазн повесить preventDefault
   на wheel и touchmove большой, но так делать нельзя: в Safari ломается
   инерция, в Chrome слушатели по умолчанию пассивные, а при любой ошибке
   в скрипте страница блокируется намертво и человек не может уйти дальше.
   Высокий трек со sticky-слоем внутри даёт ровно то же ощущение, но
   прокрутка остаётся нативной, отматывается назад сама и ничего не ломает.

   Прогресс считается в requestAnimationFrame и пишется в CSS-переменные
   напрямую в DOM. React на кадрах не перерисовывается - иначе на слабом
   телефоне это была бы каша.                                              */

const BUILD_STAGES: { at: number; name: string; note: string }[] = [
  { at: 0.00, name: 'Разметка', note: 'Выносим оси и нулевую отметку' },
  { at: 0.12, name: 'Рабочий чертёж', note: 'Габариты, размеры, отметки' },
  { at: 0.26, name: 'Фундамент', note: 'Плита по расчёту грунта' },
  { at: 0.40, name: 'Стены', note: 'Газобетон 375 мм, армопояс' },
  { at: 0.57, name: 'Кровля', note: 'Стропила, контур закрыт' },
  { at: 0.70, name: 'Окна и двери', note: 'Остекление, входная группа' },
  { at: 0.83, name: 'Отделка', note: 'Фасад, водосток, цвет' },
  { at: 0.94, name: 'Дом сдан', note: 'Ключи и гарантийный талон' },
];

const MASONRY_ROWS = 13;
const WINDOW_ITEMS = 6;

/* сглаженная доля отрезка: 0 до начала, 1 после конца, плавно между */
function seg(p: number, a: number, b: number) {
  const t = Math.max(0, Math.min(1, (p - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/* Раскладываем один общий прогресс на восемь стадий и кладём в переменные.
   Имена короткие: их читает разметка ниже. */
function writeBuild(el: HTMLElement, p: number) {
  const mk = seg(p, 0.00, 0.13);   // разметка
  const pl = seg(p, 0.10, 0.27);   // чертёж целиком
  const fd = seg(p, 0.25, 0.41);   // фундамент
  const wl = seg(p, 0.38, 0.59);   // стены
  const rf = seg(p, 0.55, 0.71);   // кровля
  const dt = seg(p, 0.68, 0.85);   // окна, двери, фасад
  const rl = seg(p, 0.79, 0.95);   // переход чертежа в визуализацию
  const fn = seg(p, 0.91, 1.00);   // финал: свет и участок

  const s = el.style;
  const set = (k: string, v: number) => s.setProperty(k, String(Math.round(v * 1000) / 1000));

  set('--mk', mk); set('--mkD', 1 - mk);
  set('--pl', pl); set('--plD', 1 - pl);
  set('--fd', fd); set('--fdD', 1 - fd);
  set('--wl', wl); set('--wlD', 1 - wl);
  set('--rf', rf); set('--rfD', 1 - rf);
  set('--dt', dt);
  set('--rl', rl);
  set('--fn', fn);

  // «бегущие» счётчики для поэтапной кладки и остекления
  set('--wlN', wl * (MASONRY_ROWS + 1));
  set('--dtN', dt * (WINDOW_ITEMS + 1));

  // чертёжные линии уходят, когда появляется визуализация, но не в ноль:
  // тонкий контур поверх рендера читается как авторская подача
  set('--dwg', 1 - 0.9 * rl);
}

/* доля для i-го элемента внутри стадии: 0 → 1 по очереди */
const stagger = (v: string, i: number) => `max(0, min(1, calc(var(${v}) - ${i})))`;

function BuildScene() {
  const track = useRef<HTMLDivElement | null>(null);
  const pane = useRef<HTMLDivElement | null>(null);
  const scene = useRef<HTMLDivElement | null>(null);
  const bar = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef(0);
  const [stage, setStage] = useState(0);
  const [ready, setReady] = useState(false);
  const [calm, setCalm] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [vh, setVh] = useState(0);

  /* Разметка отдаётся с готовым домом: если скрипт не выполнится, человек
     увидит нормальный первый экран, а не пустой лист. Здесь, до первой
     отрисовки, переводим сцену в начало - без мигания. */
  useLayoutEffect(() => {
    const el = scene.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Считаем сразу по фактическому положению: если человек перезагрузил
    // страницу в середине трека, браузер вернёт прокрутку туда же, и жёсткий
    // ноль дал бы кадр с пустым листом.
    const t = track.current;
    const r = t?.getBoundingClientRect();
    const span = r ? r.height - window.innerHeight : 0;
    writeBuild(el, span > 0 && r ? Math.max(0, Math.min(1, -r.top / span)) : 0);
  }, []);

  /* Высоту экрана меряем сами, а не берём из 100svh.
     Причина - встроенные браузеры. Наши клиенты часто приходят по ссылке
     из Telegram, а там сверху своя панель с адресом: полезная высота меньше
     обычной, и на Android бывают старые WebView без поддержки svh, где
     правило просто отбрасывается и вёрстка рассыпается.
     Если липкая панель окажется выше экрана, sticky перестанет держать -
     поэтому высота панели всегда равна фактической высоте окна.

     Меряем на старте и при существенном изменении. Мелкие колебания
     игнорируем: в Safari и Telegram адресная строка при прокрутке
     то прячется, то показывается, и высота дёргается на 60-100 пикселей.
     Реагировать на это - значит дёргать весь экран. */
  useEffect(() => {
    const mqCalm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqNarrow = window.matchMedia('(max-width: 1023px)');

    let lastW = window.innerWidth;
    let lastH = window.innerHeight;

    const sync = () => {
      setCalm(mqCalm.matches);
      setMobile(mqNarrow.matches);
      setVh(window.innerHeight);
    };
    sync();

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // поворот экрана или появление клавиатуры - пересчитываем;
      // спрятавшаяся адресная строка - нет
      if (w !== lastW || Math.abs(h - lastH) > 120) {
        lastW = w; lastH = h;
        sync();
      }
    };

    mqCalm.addEventListener?.('change', sync);
    mqNarrow.addEventListener?.('change', sync);
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      mqCalm.removeEventListener?.('change', sync);
      mqNarrow.removeEventListener?.('change', sync);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);

  useEffect(() => {
    const el = scene.current;
    if (!el) return;

    // Человек попросил меньше движения - показываем готовый дом и не держим экран
    if (calm) {
      writeBuild(el, 1);
      stageRef.current = BUILD_STAGES.length - 1;
      setStage(BUILD_STAGES.length - 1);
      setReady(false);
      if (bar.current) bar.current.style.transform = 'scaleX(1)';
      return;
    }

    setReady(true);

    let raf = 0;
    let last = -1;
    let visible = true;
    let broken = false;

    const io = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver((es) => es.forEach((e) => { visible = e.isIntersecting; }), { rootMargin: '10% 0px' })
      : null;
    if (io && track.current) io.observe(track.current);

    const tick = () => {
      raf = 0;
      const t = track.current;
      if (!t || !visible) return;
      const r = t.getBoundingClientRect();
      // Считаем по фактической высоте липкой панели, а не по window.innerHeight:
      // на телефоне при скрытии адресной строки innerHeight меняется, и прогресс
      // дёргался бы на ровном месте.
      const viewH = pane.current?.offsetHeight || window.innerHeight;
      const span = r.height - viewH;
      const p = span <= 0 ? 1 : Math.max(0, Math.min(1, -r.top / span));
      if (Math.abs(p - last) < 0.0008) return;
      last = p;

      writeBuild(el, p);
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;

      let s = 0;
      for (let i = 0; i < BUILD_STAGES.length; i++) if (p >= BUILD_STAGES[i].at) s = i;
      if (s !== stageRef.current) { stageRef.current = s; setStage(s); }
    };

    // Если что-то пойдёт не так, дом остаётся достроенным, а страница -
    // прокручиваемой. Молча ломаться нельзя: это первый экран.
    const guarded = () => {
      try { tick(); } catch {
        broken = true;
        if (raf) cancelAnimationFrame(raf);
        writeBuild(el, 1);
        setReady(false);
      }
    };

    /* Считаем только когда человек прокручивает.
       Раньше здесь крутился безостановочный requestAnimationFrame - он
       занимал главный поток даже на неподвижной странице, и кнопки
       отзывались с задержкой. Теперь в покое работы ровно ноль,
       а на кадр приходится не больше одного пересчёта. */
    const onScroll = () => {
      if (raf || broken) return;
      raf = requestAnimationFrame(guarded);
    };

    guarded();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      io?.disconnect();
    };
  }, [calm]);

  const cur = BUILD_STAGES[stage];

  /* На телефоне внизу висит плашка «Демо-шаблон · данные для примера».
     Она перекрывала полосу прогресса под домом, поэтому низ экрана
     считаем занятым и поднимаем весь лист выше. */
  const badgeSafe = mobile ? 64 : 0;
  const usable = vh > 0 ? vh - badgeSafe : 0;

  /* Два порога, посчитанные от реальной полезной высоты вебвью.
     В Telegram сверху своя панель, поэтому у телефона на 844 точки остаётся
     около 610, а у SE - около 510. Дом обязан помещаться целиком в любом
     из этих случаев, поэтому текстовый блок ужимается ступенями.
     Порог взят с запасом: 6-дюймовый Android в Telegram даёт 641,
     и при границе в 640 он бы не сработал впритык. */
  const short = usable > 0 && usable < 700;   // прячем подзаголовок
  const tiny = usable > 0 && usable < 560;    // прячем ещё и подсказку, заголовок мельче

  // Длина трека кратна высоте экрана. На телефоне короче: длинная прокрутка
  // на маленьком экране утомляет и человек уходит, не досмотрев.
  const trackH = ready && vh ? Math.round(vh * (mobile ? 2.1 : 3.4)) : undefined;
  const paneH = vh || undefined;

  const drawn = { fill: 'none' as const, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, pathLength: 1 };

  return (
    <div ref={track} className="relative" style={{ height: trackH }}>
      {/* height из JS перебивает класс: класс нужен только как запасной
          вариант, если скрипт не выполнится */}
      <div ref={pane} className="sticky top-0 h-[100svh] flex flex-col" style={{ height: paneH }}>
        <div
          className="flex-1 min-h-0 max-w-[1340px] w-full mx-auto px-6 md:px-8 pt-[66px] lg:pt-[78px] grid grid-cols-1 grid-rows-[auto_1fr] lg:grid-cols-[1.02fr_0.98fr] lg:grid-rows-1 gap-3 lg:gap-10 lg:items-center"
          style={{ paddingBottom: badgeSafe + 12 }}
        >

          {/* текст первого экрана - без изменений по смыслу */}
          <div>
            <div className="flex items-center gap-3 mb-4 lg:mb-8">
              <span className="w-8 h-px" style={{ background: CLAY }} />
              <span className="font-mono text-[9px] lg:text-[10px] uppercase tracking-[0.24em] lg:tracking-[0.28em]" style={{ color: CLAY }}>Дома под ключ · Казань и область</span>
            </div>

            <h1
              className="font-archivo-black uppercase leading-[0.86] tracking-[-0.035em]"
              style={{ fontSize: tiny ? 'clamp(22px,6.2vw,27px)' : short ? 'clamp(27px,7.2vw,34px)' : 'clamp(34px,7.4vw,100px)' }}
            >
              Дом<br />по смете,<br />
              <span className="relative inline-block">
                <span className="relative z-10" style={{ color: CLAY }}>а не по факту</span>
                <span className="absolute left-0 bottom-[0.08em] h-[0.14em] w-full" style={{ background: `${CLAY}2E` }} />
              </span>
            </h1>

            <p
              className="mt-4 lg:mt-9 max-w-[50ch] text-[14px] lg:text-[17px] leading-[1.6] lg:leading-[1.75]"
              style={{ color: ink(0.62), display: short ? 'none' : undefined }}
            >
              Цену закрепляем договором, стройку показываем каждую пятницу,
              деньги берём за завершённый этап, а не вперёд.
            </p>

            <div className="mt-4 lg:mt-10 flex flex-wrap gap-2.5 lg:gap-3.5">
              <a
                href="#contacts"
                onClick={(e) => { e.preventDefault(); document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center justify-center font-mono text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.16em] px-6 lg:px-8 py-3.5 lg:py-4 text-white transition-transform duration-200 hover:-translate-y-[2px]"
                style={{ background: INK }}
              >
                Бесплатная смета
              </a>
              <a
                href={ROOT + '/projects'}
                onClick={(e) => { e.preventDefault(); window.location.hash = ROOT + '/projects'; window.scrollTo(0, 0); }}
                className="inline-flex items-center justify-center font-mono text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.16em] px-6 lg:px-8 py-3.5 lg:py-4 transition-transform duration-200 hover:-translate-y-[2px]"
                style={{ border: `1.4px solid ${ink(0.3)}` }}
              >
                Каталог проектов
              </a>
            </div>

            {/* Подсказка живёт в текстовой колонке, а не поверх листа:
                во встроенных браузерах низ экрана занимает панель приложения,
                и абсолютно позиционированная плашка там перекрывалась бы. */}
            {ready && !tiny && (
              <div
                className="mt-4 lg:mt-8 h-4 pointer-events-none"
                style={{ opacity: stage === 0 ? 1 : 0, transition: 'opacity .4s ease' }}
              >
                <span className="font-mono text-[9px] lg:text-[9.5px] uppercase tracking-[0.22em] flex items-center gap-2" style={{ color: ink(0.42) }}>
                  Листайте - дом строится
                  <span className="inline-block w-[9px] h-[9px] border-b border-r rotate-45" style={{ borderColor: CLAY }} />
                </span>
              </div>
            )}
          </div>

          {/* лист, на котором идёт стройка */}
          <div className="relative min-h-0 flex flex-col" style={{ background: PAPER_HI, border: `1px solid ${ink(0.2)}`, boxShadow: `10px 12px 0 ${ink(0.06)}` }}>
            <div className="flex justify-between items-start px-4 lg:px-6 pt-3 lg:pt-5">
              <span className="font-mono text-[9px] lg:text-[9.5px] uppercase tracking-[0.2em]" style={{ color: ink(0.42) }}>Фасад в осях 1–5</span>
              <span className="font-mono text-[9px] lg:text-[9.5px] uppercase tracking-[0.2em]" style={{ color: ink(0.42) }}>ОЛХ-146</span>
            </div>

            {/* Значения по умолчанию - достроенный дом. Скрипт до первой
                отрисовки переводит их в начало; если он не выполнится,
                посетитель увидит готовый дом, а не пустой лист. */}
            <div
              ref={scene}
              className="flex-1 min-h-0 px-2 lg:px-4"
              style={{
                '--mk': '1', '--mkD': '0', '--pl': '1', '--plD': '0',
                '--fd': '1', '--fdD': '0', '--wl': '1', '--wlD': '0',
                '--rf': '1', '--rfD': '0', '--dt': '1',
                '--rl': '1', '--fn': '1',
                '--wlN': String(MASONRY_ROWS + 1), '--dtN': String(WINDOW_ITEMS + 1),
                '--dwg': '0.1',
              } as React.CSSProperties}
            >
              <svg viewBox="0 0 600 430" preserveAspectRatio="xMidYMid meet" className="w-full h-full" role="img" aria-label="Дом от разметки до сдачи">
                <defs>
                  <linearGradient id="osn-sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C3D4E2" /><stop offset="62%" stopColor="#E4E6E2" /><stop offset="100%" stopColor="#EFEAE0" />
                  </linearGradient>
                  <linearGradient id="osn-wall" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#E6DCCA" /><stop offset="52%" stopColor="#D6CAB5" /><stop offset="100%" stopColor="#BEB09A" />
                  </linearGradient>
                  <linearGradient id="osn-roof" x1="0" y1="0" x2="1" y2="0.4">
                    <stop offset="0%" stopColor="#45413C" /><stop offset="48%" stopColor="#332F2B" /><stop offset="100%" stopColor="#252220" />
                  </linearGradient>
                  <linearGradient id="osn-glass" x1="0" y1="0" x2="0.7" y2="1">
                    <stop offset="0%" stopColor="#6E828E" /><stop offset="46%" stopColor="#42525C" /><stop offset="100%" stopColor="#2E3A42" />
                  </linearGradient>
                  <linearGradient id="osn-warm" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FFD9A8" stopOpacity="0.55" /><stop offset="100%" stopColor="#FFD9A8" stopOpacity="0" />
                  </linearGradient>
                  {/* стены поднимаются снизу вверх */}
                  <clipPath id="osn-rise">
                    <rect
                      x="100" y="0" width="400" height="340"
                      style={{ transform: 'scaleY(var(--wl,0))', transformOrigin: '300px 340px', transformBox: 'view-box' }}
                    />
                  </clipPath>
                </defs>

                {/* ── СЛОЙ ВИЗУАЛИЗАЦИИ: проявляется на предпоследней стадии ── */}
                <g style={{ opacity: 'var(--rl,0)' }}>
                  <rect x="0" y="0" width="600" height="340" fill="url(#osn-sky)" />
                  <rect x="0" y="336" width="600" height="94" fill="#7C8560" />
                  <rect x="0" y="336" width="600" height="10" fill="#6B7452" />
                  {/* тень дома на участке */}
                  <ellipse cx="330" cy="349" rx="230" ry="13" fill="#15171A" opacity="0.16" />
                  {/* фундамент */}
                  <rect x="112" y="330" width="376" height="16" fill="#9A948B" />
                  <rect x="112" y="330" width="376" height="4" fill="#B0AAA0" />
                  {/* стены */}
                  <rect x="120" y="160" width="360" height="170" fill="url(#osn-wall)" />
                  {/* кровля */}
                  <path d="M100 162 L300 64 L500 162 Z" fill="url(#osn-roof)" />
                  <path d="M100 162 L300 64 L306 64 L112 168 Z" fill="#5A554E" opacity="0.7" />
                  <rect x="98" y="158" width="404" height="7" fill="#2B2825" />
                  {/* дымоход */}
                  <rect x="398" y="92" width="28" height="58" fill="#B8A691" />
                  <rect x="394" y="88" width="36" height="8" fill="#8E8071" />
                  {/* окна второго этажа */}
                  {[152, 272, 392].map((x) => (
                    <g key={`r2-${x}`}>
                      <rect x={x} y="182" width="56" height="46" fill="url(#osn-glass)" />
                      <path d={`M${x} 228 L${x + 56} 182 L${x + 56} 196 L${x + 18} 228 Z`} fill="#FFFFFF" opacity="0.16" />
                      <rect x={x - 3} y="179" width="62" height="3" fill="#EFEAE0" />
                    </g>
                  ))}
                  {/* окна первого этажа */}
                  {[140, 412].map((x) => (
                    <g key={`r1-${x}`}>
                      <rect x={x} y="264" width="68" height="52" fill="url(#osn-glass)" />
                      <path d={`M${x} 316 L${x + 68} 264 L${x + 68} 280 L${x + 22} 316 Z`} fill="#FFFFFF" opacity="0.16" />
                      <rect x={x - 3} y="261" width="74" height="3" fill="#EFEAE0" />
                    </g>
                  ))}
                  {/* входная группа */}
                  <rect x="270" y="256" width="60" height="74" fill={CLAY} />
                  <rect x="270" y="256" width="60" height="5" fill="#9B3512" />
                  <circle cx="320" cy="294" r="3" fill="#F1EEE6" />
                  <rect x="258" y="330" width="84" height="7" fill="#A9A299" />
                  <rect x="264" y="324" width="72" height="7" fill="#BCB5AB" />
                </g>

                {/* ── ФИНАЛ: тёплый свет и участок ── */}
                <g style={{ opacity: 'var(--fn,0)' }}>
                  <rect x="0" y="60" width="600" height="290" fill="url(#osn-warm)" />
                  <path d="M300 337 L268 430 L332 430 Z" fill="#6B7452" opacity="0.55" />
                  {[[60, 336], [545, 336]].map(([x, y], i) => (
                    <g key={`tree-${i}`}>
                      <rect x={x - 3} y={y - 22} width="6" height="24" fill="#5B4A35" />
                      <path d={`M${x} ${y - 84} L${x + 26} ${y - 20} L${x - 26} ${y - 20} Z`} fill="#4F5C3C" />
                      <path d={`M${x} ${y - 84} L${x + 26} ${y - 20} L${x} ${y - 20} Z`} fill="#3F4A30" />
                    </g>
                  ))}
                  <ellipse cx="330" cy="349" rx="236" ry="12" fill="#15171A" opacity="0.1" />
                </g>

                {/* ── СЛОЙ ЧЕРТЕЖА ── */}
                <g style={{ opacity: 'var(--dwg,1)' }}>

                  {/* 1. разметка: оси и нулевая отметка */}
                  <g style={{ opacity: 'var(--mk,0)' }}>
                    {[120, 240, 360, 480].map((x) => (
                      <line key={`ax-${x}`} x1={x} y1="52" x2={x} y2="368" stroke={blue(0.32)} strokeWidth="0.8" strokeDasharray="7 6" />
                    ))}
                    {[120, 240, 360, 480].map((x, i) => (
                      <g key={`axm-${x}`}>
                        <circle cx={x} cy="46" r="9" fill="none" stroke={blue(0.45)} strokeWidth="0.9" />
                        <text x={x} y="49.5" textAnchor="middle" fill={blue(0.6)} fontSize="9" fontFamily="'JetBrains Mono', monospace">{i + 1}</text>
                      </g>
                    ))}
                    <path d="M76 330 l8 -9 l8 9 z" fill="none" stroke={CLAY} strokeWidth="1.2" />
                    <text x="60" y="318" fill={CLAY} fontSize="9" fontFamily="'JetBrains Mono', monospace">0.000</text>
                  </g>

                  {/* линия земли */}
                  <line x1="40" y1="330" x2="560" y2="330" stroke={INK} strokeWidth="1.6" {...drawn} style={{ strokeDasharray: 1, strokeDashoffset: 'var(--mkD,1)' }} />
                  <g stroke={ink(0.32)} strokeWidth="1" style={{ opacity: 'var(--pl,0)' }}>
                    {Array.from({ length: 28 }).map((_, i) => (
                      <line key={`h-${i}`} x1={48 + i * 18} y1={332} x2={36 + i * 18} y2={344} />
                    ))}
                  </g>

                  {/* 2. чертёж: габарит и размеры */}
                  <path d="M120 330 V160 H480 V330" stroke={INK} strokeWidth="1.4" strokeDasharray="1" {...drawn} style={{ strokeDashoffset: 'var(--plD,1)', opacity: 'calc(1 - var(--wl,0) * 0.55)' }} />
                  <path d="M100 162 L300 64 L500 162" stroke={ink(0.45)} strokeWidth="1.1" strokeDasharray="1" {...drawn} style={{ strokeDashoffset: 'var(--plD,1)', opacity: 'calc(1 - var(--rf,0) * 0.7)' }} />
                  <g style={{ opacity: 'var(--pl,0)' }}>
                    <line x1="120" y1="392" x2="480" y2="392" stroke={BLUE} strokeWidth="1" />
                    <line x1="120" y1="384" x2="120" y2="400" stroke={BLUE} strokeWidth="1" />
                    <line x1="480" y1="384" x2="480" y2="400" stroke={BLUE} strokeWidth="1" />
                    <rect x="262" y="383" width="76" height="18" fill={PAPER_HI} />
                    <text x="300" y="397" textAnchor="middle" fill={BLUE} fontSize="11" fontFamily="'JetBrains Mono', monospace">12 400</text>
                  </g>
                  <g className="hidden lg:block" style={{ opacity: 'var(--pl,0)' }}>
                    <line x1="548" y1="64" x2="548" y2="330" stroke={BLUE} strokeWidth="1" />
                    <line x1="540" y1="64" x2="556" y2="64" stroke={BLUE} strokeWidth="1" />
                    <line x1="540" y1="330" x2="556" y2="330" stroke={BLUE} strokeWidth="1" />
                    <text x="548" y="197" textAnchor="middle" fill={BLUE} fontSize="11" fontFamily="'JetBrains Mono', monospace" transform="rotate(-90 548 197)" dy="-4">8 100</text>
                  </g>

                  {/* 3. фундамент */}
                  <g style={{ opacity: 'var(--fd,0)' }}>
                    <path d="M112 330 H488 V346 H112 Z" stroke={INK} strokeWidth="1.6" fill="none" strokeDasharray="1" {...drawn} style={{ strokeDashoffset: 'var(--fdD,1)' }} />
                    {Array.from({ length: 22 }).map((_, i) => (
                      <line key={`f-${i}`} x1={116 + i * 17} y1={346} x2={126 + i * 17} y2={331} stroke={ink(0.3)} strokeWidth="0.9" />
                    ))}
                    <text x="112" y="362" fill={ink(0.45)} fontSize="8.5" fontFamily="'JetBrains Mono', monospace">УШП 300 мм</text>
                  </g>

                  {/* 4. стены: кладка растёт снизу вверх ряд за рядом */}
                  <g clipPath="url(#osn-rise)">
                    <rect x="120" y="160" width="360" height="170" fill={`${CLAY}0F`} />
                  </g>
                  <g>
                    {Array.from({ length: MASONRY_ROWS }).map((_, i) => {
                      const y = 330 - (i + 1) * (170 / MASONRY_ROWS);
                      return (
                        <line
                          key={`m-${i}`} x1="120" y1={y} x2="480" y2={y}
                          stroke={ink(0.26)} strokeWidth="0.9" pathLength={1}
                          style={{ strokeDasharray: 1, strokeDashoffset: `calc(1 - ${stagger('--wlN', i)})` }}
                        />
                      );
                    })}
                    <path d="M120 330 V160 H480 V330" stroke={INK} strokeWidth="2.2" strokeDasharray="1" {...drawn} style={{ strokeDashoffset: 'var(--wlD,1)' }} />
                    <line x1="120" y1="246" x2="480" y2="246" stroke={ink(0.3)} strokeWidth="1" strokeDasharray="6 5" style={{ opacity: 'var(--wl,0)' }} />
                  </g>

                  {/* 5. кровля */}
                  <g>
                    <path d="M100 162 L300 64 L500 162" stroke={INK} strokeWidth="2.2" strokeDasharray="1" {...drawn} style={{ strokeDashoffset: 'var(--rfD,1)' }} />
                    <path d="M398 96 V88 H426 V150" stroke={INK} strokeWidth="1.6" strokeDasharray="1" {...drawn} style={{ strokeDashoffset: 'var(--rfD,1)' }} />
                    <g style={{ opacity: 'var(--rf,0)' }}>
                      {Array.from({ length: 7 }).map((_, i) => (
                        <line key={`s-${i}`} x1={300} y1={64} x2={130 + i * 57} y2={162} stroke={ink(0.22)} strokeWidth="0.8" />
                      ))}
                      <line x1="120" y1="160" x2="480" y2="160" stroke={ink(0.4)} strokeWidth="1" />
                    </g>
                  </g>

                  {/* 6. окна, двери, фасад */}
                  <g>
                    {[152, 272, 392].map((x, i) => (
                      <g key={`w2-${x}`} style={{ opacity: stagger('--dtN', i) }}>
                        <rect x={x} y="182" width="56" height="46" stroke={INK} strokeWidth="1.5" fill="none" />
                        <line x1={x + 28} y1="182" x2={x + 28} y2="228" stroke={ink(0.4)} strokeWidth="1" />
                      </g>
                    ))}
                    {[140, 412].map((x, i) => (
                      <g key={`w1-${x}`} style={{ opacity: stagger('--dtN', i + 3) }}>
                        <rect x={x} y="264" width="68" height="52" stroke={INK} strokeWidth="1.5" fill="none" />
                        <line x1={x + 34} y1="264" x2={x + 34} y2="316" stroke={ink(0.4)} strokeWidth="1" />
                      </g>
                    ))}
                    <g style={{ opacity: stagger('--dtN', 5) }}>
                      <rect x="270" y="256" width="60" height="74" stroke={CLAY} strokeWidth="2" fill="none" />
                      <circle cx="320" cy="294" r="2.6" fill={CLAY} />
                      <path d="M258 337 H342 M264 331 H336" stroke={ink(0.4)} strokeWidth="1.4" fill="none" />
                    </g>
                  </g>

                  {/* выноска на конструктив */}
                  <g className="hidden lg:block" style={{ opacity: 'calc(var(--dt,0) * (1 - var(--rl,0)))' }}>
                    <line x1="440" y1="206" x2="512" y2="228" stroke={ink(0.45)} strokeWidth="1" />
                    <circle cx="440" cy="206" r="2.6" fill={ink(0.55)} />
                    <text x="486" y="243" fill={ink(0.5)} fontSize="9.5" fontFamily="'JetBrains Mono', monospace">D400</text>
                  </g>
                </g>
              </svg>
            </div>

            {/* стадия и прогресс */}
            <div className="px-4 lg:px-6 pb-3 lg:pb-5 pt-2" style={{ borderTop: `1px solid ${ink(0.12)}` }}>
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <span className="font-mono text-[9.5px] lg:text-[10px] uppercase tracking-[0.18em] flex items-baseline gap-2">
                  <span style={{ color: CLAY }}>{String(stage + 1).padStart(2, '0')}</span>
                  <span>{cur.name}</span>
                </span>
                {!tiny && (
                  <span className="font-mono text-[9px] lg:text-[9.5px] uppercase tracking-[0.14em] text-right truncate" style={{ color: ink(0.4) }}>{cur.note}</span>
                )}
              </div>
              <div className="h-[3px]" style={{ background: ink(0.1) }}>
                <div ref={bar} className="h-full origin-left" style={{ background: CLAY, transform: 'scaleX(0)' }} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* Полоса в разбивке сметы: растёт, когда доходит до экрана. */
function BarLine({ value, max, delay }: { value: number; max: number; delay: number }) {
  const { ref, seen } = useSeen<HTMLDivElement>();
  return (
    <div ref={ref} className="h-[7px] w-full" style={{ background: ink(0.07) }}>
      <div
        className="h-full"
        style={{
          background: CLAY,
          width: seen ? `${(value / max) * 100}%` : '0%',
          transition: `width .9s cubic-bezier(.22,1,.36,1) ${delay + 0.1}s`,
        }}
      />
    </div>
  );
}

/* ────────────────────────── страница ────────────────────────── */

export default function OsnovaBuild() {
  const [hash, setHash] = useState(() => (typeof window !== 'undefined' ? window.location.hash : ROOT));
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [area, setArea] = useState(140);
  const [pkg, setPkg] = useState(1);
  const [tech, setTech] = useState<string>('Все');
  const progBar = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  /* Тонкая полоса прогресса в шапке: лист «разворачивается» по мере чтения.
     Двигаем её напрямую через ref, а не через состояние React. Раньше здесь
     стоял setState на каждое событие прокрутки - и вся страница целиком
     перерисовывалась десятки раз в секунду. Из-за этого главный поток был
     занят, а нажатия на кнопки отрабатывали с большой задержкой. */
  useEffect(() => {
    let raf = 0;
    const apply = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? Math.min(1, h.scrollTop / max) : 0;
      if (progBar.current) progBar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply); };
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const slug = hash.startsWith(ROOT + '/project/') ? hash.split('/project/')[1] : null;
  const current = projects.find((p) => p.slug === slug) || null;
  const page = current ? 'project' : hash.startsWith(ROOT + '/projects') ? 'projects' : hash.startsWith(ROOT + '/prices') ? 'prices' : 'home';

  const go = (e: React.MouseEvent, to: string) => { e.preventDefault(); window.location.hash = to; window.scrollTo(0, 0); };
  const jump = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (page !== 'home') { window.location.hash = ROOT; setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 70); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const rate = [32000, 58000, 44000][pkg];
  const total = (area * rate).toLocaleString('ru-RU');
  const techs = ['Все', ...Array.from(new Set(projects.map((p) => p.tech)))];
  const shown = projects.filter((p) => tech === 'Все' || p.tech === tech);

  const smetaSum = smetaRows.reduce((s, [, v]) => s + v, 0);
  const smetaMax = Math.max(...smetaRows.map(([, v]) => v));

  /* сетка миллиметровки под всей страницей */
  const gridBg = {
    backgroundColor: PAPER,
    backgroundImage: `
      linear-gradient(${blue(0.05)} 1px, transparent 1px),
      linear-gradient(90deg, ${blue(0.05)} 1px, transparent 1px),
      linear-gradient(${blue(0.1)} 1px, transparent 1px),
      linear-gradient(90deg, ${blue(0.1)} 1px, transparent 1px)`,
    backgroundSize: '20px 20px, 20px 20px, 100px 100px, 100px 100px',
  };

  const btn = 'inline-flex items-center justify-center font-mono text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-200';
  const btnSolid = `${btn} px-8 py-4 text-white hover:-translate-y-[2px]`;

  const navLink = (active: boolean) =>
    `font-mono text-[11px] uppercase tracking-[0.18em] transition-opacity ${active ? '' : 'opacity-55 hover:opacity-100'}`;

  const H1 = 'font-archivo-black uppercase leading-[0.86] tracking-[-0.035em]';
  const H2 = 'font-archivo-black uppercase leading-[0.9] tracking-[-0.03em]';

  return (
    <div className="relative min-h-screen font-archivo overflow-x-clip" style={{ ...gridBg, color: INK }}>
      {/* зерно бумаги */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] mix-blend-multiply opacity-50"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.16'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ── шапка ── */}
      <header className="sticky top-0 z-50 backdrop-blur-md" style={{ background: 'rgba(231,227,216,0.92)', borderBottom: `1px solid ${ink(0.16)}` }}>
        <div className="max-w-[1340px] mx-auto px-6 md:px-8 py-4 flex justify-between items-center pl-20 md:pl-24 gap-6">
          <a href={ROOT} onClick={(e) => go(e, ROOT)} className="flex items-baseline gap-2 shrink-0">
            <span className="font-archivo-black text-[19px] tracking-[-0.04em] uppercase">Основа</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] hidden sm:inline" style={{ color: ink(0.4) }}>с 2015</span>
          </a>
          <nav className="hidden md:flex gap-9 items-center">
            <a href={ROOT + '/projects'} onClick={(e) => go(e, ROOT + '/projects')} className={navLink(page === 'projects' || page === 'project')} style={{ color: page === 'projects' || page === 'project' ? CLAY : INK }}>Проекты</a>
            <a href="#stages" onClick={(e) => jump(e, 'stages')} className={navLink(false)}>Этапы</a>
            <a href={ROOT + '/prices'} onClick={(e) => go(e, ROOT + '/prices')} className={navLink(page === 'prices')} style={{ color: page === 'prices' ? CLAY : INK }}>Цены</a>
            <a href="#contacts" onClick={(e) => jump(e, 'contacts')} className={navLink(false)}>Контакты</a>
          </nav>
          <a href="#contacts" onClick={(e) => jump(e, 'contacts')} className={`${btn} px-6 py-3 text-white hidden sm:inline-flex hover:-translate-y-[2px]`} style={{ background: CLAY }}>Смета бесплатно</a>
        </div>
        <div className="h-[2px]" style={{ background: ink(0.08) }}>
          <div ref={progBar} className="h-full origin-left" style={{ background: CLAY, transform: 'scaleX(0)' }} />
        </div>
      </header>

      {/* ═════════════════════ ГЛАВНАЯ ═════════════════════ */}
      {page === 'home' && (
        <>
          {/* Первый экран: дом строится по мере прокрутки. Тексты и CTA
              те же, что были, - изменился только способ подачи. */}
          <BuildScene />

          {/* штамп листа - вынесен под сцену, чтобы не занимать высоту экрана */}
          <section className="px-6 md:px-8 pt-8">
            <Up className="max-w-[1340px] mx-auto flex flex-wrap justify-between items-end gap-4">
              <TitleBlock sheet="АР-02" name="Дом «Ольха»" />
              <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] leading-relaxed" style={{ color: ink(0.4) }}>
                Такой лист вы получаете вместе с договором
              </span>
            </Up>
          </section>

          {/* фотополоса, поверх неё - факты */}
          <section className="relative mt-10 md:mt-14">
            <div className="relative h-[240px] sm:h-[300px] md:h-[380px] overflow-hidden">
              <img src="/hero-construction.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'grayscale(1) contrast(1.12)' }} />
              <div className="absolute inset-0" style={{ background: CLAY, mixBlendMode: 'multiply', opacity: 0.42 }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${PAPER} 2%, transparent 46%)` }} />
              <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${ink(0.18)}` }} />
              <span className="absolute top-5 left-6 md:left-10 font-mono text-[10px] uppercase tracking-[0.22em] text-white/85">
                рис. 01 · объект в Лаишеве, кровля закрыта в срок
              </span>
            </div>

            <div className="px-6 md:px-8 -mt-16 md:-mt-20 relative">
              <div className="max-w-[1340px] mx-auto grid grid-cols-2 lg:grid-cols-4" style={{ background: PAPER_HI, border: `1px solid ${ink(0.2)}` }}>
                {heroFacts.map(([v, l, note], i) => (
                  <Up
                    key={l} delay={i * 0.07}
                    className={
                      'p-6 md:p-7 border-black/[0.12] ' +
                      // на узком экране сетка 2×2, на широком - одна строка,
                      // поэтому разделители расставляем по-разному
                      (i % 2 === 1 ? 'border-l ' : '') +
                      (i > 1 ? 'border-t ' : '') +
                      'lg:border-t-0 ' +
                      (i > 0 ? 'lg:border-l' : 'lg:border-l-0')
                    }
                  >
                    <div className="font-archivo-black text-[30px] md:text-[40px] leading-none tracking-[-0.03em]">{v}</div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] mt-3" style={{ color: CLAY }}>{l}</div>
                    <div className="text-[12.5px] leading-[1.55] mt-2" style={{ color: ink(0.45) }}>{note}</div>
                  </Up>
                ))}
              </div>
            </div>
          </section>

          {/* ── проекты ── */}
          <section className="px-6 md:px-8 py-20 md:py-28">
            <div className="max-w-[1340px] mx-auto">
              <Up className="mb-12">
                <CutMark letter="А" label="Каталог типовых решений" />
                <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
                  <h2 className={H2} style={{ fontSize: 'clamp(34px,5.2vw,60px)' }}>Проекты</h2>
                  <a href={ROOT + '/projects'} onClick={(e) => go(e, ROOT + '/projects')} className="font-mono text-[11px] uppercase tracking-[0.16em] pb-2" style={{ color: CLAY, borderBottom: `1px solid ${CLAY}` }}>Весь каталог →</a>
                </div>
              </Up>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {projects.map((p, i) => (
                  <Up key={p.slug} delay={i * 0.07}>
                    <a
                      href={`${ROOT}/project/${p.slug}`}
                      onClick={(e) => go(e, `${ROOT}/project/${p.slug}`)}
                      className="group block h-full transition-all duration-300 hover:-translate-y-1.5"
                      style={{ background: PAPER_HI, border: `1px solid ${ink(0.2)}` }}
                    >
                      <div className="flex justify-between px-4 py-2.5 font-mono text-[9.5px] uppercase tracking-[0.16em]" style={{ borderBottom: `1px solid ${ink(0.14)}`, color: ink(0.42) }}>
                        <span>{p.index}</span><span>{p.tech}</span>
                      </div>
                      <DemoPhoto src={`/demo/osnova-${p.slug}.jpg`} label={`Фасад · ${p.name}`} tone={CLAY} ratio="4/3" icon="building" dark={false} bg="transparent" />
                      <div className="p-5">
                        <h3 className="font-archivo-black text-[21px] uppercase tracking-[-0.02em] mb-3">{p.name}</h3>
                        <div className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-[10.5px] mb-4" style={{ color: ink(0.45) }}>
                          <span>{p.area}</span><span>·</span><span>{p.floors}</span><span>·</span><span>{p.term}</span>
                        </div>
                        <div className="flex items-baseline justify-between gap-2 pt-4" style={{ borderTop: `1px solid ${ink(0.14)}` }}>
                          <span className="font-archivo-black text-[17px]" style={{ color: CLAY }}>{p.price}</span>
                          <span className="font-mono text-[11px] transition-transform group-hover:translate-x-1" style={{ color: ink(0.35) }}>→</span>
                        </div>
                      </div>
                    </a>
                  </Up>
                ))}
              </div>
            </div>
          </section>

          {/* ── этапы ── */}
          <section id="stages" className="px-6 md:px-8 py-20 md:py-28 scroll-mt-20" style={{ borderTop: `1px solid ${ink(0.16)}`, borderBottom: `1px solid ${ink(0.16)}`, background: PAPER_HI }}>
            <div className="max-w-[1340px] mx-auto">
              <Up className="mb-14">
                <CutMark letter="Б" label="Технологическая карта" />
                <div className="mt-6 flex flex-wrap items-end justify-between gap-8">
                  <h2 className={H2} style={{ fontSize: 'clamp(34px,5.2vw,60px)' }}>Как строим</h2>
                  <p className="text-[14.5px] max-w-[38ch] leading-[1.7]" style={{ color: ink(0.5) }}>
                    Дом 146 м² от договора до ключей - восемь месяцев. Сроки указаны по факту сданных объектов, а не по прайсу.
                  </p>
                </div>
              </Up>

              <div className="relative">
                <div className="hidden lg:block absolute left-0 right-0 top-[26px] h-px" style={{ background: ink(0.16) }} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                  {stages.map((s, i) => (
                    <Up key={s.n} delay={i * 0.06} className="relative">
                      <div className="flex items-center gap-3 mb-6">
                        <span
                          className="w-[52px] h-[52px] grid place-items-center font-archivo-black text-[17px] shrink-0 relative z-10"
                          style={{ background: PAPER_HI, border: `1.6px solid ${i === 0 ? CLAY : ink(0.28)}`, color: i === 0 ? CLAY : INK }}
                        >
                          {s.n}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] px-2.5 py-1" style={{ background: `${CLAY}18`, color: CLAY }}>{s.mark}</span>
                      </div>
                      <h3 className="font-archivo-black text-[20px] uppercase tracking-[-0.015em] mb-3">{s.t}</h3>
                      <p className="text-[14px] leading-[1.75] max-w-[36ch]" style={{ color: ink(0.55) }}>{s.d}</p>
                    </Up>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── комплектации ── */}
          <section className="px-6 md:px-8 py-20 md:py-28">
            <div className="max-w-[1340px] mx-auto">
              <Up className="mb-12">
                <CutMark letter="В" label="Ведомость комплектаций" />
                <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
                  <h2 className={H2} style={{ fontSize: 'clamp(34px,5.2vw,60px)' }}>Комплектации</h2>
                  <a href={ROOT + '/prices'} onClick={(e) => go(e, ROOT + '/prices')} className="font-mono text-[11px] uppercase tracking-[0.16em] pb-2" style={{ color: CLAY, borderBottom: `1px solid ${CLAY}` }}>Полный прайс →</a>
                </div>
              </Up>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {packages.map((p, i) => (
                  <Up key={p.name} delay={i * 0.08}>
                    <div
                      className="flex flex-col h-full p-8 relative"
                      style={{
                        background: p.accent ? INK : PAPER_HI,
                        color: p.accent ? PAPER : INK,
                        border: `1px solid ${p.accent ? INK : ink(0.2)}`,
                      }}
                    >
                      {p.accent && (
                        <span className="absolute top-0 right-0 font-mono text-[9px] uppercase tracking-[0.18em] px-3 py-1.5" style={{ background: CLAY, color: '#fff' }}>берут чаще всего</span>
                      )}
                      <h3 className="font-archivo-black text-[26px] uppercase tracking-[-0.025em] mb-2">{p.name}</h3>
                      <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] mb-7" style={{ color: p.accent ? 'rgba(231,227,216,0.5)' : ink(0.42) }}>{p.lead}</div>
                      <div className="flex items-baseline gap-2 mb-7">
                        <span className="font-archivo-black text-[34px] leading-none" style={{ color: CLAY }}>{p.price}</span>
                        <span className="font-mono text-[12px]" style={{ color: p.accent ? 'rgba(231,227,216,0.5)' : ink(0.42) }}>{p.unit}</span>
                      </div>
                      <div className="flex flex-col flex-1 mb-8">
                        {p.items.map((x) => (
                          <div key={x} className="flex gap-3 text-[13.5px] leading-[1.6] py-2.5" style={{ borderTop: `1px solid ${p.accent ? 'rgba(231,227,216,0.14)' : ink(0.1)}`, color: p.accent ? 'rgba(231,227,216,0.78)' : ink(0.62) }}>
                            <span className="shrink-0 mt-[7px] w-[6px] h-[6px]" style={{ background: CLAY }} />{x}
                          </div>
                        ))}
                      </div>
                      <a
                        href="#contacts" onClick={(e) => jump(e, 'contacts')}
                        className={`${btn} px-6 py-3.5 w-full`}
                        style={p.accent ? { background: CLAY, color: '#fff' } : { border: `1.4px solid ${ink(0.28)}` }}
                      >
                        Рассчитать
                      </a>
                    </div>
                  </Up>
                ))}
              </div>
            </div>
          </section>

          {/* ── гарантии со штампом ── */}
          <section className="px-6 md:px-8 py-20 md:py-28" style={{ borderTop: `1px solid ${ink(0.16)}`, borderBottom: `1px solid ${ink(0.16)}`, background: PAPER_HI }}>
            <div className="max-w-[1340px] mx-auto">
              <Up className="mb-12 flex flex-wrap items-end justify-between gap-8">
                <div>
                  <CutMark letter="Г" label="Условия договора" />
                  <h2 className={`${H2} mt-6`} style={{ fontSize: 'clamp(34px,5.2vw,60px)' }}>Гарантии</h2>
                </div>
                <div
                  className="rotate-[-6deg] px-5 py-3 text-center select-none"
                  style={{ border: `2.5px solid ${CLAY}88`, color: `${CLAY}CC` }}
                  aria-hidden="true"
                >
                  <div className="font-archivo-black text-[15px] uppercase tracking-[0.04em] leading-tight">Смета<br />зафиксирована</div>
                  <div className="font-mono text-[8.5px] uppercase tracking-[0.18em] mt-1.5">п. 4.2 договора подряда</div>
                </div>
              </Up>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                {guarantees.map((g, i) => (
                  <Up key={g.t} delay={i * 0.07}>
                    <div className="h-[3px] w-10 mb-5" style={{ background: CLAY }} />
                    <h3 className="font-archivo-black text-[19px] uppercase tracking-[-0.015em] mb-3">{g.t}</h3>
                    <p className="text-[13.5px] leading-[1.75]" style={{ color: ink(0.55) }}>{g.d}</p>
                  </Up>
                ))}
              </div>
            </div>
          </section>

          {/* ── вопросы ── */}
          <section className="px-6 md:px-8 py-20 md:py-28">
            <div className="max-w-[920px] mx-auto">
              <Up className="mb-10">
                <CutMark letter="Д" label="Примечания к листу" />
                <h2 className={`${H2} mt-6`} style={{ fontSize: 'clamp(34px,5vw,56px)' }}>Вопросы</h2>
              </Up>
              <div className="flex flex-col">
                {faqs.map((f, i) => {
                  const open = openFaq === i;
                  return (
                    <Up key={f.q} delay={i * 0.04}>
                      <div style={{ borderTop: `1px solid ${ink(0.16)}` }}>
                        <button type="button" onClick={() => setOpenFaq(open ? null : i)} className="w-full flex justify-between items-center gap-6 py-6 text-left">
                          <span className="flex items-baseline gap-4">
                            <span className="font-mono text-[10px] shrink-0" style={{ color: CLAY }}>{String(i + 1).padStart(2, '0')}</span>
                            <span className="font-archivo-black text-[17px] md:text-[21px] uppercase tracking-[-0.015em]">{f.q}</span>
                          </span>
                          <span
                            className="shrink-0 w-8 h-8 grid place-items-center font-mono text-[16px] transition-transform duration-300"
                            style={{ border: `1.3px solid ${open ? CLAY : ink(0.25)}`, color: open ? CLAY : INK, transform: open ? 'rotate(45deg)' : 'none' }}
                          >
                            +
                          </span>
                        </button>
                        <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? 340 : 0, opacity: open ? 1 : 0 }}>
                          <p className="text-[14.5px] leading-[1.85] pb-7 sm:pl-9 max-w-[66ch]" style={{ color: ink(0.55) }}>{f.a}</p>
                        </div>
                      </div>
                    </Up>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ═════════════════════ КАТАЛОГ ═════════════════════ */}
      {page === 'projects' && (
        <>
          <section className="px-6 md:px-8 pt-14 md:pt-20 pb-10">
            <div className="max-w-[1340px] mx-auto">
              <a href={ROOT} onClick={(e) => go(e, ROOT)} className="inline-block font-mono text-[11px] uppercase tracking-[0.18em] mb-9 opacity-55 hover:opacity-100 transition-opacity">← На главную</a>
              <CutMark letter="А" label="Лист 1 из 1 · типовые решения" />
              <h1 className={`${H1} mt-6 max-w-[15ch]`} style={{ fontSize: 'clamp(40px,6.6vw,84px)' }}>
                Каталог<br /><span style={{ color: CLAY }}>проектов</span>
              </h1>
              <p className="mt-8 max-w-[58ch] text-[16.5px] leading-[1.8]" style={{ color: ink(0.6) }}>
                Четыре отработанных проекта. Цена в карточке - «под ключ» для базовой комплектации,
                без учёта участка и подключений. Любой проект адаптируем под ваш участок бесплатно.
              </p>
              <div className="mt-9 flex flex-wrap gap-2.5">
                {techs.map((t) => (
                  <button type="button"
                    key={t} onClick={() => setTech(t)}
                    className="px-5 py-2.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] transition-colors"
                    style={{
                      border: `1.3px solid ${tech === t ? INK : ink(0.24)}`,
                      background: tech === t ? INK : 'transparent',
                      color: tech === t ? PAPER : ink(0.55),
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-8 pb-20">
            <div className="max-w-[1340px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {shown.map((p, i) => (
                <Up key={p.slug} delay={i * 0.06}>
                  <a
                    href={`${ROOT}/project/${p.slug}`} onClick={(e) => go(e, `${ROOT}/project/${p.slug}`)}
                    className="group block h-full transition-all duration-300 hover:-translate-y-1.5"
                    style={{ background: PAPER_HI, border: `1px solid ${ink(0.2)}`, boxShadow: `6px 8px 0 ${ink(0.05)}` }}
                  >
                    <div className="flex justify-between px-6 py-3 font-mono text-[9.5px] uppercase tracking-[0.18em]" style={{ borderBottom: `1px solid ${ink(0.14)}`, color: ink(0.42) }}>
                      <span>{p.index}</span><span>{p.tech}</span><span>масштаб 1:100</span>
                    </div>
                    <DemoPhoto src={`/demo/osnova-${p.slug}.jpg`} label={`Фото · дом «${p.name}»`} tone={CLAY} ratio="16/9" icon="building" dark={false} bg="transparent" />
                    <div className="p-7">
                      <h3 className="font-archivo-black text-[27px] uppercase tracking-[-0.025em] mb-3">Дом «{p.name}»</h3>
                      <p className="text-[14px] leading-[1.7] mb-6" style={{ color: ink(0.55) }}>{p.lead}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5" style={{ borderTop: `1px solid ${ink(0.14)}` }}>
                        {[[p.area, 'площадь'], [p.floors, 'этажность'], [p.beds, 'спальни'], [p.term, 'срок']].map(([v, l]) => (
                          <div key={l}>
                            <div className="font-archivo-black text-[15px]">{v}</div>
                            <div className="font-mono text-[9.5px] uppercase tracking-[0.12em] mt-1.5" style={{ color: ink(0.4) }}>{l}</div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-baseline justify-between gap-3 mt-6">
                        <span className="font-archivo-black text-[24px]" style={{ color: CLAY }}>{p.price}</span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.14em] transition-transform group-hover:translate-x-1" style={{ color: ink(0.4) }}>смотреть →</span>
                      </div>
                    </div>
                  </a>
                </Up>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ═════════════════════ ПРОЕКТ ═════════════════════ */}
      {page === 'project' && current && (
        <>
          <section className="px-6 md:px-8 pt-14 md:pt-20 pb-14">
            <div className="max-w-[1340px] mx-auto">
              <a href={ROOT + '/projects'} onClick={(e) => go(e, ROOT + '/projects')} className="inline-block font-mono text-[11px] uppercase tracking-[0.18em] mb-9 opacity-55 hover:opacity-100 transition-opacity">← Все проекты</a>
              <div className="grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-12 items-center">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.24em] mb-6" style={{ color: CLAY }}>
                    {current.index} · {current.tech} · {current.floors} · {current.beds}
                  </div>
                  <h1 className={H1} style={{ fontSize: 'clamp(38px,6vw,76px)' }}>Дом<br />«{current.name}»</h1>
                  <p className="mt-8 max-w-[52ch] text-[16.5px] leading-[1.8]" style={{ color: ink(0.6) }}>{current.lead}</p>
                  <div className="mt-10 grid grid-cols-3" style={{ borderTop: `1px solid ${ink(0.2)}` }}>
                    {[[current.area, 'площадь'], [current.term, 'срок'], [current.price, 'под ключ']].map(([v, l], i) => (
                      <div key={l} className={'py-6 pr-5 ' + (i ? 'pl-5' : '')} style={i ? { borderLeft: `1px solid ${ink(0.16)}` } : undefined}>
                        <div className="font-archivo-black text-[19px] md:text-[23px] tracking-[-0.02em]" style={i === 2 ? { color: CLAY } : undefined}>{v}</div>
                        <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] mt-2" style={{ color: ink(0.42) }}>{l}</div>
                      </div>
                    ))}
                  </div>
                  <a href="#contacts" onClick={(e) => jump(e, 'contacts')} className={`${btnSolid} mt-9`} style={{ background: INK }}>Рассчитать под мой участок</a>
                </div>

                <div className="relative p-5 sm:p-7" style={{ background: PAPER_HI, border: `1px solid ${ink(0.2)}`, boxShadow: `10px 12px 0 ${ink(0.06)}` }}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.2em]" style={{ color: ink(0.42) }}>Главный фасад</span>
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.2em]" style={{ color: ink(0.42) }}>{current.index}</span>
                  </div>
                  <Elevation key={current.slug} />
                  <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${ink(0.14)}` }}>
                    <TitleBlock sheet="АР-02" name={`Дом «${current.name}»`} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-8 py-16 md:py-20" style={{ borderTop: `1px solid ${ink(0.16)}`, borderBottom: `1px solid ${ink(0.16)}`, background: PAPER_HI }}>
            <div className="max-w-[1340px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">
              <div>
                <Up className="mb-8">
                  <CutMark letter="Э" label="Экспликация помещений" />
                  <h2 className={`${H2} mt-5`} style={{ fontSize: 'clamp(26px,3.6vw,36px)' }}>Помещения</h2>
                </Up>
                {current.rooms.map(([n, s], i) => (
                  <Up key={n + i} delay={i * 0.04}>
                    <div className="grid grid-cols-[auto_1fr_auto] gap-4 py-4 items-baseline" style={{ borderTop: `1px solid ${ink(0.13)}` }}>
                      <span className="font-mono text-[10px] w-6" style={{ color: ink(0.35) }}>{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-[15px]">{n}</span>
                      <span className="font-mono text-[12.5px] text-right" style={{ color: ink(0.48) }}>{s}</span>
                    </div>
                  </Up>
                ))}
              </div>
              <div>
                <Up className="mb-8">
                  <CutMark letter="К" label="Конструктивные решения" />
                  <h2 className={`${H2} mt-5`} style={{ fontSize: 'clamp(26px,3.6vw,36px)' }}>Конструктив</h2>
                </Up>
                {current.spec.map(([n, s], i) => (
                  <Up key={n} delay={i * 0.04}>
                    <div className="grid grid-cols-[110px_1fr] gap-5 py-4" style={{ borderTop: `1px solid ${ink(0.13)}` }}>
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] pt-1" style={{ color: ink(0.4) }}>{n}</span>
                      <span className="text-[14.5px] leading-[1.6]">{s}</span>
                    </div>
                  </Up>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-8 py-16 md:py-24">
            <div className="max-w-[1340px] mx-auto">
              <Up className="mb-9">
                <CutMark letter="П" label="Примечания проектировщика" />
                <h2 className={`${H2} mt-5`} style={{ fontSize: 'clamp(28px,4vw,40px)' }}>Что важно знать</h2>
              </Up>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {current.notes.map((n, i) => (
                  <Up key={n} delay={i * 0.07}>
                    <div className="h-full p-6" style={{ background: PAPER_HI, border: `1px solid ${ink(0.16)}`, borderTop: `3px solid ${CLAY}` }}>
                      <p className="text-[14.5px] leading-[1.75]" style={{ color: ink(0.6) }}>{n}</p>
                    </div>
                  </Up>
                ))}
              </div>
              <Up className="mt-14">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: ink(0.4) }}>Смотрите также</div>
                <div className="flex flex-wrap gap-4">
                  {projects.filter((p) => p.slug !== current.slug).map((p) => (
                    <a
                      key={p.slug} href={`${ROOT}/project/${p.slug}`} onClick={(e) => go(e, `${ROOT}/project/${p.slug}`)}
                      className="px-6 py-4 text-[13.5px] transition-all hover:-translate-y-1"
                      style={{ border: `1px solid ${ink(0.22)}`, background: PAPER_HI }}
                    >
                      <span className="font-mono text-[10px] mr-2" style={{ color: CLAY }}>{p.index}</span>
                      Дом «{p.name}» · {p.area} →
                    </a>
                  ))}
                </div>
              </Up>
            </div>
          </section>
        </>
      )}

      {/* ═════════════════════ ЦЕНЫ ═════════════════════ */}
      {page === 'prices' && (
        <>
          <section className="px-6 md:px-8 pt-14 md:pt-20 pb-12">
            <div className="max-w-[1120px] mx-auto">
              <a href={ROOT} onClick={(e) => go(e, ROOT)} className="inline-block font-mono text-[11px] uppercase tracking-[0.18em] mb-9 opacity-55 hover:opacity-100 transition-opacity">← На главную</a>
              <CutMark letter="Ц" label="Ведомость расценок" />
              <h1 className={`${H1} mt-6 max-w-[13ch]`} style={{ fontSize: 'clamp(40px,6.6vw,84px)' }}>
                Прайс<br /><span style={{ color: CLAY }}>по работам</span>
              </h1>
              <p className="mt-8 max-w-[60ch] text-[16.5px] leading-[1.8]" style={{ color: ink(0.6) }}>
                Открытые расценки, чтобы вы могли сверить нашу смету с чужой построчно.
                Финальная цена зависит от геологии, рельефа и удалённости участка - считаем после выезда.
              </p>
            </div>
          </section>

          <section className="px-6 md:px-8 pb-16">
            <div className="max-w-[1120px] mx-auto" style={{ background: PAPER_HI, border: `1px solid ${ink(0.2)}` }}>
              <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1.1fr_auto_1.3fr] gap-5 px-6 py-3.5 font-mono text-[9.5px] uppercase tracking-[0.16em]" style={{ borderBottom: `1.5px solid ${ink(0.28)}`, color: ink(0.42) }}>
                <span>№</span><span>Работа</span><span className="text-right md:text-left">Цена</span><span className="hidden md:block">Что входит</span>
              </div>
              {priceRows.map(([n, p, d], i) => (
                <Up key={n} delay={i * 0.03}>
                  <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1.1fr_auto_1.3fr] gap-5 px-6 py-4 items-baseline transition-colors hover:bg-black/[0.03]" style={{ borderBottom: `1px solid ${ink(0.1)}` }}>
                    <span className="font-mono text-[10px] w-6" style={{ color: ink(0.32) }}>{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[14.5px]">{n}</span>
                    <span className="font-archivo-black text-[14.5px] text-right md:text-left whitespace-nowrap" style={{ color: CLAY }}>{p}</span>
                    <span className="col-span-3 md:col-span-1 text-[12.5px] leading-[1.6]" style={{ color: ink(0.45) }}>{d}</span>
                  </div>
                </Up>
              ))}
            </div>
          </section>

          {/* разбивка сметы */}
          <section className="px-6 md:px-8 py-16 md:py-24" style={{ borderTop: `1px solid ${ink(0.16)}`, borderBottom: `1px solid ${ink(0.16)}`, background: PAPER_HI }}>
            <div className="max-w-[1120px] mx-auto">
              <Up className="mb-10">
                <CutMark letter="С" label="Пример реальной сметы" />
                <h2 className={`${H2} mt-5 mb-3`} style={{ fontSize: 'clamp(28px,4.4vw,42px)' }}>Из чего складывается смета</h2>
                <p className="text-[14.5px] max-w-[58ch] leading-[1.75]" style={{ color: ink(0.52) }}>
                  Дом «Ольха», 146 м², комплектация «Под ключ». Так выглядит разбивка,
                  которую вы получаете вместе с договором - без строки «прочие работы».
                </p>
              </Up>

              <div className="flex flex-col">
                {smetaRows.map(([label, val], i) => {
                  const pct = Math.round((val / smetaSum) * 100);
                  return (
                    <Up key={label} delay={i * 0.06}>
                      <div className="py-4" style={{ borderTop: `1px solid ${ink(0.13)}` }}>
                        <div className="flex justify-between items-baseline gap-4 mb-2.5">
                          <span className="text-[14.5px] flex items-baseline gap-3">
                            <span className="font-mono text-[10px]" style={{ color: ink(0.35) }}>{String(i + 1).padStart(2, '0')}</span>
                            {label}
                          </span>
                          <span className="flex items-baseline gap-3 whitespace-nowrap">
                            <span className="font-mono text-[11px]" style={{ color: ink(0.4) }}>{pct}%</span>
                            <span className="font-archivo-black text-[15px]">{val.toLocaleString('ru-RU')} ₽</span>
                          </span>
                        </div>
                        <BarLine value={val} max={smetaMax} delay={i * 0.06} />
                      </div>
                    </Up>
                  );
                })}
                <Up delay={0.4}>
                  <div className="flex justify-between items-baseline gap-4 py-5 mt-1 mb-4" style={{ borderTop: `1.5px solid ${ink(0.3)}` }}>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.18em]" style={{ color: ink(0.45) }}>Итого по смете</span>
                    <span className="font-archivo-black text-[26px]" style={{ color: CLAY }}>{smetaSum.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <p className="text-[12.5px] leading-[1.7] max-w-[70ch]" style={{ color: ink(0.42) }}>
                    Когда все этапы ведёт одна бригада, цена выходит примерно на 20% ниже,
                    чем при найме разных подрядчиков на каждый этап. Эта разница уже учтена в договоре.
                  </p>
                </Up>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-8 py-16">
            <div className="max-w-[1120px] mx-auto">
              <Up className="mb-9">
                <CutMark letter="Д" label="Дополнительные позиции" />
                <h2 className={`${H2} mt-5`} style={{ fontSize: 'clamp(28px,4.4vw,42px)' }}>Дополнительно</h2>
              </Up>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
                {extras.map(([n, p], i) => (
                  <Up key={n} delay={i * 0.04}>
                    <div className="flex justify-between gap-6 py-4 items-baseline" style={{ borderBottom: `1px solid ${ink(0.13)}` }}>
                      <span className="text-[14.5px]">{n}</span>
                      <span className="font-archivo-black text-[14px] whitespace-nowrap" style={{ color: CLAY }}>{p}</span>
                    </div>
                  </Up>
                ))}
              </div>
            </div>
          </section>

          {/* калькулятор */}
          <section className="px-6 md:px-8 py-16 md:py-24" style={{ borderTop: `1px solid ${ink(0.16)}`, background: PAPER_HI }}>
            <div className="max-w-[860px] mx-auto">
              <Up className="text-center mb-10">
                <h2 className={H2} style={{ fontSize: 'clamp(30px,4.6vw,44px)' }}>Прикинуть бюджет</h2>
                <p className="text-[15px] mt-4" style={{ color: ink(0.52) }}>Грубая оценка по площади и комплектации. Точную смету считаем после выезда.</p>
              </Up>
              <Up>
                <div className="p-8 md:p-10" style={{ border: `1px solid ${ink(0.22)}`, background: PAPER }}>
                  <div className="flex flex-wrap gap-2.5 mb-9">
                    {packages.map((p, i) => (
                      <button type="button"
                        key={p.name} onClick={() => setPkg(i)}
                        className="px-5 py-3 font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] transition-colors"
                        style={{
                          border: `1.3px solid ${pkg === i ? INK : ink(0.24)}`,
                          background: pkg === i ? INK : 'transparent',
                          color: pkg === i ? PAPER : ink(0.55),
                        }}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: ink(0.42) }}>Площадь дома</span>
                    <span className="font-archivo-black text-[26px]">{area} м²</span>
                  </div>
                  <input
                    type="range" min={60} max={300} step={2} value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full cursor-pointer mb-9" aria-label="Площадь дома"
                    style={{ accentColor: CLAY }}
                  />
                  <div className="flex items-end justify-between gap-6 flex-wrap pt-7" style={{ borderTop: `1px solid ${ink(0.16)}` }}>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-2" style={{ color: ink(0.42) }}>Ориентировочно</div>
                      <div className="font-archivo-black text-[38px] leading-none" style={{ color: CLAY }}>{total} ₽</div>
                    </div>
                    <a href="#contacts" onClick={(e) => jump(e, 'contacts')} className={btnSolid} style={{ background: INK }}>Получить точную смету</a>
                  </div>
                </div>
              </Up>
            </div>
          </section>
        </>
      )}

      {/* ═════════════════════ КОНТАКТЫ ═════════════════════ */}
      <section id="contacts" className="px-6 md:px-8 py-20 md:py-28 scroll-mt-20" style={{ borderTop: `1px solid ${ink(0.16)}` }}>
        <Up className="max-w-[820px] mx-auto text-center">
          <div className="flex justify-center mb-8"><CutMark letter="К" label="Первый шаг" /></div>
          <h2 className={H2} style={{ fontSize: 'clamp(32px,5.2vw,60px)' }}>
            Выедем на участок<br /><span style={{ color: CLAY }}>бесплатно</span>
          </h2>
          <p className="text-[15.5px] mt-6 mb-10 max-w-[52ch] mx-auto leading-[1.75]" style={{ color: ink(0.55) }}>
            Посмотрим грунт, подъезд и границы. Через два дня привезём смету с фиксированной ценой -
            даже если строить вы потом передумаете.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 5000); }}
            className="flex gap-3 max-w-[540px] mx-auto flex-wrap"
          >
            <input
              required type="tel" placeholder="+7 (___) ___-__-__"
              className="flex-1 min-w-[220px] bg-transparent px-6 py-4 text-[14.5px] outline-none transition-colors"
              style={{ border: `1.3px solid ${ink(0.28)}`, color: INK }}
              onFocus={(e) => { e.currentTarget.style.borderColor = CLAY; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = ink(0.28); }}
            />
            <button type="submit" className={btnSolid} style={{ background: CLAY }}>Записаться</button>
          </form>
          {sent && <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.14em]" style={{ color: CLAY }}>Заявка принята. Прораб перезвонит в течение часа.</p>}
        </Up>
      </section>

      {/* ═════════════════════ ПОДВАЛ ═════════════════════ */}
      <footer className="px-6 md:px-8 pt-16 pb-10" style={{ background: INK, color: PAPER }}>
        <div className="max-w-[1340px] mx-auto flex flex-wrap justify-between gap-10 mb-12">
          <div className="max-w-[300px]">
            <div className="font-archivo-black text-[20px] uppercase tracking-[-0.04em] mb-4">Основа</div>
            <p className="text-[13px] leading-[1.75]" style={{ color: 'rgba(231,227,216,0.5)' }}>
              Строим дома под ключ с фиксированной сметой. Свои бригады, отчёт каждую пятницу.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-[9.5px] uppercase tracking-[0.2em] mb-4" style={{ color: 'rgba(231,227,216,0.4)' }}>Разделы</h4>
            <div className="flex flex-col gap-3 text-[13px]" style={{ color: 'rgba(231,227,216,0.65)' }}>
              <a href={ROOT + '/projects'} onClick={(e) => go(e, ROOT + '/projects')} className="hover:text-white transition-colors">Каталог проектов</a>
              <a href={ROOT + '/prices'} onClick={(e) => go(e, ROOT + '/prices')} className="hover:text-white transition-colors">Прайс по работам</a>
              <a href="#stages" onClick={(e) => jump(e, 'stages')} className="hover:text-white transition-colors">Этапы работ</a>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-[9.5px] uppercase tracking-[0.2em] mb-4" style={{ color: 'rgba(231,227,216,0.4)' }}>Контакты</h4>
            <div className="flex flex-col gap-3 text-[13px]" style={{ color: 'rgba(231,227,216,0.65)' }}>
              <span className="font-archivo-black text-[19px] text-white">+7 (000) 000-00-00</span>
              <span>build@osnova.example</span>
              <span style={{ color: 'rgba(231,227,216,0.42)' }}>Офис и шоурум: ул. Строителей, 12<br />Пн–Сб 9:00–19:00</span>
            </div>
          </div>
        </div>
        <div className="max-w-[1340px] mx-auto pt-7 flex flex-wrap justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ borderTop: '1px solid rgba(231,227,216,0.14)', color: 'rgba(231,227,216,0.35)' }}>
          <span>© 2026 Основа · демонстрационный шаблон ONYX</span>
          <div className="flex gap-5"><span>Политика конфиденциальности</span><span>Договор подряда</span></div>
        </div>
      </footer>
    </div>
  );
}
