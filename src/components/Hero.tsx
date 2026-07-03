import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button, Container } from './ui';
import ContactForm from './ContactForm';

export default function Hero() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-onyx-900 group">
      {/* Dynamic Backgrounds */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(30,58,138,0.2) 0%, rgba(8,8,8,0.9) 60%, rgba(0,0,0,1) 100%)'
        }}
      />
      
      {/* Abstract Shapes */}
      <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />

      <Container className="relative z-10 pt-[23px] border-0 rounded-none">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] text-left font-heading font-black uppercase tracking-tight mb-8 text-white drop-shadow-md">
              Сайт для бизнеса за <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">0 ₽</span>
            </h1>
            <div className="text-lg md:text-xl text-neutral-300 font-sans max-w-2xl mb-12 leading-relaxed font-light text-left space-y-6">
              <p>Создадим профессиональный сайт без оплаты разработки — вы оплачиваете только домен, хостинг и обслуживание.</p>
              <p>ONYX WEB берёт на себя запуск, настройку и поддержку, а ваш бизнес получает сайт для заявок, доверия и независимости от соцсетей.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 items-stretch pb-20 w-full max-w-2xl">
              <Button className="flex-1 text-center justify-center h-full p-4 w-full min-h-[64px]" onClick={() => setFormOpen(true)}>Получить сайт за 0 ₽</Button>
              <Button className="flex-1 text-center justify-center h-full p-4 w-full min-h-[64px]" variant="outline" onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth'})}>Шаблоны сайтов</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:block relative"
          >
             <div className="relative w-full aspect-square md:aspect-[4/3] rounded-sm overflow-hidden border border-blue-500/50 shadow-[0_0_60px_rgba(59,130,246,0.15)] group clip-diagonal hover:border-blue-400 transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-tr from-onyx-950 via-onyx-900/40 to-transparent"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                
                <div className="absolute bottom-8 left-8 right-8">
                   <div className="bg-onyx-900/80 backdrop-blur-xl border border-blue-500/40 p-6 clip-diagonal shadow-[0_0_40px_rgba(59,130,246,0.2)]">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex gap-2.5">
                          <div className="w-2.5 h-2.5 rounded-none bg-blue-400 shadow-[0_0_10px_rgba(147,197,253,0.4)]"></div>
                          <div className="w-2.5 h-2.5 rounded-none bg-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.6)] animate-pulse"></div>
                          <div className="w-2.5 h-2.5 rounded-none bg-neutral-600"></div>
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-blue-400 drop-shadow-[0_0_5px_rgba(96,165,250,0.5)]">Deploying Protocol...</span>
                      </div>
                      <div className="h-1.5 w-full bg-onyx-800 rounded-none overflow-hidden relative">
                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-blue-400 w-2/3 animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
                      </div>
                   </div>
                </div>
             </div>
             {/* Decorative Elements */}
             <div className="absolute -bottom-8 -left-8 w-32 h-32 border-b border-l border-blue-500/50 shadow-[-10px_10px_30px_rgba(59,130,246,0.1)] -z-10"></div>
             <div className="absolute -top-8 -right-8 w-32 h-32 border-t border-r border-blue-400/50 shadow-[10px_-10px_30px_rgba(147,197,253,0.1)] -z-10"></div>
          </motion.div>
        </div>
      </Container>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-b border-blue-500/20 bg-onyx-950/80 backdrop-blur-xl py-4 z-20 flex whitespace-nowrap shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        <div className="animate-marquee flex gap-12 items-center font-mono font-black uppercase tracking-widest text-3xl select-none">
          {Array(8).fill("").map((_, i) => (
             <React.Fragment key={i}>
                <span style={{ WebkitTextStroke: "1px rgba(96,165,250,0.4)" }} className="text-transparent">ПРОФЕССИОНАЛЬНЫЙ САЙТ</span>
                <span className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]">ЗА 0 РУБЛЕЙ</span>
                <span className="text-blue-400/30">/</span>
             </React.Fragment>
          ))}
        </div>
      </div>

      {formOpen && <ContactForm isModal onClose={() => setFormOpen(false)} />}
    </section>
  );
}
