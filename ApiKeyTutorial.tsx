
import React from 'react';
import { Key, MousePointer2, Copy, CheckCircle2, ShieldAlert, ExternalLink, ChevronRight, Info } from 'lucide-react';

const ApiKeyTutorial: React.FC = () => {
  const steps = [
    {
      title: "Kunjungi Google AI Studio",
      desc: "Buka browser dan login ke aistudio.google.com dengan Gmail Anda.",
      icon: ExternalLink,
      color: "text-blue-400"
    },
    {
      title: "Klik 'Get API Key'",
      desc: "Cari tombol dengan ikon kunci di sidebar sebelah kiri atas.",
      icon: MousePointer2,
      color: "text-indigo-400"
    },
    {
      title: "Buat Key Baru",
      desc: "Klik 'Create API key in new project' untuk menerbitkan kode rahasia.",
      icon: Key,
      color: "text-emerald-400"
    },
    {
      title: "Salin Kode AIza...",
      desc: "Klik tombol Copy pada kode yang muncul. Jangan bagikan kode ini ke siapapun!",
      icon: Copy,
      color: "text-amber-400"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
          <Key className="text-indigo-400" size={16} />
          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Panduan Pusat Energi AI</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter">
          Aktifkan <span className="magix-text-gradient">Sihir Magix.</span>
        </h2>
        <p className="text-slate-400 font-medium italic">Ikuti 4 langkah mudah untuk mendapatkan API Key dari Google secara gratis.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {steps.map((step, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl group hover:border-indigo-500/30 transition-all">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center shrink-0 border border-slate-800 group-hover:scale-110 transition-transform">
                <step.icon size={28} className={step.color} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-black text-slate-500 uppercase">Langkah {i + 1}</span>
                  <ChevronRight size={12} className="text-slate-700" />
                </div>
                <h4 className="text-xl font-black text-white mb-2 uppercase italic">{step.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{step.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-600 rounded-[3rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full" />
        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div className="w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center shrink-0 animate-pulse">
            <ShieldAlert size={48} />
          </div>
          <div>
            <h3 className="text-2xl font-black mb-4 uppercase italic">Penting: Keamanan Data</h3>
            <p className="text-indigo-100/70 text-sm leading-relaxed mb-6 font-medium">
              API Key adalah "nyawa" dari aplikasi ini. Jika kode ini tersebar, orang lain bisa menggunakan jatah kredit AI Anda. Pastikan Anda hanya memasukkannya di tempat yang aman.
            </p>
            <a 
              href="https://aistudio.google.com/" 
              target="_blank" 
              className="px-10 py-4 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-indigo-50 transition-all inline-flex items-center gap-3"
            >
              Buka Google AI Studio <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyTutorial;
