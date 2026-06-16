import React from 'react';
import { Container } from './ui';

export default function ScarcityGuarantee() {
  return (
    <Container className="bg-white text-onyx-900 industrial-grid">
      <div className="grid md:grid-cols-2 gap-16 md:gap-32">
        <div className="space-y-8">
          <h3 className="text-onyx-500 font-mono text-sm tracking-[0.2em] uppercase border-l-2 border-onyx-900 pl-4">Эффект дефицита</h3>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-tight">
            Ограниченная квота
          </h2>
          <p className="font-sans text-xl leading-relaxed font-bold">
            Мы берем не более 5 проектов в месяц на абонентское обслуживание.
          </p>
          <p className="font-sans text-lg text-onyx-700 leading-relaxed">
            Это необходимо, чтобы гарантировать команде инженеров максимальное погружение в архитектуру проекта и высочайшее качество каждого пикселя. Успейте забронировать место для вашего бренда.
          </p>
        </div>

        <div className="space-y-8">
          <h3 className="text-onyx-500 font-mono text-sm tracking-[0.2em] uppercase border-l-2 border-onyx-900 pl-4">Предоставление гарантии</h3>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-tight">
            Железобетонная гарантия
          </h2>
          <div className="bg-onyx-100 p-8 clip-diagonal border border-onyx-300">
            <p className="font-sans text-lg text-onyx-800 leading-relaxed mb-4">
              Если в течение первых 14 дней после запуска сайта вы найдете техническую ошибку или несоответствие утвержденному сценарию — мы исправим это вне очереди и абсолютно бесплатно.
            </p>
            <p className="font-mono text-sm font-bold uppercase tracking-widest border-t border-onyx-300 pt-4 mt-4">
              Вы платите за работающий инструмент, а не за обещания.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
