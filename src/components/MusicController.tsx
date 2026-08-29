import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music2, Disc, Heart } from 'lucide-react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    YT: any;
  }
}

export const MusicController: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showInteractionPrompt, setShowInteractionPrompt] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const videoId = 'mHpTdsBbYRM';
  const startTime = 140.5; // 2 minutes and 20.5 seconds (in between 2:20 and 2:21)

  const playMusic = () => {
    if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
      try {
        if (typeof playerRef.current.getCurrentTime === 'function' && playerRef.current.getCurrentTime() < startTime) {
          playerRef.current.seekTo(startTime, true);
        }
        playerRef.current.playVideo();
        setIsPlaying(true);
        setShowInteractionPrompt(false);
      } catch (err) {
        console.log('Play error:', err);
      }
    } else if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      setIsPlaying(true);
      setShowInteractionPrompt(false);
    }
  };

  // Initialize YouTube Player
  useEffect(() => {
    // Listen for custom trigger to play from envelope
    const handleStartAudioEvent = () => {
      playMusic();
    };

    window.addEventListener('start-invitation-music', handleStartAudioEvent);

    // Inject YouTube API if needed
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (window.YT && window.YT.Player) {
        try {
          playerRef.current = new window.YT.Player('yt-wedding-audio', {
            events: {
              onReady: (event: any) => {
                try {
                  event.target.seekTo(startTime, true);
                  // If envelope was already opened, play
                  const isOpened = window.sessionStorage.getItem('invitation_opened') === 'true';
                  if (isOpened) {
                    event.target.playVideo();
                    setIsPlaying(true);
                  }
                } catch {
                  // Browser policy
                }
              },
              onStateChange: (event: any) => {
                if (event.data === 1) {
                  setIsPlaying(true);
                  setShowInteractionPrompt(false);
                } else if (event.data === 2 || event.data === 0) {
                  setIsPlaying(false);
                }
              },
            },
          });
        } catch (e) {
          console.warn('YT Player init notice:', e);
        }
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      window.removeEventListener('start-invitation-music', handleStartAudioEvent);
    };
  }, [videoId, startTime]);

  const togglePlay = () => {
    setShowInteractionPrompt(false);
    if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    } else if (iframeRef.current && iframeRef.current.contentWindow) {
      if (isPlaying) {
        iframeRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        setIsPlaying(false);
      } else {
        iframeRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        setIsPlaying(true);
      }
    } else {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
    }
  };

  const toggleMute = () => {
    if (playerRef.current && typeof playerRef.current.mute === 'function') {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  return (
    <>
      {/* Embedded YouTube Player with sound and loop */}
      <div className="fixed -top-[500px] -left-[500px] w-10 h-10 overflow-hidden pointer-events-none opacity-0 z-[-1]">
        <iframe
          id="yt-wedding-audio"
          ref={iframeRef}
          width="200"
          height="200"
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&start=${startTime}&loop=1&playlist=${videoId}&playsinline=1&controls=0&modestbranding=1`}
          title="أغنية كتب الكتاب"
          allow="autoplay; encrypted-media"
        />
      </div>

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
