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
  const [strokeSvg, setStrokeSvg] = React.useState<string | null>(null);
  const animationRef = React.useRef<number | null>(null);

  // Load SVG stroke data
  React.useEffect(() => {
    if (!kanjiData?.kanji) return;

    const loadStrokeSvg = async () => {
      try {
        // Convert kanji to unicode hex
        const unicodeHex = kanjiData.kanji.codePointAt(0)?.toString(16).padStart(5, '0').toLowerCase();
        if (!unicodeHex) return;

        const response = await fetch(`/images/kanji/${unicodeHex}.svg`);
        if (response.ok) {
          const svgText = await response.text();
          setStrokeSvg(svgText);
        } else {
          console.log(`SVG not found for kanji: ${kanjiData.kanji} (${unicodeHex})`);
        }
      } catch (error) {
        console.error('Failed to load stroke SVG:', error);
      }
    };

    loadStrokeSvg();
  }, [kanjiData?.kanji]);

  // Animation control
  React.useEffect(() => {
    if (!isAnimating) return;

    const container = document.getElementById('kanji-stroke-container');
    if (!container) return;

    if (strokeSvg) {
      // Use SVG animation
      container.innerHTML = strokeSvg;
      const svg = container.querySelector('svg');
      if (!svg) return;

      // Style the SVG
      svg.style.width = '100%';
      svg.style.height = '100%';
      svg.style.maxWidth = '250px';
      svg.style.maxHeight = '250px';

      const strokePaths = svg.querySelectorAll('path[id*="-s"]');
      if (strokePaths.length === 0) {
        setIsAnimating(false);
        return;
      }

      // Reset all strokes
      strokePaths.forEach((path) => {
        const pathElement = path as SVGPathElement;
        pathElement.style.opacity = '0.1';
        pathElement.style.stroke = '#10B981';
        pathElement.style.strokeWidth = '4';
        pathElement.style.fill = 'none';
      });

      let currentStroke = 0;
      const animateNextStroke = () => {
        if (currentStroke >= strokePaths.length || !isAnimating) {
          setIsAnimating(false);
          return;
        }

        const path = strokePaths[currentStroke] as SVGPathElement;
        const length = path.getTotalLength();
        
        path.style.opacity = '1';
        path.style.strokeDasharray = length.toString();
        path.style.strokeDashoffset = length.toString();
        path.style.animation = `draw-stroke 1s ease-in-out forwards`;

        currentStroke++;
        animationRef.current = window.setTimeout(animateNextStroke, 1200);
      };

      // Add CSS animation if not exists
      if (!document.querySelector('#stroke-animation-css')) {
        const style = document.createElement('style');
        style.id = 'stroke-animation-css';
        style.textContent = `
          @keyframes draw-stroke {
            to {
              stroke-dashoffset: 0;
            }
          }
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 0.7;
            }
            50% {
              transform: scale(1.1);
              opacity: 1;
            }
          }
        `;
        document.head.appendChild(style);
      }

      animateNextStroke();
    } else {
      // Fallback: Simple text-based indication
      const fallbackElement = container.querySelector('.kanji-text') as HTMLElement;
      if (fallbackElement) {
        fallbackElement.style.animation = 'pulse 2s ease-in-out infinite';
        animationRef.current = window.setTimeout(() => {
          setIsAnimating(false);
          if (fallbackElement) {
            fallbackElement.style.animation = '';
          }
        }, 3000);
      }
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isAnimating, strokeSvg]);

  // Cleanup animation when component unmounts
  React.useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

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
      "w-full bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] backdrop-blur-sm rounded-2xl overflow-hidden",
      "shadow-2xl shadow-black/50 border border-slate-600/50",
      "min-h-[600px]",
      className
    )}>
      {/* Header dengan Kanji */}
      <div className={clsx(
        "relative p-6 sm:p-8 text-center",
        "bg-gradient-to-br from-slate-700/80 to-slate-800/80 backdrop-blur",
        "border-b border-slate-600/50 shadow-inner"
      )}>
        <div className={clsx(
          "text-6xl sm:text-7xl md:text-8xl font-bold text-white mb-4 drop-shadow-2xl",
          "font-noto-serif-jp filter brightness-110"
        )}>
          {kanjiData.kanji}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></span>
            <span className="text-sm font-medium">Level {kanjiData.level}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></span>
            <span className="text-sm font-medium">{kanjiData.stroke} strokes</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={clsx(
        "flex bg-gradient-to-r from-[#2A2A2A] to-[#1F1F1F] border-b border-slate-600/50 p-2 gap-1",
        "shadow-inner"
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
                "hover:bg-green-700/20 hover:shadow-lg hover:shadow-green-500/20",
                activeTab === tab.id
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30 scale-105"
                  : "text-slate-400 hover:text-slate-200 hover:scale-102"
              )}
            >
              <IconComponent className="w-4 h-4" />
              <span className="hidden xs:inline text-xs sm:text-sm">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-6 min-h-[400px] bg-gradient-to-b from-[#1A1A1A] to-[#0F0F0F]">
        {activeTab === 'stroke' && (
          <div className={clsx("animate-fade-in space-y-4")}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-400 drop-shadow-lg" />
                <span className="hidden sm:inline">Stroke Order Animation</span>
                <span className="sm:hidden">Strokes</span>
              </h3>
              <button
                onClick={() => setIsAnimating(!isAnimating)}
                className={clsx(
                  "px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200",
                  "flex items-center gap-2 text-sm sm:text-base",
                  "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700",
                  "text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50",
                  "hover:scale-105 active:scale-95"
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
              "bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-xl p-6 sm:p-8",
              "border border-slate-600/30 shadow-inner shadow-black/50",
              "flex items-center justify-center min-h-[250px] sm:min-h-[300px]"
            )}>
              <div 
                id="kanji-stroke-container" 
                className="w-full h-full flex items-center justify-center"
              >
                {strokeSvg ? (
                  <div className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] flex items-center justify-center">
                    {/* SVG will be inserted here by animation logic */}
                    <div className="kanji-text text-2xl sm:text-3xl font-bold text-slate-600 select-none">
                      {kanjiData.kanji}
                    </div>
                  </div>
                ) : (
                  <div className="kanji-text text-4xl sm:text-5xl md:text-6xl font-bold text-slate-600 select-none">
                    {kanjiData.kanji}
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-slate-400 text-xs sm:text-sm text-center">
              {strokeSvg ? 'Click Play to see stroke order animation' : 'SVG stroke data not available'}
            </div>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="animate-fade-in space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2 mb-6">
              <Info className="w-5 h-5 text-green-400 drop-shadow-lg" />
              <span className="hidden sm:inline">Kanji Information</span>
              <span className="sm:hidden">Info</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] p-4 rounded-lg border border-slate-600/30 shadow-lg shadow-black/30">
                <div className="text-slate-300 text-xs sm:text-sm font-medium mb-2">Kunyomi (訓読み)</div>
                <div className="text-white text-sm sm:text-base">
                  {kanjiData.kunyomi.length > 0 
                    ? kanjiData.kunyomi.map(k => k["ja-Hira"]).join(", ") 
                    : "No data"}
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] p-4 rounded-lg border border-slate-600/30 shadow-lg shadow-black/30">
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
              <Brain className="w-5 h-5 text-green-400 drop-shadow-lg" />
              <span className="hidden sm:inline">Memory Aids</span>
              <span className="sm:hidden">Memory</span>
            </h3>
            
            {kanjiData.mnemonic && kanjiData.mnemonic.length > 0 ? (
              <div className="space-y-4">
                {kanjiData.mnemonic.map((mnemonic, index) => (
                  <div key={index} className={clsx(
                    "bg-gradient-to-br from-green-900/40 to-emerald-800/30",
                    "p-4 sm:p-5 rounded-xl border border-green-700/30",
                    "shadow-lg shadow-green-900/30"
                  )}>
                    <div className="text-green-300 text-xs sm:text-sm font-medium mb-2">
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
              <BookOpen className="w-5 h-5 text-green-400 drop-shadow-lg" />
              <span className="hidden sm:inline">Vocabulary Examples</span>
              <span className="sm:hidden">Examples</span>
            </h3>
            
            {kanjiData.vocabulary && kanjiData.vocabulary.length > 0 ? (
              <div className="space-y-3">
                {kanjiData.vocabulary.slice(0, 4).map((vocab, index) => (
                  <div key={index} className={clsx(
                    "bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] p-4 rounded-lg",
                    "border border-slate-600/30 shadow-lg shadow-black/30",
                    "hover:from-[#333333] hover:to-[#222222] hover:shadow-green-500/20",
                    "transition-all duration-300 hover:scale-[1.02]"
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