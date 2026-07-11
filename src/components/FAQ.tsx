import React, { useState } from 'react';
import { Container, SectionTitle } from './ui';
import { ChevronDown, MessageCircle } from 'lucide-react';

const faqs = [
    {
      q: "А что если сайт не принесет заявки и не окупится?",
      a: "Мы внедряем только проверенные структуры, которые уже работают у других медицинских клиник. Если в течение первого месяца конверсия ниже нормы, мы бесплатно перерабатываем логику и смыслы до достижения результата."
    },
    {
      q: "Сколько времени занимает запуск сайта?",
      a: "В среднем процесс занимает от 5 до 14 дней, так как мы используем уже спроектированные и протестированные решения, адаптируя их под вашу клинику."
    },
    {
      q: "Мне нужно будет самому писать тексты и искать фотографии?",
      a: "Нет, мы предоставляем услугу под ключ. Наша команда копирайтеров напишет продающие тексты на основе брифа, а при необходимости мы организуем подбор качественного визуального контента."
    },
    {
      q: "Возможна ли интеграция с нашей системой онлайн-записи (например, Yclients)?",
      a: "Да, мы без проблем интегрируем любые популярные системы онлайн-записи, а также связываем формы захвата с вашей CRM и настраиваем уведомления в Telegram."
    }
  ];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Container id="faq" className="border-t border-onyx-800 bg-onyx-950 py-16 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">
        <div className="lg:col-span-5">
          <SectionTitle subtitle="Ответы" className="!mb-8 text-left">
            Частые <br className="hidden lg:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">вопросы</span>
          </SectionTitle>
          
          <div className="bg-onyx-900 border border-blue-500/30 p-8 clip-diagonal relative group">
             <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <MessageCircle className="w-10 h-10 text-blue-500 mb-6" />
             <h4 className="text-xl font-bold uppercase tracking-tight text-white mb-3">Мы всегда на связи</h4>
             <p className="text-neutral-400 font-sans leading-relaxed">
               Отвечаем в течение <span className="text-blue-400 font-bold">10 минут</span> даже в выходные дни. Если у вас возник срочный вопрос или нужно быстро внести правку на сайт — мы поможем.
             </p>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className={`border clip-diagonal ${open === i ? "border-blue-500/80 bg-onyx-900/80 shadow-[0_10px_30px_rgba(59,130,246,0.15)]" : "border-onyx-800/80 bg-onyx-900/30 hover:border-blue-500/40 hover:bg-onyx-900/60"} overflow-hidden transition-all duration-500 backdrop-blur-sm group`}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className={`w-full flex items-center justify-between p-6 text-left font-bold uppercase tracking-wide transition-colors duration-300 ${open === i ? "text-white drop-shadow-sm" : "text-neutral-300 group-hover:text-blue-50"}`}
              >
                {faq.q}
                <ChevronDown size={24} className={`transform transition-transform duration-500 ${open === i ? "rotate-180 text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" : "text-onyx-600 group-hover:text-blue-400"}`} />
              </button>
              {open === i && (
                <div className="p-6 pt-0 text-neutral-300 font-sans text-base md:text-lg leading-relaxed border-t border-onyx-800 mt-2 mx-6 pb-6 relative before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-blue-500 before:to-transparent pl-5 shadow-[inset_10px_0_20px_rgba(59,130,246,0.02)]">
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
