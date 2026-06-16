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
    <Container id="pricing">
      <SectionTitle subtitle="Наши продукты">Тарифы и<br/>Услуги</SectionTitle>
      
      <div className="mb-8 font-mono text-neutral-500 uppercase tracking-widest text-sm border-b border-onyx-800 pb-2">
        Сайты по подписке (Месяц)
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mb-24">
        {products.map((p, i) => (
          <div key={i} className="flex flex-col bg-onyx-800/50 border border-onyx-700 hover:border-white transition-colors p-8 clip-diagonal group">
            <h3 className="text-2xl font-bold uppercase tracking-widest mb-2">{p.title}</h3>
            <p className="text-neutral-400 text-sm mb-6 pb-6 border-b border-onyx-700">{p.desc}</p>
            <div className="mb-8">
              <span className="text-5xl font-bold tracking-tighter">{p.price}</span>
              <span className="text-neutral-500 font-mono text-sm">/мес</span>
            </div>
            <ul className="space-y-4 mb-12 flex-grow">
              {p.features.map((f, j) => (
                <li key={j} className="flex gap-4 text-sm font-sans text-neutral-300">
                  <span className="text-white">+</span> {f}
                </li>
              ))}
            </ul>
            <Button className="w-full">Оплатить</Button>
          </div>
        ))}
      </div>

      <div className="mb-8 font-mono text-neutral-500 uppercase tracking-widest text-sm border-b border-onyx-800 pb-2">
        Дополнительные опции (Разово / Услуги)
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {addons.map((a, i) => (
          <div key={i} className="bg-onyx-900 border border-onyx-800 p-6 flex flex-col hover:bg-onyx-800 transition-colors">
            <h4 className="font-bold uppercase tracking-widest mb-2 min-h-[48px]">{a.title}</h4>
            <div className="text-xl font-bold tracking-tighter mb-4 text-white">{a.price}</div>
            <p className="text-xs text-neutral-500 mb-6 flex-grow">{a.desc}</p>
            {a.action === 'Подробнее' ? (
              <Button variant="outline" className="w-full text-xs py-3">{a.action}</Button>
            ) : (
              <Button variant="ghost" className="w-full text-xs py-3 border border-onyx-700">{a.action}</Button>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
}
