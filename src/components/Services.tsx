import React from 'react';
import { Container, SectionTitle, Button } from './ui';

const addons = [
  {
    title: 'Подключение оплаты',
    price: '5 990 ₽',
    desc: 'Через ЮKassa, Т-Банк или CloudPayments.',
    action: 'Оплатить'
  },
  {
    title: 'Подключение CRM',
    price: '9 990 ₽',
    desc: 'Битрикс24, amoCRM. Клиент -> Сайт -> CRM -> Менеджер.',
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
    action: 'Подробнее'
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
    <Container id="prices">
      <SectionTitle subtitle="Наши тарифы">Тарифы</SectionTitle>

      <div className="grid lg:grid-cols-3 gap-8 relative z-10 p-4 -m-4 mb-16">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent pointer-events-none -z-10 blur-3xl" />
        
        {/* Card 1: Стартовый сайт */}
        <div className="flex flex-col bg-onyx-900 border border-onyx-700 hover:border-blue-500 transition-all duration-500 p-8 md:p-10 clip-diagonal group shadow-2xl hover:shadow-[0_0_50px_rgba(59,130,246,0.3)] relative overflow-hidden lg:col-span-2">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
          
          <h3 className="text-xl md:text-2xl lg:text-3xl font-black tracking-tight mb-4 group-hover:text-white text-neutral-200 transition-colors uppercase">СТАРТОВЫЙ САЙТ</h3>
          <p className="text-neutral-300 text-base mb-8 pb-8 border-b border-onyx-700 group-hover:border-blue-500/50 transition-colors font-mono leading-relaxed">Быстрый сайт для бизнеса, который поможет рассказать о компании, показать услуги и принимать заявки от клиентов.</p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-bold text-blue-400 mb-4 uppercase tracking-widest text-sm font-mono">Что входит:</h4>
              <ul className="space-y-3">
                {['современный одностраничный сайт', 'адаптация под телефон, планшет и компьютер', 'главный экран с оффером', 'блок с услугами или товарами', 'блок «О компании»', 'преимущества бизнеса', 'форма заявки', 'кнопки связи: телефон, WhatsApp, Telegram', 'базовая структура для продвижения', 'публикация сайта после подключения домена и хостинга'].map((f, j) => (
                  <li key={j} className="flex gap-4 text-sm md:text-base font-medium text-neutral-200 group-hover:text-white transition-colors items-start">
                    <div className="w-2 h-2 rounded-none bg-blue-400 shadow-[0_0_10px_rgba(147,197,253,0.3)] shrink-0 mt-1.5" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-bold text-blue-400 mb-4 uppercase tracking-widest text-sm font-mono">Кому подходит:</h4>
                <ul className="grid grid-cols-1 gap-2">
                  {['экспертам', 'салонам красоты', 'стоматологиям и клиникам', 'фитнес-клубам', 'локальному бизнесу', 'студиям и агентствам', 'мастерам и специалистам', 'компаниям, которым нужен быстрый запуск в интернете'].map((f, j) => (
                    <li key={j} className="flex gap-4 text-sm font-medium text-neutral-300 group-hover:text-neutral-200 transition-colors items-center">
                      <div className="w-1.5 h-1.5 rounded-none bg-neutral-500 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-onyx-800/50 p-6 border border-onyx-700 clip-diagonal">
                <h4 className="text-lg font-bold text-red-400 mb-3 uppercase tracking-widest text-sm font-mono">Важно:</h4>
                <p className="text-sm text-neutral-300 mb-2">Разработка сайта — бесплатно.</p>
                <p className="text-sm text-neutral-300 mb-2">Домен, хостинг, подключение сайта и дополнительные функции оплачиваются отдельно.</p>
                <p className="text-sm text-neutral-300 font-bold text-white">Идеально, если вам нужен сайт без больших затрат на запуск.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-auto pt-8 border-t border-onyx-700">
            <button className="w-full md:w-auto relative px-8 py-5 bg-blue-600 text-onyx-950 font-black uppercase tracking-[0.2em] text-xs clip-diagonal hover:bg-white hover:text-onyx-950 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] group/btn z-10 overflow-hidden" onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth'})}>
              Получить сайт бесплатно
              <div className="absolute inset-0 bg-white/40 blur-md opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </div>

        {/* Column 2 for smaller cards */}
        <div className="flex flex-col gap-8 lg:col-span-1">
          {/* Card 2: Запуск сайта */}
          <div className="flex flex-col bg-[#1c2f63] border border-blue-500/30 hover:border-blue-400 transition-all duration-500 p-8 clip-diagonal group shadow-2xl hover:shadow-[0_0_30px_rgba(147,197,253,0.3)] relative overflow-hidden flex-grow">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <h3 className="text-xl font-black tracking-tight mb-4 text-white uppercase">ЗАПУСК САЙТА</h3>
            <p className="text-blue-200 text-sm mb-6 pb-6 border-b border-blue-500/30 font-mono leading-relaxed">Запуск, размещение и техническое сопровождение сайта</p>
            
            <div className="mb-6">
               <div className="text-sm font-mono text-blue-300 uppercase tracking-widest mb-1">ЗАПУСК РАЗОВО</div>
               <div className="text-4xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mb-4">3 990 ₽</div>
               <div className="text-sm font-mono text-blue-300 uppercase tracking-widest mb-1">ОБСЛУЖИВАНИЕ</div>
               <div className="text-2xl font-black text-blue-200">1 990 ₽ <span className="text-sm">/ МЕС</span></div>
            </div>

            <div className="bg-blue-900/30 p-4 border border-blue-500/20 mb-6 text-sm text-white font-bold font-mono text-center">
              Оплата после согласования сайта!
            </div>
            
            <h4 className="text-sm font-bold text-blue-300 mb-4 uppercase tracking-widest font-mono">Внутри этого пакета:</h4>
            <ul className="space-y-3 mb-8 flex-grow">
              {['домен', 'хостинг', 'SSL-сертификат', 'публикация сайта', 'подключение форм заявок', 'техподдержка', 'резервное копирование', 'защита от поломок', 'мелкие правки', 'контроль оплаты и продления'].map((f, j) => (
                <li key={j} className="flex gap-3 text-sm font-medium text-blue-100 items-center">
                  <div className="w-1.5 h-1.5 rounded-none bg-blue-400 shrink-0" /> {f}
                </li>
              ))}
            </ul>
            
            <button className="w-full border border-blue-400/50 bg-blue-500 text-white text-[10px] uppercase tracking-[0.2em] py-4 px-4 clip-diagonal hover:bg-white hover:text-blue-900 transition-all font-black shadow-[0_0_15px_rgba(59,130,246,0.5)] mt-auto" onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth'})}>
              Оплатить
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tight mb-8">Дополнительные опции</h3>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        <div className="bg-onyx-900 border border-onyx-700 p-6 flex flex-col hover:border-onyx-500 transition-all group clip-diagonal relative overflow-hidden">
          <h4 className="font-black uppercase tracking-tight text-lg mb-3 min-h-[56px] text-neutral-200 group-hover:text-white transition-colors">Дополнительные страницы</h4>
          <div className="text-xl font-black tracking-tight mb-3 text-blue-500 group-hover:text-blue-300 transition-colors drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">от 1 500 ₽</div>
          <p className="text-sm text-neutral-400 mb-6 flex-grow leading-relaxed group-hover:text-neutral-300 transition-colors">Разработка и добавление дополнительных страниц к вашему сайту (цена за одну страницу).</p>
          <button className="w-full border border-onyx-500/50 bg-onyx-800 text-white text-[10px] uppercase tracking-[0.2em] py-3 px-4 clip-diagonal hover:border-blue-400 hover:bg-blue-400/20 transition-all font-black" onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth'})}>
            Подробнее
          </button>
        </div>
        
        {addons.map((a, i) => (
          <div key={i} className="bg-onyx-900 border border-onyx-700 p-6 flex flex-col hover:border-blue-400/50 transition-all group hover:shadow-[0_0_30px_rgba(147,197,253,0.3)] clip-diagonal relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 blur-[50px] pointer-events-none group-hover:bg-blue-400/20 transition-colors" />
            <h4 className="font-black uppercase tracking-tight text-lg mb-3 min-h-[56px] text-neutral-200 group-hover:text-white transition-colors">{a.title}</h4>
            <div className="text-xl font-black tracking-tight mb-3 text-blue-500 group-hover:text-blue-300 transition-colors drop-shadow-[0_0_5px_rgba(59,130,246,0.5)] group-hover:drop-shadow-[0_0_5px_rgba(147,197,253,0.5)]">{a.price}</div>
            <p className="text-sm text-neutral-400 mb-6 flex-grow leading-relaxed group-hover:text-white transition-colors">{a.desc}</p>
            <button 
              className="w-full border border-onyx-500/50 bg-onyx-800 text-white text-[10px] uppercase tracking-[0.2em] py-3 px-4 clip-diagonal group-hover:border-blue-400 group-hover:bg-blue-400/20 group-hover:text-white transition-all font-black group-hover:shadow-[0_0_15px_rgba(147,197,253,0.3)]"
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth'})}
            >
              {a.action}
            </button>
          </div>
        ))}
      </div>
    </Container>
  );
}
