import React from 'react';
const case3_1 = "/demo-main-3.jpg";

export default function Logistics() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-onyx-950 text-white font-sans selection:bg-blue-600 selection:text-white w-full overflow-hidden">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-onyx-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <div className="text-2xl font-black font-heading tracking-tight flex items-center gap-2">
            <span className="text-white">PRIME</span><span className="text-blue-500">LOGISTICS</span>
          </div>
          <nav className="hidden lg:flex gap-8 font-semibold text-sm uppercase tracking-wider text-neutral-300">
            <a href="#services" onClick={(e) => scrollTo(e, 'services')} className="hover:text-blue-400 transition-colors">Услуги</a>
            <a href="#fleet" onClick={(e) => scrollTo(e, 'fleet')} className="hover:text-blue-400 transition-colors">Автопарк</a>
            <a href="#geography" onClick={(e) => scrollTo(e, 'geography')} className="hover:text-blue-400 transition-colors">География</a>
            <a href="#industries" onClick={(e) => scrollTo(e, 'industries')} className="hover:text-blue-400 transition-colors">Отрасли</a>
            <a href="#advantages" onClick={(e) => scrollTo(e, 'advantages')} className="hover:text-blue-400 transition-colors">Преимущества</a>
          </nav>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs text-neutral-400 font-medium">Бесплатный звонок по РФ</span>
              <a href="tel:88000000000" className="text-white font-bold hover:text-blue-400 transition-colors">8 (800) 500-00-00</a>
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 md:px-6 py-2 md:py-3 text-[10px] md:text-sm font-bold uppercase tracking-wider transition-all clip-diagonal">
              Расчет стоимости
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 overflow-hidden min-h-[90vh] flex items-center border-b border-onyx-800">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-onyx-950 via-onyx-950/90 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx-950 via-transparent to-transparent z-10" />
          <img src={case3_1} alt="Логистическая компания фон" className="w-full h-full object-cover object-center opacity-40 grayscale-[20%]" />
        </div>

        <div className="max-w-[1400px] mx-auto w-full relative z-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8">
              <div className="inline-flex items-center gap-3 bg-blue-500/10 border border-blue-500/30 px-4 py-2 w-fit backdrop-blur-sm">
                <div className="w-2 h-2 rounded-none bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                <span className="text-sm font-bold uppercase tracking-wider text-blue-400">Международная логистика 3PL</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black font-heading uppercase tracking-tight text-white leading-[1.1]">
                Доставка грузов<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  без задержек<br/>и скрытых платежей
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-neutral-300 max-w-xl font-light leading-relaxed">
                Собственный автопарк из 230 единиц техники, современные кросс-доки полного цикла и 100% материальная ответственность по договору. Обеспечиваем бесперебойные поставки для среднего и крупного бизнеса.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 font-bold uppercase tracking-wider transition-all text-center clip-diagonal shadow-[0_0_30px_rgba(59,130,246,0.3)] border border-blue-400/50 hover:border-transparent">
                  Рассчитать ставку
                </button>
                <button className="bg-onyx-900 border border-onyx-700 hover:border-blue-500/50 hover:bg-onyx-800 text-white px-8 py-4 font-bold uppercase tracking-wider transition-all text-center clip-diagonal">
                  Скачать презентацию
                </button>
              </div>
            </div>

            {/* QUICK CALCULATOR WIDGET */}
            <div className="bg-onyx-900/80 backdrop-blur-xl border border-onyx-700 p-8 clip-diagonal-inverted shadow-2xl relative lg:ml-auto w-full max-w-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] pointer-events-none" />
              <h3 className="text-2xl font-bold font-heading uppercase text-white mb-6">Экспресс-расчет</h3>

              <div className="space-y-5 relative z-10">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Пункт отправления</label>
                  <input type="text" placeholder="Укажите город или порт" className="w-full bg-onyx-950 border border-onyx-800 px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-neutral-600 font-medium" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Пункт назначения</label>
                  <input type="text" placeholder="Укажите город или порт" className="w-full bg-onyx-950 border border-onyx-800 px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-neutral-600 font-medium" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Вес (КГ)</label>
                    <input type="number" placeholder="0" className="w-full bg-onyx-950 border border-onyx-800 px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-neutral-600 font-medium" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Объем (М³)</label>
                    <input type="number" placeholder="0" className="w-full bg-onyx-950 border border-onyx-800 px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-neutral-600 font-medium" />
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 font-bold uppercase tracking-wider transition-all text-center mt-4 clip-diagonal border border-blue-400/50 hover:border-transparent">
                  Узнать стоимость
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGIC NUMBERS */}
      <section className="bg-[linear-gradient(to_bottom,#0b1536_0%,#11204d_100%)] border-b border-onyx-800 py-20 relative z-30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 divide-x divide-onyx-800/0 lg:divide-onyx-800">
            <div className="flex flex-col gap-2 relative">
              <div className="text-4xl lg:text-5xl xl:text-6xl font-black font-heading text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">230+</div>
              <div className="text-sm lg:text-base text-neutral-400 font-medium leading-tight mt-2">Единиц собственного автопарка класса Евро-6</div>
            </div>
            <div className="flex flex-col gap-2 lg:pl-12 relative">
              <div className="text-4xl lg:text-5xl xl:text-6xl font-black font-heading text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">14</div>
              <div className="text-sm lg:text-base text-neutral-400 font-medium leading-tight mt-2">Собственных складских 3PL-комплексов A-класса</div>
            </div>
            <div className="flex flex-col gap-2 lg:pl-12 relative">
              <div className="text-4xl lg:text-5xl xl:text-6xl font-black font-heading text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">12 000+</div>
              <div className="text-sm lg:text-base text-neutral-400 font-medium leading-tight mt-2">Выполненных рейсов ежегодно по РФ и миру</div>
            </div>
            <div className="flex flex-col gap-2 lg:pl-12 relative">
              <div className="text-4xl lg:text-5xl xl:text-6xl font-black font-heading text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">99.8%</div>
              <div className="text-sm lg:text-base text-neutral-400 font-medium leading-tight mt-2">Показатель сохранности груза (SLA)</div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE SERVICES */}
      <section id="services" className="py-24 lg:py-32 bg-[#0b1536] relative overflow-hidden">
        <div className="absolute inset-0 industrial-grid opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/5 blur-[120px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-2xl">
              <div className="text-blue-500 font-bold uppercase tracking-wider mb-4 flex items-center gap-3">
                <div className="w-8 h-1 bg-blue-500" />
                Направления деятельности
              </div>
              <h2 className="text-4xl lg:text-6xl font-black font-heading uppercase text-white mb-6">Отраслевые решения</h2>
              <p className="text-neutral-400 text-lg">
                Предоставляем комплексные услуги по перевозке стандартных, температурных и проектных грузов. Берем на себя всю цепочку поставок от двери до двери.
              </p>
            </div>
            <button className="bg-transparent border border-onyx-700 hover:border-blue-500/50 hover:bg-onyx-800 text-white px-8 py-4 font-bold uppercase tracking-wider transition-all text-center clip-diagonal shrink-0">
              Смотреть все услуги
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Генеральные грузы (FTL)', desc: 'Выделенный транспорт от 1 до 20 тонн под одну загрузку. Прямая доставка без перегрузок для максимальной скорости.' },
              { title: 'Сборные грузы (LTL)', desc: 'Экономичная логистика с оплатой только за место в кузове. Регулярные отправки с собственных терминалов.' },
              { title: 'Негабаритные проекты', desc: 'Перевозка спецтехники и крупногабаритного оборудования. Оформление спецразрешений, сопровождение и тралы до 120т.' },
              { title: 'Рефрижераторные перевозки', desc: 'Строгое поддержание температурного режима от -25°C до +25°C. Оснащено термописцами и системами онлайн контроля.' },
              { title: 'Мультимодальные решения', desc: 'Оптимизация сроков и стоимости за счет комбинирования авто, ж/д и морского транспорта в едином логистическом окне.' },
              { title: 'Таможенное оформление', desc: 'Услуги таможенного брокера по всей территории РФ. Подготовка спецификаций, прохождение очистки за 24 часа без задержек.' },
            ].map((s, i) => (
              <div key={i} className="group cursor-pointer bg-onyx-900 border border-onyx-800 hover:border-blue-500/50 hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(59,130,246,0.25)] transition-all duration-500 clip-diagonal-inverted flex flex-col h-full overflow-hidden p-8">
                <div className="flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold font-heading uppercase text-white mb-4 group-hover:text-blue-400 transition-colors">{s.title}</h3>
                  <p className="text-neutral-400 leading-relaxed font-light mb-6 flex-grow">{s.desc}</p>
                  <div className="flex justify-between items-center text-sm font-bold uppercase tracking-wider text-blue-500 mt-auto">
                    <span>Подробнее</span>
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLEET SECTION */}
      <section id="fleet" className="py-24 lg:py-32 bg-onyx-900 border-y border-onyx-800 flex items-center relative overflow-hidden min-h-[90vh]">
        <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gradient-to-r from-blue-900/20 to-transparent pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full">

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
             <div className="relative order-2 lg:order-1 pt-12 lg:pt-0">
               <div className="absolute inset-x-0 -bottom-12 top-1/4 bg-blue-600/10 blur-[80px] -z-10 rounded-full" />
               <div className="relative border-2 border-onyx-700 p-3 bg-onyx-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                 <img src={case3_1} alt="Логистическая компания иллюстрация" className="w-full h-auto object-cover grayscale-[10%]" />
               </div>

               {/* Overlay Card */}
               <div className="absolute -top-8 -right-8 lg:-right-12 bg-onyx-950 border border-onyx-700 p-6 shadow-2xl max-w-[280px] hidden sm:block">
                 <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/50 flex items-center justify-center text-blue-500">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div className="text-white font-black text-2xl font-heading leading-none uppercase">ГЛОНАСС<br/><span className="text-blue-500 text-sm">Онлайн-трекинг</span></div>
                 </div>
                 <p className="text-neutral-400 text-xs font-medium leading-relaxed">Личный кабинет клиента интегрирован с системами мониторинга в реальном времени. Знайте, где ваш груз 24/7.</p>
               </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="text-blue-500 font-bold uppercase tracking-wider mb-4 flex items-center gap-3">
                <div className="w-8 h-1 bg-blue-500" /> Собственный ресурс
              </div>
              <h2 className="text-4xl lg:text-6xl font-black font-heading uppercase text-white mb-8">
                Премиальный<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Автопарк</span>
              </h2>
              <p className="text-neutral-300 text-lg mb-12 font-light leading-relaxed">
                Мы не зависим от посредников и арендной техники. В нашем распоряжении 230 современных тягачей Mercedes-Benz Actros, VOLVO FH и Scania R-серии не старше 3х лет. Вся техника проходит регулярное обслуживание на собственных авторизованных СТО.
              </p>

              <div className="space-y-4">
                {[
                  { title: 'Еврофуры тентованные 90-120 м³', count: '135 ед.', spec: 'Грузоподъемность: 20-22 т. / Вместимость: 33 паллеты.' },
                  { title: 'Рефрижераторы и изотермы', count: '45 ед.', spec: 'Температурный режим: от -25 °C до +25 °C. Термописцы.' },
                  { title: 'Низкорамные тралы (Негабарит)', count: '15 ед.', spec: 'Грузоподъемность: до 120 тонн / Раздвижные платформы.' },
                  { title: 'Малотоннажный транспорт', count: '35 ед.', spec: 'Объем: 15-40 м³ / Быстрая городская доставка.' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between border border-onyx-800 bg-onyx-950/50 p-6 group hover:border-blue-500/50 hover:bg-onyx-950 hover:shadow-[0_16px_32px_-16px_rgba(59,130,246,0.2)] transition-all duration-500">
                    <div>
                      <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors uppercase font-heading mb-2">{item.title}</h4>
                      <div className="text-sm text-neutral-400 font-medium">{item.spec}</div>
                    </div>
                    <div className="text-blue-500 font-black font-heading tracking-tighter text-3xl mt-4 sm:mt-0 px-4 py-2 bg-onyx-900 border border-onyx-800 text-center min-w-[120px]">
                      {item.count}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 lg:py-32 bg-onyx-950 relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20 max-w-3xl mx-auto flex flex-col items-center">
            <div className="text-blue-500 font-bold uppercase tracking-wider mb-4 flex items-center gap-3">
              <div className="w-8 h-1 bg-blue-500" /> Этапы работы <div className="w-8 h-1 bg-blue-500" />
            </div>
            <h2 className="text-4xl lg:text-6xl font-black font-heading uppercase text-white mb-6">Отлаженный механизм</h2>
            <p className="text-neutral-400 text-lg">Прозрачный логистический процесс стандарта 3PL, исключающий сбои и простои на каждом этапе жизненного цикла заявки.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Экспертный анализ и расчёт', desc: 'Персональный менеджер подбирает оптимальный вид транспорта, строит логистическое плечо и фиксирует итоговую стоимость в договоре без скрытых платежей.' },
              { step: '02', title: 'Подача транспорта и приемка', desc: 'Строгое соблюдение таймингов. Подаем профильный транспорт точно к согласованному времени. Контролируем схему правильной грузозацепки и крепления.' },
              { step: '03', title: 'Транзитный мониторинг', desc: 'Круглосуточный диспетчерский контроль движения 24/7. Водитель всегда на связи, а система автоматически рассылает клиенту ежедневные статусы местоположения.' },
              { step: '04', title: 'Точная сдача груза адресату', desc: 'Своевременная бесшовная доставка в точку назначения, приемка по актам, передача оригинального полного комплекта закрывающих документов.' }
            ].map((p, i) => (
              <div key={i} className="relative group p-8 lg:p-10 border border-onyx-800 bg-onyx-900 hover:bg-onyx-800 hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(59,130,246,0.25)] transition-all duration-500 clip-diagonal">
                <div className="text-7xl font-black font-heading text-onyx-950 group-hover:text-onyx-950/80 transition-colors absolute top-6 right-6 pointer-events-none select-none drop-shadow-[0_2px_2px_rgba(255,255,255,0.05)]">{p.step}</div>

                <div className="w-16 h-16 bg-blue-600 flex items-center justify-center font-bold text-2xl text-white mb-8 relative z-10 clip-diagonal shadow-lg shadow-blue-600/30">
                  {p.step}
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight relative z-10 font-heading leading-tight">{p.title}</h3>
                <div className="w-10 h-0.5 bg-blue-500 mb-6" />
                <p className="text-neutral-400 leading-relaxed relative z-10 text-sm font-medium">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GEOGRAPHY & WAREHOUSES */}
      <section id="geography" className="py-24 lg:py-32 bg-onyx-900 relative border-t border-onyx-800">

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-6">
            <div className="text-blue-500 font-bold uppercase tracking-wider mb-4 flex items-center gap-3">
              <div className="w-8 h-1 bg-blue-500" /> Масштаб
            </div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black font-heading uppercase text-white mb-8 leading-tight">
              География<br/>
              <span className="text-blue-500">Маршрутов</span>
            </h2>
            <div className="space-y-6 text-lg text-neutral-300 font-light leading-relaxed mb-10">
              <p>Мы осуществляем регулярные магистральные отгрузки по всей территории РФ от Калининграда до Владивостока. Выполняем экспортно-импортные рейсы в страны ЕврАзЭС, Азию и ЕС.</p>
              <p>Разветвленная партнерская и собственная терминальная сеть позволяет эффективно консолидировать товаропотоки и оптимизировать логистический бюджет заказчика.</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="bg-onyx-950 border border-onyx-700 px-6 py-3 font-bold text-white clip-diagonal hover:border-blue-500 transition-colors cursor-pointer">Москва</div>
              <div className="bg-onyx-950 border border-onyx-700 px-6 py-3 font-bold text-white clip-diagonal hover:border-blue-500 transition-colors cursor-pointer">Санкт-Петербург</div>
              <div className="bg-onyx-950 border border-onyx-700 px-6 py-3 font-bold text-white clip-diagonal hover:border-blue-500 transition-colors cursor-pointer">Екатеринбург</div>
              <div className="bg-onyx-950 border border-onyx-700 px-6 py-3 font-bold text-white clip-diagonal hover:border-blue-500 transition-colors cursor-pointer">Новосибирск</div>
              <div className="bg-onyx-950 border border-onyx-700 px-6 py-3 font-bold text-white clip-diagonal hover:border-blue-500 transition-colors cursor-pointer">Казань</div>
              <div className="bg-onyx-950 border border-onyx-700 px-6 py-3 font-bold text-white clip-diagonal hover:border-blue-500 transition-colors cursor-pointer">Владивосток</div>
              <div className="bg-blue-600 border border-blue-500 text-white px-6 py-3 font-bold clip-diagonal hover:bg-blue-500 transition-colors cursor-pointer">+ 12 терминалов</div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-onyx-950 p-8 lg:p-14 border border-onyx-700 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative clip-diagonal">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] pointer-events-none" />
            <h3 className="text-3xl font-black font-heading uppercase text-white mb-8 border-b border-onyx-800 pb-6">Комплексная 3PL Логистика</h3>
            <ul className="space-y-8">
              {[
                { title: 'Ответственное хранение', desc: 'Высотное стеллажное хранение, интеграция собственной WMS-системы с ERP клиента (1С, SAP). Полная материальная ответственность за ТМЦ.' },
                { title: 'Кросс-докинг (Cross-docking)', desc: 'Приемка и прямая оперативная отгрузка без размещения в зоне долговременного хранения. Значительное ускорение оборачиваемости и минимизация затрат на склад.' },
                { title: 'Копакинг и Фулфилмент', desc: 'Стикерование, формирование предпродажных наборов, поштучная комплектация, подготовка груза по строгим регламентам федеральных сетей и маркетплейсов.' },
              ].map((item, i) => (
                <li key={i} className="flex gap-6 items-start">
                  <div className="w-10 h-10 border-2 border-blue-500 flex items-center justify-center shrink-0 mt-1 clip-diagonal bg-blue-500/10 text-blue-500 font-bold font-mono">
                    {i+1}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2 uppercase font-heading">{item.title}</h4>
                    <p className="text-neutral-400 leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="py-24 lg:py-32 bg-[#0b1536] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-500/5 blur-[120px] pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-2xl">
              <div className="text-blue-500 font-bold uppercase tracking-wider mb-4 flex items-center gap-3">
                <div className="w-8 h-1 bg-blue-500" />
                Клиенты
              </div>
              <h2 className="text-4xl lg:text-6xl font-black font-heading uppercase text-white mb-6">Отрасли, с которыми мы работаем</h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-onyx-800">
            {['Производство и FMCG', 'Retail и e-commerce', 'Фармацевтика', 'Строительство', 'Автомобильная отрасль', 'Агропромышленный сектор', 'Электроника', 'Химическая промышленность'].map((ind, i) => (
              <div key={i} className="bg-onyx-900 p-8 flex items-center min-h-[110px] hover:bg-onyx-800 hover:shadow-[0_16px_32px_-16px_rgba(59,130,246,0.2)] transition-all duration-500">
                <span className="text-white font-bold uppercase tracking-wide text-sm">{ind}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCUMENTS & INSURANCE + CASE STUDY */}
      <section id="advantages" className="py-24 lg:py-32 bg-onyx-900 border-y border-onyx-800 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 grid lg:grid-cols-2 gap-16">
          <div>
            <div className="text-blue-500 font-bold uppercase tracking-wider mb-4 flex items-center gap-3">
              <div className="w-8 h-1 bg-blue-500" /> Гарантии
            </div>
            <h2 className="text-3xl lg:text-5xl font-black font-heading uppercase text-white mb-8">Документы и страхование</h2>
            <ul className="space-y-6">
              {[
                { title: 'Полное страхование груза', desc: 'Каждая перевозка застрахована на полную стоимость груза по договору с ведущими страховыми компаниями.' },
                { title: 'Прозрачный документооборот', desc: 'ТТН, счета-фактуры и акты передаются в электронном виде через личный кабинет клиента.' },
                { title: 'Материальная ответственность', desc: '100% ответственность перевозчика за сохранность груза на всех этапах маршрута.' },
              ].map((d, i) => (
                <li key={i} className="flex gap-5 items-start border-b border-onyx-800 pb-6">
                  <div className="w-10 h-10 border-2 border-blue-500 flex items-center justify-center shrink-0 clip-diagonal bg-blue-500/10 text-blue-500 font-bold font-mono">{i + 1}</div>
                  <div>
                    <h4 className="text-lg font-bold text-white uppercase font-heading mb-1">{d.title}</h4>
                    <p className="text-neutral-400 text-sm leading-relaxed">{d.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-onyx-950 border border-onyx-700 p-10 lg:p-12 flex flex-col justify-between clip-diagonal-inverted">
            <div>
              <div className="text-blue-500 font-bold uppercase tracking-wider mb-6 text-sm">Кейс клиента</div>
              <p className="text-2xl lg:text-3xl text-white font-heading font-bold leading-snug mb-8">
                Сократили логистические издержки федеральной розничной сети на 18% за счёт консолидации грузов на кросс-докинге.
              </p>
              <p className="text-neutral-400 leading-relaxed">
                Перевели 40 региональных маршрутов на единую сборную схему LTL с еженедельной отгрузкой, сохранив срок доставки до магазинов в пределах 48 часов.
              </p>
            </div>
            <div className="mt-10 pt-8 border-t border-onyx-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-500 font-bold">ЛС</div>
              <div>
                <div className="text-white font-bold">Логистический директор</div>
                <div className="text-neutral-500 text-sm">Федеральная розничная сеть</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 lg:py-32 bg-blue-600 relative overflow-hidden clip-diagonal-inverted max-w-[1920px] mx-auto hidden sm:block">
        <div className="absolute inset-0 bg-onyx-950 mix-blend-color-burn opacity-50" />
        <div className="absolute inset-0 industrial-grid opacity-30 mix-blend-overlay" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 text-center flex flex-col items-center">
          <h2 className="text-4xl lg:text-6xl font-black font-heading uppercase text-white mb-8 tracking-tight drop-shadow-xl">
            Требуется надежный логистический партнер?
          </h2>
          <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
            Оставьте заявку на бесплатный експертный аудит транспортных расходов вашей компании. Мы проведем анализ и предложим решение с гарантией сокращения костов до 15%.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-2xl mx-auto relative z-20">
             <input type="text" placeholder="Введите ваш номер телефона" className="flex-1 bg-white px-8 py-5 text-onyx-950 font-bold focus:outline-none focus:ring-4 focus:ring-white/30 clip-diagonal placeholder:text-neutral-500 placeholder:font-normal text-lg" />
             <button className="bg-onyx-950 hover:bg-onyx-900 border border-onyx-950 hover:border-white/20 text-white px-10 py-5 font-bold text-lg uppercase tracking-wider transition-all clip-diagonal shadow-2xl">
                Заказать аудит
             </button>
          </div>
          <div className="text-blue-200 text-sm mt-6 font-medium">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-onyx-950 border-t border-onyx-800 pt-20 pb-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2 pr-0 lg:pr-12">
              <div className="text-3xl font-black font-heading tracking-tight flex items-center gap-2 mb-6">
                <span className="text-white">PRIME</span><span className="text-blue-500">LOGISTICS</span>
              </div>
              <p className="text-neutral-400 leading-relaxed mb-8 text-lg font-light">
                Премиальные решения в сфере междугородних перевозок и складской В2В логистики. Надежность подтверждена лидерскими позициями в федеральных рейтингах отрасли с 2012 года.
              </p>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full border border-onyx-800 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 cursor-pointer transition-colors text-white">
                  vk
                </div>
                <div className="w-12 h-12 rounded-full border border-onyx-800 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 cursor-pointer transition-colors text-white">
                  tg
                </div>
                <div className="w-12 h-12 rounded-full border border-onyx-800 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 cursor-pointer transition-colors text-white">
                  yt
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-wider mb-8 text-lg">Компетенции</h4>
              <ul className="space-y-4 font-medium">
                <li><a href="#" className="text-neutral-500 hover:text-blue-400 transition-colors">FTL Магистральные перевозки</a></li>
                <li><a href="#" className="text-neutral-500 hover:text-blue-400 transition-colors">Сборные грузы LTL</a></li>
                <li><a href="#" className="text-neutral-500 hover:text-blue-400 transition-colors">Транспортировка негабарита</a></li>
                <li><a href="#" className="text-neutral-500 hover:text-blue-400 transition-colors">Ответхранение (Склад А-класс)</a></li>
                <li><a href="#" className="text-neutral-500 hover:text-blue-400 transition-colors">Таможенный консалтинг</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-wider mb-8 text-lg">Штаб-квартира</h4>
              <ul className="space-y-6 font-medium">
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded bg-onyx-900 border border-onyx-800 flex items-center justify-center shrink-0 text-blue-500">📍</div>
                  <span className="text-neutral-400 leading-snug">123000, г. Москва<br/>ул. Инноваций 10, Башня "Империя"</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded bg-onyx-900 border border-onyx-800 flex items-center justify-center shrink-0 text-blue-500">📞</div>
                  <a href="tel:88000000000" className="text-white text-lg font-bold hover:text-blue-400 transition-colors">8 (800) 500-00-00</a>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded bg-onyx-900 border border-onyx-800 flex items-center justify-center shrink-0 text-blue-500">✉️</div>
                  <a href="mailto:info@primelogistics.ru" className="text-neutral-400 hover:text-white transition-colors">info@primelogistics.ru</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-onyx-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-neutral-500">
            <div className="font-semibold uppercase tracking-wider">© 2026 Prime Logistics. Все права сохранены.</div>
            <div className="flex flex-wrap gap-6 justify-center">
              <a href="#" className="hover:text-white transition-colors">Документация</a>
              <a href="#" className="hover:text-white transition-colors">Договор оферты</a>
              <a href="#" className="hover:text-white transition-colors">Политика обработки ПД</a>
            </div>
            <div className="text-neutral-600 font-bold uppercase tracking-widest text-xs">Developed by ONYX</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
