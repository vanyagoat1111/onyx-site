import React from 'react';
import { Container, SectionTitle, Reveal } from './ui';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

const cases = [
  {
    name: 'Стоматология Премиум',
    category: 'Медицина',
    url: '#case/dental',
    problem: 'Устаревший сайт, нет доверия, мало заявок.',
    result: 'До +40% к конверсии, рост записей с рекламы.',
    previewImg: '/case1.1.png',
  },
  {
    name: 'Фитнес-Клуб',
    category: 'Спорт',
    url: '#case/fitness',
    problem: 'Сайт не продаёт абонементы.',
    result: 'Рост вовлечённости и заявок.',
    previewImg: '/case2.1.png',
  },
  {
    name: 'Логистика / Грузоперевозки',
    category: 'B2B',
    url: '#case/logistics',
    problem: 'Нет заявок с сайта.',
    result: 'Калькулятор и формы упростили получение заявок.',
    previewImg: '/case3.1.png',
  },
  {
    name: 'Юридическая Компания',
    category: 'Право',
    url: '#case/lawfirm',
    problem: 'Низкое доверие клиентов.',
    result: 'Рост обращений через форму.',
    previewImg: '/case4.1.png',
  },
  {
    name: 'Недвижимость Премиум',
    category: 'Элитная недвижимость',
    url: '#case/realestate',
    problem: 'Сложно продавать объекты через сайт.',
    result: 'Интуитивный поиск, больше целевых обращений.',
    previewImg: '/case5.1.png',
  },
  {
    name: 'Ремонтная Компания',
    category: 'Ремонт / Строительство',
    url: '#case/repair',
    problem: 'Сложно донести экспертность и цены.',
    result: 'Рост заявок и повышение доверия.',
    previewImg: '/case6.1.png',
  },
  {
    name: 'Artel — Ремонт под ключ',
    category: 'Премиум-интерьеры',
    url: '#case/artel',
    problem: 'Нет площадки, отражающей премиальный уровень услуг.',
    result: 'Имидж-сайт с портфолио, процессом и заявками.',
    previewImg: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
  },

];

export default function Templates() {
  return (
    <Container id="templates" className="relative border-t border-white/[0.06] scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
        <SectionTitle index="04" subtitle="Шаблоны и готовые решения" className="!mb-0 max-w-3xl">
          Живые демо: нажмите и посмотрите сайт целиком
        </SectionTitle>
        <span className="hidden md:block font-mono text-xs text-fog whitespace-nowrap pb-3">({cases.length}) проектов</span>
      </div>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {cases.map((tpl, i) => (
          <Reveal key={i} delay={(i % 2) * 0.1}>
            <a href={tpl.url} className="group block h-full rounded-[28px] border border-white/[0.08] bg-ink-2/60 overflow-hidden hover:border-cobalt/40 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
              <div className="relative overflow-hidden aspect-[16/10]">
                <img
                  src={tpl.previewImg}
                  alt={`Кейс: ${tpl.name}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500" />
                <span className="absolute top-5 left-5 rounded-full bg-ink/70 backdrop-blur-md border border-white/15 text-bone/90 text-[11px] font-mono tracking-wider uppercase px-4 py-1.5">
                  {tpl.category}
                </span>
                <span className="absolute top-5 right-5 w-11 h-11 rounded-full bg-ink/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-bone group-hover:bg-cobalt group-hover:border-cobalt transition-all duration-500">
                  <ArrowUpRight className="w-4.5 h-4.5 transition-transform duration-500 group-hover:rotate-45" />
                </span>
              </div>

              <div className="p-6 md:p-7">
                <h3 className="font-display font-medium text-lg md:text-xl text-bone mb-4 group-hover:text-cobalt-soft transition-colors duration-300">
                  {tpl.name}
                </h3>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 text-[13px] font-body">
                  <p className="text-fog leading-snug sm:flex-1">
                    <span className="text-fog/60 font-mono text-[10px] uppercase tracking-[0.2em] block mb-1">Проблема</span>
                    {tpl.problem}
                  </p>
                  <p className="text-bone/85 leading-snug sm:flex-1 flex sm:block gap-2">
                    <span className="text-cobalt-soft font-mono text-[10px] uppercase tracking-[0.2em] sm:flex items-center gap-1.5 hidden mb-1"><TrendingUp className="w-3 h-3" /> Результат</span>
                    <span className="text-cobalt-soft font-mono text-[10px] uppercase tracking-[0.2em] sm:hidden shrink-0 pt-0.5">Результат:</span>
                    {tpl.result}
                  </p>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
