import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const building1 = '/estate-1.jpg';
const building2 = '/estate-2.jpg';

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = '', delay = 0, style }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

const navLinks = [
  { name: 'Объекты', href: 'properties' },
  { name: 'Категории', href: 'categories' },
  { name: 'Процесс', href: 'process' },
  { name: 'Команда', href: 'experts' },
  { name: 'Аналитика', href: 'analytics' },
  { name: 'Доверие', href: 'trust' },
];

const properties = [
  { title: 'Пентхаус с панорамной террасой', location: 'Москва Сити, Башня Федерация', specs: '320 м² • 4 спальни • 5 ванных', price: '$ 5,200,000', img: building1, badge: true, offset: false },
  { title: 'Резиденция у залива', location: 'Крестовский остров', specs: '650 м² • 5 спален • причал', price: '$ 8,500,000', img: building2, badge: false, offset: true },
];

const categoriesData = [
  { title: 'Пентхаусы', count: 18, max: 32 },
  { title: 'Виллы', count: 24, max: 32 },
  { title: 'Особняки', count: 11, max: 32 },
  { title: 'Апартаменты', count: 32, max: 32 },
];

const process = [
  { num: '01', title: 'Брифинг', desc: 'Определяем критерии: локация, бюджет, назначение объекта.' },
  { num: '02', title: 'Подбор', desc: 'Формируем закрытую подборку, включая off-market предложения.' },
  { num: '03', title: 'Показы', desc: 'Организуем приватные просмотры в удобном для вас формате.' },
  { num: '04', title: 'Сделка', desc: 'Due Diligence, безопасные расчёты и оформление с юристами.' },
];

const experts = [
  { initials: 'МА', name: 'Мария Аксёнова', role: 'Управляющий партнёр' },
  { initials: 'КВ', name: 'Кирилл Веретенников', role: 'Инвестиционный брокер' },
  { initials: 'ОС', name: 'Ольга Стрельцова', role: 'Директор по работе с клиентами' },
];

const analytics = [
  { value: '12', suffix: '%', label: 'Средняя доходность' },
  { value: '$2.5', suffix: 'B', label: 'Объём сделок' },
  { value: '400', suffix: '+', label: 'Активных клиентов' },
  { value: '15', suffix: 'y', label: 'Опыта на рынке' },
];

const trustPoints = [
  'Полная анонимность клиента на всех этапах переговоров.',
  'Подписание NDA перед началом любого сотрудничества.',
  'Сопровождение сделки доверенными юристами и Family Office.',
];

const faqsData = [
  { q: 'Как происходит оценка премиальной недвижимости?', a: 'Оценка включает анализ закрытых баз данных сделок, архитектурной и исторической ценности объекта, а также потенциала капитализации в перспективе 5-10 лет. Мы привлекаем независимых международных экспертов для формирования объективной стоимости.' },
  { q: 'Возможна ли полностью дистанционная сделка?', a: 'Да. Мы предоставляем услуги виртуальных туров, а также юридическое сопровождение по доверенности. Вся документация оформляется через защищённые каналы связи с участием аккредитованных нотариусов.' },
  { q: 'Работаете ли вы с коммерческой недвижимостью?', a: 'Наш фокус — элитная жилая недвижимость, однако в рамках Family Office мы помогаем клиентам формировать диверсифицированные портфели, включающие высокодоходные коммерческие объекты класса А.' },
  { q: 'Какие гарантии конфиденциальности вы предоставляете?', a: 'Перед началом любого обсуждения мы подписываем строгий NDA. Информация о клиентах не передаётся третьим лицам, а показы организуются в индивидуальном закрытом формате.' },
];

export default function RealEstate() {
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
    <div className="relative min-h-screen bg-[#080808] text-neutral-400 font-jost selection:bg-[#C9A263]/25 selection:text-white overflow-x-clip">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#080808]/85 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-9 py-5.5 flex justify-between items-center pl-20 md:pl-24">
          <div className="font-cormorant text-2xl text-white tracking-[0.2em] uppercase">Vanguard <span className="opacity-50">Estates</span></div>
          <nav className="hidden lg:flex gap-9">
            {navLinks.map((l) => (
              <a key={l.href} href={`#${l.href}`} onClick={(e) => scrollTo(e, l.href)} className="relative text-[10px] uppercase tracking-[0.2em] font-medium text-white/70 hover:text-white transition-colors group">
                {l.name}
                <span className="absolute left-0 right-full -bottom-1 h-px bg-[#C9A263] transition-all duration-300 group-hover:right-0" />
              </a>
            ))}
          </nav>
          <button onClick={(e: any) => scrollTo(e, 'properties')} className="bg-transparent border border-white/20 text-white px-7 py-3 text-[10px] uppercase tracking-[0.2em] cursor-pointer transition-all hover:bg-white hover:text-[#080808]">Связаться</button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[94dvh] flex items-center justify-center py-20 px-6 md:px-9 overflow-hidden text-center">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(rgba(201,162,99,0.5) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full" style={{ background: 'rgba(201,162,99,0.06)', filter: 'blur(160px)' }} />
        <svg className="absolute bottom-0 left-0 w-full h-[30vh] opacity-[0.15]" viewBox="0 0 1440 300" preserveAspectRatio="none"><path d="M0 300V210L60 210V150H120V210H180V90H260V210H320V170H400V210H460V60H540V210H620V130H700V210H780V180H860V210H940V70H1020V210H1100V150H1180V210H1260V100H1340V210H1440V300H0Z" fill="#C9A263" /></svg>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,#080808,transparent,#080808)' }} />

        <div className="relative z-[2] max-w-[1100px] w-full">
          <div className="text-[10px] text-[#C9A263] uppercase tracking-[0.4em] font-semibold mb-9">Бутик элитной недвижимости</div>
          <h1 className="font-cormorant text-[42px] sm:text-[60px] md:text-[86px] text-white leading-[1.05] mb-8 font-medium">Исключительная <i className="font-light opacity-90">недвижимость</i> для искушённых</h1>
          <p className="text-base sm:text-lg text-white/80 font-light max-w-[640px] mx-auto mb-14 leading-[1.7]">Коллекция лучших пентхаусов, вилл и исторических особняков в самых престижных локациях. Искусство жить стильно.</p>

          <div className="bg-[#111]/80 backdrop-blur-xl border border-white/10 p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-[900px] mx-auto" style={{ boxShadow: '0 40px 90px -30px rgba(0,0,0,0.7)' }}>
            <select className="font-jost bg-transparent text-white/60 border border-white/[0.08] px-5.5 py-4 text-sm outline-none cursor-pointer">
              <option className="bg-[#111]">Тип объекта</option>
              <option className="bg-[#111]">Пентхаус</option>
              <option className="bg-[#111]">Вилла</option>
              <option className="bg-[#111]">Особняк</option>
            </select>
            <select className="font-jost bg-transparent text-white/60 border border-white/[0.08] px-5.5 py-4 text-sm outline-none cursor-pointer">
              <option className="bg-[#111]">Локация</option>
              <option className="bg-[#111]">Остоженка</option>
              <option className="bg-[#111]">Патриаршие пруды</option>
              <option className="bg-[#111]">Рублёво-Успенское</option>
            </select>
            <select className="font-jost bg-transparent text-white/60 border border-white/[0.08] px-5.5 py-4 text-sm outline-none cursor-pointer">
              <option className="bg-[#111]">Бюджет</option>
              <option className="bg-[#111]">От $3 млн</option>
              <option className="bg-[#111]">От $10 млн</option>
              <option className="bg-[#111]">По запросу</option>
            </select>
            <button className="bg-white text-[#080808] font-semibold uppercase tracking-[0.2em] text-[10px] px-7 py-4 border-none cursor-pointer transition-all hover:bg-[#B08B53] hover:text-white hover:-translate-y-0.5">Поиск</button>
          </div>
        </div>
      </section>

      {/* PROPERTIES */}
      <section id="properties" className="py-20 md:py-[100px] px-6 md:px-9 bg-[#0A0A0A] border-t border-white/5 scroll-mt-20">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="flex justify-between items-end gap-8 flex-wrap mb-16 md:mb-[72px]">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Коллекция</div>
              <h2 className="font-cormorant text-3xl md:text-[52px] text-white font-medium tracking-[0.02em]">Эксклюзивные предложения</h2>
            </div>
            <a href="#" className="uppercase tracking-[0.2em] text-[10px] text-white/60 border border-white/20 px-7.5 py-3.5 transition-all hover:bg-white hover:text-[#080808]">Посмотреть все объекты</a>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {properties.map((prop, i) => (
              <Reveal key={prop.title} delay={i * 0.1} className={`group cursor-pointer ${prop.offset ? 'lg:mt-14' : ''}`}>
                <div className="relative aspect-[4/3] overflow-hidden mb-8" style={{ boxShadow: '0 30px 60px -20px rgba(0,0,0,0.6)' }}>
                  {prop.badge && (
                    <div className="absolute top-6 left-6 z-[2] bg-black/60 backdrop-blur-md text-white px-4 py-2 text-[10px] uppercase tracking-[0.15em] border border-white/10">Новое предложение</div>
                  )}
                  <img src={prop.img} alt={prop.title} className="w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-105" style={{ filter: 'saturate(0.92) brightness(0.9)' }} />
                </div>
                <h3 className="font-cormorant text-2xl md:text-[32px] text-white font-medium mb-4">{prop.title}</h3>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-white/50 text-sm font-light mb-1">{prop.location}</p>
                    <p className="text-white/40 text-[11px] uppercase tracking-[0.1em]">{prop.specs}</p>
                  </div>
                  <div className="font-cormorant text-2xl text-white tracking-[0.03em]">{prop.price}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="py-20 md:py-28 px-6 md:px-9 bg-[#0A0A0A] border-t border-white/5 scroll-mt-20">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="text-center mb-16 md:mb-[72px]">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Каталог</div>
            <h2 className="font-cormorant text-3xl md:text-[52px] text-white font-medium">Категории недвижимости</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {categoriesData.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08} className="bg-[#0A0A0A] p-9 min-h-[220px] flex flex-col justify-between cursor-pointer transition-all duration-500 hover:bg-[#111] hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-18px_rgba(201,162,99,0.15)]">
                <h3 className="font-cormorant text-2xl text-white">{c.title}</h3>
                <div>
                  <div className="font-cormorant text-[56px] text-white mb-4 leading-none">{c.count}</div>
                  <div className="h-px w-full bg-white/10 mb-3.5 relative">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${Math.round((c.count / c.max) * 100)}%` }} viewport={{ once: true }} transition={{ duration: 1.3, ease: EASE }} className="absolute inset-y-0 left-0 h-px bg-[#C9A263]" />
                  </div>
                  <p className="text-white/40 text-[10px] uppercase tracking-[0.15em]">объектов в каталоге</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 md:py-[130px] px-6 md:px-9 border-t border-white/5 scroll-mt-20">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="flex justify-between items-end gap-8 flex-wrap mb-16 md:mb-[72px]">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Как мы работаем</div>
              <h2 className="font-cormorant text-3xl md:text-[52px] text-white font-medium">Процесс подбора</h2>
            </div>
            <p className="text-white/50 max-w-[360px] font-light text-sm">От первого звонка до получения ключей — с персональным экспертом на каждом этапе.</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.08} className="border-t border-white/10 pt-8">
                <div className="font-cormorant text-4xl text-white/20 mb-6">{s.num}</div>
                <h3 className="text-lg text-white mb-4 tracking-[0.02em] font-normal">{s.title}</h3>
                <p className="text-white/50 text-[13px] font-light leading-[1.65]">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTS */}
      <section id="experts" className="py-24 md:py-[130px] px-6 md:px-9 bg-[#0A0A0A] border-t border-white/5 scroll-mt-20">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="text-center mb-16 md:mb-[72px]">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Команда</div>
            <h2 className="font-cormorant text-3xl md:text-[52px] text-white font-medium">Эксперты компании</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {experts.map((e, i) => (
              <Reveal key={e.name} delay={i * 0.1} className="text-center border-t border-white/10 pt-9 transition-all duration-500 hover:border-[#C9A263]/50 hover:-translate-y-1">
                <div className="w-20 h-20 rounded-full border border-[#C9A263]/40 bg-[#C9A263]/[0.08] mx-auto mb-6 flex items-center justify-center">
                  <span className="font-cormorant text-2xl text-[#C9A263]">{e.initials}</span>
                </div>
                <h3 className="font-cormorant text-2xl text-white">{e.name}</h3>
                <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-2.5">{e.role}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ANALYTICS */}
      <section id="analytics" className="py-24 md:py-[130px] px-6 md:px-9 border-t border-white/5 scroll-mt-20">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="flex justify-between items-end gap-8 flex-wrap mb-16 md:mb-[72px]">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Рыночная экспертиза</div>
              <h2 className="font-cormorant text-3xl md:text-[52px] text-white font-medium leading-[1.05]">Цифры, которым<br />можно доверять</h2>
            </div>
            <p className="text-white/50 max-w-[360px] font-light text-sm">Мы опираемся на глубокую аналитику и закрытые данные сделок для формирования справедливой оценки и прогноза инвестиционной привлекательности.</p>
          </Reveal>
          <Reveal className="grid grid-cols-2 lg:grid-cols-4 gap-2 border-t border-b border-white/10 py-14 md:py-16">
            {analytics.map((a) => (
              <div key={a.label} className="text-center">
                <div className="font-cormorant text-4xl md:text-[64px] text-white mb-4 leading-none">{a.value}<span className="text-[#C9A263]">{a.suffix}</span></div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">{a.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* TRUST */}
      <section id="trust" className="py-24 md:py-[130px] px-6 md:px-9 bg-[#0A0A0A] border-t border-white/5 scroll-mt-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Принципы</div>
            <h2 className="font-cormorant text-3xl md:text-[48px] text-white font-medium mb-7 leading-[1.1]">Безопасность и<br />конфиденциальность</h2>
            <p className="text-white/60 font-light leading-[1.75] mb-8">Мы понимаем, что в сделках с премиальной недвижимостью публичность не всегда уместна. Наши стандарты защиты информации соответствуют швейцарскому банковскому уровню.</p>
            <div className="flex flex-col gap-4.5">
              {trustPoints.map((t) => (
                <div key={t} className="flex gap-4 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9A263] mt-2 shrink-0" />
                  <p className="text-white/80 font-light text-sm">{t}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="bg-[#111] p-10 md:p-14 border border-white/[0.06] flex flex-col justify-center">
            <div className="font-cormorant text-2xl md:text-[30px] text-white leading-[1.4] font-medium italic mb-6.5">«Идеальная сделка — это та, о которой не пишут в газетах, но которая приносит максимальную выгоду её участникам.»</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">— Управляющий комитет Vanguard</div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-[130px] px-6 md:px-9 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-14 lg:gap-16">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Информация</div>
            <h2 className="font-cormorant text-3xl md:text-[48px] text-white font-medium mb-7 leading-[1.05]">Частые<br />вопросы</h2>
            <p className="text-white/50 font-light text-sm leading-[1.7]">Прозрачность процесса — основа нашего подхода. Мы отвечаем на самые важные вопросы наших клиентов.</p>
          </Reveal>
          <div className="flex flex-col gap-3.5">
            {faqsData.map((faq, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={faq.q} delay={i * 0.05} className="bg-[#111] border px-6 md:px-8 transition-colors duration-300" style={{ borderColor: open ? 'rgba(201,162,99,0.5)' : 'rgba(255,255,255,0.1)' }}>
                  <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex justify-between items-center py-6 bg-transparent border-none cursor-pointer text-left text-white">
                    <span className="font-cormorant text-lg md:text-xl tracking-[0.02em] pr-5">{faq.q}</span>
                    <span className="text-white/50 text-xl shrink-0">{open ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden">
                        <p className="text-white/50 text-[13px] font-light leading-[1.7] pb-7 pt-5.5 border-t border-white/[0.06]">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pt-24 md:pt-[130px] pb-24 md:pb-[130px] px-6 md:px-9 border-t border-white/5">
        <Reveal className="max-w-[1100px] mx-auto bg-[#111] p-8 md:p-20 relative overflow-hidden">
          <div className="absolute -top-[20%] -right-[10%] w-[300px] md:w-[400px] h-[300px] md:h-[400px] rounded-full" style={{ background: 'rgba(201,162,99,0.08)', filter: 'blur(100px)' }} />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="font-cormorant text-3xl md:text-[48px] text-white font-medium mb-6 leading-[1.1]">Поручить задачу экспертам</h2>
              <p className="text-white/50 font-light text-sm mb-10 leading-[1.7]">Оставьте запрос, и управляющий партнёр свяжется с вами в течение часа для обсуждения деталей.</p>
              <p className="text-white/30 text-[10px] uppercase tracking-[0.2em]">Строгая конфиденциальность гарантирована.</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
              <input required type="text" placeholder="Имя" className="font-jost w-full bg-transparent border-0 border-b border-white/20 pb-3.5 text-white font-light text-sm outline-none placeholder:text-white/35" />
              <input required type="tel" placeholder="Телефон" className="font-jost w-full bg-transparent border-0 border-b border-white/20 pb-3.5 text-white font-light text-sm outline-none placeholder:text-white/35" />
              <input type="email" placeholder="Email" className="font-jost w-full bg-transparent border-0 border-b border-white/20 pb-3.5 text-white font-light text-sm outline-none placeholder:text-white/35" />
              <button type="submit" className="w-full border border-white/30 bg-transparent text-white py-5 uppercase tracking-[0.2em] text-[10px] cursor-pointer mt-2 transition-all hover:bg-white hover:text-[#080808]">Отправить запрос</button>
              {submitted && <p className="text-[#C9A263] text-xs font-light">Запрос отправлен. Управляющий партнёр свяжется с вами в течение часа.</p>}
            </form>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="pt-20 pb-10 px-6 md:px-9 bg-[#080808] border-t border-white/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-12 mb-16 md:mb-[72px]">
          <div>
            <div className="font-cormorant text-2xl text-white tracking-[0.2em] uppercase mb-6.5">Vanguard <span className="opacity-50">Estates</span></div>
            <p className="text-white/40 font-light leading-[1.7] max-w-[320px] mb-9 text-sm">Закрытый клуб элитной недвижимости. Только исключительные объекты.</p>
            <div className="flex gap-3">
              {['IG', 'TG', 'WA'].map((s) => (
                <span key={s} className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/50 text-[11px]">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white uppercase tracking-[0.2em] text-[10px] mb-6.5 opacity-50">Контакты</h4>
            <div className="flex flex-col gap-3.5 font-light text-sm text-white/80">
              <span>+7 (495) 100-20-30</span>
              <span>info@vanguard-estates.ru</span>
              <span className="text-white/50">Москва, Пресненская наб., 12<br />Башня Федерация, 90 этаж</span>
            </div>
          </div>
          <div>
            <h4 className="text-white uppercase tracking-[0.2em] text-[10px] mb-6.5 opacity-50">Навигация</h4>
            <div className="flex flex-col gap-3.5 font-light text-sm">
              <a href="#properties" onClick={(e) => scrollTo(e, 'properties')} className="text-white/60 hover:text-white transition-colors">Каталог объектов</a>
              <a href="#analytics" onClick={(e) => scrollTo(e, 'analytics')} className="text-white/60 hover:text-white transition-colors">Аналитика рынка</a>
              <a href="#trust" onClick={(e) => scrollTo(e, 'trust')} className="text-white/60 hover:text-white transition-colors">Оценить актив</a>
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto border-t border-white/5 pt-7 flex justify-between gap-4 flex-wrap text-[10px] uppercase tracking-[0.2em] text-white/30">
          <span>© 2026 Vanguard Estates. Все права защищены.</span>
          <div className="flex gap-7">
            <a href="#" className="text-white/30">Конфиденциальность</a>
            <a href="#" className="text-white/30">Оферта</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
