import React, { useState, useEffect } from 'react';
import { Button } from './ui';
import { Menu, X } from 'lucide-react';
import ContactForm from './ContactForm';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formSubject, setFormSubject] = useState('');
  const [formBtnText, setFormBtnText] = useState('');

  const openForm = (subject: string, btnText: string) => {
    setFormSubject(subject);
    setFormBtnText(btnText);
    setFormOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Главная', href: '#home' },
    { name: 'Решения', href: '#tasks' },
    { name: 'Почему мы', href: '#why-us' },
    { name: 'Тарифы', href: '#services' },
    { name: 'Шаблоны', href: '#templates' },
    { name: 'Материалы', href: '#lead-magnets' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Партнерам', href: '#partner' },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-onyx-900/90 backdrop-blur-md py-4 border-b border-blue-500/30 shadow-[0_4px_30px_rgba(59,130,246,0.1)]' : 'bg-transparent py-6'}`}>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(59,130,246,0.05)_50%,transparent_100%)] pointer-events-none" />
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center relative z-10">
          <a href="#" className="flex items-center gap-3 group" onClick={(e) => { e.preventDefault(); document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <img src="/favicon.svg" alt="ONYX Logo" className="w-10 h-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]"  />
            <span className="text-3xl font-black tracking-tight uppercase text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] group-hover:text-white transition-all">
              ONYX
            </span>
          </a>

          <div className="hidden xl:flex items-center space-x-6 xl:space-x-8">
            {links.map(link => (
              <a
                key={link.name}
                href={link.href || '#'}
                className="text-xs xl:text-sm font-mono text-neutral-400 hover:text-blue-500 hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)] uppercase tracking-widest transition-all relative group cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  if (link.href && link.href.startsWith('#')) {
                    const hash = link.href;
                    if (hash === '#partner') {
                      window.location.hash = hash;
                    } else if (window.location.hash.includes('#case/') || window.location.hash === '#partner') {
                       window.location.hash = hash;
                    } else {
                       document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
              >
                {link.name}
                <span className="absolute -bottom-2 left-1/2 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full group-hover:left-0 shadow-[0_0_5px_rgba(59,130,246,0.5)]" />
              </a>
            ))}
            <Button variant="outline" onClick={() => openForm('Получить разбор', 'Получить разбор бесплатно')} className="ml-4">Получить разбор</Button>
          </div>

          <button className="xl:hidden text-blue-500 hover:text-blue-300 hover:drop-shadow-[0_0_10px_rgba(147,197,253,0.3)] relative z-50 transition-all" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-onyx-950 pt-32 px-6 flex flex-col space-y-8 h-screen w-full overflow-y-auto ">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 pb-24">
            {links.map(link => (
              <a
                key={link.name}
                href={link.href || '#'}
                className="block text-xl font-black uppercase tracking-widest border-b border-onyx-700 pb-4 mb-4 text-white hover:text-blue-500 hover:border-blue-500 transition-colors drop-shadow-[0_0_5px_rgba(255,255,255,0.2)] hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  if (link.href && link.href.startsWith('#')) {
                    setTimeout(() => {
                      const hash = link.href;
                      if (hash === '#partner') {
                        window.location.hash = hash;
                      } else if (window.location.hash.includes('#case/') || window.location.hash === '#partner') {
                         window.location.hash = hash;
                      } else {
                         document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 50);
                  }
                }}
              >
                {link.name}
              </a>
            ))}
            <Button onClick={() => { openForm('Получить разбор', 'Получить разбор бесплатно'); setMobileMenuOpen(false); }} className="w-full mt-8">Получить разбор</Button>
          </div>
        </div>
      )}
      {formOpen && <ContactForm isModal subject={formSubject} buttonText={formBtnText} onClose={() => setFormOpen(false)} />}
    </>
  );
}
