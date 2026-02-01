
import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, BrainCircuit, Scan, ShieldCheck, Cpu } from 'lucide-react';

interface MagicLoadingOverlayProps {
  title?: string;
  subtitles?: string[];
}

const DEFAULT_SUBTITLES = [
  "Menganalisis Komposisi Produk...",
  "Menyeimbangkan Pencahayaan Studio...",
  "Mengoptimasi Kedalaman Ruang...",
  "Menyempurnakan Tekstur Visual...",
  "Harmonisasi Pixel AI Aktif...",
  "Membangun Realisme Komersial..."
];

const MagicLoadingOverlay: React.FC<MagicLoadingOverlayProps> = ({ 
  title = "Sihir Sedang Berjalan", 
  subtitles = DEFAULT_SUBTITLES 
}) => {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx(prev => (prev + 1) % subtitles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [subtitles]);

  return (
    <div className="absolute inset-0 z-[100] bg-slate-950/80 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 overflow-hidden">
      {/* Dynamic Animated Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/10 premium-blob pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-fuchsia-600/10 premium-blob pointer-events-none" style={{ animationDelay: '-2s' }} />

      <div className="relative">
        {/* Core Animation */}
        <div className="relative mb-12">
          <div className="w-32 h-32 md:w-40 md:h-40 border-4 border-indigo-500/10 rounded-[3rem] animate-[orbit_10s_linear_infinite]" />
          <div className="absolute inset-0 border-4 border-indigo-500/40 rounded-[3rem] scale-90 animate-[orbit_6s_linear_infinite_reverse]" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 magix-gradient rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.5)] animate-pulse">
               <Cpu size={32} className="text-white animate-bounce" />
            </div>
          </div>

          <div className="absolute -top-2 -right-2 bg-slate-900 border border-indigo-500/30 p-2 rounded-xl shadow-2xl animate-float-y">
            <Scan size={16} className="text-indigo-400" />
          </div>
        </div>

        <div className="space-y-6 max-w-sm mx-auto">
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-black text-white italic tracking-tighter uppercase">
              {title}
            </h3>
            <div className="flex items-center justify-center gap-3">
              <Sparkles size={14} className="text-amber-400 animate-pulse" />
              <p className="text-[10px] md:text-xs font-black text-indigo-400 uppercase tracking-[0.4em] animate-pulse min-h-[1rem]">
                {subtitles[msgIdx]}
              </p>
            </div>
          </div>

          <div className="relative w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/5">
             <div className="h-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-indigo-500 animate-[shimmer-glide_2s_linear_infinite]" style={{ width: '100%' }} />
          </div>

          <div className="flex items-center justify-center gap-4 pt-4 opacity-50">
             <div className="flex items-center gap-2">
                <BrainCircuit size={14} className="text-slate-500" />
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Neural Engine 3.0</span>
             </div>
             <div className="w-1 h-1 bg-slate-700 rounded-full" />
             <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-slate-500" />
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Quantum Process</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagicLoadingOverlay;
