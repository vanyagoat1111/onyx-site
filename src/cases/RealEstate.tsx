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
    <div className="min-h-screen bg-[#111111] text-neutral-300 font-sans">
      <DemoCloseButton />
      {/* Header */}
      <header className="absolute top-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center border-b border-white/10">
        <div className="text-2xl font-serif text-white tracking-widest uppercase">
          Vanguard <span className="opacity-50">Estates</span>
        </div>
        <nav className="hidden md:flex gap-8 text-xs uppercase tracking-[0.2em] font-medium text-white/80">
          <a href="#properties" onClick={(e) => scrollTo(e, 'properties')} className="hover:text-white transition-colors">Объекты</a>
          <a href="#developments" onClick={(e) => scrollTo(e, 'developments')} className="hover:text-white transition-colors">Новостройки</a>
          <a href="#agents" onClick={(e) => scrollTo(e, 'agents')} className="hover:text-white transition-colors">Агенты</a>
          <a href="#about" onClick={(e) => scrollTo(e, 'about')} className="hover:text-white transition-colors">О нас</a>
        </nav>
        <button className="text-white border border-white/30 px-6 py-2 hover:bg-white hover:text-onyx-950 transition-colors text-xs uppercase tracking-widest">
          Связаться
        </button>
      </header>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-onyx-950/40 z-10"></div>
          <img src="/case5.1.jpg" alt="Mansion" className="w-full h-full object-cover scale-105" />
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 text-center mt-16">
          <h1 className="text-4xl md:text-7xl font-serif text-white mb-6 tracking-wide drop-shadow-lg">
            Исключительная недвижимость <br/>для искушенных
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-12 font-light tracking-wide">
            Коллекция лучших пентхаусов, вилл и исторических особняков в самых престижных локациях мира.
          </p>

          {/* Search/Filters */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-2 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-2">
            <select className="bg-onyx-950/50 text-white border-none py-4 px-4 focus:outline-none focus:ring-1 focus:ring-white/50 text-sm appearance-none">
              <option>Тип объекта</option>
              <option>Пентхаус</option>
              <option>Вилла</option>
              <option>Апартаменты</option>
            </select>
            <select className="bg-onyx-950/50 text-white border-none py-4 px-4 focus:outline-none focus:ring-1 focus:ring-white/50 text-sm appearance-none">
              <option>Локация</option>
              <option>Москва Сити</option>
              <option>Остоженка</option>
              <option>Рублево-Успенское</option>
            </select>
            <select className="bg-onyx-950/50 text-white border-none py-4 px-4 focus:outline-none focus:ring-1 focus:ring-white/50 text-sm appearance-none">
              <option>Бюджет</option>
              <option>От $1 млн</option>
              <option>От $5 млн</option>
              <option>По запросу</option>
            </select>
            <button className="bg-white text-onyx-950 font-medium uppercase tracking-widest text-xs py-4 px-4 hover:bg-neutral-200 transition-colors">
              Найти объекты
            </button>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section id="properties" className="py-24 px-6 md:px-12 bg-[#111111]">
        <div className="max-w-7xl mx-auto border-t border-white/10 pt-16">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-white tracking-wide">Эксклюзивные предложения</h2>
            <a href="#" onClick={(e) => e.preventDefault()} className="uppercase tracking-[0.2em] text-xs text-white/50 hover:text-white transition-colors border-b border-white/20 pb-1">Посмотреть все</a>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Property 1 */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden mb-6">
                <div className="absolute top-4 left-4 z-10 bg-onyx-950/60 backdrop-blur-md px-3 py-1 text-white text-xs uppercase tracking-widest">
                  New
                </div>
                <img src="/case5.2.jpg" alt="Villa" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-serif text-white mb-2">Вилла на берегу залива</h3>
                  <p className="text-white/50 text-sm font-light">Крестовский остров • 650 м² • 5 спален</p>
                </div>
                <div className="text-right">
                  <div className="text-xl text-white tracking-wide">$ 8,500,000</div>
                </div>
              </div>
            </div>

            {/* Property 2 */}
            <div className="group cursor-pointer md:mt-16">
              <div className="relative aspect-[4/3] overflow-hidden mb-6">
                <img src="/case5.3.jpg" alt="Penthouse" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-serif text-white mb-2">Пентхаус с террасой</h3>
                  <p className="text-white/50 text-sm font-light">Москва Сити • 320 м² • Панорамный вид</p>
                </div>
                <div className="text-right">
                  <div className="text-xl text-white tracking-wide">$ 5,200,000</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developments */}
      <section id="developments" className="py-24 px-6 md:px-12 bg-onyx-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <div className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4">Off-plan проекты</div>
             <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide mb-6">Новостройки</h2>
             <p className="text-white/60 max-w-2xl mx-auto font-light">Эксклюзивный доступ к закрытым продажам клубных домов и элитных жилых комплексов до официального старта продаж.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'The Residence', location: 'Остоженка', status: 'Сдача в 2025', img: '1486406146926-c627a92ad1ab' },
              { title: 'Sky View', location: 'Пресненский район', status: 'Сдача в 2026', img: '1449844908441-8829872d2607' },
              { title: 'Park Lane', location: 'Патриаршие пруды', status: 'Закрытые продажи', img: '1545324418-cc1a3fa10c00' }
            ].map((dev, i) => (
              <div key={i} className="group relative aspect-[3/4] overflow-hidden cursor-pointer">
                <img src={`/case5.${i+4}.jpg`} alt={dev.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx-950 via-onyx-950/20 to-transparent"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/70 mb-2">{dev.location}</div>
                  <h3 className="text-2xl font-serif text-white mb-2">{dev.title}</h3>
                  <div className="text-sm font-light text-white/50 mb-6">{dev.status}</div>
                  <button className="self-start uppercase tracking-widest text-xs border border-white/30 px-6 py-2 hover:bg-white hover:text-onyx-950 transition-colors">
                    Детали проекта
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents */}
      <section id="agents" className="py-24 px-6 md:px-12 bg-[#111111] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide">Ваши персональные<br/>брокеры</h2>
            <p className="text-white/60 max-w-sm font-light">Доверьте поиск и оформление недвижимости экспертам с безупречной репутацией.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
               { name: 'Михаил Воронцов', img: '1507003211169-0a1dd7228f2d', role: 'Управляющий партнер' },
               { name: 'Анна Демидова', img: '1573497019940-1ab532b21eece', role: 'Эксперт по новостройкам' },
               { name: 'Константин Лисов', img: '1500648767791-00dcc994a43e', role: 'Брокер, Загородная недвижимость' },
               { name: 'Елизавета Райт', img: '1580489944761-15a19d654956', role: 'VIP-клиенты' }
            ].map((agent, i) => (
              <div key={i} className="text-center group cursor-pointer">
                <div className="relative aspect-[3/4] mb-6 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img src={`/case5.${i+7}.jpg`} alt={agent.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-serif text-white mb-1">{agent.name}</h3>
                <p className="text-xs uppercase tracking-widest text-white/50">{agent.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About & Footer */}
      <footer id="about" className="pt-24 pb-12 px-6 md:px-12 bg-onyx-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 mb-16">
          <div>
            <div className="text-3xl font-serif text-white tracking-widest uppercase mb-8">
              Vanguard <span className="opacity-50">Estates</span>
            </div>
            <p className="text-white/60 font-light leading-relaxed max-w-md mb-8">
              Vanguard Estates — это бутик элитной недвижимости, где конфиденциальность и индивидуальный подход стоят на первом месте. Мы находим уникальные объекты для тех, кто не согласен на компромиссы.
            </p>
            <div className="grid grid-cols-2 gap-8 text-white/80">
              <div>
                <div className="text-3xl font-serif text-white mb-2">15+</div>
                <div className="text-xs uppercase tracking-widest text-white/50">Лет опыта</div>
              </div>
              <div>
                <div className="text-3xl font-serif text-white mb-2">$2B+</div>
                <div className="text-xs uppercase tracking-widest text-white/50">Объем сделок</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-white uppercase tracking-widest text-xs mb-6">Офис</h4>
              <p className="text-white/60 font-light text-sm mb-4">г. Москва, Пресненская наб., 12</p>
              <p className="text-white/60 font-light text-sm mb-4">+7 (495) 999-00-00</p>
              <p className="text-white/60 font-light text-sm">concierge@vanguard-estates.ru</p>
            </div>
            <div>
              <h4 className="text-white uppercase tracking-widest text-xs mb-6">Навигация</h4>
              <ul className="space-y-4 font-light text-sm text-white/60">
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Все объекты</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Аналитика рынка</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Оценить объект</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Карьера</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/30 uppercase tracking-widest gap-4">
          <div>© 2026 Vanguard Estates. Все права защищены.</div>
          <div className="flex gap-8">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Конфиденциальность</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Условия использования</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
