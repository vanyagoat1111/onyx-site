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
    { name: 'FAQ', href: '#faq' },
    { name: 'Выгоды', href: '#benefits' },
    { name: 'Кейсы', href: '#templates' },
    { name: 'Стать партнером', href: '#partner' },
    { name: 'Тарифы', href: '#pricing' },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-onyx-900/90 backdrop-blur-md py-4 border-b border-onyx-800' : 'bg-transparent py-6'}`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#" className="text-3xl font-bold tracking-tighter uppercase">ONYX<span className="text-neutral-500">_</span></a>
          
          <div className="hidden lg:flex items-center space-x-8">
            {links.map(link => (
              <a key={link.name} href={link.href} className="text-sm font-mono text-neutral-400 hover:text-white uppercase tracking-widest transition-colors">
                {link.name}
              </a>
            ))}
            <Button variant="outline" onClick={() => setFormOpen(true)}>Начать проект</Button>
          </div>

          <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-onyx-900 pt-32 px-6 flex flex-col space-y-8">
          {links.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-2xl font-bold uppercase tracking-widest border-b border-onyx-800 pb-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Button onClick={() => { setFormOpen(true); setMobileMenuOpen(false); }}>Начать проект</Button>
        </div>
      )}

      {formOpen && <ContactForm isModal onClose={() => setFormOpen(false)} />}
    </>
  );
}
