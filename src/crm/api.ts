/* Связь приложения CRM с таблицей.
 *
 * Сначала обычный fetch, при неудаче - JSONP.
 *
 * Почему так. Apps Script переадресует запрос на googleusercontent.com,
 * и уже ТОТ отдаёт заголовки CORS - поэтому обычный fetch к /exec обычно
 * проходит. Я сначала сделал сразу JSONP, из осторожности, и потерял
 * главное: при JSONP браузер не даёт прочитать ответ, если это не
 * работающий скрипт. Любая проблема выглядела одинаково - «не удалось
 * связаться», и настоящая причина оставалась невидимой.
 *
 * Теперь основной путь - fetch: он возвращает текст ответа, каким бы
 * тот ни был. Если Google прислал страницу входа или сообщение об ошибке
 * скрипта, это видно на экране целиком, а не превращается в общую фразу.
 * JSONP остаётся запасным путём на случай, если CORS всё-таки не отдан.
 *
 * Ключ доступа хранится в браузере и подставляется в каждый запрос.
 * Это защита от случайного посетителя, а не от целенаправленной атаки:
 * ключ виден в адресе запроса и в истории браузера. Для двух человек
 * этого достаточно, но открывать CRM с чужого компьютера не стоит.
 */

const KEY_STORE = 'onyx_crm_key';
const URL_STORE = 'onyx_crm_url';

export type Лид = Record<string, string> & { _row: number };

export function ключ(): string {
  try { return localStorage.getItem(KEY_STORE) || ''; } catch { return ''; }
}
export function адрес(): string {
  try { return localStorage.getItem(URL_STORE) || ''; } catch { return ''; }
}
export function сохранитьДоступ(url: string, k: string) {
  localStorage.setItem(URL_STORE, url.trim());
  localStorage.setItem(KEY_STORE, k.trim());
}
export function забытьДоступ() {
  localStorage.removeItem(URL_STORE);
  localStorage.removeItem(KEY_STORE);
}

/* Ошибка, которая несёт с собой ответ сервера.
   Без этого пользователь видит «что-то пошло не так» и не может
   ни понять причину, ни рассказать о ней тому, кто починит. */
export class ОтветСервера extends Error {
  тело: string;
  constructor(msg: string, тело: string) {
    super(msg);
    this.тело = тело;
  }
}

let счётчик = 0;

function собратьАдрес(параметры: Record<string, string>) {
  const q = new URLSearchParams({ ...параметры, secret: ключ() });
  return `${адрес()}?${q.toString()}`;
}

/** Понятное объяснение по тексту ответа - чтобы не гадать. */
function объяснить(текст: string): string {
  const t = текст.slice(0, 4000);
  if (/Не удалось найти функцию скрипта|Script function not found/i.test(t))
    return 'Развёрнута версия БЕЗ нового кода. В Apps Script: Ctrl+S, потом Развернуть → карандаш → Версия «Новая версия».';
  if (/accounts\.google\.com|Sign in|Войдите|ServiceLogin/i.test(t))
    return 'Скрипт требует вход. В развёртывании поставьте «У кого есть доступ: Все».';
  if (/ONYX webhook работает/i.test(t))
    return 'Развёрнут СТАРЫЙ код - в нём нет раздела для CRM. Вставьте новый файл и разверните новую версию.';
  if (/Exception|TypeError|ReferenceError/i.test(t))
    return 'Скрипт упал с ошибкой. Текст ниже - её начало.';
  return '';
}

async function запрос<T>(параметры: Record<string, string>): Promise<T> {
  if (!адрес() || !ключ()) throw new Error('Не задан адрес или ключ');

  // ── путь 1: обычный запрос, он же единственный, который показывает ответ
  try {
    const r = await fetch(собратьАдрес(параметры), { redirect: 'follow' });
    const текст = await r.text();
    try {
      return JSON.parse(текст) as T;
    } catch {
      const подсказка = объяснить(текст);
      throw new ОтветСервера(
        подсказка || `Ответ не похож на данные (код ${r.status})`,
        текст.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 300),
      );
    }
  } catch (e) {
    if (e instanceof ОтветСервера) throw e;   // ответ получен, но неверный - причина известна
    // сеть или CORS - пробуем запасной путь
  }

  // ── путь 2: JSONP, если заголовки CORS не отданы
  return new Promise<T>((ok, нет) => {
    const имя = `__onyx_cb_${Date.now()}_${++счётчик}`;
    const тег = document.createElement('script');
    const окно = window as unknown as Record<string, unknown>;

    const убрать = () => { delete окно[имя]; тег.remove(); clearTimeout(таймер); };
    const таймер = setTimeout(
      () => { убрать(); нет(new Error('Таблица не ответила за 20 секунд')); }, 20000);

    окно[имя] = (данные: T) => { убрать(); ok(данные); };
    тег.src = собратьАдрес({ ...параметры, callback: имя });
    тег.onerror = () => {
      убрать();
      нет(new Error('Адрес скрипта недоступен. Проверьте, что ссылка оканчивается на /exec и развёртывание открыто для всех.'));
    };
    document.body.appendChild(тег);
  });
}

export async function загрузитьЛиды() {
  return запрос<{ ok: boolean; schema?: string[]; cols: string[]; rows: Лид[]; error?: string }>({ api: 'leads' });
}

export async function обновитьЛид(row: number, patch: Record<string, string>) {
  return запрос<{ ok: boolean; updated?: number; error?: string }>({
    api: 'update', row: String(row), patch: JSON.stringify(patch),
  });
}

export async function убратьЛид(row: number) {
  return запрос<{ ok: boolean; error?: string }>({ api: 'archive', row: String(row) });
}

/* ─── Импорт выгрузки агентов ──────────────────────────────────────────
 *
 * Агенты отдают лидов одним HTML-файлом: разметка плюс массив
 * `const DATA=[…]` внутри. Файл самодостаточен и открывается двойным
 * кликом - тем он и удобен агенту. Но статусы в нём живут в памяти
 * браузера, то есть на одном компьютере, и напарник их не видит.
 *
 * Поэтому файл остаётся выгрузкой, а рабочим местом становится таблица.
 * Здесь мы достаём из файла массив и отправляем его на сервер; сервер
 * сам отсеивает тех, кто уже есть или лежит в чёрном списке.
 */

/** Достать массив DATA из выгрузки, не спотыкаясь о скобки внутри текстов.
 *
 *  Наивный поиск парной скобки здесь ломается: поля problem и msg -
 *  живой текст, в нём попадаются и скобки, и кавычки. Поэтому идём
 *  посимвольно и считаем скобки только вне строк. */
export function достатьЛидовИзВыгрузки(html: string): Record<string, unknown>[] {
  const i = html.indexOf('const DATA');
  if (i < 0) throw new Error('Это не похоже на выгрузку агентов: внутри нет массива DATA.');

  const j = html.indexOf('[', i);
  if (j < 0) throw new Error('Массив DATA найден, но пуст или повреждён.');

  let глубина = 0, вСтроке = false, экран = false, конец = -1;
  for (let n = j; n < html.length; n++) {
    const c = html[n];
    if (экран) { экран = false; continue; }
    if (c === '\\') { экран = true; continue; }
    if (c === '"') { вСтроке = !вСтроке; continue; }
    if (вСтроке) continue;
    if (c === '[') глубина++;
    else if (c === ']') { глубина--; if (!глубина) { конец = n + 1; break; } }
  }
  if (конец < 0) throw new Error('Массив DATA не закрыт - файл обрезан.');

  const строки = JSON.parse(html.slice(j, конец)) as Record<string, unknown>[];
  if (!Array.isArray(строки)) throw new Error('DATA оказался не массивом.');
  return строки;
}

/** Проверить, что скрипт таблицы умеет принимать поля агентов.
 *
 *  Смотрим на schema, а не на cols. Это разные вещи: cols - заголовки,
 *  которые СЕЙЧАС стоят в листе, а schema - то, что скрипт умеет.
 *  Сначала я проверял по cols и получил тупик: новые колонки появляются
 *  только при первой записи, а запись не начиналась, потому что колонок
 *  ещё нет. Классический замкнутый круг из проверки не того признака. */
export async function таблицаГотоваКИмпорту(): Promise<boolean> {
  const r = await загрузитьЛиды();
  return !!r.ok && (r.schema || []).indexOf('Зацепка') >= 0;
}

/** Отправить лидов пакетами. Возвращает, сколько добавлено и сколько отсеяно. */
export async function залитьЛидов(
  строки: Record<string, unknown>[],
  ход: (готово: number, всего: number) => void,
): Promise<{ добавлено: number; отсеяно: number }> {
  const ПАКЕТ = 100;   // около 80 КБ - проходит одним запросом без таймаута
  let добавлено = 0, отсеяно = 0;

  for (let i = 0; i < строки.length; i += ПАКЕТ) {
    const кусок = строки.slice(i, i + ПАКЕТ);
    const r = await fetch(адрес(), {
      method: 'POST',
      // text/plain - чтобы браузер не слал предварительный запрос OPTIONS:
      // Apps Script на него не отвечает, и обычный JSON-заголовок всё ломает.
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      redirect: 'follow',
      body: JSON.stringify({ action: 'leads_sync', secret: ключ(), agent: 'import-iz-vygruzki', rows: кусок }),
    });
    const текст = await r.text();
    let о: { ok?: boolean; added?: number; skipped?: number; error?: string };
    try { о = JSON.parse(текст); }
    catch { throw new ОтветСервера('Сервер ответил не данными', текст.slice(0, 300)); }
    if (!о.ok) throw new Error(о.error === 'forbidden' ? 'Ключ не подошёл' : (о.error || 'Сервер отказал'));

    добавлено += о.added || 0;
    отсеяно += о.skipped || 0;
    ход(Math.min(i + ПАКЕТ, строки.length), строки.length);
  }
  return { добавлено, отсеяно };
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
