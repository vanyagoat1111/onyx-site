import React from 'react';
import { X } from 'lucide-react';

const addons = [
 {
 title: 'Подключение оплаты',
 price: '5 990р',
 desc: 'Через ЮKassa, Т-Банк или CloudPayments.',
 action: 'Оплатить'
 },
 {
 title: 'Подключение CRM',
 price: '9 990р',
 desc: 'Битрикс24, amoCRM. Клиент -> Сайт -> CRM -> Менеджер.',
 action: 'Оплатить'
 },
 {
 title: 'Индивидуальный Дизайн',
 price: 'от 15 000р',
 desc: 'Разработка уникального дизайна по вашему промпту.',
 action: 'Оплатить'
 },
 {
 title: 'SMM ONYX',
 price: 'от 50 000р / мес',
 desc: 'Ведение вашего бизнеса под ключ в ONYX SMM.',
 action: 'Подробнее'
 },
 {
 title: 'Настройка Аналитики',
 price: '3 990р',
 desc: 'Яндекс Метрика, Google Analytics.',
 action: 'Оплатить'
 },
 {
 title: 'Онлайн Запись',
 price: '6 990р',
 desc: 'Для стоматологий, фитнес-клубов, салонов, мед.центров. Подключаются сторонние сервисы записи.',
 action: 'Оплатить'
 },
 {
 title: 'Telegram Уведомления',
 price: '3 990р',
 desc: 'Новые заявки сразу приходят в Telegram владельца.',
 action: 'Оплатить'
 }
];

export default function AddonsModal({ onClose }: { onClose: () => void }) {
 const handleOverlayClick = (e: React.MouseEvent) => {
 if (e.target === e.currentTarget) {
 onClose();
 }
 };

 return (
 <div 
 className="fixed inset-0 z-[100] bg-obsidian-canvas/80 backdrop-blur-md overflow-y-auto"
 onClick={handleOverlayClick}
 >
 <div className="min-h-full flex items-start justify-center p-4 sm:p-8">
 <div className="bg-carbon-lift border border-ash-stroke rounded-lg w-full max-w-5xl relative p-6 md:p-10 mt-8 mb-16 shadow-none">
 <button 
 onClick={onClose}
 className="absolute top-4 right-4 md:top-6 md:right-6 text-warm-granite hover:text-bone transition-colors"
 >
 <X size={24} />
 </button>

 <h3 className="text-heading text-bone tracking-heading mb-8 pr-8 mt-2 md:mt-0">
 Дополнительные опции
 </h3>

 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
 {addons.map((a, i) => (
 <div key={i} className="bg-transparent border border-ash-stroke rounded-sm p-6 flex flex-col hover:border-warm-granite transition-all group relative overflow-hidden">
 
 <h4 className="text-[24px] tracking-tight mb-3 min-h-[56px] text-bone">{a.title}</h4>
 <div className="font-mono text-caption uppercase tracking-caption mb-3 text-bone">{a.price}</div>
 <p className="text-warm-granite font-sans text-body leading-body mb-6 flex-grow group-hover:text-bone transition-colors">{a.desc}</p>
 <button 
 className="w-full bg-obsidian-canvas border border-ash-stroke rounded-sm text-bone text-body-sm py-3 px-4 hover:border-warm-granite transition-colors"
 onClick={() => {
 onClose();
 setTimeout(() => {
 document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
 }, 100);
 }}
 >
 {a.action}
 </button>
 </div>
 ))}
 </div>

 <div className="mt-10 flex justify-center">
 <button 
 onClick={onClose}
 className="bg-obsidian-canvas border border-ash-stroke rounded-sm text-bone text-body-sm py-4 px-8 hover:border-warm-granite transition-colors"
 >
 Вернуться на сайт
 </button>
 </div>
 </div>
 </div>
 </div>
 );
}
