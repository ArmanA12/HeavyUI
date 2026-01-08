
import React from 'react';
import { motion, Variants } from 'framer-motion';

const Hero: React.FC = () => {
  // Exact word order as requested
  const line1 = "UN-REALISTIC UI";
  const line2 = "TEMPLATES";
  const line3 = "COMPONENTS";

  const springConfig = {
    type: "spring" as const,
    damping: 28,
    stiffness: 80,
    mass: 2
  };

  const getCharacterVariants = (lineLength: number, index: number): Variants => {
    const center = (lineLength - 1) / 2;
    const distanceFromCenter = index - center;
    const startX = -distanceFromCenter * 30; 

    return {
      hidden: { 
        opacity: 0, 
        x: startX,
        z: -500,
        rotateY: -360, // Full 360 degree rotation start
        rotateX: 45,
        scale: 0.4,
        filter: 'blur(12px) brightness(2)',
      },
      visible: { 
        opacity: 1, 
        x: 0,
        z: 0,
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        filter: 'blur(0px) brightness(1)',
        transition: {
          ...springConfig,
          rotateY: { duration: 2, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.8 },
          scale: { duration: 1.5 },
          filter: { duration: 1 }
        }
      }
    };
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
      }
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-20 px-4 lg:px-12 overflow-hidden selection:bg-amber-500/30">
      <div className="max-w-[1800px] mx-auto w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center w-full perspective-[3000px]"
        >
          {/* MAIN ARCHITECTURAL STACK */}
          <h1 className="w-full flex flex-col items-center justify-center museomoderno-heavy uppercase text-center overflow-visible select-none [transform-style:preserve-3d]">
            
            {/* LINE 1: UN-REALISTIC UI */}
            <div className="relative flex justify-center w-full mb-0 overflow-visible z-30 [transform-style:preserve-3d]">
              <motion.span className="maxi-layout text-[clamp(1.5rem,6vw,7rem)]">
                {line1.split("").map((char, i) => (
                  <motion.span key={`l1-${i}`} variants={getCharacterVariants(line1.length, i)} className="inline-block whitespace-pre relative">
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </div>
            
            {/* LINE 2: TEMPLATES */}
            <div className="relative flex justify-center w-full mb-0 overflow-visible z-20 [transform-style:preserve-3d]">
              <motion.span 
                className="maxi-layout text-[clamp(1.5rem,6vw,7rem)] opacity-95"
              >
                {line2.split("").map((char, i) => (
                  <motion.span key={`l2-${i}`} variants={getCharacterVariants(line2.length, i)} className="inline-block relative">
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </div>
            
            {/* LINE 3: COMPONENTS */}
            <div className="relative flex justify-center w-full overflow-visible z-10 [transform-style:preserve-3d]">
              <motion.span 
                className="maxi-layout text-[clamp(1.5rem,6vw,7rem)]"
              >
                {line3.split("").map((char, i) => (
                  <motion.span key={`l3-${i}`} variants={getCharacterVariants(line3.length, i)} className="inline-block relative">
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </div>
          </h1>

          {/* TWO BUTTON CTA SECTION */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20 lg:mt-32 flex flex-col sm:flex-row gap-6 lg:gap-8 items-center w-full sm:w-auto"
          >
            {/* Watch Template Button */}
            <button 
              onClick={() => scrollTo('templates')}
              className="w-full sm:w-auto group relative px-10 lg:px-12 py-3 lg:py-4 bg-black dark:bg-white text-white dark:text-black rounded-xl lg:rounded-2xl overflow-hidden transition-all hover:scale-[1.05] active:scale-95 shadow-xl border border-transparent"
            >
              <div className="absolute inset-0 bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10 font-black uppercase text-[10px] lg:text-[11px] tracking-[0.4em] group-hover:text-black transition-colors">Watch Template</span>
            </button>

            {/* Explore Component Button */}
            <button 
              onClick={() => scrollTo('components')}
              className="w-full sm:w-auto group relative px-10 lg:px-12 py-3 lg:py-4 bg-transparent border border-black/10 dark:border-white/20 text-black dark:text-white rounded-xl lg:rounded-2xl overflow-hidden transition-all hover:scale-[1.05] active:scale-95 hover:border-black dark:hover:border-white"
            >
              <div className="absolute inset-0 bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10 font-black uppercase text-[10px] lg:text-[11px] tracking-[0.4em]">Explore Component</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
