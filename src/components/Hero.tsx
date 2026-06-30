import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button, Container } from './ui';
import ContactForm from './ContactForm';

export default function Hero() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-onyx-900  mask-image-b group">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(30,58,138,0.4) 0%, rgba(8,8,8,0.9) 50%, rgba(0,0,0,1) 100%)'
        }}
      />

      <Container className="relative z-10 pt-[23px] border-0 rounded-none">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-sm sm:text-base md:text-lg text-blue-400 font-sans mb-4 uppercase tracking-wider font-bold text-left">
              Сайт для бизнеса — 0 ₽ за разработку
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.2] sm:leading-[1.1] text-left font-heading font-black uppercase tracking-tight mb-6 text-white break-words">
              Создаем сайты, которые помогают бизнесу получать <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">больше клиентов</span>
            </h1>

            <div className="text-xl md:text-2xl text-neutral-300 font-sans max-w-2xl mb-10 leading-relaxed font-light mt-2 text-left hyphens-auto">
              <p>Современный сайт для заявок, доверия и продаж. Вы оплачиваете только запуск, домен, хостинг.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-stretch pb-20 w-full max-w-2xl">
              <Button className="flex-1 text-center justify-center h-full p-4 w-full min-h-[64px]" onClick={() => setFormOpen(true)}>Получить сайт бесплатно</Button>
              <Button className="flex-1 text-center justify-center h-full p-4 w-full min-h-[64px]" variant="outline" onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth'})}>Наши кейсы</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block relative"
          >
             <div className="relative w-full aspect-square md:aspect-[4/3] rounded-sm overflow-hidden border border-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.3)] group clip-diagonal">
                <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/90 via-onyx-900/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                   <div className="bg-onyx-800/90 backdrop-blur-md border border-blue-500/50 p-6 clip-diagonal shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-none bg-blue-400 shadow-[0_0_10px_rgba(147,197,253,0.3)]"></div>
                          <div className="w-3 h-3 rounded-none bg-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-pulse"></div>
                          <div className="w-3 h-3 rounded-none bg-neutral-600"></div>
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-blue-500">Deploying Protocol...</span>
                      </div>
                      <div className="h-2 w-full bg-onyx-700 rounded-none overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 w-2/3 animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Decorative Elements */}
             <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b-2 border-l-2 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] -z-10 animate-pulse"></div>
             <div className="absolute -top-6 -right-6 w-24 h-24 border-t-2 border-r-2 border-blue-400 shadow-[0_0_10px_rgba(147,197,253,0.3)] -z-10 animate-pulse"></div>
          </motion.div>
        </div>
      </Container>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-b border-blue-500/30 bg-onyx-800/80 backdrop-blur-md py-4 z-20 flex whitespace-nowrap shadow-[0_0_30px_rgba(59,130,246,0.2)]">
        <div className="animate-marquee flex gap-8 items-center font-mono font-bold uppercase tracking-tight text-4xl select-none">
          {Array(8).fill("").map((_, i) => (
             <React.Fragment key={i}>
                <span style={{ WebkitTextStroke: "1px rgba(59,130,246,0.5)" }} className="text-transparent ">ПРОФЕССИОНАЛЬНЫЙ САЙТ</span>
                <span className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">БЕЗ ЗАТРАТ НА ЗАПУСК</span>
                <span className="text-blue-300">+++</span>
             </React.Fragment>
          ))}
        </div>
      </div>

      {formOpen && <ContactForm isModal onClose={() => setFormOpen(false)} />}
    </section>
  );
}
