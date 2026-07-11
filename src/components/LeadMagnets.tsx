import React, { useState } from 'react';
import { Container, SectionTitle, Button } from './ui';
import { motion } from 'motion/react';
import { FileText, Search, ArrowRight, Download } from 'lucide-react';
import ContactForm from './ContactForm';

export default function LeadMagnets() {
  const [formOpen, setFormOpen] = useState(false);
  const [formSubject, setFormSubject] = useState('');
  const [formBtnText, setFormBtnText] = useState('');

  const openForm = (subject, btnText) => {
    setFormSubject(subject);
    setFormBtnText(btnText);
    setFormOpen(true);
  };

  return (
    <Container id="lead-magnets" className="bg-onyx-950 py-16 md:py-32 relative">
      <SectionTitle subtitle="Полезные материалы">
        Начните улучшать свой <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-md">бизнес уже сейчас</span>
      </SectionTitle>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative z-10">
        
        {/* Аудит */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-onyx-900 border border-blue-500/30 p-8 lg:p-12 clip-diagonal relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <Search className="w-12 h-12 text-blue-500 mb-6" />
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-4">
              Бесплатный аудит сайта
            </h3>
            <p className="text-neutral-300 font-sans leading-relaxed mb-8">
              Разберем ваш текущий сайт (или соцсети), найдем слабые места, где вы теряете клиентов, и предложим пошаговый план по увеличению конверсии.
            </p>
            <Button onClick={() => setFormOpen(true)} className="w-full text-center justify-center p-4">
              Получить разбор
            </Button>
          </div>
        </motion.div>

        {/* Чек-лист */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="bg-onyx-900 border border-onyx-800 p-8 lg:p-12 clip-diagonal-inverted relative overflow-hidden group hover:border-onyx-700 transition-colors"
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-white/[0.03] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <FileText className="w-12 h-12 text-neutral-400 mb-6" />
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-4">
              Чек-лист по продающему сайту
            </h3>
            <p className="text-neutral-400 font-sans leading-relaxed mb-8">
              Скачайте PDF-документ с 20 ключевыми элементами, которые должны быть на каждом сайте, чтобы он приносил стабильные заявки.
            </p>
            <Button 
              variant="outline" 
              onClick={() => setFormOpen(true)} 
              className="w-full text-center justify-center p-4 group-hover:bg-onyx-800 transition-colors"
            >
              Скачать бесплатно
            </Button>
          </div>
        </motion.div>

      </div>
      
      {formOpen && <ContactForm isModal subject={formSubject} buttonText={formBtnText} onClose={() => setFormOpen(false)} />}
    </Container>
  );
}
