import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, MessageCircle } from 'lucide-react';
import { sendLead } from '../lib/leads';

// Форма «Имя + телефон» с анимацией успеха. Используется и в FormSection (инлайн),
// и в LeadFormModal (поп-ап с обложки) — заявка в обоих случаях уходит в бота и в таблицу.
export function LeadForm({
  heading = 'Получить план вашего будущего сайта',
  subtitle = 'Обсудим проект и отправим вам чек-лист-инструкцию, в котором указаны все подводные камни поиска разработчика.',
  submitLabel = 'Получить чек-лист и консультацию',
}: {
  heading?: string;
  subtitle?: string;
  submitLabel?: string;
}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || submitting) return;
    setSubmitting(true);
    try {
      await sendLead(name.trim(), phone.trim());
    } catch {
      /* заявку всё равно считаем принятой — не блокируем UX */
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <AnimatePresence mode="wait">
      {!submitted ? (
        <motion.div
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <h3 className="heading-glow font-display font-semibold text-2xl md:text-[1.75rem] leading-tight tracking-tight mb-3">
            {heading}
          </h3>
          <p className="text-[14px] font-body text-fog leading-relaxed mb-8 max-w-md">
            {subtitle}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="lead-name" className="block font-mono text-[10px] tracking-[0.25em] uppercase text-fog mb-2">Имя</label>
              <input
                id="lead-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Как к вам обращаться"
                className="w-full rounded-2xl bg-ink/70 border border-white/10 px-5 py-4 text-[15px] font-body text-bone placeholder:text-fog/50 outline-none focus:border-cobalt focus:bg-ink transition-colors duration-300"
              />
            </div>
            <div>
              <label htmlFor="lead-phone" className="block font-mono text-[10px] tracking-[0.25em] uppercase text-fog mb-2">Номер телефона</label>
              <input
                id="lead-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (___) ___-__-__"
                className="w-full rounded-2xl bg-ink/70 border border-white/10 px-5 py-4 text-[15px] font-body text-bone placeholder:text-fog/50 outline-none focus:border-cobalt focus:bg-ink transition-colors duration-300"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-3 rounded-full bg-cobalt text-white font-body font-semibold text-base py-5 mt-2 hover:bg-bone hover:text-ink transition-all duration-300 shadow-[0_10px_40px_rgba(78,124,255,0.28)] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              {submitting ? 'Отправляем…' : submitLabel}
            </button>

            <p className="flex items-center justify-center gap-2 text-[12px] font-body text-fog/80 pt-2 text-center">
              <MessageCircle className="w-3.5 h-3.5 text-cobalt-soft shrink-0" />
              Свяжемся с вами в течение 40 минут в WhatsApp, без звонков.
            </p>
          </form>
        </motion.div>
      ) : (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[340px] flex flex-col items-center justify-center text-center py-6"
        >
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 18 }}
            className="w-20 h-20 rounded-full bg-cobalt/15 border border-cobalt/40 flex items-center justify-center mb-7"
          >
            <span className="absolute w-20 h-20 rounded-full bg-cobalt/20 animate-ping" />
            <Check className="w-9 h-9 text-cobalt-soft relative" strokeWidth={2.5} />
          </motion.div>
          <h3 className="font-display font-semibold text-2xl text-white mb-3">Заявка отправлена</h3>
          <p className="text-[15px] font-body text-fog leading-relaxed max-w-sm">
            Мы свяжемся с вами в WhatsApp в течение 40 минут.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
