
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ComponentGrid from './components/ComponentGrid';
import TemplatesSection from './components/TemplatesSection';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import ComponentDetailView from './components/ComponentDetailView';
import { ArrowRight, LayoutGrid, List } from 'lucide-react';
import { UIComponent } from './types';
import { COMPONENTS_DATA } from './constants';
import { AnimatePresence, motion } from 'framer-motion';


const App: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('heavy-ui-theme');
    if (savedTheme) return savedTheme === 'dark';
    return true;
  });
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<UIComponent | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('heavy-ui-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('heavy-ui-theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setSelectedComponent(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigateComponent = (direction: 'next' | 'prev') => {
    if (!selectedComponent) return;
    
    const currentIndex = COMPONENTS_DATA.findIndex(c => c.id === selectedComponent.id);
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    // Infinite loop logic
    if (nextIndex >= COMPONENTS_DATA.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = COMPONENTS_DATA.length - 1;

    setSelectedComponent(COMPONENTS_DATA[nextIndex]);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-black text-white' : 'bg-white text-black'} selection:bg-amber-500 selection:text-white`}>
      <Navbar 
        isDark={isDark} 
        setIsDark={setIsDark} 
        onSearchOpen={() => setIsSearchOpen(true)} 
      />
      
      <main className="relative">
        <Hero />
        
        <section id="components" className="relative z-10 border-t border-black/5 dark:border-white/5 transition-colors">
          <div className="max-w-[1440px] mx-auto py-24 lg:py-40 px-6 lg:px-12">
            <div className="mb-16 lg:mb-24 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-12">
              <div className="max-w-3xl">
                <span className="font-mono text-[10px] tracking-[0.4em] text-zinc-400 dark:text-zinc-500  mb-4 block">Archive.01 / Modules</span>
                <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-none ">
                  Compo<span className="text-zinc-300 dark:text-zinc-800 transition-colors">nents</span>
                </h2>
              </div>
              
              <div className="flex items-center gap-4 w-full lg:w-auto">
                <button className="group relative flex items-center dark:bg-[#1a1a1a] bg-white backdrop-blur-xl border border-black/5 dark:border-white/5 rounded-full p-1 lg:p-1.5 transition-all duration-500 hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] overflow-hidden flex-1 lg:flex-none lg:w-auto">
                  <div className="absolute inset-0 bg-black dark:bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-[0.16,1,0.3,1]"></div>
                  <span className="relative z-10 pl-4 pr-2 lg:pl-6 lg:pr-4 py-2 font-mono text-[8px] lg:text-[10px] tracking-[0.3em] uppercase transition-colors duration-500 group-hover:text-white dark:group-hover:text-black flex-1 text-left">
                    <span className="font-black">View All Component</span> 
                  </span>
                  <div className="relative z-10 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-black dark:bg-white flex items-center justify-center transition-all duration-500 group-hover:bg-amber-500 group-hover:scale-95 shadow-lg">
                    <ArrowRight size={12} className="lg:w-3.5 lg:h-3.5 text-white dark:text-black transition-transform duration-500 group-hover:translate-x-0.5" />
                  </div>
                </button>

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
              initial={false}
              animate={{ opacity: 1 }}
              key={viewMode}
            >
              <ComponentGrid viewMode={viewMode} onSelect={(comp) => setSelectedComponent(comp)} />
            </motion.div>
          </div>
        </section>

        <section id="templates" className="relative z-10 border-t border-black/5 dark:border-white/5 transition-colors">
          <TemplatesSection />
        </section>

        <section id="pricing" className="relative z-10 border-t border-black/5 dark:border-white/5 transition-colors">
          <Pricing />
        </section>
      </main>

      <Footer />

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />


      <AnimatePresence>
        {selectedComponent && (
          <ComponentDetailView 
            component={selectedComponent} 
            onBack={() => setSelectedComponent(null)}
            onNext={() => handleNavigateComponent('next')}
            onPrev={() => handleNavigateComponent('prev')}
            onSearchOpen={() => setIsSearchOpen(true)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
