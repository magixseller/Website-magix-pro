
import React, { useState, useRef } from 'react';
import { 
  Key, Search, Loader2, TrendingUp, Copy, Check, 
  Upload, Camera, Trash2, Info, Sparkles 
} from 'lucide-react';
import { generateKeywords } from '../services/geminiService';

interface MagicKeywordProps {
  useCredits: (amount: number) => boolean;
}

const MagicKeyword: React.FC<MagicKeywordProps> = ({ useCredits }) => {
  const [image, setImage] = useState<string | null>(null);
  const [product, setProduct] = useState('');
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setKeywords([]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = async () => {
    if (!product) {
      alert('Masukkan kategori atau nama produk terlebih dahulu!');
      return;
    }
    
    if (!useCredits(1)) return;

    setLoading(true);
    setKeywords([]);
    try {
      const data = await generateKeywords(product);
      setKeywords(data);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error(error);
      alert('Gagal mengambil keyword.');
    } finally {
      setLoading(false);
    }
  };

  const copyKeyword = (kw: string, index: number) => {
    navigator.clipboard.writeText(kw);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-black mb-3 flex items-center justify-center md:justify-start gap-4 text-white">
          <Key className="text-amber-400" />
          Magic Keyword
        </h2>
        <p className="text-sm md:text-lg text-slate-400 font-medium max-w-2xl italic">Temukan 20 kata kunci terbaik yang membuat produkmu selalu muncul di halaman pertama marketplace.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-6">
          <div className={`bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 shadow-2xl relative overflow-hidden group transition-all duration-500 ${showSuccess && !loading ? 'ring-2 ring-amber-500/30' : ''}`}>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Camera size={14} className="text-amber-400" /> Foto Produk (Opsional)
            </p>
            
            {!image ? (
              <div onClick={() => fileInputRef.current?.click()} className="w-full aspect-video border-2 border-dashed border-slate-800 hover:border-amber-500/50 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer transition-all bg-slate-950/40 group/upload">
                <Upload size={28} className="text-slate-600 mb-2 group-hover:text-amber-400 transition-transform group-hover:scale-110" />
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Pilih Foto</span>
              </div>
            ) : (
              <div className="relative aspect-video rounded-[2rem] overflow-hidden border-2 border-slate-800 shadow-2xl group/img">
                <img src={image} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button onClick={() => {setImage(null); setKeywords([]);}} className="p-4 bg-red-500 text-white rounded-full hover:scale-110 transition-transform shadow-xl">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            )}
            <input type="file" hidden ref={fileInputRef} onChange={handleFileUpload} accept="image/*" />
          </div>
        </div>

        <div className="lg:col-span-7">
           <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden h-full flex flex-col">
              <div className="relative flex-1 mb-8 z-10">
                <textarea 
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="Masukkan Nama Produk atau Kategori..."
                  className={`w-full h-full bg-slate-950 border border-slate-800 rounded-[2rem] p-8 text-lg md:text-2xl text-white outline-none focus:ring-1 focus:ring-amber-500 transition-all resize-none placeholder:text-slate-800 font-bold leading-relaxed ${showSuccess && !loading ? 'animate-success-pop' : ''}`}
                />
              </div>
              <button 
                onClick={handleSearch}
                disabled={!product || loading}
                className="w-full py-4 magix-gradient rounded-2xl font-black text-lg text-white shadow-xl flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 disabled:opacity-50 relative z-10"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : <TrendingUp size={24} />}
                {loading ? 'ANALISA 20 SEO KEYWORDS...' : 'LIHAT 20 KEYWORDS (1 KREDIT)'}
              </button>
           </div>
        </div>
      </div>

      {keywords.length > 0 && !loading && (
        <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 transition-all duration-700 pb-20`}>
          {keywords.map((kw, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 hover:border-amber-500/40 hover:bg-amber-500/5 transition-all group relative overflow-hidden shadow-lg animate-in fade-in zoom-in-95" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex flex-col gap-3">
                <p className="text-xs font-bold text-white leading-tight group-hover:text-amber-200 transition-colors h-10 line-clamp-2">{kw}</p>
                <button onClick={() => copyKeyword(kw, i)} className="w-full py-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase">
                  {copiedIndex === i ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                  {copiedIndex === i ? 'Disalin' : 'Copy'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MagicKeyword;
