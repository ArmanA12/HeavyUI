
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Box, Layout, Command, ArrowUpRight } from 'lucide-react';
import { COMPONENTS_DATA, TEMPLATES_DATA } from '../constants';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const filteredComponents = COMPONENTS_DATA.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) || 
    c.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const filteredTemplates = TEMPLATES_DATA.filter(t => 
    t.name.toLowerCase().includes(query.toLowerCase()) || 
    t.useCase.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const hasResults = filteredComponents.length > 0 || filteredTemplates.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] px-4 md:px-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-white/60 dark:bg-black/80 backdrop-blur-2xl"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Header / Input */}
            <div className="p-8 lg:p-12 border-b border-black/5 dark:border-white/5 relative">
              <div className="flex items-center gap-6">
                <Search className="text-zinc-400 dark:text-zinc-600" size={32} />
                <input 
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Modules..."
                  className="w-full bg-transparent text-4xl lg:text-6xl font-thin tracking-tighter uppercase outline-none placeholder:text-zinc-200 dark:placeholder:text-zinc-800"
                />
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                >
                  <X size={24} className="text-zinc-400" />
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto p-6 lg:p-12 custom-scrollbar">
              {!query && (
                <div className="py-10 text-center">
                  <span className="font-mono text-[10px] tracking-[0.5em] text-zinc-400 uppercase">Input Search Command...</span>
                </div>
              )}

              {query && !hasResults && (
                <div className="py-20 text-center">
                  <p className="text-2xl font-light text-zinc-400 italic">No modules found for "{query}"</p>
                </div>
              )}

              {query && hasResults && (
                <div className="space-y-16">
                  {/* Components Section */}
                  {filteredComponents.length > 0 && (
                    <section>
                      <h4 className="font-mono text-[10px] tracking-[0.4em] text-zinc-400 dark:text-zinc-600 uppercase mb-8 flex items-center gap-2">
                        <Box size={12} /> Modules.Registry
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredComponents.map((comp, idx) => (
                          <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            key={comp.id}
                            className="group flex items-center justify-between p-6 bg-zinc-50 dark:bg-white/5 border border-transparent hover:border-amber-500/30 rounded-2xl cursor-pointer transition-all"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                                <img src={comp.previewUrl} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <h5 className="font-black uppercase text-sm tracking-tight">{comp.name}</h5>
                                <span className="text-[10px] font-mono text-zinc-400 uppercase">{comp.category}</span>
                              </div>
                            </div>
                            <ArrowUpRight size={16} className="text-zinc-300 group-hover:text-amber-500 transition-colors" />
                          </motion.div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Templates Section */}
                  {filteredTemplates.length > 0 && (
                    <section>
                      <h4 className="font-mono text-[10px] tracking-[0.4em] text-zinc-400 dark:text-zinc-600 uppercase mb-8 flex items-center gap-2">
                        <Layout size={12} /> Blueprints.Archive
                      </h4>
                      <div className="space-y-3">
                        {filteredTemplates.map((temp, idx) => (
                          <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (idx + filteredComponents.length) * 0.05 }}
                            key={temp.id}
                            className="group flex items-center justify-between p-6 bg-zinc-50 dark:bg-white/5 border border-transparent hover:border-amber-500/30 rounded-2xl cursor-pointer transition-all"
                          >
                            <div className="flex flex-col">
                              <h5 className="font-black uppercase text-xl tracking-tighter">{temp.name}</h5>
                              <p className="text-xs text-zinc-400 font-light max-w-md truncate">{temp.description}</p>
                            </div>
                            <div className="flex items-center gap-4">
                               <span className="text-[9px] font-mono border border-black/10 dark:border-white/10 px-3 py-1 rounded-full text-zinc-500 uppercase">
                                 {temp.useCase}
                               </span>
                               <ArrowUpRight size={20} className="text-zinc-300 group-hover:text-amber-500 transition-colors" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 bg-zinc-50/50 dark:bg-black/50 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
               <div className="flex gap-6 items-center">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 uppercase">
                    <span className="p-1 px-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-zinc-900">ESC</span> Close
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 uppercase">
                    <span className="p-1 px-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-zinc-900">ENTER</span> Select
                  </div>
               </div>
               <div className="flex items-center gap-2">
                 <Command size={14} className="text-amber-500" />
                 <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest font-bold">HeavY_Navigator 2.0</span>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
