"use client";

export default function TTSPlayPage() {
  const play = async () => {
    const res = await fetch(`/api/tts?text=午前&lang=ja`);
    if (!res.ok) {
      alert("Gagal memuat suara");
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">TTS Google Translate</h1>
      <button
        onClick={play}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Putar "Selamat pagi"
      </button>
    </div>
  );
}
