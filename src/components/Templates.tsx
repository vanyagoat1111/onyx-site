import React, { useEffect, useRef, useState } from 'react';
import { Container, SectionTitle, Reveal } from './ui';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import SpaceTransition from './SpaceTransition';

const cases: {
/* Поле `result` описывает, ЧТО внутри шаблона, а не какой результат он
   принёс. Так было не всегда: на пяти карточках стояли обещания вроде
   «До +40% к конверсии» и «Рост вовлечённости и заявок».

   Это надо было убрать по трём причинам, и каждой хватило бы отдельно.

   Демо придуманные - мы сами пишем об этом в витрине: «названия и цифры
   на демо придуманы». Значит и результата у них не было, измерять было
   нечего, и цифра взята из воздуха.

   Второе: обещание роста без подтверждения - это как раз то, за что
   в чек-листе мы советуем обходить студию стороной. Нельзя учить клиента
   не верить таким обещаниям и давать их на той же странице.

   Третье: по 38-ФЗ утверждение об эффективности надо уметь подтвердить.
   Наш же юридический аудит это и отметил.

   Описание состава работает не хуже: «калькулятор плеча и срока» человек
   проверит на демо через десять секунд, а «+40% к конверсии» - никогда. */
  name: string; category: string; url: string; problem: string; result: string;
  previewImg?: string; tone?: string[];
}[] = [
  {
    name: 'Artel Interiors',
    category: 'Премиум-интерьеры',
    url: '#case/artel',
    problem: 'Нет площадки, отражающей премиальный уровень услуг.',
    result: 'Имидж-сайт с портфолио, процессом и заявками.',
    previewImg: '/case6.1.png',
  },
  {
    name: 'DentalArt',
    category: 'Медицина',
    url: '#case/dental',
    problem: 'Устаревший сайт, нет доверия, мало заявок.',
    result: 'Врачи, услуги с ценами и онлайн-запись с рекламы.',
    previewImg: '/case1.1.png',
  },
  {
    name: 'Iron Core',
    category: 'Спорт',
    url: '#case/fitness',
    problem: 'Сайт не продаёт абонементы.',
    result: 'Направления, тренеры, абонементы и пробное занятие.',
    previewImg: '/case2.1.png',
  },
  {
    name: 'Prime Logistics',
    category: 'B2B',
    url: '#case/logistics',
    problem: 'Нет заявок с сайта.',
    result: 'Калькулятор плеча и срока, короткие формы заявки.',
    previewImg: '/case3.1.png',
  },
  {
    name: 'Egorov & Partners',
    category: 'Право',
    url: '#case/lawfirm',
    problem: 'Низкое доверие клиентов.',
    result: 'Практика, кейсы с результатом и запись на консультацию.',
    previewImg: '/case4.1.png',
  },
  {
    name: 'Vanguard Estates',
    category: 'Элитная недвижимость',
    url: '#case/realestate',
    problem: 'Сложно продавать объекты через сайт.',
    result: 'Каталог с фильтрами и подбором объекта в два клика.',
    previewImg: '/case5.1.png',
  },
  {
    name: 'Osnova',
    category: 'Строительство',
    url: '#case/construction',
    problem: 'Смету обещают, но не показывают.',
    result: 'Фиксированная цена и калькулятор дома.',
    tone: ['#C8703C', '#2A2620'],
    previewImg: '/covers/osnova.jpg',
  },
  {
    name: 'Fleur',
    category: 'Красота',
    url: '#case/beauty',
    problem: 'Салон теряется среди одинаковых.',
    result: 'Журнальная подача и запись на диагностику.',
    tone: ['#B4796B', '#E8D9CE'],
    previewImg: '/covers/fleur.jpg',
  },
  {
    name: 'Apex',
    category: 'Автосервис',
    url: '#case/auto',
    problem: 'Клиент не понимает, за что платит.',
    result: 'Прайс по кодам работ и фотоотчёты.',
    tone: ['#C4F82A', '#14170F'],
    previewImg: '/covers/apex.jpg',
  },
  {
    name: 'Forma',
    category: 'Производство',
    url: '#case/manufacturing',
    problem: 'Снабженцу негде посмотреть мощности.',
    result: 'Парк оборудования и расчёт по чертежу.',
    tone: ['#5B8BB5', '#121722'],
    previewImg: '/covers/forma.jpg',
  },
  {
    name: 'Brasero',
    category: 'Рестораны',
    url: '#case/food',
    problem: 'Меню только в PDF, брони по телефону.',
    result: 'Живое меню, залы и доставка на сайте.',
    tone: ['#D4703A', '#1C1614'],
    previewImg: '/covers/brasero.jpg',
  },
  {
    name: 'Taiga',
    category: 'Отели и отдых',
    url: '#case/hotel',
    problem: 'Гость не понимает, что входит в цену.',
    result: 'Домики, календарь и расчёт без сюрпризов.',
    tone: ['#7E9B6E', '#161C16'],
    previewImg: '/covers/taiga.jpg',
  },
  {
    name: 'Method',
    category: 'Образование',
    url: '#case/education',
    problem: 'Курсы описаны одинаково и без результата.',
    result: 'Программы по уровням и цифры выпускников.',
    tone: ['#F2C14E', '#18203A'],
    previewImg: '/covers/method.jpg',
  },
  {
    name: 'Vector',
    category: 'Услуги для бизнеса',
    url: '#case/b2b',
    problem: 'Консалтинг продаётся вслепую.',
    result: 'Тарифы, диагностика и ответственность в договоре.',
    tone: ['#2F5DA8', '#EDEEEB'],
    previewImg: '/covers/vector.jpg',
  },
];

export default function Templates() {
  const n = cases.length;
  const [active, setActive] = useState(0);
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [warp, setWarp] = useState(false);
  const [warpLabel, setWarpLabel] = useState('');
  const pendingUrl = useRef<string | null>(null);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (i: number) => setActive(((i % n) + n) % n);
  const next = () => go(active + 1);
  const prev = () => go(active - 1);

  const launchWarp = (name: string, url: string) => {
    if (warp) return;
    pendingUrl.current = url;
    setWarpLabel(name);
    setWarp(true);
  };

  const onWarpDone = () => {
    setWarp(false);
    if (pendingUrl.current) {
      window.location.hash = pendingUrl.current;
      pendingUrl.current = null;
    }
  };

  /* ═══ ЛИСТАНИЕ ═══

     Было так: палец двигался, а галерея стояла. Она ждала, пока сдвиг
     перевалит за шестьдесят точек, и только тогда одним прыжком меняла
     карточку. Между началом жеста и реакцией - пустота, и человек в этот
     момент думает, что элемент неживой.

     Стало так: колода едет за пальцем непрерывно, а на отпускании
     доводится до ближайшей карточки. Быстрый короткий флик тоже считается
     переключением - по скорости, а не по пройденному расстоянию. */

  const [drag, setDrag] = useState(0);          // сдвиг в долях карточки
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef(0);
  const gapRef = useRef(1);

  /* Положение пересчитывается не чаще одного раза за кадр.

     touchmove на многих телефонах приходит чаще, чем экран успевает
     обновиться - до ста двадцати событий в секунду. Каждое из них
     перерисовывало бы колоду заново, и часть этой работы уходила бы
     впустую: кадр всё равно один. rAF собирает лишние события в одно
     обновление и отдаёт его ровно тогда, когда браузер готов рисовать. */
  const frame = useRef(0);
  const queueDrag = (v: number) => {
    dragRef.current = v;
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      setDrag(dragRef.current);
    });
  };
  useEffect(() => () => { if (frame.current) cancelAnimationFrame(frame.current); }, []);

  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (warp) return;
    const point = 'touches' in e ? e.touches[0] : (e as React.MouseEvent);
    const startX = point.clientX;
    const startY = point.clientY;
    const startT = Date.now();
    let axis: 'x' | 'y' | null = null;
    setDragging(true);

    const move = (ev: MouseEvent | TouchEvent) => {
      const pt = 'touches' in ev ? ev.touches[0] : ev;
      const dx = pt.clientX - startX;
      const dy = pt.clientY - startY;

      /* Направление жеста определяется один раз, по первым точкам.

         Без этого вертикальная прокрутка страницы пальцем поверх галереи
         дёргала бы карточки вбок. touch-action: pan-y отдаёт вертикаль
         браузеру, но горизонтальную составляющую мы всё равно получаем. */
      if (axis === null) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
        if (axis === 'y') { end(); return; }
      }
      const frac = dx / gapRef.current;
      /* Сопротивление на краях не нужно - колода закольцована,
         но ограничение бережёт от рывка при резком жесте. */
      const clamped = Math.max(-2.2, Math.min(2.2, frac));
      queueDrag(clamped);
    };

    const end = () => {
      window.removeEventListener('mousemove', move as any);
      window.removeEventListener('mouseup', end);
      window.removeEventListener('touchmove', move as any);
      window.removeEventListener('touchend', end);
      window.removeEventListener('touchcancel', end);

      const d = dragRef.current;
      const ms = Math.max(1, Date.now() - startT);
      const speed = Math.abs(d) / ms;          // карточек в миллисекунду

      /* Два условия, любого хватает: увели больше трети карточки
         или сделали быстрый флик. Второе - то, чего не хватало:
         короткий резкий смах раньше просто не засчитывался. */
      let step = 0;
      if (Math.abs(d) > 0.34 || speed > 0.0016) step = -Math.sign(d) * Math.max(1, Math.round(Math.abs(d)));

      if (Math.abs(d) > 0.04) suppressClick.current = Date.now();
      if (frame.current) { cancelAnimationFrame(frame.current); frame.current = 0; }
      dragRef.current = 0;
      setDrag(0);
      setDragging(false);
      if (step) setActive((a) => (((a + step) % n) + n) % n);
    };

    window.addEventListener('mousemove', move as any);
    window.addEventListener('mouseup', end);
    window.addEventListener('touchmove', move as any, { passive: true });
    window.addEventListener('touchend', end);
    window.addEventListener('touchcancel', end);
  };

  const suppressClick = useRef(0);

  /* Горизонтальное колесо и тачпад. На ноутбуке двумя пальцами вбок -
     привычный жест для такой галереи, а раньше он не работал вовсе. */
  const wheelLock = useRef(0);
  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;   // вертикаль отдаём странице
    const now = Date.now();
    if (now - wheelLock.current < 320) return;
    if (Math.abs(e.deltaX) < 18) return;
    wheelLock.current = now;
    if (e.deltaX > 0) next(); else prev();
  };

  const isMobile = vw < 760;
  const gap = Math.min(300, vw * (isMobile ? 0.44 : 0.24));
  const depth = isMobile ? 180 : 260;
  const sideScale = isMobile ? 0.82 : 0.9;
  const sideOpacity = isMobile ? 0.3 : 0.55;
  const maxVisible = isMobile ? 1 : 2;
  const stageHeight = isMobile ? 'min(72vh, 460px)' : '560px';
  gapRef.current = gap;

  const deck = cases.map((c, i) => {
    let off = i - active;
    if (off > n / 2) off -= n;
    if (off < -n / 2) off += n;

    /* Позиция теперь дробная: целое смещение плюс текущий сдвиг пальца.
       Все величины считаются от неё, поэтому карточка не перескакивает
       из состояния в состояние, а переходит непрерывно. */
    const pos = off + drag;
    const abs = Math.abs(pos);
    const t = Math.min(abs, 1);                 // 0 в центре, 1 и дальше по краям
    const isCenter = Math.abs(off) === 0;

    /* Дальние карточки не рисуются вовсе.

       Раньше в разметке всегда висели все четырнадцать: с нулевой
       прозрачностью, но с теми же трёхмерными преобразованиями и тенью
       в девяносто точек размытия. Браузер честно пересчитывал каждую
       на каждом кадре. Видно от силы пять - остальные девять были
       чистой нагрузкой. */
    if (abs > maxVisible + 1.2) return null;

    return {
      ...c,
      idx: i,
      isCenter,
      veil: t * 0.42,
      style: {
        transform: `translate(-50%,-50%) translateX(${pos * gap}px) translateZ(${-abs * depth}px) rotateY(${-Math.max(-1, Math.min(1, pos)) * 32}deg) scale(${1 - t * (1 - sideScale)})`,
        opacity: abs > maxVisible ? Math.max(0, 1 - (abs - maxVisible) / 1.2) * sideOpacity : 1 - t * (1 - sideOpacity),
        zIndex: 1000 - Math.round(abs * 10),   // дробный порядок: слои не перещёлкиваются посреди жеста
        borderColor: isCenter ? 'rgba(78,124,255,0.4)' : 'rgba(242,240,233,0.08)',
        boxShadow: isCenter
          ? '0 40px 90px rgba(0,0,0,0.6), 0 0 0 1px rgba(78,124,255,0.15)'
          : '0 20px 50px rgba(0,0,0,0.5)',
      },
    };
  }).filter(Boolean) as (typeof cases[number] & { idx: number; isCenter: boolean; veil: number; style: React.CSSProperties })[];

  /* Переход выключается на время жеста.

     Иначе получается гонка: палец задаёт новое положение каждый кадр,
     а анимация в это же время тянет карточку к предыдущему. Колода едет
     с задержкой и как будто вязнет. Пока палец на экране - положение
     ставится напрямую, после отпускания включается доводка.

     В списке свойств нет filter. Затемнение боковых карточек раньше
     делалось через brightness, а это заставляет браузер перерисовывать
     весь слой на каждом кадре - для четырнадцати карточек с тенью
     в девяносто точек размытия. Теперь сверху лежит полупрозрачная
     плашка: она живёт на композиторе, то есть без перерисовки. */
  const cardMove = dragging
    ? 'none'
    : 'transform 520ms cubic-bezier(0.22,1,0.36,1), opacity 520ms cubic-bezier(0.22,1,0.36,1)';
  const cardFade = dragging ? 'none' : 'opacity 520ms cubic-bezier(0.22,1,0.36,1)';

  return (
    <Container id="templates" pad="air" className="relative border-t border-white/[0.06] scroll-mt-20">
      <SpaceTransition active={warp} label={warpLabel} onDone={onWarpDone} />
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
        <SectionTitle index="05" size="loud" glow={true} subtitle="Шаблоны и готовые решения" className="!mb-0 max-w-3xl">
          Живые демо в 3D-галерее - листайте и заходите внутрь
        </SectionTitle>
        <span className="hidden md:block font-mono text-xs text-fog whitespace-nowrap pb-3">({n}) проектов</span>
      </div>

      <Reveal>
        <div
          className="relative w-full select-none [perspective:2200px]"
          style={{ height: stageHeight, touchAction: 'pan-y' }}
          onMouseDown={onDragStart}
          onTouchStart={onDragStart}
          onWheel={onWheel}
        >
          {deck.map((card) => (
            <div
              key={card.idx}
              className="absolute top-1/2 left-1/2 w-[min(640px,86vw)] [transform-style:preserve-3d] cursor-pointer will-change-transform"
              style={{
                ...card.style,
                transition: cardMove,
              }}
              onClick={() => {
                if (Date.now() - suppressClick.current < 250) return;
                card.isCenter ? launchWarp(card.name, card.url) : go(card.idx);
              }}
            >
              <div
                className="rounded-[26px] overflow-hidden border bg-[#101015]"
                style={{ borderColor: card.style.borderColor as string, boxShadow: card.style.boxShadow as string }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {card.previewImg ? (
                    <img
                      src={card.previewImg}
                      alt={`Кейс: ${card.name}`}
                      draggable={false}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ background: `linear-gradient(140deg, ${card.tone?.[1]}, ${card.tone?.[0]})` }}
                      aria-label={`Кейс: ${card.name}`}
                    >
                      <span
                        className="font-display font-semibold uppercase tracking-[0.2em] text-[clamp(18px,3.4vw,34px)]"
                        style={{ color: 'rgba(255,255,255,0.9)', mixBlendMode: 'overlay' }}
                      >
                        {card.name}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" style={{ backgroundImage: 'linear-gradient(to top, rgba(10,10,13,0.85), transparent 55%)' }} />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: '#05060a', opacity: card.veil, transition: cardFade }}
                  />
                  {/* Акцент помечает только карточку в фокусе.

                      До этого в галерее кобальт встречался четыре раза на всю
                      секцию - то есть в самом убедительном месте сайта акцента
                      не было вовсе, и глаз не понимал, по какой карточке
                      кликать. Теперь цвет делает работу: он показывает, что
                      активно сейчас, а не украшает всё подряд. */}
                  <span
                    className="absolute top-5 left-5 rounded-full backdrop-blur-md text-[10px] font-mono tracking-wider uppercase px-3.5 py-1.5 transition-colors duration-500"
                    style={card.isCenter
                      ? { background: 'rgba(78,124,255,0.16)', border: '1px solid rgba(78,124,255,0.5)', color: '#8aa6ff' }
                      : { background: 'rgba(10,10,13,0.7)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(242,240,233,0.9)' }}
                  >
                    {card.category}
                  </span>
                  <span
                    className="absolute top-5 right-5 w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-500"
                    style={card.isCenter
                      ? { background: '#4e7cff', border: '1px solid #4e7cff', color: '#fff', boxShadow: '0 8px 26px rgba(78,124,255,0.45)' }
                      : { background: 'rgba(10,10,13,0.7)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(242,240,233,0.85)' }}
                  >
                    <ArrowUpRight className="w-4.5 h-4.5" />
                  </span>
                  <div className="absolute left-6 right-6 bottom-5">
                    <h3 className="font-display font-semibold text-xl md:text-2xl text-white mb-1.5">{card.name}</h3>
                    <p className="font-body text-[13px] text-fog">{card.result}</p>
                    {card.isCenter && (
                      <span className="mt-2.5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-cobalt-soft">
                        Открыть демо
                        <span className="inline-block w-[7px] h-[7px] border-b border-r rotate-[-45deg] border-cobalt-soft" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="flex items-center justify-center gap-7 mt-11">
        <button
          onClick={prev}
          aria-label="Предыдущий кейс"
          className="w-14 h-14 rounded-full border border-white/15 bg-white/[0.03] text-bone flex items-center justify-center transition-all duration-300 hover:bg-cobalt hover:border-cobalt hover:text-white hover:scale-[1.06]"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2.5">
          {cases.map((c, i) => (
            <button
              key={i}
              aria-label={`Перейти к кейсу ${c.name}`}
              onClick={() => go(i)}
              className="h-1.5 rounded-full transition-all duration-400"
              style={{
                width: i === active ? 28 : 6,
                background: i === active ? '#4e7cff' : 'rgba(242,240,233,0.2)',
              }}
            />
          ))}
        </div>
        <button
          onClick={next}
          aria-label="Следующий кейс"
          className="w-14 h-14 rounded-full border border-white/15 bg-white/[0.03] text-bone flex items-center justify-center transition-all duration-300 hover:bg-cobalt hover:border-cobalt hover:text-white hover:scale-[1.06]"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <p className="text-center mt-6 font-mono text-[11px] tracking-[0.2em] uppercase text-fog">
        Клик по центральной карточке - переход в демо через гиперпрыжок
      </p>
    </Container>
  );
}
