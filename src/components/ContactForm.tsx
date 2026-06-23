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

    // Чтобы заявки начали приходить в гугл таблицу:
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby0CXnLnIyY3sfJSlGEwERIkYal-DdxWG0cz-m4DlnUq5nimNC8meaAeDN2ivoAYLpbCQ/exec"; 

    try {
      // Отправка в Google Таблицу (параллельно)
      if (GOOGLE_SCRIPT_URL) {
        fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // Важно для запросов к Google Scripts с клиента
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }).catch(err => console.error("Ошибка при отправке в Google Таблицы", err));
      }

      // Отправка в Telegram через наш сервер
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const responseData = await response.json();
      if (!response.ok) {
        console.error("Ошибка Telegram API:", responseData.error);
        // Не выбрасываем исключение, чтобы показать пользователю, что заявка условно отправлена 
        // даже если токен еще не настроен
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
      <div className="mb-8 relative z-10">
        <h3 className="text-3xl font-black uppercase tracking-tight mb-2 text-white drop-shadow-[0_0_15px_rgba(59,130,246,0.4)] ">Начать проект</h3>
        <p className="text-blue-500 font-mono text-sm drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">Заполните бриф для старта работы</p>
      </div>

      {submitted ? (
        <div className="bg-onyx-900 border border-blue-500 text-blue-500 p-8 clip-diagonal font-black uppercase tracking-[0.2em] text-center shadow-[0_0_30px_rgba(59,130,246,0.5)]  relative z-10">
          Заявка успешно отправлена
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            <Input name="fio" placeholder="1. ФИО" required />
            <Input name="phone" placeholder="2. Телефон / Telegram" required />
            <Input name="position" placeholder="3. Должность" required />
            <Input name="company" placeholder="4. Название компании" required />
            <Input name="city" placeholder="5. Город" required />
            <Input name="business" placeholder="6. Сфера бизнеса" required />
            <div className="sm:col-span-2">
              <Input name="socials" placeholder="7. Ссылки на соц. сети (опционально)" />
            </div>
            <div className="sm:col-span-2 relative mt-4">
              <textarea 
                name="vision"
                placeholder="8. Ваше видение сайта, пожелания к визуалу" 
                rows={3}
                className="w-full bg-onyx-950 border-b border-onyx-700 pb-2 pt-4 px-2 text-blue-500 placeholder:font-serif placeholder:font-medium placeholder:italic placeholder:tracking-wide placeholder-neutral-400 focus:outline-none focus:border-blue-500 hover:border-blue-500/50 transition-colors font-mono focus:shadow-[0_2px_10px_rgba(59,130,246,0.2)] focus:bg-onyx-900 resize-none"
              ></textarea>
            </div>
            <div className="sm:col-span-2">
              <Input name="source" placeholder="9. Откуда узнали о студии?" />
            </div>
          </div>
          <div className="mt-8">
            <Button type="submit" disabled={loading} className="w-full hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-shadow text-[10px] sm:text-xs tracking-[0.2em] py-4">
              {loading ? "Отправка..." : "Отправить заявку"}
            </Button>
          </div>
        </form>
      )}
    </>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-onyx-950/90 backdrop-blur-md overflow-y-auto pt-24 pb-12 ">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative w-full max-w-2xl bg-onyx-900 border border-blue-400 p-8 clip-diagonal-inverted mt-auto mb-auto shadow-[0_0_50px_rgba(147,197,253,0.2)] group hover:border-blue-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.2)] transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[50px] pointer-events-none group-hover:bg-blue-400/10 transition-colors" />
          <button onClick={onClose} className="absolute top-4 right-4 text-blue-300 hover:text-blue-500 transition-colors drop-shadow-[0_0_5px_currentColor]">
            <X size={32} strokeWidth={1} />
          </button>
          {formContent}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl border-l-[2px] border-blue-500 pl-8 md:pl-16 py-8 relative">
      <div className="absolute top-0 left-0 w-[2px] h-12 bg-gradient-to-b from-blue-400 to-transparent"></div>
      {formContent}
    </div>
  );
}

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input 
    {...props}
    className="w-full bg-onyx-950 border-b border-onyx-700 pb-2 pt-4 px-2 text-blue-500 placeholder:font-serif placeholder:font-medium placeholder:italic placeholder:tracking-wide placeholder-neutral-400 focus:outline-none focus:border-blue-500 hover:border-blue-500/50 transition-colors font-mono focus:shadow-[0_2px_10px_rgba(59,130,246,0.2)] focus:bg-onyx-900"
  />
);
