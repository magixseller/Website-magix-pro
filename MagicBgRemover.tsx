
import React, { useState, useRef } from 'react';
import { Upload, Trash2, Loader2, Download, Scissors, Sparkles, Image as ImageIcon, Zap, Info } from 'lucide-react';
import { removeImageBackground } from '../services/geminiService';

interface MagicBgRemoverProps {
  useCredits: (amount: number) => boolean;
}

const MagicBgRemover: React.FC<MagicBgRemoverProps> = ({ useCredits }) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveBg = async () => {
    if (!image) return;
    if (!useCredits(5)) return;

    setLoading(true);
    try {
      const base64Data = image.split(',')[1];
      const res = await removeImageBackground(base64Data);
      setResult(res);
    } catch (error) {
      console.error(error);
      alert('Gagal menghapus background. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h2 className="text-3xl md:text-5xl font-black mb-3 flex items-center gap-4 text-white">
          <Scissors className="text-emerald-400" />
          Magic BG Remover
        </h2>
        <p className="text-slate-400 font-medium italic">Hapus latar belakang foto produk sekompleks apapun hanya dalam 1 detik.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">1. Unggah Foto Produk</p>
            {!image ? (
              <div onClick={() => fileInputRef.current?.click()} className="w-full aspect-square border-2 border-dashed border-slate-800 hover:border-emerald-500/50 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer transition-all bg-slate-950/40 p-12 text-center">
                <Upload size={48} className="text-slate-700 mb-4 group-hover:text-emerald-400 transition-transform" />
                <p className="text-sm font-black text-white uppercase tracking-widest">Pilih Gambar</p>
                <p className="text-[10px] text-slate-600 mt-2">Format: JPG, PNG, WEBP</p>
              </div>
            ) : (
              <div className="relative aspect-square rounded-[2rem] overflow-hidden border-2 border-slate-800 bg-slate-950">
                <img src={image} className="w-full h-full object-contain" alt="Preview" />
                <button onClick={() => {setImage(null); setResult(null);}} className="absolute top-4 right-4 p-3 bg-red-500 text-white rounded-full shadow-xl hover:scale-110"><Trash2 size={18}/></button>
              </div>
            )}
            <input type="file" hidden ref={fileInputRef} onChange={handleFileUpload} accept="image/*" />
          </div>

          <button 
            onClick={handleRemoveBg} 
            disabled={!image || loading} 
            className="w-full py-5 magix-gradient rounded-2xl font-black text-lg text-white shadow-xl disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Zap />}
            {loading ? 'MENGHAPUS BACKGROUND...' : 'HAPUS BACKGROUND (5 KREDIT)'}
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-6 flex flex-col items-center justify-center relative shadow-2xl overflow-hidden bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.05),_transparent)]">
          {result ? (
            <div className="w-full h-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-500">
               <div className="relative bg-[url('https://www.transparenttextures.com/patterns/checkerboard.png')] bg-repeat rounded-[2rem] overflow-hidden border-4 border-white/5 p-4 mb-8">
                  <img src={result} className="max-w-full max-h-[450px] object-contain" alt="Transparent Result" />
                  <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[9px] font-black px-3 py-1 rounded-full shadow-lg">TRANS-PNG READY</div>
               </div>
               <button onClick={() => { const l = document.createElement('a'); l.href = result; l.download = 'magix-no-bg.png'; l.click(); }} className="px-10 py-4 bg-white text-slate-950 font-black rounded-2xl flex items-center gap-3 hover:bg-emerald-50 transition-all shadow-2xl">
                 <Download size={20} /> SIMPAN PNG TRANSPARAN
               </button>
            </div>
          ) : loading ? (
            <div className="flex flex-col items-center gap-6">
              <div className="magic-loader"></div>
              <p className="text-white font-black text-xl italic animate-pulse">Memisahkan Objek...</p>
            </div>
          ) : (
            <div className="text-center space-y-6 opacity-20">
              <ImageIcon size={80} className="mx-auto text-slate-700" />
              <p className="text-sm font-black text-slate-700 uppercase tracking-[0.3em]">Hasil Transparan Muncul Di Sini</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MagicBgRemover;
