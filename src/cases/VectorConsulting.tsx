import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/* VECTOR — консалтинг и услуги для бизнеса (финансы, учёт, автоматизация).
   Визуальный язык: деловая записка. Почти белый фон, глубокий графит,
   узкий строгий гротеск и таблицы вместо картинок. Второе светлое демо в наборе. */

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = '', delay = 0, style }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay, ease: EASE }} className={className} style={style}>
      {children}
    </motion.div>
  );
}

const INK = '#14181D';
const BLUE = '#2F5DA8';
const PAPER = '#F4F5F3';

const navLinks = [
  { name: 'Услуги', href: 'services' },
  { name: 'Как работаем', href: 'process' },
  { name: 'Тарифы', href: 'prices' },
  { name: 'Контакты', href: 'contact' },
];

const services = [
  { t: 'Бухгалтерия на аутсорсе', d: 'Полный учёт, зарплата, отчётность и общение с налоговой. Отвечаем за штрафы рублём.', tag: 'от 12 000 ₽ / мес' },
  { t: 'Налоговое планирование', d: 'Считаем варианты режимов и структуры на год вперёд. Показываем, где вы переплачиваете.', tag: 'от 45 000 ₽' },
  { t: 'Управленческий учёт', d: 'Ставим отчётность, по которой видно прибыль по направлениям, а не одну цифру на расчётном счёте.', tag: 'от 90 000 ₽' },
  { t: 'Автоматизация', d: 'Связываем 1С, CRM и банк. Убираем ручной перенос данных между таблицами.', tag: 'от 60 000 ₽' },
  { t: 'Сопровождение проверок', d: 'Готовим документы, отвечаем на требования, представляем интересы в инспекции.', tag: 'от 35 000 ₽' },
  { t: 'Кадровый учёт', d: 'Договоры, приказы, воинский учёт и отчёты. Проверка на риски трудовой инспекции.', tag: 'от 8 000 ₽ / мес' },
];

const facts = [
  { v: '11 лет', l: 'на рынке' },
  { v: '180+', l: 'компаний на обслуживании' },
  { v: '0', l: 'штрафов по нашей вине за 3 года' },
  { v: '2 ч', l: 'среднее время ответа' },
];

const process = [
  { n: '01', t: 'Диагностика', d: 'Смотрим текущий учёт, договоры и отчётность. Две недели, фиксированная стоимость, вычитается из первого счёта.' },
  { n: '02', t: 'Отчёт с рисками', d: 'Список проблем с оценкой в деньгах: что грозит, с какой вероятностью и сколько стоит закрыть.' },
  { n: '03', t: 'План перехода', d: 'Что делаем в первый месяц, что во второй. Кто с вашей стороны участвует и сколько времени это займёт.' },
  { n: '04', t: 'Работа', d: 'Закреплённый бухгалтер и куратор. Раз в месяц — созвон по цифрам, а не только пачка отчётов.' },
];

const plans = [
  { n: 'Микро', p: '12 000', per: '₽ / мес', for: 'ИП и небольшие ООО до 30 операций', items: ['Учёт и первичка', 'Отчётность в срок', 'Зарплата до 3 человек', 'Консультации по почте'], accent: false },
  { n: 'Рабочий', p: '28 000', per: '₽ / мес', for: 'Компании до 200 операций', items: ['Всё из «Микро»', 'Зарплата до 20 человек', 'Кадровый учёт', 'Выделенный бухгалтер', 'Ответ в течение 2 часов'], accent: true },
  { n: 'Полный', p: 'от 65 000', per: '₽ / мес', for: 'Группы компаний и ВЭД', items: ['Всё из «Рабочего»', 'Управленческий учёт', 'Налоговое планирование', 'Сопровождение проверок', 'Куратор-партнёр'], accent: false },
];

const faqs = [
  { q: 'Что если налоговая доначислит по вашей вине?', a: 'Оплачиваем штраф и пени сами. Это прописано в договоре и подкреплено страховкой профессиональной ответственности на 5 млн рублей.' },
  { q: 'Как передать дела от прежнего бухгалтера?', a: 'Берём это на себя. Запрашиваем базу и документы, сверяем остатки, составляем акт расхождений. Обычно занимает две-три недели.' },
  { q: 'Вы работаете только удалённо?', a: 'В основном да, и это позволяет держать цену. Но куратор приезжает в офис на старте и по запросу — например, на встречу с банком или инвестором.' },
  { q: 'Можно ли перейти на другой налоговый режим в середине года?', a: 'На большинство — только с начала следующего. Поэтому расчёт вариантов делаем осенью, чтобы вы успели подать уведомление до конца года.' },
  { q: 'Кто будет вести мою компанию?', a: 'Конкретный человек, вы знаете его имя и телефон. Есть замещающий на время отпуска, он в курсе вашей специфики — передача дел происходит письменно.' },
];

export default function VectorConsulting() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen font-montserrat selection:bg-[#2F5DA8]/25 overflow-x-clip" style={{ background: PAPER, color: INK }}>
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b" style={{ background: 'rgba(244,245,243,0.9)', borderColor: 'rgba(20,24,29,0.1)' }}>
        <div className="max-w-[1240px] mx-auto px-6 md:px-8 py-4 flex justify-between items-center pl-20 md:pl-24">
          <div className="font-bold tracking-[0.2em] text-[16px]">VECTOR</div>
          <nav className="hidden md:flex gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={`#${l.href}`} onClick={(e) => scrollTo(e, l.href)} className="text-[12px] uppercase tracking-[0.13em] transition-colors" style={{ color: 'rgba(20,24,29,0.5)' }}>{l.name}</a>
            ))}
          </nav>
          <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className="hidden sm:inline-block px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white" style={{ background: BLUE }}>Диагностика</a>
        </div>
      </header>

      {/* HERO */}
      <section className="px-6 md:px-8 pt-16 md:pt-24 pb-16">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-[11px] uppercase tracking-[0.28em] mb-8" style={{ color: BLUE }}>Бухгалтерия и финансы для бизнеса</div>
          <h1 className="font-bold leading-[1.06] tracking-[-0.02em] max-w-[20ch]" style={{ fontSize: 'clamp(36px,5.6vw,68px)' }}>
            Учёт, за который<br />отвечают деньгами
          </h1>
          <p className="mt-8 max-w-[54ch] text-[16.5px] leading-[1.75]" style={{ color: 'rgba(20,24,29,0.6)' }}>
            Ведём бухгалтерию, ставим управленческий учёт и закрываем налоговые риски.
            Если штраф пришёл по нашей вине — платим мы, это в договоре.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className="px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.11em] text-white" style={{ background: BLUE }}>Запросить диагностику</a>
            <a href="#prices" onClick={(e) => scrollTo(e, 'prices')} className="px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.11em] border" style={{ borderColor: 'rgba(20,24,29,0.2)' }}>Тарифы</a>
          </div>

          <Reveal className="mt-16 grid grid-cols-2 lg:grid-cols-4 border-t" style={{ borderColor: 'rgba(20,24,29,0.12)' }}>
            {facts.map((f) => (
              <div key={f.l} className="py-7 pr-6 border-b lg:border-b-0 lg:border-r last:border-r-0 lg:pl-7 first:pl-0" style={{ borderColor: 'rgba(20,24,29,0.12)' }}>
                <div className="font-bold text-[30px] md:text-[36px] leading-none">{f.v}</div>
                <div className="text-[12px] uppercase tracking-[0.1em] mt-2.5" style={{ color: 'rgba(20,24,29,0.45)' }}>{f.l}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-6 md:px-8 py-20 md:py-28 scroll-mt-20" style={{ background: '#EDEEEB' }}>
        <div className="max-w-[1240px] mx-auto">
          <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <h2 className="font-bold text-3xl md:text-[40px] tracking-tight">Услуги</h2>
            <p className="max-w-[38ch] text-sm" style={{ color: 'rgba(20,24,29,0.55)' }}>Можно взять одну или собрать пакет — стоимость пересчитаем в меньшую сторону.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(20,24,29,0.12)' }}>
            {services.map((s, i) => (
              <Reveal key={s.t} delay={(i % 3) * 0.05} className="p-8" style={{ background: '#EDEEEB' }}>
                <h3 className="font-bold text-[17px] mb-3">{s.t}</h3>
                <p className="text-[13.5px] leading-[1.75] mb-5" style={{ color: 'rgba(20,24,29,0.58)' }}>{s.d}</p>
                <div className="text-[12px] font-semibold uppercase tracking-[0.08em]" style={{ color: BLUE }}>{s.tag}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="px-6 md:px-8 py-20 md:py-28 scroll-mt-20">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-14">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.24em] mb-4" style={{ color: BLUE }}>Порядок работы</div>
            <h2 className="font-bold text-3xl md:text-[40px] tracking-tight leading-[1.1] mb-6">Сначала диагностика, потом договор</h2>
            <p className="text-[15px] leading-[1.8]" style={{ color: 'rgba(20,24,29,0.6)' }}>
              Мы не подписываем годовой контракт вслепую. Две недели смотрим ваш учёт
              и показываем, что там на самом деле. Дальше решаете вы.
            </p>
          </Reveal>
          <div className="flex flex-col">
            {process.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.06} className="grid grid-cols-[auto_1fr] gap-6 py-7 border-b" style={{ borderColor: 'rgba(20,24,29,0.12)' }}>
                <div className="font-bold text-[13px] pt-1" style={{ color: BLUE }}>{p.n}</div>
                <div>
                  <h3 className="font-bold text-[16px] mb-2.5">{p.t}</h3>
                  <p className="text-[13.5px] leading-[1.75]" style={{ color: 'rgba(20,24,29,0.58)' }}>{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="px-6 md:px-8 py-20 md:py-28 scroll-mt-20" style={{ background: '#EDEEEB' }}>
        <div className="max-w-[1240px] mx-auto">
          <Reveal className="mb-12"><h2 className="font-bold text-3xl md:text-[40px] tracking-tight">Тарифы обслуживания</h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.07}>
                <div className="h-full flex flex-col p-8 border" style={{ borderColor: p.accent ? BLUE : 'rgba(20,24,29,0.14)', background: p.accent ? '#fff' : 'transparent' }}>
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <h3 className="font-bold text-[19px]">{p.n}</h3>
                    {p.accent && <span className="text-[9px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 text-white" style={{ background: BLUE }}>чаще берут</span>}
                  </div>
                  <div className="text-[12px] mb-6" style={{ color: 'rgba(20,24,29,0.45)' }}>{p.for}</div>
                  <div className="flex items-end gap-1.5 mb-7 pb-7 border-b" style={{ borderColor: 'rgba(20,24,29,0.12)' }}>
                    <span className="font-bold text-[30px]">{p.p}</span>
                    <span className="text-[13px] mb-1" style={{ color: 'rgba(20,24,29,0.45)' }}>{p.per}</span>
                  </div>
                  <ul className="flex flex-col gap-3 flex-1">
                    {p.items.map((x) => (
                      <li key={x} className="flex gap-3 text-[13.5px]" style={{ color: 'rgba(20,24,29,0.65)' }}>
                        <span className="mt-[7px] w-1.5 h-1.5 shrink-0" style={{ background: BLUE }} />{x}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-8 py-20 md:py-28">
        <div className="max-w-[860px] mx-auto">
          <Reveal className="mb-12"><h2 className="font-bold text-3xl md:text-[40px] tracking-tight">Что спрашивают собственники</h2></Reveal>
          <div className="flex flex-col">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} delay={i * 0.04} className="border-b" style={{ borderColor: 'rgba(20,24,29,0.14)' }}>
                  <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex justify-between items-center gap-6 py-6 text-left">
                    <span className="font-semibold text-[15px] md:text-[16.5px]">{f.q}</span>
                    <span className="text-[22px] shrink-0" style={{ color: BLUE }}>{open ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden">
                        <p className="text-[14px] leading-[1.8] pb-7 max-w-[66ch]" style={{ color: 'rgba(20,24,29,0.6)' }}>{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 md:px-8 py-20 md:py-28 scroll-mt-20" style={{ background: INK }}>
        <Reveal className="max-w-[800px] mx-auto text-center text-white">
          <h2 className="font-bold tracking-tight leading-[1.1] mb-5" style={{ fontSize: 'clamp(28px,4.2vw,46px)' }}>
            Начните с диагностики
          </h2>
          <p className="text-[15px] mb-10 max-w-[52ch] mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Две недели, фиксированная стоимость, отчёт с рисками в деньгах.
            Если решите работать с нами — вычтем её из первого счёта.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 5000); }} className="flex gap-3 max-w-[520px] mx-auto flex-wrap">
            <input required type="tel" placeholder="+7 (___) ___-__-__" className="flex-1 min-w-[220px] bg-transparent border px-5 py-4 text-[14px] text-white outline-none transition-colors placeholder:text-white/30" style={{ borderColor: 'rgba(255,255,255,0.25)' }} />
            <button type="submit" className="px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.11em] text-white" style={{ background: BLUE }}>Запросить</button>
          </form>
          {sent && <p className="mt-4 text-[13px]" style={{ color: '#8FB4EE' }}>Заявка принята. Партнёр свяжется с вами в течение рабочего дня.</p>}
        </Reveal>
      </section>

      <footer className="px-6 md:px-8 pt-16 pb-10 border-t" style={{ borderColor: 'rgba(20,24,29,0.12)' }}>
        <div className="max-w-[1240px] mx-auto flex flex-wrap justify-between gap-10 mb-12">
          <div className="max-w-[300px]">
            <div className="font-bold tracking-[0.2em] text-[16px] mb-4">VECTOR</div>
            <p className="text-[13px] leading-[1.75]" style={{ color: 'rgba(20,24,29,0.55)' }}>
              Бухгалтерское и финансовое сопровождение бизнеса. Страхование профессиональной ответственности на 5 млн ₽.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.16em] mb-4" style={{ color: 'rgba(20,24,29,0.4)' }}>Компания</h4>
            <div className="flex flex-col gap-3 text-[13px]" style={{ color: 'rgba(20,24,29,0.62)' }}>
              <a href="#services" onClick={(e) => scrollTo(e, 'services')}>Услуги</a>
              <a href="#process" onClick={(e) => scrollTo(e, 'process')}>Как работаем</a>
              <a href="#prices" onClick={(e) => scrollTo(e, 'prices')}>Тарифы</a>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.16em] mb-4" style={{ color: 'rgba(20,24,29,0.4)' }}>Контакты</h4>
            <div className="flex flex-col gap-3 text-[13px]" style={{ color: 'rgba(20,24,29,0.62)' }}>
              <span className="text-[17px]" style={{ color: INK }}>+7 (495) 000-00-00</span>
              <span>office@vector.example</span>
              <span>г. Москва, ул. Деловая, 3, офис 210<br />Пн–Пт 9:00–19:00</span>
            </div>
          </div>
        </div>
        <div className="max-w-[1240px] mx-auto border-t pt-7 flex flex-wrap justify-between gap-4 text-[11px]" style={{ borderColor: 'rgba(20,24,29,0.12)', color: 'rgba(20,24,29,0.4)' }}>
          <span>© 2026 Vector. Демонстрационный шаблон.</span>
          <div className="flex gap-5"><span>Политика конфиденциальности</span><span>Реквизиты</span></div>
        </div>
      </footer>
    </div>
  );
}
