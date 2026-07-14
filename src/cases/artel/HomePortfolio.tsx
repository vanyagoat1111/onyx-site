import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Section } from './Layout';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('Все');
  const [currentSlide, setCurrentSlide] = useState(0);

  const filters = ['Все', 'Квартиры', 'Дома', 'Коммерция'];
  
  const projects = [
    { type: 'Квартиры', title: 'ЖК "Символ"', desc: 'Минимализм с элементами ар-деко. 140 м²', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80' },
    { type: 'Дома', title: 'Резиденция "Жуковка"', desc: 'Классика в современном прочтении. 450 м²', img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1920&q=80' },
    { type: 'Квартиры', title: 'ЖК "Садовые Кварталы"', desc: 'Индустриальный шик и теплые текстуры. 110 м²', img: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1920&q=80' },
    { type: 'Коммерция', title: 'Ресторан "Bistrot"', desc: 'Уютная атмосфера с акцентом на натуральное дерево. 300 м²', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80' },
    { type: 'Квартиры', title: 'Апартаменты Neva Towers', desc: 'Панорамный вид и строгая геометрия. 95 м²', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80' },
    { type: 'Дома', title: 'Вилла "Серебряный Бор"', desc: 'Слияние с природой и максимум света. 600 м²', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80' },
  ];

  const filteredProjects = activeFilter === 'Все' ? projects : projects.filter(p => p.type === activeFilter);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredProjects.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  // Reset slide when filter changes
  React.useEffect(() => {
    setCurrentSlide(0);
  }, [activeFilter]);

  return (
    <section id="portfolio" className="py-24 bg-darker">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-gold/20 pb-8">
        <div>
          <span className="uppercase tracking-[0.4em] text-[11px] text-gold mb-4 block">Selected Works</span>
          <h2 className="font-serif text-4xl md:text-5xl italic">Наши работы</h2>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-[10px] uppercase tracking-[0.2em] px-4 py-2 border transition-colors duration-300 ${
                activeFilter === f 
                  ? 'border-gold text-gold' 
                  : 'border-transparent text-ivory/60 hover:text-ivory hover:border-ivory/20'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full relative h-[60vh] md:h-[80vh] overflow-hidden group">
        {filteredProjects.length > 0 ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeFilter}-${currentSlide}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <img 
                  src={filteredProjects[currentSlide].img} 
                  alt={filteredProjects[currentSlide].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent" />
                
                <div className="absolute bottom-12 left-6 md:left-24 max-w-xl">
                  <span className="text-gold text-[10px] uppercase tracking-[0.3em] mb-3 block">
                    {filteredProjects[currentSlide].type}
                  </span>
                  <h3 className="font-serif text-4xl md:text-6xl mb-4 italic">{filteredProjects[currentSlide].title}</h3>
                  <p className="font-manrope font-light text-ivory/80 text-lg tracking-wide">{filteredProjects[currentSlide].desc}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {filteredProjects.length > 1 && (
              <div className="absolute bottom-12 right-6 md:right-24 flex gap-4">
                <button onClick={handlePrev} className="w-12 h-12 border border-ivory/30 flex items-center justify-center text-ivory hover:border-gold hover:text-gold transition-colors backdrop-blur-sm">
                  <ChevronLeft strokeWidth={1} />
                </button>
                <button onClick={handleNext} className="w-12 h-12 border border-ivory/30 flex items-center justify-center text-ivory hover:border-gold hover:text-gold transition-colors backdrop-blur-sm">
                  <ChevronRight strokeWidth={1} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-dark">
             <p className="font-serif text-2xl text-ivory/40">В данной категории пока нет объектов</p>
          </div>
        )}
      </div>
    </section>
  );
}

export function Reviews() {
  const reviews = [
    { name: "Михаил Воронцов", role: "Владелец квартиры, ЖК Символ", text: "Процесс ремонта всегда казался мне чем-то стихийным, но команда ARTEL показала, что это может быть системно, прозрачно и четко. Идеальное совпадение с дизайн-проектом и ни одного просроченного дня.", initials: "МВ" },
    { name: "Анна Смирнова", role: "Резиденция Жуковка", text: "Высочайший уровень сервиса. Менеджер был на связи 24/7, ежедневные фотоотчеты внушали абсолютное спокойствие. Качество отделочных работ превзошло все ожидания.", initials: "АС" },
    { name: "Евгений Лебедев", role: "ЖК Садовые Кварталы", text: "Профессионализм на всех этапах — от первых чертежей до финального клининга. Отдельная благодарность за работу со сложной инженерией умного дома.", initials: "ЕЛ" }
  ];

  const [active, setActive] = useState(0);

  return (
    <Section id="reviews">
      <div className="grid md:grid-cols-12 gap-16 items-center">
        <div className="md:col-span-4 border-r border-gold/10 pr-8">
          <span className="uppercase tracking-[0.4em] text-[11px] text-gold mb-4 block">Testimonials</span>
          <h2 className="font-serif text-4xl md:text-5xl mb-10 leading-[1.1] italic">
            Оценки тех, кто <br/>доверяет нам
          </h2>
          <div className="flex gap-4">
            <button 
              onClick={() => setActive((active - 1 + reviews.length) % reviews.length)} 
              className="w-12 h-12 border border-gold/30 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
            >
              <ChevronLeft strokeWidth={1} />
            </button>
            <button 
              onClick={() => setActive((active + 1) % reviews.length)}
              className="w-12 h-12 border border-gold/30 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
            >
              <ChevronRight strokeWidth={1} />
            </button>
          </div>
        </div>

        <div className="md:col-span-8 relative min-h-[500px] md:min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col md:flex-row gap-12 items-center"
            >
              <div className="w-full md:w-5/12 h-64 md:h-[400px] relative overflow-hidden bg-dark flex items-center justify-center">
                 <div
                   className="absolute inset-0 opacity-[0.06]"
                   style={{
                     backgroundImage: 'linear-gradient(#C9A868 1px, transparent 1px), linear-gradient(90deg, #C9A868 1px, transparent 1px)',
                     backgroundSize: '32px 32px',
                   }}
                 />
                 <div className="absolute -top-1/4 -right-1/4 w-2/3 aspect-square rounded-full bg-gold/10 blur-[80px] pointer-events-none" />
                 <div className="relative z-10 w-28 h-28 md:w-32 md:h-32 rounded-full border border-gold/40 bg-gold/10 flex items-center justify-center">
                   <span className="font-serif italic text-4xl md:text-5xl text-gold">{reviews[active].initials}</span>
                 </div>
                 <div className="absolute inset-0 border border-gold/20 m-4 pointer-events-none" />
              </div>
              <div className="w-full md:w-7/12">
                <div className="text-6xl text-gold/20 font-serif leading-none mb-6">"</div>
                <p className="font-serif text-xl md:text-2xl leading-relaxed mb-8 italic">
                  {reviews[active].text}
                </p>
                <div>
                  <div className="font-manrope text-[11px] tracking-[0.2em] uppercase">{reviews[active].name}</div>
                  <div className="font-manrope font-light text-[10px] uppercase tracking-widest text-gold mt-2 opacity-60">{reviews[active].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
