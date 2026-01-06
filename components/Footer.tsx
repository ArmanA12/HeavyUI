
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-20 lg:py-32 px-6 lg:px-12 transition-colors border-t border-black/5 dark:border-white/5">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          <div className="lg:col-span-6">
            <div className="flex items-center gap-4 mb-8 lg:mb-12">
              <div className="w-9 h-9 lg:w-10 lg:h-10 bg-black dark:bg-white rounded-lg lg:rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white dark:text-black font-black text-lg lg:text-xl">H</span>
              </div>
              <span className="text-xl lg:text-2xl font-black tracking-tighter uppercase">HeavY<span className="text-zinc-400 dark:text-zinc-700">_LABS</span></span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-600 text-base lg:text-lg max-w-sm font-light leading-relaxed">
              We design and engineer high-stakes UI primitives for the next era of computing. 
              Built for speed, destined for eternity.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-12">
             <div>
                <h4 className="font-mono text-[9px] lg:text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-6 lg:mb-8">System_Index</h4>
                <ul className="space-y-3 lg:space-y-4 text-xs font-mono text-zinc-500 dark:text-zinc-600 uppercase">
                  <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Components</a></li>
                  <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Templates</a></li>
                  <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Docs</a></li>
                </ul>
             </div>
             <div>
                <h4 className="font-mono text-[9px] lg:text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-6 lg:mb-8">Intelligence</h4>
                <ul className="space-y-3 lg:space-y-4 text-xs font-mono text-zinc-500 dark:text-zinc-600 uppercase">
                  <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">GitHub</a></li>
                  <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">X / Twitter</a></li>
                  <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Discord</a></li>
                </ul>
             </div>
             <div className="sm:col-span-1">
                <h4 className="font-mono text-[9px] lg:text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-6 lg:mb-8">Status</h4>
                <div className="flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_10px_#f59e0b]"></div>
                   <span className="text-[9px] lg:text-[10px] font-mono text-black dark:text-white uppercase tracking-widest">Network Active</span>
                </div>
             </div>
          </div>

        </div>

        <div className="mt-20 lg:mt-40 pt-10 lg:pt-12 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 lg:gap-8 text-center md:text-left">
           <span className="text-zinc-300 dark:text-zinc-800 text-[9px] lg:text-[10px] font-mono tracking-[0.4em] lg:tracking-[0.6em] uppercase">
             FORM // FUNCTION // OBSIDIAN
           </span>
           <span className="text-zinc-400 dark:text-zinc-700 text-[8px] lg:text-[9px] font-mono uppercase tracking-widest">
             © 2025 HeavY Engineering Labs.
           </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
