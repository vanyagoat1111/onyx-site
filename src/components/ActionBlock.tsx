import React from 'react';
import { Container, SectionTitle, Button } from './ui';
import { motion } from 'motion/react';

export default function ActionBlock() {
  return (
    <Container className="bg-onyx-950 border-y border-onyx-800 relative overflow-hidden py-20 md:py-32">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <SectionTitle subtitle="План действий" className="!mb-6">
              Оставьте заявку — мы покажем, какой сайт нужен вашему бизнесу
            </SectionTitle>
            <div className="w-24 h-2 bg-blue-600 mb-8 shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
          </div>
          
          <div className="text-lg text-neutral-300 font-sans leading-relaxed font-light space-y-6">
            <p>
              Вам не нужно разбираться в дизайне, доменах, хостинге, структуре сайта и технических настройках.
            </p>
            <p>
              Вы оставляете заявку, а мы изучаем ваш бизнес, смотрим текущую упаковку, находим слабые места и предлагаем понятный план сайта: какие блоки нужны, какие услуги показать, как усилить доверие и как принимать заявки.
            </p>
            <p className="font-medium text-white">
              После этого вы понимаете, каким должен быть ваш сайт, за что вы платите и как ONYX может запустить его без оплаты разработки.
            </p>
            <p className="pt-4 border-t border-onyx-800">
              А также мы подготовили для вас бесплатный чек-лист-инструкцию по созданию сайта для вашего бизнеса.
            </p>
            
            <div className="pt-4 flex flex-col gap-2 max-w-sm">
              <Button className="w-full min-h-[64px] text-base" onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth'})}>
                Получить чек-лист
              </Button>
              <span className="text-xs text-neutral-500 text-center font-mono uppercase tracking-wider">
                Узнайте о всех подводных камнях в разработке сайта и поиске разработчика.
              </span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
