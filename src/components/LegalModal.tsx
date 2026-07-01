import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function LegalModal() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setOpenSection(customEvent.detail);
    };

    document.addEventListener('open-legal', handleOpen);
    return () => document.removeEventListener('open-legal', handleOpen);
  }, []);

  if (!openSection) return null;

  let title = '';
  let content = '';

  if (openSection === 'privacy') {
    title = 'Политика обработки персональных данных';
    content = 'Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных»... (текст будет добавлен позже)';
  } else if (openSection === 'terms') {
    title = 'Пользовательское соглашение (оферта)';
    content = 'Настоящее Пользовательское соглашение (Оферта) является официальным документом... (текст будет добавлен позже)';
  } else if (openSection === 'payment') {
    title = 'Условия оплаты, доставки и возврата';
    content = 'Оплата услуг производится безналичным расчетом... Доставка осуществляется в электронном виде... (текст будет добавлен позже)';
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-onyx-950/90 backdrop-blur-md overflow-y-auto pt-24 pb-12">
      <div className="relative w-full max-w-3xl bg-onyx-900 border border-blue-400 p-8 clip-diagonal shadow-[0_0_50px_rgba(147,197,253,0.2)]">
        <button 
          onClick={() => setOpenSection(null)} 
          className="absolute top-4 right-4 text-blue-300 hover:text-blue-500 transition-colors drop-shadow-[0_0_5px_currentColor]"
        >
          <X size={32} strokeWidth={1} />
        </button>
        <h2 className="text-2xl font-black text-white uppercase tracking-wide mb-6 pr-8">{title}</h2>
        <div className="text-neutral-300 font-mono text-sm leading-relaxed whitespace-pre-line">
          {content}
        </div>
        <div className="mt-8 pt-6 border-t border-onyx-800 text-xs text-neutral-500">
          Данная страница носит информационный характер. Пожалуйста, предоставьте точные юридические документы для публикации на сайте.
        </div>
      </div>
    </div>
  );
}
