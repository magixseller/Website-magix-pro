
import React, { useState, useEffect } from 'react';
import { AppView, UserAccount, Voucher, VerifiedOrder, Transaction, AppConfig } from './types';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import MagicStudio from './components/MagicStudio';
import MagicProduk from './components/MagicProduk';
import MagicKonten from './components/MagicKonten';
import MagicVoice from './components/MagicVoice';
import MagicKeyword from './components/MagicKeyword';
import MagicBio from './components/MagicBio';
import MagicCarousel from './components/MagicCarousel';
import MagicFrame from './components/MagicFrame';
import MagicLibrary from './components/MagicLibrary';
import MagicBundle from './components/MagicBundle';
import MagicReviewAI from './components/MagicReviewAI';
import MagicDropshipper from './components/MagicDropshipper';
import MarketplaceSync from './components/MarketplaceSync';
import PricingView from './components/PricingView';
import AdminDashboard from './components/AdminDashboard';
import ContactAdmin from './components/ContactAdmin';
import Feedback from './components/Feedback';
import ReferralView from './components/ReferralView';
import MagicBgRemover from './components/MagicBgRemover';
import MagicFeaturePlaceholder from './components/MagicFeaturePlaceholder';
import AdminLoginModal from './components/AdminLoginModal';
import PremiumSuccessModal from './components/PremiumSuccessModal';
import LoadingScreen from './components/LoadingScreen';
import FreeActivationLoader from './components/FreeActivationLoader';
import { Menu, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [showFreeActivation, setShowFreeActivation] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [successModal, setSuccessModal] = useState<{open: boolean, title: string, message: string, type: 'success' | 'credit' | 'sync'}>({
    open: false, title: '', message: '', type: 'success'
  });

  const [user, setUser] = useState<UserAccount>(() => {
    const saved = localStorage.getItem('magix_user');
    const defaultUser: UserAccount = {
      type: 'GUEST', role: 'user', credits: 0, maxCredits: 0, isLifetime: false,
      referralCode: 'MAGIX-' + Math.random().toString(36).substring(7).toUpperCase(),
      referralData: { totalFriends: 0, successfulUpgrades: 0, claimedCredits: 0 }
    };
    
    if (saved) return JSON.parse(saved);
    return defaultUser;
  });

  // DATA PERSISTENCE (PENTING AGAR DATA TIDAK HILANG)
  const [vouchers, setVouchers] = useState<Voucher[]>(() => {
    const saved = localStorage.getItem('magix_vouchers');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [orders, setOrders] = useState<VerifiedOrder[]>(() => {
    const saved = localStorage.getItem('magix_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('magix_transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [config, setConfig] = useState<AppConfig>({
    webhook: { secretKey: '', webhookUrl: 'https://magix-api.com/webhook' }
  });

  // Auto-save ke LocalStorage setiap ada perubahan
  useEffect(() => {
    localStorage.setItem('magix_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('magix_vouchers', JSON.stringify(vouchers));
  }, [vouchers]);

  useEffect(() => {
    localStorage.setItem('magix_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('magix_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const triggerSuccess = (title: string, message: string, type: 'success' | 'credit' | 'sync' = 'success') => {
    setSuccessModal({ open: true, title, message, type });
  };

  const useCredits = (amount: number) => {
    if (user.credits < amount) {
      alert("Kredit tidak mencukupi!");
      setCurrentView(AppView.PRICING);
      return false;
    }
    setUser(prev => ({ ...prev, credits: prev.credits - amount }));
    return true;
  };

  const addCredits = (amount: number) => {
    setUser(prev => ({ ...prev, credits: prev.credits + amount }));
  };

  const handleActivateFreeTrial = () => {
    setShowFreeActivation(true);
  };

  const onFreeActivationComplete = () => {
    addCredits(10);
    setShowFreeActivation(false);
    triggerSuccess("SELAMAT!", "10 Kredit Gratis telah aktif!", "credit");
  };

  if (isAppLoading) return <LoadingScreen onComplete={() => setIsAppLoading(false)} />;
  if (showFreeActivation) return <FreeActivationLoader onComplete={onFreeActivationComplete} />;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 text-slate-200 overflow-hidden">
      <div className="aura-effect" />
      
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        user={user}
        onAdminLogin={() => setIsAdminModalOpen(true)}
        onLogout={() => {
            localStorage.removeItem('magix_user');
            window.location.reload();
        }}
      />

      <main className="flex-1 overflow-y-auto bg-transparent flex flex-col relative">
        <header className="sticky top-0 z-30 px-6 py-4 bg-slate-950/60 backdrop-blur-xl border-b border-slate-800/50 flex items-center justify-between">
          <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 text-slate-400 hover:text-white transition-colors">
            <Menu size={22} />
          </button>
          
          <div className="flex items-center gap-4 ml-auto">
            <div className="px-4 py-2 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-white font-black text-xs flex items-center gap-2 shadow-lg">
              <Zap size={14} className="text-amber-400 fill-amber-400" /> 
              {user.credits.toLocaleString()} <span className="text-[10px] text-slate-500 uppercase opacity-70">Credits</span>
            </div>
          </div>
        </header>
        
        <div className="flex-1 pb-20">
          {currentView === AppView.HOME && <Home onStart={setCurrentView} user={user} onActivateFree={handleActivateFreeTrial} />}
          {currentView === AppView.STUDIO && <MagicStudio useCredits={useCredits} />}
          {currentView === AppView.PRODUK && <MagicProduk useCredits={useCredits} />}
          {currentView === AppView.KONTEN && <MagicKonten useCredits={useCredits} />}
          {currentView === AppView.VOICE && <MagicVoice />}
          {currentView === AppView.KEYWORD && <MagicKeyword useCredits={useCredits} />}
          {currentView === AppView.BIO && <MagicBio />}
          {currentView === AppView.CAROUSEL && <MagicCarousel useCredits={useCredits} />}
          {currentView === AppView.FRAME && <MagicFrame />}
          {currentView === AppView.LIBRARY && <MagicLibrary />}
          {currentView === AppView.BUNDLE && <MagicBundle useCredits={useCredits} />}
          {currentView === AppView.REVIEW_AI && <MagicReviewAI />}
          {currentView === AppView.DROPSHIPPER && <MagicDropshipper />}
          {currentView === AppView.MARKETPLACE && <MarketplaceSync useCredits={useCredits} />}
          {currentView === AppView.REFERRAL && <ReferralView user={user} onClaim={() => {}} />}
          {currentView === AppView.BG_REMOVER && <MagicBgRemover useCredits={useCredits} />}
          {currentView === AppView.PRICING && (
            <PricingView 
              onPaymentSuccess={(id, life, cr, pr) => {
                  addCredits(cr);
                  triggerSuccess("PEMBELIAN BERHASIL", `Paket ${cr} Kredit telah aktif!`, "credit");
              }} 
              onActivateFree={handleActivateFreeTrial}
              vouchers={vouchers} setVouchers={setVouchers}
              orders={orders} setOrders={setOrders}
              setView={setCurrentView}
              triggerSuccess={triggerSuccess}
            />
          )}
          {currentView === AppView.ADMIN_DASHBOARD && user.role === 'admin' && (
            <AdminDashboard 
              transactions={transactions} 
              vouchers={vouchers} setVouchers={setVouchers}
              orders={orders} setOrders={setOrders}
              config={config} setConfig={setConfig}
              triggerSuccess={triggerSuccess}
            />
          )}
          {currentView === AppView.GLOBAL && <ContactAdmin />}
          {currentView === AppView.FEEDBACK && <Feedback />}
          
          {[AppView.WATERMARK, AppView.LOGO_MAKER, AppView.STORY, AppView.CS_SCRIPT, AppView.CATALOG_PDF].includes(currentView) && (
            <MagicFeaturePlaceholder view={currentView} />
          )}
        </div>
      </main>

      {isAdminModalOpen && (
        <AdminLoginModal 
          onClose={() => setIsAdminModalOpen(false)} 
          onSuccess={() => {
            setUser(prev => ({ ...prev, role: 'admin', credits: 999999 }));
            setIsAdminModalOpen(false);
            setCurrentView(AppView.ADMIN_DASHBOARD);
            triggerSuccess("Admin Access", "Mode Owner Magix Aktif.", "success");
          }} 
        />
      )}

      <PremiumSuccessModal 
        isOpen={successModal.open} 
        onClose={() => setSuccessModal(prev => ({ ...prev, open: false }))}
        title={successModal.title}
        message={successModal.message}
        type={successModal.type}
      />
    </div>
  );
};

export default App;
