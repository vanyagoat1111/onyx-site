import React from 'react';
import { Container, SectionTitle } from './ui';
import { motion } from 'motion/react';

export default function Problem() {
 return (
 <Container id="problem" className="bg-obsidian-canvas py-20 md:py-32 relative overflow-hidden py-20 md:py-32">
 
 
 
 <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10 p-10 md:p-14 lg:p-20 border border-ash-stroke bg-transparent rounded-lg overflow-hidden group hover:border-warm-granite transition-colors duration-200">
 
 
 <div className="relative z-10">
 
 <div className="relative z-20">
 <SectionTitle subtitle="Определение проблемы" className="!mb-0">Суровая<br/>статистика</SectionTitle>
 </div>
 </div>

 <div className="space-y-12 relative z-10">
 <motion.div
 initial={{ opacity: 0, x: 20 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8, ease: "easeOut" }}
 className="flex flex-col sm:flex-row items-start sm:items-center gap-8"
 >
 <div className="text-[96px] lg:text-[120px] text-signal-orange tracking-tighter shrink-0 select-none">
 90%
 </div>
 <div className="pt-2">
 <h3 className="text-body-sm leading-relaxed text-left font-mono uppercase tracking-caption mb-4 border-b border-ash-stroke pb-4 text-bone">
 Бизнесов закрываются в первый год
 </h3>
 <p className="text-warm-granite font-sans leading-body text-body max-w-sm">
 Основная причина — невидимость для клиентов. Нет сайта = нет доверия. Ваша аудитория уходит к конкурентам.
 </p>
 </div>
 </motion.div>

 <div className="grid grid-cols-2 gap-x-8 gap-y-10 pt-10 border-t border-ash-stroke">
 {[
 { val: '100+', label: 'Успешных проектов', colorClass: 'text-bone' },
 { val: 'От 2 дней', label: 'Скорость запуска', colorClass: 'text-bone' },
 { val: '99.9%', label: 'Uptime сайтов', colorClass: 'text-bone' },
 { val: '24/7', label: 'Техническая поддержка', colorClass: 'text-bone' }
 ].map((stat, i) => (
 <motion.div 
 key={i}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: i * 0.1 }}
 className="group/stat cursor-default"
 >
 <div className={`text-2xl md:text-heading tracking-heading text-bone mb-3`}>{stat.val}</div>
 <div className={`text-caption font-mono uppercase tracking-caption text-warm-granite`}>{stat.label}</div>
 </motion.div>
 ))}
 </div>
 </div>
 </div>
 </Container>
 );
}
