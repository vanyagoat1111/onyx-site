/* Голос: распознавание речи и озвучка ответа.
 *
 * Берём то, что уже встроено в браузер, а не сторонний сервис.
 * Причин три. Распознавание Safari и Chrome понимает русский без
 * настройки. Ничего не стоит - а при обзвоне вопросов будет много.
 * И запись никуда не загружается нашими руками, что важно, когда
 * в вопросе может прозвучать фамилия или телефон клиента.
 *
 * Ограничение честное: в Safari распознавание всё равно уходит
 * на серверы Apple, это устройство решает, а не мы. Без сети
 * микрофон не работает - тогда просто остаётся клавиатура.
 */

type Речь = {
  lang: string; interimResults: boolean; continuous: boolean;
  start: () => void; stop: () => void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((e: { error?: string }) => void) | null;
  onend: (() => void) | null;
};

function движок(): (new () => Речь) | null {
  const w = window as unknown as Record<string, unknown>;
  return (w.SpeechRecognition || w.webkitSpeechRecognition) as (new () => Речь) | null;
}

export function микрофонЕсть(): boolean {
  return !!движок();
}

/** Слушать до тишины. Возвращает функцию досрочной остановки. */
export function слушать(
  наТекст: (текст: string, окончательный: boolean) => void,
  наКонец: (ошибка?: string) => void,
): () => void {
  const Д = движок();
  if (!Д) { наКонец('Браузер не умеет распознавать речь'); return () => {}; }

  const р = new Д();
  р.lang = 'ru-RU';
  р.interimResults = true;   // показываем текст по ходу - иначе кажется, что зависло
  р.continuous = false;

  р.onresult = (e) => {
    let итог = '';
    for (let i = 0; i < e.results.length; i++) итог += e.results[i][0].transcript;
    наТекст(итог.trim(), false);
  };
  р.onerror = (e) => {
    const к = e && e.error;
    наКонец(
      к === 'not-allowed' ? 'Нет доступа к микрофону. Разрешите его в настройках сайта.' :
      к === 'no-speech'   ? '' :                       // просто промолчали, это не ошибка
      к === 'network'     ? 'Распознавание не работает без сети.' :
      'Микрофон не отозвался',
    );
  };
  р.onend = () => наКонец();

  try { р.start(); } catch { наКонец('Микрофон уже занят'); }
  return () => { try { р.stop(); } catch { /* уже остановлен */ } };
}

/** Прочитать ответ вслух. Для дороги и для рук, занятых телефоном. */
export function озвучить(текст: string) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();

  // Списки и разметку вслух читать невозможно - чистим.
  const чисто = текст
    .replace(/[*_#`]/g, '')
    .replace(/^\s*[-•]\s*/gm, '')
    .replace(/\n{2,}/g, '. ')
    .replace(/\n/g, ', ')
    .slice(0, 1200);

  const р = new SpeechSynthesisUtterance(чисто);
  р.lang = 'ru-RU';
  р.rate = 1.05;
  const рус = speechSynthesis.getVoices().find((v) => v.lang.startsWith('ru'));
  if (рус) р.voice = рус;
  speechSynthesis.speak(р);
}

export function замолчать() {
  if ('speechSynthesis' in window) speechSynthesis.cancel();
}
