
# 🚀 MAGIX TOOL SELLER - AI Powered Marketplace Toolkit

![Version](https://img.shields.io/badge/version-2.5.0-blue.svg)
![Status](https://img.shields.io/badge/status-Production--Ready-emerald.svg)
![Platform](https://img.shields.io/badge/platform-Vercel-black.svg)

**MAGIX TOOL SELLER** adalah platform asisten cerdas berbasis AI yang dirancang khusus untuk membantu Seller UMKM di Indonesia meledakkan omset penjualannya melalui optimasi visual dan copywriting otomatis.

## ✨ Fitur Utama
- 🪄 **Magic Studio**: Transformasi foto produk biasa menjadi katalog studio profesional dalam hitungan detik.
- 🎬 **Magic Video (Veo 3.1)**: Mengubah foto statis menjadi video iklan sinematik.
- ✍️ **AI Copywriter**: Menghasilkan deskripsi produk terstruktur dan judul SEO marketplace.
- 📊 **Marketplace Sync**: Sinkronisasi massal katalog ke Shopee, Tokopedia, dan TikTok Shop.
- 🔗 **Lynk.id Integration**: Sistem aktivasi kredit otomatis melalui Webhook Lynk.id.

## 🛠️ Teknologi yang Digunakan
- **Frontend**: React 19 + Tailwind CSS
- **AI Core**: Google Gemini 3.0 Pro & 2.5 Flash
- **Video Engine**: Google Veo 3.1
- **Deployment**: Vercel
- **Database**: LocalStorage (Session) & Webhook Sync

## 📂 Struktur Folder
```text
/
├── components/         # Komponen UI (Studio, Konten, Admin, dll)
├── services/           # Logika API Gemini & Payment
├── types.ts            # Definisi data (TypeScript)
├── App.tsx             # Logika utama aplikasi
├── index.tsx           # Entry point aplikasi
└── metadata.json       # Konfigurasi aplikasi & izin
```

## 🚀 Cara Menjalankan (Deployment)
1. Push kode ini ke **GitHub Private Repository**.
2. Hubungkan repository ke **Vercel**.
3. Tambahkan Environment Variable di Vercel:
   - `API_KEY`: Masukkan API Key Google Gemini Anda.
4. Deployment otomatis akan berjalan.

## 🔐 Keamanan
Aplikasi ini menggunakan **AES-256 Encryption** untuk menangani data Webhook dan sinkronisasi API Marketplace. Pastikan Anda tidak membagikan `API_KEY` kepada siapa pun.

---
Developed with ❤️ by **Magix Dev Team Indonesia**
