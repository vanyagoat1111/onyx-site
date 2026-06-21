import React from 'react';
import DemoCloseButton from '../components/DemoCloseButton';

export default function RealEstate() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-neutral-300 font-sans selection:bg-white/20 selection:text-white">
      <DemoCloseButton />
      {/* Header */}
      <header className="absolute top-0 w-full z-50 px-6 md:px-12 py-8 flex justify-between items-center border-b border-white/5">
        <div className="text-2xl font-cormorant text-white tracking-[0.2em] uppercase">
          Vanguard <span className="opacity-50">Estates</span>
        </div>
        <nav className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.2em] font-medium text-white/70">
          <a href="#philosophy" onClick={(e) => scrollTo(e, 'philosophy')} className="hover:text-white transition-colors">Философия</a>
          <a href="#properties" onClick={(e) => scrollTo(e, 'properties')} className="hover:text-white transition-colors">Объекты</a>
          <a href="#services" onClick={(e) => scrollTo(e, 'services')} className="hover:text-white transition-colors">Услуги</a>
          <a href="#analytics" onClick={(e) => scrollTo(e, 'analytics')} className="hover:text-white transition-colors">Аналитика</a>
          <a href="#trust" onClick={(e) => scrollTo(e, 'trust')} className="hover:text-white transition-colors">Доверие</a>
        </nav>
        <button className="text-white border border-white/20 px-8 py-3 hover:bg-white hover:text-black transition-colors text-[10px] uppercase tracking-[0.2em]">
          Связаться
        </button>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen md:h-[90vh] md:min-h-[700px] flex items-center justify-center pt-32 pb-16">
        <div className="absolute inset-0 z-0">
          <img src="/case5.1.jpg" alt="Mansion" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          {/* Smooth gradient transition to dark background */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#0a0a0a] z-10"></div>
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center mt-12">
          <div className="text-[10px] text-[#c9a263] uppercase tracking-[0.4em] mb-10 font-bold">Бутик элитной недвижимости</div>
          <h1 className="text-[46px] md:text-8xl lg:text-[100px] font-cormorant text-white mb-10 tracking-wide drop-shadow-2xl text-center leading-tight md:leading-[1.05]">
            Исключительная <br className="hidden md:block" /> <i className="font-light text-white/90">недвижимость</i> <br className="hidden md:block" /> для искушенных
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-16 md:mb-20 font-light tracking-wide text-center leading-relaxed">
            Коллекция лучших пентхаусов, вилл и исторических особняков в самых престижных локациях мира. Искусство жить стильно.
          </p>

          {/* Search/Filters */}
          <div className="bg-[#111]/80 backdrop-blur-2xl border border-white/10 p-3 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-3 w-full shadow-2xl">
            <select className="bg-transparent text-white border border-white/5 py-4 px-6 focus:outline-none focus:border-white/20 text-sm appearance-none cursor-pointer [&>option]:bg-[#111]">
              <option value="" disabled selected hidden>Тип объекта</option>
              <option value="penthouse">Пентхаус</option>
              <option value="villa">Вилла</option>
              <option value="mansion">Особняк</option>
            </select>
            <select className="bg-transparent text-white border-x md:border-y-0 border-y border-white/5 py-4 px-6 focus:outline-none focus:border-white/20 text-sm appearance-none cursor-pointer [&>option]:bg-[#111]">
              <option value="" disabled selected hidden>Локация</option>
              <option value="ost">Остоженка</option>
              <option value="patr">Патриаршие пруды</option>
              <option value="rubl">Рублево-Успенское</option>
            </select>
            <select className="bg-transparent text-white border-b md:border-b-0 md:border-r border-white/5 py-4 px-6 focus:outline-none focus:border-white/20 text-sm appearance-none cursor-pointer [&>option]:bg-[#111]">
              <option value="" disabled selected hidden>Бюджет</option>
              <option value="3m">От $3 млн</option>
              <option value="10m">От $10 млн</option>
              <option value="custom">По запросу</option>
            </select>
            <button className="bg-white text-black font-semibold uppercase tracking-[0.2em] text-[10px] py-4 px-4 hover:bg-gray-200 transition-colors">
              Поиск объектов
            </button>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section id="properties" className="pt-12 pb-32 md:pt-20 md:pb-32 px-6 md:px-12 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
               <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Коллекция</div>
               <h2 className="text-4xl md:text-5xl font-cormorant text-white tracking-wide">Эксклюзивные предложения</h2>
            </div>
            <a href="#" onClick={(e) => e.preventDefault()} className="uppercase tracking-[0.2em] text-[10px] text-white/50 border border-white/20 px-8 py-3 hover:bg-white hover:text-black transition-colors">
              Посмотреть все объекты
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Property 1 */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden mb-8">
                <div className="absolute top-6 left-6 z-10 bg-black/60 backdrop-blur-md px-4 py-2 text-white text-[10px] uppercase tracking-widest border border-white/10">
                  Новое предложение
                </div>
                <img src="/building1.jpg" alt="Penthouse" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
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
            </div>

            {/* Property 2 */}
            <div className="group cursor-pointer md:mt-24">
              <div className="relative aspect-[4/3] overflow-hidden mb-8">
                <img src="/building2.jpg" alt="Villa" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
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
            </div>
          </div>
        </div>
      </section>

      {/* Services/Expertise */}
      <section id="services" className="py-32 px-6 md:px-12 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
             <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Наши компетенции</div>
             <h2 className="text-4xl md:text-5xl font-cormorant text-white tracking-wide">Безупречный сервис <br/>на каждом этапе</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-y-16 gap-x-12">
             {[
               { num: '01', title: 'Off-Market Сделки', desc: 'Доступ к закрытой базе премиальных объектов, которые не публикуются на открытом рынке для сохранения приватности владельцев.' },
               { num: '02', title: 'Инвестиционный брокеридж', desc: 'Анализ рынка, подбор ликвидных активов с высокой доходностью и структурирование инвестиционных портфелей.' },
               { num: '03', title: 'Юридическое сопровождение', desc: 'Полный Due Diligence объектов, безопасные расчеты и оформление сделок с участием ведущих юристов.' },
               { num: '04', title: 'Продажа вашей недвижимости', desc: 'Создание премиальных маркетинговых материалов и таргетированный поиск покупателей.' },
               { num: '05', title: 'Relocation & Lifestyle', desc: 'Организация переездов, подбор персонала и консьерж-сопровождение для вас и вашей семьи.' },
               { num: '06', title: 'Архитектура и дизайн', desc: 'Рекомендации лучших архитектурных бюро и дизайнеров интерьера для создания дома вашей мечты.' },
             ].map((svc, i) => (
                <div key={i} className="group border-t border-white/10 pt-8 hover:border-white/30 transition-colors">
                  <div className="text-white/20 font-cormorant text-4xl mb-6">{svc.num}</div>
                  <h3 className="text-xl text-white mb-4 tracking-wide">{svc.title}</h3>
                  <p className="text-white/50 text-sm font-light leading-relaxed">{svc.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Analytics */}
      <section id="analytics" className="py-32 px-6 md:px-12 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div>
               <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Рыночная экспертиза</div>
               <h2 className="text-4xl md:text-5xl font-cormorant text-white tracking-wide">Цифры, которым <br/>можно доверять</h2>
            </div>
            <p className="text-white/50 max-w-sm font-light text-sm">Мы опираемся на глубокую аналитику и закрытые данные сделок для формирования справедливой оценки и прогнозирования инвестиционной привлекательности.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-white/10 py-16">
             <div className="text-center">
                <div className="text-5xl font-cormorant text-white mb-4">12<span className="text-white/40">%</span></div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">Средняя доходность</div>
             </div>
             <div className="text-center md:border-l border-white/10">
                <div className="text-5xl font-cormorant text-white mb-4">$2.5<span className="text-white/40">B</span></div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">Объем сделок</div>
             </div>
             <div className="text-center md:border-l border-white/10">
                <div className="text-5xl font-cormorant text-white mb-4">400<span className="text-white/40">+</span></div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">Активных клиентов</div>
             </div>
             <div className="text-center md:border-l border-white/10">
                <div className="text-5xl font-cormorant text-white mb-4">15<span className="text-white/40">y</span></div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">Опыта на рынке</div>
             </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section id="trust" className="py-32 px-6 md:px-12 bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
          <div className="md:w-1/2">
             <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Принципы</div>
             <h2 className="text-4xl md:text-5xl font-cormorant text-white tracking-wide mb-8">Безопасность и<br/>конфиденциальность</h2>
             <p className="text-white/60 font-light leading-relaxed mb-8">Мы понимаем, что в сделках с премиальной недвижимостью публичность не всегда уместна. Наши стандарты защиты информации соответствуют швейцарскому банковскому уровню.</p>
             <ul className="space-y-4">
                <li className="flex items-start gap-4">
                   <div className="w-1.5 h-1.5 bg-white/40 rounded-full mt-2 shrink-0"></div>
                   <p className="text-white/80 font-light text-sm">Полная анонимность клиента на всех этапах переговоров.</p>
                </li>
                <li className="flex items-start gap-4">
                   <div className="w-1.5 h-1.5 bg-white/40 rounded-full mt-2 shrink-0"></div>
                   <p className="text-white/80 font-light text-sm">Подписание NDA перед началом любого сотрудничества.</p>
                </li>
                <li className="flex items-start gap-4">
                   <div className="w-1.5 h-1.5 bg-white/40 rounded-full mt-2 shrink-0"></div>
                   <p className="text-white/80 font-light text-sm">Сопровождение сделки доверенными юристами и Family Офисами.</p>
                </li>
             </ul>
          </div>
          <div className="md:w-1/2 bg-[#111] p-12 border border-white/5">
             <div className="text-2xl font-cormorant text-white mb-6">«Идеальная сделка — это та, о которой не пишут в газетах, но которая приносит максимальную выгоду ее участникам.»</div>
             <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">— Управляющий комитет Vanguard</div>
          </div>
        </div>
      </section>

      {/* CTA / Big Form */}
      <section className="py-32 px-6 md:px-12 bg-[#080808] border-t border-white/5 pb-0">
         <div className="max-w-5xl mx-auto bg-[#111] p-12 md:p-20 relative overflow-hidden">
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
                     <button type="button" className="w-full border border-white/30 text-white py-5 hover:bg-white hover:text-black transition-colors text-[10px] uppercase tracking-[0.2em]">
                        Отправить запрос
                     </button>
                  </div>
               </form>
            </div>
         </div>
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
