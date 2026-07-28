import React from 'react';

/* Заглушка на месте будущей фотографии.
   Честно говорит клиенту: «здесь будет ваше фото», а не притворяется картинкой.
   Рисуется кодом, поэтому ничего не весит и подстраивается под палитру демо. */

type Props = {
  label: string;                 // что тут будет: «Фото объекта», «Портрет мастера»
  tone: string;                  // акцентный цвет демо
  bg?: string;                   // фон карточки
  ratio?: string;                // '4/3', '3/4', '16/9'
  icon?: 'photo' | 'person' | 'building' | 'interior';
  className?: string;
  dark?: boolean;                // светлая или тёмная подложка
};

const paths: Record<string, React.ReactNode> = {
  photo: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8.5" cy="10" r="1.6" />
      <path d="m3 16.5 4.5-4 3.5 3 3.5-3.5L21 16" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8.5" r="3.6" />
      <path d="M4.5 20c1.2-3.8 4.1-5.8 7.5-5.8s6.3 2 7.5 5.8" />
    </>
  ),
  building: (
    <>
      <path d="M3 21h18M5 21V8l7-4 7 4v13" />
      <path d="M9.5 21v-5h5v5M9.5 12h1.5M13 12h1.5" />
    </>
  ),
  interior: (
    <>
      <path d="M3 20h18M4 20V9l8-5 8 5v11" />
      <path d="M8 20v-6h3v6M14 13h3v3h-3z" />
    </>
  ),
};

export default function DemoPlaceholder({
  label, tone, bg, ratio = '4/3', icon = 'photo', className = '', dark = true,
}: Props) {
  const line = dark ? 'rgba(255,255,255,0.10)' : 'rgba(20,24,29,0.10)';
  const text = dark ? 'rgba(255,255,255,0.42)' : 'rgba(20,24,29,0.45)';
  return (
    <div
      className={`relative overflow-hidden flex flex-col items-center justify-center gap-3 ${className}`}
      style={{
        aspectRatio: ratio,
        background: bg || (dark ? 'rgba(255,255,255,0.025)' : 'rgba(20,24,29,0.035)'),
        border: `1px dashed ${dark ? 'rgba(255,255,255,0.16)' : 'rgba(20,24,29,0.18)'}`,
      }}
      role="img"
      aria-label={label}
    >
      {/* лёгкая штриховка, чтобы место читалось как «пока пусто», а не как фон */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${line} 0 1px, transparent 1px 12px)`,
        }}
      />
      <svg
        viewBox="0 0 24 24" className="relative w-7 h-7"
        fill="none" stroke={tone} strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      >
        {paths[icon]}
      </svg>
      <span
        className="relative text-[10.5px] uppercase tracking-[0.18em] text-center px-4"
        style={{ color: text }}
      >
        {label}
      </span>
    </div>
  );
}
