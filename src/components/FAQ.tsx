import React, { useState } from 'react';
import { Container, SectionTitle } from './ui';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: "Почему разработка сайта бесплатная?", a: "Мы используем передовые технологии и собственную библиотеку готовых решений. Наша бизнес-модель строится на предоставлении качественной инфраструктуры, поэтому дизайн и разработку мы берем на себя, бесплатно." },
  { q: "За что я плачу?", a: "Вы оплачиваете запуск и размещение сайта (3 990 ₽ разово), куда уже входит домен, SSL, настройка форм и хостинг, а далее обслуживание и техподдержку — 1 990 ₽ в месяц. Оплата производится только после согласования готового сайта!" },
  { q: "Сколько времени занимает запуск?", a: "В среднем от 2 до 4 дней в зависимости от сложности проекта после заполнения брифа." },
  { q: "Можно ли подключить онлайн-оплату или CRM?", a: "Да. Мы можем подключить корзину, систему бронирования, онлайн-оплату и интеграцию с CRM (amoCRM, Битрикс24) в качестве дополнительного функционала. Подключается за разовую оплату и работает навсегда." },
  { q: "Будет ли сайт отображаться на смартфонах?", a: "Да, абсолютно все наши проекты имеют 100% адаптацию под мобильные устройства, планшеты и огромные экраны мониторов." },
  { q: "Что делать, если у меня нет контента (текстов, фото)?", a: "Мы поможем составить структуру, напишем продающие тексты и подберем качественные стоковые изображения для запуска проекта." },
  { q: "Как происходят корректировки сайта?", a: "В рамках инфраструктурной подписки у вас есть техническая поддержка. Вы просто пишете вашему личному специалисту, и мы вносим необходимые изменения." },
  { q: "Куда приходят заявки и оплаты?", a: "Все заявки клиентов приходят моментально к вам в Telegram или CRM. Денежные средства с оплат поступают напрямую на ваш расчетный счет, мы к ним доступа не имеем." },
  { q: "Кому принадлежит сайт?", a: "Сайт и доменное имя полностью принадлежат вам." }
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Container id="faq" className="border-t border-onyx-700 bg-onyx-950  relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="grid lg:grid-cols-2 gap-16 relative z-10">
        <div>
          <SectionTitle subtitle="Вопросы">FAQ</SectionTitle>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className={`border clip-diagonal ${open === i ? 'border-blue-500 bg-onyx-900 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'border-onyx-700 bg-onyx-800/30 hover:border-blue-400/50 hover:bg-onyx-800/80'} overflow-hidden transition-all duration-300`}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className={`w-full flex items-center justify-between p-6 text-left font-bold uppercase tracking-wide transition-colors ${open === i ? 'text-blue-500 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]' : 'text-neutral-300 group-hover:text-white'}`}
              >
                {faq.q}
                <ChevronDown size={24} className={`transform transition-transform ${open === i ? 'rotate-180 text-blue-500 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]' : 'text-blue-300'}`} />
              </button>
              {open === i && (
                <div className="p-6 pt-0 text-neutral-200 font-sans text-base md:text-lg leading-relaxed border-t border-blue-500/20 mt-2 mx-6 pb-6 relative before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-blue-600/50 before:to-transparent pl-4 shadow-[inset_4px_0_15px_rgba(59,130,246,0.05)]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
