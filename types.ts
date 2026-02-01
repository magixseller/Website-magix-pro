
export enum AppView {
  HOME = 'home',
  STUDIO = 'studio',
  KONTEN = 'konten',
  PRODUK = 'produk',
  CAROUSEL = 'carousel',
  FRAME = 'frame',
  VOICE = 'voice',
  LIBRARY = 'library',
  KEYWORD = 'keyword',
  BIO = 'bio',
  ADMIN_DASHBOARD = 'admin_dashboard',
  FEEDBACK = 'feedback',
  PRICING = 'pricing',
  BUNDLE = 'bundle',
  MARKETPLACE = 'marketplace',
  REVIEW_AI = 'review-ai',
  GLOBAL = 'global',
  WATERMARK = 'watermark',
  BG_REMOVER = 'bg-remover',
  LOGO_MAKER = 'logo-maker',
  STORY = 'story',
  CS_SCRIPT = 'cs-script',
  CATALOG_PDF = 'catalog-pdf',
  DROPSHIPPER = 'dropshipper',
  REFERRAL = 'referral'
}

export type UserTier = 'GUEST' | 'TRIAL' | 'PREMIUM' | 'LIFETIME';
export type UserRole = 'user' | 'admin';

export interface UserAccount {
  type: UserTier;
  role: UserRole;
  credits: number;
  maxCredits: number;
  isLifetime: boolean;
  referralCode?: string;
  referralData?: {
    totalFriends: number;
    successfulUpgrades: number;
    claimedCredits: number;
  };
}

export interface AppConfig {
  webhook: { webhookUrl: string; secretKey: string; };
}

export interface Voucher {
  code: string;
  credits: number;
  status: 'Active' | 'Used';
  createdAt: number;
  usedAt?: number;
  claimedByOrderId?: string;
}

export interface VerifiedOrder {
  orderId: string;
  planType: number;
  status: 'Pending' | 'Claimed';
  syncedAt: number;
}

export interface Transaction {
  id: string;
  amount: number;
  profit: number;
  date: number;
}

export interface ContentGenerationResult {
  title: string;
  description: string;
  tags: string[];
}
