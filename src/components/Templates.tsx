import React from 'react';
import { Container, SectionTitle } from './ui';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
const main1 = "/case1.1.png";
const main2 = "/case2.1.png";
const main3 = "/case3.1.png";
const main4 = "/case4.1.png";
const main5 = "/case5.1.png";

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
    previewImg: main1
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
    previewImg: main2
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
    previewImg: main3
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
    previewImg: main4
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
    previewImg: main5
  }
];

export default function Templates() {
  return (
    <div id="templates" className="pb-16 lg:pb-24 bg-onyx-950 relative scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-onyx-900 via-transparent to-onyx-900 pointer-events-none" />
      <Container className="!pt-12 lg:!pt-16 relative z-10 w-full overflow-hidden">
        <div className="flex flex-col mb-12 lg:mb-16 w-full">
          <SectionTitle className="text-left max-w-4xl text-white !mb-0">Шаблоны сайтов: КАК МЫ РЕШИЛИ ЗАДАЧИ бизнеса</SectionTitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {cases.map((tpl, i) => (
            <div key={i} className="w-full relative group">
              <div className="absolute -inset-4 bg-blue-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <a href={tpl.url} className="block relative bg-onyx-900 border border-onyx-700 overflow-hidden clip-diagonal group-hover:border-blue-500 transition-all shadow-[0_0_20px_rgba(0,0,0,0.8)] group-hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] z-10 pt-8 h-full">
                <div className="absolute top-0 w-full h-8 border-b border-onyx-700 group-hover:border-blue-500/50 bg-onyx-950 flex items-center px-4 gap-2 z-20 transition-colors">
                  <div className="w-2.5 h-2.5 rounded-none bg-blue-400 shadow-[0_0_8px_rgba(147,197,253,0.3)]"></div>
                  <div className="w-2.5 h-2.5 rounded-none bg-blue-600 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                  <div className="w-2.5 h-2.5 rounded-none bg-neutral-600"></div>
                </div>
                <img src={tpl.previewImg}
                  alt={tpl.name}
                  className="w-full h-auto object-cover object-top opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"  />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx-950 via-onyx-950/80 to-transparent opacity-90 group-hover:opacity-70 transition-opacity"></div>

                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end gap-4">
                   <div>
                      <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight drop-shadow-lg">{tpl.name}</h3>
                   </div>
                   <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-none border border-blue-500/30 flex items-center justify-center bg-onyx-900/80 text-blue-500 backdrop-blur-md group-hover:bg-blue-600 group-hover:text-onyx-950 group-hover:border-blue-500 transition-all shadow-[0_0_15px_rgba(59,130,246,0)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] clip-diagonal-inverted">
                      <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
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
