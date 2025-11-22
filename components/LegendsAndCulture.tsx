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
    <section className="relative w-full overflow-hidden py-32 md:py-48">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 transform transition-transform duration-[20000ms] animate-scale-up"
          style={{ backgroundImage: "url('/static/images/temple-background.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/40 to-background/90"></div>
        <div className="absolute inset-0 bg-[url('/static/images/noise-pattern.svg')] opacity-10 mix-blend-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="w-16 h-1 bg-primary/60 rounded-full mb-12 mx-auto"></div>

        <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold font-brandSerif mb-8 text-white drop-shadow-xl animate-fade-in-up">
          Where Legends Still Breathe
        </h2>

        <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-16 font-light animate-fade-in-up [animation-delay:200ms]">
          Travel like a Yatri. Listen to the mountains, the villages, the voices of ancestors.
        </p>

        {/* Elder’s Voice Card */}
        <div className="mt-12 max-w-xl mx-auto bg-white/5 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-white/10 shadow-2xl animate-fade-in-up [animation-delay:400ms] group hover:bg-white/10 transition-colors duration-500">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 flex items-center justify-center shadow-lg border border-white/20 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" x2="12" y1="19" y2="22"></line>
              </svg>
            </div>
            <div className="text-center md:text-left">
              <p className="text-white text-xl md:text-2xl font-brandSerif italic leading-relaxed">
                &quot;A silent guardian watches every step. Move with respect, move as a Yatri.&quot;
              </p>
              <p className="text-primary-foreground/70 text-sm mt-4 font-medium tracking-widest uppercase">— Elder from Mandi District</p>
            </div>
          </div>

          {/* Audio bars animation */}
          <div className="mt-10 flex justify-center items-center space-x-2 h-12">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((bar) => (
              <div
                key={bar}
                className={`w-1.5 rounded-full transition-all duration-500 ${isPlaying ? "animate-pulse-slow bg-secondary" : "bg-white/10 h-2"}`}
                style={{
                  height: isPlaying ? `${Math.max(10, Math.random() * 40)}px` : "4px",
                  animationDelay: `${bar * 0.1}s`
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
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleToggle}
              className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white hover:text-secondary transition-colors duration-300 group/btn"
            >
              <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-white/20 transition-colors duration-300 border border-white/10">
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="10" y1="4" x2="10" y2="20" />
                    <line x1="14" y1="4" x2="14" y2="20" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="ml-0.5">
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
