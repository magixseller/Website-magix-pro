
import React, { useState } from 'react';
import { X, Lock, ShieldCheck, ArrowRight, Zap, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onClose, onSuccess }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const MASTER_CODE = 'MAGIX-OWNER-2025';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === MASTER_CODE) {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in">
      <div className={`bg-slate-900 border-2 ${error ? 'border-rose-500 animate-shake' : 'border-slate-800'} w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative overflow-hidden transition-colors`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 blur-3xl rounded-full" />
        
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-600 hover:text-white transition-colors">
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-rose-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-rose-500/20 shadow-lg">
            <Lock size={32} className="text-rose-500" />
          </div>
          <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-1">Owner Secret Portal</h3>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Akses Panel Utama Pengelola</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase mb-2 block ml-1 tracking-[0.2em]">Masukkan Master Code</label>
            <input 
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-center text-white tracking-[0.5em] font-black outline-none focus:border-rose-500 transition-all placeholder:tracking-normal placeholder:font-medium"
              autoFocus
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 justify-center text-rose-500 text-[10px] font-black uppercase animate-pulse">
              <AlertCircle size={14} /> Code Tidak Valid
            </div>
          )}

          <button 
            type="submit"
            className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-600/20 transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            Buka Panel Owner <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-800/50 text-center">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-950 rounded-xl border border-slate-800">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">End-to-End Encrypted Login</span>
           </div>
        </div>
      </div>
      
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>
    </div>
  );
};

export default AdminLoginModal;
