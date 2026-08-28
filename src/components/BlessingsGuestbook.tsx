import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  MessageSquareHeart, 
  Send, 
  Heart, 
  User, 
  Tag, 
  Clock, 
  CheckCircle2,
  Flame,
  AlertCircle
} from 'lucide-react';
import type { Blessing } from '../types';
import { subscribeToBlessings, addBlessing, toggleLikeBlessing } from '../lib/firebase';

const RELATION_TAGS = [
  'أهل العريس 🤵',
  'أهل العروسة 👰',
  'صديق مقرب 💖',
  'زميل عزيز 🤝',
  'مُحب ومُبارك 🤍',
];

export const BlessingsGuestbook: React.FC = () => {
  const [blessings, setBlessings] = useState<Blessing[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState(RELATION_TAGS[0]);
  const [message, setMessage] = useState('');

  // User persistent ID for liking
  const [userId] = useState(() => {
    const saved = localStorage.getItem('blessing_user_id');
    if (saved) return saved;
    const newId = 'user_' + Math.random().toString(36).substring(2, 9);
    localStorage.setItem('blessing_user_id', newId);
    return newId;
  });

  // Subscribe to real-time blessings
  useEffect(() => {
    const unsubscribe = subscribeToBlessings(
      (data) => {
        setBlessings(data);
        setLoading(false);
      },
      (err) => {
        console.warn('Firestore fallback warning:', err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setErrorMessage('يرجى كتابة الاسم ورسالة التهنئة');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      await addBlessing({
        name: name.trim(),
        relationship: relationship,
        message: message.trim(),
        prayerBadge: 'تهنئة مباركة 🤍',
      });

      // Trigger romantic celebration confetti
      try {
        confetti({
          particleCount: 85,
          spread: 75,
          origin: { y: 0.7 },
          colors: ['#ff4b6e', '#f43f5e', '#e11d48', '#ff758c', '#ffffff'],
        });
      } catch (err) {
        console.log('Confetti error:', err);
      }

      // Reset form
      setMessage('');
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 4000);
    } catch (err: unknown) {
      console.error('Error submitting blessing:', err);
      setErrorMessage('حدث خطأ أثناء إرسال التهنئة، يرجى المحاولة مرة أخرى.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (blessing: Blessing) => {
    const isLiked = blessing.likedBy?.includes(userId) || false;
    try {
      await toggleLikeBlessing(blessing.id, userId, isLiked);
    } catch (err) {
      console.error('Error liking:', err);
    }
  };

  const formatDate = (timestamp: number) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleDateString('ar-EG', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'الآن';
    }
  };

  return (
    <div className="px-4 max-w-md mx-auto my-7">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="text-center mb-5"
      >
        <div className="inline-flex items-center justify-center gap-2 p-2 px-4 rounded-full bg-[#220a17] border border-[#f43f5e]/40 text-[#ff758c] text-xs font-semibold mb-2 shadow-[0_0_15px_rgba(244,63,94,0.2)] whitespace-nowrap">
          <MessageSquareHeart className="w-4 h-4 text-[#ff4b6e]" />
          <span>سجل التهاني والمباركات</span>
        </div>
        <h3 className="font-scheherazade text-xl sm:text-2xl font-bold text-[#ffe4e6] whitespace-nowrap">
          اترك رسالة جميلة لمحمد وإنجي
        </h3>
        <p className="text-[11px] sm:text-xs text-[#fecdd3]/80 mt-1 whitespace-nowrap">
          شاركهما دعواتكم الطيبة وتهانيكم القلبية بمناسبة كتب الكتاب
        </p>
      </motion.div>

      {/* Blessing Input Card Form */}
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="love-card rounded-3xl p-5 mb-7"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-xs font-medium text-[#fecdd3] mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#ff4b6e]" />
              <span>اسمك الكريم</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: أحمد محمود"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#14060f] border border-[#f43f5e]/30 text-[#fff0f3] placeholder-[#7d5060] text-sm focus:outline-none focus:border-[#ff4b6e] focus:ring-1 focus:ring-[#ff4b6e] transition-all"
            />
          </div>

          {/* Relationship Tag Selector */}
          <div>
            <label className="block text-xs font-medium text-[#fecdd3] mb-1.5 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#ff4b6e]" />
              <span>صلة القرابة أو المعرفة</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {RELATION_TAGS.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => setRelationship(tag)}
                  className={`text-xs py-1.5 px-3 rounded-lg border transition-all cursor-pointer ${
                    relationship === tag
                      ? 'bg-gradient-to-r from-[#ff4b6e] to-[#e11d48] text-white font-bold border-[#ff4b6e] shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                      : 'bg-[#180712] text-[#fecdd3]/70 border-[#f43f5e]/20 hover:border-[#f43f5e]/50'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Message Textarea */}
          <div>
            <label className="block text-xs font-medium text-[#fecdd3] mb-1.5 flex items-center gap-1.5">
              <MessageSquareHeart className="w-3.5 h-3.5 text-[#ff4b6e]" />
              <span>رسالتك وتهنئتك للعروسين</span>
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="اكتب هنا تهنئتك ودعواتك الطيبة لمحمد وإنجي..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#14060f] border border-[#f43f5e]/30 text-[#fff0f3] placeholder-[#7d5060] text-sm focus:outline-none focus:border-[#ff4b6e] focus:ring-1 focus:ring-[#ff4b6e] transition-all resize-none"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-950/70 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 px-4 rounded-xl love-button text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-all cursor-pointer"
          >
            {submitting ? (
              <span>جاري إرسال التهنئة...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>إرسال التهنئة والمباركة 💌</span>
              </>
            )}
          </button>
        </form>

        {/* Success Toast */}
        <AnimatePresence>
          {successToast && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-3 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs flex items-center justify-center gap-2 font-medium"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>تم إرسال تهنئتكم ووصولها إلى العروسين بنجاح! 🤍</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Real-time Blessings Stream */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between px-1 mb-2">
          <h4 className="text-xs font-semibold text-[#fecdd3] flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-[#ff4b6e]" />
            <span>رسائل المهنئين ({blessings.length})</span>
          </h4>
          <span className="text-[11px] text-[#fda4af]">محدث لحظياً ⚡</span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-[#fda4af] love-card rounded-2xl">
            <div className="w-6 h-6 border-2 border-[#ff4b6e] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            جاري تحميل رسائل التهنئة...
          </div>
        ) : blessings.length === 0 ? (
          <div className="p-6 text-center text-xs text-[#fda4af] love-card rounded-2xl">
            <Heart className="w-6 h-6 text-[#ff4b6e] mx-auto mb-2 opacity-80 animate-pulse fill-[#ff4b6e]" />
            كن أول من يكتب رسالة تهنئة ومباركة لمحمد وإنجي!
          </div>
        ) : (
          blessings.map((blessing) => {
            const isLiked = blessing.likedBy?.includes(userId) || false;
            return (
              <motion.div
                key={blessing.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="p-4 rounded-2xl bg-gradient-to-b from-[#220a17]/90 to-[#12050c]/95 border border-[#f43f5e]/25 shadow-md relative overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#f43f5e]/25 border border-[#f43f5e]/50 flex items-center justify-center text-xs text-[#ffe4e6] font-bold">
                      {blessing.name.charAt(0)}
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm text-[#fff0f3] leading-tight">
                        {blessing.name}
                      </h5>
                      {blessing.relationship && (
                        <span className="text-[10px] text-[#ff758c]">
                          {blessing.relationship}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] text-[#fda4af]/70 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {formatDate(blessing.createdAt)}
                  </span>
                </div>

                {/* Message Body */}
                <p className="text-xs sm:text-sm text-[#ffe4e6] leading-relaxed pr-9 pl-1 my-2 font-normal whitespace-pre-wrap">
                  {blessing.message}
                </p>

                {/* Footer / Like Counter */}
                <div className="mt-2 pt-2 border-t border-[#f43f5e]/15 flex items-center justify-end">
                  <button
                    onClick={() => handleLike(blessing)}
                    className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                      isLiked
                        ? 'bg-rose-600/30 border-rose-500 text-rose-200 shadow-[0_0_10px_rgba(244,63,94,0.4)]'
                        : 'bg-[#180712] border-[#f43f5e]/25 text-[#fda4af] hover:text-white'
                    }`}
                  >
                    <Heart
                      className={`w-3 h-3 ${
                        isLiked ? 'text-rose-400 fill-rose-400' : 'text-[#ff4b6e]'
                      }`}
                    />
                    <span className="font-mono text-[11px]">
                      {blessing.likes || 0}
                    </span>
                  </button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};
