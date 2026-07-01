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
      // Сохраняем старые ключи для совместимости со скриптом отправки в Telegram
      fio: formData.get('company') ? `Заявка от: ${formData.get('company')}` : 'Новая заявка',
      phone: formData.get('phone'),
      position: `Адрес: ${formData.get('address')}`,
      city: formData.get('city'),
      business: `Ниша: ${formData.get('niche')}, Услуги: ${formData.get('services')}`,
      company: formData.get('company'),
      socials: `${formData.get('socials')} | Фото: ${formData.get('photo')}`,
      vision: `Цвета: ${formData.get('colors')} | Доп. функции: ${formData.get('features')}`,
      source: `Преимущества: ${formData.get('advantages')}`,

      // Новые ключи на всякий случай
      niche: formData.get('niche'),
      services: formData.get('services'),
      advantages: formData.get('advantages'),
      address: formData.get('address'),
      photo: formData.get('photo'),
      colors: formData.get('colors'),
      features: formData.get('features'),
      date: new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })
    };

    // Чтобы заявки начали приходить в гугл таблицу:
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby0CXnLnIyY3sfJSlGEwERIkYal-DdxWG0cz-m4DlnUq5nimNC8meaAeDN2ivoAYLpbCQ/exec";

    try {
      // Отправка в Google Таблицу
      if (GOOGLE_SCRIPT_URL) {
        fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }).catch(err => console.error("Ошибка при отправке в Google Таблицы", err));
      }

      // Отправка в Telegram
      const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;
      
      if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
        const text = `
🔥 *Новая заявка с сайта!*

*Название компании:* ${data.company || '-'}
*Ниша:* ${data.niche || '-'}
*Город:* ${data.city || '-'}
*Услуги:* ${data.services || '-'}
*Преимущества:* ${data.advantages || '-'}
*Телефон:* ${data.phone || '-'}
*Адрес:* ${data.address || '-'}
*Соцсети:* ${data.socials || '-'}
*Фото/лого:* ${data.photo || '-'}
*Цвета:* ${data.colors || '-'}
*Доп. функции:* ${data.features || '-'}
*Дата:* ${data.date}
        `;

        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: text,
            parse_mode: 'Markdown',
          }),
        });
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
            <Input name="company" placeholder="1. Название компании" required />
            <Input name="niche" placeholder="2. Ниша" required />
            <Input name="city" placeholder="3. Город" required />
            <Input name="services" placeholder="4. Услуги" required />
            <Input name="advantages" placeholder="5. Преимущества" required />
            <Input name="phone" placeholder="6. Телефон" required />
            <Input name="address" placeholder="7. Адрес" required />
            <Input name="socials" placeholder="8. Соцсети (ссылки)" />
            <div className="sm:col-span-2">
              <Input name="photo" placeholder="9. Ссылка на фото/логотип" />
            </div>
            <div className="sm:col-span-2">
              <Input name="colors" placeholder="10. Пожелания по цветам" />
            </div>
            <div className="sm:col-span-2 relative mt-2">
              <Input
                name="features"
                placeholder="11. Нужны ли доп. функции (корзина, бронирование и т.д.)?"
              />
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
