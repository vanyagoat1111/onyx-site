import React, { useEffect, useMemo, useState } from 'react';
import {
  загрузитьЛиды, обновитьЛид, убратьЛид, сохранитьДоступ, забытьДоступ,
  ключ, телДляЗвонка, телДляWhatsApp, разобратьДату, сегодня,
  ОтветСервера, достатьЛидовИзВыгрузки, залитьЛидов, таблицаГотоваКИмпорту,
  type Лид,
} from './api';
import { включитьУстановку, запущеноКакПриложение, этоIOS } from './ustanovka';
import Chat from './Chat';
import { историяЛида, type Событие } from './api';

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
  const [ответСервера, setОтвет] = useState('');
  const [вход, setВход] = useState(!ключ());
  const [вкладка, setВкладка] = useState<Вкладка>('сегодня');
  const [поиск, setПоиск] = useState('');
  const [открыт, setОткрыт] = useState<Лид | null>(null);
  const [импорт, setИмпорт] = useState(false);
  const [подсказка, setПодсказка] = useState(false);
  const [чат, setЧат] = useState(false);

  async function обновить() {
    setГрузим(true); setОшибка(''); setОтвет('');
    try {
      const r = await загрузитьЛиды();
      if (!r.ok) {
        throw new Error(r.error === 'forbidden'
          ? 'Ключ не подошёл. Он должен совпадать со свойством SHARED_SECRET в настройках скрипта.'
          : (r.error || 'Ошибка'));
      }
      setЛиды(r.rows || []);
      setВход(false);
    } catch (e) {
      setОшибка(e instanceof Error ? e.message : String(e));
      // Сырой ответ Google показываем как есть: по нему видно причину,
      // и его можно переслать целиком, не пересказывая своими словами.
      if (e instanceof ОтветСервера) setОтвет(e.тело);
      setВход(true);
    } finally {
      setГрузим(false);
    }
  }

  useEffect(() => { if (!вход) обновить(); /* eslint-disable-next-line */ }, []);

  // Пока открыт этот раздел, страница притворяется приложением ONYX CRM:
  // своя иконка, своё имя, свой манифест. При уходе всё возвращается сайту.
  useEffect(включитьУстановку, []);

  useEffect(() => {
    if (запущеноКакПриложение() || !этоIOS()) return;
    try {
      if (localStorage.getItem('onyx_crm_podskazka') === 'skryta') return;
    } catch { return; }
    const t = setTimeout(() => setПодсказка(true), 1500);
    return () => clearTimeout(t);
  }, []);

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

  if (вход) return <Вход onOk={обновить} ошибка={ошибка} ответ={ответСервера} грузим={грузим} />;

  const текущие = списки[вкладка];

  return (
    <div className="min-h-screen bg-[#0a0a0d] text-[#f2f0e9] font-body">
      <header className="sticky top-0 z-20 bg-[#0a0a0d]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3 mb-3">
            <h1 className="font-display font-bold text-lg">ONYX CRM</h1>
            <div className="flex gap-2">
              <button onClick={() => setЧат(true)}
                className="text-xs font-mono uppercase tracking-wider text-white bg-cobalt px-3 py-2 rounded-full active:scale-95 transition">
                спросить
              </button>
              <button onClick={() => setИмпорт(true)}
                className="text-xs font-mono uppercase tracking-wider text-fog px-3 py-2 rounded-full border border-white/15 active:scale-95 transition">
                импорт
              </button>
              <button onClick={обновить} disabled={грузим}
                className="text-xs font-mono uppercase tracking-wider text-cobalt-soft px-3 py-2 rounded-full border border-white/15 active:scale-95 transition">
                {грузим ? 'читаю…' : 'обновить'}
              </button>
            </div>
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

      {импорт && <Импорт onClose={() => setИмпорт(false)} onГотово={обновить} />}

      {чат && <Chat onClose={() => setЧат(false)} onИзменено={обновить} />}

      {подсказка && (
        <ПодсказкаУстановки onClose={() => {
          try { localStorage.setItem('onyx_crm_podskazka', 'skryta'); } catch { /* режим инкогнито */ }
          setПодсказка(false);
        }} />
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
          <div className="flex items-center gap-1.5 justify-end">
            {л['Балл'] && (
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-cobalt/25 text-cobalt-soft">{л['Балл']}</span>
            )}
            {л['Приоритет'] && (
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/10">{л['Приоритет']}</span>
            )}
          </div>
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
          {л['ЛПР'] && <Поле ярлык="ЛПР" знач={[л['ЛПР'], л['Роль']].filter(Boolean).join(', ')} />}
          {л['Сайт'] && <Поле ярлык="Сайт" знач={л['Сайт']} />}

          {/* Разбор агента.
              Стоит выше кнопки звонка намеренно: это то, что нужно
              прочитать ДО набора номера, а не искать потом в другом окне. */}
          {(л['Проблема'] || л['Зацепка']) && (
            <div className="bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 space-y-2">
              {л['Проблема'] && (
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-fog mb-1">Что у них не так</p>
                  <p className="text-sm text-bone/90 leading-snug">{л['Проблема']}</p>
                </div>
              )}
              {л['Зацепка'] && (
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-fog mb-1">С чего начать</p>
                  <p className="text-sm leading-snug">{л['Зацепка']}</p>
                </div>
              )}
            </div>
          )}
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

          {л['Сообщение'] && <Сообщение текст={л['Сообщение']} />}

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

          <История телефон={тел} />

          <button onClick={onАрхив}
            className="w-full py-3 rounded-xl border border-red-500/30 text-red-300 text-sm active:scale-95 transition">
            Убрать в архив и не звонить больше
          </button>
        </div>
      </div>
    </div>
  );
}

/* Что уже происходило по этому лиду.
 *
 * Загружаем по требованию, а не вместе со списком: событий со временем
 * станет больше, чем самих лидов, и тянуть их в каждый список - значит
 * замедлить главный экран ради того, что смотрят изредка. */
function История({ телефон }: { телефон: string }) {
  const [открыто, setОткрыто] = useState(false);
  const [строки, setСтроки] = useState<Событие[] | null>(null);
  const [ошибка, setОшибка] = useState('');

  async function развернуть() {
    setОткрыто((o) => !o);
    if (строки || !телефон) return;
    try {
      const r = await историяЛида(телефон);
      setСтроки(r.rows || []);
    } catch (e) {
      setОшибка(e instanceof Error ? e.message : String(e));
    }
  }

  if (!телефон) return null;

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button onClick={развернуть}
        className="w-full text-left px-4 py-2.5 bg-white/[0.05] font-mono text-[10px] uppercase tracking-wider text-fog">
        История {открыто ? '▲' : '▼'}
      </button>
      {открыто && (
        <div className="px-4 py-3">
          {ошибка && <p className="text-sm text-red-300">{ошибка}</p>}
          {!ошибка && !строки && <p className="text-sm text-fog">Читаю…</p>}
          {строки && !строки.length && (
            <p className="text-sm text-fog">Пока пусто. Здесь появится, кто и когда звонил.</p>
          )}
          {строки && строки.map((с, i) => (
            <div key={i} className="flex gap-3 text-xs py-1.5 border-b border-white/5 last:border-0">
              <span className="text-fog font-mono shrink-0 w-24">{с['Когда']}</span>
              <span className="flex-1">
                <b>{с['Кто'] && с['Кто'] !== '-' ? с['Кто'] : 'кто-то'}</b>: {с['Что']}
                {с['Стало'] ? ` → ${с['Стало']}` : ''}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* Подсказка про установку на домашний экран.
 *
 * Показываем один раз и только на iPhone: на других системах путь
 * другой, а неверная инструкция хуже отсутствующей. После закрытия
 * не возвращается - человек либо поставил, либо решил не ставить,
 * и напоминать об этом каждый день значит мешать работать. */
function ПодсказкаУстановки({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-3" onClick={onClose}>
      <div className="max-w-3xl mx-auto bg-[#16161d] border border-white/15 rounded-2xl px-4 py-3 shadow-2xl flex items-start gap-3"
           onClick={(e) => e.stopPropagation()}>
        <img src="/crm/icon-180.png" alt="" className="w-10 h-10 rounded-xl shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">Поставьте CRM на экран</p>
          <p className="text-xs text-fog mt-0.5 leading-snug">
            Внизу Safari нажмите <span className="text-bone">Поделиться</span>, затем{' '}
            <span className="text-bone">На экран «Домой»</span>. Откроется без адресной строки, как приложение.
          </p>
        </div>
        <button onClick={onClose} className="text-fog text-xl leading-none px-1 shrink-0">×</button>
      </div>
    </div>
  );
}

/* Импорт выгрузки агентов.
 *
 * Отдельным окном, а не страницей: это редкое действие, и уводить
 * ради него из списка лидов не стоит. Файл берём как есть - тот самый,
 * что агент кладёт на диск, без переименований и подготовки. */
function Импорт({ onClose, onГотово }: { onClose: () => void; onГотово: () => void }) {
  const [шаг, setШаг] = useState<'выбор' | 'льём' | 'готово' | 'ошибка'>('выбор');
  const [текст, setТекст] = useState('');
  const [подробно, setПодробно] = useState('');
  const [ход, setХод] = useState({ готово: 0, всего: 0 });

  async function взять(файл: File) {
    setШаг('льём'); setТекст('Читаю файл…'); setПодробно('');
    try {
      const строки = достатьЛидовИзВыгрузки(await файл.text());
      setТекст(`Нашёл ${строки.length} лидов. Проверяю таблицу…`);

      if (!(await таблицаГотоваКИмпорту())) {
        throw new Error(
          'В таблице ещё нет колонок «Зацепка» и «Сообщение». ' +
          'Значит развёрнута старая версия скрипта - обнови её, иначе разбор агента потеряется.');
      }

      setТекст('Отправляю…');
      const r = await залитьЛидов(строки, (готово, всего) => setХод({ готово, всего }));
      setТекст(`Добавлено ${r.добавлено}. Отсеяно как повторы или чёрный список - ${r.отсеяно}.`);
      setШаг('готово');
      onГотово();
    } catch (e) {
      setТекст(e instanceof Error ? e.message : String(e));
      if (e instanceof ОтветСервера) setПодробно(e.тело);
      setШаг('ошибка');
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="bg-[#111116] w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl p-5" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3 mb-4">
          <h2 className="font-display font-bold text-lg">Импорт выгрузки</h2>
          <button onClick={onClose} className="text-fog text-2xl leading-none px-2 -mt-1">×</button>
        </div>

        {шаг === 'выбор' && (
          <>
            <p className="text-sm text-fog leading-relaxed mb-4">
              Выберите файл агентов - тот самый <span className="font-mono text-bone">Onyx_CRM.html</span>.
              Кто уже есть в таблице или в чёрном списке, добавлен не будет.
            </p>
            <label className="block w-full text-center bg-cobalt text-white font-semibold py-4 rounded-xl active:scale-95 transition cursor-pointer">
              Выбрать файл
              <input type="file" accept=".html,.htm" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) взять(f); }} />
            </label>
          </>
        )}

        {шаг === 'льём' && (
          <div className="space-y-3">
            <p className="text-sm">{текст}</p>
            {ход.всего > 0 && (
              <>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-cobalt transition-all"
                       style={{ width: `${Math.round((ход.готово / ход.всего) * 100)}%` }} />
                </div>
                <p className="text-xs text-fog font-mono">{ход.готово} из {ход.всего}</p>
              </>
            )}
          </div>
        )}

        {шаг === 'готово' && (
          <>
            <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-xl px-4 py-3 text-sm mb-4">{текст}</div>
            <button onClick={onClose} className="w-full bg-cobalt text-white font-semibold py-4 rounded-xl active:scale-95 transition">
              Понятно
            </button>
          </>
        )}

        {шаг === 'ошибка' && (
          <>
            <div className="bg-[#3a1414] border border-red-500/30 rounded-xl px-4 py-3 mb-4">
              <p className="text-sm">{текст}</p>
              {подробно && (
                <details className="mt-2">
                  <summary className="text-xs text-fog cursor-pointer">Что ответил сервер</summary>
                  <pre className="text-[10px] text-fog/80 whitespace-pre-wrap break-all mt-2 max-h-40 overflow-y-auto">{подробно}</pre>
                </details>
              )}
            </div>
            <button onClick={() => setШаг('выбор')} className="w-full bg-white/10 font-semibold py-4 rounded-xl active:scale-95 transition">
              Ещё раз
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* Готовое сообщение от агента.
 *
 * Свёрнуто по умолчанию: оно длинное, а карточку открывают ради звонка.
 * Кнопка копирования отдельно от разворачивания - чаще всего текст
 * не нужно читать, его нужно вставить в переписку и отправить. */
function Сообщение({ текст }: { текст: string }) {
  const [открыт, setОткрыт] = useState(false);
  const [скопировано, setСкопировано] = useState(false);

  async function копировать() {
    try {
      await navigator.clipboard.writeText(текст);
    } catch {
      // Без https или в старом браузере clipboard недоступен -
      // выделяем текст, чтобы человек скопировал сам.
      setОткрыт(true);
      return;
    }
    setСкопировано(true);
    setTimeout(() => setСкопировано(false), 1800);
  }

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between gap-2 px-4 py-2.5 bg-white/[0.05]">
        <button onClick={() => setОткрыт((o) => !o)}
          className="font-mono text-[10px] uppercase tracking-wider text-fog">
          Готовое сообщение {открыт ? '▲' : '▼'}
        </button>
        <button onClick={копировать}
          className={`text-xs px-3 py-1.5 rounded-lg transition active:scale-95 ${
            скопировано ? 'bg-emerald-600/80 text-white' : 'bg-cobalt text-white'}`}>
          {скопировано ? 'Скопировано' : 'Копировать'}
        </button>
      </div>
      {открыт && (
        <p className="px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap select-all">{текст}</p>
      )}
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

function Вход({ onOk, ошибка, ответ, грузим }: {
  onOk: () => void; ошибка: string; ответ: string; грузим: boolean;
}) {
  const [k, setK] = useState(ключ());

  // Пароль один, потому что адрес таблицы и её ключ живут на сервере.
  // Раньше здесь было два поля, и оба надо было где-то раздобыть -
  // на телефоне это означало «сегодня я в CRM не зайду».
  const войти = () => { if (k.trim()) { сохранитьДоступ(k); onOk(); } };

  return (
    <div className="min-h-screen bg-[#0a0a0d] text-[#f2f0e9] flex items-center justify-center px-5 font-body">
      <div className="w-full max-w-sm">
        <img src="/crm/icon-180.png" alt="" className="w-14 h-14 rounded-2xl mb-4" />
        <h1 className="font-display font-bold text-2xl mb-2">ONYX CRM</h1>
        <p className="text-sm text-fog mb-6">Введите пароль - и попадёте к списку на обзвон.</p>

        {ошибка && (
          <div className="bg-[#3a1414] border border-red-500/30 rounded-xl px-4 py-3 mb-4">
            <p className="text-sm">{ошибка}</p>
            {ответ && (
              <details className="mt-2">
                <summary className="text-xs text-fog cursor-pointer">Что ответил сервер</summary>
                <pre className="text-[10px] text-fog/80 whitespace-pre-wrap break-all mt-2 max-h-40 overflow-y-auto">{ответ}</pre>
              </details>
            )}
          </div>
        )}

        <input
          value={k} onChange={(e) => setK(e.target.value)} type="password"
          autoComplete="current-password" placeholder="Пароль"
          onKeyDown={(e) => e.key === 'Enter' && войти()}
          className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-[16px] mb-4 outline-none focus:border-cobalt/60" />

        <button onClick={войти} disabled={грузим || !k.trim()}
          className="w-full bg-cobalt text-white font-semibold py-4 rounded-xl active:scale-95 transition disabled:opacity-40">
          {грузим ? 'Проверяю…' : 'Войти'}
        </button>

        <button onClick={() => { забытьДоступ(); location.reload(); }}
          className="w-full text-fog text-xs mt-4">Забыть пароль на этом устройстве</button>
      </div>
    </div>
  );
}
