import React, { useState } from 'react';
import { Button } from './ui';
import { X } from 'lucide-react';

export default function ContactForm({ isModal = false, isPartner = false, onClose }: { isModal?: boolean, isPartner?: boolean, onClose?: () => void }) {
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
 company: formData.get('company'),
 socials: formData.get('socials'),
 business: `Ниша: ${formData.get('niche')}`,
 niche: formData.get('niche'),
 promocode: formData.get('promocode'),
 date: new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })
 };

 // Чтобы заявки начали приходить в гугл таблицу:
 const GOOGLE_SCRIPT_URL = isPartner
 ? (import.meta.env.VITE_PARTNER_GOOGLE_SCRIPT_URL || "") // Вставьте сюда URL скрипта для новой таблицы партнеров
 : "https://script.google.com/macros/s/AKfycby0CXnLnIyY3sfJSlGEwERIkYal-DdxWG0cz-m4DlnUq5nimNC8meaAeDN2ivoAYLpbCQ/exec";

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
 const text = `🔥 *Новая заявка с сайта!* ${isPartner ? '(ПАРТНЕР)' : ''}\n\n*Название компании:* ${data.company || '-'}\n*Ниша:* ${data.niche || '-'}\n*Телефон:* ${data.phone || '-'}\n*Соцсети:* ${data.socials || '-'}\n${!isPartner ? `*Промокод:* ${data.promocode || '-'}\n` : ''}*Дата:* ${data.date}\n `;

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
 <h3 className="text-heading tracking-heading mb-2 text-bone ">
 {isPartner ? "Стать партнером" : "Начать проект"}
 </h3>
 <p className="text-pale-stone font-mono text-caption uppercase tracking-caption">
 {isPartner ? "Заполните анкету для сотрудничества" : "Заполните бриф для старта работы"}
 </p>
 </div>

 {submitted ? (
 <div className="bg-obsidian-canvas border border-[#a0ca92] text-metric-green p-8 rounded-lg font-mono text-caption uppercase tracking-caption text-center relative z-10">
 Заявка успешно отправлена
 </div>
 ) : (
 <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
 <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
 <Input name="company" placeholder="1. Название компании" required />
 <Input name="niche" placeholder="2. Ниша" required />
 <Input name="phone" placeholder="3. Телефон" required />
 <Input name="socials" placeholder="4. Соцсети (ссылки)" />
 {!isPartner && <Input name="promocode" placeholder="5. Промокод (если есть)" />}
 </div>

 <div className="mt-8">
 <Button type="submit" disabled={loading} className="w-full w-full">
 {loading ? "Отправка..." : "Отправить заявку"}
 </Button>
 </div>
 </form>
 )}
 </>
 );

 if (isModal) {
 return (
 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-canvas/80 backdrop-blur-md overflow-y-auto pt-24 pb-12 ">
 
 <div className="relative w-full max-w-2xl bg-carbon-lift border border-ash-stroke rounded-lg p-8 mt-auto mb-auto group transition-colors">
 
 <button onClick={onClose} className="absolute top-4 right-4 text-warm-granite hover:text-bone transition-colors">
 <X size={32} strokeWidth={1} />
 </button>
 {formContent}
 </div>
 </div>
 );
 }

 return (
 <div className="w-full max-w-3xl border-l border-ash-stroke pl-8 md:pl-16 py-8 relative">
 
 {formContent}
 </div>
 );
}

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
 <input
 {...props}
 className="w-full bg-obsidian-canvas border border-ash-stroke rounded-sm py-3 px-4 text-bone placeholder-[#8a8380] focus:outline-none focus:border-[#eeeeee] hover:border-warm-granite transition-colors text-body"
 />
);
