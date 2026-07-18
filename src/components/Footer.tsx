import React from 'react';
import { Mail, Phone, Send } from 'lucide-react';

const openLegal = (doc: string) => document.dispatchEvent(new CustomEvent('open-legal', { detail: doc }));

export default function Footer() {
  return (
    <footer id="contacts" className="relative border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-12 pt-16 pb-10 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-3 mb-5" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <img src="/favicon.svg" alt="ONYX Logo" className="w-8 h-8" />
              <span className="font-display font-bold text-lg text-bone">ONYX</span>
            </a>
            <p className="text-[13px] font-body text-fog leading-relaxed max-w-xs">
              Веб-студия для бизнеса. Создаём сайты без оплаты разработки — вы платите только за запуск и нужные функции.
            </p>
            <p className="text-[12px] font-body text-fog/70 leading-relaxed max-w-xs mt-4">
              Оплата — по счёту (реквизитам): банковским переводом через мобильный банк, СБП или сервис оплаты по реквизитам на Госуслугах. Счёт может быть выставлен от одного из двух партнёров ONYX. После оплаты вы получаете официальный чек в приложении «Мой налог» в соответствии с 422-ФЗ.
            </p>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.25em] uppercase text-fog mb-6">Контакты</h4>
            <div className="flex flex-col gap-4">
              <a href="mailto:onyxwebcooperation@gmail.com" className="flex items-center gap-3 text-sm font-body text-bone/85 hover:text-cobalt-soft transition-colors break-all">
                <Mail className="w-4 h-4 text-cobalt-soft shrink-0" /> onyxwebcooperation@gmail.com
              </a>
              <a href="tel:+79082420204" className="flex items-center gap-3 text-sm font-body text-bone/85 hover:text-cobalt-soft transition-colors">
                <Phone className="w-4 h-4 text-cobalt-soft shrink-0" /> +7 (908) 242-02-04
              </a>
              <a href="https://t.me/onyxcoop" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm font-body text-bone/85 hover:text-cobalt-soft transition-colors">
                <Send className="w-4 h-4 text-cobalt-soft shrink-0" /> Telegram: @onyxcoop
              </a>
            </div>
          </div>

          {/* Documents */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.25em] uppercase text-fog mb-6">Документы</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Политика обработки персональных данных', doc: 'privacy' },
                { label: 'Публичная оферта', doc: 'terms' },
                { label: 'Условия оплаты, доставки и возврата', doc: 'payment' },
              ].map((d) => (
                <a
                  key={d.doc}
                  href="#"
                  onClick={(e) => { e.preventDefault(); openLegal(d.doc); }}
                  className="text-[13px] font-body text-fog hover:text-bone transition-colors"
                >
                  {d.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-8 flex flex-col md:flex-row justify-between gap-4 font-mono text-[11px] text-fog/70 tracking-wide">
          <span>© 2026 ONYX STUDIO. Все права защищены.</span>
          <div className="flex flex-col md:items-end gap-1">
            <span>Самозанятый: Новиков Иван Максимович · ИНН: 590586577935</span>
            <span>Партнёр (самозанятый): Бутаев Давид Александрович · ИНН: 540538092505</span>
          </div>
        </div>
      </div>

      {/* Watermark */}
      <div aria-hidden="true" className="relative select-none pointer-events-none flex justify-center overflow-hidden">
        <span className="font-display font-black text-[26vw] md:text-[20vw] leading-[0.75] text-outline-bone -mb-[6vw] tracking-tight">
          ONYX
        </span>
      </div>
    </footer>
  );
}
