
import React, { useState } from 'react';
import { 
  Sparkles, ArrowRight, Zap, Gift, CheckCircle2, Rocket, 
  ShoppingCart, Layout, TrendingUp, MessageSquareText,
  Gem, ChevronDown, ChevronUp, HelpCircle, ArrowUpRight, MousePointer2,
  ShieldCheck, Star, Clock, DollarSign, Calculator, Layers, Scissors
} from 'lucide-react';
import { AppView, UserTier, UserAccount } from '../types';

interface HomeProps {
  onStart: (view: AppView) => void;
  user: UserAccount;
  onActivateFree: () => void;
}

const FAQS = [
  {
    q: "Apakah kredit Magix ada masa kadaluarsanya?",
    a: "Tidak. Kredit yang Anda beli berlaku selamanya (Lifetime). Anda bebas menggunakannya kapan saja tanpa takut hangus."
  },
  {
    q: "Berapa jatah kredit gratis untuk pengguna baru?",
    a: "Setiap pengguna baru berhak mendapatkan 10 Kredit Gratis (Welcome Gift) untuk mencoba fitur-fitur sakti kami seperti Magic Studio dan AI Copywriter."
  },
  {
    q: "Apakah data foto produk saya aman?",
    a: "Sangat aman. Kami menggunakan enkripsi 256-bit dan tidak menyebarkan foto produk Anda ke pihak ketiga. Data Anda adalah milik Anda."
  }
];

const Home: React.FC<HomeProps> = ({ onStart, user, onActivateFree }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const mainFeatures = [
    {
      title: "Magic Studio",
      icon: Sparkles,
      color: "text-indigo-400",
      desc: "Ubah foto produk biasa jadi foto katalog profesional di berbagai latar estetik.",
      view: AppView.STUDIO
    },
    {
      title: "Marketplace Sync",
      icon: TrendingUp,
      color: "text-emerald-400",
      desc: "Sinkronisasi massal katalog di Shopee, Tokopedia, & TikTok Shop dalam 1 klik.",
      view: AppView.MARKETPLACE
    },
    {
      title: "AI Copywriter",
      icon: MessageSquareText,
      color: "text-blue-400",
      desc: "Rancang judul SEO dan deskripsi persuasif otomatis berbasis analisis visual foto.",
      view: AppView.PRODUK
    },
    {
      title: "BG Remover",
      icon: Scissors,
      color: "text-rose-400",
      desc: "Hapus background foto produk apapun secepat kilat dengan akurasi tinggi.",
      view: AppView.BG_REMOVER
    }
  ];

  return (
    <div className="relative overflow-hidden bg-slate-950">
      {/* Background Magical Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-fuchsia-600/10 rounded-full blur-[120px] animate-float" />
        <div className="aura-effect opacity-20" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 md:pt-32 md:pb-32 px-4 text-center overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-8">
           <div className="inline-flex items-center gap-3 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full animate-in fade-in slide-in-from-top-4 duration-700">
              <Sparkles className="text-amber-400 fill-amber-400" size={14} />
              <span className="text-[10px] md:text-xs font-black text-indigo-300 uppercase tracking-widest">Asisten AI Tercanggih Untuk Seller Indonesia</span>
           </div>

           <h1 className="text-4xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase italic text-balance">
              Meledakkan <br />
              <span className="magix-text-gradient">Omset Tokomu.</span>
           </h1>

           <p className="text-sm md:text-xl text-slate-400 font-medium max-w-2xl mx-auto italic leading-relaxed">
             "Bukan sekadar edit foto. Magix adalah ekosistem AI yang merancang seluruh strategi visual jualan Anda mulai dari render studio hingga optimasi marketplace otomatis."
           </p>

           <div className="flex flex-col items-center gap-8 pt-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                 {user.credits === 0 ? (
                    <button 
                      onClick={onActivateFree}
                      className="w-full sm:w-auto px-12 py-6 magix-gradient text-white font-black rounded-3xl shadow-[0_0_50px_rgba(99,102,241,0.4)] hover:scale-[1.05] active:scale-95 transition-all flex flex-col items-center gap-1 uppercase tracking-tighter"
                    >
                      <div className="flex items-center gap-3 text-xl">
                        Klaim 10 Kredit Gratis <Gift size={24} className="animate-bounce" />
                      </div>
                      <span className="text-[9px] opacity-80">Hanya untuk pendaftar baru hari ini!</span>
                    </button>
                 ) : (
                    <button 
                      onClick={() => onStart(AppView.STUDIO)}
                      className="w-full sm:w-auto px-10 py-5 magix-gradient text-white font-black rounded-2xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-tighter text-lg"
                    >
                      Mulai Berjualan <ArrowRight size={20} />
                    </button>
                 )}
                 
                 <button 
                  onClick={() => onStart(AppView.PRICING)}
                  className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white font-black rounded-2xl border border-slate-800 hover:bg-slate-800 transition-all uppercase tracking-tighter flex items-center justify-center gap-2"
                 >
                   <Gem size={18} className="text-amber-400" /> Lihat Paket Premium
                 </button>
              </div>
           </div>
        </div>
      </section>

      {/* ROI Simulation Section */}
      <section className="relative z-10 px-4 py-20 bg-indigo-900/10 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
           <div className="text-center mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400">
                 <Calculator size={14} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Kalkulator Keuntungan Seller</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                Berapa Nilai 15 Kredit <br/> <span className="magix-text-gradient">Untuk Bisnis Anda?</span>
              </h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-2xl group hover:border-indigo-500/30 transition-all">
                 <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                    <Clock size={32} />
                 </div>
                 <h4 className="text-xl font-black text-white mb-2 italic">Hemat Waktu</h4>
                 <p className="text-sm text-slate-500 font-medium">Render foto produk 4K dalam 15 detik. Manual editor butuh 2 jam/foto.</p>
                 <div className="mt-8 pt-8 border-t border-slate-800 w-full">
                    <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Efisiensi: 480x Lebih Cepat</span>
                 </div>
              </div>

              <div className="bg-slate-900 border-2 border-indigo-500/30 rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-2xl group scale-105 relative overflow-hidden">
                 <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[8px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest">Paling Nyata</div>
                 <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-xl shadow-indigo-500/20">
                    <DollarSign size={32} />
                 </div>
                 <h4 className="text-xl font-black text-white mb-2 italic">Hemat Biaya Desain</h4>
                 <p className="text-sm text-slate-400 font-medium">Jasa desain katalog profesional Rp 100rb+. Di Magix cuma Rp 7.500 (15 Cr).</p>
                 <div className="mt-8 pt-8 border-t border-slate-800 w-full">
                    <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">Profit: Hemat Rp 92.500 / Foto</span>
                 </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-2xl group hover:border-indigo-500/30 transition-all">
                 <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                    <TrendingUp size={32} />
                 </div>
                 <h4 className="text-xl font-black text-white mb-2 italic">Naikkan Konversi</h4>
                 <p className="text-sm text-slate-500 font-medium">Visual premium terbukti meningkatkan CTR & Checkout produk hingga 3x lipat.</p>
                 <div className="mt-8 pt-8 border-t border-slate-800 w-full">
                    <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Target: Omset 300% Lebih Tinggi</span>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="relative z-10 px-4 pb-32 pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainFeatures.map((f, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 hover:border-indigo-500/40 transition-all group relative overflow-hidden flex flex-col h-full shadow-xl">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl rounded-full" />
                 <f.icon size={40} className={`${f.color} mb-6 transition-transform group-hover:scale-110 duration-500`} />
                 <h3 className="text-xl font-black text-white mb-3 italic">{f.title}</h3>
                 <p className="text-xs text-slate-500 font-medium leading-relaxed flex-1 mb-8">{f.desc}</p>
                 <button 
                  onClick={() => onStart(f.view)}
                  className="flex items-center gap-2 text-[10px] font-black uppercase text-indigo-400 tracking-widest hover:gap-4 transition-all"
                 >
                   Buka Fitur <ArrowUpRight size={14} />
                 </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 px-4 py-32 bg-slate-900/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                <HelpCircle size={14} className="text-indigo-400" />
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Pertanyaan Umum</span>
             </div>
             <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter">Masih Ragu Dengan <br/> <span className="magix-text-gradient">Kekuatan Magix?</span></h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden transition-all duration-300">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 md:p-8 flex items-center justify-between text-left group"
                >
                  <span className="text-sm md:text-lg font-black text-white italic uppercase tracking-tight pr-4">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="text-indigo-400 shrink-0" /> : <ChevronDown className="text-slate-600 shrink-0 group-hover:text-white transition-colors" />}
                </button>
                {openFaq === i && (
                  <div className="p-8 pt-0 animate-in slide-in-from-top-4 duration-300">
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed italic">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <footer className="relative z-10 px-4 py-16 border-t border-slate-900 text-center">
         <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.8em]">Magix Tool Seller • AI Infrastructure v2.5</p>
      </footer>
    </div>
  );
};

export default Home;
