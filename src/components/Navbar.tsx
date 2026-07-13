import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { BOT_LINK } from '../lib/leads';

const links = [
  { name: 'Главная', href: '#home', num: '01' },
  { name: 'Тарифы', href: '#prices', num: '02' },
  { name: 'Доп. опции', href: '#addons', num: '03' },
  { name: 'FAQ', href: '#faq', num: '04' },
  { name: 'Контакты', href: '#contact-form', num: '05' },
];

const scrollTo = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-ink/85 backdrop-blur-xl py-3 border-b border-white/10' : 'bg-transparent py-5'}`}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-12 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 group" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <img src="/favicon.svg" alt="ONYX Logo" className="w-8 h-8 group-hover:rotate-90 transition-transform duration-500" />
            <span className="font-display font-bold text-lg tracking-wide text-bone group-hover:text-cobalt-soft transition-colors">
              ONYX
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-9">
            {links.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="text-[13px] font-body font-medium text-fog hover:text-bone transition-colors relative group cursor-pointer"
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              >
                <sup className="font-mono text-[9px] text-cobalt-soft mr-1">{link.num}</sup>
                {link.name}
                <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-cobalt transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <button
              onClick={() => window.open(BOT_LINK, '_blank')}
              className="inline-flex items-center gap-1.5 rounded-full bg-cobalt text-white text-[13px] font-body font-semibold px-5 py-2.5 hover:bg-bone hover:text-ink transition-colors duration-300 shadow-[0_6px_24px_rgba(78,124,255,0.35)]"
            >
              Начать разработку <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile: закреплённая CTA + бургер */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <button
              onClick={() => window.open(BOT_LINK, '_blank')}
              className="inline-flex items-center gap-1 rounded-full bg-cobalt text-white text-[11px] font-body font-semibold px-3.5 py-2 hover:bg-bone hover:text-ink transition-colors duration-300 shadow-[0_4px_18px_rgba(78,124,255,0.4)] whitespace-nowrap"
            >
              Начать разработку
            </button>
            <button className="text-bone relative z-50 p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Меню">
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ink/97 backdrop-blur-xl pt-28 px-6 flex flex-col h-screen w-full overflow-y-auto"
          >
            <div className="dot-grid absolute inset-0 pointer-events-none opacity-40" />
            <div className="relative z-10 flex flex-col">
              {links.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-baseline gap-4 font-display font-medium text-3xl text-bone border-b border-white/10 py-5 hover:text-cobalt-soft transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    setTimeout(() => scrollTo(link.href), 60);
                  }}
                >
                  <span className="font-mono text-xs text-cobalt-soft">{link.num}</span>
                  {link.name}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.44, duration: 0.5 }}
                onClick={() => { setMobileMenuOpen(false); window.open(BOT_LINK, '_blank'); }}
                className="mt-10 w-full rounded-full bg-cobalt text-white font-body font-semibold py-5 hover:bg-bone hover:text-ink transition-colors"
              >
                Начать разработку
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
