import React from 'react';

export const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button' }: any) => {
  const base = "inline-flex items-center justify-center font-bold tracking-widest uppercase transition-all duration-300 clip-diagonal";
  const variants = {
    primary: "bg-white text-black hover:bg-neutral-300 px-8 py-4",
    outline: "bg-transparent text-white border border-white hover:bg-white hover:text-black px-8 py-4",
    ghost: "bg-onyx-800 text-white hover:bg-onyx-700 px-8 py-4",
    link: "bg-transparent text-neutral-400 hover:text-white px-0 py-2 border-b-2 border-transparent hover:border-white clip-none"
  };
  return (
    <button type={type} onClick={onClick} className={`${base} ${variants[variant as keyof typeof variants]} ${className}`}>
      {children}
    </button>
  );
};

export const SectionTitle = ({ children, subtitle, className = '' }: { children: React.ReactNode, subtitle?: string, className?: string }) => (
  <div className={`mb-16 md:mb-24 ${className}`}>
    {subtitle && <p className="text-neutral-500 font-mono text-sm tracking-[0.2em] uppercase mb-4 border-l-2 border-white pl-4 ml-1">{subtitle}</p>}
    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tighter leading-none">{children}</h2>
    <div className="w-32 h-2 bg-white mt-8 clip-diagonal" />
  </div>
);

export const Container = ({ children, className = '', id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-24 md:py-32 px-6 md:px-12 w-full max-w-[1600px] mx-auto ${className}`}>
    {children}
  </section>
);
