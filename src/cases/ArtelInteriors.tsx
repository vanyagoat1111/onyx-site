import React, { useEffect, useRef, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   ARTEL — ремонт и интерьеры под ключ.

   Визуальный язык: интерьерный журнал, а не лендинг подрядчика.
   Тёплый эспрессо вместо чёрного, диадона Bodoni вместо гротеска,
   приглушённый шалфей вместо золота. Золото на чёрном - самый затёртый
   способ показать «премиум»; он читается как шаблон, поэтому мы его не берём.

   Три приёма, которых нет у конкурентов:
     1. «Было / Стало» - шторку двигает сам человек. Ремонт продаётся
        разницей, а не словом «качественно».
     2. Палитра материалов - каждый образец нарисован кодом, поэтому
        выглядит как выкладка у дизайнера, а не как сток.
     3. Каждый проект - отдельная страница с составом работ и сметой.

   Анимация - на чистом CSS через IntersectionObserver. Библиотека здесь
   не нужна и на демо-страницах вела себя ненадёжно.

   Четыре страницы: главная → портфолио → проект → услуги и цены.
   ═══════════════════════════════════════════════════════════════════════ */

const ROOT = '#case/artel';

const BG = '#12100E';
const PANEL = '#1A1714';
const PANEL_2 = '#221D19';
const IVORY = '#EFE9DF';
const SAGE = '#9DAD90';

const iv = (a: number) => `rgba(239,233,223,${a})`;

/* ────────────────────────── данные ────────────────────────── */

const heroStats: [string, string][] = [
  ['12 лет', 'на рынке'],
  ['150+', 'сданных объектов'],
  ['0 дней', 'просрочки за 3 года'],
];

const reasons = [
  { num: '01', title: 'Фиксированный договор', desc: 'Стоимость закрепляется юридически и не меняется по ходу. Всё, что нельзя посчитать заранее, мы называем вслух до подписания.' },
  { num: '02', title: 'Ответственность за срок', desc: 'График работ - приложение к договору. За каждый день просрочки платим неустойку, а не объясняем причины.' },
  { num: '03', title: 'Гарантия 5 лет', desc: 'На инженерию и отделочные работы. Выезд по гарантийному обращению - в течение трёх дней.' },
  { num: '04', title: 'Свои бригады', desc: 'Штатные мастера узкого профиля. Плиточник кладёт плитку, а не «умеет всё понемногу».' },
  { num: '05', title: 'Отчёт каждый день', desc: 'Фото и видео с объекта в общий чат. Вы видите стройку, даже если находитесь в другой стране.' },
  { num: '06', title: 'Один ответственный', desc: 'Персональный менеджер ведёт объект от замера до финального клининга. Вопросы не теряются между людьми.' },
];

const services = [
  { title: 'Дизайнерский ремонт', desc: 'Комплексная реализация проекта с полным авторским надзором.', img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=900&q=80' },
  { title: 'Капитальный ремонт', desc: 'Демонтаж, новые перегородки, полная замена коммуникаций.', img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80' },
  { title: 'Косметический ремонт', desc: 'Обновление облика без переноса стен и инженерии.', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80' },
  { title: 'Инженерные системы', desc: 'Электрика, вентиляция, кондиционирование, умный дом.', img: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80' },
  { title: 'Ванные комнаты', desc: 'Работа с натуральным камнем и крупноформатным керамогранитом.', img: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=900&q=80' },
  { title: 'Черновая отделка', desc: 'Геометрия стен и стяжки под чистовые покрытия премиум-класса.', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80' },
];

const steps = [
  { t: 'Заявка и разговор', d: 'Двадцать минут по телефону: что за объект, что хочется, в какой бюджет метите.' },
  { t: 'Замер и концепция', d: 'Инженер выезжает, снимает точные размеры и говорит, что технически возможно, а что нет.' },
  { t: 'Проект и смета', d: 'Визуализации, чертежи, расчёт до рубля. Смету можно построчно сравнить с любой другой.' },
  { t: 'Договор', d: 'Фиксируем стоимость, срок и гарантию. График работ идёт приложением.' },
  { t: 'Работы и отчёты', d: 'Каждый день фото в чат. Скрытые работы принимаем вместе, до того как их закроют.' },
  { t: 'Приёмка', d: 'Финальный клининг, расстановка декора, подписание акта и передача паспортов на технику.' },
  { t: 'Гарантия', d: 'Пять лет на связи. Обращение закрываем без «пришлите фото и ждите».' },
];

type Work = {
  slug: string; type: string; title: string; sub: string; img: string;
  area: string; term: string; budget: string; style: string;
  lead: string;
  scope: [string, string][];
  used: string[];
  notes: string[];
};

const works: Work[] = [
  {
    slug: 'symbol', type: 'Квартиры', title: 'ЖК «Символ»', sub: 'Минимализм с ар-деко', area: '140 м²', term: '5 месяцев', budget: '6 400 000 ₽', style: 'Минимализм',
    img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=80',
    lead: 'Квартира для семьи из четырёх человек. Основная задача была спрятать всё лишнее: техника, хранение и инженерия убраны в стены, на виду остались только материалы.',
    scope: [['Демонтаж', 'Полный, до бетона'], ['Перепланировка', 'Согласована, объединены кухня и гостиная'], ['Инженерия', 'Электрика заново, приточная вентиляция'], ['Стены', 'Штукатурка по маякам, окраска Little Greene'], ['Полы', 'Инженерная доска, ёлка «французская»'], ['Столярка', 'Шкафы и двери по индивидуальным чертежам']],
    used: ['Инженерная доска, дуб', 'Известковая краска', 'Латунная фурнитура', 'Керамогранит 120×260'],
    notes: ['Перепланировку согласовывали четыре месяца - работы шли параллельно с согласованием, чтобы не терять сезон', 'Вентиляция считалась под шумовой норматив: в спальнях 24 дБ', 'Вся столярка изготовлена на заказ, срок производства - шесть недель'],
  },
  {
    slug: 'zhukovka', type: 'Дома', title: 'Резиденция «Жуковка»', sub: 'Классика в современном прочтении', area: '450 м²', term: '11 месяцев', budget: '21 800 000 ₽', style: 'Неоклассика',
    img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=80',
    lead: 'Загородный дом в три уровня. Заказчик хотел классику без золота и лепнины - спокойные пропорции, натуральный камень и много дневного света.',
    scope: [['Черновые работы', 'Выравнивание всех плоскостей под камень'], ['Камень', 'Травертин и мрамор, раскладка по эскизу'], ['Инженерия', 'Два контура отопления, рекуперация'], ['Умный дом', 'Свет, шторы, климат, сценарии'], ['Столярка', 'Панели стен, двери в проёме до потолка'], ['Лестница', 'Дуб на металлокаркасе, ковка перил']],
    used: ['Травертин Navona', 'Мрамор Calacatta', 'Дуб, брашированный', 'Система KNX'],
    notes: ['Камень заказывали одной партией из карьера - иначе не сойдётся оттенок', 'Лестницу проектировали отдельно, монтаж занял три недели', 'Дом сдавался поэтажно, семья заехала за два месяца до окончания работ в цоколе'],
  },
  {
    slug: 'sadovye', type: 'Квартиры', title: 'ЖК «Садовые Кварталы»', sub: 'Индустриальный шик', area: '110 м²', term: '4 месяца', budget: '4 900 000 ₽', style: 'Лофт',
    img: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1800&q=80',
    lead: 'Открытое пространство с высокими потолками. Бетон оставили как есть, тепло добавили деревом и текстилем, чтобы квартира не превратилась в мастерскую.',
    scope: [['Демонтаж', 'Частичный, несущие сохранены'], ['Потолок', 'Бетон отшлифован и покрыт матовым лаком'], ['Инженерия', 'Открытая разводка в трубе, чёрный металл'], ['Полы', 'Наливной пол в общей зоне, доска в спальнях'], ['Кухня', 'Островная, столешница из кварцевого агломерата'], ['Свет', 'Трековые системы, сценарии на две группы']],
    used: ['Бетон, шлифовка', 'Чёрный металл', 'Кварцевый агломерат', 'Шерстяной ковролин'],
    notes: ['Шлифовка потолка - грязная работа, делали до заезда любых материалов', 'Открытая проводка требует идеальной геометрии: любой перекос видно', 'Заказчик въехал через 4 месяца, отставания не было'],
  },
  {
    slug: 'bistrot', type: 'Коммерция', title: 'Ресторан «Bistrot»', sub: 'Акцент на натуральное дерево', area: '300 м²', term: '3 месяца', budget: '9 200 000 ₽', style: 'Бистро',
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80',
    lead: 'Ремонт под открытие с фиксированной датой. Работали в две смены: у заказчика была бронь на банкет через девяносто дней после подписания.',
    scope: [['Вентиляция', 'Приточно-вытяжная под кухню, шумоглушители'], ['Электрика', 'Отдельные линии на тепловое оборудование'], ['Отделка зала', 'Дубовые панели, штукатурка «под глину»'], ['Санузлы', 'Керамогранит, латунная сантехника'], ['Барная зона', 'Столярка на заказ, подсветка полок'], ['Пожарная часть', 'Сигнализация, огнезащитная обработка']],
    used: ['Дуб массив', 'Декоративная штукатурка', 'Латунь, состаренная', 'Терраццо'],
    notes: ['Дата открытия была в договоре с неустойкой - сдали за два дня до срока', 'Вентиляция считалась под мощность кухни, а не «по площади»', 'Все согласования с пожарным надзором вели сами'],
  },
  {
    slug: 'neva', type: 'Квартиры', title: 'Апартаменты Neva Towers', sub: 'Панорама и строгая геометрия', area: '95 м²', term: '4 месяца', budget: '5 100 000 ₽', style: 'Современный',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80',
    lead: 'Апартаменты на высоком этаже с окнами в пол. Всю мебель делали ниже линии подоконника, чтобы не спорить с видом из окна.',
    scope: [['Демонтаж', 'Полный'], ['Стены', 'Гладкая окраска, стыки без видимого шва'], ['Полы', 'Крупноформатный керамогранит по всей площади'], ['Инженерия', 'Скрытые фанкойлы, увлажнение воздуха'], ['Шторы', 'Электрокарнизы, два слоя'], ['Мебель', 'Низкий корпус по периметру окон']],
    used: ['Керамогранит 160×320', 'Микроцемент', 'Латунные профили', 'Ткань, лён'],
    notes: ['Подъём плит 160×320 на 47 этаж - отдельная логистика и такелаж', 'Электрокарнизы закладывали в потолок до финишной отделки', 'Увлажнение воздуха обязательно: на высоте зимой очень сухо'],
  },
  {
    slug: 'serebryany', type: 'Дома', title: 'Вилла «Серебряный Бор»', sub: 'Слияние с природой', area: '600 м²', term: '14 месяцев', budget: '32 500 000 ₽', style: 'Органика',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=80',
    lead: 'Самый большой наш объект. Дом стоит в сосновом лесу, поэтому вся палитра собрана из того, что видно из окон: кора, песок, хвоя, камень.',
    scope: [['Черновые работы', 'Полный цикл, включая цоколь'], ['Фасадная столярка', 'Панорамные системы в тёплом алюминии'], ['Инженерия', 'Тепловой насос, рекуперация, водоподготовка'], ['Отделка', 'Микроцемент, дерево, натуральный камень'], ['Бассейн', 'Переливной, зона релакса и хамам'], ['Территория', 'Террасы, дорожки, ландшафтный свет']],
    used: ['Микроцемент', 'Лиственница, термообработка', 'Сланец', 'Тепловой насос'],
    notes: ['Работали круглый год: зимой внутри, летом - фасады и территория', 'Хамам делала профильная бригада, мы вели по срокам и стыкам', 'Ландшафтный свет закладывали до посадок, иначе пришлось бы копать заново'],
  },
];

/* Образцы материалов рисуются кодом: получается выкладка,
   а не фотографии с фотостока. */
const materials: { label: string; origin: string; css: string }[] = [
  {
    label: 'Натуральный камень', origin: 'Италия · Испания',
    css: 'linear-gradient(122deg,#E8E4DC 0%,#D8D2C7 38%,#EFEBE4 52%,#CFC8BB 70%,#E4DFD6 100%), repeating-linear-gradient(58deg,rgba(90,84,76,0.13) 0 1px,transparent 1px 22px)',
  },
  {
    label: 'Инженерная доска', origin: 'Австрия',
    css: 'repeating-linear-gradient(92deg,#7A5636 0 7px,#8A6440 7px 11px,#6E4C2F 11px 15px,#835D3B 15px 26px)',
  },
  {
    label: 'Микроцемент', origin: 'Собственное нанесение',
    css: 'radial-gradient(120% 90% at 24% 18%,#8E8A84 0%,#6E6A65 55%,#57534E 100%)',
  },
  {
    label: 'Латунь, состаренная', origin: 'Германия',
    css: 'linear-gradient(105deg,#8A6E38 0%,#C9A465 22%,#EEDCA6 40%,#A98A47 58%,#D9BE7C 76%,#8C6F3A 100%)',
  },
  {
    label: 'Керамогранит 120×260', origin: 'Италия',
    css: 'linear-gradient(160deg,#2E2C2A 0%,#3B3835 40%,#252321 72%,#343130 100%), repeating-linear-gradient(24deg,rgba(230,225,215,0.07) 0 1px,transparent 1px 30px)',
  },
  {
    label: 'Текстиль, лён', origin: 'Бельгия',
    css: 'repeating-linear-gradient(0deg,#A79B87 0 2px,#B3A794 2px 4px), repeating-linear-gradient(90deg,rgba(90,82,68,0.24) 0 2px,transparent 2px 4px)',
  },
];

const reviews = [
  { name: 'Михаил Воронцов', role: 'ЖК «Символ», 140 м²', text: 'Ремонт всегда казался мне стихией, которую нельзя контролировать. Оказалось, можно: график, отчёты каждый день и ни одного просроченного дня.' },
  { name: 'Анна Смирнова', role: 'Резиденция «Жуковка», 450 м²', text: 'Мы жили за границей весь период работ и видели объект только по фото. Приехали - всё ровно так, как договаривались, включая мелочи.' },
  { name: 'Евгений Лебедев', role: 'ЖК «Садовые Кварталы», 110 м²', text: 'Отдельно скажу про инженерию: умный дом собрали так, что им пользуется даже моя мама. Это, наверное, лучший комплимент.' },
];

const packages = [
  {
    name: 'Classic', num: '01', price: 'от 14 900', unit: '₽ / м²',
    desc: 'Чистовая отделка по готовому проекту. Для тех, кто уже знает, чего хочет.',
    features: ['Возведение перегородок', 'Базовая инженерия', 'Выравнивание по маякам', 'Плитка и напольные покрытия', 'Окраска стен'],
    accent: false,
  },
  {
    name: 'Prestige', num: '02', price: 'от 24 900', unit: '₽ / м²',
    desc: 'Капитальный ремонт бизнес-класса: сложная электрика, крупный формат, шумоизоляция.',
    features: ['Всё из Classic', 'Многоуровневые потолки', 'Защита от протечек', 'Шумоизоляция стен и пола', 'Крупноформатный керамогранит'],
    accent: true,
  },
  {
    name: 'Bespoke', num: '03', price: 'по смете', unit: '',
    desc: 'Авторский ремонт без ограничений по сложности. Камень, столярка на заказ, умный дом.',
    features: ['Всё из Prestige', 'Интеграция умного дома', 'Работа с натуральным камнем', 'Столярка по чертежам', 'Непрерывный авторский надзор'],
    accent: false,
  },
];

const priceList: [string, string][] = [
  ['Демонтажные работы', 'от 1 100 ₽/м²'],
  ['Возведение перегородок', 'от 1 900 ₽/м²'],
  ['Электромонтаж, точка', 'от 1 300 ₽'],
  ['Штукатурка по маякам', 'от 900 ₽/м²'],
  ['Стяжка пола', 'от 850 ₽/м²'],
  ['Укладка керамогранита', 'от 2 400 ₽/м²'],
  ['Крупный формат, от 120 см', 'от 4 100 ₽/м²'],
  ['Окраска стен, два слоя', 'от 700 ₽/м²'],
  ['Укладка инженерной доски', 'от 1 200 ₽/м²'],
  ['Монтаж скрытых дверей', 'от 12 000 ₽/шт.'],
];

const faqs = [
  { q: 'Как формируется итоговая стоимость?', a: 'После выезда инженера и составления детальной сметы. Сумма фиксируется в договоре и не меняется до конца работ. Всё, что нельзя посчитать заранее, мы называем вслух до подписания, а не после.' },
  { q: 'Есть ли гарантия?', a: 'Пять лет на инженерные и отделочные работы. Гарантийное обращение закрываем выездом в течение трёх дней, а не перепиской.' },
  { q: 'Смогу ли я контролировать процесс удалённо?', a: 'Да. Персональный менеджер выкладывает фото и видео каждый день в общий чат. Скрытые работы принимаем на видеосвязи, до того как их закроют.' },
  { q: 'Вы закупаете черновые материалы?', a: 'Да, снабжение объекта полностью на нас. Чистовые материалы выбираете вы - мы даём спецификацию и сопровождаем в салоны.' },
  { q: 'Поможете с перепланировкой?', a: 'Берём на себя весь цикл согласования, включая проект и походы в инстанции. Обычно это три-четыре месяца, и работы идут параллельно.' },
];

/* ────────────────────────── помощники ────────────────────────── */

function useSeen<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (typeof IntersectionObserver === 'undefined') { setSeen(true); return; }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setSeen(true)),
      { rootMargin: '-40px 0px -8% 0px' }
    );
    io.observe(el);
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
        transform: seen ? 'none' : 'translateY(26px)',
        transition: `opacity .85s cubic-bezier(.22,1,.36,1) ${delay}s, transform .85s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* Надпись-рубрика: тонкая линия, номер и название раздела. */
function Rubric({ num, text, center = false }: { num: string; text: string; center?: boolean }) {
  return (
    <div className={`flex items-center gap-4 ${center ? 'justify-center' : ''}`}>
      <span className="h-px w-10" style={{ background: SAGE }} />
      <span className="font-jost text-[10px] uppercase tracking-[0.34em]" style={{ color: SAGE }}>
        {num} — {text}
      </span>
    </div>
  );
}

/* ────────── «Было / Стало»: шторку двигает человек ────────── */

function BeforeAfter({
  before, after, labelBefore = 'Было', labelAfter = 'Стало',
}: { before: string; after: string; labelBefore?: string; labelAfter?: string }) {
  const [pos, setPos] = useState(46);
  const [dragging, setDragging] = useState(false);
  const box = useRef<HTMLDivElement | null>(null);
  const active = useRef(false);
  const { ref: seenRef, seen } = useSeen<HTMLDivElement>();

  const setFromX = (clientX: number) => {
    const el = box.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(3, Math.min(97, ((clientX - r.left) / r.width) * 100)));
  };

  useEffect(() => {
    const move = (e: PointerEvent) => { if (active.current) setFromX(e.clientX); };
    const up = () => { active.current = false; setDragging(false); };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
  }, []);

  const key = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); setPos((p) => Math.max(3, p - 4)); }
    if (e.key === 'ArrowRight') { e.preventDefault(); setPos((p) => Math.min(97, p + 4)); }
  };

  return (
    <div ref={seenRef}>
      <div
        ref={box}
        onPointerDown={(e) => { active.current = true; setDragging(true); setFromX(e.clientX); }}
        className="relative w-full overflow-hidden cursor-ew-resize select-none touch-none"
        style={{
          aspectRatio: '16/10',
          border: `1px solid ${iv(0.14)}`,
          opacity: seen ? 1 : 0,
          transform: seen ? 'none' : 'translateY(26px)',
          transition: 'opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1)',
        }}
      >
        {/* стало */}
        <img src={after} alt="После ремонта" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        {/* было */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img
            src={before} alt="До ремонта"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'grayscale(0.72) contrast(1.04) brightness(0.8)' }}
            draggable={false}
          />
          <div className="absolute inset-0" style={{ background: 'rgba(18,16,14,0.28)' }} />
        </div>

        {/* подписи */}
        <span
          className="absolute top-4 left-4 font-jost text-[10px] uppercase tracking-[0.28em] px-3 py-1.5 pointer-events-none"
          style={{ background: 'rgba(18,16,14,0.72)', color: iv(0.8), opacity: pos > 16 ? 1 : 0, transition: 'opacity .2s' }}
        >
          {labelBefore}
        </span>
        <span
          className="absolute top-4 right-4 font-jost text-[10px] uppercase tracking-[0.28em] px-3 py-1.5 pointer-events-none"
          style={{ background: 'rgba(18,16,14,0.72)', color: SAGE, opacity: pos < 84 ? 1 : 0, transition: 'opacity .2s' }}
        >
          {labelAfter}
        </span>

        {/* шторка */}
        <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: `${pos}%`, width: 2, background: IVORY, transform: 'translateX(-1px)' }} />
        <button
          type="button"
          onKeyDown={key}
          aria-label="Сдвиньте, чтобы сравнить до и после"
          className="absolute top-1/2 grid place-items-center rounded-full focus:outline-none"
          style={{
            left: `${pos}%`,
            transform: 'translate(-50%,-50%)',
            width: 54, height: 54,
            background: dragging ? SAGE : IVORY,
            color: BG,
            boxShadow: '0 8px 30px rgba(0,0,0,0.45)',
            transition: 'background .2s',
          }}
        >
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden="true">
            <path d="M7 1 1 7l6 6M15 1l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <p className="mt-3 font-jost text-[11px] uppercase tracking-[0.24em] text-center" style={{ color: iv(0.35) }}>
        Потяните за круг
      </p>
    </div>
  );
}

/* ────────────────────────── страница ────────────────────────── */

export default function ArtelInteriors() {
  const [hash, setHash] = useState(() => (typeof window !== 'undefined' ? window.location.hash : ROOT));
  const [filter, setFilter] = useState('Все');
  const [reviewIdx, setReviewIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const sync = () => { setHash(window.location.hash); setMenu(false); };
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const slug = hash.startsWith(ROOT + '/work/') ? hash.split('/work/')[1] : null;
  const current = works.find((w) => w.slug === slug) || null;
  const page = current ? 'work' : hash.startsWith(ROOT + '/works') ? 'works' : hash.startsWith(ROOT + '/services') ? 'services' : 'home';

  const go = (e: React.MouseEvent, to: string) => { e.preventDefault(); window.location.hash = to; window.scrollTo(0, 0); setMenu(false); };
  const jump = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenu(false);
    if (page !== 'home') { window.location.hash = ROOT; setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 70); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const types = ['Все', ...Array.from(new Set(works.map((w) => w.type)))];
  const shown = filter === 'Все' ? works : works.filter((w) => w.type === filter);
  const review = reviews[reviewIdx];

  const DISPLAY = 'font-bodoni leading-[0.95]';
  const LABEL = 'font-jost text-[10px] uppercase tracking-[0.3em]';
  const btnBase = 'inline-flex items-center justify-center font-jost text-[11px] uppercase tracking-[0.24em] transition-all duration-300';
  const btnFill = `${btnBase} px-9 py-4`;
  const btnLine = `${btnBase} px-9 py-4`;

  const navItems: [string, string][] = [
    ['Портфолио', ROOT + '/works'],
    ['Услуги и цены', ROOT + '/services'],
  ];

  return (
    <div className="relative min-h-screen font-jost overflow-x-clip" style={{ background: BG, color: IVORY }}>
      {/* зерно */}
      <div
        className="pointer-events-none fixed inset-0 z-[80] opacity-[0.055] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ── шапка ── */}
      <header className="sticky top-0 z-[70] backdrop-blur-lg" style={{ background: 'rgba(18,16,14,0.86)', borderBottom: `1px solid ${iv(0.1)}` }}>
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-5 flex items-center justify-between gap-6 pl-20 md:pl-24">
          <a href={ROOT} onClick={(e) => go(e, ROOT)} className="shrink-0 leading-none">
            <span className="font-bodoni text-[24px] tracking-[0.16em] uppercase">Artel</span>
            <span className={`${LABEL} block mt-1`} style={{ color: iv(0.38) }}>интерьеры</span>
          </a>

          <nav className="hidden md:flex items-center gap-9">
            {navItems.map(([t, href]) => {
              const on = hash.startsWith(href);
              return (
                <a
                  key={t} href={href} onClick={(e) => go(e, href)}
                  className="font-jost text-[11px] uppercase tracking-[0.22em] transition-colors"
                  style={{ color: on ? SAGE : iv(0.62) }}
                >
                  {t}
                </a>
              );
            })}
            <a href="#process" onClick={(e) => jump(e, 'process')} className="font-jost text-[11px] uppercase tracking-[0.22em] transition-colors" style={{ color: iv(0.62) }}>Процесс</a>
            <a href="#contact" onClick={(e) => jump(e, 'contact')} className="font-jost text-[11px] uppercase tracking-[0.22em] transition-colors" style={{ color: iv(0.62) }}>Контакты</a>
          </nav>

          <div className="flex items-center gap-3">
            <a href="#contact" onClick={(e) => jump(e, 'contact')} className={`${btnBase} px-6 py-3 hidden sm:inline-flex`} style={{ background: SAGE, color: BG }}>
              Бесплатный замер
            </a>
            <button type="button"
              onClick={() => setMenu((v) => !v)}
              className="md:hidden w-10 h-10 grid place-items-center"
              style={{ border: `1px solid ${iv(0.18)}` }}
              aria-label="Меню"
              aria-expanded={menu}
            >
              <span className="block w-4" style={{ borderTop: `1px solid ${IVORY}`, borderBottom: `1px solid ${IVORY}`, height: 7 }} />
            </button>
          </div>
        </div>

        {menu && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ borderTop: `1px solid ${iv(0.1)}` }}>
            {navItems.map(([t, href]) => (
              <a key={t} href={href} onClick={(e) => go(e, href)} className="font-jost text-[13px] uppercase tracking-[0.2em] pt-4" style={{ color: iv(0.75) }}>{t}</a>
            ))}
            <a href="#process" onClick={(e) => jump(e, 'process')} className="font-jost text-[13px] uppercase tracking-[0.2em]" style={{ color: iv(0.75) }}>Процесс</a>
            <a href="#contact" onClick={(e) => jump(e, 'contact')} className="font-jost text-[13px] uppercase tracking-[0.2em]" style={{ color: iv(0.75) }}>Контакты</a>
          </div>
        )}
      </header>

      {/* ═════════════════════ ГЛАВНАЯ ═════════════════════ */}
      {page === 'home' && (
        <>
          {/* обложка */}
          <section className="relative">
            <div className="relative h-[74vh] min-h-[520px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=80"
                alt="" aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'saturate(0.82) contrast(1.05) brightness(0.72)' }}
              />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${BG} 4%, rgba(18,16,14,0.55) 45%, rgba(18,16,14,0.35) 100%)` }} />

              <div className="relative h-full max-w-[1360px] mx-auto px-6 md:px-10 flex flex-col justify-end pb-16 md:pb-20">
                <div className="flex items-center gap-4 mb-7">
                  <span className="h-px w-14" style={{ background: SAGE }} />
                  <span className={LABEL} style={{ color: SAGE }}>Ремонт под ключ · Москва и область</span>
                </div>

                <h1 className={DISPLAY} style={{ fontSize: 'clamp(44px,7.6vw,104px)', letterSpacing: '-0.015em' }}>
                  Ремонт, который<br />
                  <em style={{ color: SAGE }}>заканчивается</em> в срок
                </h1>

                <p className="mt-8 max-w-[54ch] text-[17px] leading-[1.8]" style={{ color: iv(0.68) }}>
                  Фиксированная смета, ежедневные отчёты с объекта и неустойка за каждый день
                  просрочки в договоре. За последние три года мы не сорвали ни одного срока.
                </p>

                <div className="mt-10 flex flex-wrap gap-3.5">
                  <a href="#contact" onClick={(e) => jump(e, 'contact')} className={btnFill} style={{ background: IVORY, color: BG }}>Вызвать замерщика</a>
                  <a href={ROOT + '/works'} onClick={(e) => go(e, ROOT + '/works')} className={btnLine} style={{ border: `1px solid ${iv(0.32)}`, color: IVORY }}>Смотреть работы</a>
                </div>
              </div>
            </div>

            <div className="max-w-[1360px] mx-auto px-6 md:px-10">
              <div className="grid grid-cols-1 sm:grid-cols-3" style={{ borderTop: `1px solid ${iv(0.12)}` }}>
                {heroStats.map(([v, l], i) => (
                  <Up key={l} delay={i * 0.08}>
                    <div className="py-8 sm:pr-8" style={i ? { borderLeft: `1px solid ${iv(0.1)}`, paddingLeft: 32 } : undefined}>
                      <div className="font-bodoni text-[38px] md:text-[52px] leading-none">{v}</div>
                      <div className={`${LABEL} mt-3`} style={{ color: iv(0.42) }}>{l}</div>
                    </div>
                  </Up>
                ))}
              </div>
            </div>
          </section>

          {/* было / стало */}
          <section className="px-6 md:px-10 py-20 md:py-28">
            <div className="max-w-[1360px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">
                <Up>
                  <Rubric num="01" text="Разница" />
                  <h2 className={`${DISPLAY} mt-7`} style={{ fontSize: 'clamp(34px,4.8vw,58px)' }}>
                    Ремонт продаётся<br />не словами,<br /><em style={{ color: SAGE }}>а разницей</em>
                  </h2>
                  <p className="mt-8 text-[15.5px] leading-[1.85] max-w-[46ch]" style={{ color: iv(0.6) }}>
                    Квартира в ЖК «Символ», 140 м². Слева - то, что мы приняли: бетон,
                    старая проводка и три ошибки в геометрии стен. Справа - то, что сдали
                    через пять месяцев.
                  </p>
                  <div className="mt-8 flex flex-col gap-3">
                    {[['Срок по договору', '5 месяцев'], ['Фактический срок', '5 месяцев'], ['Отклонение сметы', '0 ₽']].map(([k, v]) => (
                      <div key={k} className="flex justify-between items-baseline gap-6 py-3" style={{ borderTop: `1px solid ${iv(0.1)}` }}>
                        <span className={LABEL} style={{ color: iv(0.42) }}>{k}</span>
                        <span className="font-bodoni text-[20px]" style={{ color: SAGE }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </Up>

                <BeforeAfter
                  before="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80"
                  after="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80"
                />
              </div>
            </div>
          </section>

          {/* принципы */}
          <section className="px-6 md:px-10 py-20 md:py-28" style={{ background: PANEL, borderTop: `1px solid ${iv(0.08)}`, borderBottom: `1px solid ${iv(0.08)}` }}>
            <div className="max-w-[1360px] mx-auto">
              <Up className="mb-14">
                <Rubric num="02" text="Принципы" />
                <div className="mt-7 flex flex-wrap items-end justify-between gap-8">
                  <h2 className={DISPLAY} style={{ fontSize: 'clamp(34px,4.8vw,58px)' }}>Почему нам<br />доверяют объект</h2>
                  <p className="text-[15px] leading-[1.8] max-w-[40ch]" style={{ color: iv(0.55) }}>
                    Каждый пункт ниже - это строка в договоре, а не обещание на сайте.
                    Попросите договор до замера, мы пришлём.
                  </p>
                </div>
              </Up>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
                {reasons.map((r, i) => (
                  <Up key={r.num} delay={i * 0.06}>
                    <div className="pt-6" style={{ borderTop: `1px solid ${iv(0.14)}` }}>
                      <div className="font-bodoni text-[34px] leading-none mb-4" style={{ color: SAGE }}>{r.num}</div>
                      <h3 className="font-bodoni text-[23px] mb-3">{r.title}</h3>
                      <p className="text-[14px] leading-[1.8]" style={{ color: iv(0.55) }}>{r.desc}</p>
                    </div>
                  </Up>
                ))}
              </div>
            </div>
          </section>

          {/* портфолио: журнальная раскладка */}
          <section className="px-6 md:px-10 py-20 md:py-28">
            <div className="max-w-[1360px] mx-auto">
              <Up className="mb-14">
                <Rubric num="03" text="Работы" />
                <div className="mt-7 flex flex-wrap items-end justify-between gap-6">
                  <h2 className={DISPLAY} style={{ fontSize: 'clamp(34px,4.8vw,58px)' }}>Избранные<br /><em style={{ color: SAGE }}>объекты</em></h2>
                  <a href={ROOT + '/works'} onClick={(e) => go(e, ROOT + '/works')} className="font-jost text-[11px] uppercase tracking-[0.24em] pb-2" style={{ color: SAGE, borderBottom: `1px solid ${SAGE}` }}>
                    Всё портфолио →
                  </a>
                </div>
              </Up>

              <div className="flex flex-col gap-16 md:gap-24">
                {works.slice(0, 3).map((w, i) => {
                  const flip = i % 2 === 1;
                  return (
                    <Up key={w.slug} delay={0.04}>
                      <a
                        href={`${ROOT}/work/${w.slug}`} onClick={(e) => go(e, `${ROOT}/work/${w.slug}`)}
                        className={`group grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr] gap-8 lg:gap-12 items-center ${flip ? 'lg:[direction:rtl]' : ''}`}
                      >
                        <div className="relative overflow-hidden lg:[direction:ltr]" style={{ aspectRatio: '16/10' }}>
                          <img
                            src={w.img} alt={w.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1100ms] group-hover:scale-[1.05]"
                            style={{ filter: 'saturate(0.88) brightness(0.92)' }}
                          />
                          <span className="absolute bottom-4 left-4 font-jost text-[10px] uppercase tracking-[0.26em] px-3 py-1.5" style={{ background: 'rgba(18,16,14,0.76)', color: SAGE }}>
                            {w.type}
                          </span>
                        </div>
                        <div className="lg:[direction:ltr]">
                          <div className={LABEL} style={{ color: iv(0.35) }}>{String(i + 1).padStart(2, '0')} / {w.style}</div>
                          <h3 className="font-bodoni text-[30px] md:text-[38px] leading-[1.05] mt-4 mb-3">{w.title}</h3>
                          <p className="text-[14.5px] leading-[1.75] mb-6" style={{ color: iv(0.55) }}>{w.sub}. {w.area}, срок {w.term}.</p>
                          <span className="inline-flex items-center gap-3 font-jost text-[11px] uppercase tracking-[0.24em] transition-colors" style={{ color: SAGE }}>
                            Смотреть проект
                            <span className="transition-transform group-hover:translate-x-1.5">→</span>
                          </span>
                        </div>
                      </a>
                    </Up>
                  );
                })}
              </div>
            </div>
          </section>

          {/* материалы */}
          <section className="px-6 md:px-10 py-20 md:py-28" style={{ background: PANEL, borderTop: `1px solid ${iv(0.08)}`, borderBottom: `1px solid ${iv(0.08)}` }}>
            <div className="max-w-[1360px] mx-auto">
              <Up className="mb-14">
                <Rubric num="04" text="Материалы" />
                <div className="mt-7 flex flex-wrap items-end justify-between gap-8">
                  <h2 className={DISPLAY} style={{ fontSize: 'clamp(34px,4.8vw,58px)' }}>С чем<br />работаем</h2>
                  <p className="text-[15px] leading-[1.8] max-w-[40ch]" style={{ color: iv(0.55) }}>
                    Мы не навязываем поставщиков. Но если выбираете сами - вот база,
                    на которой мы уверены в результате и даём гарантию.
                  </p>
                </div>
              </Up>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {materials.map((m, i) => (
                  <Up key={m.label} delay={i * 0.05}>
                    <div className="group cursor-default">
                      <div
                        className="w-full transition-transform duration-500 group-hover:-translate-y-2"
                        style={{ aspectRatio: '3/4', background: m.css, boxShadow: '0 18px 40px -18px rgba(0,0,0,0.7)' }}
                      />
                      <div className="mt-4">
                        <div className="font-bodoni text-[16px] leading-tight">{m.label}</div>
                        <div className={`${LABEL} mt-2`} style={{ color: iv(0.38) }}>{m.origin}</div>
                      </div>
                    </div>
                  </Up>
                ))}
              </div>
            </div>
          </section>

          {/* процесс */}
          <section id="process" className="px-6 md:px-10 py-20 md:py-28 scroll-mt-24">
            <div className="max-w-[1100px] mx-auto">
              <Up className="mb-14">
                <Rubric num="05" text="Процесс" />
                <h2 className={`${DISPLAY} mt-7`} style={{ fontSize: 'clamp(34px,4.8vw,58px)' }}>Как проходит<br /><em style={{ color: SAGE }}>работа</em></h2>
              </Up>

              <div className="relative">
                <div className="absolute left-[27px] top-2 bottom-2 w-px hidden sm:block" style={{ background: iv(0.12) }} />
                <div className="flex flex-col gap-10">
                  {steps.map((s, i) => (
                    <Up key={s.t} delay={i * 0.05}>
                      <div className="flex gap-6 sm:gap-8 items-start">
                        <span
                          className="shrink-0 w-14 h-14 rounded-full grid place-items-center font-bodoni text-[18px] relative z-10"
                          style={{ background: BG, border: `1px solid ${i === 0 ? SAGE : iv(0.2)}`, color: i === 0 ? SAGE : IVORY }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div className="pt-2.5">
                          <h3 className="font-bodoni text-[24px] mb-2">{s.t}</h3>
                          <p className="text-[14.5px] leading-[1.8] max-w-[56ch]" style={{ color: iv(0.55) }}>{s.d}</p>
                        </div>
                      </div>
                    </Up>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* отзыв */}
          <section className="px-6 md:px-10 py-20 md:py-28" style={{ background: PANEL, borderTop: `1px solid ${iv(0.08)}`, borderBottom: `1px solid ${iv(0.08)}` }}>
            <div className="max-w-[980px] mx-auto text-center">
              <Up>
                <Rubric num="06" text="Отзывы" center />
                <blockquote className="font-bodoni mt-10 mb-10" style={{ fontSize: 'clamp(24px,3.4vw,40px)', lineHeight: 1.32, fontStyle: 'italic' }}>
                  «{review.text}»
                </blockquote>
                <div className="font-bodoni text-[19px]">{review.name}</div>
                <div className={`${LABEL} mt-2`} style={{ color: iv(0.4) }}>{review.role}</div>

                <div className="flex justify-center gap-3 mt-10">
                  {reviews.map((r, i) => (
                    <button type="button"
                      key={r.name} onClick={() => setReviewIdx(i)}
                      aria-label={`Отзыв ${i + 1}`}
                      className="h-[3px] transition-all duration-300"
                      style={{ width: i === reviewIdx ? 44 : 18, background: i === reviewIdx ? SAGE : iv(0.22) }}
                    />
                  ))}
                </div>
              </Up>
            </div>
          </section>

          {/* пакеты */}
          <section className="px-6 md:px-10 py-20 md:py-28">
            <div className="max-w-[1360px] mx-auto">
              <Up className="mb-14">
                <Rubric num="07" text="Пакеты" />
                <div className="mt-7 flex flex-wrap items-end justify-between gap-6">
                  <h2 className={DISPLAY} style={{ fontSize: 'clamp(34px,4.8vw,58px)' }}>Три уровня<br />отделки</h2>
                  <a href={ROOT + '/services'} onClick={(e) => go(e, ROOT + '/services')} className="font-jost text-[11px] uppercase tracking-[0.24em] pb-2" style={{ color: SAGE, borderBottom: `1px solid ${SAGE}` }}>
                    Прайс по работам →
                  </a>
                </div>
              </Up>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {packages.map((p, i) => (
                  <Up key={p.name} delay={i * 0.08}>
                    <div
                      className="flex flex-col h-full p-9 relative"
                      style={{
                        background: p.accent ? IVORY : PANEL,
                        color: p.accent ? BG : IVORY,
                        border: `1px solid ${p.accent ? IVORY : iv(0.14)}`,
                      }}
                    >
                      <div className={LABEL} style={{ color: p.accent ? 'rgba(18,16,14,0.42)' : iv(0.35) }}>{p.num}</div>
                      <h3 className="font-bodoni text-[34px] mt-3 mb-4">{p.name}</h3>
                      <p className="text-[14px] leading-[1.75] mb-7" style={{ color: p.accent ? 'rgba(18,16,14,0.62)' : iv(0.55) }}>{p.desc}</p>
                      <div className="flex items-baseline gap-2 mb-8">
                        <span className="font-bodoni text-[36px] leading-none" style={{ color: p.accent ? BG : SAGE }}>{p.price}</span>
                        <span className="font-jost text-[12px]" style={{ color: p.accent ? 'rgba(18,16,14,0.5)' : iv(0.42) }}>{p.unit}</span>
                      </div>
                      <div className="flex flex-col flex-1 mb-8">
                        {p.features.map((f) => (
                          <div
                            key={f} className="flex gap-3 text-[13.5px] leading-[1.6] py-3"
                            style={{ borderTop: `1px solid ${p.accent ? 'rgba(18,16,14,0.12)' : iv(0.1)}`, color: p.accent ? 'rgba(18,16,14,0.72)' : iv(0.62) }}
                          >
                            <span className="shrink-0 mt-[8px] w-[5px] h-[5px] rounded-full" style={{ background: p.accent ? BG : SAGE }} />
                            {f}
                          </div>
                        ))}
                      </div>
                      <a
                        href="#contact" onClick={(e) => jump(e, 'contact')}
                        className={`${btnBase} px-6 py-3.5 w-full`}
                        style={p.accent ? { background: BG, color: IVORY } : { border: `1px solid ${iv(0.26)}`, color: IVORY }}
                      >
                        Обсудить
                      </a>
                    </div>
                  </Up>
                ))}
              </div>
            </div>
          </section>

          {/* вопросы */}
          <section className="px-6 md:px-10 py-20 md:py-28" style={{ background: PANEL, borderTop: `1px solid ${iv(0.08)}` }}>
            <div className="max-w-[940px] mx-auto">
              <Up className="mb-12">
                <Rubric num="08" text="Вопросы" />
                <h2 className={`${DISPLAY} mt-7`} style={{ fontSize: 'clamp(32px,4.4vw,52px)' }}>Что спрашивают<br />чаще всего</h2>
              </Up>
              <div className="flex flex-col">
                {faqs.map((f, i) => {
                  const open = openFaq === i;
                  return (
                    <Up key={f.q} delay={i * 0.04}>
                      <div style={{ borderTop: `1px solid ${iv(0.12)}` }}>
                        <button type="button" onClick={() => setOpenFaq(open ? null : i)} className="w-full flex justify-between items-center gap-6 py-7 text-left">
                          <span className="font-bodoni text-[19px] md:text-[24px] leading-snug">{f.q}</span>
                          <span
                            className="shrink-0 w-9 h-9 rounded-full grid place-items-center text-[17px] transition-transform duration-300"
                            style={{ border: `1px solid ${open ? SAGE : iv(0.22)}`, color: open ? SAGE : IVORY, transform: open ? 'rotate(45deg)' : 'none' }}
                          >
                            +
                          </span>
                        </button>
                        <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? 340 : 0, opacity: open ? 1 : 0 }}>
                          <p className="text-[14.5px] leading-[1.9] pb-8 max-w-[70ch]" style={{ color: iv(0.55) }}>{f.a}</p>
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

      {/* ═════════════════════ ПОРТФОЛИО ═════════════════════ */}
      {page === 'works' && (
        <>
          <section className="px-6 md:px-10 pt-16 md:pt-24 pb-10">
            <div className="max-w-[1360px] mx-auto">
              <a href={ROOT} onClick={(e) => go(e, ROOT)} className="inline-block font-jost text-[11px] uppercase tracking-[0.24em] mb-10" style={{ color: iv(0.45) }}>← На главную</a>
              <Rubric num="03" text="Портфолио" />
              <h1 className={`${DISPLAY} mt-7`} style={{ fontSize: 'clamp(42px,7vw,92px)' }}>
                Наши<br /><em style={{ color: SAGE }}>объекты</em>
              </h1>
              <p className="mt-8 max-w-[58ch] text-[16.5px] leading-[1.85]" style={{ color: iv(0.6) }}>
                Шесть проектов, где можно посмотреть состав работ и реальную смету.
                Ни один из них не вышел за срок и за бюджет, зафиксированные в договоре.
              </p>
              <div className="mt-10 flex flex-wrap gap-2.5">
                {types.map((t) => (
                  <button type="button"
                    key={t} onClick={() => setFilter(t)}
                    className="px-6 py-2.5 font-jost text-[11px] uppercase tracking-[0.2em] transition-colors"
                    style={{
                      border: `1px solid ${filter === t ? SAGE : iv(0.18)}`,
                      background: filter === t ? SAGE : 'transparent',
                      color: filter === t ? BG : iv(0.6),
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-10 pb-24">
            <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {shown.map((w, i) => (
                <Up key={w.slug} delay={i * 0.06}>
                  <a
                    href={`${ROOT}/work/${w.slug}`} onClick={(e) => go(e, `${ROOT}/work/${w.slug}`)}
                    className="group block h-full"
                  >
                    <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                      <img
                        src={w.img} alt={w.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1100ms] group-hover:scale-[1.05]"
                        style={{ filter: 'saturate(0.88) brightness(0.92)' }}
                      />
                      <span className="absolute bottom-4 left-4 font-jost text-[10px] uppercase tracking-[0.26em] px-3 py-1.5" style={{ background: 'rgba(18,16,14,0.76)', color: SAGE }}>{w.type}</span>
                    </div>
                    <div className="pt-6">
                      <div className="flex items-baseline justify-between gap-4 flex-wrap">
                        <h3 className="font-bodoni text-[27px] leading-tight">{w.title}</h3>
                        <span className="font-jost text-[11px] uppercase tracking-[0.2em]" style={{ color: iv(0.38) }}>{w.style}</span>
                      </div>
                      <p className="text-[14px] leading-[1.75] mt-3 mb-5" style={{ color: iv(0.55) }}>{w.sub}</p>
                      <div className="grid grid-cols-3 gap-4 pt-5" style={{ borderTop: `1px solid ${iv(0.12)}` }}>
                        {[[w.area, 'площадь'], [w.term, 'срок'], [w.budget, 'бюджет']].map(([v, l], k) => (
                          <div key={l}>
                            <div className="font-bodoni text-[17px]" style={k === 2 ? { color: SAGE } : undefined}>{v}</div>
                            <div className={`${LABEL} mt-1.5`} style={{ color: iv(0.35) }}>{l}</div>
                          </div>
                        ))}
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
      {page === 'work' && current && (
        <>
          <section className="relative">
            <div className="relative h-[62vh] min-h-[420px] overflow-hidden">
              <img src={current.img} alt={current.title} className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'saturate(0.85) brightness(0.72)' }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${BG} 4%, rgba(18,16,14,0.4) 60%, rgba(18,16,14,0.5) 100%)` }} />
              <div className="relative h-full max-w-[1360px] mx-auto px-6 md:px-10 flex flex-col justify-end pb-14">
                <a href={ROOT + '/works'} onClick={(e) => go(e, ROOT + '/works')} className="inline-block font-jost text-[11px] uppercase tracking-[0.24em] mb-8 self-start" style={{ color: iv(0.6) }}>← Все объекты</a>
                <div className={LABEL} style={{ color: SAGE }}>{current.type} · {current.style}</div>
                <h1 className={`${DISPLAY} mt-5`} style={{ fontSize: 'clamp(38px,6.2vw,82px)' }}>{current.title}</h1>
                <p className="mt-5 text-[16px]" style={{ color: iv(0.6) }}>{current.sub}</p>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-10 py-14 md:py-20">
            <div className="max-w-[1360px] mx-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderTop: `1px solid ${iv(0.14)}` }}>
                {[[current.area, 'площадь'], [current.term, 'срок работ'], [current.budget, 'бюджет'], [current.style, 'стилистика']].map(([v, l], i) => (
                  <Up key={l} delay={i * 0.06}>
                    <div className="py-8 pr-6" style={i ? { borderLeft: `1px solid ${iv(0.1)}`, paddingLeft: 28 } : undefined}>
                      <div className="font-bodoni text-[26px] md:text-[32px] leading-none" style={i === 2 ? { color: SAGE } : undefined}>{v}</div>
                      <div className={`${LABEL} mt-3`} style={{ color: iv(0.4) }}>{l}</div>
                    </div>
                  </Up>
                ))}
              </div>

              <Up className="mt-14 max-w-[62ch]">
                <p className="font-bodoni leading-[1.5]" style={{ fontSize: 'clamp(20px,2.4vw,28px)', color: iv(0.85) }}>{current.lead}</p>
              </Up>
            </div>
          </section>

          <section className="px-6 md:px-10 py-16 md:py-24" style={{ background: PANEL, borderTop: `1px solid ${iv(0.08)}`, borderBottom: `1px solid ${iv(0.08)}` }}>
            <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-14">
              <div>
                <Up className="mb-9">
                  <Rubric num="—" text="Состав работ" />
                  <h2 className={`${DISPLAY} mt-6`} style={{ fontSize: 'clamp(28px,3.6vw,40px)' }}>Что делали</h2>
                </Up>
                {current.scope.map(([n, d], i) => (
                  <Up key={n} delay={i * 0.05}>
                    <div className="grid grid-cols-[130px_1fr] gap-6 py-5" style={{ borderTop: `1px solid ${iv(0.12)}` }}>
                      <span className={LABEL} style={{ color: SAGE }}>{n}</span>
                      <span className="text-[14.5px] leading-[1.7]" style={{ color: iv(0.72) }}>{d}</span>
                    </div>
                  </Up>
                ))}
              </div>

              <div>
                <Up className="mb-9">
                  <Rubric num="—" text="Материалы" />
                  <h2 className={`${DISPLAY} mt-6`} style={{ fontSize: 'clamp(28px,3.6vw,40px)' }}>Что легло</h2>
                </Up>
                <div className="flex flex-col gap-3">
                  {current.used.map((u, i) => {
                    const swatch = materials[i % materials.length];
                    return (
                      <Up key={u} delay={i * 0.06}>
                        <div className="flex items-center gap-4 p-3" style={{ border: `1px solid ${iv(0.12)}` }}>
                          <span className="w-12 h-12 shrink-0" style={{ background: swatch.css }} />
                          <span className="text-[14px]" style={{ color: iv(0.75) }}>{u}</span>
                        </div>
                      </Up>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-10 py-16 md:py-24">
            <div className="max-w-[1360px] mx-auto">
              <Up className="mb-10">
                <Rubric num="—" text="Заметки прораба" />
                <h2 className={`${DISPLAY} mt-6`} style={{ fontSize: 'clamp(28px,3.6vw,40px)' }}>Что было<br /><em style={{ color: SAGE }}>непросто</em></h2>
              </Up>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {current.notes.map((n, i) => (
                  <Up key={n} delay={i * 0.07}>
                    <div className="h-full p-7" style={{ background: PANEL_2, borderTop: `2px solid ${SAGE}` }}>
                      <div className="font-bodoni text-[26px] mb-4" style={{ color: SAGE }}>{String(i + 1).padStart(2, '0')}</div>
                      <p className="text-[14.5px] leading-[1.8]" style={{ color: iv(0.6) }}>{n}</p>
                    </div>
                  </Up>
                ))}
              </div>

              <Up className="mt-16">
                <div className={LABEL} style={{ color: iv(0.35) }}>Другие объекты</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                  {works.filter((w) => w.slug !== current.slug).slice(0, 3).map((w) => (
                    <a
                      key={w.slug} href={`${ROOT}/work/${w.slug}`} onClick={(e) => go(e, `${ROOT}/work/${w.slug}`)}
                      className="group block"
                    >
                      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
                        <img src={w.img} alt={w.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-105" style={{ filter: 'saturate(0.85) brightness(0.85)' }} />
                      </div>
                      <div className="font-bodoni text-[20px] mt-4">{w.title}</div>
                      <div className={`${LABEL} mt-2`} style={{ color: iv(0.38) }}>{w.area} · {w.term}</div>
                    </a>
                  ))}
                </div>
              </Up>
            </div>
          </section>
        </>
      )}

      {/* ═════════════════════ УСЛУГИ И ЦЕНЫ ═════════════════════ */}
      {page === 'services' && (
        <>
          <section className="px-6 md:px-10 pt-16 md:pt-24 pb-12">
            <div className="max-w-[1360px] mx-auto">
              <a href={ROOT} onClick={(e) => go(e, ROOT)} className="inline-block font-jost text-[11px] uppercase tracking-[0.24em] mb-10" style={{ color: iv(0.45) }}>← На главную</a>
              <Rubric num="07" text="Услуги и цены" />
              <h1 className={`${DISPLAY} mt-7`} style={{ fontSize: 'clamp(42px,7vw,92px)' }}>
                Что делаем<br />и <em style={{ color: SAGE }}>сколько стоит</em>
              </h1>
              <p className="mt-8 max-w-[60ch] text-[16.5px] leading-[1.85]" style={{ color: iv(0.6) }}>
                Расценки открытые - можно построчно сравнить нашу смету с любой другой.
                Итоговая цифра зависит от состояния объекта и считается после замера.
              </p>
            </div>
          </section>

          <section className="px-6 md:px-10 pb-20">
            <div className="max-w-[1360px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, i) => (
                <Up key={s.title} delay={i * 0.06}>
                  <div className="group h-full" style={{ border: `1px solid ${iv(0.12)}` }}>
                    <div className="relative overflow-hidden" style={{ aspectRatio: '16/11' }}>
                      <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-105" style={{ filter: 'saturate(0.85) brightness(0.85)' }} />
                    </div>
                    <div className="p-7">
                      <h3 className="font-bodoni text-[23px] mb-3">{s.title}</h3>
                      <p className="text-[14px] leading-[1.75]" style={{ color: iv(0.55) }}>{s.desc}</p>
                    </div>
                  </div>
                </Up>
              ))}
            </div>
          </section>

          <section className="px-6 md:px-10 py-20" style={{ background: PANEL, borderTop: `1px solid ${iv(0.08)}`, borderBottom: `1px solid ${iv(0.08)}` }}>
            <div className="max-w-[1000px] mx-auto">
              <Up className="mb-12">
                <Rubric num="—" text="Прайс по работам" />
                <h2 className={`${DISPLAY} mt-6`} style={{ fontSize: 'clamp(30px,4vw,46px)' }}>Расценки</h2>
              </Up>
              {priceList.map(([n, p], i) => (
                <Up key={n} delay={i * 0.03}>
                  <div className="flex justify-between items-baseline gap-6 py-5" style={{ borderTop: `1px solid ${iv(0.12)}` }}>
                    <span className="text-[15px] flex items-baseline gap-4">
                      <span className="font-jost text-[11px]" style={{ color: iv(0.3) }}>{String(i + 1).padStart(2, '0')}</span>
                      {n}
                    </span>
                    <span className="font-bodoni text-[19px] whitespace-nowrap" style={{ color: SAGE }}>{p}</span>
                  </div>
                </Up>
              ))}
              <Up delay={0.3}>
                <p className="text-[13.5px] leading-[1.8] mt-8 max-w-[68ch]" style={{ color: iv(0.42) }}>
                  Цены указаны за работу без стоимости материалов. Черновые материалы закупаем мы,
                  чистовые выбираете вы - по спецификации, которую мы готовим на этапе проекта.
                </p>
              </Up>
            </div>
          </section>

          <section className="px-6 md:px-10 py-20 md:py-28">
            <div className="max-w-[1360px] mx-auto">
              <Up className="mb-12">
                <Rubric num="—" text="Пакеты" />
                <h2 className={`${DISPLAY} mt-6`} style={{ fontSize: 'clamp(30px,4vw,46px)' }}>Три уровня отделки</h2>
              </Up>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {packages.map((p, i) => (
                  <Up key={p.name} delay={i * 0.08}>
                    <div
                      className="flex flex-col h-full p-9"
                      style={{
                        background: p.accent ? IVORY : PANEL,
                        color: p.accent ? BG : IVORY,
                        border: `1px solid ${p.accent ? IVORY : iv(0.14)}`,
                      }}
                    >
                      <div className={LABEL} style={{ color: p.accent ? 'rgba(18,16,14,0.42)' : iv(0.35) }}>{p.num}</div>
                      <h3 className="font-bodoni text-[34px] mt-3 mb-4">{p.name}</h3>
                      <p className="text-[14px] leading-[1.75] mb-7" style={{ color: p.accent ? 'rgba(18,16,14,0.62)' : iv(0.55) }}>{p.desc}</p>
                      <div className="flex items-baseline gap-2 mb-8">
                        <span className="font-bodoni text-[36px] leading-none" style={{ color: p.accent ? BG : SAGE }}>{p.price}</span>
                        <span className="font-jost text-[12px]" style={{ color: p.accent ? 'rgba(18,16,14,0.5)' : iv(0.42) }}>{p.unit}</span>
                      </div>
                      <div className="flex flex-col flex-1 mb-8">
                        {p.features.map((f) => (
                          <div
                            key={f} className="flex gap-3 text-[13.5px] leading-[1.6] py-3"
                            style={{ borderTop: `1px solid ${p.accent ? 'rgba(18,16,14,0.12)' : iv(0.1)}`, color: p.accent ? 'rgba(18,16,14,0.72)' : iv(0.62) }}
                          >
                            <span className="shrink-0 mt-[8px] w-[5px] h-[5px] rounded-full" style={{ background: p.accent ? BG : SAGE }} />
                            {f}
                          </div>
                        ))}
                      </div>
                      <a
                        href="#contact" onClick={(e) => jump(e, 'contact')}
                        className={`${btnBase} px-6 py-3.5 w-full`}
                        style={p.accent ? { background: BG, color: IVORY } : { border: `1px solid ${iv(0.26)}`, color: IVORY }}
                      >
                        Обсудить
                      </a>
                    </div>
                  </Up>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ═════════════════════ КОНТАКТЫ ═════════════════════ */}
      <section id="contact" className="px-6 md:px-10 py-20 md:py-28 scroll-mt-24" style={{ borderTop: `1px solid ${iv(0.1)}` }}>
        <Up className="max-w-[860px] mx-auto text-center">
          <Rubric num="09" text="Первый шаг" center />
          <h2 className={`${DISPLAY} mt-8`} style={{ fontSize: 'clamp(34px,5.2vw,62px)' }}>
            Замер и смета -<br /><em style={{ color: SAGE }}>бесплатно</em>
          </h2>
          <p className="text-[15.5px] mt-7 mb-10 max-w-[52ch] mx-auto leading-[1.85]" style={{ color: iv(0.58) }}>
            Инженер приедет на объект, снимет размеры и через два дня привезёт смету
            с фиксированной ценой. Даже если работать вы потом решите не с нами.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 5000); }}
            className="flex gap-3 max-w-[540px] mx-auto flex-wrap"
          >
            <input
              required type="tel" placeholder="+7 (___) ___-__-__"
              className="flex-1 min-w-[220px] bg-transparent px-6 py-4 text-[14.5px] outline-none transition-colors"
              style={{ border: `1px solid ${iv(0.22)}`, color: IVORY }}
              onFocus={(e) => { e.currentTarget.style.borderColor = SAGE; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = iv(0.22); }}
            />
            <button type="submit" className={btnFill} style={{ background: SAGE, color: BG }}>Записаться</button>
          </form>
          {sent && <p className="mt-5 font-jost text-[11px] uppercase tracking-[0.22em]" style={{ color: SAGE }}>Заявка принята. Менеджер перезвонит в течение получаса.</p>}
        </Up>
      </section>

      {/* ═════════════════════ ПОДВАЛ ═════════════════════ */}
      <footer className="px-6 md:px-10 pt-16 pb-10" style={{ background: PANEL, borderTop: `1px solid ${iv(0.1)}` }}>
        <div className="max-w-[1360px] mx-auto flex flex-wrap justify-between gap-12 mb-12">
          <div className="max-w-[300px]">
            <div className="font-bodoni text-[26px] tracking-[0.16em] uppercase mb-4">Artel</div>
            <p className="text-[13.5px] leading-[1.8]" style={{ color: iv(0.45) }}>
              Ремонт и интерьеры под ключ. Фиксированная смета, свои бригады,
              гарантия пять лет.
            </p>
          </div>
          <div>
            <h4 className={LABEL} style={{ color: iv(0.35) }}>Разделы</h4>
            <div className="flex flex-col gap-3 text-[13.5px] mt-5" style={{ color: iv(0.6) }}>
              <a href={ROOT + '/works'} onClick={(e) => go(e, ROOT + '/works')} className="hover:text-white transition-colors active:brightness-95 active:duration-75">Портфолио</a>
              <a href={ROOT + '/services'} onClick={(e) => go(e, ROOT + '/services')} className="hover:text-white transition-colors active:brightness-95 active:duration-75">Услуги и цены</a>
              <a href="#process" onClick={(e) => jump(e, 'process')} className="hover:text-white transition-colors active:brightness-95 active:duration-75">Процесс работы</a>
            </div>
          </div>
          <div>
            <h4 className={LABEL} style={{ color: iv(0.35) }}>Контакты</h4>
            <div className="flex flex-col gap-3 text-[13.5px] mt-5" style={{ color: iv(0.6) }}>
              <span className="font-bodoni text-[22px]" style={{ color: IVORY }}>+7 (000) 000-00-00</span>
              <span>hello@artel.example</span>
              <span style={{ color: iv(0.4) }}>Шоурум: Кутузовский пр-т, 12<br />Пн–Сб 10:00–20:00</span>
            </div>
          </div>
        </div>
        <div className="max-w-[1360px] mx-auto pt-7 flex flex-wrap justify-between gap-4 font-jost text-[10px] uppercase tracking-[0.2em]" style={{ borderTop: `1px solid ${iv(0.1)}`, color: iv(0.28) }}>
          <span>© 2026 Artel · демонстрационный шаблон ONYX</span>
          <div className="flex gap-6"><span>Политика конфиденциальности</span><span>Договор подряда</span></div>
        </div>
      </footer>
    </div>
  );
}
