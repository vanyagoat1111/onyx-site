import React from 'react';
import DemoCloseButton from '../components/DemoCloseButton';

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
      <DemoCloseButton />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a1023]/95 backdrop-blur border-b border-[#2a365c] py-5 px-6 md:px-12 flex justify-between items-center">
        <div className="text-xl md:text-2xl font-bold tracking-widest text-[#c9a263] uppercase">
          Egorov <span className="text-white font-light">& Partners</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-sans tracking-wider text-slate-300 uppercase">
          <a href="#practice" onClick={(e) => scrollTo(e, 'practice')} className="hover:text-[#c9a263] transition-colors">Практики</a>
          <a href="#team" onClick={(e) => scrollTo(e, 'team')} className="hover:text-[#c9a263] transition-colors">Команда</a>
          <a href="#cases" onClick={(e) => scrollTo(e, 'cases')} className="hover:text-[#c9a263] transition-colors">Дела</a>
          <a href="#contacts" onClick={(e) => scrollTo(e, 'contacts')} className="hover:text-[#c9a263] transition-colors">Контакты</a>
        </nav>
        <button className="hidden md:block bg-[#c9a263] text-[#0a1023] px-6 py-2 font-sans font-bold uppercase tracking-wider text-xs transition-colors hover:bg-[#b08b53]">
          Консультация
        </button>
      </header>

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center pt-20 px-6 md:px-12 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(to right, #0a1023 60%, transparent), url(""/case4.1.jpg")' }}>
        <div className="max-w-7xl mx-auto w-full">
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
      {/* Team */}
      <section id="team" className="py-24 px-6 md:px-12 bg-[#0a1023] border-t border-[#2a365c]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-white">
            <div>
              <h2 className="text-3xl md:text-5xl font-medium mb-6">Партнеры бюро</h2>
              <div className="w-16 h-0.5 bg-[#c9a263]"></div>
            </div>
            <p className="max-w-md font-sans font-light text-slate-300 leading-relaxed">
              Ключевые эксперты с многолетним опытом работы в ведущих консалтинговых компаниях (Big4/Ильф) и глубокой экспертизой в своих отраслях.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group flex flex-col sm:flex-row gap-6 bg-[#131d3b] border border-[#2a365c] p-6 hover:border-[#c9a263] transition-colors">
               <div className="w-full sm:w-48 h-64 sm:h-auto bg-[#0a1023] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img src="/case4.2.jpg" alt="Партнер" className="w-full h-full object-cover" />
               </div>
               <div className="flex-1 flex flex-col justify-center">
                  <div className="text-[#c9a263] font-sans font-medium uppercase tracking-widest text-xs mb-2">Управляющий партнер</div>
                  <h3 className="text-2xl text-white font-medium mb-4">Алексей Егоров</h3>
                  <p className="font-sans font-light text-sm text-slate-400 mb-6 leading-relaxed">
                    Специализируется на сопровождении M&A сделок, корпоративных конфликтах и защите активов. Включен в рейтинг Chambers Europe и Best Lawyers.
                  </p>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-[#c9a263] hover:text-white font-sans uppercase tracking-widest text-xs transition-colors flex items-center gap-2">Подробнее <span>→</span></a>
               </div>
            </div>
            
            <div className="group flex flex-col sm:flex-row gap-6 bg-[#131d3b] border border-[#2a365c] p-6 hover:border-[#c9a263] transition-colors">
               <div className="w-full sm:w-48 h-64 sm:h-auto bg-[#0a1023] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img src="/case4.3.jpg" alt="Партнер" className="w-full h-full object-cover" />
               </div>
               <div className="flex-1 flex flex-col justify-center">
                  <div className="text-[#c9a263] font-sans font-medium uppercase tracking-widest text-xs mb-2">Старший партнер</div>
                  <h3 className="text-2xl text-white font-medium mb-4">Мария Соколова</h3>
                  <p className="font-sans font-light text-sm text-slate-400 mb-6 leading-relaxed">
                    Руководитель судебно-арбитражной практики и практики банкротства. Опыт представления интересов клиентов в Верховном Суде РФ.
                  </p>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-[#c9a263] hover:text-white font-sans uppercase tracking-widest text-xs transition-colors flex items-center gap-2">Подробнее <span>→</span></a>
               </div>
            </div>
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
