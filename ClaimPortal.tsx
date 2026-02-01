
import React, { useState } from 'react';
import { Ticket, Loader2, ArrowLeft, CheckCircle2, Copy, Zap, Info, ShieldCheck, ShoppingBag, AlertCircle } from 'lucide-react';
import { Voucher, VerifiedOrder } from '../types';

interface ClaimPortalProps {
  vouchers: Voucher[];
  setVouchers: React.Dispatch<React.SetStateAction<Voucher[]>>;
  orders: VerifiedOrder[];
  setOrders: React.Dispatch<React.SetStateAction<VerifiedOrder[]>>;
  onBack: () => void;
}

const ClaimPortal: React.FC<ClaimPortalProps> = ({ vouchers, setVouchers, orders, setOrders, onBack }) => {
  const [orderId, setOrderId] = useState('');
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimedCode, setClaimedCode] = useState<string | null>(null);
  const [claimedCredits, setClaimedCredits] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleClaim = () => {
    const cleanOrderId = orderId.trim().toUpperCase();
    if (!cleanOrderId) return;

    setIsClaiming(true);
    setErrorMsg(null);

    // Simulasi delay validasi
    setTimeout(() => {
      // 1. Cek apakah Order ID ada di database sinkronisasi
      const verifiedOrder = orders.find(o => o.orderId === cleanOrderId);

      if (!verifiedOrder) {
        setErrorMsg("Order ID tidak ditemukan! Pastikan Anda memasukkan ID yang benar dari email Lynk.id.");
        setIsClaiming(false);
        return;
      }

      // 2. Cek apakah sudah pernah klaim
      if (verifiedOrder.status === 'Claimed') {
        const voucher = vouchers.find(v => v.claimedByOrderId === cleanOrderId);
        if (voucher) {
          setClaimedCode(voucher.code);
          setClaimedCredits(voucher.credits);
        }
        setIsClaiming(false);
        return;
      }

      // 3. Cari voucher yang sesuai di gudang (status Active & Kredit sama dengan paket order)
      const availableVoucher = vouchers.find(v => 
        v.status === 'Active' && 
        !v.claimedByOrderId && 
        v.credits === verifiedOrder.planType
      );

      if (!availableVoucher) {
        setErrorMsg(`Maaf, stok voucher untuk paket ${verifiedOrder.planType} sedang habis. Harap hubungi Admin.`);
        setIsClaiming(false);
        return;
      }

      // 4. Update Database
      // Tandai order sebagai 'Claimed'
      setOrders(prev => prev.map(o => o.orderId === cleanOrderId ? { ...o, status: 'Claimed' } : o));
      
      // Berikan voucher unik ke user
      setVouchers(prev => prev.map(v => 
        v.code === availableVoucher.code ? { ...v, claimedByOrderId: cleanOrderId } : v
      ));

      setClaimedCode(availableVoucher.code);
      setClaimedCredits(availableVoucher.credits);
      setIsClaiming(false);
    }, 1500);
  };

  const copyCode = () => {
    if (claimedCode) {
      navigator.clipboard.writeText(claimedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-24 animate-in fade-in duration-700">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-white mb-8 transition-colors text-xs font-black uppercase tracking-widest">
        <ArrowLeft size={16} /> Kembali ke Paket
      </button>

      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-4">
          Gerbang <span className="magix-text-gradient">Klaim Voucher.</span>
        </h2>
        <p className="text-slate-500 text-sm md:text-lg max-w-xl mx-auto font-medium">
          Masukkan Order ID Anda untuk mendapatkan kode voucher kredit.
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        {!claimedCode ? (
          <div className="bg-slate-900 border-2 border-indigo-500/30 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full" />
             
             <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <ShoppingBag size={28} />
                </div>
                <div className="text-left">
                   <h3 className="text-xl font-black text-white uppercase italic">Validasi Order ID</h3>
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Hanya untuk ID yang terverifikasi Lynk.id</p>
                </div>
             </div>

             <div className="space-y-6">
                <div>
                   <label className="text-[10px] font-black text-slate-500 uppercase mb-2 block ml-1 tracking-[0.2em]">Order ID</label>
                   <input 
                     type="text" 
                     value={orderId}
                     onChange={(e) => setOrderId(e.target.value)}
                     placeholder="LYNK-XXXXX-XXXX"
                     className={`w-full bg-slate-950 border ${errorMsg ? 'border-rose-500' : 'border-slate-800'} rounded-2xl p-5 text-white font-black tracking-widest outline-none focus:border-indigo-500 transition-all`}
                   />
                </div>

                {errorMsg && (
                  <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl flex items-start gap-3 animate-in slide-in-from-top-2">
                     <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={16} />
                     <p className="text-[10px] text-rose-200 font-medium leading-relaxed">{errorMsg}</p>
                  </div>
                )}

                <button 
                  onClick={handleClaim}
                  disabled={!orderId || isClaiming}
                  className="w-full py-5 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isClaiming ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} />}
                  {isClaiming ? 'VERIFIKASI...' : 'AMBIL VOUCHER SAYA'}
                </button>
             </div>
          </div>
        ) : (
          <div className="bg-slate-900 border-2 border-emerald-500/30 rounded-[3.5rem] p-10 shadow-2xl relative overflow-hidden text-center animate-success-pop">
             <div className="w-20 h-20 bg-emerald-500 rounded-[2rem] flex items-center justify-center text-white shadow-lg mx-auto mb-8 animate-bounce">
                <CheckCircle2 size={40} />
             </div>
             
             <h3 className="text-2xl font-black text-white uppercase italic mb-2">Order Terverifikasi!</h3>
             <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-8">Kode voucher unik Anda telah diterbitkan.</p>

             <div className="bg-slate-950 border border-emerald-500/20 rounded-3xl p-8 mb-8 relative">
                <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">Paket: +{claimedCredits.toLocaleString()} Kredit</div>
                <div className="text-3xl font-mono font-black text-white tracking-[0.2em] break-all">{claimedCode}</div>
                
                <button 
                  onClick={copyCode}
                  className="mt-6 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 mx-auto"
                >
                  {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                  {copied ? 'BERHASIL DISALIN' : 'SALIN KODE SEKARANG'}
                </button>
             </div>

             <button 
               onClick={onBack}
               className="text-xs font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
             >
               Gunakan Kode di Halaman Pricing →
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaimPortal;
