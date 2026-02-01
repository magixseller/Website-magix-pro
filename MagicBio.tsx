
import React, { useState } from 'react';
import { 
  Smile, UserPlus, Send, Copy, Check, Loader2, Sparkles, 
  Instagram, Facebook, Smartphone, ShoppingBag, Globe, Zap,
  Store, User, MessageCircle, MoreHorizontal, Camera, Eye, Star, Info
} from 'lucide-react';
import { generateBio } from '../services/geminiService';

const PLATFORMS = [
  { id: 'Instagram', icon: Instagram, color: 'text-pink-500', bgColor: 'bg-pink-500/10' },
  { id: 'TikTok', icon: Smartphone, color: 'text-slate-200', bgColor: 'bg-slate-200/10' },
  { id: 'Shopee', icon: ShoppingBag, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
  { id: 'Tokopedia', icon: ShoppingBag, color: 'text-green-500', bgColor: 'bg-green-500/10' },
];

const TONES = [
  { id: 'Professional', label: 'Profesional & Terpercaya' },
  { id: 'Casual', label: 'Santai & Akrab' },
  { id: 'Urgency', label: 'Fokus Promo / Diskon' },
  { id: 'Aesthetic', label: 'Elegan & Aesthetic' },
];

const MagicBio: React.FC = () => {
  const [businessName, setBusinessName] = useState('');
  const [productType, setProductType] = useState('');
  const [target, setTarget] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState(PLATFORMS[0].id);
  const [selectedTone, setSelectedTone] = useState(TONES[0].id);
  
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!businessName || !productType) {
      alert('Nama Toko dan Jenis Produk wajib diisi!');
      return;
    }
    setLoading(true);
    try {
      const data = await generateBio(businessName, productType, target, selectedTone, selectedPlatform);
      setOptions(data.options || []);
    } catch (error) {
      console.error(error);
      alert('Gagal membuat bio. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const currentPlatformInfo = PLATFORMS.find(p => p.id === selectedPlatform);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h2 className="text-3xl md:text-5xl font-black mb-3 flex items-center justify-center md:justify-start gap-4 text-white">
            <Store className="text-pink-400" />
            Magic Bio Toko
          </h2>
          <p className="text-sm md:text-lg text-slate-400 font-medium max-w-xl italic">
            Ciptakan kesan pertama yang menjual. Rancang bio profil toko marketplace dan sosial media secara otomatis.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Configuration Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 blur-3xl rounded-full" />
            
            <div className="flex items-center justify-between relative z-10">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Zap size={14} className="text-pink-400" /> Identitas Toko
              </p>
              <div className="group relative">
                <Info size={14} className="text-slate-600 cursor-help" />
                <div className="absolute bottom-full right-0 mb-2 w-56 p-3 bg-slate-800 text-[9px] text-slate-300 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 border border-slate-700 shadow-2xl leading-relaxed">
                  Informasi ini akan digunakan AI untuk menyusun nilai unik (USP) toko Anda agar terlihat lebih menonjol dibanding kompetitor.
                </div>
              </div>
            </div>

            <div className="space-y-6 relative z-10">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block ml-1">Nama Toko / Brand</label>
                <input 
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Contoh: HijabStyle Official, TechZone ID"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-white focus:ring-1 focus:ring-pink-500 outline-none transition-all placeholder:text-slate-800"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block ml-1">Jenis Produk Utama</label>
                <input 
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  placeholder="Contoh: Fashion Muslim Wanita, Aksesoris Gadget"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-white focus:ring-1 focus:ring-pink-500 outline-none transition-all placeholder:text-slate-800"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block ml-1">Target Pembeli (Opsional)</label>
                <input 
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder="Contoh: Mahasiswi, Pecinta Gaming, Ibu Muda"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-white focus:ring-1 focus:ring-pink-500 outline-none transition-all placeholder:text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase block ml-1">Platform Tujuan</label>
                </div>
                <select 
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-white outline-none focus:ring-1 focus:ring-pink-500 appearance-none cursor-pointer"
                >
                  {PLATFORMS.map(p => <option key={p.id} value={p.id}>{p.id}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block ml-1">Gaya Bahasa</label>
                <select 
                  value={selectedTone}
                  onChange={(e) => setSelectedTone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-white outline-none focus:ring-1 focus:ring-pink-500 appearance-none cursor-pointer"
                >
                  {TONES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-4 magix-gradient rounded-2xl font-black text-lg text-white shadow-xl shadow-pink-500/20 flex items-center justify-center gap-4 disabled:opacity-50 hover:scale-[1.02] active:scale-95 transition-all relative z-10 group"
            >
              {loading ? <Loader2 size={24} className="animate-spin" /> : <Sparkles size={24} />}
              {loading ? 'MERANCANG BIO...' : 'SULAP BIO TOKO'}
            </button>
          </div>
        </div>

        {/* Right: Results Display with Mock-up */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-8 md:p-12 min-h-[600px] flex flex-col shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-pink-500/5 via-transparent to-transparent pointer-events-none" />
            
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-10 relative z-10 flex items-center gap-2">
              <Eye size={14} className="text-pink-400" /> Preview Bio Profil Toko
            </p>

            {!options.length && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center opacity-30 text-center relative z-10">
                <div className="w-24 h-24 bg-slate-950 border border-slate-800 rounded-full flex items-center justify-center mb-8">
                  <User size={48} className="text-slate-700" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-[0.3em] text-slate-700">Bio Preview Studio</h3>
              </div>
            )}

            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center gap-8 relative z-10">
                <div className="relative">
                   <div className="w-24 h-24 border-4 border-pink-500/10 border-t-pink-500 rounded-full animate-spin"></div>
                   <Store size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-400" />
                </div>
                <div className="text-center">
                  <h3 className="text-white font-black text-3xl animate-pulse italic tracking-tight">Merangkai Branding...</h3>
                  <p className="text-pink-400 text-[10px] uppercase font-bold tracking-[0.5em] mt-3">Menganalisis USP & Psikologi Pembeli</p>
                </div>
              </div>
            )}

            <div className="space-y-12 relative z-10">
              {options.map((opt, i) => (
                <div key={i} className="animate-in slide-in-from-bottom-10 duration-700" style={{ animationDelay: `${i * 200}ms` }}>
                  <div className="bg-slate-950 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl group/card">
                     <div className="p-8 pb-4">
                        <div className="flex items-center justify-between mb-8">
                           <div className="flex items-center gap-5">
                              <div className="w-20 h-20 rounded-full bg-slate-900 border-2 border-slate-800 flex items-center justify-center relative">
                                 <Store size={32} className="text-slate-700" />
                                 <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 rounded-full border-4 border-slate-950 flex items-center justify-center">
                                    <Check size={10} className="text-white font-black" />
                                 </div>
                              </div>
                              <div>
                                 <h4 className="text-xl font-black text-white truncate max-w-[200px]">{businessName || 'Nama Toko Anda'}</h4>
                                 <div className="flex items-center gap-3 mt-1 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                    <span className="flex items-center gap-1"><UserPlus size={10} /> 12.5k Followers</span>
                                    <span className="flex items-center gap-1"><Star size={10} className="text-amber-400 fill-amber-400" /> 4.9 Rating</span>
                                 </div>
                              </div>
                           </div>
                           <div className={`p-4 rounded-2xl ${currentPlatformInfo?.bgColor} ${currentPlatformInfo?.color}`}>
                              {currentPlatformInfo && <currentPlatformInfo.icon size={24} />}
                           </div>
                        </div>

                        <div className="relative p-6 bg-slate-900/40 rounded-3xl border border-slate-800/50 mb-6">
                           <p className="text-base md:text-lg text-slate-200 leading-relaxed font-medium whitespace-pre-line">
                              {opt}
                           </p>
                           <button 
                             onClick={() => copyToClipboard(opt, i)}
                             className="absolute top-4 right-4 p-3 bg-white text-slate-950 rounded-xl shadow-xl transition-all hover:scale-110 active:scale-90"
                           >
                             {copiedIndex === i ? <Check size={20} className="text-emerald-600" /> : <Copy size={20} />}
                           </button>
                        </div>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagicBio;
