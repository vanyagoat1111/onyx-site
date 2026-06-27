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
    <Container id="reviews" className="bg-onyx-950 py-16">
      <SectionTitle subtitle="Отзывы">Отзывы наших<br/>клиентов</SectionTitle>
      
      <div className="grid md:grid-cols-3 gap-6 mt-16">
        {reviews.map((r, i) => (
          <motion.div 
            initial={{ opacity: 1, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="bg-onyx-900 border border-onyx-800 p-8 clip-diagonal hover:border-blue-500/30 transition-colors group relative"
          >
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="w-4 h-4 text-blue-500 fill-blue-500/20 group-hover:fill-blue-500 transition-colors" />
              ))}
            </div>
            <p className="text-neutral-300 font-sans leading-relaxed mb-8 italic">
              «{r.text}»
            </p>
            <div className="border-t border-onyx-800 pt-6">
              <h4 className="text-lg font-black uppercase text-white tracking-tight">{r.name}</h4>
              <p className="text-sm text-neutral-500 font-mono mt-1">{r.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Container>
  );
}
