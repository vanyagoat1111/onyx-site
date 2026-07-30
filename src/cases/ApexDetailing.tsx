import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StatBars, DonutStat } from '../components/DemoCharts';
import { seg, setVar, useViewport, useScrollTrack, useLowPower } from '../lib/scene';

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

const CLASSES = [
  { k: 'Седан', mult: 1, ex: 'Camry, A6, 5 серия — до 4,9 м' },
  { k: 'Кроссовер', mult: 1.25, ex: 'X5, Q7, Cayenne — до 5,1 м' },
  { k: 'Внедорожник', mult: 1.5, ex: 'Land Cruiser, G-класс, Defender' },
];

const priceMatrix = [
  { t: 'Полировка кузова, 2 этапа', d: 'Абразив + защитный слой, замер толщины ЛКП до и после', base: 18000, hours: '8–10 ч', warranty: '3 месяца' },
  { t: 'Полировка кузова, 3 этапа', d: 'Глубокое восстановление, устранение голограмм и рисок', base: 26000, hours: '12–14 ч', warranty: '6 месяцев' },
  { t: 'Керамическое покрытие', d: 'Двухслойный состав, подготовка поверхности включена', base: 34000, hours: '1–2 дня', warranty: '3 года' },
  { t: 'Полиуретановая плёнка, перёд', d: 'Капот, крылья, бампер, зеркала, фары', base: 62000, hours: '2 дня', warranty: '5 лет' },
  { t: 'Химчистка салона', d: 'Демонтаж сидений, экстракция, обработка кожи и пластика', base: 9500, hours: '6–8 ч', warranty: '—' },
  { t: 'Озонирование', d: 'Устранение запахов, обработка системы вентиляции', base: 3200, hours: '2 ч', warranty: '—' },
  { t: 'Диагностика на подъёмнике', d: 'Сканирование блоков, компрессия, подвеска, отчёт с фото', base: 2500, hours: '1 ч', warranty: '—' },
  { t: 'Плановое ТО', d: 'Масла, фильтры, свечи, тормозная жидкость — оригинал или аналог', base: 6800, hours: '2–4 ч', warranty: '12 месяцев' },
  { t: 'Ремонт подвески', d: 'Стойки, рычаги, сайлентблоки, развал-схождение на 3D-стенде', base: 7200, hours: '3–8 ч', warranty: '12 месяцев' },
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

/* ═══════════ ПЕРВЫЙ ЭКРАН ═══════════

   Здесь два варианта, и переключаются они сами.

   По умолчанию - статичный экран на кадре цеха. Он честно работает:
   атмосфера, читаемый заголовок, две кнопки, марки внизу.

   Если в public/demo появится apex-car.jpg - включается сцена мойки,
   которой управляет прокрутка: машина стоит матовой от дорожной плёнки,
   по кузову идёт линия мойки и за ней возвращается глубокий чёрный,
   камера подходит к стеклу на химчистке, проходит блик полировки,
   выступают капли керамики, и машина уезжает из кадра.

   Кадр нужен такой, где КУЗОВ занимает основную часть площади и освещён.
   На атмосферном снимке цеха машина - тёмный силуэт, разницы «грязная
   и чистая» на нём физически не видно: мыть визуально нечего.
   Механизм от плохого кадра не спасает.

   Что нужно на фото: машина боком или в три четверти, кузов от края
   до края кадра, ровный свет, желательно светлый фон бокса.            */

const CAR_PHOTO = '/demo/apex-car.jpg';
/* Отдельный кадр для телефона. Тянуть на экран шириной 390 точек
   картинку в 2200 пикселей - это лишние полтора мегабайта и лишняя
   работа по масштабированию на каждый кадр прокрутки. */
const CAR_PHOTO_SM = '/demo/apex-car-sm.jpg';

const WASH_STAGES: { at: number; name: string; note: string }[] = [
  { at: 0.00, name: 'Приехала', note: 'Дорожная плёнка, разводы, матовый лак' },
  { at: 0.10, name: 'Мойка', note: 'Двухфазная, бесконтактная' },
  { at: 0.34, name: 'Химчистка салона', note: 'Экстракция, кожа, пластик, озон' },
  { at: 0.54, name: 'Полировка', note: 'Убираем риски и голограммы' },
  { at: 0.70, name: 'Керамика', note: 'Вода перестаёт держаться' },
  { at: 0.88, name: 'Готово', note: 'Замер толщины ЛКП до и после' },
];

/* Точки камеры: доля прокрутки, цель в процентах от кадра и приближение.

   Здесь камера почти не гуляет. Её задача одна - подойти к боковому стеклу
   на химчистке салона и отойти обратно, чтобы было видно: салон это
   отдельная работа, а не «помыли кузов и всё». Всё остальное время
   машина в общем плане, потому что главное здесь - разница на лаке. */
const CAM: { at: number; x: number; y: number; s: number }[] = [
  { at: 0.00, x: 50, y: 50, s: 1.00 },
  { at: 0.44, x: 57, y: 36, s: 1.52 },
  { at: 0.86, x: 50, y: 50, s: 1.03 },
];

/* Плавный переход между точками камеры. Возвращает цель и приближение.

   Считаем сдвиг, а не transform-origin: origin нельзя анимировать без
   рывка, потому что браузер меняет систему координат мгновенно. Сдвигом
   же любая точка кадра выводится в центр без скачков.
   Формула: при origin по центру точка x переходит в 50 + (x + t - 50) * s,
   значит для попадания в центр нужен сдвиг t = 50 - x. */
function camAt(p: number) {
  let a = CAM[0], b = CAM[CAM.length - 1];
  for (let i = 0; i < CAM.length - 1; i++) {
    if (p >= CAM[i].at && p <= CAM[i + 1].at) { a = CAM[i]; b = CAM[i + 1]; break; }
    if (p > CAM[CAM.length - 1].at) { a = b = CAM[CAM.length - 1]; }
  }
  const span = b.at - a.at;
  const t = span <= 0 ? 1 : seg(p, a.at, b.at);


  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
    s: a.s + (b.s - a.s) * t,
  };
}

/* Путь по сервису: приёмка, мойка, салон, полировка, керамика, выдача.

   Камера подъезжает к стеклу на химчистке и отъезжает обратно на полировке -
   так видно, что салон это отдельная работа, а не «помыли и всё».
   Лак набирает глубину постепенно на всём пути, поэтому в конце кузов
   заметно плотнее, чем на приёмке, но и в начале выглядит хорошо.
   Всё на одной фотографии: масштаб, сдвиг и фильтры. Никаких вторых
   картинок, потому что каждая лишняя - это секунда загрузки на телефоне. */
function writeWash(el: HTMLElement, p: number) {
  const cam = camAt(p);
  const wash = seg(p, 0.00, 0.34);     // граница чистого идёт по кузову
  const cabin = seg(p, 0.34, 0.54);    // салон проясняется
  const gloss = seg(p, 0.52, 0.72);    // блик полировки идёт по лаку
  const beads = seg(p, 0.68, 0.88);    // капли керамики выступают и скатываются
  const fin = seg(p, 0.82, 0.96);      // лак добирает глубину
  const leave = seg(p, 0.92, 1.00);    // выезжает из кадра

  const st = el.style;
  /* Готовые строки, а не расчёт внутри transform: в CSS одно неверное
     значение обнуляет всё правило целиком, и машина исчезла бы вместе
     со сдвигом и приближением. Считаем в JS - там ошибку видно. */
  st.setProperty('--camS', cam.s.toFixed(4));
  st.setProperty('--camX', `${(50 - cam.x).toFixed(2)}%`);
  st.setProperty('--camY', `${(50 - cam.y).toFixed(2)}%`);

  st.setProperty('--washL', `${(wash * 100).toFixed(2)}%`);
  st.setProperty('--clipDirty', `inset(0 0 0 ${(wash * 100).toFixed(2)}%)`);
  // пыль сходит чуть раньше линии: так читается направление движения
  setVar(el, '--dust', 1 - seg(p, 0.00, 0.26));
  setVar(el, '--cabin', 1 - cabin);
  setVar(el, '--gloss', gloss);
  st.setProperty('--glossL', `${(-30 + gloss * 160).toFixed(2)}%`);
  setVar(el, '--beads', beads < 0.5 ? beads * 2 : (1 - beads) * 2);
  setVar(el, '--fin', fin);
  setVar(el, '--leave', leave);
  st.setProperty('--driveT', `${(58 * leave).toFixed(2)}%`);

  // световая полоса видна только пока идёт мойка
  setVar(el, '--line', wash > 0.004 && wash < 0.996 ? 1 : 0);
  // рамка наводки - только когда камера действительно подошла
  setVar(el, '--aim', cam.s > 1.2 ? Math.min(1, (cam.s - 1.2) * 3) : 0);
}
function WashScene({
  src, onBook, onPrices, marks,
}: { src: string; onBook: (e: React.MouseEvent<HTMLAnchorElement>) => void; onPrices: (e: React.MouseEvent<HTMLAnchorElement>) => void; marks: string[] }) {
  const { vh, mobile, calm, short, tiny } = useViewport(64);
  const lowPower = useLowPower();
  const scene = useRef<HTMLDivElement | null>(null);
  const bar = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef(0);
  const [stage, setStage] = useState(0);
  /* Доля прокрутки в ref: круговой облёт читает её каждый кадр сам,
     без состояния React - иначе страница перерисовывалась бы на каждый
     кадр вращения. */
  const prog = useRef(0);

  const { track, pane } = useScrollTrack((p) => {
    prog.current = p;
    const el = scene.current;
    if (!el) return;
    writeWash(el, p);
    if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    let s = 0;
    for (let i = 0; i < WASH_STAGES.length; i++) if (p >= WASH_STAGES[i].at) s = i;
    if (s !== stageRef.current) { stageRef.current = s; setStage(s); }
  }, !calm);

  const cur = WASH_STAGES[Math.min(stage, WASH_STAGES.length - 1)];
  const live = !calm && vh > 0;
  const trackH = live ? Math.round(vh * (mobile ? 2.1 : 3.2)) : undefined;

  /* Значения по умолчанию - вымытая машина в кадре. Если скрипт не выполнится,
     посетитель увидит нормальный первый экран, а не матовый кузов и не пустоту. */
  const defaults = {
    '--camS': '1', '--camX': '0%', '--camY': '0%',
    '--washL': '100%', '--clipDirty': 'inset(0 0 0 100%)',
    '--dust': '0', '--line': '0', '--cabin': '0', '--gloss': '1', '--glossL': '130%', '--beads': '0',
    '--fin': '1', '--leave': '0', '--driveT': '0%', '--aim': '0',
  } as React.CSSProperties;

  /* Фотография в двух состояниях.

     Физика для чёрного глянца обратная привычной: грязь его не темнит,
     а поднимает чёрный до матово-серого и убивает блики. Поэтому «грязная» -
     это низкий контраст и подсветка, а «чистая» - глубокий чёрный и резкие
     отражения. Если сделать наоборот, кузов просто уйдёт в темноту и разницы
     видно не будет.

     На телефоне кадр 21:9 при заполнении портретного экрана обрезался бы
     до середины двери, поэтому там своя раскладка: текст сверху, машина
     полосой снизу. */
  const car = (
    <div
      ref={scene}
      className="absolute inset-0 overflow-hidden"
      style={defaults}
    >
      <div
        className="absolute inset-0"
        style={{
          /* Сначала выезд, потом приближение, потом сдвиг цели в центр.
             CSS применяет справа налево, поэтому порядок именно такой. */
          transform: 'translateX(var(--driveT)) scale(var(--camS)) translate(var(--camX), var(--camY))',
          opacity: 'calc(1 - var(--leave, 0) * 0.8)',
          willChange: 'transform',
        }}
      >
        {/* Вымытая: глубокий чёрный, резкие блики */}
        {/* На телефоне кадр показывается целиком, а не обрезается.

            object-cover заполняет коробку и срезает бока - на узком экране
            от машины оставался кусок кузова без переда и без задка. Смотреть
            там не на что, а вся сцена мойки построена на том, что человек
            видит автомобиль.

            object-contain вписывает кадр полностью: виден весь силуэт,
            от бампера до бампера. Полосы сверху и снизу не мешают - под
            изображением тот же графит, что и у страницы, стыка не видно.

            На компьютере остаётся cover: там коробка широкая, обрезаются
            только пустые края бокса, а не сама машина. */}
        <img
          src={mobile ? CAR_PHOTO_SM : src} alt="" aria-hidden="true"
          className={`absolute inset-0 w-full h-full ${mobile ? 'object-contain' : 'object-cover'}`}
          style={{
            objectPosition: 'center',
            /* Фильтр постоянный, а не считаемый через var на каждом кадре.
               Анимированный filter заставляет браузер прогонять всю
               полноэкранную картинку через фильтр заново каждый кадр -
               это самая дорогая операция при прокрутке и главная причина
               подтормаживаний даже на быстрых телефонах. Глубину лака
               в финале добираем дешёвым слоем с прозрачностью ниже. */
            filter: 'contrast(1.16) saturate(1.08) brightness(0.96)',
          }}
        />

        {/* Матовая: тот же кадр с поднятым чёрным. Уходит вправо за линией мойки.

            Физика для чёрного глянца обратная привычной: грязь его не темнит,
            а поднимает чёрный до матово-серого и убивает блики. Поэтому
            «грязная» - это низкий контраст и подсветка, а «чистая» - глубокий
            чёрный и резкие отражения. Сделать наоборот - кузов уйдёт
            в темноту, и разницы видно не будет. */}
        <div className="absolute inset-0" style={{ clipPath: 'var(--clipDirty)' }}>
          <img
            src={mobile ? CAR_PHOTO_SM : src} alt="" aria-hidden="true"
            className={`absolute inset-0 w-full h-full ${mobile ? 'object-contain' : 'object-cover'}`}
            style={{
              objectPosition: 'center',
              filter: 'contrast(0.6) brightness(1.22) saturate(0.68)',
            }}
          />
          <div className="absolute inset-0" style={{ background: 'rgba(150,134,104,0.3)', mixBlendMode: 'screen' }} />
          {!lowPower && <div
            className="absolute inset-0"
            style={{
              opacity: 'var(--dust, 0)',
              backgroundImage:
                'radial-gradient(circle at 18% 34%, rgba(226,214,190,0.3) 0 2px, transparent 3px),' +
                'radial-gradient(circle at 62% 21%, rgba(226,214,190,0.24) 0 3px, transparent 4px),' +
                'radial-gradient(circle at 41% 72%, rgba(226,214,190,0.26) 0 2px, transparent 3px),' +
                'repeating-linear-gradient(101deg, rgba(214,198,168,0.12) 0 2px, transparent 2px 30px)',
              backgroundSize: '190px 150px, 240px 200px, 170px 220px, auto',
            }}
          />}
        </div>

        {/* Глубина лака к финалу: тёмная подложка с умножением.
            Композитится на видеокарте, стоит почти ноль - в отличие
            от пересчёта фильтра по всей картинке. */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 'calc(var(--fin, 1) * 0.4)',
            background: 'radial-gradient(120% 100% at 55% 45%, rgba(0,0,0,0.55), rgba(0,0,0,0.15))',
            mixBlendMode: 'multiply',
          }}
        />

        {/* Линия мойки: световая полоса и намёк на воду за ней */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            left: 'var(--washL)', width: 130, marginLeft: -130,
            opacity: 'var(--line, 0)',
            background: `linear-gradient(90deg, transparent, ${LIME}1F 70%, ${LIME}59)`,
          }}
        />
        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            left: 'var(--washL)', width: 3, transform: 'translateX(-1.5px)',
            opacity: 'var(--line, 0)',
            background: LIME,
            boxShadow: `0 0 30px 10px ${LIME}66`,
          }}
        />


        {/* салон: за стеклом мутно, пока не дошли до химчистки */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 'var(--cabin, 1)',
            background: 'radial-gradient(26% 20% at 57% 36%, rgba(206,194,172,0.55) 0%, rgba(206,194,172,0.22) 58%, transparent 100%)',
          }}
        />


        {/* блик полировки: на чёрном лаке это главный кадр всей сцены */}
        <div
          className="absolute inset-y-0 pointer-events-none"
          style={{
            left: 'var(--glossL)', width: '22%',
            transform: 'skewX(-14deg)',
            opacity: 'calc(var(--gloss, 1) * (1 - var(--gloss, 1)) * 3.6)',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.72), transparent)',
          }}
        />

        {/* капли, которые кузов отталкивает */}
        {!lowPower && <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 'var(--beads, 1)',
            backgroundImage:
              'radial-gradient(circle at 30% 42%, rgba(255,255,255,0.6) 0 1.5px, rgba(255,255,255,0.14) 2px, transparent 3px),' +
              'radial-gradient(circle at 70% 62%, rgba(255,255,255,0.5) 0 2px, rgba(255,255,255,0.12) 3px, transparent 4px),' +
              'radial-gradient(circle at 52% 26%, rgba(255,255,255,0.45) 0 1.5px, transparent 3px)',
            backgroundSize: '120px 96px, 160px 130px, 96px 110px',
          }}
        />}
      </div>

      {/* Рамка наводки поверх кадра.

          Появляется только когда камера приближена, и держится на месте,
          пока кузов под ней движется. Без неё наезд читается как «картинку
          увеличили», с ней - как работа оператора: видно, что смотрят
          в конкретный узел. Стоит вне подвижного слоя, поэтому сама
          не едет и не масштабируется. */}
      <div
        className="absolute inset-0 pointer-events-none grid place-items-center"
        style={{ opacity: 'calc(var(--aim, 0) * (1 - var(--leave, 0)))' }}
      >
        <div className="relative" style={{ width: 'min(46vw, 520px)', aspectRatio: '4/3' }}>
          {[
            'left-0 top-0 border-l-2 border-t-2',
            'right-0 top-0 border-r-2 border-t-2',
            'left-0 bottom-0 border-l-2 border-b-2',
            'right-0 bottom-0 border-r-2 border-b-2',
          ].map((c) => (
            <span key={c} className={`absolute w-7 h-7 ${c}`} style={{ borderColor: `${LIME}CC` }} />
          ))}
          <span className="absolute left-1/2 top-1/2 w-5 h-px -translate-x-1/2" style={{ background: `${LIME}99` }} />
          <span className="absolute left-1/2 top-1/2 w-px h-5 -translate-y-1/2" style={{ background: `${LIME}99` }} />
        </div>
      </div>

      {/* пустой бокс остаётся, когда машина уехала */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 'var(--leave, 0)', background: `radial-gradient(70% 60% at 52% 62%, transparent, ${CARBON} 92%)` }}
      />
    </div>
  );

  return (
    <div ref={track} className="relative" style={{ height: trackH }}>
      <div ref={pane} className="sticky top-0 h-[100svh] overflow-hidden" style={{ height: vh || undefined }}>

        {mobile ? (
          /* ТЕЛЕФОН: кадр на весь экран, текст поверх снизу.

             Раньше машина стояла отдельной полосой внизу и висела
             в воздухе прямоугольником. Полноэкранный кадр с затенением
             под текстом читается как обложка журнала, а не как вставленная
             картинка. Портретный экран обрежет края - поэтому для телефона
             свой кадр, снятый ближе к машине. */
          <>
            {/* ── Телефон: машина сверху, текст под ней ──

                Было: полноэкранный кадр и текст ПОВЕРХ него, а под текстом
                шторка почти в черноту на нижние тридцать процентов экрана.
                На бумаге это обложка журнала. На деле кузов тёмный, шторка
                тёмная - машина пропадала, а подзаголовок на 60% белого
                поверх фото читался с трудом.

                И главное: вся сцена мойки происходила там, где показать её
                было нечем. Смысл приёма - что человек видит, как машину
                отмывают. Если машины не видно, приёма нет.

                Стало: кадр держит верхнюю половину экрана и ничем не
                затемняется - там и идёт мойка, там её видно. Текст живёт
                ниже, на сплошном фоне, где контраст не зависит от того,
                что оказалось под буквами.

                Это то же решение, что во вступительной сцене на главной:
                на узком экране не повторять десктоп, а перестроить. */}
            <div className="absolute inset-x-0 top-0 overflow-hidden" style={{ height: '52%' }}>
              {car}
              {/* Мягкий переход к фону: жёсткая граница фото читается
                  как вставленная картинка, а не как часть страницы. */}
              <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                   style={{ background: `linear-gradient(to bottom, transparent, ${CARBON})` }} />
            </div>
            <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to top, ${CARBON} 46%, transparent 52%, rgba(12,13,12,.35) 58%, rgba(12,13,12,.55) 100%)` }} />

            <div className="relative h-full flex flex-col justify-end px-6" style={{ paddingTop: 66, paddingBottom: 104 }}>
              <div className="font-mono text-[9px] uppercase tracking-[0.24em] mb-3" style={{ color: LIME }}>
                Екатеринбург · сервис и детейлинг
              </div>
              <h1 className="font-black leading-[0.95] tracking-[-0.03em]" style={{ fontSize: tiny ? 'clamp(24px,6.6vw,29px)' : 'clamp(29px,7.8vw,38px)' }}>
                Смета до работ.<br />
                <span style={{ color: LIME }}>Фото</span> после каждой.
              </h1>
              {/* На сплошном фоне 60% белого читалось тускло, а это единственное
                  место, где сказано, что человек получит: фиксированный нормо-час,
                  старые детали, гарантия. */}
              {!tiny && (
                <p className="mt-4 text-white/80 text-[13.5px] leading-[1.6] max-w-[34ch]">
                  Нормо-час фиксированный, старые детали отдаём, гарантия год.
                </p>
              )}
              <div className="mt-5 flex flex-wrap gap-2.5">
                <a href="#booking" onClick={onBook} className="px-5 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[#0C0D0C]" style={{ background: LIME }}>
                  Записаться
                </a>
                <a href="#prices" onClick={onPrices} className="px-5 py-3 font-mono text-[10px] uppercase tracking-[0.12em] border border-white/25">
                  Прайс на работы
                </a>
              </div>
            </div>
          </>
        ) : (
          /* КОМПЬЮТЕР: кадр во весь экран, текст слева на затенении */
          <>
            {car}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(96deg, rgba(12,13,12,.93) 0%, rgba(12,13,12,.66) 28%, rgba(12,13,12,.14) 56%, rgba(12,13,12,0) 100%)' }} />
            <div className="absolute inset-x-0 bottom-0 h-44 pointer-events-none" style={{ background: `linear-gradient(to top, ${CARBON}, transparent)` }} />

            <div className="relative h-full max-w-[1320px] mx-auto px-6 md:px-8 flex flex-col justify-center" style={{ paddingTop: 78, paddingBottom: 40 }}>
              <div className="max-w-[54%]">
                <div className="font-mono text-[11px] uppercase tracking-[0.26em] mb-7" style={{ color: LIME }}>
                  Екатеринбург · сервис и детейлинг
                </div>
                <h1 className="font-black leading-[0.94] tracking-[-0.03em]" style={{ fontSize: short ? 'clamp(32px,4.4vw,44px)' : 'clamp(44px,5.6vw,84px)' }}>
                  Смета до работ.<br />
                  <span style={{ color: LIME }}>Фото</span> после каждой.
                </h1>
                {!short && (
                  <p className="mt-8 max-w-[38ch] text-white/65 text-[16.5px] leading-[1.7]">
                    Нормо-час фиксированный, старые детали отдаём, гарантия год.
                    Так работает сервис, в который возвращаются, а не заезжают один раз.
                  </p>
                )}
                <div className="mt-9 flex flex-wrap gap-3.5">
                  <a href="#booking" onClick={onBook} className="px-8 py-4 font-mono text-[12px] uppercase tracking-[0.14em] text-[#0C0D0C] transition-transform hover:-translate-y-[2px] active:brightness-95 active:duration-75" style={{ background: LIME }}>
                    Записаться на диагностику
                  </a>
                  <a href="#prices" onClick={onPrices} className="px-8 py-4 font-mono text-[12px] uppercase tracking-[0.14em] border border-white/25 hover:border-white/50 transition-colors active:brightness-95 active:duration-75">
                    Прайс на работы
                  </a>
                </div>
                {!short && (
                  <div className="mt-11 flex flex-wrap gap-x-6 gap-y-2 items-center border-t border-white/10 pt-6 w-[128%] max-w-[860px] pr-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Работаем с</span>
                    {marks.map((m) => (
                      <span key={m} className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-white/40">{m}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* этап и прогресс */}
        {live && (
          <div className="absolute inset-x-0 bottom-0 px-6 md:px-8" style={{ paddingBottom: mobile ? 74 : 22 }}>
            <div className="max-w-[1320px] mx-auto">
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] flex items-baseline gap-2">
                  <span style={{ color: LIME }}>{String(stage + 1).padStart(2, '0')}</span>
                  <span className="text-white/85">{cur.name}</span>
                </span>
                {!tiny && (
                  <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.14em] text-white/35 text-right truncate">{cur.note}</span>
                )}
              </div>
              <div className="h-[3px] bg-white/12">
                <div ref={bar} className="h-full origin-left" style={{ background: LIME, transform: 'scaleX(0)' }} />
              </div>
              {stage === 0 && (
                <div className="mt-3 font-mono text-[9.5px] uppercase tracking-[0.22em] text-white/40 flex items-center gap-2">
                  Листайте — весь путь от въезда до выдачи
                  <span className="inline-block w-[9px] h-[9px] border-b border-r rotate-45" style={{ borderColor: LIME }} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
type HeroProps = {
  marks: string[];
  onBook: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onPrices: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

/* Статичный первый экран: работает всегда и ни от чего не зависит. */
function StaticHero({ marks, onBook, onPrices }: HeroProps) {
  return (
    <section className="relative px-6 md:px-8 pt-16 md:pt-24 pb-16 overflow-hidden">
      <img
        src="/hero-auto.jpg" alt="" aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ filter: 'saturate(0.9) brightness(1.06)' }}
      />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(95deg,rgba(12,13,12,.93) 0%,rgba(12,13,12,.7) 46%,rgba(12,13,12,.28) 100%)' }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.5]" style={{ background: 'radial-gradient(900px 460px at 78% 0%, rgba(196,248,42,0.1), transparent 62%)' }} />
      <div className="max-w-[1320px] mx-auto relative">
        <div className="font-mono text-[11px] uppercase tracking-[0.28em] mb-8" style={{ color: LIME }}>
          Екатеринбург · сервис и детейлинг
        </div>
        <h1 className="font-black leading-[0.94] tracking-[-0.03em]" style={{ fontSize: 'clamp(42px,7.6vw,96px)' }}>
          Смета до работ.<br />
          <span style={{ color: LIME }}>Фото</span> после каждой.
        </h1>
        <p className="mt-8 max-w-[50ch] text-white/55 text-[17px] leading-[1.7]">
          Нормо-час фиксированный, старые детали отдаём, гарантия год.
          Так работает сервис, в который возвращаются, а не заезжают один раз.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#booking" onClick={onBook} className="px-8 py-4 font-mono text-[12px] uppercase tracking-[0.14em] text-[#0C0D0C] transition-transform hover:-translate-y-[2px] active:brightness-95 active:duration-75" style={{ background: LIME }}>
            Записаться на диагностику
          </a>
          <a href="#prices" onClick={onPrices} className="px-8 py-4 font-mono text-[12px] uppercase tracking-[0.14em] border border-white/25 hover:border-white/50 transition-colors active:brightness-95 active:duration-75">
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
  );
}

/* Выбор варианта. Проверяем фотографию до отрисовки сцены: подсовывать
   мойку на кадре, где кузова не видно, - хуже, чем честный статичный экран.
   Пока проверка идёт, показываем статичный, чтобы не мигало. */
function ApexHero(props: HeroProps) {
  const [hasCar, setHasCar] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setHasCar(true);
    img.onerror = () => setHasCar(false);
    img.src = CAR_PHOTO;
    return () => { img.onload = null; img.onerror = null; };
  }, []);

  return hasCar ? <WashScene src={CAR_PHOTO} {...props} /> : <StaticHero {...props} />;
}

export default function ApexDetailing() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [cls, setCls] = useState(0);
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
              <a key={l.href} href={`#${l.href}`} onClick={(e) => scrollTo(e, l.href)} className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45 hover:text-white transition-colors active:brightness-95 active:duration-75">{l.name}</a>
            ))}
          </nav>
          <a href="#booking" onClick={(e) => scrollTo(e, 'booking')} className="hidden sm:inline-block px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#0C0D0C]" style={{ background: LIME }}>
            Записаться
          </a>
        </div>
      </header>

      {/* HERO: сцена мойки, если есть подходящее фото, иначе статичный экран */}
      <ApexHero
        marks={marks}
        onBook={(e) => scrollTo(e, 'booking')}
        onPrices={(e) => scrollTo(e, 'prices')}
      />

      {/* SERVICES */}
      <section id="services" className="px-6 md:px-8 py-20 md:py-28 border-y border-white/10 scroll-mt-20" style={{ background: '#111311' }}>
        <div className="max-w-[1320px] mx-auto">
          <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <h2 className="font-black text-3xl md:text-[42px] tracking-tight">Что делаем</h2>
            <div className="flex gap-2">
              {([['all', 'Всё'], ['DT', 'Детейлинг'], ['SV', 'Сервис']] as const).map(([k, l]) => (
                <button type="button" key={k} onClick={() => setCat(k)} className="px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] border transition-colors"
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

      {/* PRICE MATRIX — центр этого лендинга */}
      <section id="prices" className="px-6 md:px-8 py-20 md:py-28 scroll-mt-20">
        <div className="max-w-[1320px] mx-auto">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.24em] mb-4" style={{ color: LIME }}>Прайс-лист</div>
              <h2 className="font-black text-3xl md:text-[46px] tracking-tight leading-[1.04] max-w-[16ch]">
                Цена зависит от класса кузова, а не от марки
              </h2>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {CLASSES.map((c, i) => (
                <button type="button" key={c.k} onClick={() => setCls(i)} className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] border transition-colors"
                  style={{ borderColor: cls === i ? LIME : 'rgba(255,255,255,0.16)', background: cls === i ? LIME : 'transparent', color: cls === i ? CARBON : 'rgba(255,255,255,0.55)' }}>
                  {c.k}
                </button>
              ))}
            </div>
          </Reveal>
          <Reveal className="font-mono text-[12px] mb-8 text-white/40">
            Выбран класс: <span style={{ color: LIME }}>{CLASSES[cls].k}</span> — {CLASSES[cls].ex}
          </Reveal>

          <div className="border border-white/12">
            <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto] gap-6 px-6 py-4 border-b border-white/12 font-mono text-[10px] uppercase tracking-[0.14em] text-white/35" style={{ background: '#111311' }}>
              <span>Работа</span><span className="text-right w-[110px]">Цена</span><span className="text-right w-[90px]">Время</span><span className="text-right w-[120px]">Гарантия</span>
            </div>
            {priceMatrix.map((r, i) => (
              <Reveal key={r.t} delay={i * 0.03}
                className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_auto_auto] gap-x-6 gap-y-2 px-5 md:px-6 py-5 border-b border-white/10 last:border-b-0 items-baseline">
                <div>
                  <div className="font-bold text-[16px] mb-1">{r.t}</div>
                  <div className="text-[13px] text-white/40 max-w-[52ch] leading-[1.6]">{r.d}</div>
                </div>
                <div className="font-mono text-[17px] text-right md:w-[110px] whitespace-nowrap" style={{ color: LIME }}>
                  {(r.base * CLASSES[cls].mult).toLocaleString('ru-RU')} ₽
                </div>
                <div className="font-mono text-[12px] text-white/45 md:text-right md:w-[90px] whitespace-nowrap">{r.hours}</div>
                <div className="font-mono text-[12px] text-white/45 text-right md:w-[120px] whitespace-nowrap">{r.warranty}</div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-6 flex flex-wrap gap-6 justify-between items-center">
            <p className="font-mono text-[12px] text-white/35 max-w-[54ch] leading-[1.7]">
              Нормо-час 1 900 ₽ и не меняется от марки. Точную сумму фиксируем в смете до начала работ —
              то, что в таблице, это верхняя граница для вашего класса.
            </p>
            <a href="#booking" onClick={(e) => scrollTo(e, 'booking')} className="px-8 py-4 font-mono text-[11px] uppercase tracking-[0.12em]" style={{ background: LIME, color: CARBON }}>
              Записаться на осмотр
            </a>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center mt-20 pt-16 border-t border-white/10">
            <div>
              <Reveal className="mb-8">
                <div className="font-mono text-[11px] uppercase tracking-[0.24em] mb-4" style={{ color: LIME }}>Замеры, а не обещания</div>
                <h3 className="font-black text-2xl md:text-[32px] tracking-tight leading-[1.1] mb-4">
                  Сколько лака снимает полировка
                </h3>
                <p className="text-white/45 text-[14px] leading-[1.75] max-w-[52ch]">
                  Толщина ЛКП в микронах, замер толщиномером на капоте до и после работ.
                  Эти цифры мы вписываем в акт — по ним видно, сколько ресурса осталось у покрытия.
                </p>
              </Reveal>
              <Reveal>
                <StatBars tone={LIME} unit=" мкм" labelColor="rgba(255,255,255,0.8)"
                  items={[
                    { label: 'Заводская толщина', value: 118, note: 'типичное значение для немецких марок' },
                    { label: 'После полировки в 2 этапа', value: 112, note: 'снимаем 4–7 мкм' },
                    { label: 'После полировки в 3 этапа', value: 105, note: 'снимаем 10–14 мкм, глубокие риски' },
                    { label: 'Критический минимум', value: 80, note: 'ниже полировать нельзя, только покраска' },
                  ]} />
              </Reveal>
            </div>
            <Reveal className="flex flex-col sm:flex-row lg:flex-col gap-10 justify-center">
              <DonutStat tone={LIME} value={96} size={150}
                label="Смета не выросла" sub="Доля заказов, закрытых ровно по согласованной сумме." />
              <DonutStat tone={LIME} value={1900} max={1900} suffix=" ₽" size={150}
                label="Нормо-час" sub="Одинаковый для всех марок и всех видов работ." />
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px mt-16" style={{ background: 'rgba(255,255,255,0.1)' }}>
            {promise.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.05} className="p-7" style={{ background: CARBON }}>
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
                  <button type="button" onClick={() => setOpenFaq(open ? null : i)} className="w-full flex justify-between items-center gap-6 py-6 text-left">
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
