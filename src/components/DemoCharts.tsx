import React, { useEffect, useRef, useState } from 'react';

/* Набор SVG-примитивов для инфографики в демо-шаблонах.
   Всё рисуется кодом, без картинок: цвет и подписи задаются пропсами,
   поэтому одна и та же диаграмма выглядит по-разному в каждом шаблоне.
   Анимация появления отключается при prefers-reduced-motion. */

const EASE = [0.22, 1, 0.36, 1] as const;

/* Диаграмма появляется, когда её контейнер попадает в кадр.
   Своя реализация на IntersectionObserver: она работает и внутри
   горизонтальной прокрутки, и с запасным включением по таймеру,
   чтобы график никогда не остался пустым. */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  /* Диаграмма сразу рисуется в конечном состоянии, а анимация появления
     остаётся на обёртке Reveal в самом шаблоне. Так график виден всегда —
     даже если наблюдатель за видимостью не сработал (горизонтальная
     прокрутка, скриншот, печать, отключённый JS-переход). */
  const [on] = useState(true);
  return { ref, on };
}

function useReduced() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setR(m.matches);
    const h = () => setR(m.matches);
    m.addEventListener('change', h);
    return () => m.removeEventListener('change', h);
  }, []);
  return r;
}

type Common = { tone: string; muted?: string; className?: string };

/* ─────────── Горизонтальные полосы сравнения ─────────── */
export function StatBars({
  items, tone, muted = 'rgba(255,255,255,0.10)', unit = '', className = '', labelColor = 'currentColor',
}: Common & { items: { label: string; value: number; note?: string }[]; unit?: string; labelColor?: string }) {
  const { ref, on } = useReveal<HTMLDivElement>();
  const reduced = useReduced();
  const max = Math.max(...items.map((i) => i.value));

  return (
    <div ref={ref} className={'flex flex-col gap-5 ' + className}>
      {items.map((it, i) => (
        <div key={it.label}>
          <div className="flex justify-between items-baseline gap-4 mb-2">
            <span className="text-[13.5px]" style={{ color: labelColor }}>{it.label}</span>
            <span className="font-mono text-[13px] whitespace-nowrap" style={{ color: tone }}>
              {it.value.toLocaleString('ru-RU')}{unit}
            </span>
          </div>
          <div className="h-[8px] w-full overflow-hidden" style={{ background: muted }}>
            <div
              style={{
                background: tone, height: '100%',
                width: (on ? (it.value / max) * 100 : 0) + '%',
                transition: reduced ? 'none' : `width .9s cubic-bezier(.22,1,.36,1) ${i * 0.09}s`,
              }}
            />
          </div>
          {it.note && <div className="text-[11.5px] mt-1.5 opacity-45">{it.note}</div>}
        </div>
      ))}
    </div>
  );
}

/* ─────────── Кольцевой индикатор ─────────── */
export function DonutStat({
  value, max = 100, label, sub, tone, muted = 'rgba(255,255,255,0.12)', size = 168, className = '', suffix = '%',
}: Common & { value: number; max?: number; label: string; sub?: string; size?: number; suffix?: string }) {
  const { ref, on } = useReveal<HTMLDivElement>();
  const reduced = useReduced();
  const r = (size - 16) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);

  return (
    <div ref={ref} className={'flex flex-col items-center text-center ' + className}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={muted} strokeWidth="8" />
          <circle
            cx={size / 2} cy={size / 2} r={r} fill="none" stroke={tone} strokeWidth="8" strokeLinecap="butt"
            strokeDasharray={c}
            strokeDashoffset={on ? c * (1 - pct) : c}
            style={{
              transform: 'rotate(-90deg)', transformOrigin: '50% 50%',
              transition: reduced ? 'none' : 'stroke-dashoffset 1.1s cubic-bezier(.22,1,.36,1)',
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-bold leading-none" style={{ fontSize: size * 0.24, color: tone }}>{value}{suffix}</span>
        </div>
      </div>
      <div className="mt-4 text-[14px] font-semibold">{label}</div>
      {sub && <div className="text-[12px] mt-1.5 opacity-45 max-w-[24ch]">{sub}</div>}
    </div>
  );
}

/* ─────────── Таймлайн процесса ─────────── */
export function Timeline({
  steps, tone, muted = 'rgba(255,255,255,0.14)', className = '',
}: Common & { steps: { t: string; d?: string; mark: string }[] }) {
  const { ref, on } = useReveal<HTMLDivElement>();
  const reduced = useReduced();

  return (
    <div ref={ref} className={className}>
      <div className="relative">
        <div className="absolute left-0 right-0 top-[7px] h-[2px]" style={{ background: muted }} />
        <div
          className="absolute left-0 top-[7px] h-[2px]"
          style={{
            background: tone, width: on ? '100%' : '0%',
            transition: reduced ? 'none' : 'width 1.2s cubic-bezier(.22,1,.36,1)',
          }}
        />
        <div className="relative grid gap-6" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0,1fr))` }}>
          {steps.map((s, i) => (
            <div key={s.t + i}
              style={{
                opacity: on ? 1 : 0,
                transform: on ? 'none' : 'translateY(10px)',
                transition: reduced ? 'none' : `opacity .5s ease ${0.25 + i * 0.12}s, transform .5s cubic-bezier(.22,1,.36,1) ${0.25 + i * 0.12}s`,
              }}>
              <div className="w-4 h-4 rounded-full mb-4" style={{ background: tone }} />
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] mb-2" style={{ color: tone }}>{s.mark}</div>
              <div className="text-[14px] font-semibold leading-[1.35] mb-1.5">{s.t}</div>
              {s.d && <div className="text-[12px] leading-[1.6] opacity-45">{s.d}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────── Водопад: из чего складывается сумма ─────────── */
export function Waterfall({
  items, tone, negTone = '#B4544A', muted = 'rgba(255,255,255,0.10)', unit = ' ₽', height = 230, className = '',
}: Common & { items: { label: string; delta: number }[]; negTone?: string; unit?: string; height?: number }) {
  const { ref, on } = useReveal<HTMLDivElement>();
  const reduced = useReduced();

  let run = 0;
  const pts = items.map((it) => {
    const from = run; run += it.delta;
    return { ...it, from, to: run };
  });
  const peak = Math.max(...pts.map((p) => Math.max(p.from, p.to)), 0);
  const floor = Math.min(...pts.map((p) => Math.min(p.from, p.to)), 0);
  const span = peak - floor || 1;
  const y = (v: number) => height - ((v - floor) / span) * height;

  return (
    <div ref={ref} className={className}>
      <div className="flex items-end gap-2 md:gap-4" style={{ height }}>
        {pts.map((p, i) => {
          const top = y(Math.max(p.from, p.to));
          const h = Math.max(Math.abs(y(p.from) - y(p.to)), 3);
          const pos = p.delta >= 0;
          return (
            <div key={p.label} className="flex-1 relative h-full">
              <div
                className="absolute left-0 right-0"
                style={{
                  top, background: pos ? tone : negTone,
                  height: on ? h : 0,
                  transition: reduced ? 'none' : `height .6s cubic-bezier(.22,1,.36,1) ${i * 0.11}s`,
                }}
              />
              <div className="absolute left-0 right-0 text-center font-mono text-[11px] whitespace-nowrap"
                   style={{ top: top - 20, color: pos ? tone : negTone }}>
                {p.delta > 0 ? '+' : ''}{p.delta.toLocaleString('ru-RU')}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2 md:gap-4 mt-3 pt-3 border-t" style={{ borderColor: muted }}>
        {pts.map((p) => (
          <div key={p.label} className="flex-1 text-center text-[11px] leading-[1.4] opacity-55">{p.label}</div>
        ))}
      </div>
      <div className="text-center font-mono text-[13px] mt-4" style={{ color: tone }}>
        Итог: {run.toLocaleString('ru-RU')}{unit}
      </div>
    </div>
  );
}

/* ─────────── Столбики по периодам ─────────── */
export function ColumnChart({
  items, tone, muted = 'rgba(255,255,255,0.10)', height = 200, unit = '', className = '',
}: Common & { items: { label: string; value: number; hi?: boolean }[]; height?: number; unit?: string }) {
  const { ref, on } = useReveal<HTMLDivElement>();
  const reduced = useReduced();
  const max = Math.max(...items.map((i) => i.value));

  return (
    <div ref={ref} className={className}>
      <div className="flex items-end gap-1.5 md:gap-3" style={{ height }}>
        {items.map((it, i) => (
          <div key={it.label} className="flex-1 flex flex-col justify-end items-center h-full">
            <span className="font-mono text-[11px] mb-2 whitespace-nowrap" style={{ color: it.hi ? tone : 'currentColor', opacity: it.hi ? 1 : 0.45 }}>
              {it.value}{unit}
            </span>
            <div
              className="w-full"
              style={{
                background: it.hi ? tone : muted,
                height: on ? (it.value / max) * (height - 34) : 0,
                transition: reduced ? 'none' : `height .7s cubic-bezier(.22,1,.36,1) ${i * 0.06}s`,
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-1.5 md:gap-3 mt-3">
        {items.map((it) => (
          <div key={it.label} className="flex-1 text-center text-[10.5px] opacity-45">{it.label}</div>
        ))}
      </div>
    </div>
  );
}

/* ─────────── Схема-план: подписанные зоны на сетке ─────────── */
export function PlanMap({
  zones, tone, muted = 'rgba(255,255,255,0.10)', className = '', caption,
}: Common & { zones: { x: number; y: number; w: number; h: number; t: string; hi?: boolean }[]; caption?: string }) {
  const { ref, on } = useReveal<HTMLDivElement>();
  const reduced = useReduced();

  return (
    <div ref={ref} className={className}>
      <svg viewBox="0 0 100 62" className="w-full h-auto" role="img" aria-label={caption || 'Схема территории'}>
        <defs>
          <pattern id="pm-grid" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M5 0 L0 0 0 5" fill="none" stroke={muted} strokeWidth="0.25" />
          </pattern>
        </defs>
        <rect width="100" height="62" fill="url(#pm-grid)" />
        {zones.map((z, i) => (
          <g key={z.t}
            style={{
              opacity: on ? 1 : 0,
              transition: reduced ? 'none' : `opacity .5s ease ${i * 0.1}s`,
            }}>
            <rect x={z.x} y={z.y} width={z.w} height={z.h}
                  fill={z.hi ? tone : 'transparent'} fillOpacity={z.hi ? 0.18 : 0}
                  stroke={tone} strokeWidth={z.hi ? 0.7 : 0.35} strokeDasharray={z.hi ? undefined : '1.5 1'} />
            <text x={z.x + z.w / 2} y={z.y + z.h / 2 + 1} textAnchor="middle"
                  fontSize="2.6" fill="currentColor" opacity={0.75}>{z.t}</text>
          </g>
        ))}
      </svg>
      {caption && <div className="text-[12px] mt-4 opacity-45 text-center">{caption}</div>}
    </div>
  );
}
