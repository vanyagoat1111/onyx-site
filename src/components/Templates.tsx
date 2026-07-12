import React from 'react';
import { Container, SectionTitle } from './ui';
import { ArrowUpRight, Monitor, Smartphone, Server, Sparkles, Code, Boxes, Hexagon } from 'lucide-react';
import { GridEffect } from './BackgroundEffects';

const main1 = "/case1.1.png";
const main2 = "/case2.1.png";
const main3 = "/case3.1.png";
const main4 = "/case4.1.png";
const main5 = "/case5.1.png";
const main6 = "/case6.1.png";

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
    previewImg: main1,
    icon: <Sparkles className="w-5 h-5 text-blue-400" />
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
    previewImg: main2,
    icon: <Monitor className="w-5 h-5 text-indigo-400" />
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
    previewImg: main3,
    icon: <Server className="w-5 h-5 text-cyan-400" />
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
    previewImg: main4,
    icon: <Boxes className="w-5 h-5 text-blue-400" />
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
    previewImg: main5,
    icon: <Hexagon className="w-5 h-5 text-indigo-400" />
  },
  {
    name: 'Ремонтная Компания',
    category: 'Ремонт / Строительство',
    url: '#case/repair',
    problem: 'Сложно донести экспертность и цены.',
    solution: 'Сайт с портфолио и расчетом.',
    solutionList: ['услуги', 'портфолио', 'калькулятор'],
    done: 'Продающая структура, примеры работ, удобная форма вызова замерщика.',
    result: 'Рост заявок и повышение доверия.',
    previewImg: main6,
    icon: <Boxes className="w-5 h-5 text-indigo-400" />
  }
];

export default function Templates() {
  return (
    <div id="templates" className="pb-16 lg:pb-32 bg-onyx-950 relative scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-onyx-900 via-transparent to-onyx-900 pointer-events-none" />
      
      {/* Massive Glowing Hexagons Background */}
      <div className="absolute top-40 left-0 w-64 h-64 border-[40px] border-blue-600/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-40 right-0 w-[500px] h-[500px] border-[80px] border-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      
      <GridEffect />
      
      <Container className="!pt-12 lg:!pt-24 relative z-10 w-full overflow-hidden">
        <div className="flex flex-col mb-12 lg:mb-20 w-full relative">
          <SectionTitle className="text-left max-w-4xl text-white !mb-0 relative z-10">
            Наши шаблоны и <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">готовые решения</span>
          </SectionTitle>
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-600/30 blur-[100px] pointer-events-none -z-10" />
          
          <div className="absolute right-10 top-0 hidden md:flex items-center gap-4 text-onyx-400 font-mono text-sm">
             <Code className="w-5 h-5 text-blue-500" />
             <span>DESIGN_SYSTEM_V2.0</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {cases.map((tpl, i) => (
            <div key={i} className="w-full relative group perspective-1000">
              {/* Tech decorative corners */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-blue-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-indigo-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
              
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/20 to-indigo-600/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>
              
              <a href={tpl.url} className="block relative bg-onyx-900 border border-onyx-800 overflow-hidden clip-diagonal group-hover:border-blue-500/80 transition-all duration-700 shadow-[0_20px_40px_rgba(0,0,0,0.8)] group-hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] z-10 pt-10 h-full group-hover:-translate-y-2">
                <div className="absolute top-0 w-full h-10 border-b border-onyx-800 group-hover:border-blue-500/40 bg-onyx-950 flex justify-between items-center px-5 gap-2.5 z-20 transition-colors duration-500 shadow-md">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-none bg-onyx-700 group-hover:bg-blue-400 group-hover:shadow-[0_0_12px_rgba(96,165,250,0.8)] transition-all duration-300"></div>
                    <div className="w-2.5 h-2.5 rounded-none bg-onyx-700 group-hover:bg-blue-500 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.8)] transition-all duration-500 delay-75"></div>
                    <div className="w-2.5 h-2.5 rounded-none bg-onyx-700 group-hover:bg-blue-600 group-hover:shadow-[0_0_12px_rgba(37,99,235,0.8)] transition-all duration-700 delay-150"></div>
                  </div>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                     {tpl.icon}
                  </div>
                </div>
                
                <img src={tpl.previewImg}
                  alt={tpl.name}
                  className="w-full h-auto object-cover object-top opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />
                
                {/* Scanline overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 pointer-events-none z-10 mix-blend-overlay"></div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-onyx-950 via-onyx-950/70 to-transparent opacity-95 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none z-10"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end gap-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 z-20">
                   <div>
                      <div className="flex items-center gap-3 mb-3">
                         <span className="px-3 py-1 bg-onyx-800/80 text-xs font-mono text-blue-400 border border-blue-500/20 backdrop-blur-md">
                           {tpl.category}
                         </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase text-white tracking-tight drop-shadow-xl mb-2 flex items-center gap-2">
                        {tpl.name}
                      </h3>
                   </div>
                   <div className="w-12 h-12 shrink-0 rounded-none border border-onyx-700 flex items-center justify-center bg-onyx-900/50 text-white backdrop-blur-md group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-500 clip-diagonal-inverted shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]">
                      <ArrowUpRight className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                   </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}