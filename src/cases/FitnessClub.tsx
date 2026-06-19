import React from 'react';
import DemoCloseButton from '../components/DemoCloseButton';

export default function FitnessClub() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-red-500 selection:text-white">
      <DemoCloseButton />
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-red-900/30 py-4 px-6 md:px-12 flex justify-between items-center transition-all">
        <div className="text-3xl font-black italic tracking-tight uppercase text-white">
          IRON<span className="text-red-600">CORE</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-neutral-400">
          <a href="#rates" onClick={(e) => scrollTo(e, 'rates')} className="hover:text-red-500 transition-colors">Абонементы</a>
          <a href="#trainers" onClick={(e) => scrollTo(e, 'trainers')} className="hover:text-red-500 transition-colors">Тренеры</a>
          <a href="#schedule" onClick={(e) => scrollTo(e, 'schedule')} className="hover:text-red-500 transition-colors">Расписание</a>
          <a href="#contacts" onClick={(e) => scrollTo(e, 'contacts')} className="hover:text-red-500 transition-colors">Контакты</a>
        </nav>
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 font-bold uppercase tracking-wider text-xs transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] skew-x-[-10deg]">
          <div className="skew-x-[10deg]">Стать резидентом</div>
        </button>
      </header>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center pt-24 px-6 md:px-12 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10"></div>
          <img src="/case2.1.jpg" alt="Gym Background" className="w-full h-full object-cover object-center grayscale contrast-125" />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-500/30 text-red-500 px-4 py-2 uppercase tracking-widest text-xs font-bold w-fit">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Новый уровень
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white uppercase leading-none tracking-tight">
              Не предел,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">а старт</span>
            </h1>
            <p className="text-neutral-400 text-lg max-w-md">
              Премиальное фитнес-пространство для тех, кто не ищет оправданий. 2000 м² инновационного оборудования и атмосфера, заряженная на результат.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button className="bg-red-600 hover:bg-white hover:text-onyx-950 text-white px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors border border-red-600 hover:border-white shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                Стать резидентом
              </button>
              <button className="bg-transparent border border-neutral-700 hover:border-white text-white px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors">
                Расписание
              </button>
            </div>
          </div>

          {/* Video Placeholder/Stat block */}
          <div className="hidden lg:grid grid-cols-2 gap-4 mt-auto mb-12">
            <div className="bg-neutral-900 border-b-2 border-red-600 p-6 flex flex-col gap-2">
              <div className="text-4xl font-bold text-white">24/7</div>
              <div className="text-xs text-neutral-500 uppercase tracking-widest">Режим работы</div>
            </div>
            <div className="bg-neutral-900 border-b-2 border-orange-500 p-6 flex flex-col gap-2">
              <div className="text-4xl font-bold text-white">2000м²</div>
              <div className="text-xs text-neutral-500 uppercase tracking-widest">Площадь клуба</div>
            </div>
            <div className="bg-neutral-900 border-b-2 border-neutral-700 p-6 flex flex-col gap-2">
              <div className="text-4xl font-bold text-white">12</div>
              <div className="text-xs text-neutral-500 uppercase tracking-widest">Зон тренинга</div>
            </div>
            <div className="bg-neutral-900 border-b-2 border-neutral-700 p-6 flex flex-col gap-2">
              <div className="text-4xl font-bold text-white">SPA</div>
              <div className="text-xs text-neutral-500 uppercase tracking-widest">Комплекс</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div>
              <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-2">Клубные карты</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white uppercase">Тарифы</h3>
            </div>
            <button className="text-sm font-bold text-white border-b border-red-500 pb-1 hover:text-red-500 transition-colors uppercase tracking-widest">
              Сравнить опции
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { name: 'Утро', price: '45 000', period: 'год', features: ['Доступ: 07:00 - 16:00', 'Тренажерный зал', 'Бассейн и SPA (утром)', '1 вводная тренировка'] },
              { name: 'Безлимит', price: '75 000', period: 'год', features: ['Круглосуточный доступ 24/7', 'Тренажерный зал', 'Бассейн и SPA без ограничений', 'Групповые программы', 'Гостевые визиты: 5 шт', 'Заморозка: 45 дней'], popular: true },
              { name: 'VIP', price: '120 000', period: 'год', features: ['Доступ 24/7 + VIP раздевалка', 'Индивидуальный шкафчик', 'Ежедневная стирка формы', '12 персональных тренировок', 'Массаж: 5 сеансов', 'Заморозка: 90 дней'] }
            ].map((plan, i) => (
              <div key={i} className={`relative p-8 border ${plan.popular ? 'border-red-500 bg-red-950/10' : 'border-neutral-800 bg-neutral-900/50'} flex flex-col group hover:border-red-500 transition-colors`}>
                {plan.popular && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 bg-red-600 text-white font-bold text-[10px] uppercase tracking-widest px-3 py-1">
                    Хит продаж
                  </div>
                )}
                <h3 className="text-2xl font-black uppercase tracking-wider mb-2">{plan.name}</h3>
                <div className="flex items-end gap-2 mb-8 pb-8 border-b border-neutral-800 group-hover:border-red-900/50 transition-colors">
                  <span className="text-4xl font-bold">{plan.price}₽</span>
                  <span className="text-neutral-500 mb-1">/ {plan.period}</span>
                </div>
                <ul className="space-y-4 mb-12 flex-grow">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-neutral-300 text-sm">
                      <div className="w-1.5 h-1.5 bg-red-500 rotate-45"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 font-bold uppercase tracking-wider text-sm transition-all skew-x-[-10deg] ${plan.popular ? 'bg-red-600 hover:bg-red-500 shadow-[0_0_20px_rgba(220,38,38,0.3)]' : 'bg-neutral-800 hover:bg-neutral-700'}`}>
                   <div className="skew-x-[10deg]">Оформить карту</div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers */}
      <section id="trainers" className="py-32 px-6 md:px-12 bg-neutral-900 border-t border-red-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">Тренерский состав</h2>
            <p className="text-neutral-400 max-w-xl mx-auto">Профессионалы международного уровня. Чемпионы России и Европы по бодибилдингу, кроссфиту и пауэрлифтингу.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="group relative overflow-hidden bg-neutral-800 aspect-[3/4] cursor-pointer">
                <img src={`/case2.${i+2}.jpg`} alt="Trainer" className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx-950 via-onyx-950/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform">
                  <div className="text-red-500 font-bold text-xs uppercase tracking-widest mb-2">
                    {['Кроссфит', 'Силовой тренинг', 'Боевые искусства', 'Функциональный тренинг'][i]}
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-wider mb-2">
                    {['Алексей С.', 'Марина В.', 'Дмитрий К.', 'Елена Р.'][i]}
                  </h3>
                  <p className="text-sm text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    Стаж работы: {['10', '8', '12', '7'][i]} лет. 
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="py-32 px-6 md:px-12 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">Расписание</h2>
            <div className="flex gap-2 p-1 bg-neutral-900 border border-neutral-800 rounded-sm">
              <button className="px-6 py-2 bg-red-600 text-white font-bold uppercase tracking-widest text-xs">Сегодня</button>
              <button className="px-6 py-2 bg-transparent hover:bg-neutral-800 text-neutral-400 font-bold uppercase tracking-widest text-xs transition-colors">Завтра</button>
              <button className="px-6 py-2 bg-transparent hover:bg-neutral-800 text-neutral-400 font-bold uppercase tracking-widest text-xs transition-colors">Неделя</button>
            </div>
          </div>
          
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center justify-between p-6 bg-neutral-900/50 border border-neutral-800 hover:border-red-500/50 hover:bg-neutral-900 transition-colors group">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full md:w-auto text-center md:text-left mb-4 md:mb-0">
                  <div className="text-3xl font-black text-red-500 w-32">{['08:00', '10:30', '14:00', '18:30', '20:00'][i]}</div>
                  <div>
                    <h4 className="text-xl font-bold uppercase tracking-wider">{['CrossFit WOD', 'Йога', 'Boxing', 'TRX Pro', 'Stretching'][i]}</h4>
                    <p className="text-neutral-500 text-sm mt-1">{['Зал Кроссфит', 'Зал Групповых программ', 'Ринг', 'Зал Функционала', 'Зал Групповых программ'][i]}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-right hidden md:block">
                    <div className="text-sm font-bold uppercase tracking-widest text-neutral-300">{['Алексей С.', 'Елена Р.', 'Дмитрий К.', 'Марина В.', 'Елена Р.'][i]}</div>
                    <div className="text-xs text-neutral-500 mt-1">Тренер</div>
                  </div>
                  <button className="w-full md:w-auto px-8 py-3 border border-red-600 text-red-500 hover:bg-red-600 hover:text-white font-bold uppercase tracking-widest text-xs transition-colors skew-x-[-10deg]">
                    <div className="skew-x-[10deg]">Записаться</div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / CTA form */}
      <section id="contacts" className="py-24 px-6 md:px-12 bg-neutral-900 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-8">Запишись на первую тренировку</h2>
          <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
             <input type="tel" placeholder="+7 (___) ___-__-__" className="flex-1 bg-[#0a0a0a] border border-neutral-800 px-6 py-4 text-white focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 transition-all font-mono" />
             <button type="button" className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 font-black uppercase tracking-wider text-sm transition-all skew-x-[-10deg]">
                <div className="skew-x-[10deg]">Жду звонка</div>
             </button>
          </form>
        </div>
      </section>
    </div>
  );
}
