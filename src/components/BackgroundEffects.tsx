import React from 'react';

export const GridEffect = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30 md:opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]">
    <div className="absolute inset-[-100%] bg-[linear-gradient(rgba(59,130,246,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.5)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:80px_80px] animate-[grid_20s_linear_infinite_reverse]" />
  </div>
);

export const DataStreamEffect = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20 md:opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]">
    <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(59,130,246,1)_25%,rgba(59,130,246,1)_26%,transparent_27%,transparent_74%,rgba(59,130,246,1)_75%,rgba(59,130,246,1)_76%,transparent_77%,transparent)] bg-[size:100%_100px] animate-[data-stream_15s_linear_infinite]" />
  </div>
);

export const TechNodesEffect = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
     <div className="absolute top-[20%] left-[10%] w-32 h-32 md:w-64 md:h-64 rounded-full border-[2px] border-blue-500/40 shadow-[0_0_60px_rgba(59,130,246,0.3)] animate-[float-slow_8s_ease-in-out_infinite]" />
     <div className="absolute bottom-[30%] right-[5%] w-48 h-48 md:w-96 md:h-96 rounded-full border-[2px] border-indigo-500/40 shadow-[0_0_80px_rgba(99,102,241,0.3)] animate-[float-slow_12s_ease-in-out_infinite_reverse]" />
     <div className="absolute top-[60%] left-[30%] w-40 h-40 md:w-80 md:h-80 rounded-full border-[2px] border-cyan-500/30 shadow-[0_0_70px_rgba(34,211,238,0.2)] animate-[float-slow_10s_ease-in-out_infinite_1s]" />
  </div>
);

export const RadarEffect = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40 md:opacity-70">
     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] md:w-[1200px] md:h-[1200px] rounded-full border border-blue-400/30 shadow-[0_0_50px_rgba(59,130,246,0.1)]" />
     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[800px] md:h-[800px] rounded-full border border-blue-400/50 shadow-[0_0_50px_rgba(59,130,246,0.2)]" />
     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] md:w-[400px] md:h-[400px] rounded-full border border-blue-400/70 shadow-[0_0_50px_rgba(59,130,246,0.3)]" />
     
     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] md:w-[1200px] md:h-[1200px] animate-[radar-spin_10s_linear_infinite]">
        <div className="w-[100vw] h-[100vw] md:w-[600px] md:h-[600px] bg-[conic-gradient(from_180deg_at_100%_100%,rgba(59,130,246,0.6)_0deg,transparent_90deg)] origin-bottom-right" />
     </div>
  </div>
);
