
import React, { useState } from 'react';
import { Library, BookOpen, Download, Search, Star, Bookmark, Filter, ChevronRight, Info, Sparkles, Loader2, BrainCircuit } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Ebook {
  id: string;
  title: string;
  author: string;
  desc: string;
  category: string;
  rating: number;
  cover: string;
  pages: number;
}

const EBOOKS: Ebook[] = [
  {
    id: '1',
    title: 'Mastering Shopee Algorithm 2025',
    author: 'Magix Strategy Team',
    desc: 'Panduan lengkap cara hack algoritma terbaru agar produk Anda selalu muncul di halaman pertama tanpa iklan mahal.',
    category: 'SEO',
    rating: 4.9,
    pages: 124,
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop'
  },
  {
    id: '2',
    title: 'The Viral TikTok Shop Playbook',
    author: 'Creative Magix',
    desc: 'Rahasia membuat konten video pendek yang memicu checkout impulsif dari jutaan audiens TikTok.',
    category: 'Viral Strategy',
    rating: 4.8,
    pages: 89,
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop'
  },
  {
    id: '3',
    title: 'Psychology of High-Conversion Design',
    author: 'UI/UX Magix Experts',
    desc: 'Bagaimana layout, warna, dan font foto produk memengaruhi keputusan otak bawah sadar pembeli.',
    category: 'Design',
    rating: 5.0,
    pages: 156,
    cover: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=600&fit=crop'
  },
  {
    id: '4',
    title: 'Copywriting That Sells (No BS)',
    author: 'Magix Copy Team',
    desc: 'Teknik menulis deskripsi produk yang menghipnotis dan mengatasi keraguan pembeli dalam hitungan detik.',
    category: 'Marketing',
    rating: 4.7,
    pages: 72,
    cover: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop'
  },
  {
    id: '5',
    title: 'Marketplace Ads: Low CPA Strategy',
    author: 'Ads Optimization Lab',
    desc: 'Cara setting iklan di Shopee & Tokopedia dengan budget minimal tapi ROI (Return on Investment) maksimal.',
    category: 'Paid Ads',
    rating: 4.9,
    pages: 110,
    cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=600&fit=crop'
  },
  {
    id: '6',
    title: 'Building a 7-Figure Brand From Home',
    author: 'Magix Founders',
    desc: 'Kisah nyata dan blueprint teknis membangun brand lokal dari skala rumahan hingga omset miliaran.',
    category: 'Business',
    rating: 4.8,
    pages: 204,
    cover: 'https://images.unsplash.com/photo-1454165833767-027ffea9e77b?w=400&h=600&fit=crop'
  },
];

const MagicLibrary: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [summarizingId, setSummarizingId] = useState<string | null>(null);
  const [aiSummary, setAiSummary] = useState<{id: string, text: string} | null>(null);

  const categories = ['All', ...new Set(EBOOKS.map(e => e.category))];
  
  const filteredEbooks = EBOOKS.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.desc.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || e.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSmartSummary = async (ebook: Ebook) => {
    setSummarizingId(ebook.id);
    setAiSummary(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide a very brief (2 sentences) professional selling summary of why a marketplace seller MUST read a book titled "${ebook.title}". The book is about: ${ebook.desc}. Focus on ROI and efficiency. Language: Indonesian.`,
      });
      setAiSummary({ id: ebook.id, text: response.text || 'Gagal merumuskan ringkasan.' });
    } catch (error) {
      console.error(error);
      setAiSummary({ id: ebook.id, text: "Gagal menghubungkan AI Studio. Coba lagi nanti." });
    } finally {
      setSummarizingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-0 py-4 md:py-8">
      <div className="mb-10 px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-black mb-2 flex items-center justify-center md:justify-start gap-4 text-white">
            <Library className="text-indigo-400" />
            Magic Library
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-sm md:text-lg text-slate-400 font-medium italic">Blueprint eksklusif untuk mendominasi marketplace.</p>
            <div className="group relative">
              <Info size={14} className="text-slate-600 cursor-help" />
              <div className="absolute bottom-full left-0 mb-2 w-56 p-3 bg-slate-800 text-[9px] text-slate-300 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 border border-slate-700 shadow-2xl leading-relaxed">
                Library ini berisi panduan teknis yang disusun oleh praktisi e-commerce berpengalaman untuk membantu Anda menskalakan bisnis secara organik maupun berbayar.
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative group flex-1 md:w-64">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-indigo-400 transition-colors" />
            <input 
              type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari blueprint..."
              className="w-full pl-12 pr-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
            />
          </div>
          <div className="relative md:w-48">
             <Filter size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
             <select 
               value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
               className="w-full pl-10 pr-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white outline-none appearance-none cursor-pointer font-black text-[10px] uppercase tracking-widest"
             >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
             </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 pb-20">
        {filteredEbooks.map((ebook) => (
          <div key={ebook.id} className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl hover:border-indigo-500/40 transition-all group relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[50px] rounded-full group-hover:bg-indigo-500/10 transition-all" />
            
            {/* Book Cover Container */}
            <div className="relative aspect-[3/4] overflow-hidden">
               <img src={ebook.cover} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-6 flex flex-col justify-end">
                  <span className="text-[10px] font-black text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full w-fit mb-3 uppercase tracking-widest border border-indigo-500/20">
                    {ebook.category}
                  </span>
                  <h3 className="text-xl font-black text-white leading-tight mb-1">{ebook.title}</h3>
                  <div className="flex items-center gap-2">
                     <div className="flex gap-0.5">
                        {Array(5).fill(0).map((_, i) => <Star key={i} size={10} className={i < Math.floor(ebook.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-600'} />)}
                     </div>
                     <span className="text-[10px] font-bold text-slate-400">{ebook.rating} / 5.0</span>
                  </div>
               </div>
               
               <button className="absolute top-4 right-4 p-3 bg-slate-900/60 backdrop-blur-md text-white rounded-xl border border-white/10 hover:bg-indigo-600 transition-all active:scale-95 shadow-xl">
                  <Bookmark size={18} />
               </button>
            </div>

            {/* Content Details */}
            <div className="p-6 flex-1 flex flex-col">
               <p className="text-xs text-slate-400 leading-relaxed font-medium mb-6 line-clamp-3">"{ebook.desc}"</p>
               
               {/* AI Summary Section */}
               {aiSummary?.id === ebook.id && (
                  <div className="mb-6 p-4 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl animate-in fade-in slide-in-from-top-2">
                     <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={12} className="text-indigo-400" />
                        <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">AI Smart Summary</span>
                     </div>
                     <p className="text-[10px] text-slate-300 font-medium italic">"{aiSummary.text}"</p>
                  </div>
               )}

               <div className="mt-auto space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 px-1">
                     <div className="flex items-center gap-2"><BookOpen size={12} /> {ebook.pages} Halaman</div>
                     <div>Magix Verified</div>
                  </div>
                  
                  <div className="flex gap-2">
                     <button 
                        onClick={() => handleSmartSummary(ebook)}
                        disabled={summarizingId === ebook.id}
                        className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                     >
                        {summarizingId === ebook.id ? <Loader2 size={14} className="animate-spin text-indigo-400" /> : <BrainCircuit size={14} className="text-indigo-400" />}
                        {summarizingId === ebook.id ? 'Thinking...' : 'Smart Summary'}
                     </button>
                     <button className="px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl shadow-xl shadow-indigo-600/20 active:scale-95 transition-all">
                        <Download size={18} />
                     </button>
                  </div>
               </div>
            </div>
          </div>
        ))}
        
        {/* Coming Soon Card */}
        <div className="bg-slate-900/40 border-2 border-dashed border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-8 min-h-[400px]">
           <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mb-6">
              <Sparkles size={32} className="text-slate-700 animate-pulse" />
           </div>
           <h4 className="text-sm font-black text-slate-600 uppercase tracking-[0.3em]">More Blueprints Incoming</h4>
           <p className="text-[10px] text-slate-700 font-bold uppercase mt-2">Curated monthly by e-commerce experts</p>
        </div>
      </div>
    </div>
  );
};

export default MagicLibrary;
