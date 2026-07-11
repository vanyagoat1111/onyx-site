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
    <Container id="reviews" className="bg-onyx-950 py-24 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] pointer-events-none -translate-y-1/2 -z-10" />
      
      <SectionTitle subtitle="Отзывы" className="!mb-16">Отзывы наших<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">клиентов</span></SectionTitle>
      
      <div className="grid md:grid-cols-3 gap-8 mt-16 relative z-10">
        {reviews.map((r, i) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            key={i}
            className="bg-onyx-900/60 backdrop-blur-md border border-onyx-800 p-8 lg:p-10 clip-diagonal hover:border-blue-500/40 transition-all duration-500 group relative shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)] hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[40px] pointer-events-none group-hover:bg-blue-400/10 transition-colors duration-500" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="flex gap-1.5 mb-8">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="w-5 h-5 text-onyx-700 fill-onyx-800 group-hover:text-blue-500 group-hover:fill-blue-500 transition-colors duration-500 drop-shadow-sm" style={{ transitionDelay: `${j * 50}ms` }} />
              ))}
            </div>
            
            <p className="text-neutral-400 font-sans leading-relaxed mb-10 italic group-hover:text-neutral-300 transition-colors duration-500 text-sm md:text-base relative z-10">
              «{r.text}»
            </p>
            
            <div className="border-t border-onyx-800 pt-6 mt-auto">
              <h4 className="text-lg font-black uppercase text-white tracking-tight group-hover:text-blue-50 transition-colors duration-500">{r.name}</h4>
              <p className="text-xs md:text-sm text-blue-500 font-mono mt-1 opacity-80 group-hover:opacity-100 transition-opacity uppercase tracking-widest">{r.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Container>
  );
}
