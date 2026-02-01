
import React, { useState, useRef } from 'react';
import { 
  PackageSearch, Upload, Wand2, Copy, Check, Loader2, 
  ShoppingBag, MessageSquare, Hash, Trash2, Camera, Sparkles,
  Info, Heart, Play, Zap, ChevronDown, Tag, FileText
} from 'lucide-react';
import { analyzeProductImage } from '../services/geminiService';
import { ContentGenerationResult } from '../types';

interface MagicProdukProps {
  useCredits: (amount: number) => boolean;
}

const TONES = [
  { id: 'formal', name: 'Sopan & Profesional', desc: 'Cocok untuk Tokopedia / Mall.' },
  { id: 'casual', name: 'Ramah & Santai', desc: 'Cocok untuk Shopee / Chat.' },
  { id: 'hard_sell', name: 'To The Point', desc: 'Fokus pada fitur & manfaat.' },
  { id: 'hypnotic', name: 'Racun (Persuasif)', desc: 'Gaya bahasa TikTok yang memicu checkout.' },
];

const MagicProduk: React.FC<MagicProdukProps> = ({ useCredits }) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ContentGenerationResult | null>(null);
  const [selectedTone, setSelectedTone] = useState('casual');
  const [copied, setCopied] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!image) return;
    if (!useCredits(1)) return;

    setLoading(true);
    setResult(null);
    try {
      const base64Data = image.split(',')[1];
      const data = await analyzeProductImage(base64Data);
      setResult(data);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error(error);
      alert('Gagal menganalisis produk. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-0 py-4 md:py-10">
      <div className="mb-8 px-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-4xl font-black mb-3 flex items-center gap-3 text-white">
            <PackageSearch className="text-emerald-400" />
            Magic Deskripsi AI
          </h2>
          <p className="text-sm md:text-base text-slate-400 italic">Rancang judul SEO dan deskripsi panjang terstruktur secara otomatis.</p>
        </div>
        <div className="flex items-center gap-3 px-5 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl">
           <Tag size={14} className="text-emerald-400" />
           <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Biaya:</p>
           <span className="text-[10px] font-black text-white px-2 py-0.5 bg-emerald-600 rounded shadow-md">1 KREDIT</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 relative min-h-[300px] flex flex-col shadow-2xl">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">1. Unggah Foto Produk</p>
            {!image ? (
              <div onClick={() => fileInputRef.current?.click()} className="flex-1 border-2 border-dashed border-slate-800 hover:border-emerald-500/50 rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all bg-slate-950/40 group">
                <Camera size={28} className="text-slate-600 group-hover:text-emerald-400 mb-4" />
                <p className="text-slate-500 font-black text-xs uppercase tracking-widest">Klik untuk Upload</p>
              </div>
            ) : (
              <div className="flex-1 relative">
                <img src={image} className="w-full h-auto max-h-[300px] object-contain rounded-3xl shadow-2xl border border-slate-800 mx-auto" />
                <button onClick={() => {setImage(null); setResult(null);}} className="absolute -top-3 -right-3 p-3 bg-red-500 text-white rounded-full shadow-xl transition-all hover:scale-110"><Trash2 size={16} /></button>
              </div>
            )}
            <input type="file" hidden ref={fileInputRef} onChange={handleFileUpload} accept="image/*" />
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">2. Gaya Bahasa</p>
            <div className="grid grid-cols-1 gap-2">
               {TONES.map(t => (
                 <button key={t.id} onClick={() => setSelectedTone(t.id)} className={`p-4 rounded-2xl border text-left transition-all ${selectedTone === t.id ? 'bg-emerald-500/10 border-emerald-500 shadow-lg' : 'bg-slate-800 border-slate-700'}`}>
                   <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-black uppercase ${selectedTone === t.id ? 'text-white' : 'text-slate-500'}`}>{t.name}</span>
                      {selectedTone === t.id && <Zap size={12} className="text-emerald-400" />}
                   </div>
                   <p className="text-[9px] text-slate-500">{t.desc}</p>
                 </button>
               ))}
            </div>
            <button onClick={handleGenerate} disabled={!image || loading} className="w-full py-4 mt-6 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-black text-white shadow-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50">
              {loading ? <Loader2 className="animate-spin" /> : <Wand2 />}
              {loading ? 'AI SEDANG MENULIS...' : 'BUAT DESKRIPSI (1 KREDIT)'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-8 md:p-10 min-h-[600px] relative shadow-2xl overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
            
            <div className="flex items-center justify-between mb-8 relative z-10">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                 <FileText size={14} className="text-emerald-400" /> Hasil Analisis Visual
               </p>
               {result && (
                 <span className="text-[9px] font-black text-emerald-400 bg-emerald-400/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-widest">Long Structure Active</span>
               )}
            </div>

            {!result && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-12 opacity-30">
                <PackageSearch size={80} className="mb-8 text-slate-700" />
                <p className="text-sm font-black uppercase tracking-[0.3em] text-slate-700">Awaiting Analysis</p>
              </div>
            )}

            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center gap-8 relative z-10">
                <div className="magic-loader"></div>
                <div className="text-center">
                   <h3 className="text-white font-black text-3xl animate-pulse italic tracking-tight">Menyusun Naskah Jualan...</h3>
                   <p className="text-emerald-400 text-[10px] uppercase font-bold tracking-[0.5em] mt-3">Membangun Struktur Persuasif</p>
                </div>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="bg-slate-950 border border-emerald-500/30 rounded-3xl p-6 relative group shimmer-effect">
                  <span className="text-[9px] font-black text-emerald-400 uppercase mb-2 block tracking-widest flex items-center gap-2">
                    <Sparkles size={12} className="animate-pulse" /> Rekomendasi Judul SEO
                  </span>
                  <div className="text-xl md:text-2xl font-black text-white pr-12 leading-tight">{result.title}</div>
                  <button onClick={() => copyToClipboard(result.title, 'title')} className="absolute top-8 right-8 p-3 bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-all active:scale-90">
                    {copied === 'title' ? <Check size={20} className="text-emerald-400" /> : <Copy size={20} />}
                  </button>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-[2.5rem] p-8 md:p-10 relative flex-1 shadow-inner">
                   <span className="text-[9px] font-black text-blue-400 uppercase mb-6 block tracking-widest">Deskripsi Jualan Lengkap</span>
                   <div className="text-sm md:text-base text-slate-300 leading-relaxed font-medium whitespace-pre-line max-h-[450px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-800">
                    {result.description}
                   </div>
                   
                   <div className="mt-8 pt-8 border-t border-slate-800/50 flex flex-col sm:flex-row items-center gap-6">
                      <div className="flex-1">
                         <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-3">Hashtags Strategis</p>
                         <div className="flex flex-wrap gap-2">
                            {result.tags.map(t => <span key={t} className="text-[9px] font-bold text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">#{t}</span>)}
                         </div>
                      </div>
                      <button onClick={() => copyToClipboard(result.description, 'desc')} className="w-full sm:w-auto px-10 py-5 bg-white text-slate-950 font-black text-xs uppercase tracking-widest rounded-2xl shadow-2xl flex items-center justify-center gap-3 hover:bg-emerald-50 active:scale-95 transition-all">
                        {copied === 'desc' ? <Check size={20} className="text-emerald-600" /> : <Copy size={20} />}
                        {copied === 'desc' ? 'BERHASIL DISALIN' : 'SALIN DESKRIPSI FULL'}
                      </button>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagicProduk;
