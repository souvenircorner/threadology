import React, { useEffect, useState } from 'react';

export default function ResultPage({ username, dataMock, onReset }) {
  // State untuk memicu animasi bar bergeser setelah halaman dimuat
  const [animatedScores, setAnimatedScores] = useState({
    overthinker: 0,
    sambat: 0,
    spill: 0,
    silent: 0
  });

  useEffect(() => {
    // Beri sedikit delay 100ms agar animasi transisi terlihat halus saat halaman muncul
    const timer = setTimeout(() => {
      setAnimatedScores({
        overthinker: dataMock.scores.overthinker,
        sambat: dataMock.scores.sambat_professional,
        spill: dataMock.scores.drama_investigator,
        silent: dataMock.scores.silent_supporter
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [dataMock]);

  // Helper untuk data warna dan label bar
  const barItems = [
    { key: 'overthinker', label: '🛌 Overthinker', value: dataMock.scores.overthinker, animValue: animatedScores.overthinker, bg: 'bg-[#DCEEFF]', text: 'text-[#3A6B88]' },
    { key: 'sambat', label: '😮‍💨 Sambat Prof', value: dataMock.scores.sambat_professional, animValue: animatedScores.sambat, bg: 'bg-[#FFE3D1]', text: 'text-[#A8583B]' },
    { key: 'spill', label: '🍿 Spillologist', value: dataMock.scores.drama_investigator, animValue: animatedScores.spill, bg: 'bg-[#FFF0D4]', text: 'text-[#8C6D39]' },
    { key: 'silent', label: '🤫 Silent Supporter', value: dataMock.scores.silent_supporter, animValue: animatedScores.silent, bg: 'bg-[#E3F4E3]', text: 'text-[#3E7D3E]' },
  ];

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-4 text-[#2C2C2C]">
      
      {/* Tombol Kembali Kecil di Pojok Kiri Atas */}
      <button 
        onClick={onReset}
        className="absolute top-6 left-6 text-xs font-semibold tracking-wide text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1 cursor-pointer"
      >
        ← Coba Akun Lain
      </button>

      {/* Main Container Card */}
      <div className="w-full max-w-md bg-white border border-[#EBE6DD] rounded-3xl p-6 shadow-sm z-10 space-y-6 animate-fade-in">
        
        {/* Header Hasil */}
        <div className="text-center">
          <p className="text-xs font-bold tracking-widest text-[#E07A5F] uppercase">Analisis Vibe Threads</p>
          <h2 className="text-2xl font-black mt-1 text-[#1A1A1A]">@{username}</h2>
        </div>

        {/* METERS SECTION: Horizontal Bars dengan Animasi */}
        <div className="space-y-4 bg-[#FAFAFA] rounded-2xl p-5 border border-[#F2EDE4]">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-2 text-center">Komposisi Jiwa Threads</span>
          
          <div className="space-y-3.5">
            {barItems.map((item) => (
              <div key={item.key} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-gray-600">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                {/* Track Bar Background */}
                <div className="w-full h-4 bg-gray-200/60 rounded-full overflow-hidden">
                  {/* Fill Bar yang Bergeser Animatif */}
                  <div 
                    className={`h-full ${item.bg} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${item.animValue}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Skor Kewarasan */}
          <div className="text-center border-t border-[#F2EDE4] pt-4 mt-4">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Skor Kewarasan</span>
            <div className="text-4xl font-black text-[#E07A5F] mt-0.5">
              {dataMock.result_meta.sanity_score}%
            </div>
            <span className="inline-block bg-[#E07A5F]/10 text-[#E07A5F] text-xs font-black px-3 py-1 rounded-full mt-2">
              Status: {dataMock.result_meta.personality_level}
            </span>
          </div>
        </div>

        {/* Kotak Kesimpulan Utama */}
        <div className="bg-[#FFFDF9] border-l-4 border-[#E07A5F] rounded-r-2xl p-4 shadow-sm">
          <h4 className="text-sm font-bold text-[#1A1A1A] flex items-center gap-1.5">
            🎯 Diagnosis: "{dataMock.result_meta.title}"
          </h4>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            {dataMock.result_meta.punchline}
          </p>
        </div>

        {/* Tombol Aksi */}
        <div className="space-y-3">
          <button
            onClick={() => alert('Fitur generate kartu gambar sedang disiapkan!')}
            className="w-full bg-[#1A1A1A] hover:bg-black text-white font-semibold py-3.5 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            📸 Bagikan ke Threads
          </button>
          
          <button
            onClick={onReset}
            className="w-full bg-white hover:bg-gray-50 text-[#E07A5F] border border-[#E07A5F] font-bold py-3.5 px-4 rounded-2xl shadow-sm transition-all duration-200 transform active:scale-95 text-sm cursor-pointer"
          >
            🔄 Cek Username Lain
          </button>
          
          <p className="text-[11px] text-center text-gray-400">
            Hasil ini murni acak untuk hiburan semata, jangan dibawa serius ya!
          </p>
        </div>

      </div>
    </div>
  );
}
