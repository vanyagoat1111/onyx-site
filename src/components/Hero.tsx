import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LayoutGrid } from 'lucide-react';
import { Button } from './ui';
import { BOT_AUDIT_LINK } from '../lib/leads';
import LeadFormModal from './LeadFormModal';

const ease = [0.22, 1, 0.36, 1] as const;

/* Шаг сборки первого экрана.

   Вступление (IntroAssembly) пишет прогресс в CSS-переменные на :root,
   а здесь элементы их читают. Значение по умолчанию - единица, поэтому
   без вступления, при отключённых анимациях и при упавшем скрипте
   экран просто готов: элемент не может остаться невидимым из-за того,
   что переменная не пришла.

   Это отдельная обёртка, а не стиль на самом элементе, и вот почему:
   у элементов первого экрана уже есть своя анимация входа через motion,
   а она пишет opacity и transform прямо в инлайн-стиль и перебила бы
   переменную. Две вложенные прозрачности перемножаются, поэтому обе
   анимации живут мирно: motion отыгрывает за первые доли секунды, пока
   переменная ещё держит элемент скрытым, а дальше всё решает прокрутка. */
const Step = ({
  v, y = 14, className = '', children,
}: { v: string; y?: number; className?: string; children: React.ReactNode }) => (
  <div
    className={className}
    style={{
      opacity: `var(${v}, 1)`,
      transform: `translateY(calc((1 - var(${v}, 1)) * ${y}px))`,
    }}
  >
    {children}
  </div>
);

export default function Hero() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    /* `overflow-hidden` стоит НЕ здесь, а на обёртке ниже. Это не мелочь:
       обёртка центруется по вертикали сдвигом вниз, её высота в раскладке
       при этом не меняется, - и клип на секции срезал бы всё, что вышло
       за её нижнюю границу. На широком экране это ровно половина кнопок.
       Клип нужен только чтобы засветы фона не вылезали за пределы экрана
       и не давали горизонтальной прокрутки, а они лежат внутри обёртки. */
    <section id="home" className="relative flex flex-col">
      {/* ═══ Первый экран теперь обязан быть первым экраном ═══

          Раньше высота бралась от содержимого: на ноутбуке 1366×768
          заголовок в три строки по 78 пикселей вместе с двумя абзацами
          и кнопками не влезал, и человек доскроливал кнопки. Это было
          терпимо, пока экран просто продолжался вниз. Теперь он закреплён
          на время сборки, поэтому то, что не влезло, стало недостижимым -
          и высоту надо считать честно.

          Два уровня. Сначала размеры и отступы привязаны к высоте окна:
          заголовок берётся как меньшее из ширины и высоты, поэтому на
          широком мониторе остаётся крупным, а на низком окне сжимается.
          На телефоне считаем от ширины: высоты там хватает, а 6vw
          превратило бы заголовок в подпись.

          Второй уровень - страховка. Вступление меряет фактическую высоту
          этой обёртки и, если она всё-таки больше окна, дописывает
          --intro-fit. Мои расчёты дают запас на всех проверенных
          разрешениях, но шрифт может подгрузиться шире, перевод строки
          уехать, человек увеличить масштаб страницы - и вместо расчёта
          сработает измерение. Обычный случай - ровно 1, никакого
          масштабирования и никакой возни с резкостью текста.

          Модальное окно заявки нарочно оставлено СНАРУЖИ обёртки:
          transform на родителе делает его системой координат для
          position: fixed, и окно поехало бы вместе с первым экраном. */}
      <div
        data-intro-fit
        className="relative overflow-hidden pt-[clamp(3.5rem,9vh,6rem)] pb-[clamp(1.5rem,4vh,4rem)]"
        style={{
          transform: 'translateY(var(--intro-fit-y, 0px)) scale(var(--intro-fit, 1))',
          transformOrigin: 'top center',
        }}
      >
      {/* Атмосфера: один источник света, ничего лишнего */}
      <div
        className="absolute inset-0 dot-grid [mask-image:radial-gradient(ellipse_70%_60%_at_30%_20%,black,transparent)] pointer-events-none"
        style={{ opacity: 'var(--intro-decor, 1)' }}
      />
      <div
        className="absolute -top-[30%] -left-[15%] w-[65vw] h-[65vw] rounded-full bg-cobalt/[0.09] blur-[140px] pointer-events-none"
        style={{ opacity: 'var(--intro-bg, 1)' }}
      />
      <div
        className="absolute top-[10%] right-[-20%] w-[45vw] h-[45vw] rounded-full bg-cobalt/[0.05] blur-[120px] pointer-events-none"
        style={{ opacity: 'var(--intro-bg, 1)' }}
      />

      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-5 sm:px-6 md:px-12">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 xl:gap-20 items-center">
        <div className="max-w-3xl">
          <Step v="--intro-badge" y={8} className="mb-[clamp(0.75rem,2vh,2rem)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="flex items-center gap-3"
          >
            <span className="w-2 h-2 rounded-full bg-cobalt animate-pulse-dot" />
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-cobalt-soft">Веб-студия ONYX · сайты для бизнеса</span>
          </motion.div>
          </Step>

          {/* Заголовок продаёт не цену, а снятие риска. «Сайт за 0 рублей»
              притягивает тех, у кого нет денег, и производство работает вхолостую.
              «Увидите раньше, чем заплатите» цепляет тех, кто уже обжигался
              на предоплате, - а это платёжеспособные люди. */}
          {/* Строки заголовка появляются по очереди, каждая от своей
              переменной: сборка должна читаться как набор текста, а не как
              появление готового блока целиком. */}
          <h1 className="font-display font-bold text-[clamp(1.9rem,9vw,2.6rem)] lg:text-[clamp(2.4rem,min(6.6vw,7vh),4.9rem)] leading-[1.02] tracking-tight text-white mb-[clamp(1rem,3vh,2rem)]">
            {['Сайт вы увидите', 'раньше, чем'].map((line, i) => (
              <span
                key={i}
                className="block overflow-hidden"
                style={{ opacity: `var(--intro-h1${i === 0 ? 'a' : 'b'}, 1)` }}
              >
                <motion.span
                  className="block"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden" style={{ opacity: 'var(--intro-h1c, 1)' }}>
              <motion.span
                className="block text-cobalt"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.34, ease }}
              >
                заплатите<span className="text-white">.</span>
              </motion.span>
            </span>
          </h1>

          <Step v="--intro-sub" className="mb-[clamp(1.25rem,4vh,2.5rem)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="max-w-xl space-y-4"
          >
            {/* Абзацы - самая высокая часть первого экрана: два блока текста
                дают около 250 пикселей. На низком окне они сжимаются вместе
                с остальным, но пол стоит на 14 и 13 пикселях: ниже это уже
                не «компактно», а «мелко и не читается». */}
            <p className="text-base md:text-[clamp(0.875rem,2.3vh,1.125rem)] font-body text-bone/90 leading-relaxed">
              Начинаем не с прайса, а с разбора. Смотрим ваш сайт или нишу, показываем, что мешает получать заявки, и составляем план — какой сайт нужен именно вашему бизнесу.
            </p>
            <p className="text-[15px] md:text-[clamp(0.8125rem,2vh,0.9375rem)] font-body text-fog leading-relaxed">
              Разбор и план бесплатны и ни к чему не обязывают. Разработка стоит 0 ₽: вы платите только за запуск, размещение и дополнительные функции, если они нужны.
            </p>
          </motion.div>
          </Step>

          <Step v="--intro-cta">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62, ease }}
            className="flex flex-col sm:flex-row gap-4 sm:items-start"
          >
            <div className="flex flex-col gap-2">
              {/* Главный вход: deep-link открывает разбор сайта сразу, без приветствия. */}
              <Button className="min-h-[56px] px-9" onClick={() => window.open(BOT_AUDIT_LINK, '_blank')}>
                Бесплатный аудит сайта
              </Button>
              <span className="text-[11px] text-fog/70 text-center font-mono tracking-wide max-w-[280px] mx-auto">Разбор за 2 минуты. Нужен только адрес сайта.</span>
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="min-h-[56px] px-9" onClick={() => setFormOpen(true)}>
                Сайта пока нет
              </Button>
              <span className="text-[11px] text-fog/70 text-center font-mono tracking-wide max-w-[280px] mx-auto">Оставьте номер — разберём нишу и покажем, каким должен быть первый сайт.</span>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease }}
            onClick={() => document.querySelector('#templates')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-[clamp(0.875rem,2.6vh,1.75rem)] inline-flex items-center gap-2 text-[13px] font-body text-fog hover:text-bone transition-colors cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt rounded-full"
          >
            <LayoutGrid className="w-4 h-4 text-cobalt-soft" />
            Сначала посмотреть примеры сайтов
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </motion.button>
          </Step>
        </div>

        {/* ═══ ПРИЁМ ПЕРВОГО ЭКРАНА: сайт собирается сам ═══

            Здесь была стеклянная карточка со статистикой - самый
            распространённый паттерн студийных сайтов, то есть ровно
            середина распределения.

            Заголовок обещает «сайт вы увидите раньше, чем заплатите».
            Приём это обещание показывает буквально: в рамке браузера блоки
            встают по очереди, набирают цвет и превращаются в готовую
            страницу. Цифры остались, но ушли под рамку - факты нужны,
            а три строки с иконками дублировали текст слева, их убрал.

            Анимация на CSS с задержками: никакой прокрутки, никакого JS,
            только opacity и transform - то есть бесплатно для видеокарты. */}
        {/* Обёртка тоже скрыта на узких экранах: иначе на телефоне осталась бы
            пустая ячейка сетки и лишние 48 пикселей отступа под кнопками. */}
        <Step v="--intro-panel" y={20} className="hidden lg:block">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="relative"
        >
          <div className="absolute -inset-8 rounded-full bg-cobalt/[0.06] blur-[100px] pointer-events-none" style={{ opacity: 'var(--intro-bg, 1)' }} />

          <div className="relative rounded-[26px] border border-white/[0.09] bg-ink-2/70 backdrop-blur-sm overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
            {/* шапка браузера */}
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.07] bg-ink/50">
              <span className="flex gap-1.5">
                {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
                  <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.75 }} />
                ))}
              </span>
              <span className="flex-1 mx-2 rounded-md bg-white/[0.05] px-3 py-1 font-mono text-[10px] text-fog/80 flex items-center gap-1">
                вашбизнес.ru
                <span className="onyx-caret inline-block w-[1px] h-3 bg-cobalt-soft align-middle" />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-cobalt-soft">превью</span>
            </div>

            {/* сама страница: блоки встают по очереди и набирают цвет */}
            <div className="p-5 space-y-2.5" style={{ background: 'rgba(10,10,13,0.55)' }}>
              {/* шапка сайта */}
              <div className="flex items-center gap-2">
                <div className="onyx-b h-3 w-14 rounded-[3px]" style={{ ['--fill' as string]: 'rgba(78,124,255,0.75)', animationDelay: '.15s, .95s' }} />
                <div className="flex-1" />
                {[0, 1, 2].map((i) => (
                  <div key={i} className="onyx-b h-2 w-9 rounded-[3px]" style={{ ['--fill' as string]: 'rgba(242,240,233,0.22)', animationDelay: `${0.22 + i * 0.05}s, ${1.02 + i * 0.05}s` }} />
                ))}
              </div>

              {/* первый экран сайта */}
              <div className="onyx-b h-5 w-3/4 rounded-[4px]" style={{ ['--fill' as string]: 'rgba(242,240,233,0.5)', animationDelay: '.42s, 1.2s' }} />
              <div className="onyx-b h-5 w-1/2 rounded-[4px]" style={{ ['--fill' as string]: 'rgba(242,240,233,0.5)', animationDelay: '.5s, 1.26s' }} />
              <div className="onyx-b h-2.5 w-2/3 rounded-[3px]" style={{ ['--fill' as string]: 'rgba(242,240,233,0.16)', animationDelay: '.6s, 1.34s' }} />
              <div className="flex gap-2 pt-1">
                <div className="onyx-b h-7 w-28 rounded-lg" style={{ ['--fill' as string]: 'rgba(78,124,255,0.9)', animationDelay: '.7s, 1.42s' }} />
                <div className="onyx-b h-7 w-24 rounded-lg border border-white/10" style={{ ['--fill' as string]: 'rgba(242,240,233,0.06)', animationDelay: '.78s, 1.48s' }} />
              </div>

              {/* карточки услуг */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="onyx-b rounded-lg p-2.5 space-y-1.5" style={{ ['--fill' as string]: 'rgba(242,240,233,0.05)', animationDelay: `${0.92 + i * 0.09}s, ${1.6 + i * 0.09}s` }}>
                    <div className="h-6 rounded" style={{ background: 'rgba(78,124,255,0.16)' }} />
                    <div className="h-1.5 w-4/5 rounded" style={{ background: 'rgba(242,240,233,0.2)' }} />
                    <div className="h-1.5 w-3/5 rounded" style={{ background: 'rgba(242,240,233,0.1)' }} />
                  </div>
                ))}
              </div>

              {/* форма заявки: то, ради чего сайт вообще делают */}
              <div className="onyx-b rounded-lg p-3 flex items-center gap-2 mt-2" style={{ ['--fill' as string]: 'rgba(78,124,255,0.08)', animationDelay: '1.24s, 1.9s' }}>
                <div className="flex-1 h-5 rounded" style={{ background: 'rgba(242,240,233,0.08)' }} />
                <div className="h-5 w-20 rounded" style={{ background: 'rgba(78,124,255,0.85)' }} />
              </div>
            </div>

            {/* подпись под превью */}
            <div className="px-5 py-3.5 border-t border-white/[0.07] flex items-center justify-between gap-3 bg-ink/40">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fog/70">
                Так вы видите сайт до оплаты
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-cobalt-soft">0 ₽ за разработку</span>
            </div>
          </div>

          {/* факты: остались, но ушли под рамку и стали компактнее */}
          <div className="mt-5 grid grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/[0.07]">
            {[
              { value: '0 ₽', label: 'разработка' },
              { value: '2 мин', label: 'разбор в боте' },
              { value: '2–3 дня', label: 'до первой версии' },
              { value: '150+', label: 'сайтов запущено' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5 + i * 0.07, ease }}
                className="bg-ink-2/60 px-3 py-3.5"
              >
                <div className="font-display font-bold text-[1.15rem] xl:text-[1.3rem] text-white tracking-tight leading-none">{stat.value}</div>
                <div className="text-[10px] font-mono uppercase tracking-[0.1em] text-fog/70 leading-snug mt-1.5">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        </Step>
        </div>
      </div>
      </div>

      <LeadFormModal open={formOpen} onClose={() => setFormOpen(false)} />
    </section>
  );
}
