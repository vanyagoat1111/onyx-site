import React, { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const stars: Star[] = [];
    const numStars = 1000; // Massive amount of particles

    class Star {
      x: number;
      y: number;
      z: number;
      pz: number;
      color: string;

      constructor() {
        this.x = (Math.random() - 0.5) * 2 * w;
        this.y = (Math.random() - 0.5) * 2 * h;
        this.z = Math.random() * w;
        this.pz = this.z;
        
        // Tech colors: blue, indigo, purple, cyan
        const colors = [
          'rgba(59, 130, 246, 1)',   // blue-500
          'rgba(99, 102, 241, 1)',   // indigo-500
          'rgba(168, 85, 247, 1)',   // purple-500
          'rgba(34, 211, 238, 1)'    // cyan-400
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(speed: number) {
        this.z -= speed;
        if (this.z < 1) {
          this.z = w;
          this.x = (Math.random() - 0.5) * 2 * w;
          this.y = (Math.random() - 0.5) * 2 * h;
          this.pz = this.z;
        }
      }

      draw() {
        if (!ctx) return;
        
        const cx = w / 2;
        const cy = h / 2;
        
        const sx = (this.x / this.z) * w + cx;
        const sy = (this.y / this.z) * h + cy;
        const px = (this.x / this.pz) * w + cx;
        const py = (this.y / this.pz) * h + cy;

        this.pz = this.z;

        // Don't draw if out of bounds
        if (sx < 0 || sx > w || sy < 0 || sy > h) return;

        const size = (1 - this.z / w) * 4;
        const opacity = (1 - this.z / w);

        ctx.beginPath();
        ctx.strokeStyle = this.color.replace('1)', `${opacity})`);
        ctx.lineWidth = size;
        ctx.lineCap = 'round';
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
        
        // Glow head
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.arc(sx, sy, size / 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      stars.length = 0;
      const currentNumStars = (window.innerWidth < 768) ? 100 : 350;
      for (let i = 0; i < currentNumStars; i++) {
        stars.push(new Star());
      }
    };

    let mouseX = 0;
    let mouseY = 0;
    let targetSpeed = 1.5;
    let currentSpeed = 1.5;

    const animate = () => {
      // Clear with transparent background to allow CSS gradients to show through
      ctx.clearRect(0, 0, w, h);

      // Smooth speed transition
      currentSpeed += (targetSpeed - currentSpeed) * 0.05;
      
      ctx.save();
      // Parallax effect based on mouse
      ctx.translate(mouseX * 0.05, mouseY * 0.05);

      for (let i = 0; i < stars.length; i++) {
        stars[i].update(currentSpeed);
        stars[i].draw();
      }
      
      ctx.restore();
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      init();
    };
    
    const handleMouseMove = (e: MouseEvent) => {
       mouseX = e.clientX - w / 2;
       mouseY = e.clientY - h / 2;
       // Speed up when mouse moves away from center
       const dist = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
       targetSpeed = 1.5 + (dist / w) * 15; // Max speed multiplier
    };
    
    const handleMouseLeave = () => {
       mouseX = 0;
       mouseY = 0;
       targetSpeed = 1.5;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 mix-blend-screen opacity-90"
    />
  );
}
