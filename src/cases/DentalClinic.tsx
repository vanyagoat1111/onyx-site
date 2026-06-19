import React from 'react';
import DemoCloseButton from '../components/DemoCloseButton';

export default function DentalClinic() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <DemoCloseButton />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-sky-100 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="text-2xl font-bold text-sky-900 tracking-tight">Dental<span className="text-sky-500">Art</span></div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          <a href="#services" onClick={(e) => scrollTo(e, 'services')} className="hover:text-sky-600 transition-colors">Услуги</a>
          <a href="#doctors" onClick={(e) => scrollTo(e, 'doctors')} className="hover:text-sky-600 transition-colors">Врачи</a>
          <a href="#cases" onClick={(e) => scrollTo(e, 'cases')} className="hover:text-sky-600 transition-colors">До/После</a>
          <a href="#reviews" onClick={(e) => scrollTo(e, 'reviews')} className="hover:text-sky-600 transition-colors">Отзывы</a>
          <a href="#contacts" onClick={(e) => scrollTo(e, 'contacts')} className="hover:text-sky-600 transition-colors">Контакты</a>
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <div className="text-sm font-bold text-slate-800">+7 (495) 123-45-67</div>
            <div className="text-xs text-slate-500">Ежедневно 09:00 - 21:00</div>
          </div>
          <button className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-sky-600/30">
            Записаться
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-20 pb-32 px-6 md:px-12 bg-gradient-to-b from-sky-50 to-white overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <div className="inline-block px-4 py-1.5 bg-sky-100 text-sky-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              Премиальная стоматология в Москве
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Здоровая улыбка <br/>с гарантией <span className="text-sky-600">экспертов</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
              Безболезненное лечение, прецизионная имплантация и цифровая эстетика. Вернем уверенность в вашей улыбке за один визит.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-full text-base font-bold transition-all shadow-lg shadow-sky-600/30">
                Записаться на прием
              </button>
              <button className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-8 py-4 rounded-full text-base font-bold transition-all">
                Прайс-лист
              </button>
            </div>
          </div>
          <div className="relative z-10">
            <div className="aspect-square rounded-full bg-sky-100 absolute -top-12 -right-12 w-full h-full -z-10 blur-3xl opacity-50"></div>
            <div className="relative h-[500px] w-full bg-slate-200 rounded-3xl overflow-hidden shadow-2xl">
              <img src="/case1.1.jpg" alt="Clinic Interior" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Услуги и цены</h2>
            <p className="text-slate-600">Мы предлагаем полный спектр стоматологических услуг.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['Имплантация зубов', 'Эстетическая стоматология', 'Протезирование', 'Ортодонтия', 'Лечение зубов', 'Профессиональная гигиена'].map((service, i) => (
              <div key={i} className="p-8 rounded-2xl bg-sky-50/50 border border-sky-100 hover:border-sky-300 hover:bg-sky-50 transition-all group">
                <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center mb-6 overflow-hidden">
                   <div className="w-6 h-6 bg-sky-600 rounded-full group-hover:scale-110 transition-transform"></div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{service}</h3>
                <p className="text-slate-600 mb-6 text-sm">Комплексный подход и использование передовых материалов для достижения идеального результата.</p>
                <a href="#" onClick={(e) => e.preventDefault()} className="text-sky-600 font-medium text-sm flex items-center gap-2 hover:gap-3 transition-all">
                  Подробнее <span>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section id="doctors" className="py-24 px-6 md:px-12 bg-sky-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Наши специалисты</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Команда врачей высшей категории с международным опытом.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-sky-100 group">
                <div className="aspect-[3/4] bg-slate-200 relative overflow-hidden">
                  <img src={`/case1.${i+2}.jpg`} alt={['Александр Смирнов', 'Елена Вознесенская', 'Виктор Громов'][i]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <h3 className="font-bold text-lg text-slate-800 mb-1">
                    {['Александр Смирнов', 'Елена Вознесенская', 'Виктор Громов'][i]}
                  </h3>
                  <p className="text-sky-600 font-medium text-sm mb-4">
                    {['Стоматолог-хирург, имплантолог', 'Стоматолог-ортодонт', 'Стоматолог-эстетист, ортопед'][i]}
                  </p>
                  <p className="text-slate-500 text-sm mb-4">Опыт работы более 15 лет. Стажировки в Германии и Швейцарии.</p>
                  <button className="w-full py-3 border border-sky-200 text-sky-700 rounded-xl hover:bg-sky-50 transition-colors font-semibold text-sm">
                    Записаться к врачу
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section id="cases" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Истории преображения</h2>
              <p className="text-slate-500 max-w-2xl">Реальные кейсы наших пациентов: от комплекса до уверенной улыбки.</p>
            </div>
            <button className="bg-sky-50 text-sky-700 px-6 py-3 rounded-full font-semibold hover:bg-sky-100 transition-colors">
              Все работы
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-shadow bg-slate-50">
              <div className="flex h-64 relative">
                <div className="w-1/2 bg-slate-300 relative border-r-2 border-white">
                   <div className="absolute top-4 left-4 bg-onyx-950/50 backdrop-blur text-white text-xs px-2 py-1 rounded">До</div>
                </div>
                <div className="w-1/2 bg-sky-100 relative">
                   <div className="absolute top-4 right-4 bg-sky-600 text-white text-xs px-2 py-1 rounded shadow-lg shadow-sky-600/30">После</div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Тотальное протезирование на 4х имплантатах</h3>
                <p className="text-slate-600 text-sm mb-4">Срок лечения: 3 месяца. Установлены циркониевые коронки на систему Nobel Biocare.</p>
                <div className="flex gap-2 flex-wrap">
                   <span className="text-xs bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-600">All-on-4</span>
                   <span className="text-xs bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-600">Цирконий</span>
                </div>
              </div>
            </div>
            <div className="group rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-shadow bg-slate-50">
              <div className="flex h-64 relative">
                <div className="w-1/2 bg-slate-200 relative border-r-2 border-white">
                   <div className="absolute top-4 left-4 bg-onyx-950/50 backdrop-blur text-white text-xs px-2 py-1 rounded">До</div>
                </div>
                <div className="w-1/2 bg-sky-50 relative">
                   <div className="absolute top-4 right-4 bg-sky-600 text-white text-xs px-2 py-1 rounded shadow-lg shadow-sky-600/30">После</div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Виниры E-max для идеальной эстетики</h3>
                <p className="text-slate-600 text-sm mb-4">Срок лечения: 2 недели. Установлено 10 керамических виниров в зоне улыбки.</p>
                <div className="flex gap-2 flex-wrap">
                   <span className="text-xs bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-600">Виниры</span>
                   <span className="text-xs bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-600">Керамика E-max</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-24 px-6 md:px-12 bg-sky-50 border-y border-sky-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">Отзывы пациентов</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="flex text-amber-400 mb-4 text-lg">★★★★★</div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                  "{['Долго искала клинику для имплантации. Здесь все прошло идеально. Врачи настоящие профессионалы своего дела, а сервис на высшем уровне.', 'Ставил виниры у Елены Валерьевны. Результат превзошел все ожидания! Улыбаюсь теперь постоянно и получаю комплименты.', 'Лучшая клиника в Москве! Лечу зубы только здесь. Никакой боли, всегда чисто, красиво и уютно. Рекомендую всем друзьям.'][i]}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-700 font-bold">
                    {['А', 'М', 'Е'][i]}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{['Анна В.', 'Михаил Т.', 'Екатерина С.'][i]}</div>
                    <div className="text-xs text-slate-500">2ГИС</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form CTA */}
      <section className="py-24 px-6 md:px-12 bg-sky-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Получите план лечения сегодня</h2>
          <p className="text-sky-200 mb-10 text-lg">Оставьте заявку на бесплатную консультацию с главным врачом клиники и КТ-снимок в подарок.</p>
          <form className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4">
            <input type="text" placeholder="Ваше имя" className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-sky-200 focus:outline-none focus:border-white focus:bg-white/20 transition-all" />
            <input type="tel" placeholder="Номер телефона" className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-sky-200 focus:outline-none focus:border-white focus:bg-white/20 transition-all" />
            <button type="button" className="bg-white text-sky-900 px-8 py-4 rounded-full font-bold hover:bg-sky-50 transition-colors shadow-xl">Отправить</button>
          </form>
          <p className="text-sky-400/60 text-xs mt-4">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.</p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacts" className="bg-slate-900 py-12 px-6 md:px-12 text-slate-400">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold text-white tracking-tight mb-6">Dental<span className="text-sky-500">Art</span></div>
            <p className="text-sm">Премиальная стоматологическая клиника в центре Москвы.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Услуги</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Имплантация</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Виниры</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Отбеливание</a></li>
            </ul>
          </div>
          <div>
             <h4 className="text-white font-bold mb-4">Клиника</h4>
             <ul className="space-y-2 text-sm">
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Врачи</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Цены</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Отзывы</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm">
              <li>Москва, Пресненская наб., 12</li>
              <li>+7 (495) 123-45-67</li>
              <li>info@dentalart.ru</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-8 border-t border-slate-800 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
          <div>© 2026 DentalArt Clinic. Все права защищены. Лицензия № ЛО-77-01-000000.</div>
          <div className="flex gap-4">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white">Политика конфиденциальности</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white">Договор оферты</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
