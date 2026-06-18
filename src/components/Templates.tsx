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
    previewImg: '/case1.0.jpg'
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
    previewImg: '/case2.0.jpg'
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
    previewImg: '/case3.0.jpg'
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
    previewImg: '/case4.0.jpg'
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
    previewImg: '/case5.0.jpg'
  }
];

export default function Templates() {
  return (
    <div id="templates" className="py-32 bg-onyx-950">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-24 w-full">
          <SectionTitle subtitle="Направления" className="mb-0">Наши<br/>Кейсы</SectionTitle>
          <p className="font-mono text-sm text-neutral-400 max-w-sm uppercase tracking-widest md:text-right">
            Детальный разбор наших работ: от реальной проблемы бизнеса до измеримого результата.
          </p>
        </div>

        <div className="space-y-32">
          {cases.map((tpl, i) => (
            <div key={i} className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Left/Right: Preview */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute -inset-4 bg-violet-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <a href={tpl.url} className="block relative aspect-[4/3] bg-onyx-900 border border-onyx-800 overflow-hidden clip-diagonal group-hover:border-violet-500/50 transition-colors z-10">
                  <div className="absolute top-0 w-full h-8 border-b border-onyx-800 bg-onyx-950 flex items-center px-4 gap-2 z-20">
                    <div className="w-2.5 h-2.5 rounded-full bg-onyx-700 group-hover:bg-red-500/80 transition-colors"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-onyx-700 group-hover:bg-yellow-500/80 transition-colors"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-onyx-700 group-hover:bg-green-500/80 transition-colors"></div>
                  </div>
                  <img 
                    src={tpl.previewImg} 
                    alt={tpl.name}
                    className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100 mt-8"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-onyx-950 via-onyx-900/20 to-transparent"></div>
                  
                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                     <div>
                        <div className="text-xs font-mono text-violet-400 mb-2 uppercase tracking-widest drop-shadow-md">{tpl.category}</div>
                        <h3 className="text-2xl font-bold text-white drop-shadow-lg">{tpl.name}</h3>
                     </div>
                     <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-black/50 text-white backdrop-blur-sm group-hover:bg-violet-600 group-hover:border-violet-500 transition-all">
                        <ArrowUpRight className="w-6 h-6" />
                     </div>
                  </div>
                </a>
              </div>
              
              {/* Right/Left: Info */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-10">
                <div className="space-y-4">
                  <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-[0.2em] border-l-2 border-red-500/50 pl-4">Задача</h4>
                  <p className="text-xl lg:text-2xl font-light text-white leading-relaxed">{tpl.problem}</p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-[0.2em] border-l-2 border-violet-500/50 pl-4">Решение</h4>
                  <p className="text-base text-neutral-300 leading-relaxed">{tpl.solution}</p>
                  {tpl.solutionList.length > 0 && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mt-4">
                      {tpl.solutionList.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-neutral-300 border-b border-onyx-800 pb-2">
                           <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0" />
                           <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-black border border-onyx-800 rounded-sm shadow-inner clip-diagonal relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-violet-900/5 to-transparent pointer-events-none"></div>
                   <div className="relative z-10">
                     <h4 className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em] mb-4">Что сделали</h4>
                     <p className="text-sm text-neutral-400 leading-relaxed font-light">{tpl.done}</p>
                   </div>
                   <div className="relative z-10">
                     <h4 className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em] mb-4">Результат</h4>
                     <p className="text-lg font-medium text-white tracking-wide border-l border-onyx-700 pl-4">{tpl.result}</p>
                   </div>
                </div>
                
                <div className="pt-4">
                   <a href={tpl.url} className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white hover:bg-neutral-200 text-black font-bold uppercase tracking-widest text-[10px] sm:text-xs rounded-sm group w-full sm:w-max transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                     Смотреть сайт <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
