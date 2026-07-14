import React from 'react';
import { motion } from 'motion/react';
import { Section } from './Layout';

const materials = [
  { label: 'Натуральный камень', origin: 'Италия, Испания' },
  { label: 'Инженерная доска', origin: 'Австрия' },
  { label: 'Сантехника премиум-класса', origin: 'Германия' },
  { label: 'Системы «Умный дом»', origin: 'Собственная интеграция' },
  { label: 'Керамогранит крупного формата', origin: 'Италия' },
  { label: 'Текстиль и обивочные ткани', origin: 'Бельгия' },
];

export function MaterialsPartners() {
  return (
    <Section id="materials" className="bg-dark border-t border-gold/10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 border-b border-gold/20 pb-8">
        <div>
          <span className="uppercase tracking-[0.4em] text-[11px] text-gold mb-4 block">Sourcing</span>
          <h2 className="font-serif text-4xl md:text-5xl italic max-w-xl leading-[1.1]">
            Материалы и партнёры
          </h2>
        </div>
        <p className="max-w-md font-manrope font-light text-[13px] text-ivory/60 leading-relaxed tracking-wide">
          Работаем напрямую с проверенными поставщиками премиального сегмента — без посредников и компромиссов в качестве.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/10">
        {materials.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
            className="bg-dark p-8 flex flex-col gap-2 hover:bg-darker transition-colors duration-500"
          >
            <span className="font-serif text-xl italic text-ivory">{m.label}</span>
            <span className="font-manrope font-light text-[10px] uppercase tracking-[0.25em] text-gold/70">{m.origin}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

const changes = [
  { label: 'Инженерные системы', before: 'Устаревшая разводка, риск протечек', after: 'Полная замена, система защиты от протечек' },
  { label: 'Микроклимат', before: 'Нет вентиляции и кондиционирования', after: 'Приточно-вытяжная вентиляция, климат-контроль' },
  { label: 'Звукоизоляция', before: 'Слышимость от соседей и с улицы', after: 'Многослойная шумоизоляция стен и пола' },
  { label: 'Соответствие проекту', before: 'Отклонения от первоначальной идеи', after: '100% соответствие утверждённому дизайн-проекту' },
];

export function BeforeAfter() {
  return (
    <Section id="before-after" className="bg-darker border-t border-gold/10">
      <div className="mb-16 md:mb-20 border-b border-gold/20 pb-8">
        <span className="uppercase tracking-[0.4em] text-[11px] text-gold mb-4 block">Transformation</span>
        <h2 className="font-serif text-4xl md:text-5xl italic">Что меняется после ремонта</h2>
      </div>

      <div className="space-y-3">
        {changes.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="grid md:grid-cols-[200px_1fr_auto_1fr] items-center gap-4 md:gap-8 border border-gold/15 p-6 md:p-8"
          >
            <span className="font-serif text-lg italic text-ivory">{c.label}</span>
            <span className="font-manrope font-light text-[13px] text-ivory/45 leading-relaxed">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ivory/30 block mb-1.5">До</span>
              {c.before}
            </span>
            <span className="hidden md:block text-gold/50 text-xl">→</span>
            <span className="font-manrope font-light text-[13px] text-ivory leading-relaxed">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-gold/70 block mb-1.5">После</span>
              {c.after}
            </span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
