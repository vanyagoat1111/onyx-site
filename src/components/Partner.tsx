import React, { useState } from 'react';
import { Container, SectionTitle, Button } from './ui';
import { motion } from 'motion/react';
import { Target, MessageCircle, Wallet, Settings, Users, Star } from 'lucide-react';
import ContactForm from './ContactForm';

export default function Partner() {
 const [formOpen, setFormOpen] = useState(false);

 const benefits = [
 {
 icon: <Target className="w-6 h-6 text-bone" />,
 title: "Повышение конверсии",
 desc: "Получайте лояльность клиентов благодаря мощному офферу о бесплатном качественном сайте."
 },
 {
 icon: <MessageCircle className="w-6 h-6 text-bone" />,
 title: "Сарафанное радио",
 desc: "Рекомендации от клиентов своим знакомым, отличные отзывы и повышение имиджа вашей компании."
 },
 {
 icon: <Wallet className="w-6 h-6 text-bone" />,
 title: "Дополнительный заработок",
 desc: "Ваша комиссия — 20% на регулярной основе с каждого приведенного клиента на нашу инфраструктуру."
 },
 {
 icon: <Settings className="w-6 h-6 text-bone" />,
 title: "Наши услуги со скидками",
 desc: "Скидки для вашего бизнеса на SEO продвижение, ведение соцсетей, разработку проектов и др."
 },
 {
 icon: <Users className="w-6 h-6 text-bone" />,
 title: "Поток клиентов к вам",
 desc: "Мы презентуем и рекомендуем бизнес-услуги наших партнеров клиентам внутри нашей базы."
 },
 {
 icon: <Star className="w-6 h-6 text-bone" />,
 title: "Преимущество среди конкурентов",
 desc: "Оффер о бесплатном сайте будет решающим фактором для клиента работать именно с вами."
 }
 ];

 return (
 <Container id="partner" className="bg-obsidian-canvas py-24">
 <SectionTitle subtitle="Партнерская программа">Стать<br/>Партнером</SectionTitle>

 <div className="max-w-3xl mb-16">
 <h3 className="text-2xl md:text-4xl font-heading font-black uppercase tracking-tight text-white mb-6">
 Повысьте конверсию своих продаж с помощью <span className="text-bone">ONYX</span>
 </h3>
 <p className="text-lg md:text-xl text-warm-granite font-sans text-body">
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
 className="bg-transparent border border-carbon-lift rounded-lg p-5 hover:border-ash-stroke transition-colors group"
 >
 <div className="mb-4">
 {b.icon}
 </div>
 <h4 className="text-body text-bone mb-2">{b.title}</h4>
 <p className="text-warm-granite font-sans text-body-sm">{b.desc}</p>
 </motion.div>
 ))}
 </div>

 <div className="bg-bone border-none rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl">
 <div>
 <h4 className="text-heading text-[#101010] mb-2">Что нужно, чтобы стать партнером?</h4>
 <p className="text-graphite-mid font-sans text-body max-w-xl">
 Заполните анкету на нашем сайте, и мы свяжемся с вами для дальнейшего обсуждения долгосрочного и выгодного сотрудничества.
 </p>
 </div>
 <Button onClick={() => setFormOpen(true)} className="w-full md:w-auto whitespace-nowrap !bg-obsidian-canvas !text-bone">Заполнить анкету</Button>
 </div>

 {formOpen && <ContactForm isModal isPartner onClose={() => setFormOpen(false)} />}
 </Container>
 );
}
