import React from 'react';
import { Container } from './ui';

export default function Footer() {
 return (
 <footer id="contacts" className="bg-obsidian-canvas py-24 relative z-10">
 

 {/* Contacts & Footer Meta */}
 <div className="px-6 py-12 relative z-10 ">
 <Container>
 <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8">

 {/* Contacts Info */}
 <div className="flex flex-col gap-4 text-body-sm text-warm-granite uppercase tracking-normal">
 <span className="text-bone font-mono text-caption uppercase tracking-caption mb-4">Наши контакты</span>
 <a href="mailto:butaev.d.a@yandex.ru" className="hover:text-bone transition-all flex items-start sm:items-center gap-4 group">
 <span className="hidden"></span> <span>butaev.d.a<br className="sm:hidden" />@yandex.ru</span>
 </a>
 <a href="tel:+79082420204" className="hover:text-bone transition-all flex items-center gap-4 group">
 <span className="hidden"></span> +7 (908) 242-02-04
 </a>
 <a href="https://t.me/onyxcoop" target="_blank" rel="noreferrer" className="hover:text-bone transition-all flex items-center gap-4 group">
 <span className="hidden"></span> Telegram: @onyxcoop
 </a>
 </div>

 {/* Legal */}
 <div className="space-y-4 text-body-sm text-warm-granite">
 <div className="text-bone font-mono text-caption uppercase tracking-caption">© 2026 ONYX STUDIO. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</div>
 <div className="text-body-sm text-warm-granite space-y-1">
 <div className="block">Самозанятый: Бутаев Давид Александрович</div>
 <div className="block">ИНН: 540538092505</div>
 <div className="block">Email: <a href="mailto:butaev.d.a@yandex.ru" className="hover:text-bone transition-all flex-wrap">butaev.d.a<br className="sm:hidden" />@yandex.ru</a></div>
 <div className="block">Телефон: <a href="tel:+79223767525" className="hover:text-bone transition-all">+7 (922) 376-75-25</a></div>
 </div>
 <div className="flex flex-wrap gap-4 md:gap-6 mt-6">
 <a href="#" onClick={(e) => { e.preventDefault(); document.dispatchEvent(new CustomEvent('open-legal', { detail: 'privacy' })); }} className="hover:text-bone transition-all">Политика обработки персональных данных</a>
 <a href="#" onClick={(e) => { e.preventDefault(); document.dispatchEvent(new CustomEvent('open-legal', { detail: 'terms' })); }} className="hover:text-bone transition-all">Пользовательское соглашение (оферта)</a>
 <a href="#" onClick={(e) => { e.preventDefault(); document.dispatchEvent(new CustomEvent('open-legal', { detail: 'payment' })); }} className="hover:text-bone transition-all">Условия оплаты, доставки и возврата</a>
 </div>
 </div>

 </div>
 </Container>
 </div>
 </footer>
 );
}
