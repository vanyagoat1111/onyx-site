import React from 'react';
import { Container, Button } from './ui';
import { motion } from 'motion/react';
import AnimatedBackground from './AnimatedBackground';
import MassiveFigure from './MassiveFigure';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[95svh] flex items-center pt-32 pb-32 overflow-hidden bg-[#020617] group">
      {/* Massive Floor Grid */}
      <div className="absolute inset-0 z-0 [mask-image:linear-gradient(to_bottom,transparent_20%,black_100%)] opacity-30 pointer-events-none">
        <div className="absolute inset-[-100%] bg-[linear-gradient(rgba(59,130,246,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.3)_1px,transparent_1px)] bg-[size:100px_100px] animate-[grid-massive_10s_linear_infinite]" />
      </div>

      {/* Aurora Orbs - Massive Scale */}
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen animate-[pulse_10s_ease-in-out_infinite]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen animate-[pulse_14s_ease-in-out_infinite_alternate]" />
      <div className="absolute top-[20%] right-[10%] w-[50vw] h-[50vw] bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-[pulse_12s_ease-in-out_infinite]" />
      
      <AnimatedBackground />
      <MassiveFigure />

      <Container className="relative z-10 py-0 md:py-0 border-0 rounded-none">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] text-left font-heading font-black uppercase tracking-tight mb-6 text-white drop-shadow-md">
              Сайты, которые<br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">продают за вас 24/7</span>
            </h1>
            <div className="text-lg md:text-xl text-neutral-300 font-sans max-w-2xl mb-8 leading-relaxed font-light text-left space-y-6">
              <p>Превратите посетителей в пациентов с помощью системы, которая работает без выходных. Готовое решение для стоматологий и медицинских центров, генерирующее стабильный поток заявок.</p>
              <p className="text-blue-400 font-bold tracking-wide uppercase text-sm border-l-2 border-blue-500 pl-4">Мы всегда на связи и отвечаем в течение 10 минут даже в выходные дни.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-stretch pb-4 w-full max-w-2xl">
              <Button 
                className="flex-1 text-center justify-center h-full p-4 w-full min-h-[64px] text-[12px] sm:text-[13px] md:text-[14px]" 
                onClick={() => document.getElementById('lead-magnets')?.scrollIntoView({ behavior: 'smooth'})}
              >
                Получить аудит сайта
              </Button>
              <Button 
                className="flex-1 text-center justify-center h-full p-4 w-full min-h-[64px] text-[12px] sm:text-[13px] md:text-[14px]" 
                variant="outline" 
                onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth'})}
              >
                Смотреть структуру
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
            transition={{ 
              opacity: { duration: 1, delay: 0.2, ease: "easeOut" },
              scale: { duration: 1, delay: 0.2, ease: "easeOut" },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="hidden lg:block relative"
          >
             <div className="relative w-full aspect-square md:aspect-[4/3] rounded-sm overflow-hidden border border-blue-500/50 shadow-[0_0_80px_rgba(59,130,246,0.2)] group clip-diagonal hover:border-blue-400 transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-tr from-onyx-950 via-onyx-900/60 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay z-10"></div>
                
                {/* Moving grid background */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <div className="absolute -inset-[100%] bg-[linear-gradient(rgba(59,130,246,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.15)_1px,transparent_1px)] bg-[size:40px_40px] animate-[grid_5s_linear_infinite]" />
                </div>
                
                <div className="absolute bottom-8 left-8 right-8 z-20">
                   <div className="bg-onyx-900/90 backdrop-blur-xl border border-blue-500/50 p-6 clip-diagonal shadow-[0_0_40px_rgba(59,130,246,0.3)]">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex gap-2.5">
                          <div className="w-2.5 h-2.5 rounded-none bg-blue-400 shadow-[0_0_15px_rgba(147,197,253,0.6)]"></div>
                          <div className="w-2.5 h-2.5 rounded-none bg-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-pulse"></div>
                          <div className="w-2.5 h-2.5 rounded-none bg-neutral-600"></div>
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-blue-400 drop-shadow-[0_0_5px_rgba(96,165,250,0.6)]">System Active...</span>
                      </div>

                      <div className="h-1.5 w-full bg-onyx-800 rounded-none overflow-hidden relative">
                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-blue-400 w-full animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_20px_rgba(59,130,246,0.8)]"></div>
                      </div>
                      
                      <div className="mt-6 flex flex-col gap-3 font-mono text-[11px] text-blue-400/70">
                        <div className="flex justify-between">
                          <span>&gt; CONVERTING VISITORS</span>
                          <span className="text-blue-400">+340%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>&gt; AUTOMATING SALES</span>
                          <span className="text-blue-400">ACTIVE</span>
                        </div>
                        <div className="flex justify-between">
                          <span>&gt; GENERATING LEADS</span>
                          <span className="text-blue-400 animate-pulse">IN PROGRESS...</span>
                        </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Decorative Elements */}
             <div className="absolute -bottom-8 -left-8 w-32 h-32 border-b border-l border-blue-500/50 shadow-[-10px_10px_30px_rgba(59,130,246,0.15)] -z-10 animate-[pulse_4s_ease-in-out_infinite]"></div>
             <div className="absolute -top-8 -right-8 w-32 h-32 border-t border-r border-blue-400/50 shadow-[10px_-10px_30px_rgba(147,197,253,0.15)] -z-10 animate-[pulse_5s_ease-in-out_infinite]"></div>
          </motion.div>
        </div>
      </Container>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-b border-blue-500/20 bg-onyx-950/80 backdrop-blur-xl py-4 z-20 flex whitespace-nowrap shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        <div className="animate-marquee flex gap-12 items-center font-mono font-black uppercase tracking-widest text-3xl select-none">
          {Array(8).fill("").map((_, i) => (
             <React.Fragment key={i}>
                <span style={{ WebkitTextStroke: "1px rgba(96,165,250,0.4)" }} className="text-transparent">АВТОМАТИЗАЦИЯ ПРОДАЖ</span>
                <span className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]">ГЕНЕРАЦИЯ ЗАЯВОК</span>
                <span className="text-blue-400/30">/</span>
             </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
