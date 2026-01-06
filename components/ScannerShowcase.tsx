
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const ScannerShowcase: React.FC<{ surfaceImg?: string; coreImg?: string }> = ({ 
  surfaceImg = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
  coreImg = "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
}) => {
  const [scanPos, setScanPos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanPos(prev => (prev >= 100 ? 0 : prev + 0.5));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-square md:aspect-video rounded-[2rem] overflow-hidden bg-black shadow-2xl group cursor-crosshair">
      {/* Surface Image (Top Layer - Initial View) */}
      <img 
        src={surfaceImg} 
        alt="Surface" 
        className="absolute inset-0 w-full h-full object-cover grayscale opacity-80"
      />

      {/* Core Image (Revealed Layer) */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `inset(0 0 ${100 - scanPos}% 0)` }}
      >
        <img 
          src={coreImg} 
          alt="Core" 
          className="w-full h-full object-cover saturate-200 contrast-125" 
        />
        {/* Digital Noise Overlay for Core */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      </div>

      {/* Scanner Line */}
      <div 
        className="absolute left-0 right-0 h-[2px] bg-amber-500 shadow-[0_0_20px_#f59e0b,0_0_40px_#f59e0b] z-30 transition-all duration-75"
        style={{ top: `${scanPos}%` }}
      >
        <div className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-t from-amber-500/20 to-transparent -translate-y-full"></div>
      </div>

      {/* Digital Telemetry Overlays */}
      <div className="absolute top-6 left-6 z-40 space-y-2 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          <span className="font-mono text-[8px] text-amber-500 tracking-[0.3em] uppercase font-black">Scanning_Core</span>
        </div>
        <div className="font-mono text-[10px] text-zinc-400 uppercase">
          Depth: {Math.round(scanPos)}.82m
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-40 text-right pointer-events-none">
        <div className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest mb-1">Architecture_Rev_01</div>
        <div className="h-1 w-32 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-amber-500"
            animate={{ width: `${scanPos}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScannerShowcase;
