// Единая точка входа для CTA-ссылок и отправки заявок.

// Telegram-бот ONYX: сбор заявок, тарифы/опции, создание личного кабинета, выдача чек-листа и аудита.
export const BOT_LINK = 'https://t.me/onyxwebsites_bot';

// Личный Telegram для вопросов, которые не связаны с ботом-заявками.
export const TELEGRAM_QUESTIONS_LINK = 'https://t.me/mynameisbutati';

// Отправка заявки в Google-таблицу лидов (если задана переменная окружения).
// Без env-переменной форма всё равно показывает успех (placeholder) — не блокируем UX.
//
// ВАЖНО: заявка НЕ отправляется в Telegram Bot API напрямую из браузера.
// Vite зашивает все переменные с префиксом VITE_ в публичный JS-файл сайта —
// это значит, что токен бота был бы виден любому в исходном коде страницы.
// Если нужна доставка заявок в Telegram, настройте пересылку на стороне
// Google Apps Script (sheetUrl ниже) — там токен бота хранится на сервере
// Google, а не в браузере пользователя.
export async function sendLead(name: string, phone: string) {
  const sheetUrl = import.meta.env.VITE_LEADS_GOOGLE_SCRIPT_URL;

  const tasks: Promise<unknown>[] = [];

  if (sheetUrl) {
    const params = new URLSearchParams({ name, phone, date: new Date().toISOString(), source: 'onyx-web.ru' });
    tasks.push(
      fetch(sheetUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      })
    );
  }

  await Promise.all(tasks);
}
