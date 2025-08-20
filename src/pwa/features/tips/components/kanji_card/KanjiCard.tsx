import * as React from "react";
import { Play, Pause, Info, Brain, BookOpen, Zap } from "lucide-react";
import clsx from "clsx";

export interface KanjiCardProps {
  kanjiData?: {
    id: string;
    kanji: string;
    stroke: number;
    level: string;
    kunyomi: Array<{ "ja-Hira": string; "ja-Latn": string }>;
    onyomi: Array<{ "ja-Hira": string; "ja-Latn": string }>;
    mnemonic?: Array<{ "id-ID": string; "en-US": string }>;
    visualMnemonic?: Array<{ "id-ID": string; "en-US": string }>;
    vocabulary: Array<{
      kanji: string;
      romaji: string;
      kana: string;
      "en-US": string;
      "id-ID": string;
    }>;
  };
  className?: string;
}

export const KanjiCard = ({ kanjiData, className }: KanjiCardProps) => {
  const [activeTab, setActiveTab] = React.useState<'stroke' | 'info' | 'memory' | 'examples'>('stroke');
  const [isAnimating, setIsAnimating] = React.useState(false);

  if (!kanjiData) {
    return (
      <div className={clsx(
        "bg-slate-800/90 backdrop-blur-sm text-slate-300 p-8 text-xl font-medium rounded-2xl shadow-2xl border border-slate-700",
        className
      )}>
        <div className="text-center">
          <div className="text-4xl mb-4">📚</div>
          <div>No kanji data available</div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'stroke', label: 'Stroke', icon: Zap },
    { id: 'info', label: 'Info', icon: Info },
    { id: 'memory', label: 'Memory', icon: Brain },
    { id: 'examples', label: 'Examples', icon: BookOpen }
  ] as const;

  return (
    <div className={clsx(
      "w-full bg-slate-800 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 overflow-hidden",
      "min-h-[600px]",
      className
    )}>
      {/* SUCCESS indicator untuk debugging */}
      <div className="bg-green-600 text-white p-3 text-center font-bold">
        ✅ KanjiCard is rendering: {kanjiData.kanji}
      </div>
      
      {/* Header dengan Kanji */}
      <div className={clsx(
        "relative p-6 sm:p-8 text-center",
        "bg-gradient-to-br from-slate-700 to-slate-800",
        "border-b border-slate-600"
      )}>
        <div className={clsx(
          "text-6xl sm:text-7xl md:text-8xl font-bold text-white mb-4 drop-shadow-lg",
          "font-noto-serif-jp"
        )}>
          {kanjiData.kanji}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
            <span className="text-sm font-medium">Level {kanjiData.level}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            <span className="text-sm font-medium">{kanjiData.stroke} strokes</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={clsx(
        "flex bg-slate-800 border-b border-slate-600 p-2 gap-1"
      )}>
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "flex-1 px-2 sm:px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300",
                "flex items-center justify-center gap-1 sm:gap-2",
                "hover:bg-slate-700",
                activeTab === tab.id
                  ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              <IconComponent className="w-4 h-4" />
              <span className="hidden xs:inline text-xs sm:text-sm">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-6 min-h-[400px]">
        {activeTab === 'stroke' && (
          <div className={clsx("animate-fade-in space-y-4")}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-400" />
                <span className="hidden sm:inline">Stroke Order Animation</span>
                <span className="sm:hidden">Strokes</span>
              </h3>
              <button
                onClick={() => setIsAnimating(!isAnimating)}
                className={clsx(
                  "px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200",
                  "flex items-center gap-2 text-sm sm:text-base",
                  "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
                )}
              >
                {isAnimating ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span className="hidden sm:inline">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span className="hidden sm:inline">Play</span>
                  </>
                )}
              </button>
            </div>
            
            <div className={clsx(
              "bg-slate-900/50 rounded-xl p-6 sm:p-8 border border-slate-600/30",
              "flex items-center justify-center min-h-[250px] sm:min-h-[300px]"
            )}>
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-600 select-none">
                {kanjiData.kanji}
              </div>
            </div>
            
            <div className="text-slate-400 text-xs sm:text-sm text-center">
              Click Play to see stroke order animation
            </div>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="animate-fade-in space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2 mb-6">
              <Info className="w-5 h-5 text-blue-400" />
              <span className="hidden sm:inline">Kanji Information</span>
              <span className="sm:hidden">Info</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/30">
                <div className="text-slate-300 text-xs sm:text-sm font-medium mb-2">Kunyomi (訓読み)</div>
                <div className="text-white text-sm sm:text-base">
                  {kanjiData.kunyomi.length > 0 
                    ? kanjiData.kunyomi.map(k => k["ja-Hira"]).join(", ") 
                    : "No data"}
                </div>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/30">
                <div className="text-slate-300 text-xs sm:text-sm font-medium mb-2">Onyomi (音読み)</div>
                <div className="text-white text-sm sm:text-base">
                  {kanjiData.onyomi.length > 0 
                    ? kanjiData.onyomi.map(o => o["ja-Hira"]).join(", ") 
                    : "No data"}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'memory' && (
          <div className="animate-fade-in space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2 mb-6">
              <Brain className="w-5 h-5 text-purple-400" />
              <span className="hidden sm:inline">Memory Aids</span>
              <span className="sm:hidden">Memory</span>
            </h3>
            
            {kanjiData.mnemonic && kanjiData.mnemonic.length > 0 ? (
              <div className="space-y-4">
                {kanjiData.mnemonic.map((mnemonic, index) => (
                  <div key={index} className={clsx(
                    "bg-gradient-to-r from-purple-900/30 to-purple-800/20",
                    "p-4 sm:p-5 rounded-xl border border-purple-700/30"
                  )}>
                    <div className="text-purple-300 text-xs sm:text-sm font-medium mb-2">
                      💡 Memory Tip #{index + 1}
                    </div>
                    <div className="text-white text-sm sm:text-base leading-relaxed">
                      {mnemonic["id-ID"]}
                    </div>
                  </div>
                ))}
                
                {kanjiData.visualMnemonic && kanjiData.visualMnemonic.length > 0 && (
                  <div className="mt-6">
                    <div className="text-slate-300 text-base sm:text-lg font-medium mb-4">Visual Breakdown:</div>
                    <div className="space-y-3">
                      {kanjiData.visualMnemonic.map((visual, index) => (
                        <div key={index} className="bg-slate-700/30 p-4 rounded-lg border border-slate-600/30">
                          <div className="text-slate-200 text-sm sm:text-base">
                            {visual["id-ID"]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-slate-400 text-center py-8 text-sm sm:text-base">
                No memory aids available for this kanji
              </div>
            )}
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="animate-fade-in space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              <span className="hidden sm:inline">Vocabulary Examples</span>
              <span className="sm:hidden">Examples</span>
            </h3>
            
            {kanjiData.vocabulary && kanjiData.vocabulary.length > 0 ? (
              <div className="space-y-3">
                {kanjiData.vocabulary.slice(0, 4).map((vocab, index) => (
                  <div key={index} className={clsx(
                    "bg-gradient-to-r from-slate-700/50 to-slate-800/30",
                    "p-4 rounded-lg border border-slate-600/30",
                    "hover:bg-slate-700/70 transition-colors duration-200"
                  )}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                      <div className="text-white text-lg sm:text-xl font-bold">
                        {vocab.kanji}
                      </div>
                      <div className="text-slate-300 text-sm sm:text-base">
                        {vocab.kana}
                      </div>
                    </div>
                    <div className="text-slate-400 text-xs sm:text-sm mb-1">
                      {vocab.romaji}
                    </div>
                    <div className="text-slate-200 text-sm sm:text-base">
                      {vocab["id-ID"]}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-400 text-center py-8 text-sm sm:text-base">
                No vocabulary examples available
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};