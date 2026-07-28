import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ColumnChart, DonutStat } from '../components/DemoCharts';

/* METHOD — образовательный центр (языки и подготовка к экзаменам).
   Визуальный язык: учебная тетрадь. Чернильно-синий фон, жёлтый маркер,
   геометрический гротеск и сетка в клетку. */

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = '', delay = 0, style }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay, ease: EASE }} className={className} style={style}>
      {children}
    </motion.div>
  );
}

const MARK = '#F2C14E';
const BG = '#141A2E';

const navLinks = [
  { name: 'Программы', href: 'programs' },
  { name: 'Результаты', href: 'results' },
  { name: 'Цены', href: 'prices' },
  { name: 'Пробный урок', href: 'trial' },
];

const programs = [
  { t: 'Английский с нуля', lvl: 'A0 → A2', len: '9 месяцев', grp: 'до 8 человек', d: 'Говорите простыми фразами с четвёртого занятия. Грамматику даём порциями, под задачу.' },
  { t: 'Разговорный клуб', lvl: 'B1 → C1', len: 'бессрочно', grp: 'до 6 человек', d: 'Два часа в неделю только речь. Носитель языка раз в месяц, темы выбирают участники.' },
  { t: 'Подготовка к ЕГЭ', lvl: '10–11 класс', len: '8 месяцев', grp: 'до 10 человек', d: 'Разбор всех типов заданий, четыре пробника по официальным критериям, работа над ошибками.' },
  { t: 'IELTS / TOEFL', lvl: 'B2 → C1', len: '4 месяца', grp: 'до 6 человек', d: 'Стратегии по каждой секции, эссе с разбором, симуляция экзамена с таймером.' },
  { t: 'Английский для работы', lvl: 'B1 → B2', len: '6 месяцев', grp: 'до 8 человек', d: 'Переписка, созвоны, презентации и small talk. Лексика под вашу отрасль.' },
  { t: 'Детская группа', lvl: '7–11 лет', len: 'учебный год', grp: 'до 8 человек', d: 'Игры, песни и движение. Без домашних заданий на выходные и без оценок.' },
];

const results = [
  { v: '78', l: 'средний балл ЕГЭ у выпускников', note: 'при среднем по региону 62' },
  { v: '7.5', l: 'средний балл IELTS', note: 'из 34 сдававших в прошлом году' },
  { v: '91%', l: 'доходят до конца курса', note: 'по группам набора 2025' },
  { v: '4.9', l: 'оценка преподавателей', note: 'внутренний опрос, 260 ответов' },
];

const how = [
  { n: '1', t: 'Тест и разговор', d: 'Двадцать минут: письменный тест и короткая беседа. Определяем уровень честно, а не «поставим в среднюю группу».' },
  { n: '2', t: 'Пробное занятие', d: 'Приходите в живую группу своего уровня. Бесплатно, ни к чему не обязывает.' },
  { n: '3', t: 'План на курс', d: 'Показываем, что будет на каждом месяце и какого результата ждать к концу.' },
  { n: '4', t: 'Отчёты каждый месяц', d: 'Родителям и взрослым студентам — что получается, что западает, что делать дома.' },
];

const teachers = [
  { n: 'Ирина Полева', r: 'Методист, ЕГЭ', exp: '12 лет', note: 'Эксперт региональной комиссии по проверке' },
  { n: 'Марк Дэвис', r: 'Носитель языка', exp: '8 лет', note: 'CELTA, разговорные клубы и IELTS Speaking' },
  { n: 'Анна Гринь', r: 'Детские группы', exp: '10 лет', note: 'Игровые методики, психолог по образованию' },
];

const faqs = [
  { q: 'Что если уровень не подойдёт?', a: 'Переведём в другую группу без доплат в первые три недели. Это нормальная ситуация: тест показывает знания, а занятия — темп, и они не всегда совпадают.' },
  { q: 'Можно заниматься онлайн?', a: 'Да, все групповые программы идут в двух форматах. Онлайн-группы отдельные, а не подключение к очному классу через камеру — это принципиально разные вещи по качеству.' },
  { q: 'Что с пропусками?', a: 'Запись занятия и материалы приходят в тот же день. Больше двух пропусков подряд — преподаватель созвонится и разберёт тему индивидуально, бесплатно.' },
  { q: 'Есть ли рассрочка?', a: 'Да, помесячная оплата без процентов и переплат. Можно оплатить курс целиком со скидкой 10%.' },
  { q: 'Возвращаете деньги?', a: 'Да, за неиспользованные занятия в любой момент. Удерживаем только стоимость проведённых уроков по цене разового посещения.' },
];

const courseModules = [
  { m: 'Месяц 1', t: 'Звуки и первые фразы', d: 'Фонетика, приветствия, рассказ о себе. К четвёртому занятию говорите простыми предложениями.', hours: '16 ч' },
  { m: 'Месяц 2', t: 'Настоящее время', d: 'Present Simple и Continuous на бытовых ситуациях: распорядок дня, семья, работа.', hours: '16 ч' },
  { m: 'Месяц 3', t: 'Прошедшее время', d: 'Рассказ о событиях: выходные, поездки, детство. Неправильные глаголы порциями.', hours: '16 ч' },
  { m: 'Месяц 4', t: 'Планы и будущее', d: 'Договориться о встрече, забронировать, отменить. Много ролевых диалогов.', hours: '16 ч' },
  { m: 'Месяц 5', t: 'Аудирование', d: 'Понимание речи на слух: объявления, короткие интервью, песни, сериалы с субтитрами.', hours: '16 ч' },
  { m: 'Месяц 6', t: 'Промежуточный экзамен', d: 'Тест по всем навыкам и разбор ошибок. Решаем, идти дальше или закрепить уровень.', hours: '8 ч' },
  { m: 'Месяц 7–8', t: 'Расширение словаря', d: 'Темы под ваши задачи: работа, путешествия, учёба. Словарь набирается из живой речи.', hours: '32 ч' },
  { m: 'Месяц 9', t: 'Свободная речь', d: 'Только разговор: споры, презентации, истории. Грамматику подтягиваем точечно.', hours: '16 ч' },
];

const weekGrid = [
  { day: 'ПН', slots: ['18:30 · A0 Начальный', '20:00 · B1 Разговорный'] },
  { day: 'ВТ', slots: ['17:00 · Дети 7–9', '19:00 · ЕГЭ'] },
  { day: 'СР', slots: ['18:30 · A0 Начальный', '20:00 · IELTS'] },
  { day: 'ЧТ', slots: ['17:00 · Дети 10–11', '19:00 · ЕГЭ'] },
  { day: 'ПТ', slots: ['19:00 · Клуб с носителем'] },
  { day: 'СБ', slots: ['11:00 · A0 Начальный', '13:00 · B2 Работа'] },
];

export default function MethodSchool() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [page, setPage] = useState(() =>
    typeof window !== 'undefined' && window.location.hash.includes('/program') ? 'program' : 'home');

  useEffect(() => {
    const sync = () => setPage(window.location.hash.includes('/program') ? 'program' : 'home');
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const go = (e: React.MouseEvent, to: string) => {
    e.preventDefault();
    window.location.hash = to;
    window.scrollTo(0, 0);
  };

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (page !== 'home') { window.location.hash = '#case/education'; setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen font-outfit selection:bg-[#F2C14E]/35 overflow-x-clip" style={{ background: BG, color: '#EAEEF7' }}>
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10" style={{ background: 'rgba(20,26,46,0.9)' }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-4 flex justify-between items-center pl-20 md:pl-24">
          <div className="font-bold tracking-[0.2em] text-[17px]">METHOD<span style={{ color: MARK }}>.</span></div>
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((l) => (
              <a key={l.href} href={`#${l.href}`} onClick={(e) => scrollTo(e, l.href)} className="text-[12px] uppercase tracking-[0.14em] text-white/45 hover:text-white transition-colors">{l.name}</a>
            ))}
            <a href="#case/education/program" onClick={(e) => go(e, '#case/education/program')}
               className="text-[12px] uppercase tracking-[0.14em] transition-colors"
               style={{ color: page === 'program' ? MARK : 'rgba(255,255,255,0.45)' }}>Программа курса</a>
          </nav>
          <a href="#trial" onClick={(e) => scrollTo(e, 'trial')} className="hidden sm:inline-block px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] rounded-lg" style={{ background: MARK, color: BG }}>Пробный урок</a>
        </div>
      </header>

      {page === 'program' ? (
        <>
          {/* ── ВТОРАЯ СТРАНИЦА: программа курса ── */}
          <section className="px-6 md:px-8 pt-14 md:pt-20 pb-12 border-b border-white/10">
            <div className="max-w-[1000px] mx-auto">
              <a href="#case/education" onClick={(e) => go(e, '#case/education')}
                 className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-white/40 hover:text-white transition-colors mb-9">
                ← На главную
              </a>
              <div className="text-[11px] uppercase tracking-[0.3em] mb-6" style={{ color: MARK }}>Английский с нуля · A0 → A2</div>
              <h1 className="font-bold leading-[1.06] tracking-[-0.02em] max-w-[18ch]" style={{ fontSize: 'clamp(34px,5.4vw,64px)' }}>
                Девять месяцев<br />по неделям
              </h1>
              <p className="mt-7 max-w-[54ch] text-white/50 text-[16.5px] leading-[1.75]">
                Полная программа курса: что проходим каждый месяц, сколько это часов
                и какого результата ждать. Ничего не скрываем — можете сравнить с другими школами.
              </p>
              <div className="mt-10 flex flex-wrap gap-8">
                {[['136 ч', 'аудиторных часов'], ['2 раза', 'в неделю по 80 минут'], ['до 8', 'человек в группе'], ['5 200 ₽', 'в месяц']].map(([v, l]) => (
                  <div key={l}>
                    <div className="font-bold text-[26px] leading-none" style={{ color: MARK }}>{v}</div>
                    <div className="text-[12px] text-white/40 mt-2">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-8 py-16 md:py-20">
            <div className="max-w-[1000px] mx-auto">
              <Reveal className="mb-10"><h2 className="font-bold text-2xl md:text-[32px] tracking-tight">Помесячный план</h2></Reveal>
              <div className="flex flex-col">
                {courseModules.map((m, i) => (
                  <Reveal key={m.m} delay={i * 0.03}
                          className="grid grid-cols-[80px_1fr_auto] gap-5 md:gap-8 items-start py-6 border-b border-white/10">
                    <div className="text-[12px] uppercase tracking-[0.1em] pt-1" style={{ color: MARK }}>{m.m}</div>
                    <div>
                      <h3 className="font-bold text-[16.5px] mb-2">{m.t}</h3>
                      <p className="text-[13.5px] text-white/45 leading-[1.7]">{m.d}</p>
                    </div>
                    <div className="text-[12px] text-white/30 pt-1 whitespace-nowrap">{m.hours}</div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-8 py-16 md:py-20 border-y border-white/10" style={{ background: '#18203A' }}>
            <div className="max-w-[1000px] mx-auto">
              <Reveal className="mb-10">
                <h2 className="font-bold text-2xl md:text-[32px] tracking-tight mb-3">Расписание на неделю</h2>
                <p className="text-white/45 text-[14.5px]">Актуально на текущий набор. Онлайн-группы идут в те же слоты.</p>
              </Reveal>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px" style={{ background: 'rgba(255,255,255,0.1)' }}>
                {weekGrid.map((d) => (
                  <div key={d.day} className="p-5 min-h-[150px]" style={{ background: '#18203A' }}>
                    <div className="text-[11px] uppercase tracking-[0.16em] mb-4" style={{ color: MARK }}>{d.day}</div>
                    <div className="flex flex-col gap-3">
                      {d.slots.map((sl) => (
                        <div key={sl} className="text-[12.5px] text-white/55 leading-[1.5]">{sl}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-8 py-16 md:py-24">
            <Reveal className="max-w-[720px] mx-auto text-center">
              <h2 className="font-bold tracking-tight leading-[1.1] mb-5" style={{ fontSize: 'clamp(26px,4vw,42px)' }}>
                Записаться в эту группу
              </h2>
              <p className="text-white/45 text-[15px] mb-9">Ближайший набор стартует через две недели. Осталось три места.</p>
              <a href="#case/education" onClick={(e) => { go(e, '#case/education'); setTimeout(() => document.getElementById('trial')?.scrollIntoView({ behavior: 'smooth' }), 80); }}
                 className="inline-block px-8 py-4 rounded-lg text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ background: MARK, color: BG }}>
                Пробный урок
              </a>
            </Reveal>
          </section>
        </>
      ) : (
      <>
      {/* HERO */}
      <section className="relative px-6 md:px-8 pt-16 md:pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(234,238,247,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(234,238,247,.8) 1px,transparent 1px)', backgroundSize: '26px 26px' }} />
        <div className="max-w-[1280px] mx-auto relative">
          <div className="text-[11px] uppercase tracking-[0.3em] mb-8" style={{ color: MARK }}>Языковой центр · Новосибирск</div>
          <h1 className="font-bold leading-[1.02] tracking-[-0.02em] max-w-[17ch]" style={{ fontSize: 'clamp(40px,6.6vw,82px)' }}>
            Учим так, чтобы вы{' '}
            <span className="relative inline-block">
              <span className="relative z-10">заговорили</span>
              <span className="absolute left-0 right-0 bottom-[0.12em] h-[0.34em] -z-0" style={{ background: MARK, opacity: 0.35 }} />
            </span>
          </h1>
          <p className="mt-8 max-w-[52ch] text-white/50 text-[17px] leading-[1.75]">
            Маленькие группы, честный входной тест и отчёт каждый месяц.
            Если через три недели видим, что уровень не тот — переводим бесплатно.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#trial" onClick={(e) => scrollTo(e, 'trial')} className="px-8 py-4 rounded-lg text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ background: MARK, color: BG }}>Бесплатный пробный урок</a>
            <a href="#programs" onClick={(e) => scrollTo(e, 'programs')} className="px-8 py-4 rounded-lg text-[13px] font-semibold uppercase tracking-[0.1em] border border-white/20 hover:border-white/45 transition-colors">Программы</a>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section id="results" className="px-6 md:px-8 py-16 md:py-20 border-y border-white/10 scroll-mt-20" style={{ background: '#18203A' }}>
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {results.map((r, i) => (
            <Reveal key={r.l} delay={i * 0.06}>
              <div className="font-bold text-[42px] leading-none mb-3" style={{ color: MARK }}>{r.v}</div>
              <div className="text-[14px] mb-1.5">{r.l}</div>
              <div className="text-[12px] text-white/35">{r.note}</div>
            </Reveal>
          ))}
        </div>

        <div className="max-w-[1280px] mx-auto mt-16 pt-14 border-t border-white/10 grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-14 items-center">
          <div>
            <Reveal className="mb-8">
              <h3 className="font-bold text-[26px] md:text-[32px] tracking-[-0.02em] mb-3">Средний балл ЕГЭ у наших выпускников</h3>
              <p className="text-white/45 text-[14px] leading-[1.75] max-w-[52ch]">
                Тёмные столбцы — средний балл по региону, жёлтые — наши группы.
                Считаем по всем, кто дошёл до экзамена, а не по лучшим.
              </p>
            </Reveal>
            <Reveal className="overflow-x-auto pb-2">
              <ColumnChart tone={MARK} height={200} className="min-w-[440px]"
                items={[
                  { label: '2021', value: 61 }, { label: 'наши', value: 69, hi: true },
                  { label: '2022', value: 60 }, { label: 'наши', value: 72, hi: true },
                  { label: '2023', value: 63 }, { label: 'наши', value: 74, hi: true },
                  { label: '2024', value: 62 }, { label: 'наши', value: 76, hi: true },
                  { label: '2025', value: 62 }, { label: 'наши', value: 78, hi: true },
                ]} />
            </Reveal>
          </div>
          <Reveal className="flex flex-col sm:flex-row lg:flex-col gap-10 justify-center">
            <DonutStat tone={MARK} value={91} size={150}
              label="Доходят до конца курса" sub="По группам набора 2025 года." />
            <DonutStat tone={MARK} value={68} size={150}
              label="Продолжают на следующий уровень" sub="Записываются в новую группу сразу после выпуска." />
          </Reveal>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="px-6 md:px-8 py-20 md:py-28 scroll-mt-20">
        <div className="max-w-[1280px] mx-auto">
          <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <h2 className="font-bold text-3xl md:text-[42px] tracking-tight">Программы</h2>
            <p className="max-w-[38ch] text-sm text-white/45">Каждая группа набирается под уровень, а не под расписание преподавателя.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {programs.map((p, i) => (
              <Reveal key={p.t} delay={(i % 3) * 0.06}>
                <div className="h-full flex flex-col rounded-xl border border-white/10 p-7 hover:border-[#F2C14E]/50 transition-colors duration-400" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ background: 'rgba(242,193,78,0.15)', color: MARK }}>{p.lvl}</span>
                  </div>
                  <h3 className="font-bold text-[19px] mb-3">{p.t}</h3>
                  <p className="text-[13.5px] text-white/45 leading-[1.7] mb-6 flex-1">{p.d}</p>
                  <div className="flex gap-5 text-[12px] text-white/35 pt-5 border-t border-white/10 items-center">
                    <span>{p.len}</span><span>{p.grp}</span>
                    {i === 0 && (
                      <a href="#case/education/program" onClick={(e) => go(e, '#case/education/program')}
                         className="ml-auto text-[12px] font-semibold" style={{ color: MARK }}>Программа →</a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="prices" className="px-6 md:px-8 py-20 md:py-28 border-y border-white/10 scroll-mt-20" style={{ background: '#18203A' }}>
        <div className="max-w-[1280px] mx-auto">
          <Reveal className="mb-14 max-w-[44ch]">
            <div className="text-[11px] uppercase tracking-[0.26em] mb-4" style={{ color: MARK }}>Как начинается учёба</div>
            <h2 className="font-bold text-3xl md:text-[42px] tracking-tight leading-[1.1]">Четыре шага до первого занятия</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {how.map((h, i) => (
              <Reveal key={h.n} delay={i * 0.07}>
                <div className="w-11 h-11 rounded-lg flex items-center justify-center font-bold text-[18px] mb-5" style={{ background: MARK, color: BG }}>{h.n}</div>
                <h3 className="font-bold text-[16px] mb-3">{h.t}</h3>
                <p className="text-[13.5px] text-white/45 leading-[1.75]">{h.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEACHERS */}
      <section className="px-6 md:px-8 py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto">
          <Reveal className="mb-12"><h2 className="font-bold text-3xl md:text-[42px] tracking-tight">Преподаватели</h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teachers.map((t, i) => (
              <Reveal key={t.n} delay={i * 0.08}>
                <div className="rounded-xl border border-white/10 p-7" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="w-14 h-14 rounded-full mb-5 flex items-center justify-center font-bold text-[17px]" style={{ background: 'rgba(242,193,78,0.16)', color: MARK }}>
                    {t.n.split(' ').map((x) => x[0]).join('')}
                  </div>
                  <h3 className="font-bold text-[17px] mb-1.5">{t.n}</h3>
                  <div className="text-[12px] mb-4" style={{ color: MARK }}>{t.r} · {t.exp}</div>
                  <p className="text-[13.5px] text-white/45 leading-[1.7]">{t.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-8 py-20 md:py-28 border-t border-white/10" style={{ background: '#18203A' }}>
        <div className="max-w-[860px] mx-auto">
          <Reveal className="mb-12"><h2 className="font-bold text-3xl md:text-[42px] tracking-tight">Вопросы родителей и студентов</h2></Reveal>
          <div className="flex flex-col gap-3">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} delay={i * 0.04} className="rounded-xl border px-6" style={{ borderColor: open ? 'rgba(242,193,78,0.45)' : 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                  <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex justify-between items-center gap-6 py-5 text-left">
                    <span className="font-semibold text-[15px] md:text-[16px]">{f.q}</span>
                    <span className="text-[22px] shrink-0" style={{ color: MARK }}>{open ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden">
                        <p className="text-[14px] text-white/45 leading-[1.8] pb-6 max-w-[64ch]">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRIAL */}
      <section id="trial" className="px-6 md:px-8 py-20 md:py-28 scroll-mt-20">
        <Reveal className="max-w-[780px] mx-auto text-center">
          <h2 className="font-bold tracking-tight leading-[1.08] mb-5" style={{ fontSize: 'clamp(30px,4.6vw,50px)' }}>
            Приходите на пробное — оно бесплатное
          </h2>
          <p className="text-white/45 text-[15px] mb-10 max-w-[50ch] mx-auto">
            Определим уровень, посадим в подходящую группу и дадим отзаниматься целый урок.
            Понравится — продолжите, нет — разойдёмся без обид.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 5000); }} className="flex gap-3 max-w-[520px] mx-auto flex-wrap">
            <input required type="tel" placeholder="+7 (___) ___-__-__" className="flex-1 min-w-[220px] bg-transparent border border-white/20 rounded-lg px-5 py-4 text-[14px] outline-none focus:border-[#F2C14E] transition-colors placeholder:text-white/25" />
            <button type="submit" className="px-8 py-4 rounded-lg text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ background: MARK, color: BG }}>Записаться</button>
          </form>
          {sent && <p className="mt-4 text-[13px]" style={{ color: MARK }}>Записали! Администратор перезвонит и предложит время.</p>}
        </Reveal>
      </section>

      </>
      )}

      <footer className="px-6 md:px-8 pt-16 pb-10 border-t border-white/10" style={{ background: '#101527' }}>
        <div className="max-w-[1280px] mx-auto flex flex-wrap justify-between gap-10 mb-12">
          <div className="max-w-[300px]">
            <div className="font-bold tracking-[0.2em] text-[17px] mb-4">METHOD<span style={{ color: MARK }}>.</span></div>
            <p className="text-[13px] text-white/40 leading-[1.75]">Языковой центр: английский, подготовка к ЕГЭ и международным экзаменам. Очно и онлайн.</p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.18em] text-white/30 mb-4">Центр</h4>
            <div className="flex flex-col gap-3 text-[13px] text-white/50">
              <a href="#programs" onClick={(e) => scrollTo(e, 'programs')}>Программы</a>
              <a href="#results" onClick={(e) => scrollTo(e, 'results')}>Результаты</a>
              <a href="#trial" onClick={(e) => scrollTo(e, 'trial')}>Пробный урок</a>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.18em] text-white/30 mb-4">Контакты</h4>
            <div className="flex flex-col gap-3 text-[13px] text-white/50">
              <span className="text-[17px] text-white">+7 (383) 000-00-00</span>
              <span>study@method.example</span>
              <span className="text-white/35">г. Новосибирск, Красный пр-т, 40<br />Пн–Сб 9:00–21:00</span>
            </div>
          </div>
        </div>
        <div className="max-w-[1280px] mx-auto border-t border-white/10 pt-7 flex flex-wrap justify-between gap-4 text-[11px] text-white/25">
          <span>© 2026 Method. Демонстрационный шаблон.</span>
          <div className="flex gap-5"><span>Политика конфиденциальности</span><span>Лицензия на образовательную деятельность</span></div>
        </div>
      </footer>
    </div>
  );
}
