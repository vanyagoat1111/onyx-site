import React from 'react';
import DemoCloseButton from '../components/DemoCloseButton';

export default function Logistics() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <DemoCloseButton />
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="bg-slate-900 text-slate-300 py-2 border-b border-yellow-500 text-xs text-center md:text-left px-6 md:px-12 flex justify-between">
          <div className="hidden md:block">Международные и внутренние грузоперевозки для бизнеса</div>
          <div className="flex gap-4 mx-auto md:mx-0">
             <a href="mailto:info@logex.ru" className="hover:text-white transition-colors">info@logex.ru</a>
             <span>8 (800) 200-00-00</span>
          </div>
        </div>
        <div className="py-5 px-6 md:px-12 flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="text-yellow-500 text-4xl leading-none">/</span>LOG<span className="text-slate-500">EX</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-semibold text-slate-700">
            <a href="#services" onClick={(e) => scrollTo(e, 'services')} className="hover:text-yellow-600 transition-colors">Услуги</a>
            <a href="#fleet" onClick={(e) => scrollTo(e, 'fleet')} className="hover:text-yellow-600 transition-colors">Автопарк</a>
            <a href="#geography" onClick={(e) => scrollTo(e, 'geography')} className="hover:text-yellow-600 transition-colors">География</a>
            <a href="#cases" onClick={(e) => scrollTo(e, 'cases')} className="hover:text-yellow-600 transition-colors">Кейсы</a>
          </nav>
          <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded text-sm font-semibold transition-all">
            Расчет стоимости
          </button>
        </div>
      </header>

      {/* Hero with Calculator */}
      <section className="relative bg-slate-900 text-white pb-24 pt-16">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="/case3.1.jpg" alt="Logistics hero" className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto w-full pt-32 pb-24">
          <div className="max-w-3xl flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-600 px-3 py-1 text-sm font-semibold w-fit border border-yellow-500/30">
               <div className="w-2 h-2 rounded-full bg-red-600"></div>
               Надёжная логистика по всей России
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-2">
              Доставка грузов<br/>
              <span className="text-red-600">точно в срок</span>
            </h1>
            <p className="text-lg text-slate-700 max-w-xl mb-4 leading-relaxed">
              Собственный автопарк из 150 еврофур, современные кросс-доки и полная материальная ответственность. Ваш груз – наша забота.
            </p>
            
            <div className="bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-neutral-100 flex flex-col md:flex-row gap-4 mt-4 relative z-30">
               <div className="flex-1 flex flex-col gap-2">
                 <label className="text-xs text-neutral-500 uppercase font-bold tracking-wider">Откуда</label>
                 <input type="text" placeholder="Москва" className="pb-2 border-b-2 border-neutral-200 bg-transparent text-lg focus:outline-none focus:border-red-600 transition-colors" />
               </div>
               <div className="flex-1 flex flex-col gap-2">
                 <label className="text-xs text-neutral-500 uppercase font-bold tracking-wider">Куда</label>
                 <input type="text" placeholder="Владивосток" className="pb-2 border-b-2 border-neutral-200 bg-transparent text-lg focus:outline-none focus:border-red-600 transition-colors" />
               </div>
               <div className="flex-1 flex flex-col justify-end">
                 <button className="bg-red-600 hover:bg-yellow-500 text-white font-bold py-3 px-6 transition-colors shadow-lg shadow-red-600/30 w-full">
                   Рассчитать
                 </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <div className="w-12 h-1 bg-yellow-500 mb-6"></div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Наши услуги</h2>
            <p className="text-slate-600 max-w-2xl text-lg">
              Закрываем все потребности в логистике: от сборных отправок малогабаритных грузов до сложных проектных перевозок негабарита.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'FTL (Генеральные грузы)', desc: 'Выделенный транспорт от 1 до 20 тонн под нужды одного клиента.' },
              { title: 'LTL (Сборные грузы)', desc: 'Экономичная доставка грузов от 1 кг в одном транспортном средстве с другими заказами.' },
              { title: 'Негабаритные перевозки', desc: 'Спецтехника для транспортировки сложного, тяжеловесного и негабаритного оборудования.' }
            ].map((s, i) => (
              <div key={i} className="bg-white p-8 border border-slate-200 rounded group hover:border-yellow-500 transition-colors shadow-sm">
                <div className="w-10 h-1 bg-yellow-500 mb-6"></div>
                <h3 className="text-xl font-bold mb-4">{s.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{s.desc}</p>
                <a href="#" onClick={(e) => e.preventDefault()} className="font-semibold text-slate-900 group-hover:text-yellow-600 flex items-center gap-2">Подробнее <span>→</span></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section id="fleet" className="py-24 bg-white px-6 md:px-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Собственный автопарк</h2>
              <p className="text-slate-600 max-w-xl">Более 150 единиц надежной техники экологического класса Евро-5 и Евро-6, оснащенных GPS/ГЛОНАСС мониторингом.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { type: 'Тентованные фуры', payload: 'до 20 тонн', volume: '82-120 м³', img: '1519003722824-194d4455a60c' },
              { type: 'Рефрижераторы', payload: 'до 20 тонн', volume: '82 м³', img: '1581092523996-559196c805eb' },
              { type: 'Малотоннажный транспорт', payload: 'от 1.5 до 5 тонн', volume: '10-36 м³', img: '1605810103233-a3b0fa4e995a' },
              { type: 'Низкорамные тралы', payload: 'до 60 тонн', volume: 'Негабарит', img: '1592838064575-9610534c0e64' }
            ].map((truck, i) => (
              <div key={i} className="border border-slate-200 rounded overflow-hidden group hover:border-yellow-500 transition-colors bg-slate-50 relative">
                <div className="h-48 overflow-hidden relative">
                  <img src={`/case3.${i+2}.jpg`} alt={truck.type} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-slate-900 mb-4">{truck.type}</h3>
                  <div className="flex justify-between items-center text-sm border-b border-slate-200 pb-2 mb-2">
                    <span className="text-slate-500">Грузоподъемность</span>
                    <span className="font-semibold text-slate-900">{truck.payload}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-1">
                    <span className="text-slate-500">Объем</span>
                    <span className="font-semibold text-slate-900">{truck.volume}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Geo */}
      <section id="geo" className="py-24 bg-slate-900 text-white px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#eab308 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">География перевозок</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Мы осуществляем регулярные рейсы по всей территории Российской Федерации, а также в страны СНГ и дальнего зарубежья. Наши терминалы расположены в ключевых логистических узлах.
            </p>
            <ul className="space-y-4 font-semibold">
              <li className="flex items-center gap-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                Внутрироссийские перевозки (все регионы)
              </li>
              <li className="flex items-center gap-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                Страны ТС (Беларусь, Казахстан, Армения, Киргизия)
              </li>
              <li className="flex items-center gap-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                Международные маршруты (Турция, Китай, страны ЕС)
              </li>
            </ul>
          </div>
          <div className="bg-slate-800 p-8 border border-slate-700 rounded relative">
            <div className="text-sm text-slate-400 mb-6 uppercase tracking-wider font-semibold">Наши терминалы</div>
            <div className="grid grid-cols-2 gap-4 text-lg font-bold text-yellow-500">
               <div>Москва</div>
               <div>Новосибирск</div>
               <div>Санкт-Петербург</div>
               <div>Екатеринбург</div>
               <div>Казань</div>
               <div>Владивосток</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cases */}
      <section id="cases" className="py-24 bg-slate-50 px-6 md:px-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Реализованные проекты</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Успешные кейсы решения нестандартных логистических задач для наших партнеров.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 border border-slate-200 rounded shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-50/50 rounded-bl-full -z-0 transition-transform group-hover:scale-150"></div>
               <div className="relative z-10">
                 <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Негабаритный груз</div>
                 <h3 className="text-xl font-bold mb-4">Перевозка промышленного оборудования для завода</h3>
                 <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                   Маршрут: Санкт-Петербург - Новосибирск (3 900 км). Транспортировка производственной линии весом 45 тонн одним автопоездом с оформлением всех спецразрешений и машинами прикрытия. Доставлено за 9 дней.
                 </p>
                 <div className="text-sm font-semibold text-slate-900 border-l-2 border-yellow-500 pl-4 py-1">
                   Клиент: Крупный машиностроительный холдинг
                 </div>
               </div>
            </div>
            <div className="bg-white p-8 border border-slate-200 rounded shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-50/50 rounded-bl-full -z-0 transition-transform group-hover:scale-150"></div>
               <div className="relative z-10">
                 <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Мультимодальные перевозки</div>
                 <h3 className="text-xl font-bold mb-4">Комплексная поставка электроники из Китая</h3>
                 <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                   Организация бесперебойной цепочки поставок: ЖД транспорт до терминала в РФ + таможенная очистка + LTL доставка до 15 региональных складов клиента "от двери до двери". Строгое соблюдение температурного режима.
                 </p>
                 <div className="text-sm font-semibold text-slate-900 border-l-2 border-yellow-500 pl-4 py-1">
                   Клиент: Федеральная сеть ритейла
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 md:px-12">
         <div className="max-w-7xl mx-auto border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
           <div className="font-semibold text-white tracking-tight flex items-center gap-1">
            <span className="text-yellow-500">/</span>LOGEX © 2026
           </div>
           <div>Профессиональные B2B логистические решения</div>
         </div>
      </footer>
    </div>
  );
}
