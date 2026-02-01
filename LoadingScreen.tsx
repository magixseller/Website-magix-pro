
import React, { useEffect, useState } from 'react';
import { Sparkles, BrainCircuit, Scan, ShieldCheck, Cpu } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const STATUS_MSGS = [
  "Membangun Koneksi Neural...",
  "Sinkronisasi Cloud Magix...",
  "Mengaktifkan GPU Render...",
  "Memuat Preset Studio 4K...",
  "Menganalisis Tren Marketplace...",
  "Harmonisasi Pixel AI...",
  "Sihir Siap Digunakan!"
];

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    let currentProgress = 0;
    const updateProgress = () => {
      // Algoritma Organik: progress melambat saat mendekati akhir
      const increment = currentProgress > 85 ? Math.random() * 0.2 : Math.random() * 1.5;
      currentProgress += increment;

      if (currentProgress >= 100) {
        setProgress(100);
        setTimeout(onComplete, 800);
        return;
      }

      setProgress(currentProgress);
      // Ganti pesan berdasarkan progress
      const targetMsgIdx = Math.min(
        Math.floor((currentProgress / 100) * STATUS_MSGS.length),
        STATUS_MSGS.length - 1
      );
      setMsgIdx(targetMsgIdx);

      // Variasi interval waktu agar terasa "tidak mekanis"
      const delay = currentProgress > 90 ? 150 : 20 + Math.random() * 40;
      setTimeout(updateProgress, delay);
    };

    updateProgress();
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-[1000] overflow-hidden">
      {/* Mesh Gradient Background Immersive */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/20 premium-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-600/20 premium-blob" style={{ animationDelay: '-4s' }} />
      </div>

      {/* Grid Overlay Aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-lg px-8">
        {/* Core Magic Spinner */}
        <div className="relative mb-20 flex items-center justify-center">
          {/* Animated Rings */}
          <div className="absolute w-40 h-40 md:w-56 md:h-56 border-2 border-indigo-500/10 rounded-[3.5rem] animate-[orbit_12s_linear_infinite]" />
          <div className="absolute w-32 h-32 md:w-44 md:h-44 border-2 border-fuchsia-500/20 rounded-[3rem] animate-[orbit_8s_linear_infinite_reverse]" />
          
          <div className="magic-loader scale-150" style={{ width: '140px', height: '140px' }} />
          
          <div className="absolute w-24 h-24 md:w-28 md:h-28 magix-gradient rounded-[2.5rem] flex items-center justify-center shadow-[0_0_60px_rgba(99,102,241,0.5)] overflow-hidden animate-success-pop border-2 border-white/20">
            <span className="text-white text-5xl md:text-6xl font-black italic select-none drop-shadow-2xl">M</span>
            <div className="absolute inset-0 soon-scanline opacity-30" />
          </div>
        </div>
        
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic">
              MAGIX <span className="magix-text-gradient">TOOL SELLER</span>
            </h1>
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="text-indigo-400 animate-pulse" size={16} />
              <p className="text-slate-500 font-bold text-[10px] md:text-xs uppercase tracking-[0.5em] h-4">
                {STATUS_MSGS[msgIdx]}
              </p>
            </div>
          </div>

          {/* New Organic Progress Bar */}
          <div className="relative w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/5 shadow-2xl">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-indigo-500 transition-all duration-300 ease-out shadow-[0_0_20px_rgba(99,102,241,0.6)]"
              style={{ width: `${progress}%` }}
            />
            {/* Glossy Shimmer Effect */}
            <div 
              className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] -translate-x-full"
              style={{ animation: 'shimmer-glide 2s infinite' }} 
            />
          </div>
          
          <div className="flex items-center justify-between px-2">
             <div className="flex items-center gap-2">
                <BrainCircuit size={14} className="text-indigo-400 animate-pulse" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">AI Engine Active</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="text-indigo-400 font-black text-xs tabular-nums">{Math.round(progress)}%</span>
             </div>
          </div>
        </div>
      </div>

      {/* Professional Footer Info */}
      <div className="absolute bottom-10 inset-x-0 flex flex-col items-center gap-4 opacity-30">
         <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
               <ShieldCheck size={14} />
               <span className="text-[8px] font-black uppercase tracking-widest">Enterprise Security</span>
            </div>
            <div className="w-1 h-1 bg-slate-500 rounded-full" />
            <div className="flex items-center gap-2">
               <Cpu size={14} />
               <span className="text-[8px] font-black uppercase tracking-widest">Quantum Rendering</span>
            </div>
         </div>
         <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.8em]">V2.5.0 STABLE BUILD</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
