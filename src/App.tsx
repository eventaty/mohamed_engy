/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { MusicController } from './components/MusicController';
import { HeaderHero } from './components/HeaderHero';
import { EventDetailsCard } from './components/EventDetailsCard';
import { BlessingsGuestbook } from './components/BlessingsGuestbook';
import { ShareInvitation } from './components/ShareInvitation';
import { EnvelopeModal } from './components/EnvelopeModal';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenEnvelope = () => {
    // Notify music player immediately
    window.dispatchEvent(new CustomEvent('start-invitation-music'));
    window.sessionStorage.setItem('invitation_opened', 'true');
    
    // Smooth transition
    setTimeout(() => {
      setIsOpened(true);
    }, 700);
  };

  return (
    <main className="min-h-screen bg-[#080306] text-[#fff0f3] relative selection:bg-[#ff4b6e] selection:text-white">
      {/* Background ambient lighting and falling hearts animation */}
      <BackgroundEffects />

      {/* Floating lovely music player */}
      <MusicController />

      {/* Envelope Cover Modal */}
      <AnimatePresence>
        {!isOpened && <EnvelopeModal onOpen={handleOpenEnvelope} />}
      </AnimatePresence>

      {/* Mobile-optimized invitation container */}
      <div className="relative z-10 max-w-[480px] mx-auto min-h-screen pb-10 flex flex-col justify-between">
        <div className="w-full">
          {/* Header & Couple Names */}
          <HeaderHero />

          {/* Event Venue, Sunday Timing & Google Maps Location */}
          <EventDetailsCard />

          {/* Real-time Firebase Firestore Blessings Guestbook */}
          <BlessingsGuestbook />

          {/* Share Invitation Link & Footer */}
          <ShareInvitation />
        </div>
      </div>
    </main>
  );
}
