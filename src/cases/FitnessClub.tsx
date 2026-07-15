import React, { useState } from 'react';
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

const navLinks = [
  { name: 'Абонементы', href: 'rates' },
  { name: 'Тренеры', href: 'trainers' },
  { name: 'Расписание', href: 'schedule' },
  { name: 'Контакты', href: 'contacts' },
];

const heroStats = [
  { value: '24/7', label: 'Режим работы', color: '#DC2626' },
  { value: '2000м²', label: 'Площадь клуба', color: '#F97316' },
  { value: '12', label: 'Зон тренинга', color: '#404040' },
  { value: 'SPA', label: 'Комплекс', color: '#404040' },
];

const infra = [
  { title: 'Тренажёрный зал', desc: 'Премиальное оборудование от Life Fitness и Hammer Strength.' },
  { title: 'Зона Кроссфита', desc: 'Помосты, рамы, канаты и свободные веса для функционального тренинга.' },
  { title: 'SPA-зона', desc: 'Финская сауна, хамам, ледяной душ и массажный кабинет.' },
  { title: 'Фитнес-бар', desc: 'Спортивное питание, протеиновые коктейли и полезные снеки.' },
  { title: 'Групповые залы', desc: 'Амортизирующий паркет и профессиональная акустика.' },
  { title: 'Сайкл-студия', desc: 'Иммерсивные тренировки на байках последнего поколения.' },
  { title: 'Раздевалки', desc: 'Просторные шкафчики, электронные замки и премиальная косметика.' },
  { title: 'Паркинг', desc: 'Бесплатная охраняемая парковка на 100 автомобилей.' },
].map((it, i) => ({ ...it, num: String(i + 1).padStart(2, '0') }));

const trainers = [
  { initials: 'АС', name: 'Алексей Соколов', role: 'Кроссфит, силовой тренинг', rating: '4.9' },
  { initials: 'ЕР', name: 'Елена Реброва', role: 'Йога, стретчинг', rating: '5.0' },
  { initials: 'ДК', name: 'Дмитрий Котов', role: 'Бокс, единоборства', rating: '4.8' },
  { initials: 'МВ', name: 'Марина Волкова', role: 'Персональный тренинг', rating: '4.9' },
];

const resultsBand = [
  { value: '2 400+', label: 'резидентов клуба' },
  { value: '87%', label: 'продлевают карту повторно' },
  { value: '4.9', label: 'средняя оценка тренировок' },
];

const weekLoad = [
  { day: 'ПН', pct: 62, color: '#F97316' },
  { day: 'ВТ', pct: 74, color: '#F97316' },
  { day: 'СР', pct: 58, color: '#F97316' },
  { day: 'ЧТ', pct: 81, color: '#F97316' },
  { day: 'ПТ', pct: 95, color: '#EF4444' },
  { day: 'СБ', pct: 100, color: '#EF4444' },
  { day: 'ВС', pct: 68, color: '#F97316' },
];

const plans = [
  { name: 'Утро', price: '45 000', period: 'год', features: ['Доступ: 07:00 – 16:00', 'Тренажёрный зал', 'Бассейн и SPA (утром)', '1 вводная тренировка'], popular: false, borderColor: '#262626', bg: 'rgba(23,23,23,0.5)', btnBg: '#262626' },
  { name: 'Безлимит', price: '75 000', period: 'год', features: ['Круглосуточный доступ 24/7', 'Тренажёрный зал', 'Бассейн и SPA без ограничений', 'Групповые программы', 'Гостевые визиты: 5 шт', 'Заморозка: 45 дней'], popular: true, borderColor: '#EF4444', bg: 'linear-gradient(to bottom, rgba(127,29,29,0.2), rgba(23,23,23,0.5))', btnBg: '#DC2626' },
  { name: 'VIP', price: '120 000', period: 'год', features: ['Доступ 24/7 + VIP раздевалка', 'Индивидуальный шкафчик', 'Ежедневная стирка формы', '12 персональных тренировок', 'Массаж: 5 сеансов', 'Заморозка: 90 дней'], popular: false, borderColor: '#262626', bg: 'rgba(23,23,23,0.5)', btnBg: '#262626' },
];

const schedule = [
  { time: '08:00', name: 'CrossFit WOD', room: 'Зал Кроссфит', trainer: 'Алексей С.' },
  { time: '10:30', name: 'Йога', room: 'Зал Групповых программ', trainer: 'Елена Р.' },
  { time: '14:00', name: 'Boxing', room: 'Ринг', trainer: 'Дмитрий К.' },
  { time: '18:30', name: 'TRX Pro', room: 'Зал Функционала', trainer: 'Марина В.' },
  { time: '20:00', name: 'Stretching', room: 'Зал Групповых программ', trainer: 'Елена Р.' },
];

const faqsData = [
  { q: 'Как проходит первая тренировка?', a: 'Первая тренировка вводная. Под руководством дежурного тренера вы пройдёте фитнес-тестирование, поставите технику работы на тренажёрах и получите персональные рекомендации.' },
  { q: 'Есть ли заморозка абонемента?', a: 'Да, для годовых карт предусмотрена заморозка от 45 до 90 дней в зависимости от тарифа. Управлять ей можно в личном кабинете.' },
  { q: 'Что брать с собой на занятие?', a: 'Спортивную форму, кроссовки и бутылку для воды. В раздевалках выдаются полотенца и есть вся необходимая косметика в душевых.' },
  { q: 'Сколько длится групповое занятие?', a: 'От 45 до 60 минут. Точное время и уровень подготовки указаны в расписании клуба.' },
  { q: 'Можно ли оплатить карту в рассрочку?', a: 'У нас есть беспроцентная рассрочка от клуба на 3, 6 и 12 месяцев. Оформление занимает 5 минут по одному документу.' },
];

function Skew({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={`inline-block -skew-x-[10deg] ${className}`} style={style}>
      <span className="inline-block skew-x-[10deg]">{children}</span>
    </span>
  );
}

export default function FitnessClub() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [scheduleTab, setScheduleTab] = useState('Сегодня');

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
    <div className="relative min-h-screen bg-[#0A0A0A] text-white font-sport selection:bg-red-500/30 selection:text-white overflow-x-clip">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/85 backdrop-blur-xl border-b border-red-900/30">
        <div className="max-w-[1360px] mx-auto px-6 md:px-8 py-4 flex justify-between items-center pl-20 md:pl-24">
          <div className="font-black italic uppercase text-2xl">IRON<span className="text-[#DC2626]">CORE</span></div>
          <nav className="hidden md:flex gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={`#${l.href}`} onClick={(e) => scrollTo(e, l.href)} className="text-xs font-bold uppercase tracking-[0.12em] text-neutral-400 hover:text-white transition-colors">{l.name}</a>
            ))}
          </nav>
          <button className="bg-[#DC2626] text-white px-4 md:px-5.5 py-3 text-[11px] font-bold uppercase tracking-[0.1em] shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_34px_rgba(220,38,38,0.6)] transition-shadow cursor-pointer">
            <Skew>Стать резидентом</Skew>
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[88dvh] flex items-center py-16 px-6 md:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
          <div className="absolute -top-[25%] right-0 w-2/3 h-full rounded-full" style={{ background: 'rgba(220,38,38,0.18)', filter: 'blur(140px)' }} />
          <div className="absolute -bottom-[33%] -left-[25%] w-1/2 h-full rounded-full" style={{ background: 'rgba(249,115,22,0.1)', filter: 'blur(140px)' }} />
          <div className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none">
            <span className="font-black italic uppercase leading-none text-white/[0.03]" style={{ fontSize: '28vw', transform: 'translateX(25%)' }}>CORE</span>
          </div>
        </div>

        <div className="max-w-[1360px] mx-auto relative z-[2] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2.5 bg-[#DC2626]/10 border border-[#EF4444]/30 text-[#EF4444] px-4.5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] mb-7">
              <motion.span animate={{ opacity: [1, 0.4, 1], scale: [1, 0.75, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="w-2 h-2 rounded-full bg-[#EF4444] inline-block" />
              Новый уровень
            </div>
            <h1 className="font-black uppercase leading-[0.95] text-[42px] sm:text-[56px] md:text-[76px] mb-7 tracking-tight">
              Не предел,<br />
              <span style={{ background: 'linear-gradient(90deg,#DC2626,#F97316)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>а старт</span>
            </h1>
            <p className="text-neutral-400 text-[17px] max-w-[440px] leading-[1.6] mb-9">Премиальное фитнес-пространство для тех, кто не ищет оправданий. 2000 м² инновационного оборудования и атмосфера, заряженная на результат.</p>
            <div className="flex gap-4 flex-wrap">
              <button className="bg-[#DC2626] border border-[#DC2626] text-white px-8 py-4.5 text-[13px] font-bold uppercase tracking-[0.1em] shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-shadow cursor-pointer"><Skew>Стать резидентом</Skew></button>
              <button onClick={(e: any) => scrollTo(e, 'schedule')} className="bg-transparent border border-neutral-700 text-white px-8 py-4.5 text-[13px] font-bold uppercase tracking-[0.1em] hover:border-neutral-500 transition-colors cursor-pointer"><Skew>Расписание</Skew></button>
            </div>
          </div>

          <Reveal className="grid grid-cols-2 gap-3.5">
            {heroStats.map((st) => (
              <div key={st.label} className="bg-[#171717] border-b-[3px] p-6 transition-all duration-400 hover:-translate-y-1" style={{ borderColor: st.color }}>
                <div className="font-black text-[28px] md:text-[34px] mb-2">{st.value}</div>
                <div className="text-[11px] text-neutral-500 uppercase tracking-[0.12em]">{st.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section className="py-20 md:py-28 px-6 md:px-8 bg-[#171717] border-t border-red-900/30">
        <div className="max-w-[1360px] mx-auto">
          <Reveal className="flex justify-between items-end gap-6 flex-wrap mb-14 md:mb-16">
            <div>
              <div className="text-[13px] text-[#EF4444] uppercase tracking-[0.15em] font-mono mb-2.5">Технологии и комфорт</div>
              <h2 className="font-black uppercase text-3xl md:text-[38px]">Инфраструктура</h2>
            </div>
            <p className="text-neutral-400 max-w-[380px] text-sm">Всё необходимое для продуктивных тренировок и качественного восстановления.</p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {infra.map((item, i) => (
              <Reveal key={item.title} delay={(i % 4) * 0.06} className="p-7 border border-[#262626] transition-all duration-400 hover:-translate-y-1.5 hover:border-[#EF4444]/50 hover:shadow-[0_24px_50px_-18px_rgba(220,38,38,0.3)]" >
                <div style={{ background: 'linear-gradient(to bottom, rgba(23,23,23,0.6), #0A0A0A)' }} className="contents">
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-[#DC2626]/70 text-xl">●</span>
                    <span className="font-black text-xl text-[#262626]">{item.num}</span>
                  </div>
                  <h4 className="text-[15px] font-bold uppercase tracking-[0.06em] mb-2.5">{item.title}</h4>
                  <p className="text-xs text-neutral-500 font-medium">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRAINERS */}
      <section id="trainers" className="py-20 md:py-28 px-6 md:px-8 scroll-mt-20">
        <div className="max-w-[1360px] mx-auto">
          <Reveal className="flex justify-between items-end gap-6 flex-wrap mb-14 md:mb-16">
            <div>
              <div className="text-[13px] text-[#EF4444] uppercase tracking-[0.15em] font-mono mb-2.5">Команда</div>
              <h2 className="font-black uppercase text-3xl md:text-[38px]">Тренеры</h2>
            </div>
            <p className="text-neutral-400 max-w-[380px] text-sm">Сертифицированные специалисты по силовому тренингу, кроссфиту и групповым программам.</p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16 md:mb-18">
            {trainers.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.07} className="bg-[#171717] border border-[#262626] p-6.5 flex flex-col transition-all duration-400 hover:-translate-y-1.5 hover:border-[#EF4444]/50 hover:shadow-[0_24px_50px_-18px_rgba(220,38,38,0.3)]">
                <Skew className="w-14 h-14 bg-[#DC2626]/15 border border-[#EF4444]/30 text-[#EF4444] mb-6 font-black text-lg" style={{}}>
                  <span className="w-14 h-14 flex items-center justify-center">{t.initials}</span>
                </Skew>
                <h4 className="text-base font-bold uppercase tracking-[0.04em] mb-1.5">{t.name}</h4>
                <p className="text-[#EF4444] text-[11px] uppercase tracking-[0.1em] mb-5">{t.role}</p>
                <div className="mt-auto flex items-center gap-2">
                  <span className="text-[#EF4444]">★</span>
                  <span className="font-black text-xl">{t.rating}</span>
                  <span className="text-[9px] uppercase tracking-[0.1em] text-neutral-500">Рейтинг</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#262626] border border-[#262626]">
            {resultsBand.map((r) => (
              <div key={r.label} className="bg-[#0A0A0A] p-9 md:p-11 text-center">
                <div className="font-black text-[32px] md:text-[44px] mb-2.5">{r.value}</div>
                <div className="text-[11px] uppercase tracking-[0.12em] text-neutral-500">{r.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WEEKLY LOAD */}
      <section className="py-20 md:py-28 px-6 md:px-8 bg-[#171717] border-t border-red-900/30">
        <div className="max-w-[1360px] mx-auto">
          <Reveal className="mb-14 md:mb-16">
            <div className="text-[13px] text-[#EF4444] uppercase tracking-[0.15em] font-mono mb-2.5">Загрузка клуба</div>
            <h2 className="font-black uppercase text-3xl md:text-[38px]">Пиковая посещаемость по дням</h2>
          </Reveal>
          <Reveal className="grid grid-cols-7 gap-2 sm:gap-3.5 items-end h-[220px] md:h-[280px]">
            {weekLoad.map((d) => (
              <div key={d.day} className="flex flex-col items-center justify-end h-full gap-2 sm:gap-3">
                <span className="font-black text-xs sm:text-[15px]" style={{ color: d.color }}>{d.pct}%</span>
                <div className="w-full h-[140px] sm:h-[200px] flex items-end bg-white/[0.03]">
                  <motion.div
                    initial={{ height: 0 }} whileInView={{ height: `${d.pct}%` }} viewport={{ once: true }} transition={{ duration: 1.1, ease: EASE }}
                    className="w-full" style={{ background: `linear-gradient(to top, #DC2626, ${d.color})` }}
                  />
                </div>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.1em] text-neutral-500">{d.day}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section id="rates" className="py-20 md:py-28 px-6 md:px-8 scroll-mt-20">
        <div className="max-w-[1360px] mx-auto">
          <Reveal className="flex justify-between items-end gap-6 flex-wrap mb-14 md:mb-16">
            <div>
              <div className="text-[13px] text-neutral-500 uppercase tracking-[0.15em] font-mono mb-2.5">Клубные карты</div>
              <h2 className="font-black uppercase text-2xl md:text-[32px]">Тарифы</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 0.08} className="relative p-8 md:p-8.5 border flex flex-col transition-all duration-400 hover:-translate-y-1.5" style={{ borderColor: plan.borderColor, background: plan.bg }}>
                {plan.popular && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#DC2626] text-white font-bold text-[9px] uppercase tracking-[0.12em] px-3 py-1.5">Хит продаж</div>
                )}
                <h3 className="text-2xl font-extrabold uppercase tracking-[0.04em] mb-2">{plan.name}</h3>
                <div className="flex items-end gap-2 mb-7 pb-7 border-b border-[#262626]">
                  <span className="font-black text-[30px] md:text-[34px]">{plan.price}₽</span>
                  <span className="text-neutral-500 text-[13px] mb-1.5">/ {plan.period}</span>
                </div>
                <ul className="list-none p-0 mb-11 flex flex-col gap-3.5 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-3 text-neutral-300 text-[13px]">
                      <span className="w-1.5 h-1.5 bg-[#EF4444] rotate-45 shrink-0" />{feat}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 font-bold uppercase tracking-[0.1em] text-[13px] border-none cursor-pointer text-white" style={{ background: plan.btnBg }}><Skew>Оформить карту</Skew></button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="py-20 md:py-28 px-6 md:px-8 scroll-mt-20">
        <div className="max-w-[1360px] mx-auto">
          <Reveal className="flex justify-between items-center gap-6 flex-wrap mb-12 md:mb-14">
            <h2 className="font-black uppercase text-3xl md:text-[44px]">Расписание</h2>
            <div className="flex gap-1 p-1 bg-[#171717] border border-[#262626]">
              {['Сегодня', 'Завтра', 'Неделя'].map((t) => (
                <button key={t} onClick={() => setScheduleTab(t)} className="px-5 py-2.5 font-bold text-[11px] uppercase tracking-[0.1em] border-none cursor-pointer transition-colors" style={{ background: scheduleTab === t ? '#DC2626' : 'none', color: scheduleTab === t ? '#fff' : '#A3A3A3' }}>{t}</button>
              ))}
            </div>
          </Reveal>

          <div className="flex flex-col gap-2">
            {schedule.map((s, i) => (
              <Reveal key={s.time} delay={i * 0.05} className="flex justify-between items-center p-5 md:p-6 bg-white/[0.02] border border-[#262626] flex-wrap gap-4 transition-colors duration-300 hover:bg-[#171717] hover:border-[#EF4444]/50">
                <div className="flex items-center gap-8 md:gap-10 flex-wrap">
                  <div className="font-black text-2xl md:text-[26px] text-[#EF4444] w-[90px] md:w-[110px]">{s.time}</div>
                  <div>
                    <h4 className="text-base md:text-[17px] font-bold uppercase tracking-[0.04em] mb-1">{s.name}</h4>
                    <p className="text-neutral-500 text-[13px]">{s.room}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 md:gap-7">
                  <div className="text-right">
                    <div className="text-[13px] font-bold uppercase tracking-[0.06em] text-neutral-300">{s.trainer}</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">Тренер</div>
                  </div>
                  <button className="px-5 md:px-6.5 py-3 border border-[#DC2626] bg-transparent text-[#EF4444] font-bold text-[11px] uppercase tracking-[0.1em] cursor-pointer hover:bg-[#DC2626] hover:text-white transition-colors"><Skew>Записаться</Skew></button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 px-6 md:px-8 border-t border-red-900/30">
        <div className="max-w-[900px] mx-auto">
          <Reveal className="text-center mb-14 md:mb-16">
            <h2 className="font-black uppercase text-3xl md:text-[44px] mb-4">FAQ</h2>
            <p className="text-neutral-400 text-[15px]">Популярные вопросы о работе клуба и абонементах.</p>
          </Reveal>
          <div className="flex flex-col gap-3.5">
            {faqsData.map((faq, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={faq.q} delay={i * 0.04} className="bg-[#171717] border px-6 md:px-7.5" style={{ borderColor: open ? 'rgba(239,68,68,0.5)' : '#262626' }}>
                  <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex justify-between items-center py-5.5 bg-transparent border-none cursor-pointer text-left text-white">
                    <span className="font-bold uppercase tracking-[0.03em] text-sm md:text-base">{faq.q}</span>
                    <span className="text-[#DC2626] ml-4 shrink-0 text-2xl">{open ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden">
                        <p className="text-neutral-400 text-sm leading-[1.65] pb-6.5 pt-5 border-t border-[#262626]">{faq.a}</p>
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
      <section id="contacts" className="py-20 md:py-24 px-6 md:px-8 bg-[#171717] border-b border-[#262626] scroll-mt-20">
        <Reveal className="max-w-[900px] mx-auto text-center">
          <h2 className="font-black uppercase text-3xl md:text-[42px] mb-9">Запишись на первую тренировку</h2>
          <form onSubmit={handleSubmit} className="flex gap-3.5 max-w-[600px] mx-auto flex-wrap">
            <input required type="tel" placeholder="+7 (___) ___-__-__" className="flex-1 min-w-[200px] bg-[#0A0A0A] border border-[#262626] px-5.5 py-4 text-white font-mono text-sm outline-none placeholder:text-white/35" />
            <button type="submit" className="bg-[#DC2626] text-white px-8 py-4 font-extrabold uppercase tracking-[0.1em] text-[13px] cursor-pointer shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-shadow"><Skew>Жду звонка</Skew></button>
          </form>
          {submitted && <p className="text-red-400 text-[13px] mt-4">Заявка отправлена. Мы позвоним вам в ближайшее время.</p>}
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050505] pt-16 md:pt-20 pb-10 px-6 md:px-8 text-neutral-400">
        <div className="max-w-[1360px] mx-auto flex justify-between gap-12 flex-wrap mb-16">
          <div className="max-w-[280px]">
            <div className="font-black uppercase tracking-[0.06em] text-xl mb-4">IRON<span className="text-[#DC2626]">CORE</span></div>
            <p className="text-[13px] leading-[1.6] mb-5.5">Бескомпромиссный подход к тренировкам в клубе IRONCORE. Премиальное оборудование, лучшие тренеры и атмосфера результата.</p>
            <div className="flex gap-4 border-l-2 border-[#DC2626] pl-4">
              <span className="text-white font-bold text-[13px] uppercase">ВК</span>
              <span className="text-white font-bold text-[13px] uppercase">ТГ</span>
              <span className="text-white font-bold text-[13px] uppercase">IG</span>
            </div>
          </div>
          <div>
            <h4 className="text-white font-extrabold uppercase text-[13px] mb-4 border-b border-[#262626] pb-2.5">Клуб</h4>
            <div className="flex flex-col gap-3 text-[13px]">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">О нас</a>
              <a href="#rates" onClick={(e) => scrollTo(e, 'rates')} className="text-neutral-400 hover:text-white transition-colors">Карты</a>
              <a href="#schedule" onClick={(e) => scrollTo(e, 'schedule')} className="text-neutral-400 hover:text-white transition-colors">Расписание</a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-extrabold uppercase text-[13px] mb-4 border-b border-[#262626] pb-2.5">Услуги</h4>
            <div className="flex flex-col gap-3 text-[13px]">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">Кроссфит</a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">Боевые искусства</a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">Групповые занятия</a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-extrabold uppercase text-[13px] mb-4 border-b border-[#262626] pb-2.5">Контакты</h4>
            <div className="flex flex-col gap-3 text-[13px]">
              <span className="text-white text-[17px] font-mono">+7 (495) 999-00-00</span>
              <span>info@ironcore.club</span>
              <span className="text-neutral-500">г. Москва, Брутальный пр-т, 1<br />Круглосуточно 24/7</span>
            </div>
          </div>
        </div>
        <div className="max-w-[1360px] mx-auto border-t border-[#171717] pt-7 flex justify-between gap-4 flex-wrap text-[11px] font-mono text-neutral-600">
          <span>© 2026 IRONCORE. Все права защищены.</span>
          <div className="flex gap-5">
            <a href="#" className="text-neutral-600">Политика конфиденциальности</a>
            <a href="#" className="text-neutral-600">Оферта</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
