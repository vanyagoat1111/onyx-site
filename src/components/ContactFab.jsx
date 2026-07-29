import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Send, X, Phone } from 'lucide-react';
import { WHATSAPP_LINK, BOT_LINK, TELEGRAM_QUESTIONS_LINK } from '../lib/leads';
import { usePastIntro } from '../lib/scene';

/* Плавающие кнопки связи.
   Стоят слева внизу: справа у демо-шаблонов живёт кнопка редактора,
   и две плашки в одном углу перекрывали бы друг друга на телефоне.

   Появляются не сразу, а после первого экрана: человеку, который только
   открыл сайт, ещё не о чем спрашивать, а плашка уже закрывает контент. */

const ease = [0.22, 1, 0.36, 1];

const channels = [
  {
    key: 'wa',
    label: 'WhatsApp',
    note: 'Ответим за 30 минут',
    href: WHATSAPP_LINK,
    icon: Phone,
    color: '#25D366',
  },
  {
    key: 'tg',
    label: 'Telegram',
    note: 'Написать менеджеру',
    href: TELEGRAM_QUESTIONS_LINK,
    icon: Send,
    color: '#2AABEE',
  },
  {
    key: 'bot',
    label: 'Бесплатный аудит',
    note: 'Разбор сайта за 2 минуты',
    href: `${BOT_LINK}?start=audit`,
    icon: MessageCircle,
    color: '#4E7CFF',
  },
];

export default function ContactFab() {
  const [open, setOpen] = useState(false);
  const [scrolledEnough, setScrolledEnough] = useState(false);

  /* Первый экран теперь собирается по прокрутке и занимает три с лишним
     высоты окна, поэтому одного порога в 600 пикселей мало: кнопка
     выскакивала бы прямо посреди сборки, на почти пустом экране.
     Ждём, пока вступление окажется позади. Если вступления нет -
     отключены анимации, скрипт не выполнился - хук отдаёт true,
     и поведение остаётся прежним. */
  const pastIntro = usePastIntro();
  const shown = scrolledEnough && pastIntro;

  useEffect(() => {
    const onScroll = () => setScrolledEnough(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Esc закрывает список - привычное поведение, дешёвое в реализации
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease }}
          className="fixed left-4 bottom-4 sm:left-6 sm:bottom-6 z-40 flex flex-col items-start gap-2.5"
        >
          <AnimatePresence>
            {open && channels.map((c, i) => (
              <motion.a
                key={c.key}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -12, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -12, scale: 0.96 }}
                transition={{ duration: 0.22, delay: i * 0.04, ease }}
                onClick={() => setOpen(false)}
                className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-2/95 backdrop-blur-xl pl-3 pr-5 py-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.45)] hover:border-white/25 transition-colors"
              >
                <span
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${c.color}1F`, border: `1px solid ${c.color}55` }}
                >
                  <c.icon className="w-4 h-4" style={{ color: c.color }} />
                </span>
                <span className="text-left">
                  <span className="block text-[13px] font-body font-semibold text-bone leading-tight">
                    {c.label}
                  </span>
                  <span className="block text-[11px] font-body text-fog leading-tight mt-0.5">
                    {c.note}
                  </span>
                </span>
              </motion.a>
            ))}
          </AnimatePresence>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Закрыть способы связи' : 'Связаться с нами'}
            aria-expanded={open}
            className="relative w-14 h-14 rounded-full bg-cobalt text-white flex items-center justify-center shadow-[0_8px_30px_rgba(78,124,255,0.45)] hover:bg-bone hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-6 h-6" />}
            {!open && (
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#25D366] border-2 border-ink" />
            )}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
