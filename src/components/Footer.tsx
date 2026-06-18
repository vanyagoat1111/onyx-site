import React from 'react';
import { Container } from './ui';
import ContactForm from './ContactForm';

export default function Footer() {
  return (
    <footer className="bg-onyx-950 border-t border-onyx-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-950/10 via-transparent to-transparent pointer-events-none" />
      <Container className="pt-24 pb-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4 max-w-md leading-none text-white">
              Заполните анкету ниже для разработки сайта
            </h2>
            <div className="w-24 h-1 bg-violet-600 mb-8 clip-diagonal shadow-[0_0_15px_rgba(124,58,237,0.8)]" />
            <p className="text-neutral-400 font-mono text-sm leading-relaxed mb-12">
              Оставьте заявку, и мы свяжемся с вами в течение рабочего дня для обсуждения деталей проекта, задач и подбора оптимального архитектурного решения.
            </p>
            <div className="flex flex-col gap-4 text-sm font-bold uppercase tracking-widest text-neutral-500">
              <a href="mailto:bossybestzzz@gmail.com" className="hover:text-white transition-colors flex items-center gap-4">
                <span className="w-8 h-[1px] bg-onyx-700"></span> bossybestzzz@gmail.com
              </a>
              <a href="tel:+79082420204" className="hover:text-white transition-colors flex items-center gap-4">
                <span className="w-8 h-[1px] bg-onyx-700"></span> +7 (908) 242-02-04
              </a>
              <a href="https://t.me/onyxcoop" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-4">
                <span className="w-8 h-[1px] bg-onyx-700"></span> Telegram: @onyxcoop
              </a>
            </div>
          </div>
          
          <div className="bg-onyx-900/50 p-4 md:p-8 border border-violet-950/50 clip-diagonal industrial-grid relative group shadow-[0_0_30px_rgba(46,16,101,0.2)]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-950/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <ContactForm isModal={false} />
          </div>
        </div>

        <div className="border-t border-violet-950/30 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs font-mono text-neutral-600 uppercase tracking-widest relative z-10">
          <div className="space-y-4">
            <div>© 2026 ONYX STUDIO. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</div>
            <div className="text-[10px] md:text-xs text-neutral-500 space-y-1">
              <div className="block">Самозанятый: Бутаев Давид Александрович</div>
              <div className="block">ИНН: 540538092505</div>
              <div className="block">Email: <a href="mailto:butatygoth@mail.ru" className="hover:text-white transition-colors">butatygoth@mail.ru</a></div>
              <div className="block">Телефон: <a href="tel:+79223767525" className="hover:text-white transition-colors">+7 (922) 376-75-25</a></div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 md:gap-6 mt-4 md:mt-0">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-neutral-400 transition-colors">Политика конфиденциальности</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-neutral-400 transition-colors">Оферта</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
