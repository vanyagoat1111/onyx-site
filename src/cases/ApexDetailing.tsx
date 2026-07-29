import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StatBars, DonutStat } from '../components/DemoCharts';
import { seg, setVar, useViewport, useScrollTrack } from '../lib/scene';

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

/* ═══════════ ПЕРВЫЙ ЭКРАН: МАШИНА МОЕТСЯ ПО ПРОКРУТКЕ ═══════════

   Тот же приём, что на «Основе»: липкий трек, прокрутка гонит прогресс.
   Но здесь работаем не с рисунком, а с настоящей фотографией - в детейлинге
   продаётся именно разница на реальном металле, нарисованная машина
   в этой нише выглядит как отговорка.

   Фотография одна, лежит в двух слоях с разными фильтрами: нижний -
   вымытый и поляризованный, верхний - тусклый и запылённый. Прокрутка
   сдвигает границу между ними, как будто по кузову идёт мойка.
   Дальше проходит блик полировки и появляются капли, которые кузов
   отталкивает - это и есть то, за что платят за керамику.             */

const WASH_STAGES: { at: number; name: string; note: string }[] = [
  { at: 0.00, name: 'Приехала', note: 'Дорожная плёнка, разводы, матовый лак' },
  { at: 0.09, name: 'Мойка', note: 'Двухфазная, бесконтактная' },
  { at: 0.33, name: 'Химчистка салона', note: 'Экстракция, кожа, пластик, озон' },
  { at: 0.53, name: 'Полировка', note: 'Убираем риски и голограммы' },
  { at: 0.69, name: 'Керамика', note: 'Вода перестаёт держаться' },
  { at: 0.88, name: 'Готово', note: 'Замер толщины ЛКП до и после' },
];

/* Полный путь автомобиля: въехала грязной, помылась, вычистили салон,
   отполировали, покрыли керамикой и выехала из кадра.

   Камера подъезжает к стеклу на химчистке и отъезжает обратно на полировке -
   так видно, что салон это отдельная работа, а не «помыли и всё».
   Всё на одной фотографии: масштаб, сдвиг и фильтры. Никаких вторых
   картинок, потому что каждая лишняя - это секунда загрузки на телефоне. */
function writeWash(el: HTMLElement, p: number) {
  const arrive = seg(p, 0.00, 0.08);   // машина докатывается в кадр
  const wash = seg(p, 0.07, 0.34);     // граница чистого идёт по кузову
  const cabin = seg(p, 0.32, 0.54);    // салон становится чистым
  const gloss = seg(p, 0.52, 0.72);    // блик полировки проходит по капоту
  const beads = seg(p, 0.68, 0.88);    // капли выступают и скатываются
  const fin = seg(p, 0.84, 0.96);      // цвет добирает глубину
  const leave = seg(p, 0.91, 1.00);    // выезжает из кадра

  setVar(el, '--wash', wash);
  setVar(el, '--washPct', wash * 100);
  // пыль уходит чуть раньше линии: так чище читается направление движения
  setVar(el, '--dust', 1 - seg(p, 0.06, 0.28));
  setVar(el, '--cabin', 1 - cabin);
  setVar(el, '--gloss', gloss);
  setVar(el, '--glossPos', -30 + gloss * 160);
  setVar(el, '--beads', beads < 0.5 ? beads * 2 : (1 - beads) * 2);
  setVar(el, '--fin', fin);
  setVar(el, '--leave', leave);

  // камера: наезд на салон и возврат
  const focus = cabin < 0.5 ? cabin * 2 : (1 - cabin) * 2;
  setVar(el, '--zoom', 1 + focus * 0.28);
  // въезд слева и выезд вправо считаем одной величиной сдвига
  setVar(el, '--driveX', -16 * (1 - arrive) + 52 * leave);

  // линия мойки видна только пока идёт мойка
  setVar(el, '--line', wash > 0.004 && wash < 0.996 ? 1 : 0);
}

function WashScene({
  onBook, onPrices, marks,
}: { onBook: (e: React.MouseEvent<HTMLAnchorElement>) => void; onPrices: (e: React.MouseEvent<HTMLAnchorElement>) => void; marks: string[] }) {
  const { vh, mobile, calm, short, tiny } = useViewport(64);
  const scene = useRef<HTMLDivElement | null>(null);
  const bar = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef(0);
  const [stage, setStage] = useState(0);

  const { track, pane } = useScrollTrack((p) => {
    const el = scene.current;
    if (!el) return;
    writeWash(el, p);
    if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    let s = 0;
    for (let i = 0; i < WASH_STAGES.length; i++) if (p >= WASH_STAGES[i].at) s = i;
    if (s !== stageRef.current) { stageRef.current = s; setStage(s); }
  }, !calm);

  const cur = WASH_STAGES[stage];
  const live = !calm && vh > 0;
  const trackH = live ? Math.round(vh * (mobile ? 2.0 : 3.2)) : undefined;

  return (
    <div ref={track} className="relative" style={{ height: trackH }}>
      <div ref={pane} className="sticky top-0 h-[100svh] overflow-hidden" style={{ height: vh || undefined }}>

        {/* ── фотография в двух состояниях ── */}
        <div
          ref={scene}
          className="absolute inset-0"
          style={{
            // значения по умолчанию - готовая машина в кадре: если скрипт
            // не выполнится, посетитель увидит нормальный первый экран,
            // а не грязный кузов и не пустую сцену
            '--wash': '1', '--washPct': '100', '--dust': '0', '--cabin': '0',
            '--gloss': '1', '--glossPos': '130', '--beads': '0',
            '--fin': '1', '--line': '0', '--leave': '0',
            '--zoom': '1', '--driveX': '0',
          } as React.CSSProperties}
        >
          {/* всё, что относится к машине, ездит и приближается вместе */}
          <div
            className="absolute inset-0"
            style={{
              transform: 'translateX(calc(var(--driveX) * 1%)) scale(var(--zoom))',
              transformOrigin: '46% 46%',
              opacity: 'calc(1 - var(--leave) * 0.72)',
              willChange: 'transform',
            }}
          >
            {/* вымытая: глубина цвета, контраст, холодный свет */}
            <img
              src="/hero-auto.jpg" alt="" aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'saturate(calc(1.05 + var(--fin) * 0.25)) contrast(calc(1.06 + var(--fin) * 0.1)) brightness(1.04)' }}
            />

            {/* грязная: та же фотография, тусклая и пыльная. Уезжает вправо */}
            <div className="absolute inset-0" style={{ clipPath: 'inset(0 0 0 calc(var(--washPct) * 1%))' }}>
              <img
                src="/hero-auto.jpg" alt="" aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'saturate(0.28) brightness(0.6) contrast(0.88)' }}
              />
              {/* дорожная плёнка поверх кузова */}
              <div className="absolute inset-0" style={{ background: 'rgba(122,104,74,0.42)', mixBlendMode: 'multiply' }} />
              {/* пыль и разводы: рисуем градиентами, чтобы ничего не грузить */}
              <div
                className="absolute inset-0"
                style={{
                  opacity: 'var(--dust)',
                  backgroundImage:
                    'radial-gradient(circle at 18% 34%, rgba(214,198,168,0.30) 0 2px, transparent 3px),' +
                    'radial-gradient(circle at 62% 21%, rgba(214,198,168,0.22) 0 3px, transparent 4px),' +
                    'radial-gradient(circle at 41% 72%, rgba(214,198,168,0.26) 0 2px, transparent 3px),' +
                    'radial-gradient(circle at 83% 58%, rgba(214,198,168,0.20) 0 3px, transparent 4px),' +
                    'repeating-linear-gradient(101deg, rgba(196,178,142,0.10) 0 2px, transparent 2px 34px)',
                  backgroundSize: '190px 150px, 240px 200px, 170px 220px, 260px 180px, auto',
                }}
              />
            </div>

            {/* салон: за стеклом темно и пыльно, пока не дошли до химчистки */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: 'var(--cabin)',
                background:
                  'radial-gradient(38% 26% at 46% 42%, rgba(28,24,18,0.78) 0%, rgba(28,24,18,0.42) 58%, transparent 100%)',
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: 'calc(var(--cabin) * 0.8)',
                background:
                  'radial-gradient(36% 24% at 46% 42%, rgba(190,170,132,0.22) 0 1.5px, transparent 2px)',
                backgroundSize: '26px 22px',
              }}
            />

            {/* линия мойки: узкая световая полоса на границе */}
            <div
              className="absolute top-0 bottom-0 pointer-events-none"
              style={{
                left: 'calc(var(--washPct) * 1%)',
                width: 3,
                transform: 'translateX(-1.5px)',
                opacity: 'var(--line)',
                background: LIME,
                boxShadow: `0 0 26px 8px ${LIME}66`,
              }}
            />

            {/* блик полировки: уходит по кузову один раз */}
            <div
              className="absolute inset-y-0 pointer-events-none"
              style={{
                left: 'calc(var(--glossPos) * 1%)',
                width: '26%',
                transform: 'skewX(-14deg)',
                opacity: 'calc(var(--gloss) * (1 - var(--gloss)) * 3.4)',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
              }}
            />

            {/* капли, которые кузов отталкивает */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: 'var(--beads)',
                backgroundImage:
                  'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.55) 0 1.5px, rgba(255,255,255,0.12) 2px, transparent 3px),' +
                  'radial-gradient(circle at 70% 65%, rgba(255,255,255,0.45) 0 2px, rgba(255,255,255,0.10) 3px, transparent 4px),' +
                  'radial-gradient(circle at 52% 22%, rgba(255,255,255,0.40) 0 1.5px, transparent 3px)',
                backgroundSize: '120px 96px, 160px 130px, 96px 110px',
              }}
            />
          </div>

          {/* рамка бокса остаётся на месте, когда машина уезжает */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: 'var(--leave)', background: `radial-gradient(70% 60% at 50% 60%, transparent, ${CARBON} 92%)` }}
          />

          {/* затемнение под текст */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(94deg, rgba(12,13,12,.94) 0%, rgba(12,13,12,.78) 44%, rgba(12,13,12,.30) 100%)` }} />
          <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none" style={{ background: `linear-gradient(to top, ${CARBON}, transparent)` }} />
        </div>

        {/* ── текст поверх ── */}
        <div className="relative h-full max-w-[1320px] mx-auto px-6 md:px-8 flex flex-col justify-center" style={{ paddingTop: 78, paddingBottom: (mobile ? 64 : 0) + 24 }}>
          <div className="font-mono text-[9.5px] md:text-[11px] uppercase tracking-[0.26em] mb-5 md:mb-8" style={{ color: LIME }}>
            Екатеринбург · сервис и детейлинг
          </div>
          <h1 className="font-black leading-[0.94] tracking-[-0.03em]" style={{ fontSize: tiny ? 'clamp(24px,6.6vw,30px)' : short ? 'clamp(30px,7.4vw,38px)' : 'clamp(42px,7.6vw,96px)' }}>
            Смета до работ.<br />
            <span style={{ color: LIME }}>Фото</span> после каждой.
          </h1>
          {!short && (
            <p className="mt-8 max-w-[50ch] text-white/55 text-[17px] leading-[1.7]">
              Нормо-час фиксированный, старые детали отдаём, гарантия год.
              Так работает сервис, в который возвращаются, а не заезжают один раз.
            </p>
          )}
          <div className="mt-5 md:mt-10 flex flex-wrap gap-2.5 md:gap-4">
            <a href="#booking" onClick={onBook} className="px-6 md:px-8 py-3.5 md:py-4 font-mono text-[10.5px] md:text-[12px] uppercase tracking-[0.14em] text-[#0C0D0C] transition-transform hover:-translate-y-[2px]" style={{ background: LIME }}>
              Записаться на диагностику
            </a>
            <a href="#prices" onClick={onPrices} className="px-6 md:px-8 py-3.5 md:py-4 font-mono text-[10.5px] md:text-[12px] uppercase tracking-[0.14em] border border-white/25 hover:border-white/50 transition-colors">
              Прайс на работы
            </a>
          </div>

          {!short && (
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 items-center border-t border-white/10 pt-7">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Работаем с</span>
              {marks.map((m) => (
                <span key={m} className="font-mono text-[12px] uppercase tracking-[0.12em] text-white/45">{m}</span>
              ))}
            </div>
          )}
        </div>

        {/* ── этап и прогресс ── */}
        {live && (
          <div className="absolute inset-x-0 bottom-0 px-6 md:px-8" style={{ paddingBottom: mobile ? 72 : 22 }}>
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
              <a key={l.href} href={`#${l.href}`} onClick={(e) => scrollTo(e, l.href)} className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45 hover:text-white transition-colors">{l.name}</a>
            ))}
          </nav>
          <a href="#booking" onClick={(e) => scrollTo(e, 'booking')} className="hidden sm:inline-block px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#0C0D0C]" style={{ background: LIME }}>
            Записаться
          </a>
        </div>
      </header>

      {/* HERO: машина моется по мере прокрутки */}
      <WashScene
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
