import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function DemoCloseButton() {
  return (
    <button 
      onClick={() => window.location.hash = '#templates'}
      className="fixed top-6 left-6 z-[100] bg-white text-slate-950 px-4 py-3 rounded-full shadow-lg flex items-center gap-2 font-bold cursor-pointer transition-all hover:scale-105 group border border-slate-200"
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="hidden group-hover:inline pr-2">Вернуться</span>
    </button>
  );
}
