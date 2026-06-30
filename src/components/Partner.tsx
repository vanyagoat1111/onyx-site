import React, { useState } from 'react';
import { Container, SectionTitle, Button } from './ui';
import { motion } from 'motion/react';
import { Target, MessageCircle, Wallet, Settings, Users, Star } from 'lucide-react';
import ContactForm from './ContactForm';

export default function Partner() {
  const [formOpen, setFormOpen] = useState(false);

  const benefits = [
    {
      icon: <Target className="w-6 h-6 text-blue-400" />,
      title: "Повышение конверсии",
      desc: "Получайте лояльность клиентов благодаря мощному офферу о бесплатном качественном сайте."
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-blue-400" />,
      title: "Сарафанное радио",
      desc: "Рекомендации от клиентов своим знакомым, отличные отзывы и повышение имиджа вашей компании."
    },
    {
      icon: <Wallet className="w-6 h-6 text-blue-400" />,
      title: "Дополнительный заработок",
      desc: "Ваша комиссия — 20% на регулярной основе с каждого приведенного клиента на нашу инфраструктуру."
    },
    {
      icon: <Settings className="w-6 h-6 text-blue-400" />,
      title: "Наши услуги со скидками",
      desc: "Скидки для вашего бизнеса на SEO продвижение, ведение соцсетей, разработку проектов и др."
    },
    {
      icon: <Users className="w-6 h-6 text-blue-400" />,
      title: "Поток клиентов к вам",
      desc: "Мы презентуем и рекомендуем бизнес-услуги наших партнеров клиентам внутри нашей базы."
    },
    {
      icon: <Star className="w-6 h-6 text-blue-400" />,
      title: "Преимущество среди конкурентов",
      desc: "Оффер о бесплатном сайте будет решающим фактором для клиента работать именно с вами."
    }
  ];

  return (
    <Container id="partner" className="bg-onyx-950 py-16 pb-24 border-t border-onyx-800">
      <SectionTitle subtitle="Партнерская программа">Стать<br/>Партнером</SectionTitle>

      <div className="max-w-3xl mb-16">
        <h3 className="text-2xl md:text-4xl font-heading font-black uppercase tracking-tight text-white mb-6">
          Повысьте конверсию своих продаж с помощью <span className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">ONYX</span>
        </h3>
        <p className="text-lg md:text-xl text-neutral-300 font-sans leading-relaxed">
          Используйте наш продукт как мощный закрывающий оффер для ваших услуг.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {benefits.map((b, i) => (
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            key={i}
            className="bg-onyx-900 border border-onyx-800 p-8 clip-diagonal hover:border-blue-500/50 transition-colors group"
          >
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-6 clip-diagonal group-hover:bg-blue-500/20 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.1)]">
               {b.icon}
            </div>
            <h4 className="text-xl font-black uppercase tracking-tight text-white mb-4">{b.title}</h4>
            <p className="text-neutral-400 font-sans leading-relaxed text-sm group-hover:text-neutral-300 transition-colors">{b.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-blue-600/10 border border-blue-500 p-8 md:p-12 clip-diagonal flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl shadow-[0_0_30px_rgba(59,130,246,0.1)]">
        <div>
           <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-4">Что нужно, чтобы стать партнером?</h4>
           <p className="text-neutral-300 font-sans max-w-xl">
             Заполните анкету на нашем сайте, и мы свяжемся с вами для дальнейшего обсуждения долгосрочного и выгодного сотрудничества.
           </p>
        </div>
        <Button onClick={() => setFormOpen(true)} className="w-full md:w-auto whitespace-nowrap">Заполнить анкету</Button>
      </div>

      {formOpen && <ContactForm isModal onClose={() => setFormOpen(false)} />}
    </Container>
  );
}
