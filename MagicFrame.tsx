
import React, { useState, useRef } from 'react';
import { 
  BoxSelect, Upload, Wand2, Download, Trash2, Loader2, ShoppingBag, 
  Zap, Check, Tag, DollarSign, Info, TrendingUp, ShieldCheck, 
  Type, Instagram, Facebook, Globe, Video, Star, Award, Sparkles
} from 'lucide-react';
import { editImageWithPrompt } from '../services/geminiService';

const FRAME_PRESETS = [
  { id: 'shopee', name: 'Shopee Style', color: 'bg-orange-500', icon: ShoppingBag, prompt: 'Apply a vibrant orange Shopee marketplace border with Flash Sale and COD badges.', strategy: 'Warna oranye Shopee yang ikonik. Meningkatkan kepercayaan pembeli di ekosistem Shopee.' },
  { id: 'tokopedia', name: 'Tokopedia Style', color: 'bg-green-500', icon: ShoppingBag, prompt: 'Apply a clean green Tokopedia frame with Power Merchant medal and Free Shipping badge.', strategy: 'Aura hijau yang menenangkan dan profesional. Sangat cocok untuk Tokopedia Power Merchant.' },
  { id: 'tiktok', name: 'TikTok Shop', color: 'bg-slate-900', icon: Video, prompt: 'Apply a TikTok Shop style frame with "Beli Sekarang" button and discount vouchers overlays.', strategy: 'Gaya TikTok Shop yang modern. Memicu interaksi cepat dan gaya bahasa "racun" belanja.' },
  { id: 'lazada', name: 'Lazada Pro', color: 'bg-indigo-600', icon: ShoppingBag, prompt: 'Apply a magenta and blue Lazada style border with "LazMall" verified badge.', strategy: 'Efek premium LazMall. Memperkuat kesan bahwa produk Anda adalah barang original dan bergaransi.' },
  { id: 'instagram', name: 'Instagram Ads', color: 'bg-pink-500', icon: Instagram, prompt: 'Apply a minimalist aesthetic Instagram feed border with a "Link in Bio" or "Shop Now" call to action overlay.', strategy: 'Desain bersih dan estetik untuk algoritma Instagram. Menghindari kesan "jualan keras" agar engagement tinggi.' },
  { id: 'facebook', name: 'FB Marketplace', color: 'bg-blue-600', icon: Facebook, prompt: 'Apply a blue Facebook Marketplace style frame with location pin and verified seller checkmark.', strategy: 'Fokus pada kepercayaan lokal. Cocok untuk produk yang membutuhkan transparansi lokasi dan kredibilitas.' },
  { id: 'limited', name: 'Limited Edition', color: 'bg-amber-500', icon: Award, prompt: 'Apply a luxury gold and black "Limited Edition" border with premium texture overlays.', strategy: 'Strategi Kelangkaan (Scarcity). Memberi kesan eksklusif dan mewah sehingga harga tinggi terasa masuk akal.' },
  { id: 'payday', name: 'Payday Sale', color: 'bg-purple-600', icon: DollarSign, prompt: 'Apply a neon blue and purple Payday Sale frame with glowing effects and money emojis.', strategy: 'Meledakkan konversi di tanggal gajian. Visual yang mencolok mata saat scrolling di jam sibuk.' },
];

const MagicFrame: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [selectedFrame, setSelectedFrame] = useState(FRAME_PRESETS[0].id);
  
  const [normalPrice, setNormalPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [customText, setCustomText] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleApplyFrame = async () => {
    if (!image) return;
    setLoading(true);
    setResult(null);
    try {
      const preset = FRAME_PRESETS.find(p => p.id === selectedFrame);
      
      // Constructing detailed prompt for the AI
      let customTextPart = "";
      if (customText.trim()) {
        customTextPart = `OVERLAY CUSTOM TEXT: Place the phrase "${customText}" in a professional font that matches the frame style. Place it in a highly visible but balanced area.`;
      }

      const pricingPart = `
        PRICE OVERLAY: 
        1. Place a prominent PROMO PRICE: "${discountPrice}" in a bold, professional badge (typically bottom area).
        2. Place a smaller NORMAL PRICE: "${normalPrice}" with a clear strikethrough effect next to the promo price.
      `;

      const finalPrompt = `
        ${preset?.prompt}
        ${pricingPart}
        ${customTextPart}
        The typography must be ultra-clean, sharp, and align with global e-commerce design standards. Ensure the product remains the center of focus.
      `;

      const base64Data = image.split(',')[1];
      const resultImage = await editImageWithPrompt(base64Data, finalPrompt, "1:1");
      if (resultImage) setResult(resultImage);
    } catch (error) {
      console.error(error);
      alert('Gagal menerapkan bingkai magic. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-black mb-3 flex items-center justify-center md:justify-start gap-4 text-white">
          <BoxSelect className="text-emerald-400" size={48} />
          Magic Frame
        </h2>
        <p className="text-slate-400 font-medium italic">Optimasi konversi katalog dengan bingkai marketplace dan label harga profesional.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
        {/* Left Control Panel */}
        <div className="lg:col-span-4 space-y-6">
          {/* Step 1: Upload */}
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 shadow-2xl">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">1. Sumber Foto Utama</p>
            <div onClick={() => fileInputRef.current?.click()} className="w-full aspect-square border-2 border-dashed border-slate-800 rounded-3xl flex items-center justify-center cursor-pointer bg-slate-950/40 hover:border-emerald-500/50 transition-all overflow-hidden relative group">
              {image ? (
                <>
                  <img src={image} className="w-full h-full object-cover" alt="Upload Preview" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Upload className="text-white" size={32} />
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <Upload className="text-slate-600 mx-auto mb-2" size={32} />
                  <p className="text-[9px] font-black text-slate-600 uppercase">Klik Upload</p>
                </div>
              )}
            </div>
            <input type="file" hidden ref={fileInputRef} onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                  setImage(ev.target?.result as string);
                  setResult(null);
                };
                reader.readAsDataURL(file);
              }
            }} accept="image/*" />
          </div>

          {/* Step 2: Custom Text & Pricing */}
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 shadow-2xl space-y-5">
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Type size={14} className="text-indigo-400" /> 2. Kalimat Kustom (Opsional)
              </p>
              <input 
                type="text" 
                value={customText} 
                onChange={(e) => setCustomText(e.target.value)} 
                placeholder="Contoh: Gratis Ongkir, Ready Stock, dsb..." 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-xs text-white outline-none focus:border-indigo-500 transition-all" 
              />
            </div>

            <div className="pt-2">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Tag size={14} className="text-emerald-400" /> 3. Label Harga Jual
              </p>
              <div className="grid grid-cols-2 gap-3">
                <input 
                  type="text" 
                  value={normalPrice} 
                  onChange={(e) => setNormalPrice(e.target.value)} 
                  placeholder="Harga Coret" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-[10px] text-slate-500 line-through outline-none focus:border-slate-700" 
                />
                <input 
                  type="text" 
                  value={discountPrice} 
                  onChange={(e) => setDiscountPrice(e.target.value)} 
                  placeholder="Harga Promo" 
                  className="w-full bg-slate-950 border border-emerald-500/20 rounded-xl py-3 px-4 text-[11px] text-white font-bold outline-none focus:border-emerald-500" 
                />
              </div>
            </div>
          </div>

          {/* Step 3: Marketing Strategy */}
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 shadow-2xl">
             <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                   <TrendingUp size={12} className="text-indigo-400" /> 4. Strategi Marketplace
                </p>
             </div>
             <div className="grid grid-cols-1 gap-2 max-h-[320px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800">
               {FRAME_PRESETS.map(p => (
                 <button 
                  key={p.id}
                  onClick={() => setSelectedFrame(p.id)}
                  className={`flex flex-col gap-2 p-4 rounded-2xl border transition-all text-left ${selectedFrame === p.id ? 'bg-indigo-600/10 border-indigo-500 shadow-inner' : 'bg-slate-950 border-slate-800 hover:border-slate-600'}`}
                 >
                   <div className="flex items-center gap-3 w-full">
                      <div className={`w-8 h-8 rounded-lg ${p.color} flex items-center justify-center text-white shadow-lg`}><p.icon size={16}/></div>
                      <span className={`text-[10px] font-black uppercase tracking-tight ${selectedFrame === p.id ? 'text-white' : 'text-slate-500'}`}>{p.name}</span>
                      {selectedFrame === p.id && <ShieldCheck size={12} className="ml-auto text-emerald-400" />}
                   </div>
                   <p className={`text-[9px] leading-relaxed font-medium ${selectedFrame === p.id ? 'text-slate-300' : 'text-slate-600'}`}>{p.strategy}</p>
                 </button>
               ))}
             </div>
          </div>

          <button 
            onClick={handleApplyFrame} 
            disabled={!image || loading} 
            className="w-full py-5 magix-gradient rounded-[2rem] font-black text-lg text-white shadow-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 disabled:opacity-50 transition-all group"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Zap className="group-hover:animate-pulse" />}
            {loading ? 'MENYUSUN PIXEL...' : 'TERAPKAN BINGKAI MAGIC'}
          </button>
        </div>

        {/* Right Output Panel */}
        <div className="lg:col-span-8">
          <div className="bg-slate-900/60 border border-slate-800 rounded-[3.5rem] p-6 min-h-[600px] flex items-center justify-center relative shadow-2xl overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
            
            {result ? (
              <div className="text-center animate-in zoom-in-95 duration-700 w-full flex flex-col items-center">
                <div className="relative group/img">
                  <img src={result} className="max-w-full max-h-[600px] rounded-[2rem] shadow-2xl border-4 border-white/5" alt="Final Catalog Result" />
                  <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[9px] font-black px-4 py-1.5 rounded-full shadow-xl">MAGIC RENDER SUCCESS</div>
                </div>
                
                <div className="flex gap-4 mt-10">
                  <button onClick={() => {
                    const link = document.createElement('a');
                    link.href = result;
                    link.download = `Magix-Katalog-${selectedFrame}.png`;
                    link.click();
                  }} className="px-10 py-4 bg-white text-slate-950 font-black rounded-2xl flex items-center gap-3 hover:bg-emerald-50 transition-all shadow-2xl">
                    <Download size={20} /> SIMPAN KATALOG HD
                  </button>
                  <button onClick={() => setResult(null)} className="px-6 py-4 bg-slate-800 text-slate-400 font-bold rounded-2xl hover:text-white transition-colors">
                    Reset
                  </button>
                </div>
              </div>
            ) : loading ? (
              <div className="text-center space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin mx-auto"></div>
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-400 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <p className="text-white font-black text-2xl italic tracking-tight uppercase">Baking Visual AI...</p>
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Rendering Marketplace Assets</p>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6 opacity-20 group-hover:opacity-30 transition-opacity">
                <div className="w-32 h-32 bg-slate-800 rounded-[2.5rem] flex items-center justify-center mx-auto border-2 border-dashed border-slate-700">
                  <ShoppingBag size={64} className="text-slate-600" />
                </div>
                <p className="text-sm font-black text-slate-700 uppercase tracking-[0.3em]">Studio Preview Area</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 mt-12 text-center relative overflow-hidden group">
         <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full" />
         <Zap className="mx-auto mb-6 text-amber-400 animate-pulse" size={40} />
         <h3 className="text-2xl font-black text-white italic mb-4">Tips Marketing: Efek Bingkai</h3>
         <p className="text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed font-medium text-sm">
           Gunakan bingkai yang kontras dengan warna dominan marketplace. Jika Shopee didominasi Oranye, gunakan bingkai dengan label "Limited" yang memiliki aksen Emas untuk menonjol di halaman pencarian.
         </p>
         <div className="flex items-center justify-center gap-8 opacity-40">
           <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400"/> <span className="text-[9px] font-bold uppercase text-white">Conversion Booster</span></div>
           <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400"/> <span className="text-[9px] font-bold uppercase text-white">SEO Optimized</span></div>
           <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400"/> <span className="text-[9px] font-bold uppercase text-white">Batch Processing</span></div>
         </div>
      </div>
    </div>
  );
};

export default MagicFrame;
