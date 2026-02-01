
import React, { useState, useRef } from 'react';
import { 
  Layers, Wand2, Download, Loader2, 
  Upload, Image as ImageIcon, 
  Trash2, Sparkles, Palette, Zap, RefreshCw, ChevronRight, X, Check
} from 'lucide-react';
import { generateSlideImage, generateCarouselHooks } from '../services/geminiService';

interface MagicCarouselProps {
  useCredits: (amount: number) => boolean;
}

const MagicCarousel: React.FC<MagicCarouselProps> = ({ useCredits }) => {
  const [slidesText, setSlidesText] = useState<string[]>(Array(4).fill(''));
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hookLoading, setHookLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>(Array(4).fill(''));
  const [generationProgress, setGenerationProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setGeneratedImages(Array(4).fill(''));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAutoHooks = async () => {
    if (!image) return;
    if (!useCredits(2)) return;

    setHookLoading(true);
    try {
      const base64Data = image.split(',')[1];
      const hooks = await generateCarouselHooks(base64Data);
      if (hooks && Array.isArray(hooks)) {
        setSlidesText(hooks.slice(0, 4));
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setHookLoading(false);
    }
  };

  const downloadSlide = (img: string, index: number) => {
    const link = document.createElement('a');
    link.href = img;
    link.download = `Magix-Carousel-Slide-${index + 1}.png`;
    link.click();
  };

  const handleGenerateCarousel = async () => {
    if (!image) return;
    if (slidesText.every(t => t.trim() === '')) {
      alert('Harap isi teks slide terlebih dahulu!');
      return;
    }

    if (!useCredits(25)) return;

    setLoading(true);
    setGenerationProgress(0);
    const base64Data = image.split(',')[1];
    const newGeneratedImages = [...Array(4).fill('')];

    try {
      for (let i = 0; i < 4; i++) {
        setGenerationProgress(i + 1);
        const finalSlideText = slidesText[i].trim() || 'Magix Tool Seller';
        const slideImage = await generateSlideImage(base64Data, finalSlideText, i + 1);
        if (slideImage) {
          newGeneratedImages[i] = slideImage;
          setGeneratedImages([...newGeneratedImages]);
        }
      }
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error(error);
      alert('Gagal merancang visual carousel.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-black mb-3 flex items-center gap-4 text-white">
            <Layers className="text-indigo-400" />
            Magic Carousel
          </h2>
          <p className="text-slate-400 font-medium italic">Sulap 1 foto produk jadi 4 slide konten marketplace premium dengan teks literal.</p>
        </div>
        
        {generatedImages.some(img => img !== '') && (
          <button 
            onClick={() => generatedImages.forEach((img, i) => { if(img) downloadSlide(img, i); })} 
            className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-xl shimmer-effect"
          >
            <Download size={16} /> Simpan Semua
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 shadow-2xl relative overflow-hidden group">
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <ImageIcon size={14} className="text-indigo-400" /> 1. Foto Produk Dasar
             </p>
             {!image ? (
              <div onClick={() => fileInputRef.current?.click()} className="w-full aspect-square border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer transition-all bg-slate-950/40 p-8">
                <Upload size={32} className="text-slate-600 mb-2 group-hover:text-indigo-400" />
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest text-center">Pilih Gambar Produk</span>
              </div>
            ) : (
              <div className="relative aspect-square rounded-[2.5rem] overflow-hidden border-2 border-slate-800 shadow-xl group/img">
                <img src={image} className="w-full h-full object-cover" />
                <button onClick={() => {setImage(null); setGeneratedImages(Array(4).fill(''));}} className="absolute top-4 right-4 p-3 bg-red-500 text-white rounded-full shadow-lg hover:scale-110"><X size={16}/></button>
              </div>
            )}
            <input type="file" hidden ref={fileInputRef} onChange={handleFileUpload} accept="image/*" />
          </div>

          <div className={`bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 shadow-2xl transition-all duration-500 ${showSuccess && !loading ? 'ring-2 ring-emerald-500/30' : ''}`}>
             <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">2. Konten Slide (Literal)</p>
                <button onClick={handleAutoHooks} disabled={!image || hookLoading} className="flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-lg text-[9px] font-black uppercase hover:bg-indigo-500 hover:text-white transition-all">
                  {hookLoading ? <Loader2 size={12} className="animate-spin" /> : <Zap size={12} />} Naskah AI
                </button>
             </div>
             <div className="space-y-3">
               {slidesText.map((val, i) => (
                 <div key={i} className="relative">
                    <span className="absolute left-3 top-3 text-[8px] font-black text-slate-700">S{i+1}</span>
                    <input 
                      value={val} 
                      onChange={(e) => { const n = [...slidesText]; n[i] = e.target.value; setSlidesText(n); }} 
                      placeholder={`Isi teks slide ${i+1}...`} 
                      className={`w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-3 text-[10px] text-white focus:border-indigo-500 outline-none transition-all ${showSuccess && !loading ? 'border-emerald-500/50' : ''}`} 
                    />
                 </div>
               ))}
             </div>
          </div>

          <button onClick={handleGenerateCarousel} disabled={loading || !image} className="w-full py-4 magix-gradient rounded-2xl font-black text-lg text-white shadow-xl disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
            {loading ? <RefreshCw className="animate-spin" /> : <Palette />}
            <span className="uppercase tracking-tight">{loading ? `RENDERING SLIDE ${generationProgress}/4` : 'VISUALISASI KE GAMBAR (25 KREDIT)'}</span>
          </button>
        </div>

        <div className="lg:col-span-8">
           <div className="bg-slate-900/50 border border-slate-800 rounded-[3rem] p-6 md:p-10 shadow-inner min-h-[600px] flex flex-col relative overflow-hidden">
              {loading && (
                <div className="absolute inset-0 z-20 bg-slate-950/60 backdrop-blur-md flex flex-col items-center justify-center gap-8">
                  <div className="magic-loader"></div>
                  <div className="text-center">
                    <h3 className="text-2xl font-black text-white italic animate-pulse">Menghasilkan Visual Slide {generationProgress}...</h3>
                    <p className="text-indigo-400 text-[10px] font-bold tracking-[0.4em] uppercase mt-2">Harmonisasi Teks & Desain Pro</p>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-6 relative z-10 flex-1 content-center">
                {Array(4).fill(0).map((_, i) => (
                  <div key={i} className={`aspect-[3/4] rounded-3xl overflow-hidden border-2 transition-all relative group/slide ${generatedImages[i] ? 'border-indigo-500/30 bg-black shadow-2xl animate-success-pop' : 'border-slate-800 bg-slate-950/40'}`}>
                    <div className="absolute top-4 left-4 z-10 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
                      Slide {i+1}
                    </div>
                    {generatedImages[i] ? (
                      <>
                        <img src={generatedImages[i]} className="w-full h-full object-cover transition-transform group-hover/slide:scale-105" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/slide:opacity-100 transition-all flex items-center justify-center">
                           <button 
                             onClick={() => downloadSlide(generatedImages[i], i)}
                             className="p-4 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-110 transition-all shadow-2xl"
                           >
                             <Download size={16} /> Unduh Slide
                           </button>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon size={48} className="text-slate-800 opacity-20" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MagicCarousel;
