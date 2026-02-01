
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { 
  Upload, Sparkles, Wand2, Download, Trash2, Loader2, ShoppingBag, 
  Smartphone, Heart, Home, Wand, Palette, 
  Baby, Car, Box, Info,
  Zap, ChevronRight, Image as ImageIcon, 
  Camera, Layout, Store, Utensils,
  Stethoscope, Wrench, Briefcase, FileText, Copy, Check, Gem, MessageSquareCode, Plus, Tag
} from 'lucide-react';
import { editImageWithPrompt, analyzeProductImage } from '../services/geminiService';
import MagicLoadingOverlay from './MagicLoadingOverlay';

const CATEGORIES = [
  { id: 'fashion', name: 'Fashion', icon: ShoppingBag, desc: 'Pakaian & Aksesoris' },
  { id: 'electronics', name: 'Elektronik', icon: Smartphone, desc: 'Gadget & Teknologi' },
  { id: 'food', name: 'Kuliner', icon: Utensils, desc: 'Makanan & Minuman' },
  { id: 'beauty', name: 'Beauty', icon: Heart, desc: 'Skincare & Makeup' },
  { id: 'homedecor', name: 'Rumah', icon: Home, desc: 'Dekorasi & Interior' },
  { id: 'kids', name: 'Bayi/Anak', icon: Baby, desc: 'Mainan & Kebutuhan' },
  { id: 'automotive', name: 'Otomotif', icon: Car, desc: 'Mobil & Motor' },
  { id: 'tools', name: 'Perkakas', icon: Wrench, desc: 'Alat Teknik & Tukang' },
  { id: 'health', name: 'Kesehatan', icon: Stethoscope, desc: 'Suplemen & Alkes' },
  { id: 'jewelry', name: 'Perhiasan', icon: Gem, desc: 'Emas & Aksesoris' },
  { id: 'general', name: 'Lainnya', icon: Box, desc: 'Kategori Umum' },
];

const PRESETS = [
  // --- FASHION ---
  { id: 'f1', category: 'fashion', name: 'Studio Butik Mewah', promptSnippet: 'High-end fashion studio with a professional white cyclorama, 3-point softbox lighting, clean ray-traced shadows.' },
  { id: 'f2', category: 'fashion', name: 'Gaya Jalanan Urban', promptSnippet: 'Cinematic urban street at golden hour, shallow depth of field, realistic city bokeh, high-fashion aesthetic.' },
  { id: 'f3', category: 'fashion', name: 'Nuansa Alam Tropis', promptSnippet: 'Sunlight filtering through palm leaves, minimalist outdoor fashion shoot, soft natural shadows, summer vibe.' },
  { id: 'f4', category: 'fashion', name: 'Display Manekin Toko', promptSnippet: 'Professional retail store window display, premium boutique interior, boutique lighting, realistic glass reflections.' },
  { id: 'f5', category: 'fashion', name: 'Flat Lay Estetik', promptSnippet: 'Flat lay photography on a neutral textured linen background, curated lifestyle accessories around, soft natural side lighting.' },
  { id: 'f6', category: 'fashion', name: 'Cyberpunk Runway', promptSnippet: 'Neon-lit futuristic runway, rainy night vibes, high contrast colors, cinematic fashion photography.' },
  { id: 'f7', category: 'fashion', name: '90s Vintage Film', promptSnippet: 'Grainy 90s fashion magazine style, warm retro colors, old paper texture, nostalgic atmosphere.' },
  { id: 'f8', category: 'fashion', name: 'Minimalist Museum', promptSnippet: 'Vast empty art gallery space, white walls, dramatic overhead shadows, high-end lookbook aesthetic.' },
  { id: 'f9', category: 'fashion', name: 'Golden Hour Beach', promptSnippet: 'Soft sunset lighting on a tropical beach, ocean waves in background, dreamy vacation vibes.' },
  { id: 'f10', category: 'fashion', name: 'Industrial Warehouse', promptSnippet: 'Raw concrete loft, exposed brick, large factory windows, moody urban streetwear style.' },

  // --- ELECTRONICS ---
  { id: 'e1', category: 'electronics', name: 'Meja Kerja Modern', promptSnippet: 'Modern minimalist workstation, dark wood desk, warm ambient lighting, professional setup aesthetic.' },
  { id: 'e2', category: 'electronics', name: 'Laboratorium Teknologi', promptSnippet: 'Futuristic clean tech lab background, glowing neon accents, high-tech industrial aesthetic.' },
  { id: 'e3', category: 'electronics', name: 'Lifestyle Genggam', promptSnippet: 'Close up lifestyle shot, person holding the device in a cozy cafe setting, soft bokeh background.' },
  { id: 'e4', category: 'electronics', name: 'Gamer Setup RGB', promptSnippet: 'Extreme gaming setup, RGB neon lighting, dark room, cyberpunk aesthetic, professional tech photography.' },
  { id: 'e5', category: 'electronics', name: 'Apple-style White', promptSnippet: 'Pure white floating product photography, soft commercial shadows, hyper-realistic 8k render.' },
  { id: 'e6', category: 'electronics', name: 'Floating Void', promptSnippet: 'Product floating in an infinite dark cosmic void, blue star light, futuristic high-tech render.' },
  { id: 'e7', category: 'electronics', name: 'CEO Glass Office', promptSnippet: 'High-rise glass office overlooking a city skyline at night, bokeh city lights, professional corporate aesthetic.' },
  { id: 'e8', category: 'electronics', name: 'Macro Circuit Board', promptSnippet: 'Macro shot of green circuit boards, glowing gold traces, futuristic engineering background.' },
  { id: 'e9', category: 'electronics', name: 'Minimalist Silicon', promptSnippet: 'Soft grey silicone texture, geometric shapes, clean modern product showcase.' },
  { id: 'e10', category: 'electronics', name: 'Startup Garage', promptSnippet: 'Bright high-tech garage workshop, tools in background, energetic maker space vibe.' },

  // --- FOOD ---
  { id: 'fo1', category: 'food', name: 'Meja Kafe Estetik', promptSnippet: 'Rustic cafe marble table, blurred coffee shop interior in background, warm natural morning light.' },
  { id: 'fo2', category: 'food', name: 'Dapur Modern Minimalis', promptSnippet: 'Bright clean modern kitchen counter, white marble, high-end kitchen appliances, professional food photography.' },
  { id: 'fo3', category: 'food', name: 'Piknik Outdoor', promptSnippet: 'Sunny outdoor picnic setting, green grass, wicker basket nearby, summer vibe, bright natural lighting.' },
  { id: 'fo4', category: 'food', name: 'Rustic Farmhouse', promptSnippet: 'Aged wood surface, scattered flour and herbs, warm moody country kitchen lighting.' },
  { id: 'fo5', category: 'food', name: 'Fine Dining Dark', promptSnippet: 'Luxury restaurant table, dim romantic lighting, bokeh candles, silver cutlery, high-end culinary aesthetic.' },
  { id: 'fo10', category: 'food', name: 'Japanese Zen Table', promptSnippet: 'Minimalist tatami room, low wooden table, soft paper lamp light, peaceful zen aesthetic.' },

  // --- BEAUTY ---
  { id: 'b1', category: 'beauty', name: 'Kamar Mandi Mewah', promptSnippet: 'Luxury marble bathroom vanity, soft spa lighting, high-end skincare aesthetic, water droplets on surface.' },
  { id: 'b2', category: 'beauty', name: 'Meja Rias Pagi', promptSnippet: 'Bright vanity table, morning sunlight through a window, soft dreamy atmosphere, high-end makeup aesthetic.' },
  { id: 'b3', category: 'beauty', name: 'Organic Zen Spa', promptSnippet: 'Bamboo leaves, smooth black stones, water reflections, peaceful natural beauty vibe.' },
  { id: 'b4', category: 'beauty', name: 'Vogue Red Carpet', promptSnippet: 'Glamorous red carpet events, flashlights, paparazzi bokeh, intense luxury cosmetic style.' },
  { id: 'b5', category: 'beauty', name: 'Laboratory Pure', promptSnippet: 'Scientific clean room, glass beakers, soft blue lighting, dermatologist approved aesthetic.' },

  // --- HOMEDECOR ---
  { id: 'h1', category: 'homedecor', name: 'Ruang Tamu Modern', promptSnippet: 'Contemporary living room setting, designer furniture, soft sunlight, high-end interior photography.' },
  { id: 'h2', category: 'homedecor', name: 'Scandinavian Mood', promptSnippet: 'Bright Nordic interior style, light wood, white walls, minimalist cozy home aesthetic.' },
  { id: 'h3', category: 'homedecor', name: 'Industrial Loft', promptSnippet: 'Raw brick walls, large warehouse windows, urban city view, industrial home decor style.' },
  { id: 'h4', category: 'homedecor', name: 'Cozy Library Nook', promptSnippet: 'Dark wood bookshelves, warm fireplace glow, leather chair, intellectual home vibe.' },
  { id: 'h5', category: 'homedecor', name: 'Bright Sunroom', promptSnippet: 'Glass sunroom, lots of indoor plants, bright white morning light, airy garden vibe.' },
];

interface MagicStudioProps {
  useCredits: (amount: number) => boolean;
}

const MagicStudio: React.FC<MagicStudioProps> = ({ useCredits }) => {
  const [image, setImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('fashion');
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [customPrompt, setCustomPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<{title: string, description: string, tags: string[]} | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredPresets = useMemo(() => {
    return PRESETS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const visiblePresets = useMemo(() => {
    return filteredPresets.slice(0, visibleCount);
  }, [filteredPresets, visibleCount]);

  useEffect(() => {
    setVisibleCount(6);
  }, [selectedCategory]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setResult(null);
        setSelectedPreset(null);
        setGeneratedContent(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMagic = async () => {
    if (!image) return;
    if (!selectedPreset && !customPrompt.trim()) {
      alert("Harap pilih preset atau masukkan instruksi manual.");
      return;
    }

    const creditCost = 15;
    if (!useCredits(creditCost)) return;

    setLoading(true);
    setResult(null);
    setGeneratedContent(null);
    try {
      const preset = PRESETS.find(p => p.id === selectedPreset);
      const prompt = `TASK: Professional AI Product Placement. ${preset ? preset.promptSnippet : ''} ${customPrompt.trim() ? 'Additional instruction: ' + customPrompt : ''} Maintain product integrity, ensure lighting is consistent between product and background. 8k advertising grade quality.`;
      
      const base64Data = image.split(',')[1];
      const resultImage = await editImageWithPrompt(base64Data, prompt, "1:1");
      if (resultImage) {
        setResult(resultImage);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error(error);
      alert('Gagal memproses gambar.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateContent = async () => {
    if (!image) return;
    if (!useCredits(2)) return;

    setContentLoading(true);
    try {
      const base64Data = image.split(',')[1];
      const data = await analyzeProductImage(base64Data);
      setGeneratedContent(data);
    } catch (error) {
      console.error(error);
      alert('Gagal membuat konten teks.');
    } finally {
      setContentLoading(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,_rgba(99,102,241,0.08),_rgba(168,85,247,0.05),_rgba(15,23,42,1))] animate-[pulse_10s_infinite_alternate]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 md:py-10">
        <div className="mb-8 md:mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black mb-2 flex items-center justify-center md:justify-start gap-4 text-white">
              <Sparkles className="text-indigo-400" />
              Magic Studio
            </h2>
            <p className="text-xs md:text-sm text-slate-400 font-medium italic">Sulap foto produk biasa jadi estetik dalam hitungan detik.</p>
          </div>
          <div className="hidden md:flex items-center gap-3 px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl">
             <Tag size={16} className="text-indigo-400" />
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Biaya Sulap Latar:</p>
             <span className="text-xs font-black text-white px-2 py-1 bg-indigo-600 rounded-lg shadow-lg">15 KREDIT</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Left Panel: Controls */}
          <div className="lg:col-span-5 space-y-5 md:space-y-6">
            <div className={`bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-6 shadow-2xl relative transition-all duration-500 ${showSuccess && !loading ? 'ring-2 ring-indigo-500/30' : ''}`}>
              <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">1. Unggah Produk</p>
              {!image ? (
                <div onClick={() => fileInputRef.current?.click()} className="w-full aspect-square border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-[1.5rem] md:rounded-[2rem] flex flex-col items-center justify-center cursor-pointer transition-all bg-slate-950/40 group p-10 md:p-12">
                  <Upload size={32} className="text-slate-600 mb-4 group-hover:text-indigo-400" />
                  <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] text-center">Pilih Foto Produk</span>
                </div>
              ) : (
                <div className="relative aspect-square rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-2 border-slate-800 shadow-2xl group">
                  <img src={image} className="w-full h-full object-cover" alt="Original" />
                  <div className="absolute inset-0 bg-black/40 md:opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button onClick={() => fileInputRef.current?.click()} className="p-3 md:p-4 bg-white text-slate-900 rounded-full hover:scale-110 shadow-xl"><Wand size={18}/></button>
                    <button onClick={() => {setImage(null); setResult(null); setGeneratedContent(null);}} className="p-3 md:p-4 bg-red-500 text-white rounded-full hover:scale-110 shadow-xl"><Trash2 size={18}/></button>
                  </div>
                </div>
              )}
              <input type="file" hidden ref={fileInputRef} onChange={handleFileUpload} accept="image/*" />
            </div>

            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-6 shadow-2xl">
              <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-4">
                <Palette size={14} className="text-indigo-400" /> 2. Pilih Preset Studio
              </p>
              
              <div className="grid grid-cols-2 gap-2 max-h-[140px] md:max-h-[160px] overflow-y-auto pr-1 mb-4 md:mb-6 scrollbar-thin">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {setSelectedCategory(cat.id); setSelectedPreset(null);}}
                    className={`p-2.5 md:p-3 rounded-xl border text-left transition-all flex items-center gap-2 md:gap-3 ${
                      selectedCategory === cat.id ? 'bg-indigo-600/10 border-indigo-500 shadow-lg' : 'bg-slate-800/40 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <cat.icon size={14} className={selectedCategory === cat.id ? 'text-indigo-400' : 'text-slate-600'} />
                    <span className={`text-[9px] md:text-[10px] font-black uppercase truncate ${selectedCategory === cat.id ? 'text-white' : 'text-slate-400'}`}>{cat.name}</span>
                  </button>
                ))}
              </div>

              <div className="max-h-[200px] md:max-h-[300px] overflow-y-auto pr-1 space-y-2 scrollbar-thin mb-4">
                {visiblePresets.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPreset(p.id)}
                    className={`w-full px-4 py-3 rounded-xl border transition-all text-left flex items-center justify-between animate-in fade-in slide-in-from-top-1 duration-300 ${
                      selectedPreset === p.id ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl' : 'bg-slate-800/40 border-slate-700 text-slate-500 hover:border-slate-500'
                    }`}
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest truncate pr-2">{p.name}</span>
                    {selectedPreset === p.id ? <Zap size={12} className="text-indigo-300 shrink-0" /> : <ChevronRight size={12} className="text-slate-700 shrink-0" />}
                  </button>
                ))}

                {filteredPresets.length > visibleCount && (
                  <button 
                    onClick={loadMore}
                    className="w-full py-4 bg-indigo-500/5 border border-dashed border-indigo-500/20 rounded-xl text-indigo-400 text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500/10 transition-all flex items-center justify-center gap-2 mt-2 active:scale-95 shadow-sm"
                  >
                    <Plus size={14} /> Lihat Lebih Banyak ({filteredPresets.length - visibleCount})
                  </button>
                )}
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800">
                <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <MessageSquareCode size={14} className="text-indigo-400" /> 3. Perintah Khusus (Opsional)
                </p>
                <textarea 
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Tambahkan detail seperti asap, neon, atau latar khusus..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-[11px] text-white placeholder:text-slate-800 outline-none focus:border-indigo-500 transition-all min-h-[80px] resize-none"
                />
              </div>
            </div>

            <button 
              onClick={handleMagic} 
              disabled={!image || loading} 
              className="w-full py-5 md:py-6 magix-gradient rounded-2xl font-black text-sm md:text-lg text-white shadow-xl disabled:opacity-50 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-3 uppercase tracking-tighter"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Wand2 />}
              {loading ? 'Sihir Berjalan...' : 'Sulap Foto (15 Cr)'}
            </button>
          </div>

          {/* Right Panel: Result Area */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-[2rem] md:rounded-[3rem] p-5 md:p-8 min-h-[400px] md:min-h-[600px] flex flex-col items-center justify-center relative shadow-2xl overflow-hidden">
              {result ? (
                <div className="w-full h-full flex flex-col items-center justify-center animate-success-pop z-10 p-2">
                  <div className="relative group max-w-full">
                    <img src={result} className="max-w-full max-h-[350px] md:max-h-[400px] object-contain rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl border-4 border-white/5 mb-6" alt="Result" />
                    <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[8px] font-black px-3 py-1 rounded-full shadow-lg">RENDERED BY MAGIX AI</div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mb-8">
                    <button onClick={() => { const l = document.createElement('a'); l.href = result; l.download = 'magix-studio.png'; l.click(); }} className="flex-1 px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl hover:scale-105 active:scale-95 transition-all">
                      <Download size={18} /> Simpan Foto
                    </button>
                    <button onClick={handleGenerateContent} disabled={contentLoading} className="flex-1 px-8 py-4 bg-slate-800 border border-slate-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl hover:scale-105 active:scale-95 transition-all">
                      {contentLoading ? <Loader2 className="animate-spin" size={16} /> : <FileText size={16} className="text-indigo-400" />}
                      Deskripsi AI (2 Cr)
                    </button>
                  </div>

                  {generatedContent && (
                    <div className="w-full bg-slate-950/80 border border-slate-800 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-2">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2"><Sparkles size={12}/> SEO Title Rekomendasi</span>
                          <button onClick={() => copyToClipboard(generatedContent.title, 'title')} className="text-slate-500 hover:text-white transition-colors">
                            {copied === 'title' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                          </button>
                        </div>
                        <p className="text-[11px] md:text-sm font-bold text-white leading-tight">{generatedContent.title}</p>
                      </div>
                      <div className="pt-4 border-t border-slate-800/50">
                         <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-3">Target Tags</p>
                         <div className="flex flex-wrap gap-2">
                            {generatedContent.tags.map(t => <span key={t} className="px-2 py-1 bg-slate-900 rounded-lg text-[9px] text-slate-400 font-bold">#{t}</span>)}
                         </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : loading ? (
                <MagicLoadingOverlay 
                  title="Merender Visual AI..." 
                  subtitles={[
                    "Menganalisis Geometri Produk...",
                    "Menyesuaikan Pencahayaan Preset...",
                    "Harmonisasi Bayangan Ray-Traced...",
                    "Menghitung Masking Pixel-Perfect...",
                    "Membangun Realisme Studio...",
                    "Finalisasi Estetika Katalog..."
                  ]} 
                />
              ) : (
                <div className="flex flex-col items-center gap-4 opacity-30 text-center px-10">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-950 rounded-[2.5rem] border-4 border-dashed border-slate-800 flex items-center justify-center">
                    <Camera size={64} className="text-slate-800" />
                  </div>
                  <h3 className="text-lg md:text-2xl font-black text-slate-700 uppercase tracking-[0.3em]">Studio Preview Area</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagicStudio;
