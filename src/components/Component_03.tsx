
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

// --- Product Data ---
const PRODUCTS = [
  { id: 1, image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=90&w=1200" },
  { id: 2, image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=90&w=1200" },
  { id: 3, image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=90&w=1200" },
  { id: 4, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=90&w=1200" },
  { id: 5, image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=90&w=1200" },
  { id: 6, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=90&w=1200" },
  { id: 7, image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=90&w=1200" }
];

const CardReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Custom Cursor Smoother
  useEffect(() => {
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Initial Entrance Animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const centerIdx = Math.floor(PRODUCTS.length / 2);
      
      // Initial state: stacked and slightly hidden
      gsap.set(cardsRef.current, {
        opacity: 0,
        scale: 0.5,
        y: 100,
        rotationZ: 0,
        z: (i: number) => -Math.abs(i - centerIdx) * 40
      });

      // Fan Out Sequence
      gsap.to(cardsRef.current, {
        opacity: 1,
        scale: 0.9,
        y: (i: number) => Math.pow(Math.abs(i - centerIdx), 1.6) * 22,
        x: (i: number) => (i - centerIdx) * 135,
        rotationZ: (i: number) => (i - centerIdx) * 14,
        rotationY: (i: number) => (i - centerIdx) * -4,
        duration: 1.4,
        stagger: 0.05,
        ease: "expo.out",
        delay: 0.3
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Hover Effect Logic
  const handleMouseEnter = (idx: number) => {
    setHoveredIdx(idx);
    const centerIdx = Math.floor(PRODUCTS.length / 2);
    const offset = idx - centerIdx;

    // Pop the hovered card
    gsap.to(cardsRef.current[idx], {
      scale: 1.05,
      rotationZ: 0,
      rotationY: 0,
      y: Math.pow(Math.abs(offset), 1.6) * 15 - 80, // Lifted and straightened
      z: 200,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto"
    });

    // Expand the cursor
    gsap.to(cursorRef.current, {
      scale: 8,
      opacity: 0.2,
      duration: 0.3
    });
  };

  const handleMouseLeave = (idx: number) => {
    setHoveredIdx(null);
    const centerIdx = Math.floor(PRODUCTS.length / 2);
    const offset = idx - centerIdx;

    // Return to fan state
    gsap.to(cardsRef.current[idx], {
      scale: 0.9,
      rotationZ: offset * 14,
      rotationY: offset * -4,
      y: Math.pow(Math.abs(offset), 1.6) * 22,
      z: -Math.abs(offset) * 40,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto"
    });

    // Reset cursor
    gsap.to(cursorRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.3
    });
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen text-slate-950 font-sans selection:bg-slate-950 selection:text-white overflow-hidden flex items-center justify-center"
    >
      {/* GSAP Cursor */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-slate-950 rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      />

      <main className="relative perspective-3000 w-full h-full flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          {PRODUCTS.map((product, idx) => (
            <div
              key={product.id}
              // Fix: Wrapped ref callback in braces to ensure it returns void (React ref callbacks must not return the element)
              ref={(el) => { cardsRef.current[idx] = el; }}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              className="absolute w-80 h-[32rem] group cursor-none"
              style={{ 
                zIndex: hoveredIdx === idx ? 200 : (100 - Math.abs(idx - 3)),
                transformStyle: "preserve-3d" 
              }}
            >
              {/* Dynamic Shadow Layer */}
              <div className="absolute inset-8 bg-black/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-[2.5rem] translate-y-12" />
              
              {/* Image Container */}
              <div className="relative w-full h-full bg-[#fafafa] overflow-hidden rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)] group-hover:shadow-[0_60px_120px_-25px_rgba(0,0,0,0.12)] transition-all duration-1000">
                <div className="absolute inset-0 z-0">
                  <img 
                    src={product.image} 
                    alt="" 
                    className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-1000" />
                </div>
                
                {/* Visual Glass Glare Layer */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/40 to-white/10 mix-blend-overlay" />
              </div>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
};

export default CardReveal;
