import React, { useEffect, useRef, useState } from 'react';

/* ═══════════ КРУГОВОЙ ОБЛЁТ, КОТОРЫМ УПРАВЛЯЕТ ПРОКРУТКА ═══════════

   То, что стоит в конфигураторах автопроизводителей. Никакого 3D внутри:
   это последовательность фотографий, снятых по кругу, и прокрутка просто
   перелистывает кадры. Ровно так делают все, включая Lexus.

   Подделать вращение на одной фотографии нельзя - кузов поплывёт, и сразу
   видно, что это растянутая картинка. Нужен именно набор кадров.

   Как снять набор: машина стоит, фотограф идёт по кругу с шагом 10 градусов
   и делает 36 кадров с одной высоты и одного расстояния. Штатив обязателен,
   иначе машина будет прыгать. Можно наоборот - камера на месте, машина
   на поворотном столе.

   Файлы кладутся как /demo/spin/01.jpg, 02.jpg и так далее. Сколько
   реально лежит - компонент определяет сам, от 8 кадров и больше.
   Меньше восьми выглядит рвано.

   Пока набора нет, компонент ничего не рисует и отдаёт управление
   запасному варианту - см. свойство fallback.                          */

type Props = {
  /** путь к папке с кадрами, без завершающего слэша */
  dir?: string;
  /** сколько кадров максимум искать */
  max?: number;
  /** доля прокрутки 0..1, приходит извне */
  progress: React.MutableRefObject<number>;
  /** сколько полных оборотов за всю прокрутку */
  turns?: number;
  className?: string;
  /** что показать, пока кадров нет */
  fallback?: React.ReactNode;
  /** сообщить наружу, что набор найден и облёт включился */
  onReady?: (ready: boolean) => void;
};

export default function Spin360({
  dir = '/demo/spin', max = 72, progress, turns = 1,
  className = '', fallback = null, onReady,
}: Props) {
  const [frames, setFrames] = useState<string[]>([]);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const shown = useRef(-1);

  /* Ищем кадры по порядку и останавливаемся на первом отсутствующем.
     Загружаем сразу все: перелистывание должно быть мгновенным, а
     догрузка посреди вращения выглядит как заедание.

     Имя файла и формат определяем сами по первому кадру. Наборы приходят
     то как 01.jpg, то как large-01.avif, и заставлять человека всё
     переименовывать - лишний повод ошибиться. AVIF браузеры давно
     понимают, конвертировать не нужно. */
  useEffect(() => {
    let alive = true;

    const load = (url: string): Promise<boolean> =>
      new Promise((res) => {
        const img = new Image();
        img.onload = () => res(true);
        img.onerror = () => res(false);
        img.src = url;
      });

    const PATTERNS = [
      (n: string) => `${dir}/${n}.jpg`,
      (n: string) => `${dir}/${n}.avif`,
      (n: string) => `${dir}/${n}.webp`,
      (n: string) => `${dir}/${n}.png`,
      (n: string) => `${dir}/large-${n}.avif`,
      (n: string) => `${dir}/large-${n}.jpg`,
    ];

    (async () => {
      // какой шаблон имени подходит - решаем по первому кадру
      let make: ((n: string) => string) | null = null;
      for (const p of PATTERNS) {
        if (await load(p('01'))) { make = p; break; }
        if (!alive) return;
      }
      if (!alive) return;
      if (!make) { setFrames([]); onReady?.(false); return; }

      /* Проверяем все номера сразу, а не по одному.
         Последовательные запросы на 36 кадров - это 36 обращений подряд,
         на медленной связи полминуты ожидания. Параллельно браузер тянет
         их пачкой, а нам остаётся взять непрерывную серию с начала:
         дырка в нумерации должна обрывать набор, иначе машина прыгнет. */
      const urls = Array.from({ length: max }, (_, k) => make(String(k + 1).padStart(2, '0')));
      const okList = await Promise.all(urls.map(load));
      if (!alive) return;

      const found: string[] = [];
      for (let i = 0; i < okList.length; i++) {
        if (!okList[i]) break;
        found.push(urls[i]);
      }
      // меньше восьми кадров - вращение рвётся, лучше не включать вовсе
      const usable = found.length >= 8 ? found : [];
      setFrames(usable);
      onReady?.(usable.length > 0);
    })();

    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dir, max]);

  /* Перелистывание. Читаем прогресс из ref и меняем src только когда
     номер кадра действительно изменился: лишние присваивания заставляют
     браузер декодировать картинку заново. */
  useEffect(() => {
    if (!frames.length) return;
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const p = Math.max(0, Math.min(1, progress.current));
      /* Замыкаем круг остатком от деления: при полной прокрутке номер
         кадра снова становится нулевым, потому что 360 градусов и 0 -
         это один и тот же вид. Без остатка на самом конце вылезал бы
         несуществующий кадр. */
      const n = frames.length;
      const i = ((Math.floor(p * turns * n) % n) + n) % n;
      if (i !== shown.current && imgRef.current) {
        shown.current = i;
        imgRef.current.src = frames[i];
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [frames, progress, turns]);

  if (!frames.length) return <>{fallback}</>;

  return (
    <img
      ref={imgRef}
      src={frames[0]}
      alt="Автомобиль со всех сторон"
      className={`absolute inset-0 w-full h-full object-cover ${className}`}
      draggable={false}
    />
  );
}
