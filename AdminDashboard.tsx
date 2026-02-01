
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Settings, Zap, RefreshCw, Database, Code, Ticket, TrendingUp,
  BarChart3, Search, Plus, ShieldCheck, Download,
  Loader2, Factory, FileUp, FileDown, Trash2, AlertCircle, CheckCircle2,
  FileSpreadsheet, HardDrive, Beaker, ShoppingBag, Globe, Link as LinkIcon,
  Copy, Check, Server, Terminal, Activity, HelpCircle, AlertTriangle, Wand2,
  Layers, ChevronRight, Save
} from 'lucide-react';
import { AppConfig, Voucher, VerifiedOrder, Transaction } from '../types';

interface AdminDashboardProps {
  transactions: Transaction[];
  vouchers: Voucher[];
  setVouchers: React.Dispatch<React.SetStateAction<Voucher[]>>;
  orders: VerifiedOrder[];
  setOrders: React.Dispatch<React.SetStateAction<VerifiedOrder[]>>;
  setConfig: React.Dispatch<React.SetStateAction<AppConfig>>;
  config: AppConfig;
  triggerSuccess: (title: string, message: string, type: 'success' | 'credit' | 'sync') => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  vouchers, setVouchers, orders, setOrders, transactions, config, setConfig, triggerSuccess 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'vouchers' | 'orders' | 'settings'>('overview');
  const [isProcessing, setIsProcessing] = useState(false);
  const [importCredit, setImportCredit] = useState(1000);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manual & Bulk Voucher State
  const [manualCode, setManualCode] = useState('');
  const [manualCredit, setManualCredit] = useState(1000);
  const [bulkCount, setBulkCount] = useState(10);
  const [isGeneratingBulk, setIsGeneratingBulk] = useState(false);
  const [bulkSuccess, setBulkSuccess] = useState(false);

  // Stats calculation
  const stats = useMemo(() => {
    const totalRev = transactions.reduce((acc, tx) => acc + tx.amount, 0);
    const totalProfit = transactions.reduce((acc, tx) => acc + tx.profit, 0);
    return { totalRev, totalProfit, totalOrders: transactions.length };
  }, [transactions]);

  const stockAlerts = useMemo(() => {
    const types = [250, 1000, 3000, 10000];
    return types.map(cr => ({
      credits: cr,
      count: vouchers.filter(v => v.credits === cr && v.status === 'Active' && !v.claimedByOrderId).length
    })).filter(s => s.count < 10);
  }, [vouchers]);

  const _generateId = (length = 10) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleAddManualVoucher = () => {
    if (!manualCode.trim()) return;
    const newVoucher: Voucher = {
      code: manualCode.toUpperCase().trim(),
      credits: manualCredit,
      status: 'Active',
      createdAt: Date.now()
    };
    setVouchers(prev => [newVoucher, ...prev]);
    setManualCode('');
    triggerSuccess("SUKSES", `Voucher ${newVoucher.code} berhasil disimpan.`, "success");
  };

  const handleBulkGenerate = () => {
    if (bulkCount <= 0 || bulkCount > 500) return;
    setIsGeneratingBulk(true);
    setBulkSuccess(false);
    
    // Simulasi penulisan ke database (LocalStorage)
    setTimeout(() => {
      const newVouchers: Voucher[] = [];
      const timestamp = Date.now();
      for (let i = 0; i < bulkCount; i++) {
        newVouchers.push({
          code: `MAGIX-${_generateId(10)}`,
          credits: manualCredit,
          status: 'Active',
          createdAt: timestamp
        });
      }
      setVouchers(prev => [...newVouchers, ...prev]);
      setIsGeneratingBulk(false);
      setBulkSuccess(true);
      triggerSuccess("AUTO-SAVE BERHASIL", `${bulkCount} Voucher telah aman di database.`, "success");
      setTimeout(() => setBulkSuccess(false), 4000);
    }, 1200);
  };

  const formatIDR = (n: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <h2 className="text-3xl md:text-5xl font-black text-white flex items-center gap-4 italic uppercase tracking-tighter">
          <Settings className="text-indigo-400" /> Owner Panel
        </h2>
        <div className="bg-slate-900 px-6 py-3 rounded-2xl border border-indigo-500/20 flex items-center gap-4">
           <div className="flex flex-col items-end">
              <span className="text-[8px] font-black text-slate-500 uppercase">Database Status</span>
              <span className="text-[10px] font-black text-emerald-400 uppercase flex items-center gap-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> TERHUBUNG
              </span>
           </div>
           <HardDrive className="text-slate-700" size={24} />
        </div>
      </div>

      <div className="flex gap-2 mb-12 overflow-x-auto pb-4 scrollbar-hide border-b border-slate-800">
          <button onClick={() => setActiveTab('overview')} className={`px-8 py-4 text-[10px] font-black uppercase tracking-widest transition-all shrink-0 border-b-2 ${activeTab === 'overview' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-500'}`}>Monitor</button>
          <button onClick={() => setActiveTab('vouchers')} className={`px-8 py-4 text-[10px] font-black uppercase tracking-widest transition-all shrink-0 border-b-2 ${activeTab === 'vouchers' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-500'}`}>Voucher Database</button>
          <button onClick={() => setActiveTab('orders')} className={`px-8 py-4 text-[10px] font-black uppercase tracking-widest transition-all shrink-0 border-b-2 ${activeTab === 'orders' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-500'}`}>Order Sync</button>
          <button onClick={() => setActiveTab('settings')} className={`px-8 py-4 text-[10px] font-black uppercase tracking-widest transition-all shrink-0 border-b-2 ${activeTab === 'settings' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-500'}`}>Integrasi</button>
      </div>

      {activeTab === 'vouchers' && (
        <div className="animate-in fade-in duration-500 space-y-10">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-8">
                 <div className={`bg-slate-900 border-2 ${bulkSuccess ? 'border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.1)]' : 'border-indigo-500/40'} rounded-[3.5rem] p-10 shadow-2xl relative overflow-hidden transition-all duration-500`}>
                    <div className="relative z-10">
                       <h3 className="text-2xl font-black text-white uppercase italic flex items-center gap-4 mb-10">
                          <Layers className={bulkSuccess ? 'text-emerald-400' : 'text-indigo-400'} /> Voucher Engine 2.0
                       </h3>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                          <div>
                             <label className="text-[9px] font-black text-slate-500 uppercase mb-3 block">Jumlah Voucher</label>
                             <input type="number" value={bulkCount} onChange={(e) => setBulkCount(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-5 text-white font-black text-xl outline-none focus:border-indigo-500 shadow-inner" />
                          </div>
                          <div className="md:col-span-2">
                             <label className="text-[9px] font-black text-slate-500 uppercase mb-3 block">Pilih Nilai Kredit</label>
                             <select value={manualCredit} onChange={(e) => setManualCredit(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-5 text-white font-black text-xl outline-none focus:border-indigo-500 appearance-none cursor-pointer">
                                <option value={250}>Starter (250 Cr)</option>
                                <option value={1000}>Pro (1.000 Cr)</option>
                                <option value={3000}>Elite (3.000 Cr)</option>
                                <option value={10000}>Ultimate (10.000 Cr)</option>
                             </select>
                          </div>
                       </div>
                       <button onClick={handleBulkGenerate} disabled={isGeneratingBulk} className={`w-full py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center justify-center gap-4 ${bulkSuccess ? 'bg-emerald-600' : 'magix-gradient'} text-white`}>
                          {isGeneratingBulk ? <Loader2 className="animate-spin" /> : bulkSuccess ? <CheckCircle2 className="animate-success-pop" /> : <Save />}
                          {isGeneratingBulk ? 'MENULIS KE MEMORI...' : bulkSuccess ? 'DATA SUDAH DISIMPAN!' : `GENERATE & SIMPAN MASSAL`}
                       </button>
                    </div>
                 </div>

                 <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-8 shadow-2xl">
                    <h3 className="text-lg font-black text-white uppercase italic mb-8">100 Transaksi Terakhir</h3>
                    <div className="overflow-x-auto">
                       <table className="w-full text-left">
                          <thead>
                             <tr className="text-[9px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-800">
                                <th className="pb-4 px-4">KODE VOUCHER</th>
                                <th className="pb-4 px-4">NOMINAL</th>
                                <th className="pb-4 px-4">WAKTU BUAT</th>
                                <th className="pb-4 px-4 text-right">STATUS DB</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/50">
                             {vouchers.slice(0, 10).map((v, i) => (
                                <tr key={i} className="hover:bg-slate-800/20">
                                   <td className="py-4 px-4 font-mono text-[11px] font-black text-indigo-400">{v.code}</td>
                                   <td className="py-4 px-4 text-[11px] font-black text-white">{v.credits.toLocaleString()} Cr</td>
                                   <td className="py-4 px-4 text-[9px] font-bold text-slate-600">{new Date(v.createdAt).toLocaleString()}</td>
                                   <td className="py-4 px-4 text-right">
                                      <span className="text-[8px] font-black bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full border border-emerald-500/20">SAVED</span>
                                   </td>
                                </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                 <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 shadow-2xl">
                    <h3 className="text-lg font-black text-white italic uppercase mb-8 flex items-center gap-3"><Ticket className="text-amber-400" /> Ringkasan Stok</h3>
                    <div className="space-y-3">
                       {[250, 1000, 3000, 10000].map(cr => {
                         const stok = vouchers.filter(v => v.credits === cr && v.status === 'Active' && !v.claimedByOrderId).length;
                         return (
                          <div key={cr} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex items-center justify-between group hover:border-indigo-500/30 transition-all">
                             <div>
                                <p className="text-xl font-black text-white">{cr.toLocaleString()} <span className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter">Cr</span></p>
                                <div className="flex items-center gap-2 mt-1">
                                   <div className={`w-1.5 h-1.5 rounded-full ${stok < 10 ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`} />
                                   <p className={`text-[9px] font-black uppercase tracking-widest ${stok < 10 ? 'text-rose-500' : 'text-slate-500'}`}>Tersedia: {stok.toLocaleString()}</p>
                                </div>
                             </div>
                             <ChevronRight size={14} className="text-slate-800 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                          </div>
                         );
                       })}
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'overview' && (
        <div className="animate-in fade-in duration-700 space-y-10">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Total Omset</p>
                 <h4 className="text-3xl font-black text-white mb-2">{formatIDR(stats.totalRev)}</h4>
                 <p className="text-[9px] text-emerald-400 font-bold uppercase">Gross Revenue</p>
              </div>
              <div className="bg-slate-900 border-2 border-emerald-500/20 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                 <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Profit Bersih</p>
                 <h4 className="text-3xl font-black text-white mb-2">{formatIDR(stats.totalProfit)}</h4>
                 <p className="text-[9px] text-indigo-400 font-bold uppercase">Estimasi Laba</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Total Voucher</p>
                 <h4 className="text-3xl font-black text-white mb-2">{vouchers.length.toLocaleString()}</h4>
                 <p className="text-[9px] text-slate-600 font-bold uppercase">DB Storage</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Status Server</p>
                 <h4 className="text-3xl font-black text-emerald-400 mb-2">ONLINE</h4>
                 <p className="text-[9px] text-slate-600 font-bold uppercase">Real-time DB</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
