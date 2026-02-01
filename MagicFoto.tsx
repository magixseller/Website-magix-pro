
import React, { useState, useRef } from 'react';
import { 
  Upload, Sparkles, Wand2, Download, Trash2, Loader2, Image as ImageIcon, 
  Sun, Contrast, Droplets, Scissors, Layers, Check, Circle, Eye, 
  Maximize, Brush, Lightbulb, Zap, ShieldCheck, Columns, Palette, ArrowLeftRight, Info,
  Focus
} from 'lucide-react';
import { editImageWithPrompt } from '../services/geminiService';

const MagicFoto: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  
  // Adjustments
  const [brightness, setBrightness] = useState(50);
  const [contrast, setContrast] = useState(50);
  const [saturation, setSaturation] = useState(50);
  const [vignette, setVignette] = useState(0);
  const [sharpen, setSharpen] = useState(0);
  const [clarity, setClarity] = useState(50);
  const [exposure, setExposure] = useState(50);
  
  // AI Bokeh Tools
  const [bokehIntensity, setBokehIntensity] = useState(0);
  const [bokehRadius, setBokehRadius] = useState(20);
  
  // Quality Selection
  const [quality, setQuality] = useState<'standard' | 'hd' | 'maximum'>('hd');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        setImage(base64);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMagic = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const qualityInstruction = quality === 'maximum' 
        ? "Ensure ultra-high fidelity 4K resolution output with maximum AI upscaling." 
        : "Produce clean HD output.";

      const bokehInstruction = bokehIntensity > 0 
        ? `Apply a realistic professional optical bokeh (depth of field) with intensity ${bokehIntensity}% and blur radius ${bokehRadius}px. Focus sharply on the main product and naturally blur the background.`
        : "";

      const adjustmentPrompt = `
        Perform high-end professional photography post-processing:
        - Quality: ${qualityInstruction}
        - Exposure: ${exposure}%, Brightness: ${brightness}%, Contrast: ${contrast}%
        - Saturation: ${saturation}%, Clarity: ${clarity}%, Sharpening: ${sharpen}%
        - Vignette level: ${vignette}%
        ${bokehInstruction}
        Result must be ultra-clean, commercial-grade product photography.
      `;
      
      const base64Data = image.split(',')[1];
      const editedImageUrl = await editImageWithPrompt(base64Data, adjustmentPrompt);
      
      if (editedImageUrl) {
        setResult(editedImageUrl);
      }
    } catch (error) {
      console.error(error);
      alert('Gagal memproses foto.');
    } finally {
      setLoading(false);
    }
  };

  const AdjustmentSlider = ({ label, icon: Icon, value, setter, help, min = 0, max = 100 }: any) => (
    <div className="space-y-2">
      <div className="flex justify-between text-[11px] font-bold text-slate-400">
        <div className="flex items-center gap-2 group/help relative">
          <Icon size={12} className="text-blue-400" />
          <span>{label}</span>
          <Info size={10} className="text-slate-600 hover:text-blue-400 cursor-help" />
          <div className="absolute bottom-full left-0 mb-2 w-48 p-2 bg-slate-800 text-white text-[9px] rounded-lg opacity-0 group-hover/help:opacity-100 transition-opacity pointer-events-none z-50 border border-slate-700 shadow-xl leading-relaxed">
            {help}
          </div>
        </div>
        <span className="text-blue-400">{value}{max === 100 ? '%' : ''}</span>
      </div>
      <div className="relative h-4 flex items-center">
        <div className="absolute w-full h-1 bg-slate-800 rounded-full" />
        <div className="absolute h-1 bg-blue-500 rounded-full" style={{ width: `${((value - min) / (max - min)) * 100}%` }} />
        <input 
          type="range" min={min} max={max} value={value} 
          onChange={(e) => setter(parseInt(e.target.value))} 
          className="absolute w-full appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg" 
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black mb-3 flex items-center gap-3 text-white">
            <ImageIcon className="text-blue-400" />
            Magic Foto <span className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full uppercase tracking-tighter">Pro Editor</span>
          </h2>
          <p className="text-sm md:text-base text-slate-400 italic">Antarmuka editor kelas dunia untuk hasil katalog komersial.</p>
        </div>
        
        {result && (
          <div className="flex gap-2">
            <button 
              onClick={() => setComparisonMode(!comparisonMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                comparisonMode ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <Columns size={14} /> {comparisonMode ? 'Close Diff' : 'Compare'}
            </button>
            <a 
              href={result} 
              download="magix-pro-edit.png"
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg transition-all shimmer-effect"
            >
              <Download size={14} /> Simpan {quality.toUpperCase()}
            </a>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Focus size={14} className="text-fuchsia-400" /> AI Depth & Bokeh
            </h3>
            <div className="space-y-6">
              <AdjustmentSlider 
                label="Bokeh Intensity" icon={Circle} value={bokehIntensity} setter={setBokehIntensity} 
                help="Mengatur tingkat keburaman latar belakang untuk menonjolkan produk utama."
              />
              <AdjustmentSlider 
                label="Blur Radius" icon={Maximize} value={bokehRadius} setter={setBokehRadius} min={5} max={50}
                help="Mengatur seberapa halus transisi blur pada area di luar fokus."
              />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Layers size={14} className="text-blue-400" /> Precision Tuning
            </h3>
            <div className="space-y-6">
              <AdjustmentSlider label="Exposure" icon={Lightbulb} value={exposure} setter={setExposure} help="Mengontrol jumlah cahaya masuk." />
              <AdjustmentSlider label="Brightness" icon={Sun} value={brightness} setter={setBrightness} help="Kecerahan keseluruhan." />
              <AdjustmentSlider label="Contrast" icon={Contrast} value={contrast} setter={setContrast} help="Perbedaan area terang & gelap." />
              <AdjustmentSlider label="Saturation" icon={Droplets} value={saturation} setter={setSaturation} help="Intensitas warna." />
            </div>
          </div>

          <button 
            onClick={handleMagic}
            disabled={!image || loading}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl font-black text-lg text-white shadow-2xl disabled:opacity-50 transition-all flex items-center justify-center gap-4"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : <Wand2 size={24} />}
            PROSES EDITOR AI
          </button>
        </div>

        <div className="lg:col-span-8">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-4 flex flex-col items-center justify-center min-h-[500px] relative shadow-2xl">
            {!image && (
              <div onClick={() => fileInputRef.current?.click()} className="w-full h-full border-2 border-dashed border-slate-800 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer transition-all bg-slate-950/30 group p-12 text-center">
                <Upload size={40} className="text-slate-600 group-hover:text-blue-400 mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">Unggah Foto Produk</h4>
              </div>
            )}

            {image && (
              <div className="w-full h-full flex flex-col items-center justify-center p-4 relative">
                <div className="relative group max-w-full max-h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950">
                  {comparisonMode && result ? (
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                       <img src={result} className="max-w-full h-auto object-contain block" />
                      <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderValue}%`, borderRight: '2px solid white' }}>
                        <img src={image} className="w-full h-full object-contain absolute left-0" style={{ maxWidth: 'none', width: 'auto', height: '100%', objectFit: 'contain' }} />
                      </div>
                      <input type="range" min="0" max="100" value={sliderValue} onChange={(e) => setSliderValue(parseInt(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-xl z-30 pointer-events-none" style={{ left: `${sliderValue}%` }}>
                        <ArrowLeftRight size={16} className="text-slate-900" />
                      </div>
                    </div>
                  ) : (
                    <img src={result || image} className="max-w-full h-auto object-contain animate-in fade-in duration-500" />
                  )}
                  {loading && (
                    <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm z-30 flex flex-col items-center justify-center gap-6">
                      <div className="w-16 h-16 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin"></div>
                      <p className="text-white font-black text-xl italic animate-pulse">Menghitung Kedalaman Ruang...</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            <input type="file" hidden ref={fileInputRef} onChange={handleFileUpload} accept="image/*" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagicFoto;
