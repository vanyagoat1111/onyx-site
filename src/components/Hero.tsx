import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button, Container } from './ui';
import ContactForm from './ContactForm';

export default function Hero() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden industrial-grid mask-image-b">
      <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-30 mix-blend-screen pointer-events-none">
        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" alt="Abstract Pattern" className="w-full h-full object-cover grayscale object-right" referrerPolicy="no-referrer" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-onyx-900/80 to-onyx-900 pointer-events-none" />
      
      <Container className="relative z-10 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <div className="inline-block bg-onyx-800 border border-onyx-700 text-neutral-300 font-mono text-sm px-4 py-2 uppercase tracking-widest clip-diagonal mb-8">
            <span className="inline-block w-2 h-2 bg-white rounded-full mr-3 animate-pulse"></span>
            Студия инновационной веб-разработки
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-[0.9] mb-8">
            Сайты за один день <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-600">по подписке</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-400 font-sans max-w-2xl mb-12 leading-relaxed">
            Геометрические блоки, тяжелая типографика, агрессивные углы и намеренная визуальная привлекательность. Создаем IT-решения для бизнеса с подпиской от 2990 ₽/мес.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <Button onClick={() => setFormOpen(true)}>Заполнить анкету</Button>
            <Button variant="outline" onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth'})}>Демо версии сайтов</Button>
          </div>
        </motion.div>
      </Container>
      
      {formOpen && <ContactForm isModal onClose={() => setFormOpen(false)} />}
    </section>
  );
}
