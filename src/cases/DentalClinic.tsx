import React from 'react';
import { motion } from 'motion/react';
import { Syringe, Sparkles, ShieldCheck, Smile, Stethoscope, HeartPulse, Moon, Cpu, FileCheck2, Users, Wallet, ArrowRight, Plus, Minus } from 'lucide-react';

const case1_1 = "/demo-main-1.jpg";
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};

const serviceIcons = [Syringe, Sparkles, ShieldCheck, Smile, Stethoscope, HeartPulse];
const advantageIcons = [ShieldCheck, Moon, Cpu, FileCheck2, Users, Wallet];

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
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-sky-100 py-4 pl-20 pr-6 md:pl-24 md:pr-12 flex justify-between items-center">
        <div className="text-2xl font-serif font-bold text-sky-900 tracking-tight">Dental<span className="text-sky-500">Art</span></div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          <a href="#services" onClick={(e) => scrollTo(e, 'services')} className="hover:text-sky-600 transition-colors">Услуги</a>
          <a href="#doctors" onClick={(e) => scrollTo(e, 'doctors')} className="hover:text-sky-600 transition-colors">Врачи</a>
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
          <button className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-sky-600/30 cursor-pointer">
            Записаться
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-32 px-6 md:px-12 bg-gradient-to-b from-sky-50 to-white overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="inline-block px-4 py-1.5 bg-sky-100 text-sky-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6"
            >
              Премиальная стоматология в Москве
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="text-4xl md:text-6xl lg:text-[4rem] font-serif font-bold text-slate-900 leading-[1.05] tracking-tight mb-6"
            >
              Здоровая улыбка <br/>с гарантией <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">экспертов</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed"
            >
              Безболезненное лечение, прецизионная имплантация и цифровая эстетика. Вернем уверенность в вашей улыбке за один визит.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease }}
              className="flex flex-wrap gap-4"
            >
              <button className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-full text-base font-bold transition-all shadow-lg shadow-sky-600/30 cursor-pointer">
                Записаться на прием
              </button>
              <button className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-8 py-4 rounded-full text-base font-bold transition-all cursor-pointer">
                Прайс-лист
              </button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="relative z-10 mt-8 md:mt-0"
          >
            <div className="aspect-square rounded-full bg-gradient-to-br from-sky-200 to-cyan-100 absolute -top-12 -right-12 w-full h-full -z-10 blur-3xl opacity-60"></div>
            <div className="relative h-[280px] sm:h-[350px] md:h-[500px] w-full bg-slate-200 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_30px_80px_-20px_rgba(2,132,199,0.35)] ring-1 ring-black/5">
              <img src={case1_1} alt="Демонстрация работы" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-slate-800 mb-6">Услуги и цены</h2>
            <p className="text-slate-600">Мы предлагаем полный спектр стоматологических услуг.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['Имплантация зубов', 'Эстетическая стоматология', 'Протезирование', 'Ортодонтия', 'Лечение зубов', 'Профессиональная гигиена'].map((service, i) => {
              const Icon = serviceIcons[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease }}
                  className="p-8 rounded-3xl bg-white border border-slate-100 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-[0_24px_48px_-12px_rgba(2,132,199,0.18)] hover:-translate-y-1 hover:border-sky-200 transition-all duration-500 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-cyan-400 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-sky-500/25">
                     <Icon className="w-6 h-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 tracking-tight">{service}</h3>
                  <p className="text-slate-500 mb-6 text-sm leading-relaxed">Комплексный подход и использование передовых материалов для достижения идеального результата.</p>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-sky-600 font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    Подробнее <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section id="doctors" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-slate-800 mb-6">Врачи клиники</h2>
            <p className="text-slate-600">Команда сертифицированных специалистов с опытом от 8 лет в своей области.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { initials: 'ЕК', name: 'Елена Валерьевна Крылова', role: 'Ортопед, эстетическая стоматология', years: 14 },
              { initials: 'ИП', name: 'Игорь Сергеевич Панов', role: 'Хирург-имплантолог', years: 11 },
              { initials: 'МГ', name: 'Марина Олеговна Гаврилова', role: 'Терапевт, лечение каналов', years: 9 },
              { initials: 'АН', name: 'Артём Дмитриевич Носов', role: 'Ортодонт', years: 8 },
            ].map((doc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className="bg-white rounded-3xl border border-slate-100 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-[0_24px_48px_-16px_rgba(2,132,199,0.2)] hover:-translate-y-1 transition-all duration-500 p-7 flex flex-col"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-100 to-cyan-100 text-sky-700 flex items-center justify-center font-bold text-xl mb-6 ring-1 ring-sky-200/60">
                  {doc.initials}
                </div>
                <h3 className="font-bold text-slate-800 leading-snug mb-1 tracking-tight">{doc.name}</h3>
                <p className="text-sky-600 text-sm mb-6 font-medium">{doc.role}</p>
                <div className="mt-auto pt-5 border-t border-slate-100">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-slate-400">Опыт практики</span>
                    <span className="text-sm font-bold text-slate-700">{doc.years} лет</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(100, (doc.years / 15) * 100)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.08, ease }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology / Equipment infographic */}
      <section id="technology" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-slate-800 mb-6">Оборудование и технологии</h2>
            <p className="text-slate-600">Диагностика и лечение на оборудовании экспертного класса.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { stat: '3D', label: 'Компьютерная томография', desc: 'Точная диагностика перед имплантацией и лечением каналов.' },
              { stat: '×24', label: 'Дентальный микроскоп', desc: 'Увеличение для микроскопического лечения корневых каналов.' },
              { stat: '0%', label: 'Использование ртутных пломб', desc: 'Только современные светоотверждаемые композитные материалы.' },
              { stat: 'ISO', label: 'Стерилизация инструментов', desc: 'Автоклавирование и контроль по международным протоколам.' },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className="p-8 rounded-3xl border border-slate-100 bg-gradient-to-b from-slate-50 to-white text-center hover:shadow-[0_20px_40px_-16px_rgba(2,132,199,0.15)] hover:-translate-y-1 transition-all duration-500"
              >
                <div className="text-4xl font-serif font-bold bg-gradient-to-br from-sky-600 to-cyan-500 bg-clip-text text-transparent mb-4">{t.stat}</div>
                <h3 className="font-bold text-slate-800 mb-2 tracking-tight">{t.label}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section id="advantages" className="py-24 px-6 md:px-12 bg-sky-50">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Почему выбирают DentalArt?</h2>
             <p className="text-slate-500 max-w-2xl mx-auto">Стандарты качества, безопасность и бескомпромиссный подход к лечению.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Пожизненная гарантия', desc: 'Мы уверены в качестве нашей работы и материалах. На все виды имплантации предоставляется официальная пожизненная гарантия по договору.' },
              { title: 'Лечение во сне', desc: 'Используем безопасный наркоз и седацию (закись азота, пропофол). Просыпаетесь — а красивая улыбка уже готова. Абсолютно без боли и стресса.' },
              { title: 'Искусственный интеллект', desc: 'Компьютерная 3D-томография анализируется нейросетью. Это исключает врачебные ошибки на этапе диагностики и позволяет спланировать точный результат.' },
              { title: 'Современные протоколы', desc: 'Лечение строго по международным стандартам. Использование микроскопа при лечении каналов увеличивает срок службы зуба в несколько раз.' },
              { title: 'Все специалисты в одном месте', desc: 'Вам не нужно искать разных врачей. Ортодонт, хирург, терапевт и ортопед совместно работают над вашим клиническим случаем в рамках одной клиники.' },
              { title: 'Прозрачные цены', desc: 'Фиксируем стоимость лечения в плане до начала работ. Никаких скрытых платежей или внезапных доплат. Возможна рассрочка 0%.' },
            ].map((a, i) => {
              const Icon = advantageIcons[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease }}
                  className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-[0_24px_48px_-16px_rgba(2,132,199,0.18)] hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 text-white flex items-center justify-center mb-6 shadow-lg shadow-sky-500/25">
                    <Icon className="w-6 h-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-bold text-xl text-slate-800 mb-3">{a.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{a.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Часто задаваемые вопросы</h2>
             <p className="text-slate-500 max-w-xl mx-auto">Мы собрали самые популярные вопросы от наших пациентов, чтобы развеять ваши сомнения.</p>
          </motion.div>
          <div className="space-y-4">
            {[
              { q: 'Больно ли устанавливать имплантат?', a: 'Современная анестезия делает процедуру полностью безболезненной. Большинство пациентов отмечают, что имплантация переносится легче, чем удаление зуба. Также доступно лечение "во сне" (седация).' },
              { q: 'Даете ли вы гарантию на коронки и имплантаты?', a: 'Да, мы предоставляем пожизненную гарантию от производителя на все системы имплантатов, а также 5-летнюю гарантию на ортопедические конструкции при соблюдении графика профилактических осмотров.' },
              { q: 'Как часто нужно делать профессиональную гигиену?', a: 'Врачи рекомендуют проводить профессиональную чистку зубов раз в 6 месяцев. Если у вас установлены брекеты, имплантаты или вы злоупотребляете кофе/курением — раз в 3-4 месяца.' },
              { q: 'Можно ли вылечить зуб за один визит?', a: 'Большинство терапевтических вмешательств, включая лечение кариеса и корневых каналов, мы проводим за одно посещение с использованием дентального микроскопа. Сложные случаи могут потребовать 2-3 визитов.' },
              { q: 'Принимаете ли вы полисы ДМС?', a: 'Да, наша клиника сотрудничает с ведущими страховыми компаниями СОГАЗ, Ингосстрах, РЕСО-Гарантия, АльфаСтрахование. Пожалуйста, уточните детали у администратора при записи.' }
            ].map((item, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.06, ease }}
                className="group bg-slate-50 rounded-2xl p-6 open:bg-sky-50 transition-colors border border-slate-100 cursor-pointer"
              >
                <summary className="font-bold text-lg text-slate-800 marker:content-none flex justify-between items-center outline-none">
                  {item.q}
                  <span className="text-sky-600 shrink-0 ml-4">
                    <Plus className="w-5 h-5 group-open:hidden" />
                    <Minus className="w-5 h-5 hidden group-open:block" />
                  </span>
                </summary>
                <div className="mt-4 text-slate-600 text-sm leading-relaxed pr-8">
                  {item.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-24 px-6 md:px-12 bg-sky-50 border-y border-sky-100">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 {...fadeUp} transition={{ duration: 0.7, ease }} className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-12">Отзывы пациентов</motion.h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[1, 2, 3].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="bg-white p-8 rounded-3xl shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-[0_24px_48px_-16px_rgba(2,132,199,0.15)] transition-shadow duration-500 border border-slate-100/80"
              >
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form CTA */}
      <section className="py-24 px-6 md:px-12 bg-sky-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Получите план лечения сегодня</h2>
          <p className="text-sky-200 mb-10 text-lg">Оставьте заявку на бесплатную консультацию с главным врачом клиники и КТ-снимок в подарок.</p>
          <form className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4">
            <input type="text" placeholder="Ваше имя" className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-sky-200 focus:outline-none focus:border-white focus:bg-white/20 transition-all" />
            <input type="tel" placeholder="Номер телефона" className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-sky-200 focus:outline-none focus:border-white focus:bg-white/20 transition-all" />
            <button type="button" className="bg-white text-sky-900 px-8 py-4 rounded-full font-bold hover:bg-sky-50 transition-colors shadow-xl cursor-pointer">Отправить</button>
          </form>
          <p className="text-sky-400/60 text-xs mt-4">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.</p>
        </motion.div>
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
