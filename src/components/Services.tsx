import React from 'react';
import { Container, SectionTitle } from './ui';
import { TechNodesEffect } from './BackgroundEffects';

const addons = [
  {
    title: 'Каталог товаров и услуг',
    price: '7 990 ₽',
    desc: 'Добавление каталога с вашими товарами или услугами на сайт.',
    action: 'Оплатить'
  },
  {
    title: 'Интеграция с системами CRM',
    price: '5 900 ₽',
    desc: 'Связь сайта с вашей CRM для автоматического получения заявок.',
    action: 'Оплатить'
  },
  {
    title: 'Корзина',
    price: 'от 10 790 ₽',
    desc: 'Функционал корзины для оформления заказов на сайте.',
    action: 'Оплатить'
  },
  {
    title: 'Подключение карт и геосервисов',
    price: 'от 3 900 ₽',
    desc: 'Интеграция интерактивных Яндекс или Google карт.',
    action: 'Оплатить'
  },
  {
    title: 'Калькулятор стоимости',
    price: 'от 7 990 ₽',
    desc: 'Интерактивный калькулятор для расчёта стоимости ваших услуг.',
    action: 'Оплатить'
  },
  {
    title: 'Политика конфиденциальности и документы',
    price: 'от 2 900 ₽',
    desc: 'Составление и размещение обязательных правовых документов.',
    action: 'Оплатить'
  },
  {
    title: 'Индивидуальный Дизайн',
    price: 'от 15 000 ₽',
    desc: 'Разработка уникального дизайна по вашему промпту.',
    action: 'Оплатить'
  },
  {
    title: 'SMM ONYX',
    price: 'от 50 000 ₽ / мес',
    desc: 'Ведение вашего бизнеса под ключ в ONYX SMM.',
    action: 'Оплатить'
  },
  {
    title: 'Настройка Аналитики',
    price: '3 990 ₽',
    desc: 'Яндекс Метрика, Google Analytics.',
    action: 'Оплатить'
  },
  {
    title: 'Онлайн Запись',
    price: '6 990 ₽',
    desc: 'Для стоматологий, фитнес-клубов, салонов, мед.центров. Подключаются сторонние сервисы записи.',
    action: 'Оплатить'
  },
  {
    title: 'Telegram Уведомления',
    price: '3 990 ₽',
    desc: 'Новые заявки сразу приходят в Telegram владельца.',
    action: 'Оплатить'
  }
];

export default function Services() {
  return (
    <Container id="prices" className="relative overflow-hidden">
      <TechNodesEffect />
      <SectionTitle subtitle="Наши тарифы"><span className="whitespace-nowrap text-3xl sm:text-4xl md:text-5xl lg:text-7xl drop-shadow-md">Разработка за 0 ₽</span></SectionTitle>

      <div className="grid lg:grid-cols-3 gap-8 relative z-10 p-4 -m-4 mb-16">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent pointer-events-none -z-10 blur-[100px]" />
        
        {/* Card 1: Стартовый сайт */}
        <div className="flex flex-col bg-onyx-900/80 backdrop-blur-md border border-onyx-800/80 hover:border-blue-500/50 transition-all duration-700 p-8 md:p-10 clip-diagonal group shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] relative overflow-hidden lg:col-span-2 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[0_0_20px_rgba(59,130,246,0.6)]"></div>
          
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight mb-4 group-hover:text-white text-neutral-200 transition-colors uppercase">
            СТАРТОВЫЙ САЙТ — <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">0 ₽</span>
          </h3>
          <p className="text-neutral-400 text-base mb-8 pb-8 border-b border-onyx-800 group-hover:border-blue-500/30 transition-colors font-mono leading-relaxed">Быстрый сайт для бизнеса, который поможет рассказать о компании, показать услуги и принимать заявки от клиентов.</p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-bold text-blue-400 mb-4 uppercase tracking-widest text-sm font-mono drop-shadow-[0_0_5px_rgba(96,165,250,0.3)]">Что входит:</h4>
              <ul className="space-y-4">
                {['современный одностраничный сайт', 'адаптация под телефон, планшет и компьютер', 'главный экран с оффером', 'блок с услугами или товарами', 'блок «О компании»', 'преимущества бизнеса', 'форма заявки', 'кнопки связи: телефон, WhatsApp, Telegram', 'базовая структура для продвижения', 'публикация сайта после подключения домена и хостинга'].map((f, j) => (
                  <li key={j} className="flex gap-4 text-sm md:text-base font-medium text-neutral-300 group-hover:text-neutral-100 transition-colors items-start">
                    <div className="w-2 h-2 rounded-none bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] shrink-0 mt-1.5" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-bold text-blue-400 mb-4 uppercase tracking-widest text-sm font-mono drop-shadow-[0_0_5px_rgba(96,165,250,0.3)]">Кому подходит:</h4>
                <ul className="grid grid-cols-1 gap-3">
                  {['экспертам', 'салонам красоты', 'стоматологиям и клиникам', 'фитнес-клубам', 'локальному бизнесу', 'студиям и агентствам', 'мастерам и специалистам', 'компаниям, которым нужен быстрый запуск в интернете'].map((f, j) => (
                    <li key={j} className="flex gap-4 text-sm font-medium text-neutral-400 group-hover:text-neutral-300 transition-colors items-center">
                      <div className="w-1.5 h-1.5 rounded-none bg-onyx-600 group-hover:bg-blue-400 transition-colors shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-onyx-950/50 p-6 border border-onyx-800 clip-diagonal relative overflow-hidden group/alert hover:border-blue-500/30 transition-colors">
                <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover/alert:opacity-100 transition-opacity" />
                <h4 className="text-lg font-bold text-red-400 mb-3 uppercase tracking-widest text-sm font-mono">Важно:</h4>
                <p className="text-sm text-neutral-400 group-hover/alert:text-neutral-300 transition-colors mb-2">Разработка сайта — бесплатно.</p>
                <p className="text-sm text-neutral-400 group-hover/alert:text-neutral-300 transition-colors mb-2">Домен, хостинг, подключение сайта и дополнительные функции оплачиваются отдельно.</p>
                <p className="text-sm font-bold text-white mt-4 drop-shadow-sm">Идеально, если вам нужен сайт без больших затрат на запуск.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-auto pt-8 border-t border-onyx-800/80">
            <button className="w-full md:w-auto relative px-10 py-5 bg-blue-600 text-white font-black uppercase tracking-[0.2em] text-xs sm:text-sm clip-diagonal hover:bg-white hover:text-blue-600 transition-all duration-500 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] group/btn z-10 overflow-hidden" onClick={() => window.open('https://t.me/onyxwebsites_bot', '_blank')}>
              Получить сайт бесплатно
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
            </button>
          </div>
        </div>

        {/* Column 2 for smaller cards */}
        <div className="flex flex-col gap-8 lg:col-span-1">
          {/* Card 2: Запуск сайта */}
          <div className="flex flex-col bg-[#111e42] border border-blue-500/20 hover:border-blue-400/80 transition-all duration-700 p-8 md:p-10 clip-diagonal group shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.2)] relative overflow-hidden flex-grow hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <h3 className="text-xl md:text-2xl font-black tracking-tight mb-4 text-white uppercase drop-shadow-md">ЗАПУСК САЙТА</h3>
            <p className="text-blue-200/80 text-sm mb-6 pb-6 border-b border-blue-500/20 font-mono leading-relaxed">Запуск, размещение и техническое сопровождение сайта</p>
            
            <div className="mb-8">
               <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-2">ЗАПУСК РАЗОВО</div>
               <div className="text-4xl md:text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mb-6">3 990 ₽</div>
               <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-2">ОБСЛУЖИВАНИЕ</div>
               <div className="text-2xl md:text-3xl font-black text-blue-100">1 990 ₽ <span className="text-sm font-medium text-blue-300">/ МЕС</span></div>
            </div>

            <div className="bg-blue-900/40 backdrop-blur-sm p-4 border border-blue-500/30 mb-8 text-sm text-blue-50 font-bold font-mono text-center shadow-inner">
              Оплата после согласования сайта!
            </div>
            
            <h4 className="text-sm font-bold text-blue-400 mb-5 uppercase tracking-widest font-mono">Внутри этого пакета:</h4>
            <ul className="space-y-4 mb-10 flex-grow">
              {['домен', 'хостинг', 'SSL-сертификат', 'публикация сайта', 'подключение форм заявок', 'техподдержка', 'резервное копирование', 'защита от поломок', 'мелкие правки', 'контроль оплаты и продления'].map((f, j) => (
                <li key={j} className="flex gap-3 text-sm font-medium text-blue-100/90 items-center">
                  <div className="w-1.5 h-1.5 rounded-none bg-blue-500 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.6)]" /> {f}
                </li>
              ))}
            </ul>
            
            <button className="w-full border border-blue-400/50 bg-blue-600 text-white text-[11px] uppercase tracking-[0.2em] py-4 px-4 clip-diagonal hover:bg-white hover:text-blue-600 hover:border-white transition-all duration-500 font-black shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] mt-auto" onClick={() => window.open('https://t.me/onyxwebsites_bot', '_blank')}>
              Оплатить
            </button>
          </div>
        </div>
      </div>

      <div className="mb-10 lg:mb-12 scroll-mt-24" id="services">
        <h3 className="text-3xl md:text-4xl font-black uppercase text-white tracking-tight drop-shadow-md">Дополнительные опции</h3>
      </div>
      
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 relative z-10">
        <div className="bg-onyx-900/60 backdrop-blur-sm border border-onyx-800 p-8 flex flex-col hover:border-blue-500/40 transition-all duration-500 group clip-diagonal relative overflow-hidden hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(59,130,246,0.1)]">
          <h4 className="font-black uppercase tracking-tight text-xl mb-4 min-h-[56px] text-neutral-200 group-hover:text-white transition-colors">Дополнительные страницы</h4>
          <div className="text-2xl font-black tracking-tight mb-4 text-blue-500 group-hover:text-blue-400 transition-colors drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]">от 1 500 ₽</div>
          <p className="text-sm text-neutral-400 mb-8 flex-grow leading-relaxed group-hover:text-neutral-300 transition-colors">Разработка и добавление дополнительных страниц к вашему сайту (цена за одну страницу).</p>
          <button className="w-full border border-onyx-700 bg-onyx-800 text-white text-[11px] uppercase tracking-[0.2em] py-4 px-4 clip-diagonal hover:border-blue-500 hover:bg-blue-500/20 transition-all duration-500 font-black group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]" onClick={() => window.open('https://t.me/onyxwebsites_bot', '_blank')}>
            Оплатить
          </button>
        </div>
        
        {addons.map((a, i) => (
          <div key={i} className="bg-onyx-900/60 backdrop-blur-sm border border-onyx-800 p-8 flex flex-col hover:border-blue-500/40 transition-all duration-500 group clip-diagonal relative overflow-hidden hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(59,130,246,0.1)]">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 blur-[50px] pointer-events-none group-hover:bg-blue-400/10 transition-colors duration-500" />
            <h4 className="font-black uppercase tracking-tight text-xl mb-4 min-h-[56px] text-neutral-200 group-hover:text-white transition-colors">{a.title}</h4>
            <div className="text-2xl font-black tracking-tight mb-4 text-blue-500 group-hover:text-blue-400 transition-colors drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]">{a.price}</div>
            <p className="text-sm text-neutral-400 mb-8 flex-grow leading-relaxed group-hover:text-neutral-300 transition-colors">{a.desc}</p>
            <button 
              className="w-full border border-onyx-700 bg-onyx-800 text-white text-[11px] uppercase tracking-[0.2em] py-4 px-4 clip-diagonal hover:border-blue-500 hover:bg-blue-500/20 transition-all duration-500 font-black group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
              onClick={() => window.open('https://t.me/onyxwebsites_bot', '_blank')}
            >
              {a.action}
            </button>
          </div>
        ))}
      </div>
    </Container>
  );
}
