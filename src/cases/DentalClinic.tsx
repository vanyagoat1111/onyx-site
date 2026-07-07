import React from 'react';
import { Helmet } from 'react-helmet-async';
const case1_1 = "/demo-main-1.jpg";

export default function DentalClinic() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-800 font-outfit overflow-hidden">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-sky-100 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="text-2xl font-serif font-bold text-sky-900 tracking-tight">Dental<span className="text-sky-500">Art</span></div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          <a href="#services" onClick={(e) => scrollTo(e, 'services')} className="hover:text-sky-600 transition-colors">Услуги</a>
          <a href="#advantages" onClick={(e) => scrollTo(e, 'advantages')} className="hover:text-sky-600 transition-colors">Преимущества</a>
          <a href="#faq" onClick={(e) => scrollTo(e, 'faq')} className="hover:text-sky-600 transition-colors">Частые вопросы</a>
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
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-32 px-6 md:px-12 bg-gradient-to-b from-sky-50 to-white overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <div className="inline-block px-4 py-1.5 bg-sky-100 text-sky-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              Премиальная стоматология в Москве
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 leading-tight mb-6">
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
          <div className="relative z-10 mt-8 md:mt-0">
            <div className="aspect-square rounded-full bg-sky-100 absolute -top-12 -right-12 w-full h-full -z-10 blur-3xl opacity-50"></div>
            <div className="relative h-[280px] sm:h-[350px] md:h-[500px] w-full bg-slate-200 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
              <img src={case1_1} alt="Демонстрация работы" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-slate-800 mb-6">Услуги и цены</h2>
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

      {/* Advantages */}
      <section id="advantages" className="py-24 px-6 md:px-12 bg-sky-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Почему выбирают DentalArt?</h2>
             <p className="text-slate-500 max-w-2xl mx-auto">Стандарты качества, безопасность и бескомпромиссный подход к лечению.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-sky-100">
                <div className="text-sky-600 text-4xl mb-6 font-bold">01</div>
                <h3 className="font-bold text-xl text-slate-800 mb-3">Пожизненная гарантия</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Мы уверены в качестве нашей работы и материалах. На все виды имплантации предоставляется официальная пожизненная гарантия по договору.</p>
             </div>
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-sky-100">
                <div className="text-sky-600 text-4xl mb-6 font-bold">02</div>
                <h3 className="font-bold text-xl text-slate-800 mb-3">Лечение во сне</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Используем безопасный наркоз и седацию (закись азота, пропофол). Просыпаетесь — а красивая улыбка уже готова. Абсолютно без боли и стресса.</p>
             </div>
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-sky-100">
                <div className="text-sky-600 text-4xl mb-6 font-bold">03</div>
                <h3 className="font-bold text-xl text-slate-800 mb-3">Искусственный интеллект</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Компьютерная 3D-томография анализируется нейросетью. Это исключает врачебные ошибки на этапе диагностики и позволяет спланировать точный результат.</p>
             </div>
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-sky-100">
                <div className="text-sky-600 text-4xl mb-6 font-bold">04</div>
                <h3 className="font-bold text-xl text-slate-800 mb-3">Современные протоколы</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Лечение строго по международным стандартам. Использование микроскопа при лечении каналов увеличивает срок службы зуба в несколько раз.</p>
             </div>
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-sky-100">
                <div className="text-sky-600 text-4xl mb-6 font-bold">05</div>
                <h3 className="font-bold text-xl text-slate-800 mb-3">Все специалисты в одном месте</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Вам не нужно искать разных врачей. Ортодонт, хирург, терапевт и ортопед совместно работают над вашим клиническим случаем в рамках одной клиники.</p>
             </div>
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-sky-100">
                <div className="text-sky-600 text-4xl mb-6 font-bold">06</div>
                <h3 className="font-bold text-xl text-slate-800 mb-3">Прозрачные цены</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Фиксируем стоимость лечения в плане до начала работ. Никаких скрытых платежей или внезапных доплат. Возможна рассрочка 0%.</p>
             </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Часто задаваемые вопросы</h2>
             <p className="text-slate-500 max-w-xl mx-auto">Мы собрали самые популярные вопросы от наших пациентов, чтобы развеять ваши сомнения.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: 'Больно ли устанавливать имплантат?', a: 'Современная анестезия делает процедуру полностью безболезненной. Большинство пациентов отмечают, что имплантация переносится легче, чем удаление зуба. Также доступно лечение "во сне" (седация).' },
              { q: 'Даете ли вы гарантию на коронки и имплантаты?', a: 'Да, мы предоставляем пожизненную гарантию от производителя на все системы имплантатов, а также 5-летнюю гарантию на ортопедические конструкции при соблюдении графика профилактических осмотров.' },
              { q: 'Как часто нужно делать профессиональную гигиену?', a: 'Врачи рекомендуют проводить профессиональную чистку зубов раз в 6 месяцев. Если у вас установлены брекеты, имплантаты или вы злоупотребляете кофе/курением — раз в 3-4 месяца.' },
              { q: 'Можно ли вылечить зуб за один визит?', a: 'Большинство терапевтических вмешательств, включая лечение кариеса и корневых каналов, мы проводим за одно посещение с использованием дентального микроскопа. Сложные случаи могут потребовать 2-3 визитов.' },
              { q: 'Принимаете ли вы полисы ДМС?', a: 'Да, наша клиника сотрудничает с ведущими страховыми компаниями СОГАЗ, Ингосстрах, РЕСО-Гарантия, АльфаСтрахование. Пожалуйста, уточните детали у администратора при записи.' }
            ].map((item, i) => (
              <details key={i} className="group bg-slate-50 rounded-2xl p-6 open:bg-sky-50 transition-colors border border-slate-100 cursor-pointer">
                <summary className="font-bold text-lg text-slate-800 marker:content-none flex justify-between items-center outline-none">
                  {item.q}
                  <span className="text-sky-600 group-open:rotate-45 transition-transform text-2xl font-light">+</span>
                </summary>
                <div className="mt-4 text-slate-600 text-sm leading-relaxed pr-8">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-24 px-6 md:px-12 bg-sky-50 border-y border-sky-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-12">Отзывы пациентов</h2>
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
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Получите план лечения сегодня</h2>
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
              <li><a href="#advantages" onClick={(e) => scrollTo(e, 'advantages')} className="hover:text-white transition-colors">Преимущества</a></li>
              <li><a href="#faq" onClick={(e) => scrollTo(e, 'faq')} className="hover:text-white transition-colors">Частые вопросы</a></li>
              <li><a href="#reviews" onClick={(e) => scrollTo(e, 'reviews')} className="hover:text-white transition-colors">Отзывы</a></li>
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
