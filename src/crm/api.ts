/* Связь приложения CRM с таблицей.
 *
 * Почему JSONP, а не обычный fetch: Apps Script не умеет отдавать
 * заголовки CORS, и браузер откажется читать ответ с чужого домена.
 * JSONP обходит это тем, что ответ приходит как скрипт - единственный
 * способ, который работает с веб-приложениями Apps Script без прокси.
 *
 * Ключ доступа хранится в браузере и подставляется в каждый запрос.
 * Это защита от случайного посетителя, а не от целенаправленной атаки:
 * ключ виден в адресе запроса и в истории браузера. Для двух человек
 * этого достаточно, но открывать CRM с чужого компьютера не стоит.
 */

const КЛЮЧ_ХРАНИЛИЩА = 'onyx_crm_key';
const АДРЕС_ХРАНИЛИЩА = 'onyx_crm_url';

export type Лид = Record<string, string> & { _row: number };

export function ключ(): string {
  try { return localStorage.getItem(КЛЮЧ_ХРАНИЛИЩА) || ''; } catch { return ''; }
}
export function адрес(): string {
  try { return localStorage.getItem(АДРЕС_ХРАНИЛИЩА) || ''; } catch { return ''; }
}
export function сохранитьДоступ(url: string, k: string) {
  localStorage.setItem(АДРЕС_ХРАНИЛИЩА, url.trim());
  localStorage.setItem(КЛЮЧ_ХРАНИЛИЩА, k.trim());
}
export function забытьДоступ() {
  localStorage.removeItem(АДРЕС_ХРАНИЛИЩА);
  localStorage.removeItem(КЛЮЧ_ХРАНИЛИЩА);
}

let счётчик = 0;

/** Один запрос к таблице. Ответ приходит вызовом функции на window. */
function запрос<T>(параметры: Record<string, string>): Promise<T> {
  return new Promise((ok, нет) => {
    const url = адрес();
    if (!url || !ключ()) { нет(new Error('Не задан адрес или ключ')); return; }

    const имя = `__onyx_cb_${Date.now()}_${counterNext()}`;
    const тег = document.createElement('script');

    // window типизирован строго, а нам нужно временно повесить на него
    // функцию с вычисляемым именем - иначе JSONP не собрать.
    const окно = window as unknown as Record<string, unknown>;

    const убрать = () => {
      delete окно[имя];
      тег.remove();
      clearTimeout(таймер);
    };

    // Таймаут обязателен: если скрипт не ответит, обещание повиснет
    // навсегда и приложение замрёт без единого сообщения.
    const таймер = setTimeout(() => { убрать(); нет(new Error('Таблица не ответила за 20 секунд')); }, 20000);

    окно[имя] = (данные: T) => { убрать(); ok(данные); };

    const q = new URLSearchParams({ ...параметры, secret: ключ(), callback: имя });
    тег.src = `${url}?${q.toString()}`;
    тег.onerror = () => { убрать(); нет(new Error('Не удалось связаться с таблицей')); };
    document.body.appendChild(тег);
  });
}

function counterNext() { return ++счётчик; }

export async function загрузитьЛиды() {
  return запрос<{ ok: boolean; cols: string[]; rows: Лид[]; error?: string }>({ api: 'leads' });
}

export async function обновитьЛид(row: number, patch: Record<string, string>) {
  return запрос<{ ok: boolean; updated?: number; error?: string }>({
    api: 'update', row: String(row), patch: JSON.stringify(patch),
  });
}

export async function убратьЛид(row: number) {
  return запрос<{ ok: boolean; error?: string }>({ api: 'archive', row: String(row) });
}

/** Телефон для ссылки tel: только цифры и плюс. */
export function телДляЗвонка(v: string) {
  const d = (v || '').replace(/[^\d+]/g, '');
  return d.startsWith('8') ? '+7' + d.slice(1) : d;
}

/** Тот же номер для WhatsApp: там нужны только цифры. */
export function телДляWhatsApp(v: string) {
  let d = (v || '').replace(/\D/g, '');
  if (d.startsWith('8')) d = '7' + d.slice(1);
  return d;
}

/** Дата вида 03.08.2026 в объект. Пустая строка - null. */
export function разобратьДату(v: string): Date | null {
  const m = (v || '').match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!m) return null;
  return new Date(+m[3], +m[2] - 1, +m[1]);
}

export function сегодня(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}`;
}
