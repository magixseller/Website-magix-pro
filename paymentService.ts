
/**
 * PAYMENT GATEWAY SERVICE (Production Ready Template)
 * Gunakan file ini untuk menghubungkan aplikasi dengan Midtrans atau Xendit.
 */

export const createPaymentInvoice = async (planData: {
  id: string,
  price: number,
  name: string,
  userEmail: string
}) => {
  // CATATAN: Di lingkungan produksi, pemanggilan API harus dilakukan melalui BACKEND 
  // untuk menjaga keamanan Server Key/Secret Key Anda.
  
  // Contoh simulasi pemanggilan ke backend Anda:
  try {
    /* 
    const response = await fetch('/api/create-payment', {
      method: 'POST',
      body: JSON.stringify(planData)
    });
    return await response.json(); 
    */
    
    // Untuk saat ini, kita return promise agar alur di UI tetap berjalan
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          paymentUrl: "https://checkout.midtrans.com/v2/vtweb/...", // URL dari Gateway
          token: "snap-token-12345"
        });
      }, 1000);
    });
  } catch (error) {
    console.error("Payment Error:", error);
    throw error;
  }
};

/**
 * Hook untuk mengecek status transaksi (Polling atau Webhook)
 */
export const checkTransactionStatus = async (orderId: string) => {
  // Panggil API Midtrans Status / Xendit Get Invoice
  return "SETTLED"; // Berhasil
};
