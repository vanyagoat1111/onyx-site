import React, { useState, useEffect } from 'react';
import { Layout, Type, Palette, Monitor, Smartphone, Settings, MousePointer2, X } from 'lucide-react';

// === MOCK TEMPLATES ===

const FurnitureMock = () => (
  <div className="bg-white text-black min-h-full flex flex-col font-sans">
    <nav className="p-6 flex justify-between items-center border-b border-neutral-200">
       <span className="font-bold uppercase tracking-widest">Wood&Metal</span>
       <div className="hidden md:flex space-x-6 text-sm font-medium"><span className="cursor-pointer">Стулья</span><span className="cursor-pointer">Столы</span><span className="cursor-pointer">Корзина (0)</span></div>
       <div className="md:hidden font-bold">MENU</div>
    </nav>
    <div className="px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-neutral-100 mb-12">
       <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-none">Коллекция<br/>Авангард</h1>
          <p className="text-neutral-500">Минимализм в каждой детали. Инновационные формы и дорогие текстуры.</p>
          <button className="bg-black text-white px-8 py-3 font-bold uppercase text-sm clip-diagonal">В каталог</button>
       </div>
       <img src="https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=1000&auto=format&fit=crop" alt="Furniture" className="aspect-square object-cover clip-diagonal hidden md:flex w-full" referrerPolicy="no-referrer" />
    </div>
    <div className="px-6 grid grid-cols-2 md:grid-cols-3 gap-6 pb-12">
       {[1,2,3].map(i => (
         <div key={i} className="space-y-3">
           <img src={`https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=500&auto=format&fit=crop&sig=${i}`} alt="Chair" className="bg-neutral-200 aspect-[3/4] object-cover clip-diagonal w-full grayscale contrast-125" referrerPolicy="no-referrer" />
           <div className="font-bold uppercase tracking-wide text-sm">Стул OMEGA-{i}</div>
           <div className="text-neutral-500 font-mono text-xs">12 990 ₽</div>
         </div>
       ))}
    </div>
  </div>
);

const CourseMock = () => (
  <div className="bg-[#050505] text-white min-h-full font-sans pb-16">
     <div className="pt-16 md:pt-24 px-6 md:px-8 pb-12 md:pb-16 text-center border-b border-white/10 max-w-3xl mx-auto relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2500&auto=format&fit=crop" alt="Class" className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-overlay opacity-20 pointer-events-none" referrerPolicy="no-referrer" />
        <div className="relative z-10">
          <div className="inline-block bg-white/10 text-xs px-3 py-1 uppercase tracking-widest mb-6 backdrop-blur-sm">Новый поток</div>
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6 text-white">Масштабирование<br/>бизнеса</h1>
          <p className="text-neutral-400 mb-8 max-w-md mx-auto">Авторский курс по системному управлению и увеличению ROMI.</p>
          <div className="bg-white text-black px-8 py-4 font-bold uppercase tracking-widest clip-diagonal inline-block text-sm cursor-pointer hover:bg-neutral-300 transition-colors">Занять место</div>
        </div>
     </div>
     <div className="px-6 md:px-8 mt-12 md:mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-white/10 p-6 md:p-8 clip-diagonal bg-[#111]">
          <div className="font-mono text-xs text-neutral-500 mb-4">Модуль 01</div>
          <h3 className="font-bold text-lg md:text-xl uppercase mb-2">Финансовый учет</h3>
          <p className="text-neutral-400 text-xs md:text-sm">Построение прозрачной системы</p>
        </div>
        <div className="border border-white/10 p-6 md:p-8 clip-diagonal bg-[#111]">
          <div className="font-mono text-xs text-neutral-500 mb-4">Модуль 02</div>
          <h3 className="font-bold text-lg md:text-xl uppercase mb-2">Автоматизация</h3>
          <p className="text-neutral-400 text-xs md:text-sm">CRM и сквозная аналитика данных</p>
        </div>
     </div>
  </div>
);

const BookingMock = () => (
  <div className="bg-[#f0ece9] text-[#2c2c2c] min-h-full font-sans">
     <header className="p-4 md:p-6 flex justify-between uppercase tracking-widest font-bold text-xs border-b border-black/5">
        <span>The Grand Retreat</span>
        <span className="cursor-pointer hover:underline">Book Now</span>
     </header>
     <div className="p-4 md:p-6">
        <div className="h-[30vh] md:h-[40vh] border border-black/10 flex items-end p-6 md:p-8 mb-[-30px] relative z-0 overflow-hidden bg-[#2c2c2c]">
           <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2500&auto=format&fit=crop" alt="Resort" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60" referrerPolicy="no-referrer" />
           <h1 className="relative z-10 text-4xl md:text-7xl font-light uppercase tracking-widest text-white drop-shadow-md">Unwind.</h1>
        </div>
        <div className="bg-white p-4 md:p-6 shadow-xl max-w-3xl mx-auto relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 items-end">
           <div>
              <div className="text-[10px] uppercase text-neutral-500 font-bold mb-1">Check in</div>
              <div className="border-b border-black/20 pb-2 text-sm font-medium">12.05.2026</div>
           </div>
           <div>
              <div className="text-[10px] uppercase text-neutral-500 font-bold mb-1">Check out</div>
              <div className="border-b border-black/20 pb-2 text-sm font-medium">18.05.2026</div>
           </div>
           <button className="bg-[#2c2c2c] text-white py-3 uppercase tracking-widest text-[10px] font-bold w-full hover:bg-black transition-colors">Search</button>
        </div>
     </div>
     <div className="mt-12 text-center text-xs uppercase tracking-widest text-[#2c2c2c]/50 font-bold">A sanctuary of minimalism</div>
  </div>
);

const ConsultingMock = () => (
  <div className="bg-white text-blue-950 min-h-[100%] h-full font-sans flex flex-col box-border border-4 md:border-8 border-blue-950/5">
     <nav className="p-4 md:p-8 border-b-2 border-blue-900/10 flex justify-between items-center font-black uppercase tracking-tighter text-blue-900">
       <span className="text-lg md:text-xl">Apex Consulting</span>
       <span className="text-xs tracking-widest cursor-pointer hover:underline">О Нас</span>
     </nav>
     <div className="flex-grow grid grid-cols-1 lg:grid-cols-2">
        <div className="p-8 md:p-16 flex flex-col justify-center border-b-2 lg:border-b-0 lg:border-r-2 border-blue-900/10">
           <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none mb-6 text-blue-950">Решения для<br/>Лидеров Рынка</h1>
           <p className="text-blue-950/60 font-medium mb-8 text-sm md:text-base">Стратегический консалтинг и аудит бизнес-процессов.</p>
           <button className="bg-blue-600 text-white px-6 md:px-8 py-3 w-max shadow-[4px_4px_0_theme(colors.blue.200)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-xs font-bold uppercase tracking-widest">Консультация</button>
        </div>
        <div className="p-8 md:p-16 bg-blue-50 flex flex-col justify-center gap-6 md:gap-8">
           <div className="border-l-4 border-blue-600 pl-4 md:pl-6 transform md:-translate-x-4">
             <div className="text-3xl md:text-4xl font-black text-blue-900 mb-1">2.5x</div>
             <div className="uppercase font-bold text-[10px] md:text-xs text-blue-950/50 tracking-widest">Средний рост выручки клиентов</div>
           </div>
           <div className="border-l-4 border-blue-600 pl-4 md:pl-6 transform md:-translate-x-4">
             <div className="text-3xl md:text-4xl font-black text-blue-900 mb-1">Top 10</div>
             <div className="uppercase font-bold text-[10px] md:text-xs text-blue-950/50 tracking-widest">В рейтинге экспертов индустрии</div>
           </div>
        </div>
     </div>
  </div>
);

const PsychologistMock = () => (
  <div className="bg-[#FAF9F7] text-[#4A4743] min-h-full font-serif flex flex-col items-center justify-center">
     <div className="max-w-2xl mx-auto py-12 md:py-16 px-6 md:px-8 text-center space-y-6 md:space-y-8">
        <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" alt="Portrait" className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto shadow-inner object-cover grayscale" referrerPolicy="no-referrer" />
        <h1 className="text-3xl md:text-4xl italic text-[#2C2A28]">Анна Смирнова</h1>
        <p className="text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#8C877D]">Клинический психолог</p>
        <div className="h-[1px] bg-[#E5E2DC] w-1/2 mx-auto my-6 md:my-8"></div>
        <p className="text-base md:text-lg leading-relaxed text-[#6E6A62] italic max-w-md mx-auto">
          "Помогаю найти внутреннюю опору, справиться с тревогой и выстроить гармоничные отношения с собой и миром."
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 font-sans text-xs uppercase tracking-widest">
           <div className="border border-[#E5E2DC] p-6 bg-white hover:shadow-md transition-shadow cursor-pointer">Индивидуальная<br/>терапия</div>
           <div className="border border-[#E5E2DC] p-6 bg-white hover:shadow-md transition-shadow cursor-pointer">Парные<br/>консультации</div>
        </div>
        <button className="mt-8 bg-[#4A4743] text-[#FAF9F7] px-8 py-4 uppercase tracking-[0.2em] text-[10px] w-full max-w-xs mx-auto hover:bg-[#2C2A28] transition-colors font-sans font-bold">Записаться на прием</button>
     </div>
  </div>
);

const SmmMock = () => (
  <div className="bg-[#ebff00] text-black min-h-full font-sans uppercase font-black tracking-tighter">
     <nav className="p-4 flex justify-between border-b-4 border-black text-lg md:text-xl">
       <span>VIRAL_</span>
       <span>AGENCY</span>
     </nav>
     <div className="p-4 md:p-8 text-4xl sm:text-5xl md:text-7xl leading-[0.9] mt-4 md:mt-8">
        Мы делаем<br/>
        Ваш бренд<br/>
        Заметным.
     </div>
     <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-white text-xl md:text-2xl mt-4">
        <div className="bg-black aspect-square max-h-[250px] p-6 flex flex-col justify-between clip-diagonal hover:scale-[1.02] cursor-pointer transition-transform">
           <span className="text-3xl md:text-4xl text-[#ebff00]">#</span>
           <span className="tracking-widest">REELS</span>
        </div>
        <div className="bg-purple-600 aspect-square max-h-[250px] p-6 flex flex-col justify-between shadow-[6px_6px_0_black] hover:translate-x-1 hover:translate-y-1 transition-transform cursor-pointer border-2 border-black">
           <span className="tracking-widest">STORIES</span>
           <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-white flex items-center justify-center text-xl">+</div>
        </div>
     </div>
     <div className="p-4 mt-4 md:mt-8">
        <button className="bg-black text-[#ebff00] w-full py-5 md:py-6 text-2xl md:text-3xl hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all rounded-3xl border-2 border-transparent hover:border-black">НАЧАТЬ</button>
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
    default: return <div className="text-center p-8 bg-black text-white h-full flex items-center justify-center font-mono">Шаблон не найден</div>;
  }
}

// === MAIN EDITOR COMPONENT ===

export default function EditorSimulator({ templateName, onClose }: { templateName: string, onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(true);
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    // Artificial delay to simulate editor loading
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [templateName]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md">
       <div className="relative w-full h-full max-w-[1400px] max-h-[90vh] border border-onyx-700 bg-onyx-900 flex flex-col shadow-2xl rounded-sm overflow-hidden">
         {/* Window Header */}
         <div className="h-12 border-b border-onyx-700 bg-onyx-950 flex items-center justify-between px-4 shrink-0">
           <div className="text-[10px] sm:text-xs font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-3 sm:gap-4">
             <div className="flex gap-1.5 sm:gap-2">
               <div className="w-2.5 h-2.5 rounded-full bg-onyx-700"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-onyx-700"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-onyx-700"></div>
             </div>
             <span className="hidden sm:inline">onyx_editor // {templateName}</span>
             <span className="sm:hidden w-32 truncate">{templateName}</span>
           </div>
           <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors bg-onyx-800 p-1.5 rounded-full hover:bg-red-500/20">
             <X size={16} />
           </button>
         </div>

         {/* Content Area */}
         {isLoading ? (
            <div className="flex-grow flex items-center justify-center industrial-grid relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-onyx-900/50 to-onyx-900 pointer-events-none" />
               <div className="text-center space-y-6 relative z-10 p-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-dashed border-onyx-700 rounded-full animate-[spin_3s_linear_infinite] border-t-white mx-auto mb-6 sm:mb-8"></div>
                  <h3 className="text-xl sm:text-3xl font-bold uppercase tracking-widest text-white">Инициализация среды</h3>
                  <p className="text-white font-mono text-[10px] sm:text-sm uppercase tracking-widest bg-onyx-800 inline-block px-3 sm:px-4 py-2 clip-diagonal">
                    Модуль: {templateName}
                  </p>
               </div>
            </div>
         ) : (
            <div className="flex h-full w-full bg-onyx-950 overflow-hidden select-none relative">
               {/* Sidebar */}
               <div className="w-14 sm:w-16 md:w-64 border-r border-onyx-800 bg-onyx-900 flex flex-col shrink-0 z-20 shadow-xl">
                 <div className="h-12 border-b border-onyx-800 hidden md:flex items-center justify-start px-4 shrink-0">
                   <span className="font-bold uppercase tracking-widest text-xs text-neutral-400">Инструменты</span>
                 </div>
                 <div className="flex-grow flex flex-col py-4 gap-1 sm:gap-2 px-1 sm:px-2 md:px-4 overflow-y-auto">
                    <EditorButton icon={<Layout size={18} />} label="Блоки" active />
                    <EditorButton icon={<Type size={18} />} label="Текст" />
                    <EditorButton icon={<Palette size={18} />} label="Стиль" />
                    <EditorButton icon={<MousePointer2 size={18} />} label="Экшены" />
                    <div className="my-2 border-b border-onyx-800"></div>
                    <EditorButton icon={<Settings size={18} />} label="Опции" />
                 </div>
                 <div className="p-2 sm:p-4 border-t border-onyx-800 flex flex-col gap-2">
                    <button onClick={onClose} className="w-full bg-onyx-800 text-white font-mono uppercase tracking-widest text-[9px] sm:text-[10px] py-3 md:py-3 clip-diagonal hover:bg-neutral-800 transition-colors">Выйти</button>
                    <button onClick={() => alert("Внешнее сохранение недоступно в демо-режиме.")} className="w-full bg-white text-black font-bold uppercase tracking-widest text-[9px] sm:text-xs py-3 md:py-3 clip-diagonal hover:bg-neutral-300 transition-colors hidden md:block">Сохранить</button>
                 </div>
               </div>

               {/* Main Work Area */}
               <div className="flex-grow flex flex-col min-w-0 bg-[#0a0a0a]">
                 {/* Toolbar */}
                 <div className="h-12 border-b border-onyx-800 flex items-center justify-between px-2 sm:px-4 shrink-0 bg-onyx-900 absolute top-0 left-0 right-0 z-10 sm:relative">
                   <div className="hidden sm:block text-[10px] sm:text-xs font-mono text-neutral-500 uppercase tracking-widest truncate max-w-[200px] sm:max-w-none">
                      / {templateName} / layout
                   </div>
                   <div className="flex gap-1 sm:gap-2 sm:ml-auto w-full justify-center sm:justify-start sm:w-auto">
                     <button onClick={() => setDevice('desktop')} className={`p-1.5 sm:p-2 transition-colors rounded-sm ${device === 'desktop' ? 'bg-onyx-800 text-white' : 'text-neutral-500 hover:text-white hover:bg-onyx-800/50'}`}>
                       <Monitor size={16} className="sm:w-[18px] sm:h-[18px]" />
                     </button>
                     <button onClick={() => setDevice('mobile')} className={`p-1.5 sm:p-2 transition-colors rounded-sm ${device === 'mobile' ? 'bg-onyx-800 text-white' : 'text-neutral-500 hover:text-white hover:bg-onyx-800/50'}`}>
                       <Smartphone size={16} className="sm:w-[18px] sm:h-[18px]" />
                     </button>
                   </div>
                 </div>

                 {/* Canvas */}
                 <div className="flex-grow overflow-auto flex items-start sm:items-center justify-center p-0 pt-12 sm:pt-4 sm:p-8 relative industrial-grid bg-onyx-950/50 scroll-smooth">
                    <div className={`shadow-2xl border border-onyx-800 transition-all duration-500 bg-white overflow-y-auto overflow-x-hidden ${device === 'desktop' ? 'w-full h-full max-w-5xl rounded-sm clip-diagonal-inverted' : 'w-[320px] sm:w-[375px] h-[650px] sm:h-[812px] mt-4 sm:mt-0 rounded-[40px] border-[8px] sm:border-[12px] border-onyx-800 relative shadow-black/50'}`}>
                       {device === 'mobile' && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-onyx-800 rounded-b-2xl z-50"></div>}
                       {/* Overlay to simulate it's an editor */}
                       <div className="min-h-full w-full relative group cursor-pointer">
                          <TemplateSwitcher name={templateName} />
                          {/* Hover Editor Borders */}
                          <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 pointer-events-none transition-colors z-50 opacity-0 group-hover:opacity-100 flex items-start justify-end p-2">
                             <div className="bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 shadow-lg shadow-blue-500/20">Edit Layer</div>
                          </div>
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

const EditorButton = ({ icon, label, active = false }: any) => (
  <button className={`flex items-center justify-center md:justify-start gap-3 p-2.5 md:p-3 transition-colors rounded-sm ${active ? 'bg-onyx-800 text-white' : 'text-neutral-500 hover:text-white hover:bg-onyx-800'}`}>
     {icon}
     <span className="hidden md:inline text-[10px] font-bold uppercase tracking-widest">{label}</span>
  </button>
)
