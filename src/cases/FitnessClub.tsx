import React from 'react';
const case2_1 = "/demo-main-2.jpg";

export default function FitnessClub() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white font-sport selection:bg-red-500 selection:text-white overflow-hidden">

      {/* Header */}
      <header className="sticky top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-red-900/30 py-4 px-6 md:px-12 flex justify-between items-center transition-all">
        <div className="text-2xl md:text-3xl font-black italic tracking-tight uppercase text-white">
          IRON<span className="text-red-600">CORE</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-neutral-400">
          <a href="#rates" onClick={(e) => scrollTo(e, 'rates')} className="hover:text-red-500 transition-colors">Абонементы</a>
          <a href="#trainers" onClick={(e) => scrollTo(e, 'trainers')} className="hover:text-red-500 transition-colors">Тренеры</a>
          <a href="#schedule" onClick={(e) => scrollTo(e, 'schedule')} className="hover:text-red-500 transition-colors">Расписание</a>
          <a href="#contacts" onClick={(e) => scrollTo(e, 'contacts')} className="hover:text-red-500 transition-colors">Контакты</a>
        </nav>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 md:px-6 py-2 md:py-2.5 font-bold uppercase tracking-wider text-[10px] md:text-xs transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] skew-x-[-10deg]">
          <div className="skew-x-[10deg]">Стать резидентом</div>
        </button>
      </header>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center py-24 md:py-32 px-6 md:px-12 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10"></div>
          <img src={case2_1} alt="Фитнес клуб обложка" className="w-full h-full object-cover object-center grayscale contrast-125" />
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
          <div className="grid grid-cols-2 gap-4 mt-12 lg:mt-auto mb-12">
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

      {/* Infrastructure */}
      <section className="py-32 px-6 md:px-12 bg-neutral-900 border-t border-red-900/30 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-red-900/10 blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
            <div>
              <h2 className="text-[13px] font-mono text-red-500 uppercase tracking-widest mb-2">Технологии и комфорт</h2>
              <h3 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-white uppercase tracking-tight">Инфраструктура</h3>
            </div>
            <p className="text-neutral-400 max-w-md text-sm md:text-base md:text-right">Все необходимое для продуктивных тренировок и качественного восстановления.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Тренажерный зал", desc: "Премиальное оборудование от Life Fitness и Hammer Strength.", num: "01" },
              { title: "Зона Кроссфита", desc: "Помосты, рамы, канаты и свободные веса для функционального тренинга.", num: "02" },
              { title: "SPA-зона", desc: "Финская сауна, хамам, ледяной душ и массажный кабинет.", num: "03" },
              { title: "Фитнес-бар", desc: "Спортивное питание, протеиновые коктейли и полезные снеки.", num: "04" },
              { title: "Групповые залы", desc: "Амортизирующий паркет и профессиональная акустика.", num: "05" },
              { title: "Сайкл-студия", desc: "Иммерсивные тренировки на байках последнего поколения.", num: "06" },
              { title: "Раздевалки", desc: "Просторные шкафчики, электронные замки и премиальная косметика.", num: "07" },
              { title: "Паркинг", desc: "Бесплатная охраняемая парковка на 100 автомобилей.", num: "08" }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-[#0a0a0a] border border-neutral-800 hover:border-red-500/30 transition-all flex flex-col items-start gap-4 group">
                <div className="text-4xl font-black text-neutral-800 font-mono group-hover:text-red-900/50 transition-colors">{item.num}</div>
                <h4 className="text-lg font-bold uppercase tracking-wider text-white group-hover:text-red-500 transition-colors">{item.title}</h4>
                <p className="text-sm text-neutral-500 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers */}
      <section id="trainers" className="py-32 px-6 md:px-12 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-red-900/10 blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
            <div>
              <h2 className="text-[13px] font-mono text-red-500 uppercase tracking-widest mb-2">Команда</h2>
              <h3 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-white uppercase tracking-tight">Тренеры</h3>
            </div>
            <p className="text-neutral-400 max-w-md text-sm md:text-base">Сертифицированные специалисты по силовому тренингу, кроссфиту и групповым программам.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Алексей Соколов', role: 'Кроссфит, силовой тренинг', img: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=500&q=80' },
              { name: 'Елена Реброва', role: 'Йога, стретчинг', img: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=500&q=80' },
              { name: 'Дмитрий Котов', role: 'Бокс, единоборства', img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=500&q=80' },
              { name: 'Марина Волкова', role: 'Персональный тренинг', img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=500&q=80' },
            ].map((t, i) => (
              <div key={i} className="group relative overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-red-500/40 transition-colors">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-5">
                  <h4 className="text-lg font-bold uppercase tracking-wider text-white">{t.name}</h4>
                  <p className="text-red-500 text-xs uppercase tracking-widest mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Results infographic */}
          <div className="mt-20 grid sm:grid-cols-3 gap-px bg-neutral-800 border border-neutral-800">
            {[
              { v: '2 400+', l: 'резидентов клуба' },
              { v: '87%', l: 'продлевают карту повторно' },
              { v: '4.9', l: 'средняя оценка тренировок' },
            ].map((s, i) => (
              <div key={i} className="bg-[#0a0a0a] p-10 text-center">
                <div className="text-4xl md:text-5xl font-black text-white mb-2">{s.v}</div>
                <div className="text-xs uppercase tracking-widest text-neutral-500">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="rates" className="py-32 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
            <div>
              <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-2">Клубные карты</h2>
              <h3 className="text-[32px] font-bold text-white uppercase">Тарифы</h3>
            </div>
            <button className="text-sm font-bold text-white border-b border-red-500 pb-1 hover:text-red-500 transition-colors uppercase tracking-widest self-start md:self-auto">
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

      {/* Schedule */}
      <section id="schedule" className="py-32 px-6 md:px-12 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">Расписание</h2>
            <div className="flex flex-wrap gap-2 p-1 bg-neutral-900 border border-neutral-800 rounded-sm self-start md:self-auto">
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

      {/* FAQ */}
      <section className="py-32 px-6 md:px-12 bg-[#0a0a0a] border-t border-red-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">FAQ</h2>
            <p className="text-neutral-400">Популярные вопросы о работе клуба и абонементах.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: "Как проходит первая тренировка?", a: "Первая тренировка вводная. Под руководством дежурного тренера вы пройдете фитнес-тестирование, поставите технику работы на тренажерах и получите персональные рекомендации." },
              { q: "Есть ли заморозка абонемента?", a: "Да, для годовых карт предусмотрена заморозка от 45 до 90 дней в зависимости от тарифа. Управлять ей можно в личном кабинете." },
              { q: "Что брать с собой на занятие?", a: "Спортивную форму, кроссовки и бутылку для воды. В раздевалках выдаются полотенца и есть вся необходимая косметика в душевых." },
              { q: "Сколько длится групповое занятие?", a: "От 45 до 60 минут. Точное время и уровень подготовки указаны в расписании клуба." },
              { q: "Можно ли оплатить карту в рассрочку?", a: "У нас есть беспроцентная рассрочка от клуба на 3, 6 и 12 месяцев. Оформление занимает 5 минут по одному документу." }
            ].map((item, i) => (
              <details key={i} className="group bg-neutral-900 border border-neutral-800 p-6 md:p-8 open:border-red-500/50 transition-colors cursor-pointer">
                <summary className="font-bold text-lg uppercase tracking-wider marker:content-none flex justify-between items-center outline-none hover:text-red-500 transition-colors">
                  {item.q}
                  <span className="text-red-600 group-open:rotate-45 transition-transform text-3xl font-light leading-none">+</span>
                </summary>
                <div className="mt-6 text-neutral-400 text-sm leading-relaxed border-t border-neutral-800 pt-6">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / CTA form */}
      <section id="contacts" className="py-24 px-6 md:px-12 bg-neutral-900 border-b border-neutral-800 relative">
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

      {/* Footer */}
      <footer className="bg-[#050505] pt-20 pb-10 px-6 md:px-12 text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 mb-16">
          <div className="max-w-xs">
            <div className="text-2xl font-black text-white tracking-widest uppercase mb-4">IRON<span className="text-red-600">CORE</span></div>
            <p className="text-sm font-medium leading-relaxed mb-6">Бескомпромиссный подход к тренировкам в клубе IRONCORE. Премиальное оборудование, лучшие тренеры и атмосфера результата.</p>
            <div className="flex gap-4 border-l border-red-600 pl-4">
               {/* Social Icons Placeholder */}
               <div className="hover:text-red-500 font-bold uppercase tracking-wider cursor-pointer text-sm transition-colors text-white">ВК</div>
               <div className="hover:text-red-500 font-bold uppercase tracking-wider cursor-pointer text-sm transition-colors text-white">ТГ</div>
               <div className="hover:text-red-500 font-bold uppercase tracking-wider cursor-pointer text-sm transition-colors text-white">IG</div>
            </div>
          </div>
          <div>
             <h4 className="text-white font-black uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">Клуб</h4>
             <ul className="space-y-3 text-sm font-medium">
              <li><a href="#about" onClick={(e) => scrollTo(e, 'about')} className="hover:text-red-500 transition-colors">О нас</a></li>
              <li><a href="#rates" onClick={(e) => scrollTo(e, 'rates')} className="hover:text-red-500 transition-colors">Карты</a></li>
              <li><a href="#schedule" onClick={(e) => scrollTo(e, 'schedule')} className="hover:text-red-500 transition-colors">Расписание</a></li>
            </ul>
          </div>
          <div>
             <h4 className="text-white font-black uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">Услуги</h4>
             <ul className="space-y-3 text-sm font-medium">
              <li><a href="#services" onClick={(e) => scrollTo(e, 'services')} className="hover:text-red-500 transition-colors">Кроссфит</a></li>
              <li><a href="#services" onClick={(e) => scrollTo(e, 'services')} className="hover:text-red-500 transition-colors">Боевые искусства</a></li>
              <li><a href="#services" onClick={(e) => scrollTo(e, 'services')} className="hover:text-red-500 transition-colors">Групповые занятия</a></li>
            </ul>
          </div>
          <div>
             <h4 className="text-white font-black uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">Контакты</h4>
             <ul className="space-y-3 text-sm font-medium">
               <li className="text-white text-lg font-mono">+7 (495) 999-00-00</li>
               <li>info@ironcore-club.ru</li>
               <li className="pt-2 text-neutral-500">г. Москва, Брутальный пр-т, 1<br/>Круглосуточно 24/7</li>
             </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between text-xs font-mono text-neutral-600">
          <p>© 2024 IRONCORE. Все права защищены.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-red-500 transition-colors">Политика конфиденциальности</a>
             <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-red-500 transition-colors">Оферта</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
