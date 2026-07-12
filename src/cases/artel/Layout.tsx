import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Услуги', href: '#services' },
    { name: 'Философия', href: '#philosophy' },
    { name: 'Портфолио', href: '#portfolio' },
    { name: 'Процесс', href: '#process' },
    { name: 'Отзывы', href: '#reviews' },
    { name: 'Контакты', href: '#contact' },
  ];

  return (
    <>
      <header className="absolute top-0 w-full z-50 py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex flex-col">
            <a href="#" className="font-serif text-2xl tracking-[0.3em] font-light text-ivory leading-tight">
              ARTEL
            </a>
            <span className="text-[10px] tracking-[0.5em] opacity-60 uppercase mt-1 font-manrope">Interiors & Renovation</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-10 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] uppercase tracking-[0.2em] text-ivory/80 hover:text-gold transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-8">
            <a href="tel:+74950000000" className="text-sm font-serif italic text-ivory hover:text-gold transition-colors">
              +7 (495) 000 00 00
            </a>
            <a href="#contact" className="px-6 py-2 border border-gold/40 text-[11px] uppercase tracking-[0.2em] text-ivory hover:bg-gold hover:text-dark transition-all duration-500">
              Консультация
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-ivory hover:text-gold transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu strokeWidth={1} size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[100] bg-dark flex flex-col justify-center items-center"
          >
            <button
              className="absolute top-6 right-6 text-ivory hover:text-gold transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X strokeWidth={1} size={32} />
            </button>
            <nav className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-3xl text-ivory hover:text-gold transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a href="tel:+74950000000" className="mt-8 text-xl font-manrope font-light tracking-wider text-gold">
                +7 (495) 000-00-00
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  return (
    <footer className="bg-darker pt-24 pb-12 border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-1">
          <a href="#" className="font-serif text-2xl tracking-[0.3em] font-light text-ivory leading-tight block mb-2">
            ARTEL
          </a>
          <span className="text-[10px] tracking-[0.5em] opacity-60 uppercase font-manrope mb-6 block text-ivory">Interiors & Renovation</span>
          <p className="font-manrope font-light text-[11px] text-ivory/60 leading-relaxed uppercase tracking-widest">
            Ремонт и отделка квартир премиум-класса. Создаем пространства, достойные вашего образа жизни.
          </p>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.4em] text-gold mb-6">Навигация</h4>
          <ul className="space-y-4 font-manrope font-light text-[11px] uppercase tracking-widest text-ivory/60">
            <li><a href="#services" className="hover:text-ivory transition-colors">Услуги</a></li>
            <li><a href="#portfolio" className="hover:text-ivory transition-colors">Портфолио</a></li>
            <li><a href="#process" className="hover:text-ivory transition-colors">Процесс</a></li>
            <li><a href="#contact" className="hover:text-ivory transition-colors">Контакты</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.4em] text-gold mb-6">Контакты</h4>
          <ul className="space-y-4 font-manrope font-light text-[11px] tracking-widest uppercase text-ivory/60">
            <li>г. Москва, Пресненская набережная, 12</li>
            <li><a href="tel:+74950000000" className="hover:text-ivory transition-colors font-serif italic tracking-normal text-sm lowercase">+7 (495) 000 00 00</a></li>
            <li><a href="mailto:hello@artel-interiors.ru" className="hover:text-ivory transition-colors lowercase tracking-normal">hello@artel-interiors.ru</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.4em] text-gold mb-6">Следите за нами</h4>
          <ul className="space-y-4 font-manrope font-light text-[11px] uppercase tracking-widest text-ivory/60">
            <li><a href="#" className="hover:text-ivory transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-ivory transition-colors">Behance</a></li>
            <li><a href="#" className="hover:text-ivory transition-colors">Telegram</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-gold/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] uppercase tracking-[0.3em] opacity-50">
        <p className="font-manrope font-light text-ivory">
          &copy; {new Date().getFullYear()} Artel Interiors Studio. All Rights Reserved.
        </p>
        <a href="#" className="font-manrope font-light text-ivory hover:text-gold transition-colors">
          Privacy Policy / Terms of Service
        </a>
      </div>
    </footer>
  );
}

export function Section({ children, className = '', id = '' }: { children: React.ReactNode, className?: string, id?: string }) {
  return (
    <section id={id} className={`py-24 md:py-32 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-7xl mx-auto px-6 md:px-12"
      >
        {children}
      </motion.div>
    </section>
  );
}
