import React from 'react';

export const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }: any) => {
  const base = "inline-flex items-center justify-center font-bold tracking-widest uppercase transition-all duration-500 clip-diagonal relative group overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed text-[11px] sm:text-xs";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-white hover:text-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.8)] px-8 py-4 border border-blue-500 hover:border-white",
    outline: "bg-onyx-900/50 backdrop-blur-sm text-white border border-blue-500/50 hover:border-blue-400 hover:bg-blue-500/10 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] px-8 py-4",
    ghost: "bg-onyx-800/50 text-white hover:bg-onyx-900 border border-onyx-700 hover:border-blue-400/80 hover:shadow-[0_0_20px_rgba(147,197,253,0.3)] px-8 py-4",
    link: "bg-transparent text-blue-500 hover:text-white px-0 py-2 border-b-2 border-transparent hover:border-blue-500 clip-none shadow-none"
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${variants[variant as keyof typeof variants]} ${className}`}>
      {variant !== 'link' && <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export const SectionTitle = ({ children, subtitle, className = '' }: { children: React.ReactNode, subtitle?: string, className?: string }) => (
  <div className={`mb-16 md:mb-24 ${className} relative`}>
    {subtitle && (
      <div className="flex items-center gap-3 mb-4 ml-1">
        <div className="w-8 h-[2px] bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
        <p className="text-blue-400 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]">{subtitle}</p>
      </div>
    )}
    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black uppercase tracking-tight leading-[1.1] text-white relative inline-block drop-shadow-lg">
      {children}
    </h2>
  </div>
);

export const Container = ({ children, className = '', id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-24 md:py-32 px-6 md:px-12 w-full max-w-[1600px] mx-auto ${className}`}>
    {children}
  </section>
);
