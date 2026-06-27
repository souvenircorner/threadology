import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrasi komponen Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ResultPage({ username, dataMock, onReset }) {
  // Config data untuk Pie Chart dengan warna pastel custom
  const chartData = {
    labels: ['Overthinker', 'Sambat Prof', 'Spillologist', 'Silent Supporter'],
    datasets: [
      {
        data: [
          dataMock.scores.overthinker,
          dataMock.scores.sambat_professional,
          dataMock.scores.drama_investigator,
          dataMock.scores.silent_supporter,
        ],
        backgroundColor: [
          '#DCEEFF', // Baby Blue
          '#FFE3D1', // Soft Peach
          '#FFF0D4', // Pastel Yellow
          '#E3F4E3', // Soft Mint Green
        ],
        borderColor: ['#FFFFFF'],
        borderWidth: 2,
      },
    ],
  };

  // Opsi tampilan Chart.js
  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#4A4A4A',
          font: { family: 'sans-serif', size: 12, weight: '500' },
          padding: 15,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-4 text-[#2C2C2C]">
      
      {/* Tombol Kembali Kecil di Pojok Kiri Atas */}
      <button 
        onClick={onReset}
        className="absolute top-6 left-6 text-xs font-semibold tracking-wide text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
      >
        ← Coba Akun Lain
      </button>

      {/* Main Container Card */}
      <div className="w-full max-w-md bg-white border border-[#EBE6DD] rounded-3xl p-6 shadow-sm z-10 space-y-6">
        
        {/* Header Hasil */}
        <div className="text-center">
          <p className="text-xs font-bold tracking-widest text-[#FFB7A1] uppercase">Analisis Vibe Threads</p>
          <h2 className="text-2xl font-black mt-1 text-[#1A1A1A]">@{username}</h2>
        </div>

        {/* Baris Grafik & Skor Singkat */}
        <div className="grid grid-cols-1 gap-4 items-center bg-[#FAFAFA] rounded-2xl p-4 border border-[#F2EDE4]">
          {/* Pie Chart Container */}
          <div className="h-48 relative">
            <Pie data={chartData} options={chartOptions} />
          </div>
          
          {/* Skor Kewarasan */}
          <div className="text-center border-t border-[#F2EDE4] pt-3 mt-1">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Skor Kewarasan</span>
            <div className="text-3xl font-extrabold text-[#FFB7A1] mt-0.5">
              {dataMock.result_meta.sanity_score}%
            </div>
            <span className="inline-block bg-[#DCEEFF] text-[#3A6B88] text-xs font-bold px-3 py-1 rounded-full mt-2">
              Level: {dataMock.result_meta.personality_level}
            </span>
          </div>
        </div>

        {/* Kotak Kesimpulan Utama */}
        <div className="bg-[#FFFDF9] border-l-4 border-[#FFB7A1] rounded-r-2xl p-4 shadow-sm">
          <h4 className="text-sm font-bold text-[#1A1A1A] flex items-center gap-1.5">
            🎯 Kesimpulan: "{dataMock.result_meta.title}"
          </h4>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            {dataMock.result_meta.punchline}
          </p>
        </div>

        {/* Tombol Utama untuk Share */}
<div className="space-y-3">
  <button
    onClick={() => alert('Fitur generate kartu gambar sedang disiapkan!')}
    className="w-full bg-[#1A1A1A] hover:bg-black text-white font-semibold py-3.5 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
  >
    📸 Bagikan ke Threads
  </button>
  
  {/* TOMBOL BARU: Cek Lagi / Kembali */}
  <button
    onClick={onReset}
    className="w-full bg-white hover:bg-gray-50 text-[#E07A5F] border border-[#E07A5F] font-bold py-3.5 px-4 rounded-2xl shadow-sm transition-all duration-200 transform active:scale-95 text-sm cursor-pointer"
  >
    🔄 Cek Username Lain
  </button>
  
  <p className="text-[11px] text-center text-gray-400">
    Hasil ini murni untuk hiburan semata, jangan dibawa serius ya!
  </p>
</div>

      </div>
    </div>
  );
            }
