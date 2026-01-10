import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export interface AnimatedTextProps {
  text?: string; 
  className?: string;
}
export const TextReveal: React.FC<AnimatedTextProps> = ({ 
  text = "YOUR TEXT ANIMATION", 
  className 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const displayText = text.trim() === "" ? "YOUR TEXT ANIMATION" : text;

  useGSAP(() => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll('.char-inner');
    
    gsap.set(chars, { yPercent: 100, rotateX: -40, skewY: 10 });
    gsap.to(chars, { 
      yPercent: 0, 
      rotateX: 0,
      skewY: 0,
      duration: 1.2, 
      stagger: 0.04, 
      ease: "expo.out",
      delay: 0.1
    });
  }, { scope: containerRef, dependencies: [displayText] });

  return (
    <div 
      ref={containerRef} 
      className={`flex flex-wrap justify-center perspective-2000 whitespace-pre-wrap ${className}`}
    >
      {displayText.split(' ').map((word, wordIndex, array) => (
        <React.Fragment key={wordIndex}>
          <span className="word inline-flex overflow-hidden py-[0.1em]">
            {word.split('').map((char, charIndex) => (
              <span key={charIndex} className="char-wrapper inline-block overflow-hidden">
                <span className="char-inner inline-block transform-gpu origin-top-left text-5xl md:text-7xl lg:text-[8rem] font-bold">
                  {char}
                </span>
              </span>
            ))}
          </span>
          {wordIndex < array.length - 1 && (
            <span className="inline-block text-5xl md:text-7xl lg:text-[8rem]">&nbsp;</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};