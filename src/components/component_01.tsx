import React, { useEffect, useState } from 'react';
import { 
  Mail, Lock, Github, Facebook, ArrowRight, Eye, 
  EyeOff, Loader2, Spade 
} from 'lucide-react';

// --- Types & Constants ---
interface Product {
  id: number;
  img: string;
  label: string;
  x: number;
  y: number;
  portSide: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const BRAND_GRADIENT = "linear-gradient(to right bottom, #f59e09, #ed8d02, #e57d00, #dc6c00, #d35b00)";

// --- Sub-components ---
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const LuxeLogin: React.FC = () => {
  // State for Branding Side
  const [isVisible, setIsVisible] = useState(false);

  // State for Login Form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const products: Product[] = [
    { id: 1, img: "https://picsum.photos/seed/lux1/400/400", label: "Design", x: 22, y: 24, portSide: 'bottom-right' },
    { id: 2, img: "https://picsum.photos/seed/lux2/400/400", label: "Development", x: 50, y: 18, portSide: 'bottom' },
    { id: 3, img: "https://picsum.photos/seed/lux3/400/400", label: "Security", x: 78, y: 24, portSide: 'bottom-left' },
    { id: 4, img: "https://picsum.photos/seed/lux4/400/400", label: "Mobile App", x: 22, y: 76, portSide: 'top-right' },
    { id: 5, img: "https://picsum.photos/seed/lux5/400/400", label: "Web 3", x: 50, y: 82, portSide: 'top' },
    { id: 6, img: "https://picsum.photos/seed/lux6/400/400", label: "Estate Decor", x: 78, y: 76, portSide: 'top-left' },
  ];

  // Helper functions for SVG paths
  const getPortCoord = (p: Product) => {
    const offset = 6; 
    let px = p.x;
    let py = p.y;
    if (p.portSide.includes('top')) py -= offset;
    if (p.portSide.includes('bottom')) py += offset;
    if (p.portSide.includes('left')) px -= offset;
    if (p.portSide.includes('right')) px += offset;
    return { x: px, y: py };
  };

  const getCurvedPath = (p: Product) => {
    const startX = 50;
    const startY = 50;
    const port = getPortCoord(p);
    if (p.x === 50) return `M ${startX} ${startY} L ${port.x} ${port.y}`;
    const cpX = 50;
    const cpY = port.y;
    return `M ${startX} ${startY} Q ${cpX} ${cpY} ${port.x} ${port.y}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white selection:bg-amber-600 selection:text-white">
      {/* Required CSS Animations */}
      <style>{`
        @keyframes draw {
          from { stroke-dasharray: 0 100; }
          to { stroke-dasharray: 100 0; }
        }
        .animate-draw-slow {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: draw-fill 3s ease-out forwards;
        }
        @keyframes draw-fill {
          to { stroke-dashoffset: 0; }
        }
        .animate-drift-premium {
          animation: drift 8s ease-in-out infinite;
        }
        @keyframes drift {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(5px); }
        }
        .animate-breathe {
          animation: breathe 4s ease-in-out infinite;
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.05); filter: brightness(1.1); }
        }
        .ease-premium {
          transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
        }
      `}</style>

      {/* LEFT SIDE: BRANDING ANIMATION */}
      <div className="w-full md:w-1/2 min-h-[500px] md:min-h-screen relative overflow-hidden flex items-center justify-center bg-[#d35b00]">
        
        {/* Grid Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className={`w-full h-full transition-opacity duration-[3000ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(217, 119, 6, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(217, 119, 6, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
              maskImage: "radial-gradient(circle, black, transparent 90%)",
              WebkitMaskImage: "radial-gradient(circle, black, transparent 90%)",
            }}
          />
        </div>

        {/* Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          {isVisible && (
            <g opacity="0.2">
              {products.map((p, idx) => (
                <path 
                  key={p.id}
                  d={getCurvedPath(p)}
                  stroke="white" 
                  strokeWidth="0.1" 
                  fill="none" 
                  strokeLinecap="round"
                  className="animate-draw-slow" 
                  style={{ animationDelay: `${1 + idx * 0.2}s` }} 
                />
              ))}
            </g>
          )}
        </svg>

        {/* Floating Product Cards */}
        <div className="absolute inset-0 w-full h-full z-20">
          {products.map((p, idx) => {
            const currentStyle = isVisible 
              ? { left: `${p.x}%`, top: `${p.y}%`, opacity: 1, transform: 'translate(-50%, -50%)' }
              : { left: '50%', top: '50%', opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' };

            return (
              <div 
                key={p.id}
                className="absolute ease-premium duration-[3500ms]"
                style={{ 
                  ...currentStyle,
                  width: '120px',
                  height: '120px',
                  transitionDelay: `${800 + idx * 180}ms`,
                  pointerEvents: isVisible ? 'auto' : 'none'
                }}
              >
                <div 
                  className="relative w-full h-full p-2 rounded-2xl shadow-2xl bg-white border border-black/[0.04] animate-drift-premium group hover:shadow-amber-500/40 hover:-translate-y-4 transition-all duration-1000 cursor-pointer" 
                  style={{ animationDelay: `${idx * 1.5}s` }}
                >
                  <div className="w-full h-full overflow-hidden rounded-xl bg-gray-50/50">
                    <img src={p.img} alt={p.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  </div>
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center text-[8px] text-white font-bold uppercase tracking-[0.3em] text-center p-2 rounded-2xl backdrop-blur-sm">
                    {p.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Central Logo */}
        <div className={`z-40 p-2 rounded-3xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-2xl transition-all duration-[2500ms] ease-premium transform flex flex-col items-center ${isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          <div 
            style={{ backgroundImage: BRAND_GRADIENT }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl animate-breathe"
          >
            <Spade size={32} className="text-white" />
          </div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="w-[70%] aspect-square bg-gradient-to-br from-amber-400/20 via-transparent to-transparent rounded-full blur-[120px] opacity-60" />
        </div>
      </div>

      {/* RIGHT SIDE: LOGIN FORM */}
      <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center p-6 md:p-12 lg:p-24 bg-white">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          
          <div className="text-center md:text-left">
            <div className="flex justify-center mb-6 group items-center gap-2">
               <div 
                 style={{ backgroundImage: BRAND_GRADIENT }}
                 className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all group-hover:rotate-[15deg] group-hover:scale-110 duration-500 shadow-lg shrink-0"
               >
                 <Spade size={32} className="text-white" />
               </div>
            </div>
            <h1 className="text-3xl text-center font-bold tracking-tight text-gray-900">Welcome back!</h1>
            <p className="mt-2 text-center text-sm text-gray-500">Access your exclusive member dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-amber-600 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all text-sm"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-amber-600 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="block w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all text-sm"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-amber-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rem-me"
                  type="checkbox"
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded cursor-pointer"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="rem-me" className="ml-2 block text-sm text-gray-600 cursor-pointer">Remember me</label>
              </div>
              <a href="#" className="text-sm font-medium text-gray-500 hover:text-amber-600 underline-offset-4 hover:underline transition-all">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{ backgroundImage: BRAND_GRADIENT }}
              className="group relative w-full flex justify-center py-4 text-sm font-bold rounded-xl text-white shadow-lg shadow-amber-500/25 hover:brightness-110 transition-all active:scale-[0.98] disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                <span className="flex items-center">
                  Sign in to Luxe <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-500">New to the club? <a href="#" className="font-semibold text-amber-600 hover:underline">Create an account</a></p>
          </div>

          <div className="relative mt-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-semibold">
              <span className="px-3 bg-white text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[ 
              { icon: <Github size={20} />, title: "Github", color: "hover:text-[#333]" },
              { icon: <GoogleIcon />, title: "Google", isCustom: true },
              { icon: <Facebook size={20} />, title: "Facebook", color: "hover:text-[#1877F2]" }
            ].map((social, i) => (
              <button key={i} className="flex items-center justify-center py-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors shadow-sm active:scale-95 group">
                <div className={`${!social.isCustom ? `text-gray-400 ${social.color}` : 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100'} transition-all`}>
                  {social.icon}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 pt-8 text-center text-[10px] text-gray-400 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} LuxeCommerce Global Inc. &bull; <a href="#" className="hover:text-amber-600">Privacy</a> &bull; <a href="#" className="hover:text-amber-600">Terms</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuxeLogin;