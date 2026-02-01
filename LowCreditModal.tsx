
import React from 'react';
import { 
  Zap, X, CreditCard, Gift, Timer, 
  ArrowRight, Sparkles, ShieldAlert, Heart
} from 'lucide-react';

interface LowCreditModalProps {
  onClose: () => void;
  onPricing: () => void;
  onDailyClaim: () => void;
  onReferral: () => void;
}

const LowCreditModal: React.FC<LowCreditModalProps> = ({ onClose, onPricing, onDailyClaim, onReferral }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Background Aura */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-3xl rounded-full" />
        
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-600 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-rose-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-rose-500/20 shadow-lg shadow-rose-500/5 animate-bounce">
            <ShieldAlert size={40} className="text-rose-500" />
          </div>
          <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">Kredit Habis!</h3>
          <p className="text-slate-500 text-sm font-medium leading-relaxed">
            Sihirmu terhenti sejenak. Jangan khawatir, pilih salah satu jalur di bawah untuk isi ulang tenagamu.
          </p>
        </div>

        <div className="space-y-4 mb-10">
          {/* Opsi 1: Beli */}
          <button 
            onClick={onPricing}
            className="w-full p-6 bg-indigo-600 rounded-[2rem] text-white flex items-center justify-between group hover:scale-[1.02] transition-all shadow-xl shadow-indigo-600/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <CreditCard size={24} />
              </div>
              <div className="text-left">
                <p className="text-sm font-black uppercase tracking-tight">Top Up Kredit</p>
                <p className="text-[10px] opacity-70">Mulai Rp 49rb (Paling Cepat)</p>
              </div>
            </div>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Opsi 2: Gratisan Harian */}
          <button 
            onClick={onDailyClaim}
            className="w-full p-6 bg-slate-800 border border-slate-700 rounded-[2rem] text-white flex items-center justify-between group hover:border-emerald-500/50 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center">
                <Timer size={24} />
              </div>
              <div className="text-left">
                <p className="text-sm font-black uppercase tracking-tight">Jatah Harian</p>
                <p className="text-[10px] text-slate-500">Klaim 2 Kredit Gratis (Tiap Hari)</p>
              </div>
            </div>
            <Sparkles size={20} className="text-amber-400 animate-pulse" />
          </button>

          {/* Opsi 3: Referral */}
          <button 
            onClick={onReferral}
            className="w-full p-6 bg-slate-950 border border-slate-800 rounded-[2rem] text-white flex items-center justify-between group hover:border-indigo-500/50 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center">
                <Gift size={24} />
              </div>
              <div className="text-left">
                <p className="text-sm font-black uppercase tracking-tight">Ajak Teman</p>
                <p className="text-[10px] text-slate-500">Dapatkan 50 Kredit per Teman</p>
              </div>
            </div>
            <div className="text-[10px] font-black bg-indigo-500 text-white px-3 py-1 rounded-full uppercase">Cuan</div>
          </button>
        </div>

        <div className="text-center">
           <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
             <Heart size={12} className="text-rose-500 fill-rose-500" /> Support Indonesia's Local Brand
           </p>
        </div>
      </div>
    </div>
  );
};

export default LowCreditModal;
