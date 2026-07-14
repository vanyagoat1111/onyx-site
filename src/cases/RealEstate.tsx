import React from 'react';
import { motion } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const building1 = "/estate-1.jpg";
const building2 = "/estate-2.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};

export default function RealEstate() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#080808] text-neutral-300 font-sans selection:bg-white/20 selection:text-white overflow-hidden">

      {/* Header */}
      <header className="absolute top-0 w-full z-50 pl-20 pr-6 md:pl-24 md:pr-12 py-8 flex justify-between items-center border-b border-white/5">
        <div className="text-xl md:text-2xl font-cormorant text-white tracking-[0.2em] uppercase">
          Vanguard <span className="opacity-50">Estates</span>
        </div>
        <nav className="hidden lg:flex gap-10 text-[10px] uppercase tracking-[0.2em] font-medium text-white/70">
          <a href="#philosophy" onClick={(e) => scrollTo(e, 'philosophy')} className="hover:text-white transition-colors">Философия</a>
          <a href="#properties" onClick={(e) => scrollTo(e, 'properties')} className="hover:text-white transition-colors">Объекты</a>
          <a href="#categories" onClick={(e) => scrollTo(e, 'categories')} className="hover:text-white transition-colors">Категории</a>
          <a href="#process" onClick={(e) => scrollTo(e, 'process')} className="hover:text-white transition-colors">Процесс</a>
          <a href="#services" onClick={(e) => scrollTo(e, 'services')} className="hover:text-white transition-colors">Услуги</a>
          <a href="#analytics" onClick={(e) => scrollTo(e, 'analytics')} className="hover:text-white transition-colors">Аналитика</a>
          <a href="#trust" onClick={(e) => scrollTo(e, 'trust')} className="hover:text-white transition-colors">Доверие</a>
        </nav>
        <button className="text-white border border-white/20 px-4 md:px-8 py-2 md:py-3 hover:bg-white hover:text-black transition-colors text-[9px] md:text-[10px] uppercase tracking-[0.2em] cursor-pointer">
          Связаться
        </button>
      </header>

      {/* Hero: editorial typography, no stock imagery */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#080808]">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: 'radial-gradient(rgba(201,162,99,0.5) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-[#c9a263]/[0.06] blur-[160px]" />
          {/* Faint skyline silhouette */}
          <svg className="absolute bottom-0 left-0 w-full h-[30vh] opacity-[0.15]" viewBox="0 0 1440 300" preserveAspectRatio="none" fill="none">
            <path d="M0 300V210L60 210V150H120V210H180V90H260V210H320V170H400V210H460V60H540V210H620V130H700V210H780V180H860V210H940V70H1020V210H1100V150H1180V210H1260V100H1340V210H1440V300H0Z" fill="#c9a263" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808]" />
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center mt-12">
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="text-[10px] text-[#c9a263] uppercase tracking-[0.4em] mb-10 font-bold">
            Бутик элитной недвижимости
          </motion.div>
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="text-5xl md:text-7xl lg:text-[100px] font-cormorant text-white mb-10 tracking-wide drop-shadow-2xl text-center leading-tight md:leading-[1.05]"
          >
            Исключительная <br className="hidden md:block" /> <i className="font-light text-white/90">недвижимость</i> <br className="hidden md:block" /> для искушенных
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-16 md:mb-20 font-light tracking-wide text-center leading-relaxed"
          >
            Коллекция лучших пентхаусов, вилл и исторических особняков в самых престижных локациях мира. Искусство жить стильно.
          </motion.p>

          {/* Search/Filters */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="bg-[#111]/80 backdrop-blur-2xl border border-white/10 p-3 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-3 w-full shadow-2xl"
          >
            <select defaultValue="" className="bg-transparent text-white border border-white/5 py-4 px-6 focus:outline-none focus:border-white/20 text-sm appearance-none cursor-pointer [&>option]:bg-[#111]">
              <option value="" disabled hidden>Тип объекта</option>
              <option value="penthouse">Пентхаус</option>
              <option value="villa">Вилла</option>
              <option value="mansion">Особняк</option>
            </select>
            <select defaultValue="" className="bg-transparent text-white border-x md:border-y-0 border-y border-white/5 py-4 px-6 focus:outline-none focus:border-white/20 text-sm appearance-none cursor-pointer [&>option]:bg-[#111]">
              <option value="" disabled hidden>Локация</option>
              <option value="ost">Остоженка</option>
              <option value="patr">Патриаршие пруды</option>
              <option value="rubl">Рублево-Успенское</option>
            </select>
            <select defaultValue="" className="bg-transparent text-white border-b md:border-b-0 md:border-r border-white/5 py-4 px-6 focus:outline-none focus:border-white/20 text-sm appearance-none cursor-pointer [&>option]:bg-[#111]">
              <option value="" disabled hidden>Бюджет</option>
              <option value="3m">От $3 млн</option>
              <option value="10m">От $10 млн</option>
              <option value="custom">По запросу</option>
            </select>
            <button className="bg-white text-black font-semibold uppercase tracking-[0.2em] text-[10px] py-4 px-4 hover:bg-gray-200 transition-colors cursor-pointer">
              Поиск объектов
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section id="properties" className="pt-12 pb-32 md:pt-20 md:pb-32 px-6 md:px-12 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div>
               <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Коллекция</div>
               <h2 className="text-4xl md:text-5xl font-cormorant text-white tracking-wide">Эксклюзивные предложения</h2>
            </div>
            <a href="#" onClick={(e) => e.preventDefault()} className="uppercase tracking-[0.2em] text-[10px] text-white/50 border border-white/20 px-8 py-3 hover:bg-white hover:text-black transition-colors self-start md:self-auto">
              Посмотреть все объекты
            </a>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Property 1 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden mb-8 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] group-hover:shadow-[0_40px_80px_-16px_rgba(0,0,0,0.7)] transition-shadow duration-500">
                <div className="absolute top-6 left-6 z-10 bg-black/60 backdrop-blur-md px-4 py-2 text-white text-[10px] uppercase tracking-widest border border-white/10">
                  Новое предложение
                </div>
                <img src={building1} alt="Пентхаус с панорамной террасой" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
              </div>
              <div>
                <h3 className="text-3xl font-cormorant text-white mb-3 group-hover:text-white/80 transition-colors">Пентхаус с панорамной террасой</h3>
                <div className="flex justify-between items-end mt-4">
                  <div className="space-y-1">
                     <p className="text-white/50 text-sm font-light">Москва Сити, Башня Федерация</p>
                     <p className="text-white/40 text-[11px] uppercase tracking-wider">320 м² • 4 Спальни • 5 Ванных</p>
                  </div>
                  <div className="text-2xl font-cormorant text-white tracking-wide">$ 5,200,000</div>
                </div>
              </div>
            </motion.div>

            {/* Property 2 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.15, ease }}
              className="group cursor-pointer md:mt-24"
            >
              <div className="relative aspect-[4/3] overflow-hidden mb-8 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] group-hover:shadow-[0_40px_80px_-16px_rgba(0,0,0,0.7)] transition-shadow duration-500">
                <img src={building2} alt="Резиденция у залива" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
              </div>
              <div>
                <h3 className="text-3xl font-cormorant text-white mb-3 group-hover:text-white/80 transition-colors">Резиденция у залива</h3>
                <div className="flex justify-between items-end mt-4">
                  <div className="space-y-1">
                     <p className="text-white/50 text-sm font-light">Крестовский Остров</p>
                     <p className="text-white/40 text-[11px] uppercase tracking-wider">650 м² • 5 Спален • Причал</p>
                  </div>
                  <div className="text-2xl font-cormorant text-white tracking-wide">$ 8,500,000</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-24 px-6 md:px-12 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="text-center mb-20">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Каталог</div>
            <h2 className="text-4xl md:text-5xl font-cormorant text-white tracking-wide">Категории недвижимости</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {[
              { title: 'Пентхаусы', count: 18, max: 32 },
              { title: 'Виллы', count: 24, max: 32 },
              { title: 'Особняки', count: 11, max: 32 },
              { title: 'Апартаменты', count: 32, max: 32 },
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className="group cursor-pointer bg-[#0a0a0a] hover:bg-[#111] hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(255,255,255,0.08)] transition-all duration-500 p-8 flex flex-col justify-between min-h-[220px]"
              >
                <h3 className="text-2xl font-cormorant text-white mb-1">{c.title}</h3>
                <div>
                  <div className="text-5xl font-cormorant text-white mb-3">{c.count}</div>
                  <div className="h-px w-full bg-white/10 mb-3">
                    <motion.div
                      className="h-px bg-white/60"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(c.count / c.max) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.08, ease }}
                    />
                  </div>
                  <p className="text-white/40 text-[11px] uppercase tracking-widest">объектов в каталоге</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Selection process */}
      <section id="process" className="py-32 px-6 md:px-12 bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Как мы работаем</div>
              <h2 className="text-4xl md:text-5xl font-cormorant text-white tracking-wide">Процесс подбора</h2>
            </div>
            <p className="text-white/50 max-w-sm font-light text-sm">От первого звонка до получения ключей — с персональным экспертом на каждом этапе.</p>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Брифинг', desc: 'Определяем критерии: локация, бюджет, назначение объекта.' },
              { num: '02', title: 'Подбор', desc: 'Формируем закрытую подборку, включая off-market предложения.' },
              { num: '03', title: 'Показы', desc: 'Организуем приватные просмотры в удобном для вас формате.' },
              { num: '04', title: 'Сделка', desc: 'Due Diligence, безопасные расчёты и оформление с юристами.' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="border-t border-white/10 pt-8"
              >
                <div className="text-white/20 font-cormorant text-4xl mb-6">{s.num}</div>
                <h3 className="text-xl text-white mb-4 tracking-wide">{s.title}</h3>
                <p className="text-white/50 text-sm font-light leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experts */}
      <section id="experts" className="py-32 px-6 md:px-12 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="text-center mb-20">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Команда</div>
            <h2 className="text-4xl md:text-5xl font-cormorant text-white tracking-wide">Эксперты компании</h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-10">
            {[
              { initials: 'МА', name: 'Мария Аксёнова', role: 'Управляющий партнёр' },
              { initials: 'КВ', name: 'Кирилл Веретенников', role: 'Инвестиционный брокер' },
              { initials: 'ОС', name: 'Ольга Стрельцова', role: 'Директор по работе с клиентами' },
            ].map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="text-center group border-t border-white/10 pt-8 hover:border-white/30 hover:-translate-y-1 transition-all duration-500"
              >
                <div className="w-20 h-20 rounded-full border border-white/15 mx-auto mb-6 flex items-center justify-center">
                  <span className="font-cormorant text-2xl text-white">{e.initials}</span>
                </div>
                <h3 className="text-xl font-cormorant text-white tracking-wide">{e.name}</h3>
                <p className="text-white/40 text-[11px] uppercase tracking-widest mt-2">{e.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services/Expertise */}
      <section id="services" className="py-32 px-6 md:px-12 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="text-center mb-24">
             <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Наши компетенции</div>
             <h2 className="text-4xl md:text-5xl font-cormorant text-white tracking-wide">Безупречный сервис <br/>на каждом этапе</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-y-16 gap-x-12">
             {[
               { num: '01', title: 'Off-Market Сделки', desc: 'Доступ к закрытой базе премиальных объектов, которые не публикуются на открытом рынке для сохранения приватности владельцев.' },
               { num: '02', title: 'Инвестиционный брокеридж', desc: 'Анализ рынка, подбор ликвидных активов с высокой доходностью и структурирование инвестиционных портфелей.' },
               { num: '03', title: 'Юридическое сопровождение', desc: 'Полный Due Diligence объектов, безопасные расчеты и оформление сделок с участием ведущих юристов.' },
               { num: '04', title: 'Продажа вашей недвижимости', desc: 'Создание премиальных маркетинговых материалов и таргетированный поиск покупателей.' },
               { num: '05', title: 'Relocation & Lifestyle', desc: 'Организация переездов, подбор персонала и консьерж-сопровождение для вас и вашей семьи.' },
               { num: '06', title: 'Архитектура и дизайн', desc: 'Рекомендации лучших архитектурных бюро и дизайнеров интерьера для создания дома вашей мечты.' },
             ].map((svc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease }}
                  className="group border-t border-white/10 pt-8 hover:border-white/30 hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="text-white/20 font-cormorant text-4xl mb-6">{svc.num}</div>
                  <h3 className="text-xl text-white mb-4 tracking-wide">{svc.title}</h3>
                  <p className="text-white/50 text-sm font-light leading-relaxed">{svc.desc}</p>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-6 md:px-12 bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="md:w-1/3">
             <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Информация</div>
             <h2 className="text-4xl font-cormorant text-white tracking-wide mb-8">Частые<br/>вопросы</h2>
             <p className="text-white/50 text-sm font-light leading-relaxed">Прозрачность процесса — основа нашего подхода. Мы отвечаем на самые важные вопросы наших клиентов.</p>
          </motion.div>
          <div className="md:w-2/3 space-y-6">
             {[
               { q: 'Как происходит оценка премиальной недвижимости?', a: 'Оценка включает анализ закрытых баз данных сделок, архитектурной и исторической ценности объекта, а также потенциала капитализации в перспективе 5-10 лет. Мы привлекаем независимых международных экспертов для формирования объективной стоимости.' },
               { q: 'Возможна ли полностью дистанционная сделка?', a: 'Да. Мы предоставляем услуги виртуальных туров, а также юридическое сопровождение по доверенности. Вся документация оформляется через защищенные каналы связи с участием аккредитованных нотариусов.' },
               { q: 'Работаете ли вы с коммерческой недвижимостью?', a: 'Наш фокус — элитная жилая недвижимость, однако в рамках Family Office мы помогаем клиентам формировать диверсифицированные портфели, включающие высокодоходные коммерческие объекты класса А.' },
               { q: 'Какие гарантии конфиденциальности вы предоставляете?', a: 'Перед началом любого обсуждения мы подписываем строгий NDA. Информация о клиентах не передается третьим лицам, а показы организуются в индивидуальном закрытом формате.' }
             ].map((faq, i) => (
                <motion.details
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease }}
                  className="group border border-white/10 bg-[#111] open:bg-white/5 transition-colors duration-300"
                >
                  <summary className="cursor-pointer list-none flex justify-between items-center p-8 text-white font-medium">
                     <span className="text-lg font-cormorant tracking-wide pr-8">{faq.q}</span>
                     <span className="text-white/40 shrink-0">
                       <Plus className="w-5 h-5 group-open:hidden" strokeWidth={1.5} />
                       <Minus className="w-5 h-5 hidden group-open:block" strokeWidth={1.5} />
                     </span>
                  </summary>
                  <div className="px-8 pb-8 text-white/50 text-sm font-light leading-relaxed border-t border-white/5 pt-6 mt-2">
                     {faq.a}
                  </div>
                </motion.details>
             ))}
          </div>
        </div>
      </section>

      {/* Analytics */}
      <section id="analytics" className="py-32 px-6 md:px-12 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
            <div>
               <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Рыночная экспертиза</div>
               <h2 className="text-4xl md:text-5xl font-cormorant text-white tracking-wide">Цифры, которым <br/>можно доверять</h2>
            </div>
            <p className="text-white/50 max-w-sm font-light text-sm">Мы опираемся на глубокую аналитику и закрытые данные сделок для формирования справедливой оценки и прогнозирования инвестиционной привлекательности.</p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.15, ease }} className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-white/10 py-16">
             {[
               { v: '12', s: '%', l: 'Средняя доходность' },
               { v: '$2.5', s: 'B', l: 'Объем сделок' },
               { v: '400', s: '+', l: 'Активных клиентов' },
               { v: '15', s: 'y', l: 'Опыта на рынке' },
             ].map((s, i) => (
               <div key={i} className={`text-center ${i > 0 ? 'md:border-l border-white/10' : ''}`}>
                  <div className="text-5xl font-cormorant text-white mb-4">{s.v}<span className="text-white/40">{s.s}</span></div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">{s.l}</div>
               </div>
             ))}
          </motion.div>
        </div>
      </section>

      {/* Trust */}
      <section id="trust" className="py-32 px-6 md:px-12 bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="md:w-1/2">
             <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Принципы</div>
             <h2 className="text-4xl md:text-5xl font-cormorant text-white tracking-wide mb-8">Безопасность и<br/>конфиденциальность</h2>
             <p className="text-white/60 font-light leading-relaxed mb-8">Мы понимаем, что в сделках с премиальной недвижимостью публичность не всегда уместна. Наши стандарты защиты информации соответствуют швейцарскому банковскому уровню.</p>
             <ul className="space-y-4">
                {[
                  'Полная анонимность клиента на всех этапах переговоров.',
                  'Подписание NDA перед началом любого сотрудничества.',
                  'Сопровождение сделки доверенными юристами и Family Офисами.',
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-4">
                     <div className="w-1.5 h-1.5 bg-white/40 rounded-full mt-2 shrink-0"></div>
                     <p className="text-white/80 font-light text-sm">{t}</p>
                  </li>
                ))}
             </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="md:w-1/2 bg-[#111] p-12 border border-white/5"
          >
             <div className="text-2xl font-cormorant text-white mb-6">«Идеальная сделка — это та, о которой не пишут в газетах, но которая приносит максимальную выгоду ее участникам.»</div>
             <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">— Управляющий комитет Vanguard</div>
          </motion.div>
        </div>
      </section>

      {/* CTA / Big Form */}
      <section className="py-32 px-6 md:px-12 bg-[#080808] border-t border-white/5 pb-0">
         <motion.div
           initial={{ opacity: 0, y: 24 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: '-80px' }}
           transition={{ duration: 0.7, ease }}
           className="max-w-5xl mx-auto bg-[#111] p-12 md:p-20 relative overflow-hidden"
         >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px]"></div>
            <div className="relative z-10 grid md:grid-cols-2 gap-16">
               <div>
                  <h2 className="text-3xl md:text-5xl font-cormorant text-white mb-6">Поручить задачу экспертам</h2>
                  <p className="text-white/50 font-light text-sm mb-10">Оставьте запрос, и управляющий партнер свяжется с вами в течение часа для обсуждения деталей.</p>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest">Строгая конфиденциальность гарантирована.</p>
               </div>
               <form className="space-y-6">
                  <input type="text" placeholder="Имя" className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white font-light text-sm transition-colors" />
                  <input type="tel" placeholder="Телефон" className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white font-light text-sm transition-colors" />
                  <input type="email" placeholder="Email" className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white font-light text-sm transition-colors" />
                  <div className="pt-6">
                     <button type="button" className="w-full border border-white/30 text-white py-5 hover:bg-white hover:text-black transition-colors text-[10px] uppercase tracking-[0.2em] cursor-pointer">
                        Отправить запрос
                     </button>
                  </div>
               </form>
            </div>
         </motion.div>
      </section>

      {/* Footer */}
      <footer className="pt-32 pb-12 px-6 md:px-12 bg-[#080808]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 mb-24 border-t border-white/5 pt-16">
          <div className="md:col-span-2">
            <div className="text-2xl font-cormorant text-white tracking-[0.2em] uppercase mb-8">
              Vanguard <span className="opacity-50">Estates</span>
            </div>
            <p className="text-white/40 font-light leading-relaxed max-w-sm mb-12 text-sm">
              Закрытый клуб элитной недвижимости. <br/>Только исключительные объекты.
            </p>
            <div className="flex gap-6">
               <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors cursor-pointer text-xs">IG</div>
               <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors cursor-pointer text-xs">TG</div>
               <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors cursor-pointer text-xs">WA</div>
            </div>
          </div>

          <div>
            <h4 className="text-white uppercase tracking-[0.2em] text-[10px] mb-8 opacity-50">Контакты</h4>
            <div className="space-y-4 font-light text-sm text-white/80">
              <p>+7 (495) 100-20-30</p>
              <p>concierge@vanguard.ru</p>
              <p className="text-white/50 pt-2">Москва, Пресненская наб., 12<br/>Башня Федерация, 90 этаж</p>
            </div>
          </div>

          <div>
            <h4 className="text-white uppercase tracking-[0.2em] text-[10px] mb-8 opacity-50">Навигация</h4>
            <ul className="space-y-4 font-light text-sm text-white/60">
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Каталог объектов</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Услуги брокериджа</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Аналитика рынка</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Оценить актив</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/30 uppercase tracking-[0.2em] gap-4">
          <div>© 2026 Vanguard Estates. Все права защищены.</div>
          <div className="flex gap-8">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Конфиденциальность</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Оферта</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
