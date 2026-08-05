import React, { useEffect, useRef, useState } from 'react';
import { спросить, подтвердить, кто, запомнитьКто, type Реплика, type Предложение } from './api';
import { слушать, микрофонЕсть, озвучить, замолчать } from './golos';

/* Разговор с базой.
 *
 * Смысл не в том, чтобы заменить список лидов, а в том, чтобы снять
 * с человека сборку выборок руками. «Кто из A ещё не звонили» - это
 * три фильтра и сортировка; голосом это одна фраза между звонками.
 *
 * Всё, что меняет данные, проходит через подтверждение. Модель
 * ошибается редко, но массовая правка шестисот строк по неверно
 * понятой фразе - та ошибка, которую нечем откатить.
 */

const ПОДСКАЗКИ = [
  'Отчёт по сегодняшним лидам',
  'Собери только A, кому ещё не звонили',
  'План на сегодня',
  'Кому пора перезвонить',
  'По каким нишам больше всего лидов',
];

type Строка = { чей: 'я' | 'ии'; текст: string; предложение?: Предложение };

export default function Chat({ onClose, onИзменено }: { onClose: () => void; onИзменено: () => void }) {
  const [строки, setСтроки] = useState<Строка[]>([]);
  const [ввод, setВвод] = useState('');
  const [думает, setДумает] = useState(false);
  const [слушаю, setСлушаю] = useState(false);
  const [вслух, setВслух] = useState(false);
  const [имя, setИмя] = useState(кто());
  const остановить = useRef<() => void>(() => {});
  const низ = useRef<HTMLDivElement>(null);
  const история = useRef<Реплика[]>([]);

  useEffect(() => { низ.current?.scrollIntoView({ behavior: 'smooth' }); }, [строки, думает]);
  useEffect(() => () => { остановить.current(); замолчать(); }, []);

  // Убираем предложение у уже решённой реплики и дописываем итог:
  // одну и ту же правку нельзя применить дважды.
  const закрыть = (с: Строка[], i: number, итог: string): Строка[] =>
    с.map((р, j) => (j === i ? { ...р, предложение: undefined, текст: р.текст + '\n\n' + итог } : р));

  async function отправить(текст: string) {
    const т = текст.trim();
    if (!т || думает) return;
    замолчать();
    setВвод('');
    setСтроки((с) => [...с, { чей: 'я', текст: т }]);
    история.current.push({ role: 'user', content: т });
    setДумает(true);
    try {
      const о = await спросить(история.current);
      история.current.push({ role: 'assistant', content: о.текст });
      setСтроки((с) => [...с, { чей: 'ии', текст: о.текст, предложение: о.предложение }]);
      if (вслух) озвучить(о.текст);
    } catch (e) {
      setСтроки((с) => [...с, { чей: 'ии', текст: e instanceof Error ? e.message : String(e) }]);
    } finally {
      setДумает(false);
    }
  }

  function микрофон() {
    if (слушаю) { остановить.current(); setСлушаю(false); return; }
    замолчать();
    setСлушаю(true);
    остановить.current = слушать(
      (т) => setВвод(т),
      (ошибка) => {
        setСлушаю(false);
        if (ошибка) setСтроки((с) => [...с, { чей: 'ии', текст: ошибка }]);
      },
    );
  }

  async function применить(п: Предложение, индекс: number) {
    setДумает(true);
    try {
      const р = await подтвердить(п);
      setСтроки((с) => закрыть(с, индекс, `Готово: изменено ${р.изменено}.` +
        (р.сбои.length ? ` Не вышло: ${р.сбои.join('; ')}` : '')));
      onИзменено();
    } catch (e) {
      setСтроки((с) => закрыть(с, индекс, 'Не применилось: ' + (e instanceof Error ? e.message : String(e))));
    } finally {
      setДумает(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0d] flex flex-col font-body text-[#f2f0e9] h-[100dvh]">
      <header className="border-b border-white/10 px-4 py-3 flex items-center gap-3 shrink-0"
              style={{ paddingTop: 'calc(0.75rem + env(safe-area-inset-top))' }}>
        <button onClick={onClose} aria-label="Назад"
          className="text-fog text-2xl leading-none w-10 h-10 -ml-2 flex items-center justify-center shrink-0">←</button>
        <div className="flex-1 min-w-0">
          <p className="font-display font-bold">Спросить у базы</p>
          <p className="text-[11px] text-fog">Отвечает по живым данным таблицы</p>
        </div>
        <button onClick={() => { setВслух((v) => { if (v) замолчать(); return !v; })}}
          title="Читать ответы вслух"
          className={`text-xs font-mono uppercase px-3 py-2 rounded-full border transition ${
            вслух ? 'bg-cobalt text-white border-cobalt' : 'border-white/15 text-fog'}`}>
          вслух
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {!строки.length && (
          <div className="pt-6">
            {!имя && (
              <div className="bg-white/[0.05] border border-white/10 rounded-xl p-4 mb-5">
                <p className="text-sm mb-2">Как вас записывать в историю звонков?</p>
                <div className="flex gap-2">
                  <input
                    defaultValue="" placeholder="Имя"
                    onKeyDown={(e) => {
                      if (e.key !== 'Enter') return;
                      const v = (e.target as HTMLInputElement).value.trim();
                      if (v) { запомнитьКто(v); setИмя(v); }
                    }}
                    className="flex-1 bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-[16px] outline-none focus:border-cobalt/60" />
                </div>
                <p className="text-[11px] text-fog mt-2">
                  Нужно, чтобы в карточке было видно, кто уже звонил - вы или партнёр.
                </p>
              </div>
            )}
            <p className="text-xs font-mono uppercase tracking-wider text-fog mb-3">С чего начать</p>
            <div className="space-y-2">
              {ПОДСКАЗКИ.map((п) => (
                <button key={п} onClick={() => отправить(п)}
                  className="w-full text-left bg-white/[0.05] border border-white/10 rounded-xl px-4 py-4 text-sm active:scale-[0.99] transition">
                  {п}
                </button>
              ))}
            </div>
          </div>
        )}

        {строки.map((р, i) => (
          <div key={i} className={р.чей === 'я' ? 'flex justify-end' : ''}>
            <div className={`px-4 py-3 max-w-[85%] ${
              р.чей === 'я'
                ? 'bg-cobalt text-white rounded-2xl rounded-br-md'
                : 'bg-white/[0.06] border border-white/10 rounded-2xl rounded-bl-md'}`}>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{р.текст}</p>

              {р.предложение && (
                <div className="mt-3 pt-3 border-t border-white/15">
                  <p className="text-xs text-fog mb-1">{р.предложение.зачем}</p>
                  <p className="text-sm mb-2">
                    Затронет <b>{р.предложение.строки.length}</b>{' '}
                    {склон(р.предложение.строки.length)}:{' '}
                    {Object.entries(р.предложение.поля).map(([k, v]) => `${k} → ${v}`).join(', ')}
                  </p>
                  <details className="mb-3">
                    <summary className="text-xs text-fog cursor-pointer">Кого именно</summary>
                    <ul className="text-xs text-fog/90 mt-2 space-y-0.5 max-h-40 overflow-y-auto">
                      {р.предложение.лиды.map((л) => (
                        <li key={л.row}>{л.компания} - сейчас «{л.статус}»</li>
                      ))}
                    </ul>
                  </details>
                  <div className="flex gap-2">
                    <button onClick={() => применить(р.предложение!, i)} disabled={думает}
                      className="flex-1 bg-cobalt text-white text-sm font-semibold py-2.5 rounded-lg active:scale-95 transition disabled:opacity-50">
                      Применить
                    </button>
                    <button onClick={() => setСтроки((с) => закрыть(с, i, 'Отменено.'))}
                      className="px-4 text-sm text-fog border border-white/15 rounded-lg">
                      Нет
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {думает && (
          <div className="flex items-center gap-2 text-sm text-fog">
            <span className="w-2 h-2 rounded-full bg-cobalt animate-pulse" />
            Смотрю базу…
          </div>
        )}
        <div ref={низ} />
      </div>

      {/* Поле ввода прижато к низу, с отступом под полосу жестов iPhone.
          Без него кнопка отправки оказывается ровно под полосой, и первое
          касание уходит системе, а не приложению. */}
      <div className="border-t border-white/10 px-3 pt-3 shrink-0"
           style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}>
        <div className="flex gap-2 items-end">
          {микрофонЕсть() && (
            <button onClick={микрофон} disabled={думает}
              title="Сказать голосом"
              className={`w-12 h-12 shrink-0 rounded-xl border flex items-center justify-center transition ${
                слушаю ? 'bg-red-600 border-red-600 animate-pulse' : 'border-white/15 text-fog'}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="2" width="6" height="12" rx="3" />
                <path d="M5 11a7 7 0 0 0 14 0M12 18v4" strokeLinecap="round" />
              </svg>
            </button>
          )}
          <textarea
            value={ввод} onChange={(e) => setВвод(e.target.value)} rows={1}
            placeholder={слушаю ? 'Говорите…' : 'Спросите про лидов'}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); отправить(ввод); }
            }}
            className="flex-1 bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-[16px] outline-none focus:border-cobalt/60 resize-none max-h-32" />
          <button onClick={() => отправить(ввод)} disabled={думает || !ввод.trim()}
            className="w-12 h-12 shrink-0 bg-cobalt text-white rounded-xl active:scale-95 transition disabled:opacity-30">
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}

function склон(n: number) {
  const д = n % 10, с = n % 100;
  if (д === 1 && с !== 11) return 'лида';
  if (д >= 2 && д <= 4 && (с < 12 || с > 14)) return 'лида';
  return 'лидов';
}
