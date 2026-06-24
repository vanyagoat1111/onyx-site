import React, { useState, useEffect } from 'react';
import { Layout, Type, Palette, Monitor, Smartphone, Settings, MousePointer2, X } from 'lucide-react';

const FurnitureMock = () => (
  <div className="bg-white text-onyx-950 min-h-max flex flex-col font-sans">
    <nav className="p-6 flex justify-between items-center border-b border-neutral-200 sticky top-0 bg-white/95 backdrop-blur z-50">
       <span className="font-bold uppercase tracking-widest text-xl">Wood&Metal</span>
       <div className="hidden md:flex space-x-8 text-sm font-bold tracking-wide uppercase">
         <span className="cursor-pointer hover:text-neutral-500 transition-colors">Коллекции</span>
         <span className="cursor-pointer hover:text-neutral-500 transition-colors">Студии</span>
         <span className="cursor-pointer hover:text-neutral-500 transition-colors">Корзина (0)</span>
       </div>
    </nav>
    <div className="px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-neutral-100">
       <div className="space-y-8 max-w-xl">
          <div className="text-xs uppercase tracking-widest font-mono text-neutral-500 border-l-2 border-onyx-950 pl-3">Новая коллекция 2026</div>
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight leading-[0.9]">Эстетика<br/>Минимализма</h1>
          <p className="text-neutral-600 text-lg">Инновационные формы и дорогие текстуры. Мы создаем мебель, которая становится центром притяжения.</p>
          <button className="bg-onyx-950 text-white px-10 py-5 font-bold uppercase tracking-widest text-sm clip-diagonal hover:bg-neutral-800 transition-colors">Смотреть каталог</button>
       </div>
       <img src="https://loremflickr.com/600/600/furniture,chair?lock=3" alt="Furniture" className="aspect-square object-cover clip-diagonal w-full shadow-2xl" referrerPolicy="no-referrer" />
    </div>
    <div className="px-6 py-16 md:py-24 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-12 text-center">Бестселлеры</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
         {[1,2,3,4,5,6].map(i => (
           <div key={i} className="space-y-4 group cursor-pointer">
             <div className="overflow-hidden clip-diagonal relative">
               <img src={`./editor-chair-${i+1}.jpg`} alt="Chair" className="bg-neutral-200 aspect-square object-cover w-full grayscale contrast-125 group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
               <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">New</div>
             </div>
             <div className="flex justify-between items-end border-b border-neutral-200 pb-4">
               <div>
                  <div className="font-bold uppercase tracking-wide text-lg group-hover:text-neutral-500 transition-colors">Стул OMEGA-{i}</div>
                  <div className="text-neutral-500 font-mono text-xs">Алюминий / Кожа</div>
               </div>
               <div className="font-mono font-bold text-sm">{(i * 5 + 9.99).toFixed(3).replace('.', ' ')} ₽</div>
             </div>
           </div>
         ))}
      </div>
    </div>
    <div className="bg-onyx-950 text-white p-12 md:p-24 grid grid-cols-1 md:grid-cols-4 gap-12 mt-auto">
      <div className="col-span-1 md:col-span-2">
        <h2 className="text-3xl font-bold uppercase tracking-widest mb-6">Wood&Metal</h2>
        <p className="text-neutral-500 max-w-sm">Мы создаем мебель, которая переживет тренды. Настоящий минимализм, прочность и стиль.</p>
      </div>
       <div className="space-y-4 font-mono text-xs uppercase tracking-widest text-neutral-400">
        <div className="hover:text-white cursor-pointer transition-colors">Каталог</div>
        <div className="hover:text-white cursor-pointer transition-colors">О компании</div>
        <div className="hover:text-white cursor-pointer transition-colors">Доставка</div>
      </div>
       <div className="space-y-4 font-mono text-xs uppercase tracking-widest text-neutral-400">
        <div>hello@woodmetal.ru</div>
        <div>+7 999 000 00 00</div>
        <div>Москва, Дизайн-завод</div>
      </div>
    </div>
  </div>
);

const CourseMock = () => (
  <div className="bg-[#050505] text-white min-h-max font-sans pb-16">
     <div className="pt-24 md:pt-32 px-6 md:px-8 pb-16 md:pb-24 text-center relative overflow-hidden border-b border-white/10">
        <img src="https://loremflickr.com/1200/800/classroom?lock=12" alt="Class" className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-overlay opacity-20 pointer-events-none" referrerPolicy="no-referrer" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-block bg-white text-onyx-950 text-xs px-4 py-2 uppercase tracking-widest font-bold mb-8">Новый поток: 15 Ноября</div>
          <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tight mb-8 leading-none">Масштабирование<br/>бизнеса</h1>
          <p className="text-neutral-400 md:text-xl md:leading-relaxed mb-12 max-w-2xl mx-auto font-medium">Авторский курс по системному управлению, выстраиванию бизнес-процессов и росту ROMI. От хаоса к прозрачной системе за 8 недель.</p>
          <div className="bg-neutral-100 text-onyx-950 px-12 py-5 font-bold uppercase tracking-widest clip-diagonal inline-block hover:bg-white transition-colors cursor-pointer text-sm">Занять место на курсе</div>
        </div>
     </div>
     
     <div className="px-6 md:px-8 py-20 max-w-7xl mx-auto">
       <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-16 text-center border-b border-white/10 pb-8">Программа обучения</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { n: '01', t: 'Финансовый учет', d: 'Построение прозрачной системы финансов, P&L, Cash Flow.' },
            { n: '02', t: 'Автоматизация', d: 'Внедрение CRM, постановка задач, сквозная аналитика.' },
            { n: '03', t: 'Маркетинг', d: 'Управление трафиком, снижение стоимости лида, аналитика ROMI.' },
            { n: '04', t: 'HR и Найм', d: 'Воронка найма, мотивация сотрудников, KPI.' },
            { n: '05', t: 'Отдел Продаж', d: 'Скрипты, регламенты, контроль качества отдела.' },
            { n: '06', t: 'Масштабирование', d: 'Выход из операционки, стратегическое планирование.' },
          ].map(m => (
            <div key={m.n} className="border border-white/10 p-8 md:p-10 clip-diagonal bg-[#0a0a0a] group hover:border-white/30 transition-colors cursor-pointer">
              <div className="font-mono text-xs text-neutral-500 mb-6 border-l border-neutral-700 pl-3">Модуль {m.n}</div>
              <h3 className="font-bold text-xl md:text-2xl uppercase mb-4">{m.t}</h3>
              <p className="text-neutral-400 leading-relaxed">{m.d}</p>
            </div>
          ))}
       </div>
     </div>
     
     <div className="max-w-4xl mx-auto px-6 mt-12 bg-white/5 p-12 clip-diagonal text-center border border-white/10">
       <h2 className="text-3xl font-bold uppercase tracking-tight mb-6">Готовы к росту?</h2>
       <p className="text-neutral-400 mb-8 max-w-md mx-auto">Оставьте заявку на бесплатную диагностику вашего бизнеса перед курсом.</p>
       <input type="text" placeholder="Ваш Telegram..." className="bg-transparent border-b border-white/30 text-white p-4 w-full max-w-xs focus:outline-none focus:border-white font-mono text-center mb-8" />
       <br/>
       <button className="bg-white text-onyx-950 px-10 py-4 font-bold uppercase tracking-widest clip-diagonal hover:bg-neutral-300 transition-colors">Оставить заявку</button>
     </div>
  </div>
);

const BookingMock = () => (
   <div className="bg-[#f0ece9] text-[#2c2c2c] min-h-max font-sans pb-24">
     <header className="p-6 md:p-8 flex justify-between items-center uppercase tracking-widest font-bold text-xs border-b border-onyx-950/10 sticky top-0 bg-[#f0ece9]/90 backdrop-blur z-50">
        <span className="text-lg">The Grand Retreat</span>
        <div className="hidden md:flex gap-8 text-[10px]">
           <span className="cursor-pointer hover:underline">Villas</span>
           <span className="cursor-pointer hover:underline">Dining</span>
           <span className="cursor-pointer hover:underline">Wellness</span>
        </div>
        <span className="cursor-pointer px-6 py-3 bg-[#2c2c2c] text-white hover:bg-onyx-950 transition-colors">Book Now</span>
     </header>
     <div className="p-4 md:p-8 max-w-[1600px] mx-auto">
        <div className="h-[60vh] md:h-[80vh] border border-onyx-950/10 flex items-end p-8 md:p-16 relative overflow-hidden bg-[#2c2c2c]">
           <img src="https://loremflickr.com/1200/800/resort,pool?lock=13" alt="Resort" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 hover:scale-105 transition-transform duration-[20s]" referrerPolicy="no-referrer" />
           <div className="relative z-10 w-full">
               <h1 className="text-6xl md:text-[120px] font-light uppercase tracking-widest text-white drop-shadow-lg leading-none mb-4">Unwind.</h1>
               <div className="w-1/3 h-[1px] bg-white/50 mb-8"></div>
           </div>
        </div>
        <div className="bg-white p-8 md:p-12 shadow-2xl max-w-5xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 items-end -mt-16 md:-mt-24">
           <div className="md:col-span-1">
              <div className="text-[10px] uppercase text-neutral-500 font-bold mb-2 tracking-widest">Check in</div>
              <div className="border-b border-onyx-950/20 pb-2 text-lg font-medium cursor-pointer hover:border-onyx-950 transition-colors">12.05.2026</div>
           </div>
           <div className="md:col-span-1">
              <div className="text-[10px] uppercase text-neutral-500 font-bold mb-2 tracking-widest">Check out</div>
              <div className="border-b border-onyx-950/20 pb-2 text-lg font-medium cursor-pointer hover:border-onyx-950 transition-colors">18.05.2026</div>
           </div>
           <div className="md:col-span-1">
              <div className="text-[10px] uppercase text-neutral-500 font-bold mb-2 tracking-widest">Guests</div>
              <div className="border-b border-onyx-950/20 pb-2 text-lg font-medium cursor-pointer hover:border-onyx-950 transition-colors">2 Adults</div>
           </div>
           <button className="md:col-span-1 bg-[#2c2c2c] text-white py-5 uppercase tracking-widest text-[10px] font-bold w-full hover:bg-onyx-950 transition-colors">Search</button>
        </div>
     </div>
     
     <div className="max-w-7xl mx-auto px-6 md:px-8 mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center">
       <div>
         <h2 className="text-3xl md:text-5xl font-light uppercase tracking-widest mb-8 leading-tight">A Sanctuary<br/>of Minimalism</h2>
         <p className="text-lg text-[#2c2c2c]/70 leading-relaxed font-serif italic mb-8">"Rediscover yourself in a space where architecture meets untouched nature. Every detail is curated for perfect stillness."</p>
         <button className="border-b border-[#2c2c2c] pb-1 uppercase text-xs font-bold tracking-widest hover:text-[#2c2c2c]/50 transition-colors">Discover Philosophy</button>
       </div>
       <img src="https://loremflickr.com/800/1000/villa,interior?lock=14" alt="Villa" className="w-full aspect-[4/5] object-cover shadow-xl" referrerPolicy="no-referrer" />
     </div>
  </div>
);

const ConsultingMock = () => (
  <div className="bg-white text-violet-950 min-h-max font-sans flex flex-col box-border border-[12px] border-violet-950/5 p-4 md:p-8">
     <nav className="p-6 border-b-2 border-violet-950/10 flex justify-between items-center font-black uppercase tracking-tight text-violet-950 mb-8 sticky top-0 bg-white/95 backdrop-blur z-50">
       <span className="text-2xl">Apex Consulting</span>
       <div className="hidden md:flex gap-8 text-xs tracking-widest">
         <span className="cursor-pointer hover:text-violet-700 transition-colors">Экспертиза</span>
         <span className="cursor-pointer hover:text-violet-700 transition-colors">Кейсы</span>
         <span className="cursor-pointer hover:text-violet-700 transition-colors">О Нас</span>
       </div>
     </nav>
     
     <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 border-2 border-violet-950/10 mb-12">
        <div className="p-12 md:p-24 flex flex-col justify-center lg:border-r-2 border-violet-950/10 relative overflow-hidden">
           <img src="https://loremflickr.com/1200/800/business,meeting?lock=15" alt="Consulting" className="absolute inset-0 w-full h-full object-cover grayscale opacity-5 mix-blend-multiply pointer-events-none" referrerPolicy="no-referrer"/>
           <div className="relative z-10">
             <div className="text-violet-700 font-bold uppercase tracking-widest text-xs mb-8">Стратегическое партнерство</div>
             <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] mb-8 text-violet-950">Решения для<br/>Лидеров<br/>Рынка</h1>
             <p className="text-violet-950/70 font-medium mb-12 text-lg md:text-xl max-w-md leading-relaxed">Системный аудит, оптимизация процессов и M&A консалтинг от экспертов с 15-летним опытом.</p>
             <button className="bg-violet-700 text-white px-8 py-5 w-max shadow-[6px_6px_0_theme(colors.violet.900)] hover:shadow-none hover:translate-x-1 border border-violet-950 hover:translate-y-1 transition-all text-xs font-bold uppercase tracking-widest">Бесплатный аудит</button>
           </div>
        </div>
        <div className="p-12 md:p-24 bg-violet-50/50 flex flex-col justify-center gap-12 md:gap-16">
           <div className="border-l-4 border-violet-700 pl-6 transform md:-translate-x-6 bg-white p-8 shadow-sm">
             <div className="text-5xl md:text-7xl font-black text-violet-950 mb-2">2.5x</div>
             <div className="uppercase font-bold text-xs text-violet-950/60 tracking-widest">Средний рост выручки (YoY)</div>
           </div>
           <div className="border-l-4 border-violet-700 pl-6 transform md:-translate-x-6 bg-white p-8 shadow-sm">
             <div className="text-5xl md:text-7xl font-black text-violet-950 mb-2">Top 10</div>
             <div className="uppercase font-bold text-xs text-violet-950/60 tracking-widest">В национальном рейтинге консалтинга</div>
           </div>
           <div className="border-l-4 border-violet-700 pl-6 transform md:-translate-x-6 bg-white p-8 shadow-sm">
             <div className="text-5xl md:text-7xl font-black text-violet-950 mb-2">$500M+</div>
             <div className="uppercase font-bold text-xs text-violet-950/60 tracking-widest">Объем сопровожденных сделок</div>
           </div>
        </div>
     </div>
  </div>
);

const PsychologistMock = () => (
  <div className="bg-[#FAF9F7] text-[#4A4743] min-h-max font-serif">
     <nav className="p-8 flex justify-center border-b border-[#E5E2DC] sticky top-0 bg-[#FAF9F7]/95 backdrop-blur z-50">
       <span className="font-sans text-xs uppercase tracking-[0.3em] font-bold text-[#8C877D]">Анна Смирнова • Психотерапия</span>
     </nav>
     
     <div className="max-w-4xl mx-auto py-24 px-6 md:px-8 text-center space-y-12">
        <img src="https://loremflickr.com/400/400/portrait,professional?lock=16" alt="Portrait" className="w-32 h-32 md:w-48 md:h-48 rounded-full mx-auto shadow-xl object-cover grayscale mb-12" referrerPolicy="no-referrer" />
        <h1 className="text-5xl md:text-6xl italic text-[#2C2A28] leading-tight max-w-3xl mx-auto">Пространство для диалога<br/>и внутренних трансформаций</h1>
        <div className="h-[1px] bg-[#E5E2DC] w-1/3 mx-auto my-12"></div>
        <p className="text-xl md:text-2xl leading-relaxed text-[#6E6A62] italic max-w-2xl mx-auto">
          "В бережной и безопасной атмосфере я помогаю найти внутреннюю опору, справиться с тревогой и выстроить честные отношения с собой."
        </p>
     </div>
     
     <div className="bg-white py-24 px-6">
       <div className="max-w-5xl mx-auto">
         <h2 className="text-2xl font-sans uppercase tracking-[0.2em] font-bold text-center mb-16 text-[#2C2A28]">Направления работы</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-sans text-xs uppercase tracking-widest leading-relaxed">
            <div className="border border-[#E5E2DC] p-10 hover:shadow-lg transition-all cursor-pointer bg-[#FAF9F7]/50 text-center flex flex-col h-full group">
              <div className="flex-grow">
                <div className="text-lg font-bold text-[#2C2A28] mb-4 group-hover:text-[#8C877D] transition-colors">Индивидуальная<br/>терапия</div>
                <div className="text-[#8C877D] normal-case tracking-normal mb-8 text-sm group-hover:opacity-80">Глубинная работа с тревожными расстройствами, депрессией, поиском смыслов.</div>
              </div>
              <div className="text-[#2C2A28] font-bold border-t border-[#E5E2DC] pt-4">5000 ₽ / час</div>
            </div>
            <div className="border border-[#E5E2DC] p-10 hover:shadow-lg transition-all cursor-pointer bg-[#FAF9F7]/50 text-center flex flex-col h-full group">
              <div className="flex-grow">
                <div className="text-lg font-bold text-[#2C2A28] mb-4 group-hover:text-[#8C877D] transition-colors">Парные<br/>консультации</div>
                <div className="text-[#8C877D] normal-case tracking-normal mb-8 text-sm group-hover:opacity-80">Преодоление кризисов в отношениях, восстановление коммуникации и доверия.</div>
              </div>
              <div className="text-[#2C2A28] font-bold border-t border-[#E5E2DC] pt-4">8000 ₽ / 1.5 часа</div>
            </div>
            <div className="border border-[#E5E2DC] p-10 hover:shadow-lg transition-all cursor-pointer bg-[#FAF9F7]/50 text-center flex flex-col h-full group">
              <div className="flex-grow">
                <div className="text-lg font-bold text-[#2C2A28] mb-4 group-hover:text-[#8C877D] transition-colors">Групповая<br/>терапия</div>
                <div className="text-[#8C877D] normal-case tracking-normal mb-8 text-sm group-hover:opacity-80">Безопасное пространство для исследования себя через взаимодействие с другими.</div>
              </div>
              <div className="text-[#2C2A28] font-bold border-t border-[#E5E2DC] pt-4">3000 ₽ / сессия</div>
            </div>
         </div>
         
         <div className="mt-20 text-center">
           <button className="bg-[#4A4743] text-[#FAF9F7] px-12 py-5 uppercase tracking-[0.2em] text-xs max-w-sm mx-auto hover:bg-[#2C2A28] transition-colors font-sans font-bold w-full">Записаться на прием</button>
         </div>
       </div>
     </div>
  </div>
);

const SmmMock = () => (
   <div className="bg-[#ebff00] text-onyx-950 min-h-max font-sans uppercase font-black tracking-tight pb-24">
     <nav className="p-6 md:p-8 flex justify-between items-center border-b-[6px] border-onyx-950 text-2xl md:text-3xl bg-onyx-950 text-[#ebff00] sticky top-0 z-50">
       <span>VIRAL_</span>
       <span className="text-sm font-sans font-bold tracking-widest border border-[#ebff00] px-4 py-2 rounded-full cursor-pointer hover:bg-[#ebff00] hover:text-onyx-950 transition-colors">СВЯЗАТЬСЯ</span>
     </nav>
     
     <div className="p-6 md:p-12 text-6xl lg:text-[140px] leading-[0.85] mt-12 mb-20 break-words">
        МЫ ДЕЛАЕМ<br/>
        ВАШ БРЕНД<br/>
        <span className="text-white drop-shadow-[4px_4px_0_black]">ЗАМЕТНЫМ.</span>
     </div>
     
     <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-white text-3xl mb-20">
        <div className="bg-onyx-950 aspect-square p-8 flex flex-col justify-between clip-diagonal hover:scale-[1.03] cursor-pointer transition-transform relative overflow-hidden group">
           <img src="https://loremflickr.com/600/400/social,marketing?lock=17" alt="Social" className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-50 transition-all pointer-events-none" referrerPolicy="no-referrer" />
           <span className="text-5xl text-[#ebff00] relative z-10">#</span>
           <span className="tracking-widest relative z-10 text-4xl">REELS &<br/>TIKTOK</span>
        </div>
        <div className="bg-purple-600 aspect-square p-8 flex flex-col justify-between shadow-[16px_16px_0_black] hover:translate-x-2 hover:translate-y-2 hover:shadow-[0_0_0_black] transition-all cursor-pointer border-[6px] border-onyx-950 relative">
           <span className="tracking-widest text-4xl">STORIES<br/>MAKING</span>
           <div className="text-[#ebff00] text-lg font-sans font-bold normal-case tracking-normal max-w-[200px]">Прогревы, сценарии и вовлечение аудитории x3.</div>
        </div>
        <div className="bg-onyx-950 aspect-square p-8 flex flex-col justify-between rounded-[60px] hover:rounded-[10px] transition-all duration-300 cursor-pointer text-[#ebff00] border-[6px] border-onyx-950">
           <span className="tracking-widest text-4xl">TG<br/>CHANNELS</span>
           <span className="text-6xl self-end">↗</span>
        </div>
     </div>
     
     <div className="px-6 md:px-12">
        <div className="bg-onyx-950 text-white p-12 lg:p-24 border-[12px] border-white outline outline-8 outline-black">
           <h2 className="text-5xl md:text-7xl mb-12">ХВАТИТ ДЕЛАТЬ СКУЧНО.</h2>
           <button className="bg-[#ebff00] text-onyx-950 w-full py-8 text-3xl md:text-5xl hover:bg-white hover:shadow-[0_0_50px_rgba(255,255,255,0.8)] transition-all rounded-[100px] border-4 border-transparent hover:border-onyx-950 cursor-pointer">ЗАПУСТИТЬ ТРАФИК</button>
        </div>
     </div>
  </div>
);

const TemplateSwitcher = ({ name }: { name: string }) => {
  switch(name) {
    case 'Мебельный магазин': return <FurnitureMock />;
    case 'Инфобизнес / Курсы': return <CourseMock />;
    case 'Отели и Аренда': return <BookingMock />;
    case 'Консалтинг': return <ConsultingMock />;
    case 'Услуги Психолога': return <PsychologistMock />;
    case 'SMM Агентство': return <SmmMock />;
    default: return <div className="text-center p-8 bg-onyx-950 text-white h-full flex flex-col items-center justify-center font-mono"><div className="text-4xl mb-4">404</div>Шаблон не найден</div>;
  }
}

export default function EditorSimulator({ templateName, onClose }: { templateName: string, onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(true);
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [activeTool, setActiveTool] = useState('Блоки');
  const [isEditMode, setIsEditMode] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [templateName]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleToolClick = (tool: string) => {
    setActiveTool(tool);
    showToast(`Инструмент "${tool}" выбран. Кастомизация активна.`);
  };

  const handlePreviewClick = (e: React.MouseEvent) => {
    if (isEditMode) {
      handleToolClick('Выбор элемента');
      return;
    }
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.closest('button')) {
       showToast(`✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.`);
    } else if (target.tagName === 'A' || target.closest('span.cursor-pointer') || target.closest('.cursor-pointer')) {
       showToast(`Переход на другую страницу...`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-onyx-950/90 backdrop-blur-md">
       <div className="relative w-full h-full max-w-[1800px] max-h-[98vh] border border-onyx-700 bg-onyx-900 flex flex-col shadow-2xl rounded-sm overflow-hidden">
         {/* Toast Notification */}
         {toastMessage && (
           <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white text-onyx-950 px-6 py-4 font-bold uppercase tracking-widest text-xs clip-diagonal z-[9999] shadow-2xl animate-in fade-in slide-in-from-bottom-4">
             {toastMessage}
           </div>
         )}

         {/* Window Header */}
         <div className="h-12 border-b border-onyx-700 bg-onyx-950 flex items-center justify-between px-4 shrink-0 transition-colors">
           <div className="text-[10px] sm:text-xs font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-3 sm:gap-4">
             <div className="flex gap-1.5 sm:gap-2">
               <div className="w-2.5 h-2.5 rounded-full bg-onyx-700"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-onyx-700"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-onyx-700"></div>
             </div>
             <span className="hidden md:inline text-neutral-700">onyx_editor // {isEditMode ? 'edit_mode' : 'live_preview'}</span>
             <span className="w-32 md:w-auto truncate text-white">{templateName}</span>
           </div>
           <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors bg-onyx-800 p-1.5 rounded-full hover:bg-red-500/80 hover:text-white">
             <X size={16} />
           </button>
         </div>

         {/* Content Area */}
         {isLoading ? (
            <div className="flex-grow flex items-center justify-center industrial-grid relative overflow-hidden bg-onyx-900">
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-onyx-900/50 to-onyx-900 pointer-events-none" />
               <div className="text-center space-y-6 relative z-10 p-8">
                  <div className="w-16 h-16 border-2 border-dashed border-onyx-600 rounded-full animate-[spin_3s_linear_infinite] border-t-white mx-auto mb-6"></div>
                  <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-widest text-white">Инициализация среды</h3>
                  <p className="text-white font-mono text-xs sm:text-sm uppercase tracking-widest bg-onyx-800 inline-block px-4 py-2 clip-diagonal">
                    {isEditMode ? 'Загрузка редактора' : 'Запуск Live версии'}
                  </p>
               </div>
            </div>
         ) : (
            <div className="flex h-full w-full bg-onyx-950 overflow-hidden select-none relative transition-all">
               {/* Sidebar Tools - Only show in Edit Mode */}
               {isEditMode && (
                 <div className="w-16 sm:w-20 md:w-64 border-r border-onyx-800 bg-onyx-900 flex flex-col shrink-0 z-20 shadow-xl animate-in fade-in slide-in-from-left-4">
                   <div className="h-12 border-b border-onyx-800 hidden md:flex items-center justify-start px-6 shrink-0">
                     <span className="font-bold uppercase tracking-widest text-xs text-neutral-400">Панель управления</span>
                   </div>
                   <div className="flex-grow flex flex-col py-4 gap-2 px-2 md:px-4 overflow-y-auto">
                      <EditorButton icon={<Layout size={20} />} label="Блоки" active={activeTool === 'Блоки'} onClick={() => handleToolClick('Блоки')} />
                      <EditorButton icon={<Type size={20} />} label="Текст" active={activeTool === 'Текст'} onClick={() => handleToolClick('Текст')} />
                      <EditorButton icon={<Palette size={20} />} label="Стиль" active={activeTool === 'Стиль'} onClick={() => handleToolClick('Стиль')} />
                      <EditorButton icon={<MousePointer2 size={20} />} label="Экшены" active={activeTool === 'Экшены'} onClick={() => handleToolClick('Экшены')} />
                      <div className="my-2 border-b border-onyx-800"></div>
                      <EditorButton icon={<Settings size={20} />} label="Настройки" active={activeTool === 'Настройки'} onClick={() => handleToolClick('Настройки')} />
                   </div>
                   <div className="p-4 border-t border-onyx-800 flex flex-col gap-3">
                      <button onClick={onClose} className="w-full bg-onyx-700 text-white font-mono uppercase tracking-widest text-[9px] sm:text-[10px] py-4 clip-diagonal hover:bg-onyx-600 transition-colors">Закрыть</button>
                      <button onClick={() => showToast("Сохранение недоступно в режиме демонстрации шаблонов.")} className="w-full bg-white text-onyx-950 font-bold uppercase tracking-widest text-[9px] sm:text-xs py-4 clip-diagonal hover:bg-neutral-300 transition-colors hidden md:block">Сохранить</button>
                   </div>
                 </div>
               )}

               {/* Main Work Area */}
               <div className="flex-grow flex flex-col min-w-0 bg-[#050505]">
                 {/* Top Toolbar */}
                 <div className="h-12 border-b border-onyx-800 flex items-center justify-between px-4 sm:px-6 shrink-0 bg-onyx-900 relative z-10 shadow-md">
                   <div className="flex gap-2 sm:gap-4 justify-start w-auto">
                     <button onClick={() => setDevice('desktop')} className={`px-4 py-1.5 transition-colors rounded-sm flex items-center gap-2 ${device === 'desktop' ? 'bg-onyx-800 text-white' : 'text-neutral-500 hover:text-white hover:bg-onyx-800/50'}`}>
                       <Monitor size={18} /> <span className="hidden lg:inline text-[10px] font-bold uppercase tracking-widest">Desktop</span>
                     </button>
                     <button onClick={() => setDevice('mobile')} className={`px-4 py-1.5 transition-colors rounded-sm flex items-center gap-2 ${device === 'mobile' ? 'bg-onyx-800 text-white' : 'text-neutral-500 hover:text-white hover:bg-onyx-800/50'}`}>
                       <Smartphone size={18} /> <span className="hidden lg:inline text-[10px] font-bold uppercase tracking-widest">Mobile</span>
                     </button>
                   </div>
                   
                   <div className="flex items-center gap-4">
                     {!isEditMode ? (
                        <button onClick={() => setIsEditMode(true)} className="bg-white text-onyx-950 px-6 py-1.5 text-[10px] font-bold uppercase tracking-widest clip-diagonal hover:bg-neutral-300 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)] animate-pulse hover:animate-none flex items-center gap-2">
                          <Layout size={14} /> Кастомизировать
                        </button>
                     ) : (
                        <button onClick={() => setIsEditMode(false)} className="bg-onyx-700 text-white px-6 py-1.5 text-[10px] font-bold uppercase tracking-widest clip-diagonal hover:bg-onyx-600 transition-colors flex items-center gap-2">
                          Предпросмотр
                        </button>
                     )}
                   </div>
                 </div>

                 {/* Canvas Workspace */}
                 <div className="flex-grow overflow-auto flex items-start sm:items-center justify-center p-0 pt-12 sm:pt-4 sm:p-8 relative industrial-grid bg-onyx-950 scroll-smooth">
                    <div className={`shadow-2xl transition-all duration-500 bg-white overflow-y-auto overflow-x-hidden ${device === 'desktop' ? 'w-full h-full max-w-[1920px] shadow-black/50' : 'w-[320px] sm:w-[375px] h-[650px] sm:h-[812px] mt-4 sm:mt-0 rounded-[40px] border-[12px] border-onyx-800 relative shadow-black/80'}`}>
                       {device === 'mobile' && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-onyx-800 rounded-b-2xl z-50"></div>}
                       
                       {/* Interactive Area */}
                       <div className={`min-h-full w-full relative ${isEditMode ? 'group cursor-crosshair' : ''}`} onClick={handlePreviewClick}>
                          <TemplateSwitcher name={templateName} />
                          
                          {/* Hover Editor Overlay Lines (Only in Edit Mode) */}
                          {isEditMode && (
                            <>
                              <div className="absolute inset-0 pointer-events-none z-[60] bg-[linear-gradient(rgba(124,58,237,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.1)_1px,transparent_1px)] bg-[size:100px_100px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-violet-600 pointer-events-none transition-colors duration-300 z-[70] opacity-0 group-hover:opacity-100 flex items-start justify-end">
                                 <div className="bg-violet-700 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 shadow-lg flex items-center gap-2 m-2">
                                   <Layout size={14} /> Редактировать
                                 </div>
                              </div>
                              <div className="absolute inset-0 z-50 cursor-crosshair bg-transparent"></div>
                            </>
                          )}
                       </div>
                    </div>
                 </div>
               </div>
            </div>
         )}
       </div>
    </div>
  )
}

const EditorButton = ({ icon, label, active = false, onClick }: any) => (
  <button onClick={onClick} className={`flex items-center justify-center md:justify-start gap-3 p-3 md:p-4 transition-colors rounded-sm cursor-pointer ${active ? 'bg-onyx-800 text-white border-l-2 border-white' : 'text-neutral-500 hover:text-white hover:bg-onyx-800 border-l-2 border-transparent'}`}>
     {icon}
     <span className="hidden md:inline text-[10px] font-bold uppercase tracking-widest">{label}</span>
  </button>
)
