import React, { useState } from 'react';
import { Container, SectionTitle, Button } from './ui';
import { X } from 'lucide-react';
import EditorSimulator from './EditorSimulator';

const templates = [
  { 
    name: 'Мебельный магазин', 
    category: 'E-commerce',
    preview: (
      <div className="w-full h-full flex flex-col p-1 gap-1">
        <div className="flex justify-between items-center px-1">
          <div className="w-4 h-1 bg-onyx-700/50"></div>
          <div className="flex gap-1"><div className="w-2 h-1 bg-onyx-700/50"></div><div className="w-2 h-1 bg-onyx-700/50"></div></div>
        </div>
        <div className="w-full h-8 bg-neutral-800 rounded-sm"></div>
        <div className="grid grid-cols-3 gap-1 flex-grow">
          <div className="bg-onyx-800 rounded-sm"></div>
          <div className="bg-onyx-800 rounded-sm"></div>
          <div className="bg-onyx-800 rounded-sm"></div>
        </div>
      </div>
    )
  },
  { 
    name: 'Инфобизнес / Курсы', 
    category: 'Landing',
    preview: (
      <div className="w-full h-full flex flex-col p-2 space-y-2">
        <div className="w-full h-2 bg-gradient-to-r from-onyx-700 to-neutral-600 rounded-sm"></div>
        <div className="w-3/4 h-2 bg-onyx-700 rounded-sm"></div>
        <div className="w-1/2 h-1 bg-onyx-800 rounded-sm"></div>
        <div className="w-8 h-2 bg-white mt-2 mb-1"></div>
        <div className="grid grid-cols-2 gap-1 flex-grow mt-auto">
          <div className="bg-onyx-800 rounded-sm border border-onyx-700"></div>
          <div className="bg-onyx-800 rounded-sm border border-onyx-700"></div>
        </div>
      </div>
    )
  },
  { 
    name: 'Отели и Аренда', 
    category: 'Booking',
    preview: (
      <div className="w-full h-full relative">
        <div className="absolute inset-0 bg-neutral-800 flex flex-col justify-center items-center pb-4">
           <div className="w-1/2 h-2 rounded-sm bg-neutral-600 mb-2"></div>
           <div className="w-1/3 h-1 rounded-sm bg-neutral-700"></div>
        </div>
        <div className="absolute bottom-1 left-2 right-2 h-4 bg-onyx-900 border border-onyx-700 flex items-center px-1 gap-1">
          <div className="w-full h-1 bg-onyx-800"></div>
          <div className="w-4 h-2 bg-white rounded-sm"></div>
        </div>
      </div>
    )
  },
  { 
    name: 'Консалтинг', 
    category: 'Corporate',
    preview: (
      <div className="w-full h-full flex">
         <div className="w-4 border-r border-onyx-800 flex flex-col gap-1 p-1">
            <div className="w-full h-1 bg-onyx-700"></div>
            <div className="w-full h-1 bg-onyx-800"></div>
            <div className="w-full h-1 bg-onyx-800"></div>
         </div>
         <div className="flex-1 p-1 flex flex-col gap-1">
            <div className="w-full h-6 bg-onyx-800/50 border border-onyx-800"></div>
            <div className="flex gap-1 h-full">
              <div className="flex-1 bg-neutral-800 border-t-2 border-white"></div>
              <div className="flex-1 bg-onyx-800"></div>
            </div>
         </div>
      </div>
    )
  },
  { 
    name: 'Услуги Психолога', 
    category: 'Personal',
    preview: (
      <div className="w-full h-full flex flex-col items-center justify-center p-2 gap-2 bg-[#1a1a1a]">
        <div className="w-8 h-8 rounded-full border-2 border-neutral-700 bg-neutral-800"></div>
        <div className="flex flex-col items-center gap-1 w-full">
           <div className="w-1/2 h-1 bg-neutral-500 rounded-full"></div>
           <div className="w-3/4 h-1 bg-neutral-700 rounded-full"></div>
        </div>
        <div className="w-1/3 h-2 bg-onyx-600 rounded-full mt-1"></div>
      </div>
    )
  },
  { 
    name: 'SMM Агентство', 
    category: 'Creative',
    preview: (
      <div className="w-full h-full p-1 grid grid-cols-3 gap-1 grid-rows-3 bg-onyx-950">
        <div className="col-span-2 row-span-2 bg-white flex items-end p-1">
           <div className="w-1/2 h-1 bg-black"></div>
        </div>
        <div className="bg-onyx-800"></div>
        <div className="bg-neutral-800"></div>
        <div className="bg-onyx-900 border border-onyx-700 col-span-3 flex items-center justify-center">
           <div className="w-8 h-1 bg-white"></div>
        </div>
      </div>
    )
  },
];

export default function Templates() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  return (
    <Container id="templates">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
        <SectionTitle subtitle="Демонстрация" className="mb-0">Шаблоны<br/>Сайтов</SectionTitle>
        <p className="font-mono text-sm text-neutral-400 max-w-xs uppercase tracking-widest text-right">
          Выберите сферу и протестируйте симулятор. Демо-версии как настоящие, их можно менять под себя.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {templates.map((tpl, i) => (
          <div key={i} className="group flex flex-col border border-onyx-800 hover:border-blue-500/50 transition-colors bg-onyx-800/30 p-2 hover:shadow-[0_0_30px_rgba(30,58,138,0.2)]">
            <div className="relative aspect-video bg-onyx-900 border border-onyx-800 mb-4 overflow-hidden clip-diagonal group-hover:industrial-grid">
              {/* Window Controls */}
              <div className="absolute top-0 w-full h-6 border-b border-onyx-800 bg-onyx-950 flex items-center px-4 gap-2 z-10 transition-colors group-hover:bg-onyx-900">
                <div className="w-2 h-2 rounded-full bg-onyx-700 group-hover:bg-red-500/50 transition-colors"></div>
                <div className="w-2 h-2 rounded-full bg-onyx-700 group-hover:bg-yellow-500/50 transition-colors"></div>
                <div className="w-2 h-2 rounded-full bg-onyx-700 group-hover:bg-green-500/50 transition-colors"></div>
              </div>
              {/* Simulator Content */}
              <div className="mt-6 h-[calc(100%-24px)] opacity-50 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0 duration-500 bg-onyx-950">
                {tpl.preview}
              </div>
            </div>
            
            <div className="px-4 pb-4 flex justify-between items-center">
              <div>
                <div className="text-xs font-mono text-blue-400/70 mb-1 uppercase drop-shadow-[0_0_5px_rgba(59,130,246,0.3)]">{tpl.category}</div>
                <div className="font-bold tracking-wide uppercase group-hover:text-white transition-colors">{tpl.name}</div>
              </div>
              <Button variant="outline" className="px-4 py-2 text-xs group-hover:bg-blue-600/10 group-hover:text-blue-400 group-hover:border-blue-500/50 transition-all shadow-[0_0_0_rgba(59,130,246,0)] group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]" onClick={() => setActiveDemo(tpl.name)}>Демо</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Demo Modal Simulator */}
      {activeDemo && (
        <EditorSimulator templateName={activeDemo} onClose={() => setActiveDemo(null)} />
      )}
    </Container>
  );
}
