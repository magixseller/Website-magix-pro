
import React, { useState, useRef } from 'react';
import { 
  Video, Upload, Sparkles, Wand2, Download, Trash2, Loader2, 
  Smartphone, Zap, Info, ShieldCheck, Film, Play, AlertCircle, ExternalLink,
  Key, CreditCard, ChevronRight, X
} from 'lucide-react';
import { generateProductVideo } from '../services/geminiService';

interface MagicVideoProps {
  useCredits: (amount: number) => boolean;
}

const STYLES = [
  { id: 'cinematic', name: 'Cinematic Studio', prompt: 'Cinematic camera movement, dramatic lighting, high quality studio commercial.', desc: 'Gaya iklan TV mewah.' },
  { id: 'modern', name: 'Modern Lifestyle', prompt: 'Natural light, modern house interior, high-end product presentation.', desc: 'Clean dan minimalis.' },
  { id: 'dynamic', name: 'Dynamic Movement', prompt: 'Fast cuts, energetic shadows, liquid motion background.', desc: 'Cocok untuk sport/fashion.' },
];

const MagicVideo: React.FC<MagicVideoProps> = ({ useCredits }) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [resultVideo, setResultVideo] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState(STYLES[0].id);
  const [showKeyInfo, setShowKeyInfo] = useState(true);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setResultVideo(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const checkKey = async () => {
    const hasKey = await (window as any).aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await (window as any).aistudio.openSelectKey();
      return false;
    }
    return true;
  };

  const handleGenerateVideo = async () => {
    if (!image) return;
    
    const hasKey = await checkKey();
    if (!hasKey) return;

    if (!useCredits(75)) return;

    setLoading(true);
    setResultVideo(null);
    try {
      const base64Data = image.split(',')[1];
      const stylePrompt = STYLES.find(s => s.id === selectedStyle)?.prompt || '';
      
      const videoUrl = await generateProductVideo(base64Data, stylePrompt, (s) => setStatus(s));
      setResultVideo(videoUrl);
    } catch (error: any) {
      console.error(error);
      if (error.message?.includes("Requested entity was not found")) {
        alert("API Key tidak valid atau saldo Google Cloud habis. Silakan pilih kembali API Key berbayar Anda.");
        await (window as any).aistudio.openSelectKey();
      } else {
        alert('Gagal menghasilkan video. Pastikan Billing Google Cloud Anda aktif.');
      }
    } finally {
      setLoading(false);
      setStatus('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {showKeyInfo && !resultVideo && !loading && (
        <div className="mb-12 bg-indigo-600/10 border border-indigo-500/20 rounded-[3rem] p-8 md:p-12 relative overflow-hidden animate-in fade-in slide-in-from-top-4">
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />
           <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shrink-0"><Key size={32} /></div>
              <div className="flex-1">
                 <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">Kenapa Harus Punya API Key Sendiri?</h3>
                 <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
                    Fitur Video menggunakan teknologi <b>Veo 3.1</b> dari Google yang membutuhkan daya komputasi tinggi. Untuk menjaga keamanan data dan performa render yang eksklusif, Anda akan menggunakan jalur API privat milik Anda sendiri.
                 </p>
                 <div className="flex flex-wrap gap-4 mt-6">
                    <div className="flex items-center gap-2 text-[10px] font-black text-indigo-400 bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20 uppercase tracking-widest">
                       <ShieldCheck size={14} /> 100% Data Privat
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-indigo-400 bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20 uppercase tracking-widest">
                       <Zap size={14} /> Render Lebih Cepat
                    </div>
                    <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="flex items-center gap-2 text-[10px] font-black text-white bg-slate-800 px-4 py-2 rounded-full hover:bg-slate-700 transition-all uppercase tracking-widest">
                       Cara Buat API Key <ExternalLink size={14} />
                    </a>
                 </div>
              </div>
              <button onClick={() => setShowKeyInfo(false)} className="text-slate-500 hover:text-white p-2">
                 <X size={24} />
              </button>
           </div>
        </div>
      )}

      <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-black mb-3 flex items-center gap-4 text-white">
            <Video className="text-indigo-400" />
            Magic Video
            <span className="text-[10px] bg-indigo-600 text-white px-3 py-1 rounded-full uppercase tracking-tighter">Veo 3.1 AI</span>
          </h2>
          <p className="text-slate-400 font-medium italic">Ubah foto produk statis menjadi video iklan sinematik.</p>
        </div>
        
        {resultVideo && (
          <a href={resultVideo} download="magic-video.mp4" className="px-8 py-4 bg-white text-slate-950 font-black rounded-2xl flex items-center gap-3 shadow-xl hover:scale-105 transition-all">
            <Download size={20} /> SIMPAN VIDEO MP4
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 shadow-2xl">
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">1. Unggah Foto Produk</p>
             <div onClick={() => fileInputRef.current?.click()} className="w-full aspect-[9/16] border-2 border-dashed border-slate-800 rounded-3xl flex items-center justify-center cursor-pointer bg-slate-950/40 hover:border-indigo-500/50 transition-all overflow-hidden relative">
               {image ? <img src={image} className="w-full h-full object-cover" /> : <Upload className="text-slate-600" />}
             </div>
             <input type="file" hidden ref={fileInputRef} onChange={handleFileUpload} accept="image/*" />
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 shadow-2xl">
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">2. Pilih Gaya Sinematik</p>
             <div className="space-y-3">
               {STYLES.map(s => (
                 <button 
                  key={s.id}
                  onClick={() => setSelectedStyle(s.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${selectedStyle === s.id ? 'bg-indigo-600/10 border-indigo-500 shadow-lg' : 'bg-slate-800/40 border-slate-700 hover:border-slate-500'}`}
                 >
                   <p className={`text-[10px] font-black uppercase tracking-widest ${selectedStyle === s.id ? 'text-white' : 'text-slate-400'}`}>{s.name}</p>
                   <p className="text-[9px] text-slate-500 font-medium mt-1">{s.desc}</p>
                 </button>
               ))}
             </div>
          </div>

          <div className="space-y-2">
            <button 
              onClick={handleGenerateVideo} 
              disabled={loading || !image} 
              className="w-full py-5 magix-gradient rounded-2xl font-black text-lg text-white shadow-xl flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 disabled:opacity-50 transition-all"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Zap />}
              {loading ? 'MERENDER VIDEO...' : 'MULAI RENDER (75 KREDIT)'}
            </button>
            <p className="text-center text-[9px] font-bold text-slate-600 uppercase tracking-widest flex items-center justify-center gap-1">
              <Info size={10} /> Kredit dipotong saat memulai render video.
            </p>
          </div>
        </div>

        <div className="lg:col-span-8">
           <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-4 min-h-[600px] flex flex-col items-center justify-center relative shadow-2xl overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-950 to-slate-950">
              {resultVideo ? (
                <div className="w-full h-full flex flex-col items-center justify-center animate-success-pop">
                  <video 
                    src={resultVideo} 
                    controls 
                    autoPlay 
                    loop 
                    className="max-w-full max-h-[650px] rounded-[2rem] shadow-[0_0_50px_rgba(99,102,241,0.2)] border-2 border-white/5"
                  />
                </div>
              ) : loading ? (
                <div className="flex flex-col items-center justify-center gap-8 text-center p-12">
                   <div className="magic-loader"></div>
                   <div className="space-y-4">
                      <h3 className="text-3xl font-black text-white italic animate-pulse tracking-tight">{status || 'Menyiapkan Kanvas AI...'}</h3>
                      <div className="flex items-center justify-center gap-3">
                         <span className="text-indigo-400 animate-bounce"><Film size={16} /></span>
                         <p className="text-indigo-400 text-[10px] font-bold tracking-[0.4em] uppercase">Generating Video Motion via Veo 3.1</p>
                      </div>
                   </div>
                </div>
              ) : (
                <div className="text-center space-y-6 opacity-20">
                   <div className="w-32 h-32 border-4 border-dashed border-slate-800 rounded-[2.5rem] flex items-center justify-center mx-auto">
                      <Play size={48} className="text-slate-700" />
                   </div>
                   <p className="text-sm font-black text-slate-700 uppercase tracking-[0.3em]">Video Preview Area</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default MagicVideo;
