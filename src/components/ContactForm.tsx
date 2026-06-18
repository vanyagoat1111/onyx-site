import React, { useState } from 'react';
import { Button } from './ui';
import { X } from 'lucide-react';

export default function ContactForm({ isModal = false, onClose }: { isModal?: boolean, onClose?: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Собираем данные из формы
    const formData = new FormData(e.currentTarget);
    const data = {
      fio: formData.get('fio'),
      phone: formData.get('phone'),
      position: formData.get('position'),
      city: formData.get('city'),
      business: formData.get('business'),
      company: formData.get('company'),
      socials: formData.get('socials'),
      vision: formData.get('vision'),
      source: formData.get('source'),
      date: new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })
    };

    // Чтобы заявки начали приходить в гугл таблицу, 
    // необходимо вставить ссылку Google Apps Script вебхука вместо пустой строки
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby0CXnLnIyY3sfJSlGEwERIkYal-DdxWG0cz-m4DlnUq5nimNC8meaAeDN2ivoAYLpbCQ/exec"; 

    try {
      if (GOOGLE_SCRIPT_URL) {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // Важно для запросов к Google Scripts с клиента
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      } else {
        console.log("Form data (Google Webhook not configured yet):", data);
      }
    } catch (error) {
      console.error("Ошибка при отправке", error);
    }

    setLoading(false);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      onClose?.();
    }, 5000);
  };

  const formContent = (
    <>
      <div className="mb-8">
        <h3 className="text-3xl font-bold uppercase tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-violet-700 drop-shadow-[0_0_15px_rgba(124,58,237,0.3)]">Начать проект</h3>
        <p className="text-violet-500 font-mono text-sm">Заполните бриф для старта работы</p>
      </div>

      {submitted ? (
        <div className="bg-violet-700 text-white p-8 clip-diagonal font-bold uppercase tracking-widest text-center shadow-[0_0_30px_rgba(109,40,217,0.5)]">
          Заявка успешно отправлена
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Input name="fio" placeholder="1. ФИО" required />
            <Input name="phone" placeholder="2. Контактный телефон / Telegram" required />
            <Input name="position" placeholder="3. Должность в компании" required />
            <Input name="city" placeholder="4. Город" required />
            <Input name="business" placeholder="5. Род деятельности бизнеса" required />
            <Input name="company" placeholder="6. Название компании" required />
            <Input name="socials" placeholder="7. Ссылки на соц сети компании" />
            <div className="relative group">
              <textarea 
                name="vision"
                placeholder="8. Ваше видение сайта. Требования к визуалу и функционалу?" 
                rows={4}
                className="w-full bg-onyx-800 border border-onyx-700 p-4 text-white placeholder-neutral-600 focus:outline-none focus:border-violet-600 hover:border-onyx-600 transition-colors font-sans resize-none clip-diagonal"
              ></textarea>
            </div>
            <Input name="source" placeholder="9. Откуда узнали о студии ONYX?" />
          </div>
          <Button type="submit" disabled={loading} className="w-full hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow">
            {loading ? "Отправка..." : "Отправить бриф"}
          </Button>
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
    className="w-full bg-onyx-800 border-b border-onyx-700 pb-2 pt-4 px-2 text-white placeholder-neutral-600 focus:outline-none focus:border-violet-600 hover:border-onyx-600 transition-colors font-sans"
  />
);
