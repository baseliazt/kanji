import SVGIcon from "@/core/icons";
import * as React from "react";
import clsx from "clsx";
import { AudioWave } from "@/core/components/audio_wave";

export interface AudioQuestionProps {
  voice_url?: string;
}

export const AudioQuestion = ({ voice_url = "" }: AudioQuestionProps) => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  // Attach event listener safely
  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioRef.current]);

  const handlePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  return (
    <div
      className={clsx(
        "grid grid-flow-col place-content-center place-items-center gap-[1rem]",
        "w-full min-h-[200px]"
      )}
    >
      <button onClick={handlePlay}>
        <SVGIcon
          name="Play"
          className={clsx("w-[2rem] h-[2rem]", "text-[black]")}
        />
      </button>
      <AudioWave isPlaying={isPlaying} />

      <audio ref={audioRef} src={voice_url} preload="auto" />
    </div>
  );
};
