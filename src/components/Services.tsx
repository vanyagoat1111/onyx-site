import React from 'react';
import { Container, SectionTitle, Reveal } from './ui';
import { Check, Star, ShieldCheck } from 'lucide-react';
import LaunchEconomics from './LaunchEconomics';

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
    forWho: ['экспертам', 'мастерам', 'салонам красоты', 'небольшим локальным компаниям', 'начинающим проектам', 'бизнесу, которому нужен быстрый выход в интернет'],
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
    forWho: ['клиникам и стоматологиям', 'фитнес-клубам', 'салонам красоты', 'ремонтным и строительным компаниям', 'юридическим услугам', 'B2B-компаниям', 'локальному бизнесу, которому важны заявки'],
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
    forWho: ['бизнесу с высоким средним чеком', 'компаниям, которые запускают рекламу', 'клиникам, студиям, салонам и фитнес-клубам', 'ремонтным, строительным и сервисным компаниям', 'бизнесу, где важно не терять заявки', 'компаниям, которым нужна связка сайт + CRM + аналитика'],
    problem: 'Сайт становится не просто страницей в интернете, а частью системы продаж: принимает заявки, передаёт их в удобный канал, помогает отслеживать обращения и улучшать результат.',
    benefit: 'Бизнес получает не только сайт, а управляемый канал привлечения и обработки клиентов.'
  }
];

const support = [
  'размещение сайта на хостинге',
  'контроль стабильной работы сайта',
  'поддержка формы заявки',
  'подключение и проверка мессенджеров',
  'мелкие правки по сайту в рамках тарифа',
  'помощь с техническими вопросами',
  'базовый контроль доступности сайта',
  'поддержка после запуска'
];

const addons = [
  { title: 'Дополнительные страницы', price: 'от 2 500 ₽', unit: 'за страницу', desc: 'Отдельная страница под услугу, направление, акцию, портфолио, отзывы, команду или контакты.', benefit: 'Подробнее раскрывает предложения компании и ведёт клиентов на страницу под их запрос.' },
  { title: 'Каталог товаров и услуг', price: 'от 7 900 ₽', desc: 'Раздел с товарами или услугами: категории, карточки, описания, цены и кнопки заявки.', benefit: 'Показывает ассортимент или перечень услуг понятно и структурно.' },
  { title: 'CRM-интеграция', price: 'от 7 900 ₽', desc: 'Передача заявок с сайта в CRM или таблицу заявок.', benefit: 'Заявки не теряются, а попадают в систему, где их можно контролировать.', included: 'Входит в тариф «Сайт как система продаж»' },
  { title: 'Корзина', price: 'от 9 900 ₽', desc: 'Выбор товаров или услуг и оформление заказа на сайте.', benefit: 'Клиент может собрать заказ и отправить его бизнесу, а не просто оставить заявку.' },
  { title: 'Подключение карт и геосервисов', price: 'от 2 900 ₽', desc: 'Интерактивная карта, маршрут, геолокация и удобный блок контактов.', benefit: 'Клиент быстрее понимает, где находится компания и как до неё добраться.', included: 'Входит в тарифы «Сайт + заявки» и «Сайт как система продаж»' },
  { title: 'Калькулятор стоимости', price: 'от 6 990 ₽', desc: 'Интерактивный расчёт стоимости услуги прямо на сайте.', benefit: 'Клиент получает ориентир по цене, а бизнес — более тёплую заявку.' },
  { title: 'Политика конфиденциальности и документы', price: 'от 2 900 ₽', desc: 'Политика обработки персональных данных, согласие для форм заявок и базовые юридические документы.', benefit: 'Сайт становится более прозрачным и подготовленным к сбору заявок.' },
  { title: 'Индивидуальный дизайн', price: 'от 15 000 ₽', desc: 'Уникальная визуальная концепция сайта под бренд, нишу и желаемое впечатление.', benefit: 'Сайт перестаёт выглядеть как стандартный шаблон и лучше передаёт уровень компании.' },
  { title: 'SMM ONYX', price: 'от 50 000 ₽/мес', desc: 'Ведение соцсетей и контента для бизнеса под ключ.', benefit: 'Больше касаний с аудиторией, усиление доверия и переходы из соцсетей на сайт.' },
  { title: 'Настройка аналитики', price: 'от 3 990 ₽', desc: 'Подключение Яндекс Метрики или Google Analytics, настройка отслеживания посещений, кликов и заявок.', benefit: 'Владелец видит посещения, источники и действия клиентов.', included: 'Входит в тарифы «Сайт + заявки» и «Сайт как система продаж»' },
  { title: 'Онлайн-запись', price: 'от 6 990 ₽', desc: 'Запись через форму или сторонний сервис.', benefit: 'Клиент записывается без лишней переписки, а бизнес быстрее получает готовое обращение.' },
  { title: 'Telegram-уведомления', price: 'от 3 990 ₽', desc: 'Новые заявки с сайта сразу приходят в Telegram владельца или менеджера.', benefit: 'Заявки не лежат незамеченными в почте — владелец сразу видит обращение.', included: 'Входит в тарифы «Сайт + заявки» и «Сайт как система продаж»' },
];

export default function Services() {
  return (
    <Container id="prices" className="relative border-t border-white/[0.06] scroll-mt-20">
      <div className="absolute top-40 left-[-10%] w-[35vw] h-[35vw] rounded-full bg-cobalt/[0.05] blur-[130px] pointer-events-none" />

      <SectionTitle index="05" subtitle="Тарифы ONYX WEB" className="max-w-4xl relative z-10">
        Выберите, какую задачу должен решить сайт
      </SectionTitle>

      <Reveal className="relative z-10 max-w-3xl text-[15px] md:text-base font-body text-fog leading-relaxed mb-16">
        <p>
          Разработка сайта в ONYX стоит <span className="text-bone font-semibold">0 ₽</span>. Вы оплачиваете только запуск, сопровождение и функции, которые нужны вашему бизнесу.
        </p>
      </Reveal>

      {/* ── Plans ── */}
      <div className="grid lg:grid-cols-3 gap-6 lg:gap-7 items-stretch relative z-10 mb-16">
        {plans.map((plan, i) => (
          <Reveal key={i} delay={i * 0.1} className="h-full">
            <div className={`relative flex flex-col h-full rounded-[28px] border p-7 md:p-8 transition-all duration-500 ${plan.badge ? 'border-cobalt/60 bg-gradient-to-b from-cobalt/[0.1] to-ink-2/80 shadow-[0_0_70px_rgba(78,124,255,0.12)]' : 'border-white/[0.08] bg-ink-2/60 hover:border-white/20'}`}>
              {plan.badge && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-cobalt text-white text-[10px] font-mono tracking-[0.2em] uppercase px-4 py-1.5 whitespace-nowrap">
                  <Star className="w-3 h-3 fill-white" /> {plan.badge}
                </span>
              )}

              <h3 className="font-display font-semibold text-xl md:text-2xl text-white mb-2">{plan.name}</h3>
              <p className="text-[13px] font-body text-fog mb-7 leading-snug">{plan.subtitle}</p>

              <div className="rounded-2xl bg-ink/60 border border-white/[0.07] divide-y divide-white/[0.07] mb-7">
                {[
                  { k: 'Разработка', v: plan.prices.dev, hl: true },
                  { k: 'Запуск', v: plan.prices.launch },
                  { k: 'Сопровождение', v: plan.prices.support },
                ].map((r, j) => (
                  <div key={j} className="flex justify-between items-center px-5 py-3.5">
                    <span className="text-[13px] font-body text-fog">{r.k}</span>
                    <span className={`font-display font-semibold ${r.hl ? 'text-cobalt-soft text-xl' : 'text-bone text-base'}`}>{r.v}</span>
                  </div>
                ))}
              </div>

              <div className="flex-grow space-y-6">
                <div>
                  <h4 className="font-mono text-[10px] tracking-[0.25em] uppercase text-cobalt-soft mb-3">Что входит</h4>
                  <ul className="space-y-2">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex gap-2.5 text-[13px] font-body text-bone/80 leading-snug">
                        <Check className="w-3.5 h-3.5 text-cobalt-soft shrink-0 mt-0.5" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-mono text-[10px] tracking-[0.25em] uppercase text-fog mb-3">Кому подойдёт</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {plan.forWho.map((w, j) => (
                      <span key={j} className="text-[11px] font-body bg-white/[0.05] border border-white/[0.08] px-3 py-1 text-fog rounded-full">{w}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-mono text-[10px] tracking-[0.25em] uppercase text-danger-soft mb-2">Какую проблему решает</h4>
                  <p className="text-[13px] font-body text-fog leading-relaxed border-l-2 border-danger/50 pl-4">{plan.problem}</p>
                </div>

                <div>
                  <h4 className="font-mono text-[10px] tracking-[0.25em] uppercase text-success-soft mb-2">Главная выгода</h4>
                  <p className="text-[13px] font-body text-bone/85 leading-relaxed border-l-2 border-success/60 pl-4">
                    {plan.benefit}
                  </p>
                </div>
              </div>

              <button
                className={`mt-8 w-full rounded-full py-4 text-sm font-body font-semibold transition-all duration-300 ${plan.badge ? 'bg-cobalt text-white hover:bg-bone hover:text-ink' : 'bg-white/[0.06] text-bone border border-white/12 hover:border-cobalt hover:bg-cobalt/10'}`}
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Выбрать тариф
              </button>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ── Экономика запуска: 2 инфографики прямо под тарифами ── */}
      <LaunchEconomics />

      {/* ── Monthly support panel ── */}
      <Reveal>
        <div className="relative z-10 rounded-[28px] border border-white/[0.08] bg-ink-2/60 p-7 md:p-10 mb-24 grid lg:grid-cols-[auto_1fr] gap-8 items-start">
          <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:max-w-[220px]">
            <div className="w-12 h-12 rounded-2xl bg-cobalt/15 border border-cobalt/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-cobalt-soft" />
            </div>
            <h4 className="font-display font-medium text-lg text-bone leading-snug">Что входит в ежемесячное сопровождение</h4>
          </div>
          <div>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-6">
              {support.map((item, i) => (
                <li key={i} className="flex gap-3 items-start text-sm font-body text-bone/85">
                  <Check className="w-4 h-4 text-cobalt-soft shrink-0 mt-0.5" /> {item}
                </li>
              ))}
            </ul>
            <p className="text-[13px] font-body text-fog leading-relaxed border-t border-white/[0.08] pt-5">
              Смысл сопровождения простой: вы не остаётесь один на один с сайтом после запуска. ONYX отвечает за то, чтобы сайт работал, был доступен клиентам и помогал бизнесу принимать заявки.
            </p>
          </div>
        </div>
      </Reveal>

      {/* ── Addons ── */}
      <div id="addons" className="scroll-mt-28 relative z-10">
        <SectionTitle index="06" subtitle="Дополнительные опции" className="max-w-3xl">
          Усильте сайт только нужными функциями
        </SectionTitle>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {addons.map((a, i) => (
            <Reveal key={i} delay={(i % 4) * 0.06}>
              <div className="group h-full rounded-[22px] border border-white/[0.08] bg-ink-2/50 p-6 flex flex-col hover:border-cobalt/40 hover:bg-ink-2/90 transition-all duration-400 hover:-translate-y-1">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h4 className="font-body font-semibold text-[15px] text-white leading-tight">{a.title}</h4>
                  <span className="font-mono text-[10px] text-fog pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="text-[13px] font-body text-fog leading-relaxed mb-3">{a.desc}</p>
                <p className="text-[12px] font-body text-bone/70 leading-relaxed mb-4">
                  <span className="text-success-soft font-medium">Польза:</span> {a.benefit}
                </p>
                {a.included && (
                  <span className="inline-block self-start text-[10px] font-body text-cobalt-soft bg-cobalt/10 border border-cobalt/25 rounded-full px-2.5 py-1 mb-4">
                    {a.included}
                  </span>
                )}
                <div className="pt-4 border-t border-white/[0.07] mt-auto">
                  <span className="font-display font-semibold text-base text-cobalt-soft">{a.price}</span>
                  {a.unit && <span className="text-[11px] font-body text-fog ml-1.5">{a.unit}</span>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Container>
  );
}
