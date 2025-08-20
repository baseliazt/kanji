import { TipsContainer } from "@/pwa/features/tips/container";
import { TipsProvider } from "@/pwa/features/tips/context";

export default function TipsTestPage() {
  return (
    <TipsProvider>
      <div>
        <h1>Tips Test Page</h1>
        <button 
          onClick={() => {
            const testData = [
              {
                id: "test1",
                kanji: "先",
                stroke: 6,
                level: "N5",
                kunyomi: [{ "ja-Hira": "さき", "ja-Latn": "saki" }],
                onyomi: [{ "ja-Hira": "せん", "ja-Latn": "sen" }],
                vocabulary: [
                  {
                    kanji: "先生",
                    romaji: "sensei",
                    kana: "せんせい",
                    "en-US": "teacher",
                    "id-ID": "guru"
                  }
                ],
                mnemonic: [
                  {
                    "en-US": "The kid with horns runs ahead — he wants to go first (先)!",
                    "id-ID": "Anak itu lari ke depan lebih dulu—dia mau jadi yang paling dahulu (先)!"
                  }
                ],
                visualMnemonic: [
                  {
                    "en-US": "⺧ = something ahead / a shape leading",
                    "id-ID": "Bagian atas seperti tanduk atau kepala (⺧)"
                  }
                ]
              }
            ];
            localStorage.setItem('KanjiSelection', JSON.stringify(testData));
            window.location.reload();
          }}
        >
          Load Test Data
        </button>
        <TipsContainer />
      </div>
    </TipsProvider>
  );
}
