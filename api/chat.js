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

const МОДЕЛЬ = process.env.AI_MODEL || 'claude-sonnet-5';
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
        polya: { type: 'object', description: 'что проставить, например {"Статус":"Недозвон"}' },
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
  if (л['Зацепка']) о['зацепка'] = String(л['Зацепка']).slice(0, 220);
  if (л['Проблема']) о['проблема'] = String(л['Проблема']).slice(0, 220);
  if (л['Комментарий']) о['комментарий'] = л['Комментарий'];
  return о;
}

function выполнить(имя, вход, лиды, событияЗагрузчик) {
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
    const предел = Math.min(a.limit || 25, 60);
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

  if (имя === 'istoriya') return событияЗагрузчик(вход || {});

  if (имя === 'predlozhit_izmenenie') {
    const поля = вход.polya || {};
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
  const ключМодели = process.env.AI_API_KEY;

  if (нет.length || !ключМодели) {
    const список = [...нет, !ключМодели && 'AI_API_KEY'].filter(Boolean).join(', ');
    return ответ(res, 500, { ok: false, error: `На сервере не заданы переменные: ${список}. Vercel → Settings → Environment Variables, потом Redeploy.` });
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

  const сообщения = (тело.сообщения || []).slice(-16);
  let предложение = null;

  try {
    for (let шаг = 0; шаг < 6; шаг++) {
      const r = await fetch(АДРЕС, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': ключМодели,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: МОДЕЛЬ,
          max_tokens: 2000,
          system: правила(лиды),
          tools: ИНСТРУМЕНТЫ,
          messages: сообщения,
        }),
      });

      if (!r.ok) {
        const t = await r.text();
        return ответ(res, 502, { ok: false, error: `Модель отказала (${r.status})`, тело: t.slice(0, 300) });
      }

      const данные = await r.json();
      const вызовы = (данные.content || []).filter((c) => c.type === 'tool_use');
      const текст = (данные.content || []).filter((c) => c.type === 'text').map((c) => c.text).join('\n').trim();

      if (!вызовы.length) return ответ(res, 200, { ok: true, текст, предложение });

      сообщения.push({ role: 'assistant', content: данные.content });
      const результаты = [];
      for (const в of вызовы) {
        // История живёт в другом листе, за ней нужен отдельный запрос;
        // остальное считается на месте по уже загруженным лидам.
        const итог = в.name === 'istoriya'
          ? await загрузитьСобытия(в.input || {})
          : выполнить(в.name, в.input, лиды, () => ({}));
        if (итог && итог.предложение) предложение = итог.предложение;
        результаты.push({ type: 'tool_result', tool_use_id: в.id, content: JSON.stringify(итог) });
      }
      сообщения.push({ role: 'user', content: результаты });
    }
    return ответ(res, 200, { ok: true, текст: 'Слишком много шагов - переспросите короче.', предложение });
  } catch (e) {
    return ответ(res, 500, { ok: false, error: 'Сбой чата: ' + String(e && e.message || e).slice(0, 200) });
  }
}
