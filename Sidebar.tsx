
import React from 'react';
import { 
  Sparkles, Store, ShoppingBag, Camera, TrendingUp, 
  MessageSquareText, Zap, Menu, X, Lock, ShieldCheck, ShoppingCart,
  Mic, Key, User, Library, PackagePlus, MessageSquare, Globe, Layers,
  Shield, Frame, Scissors, PenTool, Instagram, FileDown, ShoppingCart as CartIcon
} from 'lucide-react';
import { AppView, UserAccount } from '../types';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  isOpen: boolean;
  onClose: () => void;
  user: UserAccount;
  onAdminLogin: () => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isOpen, onClose, user, onAdminLogin }) => {
  const handleNav = (id: AppView) => { setView(id); onClose(); };
  
  const NavItem = ({ view, icon: Icon, label, color = "text-slate-400" }: any) => (
    <button onClick={() => handleNav(view)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group ${currentView === view ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
      <Icon size={18} className={`${currentView === view ? 'text-white' : color} group-hover:scale-110 transition-transform`} />
      <span className="text-[11px] font-black uppercase tracking-wider">{label}</span>
    </button>
  );

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 md:hidden" onClick={onClose} />}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:h-screen`}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView(AppView.HOME)}>
            <div className="w-10 h-10 magix-gradient rounded-xl flex items-center justify-center font-black text-xl italic shadow-lg text-white">M</div>
            <div>
              <h1 className="text-lg font-bold leading-none text-white tracking-tighter">MAGIX</h1>
              <p className="text-[9px] text-slate-500 font-black tracking-widest mt-1 uppercase">Tool Seller Pro</p>
            </div>
          </div>
          <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white"><X size={24} /></button>
        </div>
        
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto scrollbar-hide pb-10">
          <p className="px-4 text-[9px] font-black uppercase tracking-[0.2em] mb-2 mt-6 text-slate-600">Utama</p>
          <NavItem view={AppView.HOME} icon={Store} label="Home" color="text-indigo-400" />
          <NavItem view={AppView.MARKETPLACE} icon={TrendingUp} label="Marketplace Sync" color="text-emerald-400" />
          <NavItem view={AppView.DROPSHIPPER} icon={CartIcon} label="Magic Dropshipper" color="text-amber-400" />
          
          <p className="px-4 text-[9px] font-black uppercase tracking-[0.2em] mb-2 mt-6 text-slate-600">Visual AI</p>
          <NavItem view={AppView.STUDIO} icon={Sparkles} label="Magic Studio" color="text-indigo-400" />
          <NavItem view={AppView.CAROUSEL} icon={Layers} label="Magic Carousel" color="text-indigo-400" />
          <NavItem view={AppView.FRAME} icon={Frame} label="Magic Frame" color="text-emerald-400" />
          <NavItem view={AppView.BG_REMOVER} icon={Scissors} label="Magic BG Remover" color="text-rose-400" />
          
          <p className="px-4 text-[9px] font-black uppercase tracking-[0.2em] mb-2 mt-6 text-slate-600">Marketing</p>
          <NavItem view={AppView.PRODUK} icon={MessageSquareText} label="AI Copywriter" color="text-blue-400" />
          <NavItem view={AppView.KONTEN} icon={Instagram} label="Magic Konten" color="text-pink-400" />
          <NavItem view={AppView.VOICE} icon={Mic} label="Magic Voice" color="text-emerald-400" />
          <NavItem view={AppView.KEYWORD} icon={Key} label="Magic Keyword" color="text-amber-400" />
          <NavItem view={AppView.REVIEW_AI} icon={MessageSquare} label="Balas Ulasan AI" color="text-blue-400" />
          
          <p className="px-4 text-[9px] font-black uppercase tracking-[0.2em] mb-2 mt-6 text-slate-600">Lanjutan</p>
          <NavItem view={AppView.BUNDLE} icon={PackagePlus} label="Magic Bundle" color="text-indigo-400" />
          <NavItem view={AppView.BIO} icon={User} label="Magic Bio Toko" color="text-pink-400" />
          <NavItem view={AppView.LIBRARY} icon={Library} label="Magic Library" color="text-slate-400" />
          
          <p className="px-4 text-[9px] font-black uppercase tracking-[0.2em] mb-2 mt-6 text-slate-600">Akun</p>
          <NavItem view={AppView.PRICING} icon={ShoppingCart} label="Beli Paket" color="text-indigo-400" />
          <NavItem view={AppView.GLOBAL} icon={Globe} label="Security & Admin" color="text-slate-500" />
          <NavItem view={AppView.FEEDBACK} icon={MessageSquareText} label="Kritik & Saran" color="text-slate-500" />
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          {user.role === 'admin' ? (
             <button onClick={() => setView(AppView.ADMIN_DASHBOARD)} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-rose-600/10 text-rose-500 hover:bg-rose-600 hover:text-white transition-all shadow-lg">
                <ShieldCheck size={18} /> <span className="text-[11px] font-black uppercase">Owner Panel</span>
             </button>
          ) : (
             <button onClick={onAdminLogin} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-400 transition-all">
                <Lock size={14} /> <span className="text-[9px] font-black uppercase">Admin Login</span>
             </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
