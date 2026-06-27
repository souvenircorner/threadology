import React, { useState } from 'react';
import LandingPage from './LandingPage';
import ResultPage from './ResultPage';

export default function App() {
  const [username, setUsername] = useState('');
  const [page, setPage] = useState('landing'); // 'landing' atau 'result'

  // Data tiruan (mock data) untuk testing sebelum API Threads dipasang
  const mockData = {
    scores: {
      overthinker: 45,
      sambat_professional: 35,
      drama_investigator: 15,
      silent_supporter: 5
    },
    result_meta: {
      title: "Sambat Berkedok Estetik",
      personality_level: "Overthinker Akut",
      sanity_score: 25,
      punchline: "Kamu di Threads keliatannya kayak indie boy/girl yang suka kopi, tapi isi reply kamu menunjukkan kamu siap gelud. Kurang-kurangin begadang ya!"
    }
  };

  const handleAnalyze = (submittedUsername) => {
    setUsername(submittedUsername);
    setPage('result');
  };

  const handleReset = () => {
    setPage('landing');
    setUsername('');
  };

  return (
    <>
      {page === 'landing' ? (
        <LandingPage onAnalyze={handleAnalyze} />
      ) : (
        <ResultPage username={username} dataMock={mockData} onReset={handleReset} />
      )}
    </>
  );
}
