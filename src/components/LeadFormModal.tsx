import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';
import { LeadForm } from './LeadForm';

export default function LeadFormModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/90 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -3, y: 30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotate: 2, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[28px] border border-cobalt/30 bg-ink-2/95 p-7 md:p-10 shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
          >
            <div className="absolute -top-1/2 right-0 w-2/3 aspect-square rounded-full bg-cobalt/[0.15] blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-1/3 -left-1/4 w-1/2 aspect-square rounded-full bg-cobalt/[0.1] blur-[100px] pointer-events-none" />

            <button
              onClick={onClose}
              aria-label="Закрыть"
              className="absolute top-5 right-5 w-9 h-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-fog hover:text-white hover:border-cobalt/50 hover:bg-cobalt/10 transition-all duration-300 z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative flex items-center gap-2 mb-6">
              <span className="w-8 h-8 rounded-full bg-cobalt/15 border border-cobalt/40 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-cobalt-soft" />
              </span>
              <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-cobalt-soft">Начнём прямо сейчас</span>
            </div>

            <div className="relative">
              <LeadForm
                heading="Начинаем разработку вашего сайта"
                subtitle="Оставьте имя и телефон — покажем план сайта и подготовим бесплатный чек-лист по запуску."
                submitLabel="Начать разработку"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
