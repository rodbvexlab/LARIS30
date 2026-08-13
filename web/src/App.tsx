import { MotionConfig } from 'motion/react';

import { Hero } from './sections/Hero';
import { Vibe } from './sections/Vibe';
import { PartyInfo } from './sections/PartyInfo';
import { DressCode } from './sections/DressCode';
import { Mood } from './sections/Mood';
import { Contribution } from './sections/Contribution';
import { Included } from './sections/Included';
import { Byob } from './sections/Byob';
import { RSVP } from './sections/RSVP';
import { Pix } from './sections/Pix';
import { VenueGallery } from './sections/VenueGallery';
import { Location } from './sections/Location';
import { FAQ } from './sections/FAQ';
import { Closing } from './sections/Closing';

/**
 * The experience container mirrors InvitationExperience.dc.html: a single
 * 430px-wide column, centred. The cap only binds above 430px, so every
 * validated mobile viewport renders exactly as before — it keeps the page from
 * sprawling on desktop, which is out of scope for this phase.
 */
export default function App() {
  return (
    // reducedMotion="user" neutralises transform animation across the whole
    // tree when the OS asks for it. The three things it cannot reach — the
    // Hero's scroll-linked parallax, the ambient drifts and the confetti —
    // each check usePrefersReducedMotion directly.
    <MotionConfig reducedMotion="user">
    <div style={{ maxWidth: '430px', margin: '0 auto', background: 'var(--warm-cream)' }}>
      <Hero />
      <Vibe />
      <PartyInfo />
      <DressCode />
      <Mood />
      <Contribution />
      <Included />
      <Byob />
      <RSVP />
      <Pix />
      <VenueGallery />
      <Location />
      <FAQ />
      <Closing />
    </div>
    </MotionConfig>
  );
}
