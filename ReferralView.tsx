
import React, { useState } from 'react';
import { 
  Users, Gift, Copy, Check, Share2, 
  TrendingUp, Award, Zap, Heart, 
  ChevronRight, Info, Rocket, Coins, Star
} from 'lucide-react';
import { UserAccount } from '../types';

interface ReferralViewProps {
  user: UserAccount;
  onClaim: () => void;
}

const ReferralView: React.FC<ReferralViewProps> = ({ user, onClaim }) => {
  const [copied, setCopied] = useState(false);
  
  const referralCode = user.referralCode || "MAGIX-PROMO";
  const refData = user.referralData || { totalFriends: 0, successfulUpgrades: 0, claimedCredits: 0 };
  
  const bonusPerUpgrade = 50;
  const totalEarned = refData.successfulUpgrades * bonusPerUpgrade;
  const pendingAmount = totalEarned - refData.claimedCredits;

  const stats = [
    { label: 'Teman Bergabung', value: refData.totalFriends.toString(), icon: Users, color: 'text-indigo-400' },
    { label: 'Total Upgrade', value: refData.successfulUpgrades.toString(), icon: Star, color: 'text-emerald-400' },
    { label: 'Kredit Didapat', value: totalEarned.toString(), icon: Zap, color: 'text-amber-400' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(`Pakai AI sakti ini buat jualan! Daftar dengan kode ${referralCode} dan dapatkan bonus 50 Kredit: https://magixseller.com/register`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
           <Gift className="text-indigo-400" size={16} />
           <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Program Bagi-Bagi Kredit</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1]">
          Ajak Teman Seller, <br />
          <span className="magix-text-gradient">Panen Kredit Gratis!</span>
        </h2>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto italic">
          Dapatkan <span className="text-indigo-400 font-black">50 Kredit</span> untuk setiap teman yang melakukan upgrade ke paket berbayar apa pun.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {stats.map((stat, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl rounded-full group-hover:bg-white/10 transition-all" />
            <div className={`w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center mb-6 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <h4 className="text-3xl font-black text-white">{stat.value}</h4>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
        <div className="lg:col-span-7 space-y-8">
          {/* Claim Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
             
             <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                   <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Bonus Tersedia</h3>
                   <p className="text-slate-500 text-sm font-medium">Berdasarkan perhitungan {refData.successfulUpgrades} upgrade × 50 kredit.</p>
                </div>
                <div className="text-center md:text-right">
                   <div className="text-4xl font-black text-amber-400 mb-2">{pendingAmount} <span className="text-xs uppercase text-slate-500 tracking-widest">Cr</span></div>
                   <button 
                     onClick={onClaim}
                     disabled={pendingAmount <= 0}
                     className="px-8 py-3 bg-white text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl disabled:opacity-30 hover:scale-105 active:scale-95 transition-all"
                   >
                     Ambil Bonus Sekarang
                   </button>
                </div>
             </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 md:p-12 shadow-2xl relative overflow-hidden">
             <h3 className="text-2xl font-black text-white mb-8">Link Referral Anda</h3>
             
             <div className="bg-slate-950 border border-slate-800 rounded-[2rem] p-6 mb-8 relative group">
                <p className="text-slate-400 text-sm font-medium mb-4 italic">"Pakai AI sakti ini buat jualan! Daftar dengan kode <span className="text-white font-bold">{referralCode}</span> dan dapatkan bonus 50 Kredit..."</p>
                <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                   <div className="flex-1 text-[10px] font-mono text-indigo-400 truncate tracking-wider">https://magixseller.com/ref={referralCode}</div>
                   <button onClick={handleCopy} className="p-3 bg-white text-slate-950 rounded-xl shadow-xl hover:scale-110 active:scale-95 transition-all">
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                   </button>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button onClick={handleCopy} className="py-4 bg-[#25D366] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                   <Share2 size={16} /> Share ke WhatsApp
                </button>
                <button onClick={handleCopy} className="py-4 bg-slate-800 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-700 transition-all">
                   Salin Pesan Promosi
                </button>
             </div>
          </div>
        </div>

        <div className="lg:col-span-5">
           <div className="bg-indigo-600 rounded-[3rem] p-10 text-white shadow-2xl shadow-indigo-600/20 h-full flex flex-col">
              <Rocket size={40} className="mb-6 opacity-40" />
              <h3 className="text-2xl font-black mb-4">Cara Kerja Bonus</h3>
              <div className="space-y-6 flex-1">
                 <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 font-black text-xs">1</div>
                    <p className="text-sm font-medium text-indigo-100">Sebarkan link/kode ke sesama seller UMKM.</p>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 font-black text-xs">2</div>
                    <p className="text-sm font-medium text-indigo-100">Teman mendaftar & mendapat 10 Kredit Gratis di awal.</p>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 font-black text-xs">3</div>
                    <p className="text-sm font-medium text-indigo-100">Saat teman **berlangganan paket apa pun**, Anda otomatis menerima bonus **50 Kredit** per orang!</p>
                 </div>
              </div>
              <div className="mt-8 p-4 bg-black/10 rounded-2xl border border-white/10 flex items-start gap-3">
                 <Info size={16} className="shrink-0 mt-0.5" />
                 <p className="text-[10px] font-medium leading-relaxed opacity-70">
                    Bonus kredit dapat digunakan untuk semua fitur kecuali Magic Video (Veo 3.1) yang menggunakan API privat.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralView;
