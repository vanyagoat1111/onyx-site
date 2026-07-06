import React from 'react';
import { Container } from './ui';
import { Globe, ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhyWeb() {
 const points = [
 "Вызывать доверие к компании",
 "Привлекать новых клиентов из поиска и рекламы",
 "Презентовать товары и услуги",
 "Автоматизировать обработку заявок",
 "Увеличивать продажи без расширения штата"
 ];

 return (
 <Container className="py-24 bg-obsidian-canvas relative overflow-hidden">
 <div className="max-w-5xl mx-auto relative z-10">
 <h2 className="text-4xl md:text-5xl lg:text-display tracking-display text-bone leading-none mb-8">
 Почему вашему бизнесу <br className="hidden md:block"/>
 <span className="text-bone">нужен сайт?</span>
 </h2>
 
 <p className="text-body text-warm-granite font-sans leading-body mb-20 max-w-4xl">
 Сегодня сайт — это не просто визитная карточка компании. Это инструмент продаж, который работает для вашего бизнеса <span className="text-bone">24 часа в сутки</span>.
 </p>

 <div className="space-y-16">
 <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex gap-8 group">
 <div className="w-12 h-12 shrink-0 border border-carbon-lift flex items-center justify-center bg-transparent rounded-sm">
 <Globe className="w-10 h-10 text-signal-orange" />
 </div>
 <div className="pt-2">
 <p className="text-body text-warm-granite leading-body font-sans">
 Потенциальные клиенты ищут информацию о компании в интернете прежде, чем оставить заявку или совершить покупку. Если сайта нет, часть клиентов уходит к конкурентам.
 </p>
 </div>
 </motion.div>

 <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="flex gap-8 group">
 <div className="w-12 h-12 shrink-0 border border-carbon-lift flex items-center justify-center bg-transparent rounded-sm">
 <ShieldCheck className="w-10 h-10 text-signal-orange" />
 </div>
 <div className="pt-2">
 <h3 className="text-[24px] text-bone tracking-tight mb-2">Доверие B2B и B2C сегментов</h3>
 <p className="text-body text-warm-granite leading-body font-sans">
 В 2026 году социальные сети и мессенджеры стали перегруженным инфошумом. Наличие собственного брендированного веб-сайта — ключевой маркер надежности и стабильности вашей компании для клиентов.
 </p>
 </div>
 </motion.div>

 <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex gap-8 group">
 <div className="w-12 h-12 shrink-0 border border-carbon-lift flex items-center justify-center bg-transparent rounded-sm">
 <Zap className="w-10 h-10 text-signal-orange" />
 </div>
 <div className="pt-2">
 <h3 className="text-[24px] text-bone tracking-tight mb-2">Автоматический прием заявки</h3>
 <p className="text-body text-warm-granite leading-body font-sans">
 Сайт работает автономно круглые сутки. Интегрированные формы и квизы мгновенно перенаправляют структурированные лиды в ваши корпоративные чаты и CRM-системы.
 </p>
 </div>
 </motion.div>
 </div>

 <motion.div 
 initial={{ opacity: 0, y: 30 }} 
 whileInView={{ opacity: 1, y: 0 }} 
 viewport={{ once: true }} 
 transition={{ duration: 0.8, delay: 0.3 }}
 className="mt-24 bg-bone rounded-lg p-10 md:p-14 relative overflow-hidden group"
 >
 <h3 className="text-heading text-obsidian-canvas mb-10">Профессиональный сайт помогает:</h3>
 
 <ul className="grid sm:grid-cols-2 gap-8 mb-12">
 {points.map((pt, i) => (
 <li key={i} className="flex gap-5 text-graphite-mid font-sans items-center">
 <CheckCircle2 className="w-7 h-7 text-signal-orange shrink-0" />
 <span className="text-base md:text-lg leading-snug">{pt}</span>
 </li>
 ))}
 </ul>
 
 <div className="border-t border-pale-stone pt-10 mt-4 relative">
 <div className="hidden"></div>
 <p className="text-[24px] text-obsidian-canvas leading-body">
 Сайт — это <span className="text-obsidian-canvas">актив бизнеса</span>, который работает на привлечение клиентов и рост прибыли каждый день.
 </p>
 </div>
 </motion.div>

 </div>
 </Container>
 );
}
