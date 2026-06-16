import React, { useState } from 'react';
import { Button } from './ui';
import { X } from 'lucide-react';

export default function ContactForm({ isModal = false, onClose }: { isModal?: boolean, onClose?: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose?.();
    }, 3000);
  };

  const formContent = (
    <>
      <div className="mb-8">
        <h3 className="text-3xl font-bold uppercase tracking-tight mb-2 text-white">Начать проект</h3>
        <p className="text-blue-400 font-mono text-sm">Заполните бриф для старта работы</p>
      </div>

      {submitted ? (
        <div className="bg-blue-600 text-white p-8 clip-diagonal font-bold uppercase tracking-widest text-center shadow-[0_0_30px_rgba(37,99,235,0.5)]">
          Заявка успешно отправлена
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Input placeholder="1. ФИО" required />
            <Input placeholder="2. Контактный телефон / Telegram" required />
            <Input placeholder="3. Должность в компании" required />
            <Input placeholder="4. Город" required />
            <Input placeholder="5. Род деятельности бизнеса" required />
            <Input placeholder="6. Название компании" required />
            <Input placeholder="7. Ссылки на соц сети компании" />
            <div className="relative group">
              <textarea 
                placeholder="8. Ваше видение сайта. Требования к визуалу и функционалу?" 
                rows={4}
                className="w-full bg-onyx-800 border border-onyx-700 p-4 text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500 hover:border-onyx-600 transition-colors font-sans resize-none clip-diagonal"
              ></textarea>
            </div>
            <Input placeholder="9. Откуда узнали о студии ONYX?" />
          </div>
          <Button type="submit" className="w-full hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow">Отправить бриф</Button>
        </form>
      )}
    </>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto pt-24 pb-12">
        <div className="relative w-full max-w-2xl bg-onyx-900 border border-onyx-700 p-8 clip-diagonal mt-auto mb-auto">
          <button onClick={onClose} className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors">
            <X size={32} strokeWidth={1} />
          </button>
          {formContent}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl border-l-[4px] border-white pl-8 md:pl-16 py-8">
      {formContent}
    </div>
  );
}

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input 
    {...props}
    className="w-full bg-onyx-800 border-b border-onyx-700 pb-2 pt-4 px-2 text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500 hover:border-onyx-600 transition-colors font-sans"
  />
);
