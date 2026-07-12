import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Section } from './Layout';
import { Check, Plus, Minus } from 'lucide-react';

export function Packages() {
  const packages = [
    {
      name: 'Classic',
      desc: 'Оптимальное решение для современных интерьеров. Качественная чистовая отделка по готовому проекту.',
      img: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80',
      features: [
        'Возведение перегородок',
        'Монтаж базовых инженерных систем',
        'Выравнивание поверхностей под маяк',
        'Укладка плитки и напольных покрытий',
        'Окраска стен / оклейка обоями',
        'Уборка после ремонта'
      ]
    },
    {
      name: 'Prestige',
      desc: 'Капитальный ремонт бизнес-класса с применением крупноформатного керамогранита и сложной электрики.',
      img: 'https://images.unsplash.com/photo-1600566753086-00f18efc2291?auto=format&fit=crop&w=800&q=80',
      features: [
        'Всё из тарифа Classic',
        'Сложные многоуровневые потолки',
        'Монтаж систем защиты от протечек',
        'Шумоизоляция стен и пола',
        'Работа с крупноформатным керамогранитом',
        'Монтаж скрытых дверей и плинтусов'
      ],
      highlight: true
    },
    {
      name: 'Bespoke',
      desc: 'Премиальный авторский ремонт. Воплощение сложнейших архитектурных решений и эксклюзивных материалов.',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      features: [
        'Всё из тарифа Prestige',
        'Интеграция систем "Умный дом"',
        'Ювелирная работа с натуральным камнем',
        'Сложные столярные изделия на заказ',
        'Вентиляция и канальное кондиционирование',
        'Непрерывный авторский надзор архитектора'
      ]
    }
  ];

  return (
    <Section id="packages" className="bg-darker border-t border-gold/10">
      <div className="mb-16 md:mb-24 border-b border-gold/20 pb-8 text-center">
        <span className="uppercase tracking-[0.4em] text-[11px] text-gold mb-4 block">Our Packages</span>
        <h2 className="font-serif text-4xl md:text-5xl italic">Форматы сотрудничества</h2>
        <p className="mt-6 font-manrope font-light text-ivory/60 max-w-2xl mx-auto text-[13px] tracking-wide leading-relaxed">
          Стоимость определяется индивидуально после детальной консультации и замеров. Ниже представлены базовые форматы нашего подхода.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {packages.map((pkg, i) => (
          <div key={i} className={`flex flex-col border p-10 transition-colors duration-500 ${pkg.highlight ? 'border-gold/60 bg-gold/5 hover:border-gold' : 'border-gold/20 hover:border-gold/50'}`}>
            <div className="w-full h-48 mb-8 overflow-hidden">
               <img src={pkg.img} alt={pkg.name} className="w-full h-full object-cover grayscale opacity-80 transition-transform duration-700 hover:scale-105" />
            </div>
            <h3 className="font-serif text-3xl mb-4 italic">{pkg.name}</h3>
            <p className="font-manrope font-light text-[13px] tracking-wide text-ivory/60 mb-10 h-16 leading-relaxed">{pkg.desc}</p>
            
            <ul className="space-y-4 mb-12 flex-1">
              {pkg.features.map((f, idx) => (
                <li key={idx} className="flex items-start font-manrope font-light text-[13px] text-ivory/80">
                  <Check size={16} strokeWidth={1.5} className="text-gold mr-3 mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            
            <a href="#contact" className={`block w-full text-center py-4 text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 border ${pkg.highlight ? 'bg-gold text-dark border-gold hover:bg-transparent hover:text-gold' : 'border-gold text-ivory hover:bg-gold hover:text-dark'}`}>
              Обсудить проект
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function FAQ() {
  const faqs = [
    { q: "Как формируется итоговая стоимость ремонта?", a: "После выезда инженера и составления детализированной сметы. Мы фиксируем сумму в договоре, и она остается неизменной на протяжении всего цикла работ, исключая скрытые платежи." },
    { q: "Предоставляете ли вы гарантию на свои услуги?", a: "Да, мы предоставляем официальную гарантию до 5 лет на все виды выполненных монтажных и инженерных работ, прописанную в договоре." },
    { q: "Смогу ли я контролировать процесс удаленно?", a: "Абсолютно. За вами закрепляется персональный менеджер, который предоставляет ежедневные фото- и видеоотчеты о ходе выполнения работ." },
    { q: "Закупаете ли вы черновые материалы?", a: "Мы полностью берем на себя снабжение объекта премиальными черновыми материалами от проверенных поставщиков с предоставлением чеков." },
    { q: "Нужно ли мне согласовывать перепланировку?", a: "Наши специалисты могут взять на себя весь цикл согласования сложной перепланировки в соответствующих государственных инстанциях." },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <Section id="faq">
      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4 border-r border-gold/10 pr-8">
          <span className="uppercase tracking-[0.4em] text-[11px] text-gold mb-4 block">Questions</span>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] italic">
            Детали <br/>сотрудничества
          </h2>
        </div>
        
        <div className="md:col-span-8 space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-gold/20">
              <button 
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex justify-between items-center py-6 text-left focus:outline-none group"
              >
                <h4 className="font-serif text-xl group-hover:text-gold transition-colors italic">{faq.q}</h4>
                <div className="text-gold ml-4 shrink-0 opacity-60">
                  {openIdx === i ? <Minus strokeWidth={1} /> : <Plus strokeWidth={1} />}
                </div>
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="font-manrope font-light text-[13px] text-ivory/60 pb-8 leading-relaxed tracking-wide">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Заявка успешно отправлена. Мы свяжемся с вами в течение часа.');
    setTimeout(() => setStatus(''), 5000);
  };

  return (
    <Section id="contact" className="bg-darker">
      <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
        <div>
          <span className="uppercase tracking-[0.4em] text-[11px] text-gold mb-4 block">Contact</span>
          <h2 className="font-serif text-4xl md:text-5xl mb-8 italic">Начать проект</h2>
          <p className="font-manrope font-light text-ivory/60 mb-12 text-[13px] tracking-wide leading-relaxed">
            Оставьте заявку, и наш ведущий специалист свяжется с вами для обсуждения деталей вашего будущего интерьера.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <input required type="text" placeholder="Ваше имя" className="w-full bg-transparent border-b border-gold/30 py-4 outline-none focus:border-gold transition-colors font-manrope text-ivory placeholder:text-ivory/30" />
            </div>
            <div className="relative">
              <input required type="tel" placeholder="Номер телефона" className="w-full bg-transparent border-b border-gold/30 py-4 outline-none focus:border-gold transition-colors font-manrope text-ivory placeholder:text-ivory/30" />
            </div>
            <div className="relative">
              <input type="text" placeholder="Тип помещения (квартира, дом, офис)" className="w-full bg-transparent border-b border-gold/30 py-4 outline-none focus:border-gold transition-colors font-manrope text-ivory placeholder:text-ivory/30" />
            </div>
            <button type="submit" className="w-full py-5 bg-gold/10 border border-gold/40 text-ivory uppercase tracking-[0.3em] text-[10px] hover:bg-gold hover:text-dark transition-colors mt-8">
              Отправить заявку
            </button>
            {status && <p className="text-gold text-sm font-light mt-4">{status}</p>}
          </form>
        </div>

        <div className="relative h-[500px] md:h-auto min-h-[500px]">
          <div className="absolute inset-0 bg-dark border border-gold/20 flex flex-col items-center justify-center p-8 text-center">
            {/* Visual placeholder for map/showroom image */}
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80" 
              alt="Showroom"
              className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
            />
            <div className="relative z-10 p-12 backdrop-blur-md bg-dark/70 border border-gold/20">
              <h3 className="font-serif text-2xl mb-4 italic">Наш шоурум</h3>
              <p className="font-manrope font-light text-[13px] tracking-wide text-ivory/80 mb-2">г. Москва, Пресненская наб., 12</p>
              <p className="font-manrope font-light text-[13px] tracking-wide text-ivory/60 mb-8">Башня Федерация, 45 этаж</p>
              
              <a href="tel:+74950000000" className="block font-serif italic text-2xl text-gold hover:text-ivory transition-colors mb-8">
                +7 (495) 000 00 00
              </a>

              <div className="flex justify-center gap-6">
                <a href="#" className="uppercase tracking-[0.2em] text-[10px] text-ivory/60 hover:text-gold transition-colors">WhatsApp</a>
                <a href="#" className="uppercase tracking-[0.2em] text-[10px] text-ivory/60 hover:text-gold transition-colors">Telegram</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
