import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music2, Disc, Heart } from 'lucide-react';

export const MusicController: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showInteractionPrompt, setShowInteractionPrompt] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Start time in seconds (e.g. 72s for the iconic chorus 'بارك الله لكما' or 0 for the beginning)
  const startTime = 72;

  // Local audio path in public folder (e.g. ./song.mp3)
  const audioSrc = './song.mp3';

  const playMusic = () => {
    if (audioRef.current) {
      try {
        if (audioRef.current.currentTime < startTime || audioRef.current.currentTime === 0) {
          audioRef.current.currentTime = startTime;
        }
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setShowInteractionPrompt(false);
            })
            .catch((err) => {
              console.log('Audio autoplay prevented or file loading:', err);
              setShowInteractionPrompt(true);
            });
        }
      } catch (err) {
        console.log('Direct audio play error:', err);
      }
    }
  };

  useEffect(() => {
    // Setup Audio
    const audio = new Audio(audioSrc);
    audio.preload = 'auto';
    audio.loop = true;
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      if (audio.duration && startTime < audio.duration) {
        audio.currentTime = startTime;
      }
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    const handleStartAudioEvent = () => {
      playMusic();
    };

    window.addEventListener('start-invitation-music', handleStartAudioEvent);

    return () => {
      window.removeEventListener('start-invitation-music', handleStartAudioEvent);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.pause();
    };
  }, [audioSrc, startTime]);

  const togglePlay = () => {
    setShowInteractionPrompt(false);
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current.currentTime === 0 || audioRef.current.currentTime < startTime) {
        audioRef.current.currentTime = startTime;
      }
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log('Playback error:', e));
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !isMuted;
      audioRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  return (
    <>
      {/* Floating Music Control Widget (Compact & Elegant) */}
      <div className="fixed top-3 left-3 z-50 flex flex-col items-start gap-1.5">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative flex items-center gap-1.5"
        >
          {/* Main Glowing Music Disc Button - Compact (w-9 h-9) */}
          <button
            onClick={togglePlay}
            title={isPlaying ? 'إيقاف الأغنية' : 'تشغيل أغنية كتب الكتاب'}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border backdrop-blur-md shadow-lg transition-all cursor-pointer ${
              isPlaying
                ? 'bg-[#250a19]/95 border-[#ff4b6e] text-[#ff758c] shadow-[0_0_15px_rgba(244,63,94,0.5)] ring-1 ring-[#ff4b6e]/50'
                : 'bg-[#150610]/85 border-[#f43f5e]/40 text-[#fda4af] hover:border-[#ff4b6e] hover:text-white'
            }`}
          >
            {isPlaying ? (
              <Disc className="w-4 h-4 sm:w-5 sm:h-5 animate-slow-spin text-[#ff4b6e]" />
            ) : (
              <Music2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff758c]" />
            )}
          </button>

          {/* Mini Equalizer & Mute Toggle */}
          {isPlaying && (
            <div className="flex items-center gap-1">
              <div 
                onClick={toggleMute}
                title={isMuted ? 'إلغاء الكتم' : 'كتم الصوت'}
                className="flex items-center gap-0.5 h-7 px-2 rounded-full bg-[#200816]/90 border border-[#f43f5e]/30 cursor-pointer shadow-sm hover:border-[#ff4b6e]/60 transition-all"
              >
                <div className="w-0.5 bg-[#ff4b6e] rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2.5" />
                <div className="w-0.5 bg-[#f43f5e] rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-1.5" />
                <div className="w-0.5 bg-[#ff758c] rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-3" />
                <span className="text-[10px] text-[#fda4af] mr-1 font-medium select-none">
                  {isMuted ? 'مكتوم' : '🎵'}
                </span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Small Interaction Prompt Banner */}
        <AnimatePresence>
          {!isPlaying && showInteractionPrompt && (
            <motion.div
              initial={{ opacity: 0, y: -5, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              onClick={togglePlay}
              className="mt-0.5 py-1 px-2.5 rounded-full bg-[#2a0c1f]/95 border border-[#ff4b6e]/60 text-[#ffe4e6] text-[11px] flex items-center gap-1.5 shadow-[0_0_15px_rgba(244,63,94,0.35)] cursor-pointer backdrop-blur-md"
            >
              <Heart className="w-3 h-3 text-[#ff4b6e] fill-[#ff4b6e] shrink-0 animate-pulse" />
              <span>تشغيل الأغنية 🎵</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
