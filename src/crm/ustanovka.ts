/* Установка CRM на домашний экран iPhone.
 *
 * Safari не знает про наши маршруты: он смотрит на теги в <head> ровно
 * в тот момент, когда человек нажимает «Поделиться → На экран Домой».
 * Поэтому теги нельзя прописать в index.html - там они относились бы
 * ко всему сайту, и обычный посетитель, сохранив страницу, получил бы
 * на экране иконку CRM вместо сайта студии.
 *
 * Значит их надо ставить только когда открыт сам раздел CRM и убирать
 * при уходе. Ровно это здесь и происходит.
 *
 * Адрес запуска - /#crm: Safari сохраняет текущий URL вместе с хешем,
 * поэтому приложение откроется сразу на списке лидов.
 */

const МЕТКА = 'data-onyx-crm-ustanovka';

type Тег = { тип: 'meta' | 'link'; ключ: string; значение: string; поле: string };

const ТЕГИ: Тег[] = [
  // Без адресной строки и кнопок браузера - выглядит и ощущается приложением.
  { тип: 'meta', ключ: 'apple-mobile-web-app-capable', значение: 'yes', поле: 'name' },
  { тип: 'meta', ключ: 'mobile-web-app-capable', значение: 'yes', поле: 'name' },

  // Тёмная строка состояния сливается с шапкой приложения.
  { тип: 'meta', ключ: 'apple-mobile-web-app-status-bar-style', значение: 'black-translucent', поле: 'name' },
  { тип: 'meta', ключ: 'theme-color', значение: '#0a0a0d', поле: 'name' },

  // Подпись под иконкой. Без неё Safari возьмёт <title> страницы,
  // а это длинное рекламное предложение студии.
  { тип: 'meta', ключ: 'apple-mobile-web-app-title', значение: 'ONYX CRM', поле: 'name' },

  { тип: 'link', ключ: 'apple-touch-icon', значение: '/crm/icon-180.png', поле: 'rel' },
  { тип: 'link', ключ: 'manifest', значение: '/crm/manifest.webmanifest', поле: 'rel' },
];

/** Включить установку. Возвращает функцию, которая всё убирает обратно. */
export function включитьУстановку(): () => void {
  const заголовокБыл = document.title;
  document.title = 'ONYX CRM';

  // Манифест сайта, если он есть, временно отключаем: два манифеста
  // одновременно - и браузер возьмёт не тот.
  const чужойМанифест = document.querySelector<HTMLLinkElement>(`link[rel="manifest"]:not([${МЕТКА}])`);
  if (чужойМанифест) чужойМанифест.rel = 'onyx-manifest-otklyuchen';

  for (const т of ТЕГИ) {
    const el = document.createElement(т.тип);
    el.setAttribute(т.поле, т.ключ);
    if (т.тип === 'meta') el.setAttribute('content', т.значение);
    else el.setAttribute('href', т.значение);
    el.setAttribute(МЕТКА, '');
    document.head.appendChild(el);
  }

  return () => {
    document.title = заголовокБыл;
    document.head.querySelectorAll(`[${МЕТКА}]`).forEach((el) => el.remove());
    if (чужойМанифест) чужойМанифест.rel = 'manifest';
  };
}

/** Приложение запущено с домашнего экрана, а не из вкладки Safari. */
export function запущеноКакПриложение(): boolean {
  const nav = navigator as Navigator & { standalone?: boolean };
  return nav.standalone === true ||
    (typeof matchMedia === 'function' && matchMedia('(display-mode: standalone)').matches);
}

/** iPhone или iPad - только там работает «На экран Домой» через Поделиться. */
export function этоIOS(): boolean {
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}
