import React, { useState } from 'react';
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

const pairs = [
  {
    title: 'Гостиная, ЖК «Садовые кварталы»',
    before: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80',
    after: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Кухня-гостиная, резиденция «Жуковка»',
    before: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=900&q=80',
    after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
  },
];

export function BeforeAfter() {
  const [active, setActive] = useState(0);
  const [reveal, setReveal] = useState(50);

  return (
    <Section id="before-after" className="bg-darker border-t border-gold/10">
      <div className="mb-16 md:mb-20 border-b border-gold/20 pb-8">
        <span className="uppercase tracking-[0.4em] text-[11px] text-gold mb-4 block">Transformation</span>
        <h2 className="font-serif text-4xl md:text-5xl italic">До и после</h2>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-12 items-start">
        <div className="relative w-full aspect-[16/10] overflow-hidden border border-gold/20 select-none">
          <img src={pairs[active].after} alt="После ремонта" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${reveal}%` }}>
            <img src={pairs[active].before} alt="До ремонта" className="w-full h-full object-cover" style={{ width: `${(100 / reveal) * 100}%`, maxWidth: 'none' }} draggable={false} />
          </div>
          <div className="absolute inset-y-0 bg-gold/80 w-[2px]" style={{ left: `${reveal}%` }} />
          <input
            type="range"
            min={4}
            max={96}
            value={reveal}
            onChange={(e) => setReveal(Number(e.target.value))}
            className="absolute inset-x-0 bottom-6 mx-8 w-[calc(100%-4rem)] accent-gold cursor-ew-resize"
            aria-label="Сравнить до и после"
          />
          <span className="absolute top-6 left-6 font-mono text-[10px] uppercase tracking-[0.3em] text-ivory bg-dark/70 border border-gold/30 px-3 py-1.5 backdrop-blur-sm">До</span>
          <span className="absolute top-6 right-6 font-mono text-[10px] uppercase tracking-[0.3em] text-ivory bg-dark/70 border border-gold/30 px-3 py-1.5 backdrop-blur-sm">После</span>
        </div>

        <div className="flex lg:flex-col gap-3">
          {pairs.map((p, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setReveal(50); }}
              className={`text-left p-5 border transition-colors duration-300 ${active === i ? 'border-gold bg-gold/5' : 'border-gold/15 hover:border-gold/40'}`}
            >
              <span className="font-serif text-lg italic text-ivory block">{p.title}</span>
            </button>
          ))}
          <p className="font-manrope font-light text-[12px] text-ivory/50 leading-relaxed tracking-wide pt-2">
            Двигайте ползунок на фото, чтобы сравнить состояние помещения до и после реализации проекта.
          </p>
        </div>
      </div>
    </Section>
  );
}
