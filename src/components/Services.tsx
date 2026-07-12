import React from 'react';
import { Container, SectionTitle } from './ui';
import { TechNodesEffect } from './BackgroundEffects';
import { Check, Star } from 'lucide-react';

const plans = [
  {
    name: 'Старт онлайн',
    subtitle: 'Для бизнеса, которому нужен быстрый и понятный сайт без затрат на разработку',
    prices: { dev: '0 ₽', launch: '5 990 ₽', support: '1 990 ₽/мес' },
    features: [
      'одностраничный сайт для бизнеса',
      'адаптация под телефон, планшет и компьютер',
      'главный экран с оффером',
      'блок услуг или товаров',
      'блок «О компании»',
      'блок преимуществ',
      'контакты и кнопки связи',
      'простая форма заявки',
      'базовая структура для продвижения',
      'подключение домена',
      'размещение сайта на хостинге',
      'SSL-сертификат',
      'публикация сайта',
      'базовая техническая настройка',
      'резервное копирование',
      'контроль работы сайта',
      'мелкие технические правки',
      'поддержка после запуска'
    ],
    forWho: [
      'экспертам', 'мастерам', 'салонам красоты', 'небольшим локальным компаниям', 'начинающим проектам', 'бизнесу, которому нужен быстрый выход в интернет'
    ],
    problem: 'У бизнеса появляется сайт, который можно отправлять клиентам, размещать в соцсетях, добавлять в карты, указывать в рекламе и использовать как официальную точку доверия.',
    benefit: 'Бизнес получает сайт без оплаты разработки и без необходимости разбираться в доменах, хостинге и техническом запуске.'
  },
  {
    name: 'Сайт + заявки',
    badge: 'Оптимальный выбор',
    subtitle: 'Для бизнеса, которому нужен не просто сайт, а обращения от клиентов',
    prices: { dev: '0 ₽', launch: '8 900 ₽', support: '2 590 ₽/мес' },
    features: [
      'всё из тарифа «Старт онлайн»',
      'усиленная структура сайта под заявки',
      'доработка первого экрана и оффера',
      'блок доверия: отзывы, гарантии, кейсы или преимущества',
      'блок FAQ для закрытия возражений',
      'Telegram-уведомления о новых заявках',
      'подключение Яндекс Метрики',
      'базовая настройка целей',
      'подключение карты или геосервиса',
      'проверка работы формы заявки',
      '3 правки в месяц',
      'ежемесячная проверка сайта',
      'рекомендации по улучшению сайта'
    ],
    forWho: [
      'клиникам и стоматологиям', 'фитнес-клубам', 'салонам красоты', 'ремонтным и строительным компаниям', 'юридическим услугам', 'B2B-компаниям', 'локальному бизнесу, которому важны заявки'
    ],
    problem: 'Сайт не просто существует в интернете, а помогает клиентам быстро понять предложение, довериться компании и оставить заявку.',
    benefit: 'Бизнес получает сайт, заявки с которого приходят туда, где удобно их быстро обработать: на почту или в Telegram.'
  },
  {
    name: 'Сайт как система продаж',
    subtitle: 'Для бизнеса, которому нужен сайт, заявки, аналитика и контроль обработки клиентов',
    prices: { dev: '0 ₽', launch: 'от 19 900 ₽', support: 'от 3 590 ₽/мес' },
    features: [
      'всё из тарифа «Сайт + заявки»',
      'расширенная структура сайта',
      'дополнительные продающие блоки',
      'CRM-интеграция или таблица заявок',
      'онлайн-запись или калькулятор стоимости на выбор',
      'расширенная аналитика',
      'настройка целей и событий',
      'улучшенная логика заявок',
      'до 3 небольших правок в месяц',
      'приоритетная поддержка',
      'ежемесячные рекомендации по развитию сайта',
      'подготовка сайта к рекламе и продвижению'
    ],
    forWho: [
      'бизнесу с высоким средним чеком', 'компаниям, которые запускают рекламу', 'клиникам, студиям, салонам и фитнес-клубам', 'ремонтным, строительным и сервисным компаниям', 'бизнесу, где важно не терять заявки', 'компаниям, которым нужна связка сайт + CRM + аналитика'
    ],
    problem: 'Сайт становится не просто страницей в интернете, а частью системы продаж: принимает заявки, передаёт их в удобный канал, помогает отслеживать обращения и улучшать результат.',
    benefit: 'Бизнес получает не только сайт, а управляемый канал привлечения и обработки клиентов.'
  }
];

const addons = [
  { title: 'Дополнительные страницы', price: 'от 2 500 ₽ за страницу', desc: 'Отдельная страница под услугу, направление, акцию, портфолио, отзывы, команду или контакты.', benefit: 'помогает подробнее раскрыть предложения компании и вести клиентов на конкретную страницу под их запрос.' },
  { title: 'Каталог товаров и услуг', price: 'от 7 900 ₽', desc: 'Раздел с товарами или услугами: категории, карточки, описания, цены и кнопки заявки.', benefit: 'помогает показать ассортимент или перечень услуг понятно и структурно.' },
  { title: 'CRM-интеграция', price: 'от 7 900 ₽', desc: 'Передача заявок с сайта в CRM или таблицу заявок. Входит в тариф «Сайт как система продаж».', benefit: 'заявки не теряются, а попадают в систему, где их можно контролировать.' },
  { title: 'Корзина', price: 'от 9 900 ₽', desc: 'Выбор товаров или услуг и оформление заказа на сайте.', benefit: 'клиент может не просто оставить заявку, а собрать заказ и отправить его бизнесу.' },
  { title: 'Подключение карт и геосервисов', price: 'от 2 900 ₽', desc: 'Интерактивная карта, маршрут, геолокация и удобный блок контактов. Входит в тарифы с заявками.', benefit: 'клиент быстрее понимает, где находится компания и как до неё добраться.' },
  { title: 'Калькулятор стоимости', price: 'от 6 990 ₽', desc: 'Интерактивный расчёт стоимости услуги прямо на сайте.', benefit: 'клиент получает ориентир по цене, а бизнес получает более тёплую заявку.' },
  { title: 'Политика и документы', price: 'от 2 900 ₽', desc: 'Политика обработки данных, согласие для форм и базовые документы.', benefit: 'сайт становится более прозрачным и подготовленным к сбору заявок.' },
  { title: 'Индивидуальный дизайн', price: 'от 15 000 ₽', desc: 'Уникальная визуальная концепция сайта под бренд, нишу и желаемое впечатление.', benefit: 'сайт перестаёт выглядеть как стандартный шаблон и лучше передаёт уровень компании.' },
  { title: 'SMM ONYX', price: 'от 50 000 ₽/мес', desc: 'Ведение соцсетей и контента для бизнеса под ключ.', benefit: 'помогает бизнесу получать больше касаний с аудиторией и вести клиентов на сайт.' },
  { title: 'Настройка аналитики', price: 'от 3 990 ₽', desc: 'Подключение Яндекс Метрики или Google Analytics. Входит в старшие тарифы.', benefit: 'владелец видит посещения, источники и действия клиентов.' },
  { title: 'Онлайн-запись', price: 'от 6 990 ₽', desc: 'Запись через форму или сторонний сервис.', benefit: 'клиент может записаться без лишней переписки, а бизнес быстрее получает готовое обращение.' },
  { title: 'Telegram-уведомления', price: 'от 3 990 ₽', desc: 'Новые заявки с сайта сразу приходят в Telegram. Входит в старшие тарифы.', benefit: 'заявки не лежат незамеченными в почте — владелец сразу видит новое обращение.' },
];

export default function Services() {
  return (
    <Container id="prices" className="relative overflow-hidden pt-20">
      <TechNodesEffect />
      <SectionTitle subtitle="Тарифы ONYX WEB">Выберите, какую задачу должен решить сайт</SectionTitle>

      <div className="max-w-4xl mx-auto mb-16 text-neutral-300 space-y-6">
        <p className="text-lg font-medium text-white text-center">
          Разработка сайта в ONYX стоит 0 ₽. Вы оплачиваете только запуск, сопровождение и функции, которые нужны вашему бизнесу.
        </p>
        
        <div className="bg-onyx-900/50 border border-onyx-800 p-8 clip-diagonal">
          <h4 className="font-bold text-white mb-4 text-xl">Что входит в ежемесячное сопровождение:</h4>
          <ul className="grid sm:grid-cols-2 gap-3 mb-6">
            {[
              'размещение сайта на хостинге',
              'контроль стабильной работы сайта',
              'поддержка формы заявки',
              'подключение и проверка мессенджеров',
              'мелкие правки по сайту в рамках тарифа',
              'помощь с техническими вопросами',
              'базовый контроль доступности сайта',
              'поддержка после запуска'
            ].map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <Check className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-blue-200 text-sm font-medium border-t border-onyx-800 pt-4">
            Смысл сопровождения простой: вы не остаётесь один на один с сайтом после запуска. ONYX отвечает за то, чтобы сайт работал, был доступен клиентам и помогал бизнесу принимать заявки.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 relative z-10 mb-32 items-start">
        {plans.map((plan, i) => (
          <div key={i} className={`flex flex-col bg-onyx-900/80 backdrop-blur-md border ${plan.badge ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.15)] transform lg:-translate-y-4' : 'border-onyx-800'} hover:border-blue-500/50 transition-all duration-500 p-8 clip-diagonal relative group h-full`}>
            {plan.badge && (
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-1 flex items-center gap-1">
                <Star className="w-3 h-3 fill-white" /> {plan.badge}
              </div>
            )}
            
            <h3 className="text-2xl font-black tracking-tight mb-2 text-white uppercase">{plan.name}</h3>
            <p className="text-neutral-400 text-sm mb-6 h-10">{plan.subtitle}</p>
            
            <div className="space-y-2 mb-8 pb-8 border-b border-onyx-800">
              <div className="flex justify-between items-end">
                <span className="text-sm text-neutral-400">Разработка</span>
                <span className="text-xl font-black text-white">{plan.prices.dev}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-sm text-neutral-400">Запуск</span>
                <span className="text-xl font-black text-blue-400">{plan.prices.launch}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-sm text-neutral-400">Сопровождение</span>
                <span className="text-lg font-bold text-blue-200">{plan.prices.support}</span>
              </div>
            </div>

            <div className="flex-grow space-y-6">
              <div>
                <h4 className="text-xs font-bold text-blue-500 mb-3 uppercase tracking-widest">Что входит:</h4>
                <ul className="space-y-2">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex gap-2 text-xs text-neutral-300">
                      <div className="w-1 h-1 rounded-full bg-blue-500 shrink-0 mt-1.5" /> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-neutral-500 mb-3 uppercase tracking-widest">Кому подойдёт:</h4>
                <div className="flex flex-wrap gap-1">
                  {plan.forWho.map((w, j) => (
                    <span key={j} className="text-[10px] bg-onyx-800 px-2 py-1 text-neutral-400 rounded-sm uppercase tracking-wider">{w}</span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-neutral-500 mb-2 uppercase tracking-widest">Какую проблему решает:</h4>
                <p className="text-xs text-neutral-400">{plan.problem}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-blue-400 mb-2 uppercase tracking-widest">Главная выгода:</h4>
                <p className="text-xs text-blue-100/80 font-medium">{plan.benefit}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-onyx-800">
              <button className={`w-full py-4 text-xs font-black uppercase tracking-[0.2em] clip-diagonal transition-colors ${plan.badge ? 'bg-blue-600 text-white hover:bg-white hover:text-blue-600' : 'bg-onyx-800 text-white border border-onyx-700 hover:border-blue-500 hover:bg-blue-900/50'}`} onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth'})}>
                Выбрать тариф
              </button>
            </div>
          </div>
        ))}
      </div>

      <div id="addons" className="scroll-mt-24 mb-16">
        <SectionTitle subtitle="Дополнительные опции">
          Усильте сайт только теми функциями, которые действительно нужны вашему бизнесу.
        </SectionTitle>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10 pb-20">
        {addons.map((a, i) => (
          <div key={i} className="bg-onyx-900/60 backdrop-blur-sm border border-onyx-800 p-6 flex flex-col hover:border-blue-500/40 transition-all duration-300 group clip-diagonal">
            <h4 className="font-bold text-white mb-2 text-base leading-tight min-h-[40px]">{a.title}</h4>
            <div className="text-lg font-black text-blue-400 mb-4">{a.price}</div>
            <div className="text-xs text-neutral-400 mb-4 space-y-2 flex-grow">
              <p><span className="text-neutral-300 font-semibold">Что это:</span> {a.desc}</p>
              <p><span className="text-neutral-300 font-semibold">Польза:</span> {a.benefit}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
