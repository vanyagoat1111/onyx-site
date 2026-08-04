/* Связь приложения CRM с таблицей - через собственный сервер.
 *
 * Раньше браузер ходил в Apps Script напрямую. Это перестало работать:
 * адрес /exec всегда перебрасывает на script.googleusercontent.com,
 * а он у владельцев не открывается - запрос висит одиннадцать секунд
 * и обрывается. Проверено с их машины, в том числе через VPN. Домен
 * drive.google.com ведёт себя так же.
 *
 * Поэтому запрос к Google делает наш сервер (api/crm.js на Vercel),
 * а браузер обращается только к своему домену. Ни фильтрации,
 * ни CORS, ни JSONP - обычный fetch на /api/crm.
 *
 * Заодно исчезла давняя неприятность: ключ от таблицы больше не лежит
 * в браузере и не уходит в адресе каждого запроса. Здесь хранится
 * только пароль от CRM; сам ключ таблицы живёт на сервере. Сменить
 * пароль теперь можно, не трогая скрипт и не переразвёртывая его.
 */

const KEY_STORE = 'onyx_crm_key';
const ВОРОТА = '/api/crm';   // свой сервер, он же посредник

export type Лид = Record<string, string> & { _row: number };

export function ключ(): string {
  try { return localStorage.getItem(KEY_STORE) || ''; } catch { return ''; }
}
export function сохранитьДоступ(k: string) {
  localStorage.setItem(KEY_STORE, k.trim());
}
export function забытьДоступ() {
  localStorage.removeItem(KEY_STORE);
  // Чистим и старые ключи: на устройствах, где CRM открывали раньше,
  // остался адрес скрипта от прежней схемы.
  localStorage.removeItem('onyx_crm_url');
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

function собратьАдрес(параметры: Record<string, string>) {
  return `${ВОРОТА}?${new URLSearchParams(параметры).toString()}`;
}

/** Понятное объяснение по ответу сервера - чтобы не гадать. */
function объяснить(текст: string): string {
  const t = текст.slice(0, 4000);
  if (/Не удалось найти функцию скрипта|Script function not found/i.test(t))
    return 'Развёрнута версия скрипта БЕЗ нового кода. В Apps Script: Ctrl+S, потом Развернуть → карандаш → Версия «Новая версия».';
  if (/accounts\.google\.com|Sign in|Войдите|ServiceLogin/i.test(t))
    return 'Скрипт требует вход. В развёртывании поставьте «У кого есть доступ: Все».';
  if (/ONYX webhook работает/i.test(t))
    return 'Развёрнут старый код - в нём нет раздела для CRM.';
  return '';
}

type Конверт = { ok?: boolean; error?: string; тело?: string };

async function разобрать<T>(r: Response): Promise<T> {
  const текст = await r.text();
  let данные: (T & Конверт) | null = null;
  try { данные = JSON.parse(текст); } catch {
    throw new ОтветСервера('Сервер ответил не данными', текст.replace(/<[^>]+>/g, ' ').slice(0, 300));
  }

  if (r.status === 401) throw new Error('Пароль не подошёл');
  if (r.ok) return данные as T;

  // Ошибку от посредника показываем целиком: там уже написано,
  // что именно чинить - переменные, развёртывание или доступ.
  const подсказка = объяснить(данные?.тело || '');
  throw new ОтветСервера(подсказка || данные?.error || `Ошибка ${r.status}`, данные?.тело || '');
}

async function запрос<T>(параметры: Record<string, string>): Promise<T> {
  if (!ключ()) throw new Error('Не задан пароль');
  let r: Response;
  try {
    r = await fetch(собратьАдрес(параметры), { headers: { 'x-onyx-key': ключ() } });
  } catch {
    throw new Error('Сервер не отвечает. Проверьте связь и обновите страницу.');
  }
  return разобрать<T>(r);
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
    const r = await fetch(ВОРОТА, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-onyx-key': ключ() },
      body: JSON.stringify({ action: 'leads_sync', agent: 'import-iz-vygruzki', rows: кусок }),
    });
    const о = await разобрать<{ ok?: boolean; added?: number; skipped?: number; error?: string }>(r);
    if (!о.ok) throw new Error(о.error || 'Сервер отказал');

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
