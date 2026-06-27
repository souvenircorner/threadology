import React, { useEffect, useState, useRef } from 'react';
import { toPng } from 'html-to-image';

export default function ResultPage({ username, dataMock, onReset }) {
  const cardRef = useRef(null);
  const [animatedScores, setAnimatedScores] = useState({ overthinker: 0, sambat: 0, spill: 0, silent: 0 });
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
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

  // Fungsi sakti untuk men-download kartu dalam rasio 3:4 sebagai PNG
  const handleDownload = () => {
    if (cardRef.current === null) return;
    
    setIsDownloading(true);
    
    // Mengubah elemen HTML menjadi gambar PNG
    toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `Threadology-${username}.png`;
        link.href = dataUrl;
        link.click();
        setIsDownloading(false);
      })
      .catch((err) => {
        console.error('Gagal mengunduh gambar:', err);
        alert('Waduh, gagal menyimpan gambar. Coba screenshot manual area kartunya ya!');
        setIsDownloading(false);
      });
  };

  const barItems = [
    { key: 'overthinker', label: '🛌 Overthinker', value: dataMock.scores.overthinker, animValue: animatedScores.overthinker, bg: 'bg-[#DCEEFF]' },
    { key: 'sambat', label: '😮‍💨 Sambat Prof', value: dataMock.scores.sambat_professional, animValue: animatedScores.sambat, bg: 'bg-[#FFE3D1]' },
    { key: 'spill', label: '🍿 Spillologist', value: dataMock.scores.drama_investigator, animValue: animatedScores.spill, bg: 'bg-[#FFF0D4]' },
    { key: 'silent', label: '🤫 Silent Supporter', value: dataMock.scores.silent_supporter, animValue: animatedScores.silent, bg: 'bg-[#E3F4E3]' },
  ];

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-start pt-14 pb-6 p-4 text-[#2C2C2C]">
      
      {/* Tombol Kembali di Pojok Kiri Atas */}
      <button 
        onClick={onReset}
        className="absolute top-5 left-5 text-xs font-semibold tracking-wide text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1 cursor-pointer z-20"
      >
        ← Kembali
      </button>

      {/* ================= AREA KARTU RASIO 3:4 (YANG AKAN DI-DOWNLOAD) ================= */}
      <div 
        ref={cardRef}
        id="download-card"
        className="w-full max-w-[340px] aspect-[3/4] bg-white border border-[#EBE6DD] rounded-[32px] p-5 shadow-sm flex flex-col justify-between overflow-hidden relative"
      >
        {/* Background Hiasan Halus khusus di dalam kartu agar hasil download tetap estetik */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-[#DCEEFF]/40 rounded-full filter blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#FFE3D1]/50 rounded-full filter blur-2xl pointer-events-none" />

        <div className="space-y-4 z-10">
          {/* Header Kartu */}
          <div className="text-center">
            <p className="text-[10px] font-black tracking-widest text-[#E07A5F] uppercase">Threadology Report</p>
            <h2 className="text-xl font-black mt-0.5 text-[#1A1A1A] truncate">@{username}</h2>
          </div>

          {/* Meter kemajuan */}
          <div className="space-y-2.5 bg-[#FAFAFA]/90 backdrop-blur-sm rounded-2xl p-3.5 border border-[#F2EDE4]">
            {barItems.map((item) => (
              <div key={item.key} className="space-y-0.5">
                <div className="flex justify-between text-[11px] font-bold text-gray-600">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200/60 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.bg} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${item.animValue}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnosis & Skor (Tengah-Bawah Kartu) */}
        <div className="space-y-3 z-10 mt-auto">
          {/* Kotak Kesimpulan */}
          <div className="bg-[#FFFDF9]/90 border-l-4 border-[#E07A5F] rounded-r-xl p-3 shadow-sm">
            <h4 className="text-xs font-black text-[#1A1A1A] truncate">
              🎯 Diagnosis: "{dataMock.result_meta.title}"
            </h4>
            <p className="text-[11px] text-gray-600 mt-1 leading-relaxed line-clamp-3">
              {dataMock.result_meta.punchline}
            </p>
          </div>

          {/* Badge Skor Paling Bawah Kartu */}
          <div className="flex items-center justify-between bg-[#E07A5F] text-white rounded-xl p-2.5 px-3.5 shadow-sm">
            <div className="text-left">
              <p className="text-[9px] font-bold uppercase tracking-wider text-white/80">Skor Kewarasan</p>
              <p className="text-sm font-black">{dataMock.result_meta.personality_level}</p>
            </div>
            <div className="text-2xl font-black bg-white/20 px-2.5 py-0.5 rounded-lg">
              {dataMock.result_meta.sanity_score}%
            </div>
          </div>
        </div>
      </div>
      {/* ======================= END OF AREA KARTU ======================= */}

      {/* Tombol Kontrol (Di luar kartu, tidak ikut terdownload) */}
      <div className="w-full max-w-[340px] space-y-2.5 mt-5">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full bg-[#1A1A1A] hover:bg-black text-white font-bold py-3.5 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50"
        >
          {isDownloading ? '⏳ Menyimpan...' : '📸 Simpan Kartu ke Galeri'}
        </button>
        
        <button
          onClick={onReset}
          className="w-full bg-white hover:bg-gray-50 text-[#E07A5F] border border-[#E07A5F] font-bold py-3.5 px-4 rounded-2xl shadow-sm transition-all duration-200 transform active:scale-95 text-sm cursor-pointer"
        >
          🔄 Cek Username Lain
        </button>
      </div>

    </div>
  );
          }
            
