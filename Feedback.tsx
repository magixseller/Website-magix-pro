
import React, { useState } from 'react';
import { MessageSquare, Send, Heart, Star, CheckCircle } from 'lucide-react';

const Feedback: React.FC = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center animate-in zoom-in-95">
        <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-4xl font-black mb-4">Terima Kasih!</h2>
        <p className="text-slate-400 text-xl leading-relaxed">
          Kritik dan saranmu sangat berharga bagi perkembangan <span className="font-bold text-white">MAGIX Tool Seller</span>.
          Kami akan terus berbenah untuk memberikan layanan terbaik.
        </p>
        <button 
          onClick={() => setSent(false)}
          className="mt-10 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all"
        >
          Kirim Saran Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
          <MessageSquare className="text-indigo-400" />
          Kritik & Saran
        </h2>
        <p className="text-slate-400">Bantu kami menjadi lebih baik. Apa fitur yang kamu inginkan di update selanjutnya?</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Nama Lengkap</label>
            <input 
              type="text" 
              required
              className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Masukkan namamu..."
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Email</label>
            <input 
              type="email" 
              required
              className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="email@contoh.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Seberapa Puas Kamu dengan Magix?</label>
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} type="button" className="flex-1 py-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center text-slate-500 hover:text-amber-400 hover:border-amber-400 transition-all">
                <Star size={24} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Pesan / Saran Perbaikan</label>
          <textarea 
            required
            className="w-full h-40 p-6 bg-slate-950 border border-slate-800 rounded-3xl text-white outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            placeholder="Tuliskan pengalamanmu menggunakan tool kami atau fitur apa yang kamu butuhkan..."
          />
        </div>

        <button 
          type="submit"
          className="w-full py-5 magix-gradient rounded-2xl font-bold text-lg text-white shadow-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all"
        >
          Kirim Feedback Saya
          <Send size={20} />
        </button>
      </form>

      <div className="mt-12 text-center">
        <p className="text-slate-500 flex items-center justify-center gap-2">
          Made with <Heart size={16} className="text-red-500 fill-red-500" /> for Indonesia's Sellers
        </p>
      </div>
    </div>
  );
};

export default Feedback;
