import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function DemoCloseButton() {
 return (
 <button
 onClick={() => window.location.hash = '#templates'}
 className="fixed top-6 left-6 z-[100] bg-obsidian-canvas text-bone px-4 py-3 rounded-sm flex items-center gap-2 cursor-pointer transition-colors hover:bg-carbon-lift group border border-ash-stroke"
 >
 <ArrowLeft className="w-5 h-5" />
 <span className="hidden group-hover:inline pr-2">Вернуться</span>
 </button>
 );
}
