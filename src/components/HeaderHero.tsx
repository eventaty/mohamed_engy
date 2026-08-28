import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

export const HeaderHero: React.FC = () => {
  return (
    <div className="relative text-center pt-8 pb-6 px-4">
      {/* Top Lovely Badge */}
      <motion.div
        initial={{ opacity: 0, y: -25, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex items-center justify-center gap-3 mb-5"
      >
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#ff4b6e] to-transparent" />
        <span className="text-[#ff758c] text-xs font-semibold flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#f43f5e]/40 bg-[#1f0a15]/80 shadow-[0_0_15px_rgba(244,63,94,0.25)]">
          <Heart className="w-3.5 h-3.5 text-[#ff4b6e] fill-[#ff4b6e] animate-pulse" />
          <span>دعوة عقد قران مبارك</span>
          <Heart className="w-3.5 h-3.5 text-[#ff4b6e] fill-[#ff4b6e] animate-pulse" />
        </span>
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#ff4b6e] to-transparent" />
      </motion.div>

      {/* Bismillah */}
      <motion.p
        initial={{ opacity: 0, scale: 0.85, y: -10 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="font-scheherazade text-xl sm:text-2xl text-[#fbcfe8] opacity-90 mb-3 tracking-wide whitespace-nowrap"
      >
        بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ
      </motion.p>

      {/* Quranic Verse */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-md mx-auto my-4 p-4 rounded-2xl bg-gradient-to-b from-[#250d1a]/85 to-[#13060e]/95 border border-[#f43f5e]/30 shadow-xl relative overflow-hidden"
      >
        <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#e11d48]/15 rounded-full blur-xl" />
        <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-[#ff4b6e]/15 rounded-full blur-xl" />
        
        <p className="font-scheherazade text-lg sm:text-xl text-[#ffe4e6] leading-relaxed text-balance">
          « وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً »
        </p>
        <span className="text-[11px] text-[#fda4af] block mt-1.5 font-sans font-medium whitespace-nowrap">
          [ سورة الروم : ٢١ ]
        </span>
      </motion.div>

      {/* Invitation Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <p className="text-[#fecdd3] text-xs sm:text-sm mt-5 mb-1 font-normal leading-relaxed whitespace-nowrap">
          بقلوب يملؤها الحب والسرور، نتشرف بدعوتكم لمشاركتنا فرحة
        </p>
        <p className="text-[#ff4b6e] font-bold text-base sm:text-lg mb-5 tracking-wide flex items-center justify-center gap-1.5 whitespace-nowrap">
          <Sparkles className="w-4 h-4 text-[#ff758c]" />
          <span>عقد قران وكتب كتاب</span>
          <Sparkles className="w-4 h-4 text-[#ff758c]" />
        </p>
      </motion.div>

      {/* Bride and Groom Names Showcase (Pink, Red & Black Luxury Frame) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 35 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
        className="relative py-7 px-5 my-2 max-w-md mx-auto rounded-3xl love-card relative overflow-hidden"
      >
        {/* Floating Heart background lights */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-[#f43f5e]/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-28 h-28 bg-[#be123c]/25 rounded-full blur-2xl pointer-events-none" />

        {/* Decorative corner hearts */}
        <div className="absolute top-3 right-3 text-[#ff4b6e]/60 text-xs">💖</div>
        <div className="absolute top-3 left-3 text-[#ff4b6e]/60 text-xs">💖</div>
        <div className="absolute bottom-3 right-3 text-[#ff4b6e]/60 text-xs">💖</div>
        <div className="absolute bottom-3 left-3 text-[#ff4b6e]/60 text-xs">💖</div>

        <div className="flex flex-col items-center justify-center gap-2 pb-2">
          {/* Groom Name */}
          <h1 className="font-scheherazade text-4xl sm:text-5xl font-bold tracking-wide love-gradient-text drop-shadow-[0_2px_10px_rgba(244,63,94,0.5)] pt-1 pb-1">
            محمد
          </h1>

          {/* Romantic Love Emblem */}
          <div className="flex items-center justify-center gap-3 my-1">
            <div className="h-[1px] w-14 bg-gradient-to-l from-[#ff4b6e] to-transparent" />
            <div className="w-9 h-9 rounded-full bg-[#f43f5e]/20 border border-[#ff4b6e]/60 flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.5)] animate-pulse">
              <Heart className="w-4 h-4 text-[#ff4b6e] fill-[#ff4b6e]" />
            </div>
            <div className="h-[1px] w-14 bg-gradient-to-r from-[#ff4b6e] to-transparent" />
          </div>

          {/* Bride Name */}
          <h1 className="font-scheherazade text-4xl sm:text-5xl font-bold tracking-wide love-gradient-text drop-shadow-[0_2px_10px_rgba(244,63,94,0.5)] pt-1 pb-3 mb-2 leading-relaxed">
            إنجي
          </h1>
        </div>

        <div className="mt-4 pt-3 border-t border-[#f43f5e]/20 flex items-center justify-center gap-2 text-xs text-[#fda4af]">
          <span>بارك الله لهما وبارك عليهما وجمع بينهما في خير 🤍</span>
        </div>
      </motion.div>
    </div>
  );
};
