import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Scale, Lock, Target, Eye, Plus, Minus } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};

export default function LawFirm() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a1023] text-slate-300 font-serif selection:bg-[#c9a263] selection:text-white overflow-hidden">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a1023]/95 backdrop-blur border-b border-[#2a365c] py-5 pl-20 pr-6 md:pl-24 md:pr-12 flex justify-between items-center">
        <div className="text-xl md:text-2xl font-bold tracking-widest text-[#c9a263] uppercase">
          Egorov <span className="text-white font-light">& Partners</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-sans tracking-wider text-slate-300 uppercase">
          <a href="#practice" onClick={(e) => scrollTo(e, 'practice')} className="hover:text-[#c9a263] transition-colors">Практики</a>
          <a href="#partners" onClick={(e) => scrollTo(e, 'partners')} className="hover:text-[#c9a263] transition-colors">Партнёры</a>
          <a href="#principles" onClick={(e) => scrollTo(e, 'principles')} className="hover:text-[#c9a263] transition-colors">Принципы</a>
          <a href="#process" onClick={(e) => scrollTo(e, 'process')} className="hover:text-[#c9a263] transition-colors">Этапы</a>
          <a href="#cases" onClick={(e) => scrollTo(e, 'cases')} className="hover:text-[#c9a263] transition-colors">Дела</a>
          <a href="#faq" onClick={(e) => scrollTo(e, 'faq')} className="hover:text-[#c9a263] transition-colors">FAQ</a>
          <a href="#contacts" onClick={(e) => scrollTo(e, 'contacts')} className="hover:text-[#c9a263] transition-colors">Контакты</a>
        </nav>
        <button className="bg-[#c9a263] text-[#0a1023] px-4 md:px-6 py-2 font-sans font-bold uppercase tracking-wider text-[10px] md:text-xs transition-colors hover:bg-[#b08b53] cursor-pointer">
          Консультация
        </button>
      </header>

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center pt-20 px-6 md:px-12 bg-[#0a1023] overflow-hidden">
        {/* Graphic backdrop: fine gold linework, no stock imagery */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: 'linear-gradient(#c9a263 1px, transparent 1px), linear-gradient(90deg, #c9a263 1px, transparent 1px)',
              backgroundSize: '56px 56px',
            }}
          />
          <div className="absolute top-1/4 right-[8%] w-[42vw] h-[42vw] max-w-[560px] max-h-[560px] rounded-full bg-[#c9a263]/[0.07] blur-[120px]" />
          <div className="absolute inset-0 flex items-center justify-end pointer-events-none select-none overflow-hidden">
            <Scale className="w-[46vw] h-[46vw] max-w-[620px] max-h-[620px] text-[#c9a263]/[0.06] translate-x-[18%]" strokeWidth={0.4} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1023] via-[#0a1023]/85 to-[#0a1023]/40" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="max-w-2xl relative z-10">
            <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="flex items-center gap-4 mb-8">
               <div className="h-px bg-[#c9a263] w-12"></div>
               <div className="text-[#c9a263] font-sans font-medium uppercase tracking-widest text-xs">Юридическое бюро</div>
            </motion.div>
            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="text-4xl md:text-6xl text-white leading-[1.1] mb-8 font-medium"
            >
              Безупречная защита <br/>интересов вашего бизнеса в суде
            </motion.h1>
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="text-lg md:text-xl mb-12 font-sans font-light leading-relaxed max-w-lg"
            >
              Разрешение сложных корпоративных споров, защита активов и юридическое сопровождение сделок с 2010 года.
            </motion.p>
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="bg-[#131d3b]/80 border border-[#2a365c] p-6 md:p-8 backdrop-blur-md"
            >
              <h3 className="text-white text-lg mb-6 font-medium">Запись на первичную консультацию</h3>
              <form className="flex flex-col sm:flex-row gap-4">
                <input type="tel" placeholder="Ваш телефон" className="flex-1 bg-transparent border-b border-[#2a365c] text-white px-2 py-2 font-sans focus:outline-none focus:border-[#c9a263] transition-colors" />
                <button type="button" className="bg-[#c9a263] text-[#0a1023] font-sans font-bold uppercase tracking-wider text-xs px-8 py-3 hover:bg-[#b08b53] transition-colors cursor-pointer">
                  Отправить
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats/Credibility */}
      <section className="border-y border-[#2a365c] bg-[#0a1023] py-12 px-6 md:px-12">
         <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-[#2a365c]">
            {[
              { v: '10+', l: 'Лет практики' },
              { v: '₽45 млрд', l: 'Защищенных активов' },
              { v: '94%', l: 'Выигранных дел' },
              { v: 'Топ-15', l: 'Право.ru-300' },
            ].map((s, i) => (
              <div key={i} className="px-4 text-center">
                <div className="text-3xl text-[#c9a263] mb-2 font-light">{s.v}</div>
                <div className="font-sans text-xs uppercase tracking-widest text-slate-500">{s.l}</div>
              </div>
            ))}
         </motion.div>
      </section>

      {/* Services */}
      <section id="practice" className="py-24 px-6 md:px-12 bg-[#0d152e]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl text-white font-medium mb-6">Ключевые практики</h2>
            <div className="w-16 h-0.5 bg-[#c9a263] mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-1">
            {[
              'Корпоративное право и M&A',
              'Разрешение споров и Арбитраж',
              'Банкротство и реструктуризация',
              'Налоговое право',
              'Уголовно-правовая защита бизнеса',
              'Недвижимость и строительство'
            ].map((practice, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease }}
                className="bg-[#131d3b] p-8 md:p-10 border border-[#2a365c] hover:border-[#c9a263] hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(201,162,99,0.2)] group transition-all duration-500 cursor-pointer flex flex-col justify-between h-full min-h-[250px]"
              >
                <h3 className="text-xl text-white font-medium mb-6 group-hover:text-[#c9a263] transition-colors">{practice}</h3>
                <div className="w-10 h-10 border border-[#2a365c] rounded-full flex items-center justify-center text-[#c9a263] group-hover:bg-[#c9a263] group-hover:text-[#0a1023] transition-all">
                  <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="py-24 px-6 md:px-12 bg-[#0d152e] border-t border-[#2a365c]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl text-white font-medium mb-6">Партнёры бюро</h2>
            <div className="w-16 h-0.5 bg-[#c9a263] mx-auto"></div>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { initials: 'ЕД', name: 'Егоров Дмитрий Александрович', role: 'Управляющий партнёр', spec: 'Корпоративные споры, M&A', years: 18 },
              { initials: 'СА', name: 'Соловьёва Анна Игоревна', role: 'Партнёр', spec: 'Банкротство, субсидиарная ответственность', years: 12 },
              { initials: 'МВ', name: 'Марков Виктор Павлович', role: 'Партнёр', spec: 'Арбитраж, налоговые споры', years: 15 },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="bg-[#131d3b] border border-[#2a365c] hover:border-[#c9a263] hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(201,162,99,0.2)] transition-all duration-500 p-8"
              >
                <div className="w-16 h-16 rounded-full bg-[#c9a263]/10 border border-[#c9a263]/40 text-[#c9a263] flex items-center justify-center font-medium text-xl mb-6">
                  {p.initials}
                </div>
                <h3 className="text-white font-medium text-lg mb-1">{p.name}</h3>
                <p className="text-[#c9a263] text-xs uppercase tracking-widest mb-3">{p.role}</p>
                <p className="text-slate-400 text-sm font-sans font-light mb-6">{p.spec}</p>
                <div className="pt-4 border-t border-[#2a365c] flex items-baseline gap-2">
                  <span className="text-2xl font-serif text-white">{p.years}</span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 font-sans">лет практики</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client types */}
      <section id="clients" className="py-24 px-6 md:px-12 bg-[#0a1023] border-t border-[#2a365c]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 text-white">
            <h2 className="text-3xl md:text-5xl font-medium">С кем мы работаем</h2>
            <div className="w-16 h-0.5 bg-[#c9a263]"></div>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#2a365c]">
            {['Собственники и топ-менеджмент', 'Промышленные холдинги', 'IT и технологические компании', 'Инвестиционные фонды'].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className="bg-[#0d152e] p-8 min-h-[120px] flex items-center hover:bg-[#131d3b] transition-colors duration-500"
              >
                <span className="text-white font-sans text-sm leading-snug">{c}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results infographic */}
      <section className="py-24 px-6 md:px-12 bg-[#0d152e] border-t border-[#2a365c]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="flex flex-col items-center bg-[#131d3b] border border-[#2a365c] p-10">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
                <circle cx="80" cy="80" r="70" fill="none" stroke="#2a365c" strokeWidth="12" />
                <motion.circle
                  cx="80" cy="80" r="70" fill="none" stroke="#c9a263" strokeWidth="12" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 70}
                  initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                  whileInView={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - 0.94) }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-medium text-white">94%</span>
              </div>
            </div>
            <p className="mt-6 text-slate-400 font-sans text-sm text-center max-w-[220px]">судебных дел завершены в пользу доверителя за последние 5 лет</p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1, ease }} className="bg-[#131d3b] border border-[#2a365c] p-10">
            <h3 className="text-white font-medium text-lg mb-8">Дела по направлениям практики</h3>
            <div className="space-y-5">
              {[
                { l: 'Корпоративные споры и M&A', v: 38, color: '#c9a263' },
                { l: 'Банкротство', v: 27, color: '#9b6b3f' },
                { l: 'Арбитраж и налоговые споры', v: 21, color: '#7c2d12' },
                { l: 'Прочее', v: 14, color: '#2a365c' },
              ].map((row, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-sans text-slate-400 mb-2">
                    <span>{row.l}</span>
                    <span className="text-white font-medium">{row.v}%</span>
                  </div>
                  <div className="h-2 bg-[#0a1023] overflow-hidden">
                    <motion.div
                      className="h-full"
                      style={{ backgroundColor: row.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${row.v}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1, ease }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Principles */}
      <section id="principles" className="py-24 px-6 md:px-12 bg-[#0a1023] border-t border-[#2a365c]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 text-white">
            <div>
              <h2 className="text-3xl md:text-5xl font-medium mb-6">Принципы нашей работы</h2>
              <div className="w-16 h-0.5 bg-[#c9a263]"></div>
            </div>
            <p className="max-w-md font-sans font-light text-slate-300 leading-relaxed">
              Фундамент, на котором строятся отношения с доверителями и выигрываются самые сложные споры.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Target, title: 'Эксклюзивность', desc: 'Мы берем в работу ограниченное количество дел, чтобы гарантировать максимальное погружение команды в специфику вашего бизнеса.' },
              { icon: Lock, title: 'Конфиденциальность', desc: 'Строгое соблюдение адвокатской тайны. Информация о наших доверителях и деталях споров никогда не становится публичной без их согласия.' },
              { icon: ArrowUpRight, title: 'Ориентация на результат', desc: 'Мы не просто консультируем о рисках, а предлагаем конкретные правовые решения для достижения экономической цели бизнеса.' },
              { icon: Eye, title: 'Прозрачность', desc: 'Честная оценка судебных перспектив до подписания договора. Фиксированная стоимость услуг, исключающая скрытые платежи.' }
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="bg-[#131d3b] p-8 border border-[#2a365c] hover:border-[#c9a263] hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(201,162,99,0.18)] transition-all duration-500 flex flex-col min-h-[280px]"
              >
                <p.icon className="text-[#c9a263] w-8 h-8 mb-6" strokeWidth={1.5} />
                <h3 className="text-xl text-white font-medium mb-4">{p.title}</h3>
                <p className="font-sans font-light text-sm text-slate-400 flex-grow leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-24 px-6 md:px-12 bg-[#0d152e] border-t border-[#2a365c]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl text-white font-medium mb-6">Этапы сотрудничества</h2>
            <div className="w-16 h-0.5 bg-[#c9a263] mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: 1, title: 'Правовой аудит', desc: 'Изучение материалов дела, анализ судебной практики и выработка предварительной правовой позиции с оценкой рисков и перспектив.', line: true },
              { n: 2, title: 'Формирование стратегии', desc: 'Выработка пошагового плана действий (дорожной карты), сбор доказательной базы и согласование с доверителем тактики ведения дела.', line: true },
              { n: 3, title: 'Реализация и защита', desc: 'Активное представительство интересов в судах и на переговорах, реализация выработанной стратегии вплоть до достижения необходимого результата.', line: false },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.15, ease }}
                className="relative group"
              >
                {step.line && <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-[#2a365c] group-hover:bg-[#c9a263] transition-colors"></div>}
                <div className="bg-[#0a1023] w-16 h-16 rounded-full border-2 border-[#2a365c] group-hover:border-[#c9a263] text-[#c9a263] flex items-center justify-center font-sans font-medium text-xl mx-auto mb-6 relative z-10 transition-colors">
                  {step.n}
                </div>
                <div className="text-center px-4">
                  <h3 className="text-xl text-white font-medium mb-4">{step.title}</h3>
                  <p className="font-sans font-light text-slate-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 md:px-12 bg-[#c9a263]">
        <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x md:divide-[#8a6a3b] text-center">
          {[
            { v: '15+', l: 'Лет практики' },
            { v: '92%', l: 'Успешных дел' },
            { v: '5млрд+', l: 'Защищенных активов ₽' },
            { v: 'Топ-15', l: 'Рейтингов Право-300' },
          ].map((s, i) => (
            <div key={i} className="px-4">
              <div className="text-4xl md:text-5xl font-medium text-[#0a1023] mb-2">{s.v}</div>
              <p className="text-xs md:text-sm font-sans font-medium text-[#0a1023] uppercase tracking-wider">{s.l}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Cases */}
      <section id="cases" className="py-24 px-6 md:px-12 bg-[#0d152e] border-t border-[#2a365c]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="flex justify-between items-end mb-16 border-b border-[#2a365c] pb-6">
            <h2 className="text-3xl md:text-5xl text-white font-medium">Значимые дела</h2>
            <button className="hidden md:block font-sans uppercase tracking-widest text-xs text-[#c9a263] hover:text-white transition-colors cursor-pointer">Все кейсы →</button>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            {[
              { tag: 'Корпоративный конфликт • 2025', title: 'Защита мажоритарного акционера производственного холдинга', desc: 'Успешное отражение попыток недружественного поглощения (рейдерского захвата). Суды трех инстанций отказали оппонентам во взыскании убытков на сумму более 5 млрд рублей с доверителя.', tags: ['Арбитражный суд г. Москвы', 'Победа'] },
              { tag: 'Банкротство • 2024', title: 'Защита от субсидиарной ответственности бывших бенефициаров', desc: 'В рамках дела о банкротстве крупного ритейлера нам удалось доказать отсутствие причинно-следственной связи между действиями доверителей и банкротством компании, сохранив их личные активы на сумму 1.2 млрд рублей.', tags: ['Кассация', 'Победа'] },
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.15, ease }}
                className="group cursor-pointer"
              >
                <div className="font-sans font-medium uppercase tracking-widest text-xs text-slate-500 mb-3 group-hover:text-[#c9a263] transition-colors">{c.tag}</div>
                <h3 className="text-2xl text-white font-medium mb-4 leading-snug">{c.title}</h3>
                <p className="font-sans font-light text-slate-400 text-sm leading-relaxed mb-6">
                  {c.desc}
                </p>
                <div className="flex gap-4">
                  {c.tags.map((t, j) => (
                    <div key={j} className="font-sans font-light text-xs bg-[#131d3b] text-slate-300 px-3 py-1 border border-[#2a365c]">{t}</div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 md:px-12 bg-[#0a1023] border-t border-[#2a365c]">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl text-white font-medium mb-6">Частые вопросы</h2>
             <div className="w-16 h-0.5 bg-[#c9a263] mx-auto"></div>
          </motion.div>
          <div className="space-y-4">
            {[
              { q: 'Как формируется стоимость услуг?', a: 'Мы работаем по системе фиксированных гонораров (Flat Fee) или по почасовым ставкам (Hourly Rate), в зависимости от специфики проекта. В некоторых делах возможен гонорар успеха (Success Fee).' },
              { q: 'Даете ли вы стопроцентную гарантию выигрыша в суде?', a: 'В соответствии с Кодексом профессиональной этики адвоката, мы не имеем права давать гарантии исхода судебного спора. Однако мы гарантируем профессиональный подход, глубокую экспертизу и максимальную защиту ваших интересов.' },
              { q: 'С какими регионами вы работаете?', a: 'Главный офис находится в Москве, но мы представляем интересы доверителей в арбитражных судах и судах общей юрисдикции по всей территории Российской Федерации.' },
              { q: 'Как обеспечивается конфиденциальность?', a: 'Конфиденциальность защищена законом об адвокатской деятельности. Любые сведения, связанные с оказанием правовой помощи, составляют строгую адвокатскую тайну и не подлежат разглашению.' }
            ].map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.06, ease }}
                className="group bg-[#131d3b] border border-[#2a365c] p-6 lg:p-8 cursor-pointer open:border-[#c9a263] transition-colors rounded-none"
              >
                <summary className="text-white font-medium text-lg marker:content-none flex justify-between items-center outline-none">
                  <span className="pr-8">{faq.q}</span>
                  <span className="text-[#c9a263] shrink-0">
                    <Plus className="w-5 h-5 group-open:hidden" strokeWidth={1.5} />
                    <Minus className="w-5 h-5 hidden group-open:block" strokeWidth={1.5} />
                  </span>
                </summary>
                <div className="mt-6 font-sans font-light text-slate-400 text-sm leading-relaxed pr-8 border-t border-[#2a365c] pt-6">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts / Footer */}
      <footer id="contacts" className="bg-[#0a1023] border-t border-[#2a365c] py-16 px-6 md:px-12 text-slate-400 font-sans font-light">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold tracking-widest text-[#c9a263] uppercase font-serif mb-6">
              Egorov <span className="text-white font-light">& Partners</span>
            </div>
            <p className="text-sm max-w-sm leading-relaxed mb-8">
              Юридическое бюро, предоставляющее эксклюзивные услуги бизнесу в области разрешения сложных корпоративных и коммерческих споров.
            </p>
            <div className="flex items-center gap-6 text-[#c9a263]">
               <div>г. Москва, Пресненская наб., 12 (Башня Федерация)</div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium uppercase tracking-widest text-xs mb-6 font-sans">Связь</h4>
            <ul className="space-y-4 text-sm">
              <li>+7 (495) 000-00-00</li>
              <li>info@egorovlegal.ru</li>
            </ul>
            <button className="mt-8 border border-[#c9a263] text-[#c9a263] px-6 py-2 uppercase tracking-widest text-xs hover:bg-[#c9a263] hover:text-[#0a1023] transition-colors font-medium cursor-pointer">Оставить заявку</button>
          </div>
          <div>
            <h4 className="text-white font-medium uppercase tracking-widest text-xs mb-6 font-sans">Информация</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Политика конфиденциальности</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Правовая оговорка</a></li>
            </ul>
             <div className="mt-12 text-xs text-slate-500">© 2026 Egorov & Partners</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
