
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Box, 
  Zap, 
  RefreshCw, 
  FileCode, 
  Layers, 
  Layout, 
  ShieldCheck, 
  Timer, 
  LayoutTemplate, 
  Cuboid, 
  PenTool, 
  Mail 
} from 'lucide-react';

const SmokeEffect = ({ isPrimary = false }: { isPrimary?: boolean }) => {
  const smokeParticles = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      size: Math.random() * 200 + 200, // Large blobs
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * -20,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 dark:opacity-60 mix-blend-screen dark:mix-blend-overlay">
      <div className="absolute inset-0">
        {smokeParticles.map((p) => (
          <motion.div
            key={p.id}
            className={`absolute rounded-full blur-[80px] ${
              isPrimary 
                ? 'bg-amber-500/20 dark:bg-amber-400/10' 
                : 'bg-zinc-400/10 dark:bg-white/5'
            }`}
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              x: [`${p.x - 20}%`, `${p.x + 20}%`, `${p.x - 20}%`],
              y: [`${p.y - 10}%`, `${p.y + 10}%`, `${p.y - 10}%`],
              scale: [1, 1.3, 0.8, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );
};

const PricingCard = ({ 
  tier, 
  price, 
  description, 
  features, 
  isPrimary = false 
}: { 
  tier: string; 
  price: string; 
  description: string; 
  features: { label: string; icon: React.ReactNode }[]; 
  isPrimary?: boolean; 
}) => {
  return (
    <div className={`group relative flex flex-col p-6 lg:p-9 transition-all duration-700 rounded-[1.8rem] lg:rounded-[2.8rem] border overflow-hidden ${
      isPrimary 
      ? 'border-amber-500/30 dark:border-amber-500/40 bg-amber-500/5 dark:bg-amber-950/20 shadow-none' 
      : 'border-black/5 dark:border-white/5 bg-zinc-50/50 dark:bg-[#1a1a1a] shadow-sm'
    } hover:border-amber-500/50 dark:hover:border-amber-400/50 hover:translate-y-[-6px]`}>
      
      {/* High-Fidelity Smoke Effect */}
      <SmokeEffect isPrimary={isPrimary} />
      
      {isPrimary && (
        <>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500 text-white text-[7px] font-mono uppercase tracking-[0.3em] rounded-full font-black z-20 shadow-lg">
            ELITE_ARCHITECT_PATH
          </div>
          {/* Subtle Ambient Glow */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-500/10 blur-[120px] pointer-events-none animate-pulse"></div>
        </>
      )}

      <div className="mb-8 lg:mb-12 relative z-10">
        <h3 className="font-mono text-[8px] lg:text-[10px] uppercase tracking-[0.4em] mb-4 text-amber-500 font-black">{tier}</h3>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-4xl lg:text-6xl font-museo font-black tracking-tighter leading-none">${price}</span>
        </div>
        <p className="text-xs lg:text-sm font-light leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-[240px]">
          {description}
        </p>
      </div>

      <div className="flex-1 mb-10 lg:mb-14 relative z-10">
        <ul className="space-y-3 lg:space-y-4">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-4 text-[10px] lg:text-xs font-light group/item">
              <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-lg flex items-center justify-center bg-black/5 dark:bg-white/5 text-zinc-400 group-hover/item:text-amber-500 group-hover/item:bg-amber-500/10 transition-all duration-500">
                {React.cloneElement(feature.icon as React.ReactElement<{ size?: number }>, { size: 14 })}
              </div>
              <span className="opacity-60 group-hover/item:opacity-100 transition-opacity tracking-tight">{feature.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <button className={`group/btn relative w-full h-12 lg:h-16 rounded-[1.2rem] lg:rounded-[1.5rem] font-black uppercase text-[8px] lg:text-[10px] tracking-[0.4em] transition-all flex items-center justify-center gap-3 overflow-hidden border border-black/5 dark:border-white/5 ${
        isPrimary 
        ? 'bg-black dark:bg-white text-white dark:text-black hover:scale-[0.98]' 
        : 'bg-black/50 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
      }`}>
        <div className="absolute inset-0 bg-amber-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
        <span className="relative z-10 transition-colors duration-500 group-hover/btn:text-white dark:group-hover/btn:text-black">Grant Access</span>
        <ArrowRight size={12} className="relative z-10 group-hover/btn:translate-x-1 transition-all group-hover/btn:text-white dark:group-hover/btn:text-black" />
      </button>
    </div>
  );
};

const Pricing: React.FC = () => {
  const premiumFeatures = [
    { label: "All Premium Component", icon: <Box /> },
    { label: "Instant Access", icon: <Zap /> },
    { label: "All Time update", icon: <RefreshCw /> },
    { label: "Figma file to code", icon: <FileCode /> },
    { label: "Limited 3D Component", icon: <Layers /> },
  ];

  const premiumProFeatures = [
    { label: "All component access", icon: <Layout /> },
    { label: "Instant Access", icon: <ShieldCheck /> },
    { label: "All Times Update", icon: <Timer /> },
    { label: "All Template Access", icon: <LayoutTemplate /> },
    { label: "All 3D Component Access", icon: <Cuboid /> },
    { label: "Figma File of requested Template", icon: <PenTool /> },
    { label: "Newsletter Access", icon: <Mail /> },
  ];

  return (
    <div className="relative max-w-[1100px] mx-auto py-20 lg:py-40 px-6">
      <div className="relative z-10 mb-16 lg:mb-24 flex flex-col items-center text-center">
        <span className="font-mono text-[8px] lg:text-[10px] tracking-[0.6em] text-amber-500 uppercase font-black mb-4 block">
          Acquisition_Protocol
        </span>
        <h2 className="text-3xl md:text-[6rem] font-museo font-black uppercase tracking-tighter leading-none">
          LICENS<span className="text-zinc-200 dark:text-zinc-900 transition-colors">ING.</span>
        </h2>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-stretch max-w-[900px] mx-auto">
        <PricingCard 
          tier="Premium" 
          price="99" 
          description="Essential primitives for high-fidelity solo engineering and product launches." 
          features={premiumFeatures} 
        />
        <PricingCard 
          tier="Premium Pro" 
          price="249" 
          isPrimary={true} 
          description="Unrestricted architectural access and white-glove support for elite product teams." 
          features={premiumProFeatures} 
        />
      </div>
    </div>
  );
};

export default Pricing;
