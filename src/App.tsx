import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import ActionBlock from './components/ActionBlock';
import Benefits from './components/Benefits';
import Consultation from './components/Consultation';
import Templates from './components/Templates';
import Services from './components/Services';
import FAQ from './components/FAQ';
import FormSection from './components/FormSection';
import Footer from './components/Footer';
import CaseEditorWrapper from './components/CaseEditorWrapper';
import ContactFab from './components/ContactFab';
import CookieConsent from './components/CookieConsent';

/* Демо-шаблоны грузятся по требованию, а не при заходе на главную.

   Раньше все четырнадцать импортировались статически - 9800 строк и
   692 КБ исходников попадали в главный бандл. Человек открывал главную
   и скачивал четырнадцать чужих сайтов, из которых мог не посмотреть
   ни одного. Именно это и было главной причиной долгой загрузки.

   lazy() выносит каждый шаблон в отдельный кусок, который скачивается
   в момент перехода на демо. Suspense ниже показывает заглушку на эту
   долю секунды - без него React бросит исключение при первом же
   отложенном рендере. */
const DentalClinic = lazy(() => import('./cases/DentalClinic'));
const FitnessClub = lazy(() => import('./cases/FitnessClub'));
const Logistics = lazy(() => import('./cases/Logistics'));
const LawFirm = lazy(() => import('./cases/LawFirm'));
const RealEstate = lazy(() => import('./cases/RealEstate'));
const ArtelInteriors = lazy(() => import('./cases/ArtelInteriors'));
const OsnovaBuild = lazy(() => import('./cases/OsnovaBuild'));
const FleurBeauty = lazy(() => import('./cases/FleurBeauty'));
const ApexDetailing = lazy(() => import('./cases/ApexDetailing'));
const FormaIndustry = lazy(() => import('./cases/FormaIndustry'));
const BraseroKitchen = lazy(() => import('./cases/BraseroKitchen'));
const TaigaRetreat = lazy(() => import('./cases/TaigaRetreat'));
const MethodSchool = lazy(() => import('./cases/MethodSchool'));
const VectorConsulting = lazy(() => import('./cases/VectorConsulting'));

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('');

  useEffect(() => {
    setCurrentRoute(window.location.hash);
    const handleHashChange = () => {
      const hash = window.location.hash;
      setCurrentRoute(hash);

      if (hash.startsWith('#case/')) {
        window.scrollTo(0, 0);
      } else if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash.slice(1));
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo(0, 0);
          }
        }, 100);
      } else {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  /* Заглушка на время загрузки шаблона. Не «крутилка», а честная строка
     в стилистике студии: пустой экран на долю секунды читается как сбой. */
  const demo = (node: React.ReactNode) => (
    <Suspense fallback={
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-cobalt-soft">
          Открываем пример…
        </span>
      </div>
    }>{node}</Suspense>
  );

  if (currentRoute === '#case/dental') return demo(<CaseEditorWrapper><DentalClinic /></CaseEditorWrapper>);
  if (currentRoute === '#case/fitness') return demo(<CaseEditorWrapper><FitnessClub /></CaseEditorWrapper>);
  if (currentRoute === '#case/logistics') return demo(<CaseEditorWrapper><Logistics /></CaseEditorWrapper>);
  if (currentRoute === '#case/lawfirm') return demo(<CaseEditorWrapper><LawFirm /></CaseEditorWrapper>);
  if (currentRoute === '#case/realestate') return demo(<CaseEditorWrapper><RealEstate /></CaseEditorWrapper>);
  if (currentRoute.startsWith('#case/artel')) return demo(<CaseEditorWrapper><ArtelInteriors /></CaseEditorWrapper>);
  if (currentRoute.startsWith('#case/construction')) return demo(<CaseEditorWrapper><OsnovaBuild /></CaseEditorWrapper>);
  if (currentRoute === '#case/beauty') return demo(<CaseEditorWrapper><FleurBeauty /></CaseEditorWrapper>);
  if (currentRoute === '#case/auto') return demo(<CaseEditorWrapper><ApexDetailing /></CaseEditorWrapper>);
  if (currentRoute.startsWith('#case/manufacturing')) return demo(<CaseEditorWrapper><FormaIndustry /></CaseEditorWrapper>);
  if (currentRoute.startsWith('#case/food')) return demo(<CaseEditorWrapper><BraseroKitchen /></CaseEditorWrapper>);
  if (currentRoute.startsWith('#case/hotel')) return demo(<CaseEditorWrapper><TaigaRetreat /></CaseEditorWrapper>);
  if (currentRoute.startsWith('#case/education')) return demo(<CaseEditorWrapper><MethodSchool /></CaseEditorWrapper>);
  if (currentRoute.startsWith('#case/b2b')) return demo(<CaseEditorWrapper><VectorConsulting /></CaseEditorWrapper>);

  return (
    <main className="bg-ink text-bone font-body selection:bg-cobalt selection:text-white w-full overflow-clip">
      <div className="noise-overlay" aria-hidden="true" />
      <Navbar />
            {/* Первый экран отдаётся сразу, без сцены сборки.

          Здесь стояло вступление: пустое окно браузера, которое собиралось
          в главную по прокрутке. Приём работал, но у него оказалась цена.

          Человек, пришедший по ссылке из мессенджера, видел почти чёрный
          экран и решал, что сайт не грузится. Так было с партнёром студии
          и с несколькими знакомыми - на разных телефонах. Подсказка внизу
          экрана этого не спасала.

          Для сайта, который продаёт сайты, первое впечатление дороже
          любого приёма. Сцена снята целиком.

          Убирать её было безопасно по построению: все переменные --intro-*
          читались из Hero со значением по умолчанию 1, то есть «страница
          готова». Нет обёртки - нет и переменных, элементы сразу видны.
          usePastIntro без трека возвращает «ждать нечего», поэтому кнопка
          связи и баннер согласия работают как на обычной странице. */}
      <Hero />
      <Problem />
      <Benefits />
      <ActionBlock />
      <Consultation />
      <Templates />
      <Services />
      <FAQ />
      <FormSection />
      <Footer />
      <ContactFab />
      <CookieConsent />
    </main>
  );
}
