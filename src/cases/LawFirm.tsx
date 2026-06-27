import React from 'react';
const case4_1 = "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=800&q=80";

export default function LawFirm() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1023] text-slate-300 font-serif selection:bg-[#c9a263] selection:text-white">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a1023]/95 backdrop-blur border-b border-[#2a365c] py-5 px-6 md:px-12 flex justify-between items-center">
        <div className="text-xl md:text-2xl font-bold tracking-widest text-[#c9a263] uppercase">
          Egorov <span className="text-white font-light">& Partners</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-sans tracking-wider text-slate-300 uppercase">
          <a href="#practice" onClick={(e) => scrollTo(e, 'practice')} className="hover:text-[#c9a263] transition-colors">Практики</a>
          <a href="#principles" onClick={(e) => scrollTo(e, 'principles')} className="hover:text-[#c9a263] transition-colors">Принципы</a>
          <a href="#process" onClick={(e) => scrollTo(e, 'process')} className="hover:text-[#c9a263] transition-colors">Этапы</a>
          <a href="#cases" onClick={(e) => scrollTo(e, 'cases')} className="hover:text-[#c9a263] transition-colors">Дела</a>
          <a href="#faq" onClick={(e) => scrollTo(e, 'faq')} className="hover:text-[#c9a263] transition-colors">FAQ</a>
          <a href="#contacts" onClick={(e) => scrollTo(e, 'contacts')} className="hover:text-[#c9a263] transition-colors">Контакты</a>
        </nav>
        <button className="hidden md:block bg-[#c9a263] text-[#0a1023] px-6 py-2 font-sans font-bold uppercase tracking-wider text-xs transition-colors hover:bg-[#b08b53]">
          Консультация
        </button>
      </header>

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center pt-20 px-6 md:px-12 bg-[#0a1023] overflow-hidden">
        <img src={case4_1} className="absolute inset-0 w-full h-full object-cover object-center"  />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1023] via-[#0a1023]/60 to-transparent"></div>
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="max-w-2xl relative z-10">
            <div className="flex items-center gap-4 mb-8">
               <div className="h-px bg-[#c9a263] w-12"></div>
               <div className="text-[#c9a263] font-sans font-medium uppercase tracking-widest text-xs">Юридическое бюро</div>
            </div>
            <h1 className="text-4xl md:text-6xl text-white leading-[1.1] mb-8 font-medium">
              Безупречная защита <br/>интересов вашего бизнеса в суде
            </h1>
            <p className="text-lg md:text-xl mb-12 font-sans font-light leading-relaxed max-w-lg">
              Разрешение сложных корпоративных споров, защита активов и юридическое сопровождение сделок с 2010 года.
            </p>
            <div className="bg-[#131d3b]/80 border border-[#2a365c] p-6 md:p-8 backdrop-blur-md">
              <h3 className="text-white text-lg mb-6 font-medium">Запись на первичную консультацию</h3>
              <form className="flex flex-col sm:flex-row gap-4">
                <input type="tel" placeholder="Ваш телефон" className="flex-1 bg-transparent border-b border-[#2a365c] text-white px-2 py-2 font-sans focus:outline-none focus:border-[#c9a263] transition-colors" />
                <button type="button" className="bg-[#c9a263] text-[#0a1023] font-sans font-bold uppercase tracking-wider text-xs px-8 py-3 hover:bg-[#b08b53] transition-colors">
                  Отправить
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Credibility */}
      <section className="border-y border-[#2a365c] bg-[#0a1023] py-12 px-6 md:px-12">
         <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-[#2a365c]">
            <div className="px-4 text-center">
              <div className="text-3xl text-[#c9a263] mb-2 font-light">10+</div>
              <div className="font-sans text-xs uppercase tracking-widest text-slate-500">Лет практики</div>
            </div>
            <div className="px-4 text-center">
              <div className="text-3xl text-[#c9a263] mb-2 font-light">₽45 млрд</div>
              <div className="font-sans text-xs uppercase tracking-widest text-slate-500">Защищенных активов</div>
            </div>
            <div className="px-4 text-center">
              <div className="text-3xl text-[#c9a263] mb-2 font-light">94%</div>
              <div className="font-sans text-xs uppercase tracking-widest text-slate-500">Выигранных дел</div>
            </div>
            <div className="px-4 text-center">
              <div className="text-3xl text-[#c9a263] mb-2 font-light">Топ-15</div>
              <div className="font-sans text-xs uppercase tracking-widest text-slate-500">Право.ru-300</div>
            </div>
         </div>
      </section>

      {/* Services */}
      <section id="practice" className="py-24 px-6 md:px-12 bg-[#0d152e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl text-white font-medium mb-6">Ключевые практики</h2>
            <div className="w-16 h-0.5 bg-[#c9a263] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-1">
            {[
              'Корпоративное право и M&A',
              'Разрешение споров и Арбитраж',
              'Банкротство и реструктуризация',
              'Налоговое право',
              'Уголовно-правовая защита бизнеса',
              'Недвижимость и строительство'
            ].map((practice, i) => (
              <div key={i} className="bg-[#131d3b] p-8 md:p-10 border border-[#2a365c] hover:border-[#c9a263] group transition-colors cursor-pointer flex flex-col justify-between h-full min-h-[250px]">
                <h3 className="text-xl text-white font-medium mb-6 group-hover:text-[#c9a263] transition-colors">{practice}</h3>
                <div className="w-10 h-10 border border-[#2a365c] rounded-full flex items-center justify-center text-[#c9a263] group-hover:bg-[#c9a263] group-hover:text-[#0a1023] transition-all">
                  →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Principles */}
      <section id="principles" className="py-24 px-6 md:px-12 bg-[#0a1023] border-t border-[#2a365c]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-white">
            <div>
              <h2 className="text-3xl md:text-5xl font-medium mb-6">Принципы нашей работы</h2>
              <div className="w-16 h-0.5 bg-[#c9a263]"></div>
            </div>
            <p className="max-w-md font-sans font-light text-slate-300 leading-relaxed">
              Фундамент, на котором строятся отношения с доверителями и выигрываются самые сложные споры.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Эксклюзивность', desc: 'Мы берем в работу ограниченное количество дел, чтобы гарантировать максимальное погружение команды в специфику вашего бизнеса.' },
              { title: 'Конфиденциальность', desc: 'Строгое соблюдение адвокатской тайны. Информация о наших доверителях и деталях споров никогда не становится публичной без их согласия.' },
              { title: 'Ориентация на результат', desc: 'Мы не просто консультируем о рисках, а предлагаем конкретные правовые решения для достижения экономической цели бизнеса.' },
              { title: 'Прозрачность', desc: 'Честная оценка судебных перспектив до подписания договора. Фиксированная стоимость услуг, исключающая скрытые платежи.' }
            ].map((p, i) => (
              <div key={i} className="bg-[#131d3b] p-8 border border-[#2a365c] hover:border-[#c9a263] transition-colors flex flex-col min-h-[280px]">
                <div className="text-[#c9a263] font-sans font-medium text-lg mb-6 tracking-widest">{`0${i + 1}`}</div>
                <h3 className="text-xl text-white font-medium mb-4">{p.title}</h3>
                <p className="font-sans font-light text-sm text-slate-400 flex-grow leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-24 px-6 md:px-12 bg-[#0d152e] border-t border-[#2a365c]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl text-white font-medium mb-6">Этапы сотрудничества</h2>
            <div className="w-16 h-0.5 bg-[#c9a263] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative group">
              <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-[#2a365c] group-hover:bg-[#c9a263] transition-colors"></div>
              <div className="bg-[#0a1023] w-16 h-16 rounded-full border-2 border-[#2a365c] group-hover:border-[#c9a263] text-[#c9a263] flex items-center justify-center font-sans font-medium text-xl mx-auto mb-6 relative z-10 transition-colors">
                1
              </div>
              <div className="text-center px-4">
                <h3 className="text-xl text-white font-medium mb-4">Правовой аудит</h3>
                <p className="font-sans font-light text-slate-400 text-sm leading-relaxed">
                  Изучение материалов дела, анализ судебной практики и выработка предварительной правовой позиции с оценкой рисков и перспектив.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-[#2a365c] group-hover:bg-[#c9a263] transition-colors"></div>
              <div className="bg-[#0a1023] w-16 h-16 rounded-full border-2 border-[#2a365c] group-hover:border-[#c9a263] text-[#c9a263] flex items-center justify-center font-sans font-medium text-xl mx-auto mb-6 relative z-10 transition-colors">
                2
              </div>
              <div className="text-center px-4">
                <h3 className="text-xl text-white font-medium mb-4">Формирование стратегии</h3>
                <p className="font-sans font-light text-slate-400 text-sm leading-relaxed">
                  Выработка пошагового плана действий (дорожной карты), сбор доказательной базы и согласование с доверителем тактики ведения дела.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="bg-[#0a1023] w-16 h-16 rounded-full border-2 border-[#2a365c] group-hover:border-[#c9a263] text-[#c9a263] flex items-center justify-center font-sans font-medium text-xl mx-auto mb-6 relative z-10 transition-colors">
                3
              </div>
              <div className="text-center px-4">
                <h3 className="text-xl text-white font-medium mb-4">Реализация и защита</h3>
                <p className="font-sans font-light text-slate-400 text-sm leading-relaxed">
                  Активное представительство интересов в судах и на переговорах, реализация выработанной стратегии вплоть до достижения необходимого результата.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 md:px-12 bg-[#c9a263]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x md:divide-[#8a6a3b] text-center">
          <div className="px-4">
            <div className="text-4xl md:text-5xl font-medium text-[#0a1023] mb-2">15+</div>
            <p className="text-xs md:text-sm font-sans font-medium text-[#0a1023] uppercase tracking-wider">Лет практики</p>
          </div>
          <div className="px-4">
            <div className="text-4xl md:text-5xl font-medium text-[#0a1023] mb-2">92%</div>
            <p className="text-xs md:text-sm font-sans font-medium text-[#0a1023] uppercase tracking-wider">Успешных дел</p>
          </div>
          <div className="px-4">
            <div className="text-4xl md:text-5xl font-medium text-[#0a1023] mb-2">5млрд+</div>
            <p className="text-xs md:text-sm font-sans font-medium text-[#0a1023] uppercase tracking-wider">Защищенных активов ₽</p>
          </div>
          <div className="px-4">
            <div className="text-4xl md:text-5xl font-medium text-[#0a1023] mb-2">Топ-15</div>
            <p className="text-xs md:text-sm font-sans font-medium text-[#0a1023] uppercase tracking-wider">Рейтингов Право-300</p>
          </div>
        </div>
      </section>

      {/* Cases */}
      <section id="cases" className="py-24 px-6 md:px-12 bg-[#0d152e] border-t border-[#2a365c]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16 border-b border-[#2a365c] pb-6">
            <h2 className="text-3xl md:text-5xl text-white font-medium">Значимые дела</h2>
            <button className="hidden md:block font-sans uppercase tracking-widest text-xs text-[#c9a263] hover:text-white transition-colors">Все кейсы →</button>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            <div className="group cursor-pointer">
              <div className="font-sans font-medium uppercase tracking-widest text-xs text-slate-500 mb-3 group-hover:text-[#c9a263] transition-colors">Корпоративный конфликт • 2025</div>
              <h3 className="text-2xl text-white font-medium mb-4 leading-snug">Защита мажоритарного акционера производственного холдинга</h3>
              <p className="font-sans font-light text-slate-400 text-sm leading-relaxed mb-6">
                Успешное отражение попыток недружественного поглощения (рейдерского захвата). Суды трех инстанций отказали оппонентам во взыскании убытков на сумму более 5 млрд рублей с доверителя.
              </p>
              <div className="flex gap-4">
                 <div className="font-sans font-light text-xs bg-[#131d3b] text-slate-300 px-3 py-1 border border-[#2a365c]">Арбитражный суд г. Москвы</div>
                 <div className="font-sans font-light text-xs bg-[#131d3b] text-slate-300 px-3 py-1 border border-[#2a365c]">Победа</div>
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="font-sans font-medium uppercase tracking-widest text-xs text-slate-500 mb-3 group-hover:text-[#c9a263] transition-colors">Банкротство • 2024</div>
              <h3 className="text-2xl text-white font-medium mb-4 leading-snug">Защита от субсидиарной ответственности бывших бенефициаров</h3>
              <p className="font-sans font-light text-slate-400 text-sm leading-relaxed mb-6">
                В рамках дела о банкротстве крупного ритейлера нам удалось доказать отсутствие причинно-следственной связи между действиями доверителей и банкротством компании, сохранив их личные активы на сумму 1.2 млрд рублей.
              </p>
              <div className="flex gap-4">
                 <div className="font-sans font-light text-xs bg-[#131d3b] text-slate-300 px-3 py-1 border border-[#2a365c]">Кассация</div>
                 <div className="font-sans font-light text-xs bg-[#131d3b] text-slate-300 px-3 py-1 border border-[#2a365c]">Победа</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 md:px-12 bg-[#0a1023] border-t border-[#2a365c]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl text-white font-medium mb-6">Частые вопросы</h2>
             <div className="w-16 h-0.5 bg-[#c9a263] mx-auto"></div>
          </div>
          <div className="space-y-4">
            {[
              { q: 'Как формируется стоимость услуг?', a: 'Мы работаем по системе фиксированных гонораров (Flat Fee) или по почасовым ставкам (Hourly Rate), в зависимости от специфики проекта. В некоторых делах возможен гонорар успеха (Success Fee).' },
              { q: 'Даете ли вы стопроцентную гарантию выигрыша в суде?', a: 'В соответствии с Кодексом профессиональной этики адвоката, мы не имеем права давать гарантии исхода судебного спора. Однако мы гарантируем профессиональный подход, глубокую экспертизу и максимальную защиту ваших интересов.' },
              { q: 'С какими регионами вы работаете?', a: 'Главный офис находится в Москве, но мы представляем интересы доверителей в арбитражных судах и судах общей юрисдикции по всей территории Российской Федерации.' },
              { q: 'Как обеспечивается конфиденциальность?', a: 'Конфиденциальность защищена законом об адвокатской деятельности. Любые сведения, связанные с оказанием правовой помощи, составляют строгую адвокатскую тайну и не подлежат разглашению.' }
            ].map((faq, i) => (
              <details key={i} className="group bg-[#131d3b] border border-[#2a365c] p-6 lg:p-8 cursor-pointer open:border-[#c9a263] transition-colors rounded-none">
                <summary className="text-white font-medium text-lg marker:content-none flex justify-between items-center outline-none">
                  <span className="pr-8">{faq.q}</span>
                  <span className="text-[#c9a263] text-2xl group-open:rotate-45 transition-transform shrink-0 font-light">+</span>
                </summary>
                <div className="mt-6 font-sans font-light text-slate-400 text-sm leading-relaxed pr-8 border-t border-[#2a365c] pt-6">
                  {faq.a}
                </div>
              </details>
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
            <button className="mt-8 border border-[#c9a263] text-[#c9a263] px-6 py-2 uppercase tracking-widest text-xs hover:bg-[#c9a263] hover:text-[#0a1023] transition-colors font-medium">Оставить заявку</button>
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
