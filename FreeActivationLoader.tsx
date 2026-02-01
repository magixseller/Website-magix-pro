
import React, { useState, useEffect } from 'react';
import { Sparkles, Timer, Zap, Search, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';

interface FreeActivationLoaderProps {
  onComplete: () => void;
}

const MESSAGES = [
  "Memindai ketersediaan slot harian...",
  "Memverifikasi antrian sistem...",
  "Mengkoneksikan jalur AI Magix...",
  "Menyuntikkan 10 Kredit Gratis...",
  "Sihir Siap Digunakan!"
];

const FreeActivationLoader: React.FC<FreeActivationLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [messageIdx, setMessageIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1.5;
      });
    }, 40);

    const msgTimer = setInterval(() => {
      setMessageIdx(prev => (prev < MESSAGES.length - 1 ? prev + 1 : prev));
    }, 800);

    return () => {
      clearInterval(timer);
      clearInterval(msgTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* Background Magic Aura */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="aura-effect opacity-40" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-fuchsia-600/10 blur-[120px] animate-float" />
      </div>

      <div className="relative z-10 max-w-sm w-full">
        {/* Animated Scanner Visual */}
        <div className="relative w-48 h-48 mx-auto mb-12">
          <div className="absolute inset-0 border-2 border-indigo-500/20 rounded-[2.5rem] animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-4 border-2 border-indigo-500/40 rounded-[2rem] animate-[spin_6s_linear_infinite_reverse]" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-24 h-24 bg-slate-900 rounded-[2rem] border border-slate-800 flex items-center justify-center shadow-2xl overflow-hidden">
              <div className="absolute inset-0 soon-scanline opacity-50" />
              {progress < 100 ? (
                <Search size={40} className="text-indigo-400 animate-pulse" />
              ) : (
                <CheckCircle2 size={40} className="text-emerald-400 animate-success-pop" />
              )}
            </div>
          </div>

          {/* Floating Dots */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-indigo-500 rounded-full blur-sm animate-pulse" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-fuchsia-500 rounded-full blur-sm animate-pulse" />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">
              {progress < 100 ? "Mencari Slot Gratis" : "Aktivasi Berhasil"}
            </h3>
            <div className="flex items-center justify-center gap-2">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] animate-pulse h-4 block">
                {MESSAGES[messageIdx]}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/5 shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-indigo-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] -translate-x-full animate-[shimmer-glide_1.5s_infinite]" />
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
             <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg">
                <Zap size={12} className="text-amber-400 fill-amber-400" />
                <span className="text-[9px] font-black text-white">+10 KREDIT</span>
             </div>
             <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg">
                <ShieldCheck size={12} className="text-emerald-400" />
                <span className="text-[9px] font-black text-white">SECURE</span>
             </div>
          </div>
        </div>
      </div>

      <div className="mt-20 opacity-20">
        <p className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.8em]">System: High Priority Queue</p>
      </div>
    </div>
  );
};

export default FreeActivationLoader;
