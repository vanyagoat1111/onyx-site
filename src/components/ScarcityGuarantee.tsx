import React from 'react';
import { Container } from './ui';

export default function ScarcityGuarantee() {
  return (
    <Container className="bg-onyx-900 border-b border-onyx-800 relative overflow-hidden">
      <img src="https://images.unsplash.com/photo-1633526543814-9710c77a314f?q=80&w=2500&auto=format&fit=crop" alt="Abstract dark" className="absolute inset-0 w-full h-full object-cover grayscale opacity-10 mix-blend-screen pointer-events-none" referrerPolicy="no-referrer" />
      <div className="grid md:grid-cols-2 gap-16 md:gap-32 relative z-10">
        <div className="space-y-8">
          <h3 className="text-neutral-500 font-mono text-sm tracking-[0.2em] uppercase border-l-2 border-onyx-600 pl-4">Эффект дефицита</h3>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-tight text-white">
            Ограниченная квота
          </h2>
          <p className="font-sans text-xl leading-relaxed font-bold text-neutral-200">
            Мы берем не более 5 проектов в месяц на абонентское обслуживание.
          </p>
          <p className="font-sans text-lg text-neutral-400 leading-relaxed">
            Это необходимо, чтобы гарантировать команде инженеров максимальное погружение в архитектуру проекта и высочайшее качество каждого пикселя. Успейте забронировать место для вашего бренда.
          </p>
          <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2500&auto=format&fit=crop" alt="Cyber" className="w-full h-48 object-cover clip-diagonal grayscale opacity-70 mt-8 shadow-2xl" referrerPolicy="no-referrer" />
        </div>

        <div className="space-y-8 flex flex-col justify-center mt-8 md:mt-0">
          <h3 className="text-neutral-500 font-mono text-sm tracking-[0.2em] uppercase border-l-2 border-onyx-600 pl-4">Предоставление гарантии</h3>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-tight text-white">
            Железобетонная гарантия
          </h2>
          <div className="bg-onyx-800 p-8 clip-diagonal border border-onyx-700 relative overflow-hidden mt-4">
            <img src="https://images.unsplash.com/photo-1614064641913-6b7140414c71?q=80&w=2500&auto=format&fit=crop" alt="Security" className="absolute inset-0 w-full h-full object-cover grayscale opacity-20 mix-blend-overlay pointer-events-none" referrerPolicy="no-referrer" />
            <div className="relative z-10">
              <p className="font-sans text-lg text-neutral-300 leading-relaxed mb-4">
                Если в течение первых 14 дней после запуска сайта вы найдете техническую ошибку или несоответствие утвержденному сценарию — мы исправим это вне очереди и абсолютно бесплатно.
              </p>
              <p className="font-mono text-sm font-bold uppercase tracking-widest border-t border-onyx-700 pt-4 mt-4 text-white">
                Вы платите за работающий инструмент, а не за обещания.
              </p>
            </div>
          </div>
         </div>
      </div>
    </Container>
  );
}
