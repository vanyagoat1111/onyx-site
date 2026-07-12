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
          <p className="font-sans font-light text-lg opacity-80 max-w-md leading-relaxed mb-10">
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
            <div className="font-sans text-[9px] uppercase tracking-widest opacity-50">Лет на рынке</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-serif text-4xl md:text-5xl text-gold mb-2 font-light">{stats.objects}+</div>
            <div className="font-sans text-[9px] uppercase tracking-widest opacity-50">Сданных объектов</div>
          </div>
          <div className="flex flex-col gap-1 col-span-2 md:col-span-1">
            <div className="font-serif text-4xl md:text-5xl text-gold mb-2 font-light">{stats.clients}</div>
            <div className="font-sans text-[9px] uppercase tracking-widest opacity-50">Довольных клиентов</div>
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
          <div className="space-y-6 font-sans font-light text-lg opacity-80 leading-relaxed max-w-lg">
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
        <div className="relative h-[600px] flex flex-col items-center justify-center bg-dark border border-gold/20 p-8">
          <div className="absolute inset-0 bg-gold/5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />
          
          <div className="relative z-10 w-full h-full flex flex-col justify-around">
            <div className="flex items-center gap-6 group">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-gold/40 flex items-center justify-center shrink-0 group-hover:bg-gold/10 transition-colors duration-500">
                <span className="font-serif text-2xl md:text-3xl text-gold">100%</span>
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-serif mb-2 text-ivory group-hover:text-gold transition-colors">Точность сметы</h4>
                <p className="font-sans text-[11px] md:text-[12px] text-ivory/60">Отсутствие скрытых платежей после подписания договора</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 ml-8 md:ml-12 group">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-gold/40 flex items-center justify-center shrink-0 group-hover:bg-gold/10 transition-colors duration-500">
                <span className="font-serif text-2xl md:text-3xl text-gold">5 <span className="text-sm md:text-lg">лет</span></span>
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-serif mb-2 text-ivory group-hover:text-gold transition-colors">Гарантия качества</h4>
                <p className="font-sans text-[11px] md:text-[12px] text-ivory/60">Официальная гарантия на все скрытые и инженерные работы</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-gold/40 flex items-center justify-center shrink-0 group-hover:bg-gold/10 transition-colors duration-500">
                <span className="font-serif text-2xl md:text-3xl text-gold">0</span>
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-serif mb-2 text-ivory group-hover:text-gold transition-colors">Дней просрочки</h4>
                <p className="font-sans text-[11px] md:text-[12px] text-ivory/60">Жесткий контроль графика и финансовая ответственность</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
