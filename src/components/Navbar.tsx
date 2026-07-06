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
 { name: 'Главная', href: '#home' },
 { name: 'Шаблоны сайтов', href: '#templates' },
 { name: 'Тарифы', href: '#prices' },
 { name: 'Услуги', href: '#services' },
 { name: 'Заявка', action: () => setFormOpen(true) },
 { name: 'Отзывы', href: '#reviews' },
 { name: 'FAQ', href: '#faq' },
 { name: 'Контакты', href: '#contacts' },
 { name: 'Партнерам', href: '#partner' },
 ];

 return (
 <>
 <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-obsidian-canvas py-4 border-b border-ash-stroke' : 'bg-transparent py-6'}`}>
 <div className="hidden" />
 <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center relative z-10">
 <a href="#" className="flex items-center gap-3 group">
 
 <span className="text-bone text-caption font-mono uppercase tracking-widest">
 ONYX
 </span>
 </a>

 <div className="hidden lg:flex items-center space-x-8">
 {links.map(link => (
 <a
 key={link.name}
 href={link.href || '#'}
 className="text-sm text-bone hover:text-chalk uppercase transition-colors relative group cursor-pointer"
 onClick={(e) => {
 e.preventDefault();
 if (link.action) {
 link.action();
 } else if (link.href && link.href.startsWith('#')) {
 document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
 }
 }}
 >
 {link.name}
 <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-bone transition-all group-hover:w-full" />
 </a>
 ))}
 <Button variant="outline" onClick={() => setFormOpen(true)}>Начать проект</Button>
 </div>

 <button className="lg:hidden text-bone hover:text-chalk relative z-50 transition-all" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
 {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
 </button>
 </div>
 </nav>

 {mobileMenuOpen && (
 <div className="fixed inset-0 z-40 bg-obsidian-canvas pt-32 px-6 flex flex-col space-y-8 h-screen w-full overflow-y-auto ">
 <div className="hidden" />
 <div className="relative z-10">
 {links.map(link => (
 <a
 key={link.name}
 href={link.href || '#'}
 className="block text-lg uppercase border-b border-ash-stroke pb-4 mb-4 text-bone hover:text-chalk transition-colors cursor-pointer"
 onClick={(e) => {
 e.preventDefault();
 setMobileMenuOpen(false);
 if (link.action) {
 setTimeout(() => link.action!(), 50);
 } else if (link.href && link.href.startsWith('#')) {
 setTimeout(() => {
 document.querySelector(link.href!)?.scrollIntoView({ behavior: 'smooth' });
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
