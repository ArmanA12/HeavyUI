
import { UIComponent, Template } from './types';

export const COMPONENTS_DATA: UIComponent[] = [
  {
    id: 'E-commerce',
    name: 'E-commerce Login Page',
    installs: '0.5k',
    isPaid: false,
    category: 'Visuals',
    previewUrl: '/src/assets/component_01.jpg',
    videoUrl: '/src/assets/videos/component_01.mov',
    fullDescription: 'A high-performance dual-state reveal component using synchronized CSS masking and motion-tracked scanning lines. Perfect for showcasing wireframes, blueprints, or "under-the-hood" logic.',
    codeSnippet: `import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const XRayScanner = ({ surface, core }) => {
  const [scanPos, setScanPos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanPos(prev => (prev >= 100 ? 0 : prev + 0.5));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black">
      <img src={surface} className="absolute inset-0 w-full h-full object-cover grayscale opacity-80" />
      <div 
        className="absolute inset-0 w-full h-full" 
        style={{ clipPath: 'inset(0 0 ' + (100 - scanPos) + '% 0)' }}
      >
        <img src={core} className="w-full h-full object-cover saturate-150" />
      </div>
      <div 
        className="absolute left-0 right-0 h-[2px] bg-cyan-500 shadow-[0_0_15px_#00f0ff] z-10" 
        style={{ top: scanPos + '%' }} 
      />
    </div>
  );
};

export default XRayScanner;`,
    techStack: ['React', 'Framer Motion', 'Clip-Path'],
  },
  {
    id: '1',
    name: 'Neo-Glow Navigation',
    installs: '12.4k',
    isPaid: false,
    category: 'Navigation',
    previewUrl: 'https://picsum.photos/seed/comp1/600/400',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    fullDescription: 'Ultra-thin navigational primitive with adaptive glow states and collision-aware dropdowns.',
    codeSnippet: `export const NeoNav = () => (
  <nav className="fixed top-0 w-full flex justify-between p-6 backdrop-blur-xl border-b border-white/5">
    <div className="logo font-black">HEAVY</div>
    <div className="links flex gap-8">
      {['Archive', 'Blueprint', 'Vault'].map(l => (
        <a key={l} className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">{l}</a>
      ))}
    </div>
  </nav>
);`,
    techStack: ['Tailwind', 'Framer Motion'],
  },
  {
    id: '2',
    name: 'Floating 3D Hero',
    installs: '8.9k',
    isPaid: true,
    category: 'Sections',
    previewUrl: 'https://picsum.photos/seed/comp2/600/400',
    videoUrl: 'https://www.pexels.com/download/video/34693606/',
    fullDescription: 'A WebGL-powered hero section that responds to device orientation and mouse proximity.',
    techStack: ['Three.js', 'React Three Fiber'],
  },
  {
    id: '3',
    name: 'Liquid Button Set',
    installs: '24.1k',
    isPaid: false,
    category: 'Buttons',
    previewUrl: 'https://picsum.photos/seed/comp3/600/400',
    videoUrl: 'https://www.pexels.com/download/video/30809325/',
    fullDescription: 'SVG filter-based gooey buttons that merge and split with physics-based animations.',
    techStack: ['SVG Filters', 'GSAP'],
  },
  {
    id: '4',
    name: 'Glassmorphic Sidebar',
    installs: '5.2k',
    isPaid: true,
    category: 'Layout',
    previewUrl: 'https://picsum.photos/seed/comp4/600/400',
    videoUrl: 'https://www.pexels.com/download/video/34693673/',
    techStack: ['CSS Backdrop', 'React'],
  },
  {
    id: '5',
    name: 'Animated Grid Cards',
    installs: '15.7k',
    isPaid: false,
    category: 'Cards',
    previewUrl: 'https://picsum.photos/seed/comp5/600/400',
    videoUrl: 'https://www.pexels.com/download/video/34693636/',
    techStack: ['CSS Grid', 'Framer Motion'],
  }
];

export const TEMPLATES_DATA: Template[] = [
  {
    id: 't1',
    name: 'Nexus SaaS Starter',
    useCase: 'Software as a Service',
    description: 'A high-fidelity landing page for modern software companies. Optimized for high conversion and brutalist aesthetics.',
    isPaid: true,
    previewUrl: 'https://picsum.photos/seed/temp1/1200/800',
    previewImages: [
      'https://picsum.photos/seed/t1_1/800/500',
      'https://picsum.photos/seed/t1_2/800/500',
      'https://picsum.photos/seed/t1_3/800/500',
    ],
    videoUrl: 'https://www.pexels.com/download/video/34693673/',
    techStack: ['Next.js', 'React', 'Tailwind', 'Motion'],
  },
  {
    id: 't2',
    name: 'Aura Portfolio Pro',
    useCase: 'Personal Branding',
    description: 'The ultimate canvas for creative engineers. Features fluid transitions and custom WebGL shaders for impact.',
    isPaid: false,
    previewUrl: 'https://picsum.photos/seed/temp2/1200/800',
    previewImages: [
      'https://picsum.photos/seed/t2_1/800/500',
      'https://picsum.photos/seed/t2_2/800/500',
      'https://picsum.photos/seed/t2_3/800/500',
    ],
    videoUrl: 'https://www.pexels.com/download/video/34693606/',
    techStack: ['React', 'Framer', 'Three.js', 'Vite'],
  },
  {
    id: 't3',
    name: 'Quantum Dashboard',
    useCase: 'Enterprise Admin',
    description: 'Complex data visualization made elegant. Built for high-frequency trading and monitoring environments.',
    isPaid: true,
    previewUrl: 'https://picsum.photos/seed/temp3/1200/800',
    previewImages: [
      'https://picsum.photos/seed/t3_1/800/500',
      'https://picsum.photos/seed/t3_2/800/500',
      'https://picsum.photos/seed/t3_3/800/500',
    ],
    videoUrl: 'https://www.pexels.com/download/video/5235133/',
    techStack: ['TypeScript', 'Tailwind', 'Radix', 'Charts'],
  }
];
