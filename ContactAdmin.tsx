
import React, { useState } from 'react';
import { 
  ShieldCheck, Smartphone, Globe, Clock, LogOut, 
  AlertTriangle, RefreshCw, MapPin, ShieldAlert,
  ChevronRight, ExternalLink, MessageCircle
} from 'lucide-react';

const ContactAdmin: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const activeDevices = [
    { id: 1, name: 'Chrome on Windows', ip: '182.1.xx.xx', location: 'Jakarta, ID', status: 'Online', current: true },
    { id: 2, name: 'Magix App on iPhone 15', ip: '110.2.xx.xx', location: 'Bandung, ID', status: 'Active 2h ago', current: false },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-10">
        <h2 className="text-3xl md:text-5xl font-black mb-3 text-white flex items-center gap-4">
          <ShieldCheck className="text-emerald-400" size={40} />
          Account Security
        </h2>
        <p className="text-slate-400">Kelola akses perangkat dan pastikan akun Anda tidak digunakan oleh orang lain secara ilegal.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full" />
             <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-black text-white uppercase tracking-widest">Daftar Perangkat Aktif</h3>
               <button onClick={handleRefresh} className={`p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all ${isRefreshing ? 'animate-spin' : ''}`}>
                 <RefreshCw size={18} />
               </button>
             </div>

             <div className="space-y-4">
               {activeDevices.map((device) => (
                 <div key={device.id} className={`p-5 rounded-2xl border flex items-center justify-between group transition-all ${device.current ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-slate-950 border-slate-800'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${device.current ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                        {device.name.includes('iPhone') ? <Smartphone size={24} /> : <Globe size={24} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-white">{device.name}</p>
                          {device.current && <span className="text-[8px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded-full uppercase">Sesi Ini</span>}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-3">
                          <span className="flex items-center gap-1"><MapPin size={10} /> {device.location}</span>
                          <span className="flex items-center gap-1"><Clock size={10} /> {device.status}</span>
                        </p>
                      </div>
                    </div>
                    {!device.current && (
                      <button className="px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2">
                        <LogOut size={14} /> Keluar
                      </button>
                    )}
                 </div>
               ))}
             </div>

             <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-3">
               <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={16} />
               <p className="text-[11px] text-amber-200/70 leading-relaxed font-medium">
                Peringatan: Berbagi akun dapat menyebabkan akun Anda ditangguhkan secara otomatis oleh sistem keamanan AI kami. Gunakan jatah kredit Anda secara bijak.
               </p>
             </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl">
            <h3 className="text-lg font-black text-white uppercase tracking-widest mb-6">Bantuan Admin</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="p-6 bg-emerald-600/10 border border-emerald-500/20 rounded-3xl text-left group hover:bg-emerald-600 transition-all">
                <MessageCircle size={32} className="text-emerald-400 group-hover:text-white mb-4" />
                <p className="font-black text-white uppercase text-xs tracking-widest mb-1">WhatsApp CS</p>
                <p className="text-[10px] text-slate-400 group-hover:text-emerald-100">Respon Cepat 24/7</p>
              </button>
              <button className="p-6 bg-indigo-600/10 border border-indigo-500/20 rounded-3xl text-left group hover:bg-indigo-600 transition-all">
                <ShieldAlert size={32} className="text-indigo-400 group-hover:text-white mb-4" />
                <p className="font-black text-white uppercase text-xs tracking-widest mb-1">Laporkan Masalah</p>
                <p className="text-[10px] text-slate-400 group-hover:text-indigo-100">Tiket Keamanan Akun</p>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-600/20">
            <ShieldCheck size={40} className="mb-6 opacity-50" />
            <h4 className="text-xl font-black mb-2 leading-tight">Keamanan Berlapis Magix AI</h4>
            <p className="text-sm text-indigo-100/70 leading-relaxed mb-6">
              Sistem kami memantau akses mencurigakan secara real-time untuk melindungi kredit Anda dari pencurian sesi.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-black bg-white/10 p-2 rounded-xl">
                <ChevronRight size={14} /> IP BINDING ACTIVE
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black bg-white/10 p-2 rounded-xl">
                <ChevronRight size={14} /> SESSION LOCK ACTIVE
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Butuh Kapasitas Lebih?</p>
            <h4 className="text-lg font-bold text-white mb-4">Paket Bisnis / Tim</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Jika Anda adalah Agency yang memiliki banyak admin, silakan upgrade ke paket Agency untuk fitur multi-user resmi.
            </p>
            <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-200 transition-all">
              LIHAT PAKET AGENCY <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactAdmin;
