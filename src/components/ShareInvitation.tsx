import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Share2, Copy, Check, MessageCircle, HeartHandshake, Heart } from 'lucide-react';

export const ShareInvitation: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const shareTitle = 'دعوة عقد قران محمد وإنجي';
  const shareText = `يتشرف العروسان (محمد & إنجي) بدعوتكم لمشاركتهما فرحة عقد القران وكتب الكتاب بمسجد عثمان معن يوم الأحد. يمكنكم ترك تهنئتكم ومباركتكم عبر الرابط:`;
  const shareUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(`${shareText}\n${shareUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="px-4 max-w-md mx-auto my-6 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="love-card p-5 rounded-3xl text-center"
      >
        <div className="w-10 h-10 rounded-full bg-[#f43f5e]/20 border border-[#f43f5e]/40 flex items-center justify-center mx-auto mb-2 text-[#ff758c]">
          <HeartHandshake className="w-5 h-5" />
        </div>

        <h4 className="font-semibold text-sm text-[#fff0f3] mb-1 whitespace-nowrap">
          مشاركة الدعوة مع الأهل والأصدقاء
        </h4>
        <p className="text-[11px] sm:text-xs text-[#fecdd3]/80 mb-4 whitespace-nowrap">
          أرسل رابط الدعوة لمن تحب لمشاركتنا الفرحة وترك تهنئة 💌
        </p>

        <div className="flex gap-2">
          {/* WhatsApp Share */}
          <button
            onClick={handleWhatsAppShare}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#25d366]/20 hover:bg-[#25d366]/30 border border-[#25d366]/40 text-[#55eb8e] text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>واتساب</span>
          </button>

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#220a18] hover:bg-[#2e0e22] border border-[#f43f5e]/40 text-[#fff0f3] text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">تم النسخ</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#ff4b6e]" />
                <span>نسخ الرابط</span>
              </>
            )}
          </button>

          {/* Web Share */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="py-2.5 px-3 rounded-xl bg-[#f43f5e]/20 hover:bg-[#f43f5e]/30 border border-[#f43f5e]/40 text-[#ff758c] text-xs flex items-center justify-center cursor-pointer"
              title="مشاركة"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </motion.div>

      {/* Romantic Footer */}
      <motion.footer 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mt-8 text-center text-[11px] text-[#fda4af]/70"
      >
        <p className="font-scheherazade text-sm text-[#ff758c] flex items-center justify-center gap-1.5 whitespace-nowrap">
          <Heart className="w-3 h-3 fill-[#ff4b6e]" />
          <span>دامت دياركم عامرة بالأفراح والمسرات</span>
          <Heart className="w-3 h-3 fill-[#ff4b6e]" />
        </p>
        <p className="mt-1 whitespace-nowrap">كتب كتاب محمد & إنجي • مسجد عثمان معن</p>
      </motion.footer>
    </div>
  );
};
