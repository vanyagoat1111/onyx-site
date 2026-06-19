import React from 'react';

export const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button' }: any) => {
  const base = "inline-flex items-center justify-center font-bold tracking-widest uppercase transition-all duration-300 clip-diagonal relative group overflow-hidden";
  const variants = {
    primary: "bg-blue-600 text-onyx-950 hover:bg-white hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] px-8 py-4 border border-transparent hover:border-blue-500",
    outline: "bg-onyx-950 text-white border border-blue-500 hover:bg-blue-600 hover:text-onyx-950 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] px-8 py-4",
    ghost: "bg-onyx-800 text-white hover:bg-onyx-950 border border-onyx-700 hover:border-blue-400 hover:shadow-[0_0_15px_rgba(147,197,253,0.5)] px-8 py-4",
    link: "bg-transparent text-blue-500 hover:text-white px-0 py-2 border-b-2 border-transparent hover:border-blue-500 clip-none shadow-none"
  };
  return (
    <button type={type} onClick={onClick} className={`${base} ${variants[variant as keyof typeof variants]} ${className}`}>
      {variant !== 'link' && <div className="absolute inset-0 bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export const SectionTitle = ({ children, subtitle, className = '' }: { children: React.ReactNode, subtitle?: string, className?: string }) => (
  <div className={`mb-16 md:mb-24 ${className} relative`}>
    {subtitle && <p className="text-blue-500 font-mono text-sm tracking-[0.2em] uppercase mb-4 border-l-2 border-blue-400 pl-4 ml-1">{subtitle}</p>}
    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black uppercase tracking-tight leading-none text-white relative inline-block">
      {children}
    </h2>
  </div>
);

export const Container = ({ children, className = '', id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-24 md:py-32 px-6 md:px-12 w-full max-w-[1600px] mx-auto ${className}`}>
    {children}
  </section>
);
