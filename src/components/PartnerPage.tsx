import React, { useState } from 'react';
import { Container, SectionTitle } from './ui';
import { motion } from 'motion/react';
import { Handshake, Percent, Users, TrendingUp } from 'lucide-react';
import ContactForm from './ContactForm';

export default function PartnerPage() {
  const [formOpen, setFormOpen] = useState(false);

  const benefits = [
    {
      icon: <Percent className="w-8 h-8 text-blue-400" />,
      title: "Высокий %",
      desc: "Получайте до 30% с каждого приведенного клиента, который закажет у нас разработку или подписку."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-400" />,
      title: "Пассивный доход",
      desc: "Если клиент остается с нами на подписке, вы можете получать процент с его ежемесячных оплат."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-400" />,
      title: "Прозрачная статистика",
      desc: "Мы ведем честный учет всех приведенных лидов. Вы всегда знаете статус своих заявок."
    }
  ];

  return (
    <div className="pt-32 pb-16 min-h-screen relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-onyx-950 to-onyx-950 pointer-events-none" />
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Handshake className="w-16 h-16 text-blue-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">
            Создавайте пассивный доход, рекомендуя ONYX
          </h1>
          <p className="text-xl text-neutral-400 font-sans leading-relaxed">
            Мы не просто продаем сайты, мы строим системы, которые генерируют лиды. Рекомендуйте продукт, за который не стыдно, и получайте стабильный процент с каждой успешной сделки.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((b, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              key={i}
              className="bg-onyx-900/50 border border-onyx-800 p-8 clip-diagonal"
            >
              <div className="mb-6">{b.icon}</div>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-4">{b.title}</h3>
              <p className="text-neutral-400 font-sans">{b.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto bg-onyx-900 border border-blue-500/30 p-8 md:p-12 clip-diagonal">
          <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-6 text-center">
            Оставьте заявку
          </h2>
          <p className="text-center text-neutral-400 font-sans mb-8">
            Заполните форму, и мы свяжемся с вами для обсуждения индивидуальных условий сотрудничества.
          </p>
          <ContactForm isPartner={true} buttonText="Стать партнером" />
        </div>
      </Container>
    </div>
  );
}
