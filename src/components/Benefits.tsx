import React from 'react';
import { Container, SectionTitle } from './ui';
import { motion } from 'motion/react';
import { Wallet, ShieldCheck, Handshake, Zap, Blocks, Wrench } from 'lucide-react';
import { RadarEffect } from './BackgroundEffects';

export default function Benefits() {
  const benefits = [
    {
      icon: <Wallet className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors" />,
      title: "0 рублей за разработку",
      desc: "Пока другие веб-студии просят десятки и сотни тысяч рублей за разработку, ONYX создает сайты бесплатно. Вы оплачиваете только запуск и обслуживание."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors" />,
      title: "Минимизируем риски",
      desc: "Мы понимаем малый бизнес: каждый рубль и день на счету. Вы получаете готовый инструмент без переплат, экономя бюджет на старте. Большинство новых бизнесов быстро закрываются — мы минимизируем ваши риски."
    },
    {
      icon: <Handshake className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors" />,
      title: "Сначала сайт, потом оплата",
      desc: "Делаем сайт, согласовываем его с вами, и только потом публикуем финальную версию. Это помогает избежать недочетов и незапланированных платных корректировок. Никаких котов в мешке."
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors" />,
      title: "Запуск за 1-2 дня",
      desc: "На создание сайта у ONYX уходит 1-2 дня. Вашему бизнесу не нужно неделями ждать свой сайт. Ускоряем процесс от идеи до готового результата."
    },
    {
      icon: <Blocks className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors" />,
      title: "Всё для продаж",
      desc: "Подключаем все необходимые опции для развития бизнеса и ведения клиентов. Формы заявок, CRM, онлайн-оплата и аналитика."
    },
    {
      icon: <Wrench className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors" />,
      title: "Бесплатные правки",
      desc: "Бесплатно осуществляем мелкие правки на вашем сайте. Например, оперативно добавим на сайт блок с упоминанием вашей актуальной акции или спецпредложения."
    }
  ];

  return (
    <Container className="bg-onyx-950 py-16 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-1/3 h-1/2 bg-[radial-gradient(circle_at_left,_var(--tw-gradient-stops))] from-indigo-600/10 via-transparent to-transparent pointer-events-none -translate-y-1/2 blur-[80px]" />
      <div className="absolute top-1/4 right-0 w-1/4 h-1/3 bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-blue-600/5 via-transparent to-transparent pointer-events-none blur-[100px]" />
      <RadarEffect />
      
      <SectionTitle subtitle="Преимущества ONYX">
        Почему бизнесу выгодно <br className="hidden md:block" />
        работать с <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-md">ONYX?</span>
      </SectionTitle>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 relative z-10">
        {benefits.map((b, i) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
            key={i}
            className="bg-onyx-900/40 backdrop-blur-md border border-onyx-800/80 p-8 lg:p-10 clip-diagonal hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 blur-[60px] pointer-events-none group-hover:bg-blue-400/20 transition-colors duration-500" />
            
            <div className="w-16 h-16 bg-onyx-800/80 border border-onyx-700 flex items-center justify-center mb-8 clip-diagonal group-hover:bg-blue-600 group-hover:border-blue-400 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]">
               {b.icon}
            </div>
            
            <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-5 leading-tight group-hover:text-blue-50 transition-colors duration-500">
              {b.title}
            </h4>
            
            <p className="text-neutral-400 font-sans leading-relaxed text-sm md:text-base group-hover:text-neutral-300 transition-colors duration-500">
              {b.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </Container>
  );
}
