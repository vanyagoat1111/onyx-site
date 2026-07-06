import React from 'react';
import { Container, SectionTitle } from './ui';
import { motion } from 'motion/react';
import { Wallet, ShieldCheck, Handshake, Zap, Blocks, Wrench } from 'lucide-react';

export default function Benefits() {
 const benefits = [
 {
 icon: <Wallet className="w-8 h-8 text-warm-granite group-hover:text-bone transition-colors duration-200" />,
 title: "0 рублей за разработку",
 desc: "Пока другие веб-студии просят десятки и сотни тысяч рублей за разработку, ONYX создает сайты бесплатно. Вы оплачиваете только запуск и обслуживание."
 },
 {
 icon: <ShieldCheck className="w-8 h-8 text-warm-granite group-hover:text-bone transition-colors duration-200" />,
 title: "Минимизируем риски",
 desc: "Мы понимаем малый бизнес: каждый рубль и день на счету. Вы получаете готовый инструмент без переплат, экономя бюджет на старте. Большинство новых бизнесов быстро закрываются — мы минимизируем ваши риски."
 },
 {
 icon: <Handshake className="w-8 h-8 text-warm-granite group-hover:text-bone transition-colors duration-200" />,
 title: "Сначала сайт, потом оплата",
 desc: "Делаем сайт, согласовываем его с вами, и только потом публикуем финальную версию. Это помогает избежать недочетов и незапланированных платных корректировок. Никаких котов в мешке."
 },
 {
 icon: <Zap className="w-8 h-8 text-warm-granite group-hover:text-bone transition-colors duration-200" />,
 title: "Запуск за 1-2 дня",
 desc: "На создание сайта у ONYX уходит 1-2 дня. Вашему бизнесу не нужно неделями ждать свой сайт. Ускоряем процесс от идеи до готового результата."
 },
 {
 icon: <Blocks className="w-8 h-8 text-warm-granite group-hover:text-bone transition-colors duration-200" />,
 title: "Всё для продаж",
 desc: "Подключаем все необходимые опции для развития бизнеса и ведения клиентов. Формы заявок, CRM, онлайн-оплата и аналитика."
 },
 {
 icon: <Wrench className="w-8 h-8 text-warm-granite group-hover:text-bone transition-colors duration-200" />,
 title: "Бесплатные правки",
 desc: "Бесплатно осуществляем мелкие правки на вашем сайте. Например, оперативно добавим на сайт блок с упоминанием вашей актуальной акции или спецпредложения."
 }
 ];

 return (
 <Container className="bg-obsidian-canvas py-16 md:py-32 relative overflow-hidden">
 
 
 
 <SectionTitle subtitle="Преимущества ONYX">
 Почему бизнесу выгодно <br className="hidden md:block" />
 работать с <span className="text-signal-orange">ONYX?</span>
 </SectionTitle>

 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 relative z-10">
 {benefits.map((b, i) => (
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
 key={i}
 className="bg-transparent border border-ash-stroke rounded-lg p-8 lg:p-10 transition-all duration-200 group relative hover:border-warm-granite"
 >
 
 
 
 <div className="w-16 h-16 bg-transparent border border-ash-stroke rounded-sm flex items-center justify-center mb-8 group-hover:bg-carbon-lift group-hover:border-bone transition-colors duration-200">
 {b.icon}
 </div>
 
 <h4 className="text-[24px] text-bone tracking-tight mb-5 leading-[1.2]">
 {b.title}
 </h4>
 
 <p className="text-warm-granite font-sans leading-body text-body group-hover:text-bone transition-colors duration-200">
 {b.desc}
 </p>
 </motion.div>
 ))}
 </div>
 </Container>
 );
}
