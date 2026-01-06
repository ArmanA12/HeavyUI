
import React, { useState, useEffect } from 'react';
import { ScanSearch, Moon, Sun, Box, Command, Spade } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  isDark: boolean;
  setIsDark: (val: boolean) => void;
  onSearchOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDark, setIsDark, onSearchOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Components', href: '#components' },
    { name: 'Templates', href: '#templates' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <div className="fixed top-4 lg:top-8 left-0 right-0 z-[100] px-4 lg:px-6 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`mx-auto pointer-events-auto transition-all duration-500 flex items-center justify-between px-4 lg:px-8 ${isScrolled
            ? 'max-w-[500px] lg:max-w-[700px] py-3 lg:py-5 bg-white/70 dark:bg-[#1a1a1a] backdrop-blur-2xl border border-black/10 dark:border-white/5 rounded-full shadow-md'
            : 'max-w-[1200px] py-4 lg:py-5 bg-white/70 dark:bg-[#1a1a1a] backdrop-blur-md border border-black/10 dark:border-white/5 rounded-2xl lg:rounded-[2rem] shadow-sm'
          }`}
      >
        <div className="flex items-center gap-2 lg:gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div style={{
            backgroundImage:
              "linear-gradient(to right bottom, #f59e09, #ed8d02, #e57d00, #dc6c00, #d35b00)",
          }} className="w-7 h-7 lg:w-8 lg:h-8  rounded-lg flex items-center justify-center transition-all group-hover:rotate-[15deg] group-hover:scale-110 duration-500 shadow-sm shrink-0">
            <Spade size={16} className="text-white" />
          </div>
          <span className={`font-black tracking-[-0.05em] uppercase transition-all duration-500 shrink-0 ${isScrolled ? 'hidden md:block text-xs' : 'text-sm lg:text-xl'}`}>
            HeavY<span className="text-[#F59E09] dark:text-[#F59E09]">UI</span>
          </span>
        </div>

        <div className="flex items-center gap-1 lg:gap-6">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`px-2 lg:px-4 py-2 font-black uppercase tracking-[0.1em] lg:tracking-[0.15em] text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all relative group shrink-0 ${isScrolled ? 'text-[8px] lg:text-[10px]' : 'text-[9px] lg:text-[10px]'}`}
            >
              <span className="hidden sm:inline">{item.name}</span>
              <span className="sm:hidden">{item.name.charAt(0)}</span>
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-black dark:bg-white transition-all duration-500 group-hover:w-3 lg:group-hover:w-4 rounded-full"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1 lg:gap-3 shrink-0">
          <button
            onClick={onSearchOpen}
            className="relative w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all group"
          >
            <ScanSearch size={16} className="relative group-hover:rotate-90 transition-transform duration-500" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
            {/* Shortcut Hint - Desktop Only */}
            <div className="hidden lg:flex absolute -bottom-12 left-1/2 -translate-x-1/2 items-center gap-1 px-2 py-1 bg-black text-white text-[8px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              <Command size={8} /> K
            </div>
          </button>
          <div className="w-[1px] h-3 lg:h-4 bg-black/10 dark:border-white/10 mx-0.5 lg:mx-1"></div>
          <button onClick={() => setIsDark(!isDark)} className="w-8 h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all">
            <AnimatePresence mode="wait">
              <motion.div key={isDark ? 'dark' : 'light'} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }}>
                {isDark ? <Moon size={14} /> : <Sun size={14} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
