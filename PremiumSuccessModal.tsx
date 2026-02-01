
import React, { useEffect, useState } from 'react';
import { CheckCircle2, PartyPopper, Zap, Sparkles, X, ChevronRight, ShieldCheck } from 'lucide-react';

interface PremiumSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'success' | 'credit' | 'sync';
}

const PremiumSuccessModal: React.FC<PremiumSuccessModalProps> = ({ isOpen, onClose, title, message, type = 'success' }) => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      const colors = ['#6366f1', '#ec4899', '#a855f7', '#10b981', '#f59e0b'];
      const newParticles = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5
      }));
      setParticles(newParticles);
      
      const timer = setTimeout(onClose, 8000);
      return () => clearTimeout(timer);
    } else {
      setParticles([]);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getStyles = () => {
    switch(type) {
      case 'credit': return { icon: Zap, color: 'text-amber-400', glow: 'shadow-amber-500/20', bg: 'bg-amber-500' };
      case 'sync': return { icon: Sparkles, color: 'text-indigo-400', glow: 'shadow-indigo-500/20', bg: 'bg-indigo-500' };
      default: return { icon: CheckCircle2, color: 'text-emerald-400', glow: 'shadow-emerald-500/20', bg: 'bg-emerald-500' };
    }
  };

  const { icon: Icon, color, glow, bg } = getStyles();

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-2xl animate-in fade-in duration-500" onClick={onClose} />
      
      {particles.map(p => (
        <div 
          key={p.id}
          className="confetti-particle"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animationDelay: `${p.delay}s`
          }}
        />
      ))}

      <div className="relative w-full max-w-lg bg-slate-900 border-2 border-white/5 rounded-[4rem] p-10 md:p-14 shadow-2xl animate-premium-modal overflow-hidden">
        <div className={`absolute -top-24 -right-24 w-64 h-64 ${bg}/10 blur-[100px] rounded-full`} />
        
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-600 hover:text-white transition-all">
          <X size={24} />
        </button>

        <div className="text-center space-y-8 relative z-10">
          <div className={`w-24 h-24 ${bg}/10 rounded-[2.5rem] flex items-center justify-center mx-auto border-2 border-white/5 premium-glow-effect`}>
            <Icon size={48} className={color} />
          </div>

          <div className="space-y-3">
            <h3 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
              {title}
            </h3>
            <p className="text-slate-400 text-sm md:text-lg font-medium italic leading-relaxed">
              {message}
            </p>
          </div>

          <div className="pt-4">
            <button 
              onClick={onClose}
              className={`w-full py-5 ${bg} text-white font-black text-xs uppercase tracking-widest rounded-3xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3`}
            >
              Lanjutkan Sihir <ChevronRight size={18} />
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 opacity-30 pt-4 grayscale">
             <div className="flex items-center gap-2">
                <ShieldCheck size={14} />
                <span className="text-[8px] font-black uppercase tracking-widest">Verified Success</span>
             </div>
             <div className="w-1 h-1 bg-slate-600 rounded-full" />
             <div className="flex items-center gap-2">
                <PartyPopper size={14} />
                <span className="text-[8px] font-black uppercase tracking-widest">Premium Magix</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumSuccessModal;
