/* ИИ-чат по базе лидов.
 *
 * Замысел. Владелец спрашивает словами - «дай отчёт по сегодняшним»,
 * «собери только A», «что делать сегодня» - и получает ответ по живым
 * данным. Это то, чего нет в amoCRM: там нейросеть слушает звонки
 * и заполняет поля, но поговорить с базой нельзя.
 *
 * Как устроено. Модель не получает всю базу в запрос: шестьсот лидов
 * с разборами агентов - это десятки тысяч токенов на каждый вопрос,
 * дорого и медленно, а модель начинает теряться в объёме. Вместо
 * этого ей даны инструменты: она сама решает, какую выборку запросить,
 * и получает ровно нужный кусок. Считает при этом код, а не модель -
 * язык моделям даётся лучше, чем арифметика.
 *
 * Записывать модель не может. Совсем. Инструмент изменения возвращает
 * не результат, а предложение: список строк, поля и обоснование.
 * Выполняется оно только после явного «да» от человека, отдельным
 * запросом. Так ошибка модели стоит одного лишнего вопроса,
 * а не испорченной базы на шестьсот строк.
 */

import { настройки, равны, кТаблице, дата, началоДня, сегодняСтрокой, ЗАКРЫТЫЕ, МОЖНО_МЕНЯТЬ } from './_tablitsa.js';

/* По умолчанию Haiku, а не Sonnet.
 *
 * Счёт за API идёт с предоплаченных кредитов, и для студии, которая
 * сама берёт за разработку ноль, разница между моделями - это разница
 * между «чат живёт месяц» и «чат живёт неделю». На вопросах вида
 * «собери A по Казани» или «кому пора перезвонить» Haiku не хуже:
 * считает всё равно код, от модели нужен разбор фразы и связный ответ.
 *
 * Если ответы покажутся поверхностными на разборе воронки - ставится
 * AI_MODEL=claude-sonnet-5 одной переменной, без правок кода.
 */
/* Какой моделью думать.
 *
 * Провайдера два, потому что у них разная цена входа. У Google есть
 * бесплатный тариф, и для студии это разница между «чат есть» и
 * «чат подождёт до лучших времён».
 *
 * Оговорка, которая важнее цены: на бесплатном тарифе Google по общему
 * правилу использует запросы для улучшения своих моделей и прямо просит
 * не слать туда персональные данные. В базе лежат фамилии и телефоны
 * живых людей, так что само по себе это было бы недопустимо. Исключение
 * делает география: для пользователей из ЕЭЗ, Швейцарии и Великобритании
 * условия платного тарифа распространяются и на бесплатный. Владельцы
 * в Норвегии, она в ЕЭЗ - поэтому здесь бесплатный тариф допустим.
 *
 * Если команда переедет за пределы ЕЭЗ, это перестанет быть правдой,
 * и надо будет перейти на платный тариф или на Anthropic.
 */
/* Провайдер определяется по тому, какой ключ задан.
 *
 * Порядок проверки - это и порядок предпочтения. NVIDIA впереди,
 * потому что у неё бесплатный доступ без карты и без квот, которых
 * хватило бы на пару вопросов. Оговорка про лицензию остаётся
 * в CRM-настройка.md: бесплатный доступ NVIDIA дан под разработку
 * и оценку, и это решение владельца, а не техническое.
 */
const ПРОВАЙДЕР = (
  process.env.AI_PROVIDER ||
  (process.env.OPENAI_API_KEY || process.env.NVIDIA_API_KEY ? 'openai'
    : process.env.GEMINI_API_KEY ? 'gemini'
    : 'anthropic')
).toLowerCase();

const ПО_УМОЛЧАНИЮ = {
  // Псевдоним, а не точная версия: Google переименовывает модели,
  // и жёстко зашитое имя однажды отвечает 404 без объяснений.
  gemini: 'gemini-flash-latest',
  anthropic: 'claude-haiku-4-5-20251001',
  openai: 'nvidia/nemotron-3-ultra-550b-a55b',
};

const МОДЕЛЬ = process.env.AI_MODEL || ПО_УМОЛЧАНИЮ[ПРОВАЙДЕР] || ПО_УМОЛЧАНИЮ.anthropic;

const КЛЮЧ_МОДЕЛИ =
  ПРОВАЙДЕР === 'gemini' ? (process.env.GEMINI_API_KEY || process.env.AI_API_KEY)
  : ПРОВАЙДЕР === 'openai' ? (process.env.OPENAI_API_KEY || process.env.NVIDIA_API_KEY || process.env.AI_API_KEY)
  : (process.env.AI_API_KEY || process.env.ANTHROPIC_API_KEY);

const АДРЕС = process.env.AI_API_URL || 'https://api.anthropic.com/v1/messages';

function ответ(res, код, тело) {
  res.status(код);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(тело));
}

/* ─── Инструменты ─────────────────────────────────────────────────── */

const ИНСТРУМЕНТЫ = [
  {
    name: 'vyborka',
    description:
      'Найти лидов по условиям. Возвращает список с основными полями. ' +
      'Используй для «покажи», «собери», «кто», «список». ' +
      'Всегда указывай limit: больше 40 строк человеку не прочитать.',
    input_schema: {
      type: 'object',
      properties: {
        prioritet: { type: 'string', description: 'A, B или C' },
        status: { type: 'string', description: 'например Новый, Недозвон, КЭВ назначен' },
        gorod: { type: 'string' },
        nisha: { type: 'string', description: 'часть названия ниши' },
        istochnik: { type: 'string', description: 'agent_cold, agent_demand, бот и т.п.' },
        ball_ot: { type: 'number', description: 'минимальный балл агента' },
        bez_sayta: { type: 'boolean', description: 'только те, у кого нет сайта' },
        prosrocheno: { type: 'boolean', description: 'дата следующего действия наступила или прошла' },
        dobavleny_segodnya: { type: 'boolean' },
        tolko_aktivnye: { type: 'boolean', description: 'по умолчанию true - без отказов и клиентов' },
        poisk: { type: 'string', description: 'подстрока по компании, ЛПР, телефону' },
        sortirovka: { type: 'string', enum: ['ball', 'prioritet', 'data'] },
        limit: { type: 'number' },
      },
    },
  },
  {
    name: 'svodka',
    description:
      'Посчитать количество лидов в разрезе поля. Для «сколько», «отчёт», ' +
      '«распределение», «по каким источникам». Считает код, не ты.',
    input_schema: {
      type: 'object',
      properties: {
        po: { type: 'string', description: 'Статус, Приоритет, Источник, Город, Ниша, Тип' },
        tolko_aktivnye: { type: 'boolean' },
      },
      required: ['po'],
    },
  },
  {
    name: 'istoriya',
    description:
      'Что происходило по лидам: звонки, смены статусов, кто и когда. ' +
      'Без телефона - последние события по всей базе. Нужно для отчёта ' +
      'за день и чтобы понять, кому уже звонили.',
    input_schema: {
      type: 'object',
      properties: {
        telefon: { type: 'string' },
        limit: { type: 'number' },
      },
    },
  },
  {
    name: 'predlozhit_izmenenie',
    description:
      'Предложить изменение лидов. НЕ выполняет его - показывает человеку ' +
      'на подтверждение. Вызывай только когда тебя явно просят что-то изменить. ' +
      'Разрешённые поля: ' + МОЖНО_МЕНЯТЬ.join(', ') + '.',
    input_schema: {
      type: 'object',
      properties: {
        stroki: { type: 'array', items: { type: 'number' }, description: 'номера _row' },
        polya: { type: 'string', description: 'JSON с полями, например {"Статус":"Недозвон"}' },
        zachem: { type: 'string', description: 'одна фраза для человека: зачем это' },
      },
      required: ['stroki', 'polya', 'zachem'],
    },
  },
];

/* ─── Исполнение инструментов ─────────────────────────────────────── */

function компактно(л) {
  const о = {
    row: л._row,
    компания: л['Компания'] || '',
    город: л['Город'] || '',
    ниша: л['Ниша'] || '',
    лпр: л['ЛПР'] || '',
    телефон: л['Телефон'] || '',
    статус: л['Статус'] || 'Новый',
    приоритет: л['Приоритет'] || '',
    балл: л['Балл'] || '',
    сайт: л['Сайт'] || '',
    источник: л['Источник'] || '',
  };
  if (л['Дата след.']) о['дата_след'] = л['Дата след.'];
  if (л['След. действие']) о['след_действие'] = л['След. действие'];
  // Зацепка и проблема - самые длинные поля, и в списке из тридцати лидов
  // именно они дают основной объём. Модели хватает сути, полный текст
  // человек видит в карточке.
  if (л['Зацепка']) о['зацепка'] = String(л['Зацепка']).slice(0, 90);
  if (л['Проблема']) о['проблема'] = String(л['Проблема']).slice(0, 90);
  if (л['Комментарий']) о['комментарий'] = л['Комментарий'];
  return о;
}

function выполнить(имя, вход, лиды) {
  if (имя === 'vyborka') {
    const a = вход || {};
    const активные = a.tolko_aktivnye !== false;
    const сег = началоДня();
    const q = (a.poisk || '').toLowerCase();

    let r = лиды.filter((л) => {
      if (активные && ЗАКРЫТЫЕ.includes(л['Статус'] || '')) return false;
      if (a.prioritet && (л['Приоритет'] || '') !== a.prioritet) return false;
      if (a.status && (л['Статус'] || 'Новый') !== a.status) return false;
      if (a.gorod && !(л['Город'] || '').toLowerCase().includes(a.gorod.toLowerCase())) return false;
      if (a.nisha && !(л['Ниша'] || '').toLowerCase().includes(a.nisha.toLowerCase())) return false;
      if (a.istochnik && !(л['Источник'] || '').toLowerCase().includes(a.istochnik.toLowerCase())) return false;
      if (a.ball_ot != null && !(Number(л['Балл'] || 0) >= a.ball_ot)) return false;
      if (a.bez_sayta) {
        const s = String(л['Сайт'] || '').trim().toUpperCase();
        if (s && s !== 'НЕТ' && s !== 'НЕТ САЙТА' && s !== '-') return false;
      }
      if (a.prosrocheno) {
        const d = дата(л['Дата след.']);
        if (!d || d > сег) return false;
      }
      if (a.dobavleny_segodnya && л['Добавлен'] !== сегодняСтрокой()) return false;
      if (q) {
        const поле = [л['Компания'], л['ЛПР'], л['Телефон'], л['Город'], л['Ниша']].join(' ').toLowerCase();
        if (!поле.includes(q)) return false;
      }
      return true;
    });

    const порядок = { A: 0, B: 1, C: 2 };
    if (a.sortirovka === 'ball') r.sort((x, y) => Number(y['Балл'] || 0) - Number(x['Балл'] || 0));
    else if (a.sortirovka === 'data') r.sort((x, y) => (дата(x['Дата след.']) || 0) - (дата(y['Дата след.']) || 0));
    else r.sort((x, y) => (порядок[x['Приоритет']] ?? 9) - (порядок[y['Приоритет']] ?? 9)
                        || Number(y['Балл'] || 0) - Number(x['Балл'] || 0));

    const всего = r.length;
    const предел = Math.min(a.limit || 20, 40);
    return { всего_подошло: всего, показано: Math.min(предел, всего), лиды: r.slice(0, предел).map(компактно) };
  }

  if (имя === 'svodka') {
    const поле = вход.po;
    const набор = вход.tolko_aktivnye === false ? лиды : лиды.filter((л) => !ЗАКРЫТЫЕ.includes(л['Статус'] || ''));
    const счёт = {};
    for (const л of набор) {
      const k = (л[поле] || '(пусто)').toString().trim() || '(пусто)';
      счёт[k] = (счёт[k] || 0) + 1;
    }
    const строки = Object.entries(счёт).sort((a, b) => b[1] - a[1]);
    return { поле, всего: набор.length, распределение: Object.fromEntries(строки) };
  }

  // istoriya сюда не попадает: она ходит в другой лист таблицы
  // и обрабатывается снаружи, там где есть доступ к сети.

  if (имя === 'predlozhit_izmenenie') {
    // Поля приходят строкой: так одинаково понимают и Anthropic, и Gemini.
    let поля;
    try { поля = typeof вход.polya === 'string' ? JSON.parse(вход.polya) : (вход.polya || {}); }
    catch { return { отказано: 'Поля пришли не в виде JSON. Пример: {"Статус":"Недозвон"}' }; }
    const чужие = Object.keys(поля).filter((k) => !МОЖНО_МЕНЯТЬ.includes(k));
    if (чужие.length) {
      return { отказано: `Эти поля менять нельзя: ${чужие.join(', ')}. Разрешено: ${МОЖНО_МЕНЯТЬ.join(', ')}.` };
    }
    const строки = (вход.stroki || []).map(Number).filter(Boolean);
    if (!строки.length) return { отказано: 'Не указано ни одной строки.' };

    const затронуты = лиды.filter((л) => строки.includes(л._row))
      .map((л) => ({ row: л._row, компания: л['Компания'], статус: л['Статус'] || 'Новый' }));

    return {
      предложено: true,
      сообщение: 'Показал человеку на подтверждение. Сам скажи одной фразой, что предлагаешь и почему.',
      затронуто: затронуты.length,
      предложение: { строки, поля, зачем: вход.zachem, лиды: затронуты },
    };
  }

  return { ошибка: 'неизвестный инструмент' };
}

/* ─── Правила поведения ───────────────────────────────────────────── */

function правила(лиды) {
  const активных = лиды.filter((л) => !ЗАКРЫТЫЕ.includes(л['Статус'] || '')).length;
  return `Ты помощник в CRM веб-студии ONYX. Отвечаешь её владельцу.

О студии: делают сайты под ключ, разработка стоит 0 рублей, клиент платит
за запуск - домен и хостинг, дальше по желанию докупает опции. Тарифы
9 990, 14 990 и от 24 990. Лидов находят ИИ-агенты, дальше владелец
с партнёром обзванивают. Ключевой этап - бесплатная консультация
на 10 минут, в переписке она называется КЭВ.

Сейчас в базе ${лиды.length} лидов, из них в работе ${активных}.
Сегодня ${сегодняСтрокой()}.

Как отвечать:
- Коротко. Человек читает это между звонками, часто с телефона.
- Никаких вступлений вроде «конечно» и «давайте посмотрим». Сразу по делу.
- Числа бери только из инструментов. Не помнишь - спроси инструментом,
  не угадывай. Выдуманная цифра здесь хуже, чем «не знаю».
- Списки лидов давай с телефоном и компанией: по ним сразу звонят.
- Не используй длинные тире, только обычный дефис.
- Не выдумывай сроки, гарантии и обещания от лица студии.

Когда просят план на день - смотри просроченных и новых A, предлагай
конкретный порядок обзвона и объясняй, почему именно такой.

Когда просят отчёт - бери и сводку, и историю за день: сколько тронули,
что изменилось, где затык.

Менять данные ты не можешь. Инструмент predlozhit_izmenenie только
показывает предложение человеку - он подтверждает сам. Не говори,
что изменил: скажи, что предлагаешь.`;
}

/* ─── Обработчик ──────────────────────────────────────────────────── */

export default async function handler(req, res) {
  const { CRM_PASSWORD, нет } = настройки();

  if (нет.length || !КЛЮЧ_МОДЕЛИ) {
    const имяКлюча = ПРОВАЙДЕР === 'gemini' ? 'GEMINI_API_KEY'
      : ПРОВАЙДЕР === 'openai' ? 'NVIDIA_API_KEY' : 'AI_API_KEY';
    const список = [...нет, !КЛЮЧ_МОДЕЛИ && имяКлюча].filter(Boolean).join(', ');
    return ответ(res, 500, {
      ok: false,
      error: `На сервере не заданы переменные: ${список}. Vercel → Settings → Environment Variables, потом Redeploy.`,
    });
  }
  if (!равны(req.headers['x-onyx-key'], CRM_PASSWORD)) return ответ(res, 401, { ok: false, error: 'forbidden' });
  if (req.method !== 'POST') return ответ(res, 405, { ok: false, error: 'только POST' });

  const тело = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

  // Подтверждённое изменение приходит отдельным запросом - модель
  // в этот момент уже не участвует, решение принял человек.
  if (тело.подтвердить) {
    const { строки = [], поля = {}, кто = '' } = тело.подтвердить;
    const чужие = Object.keys(поля).filter((k) => !МОЖНО_МЕНЯТЬ.includes(k));
    if (чужие.length) return ответ(res, 400, { ok: false, error: `Поля менять нельзя: ${чужие.join(', ')}` });

    let готово = 0; const сбои = [];
    for (const row of строки) {
      try {
        const r = await кТаблице({ api: 'update', row: String(row), who: кто, patch: JSON.stringify(поля) });
        if (r && r.ok) готово++; else сбои.push(`${row}: ${r && r.error || 'отказ'}`);
      } catch (e) { сбои.push(`${row}: ${e.message}`); }
    }
    return ответ(res, 200, { ok: true, изменено: готово, сбои });
  }

  let лиды;
  try {
    const r = await кТаблице({ api: 'leads' });
    if (!r || !r.ok) throw new Error((r && r.error) || 'таблица не отдала лидов');
    лиды = r.rows || [];
  } catch (e) {
    return ответ(res, 502, { ok: false, error: 'Не удалось прочитать таблицу: ' + e.message });
  }

  const загрузитьСобытия = async (a) =>
    кТаблице({ api: 'events', phone: a.telefon || '', limit: String(Math.min(a.limit || 60, 200)) })
      .then((r) => ({ события: (r && r.rows) || [] }))
      .catch((e) => ({ ошибка: e.message }));

  // Держим короткую память: длинная переписка уезжает в модель целиком
  // на каждом шаге, и старые реплики начинают стоить дороже новых.
  const реплики = (тело.сообщения || []).slice(-8)
    .map((м) => ({ role: м.role === 'assistant' ? 'assistant' : 'user', text: String(м.content || '') }))
    .filter((м) => м.text);

  const инструмент = async (имя, вход) =>
    имя === 'istoriya' ? загрузитьСобытия(вход || {}) : выполнить(имя, вход, лиды);

  try {
    const итог =
      ПРОВАЙДЕР === 'gemini' ? await черезGemini(реплики, правила(лиды), инструмент)
      : ПРОВАЙДЕР === 'openai' ? await черезOpenAI(реплики, правила(лиды), инструмент)
      : await черезAnthropic(реплики, правила(лиды), инструмент);
    return ответ(res, 200, { ok: true, текст: итог.текст, предложение: итог.предложение });
  } catch (e) {
    const код = e && e.статус ? e.статус : 500;
    return ответ(res, код, { ok: false, error: String(e && e.message || e).slice(0, 300), тело: (e && e.тело) || '' });
  }
}

/* ─── Anthropic ───────────────────────────────────────────────────── */

async function черезAnthropic(реплики, система, инструмент) {
  const сообщения = реплики.map((м) => ({ role: м.role, content: м.text }));
  let предложение = null;

  for (let шаг = 0; шаг < 3; шаг++) {
    const r = await fetch(АДРЕС, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': КЛЮЧ_МОДЕЛИ,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: МОДЕЛЬ, max_tokens: 1200, system: система,
        tools: ИНСТРУМЕНТЫ, messages: сообщения,
      }),
    });
    if (!r.ok) throw подробно(await r.text(), r.status, 'Anthropic');

    const данные = await r.json();
    const вызовы = (данные.content || []).filter((c) => c.type === 'tool_use');
    const текст = (данные.content || []).filter((c) => c.type === 'text').map((c) => c.text).join('\n').trim();
    if (!вызовы.length) return { текст, предложение };

    сообщения.push({ role: 'assistant', content: данные.content });
    const ответы = [];
    for (const в of вызовы) {
      const итог = await инструмент(в.name, в.input);
      if (итог && итог.предложение) предложение = итог.предложение;
      ответы.push({ type: 'tool_result', tool_use_id: в.id, content: JSON.stringify(итог) });
    }
    сообщения.push({ role: 'user', content: ответы });
  }
  return { текст: 'Вопрос оказался слишком составным. Разбейте его на два - так и ответ будет точнее.', предложение };
}

/* ─── Gemini ──────────────────────────────────────────────────────── */

/* Схемы инструментов у Google описываются подмножеством OpenAPI:
   типы заглавными, никаких лишних ключей. Переводим на лету, чтобы
   держать один список инструментов на обоих провайдеров. */
function схемаДляGemini(s) {
  if (!s || typeof s !== 'object') return s;
  const out = {};
  if (s.type) out.type = String(s.type).toUpperCase();
  if (s.description) out.description = s.description;
  if (s.enum) out.enum = s.enum;
  if (s.items) out.items = схемаДляGemini(s.items);
  if (s.properties) {
    out.properties = {};
    for (const [k, v] of Object.entries(s.properties)) out.properties[k] = схемаДляGemini(v);
  }
  if (s.required) out.required = s.required;
  return out;
}

async function черезGemini(реплики, система, инструмент) {
  const база = process.env.AI_API_URL ||
    `https://generativelanguage.googleapis.com/v1beta/models/${МОДЕЛЬ}:generateContent`;

  const содержимое = реплики.map((м) => ({
    role: м.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: м.text }],
  }));

  const объявления = ИНСТРУМЕНТЫ.map((и) => ({
    name: и.name, description: и.description, parameters: схемаДляGemini(и.input_schema),
  }));

  let предложение = null;

  for (let шаг = 0; шаг < 3; шаг++) {
    const r = await fetch(база, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': КЛЮЧ_МОДЕЛИ },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: система }] },
        contents: содержимое,
        tools: [{ function_declarations: объявления }],
        generationConfig: { maxOutputTokens: 1200, temperature: 0.3 },
      }),
    });
    if (!r.ok) throw подробно(await r.text(), r.status, 'Gemini');

    const данные = await r.json();
    const части = ((данные.candidates || [])[0] || {}).content?.parts || [];
    const вызовы = части.filter((ч) => ч.functionCall).map((ч) => ч.functionCall);
    const текст = части.filter((ч) => ч.text).map((ч) => ч.text).join('\n').trim();

    if (!вызовы.length) {
      if (текст) return { текст, предложение };
      // Пустой ответ без вызовов - обычно упёрлись в лимит длины.
      const причина = ((данные.candidates || [])[0] || {}).finishReason || '';
      return { текст: причина === 'MAX_TOKENS'
        ? 'Ответ получился слишком длинным. Спросите уже, но конкретнее.'
        : 'Модель ничего не ответила. Попробуйте переформулировать.', предложение };
    }

    содержимое.push({ role: 'model', parts: части });
    const ответы = [];
    for (const в of вызовы) {
      const итог = await инструмент(в.name, в.args || {});
      if (итог && итог.предложение) предложение = итог.предложение;
      ответы.push({ functionResponse: { name: в.name, response: { итог } } });
    }
    содержимое.push({ role: 'user', parts: ответы });
  }
  return { текст: 'Вопрос оказался слишком составным. Разбейте его на два - так и ответ будет точнее.', предложение };
}

/* ─── OpenAI-совместимые ──────────────────────────────────────────────
 *
 * Один адаптер на целое семейство: NVIDIA NIM, Groq, OpenRouter,
 * DeepSeek, Mistral и всё, что говорит на формате chat/completions.
 * Меняется только AI_API_URL и модель.
 *
 * Оговорка по NVIDIA: их бесплатный доступ дан под разработку,
 * тестирование и оценку, а промышленное использование требует
 * NVIDIA AI Enterprise. Ежедневный обзвон клиентов - это промышленное
 * использование, поэтому как основной провайдер он не годится.
 * Для опытов и сравнения моделей - вполне.
 */

async function черезOpenAI(реплики, система, инструмент) {
  const база = process.env.AI_API_URL || 'https://integrate.api.nvidia.com/v1/chat/completions';

  const сообщения = [{ role: 'system', content: система },
    ...реплики.map((м) => ({ role: м.role, content: м.text }))];

  const инструменты = ИНСТРУМЕНТЫ.map((и) => ({
    type: 'function',
    function: { name: и.name, description: и.description, parameters: и.input_schema },
  }));

  let предложение = null;

  for (let шаг = 0; шаг < 3; шаг++) {
    const r = await fetch(база, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: 'Bearer ' + КЛЮЧ_МОДЕЛИ },
      body: JSON.stringify({
        model: МОДЕЛЬ, messages: сообщения, tools: инструменты,
        // Запас больше, чем у других провайдеров: модели с рассуждением
        // тратят часть лимита на размышления, и при 1200 ответ обрывался
        // на середине фразы.
        max_tokens: 2500, temperature: 0.3,
      }),
    });
    if (!r.ok) {
      const текст = await r.text();
      // 404 у OpenAI-совместимых почти всегда означает неверное имя модели.
      // Провайдер знает, какие у него есть - спросим и покажем сразу,
      // вместо ещё одного круга «попробуй другое название».
      if (r.status === 404) throw await сПодсказкойМоделей(текст, база);
      throw подробно(текст, r.status, 'Модель');
    }

    const данные = await r.json();
    const реплика = ((данные.choices || [])[0] || {}).message || {};
    const вызовы = реплика.tool_calls || [];

    /* Модели с рассуждением возвращают ход мыслей: одни отдельным полем
       reasoning_content, другие прямо в тексте между тегами think.
       Человеку это показывать не нужно - он спросил про лидов,
       а не про то, как модель к ответу шла. */
    const текст = String(реплика.content || '')
      .replace(/<think>[\s\S]*?<\/think>/gi, '')
      .replace(/<\/?think>/gi, '')
      .trim();

    if (!вызовы.length) {
      return { текст: текст || 'Модель ничего не ответила. Попробуйте переформулировать.', предложение };
    }

    сообщения.push(реплика);
    for (const в of вызовы) {
      let вход = {};
      // Аргументы приходят строкой JSON, и мелкие модели иногда шлют мусор.
      try { вход = JSON.parse((в.function && в.function.arguments) || '{}'); } catch { вход = {}; }
      const итог = await инструмент(в.function.name, вход);
      if (итог && итог.предложение) предложение = итог.предложение;
      сообщения.push({ role: 'tool', tool_call_id: в.id, content: JSON.stringify(итог) });
    }
  }
  return { текст: 'Вопрос оказался слишком составным. Разбейте его на два - так и ответ будет точнее.', предложение };
}

/* Ошибка провайдера с сохранённым телом: без него «модель отказала»
   не отличить от «кончились кредиты» и «неверный ключ». */
/** К ошибке 404 приложить список моделей, которые у провайдера есть. */
async function сПодсказкойМоделей(текст, база) {
  const e = подробно(текст, 404, 'Модель');
  try {
    const адресСписка = база.replace(/\/chat\/completions\/?$/, '/models');
    const r = await fetch(адресСписка, { headers: { authorization: 'Bearer ' + КЛЮЧ_МОДЕЛИ } });
    if (!r.ok) return e;
    const д = await r.json();
    const имена = (д.data || []).map((m) => m.id).filter(Boolean).slice(0, 25);
    if (имена.length) {
      e.message = `Модель «${МОДЕЛЬ}» у провайдера не найдена. Поставьте в AI_MODEL одну из этих:`;
      e.тело = имена.join(', ');
    }
  } catch { /* не смогли спросить список - оставляем исходную ошибку */ }
  return e;
}

/* Ошибка провайдера, из которой видно, что чинить.
 *
 * Раньше здесь было «Gemini отказал (404)» - и всё. По такому тексту
 * нельзя отличить неверный ключ от несуществующей модели, а это
 * совершенно разные починки. Теперь в сообщении есть и провайдер,
 * и модель, и подсказка по коду ответа. */
function подробно(текст, статус, кто) {
  const подсказка =
    статус === 404 ? `Модель «${МОДЕЛЬ}» не найдена у этого провайдера. Проверьте AI_MODEL.`
    : статус === 401 || статус === 403 ? 'Ключ не принят. Проверьте, что он от нужного сервиса и не отозван.'
    : статус === 429 ? 'Слишком часто. Подождите минуту.'
    : '';
  const e = new Error(`${кто} (${ПРОВАЙДЕР}/${МОДЕЛЬ}) ответил ${статус}. ${подсказка}`.trim());
  e.статус = 502;
  e.тело = String(текст || '').replace(/\s+/g, ' ').slice(0, 300);
  return e;
}
