
import React, { useState, useRef } from 'react';
import { 
  Copy, Loader2, Check, Video, Instagram, 
  Calendar, Target, Sparkles, Play, Lightbulb, 
  ChevronDown, ChevronUp, FileText, Zap, Upload, Image as ImageIcon, Trash2
} from 'lucide-react';
import { generateDailyContentPlan, analyzePhotoForTarget } from '../services/geminiService';

interface MagicKontenProps {
  useCredits: (amount: number) => boolean;
}

const PLATFORMS = [
  { id: 'TikTok', icon: Video, color: 'text-pink-400' },
  { id: 'Instagram Reels', icon: Instagram, color: 'text-fuchsia-400' },
  { id: 'Shopee Video', icon: Play, color: 'text-orange-500' },
  { id: 'Facebook Feed', icon: FileText, color: 'text-blue-500' },
];

const MagicKonten: React.FC<MagicKontenProps> = ({ useCredits }) => {
  const [image, setImage] = useState<string | null>(null);
  const [productInfo, setProductInfo] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState(PLATFORMS[0].id);
  const [targetMarket, setTargetMarket] = useState('');
  const [analyzingPhoto, setAnalyzingPhoto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandedDay, setExpandedDay] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        setImage(base64);
        
        // Analisis Target Market gratis
        setAnalyzingPhoto(true);
        try {
          const analysis = await analyzePhotoForTarget(base64.split(',')[1]);
          setTargetMarket(analysis);
        } catch (error) {
          console.error(error);
        } finally {
          setAnalyzingPhoto(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGeneratePlan = async () => {
    if (!productInfo) {
      alert('Harap isi informasi produk!');
      return;
    }
    
    if (!useCredits(2)) return;

    setLoading(true);
    setResult(null); // Reset result before new generation
    try {
      const data = await generateDailyContentPlan(productInfo, selectedPlatform, targetMarket);
      if (data && data.days && Array.isArray(data.days)) {
        setResult(data);
        setExpandedDay(0);
      } else {
        throw new Error("Invalid response format from AI");
      }
    } catch (error) {
      console.error(error);
      alert('Gagal merancang ide harian. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-0 py-4 md:py-12">
      <div className="mb-10 px-4">
        <h2 className="text-3xl md:text-5xl font-black mb-3 flex items-center gap-4 text-white">
          <Calendar className="text-fuchsia-400" />
          Magic Konten
        </h2>
        <p className="text-sm md:text-lg text-slate-400 font-medium italic">Rencana 7 hari berbasis analisis foto produk & sosmed tujuan.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 mb-12">
        <div className="lg:col-span-5 space-y-6">
           <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 shadow-2xl relative overflow-hidden group">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">1. Unggah Foto Produk</p>
              {!image ? (
                <div onClick={() => fileInputRef.current?.click()} className="w-full aspect-video border-2 border-dashed border-slate-800 hover:border-fuchsia-500/50 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer transition-all bg-slate-950/40 group/upload">
                  <Upload size={28} className="text-slate-600 mb-2 group-hover:text-fuchsia-400" />
                  <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Pilih Foto</span>
                </div>
              ) : (
                <div className="relative aspect-video rounded-[2rem] overflow-hidden border-2 border-slate-800 shadow-2xl">
                  <img src={image} className="w-full h-full object-cover" />
                  <button onClick={() => {setImage(null); setTargetMarket('');}} className="absolute top-4 right-4 p-3 bg-red-500 text-white rounded-xl shadow-xl hover:scale-110"><Trash2 size={16}/></button>
                </div>
              )}
              <input type="file" hidden ref={fileInputRef} onChange={handleFileUpload} accept="image/*" />
           </div>

           <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 shadow-2xl">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">2. Pilih Sosmed Tujuan</p>
              <div className="grid grid-cols-2 gap-3">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlatform(p.id)}
                    className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 text-center ${
                      selectedPlatform === p.id 
                        ? 'bg-fuchsia-600/10 border-fuchsia-500 shadow-lg' 
                        : 'bg-slate-800/40 border-slate-700'
                    }`}
                  >
                    <p.icon size={20} className={selectedPlatform === p.id ? p.color : 'text-slate-500'} />
                    <span className={`text-[10px] font-black uppercase ${selectedPlatform === p.id ? 'text-white' : 'text-slate-400'}`}>{p.id}</span>
                  </button>
                ))}
              </div>
           </div>
        </div>

        <div className="lg:col-span-7">
           <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden h-full flex flex-col">
              <textarea 
                value={productInfo}
                onChange={(e) => setProductInfo(e.target.value)}
                placeholder="Ceritakan produk dan goal Anda (Misal: Jual gamis premium untuk lebaran)..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-3xl p-6 text-sm md:text-lg text-white outline-none mb-8 placeholder:text-slate-800 font-medium leading-relaxed min-h-[200px]"
              />
              
              <button 
                onClick={handleGeneratePlan}
                disabled={!productInfo || loading}
                className="w-full py-4 magix-gradient rounded-2xl font-black text-lg text-white shadow-xl flex items-center justify-center gap-4 disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-95 group relative z-10"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
                {loading ? 'MERANCANG RENCANA...' : 'BUAT JADWAL 7 HARI (2 KREDIT)'}
              </button>
           </div>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 animate-in fade-in">
           <div className="magic-loader mb-6"></div>
           <p className="text-xl font-black italic animate-pulse">Sihir Konten Berjalan...</p>
        </div>
      )}

      {result && !loading && (
        <div className="px-4 pb-40 space-y-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          {result.days.map((item: any, idx: number) => (
            <div key={idx} className={`bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden transition-all duration-300 ${expandedDay === idx ? 'ring-2 ring-fuchsia-500/50 shadow-2xl' : ''}`}>
              <div 
                onClick={() => setExpandedDay(expandedDay === idx ? -1 : idx)}
                className="p-6 md:p-8 flex items-center justify-between cursor-pointer hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 ${expandedDay === idx ? 'bg-fuchsia-500 text-white shadow-lg' : 'bg-slate-800 text-slate-500'}`}>
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-black text-white uppercase tracking-tight">{item.theme}</h4>
                  </div>
                </div>
                {expandedDay === idx ? <ChevronUp size={24} className="text-slate-500" /> : <ChevronDown size={24} className="text-slate-500" />}
              </div>

              {expandedDay === idx && (
                <div className="p-8 pt-0 border-t border-slate-800/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                     <div className="space-y-6">
                        <div className="p-6 bg-slate-950/60 rounded-3xl border border-slate-800 relative">
                            <p className="text-[10px] font-black text-fuchsia-400 uppercase tracking-widest mb-3">Ide Visual / Konten</p>
                            <p className="text-sm text-slate-300 font-medium leading-relaxed">{item.visual}</p>
                        </div>
                     </div>
                     <div className="p-8 bg-slate-950 border border-slate-800 rounded-[2.5rem] relative group">
                        <p className="text-[10px] font-black text-fuchsia-400 uppercase tracking-widest mb-3">Naskah / Caption</p>
                        <div className="text-sm text-slate-400 leading-relaxed whitespace-pre-line mb-8 font-medium">
                          {item.script}
                        </div>
                        <button 
                          onClick={() => copyToClipboard(item.script, idx)}
                          className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3 active:scale-95"
                        >
                          {copiedIndex === idx ? <Check size={18} className="text-green-500" /> : <Zap size={18} className="text-fuchsia-400" />}
                          {copiedIndex === idx ? 'Disalin' : 'Salin Naskah'}
                        </button>
                     </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MagicKonten;
