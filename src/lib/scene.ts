import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   Общий движок сцен, которыми управляет прокрутка.

   Живёт отдельно, потому что одни и те же грабли повторяются в каждом демо:
   встроенные браузеры с нестандартной высотой, залипание экрана, дёрганье
   прогресса при скрытии адресной строки. Чинить это в четырнадцати файлах
   по отдельности - гарантированный способ починить в трёх и забыть в
   одиннадцати.

   Главное решение: НИКАКОГО перехвата прокрутки. Ни preventDefault на wheel,
   ни блокировки touchmove. Вместо этого высокий трек, внутри которого лежит
   липкая панель: экран визуально стоит на месте, а прокрутка остаётся
   нативной. Она отматывается назад, сохраняет инерцию в Safari и не может
   заблокировать страницу, если скрипт упадёт.
   ═══════════════════════════════════════════════════════════════════════ */

/** Сглаженная доля отрезка: 0 до начала, 1 после конца, плавно между. */
export function seg(p: number, a: number, b: number) {
  const t = Math.max(0, Math.min(1, (p - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/** Доля для i-го элемента внутри стадии: элементы включаются по очереди. */
export const stagger = (varName: string, i: number) =>
  `max(0, min(1, calc(var(${varName}) - ${i})))`;

/**
 * Появление блока при прокрутке.
 * Свой наблюдатель, без анимационных библиотек: на демо-страницах их
 * scroll-триггеры срабатывали ненадёжно, а блок, который не появился,
 * выглядит как пустое место.
 */
export function useSeen<T extends HTMLElement>() {
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
    // подстраховка: если наблюдатель почему-то молчит, показываем сами
    const t = window.setTimeout(() => setSeen(true), 1600);
    return () => { io.disconnect(); window.clearTimeout(t); };
  }, [seen]);
  return { ref, seen };
}

export type Viewport = {
  /** фактическая высота окна в пикселях */
  vh: number;
  /** узкий экран: телефон или планшет в портрете */
  mobile: boolean;
  /** человек попросил меньше движения */
  calm: boolean;
  /** мало высоты: убираем подзаголовки */
  short: boolean;
  /** совсем мало: убираем ещё и подсказки, заголовок мельче */
  tiny: boolean;
};

/**
 * Размеры экрана, посчитанные честно.
 *
 * Высоту берём из JS, а не из 100svh. Причина - встроенные браузеры:
 * наши клиенты часто приходят по ссылке из Telegram, где сверху своя
 * панель с адресом, полезной высоты меньше обычной, а на старых Android
 * WebView правило svh просто отбрасывается и вёрстка рассыпается.
 * Если липкая панель окажется выше экрана, sticky перестанет держать.
 *
 * @param reserveBottom сколько пикселей внизу занято чужой плашкой
 *        (в демо там висит «Демо-шаблон · данные для примера»)
 */
export function useViewport(reserveBottom = 0): Viewport {
  const [vh, setVh] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [calm, setCalm] = useState(false);

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

    /* Мелкие колебания игнорируем. В Safari и Telegram адресная строка при
       прокрутке то прячется, то показывается, и высота скачет на 60-100
       пикселей. Реагировать на это - значит дёргать весь экран. */
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
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

  const usable = vh > 0 ? vh - (mobile ? reserveBottom : 0) : 0;
  /* Пороги посчитаны от реальной полезной высоты вебвью: у телефона на 844
     точки в Telegram остаётся около 610, у SE - около 510. Порог 700 взят
     с запасом, потому что 6-дюймовый Android в Telegram даёт 641 и при
     границе в 640 не сработал бы впритык. */
  return {
    vh,
    mobile,
    calm,
    short: usable > 0 && usable < 700,
    tiny: usable > 0 && usable < 560,
  };
}

/**
 * Ближайший предок, внутри которого реально идёт прокрутка.
 *
 * Демо-шаблоны на сайте живут внутри обёртки редактора, а она прокручивает
 * содержимое во вложенном контейнере с `overflow-y: auto`, а не в окне.
 * Из-за этого `window.scrollY` всегда ноль, а события `scroll` на window
 * не приходят вообще. Любая логика, привязанная к окну, там мертва.
 */
export function scrollHost(el: HTMLElement | null): HTMLElement {
  let n: HTMLElement | null = el?.parentElement || null;
  while (n) {
    const s = getComputedStyle(n);
    if (/(auto|scroll|overlay)/.test(s.overflowY) && n.scrollHeight > n.clientHeight + 1) return n;
    n = n.parentElement;
  }
  return document.documentElement;
}

/**
 * Слабое устройство: считаем по числу ядер.
 *
 * Мерить настоящую частоту кадров бесполезно - на неподвижной странице
 * она всегда шестьдесят, а проблема вылезает только во время прокрутки,
 * когда мерить уже поздно. Поэтому берём грубый, но честный признак:
 * четыре ядра и меньше - это или старый телефон, или дешёвый Android.
 * Таким сцену упрощаем заранее, а не ждём, пока начнёт дёргаться.
 *
 * Главное всё равно не в этом флаге, а в том, чтобы дорогих операций
 * не было вовсе: анимированный filter и blend по всей площади экрана
 * тормозят даже флагманы.
 */
export function useLowPower(): boolean {
  const [low, setLow] = useState(false);
  useEffect(() => {
    const cores = (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency;
    if (typeof cores === 'number' && cores > 0 && cores <= 4) setLow(true);
  }, []);
  return low;
}

export type ScrollTrack = {
  track: React.RefObject<HTMLDivElement | null>;
  pane: React.RefObject<HTMLDivElement | null>;
};

/**
 * Липкий трек: экран стоит на месте, пока прокрутка гонит прогресс от 0 до 1,
 * после чего страница едет дальше сама.
 *
 * Разметка должна быть такой:
 *   <div ref={track} style={{ height: высотаТрека }}>
 *     <div ref={pane} className="sticky top-0" style={{ height: vh }}>…</div>
 *   </div>
 *
 * @param onProgress вызывается с долей 0..1; писать надо СРАЗУ в DOM через
 *        ref и CSS-переменные, без setState - иначе React перерисует
 *        страницу десятки раз в секунду и кнопки начнут отвечать с задержкой
 * @param enabled выключается при prefers-reduced-motion
 */
export function useScrollTrack(onProgress: (p: number) => void, enabled: boolean): ScrollTrack {
  const track = useRef<HTMLDivElement | null>(null);
  const pane = useRef<HTMLDivElement | null>(null);
  const cb = useRef(onProgress);
  cb.current = onProgress;

  const read = () => {
    const t = track.current;
    if (!t) return 0;
    const r = t.getBoundingClientRect();
    // Считаем по фактической высоте панели, а не по window.innerHeight:
    // на телефоне при скрытии адресной строки innerHeight меняется,
    // и прогресс дёргался бы на ровном месте.
    const viewH = pane.current?.offsetHeight || window.innerHeight;
    const span = r.height - viewH;
    return span <= 0 ? 1 : clamp01(-r.top / span);
  };

  /* Считаем до первой отрисовки. Если человек перезагрузил страницу
     в середине трека, браузер вернёт прокрутку туда же, и жёсткий ноль
     дал бы кадр с пустой сценой. */
  useLayoutEffect(() => {
    if (!enabled) return;
    cb.current(read());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  useEffect(() => {
    if (!enabled) { cb.current(1); return; }

    let raf = 0;
    let last = -1;
    let visible = true;
    let broken = false;

    const io = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver((es) => es.forEach((e) => { visible = e.isIntersecting; }), { rootMargin: '10% 0px' })
      : null;
    if (io && track.current) io.observe(track.current);

    const apply = () => {
      raf = 0;
      if (!visible) return;
      const p = read();
      if (Math.abs(p - last) < 0.0008) return;
      last = p;
      cb.current(p);
    };

    // Если что-то пойдёт не так, сцена остаётся в финальном состоянии,
    // а страница - прокручиваемой. Молча ломаться нельзя: это первый экран.
    const guarded = () => {
      try { apply(); } catch {
        broken = true;
        if (raf) cancelAnimationFrame(raf);
        cb.current(1);
      }
    };

    /* Считаем только когда человек прокручивает. Безостановочный
       requestAnimationFrame занимал бы главный поток и на неподвижной
       странице, из-за чего кнопки отзывались с задержкой. */
    const onScroll = () => {
      if (raf || broken) return;
      raf = requestAnimationFrame(guarded);
    };

    guarded();
    /* Слушаем на document в фазе перехвата, а НЕ на window.
       События scroll не всплывают, но в фазе перехвата document получает их
       от любого вложенного контейнера. Внутри обёртки редактора демо
       прокручивается именно во вложенном контейнере, поэтому слушатель
       на window там не срабатывал ни разу и сцена стояла на месте. */
    document.addEventListener('scroll', onScroll, { capture: true, passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener('scroll', onScroll, { capture: true } as EventListenerOptions);
      window.removeEventListener('resize', onScroll);
      io?.disconnect();
    };
  }, [enabled]);

  return { track, pane };
}

/** Записать число в CSS-переменную с округлением: меньше мусора в стилях. */
export function setVar(el: HTMLElement, name: string, value: number) {
  el.style.setProperty(name, String(Math.round(value * 1000) / 1000));
}
