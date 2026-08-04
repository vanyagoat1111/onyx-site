/* Доступ к Google-таблице со стороны сервера.
 *
 * Вынесено отдельно, потому что в таблицу ходят двое: посредник CRM
 * (api/crm.js) и ИИ-чат (api/chat.js). Держать одну и ту же логику
 * в двух местах - значит однажды починить её только в одном.
 *
 * Файлы в api/, чьё имя начинается с подчёркивания, Vercel не считает
 * маршрутами: снаружи этот модуль недоступен.
 */

const ТАЙМАУТ = 25000;

export function настройки() {
  const { SHEETS_WEBHOOK_URL, SHEETS_SECRET, CRM_PASSWORD } = process.env;
  const нет = [
    !SHEETS_WEBHOOK_URL && 'SHEETS_WEBHOOK_URL',
    !SHEETS_SECRET && 'SHEETS_SECRET',
    !CRM_PASSWORD && 'CRM_PASSWORD',
  ].filter(Boolean);
  return { SHEETS_WEBHOOK_URL, SHEETS_SECRET, CRM_PASSWORD, нет };
}

/** Сравнение без утечки по времени: обычное === выходит на первом
 *  несовпавшем символе, и по задержке ответа пароль подбирается посимвольно. */
export function равны(a, b) {
  const x = String(a || ''), y = String(b || '');
  if (x.length !== y.length) return false;
  let d = 0;
  for (let i = 0; i < x.length; i++) d |= x.charCodeAt(i) ^ y.charCodeAt(i);
  return d === 0;
}

/** Запрос к скрипту таблицы. Бросает Error с понятным текстом. */
export async function кТаблице(параметры, тело = null) {
  const { SHEETS_WEBHOOK_URL, SHEETS_SECRET } = настройки();
  const прервать = new AbortController();
  const таймер = setTimeout(() => прервать.abort(), ТАЙМАУТ);
  try {
    let r;
    if (тело) {
      r = await fetch(SHEETS_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ ...тело, secret: SHEETS_SECRET }),
        redirect: 'follow', signal: прервать.signal,
      });
    } else {
      const u = new URL(SHEETS_WEBHOOK_URL);
      for (const [k, v] of Object.entries(параметры)) u.searchParams.set(k, v);
      u.searchParams.set('secret', SHEETS_SECRET);
      r = await fetch(u.toString(), { redirect: 'follow', signal: прервать.signal });
    }
    const текст = await r.text();
    try { return JSON.parse(текст); }
    catch {
      throw new Error('Таблица ответила не данными: ' +
        текст.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 200));
    }
  } catch (e) {
    if (e.name === 'AbortError') throw new Error('Таблица не ответила за 25 секунд');
    throw e;
  } finally {
    clearTimeout(таймер);
  }
}

/* ─── Разбор дат ──────────────────────────────────────────────────────
 * В таблице даты в виде 05.08.2026. Сравнивать их строками нельзя:
 * «10.01» окажется меньше «05.08», хотя это следующий год. */

export function дата(v) {
  const m = String(v || '').match(/^(\d{2})\.(\d{2})\.(\d{4})/);
  return m ? new Date(+m[3], +m[2] - 1, +m[1]) : null;
}

export function сегодняСтрокой() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}`;
}

/** Начало сегодняшнего дня по Москве - лиды живут в московском времени. */
export function началоДня() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export const ЗАКРЫТЫЕ = ['Отказ', 'Клиент', 'Невалид', 'Дубль', 'Не звонить'];

/** Поля, которые ИИ разрешено менять. Всё остальное - данные агентов
 *  и контакты; их правит человек руками, а не модель по своей догадке. */
export const МОЖНО_МЕНЯТЬ = ['Статус', 'След. действие', 'Дата след.', 'Комментарий', 'Приоритет'];
