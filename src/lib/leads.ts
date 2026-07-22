// Единая точка входа для CTA-ссылок и отправки заявок.

// Telegram-бот ONYX: сбор заявок, тарифы/опции, создание личного кабинета, выдача чек-листа и аудита.
export const BOT_LINK = 'https://t.me/onyxwebsites_bot';

// Личный Telegram для вопросов, которые не связаны с ботом-заявками.
export const TELEGRAM_QUESTIONS_LINK = 'https://t.me/mynameisbutati';

// Отправка заявки на серверный эндпоинт приёма лидов (если он задан).
// Без env-переменной форма всё равно показывает успех (placeholder) — не блокируем UX.
//
// ЛОКАЛИЗАЦИЯ ПДн (152-ФЗ, ст. 18 ч. 5): точка, куда впервые попадают имя и
// телефон посетителя, должна быть на сервере на территории РФ. Поэтому в
// VITE_LEADS_ENDPOINT_URL следует указывать РФ-эндпоинт (например, webhook на
// Yandex Cloud / Selectel / Timeweb / Reg.ru, Яндекс Формы или свой VPS в РФ),
// а НЕ Google Apps Script / Google Forms (их серверы за рубежом).
// Имя VITE_LEADS_GOOGLE_SCRIPT_URL оставлено как запасное для обратной
// совместимости, но использовать его для боевого приёма ПДн не следует.
//
// ВАЖНО: заявка НЕ отправляется в Telegram Bot API напрямую из браузера —
// Vite зашивает переменные VITE_ в публичный JS-файл, и токен бота был бы виден
// любому. Доставку в Telegram настраивайте на стороне серверного эндпоинта.
export async function sendLead(name: string, phone: string) {
  const endpoint =
    import.meta.env.VITE_LEADS_ENDPOINT_URL || import.meta.env.VITE_LEADS_GOOGLE_SCRIPT_URL;

  if (!endpoint) return;

  const params = new URLSearchParams({ name, phone, date: new Date().toISOString(), source: 'onyx-web.ru' });
  await fetch(endpoint, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
}
