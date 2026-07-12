import React from 'react';
import { motion } from 'motion/react';

export const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }: any) => {
  const base = "inline-flex items-center justify-center gap-2 font-body font-semibold tracking-wide rounded-full transition-all duration-300 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed text-sm";

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

export const SectionTitle = ({ children, subtitle, index, className = '' }: { children: React.ReactNode, subtitle?: string, index?: string, className?: string }) => (
  <div className={`mb-12 md:mb-16 relative ${className}`}>
    {subtitle && <Eyebrow index={index}>{subtitle}</Eyebrow>}
    <h2 className="heading-glow font-display font-semibold text-[1.7rem] sm:text-4xl lg:text-5xl leading-[1.12] tracking-tight [text-wrap:balance]">
      {children}
    </h2>
  </div>
);

export const Container = ({ children, className = '', id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-20 md:py-28 px-5 sm:px-6 md:px-12 w-full max-w-[1440px] mx-auto ${className}`}>
    {children}
  </section>
);

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
