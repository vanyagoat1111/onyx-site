import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function DemoCloseButton() {
  return (
    <button 
      onClick={() => window.location.hash = '#templates'}
      className="fixed bottom-6 right-6 z-[100] bg-white text-black px-4 py-4 rounded-full shadow-2xl flex items-center gap-2 font-bold cursor-pointer transition-all hover:scale-105 group border-2 border-neutral-200"
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="hidden group-hover:inline pr-2">Вернуться к кейсам</span>
    </button>
  );
}
