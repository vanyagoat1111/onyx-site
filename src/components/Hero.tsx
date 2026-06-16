import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button, Container } from './ui';
import ContactForm from './ContactForm';

export default function Hero() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden industrial-grid mask-image-b">
      <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-30 mix-blend-screen pointer-events-none">
        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" alt="Abstract Pattern" className="w-full h-full object-cover grayscale object-right" referrerPolicy="no-referrer" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-onyx-900/80 to-onyx-900 pointer-events-none" />
      
      <Container className="relative z-10 pt-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-block bg-onyx-800 border border-onyx-700 text-neutral-300 font-mono text-sm px-4 py-2 uppercase tracking-widest clip-diagonal mb-8 shadow-xl">
              <span className="inline-block w-2 h-2 bg-white rounded-full mr-3 animate-pulse"></span>
              Студия инновационной веб-разработки
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-[0.9] mb-8 drop-shadow-lg">
              Сайты за один день <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">по подписке</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-400 font-sans max-w-2xl mb-12 leading-relaxed">
              Геометрические блоки, тяжелая типографика, агрессивные углы и намеренная визуальная привлекательность. Создаем IT-решения для бизнеса с подпиской от 2990 ₽/мес.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Button onClick={() => setFormOpen(true)}>Заполнить анкету</Button>
              <Button variant="outline" onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth'})}>Демо версии сайтов</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block relative"
          >
             <div className="relative w-full aspect-square md:aspect-[4/3] rounded-sm overflow-hidden border border-onyx-700 shadow-[0_0_50px_rgba(0,0,0,0.5)] group clip-diagonal">
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2500&auto=format&fit=crop" alt="Web Development" className="w-full h-full object-cover grayscale mix-blend-luminosity group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-80" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/90 via-onyx-900/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                   <div className="bg-onyx-900/90 backdrop-blur-md border border-onyx-700 p-6 clip-diagonal">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-onyx-600"></div>
                          <div className="w-3 h-3 rounded-full bg-onyx-600"></div>
                          <div className="w-3 h-3 rounded-full bg-onyx-600"></div>
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">Deploying Subscription Protocol...</span>
                      </div>
                      <div className="h-2 w-full bg-onyx-800 rounded-full overflow-hidden">
                        <div className="h-full bg-white w-2/3 animate-[pulse_2s_ease-in-out_infinite]"></div>
                      </div>
                   </div>
                </div>
             </div>
             
             {/* Decorative Elements */}
             <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b-2 border-l-2 border-onyx-700 -z-10"></div>
             <div className="absolute -top-6 -right-6 w-24 h-24 border-t-2 border-r-2 border-onyx-700 -z-10"></div>
          </motion.div>
        </div>
      </Container>
      
      <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-b border-onyx-800 bg-onyx-900/50 backdrop-blur-sm py-4 z-20 flex whitespace-nowrap">
        <div className="animate-marquee flex gap-8 items-center text-onyx-700 font-black uppercase tracking-tighter text-4xl select-none">
          {Array(8).fill("САЙТЫ ЗА ОДИН ДЕНЬ ПО ПОДПИСКЕ").map((text, i) => (
             <React.Fragment key={i}>
                <span>{text}</span>
                <span className="text-white">+++</span>
             </React.Fragment>
          ))}
        </div>
      </div>
      
      {formOpen && <ContactForm isModal onClose={() => setFormOpen(false)} />}
    </section>
  );
}
