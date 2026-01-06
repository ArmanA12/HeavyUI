
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowRight, Lock, Mail, Cpu, Orbit } from 'lucide-react';

interface LoginViewProps {
  onSuccess: () => void;
  onClose: () => void;
  isEmbedded?: boolean;
}

const LoginView: React.FC<LoginViewProps> = ({ onSuccess, onClose, isEmbedded = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'input' | 'scanning' | 'success'>('input');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStep('scanning');

    // Simulate cryptographic handshake
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (!isEmbedded) {
      localStorage.setItem('heavy_token', 'session_active_0x7128');
    }
    setStep('success');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    onSuccess();
  };

  const containerClasses = isEmbedded 
    ? "relative w-full h-full flex items-center justify-center p-4 bg-transparent overflow-hidden" 
    : "fixed inset-0 z-[300] bg-white/10 dark:bg-black/10 backdrop-blur-sm flex items-center justify-center p-6 overflow-hidden";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={containerClasses}
    >
      {/* Background elements removed as per request */}

      <motion.div
        initial={{ y: 40, scale: 0.9, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 100 }}
        className="relative z-10 w-full max-w-md p-10 lg:p-14 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {step === 'input' && (
            <motion.div 
              key="form"
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <ShieldCheck className="text-white dark:text-black" size={32} />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">Login_Protocol</h2>
                <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mt-2">Access_Level: Authorized_Only</p>
              </div>

              <form onSubmit={handleAuth} className="space-y-6">
                <div className="space-y-2">
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                    <input 
                      required
                      type="email" 
                      placeholder="Node_ID (Email)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-14 bg-zinc-100 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-cyan-500/50 rounded-2xl pl-12 pr-4 outline-none transition-all font-mono text-xs uppercase tracking-widest"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                    <input 
                      required
                      type="password" 
                      placeholder="Access_Key"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-14 bg-zinc-100 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-cyan-500/50 rounded-2xl pl-12 pr-4 outline-none transition-all font-mono text-xs uppercase tracking-widest"
                    />
                  </div>
                </div>

                <button 
                  disabled={isLoading}
                  className="group relative w-full h-16 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] overflow-hidden transition-all active:scale-95 shadow-xl"
                >
                  <div className="absolute inset-0 bg-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white dark:group-hover:text-black">
                    Initiate_Handshake <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </form>

              {!isEmbedded && (
                <button 
                  onClick={onClose}
                  className="w-full text-center font-mono text-[9px] uppercase tracking-[0.4em] text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  Return_to_Surface
                </button>
              )}
            </motion.div>
          )}

          {step === 'scanning' && (
            <motion.div 
              key="scanning"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 space-y-8"
            >
              <div className="relative w-32 h-32 flex items-center justify-center">
                <motion.div 
                  className="absolute inset-0 border-2 border-cyan-500/30 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Orbit className="text-cyan-500 animate-spin-slow" size={48} />
                <motion.div 
                  className="absolute inset-0 bg-cyan-500/10 rounded-full"
                  animate={{ clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)', 'inset(100% 0 0 0)'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <div className="text-center">
                <h3 className="font-mono text-xs uppercase tracking-[0.5em] text-cyan-500 font-black animate-pulse">Decrypting_Biometrics...</h3>
                <p className="text-zinc-400 text-[9px] mt-2 font-mono">Syncing with Obsidian Core Cluster_01</p>
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 space-y-6"
            >
              <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_30px_#00f0ff]">
                <ShieldCheck className="text-white" size={40} />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Access_Granted</h3>
                <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest mt-2">Welcome Back, Architect</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Technical Decor */}
        <div className="absolute top-4 left-4 font-mono text-[7px] text-zinc-300 dark:text-zinc-700 uppercase">Ver_0.9.1.A</div>
        <div className="absolute bottom-4 right-4 flex gap-1">
          <div className="w-1 h-1 bg-zinc-300 dark:bg-zinc-700"></div>
          <div className="w-1 h-1 bg-zinc-300 dark:bg-zinc-700"></div>
          <div className="w-1 h-1 bg-cyan-500"></div>
        </div>
      </motion.div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </motion.div>
  );
};

export default LoginView;
