
import React, { useState } from 'react';
import { 
  Zap, ExternalLink, Loader2, Ticket, ArrowRight, ShoppingCart, 
  ShieldCheck, CheckCircle2, Star, TrendingUp, Gem, Heart, Trophy,
  Search, Package, Gift, AlertCircle, Sparkles, Mail, Info, MousePointer2
} from 'lucide-react';
import { Voucher, VerifiedOrder, AppView } from '../types';

interface PricingViewProps {
  onPaymentSuccess: (planId: string, isLifetime: boolean, extraCredits: number, price: number) => void;
  onActivateFree: () => void;
  vouchers: Voucher[];
  setVouchers: React.Dispatch<React.SetStateAction<Voucher[]>>;
  orders: VerifiedOrder[];
  setOrders: React.Dispatch<React.SetStateAction<VerifiedOrder[]>>;
  setView: (view: AppView) => void;
  triggerSuccess: (title: string, message: string, type: 'success' | 'credit' | 'sync') => void;
}

const PRICING_PLANS = [
  { 
    name: 'Starter', 
    price: 59000, 
    credits: 250, 
    url: 'https://lynk.id/magix/starter', 
    icon: Zap, 
    color: 'border-slate-800', 
    saving: 'Value Pack' 
  },
  { 
    name: 'Pro Seller', 
    price: 149000, 
    credits: 1000, 
    popular: true, 
    url: 'https://lynk.id/magix/pro', 
    icon: TrendingUp, 
    color: 'border-indigo-500/50', 
    saving: 'Hemat 25%' 
  },
  { 
    name: 'Elite Agency', 
    price: 349000, 
    credits: 3000, 
    url: 'https://lynk.id/magix/elite', 
    icon: Trophy, 
    color: 'border-emerald-500/50', 
    saving: 'Hemat 40%' 
  },
  { 
    name: 'Sultan Ultimate', 
    price: 799000, 
    credits: 10000, 
    url: 'https://lynk.id/magix/ultimate', 
    icon: Gem, 
    color: 'border-amber-500/50', 
    saving: 'Best Value' 
  },
];

const PricingView: React.FC<PricingViewProps> = ({ 
  onPaymentSuccess, vouchers, setVouchers, orders, setOrders, triggerSuccess 
}) => {
  const [magicInput, setMagicInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'error' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [showEmailGuide, setShowEmailGuide] = useState(false);

  const handleActivation = () => {
    const input = magicInput.trim().toUpperCase();
    if (!input) return;

    setStatus('processing');
    setErrorMsg('');

    setTimeout(() => {
      if (input.startsWith('LYNK-')) {
        const foundOrder = orders.find(o => o.orderId === input);

        if (!foundOrder) {
          setErrorMsg("Order ID tidak ditemukan! Pastikan status di Lynk.id sudah 'Selesai'.");
          setStatus('error');
          return;
        }

        if (foundOrder.status === 'Claimed') {
          setErrorMsg("Order ID ini sudah pernah diklaim sebelumnya.");
          setStatus('error');
          return;
        }

        // LOGIKA BARU: Filter semua voucher yang tersedia untuk paket ini
        const availableVouchers = vouchers.filter(v => 
          v.status === 'Active' && !v.claimedByOrderId && v.credits === foundOrder.planType
        );

        if (availableVouchers.length === 0) {
          setErrorMsg("Stok voucher sedang kosong. Hubungi admin untuk restok instan.");
          setStatus('error');
          return;
        }

        // AMBIL SECARA ACAK dari daftar yang tersedia
        const randomIndex = Math.floor(Math.random() * availableVouchers.length);
        const selectedVoucher = availableVouchers[randomIndex];

        setOrders(prev => prev.map(o => o.orderId === input ? { ...o, status: 'Claimed' } : o));
        setVouchers(prev => prev.map(v => v.code === selectedVoucher.code ? { ...v, status: 'Used', usedAt: Date.now(), claimedByOrderId: input } : v));
        
        onPaymentSuccess('lynkid_autoclaim', false, selectedVoucher.credits, 0);
        setMagicInput('');
        setStatus('success');
        triggerSuccess("MAGIC ACTIVATION!", `Order ID ${input} terverifikasi. ${selectedVoucher.credits.toLocaleString()} Kredit telah ditambahkan!`, "credit");
      } 
      else {
        const foundVoucher = vouchers.find(v => v.code === input);
        if (!foundVoucher) {
          setErrorMsg("Kode tidak valid. Cek kembali penulisan Anda.");
          setStatus('error');
          return;
        }
        if (foundVoucher.status === 'Used') {
          setErrorMsg("Voucher ini sudah pernah digunakan.");
          setStatus('error');
          return;
        }
        setVouchers(prev => prev.map(v => v.code === input ? { ...v, status: 'Used', usedAt: Date.now() } : v));
        onPaymentSuccess('voucher_manual', false, foundVoucher.credits, 0);
        setMagicInput('');
        setStatus('success');
        triggerSuccess("REDEEM BERHASIL", `${foundVoucher.credits.toLocaleString()} Kredit berhasil masuk ke akun Anda.`, "credit");
      }
    }, 1500);
  };

  const formatPrice = (p: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-24 animate-in fade-in duration-700">
      <div className="text-center mb-20 space-y-6">
        <div className="inline-flex items-center gap-3 px-5 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
           <Zap className="text-amber-400 fill-amber-400 animate-pulse" size={16} />
           <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Pusat Top-Up Kredit Magix</span>
        </div>
        <h2 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">
          Investasi Kecil, <br/> <span className="magix-text-gradient">Laba Maksimal.</span>
        </h2>
        <p className="text-slate-500 text-sm md:text-xl max-w-2xl mx-auto font-medium leading-relaxed italic">
          Beli Kredit Sekali Bayar • Berlaku Selamanya • Tanpa Biaya Berlangganan
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
         {PRICING_PLANS.map(pkg => (
           <div key={pkg.name} className={`bg-slate-900/60 backdrop-blur-xl border-2 ${pkg.color} p-8 md:p-10 rounded-[3.5rem] flex flex-col relative group transition-all hover:scale-[1.03] shadow-2xl`}>
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[8px] font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-xl">PALING LARIS</div>
              )}
              <div className="mb-10">
                 <div className={`w-14 h-14 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${pkg.popular ? 'text-indigo-400' : 'text-slate-600'}`}>
                    <pkg.icon size={28} />
                 </div>
                 <h3 className="text-xl font-black text-white uppercase italic">{pkg.name}</h3>
                 <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">{pkg.saving}</p>
              </div>
              <div className="mb-10 space-y-1">
                 <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white">{pkg.credits.toLocaleString()}</span>
                    <span className="text-xs font-black text-slate-600 uppercase tracking-widest">KREDIT</span>
                 </div>
                 <div className="text-2xl font-black text-indigo-400">{formatPrice(pkg.price)}</div>
              </div>
              <div className="space-y-4 mb-10 flex-1">
                 <div className="space-y-3">
                   <div className="flex items-center gap-3"><CheckCircle2 size={14} className="text-emerald-500" /><span className="text-[11px] font-bold text-slate-400">Semua Fitur Magic</span></div>
                   <div className="flex items-center gap-3"><CheckCircle2 size={14} className="text-emerald-500" /><span className="text-[11px] font-bold text-slate-400">Masa Aktif Selamanya</span></div>
                 </div>
              </div>
              <a href={pkg.url} target="_blank" className={`w-full py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl ${pkg.popular ? 'magix-gradient text-white' : 'bg-white text-slate-950 hover:bg-slate-200'}`}>
                 BELI PAKET <ExternalLink size={16} />
              </a>
           </div>
         ))}
      </div>

      {/* ACTIVATION HUB */}
      <div id="activation-hub" className="bg-slate-900 border-2 border-indigo-500/30 rounded-[4rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-full h-full aura-effect opacity-5 pointer-events-none" />
         
         <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            <div className="lg:w-1/2 space-y-10">
               <div>
                  <h3 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-4 leading-tight">
                    Pusat Aktivasi <br/> <span className="text-indigo-400">Satu Pintu.</span>
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed italic">
                    Sistem kami secara otomatis mengenali <b>Order ID Lynk.id</b> atau <b>Kode Voucher</b> Anda.
                  </p>
               </div>

               <div className="space-y-6">
                  <div className="flex gap-5 items-start">
                     <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shrink-0">1</div>
                     <div className="flex-1">
                        <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">Cek Email Dari Lynk.id</h4>
                        <p className="text-[11px] text-slate-500 font-medium mb-3">Setelah beli, cek email konfirmasi pembayaran untuk mendapatkan Order ID.</p>
                        <button 
                           onClick={() => setShowEmailGuide(!showEmailGuide)}
                           className="flex items-center gap-2 text-[9px] font-black text-indigo-400 uppercase tracking-widest hover:text-white transition-colors"
                        >
                           <Mail size={12} /> {showEmailGuide ? 'Sembunyikan Contoh' : 'Lihat Dimana Order ID-nya?'}
                        </button>
                     </div>
                  </div>
                  
                  {showEmailGuide && (
                    <div className="ml-15 bg-slate-950 border border-indigo-500/30 rounded-2xl p-6 animate-in slide-in-from-top-4 duration-500 relative">
                       <div className="absolute -top-2 left-6 w-4 h-4 bg-slate-950 border-t border-l border-indigo-500/30 rotate-45" />
                       <p className="text-[10px] font-black text-slate-400 uppercase mb-4 flex items-center gap-2"><Info size={12}/> Contoh Email Lynk.id</p>
                       <div className="space-y-2 opacity-60">
                          <div className="h-2 w-1/2 bg-slate-800 rounded" />
                          <div className="h-2 w-3/4 bg-slate-800 rounded" />
                          <div className="py-3 px-4 bg-indigo-500/10 border border-dashed border-indigo-500/40 rounded-lg">
                             <p className="text-[9px] font-mono text-indigo-300">Order ID: <span className="bg-indigo-500 text-white px-2 py-0.5 rounded font-black">LYNK-12345-67890</span></p>
                          </div>
                          <div className="h-2 w-1/3 bg-slate-800 rounded" />
                       </div>
                       <div className="mt-4 flex items-center gap-2">
                          <MousePointer2 size={12} className="text-indigo-400 animate-bounce" />
                          <p className="text-[9px] font-bold text-indigo-400 uppercase">Salin Kode Yang Diawali "LYNK-"</p>
                       </div>
                    </div>
                  )}

                  <div className="flex gap-5 items-start">
                     <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shrink-0">2</div>
                     <div>
                        <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">Tempel & Aktifkan</h4>
                        <p className="text-[11px] text-slate-500 font-medium">Tempel ID tersebut di kolom sebelah kanan untuk top-up instan.</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="lg:w-1/2 w-full">
               <div className={`bg-slate-950 border-2 ${status === 'error' ? 'border-rose-500/50' : 'border-slate-800'} rounded-[3rem] p-8 md:p-12 shadow-2xl relative group transition-all`}>
                  <div className="text-center mb-10">
                     <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl ${status === 'processing' ? 'bg-indigo-500 animate-spin text-white' : 'bg-indigo-600 text-white'}`}>
                        {status === 'processing' ? <Loader2 size={32} /> : <Gift size={32} />}
                     </div>
                     <h4 className="text-xl font-black text-white uppercase italic tracking-widest">Magic Activation Box</h4>
                     <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em] mt-2">Paste Order ID or Voucher Code Here</p>
                  </div>

                  <div className="space-y-6 relative z-10">
                     <div className="relative">
                        <input 
                           type="text" 
                           value={magicInput}
                           onChange={(e) => setMagicInput(e.target.value.toUpperCase())}
                           placeholder="LYNK-XXX-XXX atau MAGIX-XXX"
                           className={`w-full bg-slate-900 border ${status === 'error' ? 'border-rose-500' : 'border-slate-800'} rounded-2xl p-6 text-center text-white font-mono font-black tracking-[0.2em] outline-none focus:border-indigo-500 transition-all placeholder:tracking-normal placeholder:font-medium shadow-inner uppercase`}
                        />
                        {magicInput.startsWith('LYNK-') && (
                           <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[8px] font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-lg animate-bounce">
                              <ShieldCheck size={10} /> LYNK.ID ORDER DETECTED
                           </div>
                        )}
                     </div>

                     {errorMsg && (
                        <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl flex items-start gap-3 animate-in slide-in-from-top-2">
                           <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={16} />
                           <p className="text-[10px] text-rose-200 font-bold uppercase tracking-widest leading-relaxed">{errorMsg}</p>
                        </div>
                     )}

                     <button 
                        onClick={handleActivation}
                        disabled={!magicInput || status === 'processing'}
                        className="w-full py-6 bg-white text-slate-950 rounded-[2rem] font-black text-xs md:text-sm uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                     >
                        {status === 'processing' ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} className="text-indigo-600" />}
                        {status === 'processing' ? 'MEMVERIFIKASI...' : 'AKTIVASI KREDIT SEKARANG'}
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default PricingView;
