import React, { useEffect, useRef } from 'react';

export default function MassiveFigure() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    
    let nodes: [number, number, number][] = [];
    let edges: [number, number][] = [];
    
    const init = () => {
      nodes = [];
      edges = [];
      
      const isMobile = window.innerWidth < 768;
      const numU = isMobile ? 25 : 40; // main ring segments
      const numV = isMobile ? 12 : 20; // tube segments
      const R = 1.8;   // main radius
      const r = 0.7;   // tube radius
      
      for (let i = 0; i <= numU; i++) {
        const u = 2 * Math.PI * i / numU;
        for (let j = 0; j <= numV; j++) {
          const v = 2 * Math.PI * j / numV;
          const x = (R + r * Math.cos(v)) * Math.cos(u);
          const y = (R + r * Math.cos(v)) * Math.sin(u);
          const z = r * Math.sin(v);
          nodes.push([x, y, z]);
        }
      }
      
      for (let i = 0; i < numU; i++) {
        for (let j = 0; j < numV; j++) {
          const current = i * (numV + 1) + j;
          const next = current + 1;
          const bottom = (i + 1) * (numV + 1) + j;
          edges.push([current, next]);
          edges.push([current, bottom]);
        }
      }
    };
    
    init();
    
    let angleX = 0;
    let angleY = 0;
    let angleZ = 0;
    let animationFrameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Rotation speeds
      angleX += 0.001;
      angleY += 0.0015;
      angleZ += 0.0005;
      
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosZ = Math.cos(angleZ);
      const sinZ = Math.sin(angleZ);
      
      const radius = Math.min(w, h) * 0.45; // Huge size
      const centerX = w * 0.7; // Offset to the right
      const centerY = h * 0.5; // Centered vertically
      
      const projected = nodes.map(node => {
        let [x, y, z] = node;
        
        // Rotate X
        let y1 = y * cosX - z * sinX;
        let z1 = y * sinX + z * cosX;
        
        // Rotate Y
        let x2 = x * cosY + z1 * sinY;
        let z2 = -x * sinY + z1 * cosY;

        // Rotate Z
        let x3 = x2 * cosZ - y1 * sinZ;
        let y3 = x2 * sinZ + y1 * cosZ;
        
        // Project
        const distance = 5; // Camera distance
        const zDist = distance + z2;
        const px = (x3 / zDist) * radius * 2 + centerX;
        const py = (y3 / zDist) * radius * 2 + centerY;
        
        return [px, py, z2];
      });
      
      ctx.lineWidth = 1;
      
      for (let i = 0; i < edges.length; i++) {
        const p1 = projected[edges[i][0]];
        const p2 = projected[edges[i][1]];
        
        const avgZ = (p1[2] + p2[2]) / 2;
        // Calculate depth opacity (z ranges roughly from -(R+r) to (R+r) = -2.5 to 2.5)
        const normalizedZ = (avgZ + 2.5) / 5.0; // roughly 0 to 1
        const opacity = Math.max(0.02, Math.min(1.0, normalizedZ));
        
        ctx.beginPath();
        // Tech blue with depth-based fading
        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.35})`; 
        ctx.moveTo(p1[0], p1[1]);
        ctx.lineTo(p2[0], p2[1]);
        ctx.stroke();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      init();
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[2] mix-blend-screen opacity-100"
    />
  );
}
