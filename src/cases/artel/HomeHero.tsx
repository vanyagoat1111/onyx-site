import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Section } from './Layout';

export function Hero() {
  const [stats, setStats] = useState({ years: 0, objects: 0, clients: 0 });

  useEffect(() => {
    // Simple animated counter on load
    let currentYears = 0;
    let currentObjects = 0;
    let currentClients = 0;
    
    const interval = setInterval(() => {
      currentYears = Math.min(currentYears + 1, 12);
      currentObjects = Math.min(currentObjects + 5, 150);
      currentClients = Math.min(currentClients + 12, 340);
      
      setStats({ years: currentYears, objects: currentObjects, clients: currentClients });
      
      if (currentYears === 12 && currentObjects === 150 && currentClients === 340) {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/40 to-dark z-10" />
        <img 
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80" 
          alt="Premium Interior" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="uppercase tracking-[0.4em] text-[11px] text-gold mb-6 block">
            Est. 2012 — Premium Renovation
          </span>
          <h1 className="font-serif text-5xl md:text-[80px] text-ivory leading-[0.95] mb-8 italic">
            Ремонт, <br className="hidden md:block"/>достойный <br className="hidden md:block"/>вашего дома
          </h1>
          <p className="font-manrope font-light text-lg opacity-80 max-w-md leading-relaxed mb-10">
            Создаем пространства, где безупречное качество встречается с индивидуальным почерком владельца. Авторский надзор и полная прозрачность на каждом этапе реализации.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <a href="#contact" className="px-8 py-4 bg-gold/10 border border-gold/40 text-ivory text-[11px] uppercase tracking-[0.2em] text-center hover:bg-gold hover:text-dark transition-all duration-500 backdrop-blur-sm">
              Консультация
            </a>
            <a href="#portfolio" className="px-8 py-4 border border-gold/40 text-ivory text-[11px] uppercase tracking-[0.2em] text-center hover:bg-gold hover:text-dark transition-all duration-500 backdrop-blur-sm">
              Смотреть портфолио
            </a>
          </div>
        </motion.div>

        {/* Counters */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-24 md:mt-32 flex flex-wrap gap-12 md:gap-24 max-w-4xl"
        >
          <div className="flex flex-col gap-1">
            <div className="font-serif text-4xl md:text-5xl text-gold mb-2 font-light">{stats.years}</div>
            <div className="font-manrope text-[9px] uppercase tracking-widest opacity-50">Лет на рынке</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-serif text-4xl md:text-5xl text-gold mb-2 font-light">{stats.objects}+</div>
            <div className="font-manrope text-[9px] uppercase tracking-widest opacity-50">Сданных объектов</div>
          </div>
          <div className="flex flex-col gap-1 col-span-2 md:col-span-1">
            <div className="font-serif text-4xl md:text-5xl text-gold mb-2 font-light">{stats.clients}</div>
            <div className="font-manrope text-[9px] uppercase tracking-widest opacity-50">Довольных клиентов</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Philosophy() {
  return (
    <Section id="philosophy" className="bg-darker">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="uppercase tracking-[0.4em] text-[11px] text-gold mb-6 block">Философия</span>
          <h2 className="font-serif text-4xl md:text-5xl mb-10 leading-[1.1] italic">
            Искусство создавать <br/> совершенство
          </h2>
          <div className="space-y-6 font-manrope font-light text-lg opacity-80 leading-relaxed max-w-lg">
            <p>
              Мы убеждены, что истинный статус кроется в деталях. Для нас ремонт — это не просто строительный процесс, это воплощение вашего вкуса, стиля жизни и стремления к лучшему. Мы берем на себя полную ответственность за каждый этап: от первой концепции до финальной расстановки декора.
            </p>
            <p>
              Наш подход строится на абсолютной прозрачности. Вы получаете детальную смету, честные сроки и регулярные отчеты. Мы используем только премиальные материалы и привлекаем узкопрофильных мастеров с многолетним опытом.
            </p>
            <p>
              Каждый проект для нас уникален. Мы осуществляем строгий авторский надзор, гарантируя, что финальный результат будет в точности соответствовать утвержденному дизайн-проекту, превосходя ваши ожидания.
            </p>
          </div>
        </div>
        <div className="relative">
          {/* Decorative offset frame */}
          <div className="absolute inset-0 border border-gold/30 transform translate-x-4 translate-y-4 pointer-events-none" />

          {/* Infographic panel */}
          <div className="relative z-10 w-full h-[600px] bg-dark border border-gold/20 p-8 md:p-10 flex flex-col justify-between overflow-hidden">
            {/* Atmosphere */}
            <div className="absolute -top-1/3 -right-1/4 w-2/3 aspect-square rounded-full bg-gold/10 blur-[100px] pointer-events-none" />
            <div
              className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(#C9A868 1px, transparent 1px), linear-gradient(90deg, #C9A868 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Header + radial gauge */}
            <div className="relative">
              <span className="uppercase tracking-[0.4em] text-[10px] text-gold/70 block mb-8">Принципы в цифрах</span>
              <div className="flex items-center gap-7">
                <div className="relative w-[124px] h-[124px] shrink-0">
                  <svg viewBox="0 0 128 128" className="w-full h-full -rotate-90">
                    <circle cx="64" cy="64" r="54" fill="none" stroke="rgba(201,168,104,0.15)" strokeWidth="1.5" />
                    <motion.circle
                      cx="64" cy="64" r="54" fill="none" stroke="#C9A868" strokeWidth="1.5" strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 54}
                      initial={{ strokeDashoffset: 2 * Math.PI * 54 }}
                      whileInView={{ strokeDashoffset: 2 * Math.PI * 54 * 0.02 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-3xl text-ivory italic leading-none">98%</span>
                  </div>
                </div>
                <p className="font-manrope font-light text-[13px] text-ivory/70 leading-relaxed tracking-wide max-w-[180px]">
                  клиентов рекомендуют нас друзьям после сдачи объекта
                </p>
              </div>
            </div>

            {/* Meter bars */}
            <div className="relative space-y-6">
              {[
                { l: 'Соблюдение сроков', v: 99 },
                { l: 'Прозрачность сметы', v: 100 },
                { l: 'Контроль качества', v: 100 },
              ].map((m, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-2.5">
                    <span className="font-manrope font-light text-[11px] uppercase tracking-[0.2em] text-ivory/70">{m.l}</span>
                    <span className="font-serif italic text-gold text-sm">{m.v}%</span>
                  </div>
                  <div className="h-px w-full bg-gold/15 relative">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gold"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${m.v}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom stat tiles */}
            <div className="relative grid grid-cols-2 border-t border-gold/15 pt-8">
              <div className="border-r border-gold/15 pr-6">
                <div className="font-serif text-4xl text-gold italic mb-2">5 лет</div>
                <div className="font-manrope font-light text-[10px] uppercase tracking-[0.2em] text-ivory/50">гарантия на работы</div>
              </div>
              <div className="pl-6">
                <div className="font-serif text-4xl text-gold italic mb-2">24/7</div>
                <div className="font-manrope font-light text-[10px] uppercase tracking-[0.2em] text-ivory/50">персональный менеджер</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
