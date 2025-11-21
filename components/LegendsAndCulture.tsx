"use client";

import { useRef, useState, useEffect } from "react";
import SectionContainer from "./common/SectionContainer";

export default function LegendsAndCulture() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);

  const handleToggle = () => {
    if (!audioRef.current) return;
    if (!hasAudio) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    let alive = true;
    const controller = new AbortController();
    fetch('/static/audio/elder-story.mp3', { method: 'HEAD', signal: controller.signal })
      .then((res) => {
        if (alive) setHasAudio(res.ok);
      })
      .catch(() => {
        if (alive) setHasAudio(false);
      });
    return () => {
      alive = false;
      controller.abort();
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden py-28 md:py-40">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 transform transition-transform duration-10000 animate-scale-up"
          style={{ backgroundImage: "url('/static/images/temple-background.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/80 dark:from-background/90 dark:via-background/60 dark:to-background/90"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-[url('/static/images/himalaya-silhouette.svg')] bg-repeat-x bg-bottom opacity-10 dark:opacity-15"></div>
        <div className="absolute inset-0 bg-[url('/static/images/noise-pattern.svg')] opacity-5 mix-blend-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="w-24 h-1 bg-gradient-to-r from-himalayan-green/40 via-himalayan-saffron to-himalayan-green/40 rounded-full mb-10 mx-auto animate-pulse-slow"></div>

        <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold font-brandSerif mb-8 text-white animate-fade-in-up">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 dark:from-white dark:via-white/90 dark:to-white/80">
            Where Legends Still Breathe
          </span>
        </h2>

        <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12 animate-fade-in-up [animation-delay:200ms]">
          Travel like a Yatri. Listen to the mountains, the villages, the voices of ancestors.
        </p>

        {/* Elder’s Voice Card */}
        <div className="mt-16 max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-[0_15px_30px_rgba(0,0,0,0.25)] animate-fade-in-up [animation-delay:400ms] transform transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-[1.02]">
          <div className="flex items-center space-x-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-himalayan-green/30 to-himalayan-saffron/30 flex items-center justify-center shadow-inner border border-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" x2="12" y1="19" y2="22"></line>
              </svg>
            </div>
            <div className="text-left">
              <p className="text-white text-lg italic font-medium leading-relaxed">
                &quot;A silent guardian watches every step. Move with respect, move as a Yatri.&quot;
              </p>
              <p className="text-white/70 text-sm mt-3 font-light tracking-wide">— Elder from Mandi District</p>
            </div>
          </div>

          {/* Audio bars animation */}
          <div className="mt-6 flex justify-center items-center space-x-1.5">
            {[1, 2, 3, 4, 5, 6, 7].map((bar) => (
              <div
                key={bar}
                className={`w-1 rounded-full transition-all duration-300 ${isPlaying ? "animate-pulse-slow bg-gradient-to-t from-himalayan-green/60 to-himalayan-saffron/60" : "bg-white/20"}`}
                style={{
                  height: `${bar * 3}px`,
                  animationDelay: `${bar * 0.15}s`
                }}
              ></div>
            ))}
          </div>

          {/* Hidden Audio */}
          {hasAudio && (
            <audio
              ref={audioRef}
              src="/static/audio/elder-story.mp3"
              className="hidden"
              preload="none"
              onEnded={handleEnded}
            />
          )}

          {/* Play Button */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleToggle}
              className="flex items-center space-x-2 text-xs uppercase tracking-widest text-white/80 hover:text-white transition-colors duration-300 group"
            >
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-himalayan-saffron/50 transition-colors duration-300">
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="10" y1="4" x2="10" y2="20" />
                    <line x1="14" y1="4" x2="14" y2="20" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                )}
              </span>
              <span>{hasAudio ? (isPlaying ? "Pause Story" : "Listen to Story") : "Story Coming Soon"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
