import * as React from "react";
import clsx from "clsx";
import { useTranslation } from "@/pwa/core/i18n/hooks";
import { Button } from "@/pwa/core/components/button";
import SVGIcon from "@/pwa/core/icons";

export interface KanjiStrokeAnimationProps {
  kanji?: string;
  className?: string;
}

export const KanjiStrokeAnimation = ({ 
  kanji = "", 
  className 
}: KanjiStrokeAnimationProps) => {
  const { t } = useTranslation();
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [svgContent, setSvgContent] = React.useState<string>("");
  const [isAnimating, setIsAnimating] = React.useState(false);

  const loadSvg = async () => {
    const codePoint = kanji.codePointAt(0)?.toString(16).padStart(5, "0");
    const path = `/images/kanji/${codePoint}.svg`;

    try {
      const res = await fetch(path);
      const text = await res.text();
      setSvgContent(text);
    } catch (err) {
      console.error("Failed to load SVG:", err);
    }
  };

  const applyInitialStyleToPaths = () => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const paths = svgEl.querySelectorAll("path");
    paths.forEach((path) => {
      path.style.animation = "none";
      path.style.animationDelay = "0s";
      path.style.stroke = "#ffffff";
      path.style.fill = "none";
      path.style.strokeWidth = "8";
      path.style.strokeLinecap = "round";
      path.style.strokeLinejoin = "round";
    });
  };

  const animateStrokes = () => {
    const svgEl = svgRef.current;
    if (!svgEl || isAnimating) return;

    setIsAnimating(true);
    const paths = svgEl.querySelectorAll("path");

    paths.forEach((path, index) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.style.animation = `draw-stroke 1s ease forwards`;
      path.style.animationDelay = `${index * 0.8}s`;
    });

    // Reset animation after completion
    const totalDuration = (paths.length * 0.8 + 1) * 1000;
    setTimeout(() => {
      setIsAnimating(false);
      applyInitialStyleToPaths();
    }, totalDuration);
  };

  React.useEffect(() => {
    if (kanji) {
      loadSvg();
    }
  }, [kanji]);

  React.useEffect(() => {
    if (svgContent) {
      applyInitialStyleToPaths();
    }
  }, [svgContent]);

  return (
    <div className={clsx("flex flex-col items-center gap-6", className)}>
      <div
        className={clsx(
          "relative",
          "w-48 h-48",
          "bg-gradient-to-br from-slate-800 to-slate-900",
          "rounded-2xl",
          "flex items-center justify-center",
          "shadow-2xl border border-slate-700"
        )}
      >
        {/* Grid background for writing practice */}
        <div className={clsx(
          "absolute inset-4",
          "border-2 border-dashed border-slate-600 opacity-30"
        )}>
          <div className={clsx(
            "absolute inset-0",
            "border-l border-t border-slate-600",
            "grid grid-cols-2 grid-rows-2"
          )}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border-r border-b border-slate-600" />
            ))}
          </div>
        </div>

        <div className={clsx("w-36 h-36", "mx-auto my-0", "relative z-10")}>
          {svgContent && (
            <svg
              ref={svgRef}
              viewBox="0 0 109 109"
              width="100%"
              height="100%"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          )}
        </div>

        <style>{`
          @keyframes draw-stroke {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      </div>

      <Button
        onClick={animateStrokes}
        disabled={isAnimating}
        className={clsx(
          "flex items-center gap-2",
          "px-6 py-3",
          "bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600",
          "text-white font-medium",
          "rounded-lg transition-colors"
        )}
      >
        <SVGIcon 
          name={isAnimating ? "Loader2" : "Play"} 
          className={clsx(
            "w-4 h-4", 
            isAnimating && "animate-spin"
          )} 
        />
        {t("tips:cta_animate")}
      </Button>
    </div>
  );
};
