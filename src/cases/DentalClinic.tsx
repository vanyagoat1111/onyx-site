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

const journeyData = [
  { title: 'Консультация', desc: 'Осмотр и обсуждение целей лечения' },
  { title: 'Диагностика', desc: '3D КТ и цифровое сканирование' },
  { title: 'План лечения', desc: 'Фиксированная смета и сроки' },
  { title: 'Лечение', desc: 'Работа профильных специалистов' },
  { title: 'Наблюдение', desc: 'Контроль результата и гарантия' },
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

  return (
    <div className="relative min-h-screen bg-white text-slate-800 font-jakarta selection:bg-[#0891B2]/[0.18] selection:text-[#0F2A3A] overflow-x-clip">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[#0891B2]/[0.12]">
        <div className="max-w-[1360px] mx-auto px-6 md:px-8 py-4.5 flex justify-between items-center pl-20 md:pl-24">
          <div className="font-spectral text-2xl font-semibold text-[#0C4A6E]">Dental<span className="text-[#0891B2]">Art</span></div>
          <nav className="hidden lg:flex gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={`#${l.href}`} onClick={(e) => scrollTo(e, l.href)} className="relative text-sm font-medium text-slate-600 hover:text-[#0891B2] transition-colors group">
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
            <button onClick={(e: any) => scrollTo(e, 'contacts')} style={{ background: 'linear-gradient(135deg,#0891B2,#0E7490)', boxShadow: '0 10px 24px -8px rgba(8,145,178,0.45)' }} className="text-white px-6.5 py-3 rounded-full text-sm font-bold border-none cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-10px_rgba(8,145,178,0.45)]">Записаться</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative py-16 md:py-24 px-6 md:px-8 pb-20 md:pb-24 overflow-hidden" style={{ background: 'linear-gradient(to bottom,#F0F9FF,#FFFFFF)' }}>
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          <div>
            <span className="inline-block px-4.5 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] mb-7" style={{ background: 'rgba(8,145,178,0.1)', color: '#0369A1' }}>Премиальная стоматология в Москве</span>
            <h1 className="font-spectral text-[36px] sm:text-[48px] md:text-[64px] leading-[1.06] font-semibold text-slate-900 mb-6.5">
              Здоровая улыбка с гарантией <span style={{ background: 'linear-gradient(120deg,#0891B2,#22D3EE)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', fontStyle: 'italic' }}>экспертов</span>
            </h1>
            <p className="text-base sm:text-[17px] text-slate-600 leading-[1.65] max-w-[480px] mb-8.5">Безболезненное лечение, прецизионная имплантация и цифровая эстетика. Вернём уверенность в вашей улыбке за один визит.</p>
            <div className="flex gap-4 flex-wrap">
              <button onClick={(e: any) => scrollTo(e, 'contacts')} style={{ background: 'linear-gradient(135deg,#0891B2,#0E7490)', boxShadow: '0 12px 28px -8px rgba(8,145,178,0.4)' }} className="text-white px-8 py-4.5 rounded-full text-[15px] font-bold border-none cursor-pointer transition-all hover:-translate-y-0.5">Записаться на приём</button>
              <button onClick={(e: any) => scrollTo(e, 'services')} className="bg-white text-slate-800 px-8 py-4.5 rounded-full text-[15px] font-bold border border-slate-200 cursor-pointer transition-colors hover:bg-[#F0F9FF]">Прайс-лист</button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-[110%] h-[110%] z-0" style={{ background: 'radial-gradient(circle,rgba(34,211,238,0.25),transparent 70%)', filter: 'blur(50px)' }} />
            <div className="relative z-10 h-[320px] sm:h-[400px] md:h-[480px] rounded-[32px] overflow-hidden" style={{ boxShadow: '0 40px 90px -24px rgba(8,145,178,0.35)' }}>
              <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=80" alt="Клиника DentalArt" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(3,54,73,0.25),transparent 50%)' }} />
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
          <Reveal className="text-center max-w-[640px] mx-auto mb-16 md:mb-[72px]">
            <h2 className="font-spectral text-3xl md:text-[38px] font-semibold text-slate-900 mb-4">Путь пациента в DentalArt</h2>
            <p className="text-slate-500 text-[15px]">От первичной консультации до идеальной улыбки — под контролем на каждом этапе.</p>
          </Reveal>
          <Reveal className="relative">
            <div className="hidden md:block absolute top-[27px] left-[6%] right-[6%] h-[3px] rounded" style={{ background: 'linear-gradient(90deg,#0891B2,#22D3EE)' }} />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {journeyData.map((j) => (
                <div key={j.num} className="text-center">
                  <div style={{ background: 'linear-gradient(135deg,#0891B2,#22D3EE)', boxShadow: '0 12px 26px -8px rgba(8,145,178,0.45)' }} className="w-14 h-14 rounded-full text-white flex items-center justify-center font-bold text-lg mx-auto mb-5 relative z-10">{j.num}</div>
                  <h4 className="text-sm font-bold text-slate-800 mb-2">{j.title}</h4>
                  <p className="text-xs text-slate-500 leading-[1.5]">{j.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
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
                  <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex justify-between items-center px-6.5 py-5.5 bg-transparent border-none cursor-pointer text-left">
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
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Имплантация</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Виниры</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Отбеливание</a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4.5">Клиника</h4>
            <div className="flex flex-col gap-2.5 text-[13px]">
              <a href="#advantages" onClick={(e) => scrollTo(e, 'advantages')} className="text-slate-400 hover:text-white transition-colors">Преимущества</a>
              <a href="#faq" onClick={(e) => scrollTo(e, 'faq')} className="text-slate-400 hover:text-white transition-colors">Частые вопросы</a>
              <a href="#reviews" onClick={(e) => scrollTo(e, 'reviews')} className="text-slate-400 hover:text-white transition-colors">Отзывы</a>
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
            <a href="#" className="text-slate-400">Политика конфиденциальности</a>
            <a href="#" className="text-slate-400">Договор оферты</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
