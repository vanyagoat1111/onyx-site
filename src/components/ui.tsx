import React from 'react';
import { motion } from 'motion/react';

export const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }: any) => {
  /* Отклик на нажатие был не описан вообще: ни одного состояния active
     на весь сайт. На компьютере это терпимо, на телефоне кнопка без отклика
     кажется мёртвой - человек жмёт второй раз, потому что не понял,
     сработало ли. Нажатие теперь чуть проседает, и переход на нём короче,
     чем на наведении: палец должен получать ответ мгновенно. */
  const base = "inline-flex items-center justify-center gap-2 font-body font-semibold tracking-wide rounded-full transition-all duration-300 active:duration-75 active:scale-[0.975] active:brightness-95 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

  const variants = {
    primary: "bg-cobalt text-white hover:bg-bone hover:text-ink px-8 py-4 shadow-[0_8px_30px_rgba(78,124,255,0.25)] hover:shadow-[0_8px_30px_rgba(242,240,233,0.15)]",
    outline: "bg-white/[0.03] text-bone border border-white/15 hover:border-cobalt hover:text-white hover:bg-cobalt/10 px-8 py-4 backdrop-blur-sm",
    ghost: "bg-white/[0.05] text-bone hover:bg-white/[0.1] border border-white/10 px-8 py-4",
    link: "bg-transparent text-cobalt-soft hover:text-bone px-0 py-2 rounded-none border-b border-transparent hover:border-cobalt"
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${variants[variant as keyof typeof variants]} ${className}`}>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );
};

export const Eyebrow = ({ index, children, className = '' }: { index?: string, children: React.ReactNode, className?: string }) => (
  <div className={`flex items-center gap-4 mb-6 ${className}`}>
    {index && <span className="font-mono text-xs text-cobalt tracking-widest font-bold">{index}</span>}
    <span className="h-px w-10 bg-gradient-to-r from-cobalt to-cobalt/20 shrink-0" />
    <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-cobalt-soft">{children}</p>
  </div>
);

/* Заголовок секции с тремя громкостями.

   Раньше размер был один на всю страницу, и заголовок FAQ звучал так же
   громко, как заголовок галереи работ. Когда всё главное - главного нет.
   Теперь `loud` для двух секций, которые продают, `soft` для служебных,
   обычный для остальных.

   Свечение тоже перестало быть автоматическим. Кобальтовая тень на каждом
   заголовке подряд превращается из акцента в шум, поэтому теперь его надо
   просить осознанно - и только там, где заголовок реально самый громкий
   на экране. */
export const SectionTitle = ({
  children, subtitle, index, className = '',
  size = 'md', align = 'left', glow = false,
}: {
  children: React.ReactNode, subtitle?: string, index?: string, className?: string,
  size?: 'loud' | 'md' | 'soft', align?: 'left' | 'center', glow?: boolean,
}) => {
  const sizes = {
    loud: 'text-[2.1rem] sm:text-5xl lg:text-[3.9rem] leading-[1.04]',
    md: 'text-[1.7rem] sm:text-4xl lg:text-5xl leading-[1.12]',
    soft: 'text-[1.5rem] sm:text-3xl lg:text-[2.4rem] leading-[1.15]',
  };
  return (
    <div className={`${size === 'loud' ? 'mb-14 md:mb-20' : 'mb-12 md:mb-16'} relative ${align === 'center' ? 'text-center' : ''} ${className}`}>
      {subtitle && <Eyebrow index={index} className={align === 'center' ? 'justify-center' : ''}>{subtitle}</Eyebrow>}
      <h2 className={`${glow ? 'heading-glow' : 'text-white'} font-display font-semibold tracking-tight [text-wrap:balance] ${sizes[size]} ${align === 'center' ? 'mx-auto max-w-[22ch]' : ''}`}>
        {children}
      </h2>
    </div>
  );
};

/* Обёртка секции с тремя плотностями.

   Одинаковые отступы у всех секций подряд - это ровный монотонный ритм,
   в котором страница читается как единый список. Разная плотность даёт
   странице дыхание: `air` работает как пауза перед важным, `tight`
   поджимает связующие блоки, которые не должны занимать целый экран. */
export const Container = ({
  children, className = '', id, pad = 'md',
}: {
  children: React.ReactNode, className?: string, id?: string, pad?: 'tight' | 'md' | 'air',
}) => {
  const pads = {
    tight: 'py-14 md:py-20',
    md: 'py-20 md:py-28',
    air: 'py-28 md:py-40',
  };
  return (
    <section id={id} className={`${pads[pad]} px-5 sm:px-6 md:px-12 w-full max-w-[1440px] mx-auto ${className}`}>
      {children}
    </section>
  );
};

export const Reveal = ({ children, delay = 0, className = '', y = 28 }: { children: React.ReactNode, delay?: number, className?: string, y?: number }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);
