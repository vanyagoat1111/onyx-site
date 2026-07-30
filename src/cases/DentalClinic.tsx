import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = '', delay = 0, style }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function useCountUp(active: boolean, duration = 1600) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setT(1 - Math.pow(1 - p, 3));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, duration]);
  return t;
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
}

const navLinks = [
  { name: 'Услуги', href: 'services' },
  { name: 'Врачи', href: 'doctors' },
  { name: 'Преимущества', href: 'advantages' },
  { name: 'Частые вопросы', href: 'faq' },
  { name: 'Отзывы', href: 'reviews' },
  { name: 'Контакты', href: 'contacts' },
];

const clinicStatsData = [
  { value: 12000, suffix: '+', label: 'Довольных пациентов' },
  { value: 18, suffix: ' лет', label: 'Опыт клиники' },
  { value: 40, suffix: '+', label: 'Профессиональных наград' },
  { value: 99, suffix: '%', label: 'Лечения без боли' },
];

/* Приём этого шаблона: путь пациента по шагам.
   В стоматологии главный барьер - не цена, а неизвестность: человек
   не понимает, сколько раз придётся приехать, что будет больно и когда
   всё закончится. Развёрнутый шаг снимает ровно эти вопросы, поэтому
   у каждого этапа есть срок, длительность визита и честная строка
   «что вы почувствуете». */
const journeyData = [
  {
    title: 'Консультация', desc: 'Осмотр и обсуждение целей лечения',
    when: 'День 1', dur: '30–40 минут',
    detail: 'Смотрим состояние, спрашиваем, что беспокоит и чего хочется в итоге. Ничего не лечим в этот визит и ни к чему не склоняем.',
    feel: 'Ничего не почувствуете: только осмотр и разговор.',
  },
  {
    title: 'Диагностика', desc: '3D КТ и цифровое сканирование',
    when: 'День 1–2', dur: '20 минут',
    detail: 'Компьютерная томография и сканирование прикуса. Снимки остаются у вас и работают в любой другой клинике.',
    feel: 'Безболезненно. Нужно посидеть неподвижно пару минут.',
  },
  {
    title: 'План лечения', desc: 'Фиксированная смета и сроки',
    when: 'День 3–5', dur: '40 минут',
    detail: 'Показываем варианты с ценами и сроками, объясняем разницу. Смета фиксируется договором и не меняется по ходу.',
    feel: 'Самый спокойный визит: решаете вы, без давления.',
  },
  {
    title: 'Лечение', desc: 'Работа профильных специалистов',
    when: 'по плану', dur: 'от 1 до 8 визитов',
    detail: 'Каждый этап ведёт врач своего профиля. Перед началом согласовываем обезболивание, во время работы можно поднять руку и всё остановится.',
    feel: 'Под анестезией. Если почувствуете дискомфорт, добавим.',
  },
  {
    title: 'Наблюдение', desc: 'Контроль результата и гарантия',
    when: 'через 1, 6 и 12 мес.', dur: '20 минут',
    detail: 'Проверяем, как всё прижилось. Осмотры по гарантии бесплатные, напоминаем о них сами.',
    feel: 'Обычный осмотр, чаще всего без вмешательства.',
  },
].map((j, i) => ({ ...j, num: String(i + 1).padStart(2, '0') }));

const services = [
  { title: 'Имплантация зубов', mono: 'Им' },
  { title: 'Эстетическая стоматология', mono: 'Эс' },
  { title: 'Протезирование', mono: 'Пр' },
  { title: 'Ортодонтия', mono: 'Ор' },
  { title: 'Лечение зубов', mono: 'Ле' },
  { title: 'Профессиональная гигиена', mono: 'Ги' },
];

const doctors = [
  { initials: 'ЕК', name: 'Елена Валерьевна Крылова', role: 'Ортопед, эстетическая стоматология', years: 14 },
  { initials: 'ИП', name: 'Игорь Сергеевич Панов', role: 'Хирург-имплантолог', years: 11 },
  { initials: 'МГ', name: 'Марина Олеговна Гаврилова', role: 'Терапевт, лечение каналов', years: 9 },
  { initials: 'АН', name: 'Артём Дмитриевич Носов', role: 'Ортодонт', years: 8 },
].map((d) => ({ ...d, barWidth: Math.round(Math.min(100, (d.years / 15) * 100)) }));

const tech = [
  { stat: '3D', label: 'Компьютерная томография', desc: 'Точная диагностика перед имплантацией и лечением каналов.' },
  { stat: '×24', label: 'Дентальный микроскоп', desc: 'Увеличение для микроскопического лечения корневых каналов.' },
  { stat: '0%', label: 'Использование ртутных пломб', desc: 'Только современные светоотверждаемые композитные материалы.' },
  { stat: 'ISO', label: 'Стерилизация инструментов', desc: 'Автоклавирование и контроль по международным протоколам.' },
];

const advantages = [
  { title: 'Пожизненная гарантия', mono: '★', desc: 'Мы уверены в качестве нашей работы и материалах. На все виды имплантации предоставляется официальная пожизненная гарантия по договору.' },
  { title: 'Лечение во сне', mono: '☾', desc: 'Используем безопасный наркоз и седацию (закись азота, пропофол). Просыпаетесь — а красивая улыбка уже готова. Абсолютно без боли и стресса.' },
  { title: 'Искусственный интеллект', mono: 'AI', desc: 'Компьютерная 3D-томография анализируется нейросетью. Это исключает врачебные ошибки на этапе диагностики и позволяет спланировать точный результат.' },
  { title: 'Современные протоколы', mono: '✓', desc: 'Лечение строго по международным стандартам. Использование микроскопа при лечении каналов увеличивает срок службы зуба в несколько раз.' },
  { title: 'Все специалисты в одном месте', mono: 'Вс', desc: 'Вам не нужно искать разных врачей. Ортодонт, хирург, терапевт и ортопед совместно работают над вашим клиническим случаем в рамках одной клиники.' },
  { title: 'Прозрачные цены', mono: '₽', desc: 'Фиксируем стоимость лечения в плане до начала работ. Никаких скрытых платежей или внезапных доплат. Возможна рассрочка 0%.' },
];

const faqsData = [
  { q: 'Больно ли устанавливать имплантат?', a: 'Современная анестезия делает процедуру полностью безболезненной. Большинство пациентов отмечают, что имплантация переносится легче, чем удаление зуба. Также доступно лечение «во сне» (седация).' },
  { q: 'Даёте ли вы гарантию на коронки и имплантаты?', a: 'Да, мы предоставляем пожизненную гарантию от производителя на все системы имплантатов, а также 5-летнюю гарантию на ортопедические конструкции при соблюдении графика профилактических осмотров.' },
  { q: 'Как часто нужно делать профессиональную гигиену?', a: 'Врачи рекомендуют проводить профессиональную чистку зубов раз в 6 месяцев. Если у вас установлены брекеты, имплантаты или вы злоупотребляете кофе/курением — раз в 3-4 месяца.' },
  { q: 'Можно ли вылечить зуб за один визит?', a: 'Большинство терапевтических вмешательств, включая лечение кариеса и корневых каналов, мы проводим за одно посещение с использованием дентального микроскопа. Сложные случаи могут потребовать 2-3 визитов.' },
  { q: 'Принимаете ли вы полисы ДМС?', a: 'Да, наша клиника сотрудничает с ведущими страховыми компаниями СОГАЗ, Ингосстрах, РЕСО-Гарантия, АльфаСтрахование. Пожалуйста, уточните детали у администратора при записи.' },
];

const reviewsData = [
  { name: 'Анна В.', initial: 'А', text: 'Долго искала клинику для имплантации. Здесь всё прошло идеально. Врачи настоящие профессионалы своего дела, а сервис на высшем уровне.' },
  { name: 'Михаил Т.', initial: 'М', text: 'Ставил виниры у Елены Валерьевны. Результат превзошёл все ожидания! Улыбаюсь теперь постоянно и получаю комплименты.' },
  { name: 'Екатерина С.', initial: 'Е', text: 'Лучшая клиника в Москве! Лечу зубы только здесь. Никакой боли, всегда чисто, красиво и уютно. Рекомендую всем друзьям.' },
];

function PatientJourney() {
  const [i, setI] = useState(0);
  const cur = journeyData[i];
  const GRAD = 'linear-gradient(135deg,#0891B2,#22D3EE)';

  return (
    <Reveal>
      <div className="relative">
        <div className="hidden md:block absolute top-[27px] left-[10%] right-[10%] h-[3px] rounded bg-slate-200" />
        <div
          className="hidden md:block absolute top-[27px] left-[10%] h-[3px] rounded transition-[width] duration-500"
          style={{ background: GRAD, width: `${(i / (journeyData.length - 1)) * 80}%` }}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {journeyData.map((j, k) => {
            const on = k === i;
            const past = k < i;
            return (
              <button
                key={j.num} type="button" onClick={() => setI(k)} aria-pressed={on}
                className="text-center group"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4 relative z-10 transition-all duration-300"
                  style={{
                    background: on || past ? GRAD : '#fff',
                    color: on || past ? '#fff' : '#94A3B8',
                    border: on || past ? 'none' : '2px solid #E2E8F0',
                    transform: on ? 'scale(1.1)' : 'scale(1)',
                    boxShadow: on ? '0 14px 30px -8px rgba(8,145,178,0.5)' : 'none',
                  }}
                >
                  {j.num}
                </div>
                <h4 className={`text-sm font-bold mb-1.5 transition-colors ${on ? 'text-[#0891B2]' : 'text-slate-800'}`}>{j.title}</h4>
                <p className="text-xs text-slate-500 leading-[1.5]">{j.when}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 bg-white rounded-2xl border border-slate-200 p-7 md:p-9 shadow-[0_18px_44px_-24px_rgba(15,42,58,0.28)]">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
          <h3 className="font-spectral text-[22px] md:text-[27px] font-semibold text-slate-900">{cur.title}</h3>
          <span className="text-[12px] font-semibold px-3 py-1.5 rounded-full" style={{ background: 'rgba(8,145,178,0.1)', color: '#0891B2' }}>
            {cur.when} · {cur.dur}
          </span>
        </div>
        <p className="text-[14.5px] leading-[1.8] text-slate-600 max-w-[68ch]">{cur.detail}</p>
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-start gap-3">
          <span className="shrink-0 mt-[3px] w-2 h-2 rounded-full" style={{ background: '#22D3EE' }} />
          <p className="text-[14px] leading-[1.7] text-slate-700">
            <span className="font-semibold">Что почувствуете: </span>{cur.feel}
          </p>
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <button
            type="button" onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0}
            className="px-5 py-2.5 rounded-lg text-[13px] border border-slate-200 text-slate-600 disabled:opacity-35 hover:border-slate-400 transition-colors active:scale-[0.97] active:duration-75"
          >
            ← Назад
          </button>
          <button
            type="button" onClick={() => setI(Math.min(journeyData.length - 1, i + 1))} disabled={i === journeyData.length - 1}
            className="px-5 py-2.5 rounded-lg text-[13px] border border-slate-200 text-slate-600 disabled:opacity-35 hover:border-slate-400 transition-colors active:scale-[0.97] active:duration-75"
          >
            Дальше →
          </button>
          <button
            type="button"
            onClick={() => document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-2.5 rounded-lg text-[13px] font-semibold text-white transition-transform hover:-translate-y-[2px] active:scale-[0.97] active:duration-75"
            style={{ background: GRAD }}
          >
            Записаться на консультацию
          </button>
        </div>
      </div>
    </Reveal>
  );
}

export default function DentalClinic() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [statsRef, statsVis] = useInView<HTMLDivElement>();
  const countT = useCountUp(statsVis);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  /* Фактура tex-clinic - мелкая стерильная сетка: чистота кабинета.

     Плоская заливка читается как заготовка: глазу не за что зацепиться. */

  return (
    <div className="relative min-h-screen bg-white text-slate-800 font-jakarta selection:bg-[#0891B2]/[0.18] selection:text-[#0F2A3A] overflow-x-clip tex-clinic">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[#0891B2]/[0.12]">
        <div className="max-w-[1360px] mx-auto px-6 md:px-8 py-4.5 flex justify-between items-center pl-20 md:pl-24">
          <div className="font-spectral text-2xl font-semibold text-[#0C4A6E]">Dental<span className="text-[#0891B2]">Art</span></div>
          <nav className="hidden lg:flex gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={`#${l.href}`} onClick={(e) => scrollTo(e, l.href)} className="relative text-sm font-medium text-slate-600 hover:text-[#0891B2] transition-colors group active:brightness-95 active:duration-75">
                {l.name}
                <span className="absolute left-0 right-full -bottom-1 h-0.5 rounded-full transition-all duration-300 group-hover:right-0" style={{ background: 'linear-gradient(90deg,#0891B2,#22D3EE)' }} />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <div className="hidden lg:block text-right">
              <div className="text-sm font-bold text-slate-800">+7 (495) 123-45-67</div>
              <div className="text-[11px] text-slate-500">Ежедневно 09:00 – 21:00</div>
            </div>
            <button type="button" onClick={(e: any) => scrollTo(e, 'contacts')} style={{ background: 'linear-gradient(135deg,#0891B2,#0E7490)', boxShadow: '0 10px 24px -8px rgba(8,145,178,0.45)' }} className="text-white px-6.5 py-3 rounded-full text-sm font-bold border-none cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-10px_rgba(8,145,178,0.45)] active:scale-[0.97] active:duration-75">Записаться</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative py-16 md:py-24 px-6 md:px-8 pb-20 md:pb-24 overflow-hidden" style={{ background: 'linear-gradient(to bottom,#F0F9FF,#FFFFFF)' }}>
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          <div>
            {/* ── Первый экран переписан под страх, а не под улыбку ──

                Было: «Здоровая улыбка с гарантией экспертов», акцентное
                слово - градиентным курсивом. Три проблемы разом.

                Заголовок подходил любой клинике страны: подставь другое
                название - ничего не изменится. Это верный признак, что
                он ни о чём.

                Градиентный текст с курсивом - приём, который стоит на
                каждом втором медицинском сайте. Он не читается как
                премиальность, он читается как шаблон.

                И главное: человек перед стоматологией думает не про
                улыбку. Он думает «будет больно» и «разведут на лишнее».
                Первый экран, который говорит про улыбку, отвечает не на
                тот вопрос - и человек уходит читать отзывы к конкурентам.

                Стало: заголовок называет страх и снимает его. Акцент -
                не цветом, а начертанием: Spectral в обычном и полужирном
                рядом даёт контраст сильнее градиента и не выглядит
                нарядно там, где нарядно неуместно.

                «За один визит» убрано: это обещание результата, которое
                нельзя гарантировать, - тот самый пункт, за который мы
                сами советуем обходить подрядчика стороной. */}
            <span className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] mb-7" style={{ background: 'rgba(8,145,178,0.1)', color: '#0369A1' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#0891B2' }} />
              Стоматология в Москве · с 2009 года
            </span>
            <h1 className="font-spectral text-[34px] sm:text-[46px] md:text-[60px] leading-[1.05] text-slate-900 mb-6.5 [text-wrap:balance]">
              <span className="font-normal">Вы будете знать цену и план</span><br />
              <span className="font-semibold">до того, как сядете в кресло</span>
            </h1>
            <p className="text-base sm:text-[17px] text-slate-600 leading-[1.65] max-w-[490px] mb-8.5">
              Сначала осмотр и снимок, потом смета с фиксированной суммой. Ни одна процедура не начинается, пока вы её не согласовали, - и ничего не добавляется по ходу.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button type="button" onClick={(e: any) => scrollTo(e, 'contacts')} style={{ background: 'linear-gradient(135deg,#0891B2,#0E7490)', boxShadow: '0 12px 28px -8px rgba(8,145,178,0.4)' }} className="text-white px-8 py-4.5 rounded-full text-[15px] font-bold border-none cursor-pointer transition-all hover:-translate-y-0.5 active:scale-[0.97] active:duration-75">Записаться на приём</button>
              <button type="button" onClick={(e: any) => scrollTo(e, 'services')} className="bg-white text-slate-800 px-8 py-4.5 rounded-full text-[15px] font-bold border border-slate-200 cursor-pointer transition-colors hover:bg-[#F0F9FF] active:scale-[0.97] active:duration-75">Прайс-лист</button>
            </div>

            {/* Микроподписи: три факта, которые снимают остаток недоверия.
                В файле их было три штуки на пятьсот строк - мелкий текст
                рядом с блоками и создаёт ощущение редакторской работы,
                без него страница выглядит собранной наспех. */}
            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-2.5">
              {[
                ['01', 'Смета фиксируется договором'],
                ['02', 'Снимок и осмотр — 0 ₽'],
                ['03', 'Гарантия на работу 3 года'],
              ].map(([n, t]) => (
                <span key={n} className="flex items-baseline gap-2 text-[12px] text-slate-500">
                  <span className="font-mono text-[10px] tracking-[0.16em]" style={{ color: '#0891B2' }}>{n}</span>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-[110%] h-[110%] z-0" style={{ background: 'radial-gradient(circle,rgba(34,211,238,0.25),transparent 70%)', filter: 'blur(50px)' }} />
            <div className="relative z-10 h-[320px] sm:h-[400px] md:h-[480px] rounded-[32px] overflow-hidden" style={{ boxShadow: '0 40px 90px -24px rgba(8,145,178,0.35)' }}>
              <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=80" alt="Клиника DentalArt" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(3,54,73,0.55),transparent 55%)' }} />
            </div>

            {/* ── Композиция с нарушением ──

                Карточка выходит за границу фотографии и за сетку колонки.
                Ровные две колонки читаются как макет из конструктора;
                один элемент, который их нарушает, делает страницу
                спроектированной.

                Но нарушение здесь не ради приёма. Внутри - главный ответ
                на страх, с которым человек и пришёл: сколько это займёт
                и что он почувствует. Это тот же приём ниши, который
                раскрыт ниже на всю страницу, вынесенный на первый экран
                одним фрагментом - чтобы не надо было доскроливать.

                На телефоне нарушение снимается: там всё в одну колонку,
                и вылезающий за край блок превратился бы в горизонтальную
                прокрутку, а не в приём. */}
            <div className="relative z-20 mt-6 lg:mt-0 lg:absolute lg:-bottom-9 lg:-left-14 lg:w-[330px] rounded-[26px] bg-white p-6"
                 style={{ boxShadow: '0 26px 60px -18px rgba(8,50,73,0.28)', border: '1px solid rgba(8,145,178,0.14)' }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] mb-4" style={{ color: '#0891B2' }}>
                Первый визит
              </p>
              {[
                ['Осмотр и снимок', '25 минут', 'Неприятно не будет: врач только смотрит'],
                ['Разбор снимка', '15 минут', 'Показываем на экране, что видим и почему'],
                ['Смета и план', '20 минут', 'Уходите с суммой на руках. Решаете дома'],
              ].map(([step, time, feel], i) => (
                <div key={step} className={i < 2 ? 'pb-4 mb-4 border-b border-slate-100' : ''}>
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <span className="text-[14.5px] font-semibold text-slate-800">{step}</span>
                    <span className="font-mono text-[11px] shrink-0" style={{ color: '#0891B2' }}>{time}</span>
                  </div>
                  <p className="text-[12.5px] text-slate-500 leading-snug">{feel}</p>
                </div>
              ))}
              <p className="mt-4 pt-4 border-t border-slate-100 text-[12px] text-slate-500">
                Всего <span className="font-semibold text-slate-700">час</span>. Лечение в этот день не начинаем.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="bg-[#0C4A6E] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(#22D3EE 1px,transparent 1px),linear-gradient(90deg,#22D3EE 1px,transparent 1px)', backgroundSize: '56px 56px' }} />
        <div ref={statsRef} className="max-w-[1280px] mx-auto relative z-10 grid grid-cols-2 lg:grid-cols-4">
          {clinicStatsData.map((s, i) => (
            <div key={s.label} className={`py-12 md:py-14 px-6 text-center ${i < clinicStatsData.length - 1 ? 'lg:border-r border-white/10' : ''}`}>
              <div className="font-spectral text-3xl md:text-[52px] font-semibold text-white leading-none mb-3">{Math.round(s.value * countT).toLocaleString('ru-RU')}{s.suffix}</div>
              <div className="text-xs uppercase tracking-[0.12em] text-[#7DD3FC]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 md:py-28 px-6 md:px-8 scroll-mt-20">
        <div className="max-w-[1280px] mx-auto">
          <Reveal className="text-center max-w-[640px] mx-auto mb-14 md:mb-16">
            <h2 className="font-spectral text-3xl md:text-[38px] font-semibold text-slate-900 mb-4">Услуги и цены</h2>
            <p className="text-slate-500 text-[15px]">Мы предлагаем полный спектр стоматологических услуг.</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((svc, i) => (
              <Reveal key={svc.title} delay={(i % 3) * 0.07} className="group p-9 rounded-3xl bg-white border border-slate-100 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-24px_rgba(8,145,178,0.25)] hover:border-[#0891B2]/35">
                <div style={{ background: 'linear-gradient(135deg,#0891B2,#22D3EE)', boxShadow: '0 10px 22px -8px rgba(8,145,178,0.4)' }} className="w-13 h-13 rounded-2xl text-white flex items-center justify-center font-bold text-base mb-6.5">{svc.mono}</div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">{svc.title}</h3>
                <p className="text-[13px] text-slate-500 leading-[1.6] mb-5.5">Комплексный подход и использование передовых материалов для достижения идеального результата.</p>
                <span className="text-[#0891B2] font-semibold text-[13px] inline-flex items-center gap-2 transition-all duration-300 group-hover:gap-3">Подробнее →</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DOCTORS */}
      <section id="doctors" className="bg-[#F8FAFC] py-20 md:py-28 px-6 md:px-8 scroll-mt-20">
        <div className="max-w-[1280px] mx-auto">
          <Reveal className="text-center max-w-[640px] mx-auto mb-14 md:mb-16">
            <h2 className="font-spectral text-3xl md:text-[38px] font-semibold text-slate-900 mb-4">Врачи клиники</h2>
            <p className="text-slate-500 text-[15px]">Команда сертифицированных специалистов с опытом от 8 лет в своей области.</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doc, i) => (
              <Reveal key={doc.name} delay={i * 0.08} className="bg-white rounded-3xl border border-slate-100 shadow-[0_1px_2px_rgba(15,23,42,0.04)] p-7 flex flex-col transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-24px_rgba(8,145,178,0.25)] hover:border-[#0891B2]/35">
                <div style={{ background: 'linear-gradient(135deg,#E0F2FE,#CFFAFE)', color: '#0369A1' }} className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl mb-5.5">{doc.initials}</div>
                <h3 className="text-[15px] font-bold text-slate-800 mb-1 leading-[1.4]">{doc.name}</h3>
                <p className="text-[13px] text-[#0891B2] font-medium mb-5.5">{doc.role}</p>
                <div className="mt-auto pt-4.5 border-t border-slate-100">
                  <div className="flex justify-between mb-2">
                    <span className="text-[9px] uppercase tracking-[0.15em] text-slate-400">Опыт практики</span>
                    <span className="text-[13px] font-bold text-slate-700">{doc.years} лет</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${doc.barWidth}%` }} viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE }} className="h-full rounded-full" style={{ background: 'linear-gradient(90deg,#0891B2,#22D3EE)' }} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section id="technology" className="py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-[1280px] mx-auto">
          <Reveal className="text-center max-w-[640px] mx-auto mb-14 md:mb-16">
            <h2 className="font-spectral text-3xl md:text-[38px] font-semibold text-slate-900 mb-4">Оборудование и технологии</h2>
            <p className="text-slate-500 text-[15px]">Диагностика и лечение на оборудовании экспертного класса.</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tech.map((t, i) => (
              <Reveal key={t.label} delay={i * 0.07} className="p-8 rounded-3xl border border-slate-100 text-center transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-24px_rgba(8,145,178,0.25)] hover:border-[#0891B2]/35" style={{ background: 'linear-gradient(to bottom,#F8FAFC,#fff)' }}>
                <div className="font-spectral text-3xl font-semibold mb-3.5" style={{ background: 'linear-gradient(135deg,#0891B2,#22D3EE)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{t.stat}</div>
                <h3 className="text-sm font-bold text-slate-800 mb-2">{t.label}</h3>
                <p className="text-xs text-slate-500 leading-[1.6]">{t.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="bg-[#F0F9FF] py-20 md:py-28 px-6 md:px-8 scroll-mt-20">
        <div className="max-w-[1280px] mx-auto">
          <Reveal className="text-center max-w-[640px] mx-auto mb-14 md:mb-16">
            <h2 className="font-spectral text-3xl md:text-[38px] font-semibold text-slate-900 mb-4">Почему выбирают DentalArt?</h2>
            <p className="text-slate-500 text-[15px]">Стандарты качества, безопасность и бескомпромиссный подход к лечению.</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {advantages.map((adv, i) => (
              <Reveal key={adv.title} delay={(i % 3) * 0.07} className="bg-white p-8.5 rounded-3xl border border-slate-100 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-24px_rgba(8,145,178,0.25)] hover:border-[#0891B2]/35">
                <div style={{ background: 'linear-gradient(135deg,#0891B2,#22D3EE)', boxShadow: '0 10px 22px -8px rgba(8,145,178,0.4)' }} className="w-13 h-13 rounded-2xl text-white flex items-center justify-center font-bold text-base mb-6">{adv.mono}</div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">{adv.title}</h3>
                <p className="text-[13px] text-slate-500 leading-[1.65]">{adv.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TREATMENT JOURNEY */}
      <section className="py-20 md:py-28 px-6 md:px-8 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto">
          <Reveal className="text-center max-w-[660px] mx-auto mb-14 md:mb-[60px]">
            <h2 className="font-spectral text-3xl md:text-[38px] font-semibold text-slate-900 mb-4">Путь пациента в DentalArt</h2>
            <p className="text-slate-500 text-[15px]">
              Нажмите на этап - расскажем, сколько это займёт и что вы почувствуете.
              Обычно именно это и хочется узнать до записи.
            </p>
          </Reveal>
          <PatientJourney />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-28 px-6 md:px-8 scroll-mt-20">
        <div className="max-w-[900px] mx-auto">
          <Reveal className="text-center max-w-[640px] mx-auto mb-14 md:mb-16">
            <h2 className="font-spectral text-3xl md:text-[38px] font-semibold text-slate-900 mb-4">Часто задаваемые вопросы</h2>
            <p className="text-slate-500 text-[15px]">Мы собрали самые популярные вопросы от наших пациентов, чтобы развеять ваши сомнения.</p>
          </Reveal>
          <div className="flex flex-col gap-3.5">
            {faqsData.map((faq, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={faq.q} delay={i * 0.05} className="rounded-[20px] border border-slate-100 transition-colors duration-300" style={{ background: open ? '#F0F9FF' : '#F8FAFC' }}>
                  <button type="button" onClick={() => setOpenFaq(open ? null : i)} className="w-full flex justify-between items-center px-6.5 py-5.5 bg-transparent border-none cursor-pointer text-left">
                    <span className="text-base font-bold text-slate-800 pr-4">{faq.q}</span>
                    <span className="text-[#0891B2] text-xl shrink-0">{open ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden">
                        <p className="text-[13px] text-slate-500 leading-[1.65] px-6.5 pb-6">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="bg-[#F0F9FF] py-20 md:py-28 px-6 md:px-8 border-t border-[#E0F2FE] border-b scroll-mt-20">
        <div className="max-w-[1280px] mx-auto text-center">
          <Reveal><h2 className="font-spectral text-3xl md:text-[38px] font-semibold text-slate-900 mb-14">Отзывы пациентов</h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 text-left">
            {reviewsData.map((rev, i) => (
              <Reveal key={rev.name} delay={i * 0.08} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <div className="text-[#FBBF24] text-base mb-4">★★★★★</div>
                <p className="text-[13px] text-slate-600 leading-[1.65] mb-5.5 font-medium">«{rev.text}»</p>
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#E0F2FE] text-[#0369A1] flex items-center justify-center font-bold">{rev.initial}</div>
                  <div>
                    <div className="text-[13px] font-bold text-slate-900">{rev.name}</div>
                    <div className="text-[11px] text-slate-400">2ГИС</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING CTA */}
      <section className="py-20 md:py-28 px-6 md:px-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#0C4A6E,#0E7490)' }}>
        <div className="absolute -top-[20%] -right-[10%] w-3/5 aspect-square" style={{ background: 'radial-gradient(circle,rgba(34,211,238,0.2),transparent 70%)', filter: 'blur(60px)' }} />
        <Reveal className="max-w-[820px] mx-auto relative z-10 text-center">
          <h2 className="font-spectral text-3xl md:text-[44px] font-semibold text-white mb-6">Получите план лечения сегодня</h2>
          <p className="text-[#BAE6FD] text-base mb-10">Оставьте заявку на бесплатную консультацию с главным врачом клиники и КТ-снимок в подарок.</p>
          <form onSubmit={handleSubmit} className="max-w-[640px] mx-auto flex gap-3.5 flex-wrap">
            <input required type="text" placeholder="Ваше имя" className="flex-1 min-w-[180px] px-5.5 py-4 rounded-full bg-white/10 border border-white/25 text-white text-sm outline-none placeholder:text-white/55" />
            <input required type="tel" placeholder="Номер телефона" className="flex-1 min-w-[180px] px-5.5 py-4 rounded-full bg-white/10 border border-white/25 text-white text-sm outline-none placeholder:text-white/55" />
            <button type="submit" className="bg-white text-[#0C4A6E] px-8 py-4 rounded-full font-bold border-none cursor-pointer text-sm">Отправить</button>
          </form>
          {submitted && <p className="text-[#A5F3FC] text-[13px] mt-4">Заявка отправлена. Мы свяжемся с вами в ближайшее время.</p>}
          <p className="text-[rgba(186,230,253,0.6)] text-[11px] mt-4.5">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.</p>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer id="contacts" className="bg-slate-900 text-slate-400 pt-16 md:pt-[70px] pb-10 px-6 md:px-8 scroll-mt-20">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 mb-12">
          <div>
            <div className="font-spectral text-xl font-semibold text-white mb-4.5">Dental<span className="text-[#22D3EE]">Art</span></div>
            <p className="text-[13px] leading-[1.6]">Премиальная стоматологическая клиника в центре Москвы.</p>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4.5">Услуги</h4>
            <div className="flex flex-col gap-2.5 text-[13px]">
              <a href="#" onClick={(e) => e.preventDefault()} className="text-slate-400 hover:text-white transition-colors active:brightness-95 active:duration-75">Имплантация</a>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-slate-400 hover:text-white transition-colors active:brightness-95 active:duration-75">Виниры</a>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-slate-400 hover:text-white transition-colors active:brightness-95 active:duration-75">Отбеливание</a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4.5">Клиника</h4>
            <div className="flex flex-col gap-2.5 text-[13px]">
              <a href="#advantages" onClick={(e) => scrollTo(e, 'advantages')} className="text-slate-400 hover:text-white transition-colors active:brightness-95 active:duration-75">Преимущества</a>
              <a href="#faq" onClick={(e) => scrollTo(e, 'faq')} className="text-slate-400 hover:text-white transition-colors active:brightness-95 active:duration-75">Частые вопросы</a>
              <a href="#reviews" onClick={(e) => scrollTo(e, 'reviews')} className="text-slate-400 hover:text-white transition-colors active:brightness-95 active:duration-75">Отзывы</a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4.5">Контакты</h4>
            <div className="flex flex-col gap-2.5 text-[13px]">
              <span>Москва, Пресненская наб., 12</span>
              <span>+7 (495) 123-45-67</span>
              <span>info@dentalart.ru</span>
            </div>
          </div>
        </div>
        <div className="max-w-[1280px] mx-auto pt-7 border-t border-slate-800 flex justify-between gap-4 flex-wrap text-[11px]">
          <span>© 2026 DentalArt Clinic. Все права защищены. Лицензия № ЛО-77-01-000000.</span>
          <div className="flex gap-5">
            <a href="#" onClick={(e) => e.preventDefault()} className="text-slate-400">Политика конфиденциальности</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-slate-400">Договор оферты</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
