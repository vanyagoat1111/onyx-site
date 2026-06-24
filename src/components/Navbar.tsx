import React, { useState, useEffect } from 'react';
import { Button } from './ui';
import { Menu, X } from 'lucide-react';
import ContactForm from './ContactForm';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Выгоды', href: '#comparison' },
    { name: 'Кейсы', href: '#templates' },
    { name: 'Тарифы и услуги', href: '#services' },
    { name: 'Отзывы', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Контакты', href: '#contacts' },
    { name: 'Партнерам', href: '#partner' },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-onyx-900/90 backdrop-blur-md py-4 border-b border-blue-500/30 shadow-[0_4px_30px_rgba(59,130,246,0.1)]' : 'bg-transparent py-6'}`}>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(59,130,246,0.05)_50%,transparent_100%)] pointer-events-none" />
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center relative z-10">
          <a href="#" className="flex items-center gap-3 group">
            <img src={import.meta.env.BASE_URL + 'favicon.svg'} alt="ONYX Logo" className="w-10 h-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]" referrerPolicy="no-referrer" />
            <span className="text-3xl font-black tracking-tight uppercase text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] group-hover:text-white transition-all">
              ONYX
            </span>
          </a>
          
          <div className="hidden lg:flex items-center space-x-8">
            {links.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-mono text-neutral-400 hover:text-blue-500 hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)] uppercase tracking-widest transition-all relative group"
                onClick={(e) => {
                  if (link.href.startsWith('#')) {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {link.name}
                <span className="absolute -bottom-2 left-1/2 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full group-hover:left-0 shadow-[0_0_5px_rgba(59,130,246,0.5)]" />
              </a>
            ))}
            <Button variant="outline" onClick={() => setFormOpen(true)}>Начать проект</Button>
          </div>

          <button className="lg:hidden text-blue-500 hover:text-blue-300 hover:drop-shadow-[0_0_10px_rgba(147,197,253,0.3)] relative z-50 transition-all" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-onyx-950 pt-32 px-6 flex flex-col space-y-8 h-screen w-full overflow-y-auto ">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10">
            {links.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className="block text-2xl font-black uppercase tracking-widest border-b border-onyx-700 pb-4 mb-4 text-white hover:text-blue-500 hover:border-blue-500 transition-colors drop-shadow-[0_0_5px_rgba(255,255,255,0.2)] hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] "
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (link.href.startsWith('#')) {
                    e.preventDefault();
                    setTimeout(() => {
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }
                }}
              >
                {link.name}
              </a>
            ))}
            <Button onClick={() => { setFormOpen(true); setMobileMenuOpen(false); }} className="w-full mt-8">Начать проект</Button>
          </div>
        </div>
      )}

      {formOpen && <ContactForm isModal onClose={() => setFormOpen(false)} />}
    </>
  );
}
