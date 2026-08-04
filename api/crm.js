/* Посредник между CRM и Google-таблицей.
 *
 * Зачем он нужен. Apps Script отдаёт ответ не сам: адрес /exec всегда
 * перебрасывает на script.googleusercontent.com, и данные присылает уже
 * тот домен. У владельцев он не открывается - запрос висит одиннадцать
 * секунд и обрывается. Проверено с их машины, в том числе через VPN:
 *
 *   script.google.com             доступен
 *   script.googleusercontent.com  обрыв
 *   drive.google.com              обрыв
 *
 * Пока браузер ходил в Google напрямую, CRM зависела от того, пропустит
 * ли провайдер конкретный домен в конкретный день. При обзвоне это худший
 * момент выяснять, что «сегодня не работает».
 *
 * Здесь запрос делает сервер Vercel - он стоит не в России и до Google
 * достаёт. Браузер обращается только к своему же домену onyx-web.ru,
 * поэтому нет ни фильтрации, ни CORS.
 *
 * Побочная выгода важнее, чем кажется: секрет таблицы больше не живёт
 * в браузере и не светится в адресной строке. Раньше он лежал в памяти
 * устройства и уходил в каждом запросе - любой, кто заглянул через плечо
 * или получил доступ к телефону, забирал полный доступ к базе лидов.
 * Теперь у сотрудника только пароль от CRM, а ключ от таблицы -
 * на сервере, и сменить пароль можно, не трогая скрипт.
 *
 * Переменные окружения (Vercel → Settings → Environment Variables):
 *   SHEETS_WEBHOOK_URL - адрес скрипта, оканчивается на /exec
 *   SHEETS_SECRET      - свойство SHARED_SECRET из настроек скрипта
 *   CRM_PASSWORD       - пароль входа в CRM, придумывается владельцем
 */

const ТАЙМАУТ = 25000;   // Apps Script думает до нескольких секунд, запас нужен

function ответ(res, код, тело) {
  res.status(код);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(тело));
}

/** Сравнение, не зависящее от длины совпадающего начала.
 *  Обычное === выходит на первом несовпавшем символе, и по времени
 *  ответа пароль можно подобрать посимвольно. Здесь проходим строку
 *  целиком всегда. */
function равны(a, b) {
  const x = String(a || ''), y = String(b || '');
  if (x.length !== y.length) return false;
  let d = 0;
  for (let i = 0; i < x.length; i++) d |= x.charCodeAt(i) ^ y.charCodeAt(i);
  return d === 0;
}

export default async function handler(req, res) {
  const { SHEETS_WEBHOOK_URL, SHEETS_SECRET, CRM_PASSWORD } = process.env;

  if (!SHEETS_WEBHOOK_URL || !SHEETS_SECRET || !CRM_PASSWORD) {
    // Явно называем, чего не хватает: молчаливый отказ на этом месте
    // выглядит как «опять не работает» и стоит часа поисков.
    const нет = [
      !SHEETS_WEBHOOK_URL && 'SHEETS_WEBHOOK_URL',
      !SHEETS_SECRET && 'SHEETS_SECRET',
      !CRM_PASSWORD && 'CRM_PASSWORD',
    ].filter(Boolean).join(', ');
    return ответ(res, 500, {
      ok: false,
      error: `На сервере не заданы переменные: ${нет}. Vercel → Settings → Environment Variables, потом Redeploy.`,
    });
  }

  const пароль = req.headers['x-onyx-key'] || '';
  if (!равны(пароль, CRM_PASSWORD)) return ответ(res, 401, { ok: false, error: 'forbidden' });

  // Собираем адрес для Google: свой пароль отбрасываем, подставляем секрет скрипта.
  const внутрь = new URL(SHEETS_WEBHOOK_URL);
  const пришло = new URL(req.url, 'http://x');
  for (const [k, v] of пришло.searchParams) {
    if (k === 'secret' || k === 'callback') continue;   // своё не пропускаем
    внутрь.searchParams.set(k, v);
  }
  внутрь.searchParams.set('secret', SHEETS_SECRET);

  const прервать = new AbortController();
  const таймер = setTimeout(() => прервать.abort(), ТАЙМАУТ);

  try {
    let r;
    if (req.method === 'POST') {
      const тело = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      тело.secret = SHEETS_SECRET;                       // секрет ставим здесь, а не в браузере
      r = await fetch(SHEETS_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(тело),
        redirect: 'follow',
        signal: прервать.signal,
      });
    } else {
      r = await fetch(внутрь.toString(), { redirect: 'follow', signal: прервать.signal });
    }

    const текст = await r.text();
    try {
      return ответ(res, 200, JSON.parse(текст));
    } catch {
      // Google прислал не данные, а страницу - обычно вход в аккаунт
      // или сообщение об ошибке скрипта. Отдаём начало как есть:
      // по нему видно причину, и его можно переслать целиком.
      return ответ(res, 502, {
        ok: false,
        error: 'Таблица ответила не данными',
        тело: текст.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 400),
      });
    }
  } catch (e) {
    const прерван = e && e.name === 'AbortError';
    return ответ(res, 504, {
      ok: false,
      error: прерван
        ? 'Таблица не ответила за 25 секунд'
        : 'Не удалось связаться с таблицей: ' + String(e && e.message || e).slice(0, 200),
    });
  } finally {
    clearTimeout(таймер);
  }
}
