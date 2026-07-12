import React from 'react';
import { Container, SectionTitle } from './ui';
import { Check } from 'lucide-react';

export default function FormSection() {
  return (
    <Container id="contact-form" className="bg-onyx-950 border-y border-onyx-800 py-20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <SectionTitle className="!mb-6">Расскажите, каким должен быть ваш сайт</SectionTitle>
        <p className="text-lg text-neutral-300 font-sans leading-relaxed font-light mb-12">
          Напишите нам в Telegram. Мы зададим несколько вопросов о вашем бизнесе и предложим понятный план: какая структура нужна, какие функции помогут получать заявки и сколько будет стоить запуск.
        </p>
        
        <div className="bg-onyx-900/60 backdrop-blur-sm border border-onyx-800 p-8 md:p-12 clip-diagonal max-w-2xl mx-auto mb-10 text-left hover:border-blue-500/30 transition-colors duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <h4 className="font-bold text-white mb-6 text-xl text-center">Что мы обсудим:</h4>
          <ul className="space-y-4 mb-8">
             <li className="flex gap-4 text-neutral-300 items-start">
               <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /> 
               Чем занимается компания и кто ваши клиенты.
             </li>
             <li className="flex gap-4 text-neutral-300 items-start">
               <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /> 
               Какую главную задачу должен решать сайт.
             </li>
             <li className="flex gap-4 text-neutral-300 items-start">
               <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /> 
               Что у вас уже есть: логотип, фото, тексты или соцсети.
             </li>
          </ul>
          
          <button 
            onClick={() => window.open('https://t.me/onyxwebsites_bot', '_blank')}
            className="w-full py-5 bg-blue-600 text-white font-black uppercase tracking-[0.2em] text-sm clip-diagonal hover:bg-white hover:text-blue-600 transition-all duration-500 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)]"
          >
            Обсудить сайт
          </button>
        </div>
        
        <div className="text-sm text-neutral-500 max-w-xl mx-auto">
          Вы оставляете заявку — а мы думаем, как сделать так, чтобы сайт начал работать на ваш бизнес, а не просто висел в интернете.
        </div>
      </div>
    </Container>
  );
}
