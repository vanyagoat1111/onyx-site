// Единая точка входа для CTA-ссылок и отправки заявок.

// Telegram-бот ONYX: сбор заявок, тарифы/опции, создание личного кабинета, выдача чек-листа и аудита.
export const BOT_LINK = 'https://t.me/onyxwebsites_bot';

// Личный Telegram для вопросов, которые не связаны с ботом-заявками.
export const TELEGRAM_QUESTIONS_LINK = 'https://t.me/mynameisbutati';

// Отправка заявки в Telegram-бота и в Google-таблицу лидов (если заданы переменные окружения).
// Без env-переменных форма всё равно показывает успех (placeholder) — не блокируем UX.
export async function sendLead(name: string, phone: string) {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
  const sheetUrl = import.meta.env.VITE_LEADS_GOOGLE_SCRIPT_URL;

  const tasks: Promise<unknown>[] = [];

  if (token && chatId) {
    tasks.push(
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: `Новая заявка с сайта ONYX\nИмя: ${name}\nТелефон: ${phone}`,
        }),
      })
    );
  }

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
