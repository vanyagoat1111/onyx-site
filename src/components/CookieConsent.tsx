import React, { useState, useEffect } from 'react';
import { Button } from './ui';
import { usePastIntro } from '../lib/scene';

export default function CookieConsent() {
  const [ready, setReady] = useState(false);
  const [accepted, setAccepted] = useState(false);

  /* Баннер ждёт не только таймер, но и конец вступительной сборки.
     Иначе он выезжал бы через полторы секунды на почти пустом экране
     и накрывал подсказку «листайте - сайт соберётся»: человек ещё не
     понял, что происходит, а его уже просят что-то принять.

     Ждать можно только то, что закончится. Если вступления на странице
     нет - отключены анимации, скрипт не выполнился - хук отдаёт true
     сразу, и баннер показывается по таймеру, как раньше. Отсутствие
     анимации не должно уметь спрятать согласие. */
  const pastIntro = usePastIntro();
  const show = ready && pastIntro && !accepted;

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Небольшая задержка, чтобы не выскакивало в лицо с первой секунды
      const timer = setTimeout(() => setReady(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setAccepted(true);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:w-80 z-[60] bg-ink/95 backdrop-blur-md border border-ink-2 p-5 clip-diagonal shadow-[0_10px_40px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-bottom-8 duration-500">
      <p className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
        <span className="text-cobalt">🍪</span> Cookies
      </p>
      <p className="text-xs text-neutral-400 font-mono leading-relaxed mb-4">
        Мы используем файлы cookie для улучшения работы сайта. Продолжая использование, вы соглашаетесь с{' '}
        <a
          href="/politika-obrabotki-pdn.html"
          target="_blank"
          rel="noreferrer"
          className="text-cobalt-soft hover:text-cobalt-soft transition-colors border-b border-cobalt-soft/30 hover:border-cobalt-soft"
        >
          политикой обработки данных
        </a>.
      </p>
      <Button 
        onClick={accept} 
        className="w-full text-[10px] py-2 bg-ink-2 border-onyx-700 hover:bg-blue-600 hover:border-cobalt text-white"
        variant="outline"
      >
        Согласен
      </Button>
    </div>
  );
}
