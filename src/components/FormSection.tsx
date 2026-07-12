import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Container, Reveal } from './ui';
import { Search, ArrowUpRight, Check, MessageCircle } from 'lucide-react';

// Telegram-бот ONYX для лидов. Если появится отдельный контакт/ссылка на аудит — заменить здесь.
const AUDIT_LINK = 'https://t.me/onyxwebsites_bot';

// Отправка заявки в Telegram владельцу (если заданы переменные окружения).
// Токен/чат берутся из env; без них форма всё равно показывает успех (placeholder).
async function sendLead(name: string, phone: string) {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
  if (!token || !chatId) return; // TODO: подключить endpoint приёма заявок
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: `Новая заявка с сайта ONYX\nИмя: ${name}\nТелефон: ${phone}`,
    }),
  });
}

export default function FormSection() {
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
    <Container id="contact-form" className="relative scroll-mt-20 !py-24 md:!py-32">
      <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16 items-stretch">
        {/* ── Аудит: замена блока «Готовы начать проект?» ── */}
        <Reveal className="flex">
          <div className="relative w-full rounded-[28px] border border-white/[0.09] bg-ink-2/60 overflow-hidden p-8 md:p-10 flex flex-col justify-between">
            <div className="absolute inset-0 dot-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_75%)] pointer-events-none" />
            <div className="absolute -top-1/3 -left-1/4 w-2/3 aspect-square rounded-full bg-cobalt/[0.08] blur-[110px] pointer-events-none" />

            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-10 bg-white/20" />
                <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-fog">Уже есть сайт?</span>
              </div>
              <h2 className="font-display font-semibold text-2xl md:text-[2rem] leading-[1.15] tracking-tight text-bone mb-5 [text-wrap:balance]">
                Расскажем, как должен выглядеть ваш сайт
              </h2>
              <p className="text-[15px] font-body text-fog leading-relaxed max-w-md">
                Если у вас уже есть сайт, проведём бесплатный аудит, выявим слабые места и расскажем, как их улучшить.
              </p>
            </div>

            <div className="relative mt-10">
              <button
                onClick={() => window.open(AUDIT_LINK, '_blank')}
                className="group inline-flex items-center gap-3 rounded-full border border-cobalt/40 bg-cobalt/10 text-bone font-body font-semibold text-sm px-7 py-4 hover:bg-cobalt hover:text-white transition-all duration-300"
              >
                <Search className="w-4 h-4 text-cobalt-soft group-hover:text-white transition-colors" />
                Получить бесплатный аудит
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
              </button>
            </div>
          </div>
        </Reveal>

        {/* ── Форма заявки ── */}
        <Reveal delay={0.1} className="flex">
          <div className="relative w-full rounded-[28px] border border-white/[0.09] bg-ink-2/70 overflow-hidden p-8 md:p-10">
            <div className="absolute -top-1/2 right-0 w-2/3 aspect-square rounded-full bg-cobalt/[0.12] blur-[120px] pointer-events-none" />

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
                  <h3 className="font-display font-semibold text-2xl md:text-[1.75rem] leading-tight tracking-tight text-bone mb-3">
                    Получить план вашего будущего сайта
                  </h3>
                  <p className="text-[14px] font-body text-fog leading-relaxed mb-8 max-w-md">
                    Обсудим проект и отправим вам чек-лист-инструкцию, в котором указаны все подводные камни поиска разработчика.
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
                      className="w-full flex items-center justify-center gap-3 rounded-full bg-cobalt text-white font-body font-semibold text-base py-5 mt-2 hover:bg-bone hover:text-ink transition-all duration-300 shadow-[0_10px_40px_rgba(78,124,255,0.28)] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Отправляем…' : 'Получить чек-лист и консультацию'}
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
                  <h3 className="font-display font-semibold text-2xl text-bone mb-3">Заявка отправлена</h3>
                  <p className="text-[15px] font-body text-fog leading-relaxed max-w-sm">
                    Мы свяжемся с вами в WhatsApp в течение 40 минут.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </Container>
  );
}
