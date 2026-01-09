
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UIComponent } from '../types';
import { 
  Copy, 
  Download, 
  RefreshCw, 
  Maximize2, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Zap,
  ExternalLink,
  X,
  Layout,
  Terminal,
  FileCode
} from 'lucide-react';
import { DynamicPreview } from './PreviewRegistry';

interface DetailViewProps {
  component: UIComponent;
  onBack: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSearchOpen: () => void;
}

const ComponentDetailView: React.FC<DetailViewProps> = ({ 
  component, 
  onBack, 
  onNext, 
  onPrev, 
  onSearchOpen 
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [key, setKey] = useState(0); 
  const [fullScreenMode, setFullScreenMode] = useState<'none' | 'preview' | 'code'>('none');

  const handleCopy = () => {
    if (component.codeSnippet) {
      navigator.clipboard.writeText(component.codeSnippet);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (component.codeSnippet) {
      const blob = new Blob([component.codeSnippet], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${component.name.replace(/\s+/g, '_').toLowerCase()}.tsx`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleExpandCode = () => {
    setFullScreenMode('code');
  };

  const handleReload = () => setKey(prev => prev + 1);

  const isAnyFullScreen = fullScreenMode !== 'none';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] bg-white dark:bg-black overflow-hidden flex font-sans "
    >
      {/* PANEL 1: SPECIFICATIONS (25% WIDTH) */}
      <AnimatePresence>
        {!isAnyFullScreen && (
          <motion.div 
            initial={{ width: 0, opacity: 0, x: -50 }}
            animate={{ width: '25%', opacity: 1, x: 0 }}
            exit={{ width: 0, opacity: 0, x: -50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="h-full border-r no-scrollbar border-black/5 dark:border-white/5 flex flex-col bg-white dark:bg-black overflow-y-auto custom-scrollbar z-20"
          >
            <div className="p-10 space-y-10">
              <section className="space-y-4">
                <span className="font-mono text-[9px] tracking-[0.4em] text-amber-500 uppercase font-black"> {component.id}</span>
                <h1 className="text-4xl font-black uppercase tracking-tighter leading-tight">{component.name}</h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-light">
                  {component.fullDescription || "High-stakes architectural primitive engineered for modern performance environments."}
                </p>
              </section>

              <section className="space-y-4">
                <h4 className="font-mono text-[12px]  uppercase tracking-[0.2em]  font-bold">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {component.techStack?.map(tech => (
                    <span key={tech} className="px-3 py-1.5 bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-lg text-[9px] font-mono text-zinc-500 uppercase">
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <h4 className="font-mono text-[12px] uppercase tracking-[0.2em]  font-bold">Dependencies</h4>
                <div className="space-y-2">
                  {['framer-motion', 'lucide-react', 'clsx', 'tailwind-merge'].map(dep => (
                    <div key={dep} className="flex items-center justify-between py-2 border-b border-black/5 dark:border-white/5">
                      <span className="font-mono text-[10px] text-zinc-500">{dep}</span>
                      <span className="text-[9px] text-zinc-400">^latest</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Code Container Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-mono text-[12px]  uppercase tracking-[0.2em]  font-bold">Source Code</h4>
                  <div className="flex gap-1.5">
                    <button onClick={handleCopy} className={`p-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-lg transition-colors ${isCopied ? 'text-amber-500' : 'text-zinc-400 hover:text-amber-500'}`} title="Copy Code">
                      <Copy size={13} />
                    </button>
                    <button onClick={handleDownload} className="p-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-lg transition-colors text-zinc-400 hover:text-amber-500" title="Download Code">
                      <Download size={13} />
                    </button>
                    <button onClick={handleExpandCode} className="p-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-lg transition-colors text-zinc-400 hover:text-amber-500" title="Expand Code">
                      <Maximize2 size={13} />
                    </button>
                  </div>
                </div>
                
                <div className="relative  group bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-black/5 dark:border-white/5 overflow-hidden">
                  <div className="p-6 no-scrollbar font-mono text-[10px] leading-relaxed max-h-80 overflow-y-auto">
                    <pre className="text-zinc-500 whitespace-pre-wrap">
                      {component.codeSnippet || "// Initializing Source Code Archive..."}
                    </pre>
                  </div>
                </div>
              </section>

              <section className="p-8 rounded-[1rem] bg-amber-500/5 border border-amber-500/10 space-y-4">
                <div className="flex items-center gap-3 text-amber-500">
                  <Zap size={16} />
                  <h4 className="font-black uppercase text-xs tracking-widest">Optimization_Guide</h4>
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed font-light">
                  Optimized for 120Hz motion displays. Use with high-performance containers for zero-jank interaction.
                </p>
              </section>

              <div className="flex items-center justify-between pt-8 border-t border-black/5 dark:border-white/5">
                <button 
                  onClick={onPrev}
                  className="group flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Previous
                </button>
                <button 
                  onClick={onNext}
                  className="group flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  Next <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PANEL 2: MAIN VIEWPORT (60% WIDTH OR 100% IN FULLSCREEN) */}
      <div className={`h-full relative flex flex-col transition-all duration-700 ease-in-out ${isAnyFullScreen ? 'w-full bg-white dark:bg-[#050505]' : 'w-[60%] bg-zinc-50 dark:bg-[#080808]'}`}>
        
        {/* Full Screen Header */}
        <AnimatePresence>
          {isAnyFullScreen && (
            <motion.header 
              initial={{ y: -64 }}
              animate={{ y: 0 }}
              exit={{ y: -64 }}
              className="w-full h-16 border-b border-black/5 dark:border-white/10 flex items-center justify-between px-8 bg-white/80 dark:bg-black/80 backdrop-blur-xl z-[200]"
            >
              <div className="flex items-center gap-4">
                {fullScreenMode === 'preview' ? <Layout size={18} className="text-amber-500" /> : <Terminal size={18} className="text-amber-500" />}
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] font-black text-zinc-400">
                  {fullScreenMode === 'preview' ? 'Layout_Preview' : 'Source_Console'} // <span className="text-black dark:text-white">{component.name}</span>
                </span>
              </div>
              <div className="flex items-center gap-4">
                {fullScreenMode === 'code' && (
                   <button 
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all group"
                  >
                    {isCopied ? <Zap size={14} className="text-amber-500" /> : <Copy size={14} className="text-zinc-400" />}
                    <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 group-hover:text-black dark:group-hover:text-white">{isCopied ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
                {fullScreenMode === 'preview' && (
                  <button 
                    onClick={handleReload}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all group"
                  >
                    <RefreshCw size={14} className="text-zinc-400 group-hover:rotate-180 transition-transform duration-700" />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 group-hover:text-black dark:hover:text-white">Reload</span>
                  </button>
                )}
                <div className="w-[1px] h-4 bg-black/10 dark:bg-white/10"></div>
                <button 
                  onClick={() => setFullScreenMode('none')}
                  className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-xl transition-all hover:scale-105 active:scale-95 shadow-xl"
                >
                  <X size={14} />
                  <span className="font-mono text-[9px] uppercase tracking-widest font-black">Close</span>
                </button>
              </div>
            </motion.header>
          )}
        </AnimatePresence>

        <div className="flex-1 flex items-center justify-center p-1 lg:p-1 overflow-auto no-scrollbar scrollbar-hide">
          {fullScreenMode === 'code' ? (
             <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-full max-w-6xl bg-zinc-50 dark:bg-zinc-900/50 rounded-[2.5rem] border border-black/5 dark:border-white/5 p-12 overflow-y-auto custom-scrollbar shadow-inner"
             >
               <div className="flex items-center gap-3 mb-8 border-b border-black/5 dark:border-white/5 pb-6">
                 <FileCode className="text-amber-500" size={24} />
                 <h2 className="text-2xl font-black uppercase tracking-tighter">Decrypted_Logic.tsx</h2>
               </div>
               
               <pre className="font-mono text-xs lg:text-sm text-zinc-500 dark:text-zinc-400 leading-loose">
                 {component.codeSnippet}
               </pre>
             </motion.div>
          ) : (
            <motion.div 
              key={`preview-${key}`}
              layout
              className={`w-full flex items-center justify-center transition-all duration-700 ${isAnyFullScreen ? 'max-w-none h-full' : 'w-full'}`}
            >
              <DynamicPreview 
                componentId={component.id} 
                fallbackUrl={component.previewUrl} 
                renderKey={key} 
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* PANEL 3: METADATA & ACTIONS (15% WIDTH) */}
      <AnimatePresence>
        {!isAnyFullScreen && (
          <motion.div 
            initial={{ width: 0, opacity: 0, x: 50 }}
            animate={{ width: '15%', opacity: 1, x: 0 }}
            exit={{ width: 0, opacity: 0, x: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="h-full border-l border-black/5 dark:border-white/5 bg-white dark:bg-black p-8 flex flex-col gap-12 overflow-y-auto z-20"
          >
            {/* Actions */}
            <div className="flex flex-row items-center justify-center gap-4 lg:gap-6 pt-4">
              <IconButton icon={<RefreshCw size={18} />} label="Reload" onClick={handleReload} />
              <IconButton icon={<Maximize2 size={18} />} label="Full Page" onClick={() => setFullScreenMode('preview')} />
              <IconButton icon={<Search size={18} />} label="Search" onClick={onSearchOpen} />
            </div>

            <section className="space-y-4 border-t border-black/5 dark:border-white/5 pt-8">
              <h4 className="font-mono text-[12px] uppercase tracking-[0.2em]  font-bold">Attribution</h4>
              <p className="text-[10px] text-zinc-400 italic leading-relaxed">
                Design inspired by Obsidian Engineering. High-performance UI concepts for modern applications.
              </p>
            </section>

            <section className="space-y-4">
              <h4 className="font-mono text-[12px] uppercase tracking-[0.2em]  font-bold">Contact</h4>
              <div className="flex flex-col gap-2">
                <a href="#" className="text-[10px] text-zinc-500 hover:text-amber-500 flex items-center gap-2 transition-colors">
                  <ExternalLink size={10} /> Support_Node
                </a>
              </div>
            </section>

            <section className="space-y-4 mt-auto">
               <h4 className="font-mono text-[8px] uppercase tracking-[0.3em] text-zinc-400 font-bold">License & Usage</h4>
               <div className="p-4 bg-zinc-50 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
                  <p className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold">Free </p>
               </div>
               <button 
                 onClick={onBack}
                 className="w-full py-4 font-mono text-[9px] uppercase tracking-[0.4em] border border-black dark:border-white rounded-xl hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all"
               >
                 Back to Home
               </button>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(120,120,120,0.1); }
      `}</style>
    </motion.div>
  );
};

const IconButton = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="group relative flex flex-col items-center gap-2 text-zinc-400 hover:text-amber-500 transition-all"
    title={label}
  >
    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-zinc-50 dark:bg-white/5 flex items-center justify-center border border-transparent group-hover:border-amber-500/20 group-hover:bg-amber-500/5 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.1)] transition-all">
      {icon}
    </div>
    <span className="font-mono text-[7px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-center px-1 leading-tight">{label}</span>
  </button>
);

export default ComponentDetailView;
