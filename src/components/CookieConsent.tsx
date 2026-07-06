import React, { useState, useEffect } from 'react';
import { Button } from './ui';

export default function CookieConsent() {
 const [show, setShow] = useState(false);

 useEffect(() => {
 const consent = localStorage.getItem('cookie-consent');
 if (!consent) {
 // Small delay so it doesn't pop up aggressively immediately
 const timer = setTimeout(() => setShow(true), 1500);
 return () => clearTimeout(timer);
 }
 }, []);

 const accept = () => {
 localStorage.setItem('cookie-consent', 'true');
 setShow(false);
 };

 if (!show) return null;

 return (
 <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:w-80 z-[60] bg-carbon-lift border border-ash-stroke rounded-lg p-5 animate-in fade-in slide-in-from-bottom-8 duration-500">
 <p className="text-body-sm text-bone mb-2 flex items-center gap-2">
 <span className="text-warm-granite">🍪</span> Cookies
 </p>
 <p className="text-caption font-mono text-warm-granite leading-relaxed mb-4">
 Мы используем файлы cookie для улучшения работы сайта. Продолжая использование, вы соглашаетесь с{' '}
 <a 
 href="#" 
 onClick={(e) => { 
 e.preventDefault(); 
 document.dispatchEvent(new CustomEvent('open-legal', { detail: 'privacy' })); 
 }} 
 className="text-bone hover:text-bone transition-colors border-b border-ash-stroke hover:border-warm-granite"
 >
 политикой обработки данных
 </a>.
 </p>
 <Button 
 onClick={accept} 
 className="w-full text-caption py-2 bg-obsidian-canvas border-ash-stroke hover:bg-carbon-lift hover:border-warm-granite text-bone"
 variant="outline"
 >
 Согласен
 </Button>
 </div>
 );
}
