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
      className="fixed inset-0 z-[100] bg-onyx-950/90 backdrop-blur-md overflow-y-auto"
      onClick={handleOverlayClick}
    >
      <div className="min-h-full flex items-start justify-center p-4 sm:p-8">
        <div className="bg-onyx-900 border border-onyx-700 w-full max-w-5xl relative clip-diagonal shadow-[0_0_50px_rgba(59,130,246,0.15)] p-6 md:p-10 mt-8 mb-16">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 text-neutral-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight mb-8 pr-8 mt-2 md:mt-0">
          Дополнительные опции
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {addons.map((a, i) => (
            <div key={i} className="bg-[#1c2f63] border border-onyx-500/50 p-6 flex flex-col hover:border-blue-400/50 transition-all group hover:shadow-[0_0_30px_rgba(147,197,253,0.3)] clip-diagonal relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 blur-[50px] pointer-events-none group-hover:bg-blue-400/20 transition-colors" />
              <h4 className="font-black uppercase tracking-tight text-lg mb-3 min-h-[56px] text-neutral-200 group-hover:text-white transition-colors">{a.title}</h4>
              <div className="text-xl font-black tracking-tight mb-3 text-blue-500 group-hover:text-blue-300 transition-colors drop-shadow-[0_0_5px_rgba(59,130,246,0.5)] group-hover:drop-shadow-[0_0_5px_rgba(147,197,253,0.5)]">{a.price}</div>
              <p className="text-sm text-neutral-300 mb-6 flex-grow leading-relaxed group-hover:text-white transition-colors">{a.desc}</p>
              <button 
                className="w-full border border-onyx-500/50 bg-onyx-800 text-white text-[10px] uppercase tracking-[0.2em] py-3 px-4 clip-diagonal group-hover:border-blue-400 group-hover:bg-blue-400/20 group-hover:text-white transition-all font-black group-hover:shadow-[0_0_15px_rgba(147,197,253,0.3)]"
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
            className="border border-onyx-500/50 bg-onyx-800 text-white text-xs uppercase tracking-[0.2em] py-4 px-8 clip-diagonal hover:border-blue-400 hover:bg-blue-400/20 transition-all font-black hover:shadow-[0_0_15px_rgba(147,197,253,0.3)]"
          >
            Вернуться на сайт
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
