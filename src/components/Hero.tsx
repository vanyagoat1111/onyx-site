import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button, Container } from './ui';
import ContactForm from './ContactForm';

export default function Hero() {
 const [formOpen, setFormOpen] = useState(false);
 return (
 <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-obsidian-canvas">
 <Container className="relative z-10 pt-[24px]">
 <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 items-center max-w-[1200px] mx-auto">
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
 className="max-w-xl"
 >
 <h1 className="text-heading-lg lg:text-display leading-heading-lg lg:leading-none text-left tracking-heading-lg lg:tracking-display mb-8 text-bone">
 Сайт для бизнеса за 0 ₽
 </h1>
 <div className="text-body text-warm-granite font-sans max-w-2xl mb-12 leading-body text-left space-y-4">
 <p>Создадим профессиональный сайт без оплаты разработки — вы оплачиваете только домен, хостинг и обслуживание.</p>
 <p>ONYX WEB берёт на себя запуск, настройку и поддержку, а ваш бизнес получает сайт для заявок, доверия и независимости от соцсетей.</p>
 </div>
 <div className="flex flex-col sm:flex-row gap-4 items-center pb-12 w-full max-w-xl">
 <Button className="w-full sm:w-auto h-[48px] px-6" onClick={() => setFormOpen(true)}>Получить сайт</Button>
 <Button className="w-full sm:w-auto h-[48px]" variant="ghost" onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth'})}>Шаблоны сайтов →</Button>
 </div>
 </motion.div>
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.3, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
 className="hidden lg:block relative"
 >
 <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-carbon-lift bg-[#0d0d0d] flex flex-col">
 {/* macOS window chrome */}
 <div className="flex items-center px-4 h-10 border-b border-carbon-lift bg-[#0d0d0d]">
 <div className="flex gap-2">
 <div className="w-3 h-3 rounded-full bg-[#3d3a39]"></div>
 <div className="w-3 h-3 rounded-full bg-[#3d3a39]"></div>
 <div className="w-3 h-3 rounded-full bg-[#3d3a39]"></div>
 </div>
 <div className="flex-1 flex justify-center items-center gap-2">
 <div className="w-[6px] h-[6px] rounded-full bg-signal-orange"></div>
 <span className="font-mono text-caption uppercase tracking-tight text-pale-stone">Factory Protocol</span>
 </div>
 </div>
 {/* Dashboard metric tile grid */}
 <div className="flex-1 grid grid-cols-2 grid-rows-2 p-4 gap-4">
 <div className="border-b border-carbon-lift p-4 flex flex-col justify-end">
 <span className="font-mono text-caption uppercase text-pale-stone tracking-caption">Deploy Status</span>
 <div className="font-sans text-heading font-normal text-bone tracking-heading">Active</div>
 </div>
 <div className="border-b border-carbon-lift p-4 flex flex-col justify-end">
 <span className="font-mono text-caption uppercase text-pale-stone tracking-caption">Latency</span>
 <div className="font-sans text-heading font-normal text-bone tracking-heading">12ms</div>
 </div>
 <div className="border-b border-carbon-lift p-4 flex flex-col justify-end">
 <span className="font-mono text-caption uppercase text-pale-stone tracking-caption">Builds</span>
 <div className="font-sans text-heading font-normal text-bone tracking-heading">2,048</div>
 </div>
 <div className="border-b border-carbon-lift p-4 flex flex-col justify-end">
 <span className="font-mono text-caption uppercase text-pale-stone tracking-caption">Health</span>
 <div className="h-10 border-b border-[#ee6018] w-2/3 mt-2"></div>
 </div>
 </div>
 </div>
 </motion.div>
 </div>
 </Container>
 {formOpen && <ContactForm isModal onClose={() => setFormOpen(false)} />}
 </section>
 );
}
