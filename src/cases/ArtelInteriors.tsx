import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const navLinks = [
  { name: 'Услуги', href: '#services' },
  { name: 'Философия', href: '#philosophy' },
  { name: 'Портфолио', href: '#portfolio' },
  { name: 'Процесс', href: '#process' },
  { name: 'Отзывы', href: '#reviews' },
  { name: 'Контакты', href: '#contact' },
];

const heroStats = [
  { value: 12, suffix: '', label: 'Лет на рынке' },
  { value: 150, suffix: '+', label: 'Сданных объектов' },
  { value: 340, suffix: '', label: 'Довольных клиентов' },
];

const meterBars = [
  { label: 'Соблюдение сроков', value: 99, color: '#C7A45C' },
  { label: 'Прозрачность сметы', value: 100, color: '#D9B876' },
  { label: 'Контроль качества', value: 100, color: '#8F7038' },
];

const reasons = [
  { num: '01', title: 'Фиксированный договор', desc: 'Стоимость работ закрепляется юридически и не меняется в процессе реализации проекта.' },
  { num: '02', title: 'Соблюдение сроков', desc: 'Чёткий график производства работ. Несём финансовую ответственность за каждый день просрочки.' },
  { num: '03', title: 'Гарантия на работы', desc: 'Предоставляем расширенную гарантию до 5 лет на все инженерные и отделочные работы.' },
  { num: '04', title: 'Собственные бригады', desc: 'Только проверенные штатные специалисты узкого профиля с опытом в премиум-сегменте.' },
  { num: '05', title: 'Ежедневные отчёты', desc: 'Полный контроль процесса дистанционно через фото- и видеоотчёты с объекта.' },
  { num: '06', title: 'Персональный менеджер', desc: 'Один ответственный специалист, который всегда на связи и решает любые вопросы.' },
];

const services = [
  { title: 'Дизайнерский ремонт', desc: 'Комплексная реализация проекта любой сложности с полным авторским надзором.', img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80' },
  { title: 'Капитальный ремонт', desc: 'Глубокая реконструкция с демонтажом, возведением перегородок и заменой коммуникаций.', img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80' },
  { title: 'Косметический ремонт', desc: 'Обновление облика пространства с использованием премиальных чистовых материалов.', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
  { title: 'Инженерные системы', desc: 'Проектирование и монтаж умного дома, электрики, вентиляции и кондиционирования.', img: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80' },
  { title: 'Отделка ванных комнат', desc: 'Ювелирная работа с натуральным камнем, керамогранитом и элитной сантехникой.', img: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80' },
  { title: 'Черновая отделка', desc: 'Идеальная геометрия стен и стяжки — безупречная база для финишных покрытий.', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80' },
];

const stepsData = [
  { title: 'Заявка и консультация', desc: 'Обсуждение ваших пожеланий, ориентировочных сроков и бюджета.' },
  { title: 'Замер и концепция', desc: 'Выезд инженера, точные обмеры помещения и формирование базового видения.' },
  { title: 'Дизайн-проект и смета', desc: 'Создание визуализаций, чертежей и детальный расчёт стоимости до рубля.' },
  { title: 'Договор', desc: 'Юридическое закрепление стоимости, сроков и гарантийных обязательств.' },
  { title: 'Реализация с фотоотчётами', desc: 'Проведение всех этапов работ с регулярным контролем качества.' },
  { title: 'Приёмка объекта', desc: 'Финальный клининг, расстановка декора и сдача готового интерьера.' },
  { title: 'Гарантийное сопровождение', desc: 'Оперативное решение вопросов эксплуатации в рамках гарантии.' },
];

const filters = ['Все', 'Квартиры', 'Дома', 'Коммерция'];

const projects = [
  { type: 'Квартиры', title: 'ЖК «Символ»', desc: 'Минимализм с элементами ар-деко. 140 м²', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80' },
  { type: 'Дома', title: 'Резиденция «Жуковка»', desc: 'Классика в современном прочтении. 450 м²', img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1920&q=80' },
  { type: 'Квартиры', title: 'ЖК «Садовые Кварталы»', desc: 'Индустриальный шик и тёплые текстуры. 110 м²', img: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1920&q=80' },
  { type: 'Коммерция', title: 'Ресторан «Bistrot»', desc: 'Уютная атмосфера с акцентом на натуральное дерево. 300 м²', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80' },
  { type: 'Квартиры', title: 'Апартаменты Neva Towers', desc: 'Панорамный вид и строгая геометрия. 95 м²', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80' },
  { type: 'Дома', title: 'Вилла «Серебряный Бор»', desc: 'Слияние с природой и максимум света. 600 м²', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80' },
];

const materials = [
  { label: 'Натуральный камень', origin: 'Италия, Испания' },
  { label: 'Инженерная доска', origin: 'Австрия' },
  { label: 'Сантехника премиум-класса', origin: 'Германия' },
  { label: 'Системы «Умный дом»', origin: 'Собственная интеграция' },
  { label: 'Керамогранит крупного формата', origin: 'Италия' },
  { label: 'Текстиль и обивочные ткани', origin: 'Бельгия' },
];

const reviewsData = [
  { name: 'Михаил Воронцов', role: 'Владелец квартиры, ЖК Символ', text: 'Процесс ремонта всегда казался чем-то стихийным, но команда ARTEL показала, что это может быть системно и прозрачно. Ни одного просроченного дня.', initials: 'МВ' },
  { name: 'Анна Смирнова', role: 'Резиденция Жуковка', text: 'Высочайший уровень сервиса. Менеджер был на связи 24/7, ежедневные фотоотчёты внушали абсолютное спокойствие.', initials: 'АС' },
  { name: 'Евгений Лебедев', role: 'ЖК Садовые Кварталы', text: 'Профессионализм на всех этапах — от первых чертежей до финального клининга. Отдельная благодарность за работу с инженерией умного дома.', initials: 'ЕЛ' },
];

const packages = [
  { name: 'Classic', num: '01', desc: 'Оптимальное решение для современных интерьеров. Качественная чистовая отделка по готовому проекту.', features: ['Возведение перегородок', 'Монтаж базовых инженерных систем', 'Выравнивание поверхностей под маяк', 'Укладка плитки и напольных покрытий', 'Окраска стен / оклейка обоями'], scopeScore: 40, highlight: false },
  { name: 'Prestige', num: '02', desc: 'Капитальный ремонт бизнес-класса с применением крупноформатного керамогранита и сложной электрики.', features: ['Всё из тарифа Classic', 'Сложные многоуровневые потолки', 'Монтаж систем защиты от протечек', 'Шумоизоляция стен и пола', 'Работа с крупноформатным керамогранитом'], scopeScore: 70, highlight: true },
  { name: 'Bespoke', num: '03', desc: 'Премиальный авторский ремонт. Воплощение сложнейших архитектурных решений и эксклюзивных материалов.', features: ['Всё из тарифа Prestige', 'Интеграция систем «Умный дом»', 'Ювелирная работа с натуральным камнем', 'Сложные столярные изделия на заказ', 'Непрерывный авторский надзор'], scopeScore: 100, highlight: false },
];

const faqsData = [
  { q: 'Как формируется итоговая стоимость ремонта?', a: 'После выезда инженера и составления детализированной сметы. Мы фиксируем сумму в договоре, и она остаётся неизменной на протяжении всего цикла работ.' },
  { q: 'Предоставляете ли вы гарантию на свои услуги?', a: 'Да, мы предоставляем официальную гарантию до 5 лет на все виды выполненных монтажных и инженерных работ.' },
  { q: 'Смогу ли я контролировать процесс удалённо?', a: 'Абсолютно. За вами закрепляется персональный менеджер с ежедневными фото- и видеоотчётами.' },
  { q: 'Закупаете ли вы черновые материалы?', a: 'Мы полностью берём на себя снабжение объекта премиальными черновыми материалами от проверенных поставщиков.' },
  { q: 'Нужно ли мне согласовывать перепланировку?', a: 'Наши специалисты берут на себя весь цикл согласования сложной перепланировки в госинстанциях.' },
];

function useCountUp(duration = 1400) {
  const [t, setT] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setT(1 - Math.pow(1 - p, 3));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration]);
  return t;
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
}

function GaugeCard() {
  const [gaugeRef, vis] = useInView<HTMLDivElement>();
  const radii = [66, 50, 34];
  const colors = ['#C7A45C', '#D9B876', '#8F7038'];
  return (
    <div ref={gaugeRef} className="relative w-full min-h-[580px] bg-[#0A0908] border border-[#C7A45C]/[0.22] p-10 flex flex-col justify-between overflow-hidden shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)]">
      <div className="absolute -top-[33%] -right-[25%] w-[66%] aspect-square rounded-full bg-[#C7A45C]/[0.12] blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#C7A45C 1px,transparent 1px),linear-gradient(90deg,#C7A45C 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative">
        <span className="uppercase tracking-[0.35em] text-[10px] text-[#C7A45C]/75 block mb-7">Принципы в цифрах</span>
        <div className="flex items-center gap-8 flex-wrap">
          <div className="relative w-[150px] h-[150px] shrink-0">
            <svg viewBox="0 0 150 150" className="w-full h-full -rotate-90">
              <circle cx="75" cy="75" r="66" fill="none" stroke="rgba(199,164,92,0.12)" strokeWidth="7" />
              <circle cx="75" cy="75" r="50" fill="none" stroke="rgba(199,164,92,0.12)" strokeWidth="7" />
              <circle cx="75" cy="75" r="34" fill="none" stroke="rgba(199,164,92,0.12)" strokeWidth="7" />
              {radii.map((r, i) => {
                const circ = 2 * Math.PI * r;
                const shown = vis ? meterBars[i].value : 0;
                const offset = circ - (circ * shown) / 100;
                return (
                  <circle
                    key={i}
                    cx="75" cy="75" r={r} fill="none" stroke={colors[i]} strokeWidth="7" strokeLinecap="round"
                    strokeDasharray={circ} strokeDashoffset={offset}
                    style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)' }}
                  />
                );
              })}
            </svg>
            <div className="absolute inset-4 flex flex-col items-center justify-center text-center">
              <span className="font-bodoni text-[22px] text-[#EDE6D8] leading-none whitespace-nowrap">98%</span>
              <span className="text-[7px] uppercase tracking-[0.1em] opacity-50 mt-1 whitespace-nowrap">рекомендаций</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 flex-1 min-w-[160px]">
            {meterBars.map((bar) => (
              <div key={bar.label} className="flex items-center gap-2.5">
                <span className="inline-block w-2 h-2 rounded-full shrink-0" style={{ background: bar.color }} />
                <span className="text-[11px] font-light opacity-70 flex-1">{bar.label}</span>
                <span className="font-bodoni text-[13px] text-[#C7A45C]">{vis ? bar.value : 0}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative flex flex-col gap-6 mt-8">
        {meterBars.map((bar) => (
          <div key={bar.label}>
            <div className="flex justify-between items-baseline mb-2.5">
              <span className="text-[11px] uppercase tracking-[0.2em] font-light opacity-65">{bar.label}</span>
              <span className="font-bodoni text-[14px] text-[#C7A45C]">{vis ? bar.value : 0}%</span>
            </div>
            <div className="h-px w-full bg-[#C7A45C]/[0.18] relative">
              <div
                className="absolute inset-y-0 left-0 bg-[#C7A45C] h-px transition-[width] duration-[1200ms]"
                style={{ width: vis ? `${bar.value}%` : '0%', transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="relative grid grid-cols-2 border-t border-[#C7A45C]/[0.18] pt-8 mt-8">
        <div className="border-r border-[#C7A45C]/[0.18] pr-6">
          <div className="font-bodoni text-[36px] text-[#C7A45C] mb-2">5 лет</div>
          <div className="text-[10px] uppercase tracking-[0.2em] opacity-50">гарантия на работы</div>
        </div>
        <div className="pl-6">
          <div className="font-bodoni text-[36px] text-[#C7A45C] mb-2">24/7</div>
          <div className="text-[10px] uppercase tracking-[0.2em] opacity-50">персональный менеджер</div>
        </div>
      </div>
    </div>
  );
}

function StepNumber({ num, delay }: { num: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 36, scale: 0.7 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1, delay, ease: [0.34, 1.56, 0.64, 1] }}
      className="font-bodoni font-semibold leading-none text-[70px] md:text-[130px] inline-block"
      style={{
        background: 'linear-gradient(135deg,#C7A45C 10%,#F3DFAF 55%,#8F7038 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        filter: 'drop-shadow(0 6px 18px rgba(199,164,92,0.25))',
      }}
    >
      {num}
    </motion.span>
  );
}

export default function ArtelInteriors() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filter, setFilter] = useState('Все');
  const [slideIdx, setSlideIdx] = useState(0);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const countT = useCountUp();

  const filtered = filter === 'Все' ? projects : projects.filter((p) => p.type === filter);
  const activeProject = filtered[slideIdx] || filtered[0];
  const activeReview = reviewsData[reviewIdx];

  const nextProject = () => setSlideIdx((i) => (i + 1) % filtered.length);
  const prevProject = () => setSlideIdx((i) => (i - 1 + filtered.length) % filtered.length);
  const nextReview = () => setReviewIdx((i) => (i + 1) % reviewsData.length);
  const prevReview = () => setReviewIdx((i) => (i - 1 + reviewsData.length) % reviewsData.length);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  // Portfolio category donut
  const donutColors = ['#C7A45C', '#D9B876', '#8F7038'];
  const typeCounts: Record<string, number> = {};
  projects.forEach((p) => { typeCounts[p.type] = (typeCounts[p.type] || 0) + 1; });
  const total = projects.length;
  const r = 52;
  const circ = 2 * Math.PI * r;
  let acc = 0;
  const portfolioDonut = Object.keys(typeCounts).map((type, i) => {
    const count = typeCounts[type];
    const frac = count / total;
    const segLen = circ * frac;
    const rotate = (acc / total) * 360;
    acc += count;
    return { label: type, count, color: donutColors[i % donutColors.length], segLen, offset: circ - segLen, rotate };
  });

  return (
    <div className="font-archivo bg-[#0A0908] text-[#EDE6D8] min-h-screen overflow-x-clip selection:bg-[#C7A45C]/25 selection:text-[#EDE6D8]">
      <div
        className="fixed inset-0 z-[90] pointer-events-none opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
      />

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-[#0A0908]/86 backdrop-blur-md border-b border-[#C7A45C]/[0.16]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-9 py-5 flex justify-between items-center pl-24 md:pl-24">
          <a href="#" className="font-bodoni text-2xl tracking-[0.06em] text-[#EDE6D8] font-medium">Artel</a>
          <nav className="hidden lg:flex gap-9 items-center">
            {navLinks.map((l) => (
              <a key={l.name} href={l.href} className="relative text-[12px] uppercase tracking-[0.14em] text-[#EDE6D8]/[0.82] font-medium hover:text-[#EDE6D8] transition-colors group">
                {l.name}
                <span className="absolute left-0 right-full -bottom-1.5 h-px bg-[#C7A45C] transition-all duration-300 group-hover:right-0" />
              </a>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-5 whitespace-nowrap">
            <a href="tel:+74950000000" className="font-bodoni italic text-[15px] text-[#EDE6D8]">+7 495 000 00 00</a>
            <a href="#contact" className="px-6.5 py-3 bg-[#C7A45C] text-[#0A0908] text-[11px] uppercase tracking-[0.16em] font-semibold transition-all hover:bg-[#EDE6D8] hover:shadow-[0_14px_34px_-10px_rgba(199,164,92,0.4)]">Консультация</a>
          </div>
          <button className="lg:hidden text-[#EDE6D8]" onClick={() => setMobileMenuOpen(true)} aria-label="Открыть меню">
            <Menu strokeWidth={1} size={26} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-0 z-[110] bg-[#0A0908] flex flex-col justify-center items-center"
          >
            <button className="absolute top-6 right-6 text-[#EDE6D8]" onClick={() => setMobileMenuOpen(false)} aria-label="Закрыть меню">
              <X strokeWidth={1} size={30} />
            </button>
            <nav className="flex flex-col gap-7 text-center">
              {navLinks.map((l) => (
                <a key={l.name} href={l.href} onClick={() => setMobileMenuOpen(false)} className="font-bodoni text-3xl text-[#EDE6D8]">{l.name}</a>
              ))}
              <a href="tel:+74950000000" className="mt-6 text-xl font-archivo font-light tracking-wider text-[#C7A45C]">+7 (495) 000-00-00</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative min-h-[100dvh] flex items-center pt-[110px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-[2]" style={{ background: 'linear-gradient(to bottom, rgba(10,9,8,0.55), rgba(10,9,8,0.55) 40%, #0A0908 96%)' }} />
          <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80" alt="Premium Interior" className="w-full h-full object-cover relative z-[1]" style={{ filter: 'saturate(0.85) brightness(0.75)' }} />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-9 relative z-[3] w-full">
          <div className="max-w-[760px]">
            <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} className="uppercase tracking-[0.35em] text-[11px] text-[#C7A45C] font-semibold block mb-6">
              Est. 2012 — Premium Renovation
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              className="font-bodoni font-medium text-[42px] sm:text-[60px] md:text-[88px] leading-[0.96] text-[#EDE6D8] my-6"
            >
              Ремонт, <span className="italic text-[#C7A45C]">достойный</span><br />вашего дома
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: EASE }} className="text-lg font-light opacity-75 max-w-[460px] leading-[1.65] mb-9">
              Создаём пространства, где безупречное качество встречается с индивидуальным почерком владельца. Авторский надзор и полная прозрачность на каждом этапе.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: EASE }} className="flex gap-5 flex-wrap">
              <a href="#contact" className="px-8 py-4.5 bg-[#C7A45C] text-[#0A0908] text-[11px] uppercase tracking-[0.18em] font-semibold transition-all hover:bg-[#EDE6D8] hover:shadow-[0_14px_34px_-10px_rgba(199,164,92,0.4)]">Консультация</a>
              <a href="#portfolio" className="px-8 py-4.5 border border-[#EDE6D8]/30 text-[#EDE6D8] text-[11px] uppercase tracking-[0.18em] font-semibold transition-all hover:bg-[#C7A45C] hover:border-[#C7A45C] hover:text-[#0A0908]">Смотреть портфолио</a>
            </motion.div>
          </div>

          <div className="flex flex-wrap mt-16 md:mt-24 max-w-[760px] border-t border-[#C7A45C]/[0.22]">
            {heroStats.map((s) => (
              <div key={s.label} className="flex-1 min-w-[160px] pt-6 pr-6">
                <div className="font-bodoni text-[32px] md:text-[44px] text-[#C7A45C] mb-1.5">{Math.round(s.value * countT)}{s.suffix}</div>
                <div className="text-[10px] uppercase tracking-[0.16em] opacity-55">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section id="philosophy" className="bg-[#131110] py-24 md:py-[130px] px-6 md:px-9">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <Reveal>
            <span className="uppercase tracking-[0.35em] text-[11px] text-[#C7A45C] font-semibold block mb-6">Философия</span>
            <h2 className="font-bodoni text-[32px] md:text-[50px] leading-[1.1] my-6 font-medium">Искусство создавать <span className="italic text-[#C7A45C]">совершенство</span></h2>
            <div className="flex flex-col gap-6 font-light text-base opacity-70 leading-[1.75] max-w-[520px]">
              <p>Мы убеждены, что истинный статус кроется в деталях. Для нас ремонт — это не просто строительный процесс, это воплощение вашего вкуса, стиля жизни и стремления к лучшему.</p>
              <p>Наш подход строится на абсолютной прозрачности: детальная смета, честные сроки, регулярные отчёты. Мы используем только премиальные материалы и привлекаем узкопрофильных мастеров с многолетним опытом.</p>
            </div>
            <div className="mt-10 pt-8 border-t border-[#C7A45C]/[0.18] flex items-center gap-5">
              <div className="w-14 h-14 rounded-full border border-[#C7A45C]/40 bg-[#C7A45C]/10 flex items-center justify-center shrink-0">
                <span className="font-bodoni italic text-[#C7A45C] text-xl">ДК</span>
              </div>
              <div>
                <div className="font-bodoni italic text-lg text-[#EDE6D8]">Дарья Ковалёва</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-[#C7A45C]/75 mt-1">Главный архитектор ARTEL</div>
              </div>
            </div>
          </Reveal>

          <Reveal className="relative">
            <div className="absolute inset-0 border border-[#C7A45C]/30 translate-x-4 translate-y-4 pointer-events-none" />
            <div className="relative z-10">
              <GaugeCard />
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" className="py-24 md:py-[130px] px-6 md:px-9">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 md:mb-20 border-b border-[#C7A45C]/[0.22] pb-8">
            <span className="uppercase tracking-[0.35em] text-[11px] text-[#C7A45C] font-semibold block mb-4">Our Values</span>
            <h2 className="font-bodoni text-[32px] md:text-[50px] font-medium">Почему выбирают нас</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {reasons.map((r, i) => (
              <Reveal key={r.num} delay={(i % 3) * 0.08} className="border border-[#C7A45C]/[0.15] p-9 bg-[#131110] transition-all duration-400 hover:-translate-y-1 hover:border-[#C7A45C]/45 hover:bg-[#C7A45C]/[0.04]">
                <span className="font-bodoni italic text-[32px] text-[#C7A45C]/50 block mb-6">{r.num}</span>
                <h3 className="font-bodoni text-2xl font-medium mb-4">{r.title}</h3>
                <p className="text-[13px] font-light opacity-60 leading-[1.6]">{r.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-[#131110] py-24 md:py-[130px] border-t border-[#C7A45C]/[0.12]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-9 mb-12 flex justify-between items-end gap-6 flex-wrap">
          <h2 className="font-bodoni text-[32px] md:text-[50px] max-w-[600px] leading-[1.08] font-medium">Безупречность в каждом направлении</h2>
          <span className="uppercase tracking-[0.2em] text-[11px] text-[#C7A45C] font-semibold">Our Expertise</span>
        </div>
        <div className="flex gap-0.5 overflow-x-auto px-6 md:px-9 pb-2 [scrollbar-width:none] snap-x snap-mandatory" style={{ touchAction: 'pan-x' }}>
          {services.map((svc, i) => (
            <Reveal key={svc.title} delay={(i % 3) * 0.08} className="min-w-[280px] sm:min-w-[320px] flex-none w-[280px] sm:w-[320px] relative h-[380px] sm:h-[420px] overflow-hidden group snap-start">
              <img src={svc.img} alt={svc.title} className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]" style={{ filter: 'saturate(0.82) brightness(0.9)' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,9,8,0.92), transparent 55%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-7 border-t border-[#C7A45C]/25">
                <h3 className="font-bodoni text-xl text-[#EDE6D8] mb-2.5 font-medium">{svc.title}</h3>
                <p className="text-xs text-[#EDE6D8]/70 leading-[1.5]">{svc.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 md:py-[130px] px-6 md:px-9">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <span className="uppercase tracking-[0.35em] text-[11px] text-[#C7A45C] font-semibold block mb-5">Process</span>
            <h2 className="font-bodoni text-[32px] md:text-[50px] font-medium">Прозрачная хронология</h2>
          </div>
          {stepsData.map((s, i) => {
            const left = i % 2 === 0;
            const delay = i * 0.06;
            return (
              <div key={s.title} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
                {left ? (
                  <>
                    <div className="text-right order-2 md:order-1"><StepNumber num={String(i + 1).padStart(2, '0')} delay={delay} /></div>
                    <Reveal delay={delay} className="order-1 md:order-2">
                      <h3 className="font-bodoni text-2xl mb-3 font-medium">{s.title}</h3>
                      <p className="text-sm opacity-60 leading-[1.6]">{s.desc}</p>
                    </Reveal>
                  </>
                ) : (
                  <>
                    <Reveal delay={delay} className="order-1">
                      <h3 className="font-bodoni text-2xl mb-3 font-medium md:text-right">{s.title}</h3>
                      <p className="text-sm opacity-60 leading-[1.6] md:text-right">{s.desc}</p>
                    </Reveal>
                    <div className="order-2"><StepNumber num={String(i + 1).padStart(2, '0')} delay={delay} /></div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="bg-[#131110] py-20 md:py-28 border-t border-[#C7A45C]/[0.12]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-9 pb-10 flex justify-between items-end gap-6 flex-wrap border-b border-[#C7A45C]/20">
          <h2 className="font-bodoni text-[32px] md:text-[50px] font-medium">Наши работы</h2>
          <div className="flex gap-3 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => { setFilter(f); setSlideIdx(0); }}
                className={`text-[10px] uppercase tracking-[0.18em] px-4.5 py-2.5 border font-semibold transition-all ${filter === f ? 'bg-[#C7A45C] border-[#C7A45C] text-[#0A0908]' : 'border-[#C7A45C]/35 text-[#EDE6D8] hover:bg-[#C7A45C] hover:border-[#C7A45C] hover:text-[#0A0908]'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <Reveal className="max-w-[1400px] mx-auto px-6 md:px-9 pt-10 flex items-center gap-10 flex-wrap">
          <div className="relative w-[110px] h-[110px] sm:w-[120px] sm:h-[120px] shrink-0">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(199,164,92,0.12)" strokeWidth="10" />
              {portfolioDonut.map((seg) => (
                <circle
                  key={seg.label} cx="60" cy="60" r="52" fill="none" stroke={seg.color} strokeWidth="10"
                  strokeDasharray={`${seg.segLen} ${circ - seg.segLen}`} strokeDashoffset={seg.offset}
                  transform={`rotate(${seg.rotate})`} style={{ transformOrigin: '60px 60px', transition: 'stroke-dashoffset 1.3s cubic-bezier(0.22,1,0.36,1)' }}
                />
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-bodoni text-2xl text-[#EDE6D8] leading-none">{total}</span>
              <span className="text-[7px] uppercase tracking-[0.1em] opacity-50 mt-1">объектов</span>
            </div>
          </div>
          <div className="flex gap-8 flex-wrap">
            {portfolioDonut.map((seg) => (
              <div key={seg.label} className="flex items-center gap-2.5">
                <span className="inline-block w-2 h-2 rounded-full shrink-0" style={{ background: seg.color }} />
                <div>
                  <div className="text-[13px] font-medium">{seg.label}</div>
                  <div className="text-[10px] opacity-50 uppercase tracking-[0.1em]">{seg.count} объекта</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="w-full relative h-[60vh] md:h-[80vh] overflow-hidden mt-10">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeProject.img}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
              src={activeProject.img} alt={activeProject.title} className="w-full h-full object-cover absolute inset-0" style={{ filter: 'saturate(0.9) brightness(0.85)' }}
            />
          </AnimatePresence>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,9,8,0.94), rgba(10,9,8,0.15) 55%, transparent)' }} />
          <div className="absolute bottom-8 md:bottom-12 left-6 md:left-9 max-w-[560px]">
            <span className="text-[#C7A45C] text-[10px] uppercase tracking-[0.3em] block mb-3 font-semibold">{activeProject.type}</span>
            <h3 className="font-bodoni text-3xl md:text-[58px] mb-3 font-medium leading-tight">{activeProject.title}</h3>
            <p className="text-base font-light opacity-80">{activeProject.desc}</p>
          </div>
          <div className="absolute bottom-8 md:bottom-12 right-6 md:right-9 flex gap-3.5">
            <button onClick={prevProject} aria-label="Предыдущий проект" className="w-11 h-11 border border-[#C7A45C]/40 bg-[#0A0908]/50 text-[#EDE6D8] flex items-center justify-center hover:bg-[#C7A45C] hover:text-[#0A0908] transition-colors"><ChevronLeft size={18} /></button>
            <button onClick={nextProject} aria-label="Следующий проект" className="w-11 h-11 border border-[#C7A45C]/40 bg-[#0A0908]/50 text-[#EDE6D8] flex items-center justify-center hover:bg-[#C7A45C] hover:text-[#0A0908] transition-colors"><ChevronRight size={18} /></button>
          </div>
        </div>
      </section>

      {/* MATERIALS */}
      <section id="materials" className="py-24 md:py-[130px] px-6 md:px-9 border-t border-[#C7A45C]/[0.12]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end gap-8 mb-14 md:mb-16 border-b border-[#C7A45C]/[0.22] pb-8 flex-wrap">
            <div>
              <span className="uppercase tracking-[0.35em] text-[11px] text-[#C7A45C] font-semibold block mb-4">Sourcing</span>
              <h2 className="font-bodoni text-[32px] md:text-[50px] max-w-[480px] leading-[1.1] font-medium">Материалы и партнёры</h2>
            </div>
            <p className="max-w-[400px] text-[13px] font-light opacity-60 leading-[1.6]">Работаем напрямую с проверенными поставщиками премиального сегмента — без посредников и компромиссов в качестве.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#C7A45C]/[0.12]">
            {materials.map((m, i) => (
              <Reveal key={m.label} delay={(i % 3) * 0.06} className="bg-[#0A0908] p-8 flex flex-col gap-2 transition-all duration-300 hover:bg-[#C7A45C]/[0.06] hover:pl-9">
                <span className="font-bodoni text-xl text-[#EDE6D8]">{m.label}</span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C7A45C]/75">{m.origin}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 md:py-[130px] px-6 md:px-9 bg-[#131110] border-t border-[#C7A45C]/[0.12]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-center">
          <div className="lg:border-r border-[#C7A45C]/[0.15] lg:pr-8">
            <span className="uppercase tracking-[0.35em] text-[11px] text-[#C7A45C] font-semibold block mb-4">Testimonials</span>
            <h2 className="font-bodoni text-[32px] md:text-[50px] mb-8 leading-[1.1] font-medium">Оценки тех, кто доверяет нам</h2>
            <div className="flex gap-4">
              <button onClick={prevReview} aria-label="Предыдущий отзыв" className="w-12 h-12 border border-[#C7A45C]/35 text-[#EDE6D8] flex items-center justify-center hover:bg-[#C7A45C] hover:text-[#0A0908] transition-colors"><ChevronLeft size={18} /></button>
              <button onClick={nextReview} aria-label="Следующий отзыв" className="w-12 h-12 border border-[#C7A45C]/35 text-[#EDE6D8] flex items-center justify-center hover:bg-[#C7A45C] hover:text-[#0A0908] transition-colors"><ChevronRight size={18} /></button>
            </div>
          </div>

          <Reveal className="flex gap-10 items-center flex-wrap" key={activeReview.name}>
            <div className="w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] shrink-0 relative bg-[#0A0908] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(#C7A45C 1px,transparent 1px),linear-gradient(90deg,#C7A45C 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
              <div className="relative z-10 w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] rounded-full border border-[#C7A45C]/45 bg-[#C7A45C]/[0.12] flex items-center justify-center">
                <span className="font-bodoni text-3xl text-[#C7A45C]">{activeReview.initials}</span>
              </div>
            </div>
            <div className="flex-1 min-w-[260px]">
              <div className="font-bodoni text-5xl text-[#C7A45C]/25 leading-none mb-4">"</div>
              <p className="font-bodoni text-xl md:text-2xl leading-[1.6] mb-7">{activeReview.text}</p>
              <div className="text-[11px] tracking-[0.2em] uppercase">{activeReview.name}</div>
              <div className="text-[10px] tracking-[0.15em] uppercase text-[#C7A45C] opacity-75 mt-1.5">{activeReview.role}</div>
              <div className="flex items-center gap-3.5 mt-6">
                <span className="text-xl relative inline-block overflow-hidden whitespace-nowrap" style={{ color: 'rgba(199,164,92,0.25)' }}>
                  ★★★★★
                  <motion.span
                    initial={{ width: 0 }} whileInView={{ width: '98%' }} viewport={{ once: true }} transition={{ duration: 1.1, ease: EASE }}
                    className="absolute top-0 left-0 block overflow-hidden" style={{ color: '#C7A45C' }}
                  >★★★★★</motion.span>
                </span>
                <span className="font-bodoni text-lg text-[#C7A45C]">4.9</span>
                <span className="text-[11px] opacity-50">на основе 120+ отзывов</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="py-24 md:py-[130px] px-6 md:px-9">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <span className="uppercase tracking-[0.35em] text-[11px] text-[#C7A45C] font-semibold block mb-5">Our Packages</span>
            <h2 className="font-bodoni text-[32px] md:text-[50px] font-medium">Форматы сотрудничества</h2>
            <p className="max-w-[600px] mx-auto mt-6 text-[13px] font-light opacity-60 leading-[1.6]">Стоимость определяется индивидуально после детальной консультации и замеров.</p>
          </div>

          <Reveal className="flex flex-col gap-4 mb-14 max-w-[760px] mx-auto">
            <span className="text-[10px] uppercase tracking-[0.2em] opacity-50 text-center">Объём включённых работ по тарифам</span>
            {packages.map((pb) => (
              <div key={pb.name} className="grid grid-cols-[90px_1fr_36px] sm:grid-cols-[110px_1fr_36px] items-center gap-4">
                <span className="text-xs font-medium">{pb.name}</span>
                <div className="h-1.5 bg-[#C7A45C]/[0.12] relative">
                  <motion.div
                    initial={{ width: 0 }} whileInView={{ width: `${pb.scopeScore}%` }} viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE }}
                    className="absolute inset-y-0 left-0" style={{ background: pb.highlight ? '#C7A45C' : 'rgba(199,164,92,0.5)' }}
                  />
                </div>
                <span className="font-bodoni text-[13px] text-[#C7A45C] text-right">{pb.scopeScore}%</span>
              </div>
            ))}
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0.5 bg-[#C7A45C]/[0.14]">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.name} delay={i * 0.08} className="flex flex-col p-9 md:p-11 bg-[#131110] relative transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_34px_70px_-24px_rgba(0,0,0,0.6)]" >
                <div className={`absolute top-0 left-0 right-0 h-0.5 ${pkg.highlight ? 'bg-[#C7A45C]' : 'bg-[#C7A45C]/15'}`} />
                {pkg.highlight && (
                  <span className="absolute -top-px right-9 bg-[#C7A45C] text-[#0A0908] text-[9px] uppercase tracking-[0.14em] px-3.5 py-1.5 font-bold">Оптимальный выбор</span>
                )}
                <span className="font-bodoni italic text-[56px] text-[#C7A45C]/50 mb-5">{pkg.num}</span>
                <h3 className="font-bodoni text-[28px] mb-4 font-medium">{pkg.name}</h3>
                <p className="text-[13px] font-light opacity-60 mb-8 leading-[1.6]">{pkg.desc}</p>
                <ul className="list-none p-0 mb-10 flex flex-col gap-3.5 flex-1">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-start text-[13px] font-light opacity-85 gap-2.5">
                      <span className="text-[#C7A45C]">✓</span>{feat}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="block w-full text-center py-4 text-[10px] uppercase tracking-[0.18em] bg-[#C7A45C] text-[#0A0908] font-semibold transition-all hover:bg-[#EDE6D8]">Обсудить проект</a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-[130px] px-6 md:px-9 bg-[#131110] border-t border-[#C7A45C]/[0.12]">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-14 md:mb-16">
            <span className="uppercase tracking-[0.35em] text-[11px] text-[#C7A45C] font-semibold block mb-5">Questions</span>
            <h2 className="font-bodoni text-[32px] md:text-[50px] font-medium">Детали сотрудничества</h2>
          </div>
          {faqsData.map((faq, i) => {
            const open = openFaq === i;
            return (
              <div key={faq.q} className="border-b border-[#C7A45C]/20">
                <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex justify-between items-center py-6 bg-transparent border-none cursor-pointer text-left text-[#EDE6D8]">
                  <h4 className="font-bodoni text-lg md:text-xl font-medium m-0">{faq.q}</h4>
                  <span className="text-[#C7A45C] ml-4 shrink-0 text-2xl">{open ? '−' : '+'}</span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className="overflow-hidden">
                      <p className="text-[13px] font-light opacity-60 pb-8 leading-[1.6]">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 md:py-[130px] px-6 md:px-9">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
          <div>
            <span className="uppercase tracking-[0.35em] text-[11px] text-[#C7A45C] font-semibold block mb-5">Contact</span>
            <h2 className="font-bodoni text-[32px] md:text-[50px] mb-8 font-medium">Начать проект</h2>
            <p className="text-[13px] font-light opacity-60 mb-12 leading-[1.6]">Оставьте заявку, и наш ведущий специалист свяжется с вами для обсуждения деталей вашего будущего интерьера.</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <input required type="text" placeholder="Ваше имя" className="w-full bg-transparent border-0 border-b border-[#C7A45C]/30 py-4 outline-none text-[#EDE6D8] font-archivo text-base placeholder:text-[#EDE6D8]/30" />
              <input required type="tel" placeholder="Номер телефона" className="w-full bg-transparent border-0 border-b border-[#C7A45C]/30 py-4 outline-none text-[#EDE6D8] font-archivo text-base placeholder:text-[#EDE6D8]/30" />
              <input type="text" placeholder="Тип помещения" className="w-full bg-transparent border-0 border-b border-[#C7A45C]/30 py-4 outline-none text-[#EDE6D8] font-archivo text-base placeholder:text-[#EDE6D8]/30" />
              <button type="submit" className="w-full py-5 bg-[#C7A45C] border-none text-[#0A0908] uppercase tracking-[0.2em] text-[10px] cursor-pointer mt-2 font-bold transition-all hover:bg-[#EDE6D8]">Отправить заявку</button>
              {submitted && <p className="text-[#C7A45C] text-sm font-light">Заявка успешно отправлена. Мы свяжемся с вами в течение часа.</p>}
            </form>
          </div>

          <Reveal className="relative min-h-[420px] md:min-h-[500px] bg-[#131110] border border-[#C7A45C]/[0.22] p-9 md:p-12 flex flex-col justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#C7A45C 1px,transparent 1px),linear-gradient(90deg,#C7A45C 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="absolute -bottom-[33%] -right-[25%] w-[66%] aspect-square rounded-full bg-[#C7A45C]/[0.12] blur-[100px]" />
            <div className="relative z-10">
              <h3 className="font-bodoni text-2xl mb-4 font-medium italic">Наш шоурум</h3>
              <p className="text-[13px] font-light opacity-85 mb-1.5">г. Москва, Пресненская наб., 12</p>
              <p className="text-[13px] font-light opacity-60 mb-8">Башня Федерация, 45 этаж</p>
              <a href="tel:+74950000000" className="block font-bodoni text-2xl italic text-[#C7A45C] mb-8">+7 (495) 000 00 00</a>
              <div className="flex gap-6">
                <a href="#" className="uppercase tracking-[0.16em] text-[11px] text-[#EDE6D8]/65 font-semibold hover:text-[#EDE6D8] transition-colors">WhatsApp</a>
                <a href="#" className="uppercase tracking-[0.16em] text-[11px] text-[#EDE6D8]/65 font-semibold hover:text-[#EDE6D8] transition-colors">Telegram</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#131110] pt-20 md:pt-24 pb-10 px-6 md:px-9 border-t border-[#C7A45C]/[0.12]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          <div className="lg:col-span-1">
            <span className="font-bodoni text-2xl block mb-4 font-medium">Artel</span>
            <p className="text-xs font-light opacity-60 leading-[1.7]">Ремонт и отделка квартир премиум-класса. Пространства, достойные вашего образа жизни.</p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#C7A45C] mb-5 font-semibold">Навигация</h4>
            <div className="flex flex-col gap-3.5 text-xs font-light opacity-65">
              <a href="#services" className="text-[#EDE6D8] hover:opacity-100">Услуги</a>
              <a href="#portfolio" className="text-[#EDE6D8] hover:opacity-100">Портфолио</a>
              <a href="#process" className="text-[#EDE6D8] hover:opacity-100">Процесс</a>
              <a href="#contact" className="text-[#EDE6D8] hover:opacity-100">Контакты</a>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#C7A45C] mb-5 font-semibold">Контакты</h4>
            <div className="flex flex-col gap-3.5 text-xs font-light opacity-65">
              <span>г. Москва, Пресненская наб., 12</span>
              <a href="tel:+74950000000" className="text-[#EDE6D8]">+7 (495) 000 00 00</a>
              <a href="mailto:hello@artel-interiors.ru" className="text-[#EDE6D8]">hello@artel-interiors.ru</a>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#C7A45C] mb-5 font-semibold">Следите за нами</h4>
            <div className="flex flex-col gap-3.5 text-xs font-light opacity-65">
              <a href="#" className="text-[#EDE6D8]">Instagram</a>
              <a href="#" className="text-[#EDE6D8]">Behance</a>
              <a href="#" className="text-[#EDE6D8]">Telegram</a>
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto pt-7 border-t border-[#C7A45C]/[0.12] flex justify-between gap-4 flex-wrap text-[10px] opacity-50">
          <span>© 2026 Artel Interiors Studio. All Rights Reserved.</span>
          <a href="#" className="text-[#EDE6D8]">Privacy Policy / Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}
