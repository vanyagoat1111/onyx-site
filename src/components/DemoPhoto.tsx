import React, { useState } from 'react';
import DemoPlaceholder from './DemoPlaceholder';

/* Фотография в демо с честным запасным вариантом.

   Смысл такой. Пока файла нет, показываем ту же рисованную заглушку,
   что и раньше: она прямо говорит клиенту «здесь будет ваше фото».
   Как только файл кладут в public/demo, картинка появляется сама -
   ничего в коде править не нужно.

   Отдельно ловим ошибку загрузки. Если файл удалили, переименовали
   или он не докачался, посетитель увидит заглушку, а не сломанный
   значок картинки. На витрине, которую показывают клиентам, битая
   картинка хуже честной пустоты. */

type Props = {
  /** путь вида /demo/osnova-olha.jpg; пока файла нет - будет заглушка */
  src?: string;
  label: string;
  tone: string;
  bg?: string;
  ratio?: string;
  icon?: 'photo' | 'person' | 'building' | 'interior';
  className?: string;
  dark?: boolean;
  /** как кадрировать: по умолчанию заполняем область */
  fit?: 'cover' | 'contain';
};

export default function DemoPhoto({
  src, label, tone, bg, ratio = '4/3', icon = 'photo', className = '', dark = true, fit = 'cover',
}: Props) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <DemoPlaceholder
        label={label} tone={tone} bg={bg} ratio={ratio}
        icon={icon} className={className} dark={dark}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: ratio, background: bg }}>
      <img
        src={src}
        alt={label}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: fit }}
      />
    </div>
  );
}
