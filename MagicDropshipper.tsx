
import React, { useState } from 'react';
import { 
  ShoppingCart, Search, Filter, TrendingUp, Download, Copy, 
  Check, Info, Heart, DollarSign, Package, ExternalLink,
  ChevronRight, ArrowRight, Star, Sparkles, Zap, ShieldCheck,
  Store, X, Eye, BarChart3, ArrowUpRight
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  shop: string;
  supplierPrice: number;
  marketPrice: number;
  stock: number;
  rating: number;
  image: string;
  description: string;
  whyWinning: string;
}

const DROPSHIP_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Smart Watch Series 9 Ultra',
    category: 'Electronics',
    shop: 'TechMaster ID',
    supplierPrice: 155000,
    marketPrice: 349000,
    stock: 124,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
    description: 'Smartwatch tercanggih 2024 dengan fitur monitor kesehatan lengkap, layar AMOLED, dan ketahanan baterai hingga 10 hari. Material titanium alloy yang sangat tahan banting.',
    whyWinning: 'Tren gaya hidup sehat meningkat 40% di Q1 2025. Produk ini memiliki margin profit di atas 100%.'
  },
  {
    id: '2',
    name: 'Minimalist Leather Wallet Pro',
    category: 'Fashion',
    shop: 'Luxe Leather',
    supplierPrice: 45000,
    marketPrice: 129000,
    stock: 890,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&h=800&fit=crop',
    description: 'Dompet kulit asli desain minimalis dengan perlindungan RFID. Slim fit untuk saku depan. Jahitan tangan super rapi.',
    whyWinning: 'Target market pria urban yang menyukai kepraktisan. Keyword "Dompet Slim" sedang naik di mesin pencari.'
  },
  {
    id: '3',
    name: 'Table Lamp Nordic Estetik',
    category: 'Home Decor',
    shop: 'LivingArt',
    supplierPrice: 125000,
    marketPrice: 275000,
    stock: 45,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=800&h=800&fit=crop',
    description: 'Lampu meja gaya Nordic dengan cahaya hangat. Cocok untuk dekorasi kamar aesthetic atau meja kerja profesional.',
    whyWinning: 'Produk kategori dekorasi kamar "Pinterest Style" selalu memiliki permintaan stabil sepanjang tahun.'
  },
  {
    id: '4',
    name: 'Wireless Bluetooth Headphone 7.1',
    category: 'Electronics',
    shop: 'TechMaster ID',
    supplierPrice: 210000,
    marketPrice: 450000,
    stock: 67,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
    description: 'Headphone dengan suara bass mendalam dan fitur noise cancelling aktif. Nyaman digunakan berjam-jam.',
    whyWinning: 'Tingginya aktivitas remote working dan gaming membuat produk audio berkualitas selalu dicari.'
  },
  {
    id: '5',
    name: 'Hydrating Face Serum Vitamin C',
    category: 'Beauty',
    shop: 'Glow Up Beauty',
    supplierPrice: 32000,
    marketPrice: 89000,
    stock: 2400,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=800&fit=crop',
    description: 'Serum pencerah wajah dengan kandungan Vitamin C murni 10%. Teruji klinis memudarkan noda hitam.',
    whyWinning: 'Repeat order (pembelian berulang) tinggi. Sangat cocok untuk funnel iklan Facebook Ads.'
  }
];

const MagicDropshipper: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['Semua Kategori', ...Array.from(new Set(DROPSHIP_PRODUCTS.map(p => p.category)))];

  const filteredProducts = DROPSHIP_PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua Kategori' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatIDR = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8 relative">
      {/* PREVIEW MODAL - FULLY RESPONSIVE */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in">
           <div className="bg-slate-900 border border-slate-800 w-full max-w-5xl max-h-[95vh] md:max-h-[90vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
              <button 
                onClick={() => setSelectedProduct(null)} 
                className="absolute top-4 right-4 md:top-6 md:right-6 z-30 p-2 md:p-3 bg-slate-800/80 backdrop-blur-md text-white rounded-full hover:bg-red-500 transition-all shadow-xl border border-white/10"
              >
                <X size={20} />
              </button>

              {/* Left: Product Visual */}
              <div className="w-full md:w-1/2 h-64 sm:h-80 md:h-auto bg-slate-950 relative overflow-hidden">
                 <img src={selectedProduct.image} className="w-full h-full object-cover" alt={selectedProduct.name} />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
                 <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex items-center gap-3">
                    <div className="bg-emerald-500 text-white text-[9px] md:text-[10px] font-black px-3 py-1.5 md:px-4 md:py-2 rounded-xl shadow-2xl flex items-center gap-2">
                       <Zap size={14} className="fill-white" /> WINNING PRODUCT
                    </div>
                 </div>
              </div>

              {/* Right: Info & Actions */}
              <div className="w-full md:w-1/2 p-6 md:p-12 overflow-y-auto bg-slate-900">
                 <div className="mb-6 md:mb-8">
                    <div className="flex items-center flex-wrap gap-2 mb-2">
                       <span className="text-[9px] md:text-[10px] font-black text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full uppercase tracking-widest border border-indigo-500/20">{selectedProduct.category}</span>
                       <div className="flex gap-0.5 ml-2">
                          {Array(5).fill(0).map((_, i) => <Star key={i} size={10} className={i < Math.floor(selectedProduct.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-700'} />)}
                       </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3 md:mb-4">{selectedProduct.name}</h3>
                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-medium italic">"{selectedProduct.description}"</p>
                 </div>

                 <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                    <div className="p-4 md:p-5 bg-slate-950 border border-slate-800 rounded-2xl md:rounded-[2rem]">
                       <p className="text-[8px] md:text-[9px] font-black text-slate-500 uppercase mb-1">Harga Modal</p>
                       <p className="text-lg md:text-xl font-black text-white">{formatIDR(selectedProduct.supplierPrice)}</p>
                    </div>
                    <div className="p-4 md:p-5 bg-indigo-600/10 border border-indigo-500/30 rounded-2xl md:rounded-[2rem]">
                       <p className="text-[8px] md:text-[9px] font-black text-indigo-400 uppercase mb-1">Potensi Jual</p>
                       <p className="text-lg md:text-xl font-black text-white">{formatIDR(selectedProduct.marketPrice)}</p>
                    </div>
                 </div>

                 <div className="mb-6 md:mb-8 p-5 md:p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl md:rounded-[2rem] relative overflow-hidden group">
                    <Sparkles className="absolute -top-2 -right-2 text-emerald-500/10 group-hover:scale-125 transition-transform" size={60} />
                    <p className="text-[9px] md:text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2 md:mb-3 flex items-center gap-2">
                       <BarChart3 size={14} /> AI Insight: Kenapa Winning?
                    </p>
                    <p className="text-[11px] md:text-xs text-slate-300 leading-relaxed font-medium relative z-10">{selectedProduct.whyWinning}</p>
                 </div>

                 <div className="flex gap-3 md:gap-4">
                    <button className="flex-1 py-4 md:py-5 magix-gradient rounded-xl md:rounded-2xl font-black text-[11px] md:text-sm uppercase tracking-widest text-white shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3">
                       <Download size={18} className="md:size-5" /> Ambil Katalog
                    </button>
                    <button 
                      onClick={() => handleCopy(selectedProduct.description, selectedProduct.id)}
                      className="px-5 md:px-6 py-4 md:py-5 bg-slate-800 text-white rounded-xl md:rounded-2xl hover:bg-slate-700 transition-all flex items-center justify-center border border-white/5"
                    >
                       {copiedId === selectedProduct.id ? <Check className="text-emerald-400" /> : <Copy className="size-5 md:size-6" />}
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="mb-10 px-2 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-1 flex items-center gap-3 md:gap-4 text-white">
            <ShoppingCart className="text-indigo-400 shrink-0" size={40} />
            Magic Dropshipper
          </h2>
          <p className="text-slate-400 text-sm md:text-lg font-medium italic">Katalog produk juara dengan potensi profit tinggi untuk Anda.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative group flex-1 lg:min-w-[320px]">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
            <input 
              type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari harta karun jualanmu..."
              className="w-full pl-14 pr-6 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
            />
          </div>
          
          <select 
             value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
             className="px-6 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none appearance-none cursor-pointer font-black text-[10px] uppercase tracking-widest"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* PRODUCT GRID - SMALLER CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-6 mb-24">
        {filteredProducts.map((product) => {
          const profit = product.marketPrice - product.supplierPrice;
          const profitMargin = Math.round((profit / product.marketPrice) * 100);

          return (
            <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-2xl md:rounded-[2rem] overflow-hidden flex flex-col shadow-xl hover:border-indigo-500/40 transition-all group relative animate-in fade-in zoom-in-95">
              <div className="relative aspect-square overflow-hidden bg-slate-950">
                 <img src={product.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" alt={product.name} />
                 
                 <div className="absolute top-2 right-2 md:top-4 md:right-4">
                    <div className="bg-emerald-500 text-white text-[8px] md:text-[9px] font-black px-2 py-1 md:px-3 md:py-1.5 rounded-lg md:rounded-xl shadow-2xl flex items-center gap-1">
                       <TrendingUp size={8} className="md:size-[10px]" /> {profitMargin}%
                    </div>
                 </div>

                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center p-4 text-center">
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="px-4 py-2 bg-white text-slate-950 rounded-xl font-black text-[8px] md:text-[9px] uppercase tracking-widest flex items-center gap-2 hover:scale-110 transition-all shadow-2xl whitespace-nowrap"
                    >
                       <Eye size={14} /> Preview Detail
                    </button>
                 </div>
              </div>

              <div className="p-4 md:p-5 flex-1 flex flex-col">
                 <div className="flex items-center justify-between mb-2">
                    <span className="text-[8px] md:text-[9px] font-black text-slate-500 uppercase tracking-widest">{product.category}</span>
                 </div>

                 <h4 className="text-xs md:text-sm font-black text-slate-200 mb-3 leading-tight group-hover:text-white transition-colors line-clamp-1">
                   {product.name}
                 </h4>

                 <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between items-center text-[8px] md:text-[9px]">
                       <span className="text-slate-500 font-bold uppercase tracking-widest">Modal</span>
                       <span className="text-slate-400 font-black">{formatIDR(product.supplierPrice)}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] md:text-[11px] bg-indigo-500/5 p-2 rounded-lg border border-indigo-500/10">
                       <span className="text-indigo-400 font-black uppercase tracking-widest">Jual</span>
                       <span className="text-white font-black">{formatIDR(product.marketPrice)}</span>
                    </div>
                 </div>

                 <div className="mt-auto pt-3 border-t border-slate-800/50 flex items-center justify-between gap-2">
                    <button 
                       onClick={() => setSelectedProduct(product)}
                       className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[8px] md:text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all border border-white/5"
                    >
                       DETAIL <ArrowUpRight size={12} />
                    </button>
                    <button 
                       onClick={() => handleCopy(product.description, product.id)}
                       className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:bg-indigo-600 hover:text-white transition-all shadow-inner border border-white/5"
                    >
                       {copiedId === product.id ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                 </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 text-center relative overflow-hidden group mx-2">
         <div className="absolute inset-0 aura-effect opacity-5" />
         <Zap className="mx-auto mb-4 md:mb-6 text-amber-400 animate-pulse" size={40} />
         <h3 className="text-2xl md:text-3xl font-black text-white italic mb-3 md:mb-4">Butuh Riset Produk Custom?</h3>
         <p className="text-slate-500 text-xs md:text-sm max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed font-medium">Tim riset kami siap membantu Anda mencari supplier tangan pertama untuk kategori produk spesifik Anda.</p>
         <button className="px-8 py-4 md:px-10 md:py-5 magix-gradient rounded-xl md:rounded-2xl font-black text-[11px] md:text-sm uppercase tracking-widest text-white shadow-xl hover:scale-105 transition-all">REQUES RISET WINNING</button>
      </div>
    </div>
  );
};

export default MagicDropshipper;
