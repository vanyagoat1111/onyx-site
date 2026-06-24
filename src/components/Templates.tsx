import React from 'react';
import { Container, SectionTitle } from './ui';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

const cases = [
  { 
    name: 'Стоматология Премиум', 
    category: 'Медицина',
    url: '#case/dental',
    problem: 'Устаревший сайт, нет доверия, мало заявок.',
    solution: 'Создан премиальный сайт с акцентом на:',
    solutionList: ['доверие', 'врачей', 'услуги', 'запись онлайн'],
    done: 'UX-структура под запись пациента, премиальный дизайн, адаптация под мобильные устройства, формы записи.',
    result: 'До 40% рост конверсии, увеличение записей с рекламы.',
    previewImg: "/main1.jpg?v=5"
  },
  { 
    name: 'Фитнес-Клуб', 
    category: 'Спорт',
    url: '#case/fitness',
    problem: 'Сайт не продаёт абонементы.',
    solution: 'Сайт переработан под продажи:',
    solutionList: ['абонементы', 'тренеры', 'расписание', 'акции'],
    done: 'Продающая структура, блоки мотивации, быстрые заявки.',
    result: 'Рост вовлечённости и заявок.',
    previewImg: "/main2.jpg?v=5"
  },
  { 
    name: 'Логистика / Грузоперевозки', 
    category: 'B2B',
    url: '#case/logistics',
    problem: 'Нет заявок с сайта.',
    solution: 'Сайт под B2B лидогенерацию.',
    solutionList: [],
    done: 'Калькулятор заявки, формы расчёта доставки, блок доверия (склады, техника).',
    result: 'Упрощение получения заявок.',
    previewImg: "/main3.jpg?v=5"
  },
  { 
    name: 'Юридическая Компания', 
    category: 'Право',
    url: '#case/lawfirm',
    problem: 'Низкое доверие клиентов.',
    solution: 'Сайт построен на доверии:',
    solutionList: ['кейсы', 'специалисты', 'консультация 24/7'],
    done: 'Проработка структуры, акцент на экспертность, удобные формы связи.',
    result: 'Рост обращений через форму.',
    previewImg: "/main4.jpg?v=5"
  },
  { 
    name: 'Недвижимость (Премиум)', 
    category: 'Элитная недвижимость',
    url: '#case/realestate',
    problem: 'Сложно продавать объекты через сайт.',
    solution: 'Каталог + фильтры + заявки.',
    solutionList: [],
    done: 'Карточки объектов, фильтрация, быстрый контакт.',
    result: 'Интуитивный поиск, увеличение целевых обращений.',
    previewImg: "/main5.jpg?v=5"
  }
];

export default function Templates() {
  return (
    <div id="templates" className="pb-16 lg:pb-24 bg-onyx-950 relative scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-onyx-900 via-transparent to-onyx-900 pointer-events-none" />
      <Container className="!pt-12 lg:!pt-16 relative z-10 w-full overflow-hidden">
        <div className="flex flex-col mb-12 lg:mb-16 w-full">
          <SectionTitle className="text-left max-w-4xl text-white !mb-0">КЕЙСЫ: КАК МЫ РЕШИЛИ ЗАДАЧИ БИЗНЕСА</SectionTitle>
        </div>

        <div className="space-y-32">
          {cases.map((tpl, i) => (
            <div key={i} className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Left/Right: Preview */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute -inset-4 bg-blue-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <a href={tpl.url} className="block relative bg-onyx-900 border border-onyx-700 overflow-hidden clip-diagonal group-hover:border-blue-500 transition-all shadow-[0_0_20px_rgba(0,0,0,0.8)] group-hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] z-10 pt-8">
                  <div className="absolute top-0 w-full h-8 border-b border-onyx-700 group-hover:border-blue-500/50 bg-onyx-950 flex items-center px-4 gap-2 z-20 transition-colors">
                    <div className="w-2.5 h-2.5 rounded-none bg-blue-400 shadow-[0_0_8px_rgba(147,197,253,0.3)]"></div>
                    <div className="w-2.5 h-2.5 rounded-none bg-blue-600 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                    <div className="w-2.5 h-2.5 rounded-none bg-neutral-600"></div>
                  </div>
                  <img src={tpl.previewImg} 
                    alt={tpl.name}
                    className="w-full h-auto hue-rotate-[0deg] opacity-60 mix-blend-screen group-hover:mix-blend-normal group-hover:opacity-100 group-hover:hue-rotate-0 transition-all duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-onyx-950 via-onyx-950/30 to-transparent"></div>
                  
                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                     <div>
                        <h3 className="text-2xl font-black uppercase text-white tracking-tight drop-shadow-lg ">{tpl.name}</h3>
                     </div>
                     <div className="w-12 h-12 rounded-none border border-blue-500/30 flex items-center justify-center bg-onyx-900/80 text-blue-500 backdrop-blur-md group-hover:bg-blue-600 group-hover:text-onyx-950 group-hover:border-blue-500 transition-all shadow-[0_0_15px_rgba(59,130,246,0)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] clip-diagonal-inverted">
                        <ArrowUpRight className="w-6 h-6" />
                     </div>
                  </div>
                </a>
              </div>
              
              {/* Right/Left: Info */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-10 p-8 bg-onyx-800/50 backdrop-blur-md border border-onyx-700 clip-diagonal shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]">
                <div className="space-y-4">
                  <h4 className="text-[12px] font-bold font-mono text-neutral-400 uppercase tracking-[0.2em] border-l-2 border-onyx-700 pl-4">Проблема</h4>
                  <p className="text-xl lg:text-2xl font-light text-white leading-relaxed">{tpl.problem}</p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-[12px] font-bold font-mono text-blue-400 uppercase tracking-[0.2em] border-l-2 border-blue-500 pl-4 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">Решения</h4>
                  <p className="text-lg text-neutral-200 leading-relaxed font-light">{tpl.solution}</p>
                  {tpl.solutionList.length > 0 && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mt-4">
                      {tpl.solutionList.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-base text-neutral-200 border-b border-onyx-700 pb-2 font-sans">
                           <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]" />
                           <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-onyx-900 border border-onyx-700 shadow-inner clip-diagonal relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent pointer-events-none group-hover:from-blue-600/10 transition-colors"></div>
                   <div className="relative z-10">
                     <h4 className="text-[12px] font-bold font-mono text-neutral-400 uppercase tracking-[0.2em] mb-4">Что сделали</h4>
                     <p className="text-base text-neutral-200 leading-relaxed font-sans">{tpl.done}</p>
                   </div>
                   <div className="relative z-10">
                     <h4 className="text-[12px] font-bold font-mono text-[#ebff00] uppercase tracking-[0.2em] mb-4 drop-shadow-[0_0_5px_rgba(235,255,0,0.5)]">Результат</h4>
                     <p className="text-lg font-black uppercase text-white tracking-wide border-l-2 border-[#ebff00] pl-4">{tpl.result}</p>
                   </div>
                </div>
                
                <div className="pt-4">
                   <a href={tpl.url} className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 text-onyx-950 font-black uppercase tracking-widest text-[10px] sm:text-xs relative group/btn w-full sm:w-max transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] clip-diagonal overflow-hidden">
                     <div className="absolute inset-0 bg-white/30 blur-md opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                     <span className="relative z-10 flex items-center gap-2">Смотреть сайт <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" /></span>
                   </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
