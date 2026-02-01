
import React, { useState, useRef } from 'react';
import { 
  Mic, Play, Loader2, Volume2, StopCircle, Sparkles, 
  User, UserPlus, Baby, Zap, Heart, MessageSquare, 
  Speaker, Copy, Check, Wand2
} from 'lucide-react';
import { generateSpeech, decode, decodeAudioData, generateVoiceScript } from '../services/geminiService';

const CATEGORIES = [
  { id: 'wanita', name: 'Suara Wanita', icon: UserPlus, color: 'bg-pink-500', voiceId: 'Kore', desc: 'Ramah & Persuasif' },
  { id: 'pria', name: 'Suara Pria', icon: User, color: 'bg-blue-500', voiceId: 'Zephyr', desc: 'Tegas & Berwibawa' },
  { id: 'anak', name: 'Suara Anak', icon: Baby, color: 'bg-amber-500', voiceId: 'Puck', desc: 'Ceria & Menggemaskan' },
];

const AD_STYLES = [
  { id: 'hard_sell', name: 'Hard Sell', icon: Zap },
  { id: 'soft_sell', name: 'Soft Sell', icon: Heart },
  { id: 'story', name: 'Storytelling', icon: MessageSquare },
];

const MagicVoice: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [scriptLoading, setScriptLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].id);
  const [selectedStyle, setSelectedStyle] = useState(AD_STYLES[0].id);
  const [copied, setCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const handleGenerateScript = async () => {
    if (!productName) return;
    setScriptLoading(true);
    try {
      const style = AD_STYLES.find(s => s.id === selectedStyle)?.name || 'Hard Sell';
      const script = await generateVoiceScript(productName, style);
      setText(script);
      // Trigger success animation
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error(error);
      alert('Gagal membuat naskah.');
    } finally {
      setScriptLoading(false);
    }
  };

  const handleGenerateVoice = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const category = CATEGORIES.find(c => c.id === selectedCategory);
      const voiceId = category?.voiceId || 'Kore';
      
      const base64Audio = await generateSpeech(text, voiceId);
      if (base64Audio) {
        const bytes = decode(base64Audio);
        if (!audioCtxRef.current) audioCtxRef.current = new AudioContext({ sampleRate: 24000 });
        const audioBuffer = await decodeAudioData(bytes, audioCtxRef.current, 24000, 1);
        const source = audioCtxRef.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioCtxRef.current.destination);
        source.onended = () => setIsPlaying(false);
        source.start();
        audioSourceRef.current = source;
        setIsPlaying(true);
      }
    } catch (error) {
      console.error(error);
      alert('Gagal generate suara.');
    } finally {
      setLoading(false);
    }
  };

  const stopAudio = () => {
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
      setIsPlaying(false);
    }
  };

  const copyScript = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-black mb-3 flex items-center justify-center md:justify-start gap-4 text-white">
          <Mic className="text-emerald-400" />
          Magic Voice
        </h2>
        <p className="text-slate-400 font-medium">Ubah ide produk jadi naskah iklan & suara profesional dalam sekejap.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
        <div className="lg:col-span-5 space-y-6">
           {/* Script Writer Feature */}
           <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full" />
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                 <Wand2 size={14} className="text-emerald-400" /> 1. AI Script Writer
              </p>
              <div className="space-y-6 relative z-10">
                 <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block ml-1">Produk Anda</label>
                    <input 
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="Contoh: Hijab Premium, Gadget Murah..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-white outline-none focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-800"
                    />
                 </div>
                 <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block ml-1">Gaya Iklan</label>
                    <div className="grid grid-cols-3 gap-2">
                       {AD_STYLES.map(s => (
                         <button 
                           key={s.id} 
                           onClick={() => setSelectedStyle(s.id)} 
                           className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${selectedStyle === s.id ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-600'}`}
                         >
                            <s.icon size={16} />
                            <span className="text-[8px] font-black uppercase">{s.name}</span>
                         </button>
                       ))}
                    </div>
                 </div>
                 <button 
                   onClick={handleGenerateScript} 
                   disabled={!productName || scriptLoading} 
                   className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
                 >
                    {scriptLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} className="text-emerald-400" />}
                    {scriptLoading ? 'MENYUSUN...' : 'BUAT NASKAH'}
                 </button>
              </div>
           </div>

           {/* Voice Categories */}
           <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">2. Pilih Karakter Suara</p>
              <div className="grid grid-cols-1 gap-3">
                 {CATEGORIES.map(c => (
                   <button 
                     key={c.id} 
                     onClick={() => setSelectedCategory(c.id)} 
                     className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${selectedCategory === c.id ? 'bg-indigo-600/10 border-indigo-500 shadow-lg' : 'bg-slate-800/40 border-slate-700 hover:border-slate-500'}`}
                   >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${selectedCategory === c.id ? c.color : 'bg-slate-700'}`}>
                         <c.icon size={24} />
                      </div>
                      <div className="text-left flex-1">
                         <p className={`text-xs font-black uppercase ${selectedCategory === c.id ? 'text-white' : 'text-slate-400'}`}>{c.name}</p>
                         <p className="text-[9px] text-slate-500 font-medium">{c.desc}</p>
                      </div>
                      {selectedCategory === c.id && <Check size={16} className="text-emerald-400" />}
                   </button>
                 ))}
              </div>
           </div>
        </div>

        <div className="lg:col-span-7">
           <div className={`bg-slate-900 border border-slate-800 rounded-[3rem] p-8 md:p-12 min-h-[600px] flex flex-col shadow-2xl relative overflow-hidden transition-all duration-500 ${showSuccess ? 'ring-4 ring-emerald-500/30 scale-[1.01]' : ''}`}>
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
              <div className="flex items-center justify-between mb-6 relative z-10">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Speaker size={14} className="text-emerald-400" /> Virtual Studio Room
                 </p>
                 {text && (
                   <button onClick={copyScript} className="p-2 text-slate-500 hover:text-white transition-all flex items-center gap-2 text-[10px] font-bold">
                      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      {copied ? 'Tersalin' : 'Salin Naskah'}
                   </button>
                 )}
              </div>
              <div className="flex-1 relative z-10 flex flex-col">
                 <textarea 
                   value={text}
                   onChange={(e) => setText(e.target.value)}
                   placeholder="Tulis naskah di sini atau gunakan AI Script Writer di sebelah kiri..."
                   className={`flex-1 bg-slate-950 border border-slate-800 rounded-[2rem] p-8 text-xl text-white outline-none focus:ring-1 focus:ring-emerald-500 resize-none mb-8 font-medium leading-relaxed transition-all ${showSuccess ? 'animate-success-pop' : ''}`}
                 />

                 {!isPlaying ? (
                    <button 
                      onClick={handleGenerateVoice} 
                      disabled={!text || loading} 
                      className="w-full py-6 magix-gradient rounded-[2rem] font-black text-xl text-white shadow-2xl flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                    >
                       {loading ? <Loader2 size={24} className="animate-spin" /> : <Speaker size={24} />}
                       {loading ? 'MERENDER AUDIO...' : 'SULAP JADI SUARA'}
                    </button>
                 ) : (
                    <button 
                      onClick={stopAudio} 
                      className="w-full py-6 bg-red-600 text-white rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 animate-pulse transition-all active:scale-95"
                    >
                       <StopCircle size={24} /> BERHENTI BICARA
                    </button>
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MagicVoice;
