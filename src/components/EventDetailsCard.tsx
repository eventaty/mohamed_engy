import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Navigation, 
  Copy, 
  Check, 
  CalendarPlus,
  Building2,
  Heart
} from 'lucide-react';

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const EventDetailsCard: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const mapsUrl = 'https://maps.app.goo.gl/DaqKPLcg8VrtDTBo9';
  const venueName = 'مسجد عثمان معن';

  // Calculate next Sunday target date
  useEffect(() => {
    const calculateTargetSunday = () => {
      const now = new Date();
      const currentDay = now.getDay(); // 0 is Sunday
      const daysUntilSunday = currentDay === 0 ? 7 : (7 - currentDay);
      
      const target = new Date(now);
      target.setDate(now.getDate() + daysUntilSunday);
      target.setHours(18, 0, 0, 0); // 6:00 PM evening ceremony
      return target;
    };

    const targetDate = calculateTargetSunday();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyLocation = () => {
    navigator.clipboard.writeText(`${venueName} - ${mapsUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent('عقد قران وكتب كتاب محمد وإنجي');
    const details = encodeURIComponent('نتشرف بحضوركم لمشاركتنا فرحة عقد القران بمسجد عثمان معن');
    const location = encodeURIComponent(`${venueName}, ${mapsUrl}`);
    
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(googleCalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="px-4 max-w-md mx-auto my-5">
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="love-card rounded-3xl p-6 relative overflow-hidden"
      >
        {/* Top Header */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#f43f5e]/25 pb-4 mb-5 gap-2.5"
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#f43f5e]/20 border border-[#f43f5e]/30 flex items-center justify-center shrink-0 text-[#ff758c]">
              <Building2 className="w-4 h-4 text-[#ff4b6e]" />
            </div>
            <h3 id="event-details-heading" className="font-scheherazade text-xl sm:text-2xl font-bold text-[#ffe4e6] leading-none">
              تفاصيل موعد ومكان عقد القران
            </h3>
          </div>
          <div className="self-start sm:self-auto">
            <span className="text-xs px-3 py-1 rounded-full bg-[#f43f5e]/20 text-[#ff758c] border border-[#f43f5e]/40 flex items-center gap-1.5 shrink-0 whitespace-nowrap">
              <Heart className="w-3 h-3 fill-[#ff4b6e]" />
              كتب كتاب مبارك
            </span>
          </div>
        </motion.div>

        {/* Date & Venue Details */}
        <div className="space-y-3.5">
          {/* Day & Date */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#1c0a15]/80 border border-[#f43f5e]/20"
          >
            <div className="w-10 h-10 rounded-xl bg-[#f43f5e]/20 border border-[#f43f5e]/40 flex items-center justify-center shrink-0 text-[#ff758c]">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-[#fecdd3]/70 mb-0.5 whitespace-nowrap">الموعد واليوم</p>
              <h4 className="font-semibold text-sm sm:text-base text-[#fff0f3] whitespace-nowrap">
                يوم الأحد المبارك
              </h4>
              <p className="text-xs text-[#ff758c] mt-0.5 flex items-center gap-1 whitespace-nowrap">
                <Clock className="w-3 h-3" />
                عقد القران ومراسم كتب الكتاب
              </p>
            </div>
          </motion.div>

          {/* Mosque Location */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#1c0a15]/80 border border-[#f43f5e]/20"
          >
            <div className="w-10 h-10 rounded-xl bg-[#f43f5e]/20 border border-[#f43f5e]/40 flex items-center justify-center shrink-0 text-[#ff758c]">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-[#fecdd3]/70 mb-0.5 whitespace-nowrap">المكان والمسجد</p>
              <h4 className="font-semibold text-sm sm:text-base text-[#fff0f3] whitespace-nowrap">
                {venueName}
              </h4>
              <p className="text-xs text-[#fecdd3]/80 mt-0.5 whitespace-nowrap">
                قاعة مناسبات وعقد القران بالمسجد
              </p>
            </div>
          </motion.div>
        </div>

        {/* Romantic Countdown Timer */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mt-5 p-4 rounded-2xl bg-[#160610]/95 border border-[#f43f5e]/30 text-center"
        >
          <p className="text-xs text-[#fda4af] mb-3 font-medium flex items-center justify-center gap-1.5 whitespace-nowrap">
            <Clock className="w-3.5 h-3.5 text-[#ff4b6e]" />
            <span>العد التنازلي لموعد عقد القران</span>
            <Heart className="w-3 h-3 text-[#ff4b6e] fill-[#ff4b6e]" />
          </p>

          <div className="grid grid-cols-4 gap-2 text-center" dir="ltr">
            <div className="p-2 rounded-xl bg-[#220a18] border border-[#f43f5e]/30 shadow-inner">
              <span className="block font-bold text-base sm:text-lg text-[#ff758c] font-mono">
                {String(countdown.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-[#fecdd3]/60 block whitespace-nowrap">ثانية</span>
            </div>
            <div className="p-2 rounded-xl bg-[#220a18] border border-[#f43f5e]/30 shadow-inner">
              <span className="block font-bold text-base sm:text-lg text-[#ff758c] font-mono">
                {String(countdown.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-[#fecdd3]/60 block whitespace-nowrap">دقيقة</span>
            </div>
            <div className="p-2 rounded-xl bg-[#220a18] border border-[#f43f5e]/30 shadow-inner">
              <span className="block font-bold text-base sm:text-lg text-[#ff758c] font-mono">
                {String(countdown.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-[#fecdd3]/60 block whitespace-nowrap">ساعة</span>
            </div>
            <div className="p-2 rounded-xl bg-[#220a18] border border-[#f43f5e]/30 shadow-inner">
              <span className="block font-bold text-base sm:text-lg text-[#ff758c] font-mono">
                {String(countdown.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-[#fecdd3]/60 block whitespace-nowrap">يوم</span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mt-5 flex flex-row gap-2"
        >
          {/* Open Google Maps */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-2.5 rounded-xl love-button text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
          >
            <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>فتح الخريطة</span>
          </a>

          {/* Copy Address */}
          <button
            onClick={handleCopyLocation}
            className="py-2.5 px-3 rounded-xl bg-[#200a16] border border-[#f43f5e]/40 text-[#fff0f3] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#2b0d1e] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            title="نسخ العنوان"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">تم النسخ</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#ff4b6e]" />
                <span>نسخ العنوان</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Add to Calendar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mt-2"
        >
          <button
            onClick={handleAddToCalendar}
            className="w-full py-2 px-3 rounded-xl bg-[#190813] border border-[#f43f5e]/25 text-[#fda4af] text-xs flex items-center justify-center gap-1.5 hover:text-white hover:bg-[#220a19] transition-colors cursor-pointer whitespace-nowrap"
          >
            <CalendarPlus className="w-3.5 h-3.5 text-[#ff4b6e] shrink-0" />
            <span>حفظ الموعد في تقويم الهاتف</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
