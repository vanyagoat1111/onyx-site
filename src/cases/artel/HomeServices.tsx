import React from 'react';
import { Section } from './Layout';
import { ShieldCheck, Clock, HardHat, FileText, Camera, UserCheck, ArrowRight } from 'lucide-react';

export function WhyUs() {
  const reasons = [
    { icon: FileText, title: 'Фиксированный договор', desc: 'Стоимость работ закрепляется юридически и не меняется в процессе реализации проекта.' },
    { icon: Clock, title: 'Соблюдение сроков', desc: 'Четкий график производства работ. Несем финансовую ответственность за каждый день просрочки.' },
    { icon: ShieldCheck, title: 'Гарантия на работы', desc: 'Предоставляем расширенную гарантию до 5 лет на все инженерные и отделочные работы.' },
    { icon: HardHat, title: 'Собственные бригады', desc: 'Только проверенные штатные специалисты узкого профиля с опытом работы в премиум-сегменте.' },
    { icon: Camera, title: 'Ежедневные отчеты', desc: 'Полный контроль процесса дистанционно через фото- и видеоотчеты с объекта.' },
    { icon: UserCheck, title: 'Персональный менеджер', desc: 'Один ответственный специалист, который всегда на связи и решает любые вопросы.' },
  ];

  return (
    <Section id="why-us">
      <div className="mb-16 md:mb-24 border-b border-gold/20 pb-8">
        <span className="uppercase tracking-[0.4em] text-[11px] text-gold mb-4 block">Our Values</span>
        <h2 className="font-serif text-4xl md:text-5xl italic">Почему выбирают нас</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reasons.map((r, i) => (
          <div key={i} className="group border border-gold/10 p-10 hover:border-gold/30 hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(201,168,104,0.15)] transition-all duration-500 bg-dark/50">
            <r.icon className="text-gold mb-8 transition-transform duration-500 group-hover:scale-110" strokeWidth={1} size={40} />
            <h3 className="font-serif text-2xl mb-4 italic">{r.title}</h3>
            <p className="font-manrope font-light text-[13px] text-ivory/60 leading-relaxed tracking-wide">
              {r.desc}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Services() {
  const services = [
    { title: 'Дизайнерский ремонт', desc: 'Комплексная реализация проекта любой сложности с полным авторским надзором.', img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80' },
    { title: 'Капитальный ремонт', desc: 'Глубокая реконструкция с демонтажом, возведением перегородок и заменой всех коммуникаций.', img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80' },
    { title: 'Косметический ремонт', desc: 'Обновление облика пространства с использованием премиальных чистовых материалов.', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
    { title: 'Инженерные системы', desc: 'Проектирование и монтаж умного дома, электрики, вентиляции и кондиционирования.', img: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80' },
    { title: 'Отделка ванных комнат', desc: 'Ювелирная работа с натуральным камнем, керамогранитом и элитной сантехникой.', img: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80' },
    { title: 'Черновая отделка', desc: 'Идеальная геометрия стен и стяжки — безупречная база для финишных покрытий.', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <Section id="services" className="bg-darker border-t border-gold/10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8 border-b border-gold/20 pb-8">
        <div>
          <span className="uppercase tracking-[0.4em] text-[11px] text-gold mb-4 block">Our Expertise</span>
          <h2 className="font-serif text-4xl md:text-5xl max-w-2xl leading-[1.1] italic">
            Безупречность в каждом направлении
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
        {services.map((s, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="w-full h-64 overflow-hidden mb-6">
              <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="border-b border-gold/20 pb-6 mb-6 group-hover:border-gold transition-colors duration-500">
              <h3 className="font-serif text-2xl mb-4 group-hover:text-gold transition-colors duration-500 italic">{s.title}</h3>
              <p className="font-manrope font-light text-[13px] text-ivory/60 leading-relaxed tracking-wide">
                {s.desc}
              </p>
            </div>
            <div className="flex items-center text-[10px] uppercase tracking-[0.2em] text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Подробнее <ArrowRight size={14} className="ml-2" strokeWidth={1}/>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Process() {
  const steps = [
    { title: 'Заявка и консультация', desc: 'Обсуждение ваших пожеланий, ориентировочных сроков и бюджета.' },
    { title: 'Замер и концепция', desc: 'Выезд инженера, точные обмеры помещения и формирование базового видения.' },
    { title: 'Дизайн-проект и смета', desc: 'Создание визуализаций, чертежей и детальный расчет стоимости до рубля.' },
    { title: 'Договор', desc: 'Юридическое закрепление стоимости, сроков и гарантийных обязательств.' },
    { title: 'Реализация с фотоотчетами', desc: 'Проведение всех этапов работ с регулярным контролем качества и прозрачной отчетностью.' },
    { title: 'Приемка объекта', desc: 'Финальный клининг, расстановка декора и сдача готового интерьера заказчику.' },
    { title: 'Гарантийное сопровождение', desc: 'Оперативное решение любых вопросов эксплуатации в рамках расширенной гарантии.' },
  ];

  return (
    <Section id="process">
      <div className="mb-20 md:mb-32 border-b border-gold/20 pb-8 text-right">
        <span className="uppercase tracking-[0.4em] text-[11px] text-gold mb-4 block">Process</span>
        <h2 className="font-serif text-4xl md:text-5xl italic">Прозрачная хронология</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-16 relative">
        <div className="hidden md:block">
          <div className="sticky top-32 h-[70vh] border border-gold/20 bg-dark relative overflow-hidden flex flex-col justify-between p-10">
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: 'linear-gradient(#C9A868 1px, transparent 1px), linear-gradient(90deg, #C9A868 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <div className="absolute -top-1/4 -left-1/4 w-2/3 aspect-square rounded-full bg-gold/10 blur-[100px] pointer-events-none" />
            <span className="relative uppercase tracking-[0.4em] text-[11px] text-gold/70">От заявки до ключей</span>
            <div className="relative flex items-end gap-6">
              <span className="font-serif text-[9rem] leading-none italic text-gold">{steps.length}</span>
              <span className="font-manrope font-light text-sm uppercase tracking-[0.2em] text-ivory/50 mb-6">этапов<br/>полного<br/>цикла</span>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[20px] top-4 bottom-4 w-[1px] bg-gold/20" />
          
          <div className="space-y-16">
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-start">
                {/* Dot */}
                <div className="absolute left-[20px] transform -translate-x-1/2 mt-1 w-4 h-4 rounded-full bg-dark border-2 border-gold/50 z-10" />
                
                <div className="pl-16 w-full text-left">
                  <div className="font-serif text-4xl text-gold/30 mb-2 italic">0{i + 1}</div>
                  <h3 className="font-serif text-2xl mb-3 italic">{step.title}</h3>
                  <p className="font-manrope font-light text-[13px] text-ivory/60 leading-relaxed tracking-wide">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
