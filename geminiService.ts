
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { ContentGenerationResult } from "../types";

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("PERINGATAN: API_KEY tidak ditemukan di environment variables.");
  }
  return new GoogleGenAI({ apiKey: apiKey || "" });
};

// New function to remove background
export const removeImageBackground = async (base64Image: string): Promise<string | null> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [{
        parts: [
          { inlineData: { data: base64Image, mimeType: 'image/png' } }, 
          { text: "Remove the background from this image. Output only the main subject with a pure transparent background. Maintain ultra-sharp edges and preserve all product details." }
        ]
      }]
    });
    
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (e) {
    console.error("Gemini BG Remove Error:", e);
    return null;
  }
};

// Standardized function to edit images using gemini-2.5-flash-image
export const editImageWithPrompt = async (base64Image: string, prompt: string, aspectRatio: string = "1:1"): Promise<string | null> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [{
        parts: [
          { inlineData: { data: base64Image, mimeType: 'image/png' } }, 
          { text: prompt }
        ]
      }],
      config: { imageConfig: { aspectRatio: aspectRatio as any } }
    });
    
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (e) {
    console.error("Gemini Image Edit Error:", e);
    return null;
  }
};

// Analyzes product image for marketplace details
export const analyzeProductImage = async (base64Image: string): Promise<ContentGenerationResult> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [{
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/png' } },
        { text: "Analisis gambar produk ini dan buatlah judul marketplace yang persuasif, deskripsi, dan tag strategis dalam Bahasa Indonesia." }
      ]
    }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          tags: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["title", "description", "tags"]
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

// Analyzes photo to suggest target market
export const analyzePhotoForTarget = async (base64Image: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [{
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/png' } },
        { text: "Analisis target market yang paling cocok untuk produk dalam foto ini. Jelaskan secara singkat dalam 1 kalimat Bahasa Indonesia." }
      ]
    }]
  });
  return response.text || "Target market umum.";
};

// Generates SEO keywords for products
export const generateKeywords = async (product: string): Promise<string[]> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [{ parts: [{ text: `Daftarkan 20 kata kunci SEO konversi tinggi untuk produk: ${product} dalam Bahasa Indonesia.` }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });
  return JSON.parse(response.text || "[]");
};

// Generates a 7-day content plan
export const generateDailyContentPlan = async (productInfo: string, platform: string, targetMarket: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [{ parts: [{ text: `Buat rencana konten sosial media 7 hari untuk produk: ${productInfo} di platform: ${platform} target: ${targetMarket}.` }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          days: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                theme: { type: Type.STRING },
                visual: { type: Type.STRING },
                script: { type: Type.STRING }
              },
              required: ["theme", "visual", "script"]
            }
          }
        },
        required: ["days"]
      }
    }
  });
  return JSON.parse(response.text || '{"days":[]}');
};

// Text-to-speech generation
export const generateSpeech = async (text: string, voiceName: string): Promise<string | undefined> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName },
        },
      },
    },
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
};

// Generates an advertisement script for voice synthesis
export const generateVoiceScript = async (productName: string, style: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [{ parts: [{ text: `Buat naskah iklan suara pendek (maks 30 detik) untuk produk: ${productName} dengan gaya: ${style} dalam Bahasa Indonesia.` }] }]
  });
  return response.text || "";
};

// Generates a carousel slide image with text overlay
export const generateSlideImage = async (base64Product: string, slideText: string, slideIndex: number): Promise<string | null> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: [{
      parts: [
        { inlineData: { data: base64Product, mimeType: 'image/png' } },
        { text: `Create a professional marketplace carousel slide (Slide ${slideIndex}) for this product. Overlay this text clearly and aesthetically: "${slideText}". Use a professional layout with high-end commercial lighting.` }
      ]
    }],
    config: { imageConfig: { aspectRatio: "1:1" } }
  });
  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

// Generates hooks for social media carousels
export const generateCarouselHooks = async (base64Image: string): Promise<string[]> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [{
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/png' } },
        { text: "Berdasarkan foto produk ini, buatkan 4 kalimat 'hook' atau judul slide carousel yang menjual dalam Bahasa Indonesia." }
      ]
    }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });
  return JSON.parse(response.text || "[]");
};

// Generates store bios based on business profile
export const generateBio = async (businessName: string, productType: string, target: string, tone: string, platform: string): Promise<{options: string[]}> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [{ parts: [{ text: `Buat 3 pilihan bio profil untuk toko: ${businessName}, produk: ${productType}, target: ${target}, gaya: ${tone}, platform: ${platform} dalam Bahasa Indonesia.` }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          options: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["options"]
      }
    }
  });
  return JSON.parse(response.text || '{"options":[]}');
};

// Generates copy for product bundles
export const generateBundleContent = async (base64Images: string[], strategy: string): Promise<{bundleName: string, tagline: string}> => {
  const ai = getAI();
  const parts: any[] = base64Images.map(img => ({ inlineData: { data: img, mimeType: 'image/png' } }));
  parts.push({ text: `Berdasarkan produk-produk ini, buatkan nama paket bundling dan tagline yang menarik dengan strategi: ${strategy} dalam Bahasa Indonesia.` });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [{ parts }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          bundleName: { type: Type.STRING },
          tagline: { type: Type.STRING }
        },
        required: ["bundleName", "tagline"]
      }
    }
  });
  return JSON.parse(response.text || '{"bundleName":"", "tagline":""}');
};

// Generates visual design for product bundles
export const generateBundleDesign = async (base64Images: string[], bundleName: string, tagline: string, aspectRatio: string, prices: {normal: string, promo: string}): Promise<string | null> => {
  const ai = getAI();
  const parts: any[] = base64Images.map(img => ({ inlineData: { data: img, mimeType: 'image/png' } }));
  parts.push({ text: `Create a professional bundle poster for these products. Bundle Name: "${bundleName}". Tagline: "${tagline}". Normal Price: ${prices.normal}. Promo Price: ${prices.promo}. Arrange the products aesthetically in one frame with a premium background and professional typography.` });

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: [{ parts }],
    config: { imageConfig: { aspectRatio: aspectRatio as any } }
  });
  
  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

// Generates response to customer reviews
export const generateReviewResponse = async (reviewText: string, rating: number, tone: string, shopName: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [{ parts: [{ text: `Balas ulasan pembeli ini. Ulasan: "${reviewText}" Rating: ${rating} bintang. Gaya Bahasa: ${tone}. Nama Toko: ${shopName}. Balas dalam Bahasa Indonesia yang sopan dan sesuai konteks.` }] }]
  });
  return response.text || "";
};

// Generates a product commercial video using Veo 3.1
export const generateProductVideo = async (
  base64Image: string, 
  prompt: string, 
  onStatusUpdate?: (status: string) => void
): Promise<string | null> => {
  try {
    // Create instance right before API call to ensure it always uses the most up-to-date API key from the dialog.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    if (onStatusUpdate) onStatusUpdate("Menyiapkan kanvas AI...");
    
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt || 'Product commercial with premium cinematic style',
      image: {
        imageBytes: base64Image,
        mimeType: 'image/png',
      },
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '9:16'
      }
    });

    while (!operation.done) {
      if (onStatusUpdate) onStatusUpdate("Sedang merender frame...");
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) return null;

    if (onStatusUpdate) onStatusUpdate("Mengunduh hasil video...");
    // The response.body contains the MP4 bytes. You must append an API key when fetching from the download link.
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (e) {
    console.error("Gemini Video Gen Error:", e);
    throw e;
  }
};

// Utility to decode base64
export function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Utility to decode raw audio
export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
