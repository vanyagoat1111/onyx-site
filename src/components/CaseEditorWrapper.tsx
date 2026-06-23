import React, { useState, useEffect } from 'react';
import { 
  Palette, Type, Square, Smartphone, Monitor, MousePointer2, 
  Settings2, Wand2, RefreshCcw, X, GripHorizontal, Sun, Moon, Sparkles, Image as ImageIcon, Box, Grid
} from 'lucide-react';
import DemoCloseButton from './DemoCloseButton';

export default function CaseEditorWrapper({ children }: { children: React.ReactNode }) {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  
  // Editor State
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isEditable, setIsEditable] = useState(false);
  const [font, setFont] = useState('font-sans');
  const [radius, setRadius] = useState('default');
  
  // Visual FX State
  const [hue, setHue] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [invert, setInvert] = useState(false);
  const [animations, setAnimations] = useState(false);
  const [perspective, setPerspective] = useState(false);
  const [wireframe, setWireframe] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const resetSettings = () => {
    setViewMode('desktop');
    setIsEditable(false);
    setFont('font-sans');
    setRadius('default');
    setHue(0);
    setBrightness(100);
    setContrast(100);
    setSaturate(100);
    setGrayscale(0);
    setSepia(0);
    setInvert(false);
    setAnimations(false);
    setPerspective(false);
    setWireframe(false);
  };

  return (
    <div className={`min-h-screen bg-slate-100 flex transition-colors duration-500 ${invert ? 'bg-slate-900' : ''}`}>
      <DemoCloseButton />

      {/* Editor Panel Toggle Button */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
        {showTooltip && !isEditorOpen && (
          <div className="bg-white text-slate-950 px-4 py-2 rounded-lg shadow-lg text-sm font-bold animate-bounce relative border border-slate-200">
            Настройте этот сайт под себя!
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b border-r border-slate-200 rotate-45"></div>
          </div>
        )}
        <button 
          onClick={() => setIsEditorOpen(!isEditorOpen)}
          className="w-14 h-14 bg-slate-950 text-white rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] border border-slate-800 flex items-center justify-center hover:bg-white hover:text-slate-950 hover:scale-110 transition-all z-50 group"
        >
          {isEditorOpen ? <X className="w-6 h-6" /> : <Wand2 className="w-6 h-6 group-hover:animate-pulse" />}
        </button>
      </div>

      {/* Floating Editor Panel */}
      <div className={`fixed bottom-24 right-6 w-[340px] bg-slate-950 border border-slate-800 p-6 shadow-2xl z-[100] transition-all duration-200 ease-out transform origin-bottom-right rounded-2xl ${isEditorOpen ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible pointer-events-none'}`}>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-white font-bold">
            <Settings2 className="w-5 h-5 text-white" />
            <span>Панель управления</span>
          </div>
          <button onClick={resetSettings} className="text-slate-400 hover:text-white transition-colors" title="Сбросить">
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
          
          {/* Режим просмотра */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Monitor className="w-3.5 h-3.5" /> Устройство и вид
            </div>
            <div className="flex bg-slate-900 p-1 rounded-lg">
              <button 
                onClick={() => setViewMode('desktop')} 
                className={`flex-1 py-2 text-xs font-medium rounded-md transition-colors ${viewMode === 'desktop' ? 'bg-white text-slate-950 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                Desktop
              </button>
              <button 
                onClick={() => setViewMode('mobile')} 
                className={`flex-1 py-2 text-xs font-medium rounded-md transition-colors ${viewMode === 'mobile' ? 'bg-white text-slate-950 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                Mobile
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button 
                onClick={() => setPerspective(!perspective)} 
                className={`p-2 text-xs border rounded-lg transition-all flex items-center justify-center gap-2 ${perspective ? 'bg-white text-slate-950 border-white' : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600'}`}
              >
                <Box className="w-3.5 h-3.5" /> 3D Режим
              </button>
              <button 
                onClick={() => setWireframe(!wireframe)} 
                className={`p-2 text-xs border rounded-lg transition-all flex items-center justify-center gap-2 ${wireframe ? 'bg-white text-slate-950 border-white' : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600'}`}
              >
                <Grid className="w-3.5 h-3.5" /> Каркас
              </button>
            </div>
          </div>

          {/* Редактирование текста */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Type className="w-3.5 h-3.5" /> Интерактивность
            </div>
            <label className="flex items-center justify-between cursor-pointer group bg-slate-900 p-3 rounded-lg border border-transparent hover:border-slate-700 transition-colors">
              <span className="text-sm text-neutral-200 group-hover:text-white transition-colors">Редактировать текст</span>
              <div className="relative">
                <input type="checkbox" className="sr-only" checked={isEditable} onChange={() => setIsEditable(!isEditable)} />
                <div className={`block w-10 h-6 rounded-full transition-colors ${isEditable ? 'bg-white' : 'bg-slate-700'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-slate-950 w-4 h-4 rounded-full transition-transform ${isEditable ? 'transform translate-x-4' : 'bg-white'}`}></div>
              </div>
            </label>
            {isEditable && <div className="text-[10px] text-neutral-400 leading-tight">Кликните на любой текст на странице, чтобы изменить его.</div>}
            
            <label className="flex items-center justify-between cursor-pointer group bg-slate-900 p-3 rounded-lg border border-transparent hover:border-slate-700 transition-colors mt-2">
              <span className="text-sm text-neutral-200 group-hover:text-white transition-colors flex items-center gap-2"><Sparkles className="w-4 h-4 text-white" /> Анимации элементов</span>
              <div className="relative">
                <input type="checkbox" className="sr-only" checked={animations} onChange={() => setAnimations(!animations)} />
                <div className={`block w-10 h-6 rounded-full transition-colors ${animations ? 'bg-white' : 'bg-slate-700'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-slate-950 w-4 h-4 rounded-full transition-transform ${animations ? 'transform translate-x-4' : 'bg-white'}`}></div>
              </div>
            </label>
          </div>

          {/* Цветовая тема (Hue) */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Palette className="w-3.5 h-3.5" /> Цветовая палитра
            </div>
            <div className="bg-slate-900 p-4 rounded-lg space-y-4">
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-2"><span>Оттенок</span> <span>{hue}°</span></div>
                <input type="range" min="0" max="360" value={hue} onChange={(e) => setHue(Number(e.target.value))} className="w-full h-1.5 rounded-lg appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)` }} />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-2"><span>Яркость</span> <span>{brightness}%</span></div>
                <input type="range" min="50" max="150" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="w-full h-1.5 accent-slider rounded-lg appearance-none cursor-pointer bg-slate-700" />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-2"><span>Контраст</span> <span>{contrast}%</span></div>
                <input type="range" min="50" max="150" value={contrast} onChange={(e) => setContrast(Number(e.target.value))} className="w-full h-1.5 accent-slider rounded-lg appearance-none cursor-pointer bg-slate-700" />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-2"><span>Насыщенность</span> <span>{saturate}%</span></div>
                <input type="range" min="0" max="200" value={saturate} onChange={(e) => setSaturate(Number(e.target.value))} className="w-full h-1.5 accent-slider rounded-lg appearance-none cursor-pointer bg-slate-700" />
              </div>
            </div>
          </div>

          {/* Фильтры */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="w-3.5 h-3.5" /> Эффекты
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setGrayscale(grayscale === 100 ? 0 : 100)} className={`p-2 text-xs border rounded-lg transition-all ${grayscale === 100 ? 'bg-white text-slate-950 border-white' : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600'}`}>Ч/Б фильтр</button>
              <button onClick={() => setSepia(sepia === 100 ? 0 : 100)} className={`p-2 text-xs border rounded-lg transition-all ${sepia === 100 ? 'bg-white text-slate-950 border-white' : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600'}`}>Сепия</button>
              <button onClick={() => setInvert(!invert)} className={`p-2 text-xs border rounded-lg transition-all col-span-2 flex items-center justify-center gap-2 ${invert ? 'bg-white text-slate-950 border-white' : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600'}`}>
                {invert ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />} 
                {invert ? 'Светлая/Темная тема' : 'Светлая/Темная тема'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .case-preview-container {
           filter: hue-rotate(${hue}deg) brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) grayscale(${grayscale}%) sepia(${sepia}%) ${invert ? 'invert(1) hue-rotate(180deg)' : ''};
        }
        
        ${invert ? `
          .case-preview-container img, .case-preview-container video {
             filter: invert(1) hue-rotate(180deg);
          }
        ` : ''}
        
        ${animations ? `
          .case-preview-container img, .case-preview-container button, .case-preview-container a {
             animation: breathe 4s ease-in-out infinite;
          }
          @keyframes breathe {
             0%, 100% { transform: scale(1); }
             50% { transform: scale(1.02); }
          }
        ` : ''}

        ${radius === 'square' ? `.case-preview-container * { border-radius: 0 !important; }` : ''}
        ${radius === 'rounded' ? `.case-preview-container button, .case-preview-container .card { border-radius: 9999px !important; }` : ''}
        
        ${wireframe ? `
          .case-preview-container * {
             background: transparent !important;
             color: ${invert ? '#000' : '#fff'} !important;
             border: 1px solid rgba(${invert ? '0,0,0' : '255,255,255'}, 0.2) !important;
             box-shadow: none !important;
          }
          .case-preview-container img, .case-preview-container video {
             opacity: 0.2 !important;
          }
        ` : ''}

        ${perspective && viewMode === 'mobile' ? `
          .render-area-wrapper {
             perspective: 1500px;
          }
          .render-area-inner {
             transform: rotateX(15deg) rotateY(-10deg) scale(0.9);
             box-shadow: -20px 20px 50px rgba(0,0,0,0.5);
             border-radius: 3.5rem;
          }
        ` : ''}
        
        ${perspective && viewMode === 'desktop' ? `
          .render-area-wrapper {
             perspective: 3000px;
          }
          .macbook-3d-wrapper {
             transform: rotateX(8deg) rotateY(-4deg) scale(1);
             transform-style: preserve-3d;
             transition: transform 0.5s ease;
          }
          .macbook-3d-wrapper:hover {
             transform: rotateX(2deg) rotateY(-1deg) scale(1.02);
          }
        ` : ''}

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
        }
        
        .accent-slider {
          background: hsl(${hue}, 80%, 50%) !important;
        }
      `}</style>

      {/* Render Area */}
      <div className="render-area-wrapper w-full flex-1 flex flex-col items-center min-h-screen pt-4 pb-12 overflow-x-hidden">
        <div 
          className={`render-area-inner w-full transition-all duration-700 ease-in-out flex flex-col items-center relative
            ${viewMode === 'mobile' 
              ? 'max-w-[393px] h-[852px] my-10 mx-auto border-[14px] border-black rounded-[3.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-y-auto overflow-x-hidden bg-white ring-1 ring-slate-800' 
              : `max-w-full ${perspective ? 'w-full max-w-[1600px] my-12' : 'bg-white min-h-screen'}`
            }`}
        >
          {viewMode === 'mobile' && (
            <div className="sticky top-0 w-full h-0 z-[100] flex justify-center pt-3 pointer-events-none">
               <div className="w-[110px] h-[32px] bg-black rounded-full shadow-md flex items-center justify-between px-3 pointer-events-auto">
                 <div className="w-3 h-3 rounded-full bg-slate-800/80 border border-slate-700/50"></div>
                 <div className="w-1.5 h-1.5 rounded-full bg-slate-800/80"></div>
               </div>
            </div>
          )}

          {viewMode === 'desktop' && perspective ? (
            <div className="macbook-3d-wrapper w-[95%] max-w-[1400px] flex flex-col items-center justify-center relative mt-10">
               {/* Screen Frame */}
               <div className="w-full aspect-[16/10] bg-black border-[12px] md:border-[16px] border-black rounded-t-2xl md:rounded-t-3xl rounded-b-lg relative shadow-2xl flex flex-col overflow-hidden ring-1 ring-slate-800 z-10 mx-auto">
                  {/* Macbook Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] md:w-[160px] h-[24px] md:h-[30px] bg-black rounded-b-xl md:rounded-b-2xl z-[100] flex items-center justify-center">
                     <div className="w-3 h-3 rounded-full bg-slate-800/80 border border-slate-700/50"></div>
                     <div className="w-1.5 h-1.5 rounded-full bg-green-500/80 absolute right-6 opacity-70 shadow-[0_0_8px_rgba(34,197,94,1)]"></div>
                  </div>
                  {/* Screen Content - Scrollable */}
                  <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-white custom-scrollbar relative">
                    <div 
                      className={`case-preview-container w-full min-h-full origin-top ${font}`} 
                      contentEditable={isEditable}
                      suppressContentEditableWarning={true}
                      style={{ outline: 'none' }}
                    >
                       <div onClick={(e) => isEditable && e.preventDefault()}>
                         {children}
                       </div>
                    </div>
                  </div>
               </div>
               
               {/* Macbook Base Component */}
               <div className="relative z-20 w-[115%] -mt-1 mx-auto flex flex-col items-center">
                 {/* Top edge of base */}
                 <div className="w-full h-3 md:h-4 bg-gradient-to-b from-[#e8e8e8] to-[#c8c8c8] rounded-t-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] border-t border-[#f5f5f5] flex justify-center items-start">
                   {/* Trackpad indentation visible slightly from this angle */}
                   <div className="w-32 md:w-48 h-1 bg-[#b0b0b0] opacity-50 rounded-b-md mt-0"></div>
                 </div>
                 {/* Front face of base */}
                 <div className="w-[99%] h-4 md:h-6 bg-gradient-to-b from-[#b0b0b0] to-[#888] rounded-b-[1.5rem] md:rounded-b-[2rem] shadow-[0_40px_60px_rgba(0,0,0,0.6)] flex justify-center relative overflow-hidden">
                   {/* Opening lip */}
                   <div className="w-24 md:w-32 h-1.5 md:h-2 bg-[#777] rounded-b-lg mt-0 shadow-inner"></div>
                 </div>
                 {/* Shadow on table */}
                 <div className="absolute -bottom-6 md:-bottom-10 w-[90%] h-8 md:h-12 bg-black/30 blur-xl md:blur-2xl rounded-[100%]"></div>
               </div>
            </div>
          ) : (
            <div 
              className={`case-preview-container w-full h-full flex-1 origin-top ${font}`} 
              contentEditable={isEditable}
              suppressContentEditableWarning={true}
              style={{ outline: 'none' }}
            >
               <div onClick={(e) => isEditable && e.preventDefault()}>
                 {children}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
