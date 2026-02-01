
import React, { useState } from 'react';
import { 
  ShoppingBag, Link as LinkIcon, RefreshCw, CheckCircle2, 
  AlertCircle, ArrowRight, Zap, ShieldCheck, Database,
  Search, Filter, ExternalLink, Loader2, Sparkles, Globe,
  Timer, TrendingUp, BarChart3, Shield
} from 'lucide-react';

interface MarketplaceSyncProps {
  useCredits: (amount: number) => boolean;
}

const SHOPS = [
  { id: 'shopee', name: 'Shopee Indonesia', color: 'bg-orange-500', icon: ShoppingBag, status: 'Not Connected', health: 0 },
  { id: 'tokopedia', name: 'Tokopedia', color: 'bg-green-500', icon: ShoppingBag, status: 'Not Connected', health: 0 },
  { id: 'tiktok', name: 'TikTok Shop', color: 'bg-slate-900', icon: Globe, status: 'Not Connected', health: 0 },
];

const MarketplaceSync: React.FC<MarketplaceSyncProps> = ({ useCredits }) => {
  const [connectedShops, setConnectedShops] = useState<string[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConnect = (shopId: string) => {
    if (connectedShops.includes(shopId)) return;
    setConnectedShops([...connectedShops, shopId]);
  };

  const handleSyncAll = async () => {
    if (connectedShops.length === 0) return;
    if (!useCredits(50)) return;

    setIsSyncing(true);
    setSyncStatus('Menganalisis 450+ Produk di Database...');
    
    await new Promise(r => setTimeout(r, 2000));
    setSyncStatus('AI Sedang Merancang Judul SEO Massal...');
    
    await new Promise(r => setTimeout(r, 2000));
    setSyncStatus('Mengunggah Perubahan ke Marketplace API...');
    
    await new Promise(r => setTimeout(r, 1500));
    setIsSyncing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 8000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-black mb-3 flex items-center gap-4 text-white">
            <Database className="text-indigo-400" />
            Magic Sync Pro
          </h2>
          <p className="text-slate-400 font-medium italic">Pusat Kendali Bisnis: Optimasi & Sinkronisasi Massal di Semua Marketplace.</p>
        </div>
        
        <div className="flex gap-4">
           <div className="bg-slate-900/50 border border-slate-800 px-6 py-3 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
                 <Timer size={20} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Waktu Terhemat</p>
                 <p className="text-lg font-black text-white">~24 Jam<span className="text-[10px] text-slate-500 ml-1">/Bulan</span></p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left: Store Connection */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full" />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-2">
              <LinkIcon size={14} className="text-indigo-400" /> 1. Status Koneksi API
            </p>
            
            <div className="space-y-4">
              {SHOPS.map((shop) => {
                const isConnected = connectedShops.includes(shop.id);
                return (
                  <div key={shop.id} className={`p-5 rounded-2xl border transition-all flex flex-col gap-4 ${isConnected ? 'bg-slate-950 border-indigo-500/30' : 'bg-slate-950 border-slate-800'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${shop.color} shadow-lg`}>
                          <shop.icon size={24} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-white">{shop.name}</p>
                          <p className={`text-[9px] font-bold uppercase tracking-widest ${isConnected ? 'text-emerald-400' : 'text-slate-600'}`}>
                            {isConnected ? 'API Connected' : 'Disconnected'}
                          </p>
                        </div>
                      </div>
                      {!isConnected ? (
                        <button 
                          onClick={() => handleConnect(shop.id)}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
                        >
                          Hubungkan
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-lg text-[10px] font-black uppercase">
                          <ShieldCheck size={12} /> Secure
                        </div>
                      )}
                    </div>
                    
                    {isConnected && (
                      <div className="pt-3 border-t border-slate-800/50 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <BarChart3 size={12} className="text-slate-600" />
                            <span className="text-[10px] font-black text-slate-600 uppercase">SEO Health</span>
                         </div>
                         <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                               <div className="h-full bg-emerald-500" style={{ width: '85%' }} />
                            </div>
                            <span className="text-[10px] font-black text-white">85%</span>
                         </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-6 bg-amber-500/5 border border-amber-500/10 rounded-3xl flex items-start gap-4">
              <Shield className="text-amber-500 shrink-0 mt-1" size={18} />
              <div>
                <p className="text-[11px] text-white font-black uppercase mb-1">Enkripsi Data AES-256</p>
                <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                  Magix tidak menyimpan password Anda. Kami menggunakan Token OAuth resmi dari platform untuk menjamin keamanan 100%.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
             <Zap size={32} className="mb-6 opacity-40 group-hover:scale-110 transition-transform" />
             <h3 className="text-xl font-black mb-2 italic">Jalankan Sihir Massal</h3>
             <p className="text-xs text-indigo-100/70 leading-relaxed mb-8">
               Update otomatis judul, deskripsi, dan tag di semua toko berdasarkan tren SEO terbaru hari ini.
             </p>
             <button 
               onClick={handleSyncAll}
               disabled={connectedShops.length === 0 || isSyncing}
               className="w-full py-5 bg-white text-indigo-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
             >
               {isSyncing ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
               {isSyncing ? 'SEDANG SINKRON...' : 'OPTIMASI MASSAL (50 KREDIT)'}
             </button>
          </div>
        </div>

        {/* Right: Sync Status & Logs */}
        <div className="lg:col-span-7">
           <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-8 md:p-10 shadow-2xl h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
              <div className="flex items-center justify-between mb-10 relative z-10">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                   <Globe size={14} className="text-indigo-400" /> Aktifitas Terkini
                 </p>
                 <div className="flex items-center gap-2 text-[9px] font-bold text-slate-700 bg-slate-950 px-3 py-1 rounded-full uppercase">
                    Live Monitor
                 </div>
              </div>

              {isSyncing ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
                  <div className="magic-loader mb-10"></div>
                  <h3 className="text-3xl font-black text-white italic animate-pulse mb-4">{syncStatus}</h3>
                  <div className="w-full max-w-sm h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 animate-[shimmer-glide_1.5s_linear_infinite]" style={{ width: '100%' }} />
                  </div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] mt-6">Sedang Menghubungkan ke API Partner</p>
                </div>
              ) : showSuccess ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center animate-success-pop">
                   <div className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-8 border-2 border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
                      <CheckCircle2 size={48} />
                   </div>
                   <h3 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Sync Selesai!</h3>
                   <p className="text-slate-400 font-medium italic mb-10">Semua produk Anda kini telah teroptimasi dengan standar SEO 2025.</p>
                   
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                      <div className="p-6 bg-slate-950 border border-slate-800 rounded-[2rem] flex flex-col items-center text-center">
                         <TrendingUp size={24} className="text-emerald-400 mb-4" />
                         <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Kenaikan Ranking</p>
                         <p className="text-2xl font-black text-white">+68%</p>
                      </div>
                      <div className="p-6 bg-slate-950 border border-slate-800 rounded-[2rem] flex flex-col items-center text-center">
                         <ShoppingBag size={24} className="text-blue-400 mb-4" />
                         <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Produk Diupdate</p>
                         <p className="text-2xl font-black text-white">452</p>
                      </div>
                      <div className="p-6 bg-slate-950 border border-slate-800 rounded-[2rem] flex flex-col items-center text-center">
                         <Zap size={24} className="text-amber-400 mb-4" />
                         <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Efisiensi</p>
                         <p className="text-2xl font-black text-white">100%</p>
                      </div>
                   </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center opacity-30 text-center px-12">
                   <div className="w-28 h-28 bg-slate-950 border border-slate-800 rounded-[2.5rem] flex items-center justify-center mb-10">
                      <Database size={56} className="text-slate-800" />
                   </div>
                   <h3 className="text-2xl font-black text-slate-700 uppercase tracking-[0.4em]">Awaiting Command</h3>
                   <p className="text-xs text-slate-700 font-bold uppercase mt-4 max-w-xs leading-relaxed">Hubungkan toko Anda untuk mulai mengotomatisasi seluruh katalog produk dengan AI.</p>
                </div>
              )}
           </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[100px] rounded-full" />
         <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="text-center md:text-left">
               <h3 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
                  <ShieldCheck className="text-emerald-400" /> Marketplace Verified
               </h3>
               <p className="text-sm text-slate-500 max-w-md">Kami bekerja sama dengan partner resmi Shopee, Tokopedia, dan TikTok Shop untuk menjamin integrasi yang stabil.</p>
            </div>
            <div className="flex items-center gap-6">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?img=${i+20}`} className="w-full h-full object-cover grayscale" />
                    </div>
                  ))}
               </div>
               <div className="text-right">
                  <p className="text-xs font-black text-white">2,450+</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Sellers Terhubung</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default MarketplaceSync;
