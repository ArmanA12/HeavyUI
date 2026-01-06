
import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { COMPONENTS_DATA } from '../constants';
import { UIComponent } from '../types';
import { Play, PlayCircle, Video } from 'lucide-react';

const ComponentCard: React.FC<{ 
  component: UIComponent; 
  idx: number; 
  span?: string;
  onSelect: (comp: UIComponent) => void;
}> = ({ component, idx, span = "", onSelect }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.2, once: false });
  const [isHovered, setIsHovered] = useState(false);

  const shouldRenderVideo = isInView || isHovered;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(component)}
      className={`group relative flex flex-col h-full cursor-pointer ${span}`}
    >
      <div className="relative flex-1 bg-zinc-50/50 dark:bg-[#1a1a1a] border border-black/5 dark:border-white/5 overflow-hidden rounded-[1rem] lg:rounded-[1rem] blade-hover p-3 lg:p-[12px] shadow-sm transition-all hover:border-amber-500/20 h-full">
        <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] lg:rounded-[1rem] bg-zinc-200 dark:bg-black">
          <motion.img 
            animate={{ opacity: isHovered ? 0 : 1 }}
            src={component.previewUrl} 
            alt={component.name}
            className="absolute inset-0 w-full h-full object-cover grayscale-[0.5]"
          />

          <AnimatePresence>
            {shouldRenderVideo && component.videoUrl && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: isHovered ? 1 : 0.4 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10">
                <video src={component.videoUrl} muted playsInline loop autoPlay className="w-full h-full object-cover" />
              </motion.div>
            )}
            {shouldRenderVideo && component.id === 'scanner-x' && isHovered && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 flex items-center justify-center bg-amber-500/10">
                 <div className="h-full w-[2px] bg-amber-500 animate-[scan_2s_linear_infinite] shadow-[0_0_15px_#f59e0b]"></div>
               </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute top-4 lg:top-6 left-4 lg:left-6 flex flex-col gap-1 z-20">
            <div className="flex items-center gap-2">
               <span className={`w-1.5 h-1.5 rounded-full ${isHovered ? 'bg-amber-500 shadow-[0_0_8px_#f59e0b]' : 'bg-zinc-600'}`}></span>
               <span className="font-mono text-[7px] lg:text-[8px] text-white uppercase tracking-widest bg-black/50 px-2 py-0.5 rounded backdrop-blur-md">
                 {isHovered ? 'Live Preview' : 'Screenshots'}
               </span>
            </div>
          </div>

          <div className="absolute bottom-4 lg:bottom-6 left-4 lg:left-6 right-4 lg:right-6 flex justify-between items-end z-20">
             <div className="max-w-[75%]">
                <h3 className="text-sm lg:text-lg font-black uppercase tracking-tight text-white drop-shadow-lg mb-0.5 lg:mb-1">
                  {component.name}
                </h3>
                <span className="font-mono text-[7px] lg:text-[8px] text-zinc-300 uppercase tracking-widest bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded">
                  {component.id.includes('scanner') ? 'Not Free' : `MOD_${component.id}`}
                </span>
             </div>
             {component.isPaid && (
                <div className="px-2 py-0.5 bg-amber-500 text-white rounded-full text-[6px] lg:text-[7px] font-mono uppercase tracking-widest font-black">
                  Paid
                </div>
             )}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </motion.div>
  );
};

const ComponentListRow: React.FC<{
  component: UIComponent;
  idx: number;
  onSelect: (comp: UIComponent) => void;
}> = ({ component, idx, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={() => onSelect(component)}
      className="group relative flex items-center py-6 px-8 border-b border-black/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-white/5 cursor-pointer transition-all duration-300 overflow-visible"
    >
      <div className="w-16 font-mono text-[10px] text-zinc-400 group-hover:text-amber-500 transition-colors">
        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
      </div>
      
      <div className="flex-1">
        <h4 className="text-lg font-black uppercase tracking-tight group-hover:text-amber-500 transition-colors flex items-center gap-3">
          {component.name}
          {component.isPaid && (
            <span className="text-[7px] font-mono bg-amber-500 text-white px-2 py-0.5 rounded-full uppercase tracking-widest">Paid</span>
          )}
        </h4>
        <div className="flex items-center gap-4 mt-1">
          <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">{component.category}</span>
          <span className="w-1 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full"></span>
          <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">MOD_{component.id}</span>
        </div>
      </div>

      <div className="hidden md:flex flex-col items-end mr-12">
        <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest mb-1">Installs</span>
        <span className="font-black text-sm">{component.installs}</span>
      </div>

      <div className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all">
        <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
      </div>

      {/* Floating Video Preview */}
      <AnimatePresence>
        {isHovered && component.videoUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            style={{ 
              position: 'fixed',
              left: mousePos.x + 20,
              top: mousePos.y - 120,
              zIndex: 1000,
              pointerEvents: 'none'
            }}
            className="w-64 aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/20"
          >
            <video 
              src={component.videoUrl} 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_10px_#f59e0b]"></div>
              <span className="font-mono text-[8px] text-white uppercase tracking-widest">Live_Module_Preview</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ArrowUpRight = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

const ComponentGrid: React.FC<{ 
  onSelect: (comp: UIComponent) => void;
  viewMode?: 'grid' | 'list';
}> = ({ onSelect, viewMode = 'grid' }) => {
  const getSpan = (idx: number) => {
    switch (idx) {
      case 0: return "md:col-span-2 md:row-span-1"; // Highlight Scanner
      case 1: return "md:col-span-1 md:row-span-1";
      case 2: return "md:col-span-1 md:row-span-2";
      case 3: return "md:col-span-1 md:row-span-1";
      case 4: return "md:col-span-1 md:row-span-1";
      case 5: return "md:col-span-2 md:row-span-1";
      default: return "";
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col border border-black/5 dark:border-white/5 rounded-[1rem] overflow-hidden bg-white/50 dark:bg-[#1a1a1a]/50 backdrop-blur-xl"
      >
        {COMPONENTS_DATA.map((comp, i) => (
          <ComponentListRow key={comp.id} component={comp} idx={i} onSelect={onSelect} />
        ))}
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-3 auto-rows-[300px] lg:auto-rows-[350px]">
      {COMPONENTS_DATA.map((comp, i) => (
        <ComponentCard key={comp.id} component={comp} idx={i} span={getSpan(i)} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default ComponentGrid;
