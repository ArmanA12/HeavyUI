
import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { TEMPLATES_DATA } from '../constants';
import { Template } from '../types';
import { ArrowUpRight, Cpu, Terminal, ArrowRight, LayoutGrid, List } from 'lucide-react';

const TemplateCard: React.FC<{ template: Template; idx: number }> = ({ template, idx }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.1, once: false });
  const [isHovered, setIsHovered] = useState(false);

  const shouldRenderVideo = isInView || isHovered;

  return (
    <div 
      ref={containerRef}
      className="w-full mb-8 lg:mb-20 last:mb-0 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-zinc-50/50 dark:bg-[#1a1a1a] border border-black/5 dark:border-white/5 rounded-[1rem] lg:rounded-[1rem] transition-all duration-700 hover:border-amber-500/30 shadow-sm p-2 lg:p-3 overflow-hidden">
        
        {/* PREVIEW CONTAINER */}
        <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-[21/6] min-h-[180px] rounded-[1rem] lg:rounded-[1rem] overflow-hidden mb-6 lg:mb-8 border border-black/[0.03] dark:border-white/5 bg-black w-full">
          <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-3 h-full w-full overflow-hidden">
            {template.previewImages.slice(0, 3).map((img, i) => (
              <div 
                key={i} 
                className={`relative h-full border-black/[0.03] dark:border-white/5 overflow-hidden 
                  ${i === 0 ? 'block' : 'hidden sm:block'} 
                  ${i > 0 ? 'sm:border-l' : ''}`}
              >
                <motion.img 
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 1.05 : 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  src={img} 
                  className="w-full h-full object-cover grayscale-[0.2]" 
                  alt={`${template.name} preview ${i}`} 
                />
              </div>
            ))}
          </div>

          <AnimatePresence>
            {shouldRenderVideo && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: isHovered ? 1 : 0.4 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 pointer-events-none">
                {template.videoUrl && (
                  <video src={template.videoUrl} muted loop playsInline autoPlay className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute top-3 lg:top-6 left-3 lg:left-6 flex gap-3 z-20">
            <div className="px-2 lg:px-3 py-1 bg-black/70 backdrop-blur-xl rounded-full border border-white/5 flex items-center gap-2">
              <span className={`w-1 lg:w-1.5 h-1 lg:h-1.5 rounded-full ${isHovered ? 'bg-amber-500 animate-pulse' : 'bg-zinc-600'}`}></span>
              <span className="font-mono text-[6px] lg:text-[8px] text-white uppercase tracking-[0.2em] font-bold">
                {isHovered ? 'LIVE_STREAM' : 'BUFFER_IDLE'}
              </span>
            </div>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-12">
          <div className="lg:col-span-2 flex flex-col justify-center">
            <span className="font-mono text-[8px] lg:text-[9px] text-amber-600 dark:text-amber-500 uppercase tracking-[0.4em] font-black mb-1 lg:mb-2">
              Blueprint // 0x{idx + 1}
            </span>
            <h3 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter leading-none mb-3 lg:mb-4 group-hover:text-amber-500 transition-colors">
              {template.name}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-500 text-xs lg:text-sm max-w-xl font-light leading-relaxed">
              {template.description || "High-performance architecture with integrated telemetry and native motion support."}
            </p>
          </div>

          <div className="lg:col-span-1 flex flex-col lg:border-l border-black/[0.03] dark:border-white/5 lg:pl-12 justify-center">
            <span className="font-mono text-[7px] lg:text-[8px] text-zinc-400 uppercase tracking-[0.3em] mb-3 lg:mb-4">Stack_Config</span>
            <div className="flex flex-wrap gap-2 lg:gap-3">
              {template.techStack?.map((tech, i) => (
                <div key={i} className="flex items-center gap-2 group/stack">
                  <div className="w-5 h-5 lg:w-7 lg:h-7 rounded-md lg:rounded-lg bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-400 group-hover/stack:text-amber-500 transition-colors">
                    {i % 2 === 0 ? <Cpu size={8} className="lg:w-[10px] lg:h-[10px]" /> : <Terminal size={8} className="lg:w-[10px] lg:h-[10px]" />}
                  </div>
                  <span className="font-mono text-[6px] lg:text-[7px] text-zinc-500 uppercase tracking-widest">{tech}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1 flex items-center pt-2 lg:pt-0">
            <button className="group/btn relative w-full h-12 lg:h-16 bg-black dark:bg-white text-white dark:text-black rounded-lg lg:rounded-2xl overflow-hidden transition-all hover:scale-[1.01] shadow-sm">
              <div className="absolute inset-0 bg-amber-500 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700 ease-[0.16,1,0.3,1]"></div>
              <span className="relative z-10 flex items-center justify-center gap-2 lg:gap-3 font-black uppercase text-[8px] lg:text-[9px] tracking-[0.4em]">
                Live Preview <ArrowUpRight size={12} className="lg:w-3.5 lg:h-3.5 group-hover/btn:rotate-45 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TemplateListRow: React.FC<{
  template: Template;
  idx: number;
}> = ({ template, idx }) => {
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
      className="group relative flex items-center py-6 lg:py-10 px-6 lg:px-12 border-b border-black/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-white/5 cursor-pointer transition-all duration-500 overflow-visible"
    >
      {/* INDEX */}
      <div className="w-12 lg:w-20 font-mono text-[9px] lg:text-[10px] text-zinc-400 group-hover:text-amber-500 transition-colors shrink-0">
        T-{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
      </div>
      
      {/* INFO */}
      <div className="flex-1 min-w-0 pr-4 lg:pr-8">
        <h4 className="text-base lg:text-2xl font-black uppercase tracking-tight group-hover:text-amber-500 transition-colors flex items-center gap-3 lg:gap-4 truncate">
          {template.name}
          {template.isPaid && (
            <span className="text-[6px] lg:text-[8px] font-mono bg-amber-500 text-white px-2 lg:px-3 py-1 rounded-full uppercase tracking-[0.2em] shrink-0">Premium</span>
          )}
        </h4>
        <div className="flex items-center gap-3 lg:gap-6 mt-1 lg:mt-3 overflow-hidden">
          <span className="font-mono text-[8px] lg:text-[10px] text-zinc-400 uppercase tracking-widest shrink-0">{template.useCase}</span>
          <span className="hidden sm:block w-1 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full"></span>
          <div className="hidden sm:flex gap-3 overflow-hidden">
             {template.techStack?.slice(0, 3).map(tech => (
               <span key={tech} className="font-mono text-[8px] lg:text-[10px] text-zinc-500 uppercase tracking-tighter shrink-0">#{tech}</span>
             ))}
          </div>
        </div>
      </div>

      {/* STATUS - Desktop only */}
      <div className="hidden xl:flex flex-col items-end mr-16 shrink-0">
        <span className="font-mono text-[8px] text-zinc-400 uppercase tracking-[0.3em] mb-1">Architecture</span>
        <span className="font-black text-xs uppercase tracking-widest text-zinc-300 dark:text-zinc-600">Stable_Release</span>
      </div>

      {/* ACTION PILL */}
      <div className="group/btn relative w-32 lg:w-48 h-10 lg:h-14 bg-black dark:bg-white text-white dark:text-black rounded-xl lg:rounded-2xl overflow-hidden transition-all duration-500 shadow-xl shrink-0">
        <div className="absolute inset-0 bg-amber-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
        <span className="relative z-10 flex items-center justify-center h-full gap-2 lg:gap-3 font-mono text-[8px] lg:text-[10px] font-black uppercase tracking-[0.2em] group-hover/btn:text-white dark:group-hover/btn:text-black">
          <span className="hidden sm:inline">View_Demo</span> 
          <span className="sm:hidden">Demo</span>
          <ArrowUpRight size={14} className="group-hover/btn:rotate-45 transition-transform" />
        </span>
      </div>

      {/* Floating Video Preview with Viewport Awareness */}
      <AnimatePresence>
        {isHovered && template.videoUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            style={{ 
              position: 'fixed',
              left: mousePos.x + 30,
              // If mouse is in bottom half of screen, show video above the cursor
              top: mousePos.y > (window.innerHeight / 2) ? mousePos.y - 210 : mousePos.y + 20,
              zIndex: 1000,
              pointerEvents: 'none'
            }}
            className="w-64 lg:w-80 aspect-video bg-black rounded-2xl lg:rounded-[1rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] border border-white/10 backdrop-blur-3xl"
          >
            <video 
              src={template.videoUrl} 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-5 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse shadow-[0_0_10px_#f59e0b]"></div>
                <span className="font-mono text-[7px] lg:text-[9px] text-white uppercase tracking-[0.4em] font-black">Live_Module_Preview</span>
              </div>
              <span className="font-mono text-[6px] lg:text-[8px] text-zinc-500 uppercase tracking-widest">Resolution: 2160p // Rate: 120hz</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const TemplatesSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="max-w-[1600px] mx-auto transition-colors py-16 lg:py-40 px-6 lg:px-12">
      <div className="mb-10 lg:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-12 border-b border-black/[0.03] dark:border-white/5 pb-8 lg:pb-12">
        <div className="max-w-4xl">
          <span className="font-mono text-[8px] lg:text-[10px] tracking-[0.5em] text-zinc-400 dark:text-zinc-500  mb-3 lg:mb-4 block font-black">Archive.02 // Structural</span>
          <h2 className="text-4xl lg:text-7xl font-black tracking-tighter leading-[0.8] ">
            Temp<span className="text-zinc-200 dark:text-zinc-900 transition-colors">lates.</span>
          </h2>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button className="group relative flex items-center dark:bg-[#1a1a1a] backdrop-blur-xl border border-black/5 dark:border-white/5 rounded-full p-1 lg:p-1.5 transition-all duration-500 hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] overflow-hidden flex-1 md:flex-none md:w-auto">
            <div className="absolute inset-0 bg-black dark:bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-[0.16,1,0.3,1]"></div>
            <span className="relative z-10 pl-4 pr-2 lg:pl-6 lg:pr-4 py-2 font-mono text-[8px] lg:text-[10px] tracking-[0.3em] uppercase transition-colors duration-500 group-hover:text-white dark:group-hover:text-black flex-1 text-left">
              <span className="font-black">View All Templates</span> 
            </span>
            <div className="relative z-10 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-black dark:bg-white flex items-center justify-center transition-all duration-500 group-hover:bg-amber-500 group-hover:scale-95 shadow-lg">
              <ArrowRight size={12} className="lg:w-3.5 lg:h-3.5 text-white dark:text-black transition-transform duration-500 group-hover:translate-x-0.5" />
            </div>
          </button>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-zinc-100 dark:bg-white/5 p-1 rounded-full border border-black/5 dark:border-white/5">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 lg:p-3 rounded-full transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-white/10 text-amber-500 shadow-sm' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-white'}`}
              title="Grid View"
            >
              <LayoutGrid size={16} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 lg:p-3 rounded-full transition-all ${viewMode === 'list' ? 'bg-white dark:bg-white/10 text-amber-500 shadow-sm' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-white'}`}
              title="List View"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      <motion.div 
        key={viewMode}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col"
      >
        {viewMode === 'grid' ? (
          <div className="flex flex-col gap-6 lg:gap-8">
            {TEMPLATES_DATA.map((template, idx) => (
              <TemplateCard key={template.id} template={template} idx={idx} />
            ))}
          </div>
        ) : (
          <div className="border border-black/5 dark:border-white/5 rounded-[1rem] lg:rounded-[1rem] overflow-hidden bg-white/50 dark:bg-[#1a1a1a]/50 backdrop-blur-xl">
            {TEMPLATES_DATA.map((template, idx) => (
              <TemplateListRow key={template.id} template={template} idx={idx} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TemplatesSection;
