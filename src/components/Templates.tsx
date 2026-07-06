import React from 'react';
import { Container, SectionTitle } from './ui';
import { ArrowUpRight } from 'lucide-react';

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
 <div id="templates" className="pb-16 lg:pb-32 bg-obsidian-canvas relative scroll-mt-20">
 
 <Container className="!pt-12 lg:!pt-24 relative z-10 w-full overflow-hidden">
 <div className="flex flex-col mb-12 lg:mb-20 w-full relative">
 <SectionTitle className="text-left max-w-4xl text-bone !mb-0 relative z-10">
 Шаблоны сайтов
 </SectionTitle>
 
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
 {cases.map((tpl, i) => (
 <div key={i} className="w-full relative group perspective-1000">
 
 <a href={tpl.url} className="block relative bg-[#0d0d0d] border border-carbon-lift rounded-lg overflow-hidden transition-all z-10 pt-10 h-full">
 <div className="absolute top-0 w-full h-10 border-b border-carbon-lift bg-[#0d0d0d] flex items-center px-4 gap-2 z-20">
 <div className="w-3 h-3 rounded-full bg-[#3d3a39]"></div>
 <div className="w-3 h-3 rounded-full bg-[#3d3a39]"></div>
 <div className="w-3 h-3 rounded-full bg-[#3d3a39]"></div>
 </div>
 <img src={tpl.previewImg}
 alt={tpl.name}
 className="w-full h-auto object-cover object-top opacity-80 group-hover:opacity-100 transition-all duration-200"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-[#101010] to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-200 pointer-events-none"></div>
 <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end gap-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
 <div>
 <h3 className="text-[24px] text-bone tracking-tight mb-2">{tpl.name}</h3>
 
 </div>
 <div className="w-12 h-12 shrink-0 rounded-sm border border-ash-stroke flex items-center justify-center bg-transparent text-bone transition-colors">
 <ArrowUpRight className="w-6 h-6 group-hover:scale-110 transition-transform duration-500" />
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
