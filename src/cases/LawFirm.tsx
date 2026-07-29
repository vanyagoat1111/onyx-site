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
  { name: 'Практики', href: 'practice' },
  { name: 'Партнёры', href: 'partners' },
  { name: 'Принципы', href: 'principles' },
  { name: 'Этапы', href: 'process' },
  { name: 'Дела', href: 'cases' },
  { name: 'Контакты', href: 'contacts' },
];

const heroStats = [
  { value: '15+', label: 'Лет практики' },
  { value: '₽5 млрд+', label: 'Защищённых активов' },
  { value: '94%', label: 'Выигранных дел' },
  { value: 'Топ-15', label: 'Право.ru-300' },
];

const winRates = [
  { label: 'Корпоративные споры и M&A', pct: 96 },
  { label: 'Банкротство и субсидиарная ответственность', pct: 91 },
  { label: 'Арбитраж и налоговые споры', pct: 94 },
  { label: 'Недвижимость и строительство', pct: 89 },
];

/* Приём этого шаблона: оценка перспектив до звонка.

   В юридических услугах человек не звонит, пока не понимает двух вещей:
   есть ли у него шанс и во сколько это обойдётся. Пока обе цифры скрыты,
   он обходит десять сайтов и не оставляет заявку ни на одном.
   Здесь он выбирает тип спора и сумму - и видит ориентир, построенный
   на той же статистике, что показана ниже в блоке результатов. */
const disputeKinds = [
  { k: 'Корпоративный спор', rate: 96, base: 0.09, min: 180000, note: 'Чаще всего решается до суда, если начать рано' },
  { k: 'Банкротство и субсидиарка', rate: 91, base: 0.07, min: 250000, note: 'Срок от девяти месяцев, работа идёт этапами' },
  { k: 'Арбитраж и налоги', rate: 94, base: 0.08, min: 150000, note: 'Досудебная стадия часто снимает половину требований' },
  { k: 'Недвижимость и стройка', rate: 89, base: 0.06, min: 120000, note: 'Многое решает экспертиза, её закладываем сразу' },
];

const practices = [
  'Корпоративное право и M&A',
  'Разрешение споров и Арбитраж',
  'Банкротство и реструктуризация',
  'Налоговое право',
  'Уголовно-правовая защита бизнеса',
  'Недвижимость и строительство',
];

const partners = [
  { initials: 'ЕД', name: 'Егоров Дмитрий Александрович', role: 'Управляющий партнёр', spec: 'Корпоративные споры, M&A', years: 18 },
  { initials: 'СА', name: 'Соловьёва Анна Игоревна', role: 'Партнёр', spec: 'Банкротство, субсидиарная ответственность', years: 12 },
  { initials: 'МВ', name: 'Марков Виктор Павлович', role: 'Партнёр', spec: 'Арбитраж, налоговые споры', years: 15 },
];

const caseVolume = [
  { label: 'M&A и корпоративные', count: '120+', pct: 92 },
  { label: 'Банкротство', count: '85+', pct: 68 },
  { label: 'Арбитраж', count: '140+', pct: 100 },
  { label: 'Налоговые споры', count: '60+', pct: 46 },
  { label: 'Недвижимость', count: '45+', pct: 35 },
];

const principles = [
  { mono: '◆', title: 'Эксклюзивность', desc: 'Ограниченное количество дел в работе гарантирует максимальное погружение команды в специфику вашего бизнеса.' },
  { mono: '⛨', title: 'Конфиденциальность', desc: 'Строгое соблюдение адвокатской тайны. Сведения о доверителях никогда не становятся публичными без согласия.' },
  { mono: '↗', title: 'Ориентация на результат', desc: 'Мы предлагаем конкретные правовые решения для достижения экономической цели бизнеса, а не просто консультируем о рисках.' },
  { mono: '◎', title: 'Прозрачность', desc: 'Честная оценка судебных перспектив до подписания договора. Фиксированная стоимость услуг без скрытых платежей.' },
];

const process = [
  { n: '1', title: 'Правовой аудит', desc: 'Изучение материалов дела, анализ практики и выработка предварительной правовой позиции с оценкой рисков.' },
  { n: '2', title: 'Формирование стратегии', desc: 'Пошаговый план действий, сбор доказательной базы и согласование с доверителем тактики ведения дела.' },
  { n: '3', title: 'Реализация и защита', desc: 'Представительство интересов в судах и на переговорах, реализация стратегии до нужного результата.' },
];

const goldStats = [
  { value: '15+', label: 'Лет практики' },
  { value: '92%', label: 'Успешных дел' },
  { value: '5млрд+', label: 'Защищённых активов ₽' },
  { value: 'Топ-15', label: 'Рейтингов Право-300' },
];

const casesData = [
  { tag: 'Корпоративный конфликт • 2025', title: 'Защита мажоритарного акционера производственного холдинга', desc: 'Успешное отражение попыток недружественного поглощения. Суды трёх инстанций отказали оппонентам во взыскании убытков на сумму более 5 млрд рублей с доверителя.', tags: ['Арбитражный суд г. Москвы', 'Победа'] },
  { tag: 'Банкротство • 2024', title: 'Защита от субсидиарной ответственности бывших бенефициаров', desc: 'В деле о банкротстве крупного ритейлера доказали отсутствие причинно-следственной связи между действиями доверителей и банкротством, сохранив их активы на сумму 1.2 млрд рублей.', tags: ['Кассация', 'Победа'] },
];

const faqsData = [
  { q: 'Как формируется стоимость услуг?', a: 'Мы работаем по системе фиксированных гонораров (Flat Fee) или по почасовым ставкам (Hourly Rate), в зависимости от специфики проекта. В некоторых делах возможен гонорар успеха (Success Fee).' },
  { q: 'Даёте ли вы стопроцентную гарантию выигрыша в суде?', a: 'В соответствии с Кодексом профессиональной этики адвоката мы не имеем права давать гарантии исхода судебного спора. Но мы гарантируем профессиональный подход и максимальную защиту ваших интересов.' },
  { q: 'С какими регионами вы работаете?', a: 'Главный офис находится в Москве, но мы представляем интересы доверителей в арбитражных судах и судах общей юрисдикции по всей территории РФ.' },
  { q: 'Как обеспечивается конфиденциальность?', a: 'Конфиденциальность защищена законом об адвокатской деятельности. Любые сведения, связанные с оказанием правовой помощи, составляют строгую адвокатскую тайну.' },
];

function WinRateRings() {
  const [ref, vis] = useInView<HTMLDivElement>();
  const radii = [86, 64, 42];
  const colors = ['#C9A263', '#E8CB94', '#8A6A3B'];
  const vals = [96, 91, 94];
  return (
    <div ref={ref} className="relative w-full aspect-square max-w-[420px] mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
        <circle cx="100" cy="100" r="86" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="14" />
        <circle cx="100" cy="100" r="64" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="14" />
        <circle cx="100" cy="100" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="14" />
        {radii.map((r, i) => {
          const circ = 2 * Math.PI * r;
          const shown = vis ? vals[i] : 0;
          const offset = circ - (circ * shown) / 100;
          return (
            <circle key={i} cx="100" cy="100" r={r} fill="none" stroke={colors[i]} strokeWidth="14" strokeLinecap="round"
              strokeDasharray={circ} strokeDashoffset={offset} style={{ transition: 'stroke-dashoffset 1.3s cubic-bezier(0.22,1,0.36,1)' }} />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[40px] md:text-[48px] text-white font-medium leading-none">94%</div>
        <div className="font-sans text-[10px] uppercase tracking-[0.15em] text-slate-500 mt-2">общий win-rate</div>
      </div>
    </div>
  );
}

function CaseEstimator() {
  const [i, setI] = useState(0);
  const [mln, setMln] = useState(25);
  const d = disputeKinds[i];
  const GOLD = '#C9A263';

  const sum = mln * 1_000_000;
  const fee = Math.max(d.min, Math.round((sum * d.base) / 10000) * 10000);

  return (
    <section className="py-20 md:py-28 px-6 md:px-8 border-t border-white/[0.07]">
      <div className="max-w-[1180px] mx-auto">
        <div className="mb-10 max-w-[54ch]">
          <div className="font-manrope text-[11px] uppercase tracking-[0.28em] mb-4" style={{ color: GOLD }}>Оценка</div>
          <h2 className="text-[34px] md:text-[50px] leading-[1.08] text-white mb-5">Есть ли перспектива</h2>
          <p className="font-manrope text-[14.5px] leading-[1.8] text-slate-400">
            Выберите тип спора и сумму требований - покажем нашу статистику по этой
            категории и порядок гонорара. Это ориентир: окончательную оценку
            партнёр даёт после изучения документов.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-start">
          <div>
            <div className="font-manrope text-[11px] uppercase tracking-[0.16em] text-slate-500 mb-3">Категория спора</div>
            <div className="flex flex-col gap-2 mb-9">
              {disputeKinds.map((x, k) => (
                <button
                  key={x.k} type="button" onClick={() => setI(k)} aria-pressed={k === i}
                  className="font-manrope text-left px-5 py-4 text-[14px] border transition-colors cursor-pointer"
                  style={{
                    background: k === i ? 'rgba(201,162,99,0.12)' : 'transparent',
                    borderColor: k === i ? GOLD : 'rgba(255,255,255,0.1)',
                    color: k === i ? '#fff' : '#94a3b8',
                  }}
                >
                  {x.k}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-baseline mb-3">
              <span className="font-manrope text-[11px] uppercase tracking-[0.16em] text-slate-500">Сумма требований</span>
              <span className="text-[26px] text-white">{mln} млн ₽</span>
            </div>
            <input
              type="range" min={1} max={300} step={1} value={mln}
              onChange={(e) => setMln(Number(e.target.value))}
              className="w-full cursor-pointer" aria-label="Сумма требований, млн рублей"
              style={{ accentColor: GOLD }}
            />
          </div>

          <div className="border border-white/10 p-8 md:p-10" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="font-manrope text-[11px] uppercase tracking-[0.16em] text-slate-500 mb-3">Наша статистика по категории</div>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-[54px] leading-none" style={{ color: GOLD }}>{d.rate}%</span>
              <span className="font-manrope text-[13px] text-slate-400">дел в нашу пользу</span>
            </div>
            <div className="h-[4px] bg-white/10 mb-8">
              <div className="h-full transition-[width] duration-500" style={{ background: GOLD, width: `${d.rate}%` }} />
            </div>

            <div className="font-manrope text-[11px] uppercase tracking-[0.16em] text-slate-500 mb-3">Порядок гонорара</div>
            <div className="text-[34px] text-white leading-none mb-3">от {fee.toLocaleString('ru-RU')} ₽</div>
            <p className="font-manrope text-[13.5px] leading-[1.7] text-slate-400 mb-8">{d.note}</p>

            <button
              type="button"
              onClick={() => document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-manrope w-full px-7 py-4 text-[12px] font-bold uppercase tracking-[0.12em] text-[#0A1023] cursor-pointer transition-transform hover:-translate-y-[2px]"
              style={{ background: GOLD }}
            >
              Обсудить с партнёром
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LawFirm() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="relative min-h-screen bg-[#0A1023] text-slate-300 font-cormorant selection:bg-[#C9A263]/25 selection:text-white overflow-x-clip">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#0A1023]/92 backdrop-blur-md border-b border-[#2A365C]">
        <div className="max-w-[1360px] mx-auto px-6 md:px-8 py-5 flex justify-between items-center pl-20 md:pl-24">
          <div className="font-manrope text-[13px] sm:text-lg md:text-xl font-extrabold uppercase tracking-[0.08em] sm:tracking-[0.15em] text-[#C9A263] whitespace-nowrap">Egorov <span className="text-white font-light">& Partners</span></div>
          <nav className="hidden lg:flex gap-7 font-manrope">
            {navLinks.map((l) => (
              <a key={l.href} href={`#${l.href}`} onClick={(e) => scrollTo(e, l.href)} className="text-xs uppercase tracking-[0.1em] text-slate-300 hover:text-[#C9A263] transition-colors">{l.name}</a>
            ))}
          </nav>
          <button type="button" onClick={(e: any) => scrollTo(e, 'contacts')} className="hidden sm:block font-manrope bg-[#C9A263] text-[#0A1023] px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] transition-all hover:bg-[#B08B53] hover:-translate-y-0.5 cursor-pointer whitespace-nowrap">Консультация</button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[86dvh] flex items-center py-20 md:py-24 px-6 md:px-8 overflow-hidden">
        {/* Фон: классическая колоннада */}
        <img
          src="/lawfirm-hero.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none select-none"
        />
        <div className="absolute inset-0 opacity-[0.045]" style={{ backgroundImage: 'linear-gradient(#C9A263 1px,transparent 1px),linear-gradient(90deg,#C9A263 1px,transparent 1px)', backgroundSize: '56px 56px' }} />
        <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to bottom,rgba(10,16,35,0),#0A1023)' }} />

        <div className="max-w-[1360px] mx-auto relative z-[2] w-full grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Левая колонка — оффер */}
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="font-manrope flex items-center gap-4 mb-7">
              <span className="w-11 h-px bg-[#C9A263]" />
              <span className="text-[#C9A263] font-semibold uppercase tracking-[0.2em] text-xs">Юридическое бюро с 2010 года</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: EASE }} className="text-[34px] sm:text-[46px] md:text-[58px] xl:text-[64px] leading-[1.1] text-white font-medium mb-7 [text-wrap:balance]">
              Безупречная защита интересов вашего бизнеса <span className="text-[#C9A263]">в суде</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: EASE }} className="font-manrope text-base md:text-[17px] font-light leading-[1.75] max-w-[520px] mb-10">
              Разрешение сложных корпоративных споров, защита активов и юридическое сопровождение сделок для собственников и топ-менеджмента.
            </motion.p>

            {/* Маркеры доверия */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: EASE }} className="flex flex-wrap items-stretch gap-x-10 gap-y-6 border-t border-[#2A365C] pt-7">
              {[
                { v: '94%', l: 'выигранных дел' },
                { v: '₽5 млрд+', l: 'защищённых активов' },
                { v: 'Топ-15', l: 'Право.ru-300' },
              ].map((m) => (
                <div key={m.l}>
                  <div className="text-2xl md:text-[28px] text-[#C9A263] leading-none mb-2">{m.v}</div>
                  <div className="font-manrope text-[10px] uppercase tracking-[0.15em] text-slate-400">{m.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Правая колонка — форма консультации */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            className="relative lg:justify-self-end w-full max-w-[480px]"
          >
            <div className="absolute -inset-px bg-gradient-to-b from-[#C9A263]/40 via-[#C9A263]/10 to-transparent pointer-events-none" />
            <div className="relative bg-[#0D152E]/92 border border-[#2A365C] backdrop-blur-xl p-7 md:p-9 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.75)]">
              <span className="font-manrope inline-block text-[10px] uppercase tracking-[0.2em] text-[#C9A263] border border-[#C9A263]/35 px-3 py-1.5 mb-6">Бесплатно · конфиденциально</span>
              <h3 className="text-white text-2xl md:text-[26px] font-medium leading-snug mb-3">Запись на первичную консультацию</h3>
              <p className="font-manrope text-[13px] font-light text-slate-400 leading-relaxed mb-7">
                Оценим судебные перспективы вашего дела и предложим стратегию защиты. Ответим в течение часа.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label htmlFor="lf-phone" className="font-manrope block text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2.5">Телефон</label>
                  <input
                    id="lf-phone"
                    required
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="font-manrope w-full bg-[#0A1023]/70 border border-[#2A365C] py-3.5 px-4 text-white text-base outline-none transition-colors focus:border-[#C9A263] placeholder:text-white/25"
                  />
                </div>
                <button
                  type="submit"
                  className="font-manrope w-full bg-[#C9A263] text-[#0A1023] font-bold uppercase tracking-[0.12em] text-[11px] py-4 border-none cursor-pointer transition-all hover:bg-[#E8CB94] hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-12px_rgba(201,162,99,0.6)]"
                >
                  Записаться на консультацию
                </button>
              </form>

              {submitted && <p className="font-manrope text-[#C9A263] text-xs mt-4">Заявка отправлена. Свяжемся в течение часа.</p>}

              <p className="font-manrope text-[11px] font-light text-slate-500 leading-relaxed mt-6 pt-5 border-t border-[#2A365C]">
                Сведения, полученные на консультации, составляют адвокатскую тайну и не передаются третьим лицам.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-t border-b border-[#2A365C] py-14 px-6 md:px-8">
        <Reveal className="max-w-[1360px] mx-auto grid grid-cols-2 lg:grid-cols-4">
          {heroStats.map((s, i) => (
            <div key={s.label} className={`text-center px-4 ${i < heroStats.length - 1 ? 'lg:border-r border-[#2A365C]' : ''}`}>
              <div className="text-2xl md:text-[32px] text-[#C9A263] font-normal mb-2">{s.value}</div>
              <div className="font-manrope text-[10px] uppercase tracking-[0.15em] text-slate-500">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* WIN-RATE INFOGRAPHIC */}
      <section className="py-20 md:py-28 px-6 md:px-8 bg-[#0D152E]">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          <Reveal>
            <div className="font-manrope flex items-center gap-4 mb-6"><span className="w-11 h-px bg-[#C9A263]" /><span className="text-[#C9A263] font-semibold uppercase tracking-[0.2em] text-xs">Практика в цифрах</span></div>
            <h2 className="text-3xl md:text-[42px] text-white font-medium mb-6">Результативность по направлениям</h2>
            <p className="font-manrope text-sm font-light text-slate-400 leading-[1.7] max-w-[460px] mb-9">Доля выигранных дел за последние 5 лет практики в разрезе ключевых направлений бюро.</p>
            <div className="flex flex-col gap-5.5">
              {winRates.map((w) => (
                <div key={w.label}>
                  <div className="font-manrope flex justify-between mb-2.5">
                    <span className="text-[13px] text-slate-300">{w.label}</span>
                    <span className="text-sm text-[#C9A263] font-bold">{w.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.06] relative">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${w.pct}%` }} viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE }} className="h-full" style={{ background: 'linear-gradient(90deg,#C9A263,#E8CB94)' }} />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal><WinRateRings /></Reveal>
        </div>
      </section>

      {/* PRACTICES */}
      <CaseEstimator />

      <section id="practice" className="py-20 md:py-28 px-6 md:px-8 scroll-mt-20">
        <div className="max-w-[1360px] mx-auto">
          <Reveal className="text-center mb-14 md:mb-16">
            <h2 className="text-3xl md:text-[44px] text-white font-medium mb-5">Ключевые практики</h2>
            <div className="w-14 h-0.5 bg-[#C9A263] mx-auto" />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px">
            {practices.map((p, i) => (
              <Reveal key={p} delay={(i % 3) * 0.07} className="group bg-[#131D3B] border border-[#2A365C] p-9 min-h-[220px] flex flex-col justify-between transition-all duration-400 hover:-translate-y-1.5 hover:border-[#C9A263] hover:shadow-[0_26px_54px_-20px_rgba(201,162,99,0.22)]">
                <h3 className="text-xl md:text-2xl text-white font-medium">{p}</h3>
                <div className="w-10 h-10 rounded-full border border-[#2A365C] text-[#C9A263] flex items-center justify-center text-lg transition-colors duration-300 group-hover:bg-[#C9A263] group-hover:text-[#0A1023]">↗</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners" className="py-20 md:py-28 px-6 md:px-8 bg-[#0D152E] border-t border-[#2A365C] scroll-mt-20">
        <div className="max-w-[1360px] mx-auto">
          <Reveal className="text-center mb-14 md:mb-16">
            <h2 className="text-3xl md:text-[44px] text-white font-medium mb-5">Партнёры бюро</h2>
            <div className="w-14 h-0.5 bg-[#C9A263] mx-auto" />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {partners.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08} className="bg-[#131D3B] border border-[#2A365C] p-9 transition-all duration-400 hover:-translate-y-1.5 hover:border-[#C9A263] hover:shadow-[0_26px_54px_-20px_rgba(201,162,99,0.22)]">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl mb-6" style={{ background: 'rgba(201,162,99,0.1)', border: '1px solid rgba(201,162,99,0.4)', color: '#C9A263' }}>{p.initials}</div>
                <h3 className="text-lg md:text-xl text-white font-medium mb-1.5">{p.name}</h3>
                <p className="font-manrope text-[#C9A263] text-[10px] uppercase tracking-[0.15em] mb-3.5">{p.role}</p>
                <p className="font-manrope text-slate-400 text-[13px] font-light mb-6">{p.spec}</p>
                <div className="pt-4.5 border-t border-[#2A365C] flex items-baseline gap-2">
                  <span className="text-2xl md:text-[26px] text-white">{p.years}</span>
                  <span className="font-manrope text-[9px] uppercase tracking-[0.15em] text-slate-500">лет практики</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CASE VOLUME */}
      <section className="py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-[1360px] mx-auto">
          <Reveal className="text-center mb-14 md:mb-16">
            <h2 className="text-3xl md:text-[44px] text-white font-medium mb-5">Портфель дел по категориям</h2>
            <div className="w-14 h-0.5 bg-[#C9A263] mx-auto" />
          </Reveal>
          <Reveal className="grid grid-cols-5 gap-2 sm:gap-5 items-end h-[220px] md:h-[260px]">
            {caseVolume.map((c) => (
              <div key={c.label} className="flex flex-col items-center justify-end h-full gap-2 sm:gap-3">
                <span className="text-[#C9A263] text-xs sm:text-base">{c.count}</span>
                <div className="w-full h-[150px] sm:h-[190px] flex items-end bg-white/[0.03]">
                  <motion.div initial={{ height: 0 }} whileInView={{ height: `${c.pct}%` }} viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE }} className="w-full" style={{ background: 'linear-gradient(to top,#8A6A3B,#C9A263)' }} />
                </div>
                <span className="font-manrope text-[9px] sm:text-[11px] uppercase tracking-[0.08em] text-slate-500 text-center">{c.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section id="principles" className="py-20 md:py-28 px-6 md:px-8 bg-[#0D152E] border-t border-[#2A365C] scroll-mt-20">
        <div className="max-w-[1360px] mx-auto">
          <Reveal className="flex justify-between items-end gap-8 flex-wrap mb-14 md:mb-16">
            <div>
              <h2 className="text-3xl md:text-[44px] text-white font-medium mb-5">Принципы нашей работы</h2>
              <div className="w-14 h-0.5 bg-[#C9A263]" />
            </div>
            <p className="font-manrope text-slate-400 text-sm max-w-[380px]">Фундамент, на котором строятся отношения с доверителями и выигрываются самые сложные споры.</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((pr, i) => (
              <Reveal key={pr.title} delay={i * 0.07} className="bg-[#131D3B] border border-[#2A365C] p-8 min-h-[240px] flex flex-col transition-all duration-400 hover:-translate-y-1.5 hover:border-[#C9A263] hover:shadow-[0_26px_54px_-20px_rgba(201,162,99,0.22)]">
                <div className="text-[#C9A263] text-2xl mb-5">{pr.mono}</div>
                <h3 className="text-xl text-white font-medium mb-3.5">{pr.title}</h3>
                <p className="font-manrope text-slate-400 text-[13px] font-light leading-[1.65]">{pr.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-20 md:py-28 px-6 md:px-8 scroll-mt-20">
        <div className="max-w-[1100px] mx-auto">
          <Reveal className="text-center mb-14 md:mb-16">
            <h2 className="text-3xl md:text-[44px] text-white font-medium mb-5">Этапы сотрудничества</h2>
            <div className="w-14 h-0.5 bg-[#C9A263] mx-auto" />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-9">
            {process.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.1} className="text-center">
                <div className="w-16 h-16 rounded-full border-2 border-[#2A365C] text-[#C9A263] flex items-center justify-center text-xl mx-auto mb-6">{step.n}</div>
                <h3 className="text-xl text-white font-medium mb-3.5">{step.title}</h3>
                <p className="font-manrope text-slate-400 text-[13px] font-light leading-[1.65]">{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GOLD BAND */}
      <section className="py-16 md:py-20 px-6 md:px-8 bg-[#C9A263]">
        <Reveal className="max-w-[1360px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {goldStats.map((g) => (
            <div key={g.label}>
              <div className="text-3xl md:text-[40px] text-[#0A1023] font-semibold mb-2">{g.value}</div>
              <div className="font-manrope text-[11px] uppercase tracking-[0.1em] text-[#0A1023] font-semibold">{g.label}</div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* CASES */}
      <section id="cases" className="py-20 md:py-28 px-6 md:px-8 bg-[#0D152E] border-t border-[#2A365C] scroll-mt-20">
        <div className="max-w-[1200px] mx-auto">
          <Reveal className="flex justify-between items-end border-b border-[#2A365C] pb-6.5 mb-14 md:mb-16">
            <h2 className="text-3xl md:text-[44px] text-white font-medium">Значимые дела</h2>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14">
            {casesData.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.1}>
                <div className="font-manrope text-slate-500 text-[11px] uppercase tracking-[0.1em] mb-3.5">{c.tag}</div>
                <h3 className="text-xl md:text-2xl text-white font-medium mb-4 leading-[1.35]">{c.title}</h3>
                <p className="font-manrope text-slate-400 text-[13px] font-light leading-[1.65] mb-6">{c.desc}</p>
                <div className="flex gap-3 flex-wrap">
                  {c.tags.map((t) => (
                    <span key={t} className="font-manrope bg-[#131D3B] border border-[#2A365C] text-slate-300 text-[11px] px-3.5 py-1.5">{t}</span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-28 px-6 md:px-8 scroll-mt-20">
        <div className="max-w-[900px] mx-auto">
          <Reveal className="text-center mb-14 md:mb-16">
            <h2 className="text-3xl md:text-[44px] text-white font-medium mb-5">Частые вопросы</h2>
            <div className="w-14 h-0.5 bg-[#C9A263] mx-auto" />
          </Reveal>
          <div className="flex flex-col gap-3.5">
            {faqsData.map((faq, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={faq.q} delay={i * 0.05} className="bg-[#131D3B] border px-7 md:px-8 py-6.5 transition-colors duration-300" style={{ borderColor: open ? '#C9A263' : '#2A365C' }}>
                  <button type="button" onClick={() => setOpenFaq(open ? null : i)} className="w-full flex justify-between items-center bg-transparent border-none cursor-pointer text-left text-white">
                    <span className="text-lg md:text-xl font-medium pr-5">{faq.q}</span>
                    <span className="text-[#C9A263] text-xl shrink-0">{open ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden">
                        <p className="font-manrope text-slate-400 text-[13px] font-light leading-[1.65] mt-5.5 pt-5.5 border-t border-[#2A365C]">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contacts" className="bg-[#0A1023] border-t border-[#2A365C] pt-16 md:pt-[70px] pb-10 px-6 md:px-8 scroll-mt-20">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[1.6fr_1fr_1fr] gap-12 mb-14">
          <div>
            <div className="font-manrope text-xl md:text-2xl font-extrabold uppercase tracking-[0.1em] text-[#C9A263] mb-5">Egorov <span className="text-white font-light">& Partners</span></div>
            <p className="font-manrope text-slate-400 text-[13px] font-light leading-[1.7] max-w-[420px] mb-5.5">Юридическое бюро, предоставляющее эксклюзивные услуги бизнесу в области разрешения сложных корпоративных и коммерческих споров.</p>
            <div className="font-manrope text-[#C9A263] text-[13px]">г. Москва, Пресненская наб., 12 (Башня Федерация)</div>
          </div>
          <div>
            <h4 className="font-manrope text-white text-[11px] uppercase tracking-[0.15em] font-bold mb-5">Связь</h4>
            <div className="font-manrope flex flex-col gap-3 text-[13px] text-slate-400">
              <span>+7 (495) 000-00-00</span>
              <span>info@egorov-partners.ru</span>
            </div>
          </div>
          <div>
            <h4 className="font-manrope text-white text-[11px] uppercase tracking-[0.15em] font-bold mb-5">Информация</h4>
            <div className="font-manrope flex flex-col gap-3 text-[13px]">
              <a href="#" onClick={(e) => e.preventDefault()} className="text-slate-400 hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-slate-400 hover:text-white transition-colors">Правовая оговорка</a>
            </div>
          </div>
        </div>
        <div className="font-manrope max-w-[1360px] mx-auto border-t border-[#2A365C] pt-6.5 text-[11px] text-slate-500">© 2026 Egorov & Partners</div>
      </footer>
    </div>
  );
}
