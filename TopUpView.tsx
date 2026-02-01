
import React, { useState } from 'react';
import { 
  Zap, Check, ShoppingCart, Calculator, ArrowRight, Sparkles, 
  Info, ShieldCheck, Star, Gem, TrendingUp, Loader2, QrCode
} from 'lucide-react';

interface TopUpViewProps {
  onPaymentSuccess: (id: string, isLifetime: boolean, credits: number, price: number) => void;
}

const CREDIT_PACKS = [
  { 
    id: 'pack_nano', 
    name: 'Saku Hemat', 
    price: 15000, 
    credits: 25, 
    desc: 'Untuk satu kali coba fitur premium.',
    color: 'border-slate-800',
    icon: Zap,
    usage: [
      { feature: 'Magic Studio', count: '1x Render' },
      { feature: 'Riset Keyword', count: '10x Analisis' }
    ]
  },
  { 
    id: 'pack_lite', 
    name: 'Eceran Pro', 
    price: 49000, 
    credits: 100, 
    desc: 'Paling pas untuk seller pemula.',
    color: 'border-indigo-500/30',
    icon: Star,
    popular: true,
    usage: [
      { feature: 'Magic Studio', count: '6x Render' },
      { feature: 'Copywriter AI', count: '50x Generate' },
      { feature: 'Magic Carousel', count: '4x Konten' }
    ]
  },
  { 
    id: 'pack_medium', 
    name: 'Modal Jualan', 
    price: 99000, 
    credits: 250, 
    desc: 'Optimasi satu toko penuh.',
    color: 'border-emerald-500/30',
    icon: TrendingUp,
    usage: [
      { feature: 'Magic Studio', count: '16x Render' },
      { feature: 'Magic Carousel', count: '10x Konten' },
      { feature: 'Marketplace Sync', count: '5x Sync' }
    ]
  },
  { 
    id: 'pack_mega', 
    name: 'Grosir Sultan', 
    price: 199000, 
    credits: 600, 
    desc: 'Harga per kredit termurah.',
    color: 'border-amber-500/30',
    icon: Gem,
    usage: [
      { feature: 'Magic Studio', count: '40x Render' },
      { feature: 'Marketplace Sync', count: '12x Sync' },
      { feature: 'Semua Fitur', count: 'Tanpa Batas' }
    ]
  }
];

const TopUpView: React.FC<TopUpViewProps> = ({ onPaymentSuccess }) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);

  const handlePurchase = (pack: any) => {
    setLoadingId(pack.id);
    // Simulasi integrasi payment gateway
    setTimeout(() => {
      setShowQR(true);
      setTimeout(() => {
        onPaymentSuccess(pack.id, false, pack.credits, pack.price);
        setLoadingId(null);
        setShowQR(false);
      }, 3000);
    }, 1000);
  };

  const formatPrice = (p: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 relative overflow-hidden">
      {showQR && (
        <div className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4">
           <div className="bg-white p-10 rounded-[3rem] text-center shadow-2xl animate-in zoom-in-95 duration-300">
              <QrCode size={200} className="text-slate-950 mx-auto mb-6" />
              <h3 className="text-2xl font-black text-slate-950 uppercase italic tracking-tighter mb-2">Scan & Bayar</h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest animate-pulse">Menunggu Pembayaran...</p>
           </div>
        </div>
      )}

      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-4">
           <Calculator className="text-indigo-400" size={16} />
           <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Pusat Kredit Eceran</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
          Beli Kredit <br />
          <span className="magix-text-gradient">Sesuai Kebutuhan.</span>
        </h2>
        <p className="text-slate-500 font-medium max-w-xl mx-auto italic leading-relaxed">
          Tidak perlu berlangganan bulanan. Beli paket kecil saat butuh, kredit tidak akan pernah hangus.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {CREDIT_PACKS.map((pack) => (
          <div key={pack.id} className={`bg-slate-900 border-2 rounded-[2.5rem] p-8 flex flex-col transition-all hover:scale-[1.02] relative group ${pack.color} ${pack.popular ? 'ring-2 ring-indigo-500/20' : ''}`}>
            {pack.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Paling Laris</div>
            )}
            
            <div className="mb-8">
               <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                  <pack.icon size={24} className="text-indigo-400 group-hover:text-white" />
               </div>
               <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1">{pack.name}</h3>
               <p className="text-[10px] text-slate-500 font-medium">{pack.desc}</p>
            </div>

            <div className="mb-8">
               <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">{pack.credits}</span>
                  <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Kredit</span>
               </div>
               <div className="text-xl font-black text-indigo-400 mt-1">{formatPrice(pack.price)}</div>
            </div>

            <div className="space-y-4 mb-10 flex-1">
               <p className="text-[8px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-slate-800 pb-2">Nilai Perkiraan:</p>
               {pack.usage.map((u, i) => (
                 <div key={i} className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-slate-400">{u.feature}</span>
                    <span className="text-white bg-slate-800 px-2 py-0.5 rounded-lg">{u.count}</span>
                 </div>
               ))}
            </div>

            <button 
              onClick={() => handlePurchase(pack)}
              disabled={!!loadingId}
              className="w-full py-4 bg-slate-800 group-hover:bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loadingId === pack.id ? <Loader2 size={14} className="animate-spin" /> : <ShoppingCart size={14} />}
              {loadingId === pack.id ? 'Processing...' : 'Beli Eceran'}
            </button>
          </div>
        ))}
      </div>

      {/* Rincian Eceran per Klik */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[100px] rounded-full" />
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
               <h3 className="text-2xl md:text-3xl font-black text-white italic mb-6">Hitungan Biaya Per Render</h3>
               <p className="text-slate-400 font-medium mb-10 leading-relaxed">
                  Kami menerapkan sistem "Pay-as-you-go". Kredit hanya terpotong saat Anda mendapatkan hasil. Berikut adalah biaya eceran untuk setiap fitur:
               </p>
               
               <div className="space-y-4">
                  {[
                    { name: 'Magic Studio (Foto Katalog HD)', cost: '15 Cr', estimate: 'Rp 7.500*' },
                    { name: 'SEO Title & Deskripsi (AI)', cost: '1 Cr', estimate: 'Rp 500*' },
                    { name: 'Magic Carousel (4 Slide)', cost: '25 Cr', estimate: 'Rp 12.500*' },
                    { name: 'Riset Keyword (Trending)', cost: '1 Cr', estimate: 'Rp 500*' },
                    { name: 'Auto-Sync Marketplace', cost: '50 Cr', estimate: 'Rp 25.000*' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                       <div className="flex items-center gap-3">
                          <Check size={14} className="text-emerald-500" />
                          <span className="text-xs font-black text-white uppercase">{item.name}</span>
                       </div>
                       <div className="flex items-center gap-4">
                          <span className="text-[10px] font-black text-indigo-400 uppercase">{item.cost}</span>
                          <span className="text-[8px] font-bold text-slate-600">Estimasi {item.estimate}</span>
                       </div>
                    </div>
                  ))}
               </div>
               <p className="text-[9px] text-slate-600 mt-6 italic">*Estimasi berdasarkan harga paket Eceran Pro (100 Cr / 49rb).</p>
            </div>

            <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 aura-effect opacity-20" />
               <Sparkles size={40} className="mb-6 opacity-40 group-hover:scale-110 transition-transform" />
               <h4 className="text-2xl font-black mb-4 italic">Kenapa Eceran Lebih Untung?</h4>
               <ul className="space-y-4 mb-10">
                  <li className="flex gap-4">
                     <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 text-[10px] font-black">1</div>
                     <p className="text-sm font-medium">Bebas komitmen biaya bulanan yang memberatkan.</p>
                  </li>
                  <li className="flex gap-4">
                     <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 text-[10px] font-black">2</div>
                     <p className="text-sm font-medium">Kredit tidak ada masa kadaluarsa (Lifetime).</p>
                  </li>
                  <li className="flex gap-4">
                     <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 text-[10px] font-black">3</div>
                     <p className="text-sm font-medium">Tingkatkan stok kredit hanya saat ada produk baru.</p>
                  </li>
               </ul>
               <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-xl"><ShieldCheck size={24} /></div>
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest">Transaksi Aman</p>
                     <p className="text-[9px] opacity-60">Enkripsi 256-bit Secure Gateway</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default TopUpView;
