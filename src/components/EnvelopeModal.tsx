import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

interface EnvelopeModalProps {
  onOpen: () => void;
}

export const EnvelopeModal: React.FC<EnvelopeModalProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    // Trigger parent open to start music immediately on this direct user gesture
    onOpen();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#070205] bg-opacity-95 backdrop-blur-md px-4 select-none overflow-hidden"
    >
      {/* Ambient background glow behind envelope */}
      <div className="absolute w-72 h-72 rounded-full bg-[#ff4b6e]/20 blur-3xl pointer-events-none" />

      {/* Floating gentle particles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [-10, 10, -10], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-[#ff758c]"
        />
        <motion.div
          animate={{ y: [10, -10, 10], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-[#f43f5e]"
        />
      </div>

      <div className="relative w-full max-w-[340px] flex flex-col items-center">
        {/* Envelope Container */}
        <motion.div
          animate={
            isOpening
              ? { scale: [1, 1.03, 0.9], y: [0, -15, 40], opacity: [1, 1, 0] }
              : { y: [0, -6, 0] }
          }
          transition={
            isOpening
              ? { duration: 0.85, ease: 'easeInOut' }
              : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }
          className="w-full relative cursor-pointer group"
          onClick={handleOpenClick}
        >
          {/* The Envelope Base Card */}
          <div className="relative w-full h-[220px] rounded-2xl bg-gradient-to-b from-[#2a0c1e] to-[#160510] border border-[#ff4b6e]/40 p-5 flex flex-col items-center justify-between shadow-[0_10px_35px_rgba(244,63,94,0.25)] overflow-hidden">
            {/* Top decorative flap shadow line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff758c] to-transparent opacity-70" />

            {/* Top Minimal Text */}
            <div className="text-center pt-2">
              <span className="text-[11px] text-[#fda4af] font-medium tracking-widest block uppercase opacity-85">
                دعوة خاصة
              </span>
              <h2 className="font-scheherazade text-2xl font-bold text-[#ffe4e6] mt-0.5">
                محمد & إنجي
              </h2>
            </div>

            {/* Center Wax Seal / Heart Icon */}
            <motion.div
              animate={isOpening ? { scale: [1, 1.3, 0] } : { scale: [1, 1.06, 1] }}
              transition={
                isOpening
                  ? { duration: 0.5 }
                  : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }
              className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff4b6e] to-[#9f1239] border-2 border-[#ffccd5] flex items-center justify-center shadow-[0_0_20px_rgba(255,75,110,0.6)] relative z-10"
            >
              <Heart className="w-8 h-8 text-white fill-white drop-shadow-md" />
            </motion.div>

            {/* Bottom Minimal Subtitle */}
            <div className="text-center pb-1">
              <p className="text-xs text-[#fecdd3]/80 font-light flex items-center justify-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#ff758c]" />
                <span>عقد قران مبارك</span>
                <Sparkles className="w-3 h-3 text-[#ff758c]" />
              </p>
            </div>
          </div>
        </motion.div>

        {/* Minimal Call-To-Action Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={handleOpenClick}
          disabled={isOpening}
          className="mt-6 w-full py-3.5 px-6 rounded-2xl love-button text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(244,63,94,0.4)] active:scale-95 transition-transform cursor-pointer"
        >
          <Heart className="w-4 h-4 fill-white" />
          <span>{isOpening ? 'جاري فتح الدعوة...' : 'فتح الدعوة'}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
