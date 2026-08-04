import React, { useEffect, useMemo, useState } from 'react';
import {
  загрузитьЛиды, обновитьЛид, убратьЛид, сохранитьДоступ, забытьДоступ,
  ключ, адрес, телДляЗвонка, телДляWhatsApp, разобратьДату, сегодня,
  type Лид,
} from './api';

/* ONYX CRM - своё приложение для прозвона.
 *
 * Задача одна: чтобы человек с телефоном в руке за минуту понял,
 * кому звонить, позвонил и поставил результат. Всё остальное вторично.
 *
 * Поэтому здесь нет таблицы. Таблица хороша, когда данные смотрят;
 * когда по ним работают, нужна карточка: крупный телефон, кнопка
 * звонка под большой палец, статус в одно касание.
 *
 * Данные живут в Google Таблице - она остаётся источником правды,
 * туда же пишет бот и синхронизация агентов. Это приложение только
 * читает и правит, своей базы у него нет. Так мы получаем удобство
 * без переноса данных и без риска их потерять.
 */

const СТАТУСЫ = [
  'Новый', 'Позвонил', 'Написал', 'Ответил', 'КЭВ назначен',
  'Клиент', 'Недозвон', 'Отказ', 'Невалид', 'Дубль', 'Не звонить',
];

// Статусы, после которых лид уходит из работы.
const ЗАКРЫТЫЕ = ['Отказ', 'Клиент', 'Невалид', 'Дубль', 'Не звонить'];

type Вкладка = 'сегодня' | 'все' | 'закрытые';

export default function CrmApp() {
  const [лиды, setЛиды] = useState<Лид[]>([]);
  const [грузим, setГрузим] = useState(false);
  const [ошибка, setОшибка] = useState('');
  const [вход, setВход] = useState(!ключ() || !адрес());
  const [вкладка, setВкладка] = useState<Вкладка>('сегодня');
  const [поиск, setПоиск] = useState('');
  const [открыт, setОткрыт] = useState<Лид | null>(null);

  async function обновить() {
    setГрузим(true); setОшибка('');
    try {
      const r = await загрузитьЛиды();
      if (!r.ok) throw new Error(r.error === 'forbidden' ? 'Неверный ключ доступа' : (r.error || 'Ошибка'));
      setЛиды(r.rows || []);
      setВход(false);
    } catch (e) {
      setОшибка(e instanceof Error ? e.message : String(e));
      if (String(e).includes('ключ')) setВход(true);
    } finally {
      setГрузим(false);
    }
  }

  useEffect(() => { if (!вход) обновить(); /* eslint-disable-next-line */ }, []);

  const списки = useMemo(() => {
    const q = поиск.trim().toLowerCase();
    const подходит = (l: Лид) => !q ||
      [l['Компания'], l['ЛПР'], l['Телефон'], l['Город'], l['Ниша']]
        .some((v) => (v || '').toLowerCase().includes(q));

    const активные = лиды.filter((l) => !ЗАКРЫТЫЕ.includes(l['Статус'] || ''));
    const сег = new Date(); сег.setHours(0, 0, 0, 0);

    const просрочено = активные.filter((l) => {
      const d = разобратьДату(l['Дата след.'] || '');
      return d && d <= сег;
    });
    const новыеA = активные.filter((l) => l['Приоритет'] === 'A' && (l['Статус'] || 'Новый') === 'Новый');

    return {
      сегодня: [...просрочено, ...новыеA.filter((l) => !просрочено.includes(l))].filter(подходит),
      все: активные.filter(подходит),
      закрытые: лиды.filter((l) => ЗАКРЫТЫЕ.includes(l['Статус'] || '')).filter(подходит),
      счёт: { просрочено: просрочено.length, новыеA: новыеA.length, вРаботе: активные.length },
    };
  }, [лиды, поиск]);

  async function правка(l: Лид, patch: Record<string, string>) {
    // Меняем у себя сразу, не дожидаясь ответа: на телефоне задержка
    // в секунду ощущается как «кнопка не сработала», и человек жмёт ещё раз.
    setЛиды((с) => с.map((x) => (x._row === l._row ? { ...x, ...patch } : x)));
    setОткрыт((o) => (o && o._row === l._row ? { ...o, ...patch } : o));
    try {
      const r = await обновитьЛид(l._row, patch);
      if (!r.ok) throw new Error(r.error || 'не сохранилось');
    } catch (e) {
      setОшибка('Не сохранилось: ' + (e instanceof Error ? e.message : String(e)));
      обновить();   // возвращаем правду из таблицы
    }
  }

  async function вАрхив(l: Лид) {
    if (!confirm(`Убрать «${l['Компания']}» в архив?\n\nТелефон попадёт в чёрный список, и агенты больше не принесут этот номер.`)) return;
    setЛиды((с) => с.filter((x) => x._row !== l._row));
    setОткрыт(null);
    try {
      const r = await убратьЛид(l._row);
      if (!r.ok) throw new Error(r.error || 'не убрался');
      // Номера строк после удаления сдвинулись - перечитываем.
      обновить();
    } catch (e) {
      setОшибка('Не убрался: ' + (e instanceof Error ? e.message : String(e)));
      обновить();
    }
  }

  if (вход) return <Вход onOk={обновить} ошибка={ошибка} />;

  const текущие = списки[вкладка];

  return (
    <div className="min-h-screen bg-[#0a0a0d] text-[#f2f0e9] font-body">
      <header className="sticky top-0 z-20 bg-[#0a0a0d]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3 mb-3">
            <h1 className="font-display font-bold text-lg">ONYX CRM</h1>
            <button onClick={обновить} disabled={грузим}
              className="text-xs font-mono uppercase tracking-wider text-cobalt-soft px-3 py-2 rounded-full border border-white/15 active:scale-95 transition">
              {грузим ? 'читаю…' : 'обновить'}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-3">
            <Цифра ярлык="просрочено" знач={списки.счёт.просрочено} тревога />
            <Цифра ярлык="новых A" знач={списки.счёт.новыеA} />
            <Цифра ярлык="в работе" знач={списки.счёт.вРаботе} />
          </div>

          <input
            value={поиск} onChange={(e) => setПоиск(e.target.value)}
            placeholder="Компания, ЛПР, телефон, город…"
            className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-[16px] outline-none focus:border-cobalt/60"
          />

          <div className="flex gap-2 mt-3">
            {([['сегодня', 'Сегодня'], ['все', 'Все'], ['закрытые', 'Архив']] as const).map(([k, п]) => (
              <button key={k} onClick={() => setВкладка(k)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
                  вкладка === k ? 'bg-cobalt text-white' : 'bg-white/[0.06] text-fog'}`}>
                {п}
              </button>
            ))}
          </div>
        </div>
      </header>

      {ошибка && (
        <div className="max-w-3xl mx-auto px-4 pt-3">
          <div className="bg-[#3a1414] border border-red-500/30 rounded-xl px-4 py-3 text-sm">{ошибка}</div>
        </div>
      )}

      <main className="max-w-3xl mx-auto px-4 py-4 space-y-2 pb-24">
        {!текущие.length && (
          <p className="text-fog text-center py-12 text-sm">
            {грузим ? 'Читаю таблицу…' : 'Пусто. Если это «Сегодня» - значит на сегодня дел нет.'}
          </p>
        )}
        {текущие.map((l) => (
          <Карточка key={l._row} л={l} onOpen={() => setОткрыт(l)} />
        ))}
      </main>

      {открыт && (
        <Окно л={открыт} onClose={() => setОткрыт(null)}
              onПравка={(p) => правка(открыт, p)} onАрхив={() => вАрхив(открыт)} />
      )}
    </div>
  );
}

function Цифра({ ярлык, знач, тревога }: { ярлык: string; знач: number; тревога?: boolean }) {
  return (
    <div className={`rounded-xl px-3 py-2 border ${
      тревога && знач > 0 ? 'bg-[#3a1414] border-red-500/30' : 'bg-white/[0.05] border-white/10'}`}>
      <div className="font-display font-bold text-xl leading-none">{знач}</div>
      <div className="font-mono text-[9px] uppercase tracking-wider text-fog mt-1">{ярлык}</div>
    </div>
  );
}

function Карточка({ л, onOpen }: { л: Лид; onOpen: () => void }) {
  const срок = разобратьДату(л['Дата след.'] || '');
  const сег = new Date(); сег.setHours(0, 0, 0, 0);
  const горит = срок && срок <= сег;

  return (
    <button onClick={onOpen}
      className={`w-full text-left rounded-2xl border px-4 py-3 active:scale-[0.99] transition ${
        горит ? 'bg-[#2a1010] border-red-500/25'
             : л['Приоритет'] === 'A' ? 'bg-[#1c1a10] border-amber-500/20'
             : 'bg-white/[0.04] border-white/10'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-semibold truncate">{л['Компания'] || 'Без названия'}</div>
          <div className="text-xs text-fog truncate mt-0.5">
            {[л['Город'], л['Ниша']].filter(Boolean).join(' · ')}
          </div>
        </div>
        <div className="text-right shrink-0">
          {л['Приоритет'] && (
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/10">{л['Приоритет']}</span>
          )}
          <div className="text-[11px] text-fog mt-1">{л['Статус'] || 'Новый'}</div>
        </div>
      </div>
      {(л['ЛПР'] || л['Телефон']) && (
        <div className="text-sm text-bone/80 mt-2 truncate">
          {л['ЛПР']}{л['ЛПР'] && л['Телефон'] ? ' · ' : ''}{л['Телефон']}
        </div>
      )}
      {л['След. действие'] && (
        <div className={`text-xs mt-2 ${горит ? 'text-red-300' : 'text-fog'}`}>
          {горит ? '⚠ ' : ''}{л['След. действие']}{л['Дата след.'] ? ` · ${л['Дата след.']}` : ''}
        </div>
      )}
    </button>
  );
}

function Окно({ л, onClose, onПравка, onАрхив }: {
  л: Лид; onClose: () => void;
  onПравка: (p: Record<string, string>) => void; onАрхив: () => void;
}) {
  const [действие, setДействие] = useState(л['След. действие'] || '');
  const [дата, setДата] = useState(л['Дата след.'] || '');
  const [коммент, setКоммент] = useState(л['Комментарий'] || '');
  const тел = л['Телефон'] || '';

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center"
         onClick={onClose}>
      <div className="bg-[#111116] w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[92vh] overflow-y-auto"
           onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-[#111116] px-5 py-4 border-b border-white/10 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-display font-bold text-lg leading-tight">{л['Компания']}</h2>
            <p className="text-xs text-fog mt-1">{[л['Город'], л['Ниша']].filter(Boolean).join(' · ')}</p>
          </div>
          <button onClick={onClose} className="text-fog text-2xl leading-none px-2 -mt-1">×</button>
        </div>

        <div className="px-5 py-4 space-y-4">
          {л['ЛПР'] && <Поле ярлык="ЛПР" знач={л['ЛПР']} />}
          {л['Сайт'] && <Поле ярлык="Сайт" знач={л['Сайт']} />}
          {л['В боте'] === 'да' && (
            <div className="bg-cobalt/15 border border-cobalt/30 rounded-xl px-4 py-3 text-sm">
              Этот человек уже писал боту. Не начинайте разговор с нуля.
            </div>
          )}

          {/* Звонок - главное действие, поэтому крупно и первым */}
          {тел && (
            <div className="grid grid-cols-2 gap-2">
              <a href={`tel:${телДляЗвонка(тел)}`}
                 onClick={() => onПравка({ 'Статус': 'Позвонил' })}
                 className="bg-cobalt text-white text-center font-semibold py-4 rounded-xl active:scale-95 transition">
                Позвонить
              </a>
              <a href={`https://wa.me/${телДляWhatsApp(тел)}`} target="_blank" rel="noreferrer"
                 onClick={() => onПравка({ 'Статус': 'Написал' })}
                 className="bg-white/10 text-center font-semibold py-4 rounded-xl active:scale-95 transition">
                WhatsApp
              </a>
              <div className="col-span-2 text-center font-mono text-lg tracking-wide">{тел}</div>
            </div>
          )}

          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-fog mb-2">Статус</p>
            <div className="flex flex-wrap gap-2">
              {СТАТУСЫ.map((с) => (
                <button key={с} onClick={() => onПравка({ 'Статус': с })}
                  className={`px-3 py-2 rounded-lg text-sm transition ${
                    (л['Статус'] || 'Новый') === с ? 'bg-cobalt text-white' : 'bg-white/[0.07] text-bone'}`}>
                  {с}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-wider text-fog">Следующее действие</p>
            <input value={действие} onChange={(e) => setДействие(e.target.value)}
              onBlur={() => действие !== (л['След. действие'] || '') && onПравка({ 'След. действие': действие })}
              placeholder="Что сделать дальше"
              className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-[16px] outline-none focus:border-cobalt/60" />
            <div className="flex gap-2">
              <input value={дата} onChange={(e) => setДата(e.target.value)}
                onBlur={() => дата !== (л['Дата след.'] || '') && onПравка({ 'Дата след.': дата })}
                placeholder="дд.мм.гггг"
                className="flex-1 bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-[16px] outline-none focus:border-cobalt/60" />
              <button onClick={() => { setДата(сегодня()); onПравка({ 'Дата след.': сегодня() }); }}
                className="px-4 rounded-xl bg-white/[0.07] text-sm">Сегодня</button>
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-fog mb-2">Комментарий</p>
            <textarea value={коммент} onChange={(e) => setКоммент(e.target.value)}
              onBlur={() => коммент !== (л['Комментарий'] || '') && onПравка({ 'Комментарий': коммент })}
              rows={3}
              className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-[16px] outline-none focus:border-cobalt/60" />
          </div>

          <button onClick={onАрхив}
            className="w-full py-3 rounded-xl border border-red-500/30 text-red-300 text-sm active:scale-95 transition">
            Убрать в архив и не звонить больше
          </button>
        </div>
      </div>
    </div>
  );
}

function Поле({ ярлык, знач }: { ярлык: string; знач: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-wider text-fog">{ярлык}</p>
      <p className="text-sm mt-0.5 break-words">{знач}</p>
    </div>
  );
}

function Вход({ onOk, ошибка }: { onOk: () => void; ошибка: string }) {
  const [url, setUrl] = useState(адрес());
  const [k, setK] = useState('');

  return (
    <div className="min-h-screen bg-[#0a0a0d] text-[#f2f0e9] flex items-center justify-center px-5 font-body">
      <div className="w-full max-w-sm">
        <h1 className="font-display font-bold text-2xl mb-2">ONYX CRM</h1>
        <p className="text-sm text-fog mb-6">
          Нужен адрес скрипта таблицы и общий ключ. Оба лежат в настройках
          Vercel: SHEETS_WEBHOOK_URL и SHEETS_SECRET.
        </p>
        {ошибка && <div className="bg-[#3a1414] border border-red-500/30 rounded-xl px-4 py-3 text-sm mb-4">{ошибка}</div>}
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://script.google.com/…/exec"
          className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-[16px] mb-3 outline-none focus:border-cobalt/60" />
        <input value={k} onChange={(e) => setK(e.target.value)} type="password" placeholder="Ключ"
          className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-[16px] mb-4 outline-none focus:border-cobalt/60" />
        <button onClick={() => { сохранитьДоступ(url, k); onOk(); }}
          className="w-full bg-cobalt text-white font-semibold py-4 rounded-xl active:scale-95 transition">
          Войти
        </button>
        <button onClick={() => { забытьДоступ(); location.reload(); }}
          className="w-full text-fog text-xs mt-4">Забыть сохранённый доступ</button>
      </div>
    </div>
  );
}
