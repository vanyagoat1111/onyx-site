import React, { useEffect, useRef, useState } from 'react';
import { seg, setVar, useViewport, useScrollTrack } from '../lib/scene';

/* ═══════════ ВСТУПЛЕНИЕ: САЙТ СОБИРАЕТСЯ ПО ПРОКРУТКЕ ═══════════

   Человек попадает не на готовую главную, а на пустое окно браузера,
   и собирает страницу сам, прокручивая. Заголовок обещает «сайт вы
   увидите раньше, чем заплатите» - вступление показывает это буквально.

   ── Почему через CSS-переменные, а не через состояние ──

   Прогресс пишется в переменные на :root, а элементы Hero и Navbar
   читают их через var(--intro-h1a, 1). Три следствия:

   1. React не перерисовывается ни разу за всю прокрутку. Иначе страница
      пересобиралась бы десятки раз в секунду - именно на этом раньше
      кнопки на демо отзывались с задержкой в секунды.
   2. Прогресс не надо тащить пропсами через все компоненты. Навигация
      живёт в другой ветке дерева и всё равно его слышит.
   3. Запасной сценарий получается сам. Если скрипт не выполнился,
      переменных нет, срабатывает значение по умолчанию 1, и человек
      видит полностью готовую страницу. Пустого сайта из-за ошибки
      быть не может в принципе - не потому что мы это проверяем,
      а потому что иначе не бывает.

   ── Почему прокрутка не перехватывается ──

   Никакого preventDefault на wheel и touchmove. Это ломает инерцию
   в Safari, конфликтует с пассивными слушателями Chrome и при любой
   ошибке в скрипте оставляет человека запертым на первом экране.
   Вместо этого высокий трек с липким слоем: экран визуально стоит,
   прокрутка остаётся родной, отматывается назад и не блокируется.

   ── Почему липкий слой бывает выше окна ──

   Первый экран на телефоне физически не влезает в окно: два абзаца,
   две кнопки в столбик с подписями и заголовок в три строки - это
   около 670 пикселей, а у iPhone SE в Telegram полезных 510. Если
   закрепить окно и обрезать лишнее, кнопки станут недостижимыми
   навсегда: обрезанное нельзя доскроллить.

   Поэтому липкий слой равен НЕ высоте окна, а высоте первого экрана,
   когда тот выше. Пока идёт сборка, слой приклеен верхом к нулю и его
   низ просто ниже сгиба; когда сборка закончилась, слой отклеивается
   и уезжает вверх обычной прокруткой, показывая остальное. Ничего не
   обрезано, ничего не перекрыто, следующая секция начинается там же,
   где и раньше.                                                      */

/* Высота панели браузера. Панель нарочно одна и низкая: подробная
   имитация браузера с двумя рядами - это уже не приём, а декорация,
   которая отнимает у первого экрана сто пикселей высоты. */
const CHROME_H = { d: 46, m: 40 };
/* Полоса с подписью этапа внизу окна. */
const FOOT_H = { d: 52, m: 46 };

/* Этапы сборки. Ключ - имя CSS-переменной, дальше окно прокрутки,
   на котором элемент проявляется. Окна намеренно перекрываются:
   так сборка читается как поток, а не как щелчки слайдов. */
const STEPS: [string, number, number][] = [
  /* Навигация начинает проявляться почти сразу, на втором проценте.
     Проверка показала мёртвую зону в первые пять процентов трека - это
     165 пикселей прокрутки, на которых не двигалось ничего, кроме полосы
     прогресса. Пустой экран, который не отвечает на прокрутку, человек
     читает как сломанный сайт, а не как приём. */
  ['--intro-nav', 0.02, 0.15],     // навигация
  ['--intro-logo', 0.12, 0.23],    // логотип
  ['--intro-badge', 0.19, 0.29],   // строка «Веб-студия ONYX»
  ['--intro-h1a', 0.25, 0.37],     // заголовок, первая строка
  ['--intro-h1b', 0.30, 0.42],     // вторая
  ['--intro-h1c', 0.35, 0.47],     // третья, акцентная
  ['--intro-sub', 0.43, 0.56],     // подзаголовок
  ['--intro-cta', 0.52, 0.65],     // кнопки
  ['--intro-panel', 0.60, 0.76],   // превью справа
  ['--intro-decor', 0.70, 0.85],   // сетка и графика
  ['--intro-bg', 0.76, 0.93],      // свечение, финальная цветовая сборка
];

/* Подписи этапов. Тексты про проектирование, а не про загрузку: сборка
   должна читаться как работа студии, а не как индикатор прогресса. */
const CAPTIONS: { at: number; t: string }[] = [
  { at: 0.00, t: 'Пустая страница' },
  { at: 0.02, t: 'Ставим навигацию' },
  { at: 0.25, t: 'Собираем первый экран' },
  { at: 0.43, t: 'Наполняем текстами' },
  { at: 0.52, t: 'Добавляем целевые действия' },
  { at: 0.60, t: 'Подключаем превью и заявки' },
  { at: 0.76, t: 'Наводим дизайн' },
  { at: 0.94, t: 'Сайт готов' },
];

/** Конечное состояние: страница собрана, рамки нет, сдвигов нет. */
function assembled(el: HTMLElement) {
  for (const [name] of STEPS) el.style.setProperty(name, '1');
  el.style.setProperty('--intro-chrome', '0');
  el.style.setProperty('--intro-shift', '0px');
  el.style.setProperty('--intro-nav-y', '0px');
  el.style.setProperty('--intro-pe', 'auto');
  el.style.setProperty('--intro-fit', '1');
  el.style.setProperty('--intro-fit-y', '0px');
}

export default function IntroAssembly({ children }: { children: React.ReactNode }) {
  const { vh, mobile, calm } = useViewport();
  const bar = useRef<HTMLDivElement | null>(null);
  const foot = useRef<HTMLDivElement | null>(null);
  const capRef = useRef(0);
  const peRef = useRef('');
  const [cap, setCap] = useState(0);
  /* Видимая высота первого экрана после поджима. Единственное, что
     здесь живёт в состоянии: от неё зависит разметка, а меряется она
     дважды за жизнь страницы, не на каждом кадре. */
  const [heroH, setHeroH] = useState(0);

  const chromeH = mobile ? CHROME_H.m : CHROME_H.d;
  const footH = mobile ? FOOT_H.m : FOOT_H.d;
  const live = !calm && vh > 0;

  /* Липкий слой равен окну, а если первый экран выше - ему. */
  const paneH = Math.max(vh, heroH);

  /* Длина сцены считается от слоя, а не от трека.

     Прокрутка сцены - это ровно та часть трека, на которой слой приклеен,
     то есть высота трека минус высота слоя. Если задавать трек как
     «столько-то экранов», то на телефоне, где слой выше окна, сцена
     съедала бы эту разницу: 1.9 экрана превращались в 0.9, и один резкий
     свайп проходил всю сборку насквозь. Поэтому длину сцены задаём прямо,
     а высота слоя просто прибавляется сверху. */
  const sceneLen = mobile ? 1.5 : 2.6;
  const trackH = Math.round(paneH + vh * sceneLen);

  const { track, pane } = useScrollTrack((p) => {
    const root = document.documentElement;

    for (const [name, a, b] of STEPS) setVar(root, name, seg(p, a, b));

    /* Рамка уходит последней: пока она есть, читается «это ещё превью»,
       когда растворилась - «это готовый сайт». */
    const chrome = 1 - seg(p, 0.82, 0.98);
    setVar(root, '--intro-chrome', chrome);

    /* Пока рамка на месте, содержимое живёт внутри окна и потому сдвинуто
       вниз на высоту панели. Когда рамка растворяется, страница поднимается
       на своё настоящее место. Двигаем transform, а не отступы: никакого
       пересчёта раскладки на каждом кадре. */
    const y = (chrome * chromeH).toFixed(1) + 'px';
    root.style.setProperty('--intro-nav-y', y);
    root.style.setProperty('--intro-shift', y);

    if (bar.current) bar.current.style.transform = `scaleX(${p.toFixed(4)})`;
    if (foot.current) foot.current.style.opacity = (1 - seg(p, 0.94, 1)).toFixed(3);

    /* Навигация на пустом экране не должна перехватывать нажатия: её
       ещё нет на странице, а невидимая полоса сверху ловила бы курсор. */
    const pe = p < 0.12 ? 'none' : 'auto';
    if (pe !== peRef.current) { peRef.current = pe; root.style.setProperty('--intro-pe', pe); }

    let i = 0;
    for (let k = 0; k < CAPTIONS.length; k++) if (p >= CAPTIONS[k].at) i = k;
    if (i !== capRef.current) { capRef.current = i; setCap(i); }
  }, live);

  /* Уход со страницы. Если человек нажал «Смотреть шаблон» на середине
     сборки, компонент размонтируется, а переменные остались бы на 0.3 -
     и на странице шаблона навигация висела бы полупрозрачной. */
  useEffect(() => () => assembled(document.documentElement), []);

  /* Измерение первого экрана.

     Отступы и кегли в Hero уже привязаны к высоте окна, но считал я их
     по предполагаемому числу строк: шрифт может подгрузиться шире,
     перевод строки уехать, человек увеличить масштаб страницы. Поэтому
     настоящую высоту меряем, а не предсказываем.

     Поджимаем мягко и не ниже 0.88. Задача поджима - не «уместить
     любой ценой», а подтянуть в первое окно ключевые этапы сборки,
     прежде всего кнопки: смысла в этапе «появляются кнопки», который
     происходит за сгибом, нет. Всё, что не влезло даже после поджима,
     не обрезается - его показывает высокий липкий слой.

     offsetHeight не зависит от собственного transform элемента,
     поэтому сбрасывать масштаб перед измерением не нужно и цикла не
     возникает: высота Hero не зависит от высоты слоя. */
  useEffect(() => {
    if (!live) return;
    const root = document.documentElement;
    const el = pane.current?.querySelector('[data-intro-fit]') as HTMLElement | null;
    if (!el) return;

    const measure = () => {
      const h = el.offsetHeight;
      if (h <= 0) return;
      const room = vh - footH;
      const s = Math.max(0.88, Math.min(1, room / h));
      const visible = h * s;
      root.style.setProperty('--intro-fit', s.toFixed(4));
      // Когда место есть - центруем, чтобы под первым экраном не оставалось
      // пустой полосы в двести пикселей на высоком мониторе.
      root.style.setProperty('--intro-fit-y', `${Math.max(0, (room - visible) / 2).toFixed(1)}px`);
      setHeroH((prev) => (Math.abs(prev - visible) < 2 ? prev : Math.ceil(visible)));
    };

    measure();
    // Шрифты подгружаются после первой отрисовки и меняют переносы строк.
    const t = window.setTimeout(measure, 400);
    document.fonts?.ready.then(measure).catch(() => {});

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    ro?.observe(el);

    return () => {
      window.clearTimeout(t);
      ro?.disconnect();
      root.style.setProperty('--intro-fit', '1');
      root.style.setProperty('--intro-fit-y', '0px');
    };
  }, [live, vh, footH, pane]);

  /* Просили меньше движения - отдаём готовую страницу и не держим экран.
     Это не урезанная версия: вступление здесь украшение, а не носитель
     смысла, весь текст и все действия на месте. Тот же путь работает на
     первом кадре, пока высота окна ещё не измерена. */
  if (!live) {
    if (typeof document !== 'undefined') assembled(document.documentElement);
    return <>{children}</>;
  }

  return (
    /* Метка для usePastIntro: кнопка связи и баннер cookie ждут, пока трек
       не окажется позади, и не всплывают посреди сборки. */
    <div ref={track} data-intro-track className="relative" style={{ height: trackH }}>
      <div ref={pane} className="sticky top-0" style={{ height: paneH }}>

        {/* ── окно браузера ──
            Пока слой приклеен, его верх совпадает с верхом окна, поэтому
            панель здесь - это панель на экране, без расчётов позиции.
            Три круга слева узнаваемы, но взяты в палитру студии: копировать
            чужую операционную систему до цвета незачем, жест читается и так. */}
        <div
          className="absolute inset-x-0 top-0 z-30 pointer-events-none"
          style={{ opacity: 'var(--intro-chrome, 0)' }}
        >
          <div
            className="flex items-center gap-3 px-4 md:px-5 border-b border-white/[0.08]"
            style={{ height: chromeH, background: 'rgba(14,14,18,0.94)' }}
          >
            <span className="flex gap-2 shrink-0">
              {['rgba(242,240,233,0.26)', 'rgba(242,240,233,0.16)', 'rgba(78,124,255,0.6)'].map((c, i) => (
                <span key={i} className="w-[11px] h-[11px] rounded-full" style={{ background: c }} />
              ))}
            </span>

            <span className="flex items-center gap-2 rounded-md bg-white/[0.06] border border-white/[0.07] px-3 py-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-cobalt/70" />
              <span className="font-mono text-[10px] md:text-[11px] text-bone/85 whitespace-nowrap">onyx-web.ru</span>
            </span>

            {!mobile && (
              <span className="flex items-center gap-1.5 min-w-0">
                {['новая вкладка', 'превью'].map((t) => (
                  <span key={t} className="rounded-md border border-white/[0.05] px-3 py-1.5 truncate">
                    <span className="font-mono text-[10.5px] text-fog/35 whitespace-nowrap">{t}</span>
                  </span>
                ))}
              </span>
            )}

            <span className="flex-1" />
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-cobalt-soft shrink-0 hidden sm:block">
              сборка
            </span>
          </div>
        </div>

        {/* ── настоящий первый экран: он и есть финал сборки ── */}
        <div style={{ transform: 'translateY(var(--intro-shift, 0px))' }}>
          {children}
        </div>

        {/* ── побуждение к прокрутке и подпись этапа ──
            Привязано к низу ОКНА, а не к низу слоя: слой бывает выше окна,
            и подпись уехала бы за сгиб именно там, где она нужнее всего. */}
        <div
          ref={foot}
          className="absolute inset-x-0 z-40 px-5 sm:px-6 md:px-12 flex flex-col justify-end pb-4 pointer-events-none"
          style={{ top: Math.max(0, vh - footH), height: footH }}
        >
          <div className="max-w-[1440px] mx-auto w-full">
            <div className="flex items-end justify-between gap-4 mb-2">
              <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.16em] flex items-baseline gap-2 min-w-0">
                <span className="text-cobalt-soft shrink-0">{String(cap + 1).padStart(2, '0')}</span>
                <span className="text-bone/80 truncate">{CAPTIONS[cap].t}</span>
              </span>

              {/* Подсказка с первого кадра. Пустой экран без побуждения
                  читается не как приём, а как сломанный сайт - и человек
                  уходит, ничего не пролистав. */}
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fog/70 flex items-center gap-2 shrink-0">
                <span className="hidden sm:inline">Листайте — сайт соберётся</span>
                <span className="sm:hidden">Листайте вверх</span>
                <span className="inline-block w-[7px] h-[7px] border-b border-r rotate-45 border-cobalt-soft animate-bounce" />
              </span>
            </div>

            <div className="h-[2px] bg-white/[0.08]">
              <div ref={bar} className="h-full origin-left bg-cobalt" style={{ transform: 'scaleX(0)' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
