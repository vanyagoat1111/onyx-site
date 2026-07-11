import React from 'react';
import { Container, SectionTitle } from './ui';
import { ArrowUpRight, Activity, Syringe, ShieldCheck } from 'lucide-react';
import { GridEffect } from './BackgroundEffects';
import main1 from '/case1.1.png';

export default function Templates() {
  return (
    <div id="templates" className="py-16 md:py-32 bg-onyx-950 relative scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-onyx-900 via-transparent to-onyx-900 pointer-events-none" />
      
      {/* Glowing elements */}
      <div className="absolute top-40 left-0 w-64 h-64 border-[40px] border-blue-600/10 rounded-full blur-2xl pointer-events-none" />
      
      <GridEffect />
      
      <Container className="relative z-10 w-full overflow-hidden !py-0">
        <div className="flex flex-col mb-12 lg:mb-16 w-full relative">
          <SectionTitle subtitle="Наше решение" className="text-left max-w-4xl text-white !mb-0 relative z-10">
            Готовая система для <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">медицинских клиник</span>
          </SectionTitle>
          <p className="mt-6 text-neutral-400 font-sans max-w-2xl text-lg">
            Мы сфокусировались на одной нише, чтобы создать идеальный продукт. 
            Наше решение для стоматологий и медцентров уже содержит правильную структуру, 
            продающие триггеры и формы записи.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-7 relative group perspective-1000">
             <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/20 to-indigo-600/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>
             
             <a href="#case/dental" className="block relative bg-onyx-900 border border-onyx-800 overflow-hidden clip-diagonal group-hover:border-blue-500/80 transition-all duration-700 shadow-[0_20px_40px_rgba(0,0,0,0.8)] group-hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] z-10 pt-8">
                <div className="absolute top-0 w-full h-8 border-b border-onyx-800 group-hover:border-blue-500/40 bg-onyx-950 flex justify-between items-center px-4 z-20 transition-colors duration-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-onyx-700 group-hover:bg-blue-400 transition-all duration-300"></div>
                    <div className="w-2 h-2 bg-onyx-700 group-hover:bg-blue-500 transition-all duration-500 delay-75"></div>
                    <div className="w-2 h-2 bg-onyx-700 group-hover:bg-blue-600 transition-all duration-700 delay-150"></div>
                  </div>
                </div>
                
                <img src={main1} alt="Сайт стоматологии" className="w-full h-auto object-cover object-top opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-[1.02]" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-onyx-950 via-onyx-950/40 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none z-10"></div>
                
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-20">
                   <div>
                      <span className="px-3 py-1 bg-onyx-800/80 text-xs font-mono text-blue-400 border border-blue-500/20 backdrop-blur-md mb-3 inline-block">
                        МЕДИЦИНА
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tight drop-shadow-xl flex items-center gap-2">
                        Стоматологическая клиника
                      </h3>
                   </div>
                   <div className="w-12 h-12 shrink-0 border border-onyx-700 flex items-center justify-center bg-onyx-900/50 text-white backdrop-blur-md group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-500 clip-diagonal-inverted">
                      <ArrowUpRight className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                   </div>
                </div>
             </a>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-onyx-900/50 border border-onyx-800 p-6 clip-diagonal hover:border-blue-500/30 transition-colors">
              <Activity className="w-8 h-8 text-blue-500 mb-4" />
              <h4 className="text-xl font-bold text-white uppercase mb-2">Продающая структура</h4>
              <p className="text-neutral-400 font-sans text-sm">Блоки услуг, врачей и отзывов расположены так, чтобы закрывать возражения пациента на каждом экране.</p>
            </div>
            
            <div className="bg-onyx-900/50 border border-onyx-800 p-6 clip-diagonal hover:border-blue-500/30 transition-colors">
              <Syringe className="w-8 h-8 text-blue-500 mb-4" />
              <h4 className="text-xl font-bold text-white uppercase mb-2">Онлайн-запись 24/7</h4>
              <p className="text-neutral-400 font-sans text-sm">Удобные формы захвата позволяют пациенту записаться на прием ночью или в выходной день.</p>
            </div>

            <div className="bg-onyx-900/50 border border-onyx-800 p-6 clip-diagonal hover:border-blue-500/30 transition-colors">
              <ShieldCheck className="w-8 h-8 text-blue-500 mb-4" />
              <h4 className="text-xl font-bold text-white uppercase mb-2">Доверие и статус</h4>
              <p className="text-neutral-400 font-sans text-sm">Премиальный дизайн, который показывает высокий уровень клиники еще до первого визита пациента.</p>
            </div>
          </div>
          
        </div>
      </Container>
    </div>
  );
}
