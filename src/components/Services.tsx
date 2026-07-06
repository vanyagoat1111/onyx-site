import React from 'react';
import { Container, SectionTitle } from './ui';

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
 <Container id="prices">
 <SectionTitle subtitle="Наши тарифы"><span className="whitespace-nowrap text-3xl sm:text-4xl md:text-5xl lg:text-7xl drop-shadow-md">Разработка за 0 ₽</span></SectionTitle>

 <div className="grid lg:grid-cols-3 gap-8 relative z-10 p-4 -m-4 mb-16">
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent pointer-events-none -z-10 blur-[100px]" />
 
 {/* Card 1: Стартовый сайт */}
 <div className="flex flex-col bg-transparent border border-carbon-lift rounded-lg/80 hover:border-blue-500/50 transition-all duration-700 p-8 md:p-10 clip-diagonal group shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] relative overflow-hidden lg:col-span-2 hover:-translate-y-1">
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
 
 <div className="bg-obsidian-canvas/50 p-6 border border-onyx-800 clip-diagonal relative overflow-hidden group/alert hover:border-blue-500/30 transition-colors">
 <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover/alert:opacity-100 transition-opacity" />
 <h4 className="text-lg font-bold text-red-400 mb-3 uppercase tracking-widest text-sm font-mono">Важно:</h4>
 <p className="text-sm text-neutral-400 group-hover/alert:text-neutral-300 transition-colors mb-2">Разработка сайта — бесплатно.</p>
 <p className="text-sm text-neutral-400 group-hover/alert:text-neutral-300 transition-colors mb-2">Домен, хостинг, подключение сайта и дополнительные функции оплачиваются отдельно.</p>
 <p className="text-sm font-bold text-white mt-4 drop-shadow-sm">Идеально, если вам нужен сайт без больших затрат на запуск.</p>
 </div>
 </div>
 </div>
 
 <div className="mt-auto pt-8 border-t border-carbon-lift">
 <button className="w-full md:w-auto relative px-10 py-5 bg-bone text-[#101010] text-sm hover:bg-chalk transition-colors rounded-sm group/btn z-10 overflow-hidden" onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth'})}>
 Получить сайт бесплатно
 <div className="hidden"></div>
 </button>
 </div>
 </div>

 {/* Column 2 for smaller cards */}
 <div className="flex flex-col gap-8 lg:col-span-1">
 {/* Card 2: Запуск сайта */}
 <div className="flex flex-col bg-bone rounded-lg p-8 md:p-10 relative overflow-hidden flex-grow group">
 <div className="hidden" />
 <h3 className="text-xl md:text-2xl tracking-heading mb-4 text-[#101010] uppercase">ЗАПУСК САЙТА</h3>
 <p className="text-graphite-mid text-body-sm mb-6 pb-6 border-b border-pale-stone font-sans leading-relaxed">Запуск, размещение и техническое сопровождение сайта</p>
 
 <div className="mb-8">
 <div className="text-caption font-mono text-[#101010] uppercase tracking-tight mb-2">ЗАПУСК РАЗОВО</div>
 <div className="text-4xl md:text-5xl text-[#101010] tracking-heading mb-6">3 990 ₽</div>
 <div className="text-caption font-mono text-[#101010] uppercase tracking-tight mb-2">ОБСЛУЖИВАНИЕ</div>
 <div className="text-2xl md:text-3xl text-[#101010]">1 990 ₽ <span className="text-sm text-graphite-mid">/ МЕС</span></div>
 </div>

 <div className="bg-transparent p-4 border border-pale-stone rounded-sm mb-8 text-sm text-[#101010] font-sans text-center">
 Оплата после согласования сайта!
 </div>
 
 <h4 className="text-caption font-mono text-[#101010] mb-5 uppercase tracking-caption">Внутри этого пакета:</h4>
 <ul className="space-y-4 mb-10 flex-grow">
 {['домен', 'хостинг', 'SSL-сертификат', 'публикация сайта', 'подключение форм заявок', 'техподдержка', 'резервное копирование', 'защита от поломок', 'мелкие правки', 'контроль оплаты и продления'].map((f, j) => (
 <li key={j} className="flex gap-3 text-body-sm text-[#101010] items-center">
 <div className="w-[6px] h-[6px] rounded-full bg-signal-orange shrink-0" /> {f}
 </li>
 ))}
 </ul>
 
 <button className="w-full border-none bg-carbon-lift text-bone text-body-sm py-3 px-4 rounded-sm transition-colors mt-auto" onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth'})}>
 Оплатить
 </button>
 </div>
 </div>
 </div>

 <div className="mb-10 lg:mb-12 scroll-mt-24" id="services">
 <h3 className="text-3xl md:text-4xl font-black uppercase text-white tracking-tight drop-shadow-md">Дополнительные опции</h3>
 </div>
 
 <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 relative z-10">
 <div className="bg-transparent border border-carbon-lift p-8 flex flex-col hover:border-ash-stroke transition-all rounded-lg">
 <h4 className="text-[20px] tracking-tight mb-4 min-h-[56px] text-bone">Дополнительные страницы</h4>
 <div className="text-2xl tracking-heading mb-4 text-bone">от 1 500 ₽</div>
 <p className="text-body-sm text-warm-granite mb-8 flex-grow leading-body">Разработка и добавление дополнительных страниц к вашему сайту (цена за одну страницу).</p>
 <button className="w-full bg-transparent text-bone border border-ash-stroke hover:border-bone py-3 px-4 rounded-sm transition-colors font-sans text-sm" onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth'})}>
 Оплатить
 </button>
 </div>
 
 {addons.map((a, i) => (
 <div key={i} className="bg-transparent border border-carbon-lift p-8 flex flex-col hover:border-ash-stroke transition-all rounded-lg">
 <div className="hidden" />
 <h4 className="text-[20px] tracking-tight mb-4 min-h-[56px] text-bone">{a.title}</h4>
 <div className="text-2xl tracking-heading mb-4 text-bone">{a.price}</div>
 <p className="text-body-sm text-warm-granite mb-8 flex-grow leading-body">{a.desc}</p>
 <button 
 className="w-full bg-transparent text-bone border border-ash-stroke hover:border-bone py-3 px-4 rounded-sm transition-colors font-sans text-sm"
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
