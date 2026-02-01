
import React, { useState, useRef } from 'react';
import { 
  PackagePlus, Upload, Wand2, Copy, Check, Loader2, 
  Trash2, Plus, Sparkles, ShoppingBag, MessageSquare, Hash, Download, ArrowRight, Zap,
  Maximize, Layout, Monitor, Smartphone, Info, Target, Banknote, Tag
} from 'lucide-react';
import { generateBundleContent, generateBundleDesign } from '../services/geminiService';

interface MagicBundleProps {
  useCredits: (amount: number) => boolean;
}

const STRATEGIES = [
  { id: 'starter_kit', name: 'Starter Kit', desc: 'Cocok untuk pengguna baru/pemula.' },
  { id: 'save_more', name: 'Hemat Banget', desc: 'Fokus pada potongan harga & volume.' },
  { id: 'gift_set', name: 'Kado Eksklusif', desc: 'Visual estetik untuk hadiah/kado.' },
  { id: 'complementary', name: 'Combo Serasi', desc: 'Produk yang saling melengkapi.' },
];

const ASPECT_RATIOS = [
  { id: '1:1', name: 'Square (1:1)', icon: Layout, desc: 'Instagram / Feed' },
  { id: '16:9', name: 'Landscape (16:9)', icon: Monitor, desc: 'Banner Web' },
  { id: '4:3', name: 'Classic (4:3)', icon: Maximize, desc: 'Marketplace' },
];

const MagicBundle: React.FC<MagicBundleProps> = ({ useCredits }) => {
  const [images, setImages] = useState<(string | null)[]>([null, null]);
  const [loading, setLoading] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState(STRATEGIES[0].id);
  const [selectedRatio, setSelectedRatio] = useState(ASPECT_RATIOS[0].id);
  const [prices, setPrices] = useState({ normal: '', promo: '' });
  const [resultText, setResultText] = useState<any | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const fileInputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const handleFileUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImages = [...images];
        newImages[index] = event.target?.result as string;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    const activeImages = images.filter(img => img !== null) as string[];
    if (activeImages.length < 2) {
      alert('Pilih minimal 2 produk untuk bundling!');
      return;
    }

    if (!useCredits(15)) return;

    setLoading(true);
    setResultText(null);
    setResultImage(null);
    
    try {
      const base64Images = activeImages.map(img => img.split(',')[1]);
      const textData = await generateBundleContent(base64Images, selectedStrategy);
      setResultText(textData);
      const designImage = await generateBundleDesign(base64Images, textData.bundleName, textData.tagline, selectedRatio, prices);
      setResultImage(designImage);
    } catch (error) {
      console.error(error);
      alert('Gagal merancang bundling.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-black mb-3 flex items-center gap-4 text-white">
            <PackagePlus className="text-indigo-400" />
            Magic Bundle
          </h2>
          <p className="text-slate-400 font-medium italic">Poster iklan paket produk otomatis premium.</p>
        </div>
        
        {resultImage && (
          <button onClick={() => { const l = document.createElement('a'); l.href = resultImage; l.download = 'bundle.png'; l.click(); }} className="px-8 py-4 bg-white text-slate-950 font-black rounded-2xl flex items-center gap-3 shadow-xl">
            <Download size={20} /> SIMPAN POSTER
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-6">
           <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">1. Unggah Produk (Min 2)</p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                 {images.map((img, i) => (
                    <div key={i} onClick={() => fileInputRefs[i].current?.click()} className={`w-28 h-28 border-2 border-dashed rounded-[2rem] flex items-center justify-center cursor-pointer transition-all ${img ? 'border-indigo-500 bg-black' : 'border-slate-800 bg-slate-950/40'}`}>
                       {img ? <img src={img} className="w-full h-full object-cover" /> : <Plus size={24} className="text-slate-700" />}
                       <input type="file" hidden ref={fileInputRefs[i]} onChange={(e) => handleFileUpload(i, e)} />
                    </div>
                 ))}
              </div>
           </div>

           <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">2. Label Harga Bundle</p>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" value={prices.normal} onChange={(e) => setPrices({...prices, normal: e.target.value})} placeholder="Rp 299.000" className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-white line-through" />
                <input type="text" value={prices.promo} onChange={(e) => setPrices({...prices, promo: e.target.value})} placeholder="Rp 149.000" className="w-full bg-slate-950 border border-indigo-500/20 rounded-2xl p-4 text-xs text-white font-bold" />
              </div>
           </div>

           <button onClick={handleGenerate} disabled={loading || images.filter(i => i !== null).length < 2} className="w-full py-4 magix-gradient rounded-2xl font-black text-lg text-white shadow-xl disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
              {loading ? 'RENDERING BUNDLE...' : 'SULAP JADI BUNDLE (15 KREDIT)'}
           </button>
        </div>

        <div className="lg:col-span-7">
           <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-8 min-h-[500px] flex flex-col items-center justify-center relative shadow-2xl overflow-hidden">
              {resultImage ? <img src={resultImage} className="max-w-full rounded-[2rem] shadow-2xl" /> : loading ? <Loader2 className="animate-spin text-indigo-500" size={40} /> : <PackagePlus size={80} className="text-slate-800 opacity-20" />}
           </div>
        </div>
      </div>
    </div>
  );
};

export default MagicBundle;
