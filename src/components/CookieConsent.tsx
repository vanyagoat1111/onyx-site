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
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:w-80 z-[60] bg-onyx-900/95 backdrop-blur-md border border-onyx-800 p-5 clip-diagonal shadow-[0_10px_40px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-bottom-8 duration-500">
      <p className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
        <span className="text-blue-500">🍪</span> Cookies
      </p>
      <p className="text-xs text-neutral-400 font-mono leading-relaxed mb-4">
        Мы используем файлы cookie для улучшения работы сайта. Продолжая использование, вы соглашаетесь с{' '}
        <a 
          href="#" 
          onClick={(e) => { 
            e.preventDefault(); 
            document.dispatchEvent(new CustomEvent('open-legal', { detail: 'privacy' })); 
          }} 
          className="text-blue-400 hover:text-blue-300 transition-colors border-b border-blue-400/30 hover:border-blue-400"
        >
          политикой обработки данных
        </a>.
      </p>
      <Button 
        onClick={accept} 
        className="w-full text-[10px] py-2 bg-onyx-800 border-onyx-700 hover:bg-blue-600 hover:border-blue-500 text-white"
        variant="outline"
      >
        Согласен
      </Button>
    </div>
  );
}
