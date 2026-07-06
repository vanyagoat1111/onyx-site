import React from 'react';
import { Container, SectionTitle } from './ui';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

export default function Reviews() {
 const reviews = [
 {
 name: "ООО «СтройГрупп»",
 role: "Строительная компания",
 text: "Вместо 120 тысяч за сайт в обычной студии мы платим абонентскую плату, при этом сайт выглядит намного дороже и современнее. Заявки с рекламы пошли на третий день.",
 },
 {
 name: "Smile Clinic",
 role: "Стоматология",
 text: "Отличный формат работы. Нам не пришлось искать копирайтера, дизайнера и программиста. Ребята из ONYX все сделали сами под ключ. Сайт работает четко.",
 },
 {
 name: "Дмитрий В.",
 role: "Юридические услуги",
 text: "Техническая поддержка — огонь! Любые правки контента делаются через менеджера без дополнительных оплат. Супер удобно для бизнеса.",
 }
 ];

 return (
 <Container id="reviews" className="bg-obsidian-canvas py-24 relative overflow-hidden">
 
 
 <SectionTitle subtitle="Отзывы" className="!mb-16">Отзывы наших<br/><span className="text-signal-orange">клиентов</span></SectionTitle>
 
 <div className="grid md:grid-cols-3 gap-8 mt-16 relative z-10">
 {reviews.map((r, i) => (
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, delay: i * 0.1 }}
 key={i}
 className="bg-transparent border border-ash-stroke rounded-lg p-8 lg:p-10 transition-all duration-200 group relative hover:border-warm-granite"
 >
 
 
 
 <div className="flex gap-1.5 mb-8">
 {[...Array(5)].map((_, j) => (
 <Star key={j} className="w-5 h-5 text-warm-granite fill-transparent group-hover:fill-[#eeeeee] group-hover:text-bone transition-colors duration-200" style={{ transitionDelay: `${j * 50}ms` }} />
 ))}
 </div>
 
 <p className="text-warm-granite font-sans leading-body text-body mb-10 group-hover:text-bone transition-colors duration-200">
 «{r.text}»
 </p>
 
 <div className="border-t border-ash-stroke pt-6 mt-auto">
 <h4 className="text-body text-bone">{r.name}</h4>
 <p className="text-metric-green font-mono text-caption mt-1 uppercase tracking-caption">{r.role}</p>
 </div>
 </motion.div>
 ))}
 </div>
 </Container>
 );
}
