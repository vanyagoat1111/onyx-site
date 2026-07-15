import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  active: boolean;
  label: string;
  onDone: () => void;
  duration?: number;
}

export default function SpaceTransition({ active, label, onDone, duration = 900 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const cx = w / 2, cy = h / 2;
    const colors = ['rgba(78,124,255,', 'rgba(138,166,255,', 'rgba(168,85,247,', 'rgba(34,211,238,', 'rgba(255,255,255,'];
    const stars = Array.from({ length: 500 }, () => ({
      x: (Math.random() - 0.5) * 2 * w,
      y: (Math.random() - 0.5) * 2 * h,
      z: Math.random() * w, pz: 0,
      c: colors[(Math.random() * colors.length) | 0],
    }));
    const t0 = performance.now();
    const draw = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const speed = 10 + t * 150;
      ctx.fillStyle = 'rgba(3,5,12,0.32)';
      ctx.fillRect(0, 0, w, h);
      for (const s of stars) {
        s.pz = s.z; s.z -= speed;
        if (s.z < 1) { s.z = w; s.x = (Math.random() - 0.5) * 2 * w; s.y = (Math.random() - 0.5) * 2 * h; s.pz = s.z; }
        const sx = (s.x / s.z) * w + cx, sy = (s.y / s.z) * h + cy;
        const px = (s.x / s.pz) * w + cx, py = (s.y / s.pz) * h + cy;
        const size = (1 - s.z / w) * 4;
        const op = Math.min(1, 1 - s.z / w + t * 0.4);
        ctx.beginPath();
        ctx.strokeStyle = s.c + op + ')';
        ctx.lineWidth = size; ctx.lineCap = 'round';
        ctx.moveTo(px, py); ctx.lineTo(sx, sy); ctx.stroke();
      }
      if (t < 1) rafRef.current = requestAnimationFrame(draw);
      else onDone();
    };
    rafRef.current = requestAnimationFrame(draw);
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', onResize); };
  }, [active, duration, onDone]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[120] pointer-events-none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: 'radial-gradient(circle at center,#060a1a,#000 70%)' }}
        >
          <canvas ref={canvasRef} className="absolute inset-0" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="font-mono text-[11px] tracking-[0.4em] uppercase text-cobalt-soft mb-3">Переход к демо</div>
              <div className="font-display text-2xl md:text-3xl text-white font-semibold">{label}</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
