import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import ResultPage from './components/ResultPage';

export default function App() {
  const [username, setUsername] = useState('');
  const [page, setPage] = useState('landing');
  const [generatedData, setGeneratedData] = useState(null);

  // Kumpulan data variasi untuk diacak secara konsisten berdasarkan username
  const poolData = {
    overthinker: {
      titles: ["Sambat Berkedok Estetik", "Filsuf Jam 2 Pagi", "Korban Algoritma Galau", "Duta Insomnia Linimasa"],
      levels: ["Overthinker Akut", "Setengah Khayal", "Butuh Sinyal WiFi & Pelukan", "Ahli Teori Konspirasi Hidup"],
      punchlines: [
        "Kamu di Threads keliatannya kayak indie boy/girl yang suka kopi, tapi isi kepala kamu pas malam hari udah kayak sidang skripsi. Kurang-kurangin begadang ya!",
        "Postingan kamu fajar semua. Kamu gak butuh Threads, kamu butuh tidur cepat dan asupan validasi yang cukup. Skor kewarasanmu tipis banget kayak tisu dibagi dua.",
        "Hobi nanya pertanyaan eksistensial kayak 'kenapa kita harus kerja'. Ya karena kita gak kaya dari lahir, Sayang. Ayo tidur, besok senin."
      ]
    },
    sambat: {
      titles: ["Chief Complaining Officer", "Buruh Korporat Pasrah", "Menteri Urusan Mengeluh", "Si Paling Hari Senin"],
      levels: ["Sambat Prof", "Capek Nyari Duit", "Pengen Kaya Jalur Give Away", "Pasrah tapi Gak Resign"],
      punchlines: [
        "Isi Threads kamu kalau gak capek, ya pengen kaya. Hari Senin adalah musuh terbesarmu. Ingat, mengeluh tidak menyelesaikan masalah, tapi sangat melegakan, bukan?",
        "Tiap jam kerja isinya sambat, pas weekend isinya story pamer kopi mahal. Kamu adalah definisi budak korporat sejati yang terjebak dalam lingkaran setan kapitalisme.",
        "Ketik 'capek' udah jadi refleks bawaan jempol kamu. Cita-cita pengen kaya raya tapi hobi rebahan sambil nunggu warisan misterius yang gak bakal datang."
      ]
    },
    spillologist: {
      titles: ["Detektif Tanpa Gaji", "Badan Intelijen Threads", "Tim Huru-Hara Linimasa", "Profesor Ilmu Per-spill-an"],
      levels: ["Kang Nyimak Part 1-7", "Kasi Humas Drama", "Pengamat Keributan", "Si Paling Update"],
      punchlines: [
        "Postingan sendiri kagak ada, tapi kalau ada Threads yang lagi berantem, kamu paling depan nyimak dari part 1 sampai part 7. Threads kamu udah kayak koran kriminal.",
        "Kamu gak suka bikin huru-hara, tapi kamu paling benci kalau ada drama yang gak ada konklusinya. Jempolmu sangat terlatih untuk ngetik 'mana link-nya?'",
        "Akun intel sejati. Gak pernah posting apa-apa, tapi tahu semua gosip kreator Threads dari A sampai Z. Kamu harusnya digaji sama Meta sih."
      ]
    },
    silent: {
      titles: ["Warga Sipil Penurut", "Kang Ketawa Singkat", "Duta Awokwokwok", "Si Paling Damai"],
      levels: ["Penonton Layar Kaca", "Pengabdi Wkwk", "Pendukung Ghaib", "Irit Kuota Ketikan"],
      punchlines: [
        "Akun kamu sangat damai dan tenteram. Isi reply-mu cuma seputar 'wkwk', 'rill', atau drop meme. Dunia butuh lebih banyak orang santai kayak kamu.",
        "Saking jarangnya posting atau nyari masalah, algoritma Threads bingung kamu ini manusia beneran atau bot ramah lingkungan. Pertahankan kewarasanmu!",
        "Kamu adalah tipe orang yang buka Threads cuma buat cari hiburan pas lagi di toilet. Gak ribet, gak baperan, yang penting ketawa."
      ]
    }
  };

  // Fungsi matematika untuk mengubah teks username menjadi angka acak yang konsisten (Seed Hashing)
  const getSeedFromString = (str) => {
    let hash = 0;
    const cleanStr = str.toLowerCase().trim();
    for (let i = 0; i < cleanStr.length; i++) {
      hash = cleanStr.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };

  const handleAnalyze = (submittedUsername) => {
    const seed = getSeedFromString(submittedUsername);

    // 1. Tentukan kategori dominan (0: Overthinker, 1: Sambat, 2: Spillologist, 3: Silent)
    const categories = ['overthinker', 'sambat', 'spillologist', 'silent'];
    const dominantIndex = seed % categories.length;
    const dominantCategory = categories[dominantIndex];

    // 2. Generate skor untuk Pie Chart (Total harus 100)
    // Skor diatur agar kategori dominan mendapat porsi paling besar
    let scores = { overthinker: 10, sambat: 10, drama_investigator: 10, silent: 10 };
    const baseRemaining = 60;
    const extra = seed % 15; // variasi angka kecil

    if (dominantCategory === 'overthinker') {
      scores = { overthinker: 55 + extra, sambat: 20, drama_investigator: 15 - extra, silent: 10 };
      var sanity = 15 + (seed % 21); // Rentang 15% - 35%
    } else if (dominantCategory === 'sambat') {
      scores = { overthinker: 20, sambat: 60 + extra, drama_investigator: 10, silent: 10 - extra };
      var sanity = 5 + (seed % 26); // Rentang 5% - 30%
    } else if (dominantCategory === 'spillologist') {
      scores = { overthinker: 15, sambat: 15, drama_investigator: 55 + extra, silent: 15 - extra };
      var sanity = 45 + (seed % 26); // Rentang 45% - 70%
    } else {
      scores = { overthinker: 10, sambat: 10, drama_investigator: 10, silent: 70 };
      var sanity = 75 + (seed % 21); // Rentang 75% - 95%
    }

    // 3. Ambil teks variasi secara acak berdasarkan nilai seed
    const pool = poolData[dominantCategory];
    const title = pool.titles[seed % pool.titles.length];
    const level = pool.levels[(seed + 1) % pool.levels.length];
    const punchline = pool.punchlines[(seed + 2) % pool.punchlines.length];

    // 4. Bungkus jadi objek data siap pakai
    const finalResult = {
      scores: {
        overthinker: scores.overthinker,
        sambat_professional: scores.sambat,
        drama_investigator: scores.drama_investigator,
        silent_supporter: scores.silent
      },
      result_meta: {
        title: title,
        personality_level: level,
        sanity_score: sanity,
        punchline: punchline
      }
    };

    setUsername(submittedUsername);
    setGeneratedData(finalResult);
    setPage('result');
  };

  const handleReset = () => {
    setPage('landing');
    setUsername('');
    setGeneratedData(null);
  };

  return (
    <>
      {page === 'landing' ? (
        <LandingPage onAnalyze={handleAnalyze} />
      ) : (
        <ResultPage username={username} dataMock={generatedData} onReset={handleReset} />
      )}
    </>
  );
      }
