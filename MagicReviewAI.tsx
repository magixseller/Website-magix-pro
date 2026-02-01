
import React, { useState } from 'react';
import { 
  MessageSquareText, Sparkles, Copy, Check, Loader2, 
  Star, Send, Trash2, Heart, ShieldCheck, Zap,
  MessageCircle, HelpCircle, History, Info
} from 'lucide-react';
import { generateReviewResponse } from '../services/geminiService';

const TONES = [
  { id: 'polite', name: 'Sopan & Ramah', desc: 'Cocok untuk brand umum.' },
  { id: 'humorous', name: 'Sedikit Humoris', desc: 'Cocok untuk jualan anak muda.' },
  { id: 'professional', name: 'Tegas & Solutif', desc: 'Cocok untuk komplain / rating rendah.' },
  { id: 'grateful', name: 'Penuh Apresiasi', desc: 'Fokus pada rasa terima kasih.' },
];

const MagicReviewAI: React.FC = () => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [selectedTone, setSelectedTone] = useState('polite');
  const [shopName, setShopName] = useState('Toko Kami');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!reviewText.trim()) {
      alert('Harap masukkan isi ulasan pembeli!');
      return;
    }
    setLoading(true);
    setResult('');
    try {
      const toneLabel = TONES.find(t => t.id === selectedTone)?.name || 'Sopan';
      const response = await generateReviewResponse(reviewText, rating, toneLabel, shopName);
      setResult(response);
      setHistory(prev => [response, ...prev.slice(0, 4)]);
    } catch (error) {
      console.error(error);
      alert('Gagal membuat balasan AI.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 relative">
      <div className="mb-10">
        <h2 className="text-3xl md:text-5xl font-black mb-3 flex items-center gap-4 text-white">
          <MessageSquareText className="text-blue-400" />
          Magic Balas Ulasan
        </h2>
        <p className="text-slate-400 font-medium italic">Balas ulasan pembeli dengan cerdas & otomatis untuk menaikkan reputasi toko.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Panel Konfigurasi */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Zap size={14} className="text-blue-400" /> 1. Input Ulasan
             </p>
             
             <div className="space-y-6 relative z-10">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block ml-1">Rating dari Pembeli</label>
                   <div className="flex gap-2">
                      {[1,2,3,4,5].map(star => (
                        <button 
                          key={star} 
                          onClick={() => setRating(star)}
                          className={`flex-1 py-3 rounded-xl border flex items-center justify-center transition-all ${rating >= star ? 'bg-amber-400/10 border-amber-400 text-amber-400' : 'bg-slate-800 border-slate-700 text-slate-600'}`}
                        >
                           <Star size={16} fill={rating >= star ? 'currentColor' : 'none'} />
                        </button>
                      ))}
                   </div>
                </div>

                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block ml-1">Isi Ulasan Pembeli</label>
                   <textarea 
                     value={reviewText}
                     onChange={(e) => setReviewText(e.target.value)}
                     placeholder="Salin dan tempel ulasan pembeli di sini..."
                     className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-800 min-h-[120px] resize-none"
                   />
                </div>

                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block ml-1">Nama Toko Anda</label>
                   <input 
                     value={shopName}
                     onChange={(e) => setShopName(e.target.value)}
                     className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white outline-none"
                   />
                </div>
             </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">2. Pilih Gaya Balasan</p>
            <div className="grid grid-cols-1 gap-2">
               {TONES.map(t => (
                 <button
                   key={t.id}
                   onClick={() => setSelectedTone(t.id)}
                   className={`p-4 rounded-2xl border text-left transition-all ${selectedTone === t.id ? 'bg-blue-600/10 border-blue-500 shadow-lg' : 'bg-slate-800 border-slate-700'}`}
                 >
                   <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-black uppercase ${selectedTone === t.id ? 'text-white' : 'text-slate-500'}`}>{t.name}</span>
                      {selectedTone === t.id && <ShieldCheck size={12} className="text-blue-400" />}
                   </div>
                   <p className="text-[9px] text-slate-500 font-medium">{t.desc}</p>
                 </button>
               ))}
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading || !reviewText.trim()}
            className="w-full py-5 magix-gradient rounded-2xl font-black text-lg text-white shadow-xl flex items-center justify-center gap-4 disabled:opacity-50 hover:scale-[1.02] active:scale-95 transition-all"
          >
            {loading ? <Loader2 size={24} className="animate-spin" /> : <Sparkles size={24} />}
            {loading ? 'MERANGKAI KATA...' : 'GENERATE BALASAN'}
          </button>
        </div>

        {/* Panel Hasil Preview */}
        <div className="lg:col-span-7">
           <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-8 md:p-12 min-h-[600px] flex flex-col shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent pointer-events-none" />
              
              <div className="flex items-center justify-between mb-10 relative z-10">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <MessageCircle size={14} className="text-blue-400" /> Draft Balasan Marketplace
                 </p>
                 <div className="flex items-center gap-4">
                    <History size={16} className="text-slate-700" />
                 </div>
              </div>

              {!result && !loading && (
                <div className="flex-1 flex flex-col items-center justify-center opacity-30 text-center relative z-10">
                   <div className="w-24 h-24 bg-slate-950 border border-slate-800 rounded-full flex items-center justify-center mb-8">
                      <MessageSquareText size={48} className="text-slate-700" />
                   </div>
                   <h3 className="text-xl font-black uppercase tracking-[0.3em] text-slate-700">Awaiting Input</h3>
                </div>
              )}

              {loading && (
                <div className="flex-1 flex flex-col items-center justify-center gap-8 relative z-10">
                   <div className="magic-loader"></div>
                   <div className="text-center">
                     <h3 className="text-white font-black text-3xl animate-pulse italic tracking-tight">Menganalisis Sentimen...</h3>
                     <p className="text-blue-400 text-[10px] uppercase font-bold tracking-[0.5em] mt-3">Menyusun Kalimat Persuasif AI</p>
                   </div>
                </div>
              )}

              {result && !loading && (
                <div className="flex-1 flex flex-col relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                   <div className="bg-slate-950 border border-slate-800 rounded-[2.5rem] p-8 md:p-10 relative group shadow-inner flex-1">
                      <div className="flex items-center gap-3 mb-6">
                         <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                            <Heart size={20} className="fill-blue-400/20" />
                         </div>
                         <span className="text-xs font-black text-white uppercase tracking-widest">Respon Rekomendasi</span>
                      </div>
                      
                      <div className="text-lg md:text-xl text-slate-200 leading-relaxed font-medium italic whitespace-pre-line mb-10">
                        {result}
                      </div>

                      <button 
                        onClick={copyToClipboard}
                        className="w-full py-5 bg-white text-slate-950 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                      >
                        {copied ? <Check size={20} className="text-emerald-600" /> : <Copy size={20} />}
                        {copied ? 'BERHASIL DISALIN' : 'SALIN BALASAN'}
                      </button>
                   </div>

                   {/* History mini section */}
                   {history.length > 1 && (
                     <div className="mt-8">
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4">Riwayat Terakhir</p>
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                           {history.slice(1).map((h, i) => (
                             <div key={i} className="min-w-[200px] p-4 bg-slate-900/50 border border-slate-800 rounded-2xl opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                                <p className="text-[9px] text-slate-400 line-clamp-2">{h}</p>
                             </div>
                           ))}
                        </div>
                     </div>
                   )}
                </div>
              )}
           </div>
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="mt-12 flex items-center justify-center gap-6 opacity-40">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span className="text-[9px] font-bold text-slate-500 uppercase">Aman untuk Marketplace</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-blue-400" />
          <span className="text-[9px] font-bold text-slate-500 uppercase">Analisis Sentimen 3.1</span>
        </div>
      </div>
    </div>
  );
};

export default MagicReviewAI;
