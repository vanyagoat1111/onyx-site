import React from 'react';
import { Container, SectionTitle, Button } from './ui';

const products = [
  {
    type: 'monthly',
    title: 'Лендинг',
    price: '1990р',
    desc: 'Для рекламы и отдельных предложений. Одностраничный сайт визитка.',
    features: ['Разработка', 'Хостинг', 'Домен', 'Адаптация под мобильные', 'Ссылки на ваши соцсети', 'Техническое обслуживание']
  },
  {
    type: 'monthly',
    title: 'Корпоративный',
    price: '2990р',
    desc: 'Полноценное представительство для компаний и услуг.',
    features: ['Разработка', 'Хостинг', 'Домен', 'Формы захвата', 'Адаптация под мобильные', 'Техническое обслуживание']
  },
  {
    type: 'monthly',
    title: 'Интернет-Магазин',
    price: '6990р',
    desc: 'Мощная платформа электронной коммерции.',
    features: ['Каталог товаров', 'Формы', 'Онлайн оплата', 'Домен', 'Хостинг', 'Техническое обслуживание']
  }
];

const addons = [
  {
    title: 'Корзина и онлайн-продажи',
    price: '13 990р',
    desc: 'Добавим на сайт корзину и оформление заказов.',
    features: ['Товары в корзину', 'Оформление заказа', 'Онлайн-оплата', 'Уведомления', 'Интеграция с CRM'],
    action: 'Оплатить'
  },
  {
    title: 'Подключение оплаты',
    price: '5 990р',
    desc: 'Через ЮKassa, Т-Банк или CloudPayments.',
    features: ['Регистрация эквайринга', 'Настройка сайта', 'Тестовый платеж', 'Проверка работы'],
    action: 'Оплатить'
  },
  {
    title: 'Подключение CRM',
    price: '9 990р',
    desc: 'Битрикс24, amoCRM. Клиент -> Сайт -> CRM -> Менеджер.',
    features: ['Автоматическое попадание лидов'],
    action: 'Оплатить'
  },
  {
    title: 'Индивидуальный Дизайн',
    price: 'от 15 000р',
    desc: 'Разработка уникального дизайна по вашему промпту.',
    features: ['Кастомный подход', 'Уникальная графика'],
    action: 'Оплатить'
  },
  {
    title: 'SMM ONYX',
    price: 'от 50 000р / мес',
    desc: 'Ведение вашего бизнеса под ключ в ONYX SMM.',
    features: ['Reels', 'Stories', 'Телеграмм канал', 'MAX', 'VK'],
    action: 'Подробнее',
    href: '#'
  },
  {
    title: 'Настройка Аналитики',
    price: '3 990р',
    desc: 'Яндекс Метрика, Google Analytics.',
    features: ['Посещаемость', 'Источники трафика', 'Заявки', 'Конверсии'],
    action: 'Оплатить'
  },
  {
    title: 'Онлайн Запись',
    price: '6 990р',
    desc: 'Для стоматологий, фитнес-клубов, салонов, мед.центров. Подключаются сторонние сервисы записи.',
    features: ['Форма записи на сайте', 'Календарь бронирования'],
    action: 'Оплатить'
  },
  {
    title: 'Telegram Уведомления',
    price: '3 990р',
    desc: 'Новые заявки сразу приходят в Telegram владельца.',
    features: ['Мгновенный контроль лидов'],
    action: 'Оплатить'
  }
];

export default function Services() {
  return (
    <Container id="services">
      <SectionTitle subtitle="Наши продукты">Тарифы и<br/>Услуги</SectionTitle>
      
      <div className="mb-8 font-mono text-blue-500 uppercase tracking-widest text-sm border-b border-blue-500/30 pb-2 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] ">
        Сайты по подписке (Месяц)
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mb-24 relative z-10 p-4 -m-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent pointer-events-none -z-10 blur-3xl" />
        {products.map((p, i) => (
          <div key={i} className="flex flex-col bg-onyx-900 border border-onyx-700 hover:border-blue-500 transition-all duration-500 p-10 clip-diagonal group shadow-2xl hover:shadow-[0_0_50px_rgba(59,130,246,0.3)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-black tracking-tight mb-4 group-hover:text-white text-neutral-200 transition-colors uppercase break-words hyphens-auto">{p.title}</h3>
            <p className="text-neutral-300 text-base mb-8 pb-8 border-b border-onyx-700 group-hover:border-blue-500/50 transition-colors font-mono leading-relaxed">{p.desc}</p>
            <div className="mb-10 block relative">
              <div className="absolute -inset-4 bg-blue-500/20 blur-xl rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-4xl md:text-5xl font-black tracking-tight text-blue-500 group-hover:text-blue-400 transition-all drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] relative z-10">{p.price}</span>
              <span className="text-blue-500 font-mono text-sm uppercase tracking-[0.2em] ml-3 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)] relative z-10">/мес</span>
            </div>
            <ul className="space-y-4 mb-12 flex-grow">
              {p.features.map((f, j) => (
                <li key={j} className="flex gap-4 text-base font-medium text-neutral-200 group-hover:text-white transition-colors items-center">
                  <div className="w-2 h-2 rounded-none bg-blue-400 shadow-[0_0_10px_rgba(147,197,253,0.3)] shrink-0 mt-1" /> {f}
                </li>
              ))}
            </ul>
            <button className="w-full relative px-6 py-4 bg-blue-600 text-onyx-950 font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs clip-diagonal hover:bg-white hover:text-onyx-950 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] group/btn z-10 overflow-hidden">
              Выбрать тариф
              <div className="absolute inset-0 bg-white/40 blur-md opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
            </button>
          </div>
        ))}
      </div>

      <div className="mb-12 font-mono text-blue-300 uppercase tracking-widest text-sm border-b border-blue-400/30 pb-4 inline-flex items-center gap-4 drop-shadow-[0_0_8px_rgba(147,197,253,0.8)] ">
        <div className="w-2 h-2 bg-blue-400 shadow-[0_0_10px_rgba(147,197,253,0.3)]" />
        Дополнительные опции (Разово / Услуги)
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {addons.map((a, i) => (
          <div key={i} className="bg-onyx-900 border border-onyx-600 p-8 flex flex-col hover:bg-onyx-800 hover:border-blue-400/50 transition-all group hover:shadow-[0_0_30px_rgba(147,197,253,0.2)] clip-diagonal relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 blur-[50px] pointer-events-none group-hover:bg-blue-400/20 transition-colors" />
            <h4 className="font-black uppercase tracking-tight text-xl mb-3 min-h-[56px] text-neutral-200 group-hover:text-white transition-colors">{a.title}</h4>
            <div className="text-2xl font-black tracking-tight mb-4 text-blue-500 group-hover:text-blue-300 transition-colors drop-shadow-[0_0_5px_rgba(59,130,246,0.5)] group-hover:drop-shadow-[0_0_5px_rgba(147,197,253,0.5)]">{a.price}</div>
            <p className="text-sm text-neutral-300 mb-8 flex-grow leading-relaxed group-hover:text-white transition-colors">{a.desc}</p>
            <button className="w-full border border-onyx-600 bg-onyx-800 text-white text-[10px] uppercase tracking-[0.2em] py-3 px-4 clip-diagonal group-hover:border-blue-400 group-hover:bg-blue-400/20 group-hover:text-white transition-all font-black group-hover:shadow-[0_0_15px_rgba(147,197,253,0.3)]">
              {a.action}
            </button>
          </div>
        ))}
      </div>
    </Container>
  );
}
