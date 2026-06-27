import React from 'react';
import { Container } from './ui';

export default function Footer() {
  return (
    <footer id="contacts" className="bg-onyx-950 border-t border-onyx-800 relative z-10">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/5 via-transparent to-transparent pointer-events-none" />
      
      {/* Contacts & Footer Meta */}
      <div className="px-6 py-12 relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-[1px] before:bg-gradient-to-r before:from-onyx-800 before:via-blue-600/30 before:to-onyx-800">
        <Container>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8">
            
            {/* Contacts Info */}
            <div className="flex flex-col gap-4 text-sm md:text-base font-black uppercase tracking-[0.2em] text-blue-500">
              <span className="text-neutral-500 font-mono text-xs uppercase tracking-widest mb-2">Наши контакты</span>
              <a href="mailto:bossybestzzz@gmail.com" className="hover:text-white hover:drop-shadow-[0_0_10px_#fff] transition-all flex items-center gap-4 group">
                <span className="w-8 h-[2px] bg-onyx-700 group-hover:bg-blue-600 transition-colors"></span> bossybestzzz@gmail.com
              </a>
              <a href="tel:+79082420204" className="hover:text-white hover:drop-shadow-[0_0_10px_#fff] transition-all flex items-center gap-4 group">
                <span className="w-8 h-[2px] bg-onyx-700 group-hover:bg-blue-600 transition-colors"></span> +7 (908) 242-02-04
              </a>
              <a href="https://t.me/onyxcoop" target="_blank" rel="noreferrer" className="hover:text-blue-300 hover:drop-shadow-[0_0_10px_rgba(147,197,253,0.3)] transition-all flex items-center gap-4 group">
                <span className="w-8 h-[2px] bg-onyx-700 group-hover:bg-blue-400 transition-colors"></span> Telegram: @onyxcoop
              </a>
            </div>

            {/* Legal */}
            <div className="space-y-4 font-mono text-xs tracking-widest text-neutral-600 uppercase">
              <div className="text-blue-500 drop-shadow-[0_0_5px_rgba(59,130,246,0.4)]">© 2026 ONYX STUDIO. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</div>
              <div className="text-[10px] md:text-xs text-neutral-500 space-y-1">
                <div className="block">Самозанятый: Бутаев Давид Александрович</div>
                <div className="block">ИНН: 540538092505</div>
                <div className="block">Email: <a href="mailto:butatygoth@mail.ru" className="hover:text-blue-500 hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)] transition-all">butatygoth@mail.ru</a></div>
                <div className="block">Телефон: <a href="tel:+79223767525" className="hover:text-blue-500 hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)] transition-all">+7 (922) 376-75-25</a></div>
              </div>
              <div className="flex flex-wrap gap-4 md:gap-6 mt-6">
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-blue-300 hover:drop-shadow-[0_0_5px_rgba(147,197,253,0.3)] transition-all">Политика конфиденциальности</a>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-blue-300 hover:drop-shadow-[0_0_5px_rgba(147,197,253,0.3)] transition-all">Оферта</a>
              </div>
            </div>

          </div>
        </Container>
      </div>
    </footer>
  );
}
