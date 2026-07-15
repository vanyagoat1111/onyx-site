import React, { useState } from 'react';
import { motion } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1] as const;
const CLIP = 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)';
const CLIP_INV = 'polygon(16px 0, 100% 0, 100% 100%, 0 100%, 0 16px)';

function Reveal({ children, className = '', delay = 0, style }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

const gridBg = { backgroundImage: 'linear-gradient(rgba(78,140,255,0.08) 1px,transparent 1px), linear-gradient(90deg,rgba(78,140,255,0.08) 1px,transparent 1px)', backgroundSize: '44px 44px' };

const navLinks = [
  { name: 'Услуги', href: 'services' },
  { name: 'Автопарк', href: 'fleet' },
  { name: 'География', href: 'geography' },
  { name: 'Отрасли', href: 'industries' },
  { name: 'Преимущества', href: 'advantages' },
];

const strategicNumbers = [
  { value: '230+', label: 'Единиц собственного автопарка класса Евро-6' },
  { value: '14', label: 'Собственных складских 3PL-комплексов A-класса' },
  { value: '12 000+', label: 'Выполненных рейсов ежегодно по РФ и миру' },
  { value: '99.8%', label: 'Показатель сохранности груза (SLA)' },
];

const services = [
  { title: 'Генеральные грузы (FTL)', mono: 'FT', desc: 'Выделенный транспорт от 1 до 20 тонн под одну загрузку. Прямая доставка без перегрузок.' },
  { title: 'Сборные грузы (LTL)', mono: 'LT', desc: 'Экономичная логистика с оплатой только за место в кузове. Регулярные отправки с терминалов.' },
  { title: 'Негабаритные проекты', mono: 'НГ', desc: 'Перевозка спецтехники и крупногабаритного оборудования, спецразрешения, тралы до 120т.' },
  { title: 'Рефрижераторные перевозки', mono: 'РФ', desc: 'Строгое поддержание температурного режима от -25°C до +25°C, термописцы и онлайн контроль.' },
  { title: 'Мультимодальные решения', mono: 'ММ', desc: 'Комбинирование авто, ж/д и морского транспорта в едином логистическом окне.' },
  { title: 'Таможенное оформление', mono: 'ТО', desc: 'Услуги таможенного брокера по РФ, прохождение очистки за 24 часа без задержек.' },
];

const fleet = [
  { title: 'Еврофуры тентованные 90-120 м³', spec: 'Грузоподъёмность: 20-22 т / 33 паллеты', count: '135 ед.', pct: 100 },
  { title: 'Рефрижераторы и изотермы', spec: 'Режим: от -25°C до +25°C', count: '45 ед.', pct: 33 },
  { title: 'Низкорамные тралы (Негабарит)', spec: 'Грузоподъёмность: до 120 тонн', count: '15 ед.', pct: 11 },
  { title: 'Малотоннажный транспорт', spec: 'Объём: 15-40 м³, городская доставка', count: '35 ед.', pct: 26 },
];

const process = [
  { step: '01', title: 'Экспертный анализ и расчёт', desc: 'Персональный менеджер подбирает вид транспорта и фиксирует стоимость без скрытых платежей.' },
  { step: '02', title: 'Подача транспорта и приёмка', desc: 'Строгое соблюдение таймингов и контроль схемы грузозацепки и крепления.' },
  { step: '03', title: 'Транзитный мониторинг', desc: 'Круглосуточный диспетчерский контроль 24/7 и ежедневные статусы местоположения.' },
  { step: '04', title: 'Точная сдача груза адресату', desc: 'Своевременная доставка, приёмка по актам, передача закрывающих документов.' },
];

const cities = [
  { name: 'Москва', highlight: false },
  { name: 'Санкт-Петербург', highlight: false },
  { name: 'Екатеринбург', highlight: false },
  { name: 'Новосибирск', highlight: false },
  { name: 'Казань', highlight: false },
  { name: 'Владивосток', highlight: false },
  { name: '+ 12 терминалов', highlight: true },
];

const threePl = [
  { title: 'Ответственное хранение', desc: 'Высотное стеллажное хранение, интеграция WMS с ERP клиента (1С, SAP). Полная материальная ответственность.' },
  { title: 'Кросс-докинг', desc: 'Приёмка и прямая отгрузка без долговременного хранения. Ускорение оборачиваемости.' },
  { title: 'Копакинг и фулфилмент', desc: 'Стикерование, наборы, поштучная комплектация по регламентам сетей и маркетплейсов.' },
].map((t, i) => ({ ...t, num: i + 1 }));

const industries = ['Производство и FMCG', 'Retail и e-commerce', 'Фармацевтика', 'Строительство', 'Автомобильная отрасль', 'Агропромышленный сектор', 'Электроника', 'Химическая промышленность'];

const guarantees = [
  { title: 'Полное страхование груза', desc: 'Каждая перевозка застрахована на полную стоимость груза с ведущими страховыми компаниями.' },
  { title: 'Прозрачный документооборот', desc: 'ТТН, счета-фактуры и акты передаются в электронном виде через личный кабинет клиента.' },
  { title: 'Материальная ответственность', desc: '100% ответственность перевозчика за сохранность груза на всех этапах маршрута.' },
].map((g, i) => ({ ...g, num: i + 1 }));

export default function Logistics() {
  const [submitted, setSubmitted] = useState(false);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="relative min-h-screen bg-[#0A0F26] text-white font-manrope selection:bg-[#4E8CFF]/30 selection:text-white overflow-x-clip">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#0A0F26]/85 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-5 flex justify-between items-center pl-20 md:pl-24">
          <div className="font-sora text-xl font-extrabold tracking-tight">PRIME<span className="text-[#4E8CFF]">LOGISTICS</span></div>
          <nav className="hidden lg:flex gap-7">
            {navLinks.map((l) => (
              <a key={l.href} href={`#${l.href}`} onClick={(e) => scrollTo(e, l.href)} className="text-xs font-bold uppercase tracking-[0.1em] text-[#B4BEDB] hover:text-white transition-colors">{l.name}</a>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <div className="hidden lg:block text-right">
              <div className="text-[10px] text-[#8B95BD]">Бесплатный звонок по РФ</div>
              <div className="text-sm font-bold">8 (800) 500-00-00</div>
            </div>
            <button onClick={(e: any) => scrollTo(e, 'geography')} style={{ clipPath: CLIP }} className="bg-[#2F6FED] text-white px-6.5 py-3.5 text-xs font-bold uppercase tracking-[0.08em] cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-10px_rgba(78,140,255,0.5)]">Расчёт стоимости</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative py-20 px-6 md:px-8 min-h-[88dvh] flex items-center overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 opacity-50" style={gridBg} />
        <div className="absolute top-0 right-0 w-2/3 h-full" style={{ background: 'rgba(47,111,237,0.14)', filter: 'blur(140px)' }} />
        <div className="absolute bottom-0 left-0 w-1/2 h-2/3" style={{ background: 'rgba(34,211,238,0.07)', filter: 'blur(140px)' }} />

        <div className="max-w-[1400px] mx-auto relative z-[2] w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="inline-flex items-center gap-3 bg-[#4E8CFF]/10 border border-[#4E8CFF]/30 px-5 py-2.5 mb-7">
              <span className="w-2 h-2 bg-[#4E8CFF] shrink-0" style={{ boxShadow: '0 0 10px rgba(78,140,255,0.8)' }} />
              <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#7DABFF]">Международная логистика 3PL</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: EASE }} className="font-sora text-[32px] sm:text-[42px] md:text-[62px] leading-[1.08] font-extrabold uppercase mb-6.5">
              Доставка грузов<br />
              <span style={{ background: 'linear-gradient(90deg,#4E8CFF,#22D3EE)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>без задержек и скрытых платежей</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: EASE }} className="text-[#B4BEDB] text-base font-light max-w-[520px] leading-[1.7] mb-9">
              Собственный автопарк из 230 единиц техники, современные кросс-доки полного цикла и 100% материальная ответственность по договору.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: EASE }} className="flex gap-4 flex-wrap">
              <button style={{ clipPath: CLIP }} className="bg-[#2F6FED] border border-[#4E8CFF]/50 text-white px-7.5 py-4.5 text-[13px] font-bold uppercase tracking-[0.08em] cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-10px_rgba(78,140,255,0.5)]">Рассчитать ставку</button>
              <button style={{ clipPath: CLIP }} className="bg-[#131A3D] border border-[#232B54] text-white px-7.5 py-4.5 text-[13px] font-bold uppercase tracking-[0.08em] cursor-pointer">Скачать презентацию</button>
            </motion.div>
          </div>

          <Reveal style={{ clipPath: CLIP_INV }} className="bg-[#131A3D]/85 backdrop-blur-xl border border-[#232B54] p-8">
            <h3 className="font-sora text-xl font-bold uppercase mb-6.5">Экспресс-расчёт</h3>
            <div className="flex flex-col gap-5">
              <div>
                <label className="text-[11px] uppercase font-bold text-[#8B95BD] tracking-[0.08em] block mb-2">Пункт отправления</label>
                <input type="text" placeholder="Укажите город или порт" className="w-full bg-[#0A0F26] border border-[#232B54] px-4 py-3.5 text-white text-sm outline-none placeholder:text-white/30" />
              </div>
              <div>
                <label className="text-[11px] uppercase font-bold text-[#8B95BD] tracking-[0.08em] block mb-2">Пункт назначения</label>
                <input type="text" placeholder="Укажите город или порт" className="w-full bg-[#0A0F26] border border-[#232B54] px-4 py-3.5 text-white text-sm outline-none placeholder:text-white/30" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase font-bold text-[#8B95BD] tracking-[0.08em] block mb-2">Вес (кг)</label>
                  <input type="number" placeholder="0" className="w-full bg-[#0A0F26] border border-[#232B54] px-4 py-3.5 text-white text-sm outline-none placeholder:text-white/30" />
                </div>
                <div>
                  <label className="text-[11px] uppercase font-bold text-[#8B95BD] tracking-[0.08em] block mb-2">Объём (м³)</label>
                  <input type="number" placeholder="0" className="w-full bg-[#0A0F26] border border-[#232B54] px-4 py-3.5 text-white text-sm outline-none placeholder:text-white/30" />
                </div>
              </div>
              <button style={{ clipPath: CLIP }} className="w-full bg-[#2F6FED] border border-[#4E8CFF]/50 text-white py-4 text-[13px] font-bold uppercase tracking-[0.08em] cursor-pointer mt-2 transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-10px_rgba(78,140,255,0.5)]">Узнать стоимость</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STRATEGIC NUMBERS */}
      <section className="py-16 md:py-[90px] px-6 md:px-8 border-b border-white/[0.06]" style={{ background: 'linear-gradient(to bottom,#0B1536,#101B44)' }}>
        <Reveal className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {strategicNumbers.map((s) => (
            <div key={s.label}>
              <div className="font-sora text-3xl md:text-[52px] font-extrabold leading-none mb-3">{s.value}</div>
              <div className="text-sm text-[#8B95BD] font-medium leading-[1.4]">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 md:py-[120px] px-6 md:px-8 bg-[#0B1536] relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 opacity-30" style={gridBg} />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <Reveal className="flex justify-between items-end gap-8 flex-wrap mb-14 md:mb-16">
            <div className="max-w-[640px]">
              <div className="flex items-center gap-3 text-[#4E8CFF] font-bold uppercase tracking-[0.1em] text-[13px] mb-4"><span className="w-7 h-0.5 bg-[#4E8CFF]" />Направления деятельности</div>
              <h2 className="font-sora text-3xl md:text-[44px] font-extrabold uppercase mb-5">Отраслевые решения</h2>
              <p className="text-[#8B95BD] text-base">Предоставляем комплексные услуги по перевозке стандартных, температурных и проектных грузов.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <Reveal key={svc.title} delay={(i % 3) * 0.07} style={{ clipPath: CLIP_INV }} className="bg-[#131A3D] border border-[#232B54] p-8 flex flex-col transition-all duration-400 hover:-translate-y-1.5 hover:border-[#4E8CFF]/50 hover:shadow-[0_26px_54px_-20px_rgba(78,140,255,0.3)] group">
                <div className="w-11 h-11 bg-[#4E8CFF]/[0.12] border border-[#4E8CFF]/30 flex items-center justify-center text-[#4E8CFF] font-bold mb-5.5">{svc.mono}</div>
                <h3 className="font-sora text-xl font-bold uppercase mb-3.5">{svc.title}</h3>
                <p className="text-[#8B95BD] text-[13px] leading-[1.6] mb-6 flex-1">{svc.desc}</p>
                <div className="flex justify-between items-center text-[#4E8CFF] font-bold text-xs uppercase tracking-[0.08em]">
                  <span>Подробнее</span><span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FLEET */}
      <section id="fleet" className="py-20 md:py-[120px] px-6 md:px-8 bg-[#131A3D] border-t border-b border-white/[0.06] scroll-mt-20">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="mb-14">
            <div className="flex items-center gap-3 text-[#4E8CFF] font-bold uppercase tracking-[0.1em] text-[13px] mb-4"><span className="w-7 h-0.5 bg-[#4E8CFF]" />Собственный ресурс</div>
            <h2 className="font-sora text-3xl md:text-[44px] font-extrabold uppercase mb-5">Премиальный <span className="text-[#4E8CFF]">автопарк</span></h2>
            <p className="text-[#B4BEDB] text-[15px] font-light max-w-[680px] leading-[1.7]">В нашем распоряжении 230 современных тягачей Mercedes-Benz Actros, VOLVO FH и Scania R-серии не старше 3х лет. Вся техника проходит регулярное обслуживание на собственных авторизованных СТО.</p>
          </Reveal>

          <Reveal className="flex flex-col gap-5">
            {fleet.map((item) => (
              <div key={item.title} className="grid grid-cols-1 sm:grid-cols-[200px_1fr_80px] items-center gap-4 sm:gap-5">
                <div>
                  <h4 className="font-sora text-sm font-bold uppercase mb-1">{item.title}</h4>
                  <div className="text-[11px] text-[#8B95BD]">{item.spec}</div>
                </div>
                <div className="h-2.5 bg-white/[0.06] relative">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.pct}%` }} viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE }} className="h-full" style={{ background: 'linear-gradient(90deg,#2F6FED,#22D3EE)' }} />
                </div>
                <div className="font-sora text-xl font-extrabold text-right sm:text-right text-[#4E8CFF]">{item.count}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 md:py-[120px] px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="text-center max-w-[700px] mx-auto mb-16 md:mb-[72px]">
            <div className="inline-flex items-center gap-3 text-[#4E8CFF] font-bold uppercase tracking-[0.1em] text-[13px] mb-4"><span className="w-7 h-0.5 bg-[#4E8CFF]" />Этапы работы<span className="w-7 h-0.5 bg-[#4E8CFF]" /></div>
            <h2 className="font-sora text-3xl md:text-[44px] font-extrabold uppercase mb-4.5">Отлаженный механизм</h2>
            <p className="text-[#8B95BD] text-[15px]">Прозрачный логистический процесс стандарта 3PL, исключающий сбои и простои на каждом этапе.</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.07} style={{ clipPath: CLIP }} className="relative p-8.5 bg-[#131A3D] border border-[#232B54] overflow-hidden">
                <div className="font-sora absolute top-4 right-5 text-[56px] font-extrabold text-white/[0.04]">{p.step}</div>
                <div className="font-sora w-13 h-13 bg-[#2F6FED] text-white flex items-center justify-center font-bold text-lg mb-6.5 relative">{p.step}</div>
                <h3 className="font-sora text-lg font-bold uppercase mb-3.5 relative">{p.title}</h3>
                <div className="w-8 h-0.5 bg-[#4E8CFF] mb-4.5" />
                <p className="text-[#8B95BD] text-[13px] leading-[1.6] relative">{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GEOGRAPHY */}
      <section id="geography" className="py-20 md:py-[120px] px-6 md:px-8 bg-[#131A3D] border-t border-white/[0.06] scroll-mt-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          <Reveal>
            <div className="flex items-center gap-3 text-[#4E8CFF] font-bold uppercase tracking-[0.1em] text-[13px] mb-4"><span className="w-7 h-0.5 bg-[#4E8CFF]" />Масштаб</div>
            <h2 className="font-sora text-3xl md:text-[42px] font-extrabold uppercase mb-6 leading-[1.15]">География<br /><span className="text-[#4E8CFF]">маршрутов</span></h2>
            <p className="text-[#B4BEDB] text-[15px] font-light leading-[1.75] mb-8">Мы осуществляем регулярные магистральные отгрузки по всей территории РФ от Калининграда до Владивостока. Выполняем экспортно-импортные рейсы в страны ЕврАзЭС, Азию и ЕС.</p>
            <div className="flex flex-wrap gap-2.5">
              {cities.map((city) => (
                <div key={city.name} style={{ clipPath: CLIP, background: city.highlight ? '#2F6FED' : '#0A0F26', borderColor: city.highlight ? '#2F6FED' : '#232B54' }} className="border text-white px-5.5 py-2.5 font-bold text-[13px] cursor-pointer transition-colors duration-300 hover:bg-[#4E8CFF] hover:border-[#4E8CFF]">{city.name}</div>
              ))}
            </div>
          </Reveal>

          <Reveal style={{ clipPath: CLIP_INV }} className="bg-[#0A0F26] border border-[#232B54] p-9 md:p-11">
            <h3 className="font-sora text-2xl font-extrabold uppercase mb-6.5 pb-5.5 border-b border-[#232B54]">Комплексная 3PL логистика</h3>
            <div className="flex flex-col gap-7">
              {threePl.map((item) => (
                <div key={item.title} className="flex gap-5 items-start">
                  <div className="font-sora w-9.5 h-9.5 border-2 border-[#4E8CFF] bg-[#4E8CFF]/10 text-[#4E8CFF] flex items-center justify-center font-bold shrink-0">{item.num}</div>
                  <div>
                    <h4 className="font-sora text-base font-bold uppercase mb-2">{item.title}</h4>
                    <p className="text-[#8B95BD] text-[13px] leading-[1.6]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="py-20 md:py-[120px] px-6 md:px-8 bg-[#0B1536] scroll-mt-20">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="mb-14">
            <div className="flex items-center gap-3 text-[#4E8CFF] font-bold uppercase tracking-[0.1em] text-[13px] mb-4"><span className="w-7 h-0.5 bg-[#4E8CFF]" />Клиенты</div>
            <h2 className="font-sora text-2xl md:text-[40px] font-extrabold uppercase">Отрасли, с которыми мы работаем</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#232B54]">
            {industries.map((ind, i) => (
              <Reveal key={ind} delay={(i % 4) * 0.05} className="bg-[#131A3D] p-8 min-h-[110px] flex items-center">
                <span className="font-bold uppercase text-[13px] tracking-[0.03em]">{ind}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="py-20 md:py-[120px] px-6 md:px-8 bg-[#131A3D] border-t border-b border-white/[0.06] scroll-mt-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16">
          <Reveal>
            <div className="flex items-center gap-3 text-[#4E8CFF] font-bold uppercase tracking-[0.1em] text-[13px] mb-4"><span className="w-7 h-0.5 bg-[#4E8CFF]" />Гарантии</div>
            <h2 className="font-sora text-2xl md:text-4xl font-extrabold uppercase mb-7">Документы и страхование</h2>
            <div className="flex flex-col">
              {guarantees.map((g) => (
                <div key={g.title} className="flex gap-4.5 items-start pb-6 mb-6 border-b border-[#232B54] last:border-b-0 last:mb-0 last:pb-0">
                  <div className="font-sora w-9.5 h-9.5 border-2 border-[#4E8CFF] bg-[#4E8CFF]/10 text-[#4E8CFF] flex items-center justify-center font-bold shrink-0">{g.num}</div>
                  <div>
                    <h4 className="font-sora text-[15px] font-bold uppercase mb-2">{g.title}</h4>
                    <p className="text-[#8B95BD] text-[13px] leading-[1.6]">{g.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal style={{ clipPath: CLIP_INV }} className="bg-[#0A0F26] border border-[#232B54] p-9 md:p-11 flex flex-col justify-between">
            <div>
              <div className="text-[#4E8CFF] font-bold uppercase tracking-[0.1em] text-xs mb-5.5">Кейс клиента</div>
              <p className="font-sora text-2xl font-bold leading-[1.4] mb-6.5">Сократили логистические издержки федеральной розничной сети на 18% за счёт консолидации грузов на кросс-докинге.</p>
              <p className="text-[#8B95BD] text-sm leading-[1.7]">Перевели 40 региональных маршрутов на единую сборную схему LTL с еженедельной отгрузкой, сохранив срок доставки до магазинов в пределах 48 часов.</p>
            </div>
            <div className="mt-9 pt-6.5 border-t border-[#232B54] flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#4E8CFF]/[0.15] border border-[#4E8CFF]/40 flex items-center justify-center text-[#4E8CFF] font-bold">ЛС</div>
              <div>
                <div className="font-bold text-sm">Логистический директор</div>
                <div className="text-[#8B95BD] text-xs">Федеральная розничная сеть</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section style={{ clipPath: CLIP_INV }} className="py-20 md:py-[120px] px-6 md:px-8 bg-[#2F6FED] relative overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={gridBg} />
        <Reveal className="max-w-[900px] mx-auto relative z-10 text-center">
          <h2 className="font-sora text-3xl md:text-[42px] font-extrabold uppercase mb-6.5">Требуется надёжный логистический партнёр?</h2>
          <p className="text-base sm:text-[17px] text-white/85 max-w-[680px] mx-auto mb-11 leading-[1.6]">Оставьте заявку на бесплатный экспертный аудит транспортных расходов вашей компании — предложим решение с гарантией сокращения костов до 15%.</p>
          <form onSubmit={handleSubmit} className="flex gap-3.5 max-w-[600px] mx-auto flex-wrap">
            <input required type="text" placeholder="Введите ваш номер телефона" style={{ clipPath: CLIP }} className="flex-1 min-w-[200px] px-5.5 py-4.5 border-none text-[15px] font-semibold text-[#0A0F26] outline-none" />
            <button type="submit" style={{ clipPath: CLIP }} className="bg-[#0A0F26] text-white px-8 py-4.5 border border-white/20 font-bold uppercase tracking-[0.08em] text-[13px] cursor-pointer">Заказать аудит</button>
          </form>
          {submitted && <p className="text-[#0A0F26] font-bold text-[13px] mt-4">Заявка отправлена. Свяжемся с вами в ближайшее время.</p>}
          <p className="text-white/65 text-xs mt-4.5">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.</p>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0A0F26] border-t border-[#232B54] pt-16 md:pt-20 pb-10 px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.6fr_1fr_1fr] gap-12 mb-16">
          <div>
            <div className="font-sora text-2xl font-extrabold mb-4.5">PRIME<span className="text-[#4E8CFF]">LOGISTICS</span></div>
            <p className="text-[#8B95BD] text-sm leading-[1.7] mb-6 max-w-[420px]">Премиальные решения в сфере междугородних перевозок и складской B2B логистики. Надёжность подтверждена лидерскими позициями в федеральных рейтингах отрасли с 2012 года.</p>
            <div className="flex gap-3.5">
              {['vk', 'tg', 'yt'].map((s) => (
                <span key={s} className="w-11 h-11 rounded-full border border-[#232B54] flex items-center justify-center text-xs font-bold">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-extrabold uppercase mb-5">Компетенции</h4>
            <div className="flex flex-col gap-3 text-[13px]">
              <a href="#" className="text-[#8B95BD] hover:text-white transition-colors">FTL Магистральные перевозки</a>
              <a href="#" className="text-[#8B95BD] hover:text-white transition-colors">Сборные грузы LTL</a>
              <a href="#" className="text-[#8B95BD] hover:text-white transition-colors">Транспортировка негабарита</a>
              <a href="#" className="text-[#8B95BD] hover:text-white transition-colors">Ответхранение (Склад А-класса)</a>
              <a href="#" className="text-[#8B95BD] hover:text-white transition-colors">Таможенный консалтинг</a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-extrabold uppercase mb-5">Штаб-квартира</h4>
            <div className="flex flex-col gap-4 text-[13px] text-[#8B95BD]">
              <span>123000, г. Москва, ул. Инноваций 10, Башня «Империя»</span>
              <a href="tel:88000000000" className="text-white text-base font-bold">8 (800) 500-00-00</a>
              <a href="mailto:info@prime-logistics.ru" className="text-[#8B95BD]">info@prime-logistics.ru</a>
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto border-t border-[#232B54] pt-7 flex justify-between gap-4 flex-wrap text-xs text-[#8B95BD]">
          <span>© 2026 Prime Logistics. Все права сохранены.</span>
          <div className="flex gap-5">
            <a href="#" className="text-[#8B95BD]">Документация</a>
            <a href="#" className="text-[#8B95BD]">Договор оферты</a>
            <a href="#" className="text-[#8B95BD]">Политика обработки ПД</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
