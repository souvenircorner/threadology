import React, { useState } from 'react';

export default function LandingPage({ onAnalyze }) {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  // List teks loading lucu bergantian
  const loadingPhrases = [
    "Sedang mengintip Threads-mu...",
    "Menghitung kadar sambat harian...",
    "Membaca pikiran malammu jam 2 pagi...",
    "Menghubungi psikolog terdekat...",
    "Menganalisis energi gelud di kolom reply..."
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) return;

    setIsLoading(true);
    
    // Efek teks loading berganti setiap 1.2 detik
    let textIndex = 0;
    setLoadingText(loadingPhrases[textIndex]);
    
    const interval = setInterval(() => {
      textIndex++;
      if (textIndex < loadingPhrases.length) {
        setLoadingText(loadingPhrases[textIndex]);
      }
    }, 1200);

    // Simulasi proses analisis data selama 4 detik sebelum pindah halaman
    setTimeout(() => {
      clearInterval(interval);
      setIsLoading(false);
      onAnalyze(username); // Fungsi untuk pindah ke halaman hasil
    }, 4500);
  };

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 overflow-hidden text-[#2C2C2C]">
      
      {/* Ornamen Estetik: Siluet Melengkung Pastel di Background */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#DCEEFF] rounded-full filter blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#FFE3D1] rounded-full filter blur-3xl opacity-70 pointer-events-none" />

      {/* Main Card/Container */}
      <div className="w-full max-w-md text-center z-10">
        {!isLoading ? (
          <>
            {/* Logo & Judul */}
            <div className="mb-8">
              <span className="text-4xl">🧠</span>
              <h1 className="text-3xl font-extrabold tracking-tight mt-3 text-[#1A1A1A]">
                Threadology
              </h1>
              <p className="text-sm text-gray-500 mt-2 font-medium">
                Seberapa waras kamu di Threads? Let's check your vibe.
              </p>
            </div>

            {/* Form Input */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
                  @
                </span>
                <input
                  type="text"
                  placeholder="username_threads"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.replace(/\s+/g, ''))}
                  className="w-full pl-9 pr-4 py-3.5 bg-white border border-[#EBE6DD] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#AEC6CF] focus:border-transparent shadow-sm text-sm transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#FFB7A1] hover:bg-[#FFA58A] text-white font-semibold py-3.5 px-4 rounded-2xl shadow-sm transition-all duration-200 transform active:scale-98"
              >
                Cek Vibe Kamu ✨
              </button>
            </form>

            {/* Catatan Kaki */}
            <p className="text-xs text-gray-400 mt-6 italic">
              *Tenang, kami tidak minta password. Cuma mau ngintip sambatan publikmu aja kok.
            </p>
          </>
        ) : (
          /* Tampilan Loading Screen */
          <div className="flex flex-col items-center justify-center space-y-6 animate-fade-in">
            {/* Spinner Minimalis Pastel */}
            <div className="w-12 h-12 border-4 border-[#DCEEFF] border-t-[#FFB7A1] rounded-full animate-spin"></div>
            
            {/* Teks Loading yang Berubah-ubah */}
            <p className="text-base font-medium text-gray-600 tracking-wide animate-pulse">
              {loadingText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
            }
