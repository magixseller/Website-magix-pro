
import React from 'react';
import { Sparkles, Timer, Rocket, Shield, PenTool, Instagram, MessageSquareText, Languages, Headphones, FileDown, Scissors, Lock, Database, Globe, Beaker, Zap } from 'lucide-react';
import { AppView } from '../types';

interface MagicFeaturePlaceholderProps {
  view: AppView;
}

const MagicFeaturePlaceholder: React.FC<MagicFeaturePlaceholderProps> = ({ view }) => {
  const getFeatureDetails = () => {
    switch (view) {
      case AppView.WATERMARK: return { title: 'Magic Watermark', icon: Shield, desc: 'Lindungi foto produk orisinal Anda dari pencurian kompetitor dengan watermark AI yang tidak merusak estetika.' };
      case AppView.BG_REMOVER: return { title: 'Magic BG Remover', icon: Scissors, desc: 'Hapus latar belakang foto produk sekompleks apapun hanya dalam 1 detik dengan akurasi pixel-perfect.' };
      case AppView.LOGO_MAKER: return { title: 'Magic Logo Maker', icon: PenTool, desc: 'Ciptakan identitas brand yang mewah dan profesional hanya dengan mendeskripsikan visi bisnis Anda.' };
      case AppView.STORY: return { title: 'Magic Story AI', icon: Instagram, desc: 'Otomasi konten story harian yang memicu interaksi tinggi dan konversi penjualan langsung di Instagram.' };
      case AppView.CS_SCRIPT: return { title: 'Magic Skrip CS', icon: Headphones, desc: 'Naskah closing paling persuasif untuk admin CS Anda guna menangani komplain dan meledakkan omset harian.' };
      case AppView.GLOBAL: return { title: 'Global Expansion', icon: Languages, desc: 'Ekspansi produk Anda ke pasar internasional dengan optimasi SEO multibahasa dan sinkronisasi logistik global.' };
      case AppView.CATALOG_PDF: return { title: 'Magic Katalog PDF', icon: FileDown, desc: 'Generate katalog produk profesional yang elegan dalam format PDF untuk dikirim langsung ke pembeli grosir.' };
      default: return { title: 'Magic Feature', icon: Sparkles, desc: 'Fitur masa depan yang dirancang khusus untuk melipatgandakan efisiensi jualan Anda.' };
    }
  };

  const details = getFeatureDetails();
  const Icon = details.icon;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-700 min-h-[80vh] relative overflow-hidden">
      {/* Background Magic Aura */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="aura-effect opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-fuchsia-600/10 blur-[150px] animate-float" />
      </div>

      <div className="relative mb-12 group">
        {/* Animated Scanner Visual */}
        <div className="relative w-56 h-56 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-[4rem] flex items-center justify-center text-indigo-400 shadow-[0_0_80px_rgba(99,102,241,0.2)] overflow-hidden group-hover:scale-105 transition-transform duration-700">
          <div className="absolute inset-0 soon-scanline opacity-60" />
          <Icon size={96} className="relative z-10 animate-float" />
          
          <div className="absolute bottom-0 inset-x-0 bg-indigo-600/90 backdrop-blur-md py-3 flex items-center justify-center gap-3 border-t border-white/10">
            <Beaker size={14} className="text-white animate-bounce" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Magix Lab: Under Construction</span>
          </div>
        </div>
        
        {/* Particle Effects */}
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-indigo-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-fuchsia-500/20 rounded-full blur-xl animate-pulse" />
      </div>
      
      <div className="space-y-6 max-w-2xl relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-2">
           <Zap className="text-amber-400 fill-amber-400" size={14} />
           <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Sihir Baru Segera Datang</span>
        </div>

        <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter leading-none">
          {details.title} <br/>
          <span className="magix-text-gradient soon-pulse">Coming Soon!</span>
        </h2>
        
        <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed italic max-w-lg mx-auto">
          {details.desc}
        </p>
      </div>
      
      <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 relative z-10">
        <div className="flex items-center gap-3 px-8 py-4 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl shadow-xl">
          <Timer size={20} className="text-indigo-400" />
          <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Estimasi Rilis: Q2 2025</span>
        </div>
        
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-indigo-500 transition-all active:scale-95"
        >
          <Rocket size={18} /> Kembali ke Dashboard
        </button>
      </div>

      <div className="mt-20 opacity-20 relative z-10">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[1em]">V2.5 LAB INFRASTRUCTURE ACTIVE</p>
      </div>
    </div>
  );
};

export default MagicFeaturePlaceholder;
